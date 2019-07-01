(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Jim = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function driver() {
    if (typeof window.__jimcares === 'undefined') {
      throw new Error('Jim is not initialised yet. Call Jim.init({options}) first');
    }

    return window.__jimcares;
  }

  function getPathProps(path) {
    return path.split('/');
  }

  function getValue(path) {
    var memory = driver();
    var pathProps = getPathProps(path);

    if (pathProps.length === 0) {
      return memory.roots[path].value;
    }

    if (typeof memory.roots[pathProps[0]] === 'undefined') {
      return undefined;
    }

    var node = memory.roots[pathProps[0]].value;
    pathProps.shift();

    for (var index in pathProps) {
      node = node[pathProps[index]];
    }

    return node;
  }

  function has(path) {
    return typeof getValue(path) !== 'undefined';
  }

  /*

  sizeof.js

  A function to calculate the approximate memory usage of objects

  Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
  of the CC0 1.0 Universal legal code:

  http://creativecommons.org/publicdomain/zero/1.0/legalcode

  */

  /* Returns the approximate memory usage, in bytes, of the specified object. The
   * parameter is:
   *
   * object - the object whose size should be determined
   */
  function sizeof(object) {
    // initialise the list of objects and size
    var objects = [object];
    var size = 0; // loop over the objects

    for (var index = 0; index < objects.length; index++) {
      // determine the type of the object
      switch (_typeof(objects[index])) {
        // the object is a boolean
        case 'boolean':
          size += 4;
          break;
        // the object is a number

        case 'number':
          size += 8;
          break;
        // the object is a string

        case 'string':
          size += 2 * objects[index].length;
          break;
        // the object is a generic object

        case 'object':
          // if the object is not an array, add the sizes of the keys
          if (Object.prototype.toString.call(objects[index]) != '[object Array]') {
            for (var key in objects[index]) {
              size += 2 * key.length;
            }
          } // loop over the keys


          for (var key in objects[index]) {
            // determine whether the value has already been processed
            var processed = false;

            for (var search = 0; search < objects.length; search++) {
              if (objects[search] === objects[index][key]) {
                processed = true;
                break;
              }
            } // queue the value to be processed if appropriate


            if (!processed) objects.push(objects[index][key]);
          }

      }
    } // return the calculated size


    return size;
  }

  function size(path) {
    return sizeof(driver().roots);
  }

  function getRoot(path) {
    var memory = driver();
    var pathProps = getPathProps(path);

    if (pathProps.length === 0) {
      return memory.roots[path].value;
    }

    return memory.roots[pathProps[0]];
  }

  function setUpdatedAt() {
    driver().updated_at = new Date();
  }

  function trash(path) {
    var root = getRoot(path);

    if (typeof root === 'undefined') {
      return false;
    }

    root.deleted_at = new Date();
    setUpdatedAt();
    return true;
  }

  function clear(path) {
    var memory = driver();

    for (var i in memory.roots) {
      delete memory.roots[i];
    }
  }

  function count(path) {
    var memory = driver();
    return Object.keys(memory.roots).length;
  }

  function equals(path, match) {
    return getValue(path) === match;
  }

  function toJson(path) {
    return JSON.stringify(driver());
  }

  function forget(path) {
    var memory = driver();
    var pathProps = getPathProps(path);
    setUpdatedAt();
    return delete memory.roots[path];
  }

  function destroy(path) {
    clearInterval(window.__jimcares.expirationWorker);
    return delete window.__jimcares;
  }

  /**
   * Adds time to a date. Modelled after MySQL DATE_ADD function.
   * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
   * https://stackoverflow.com/a/1214753/18511
   *
   * @param date  Date to start with
   * @param interval  One of: year, month, week, day, hour, minute, second
   * @param units  Number of units of the given interval to add.
   */
  function dateAdd(date, interval, units) {
    var ret = new Date(date); //don't change original date

    var checkRollover = function checkRollover() {
      if (ret.getDate() !== date.getDate()) {
        ret.setDate(0);
      }
    };

    switch (interval.toLowerCase()) {
      case 'year':
      case 'years':
        ret.setFullYear(ret.getFullYear() + units);
        checkRollover();
        break;

      case 'month':
      case 'months':
        ret.setMonth(ret.getMonth() + units);
        checkRollover();
        break;

      case 'week':
      case 'weeks':
        ret.setDate(ret.getDate() + 7 * units);
        break;

      case 'day':
      case 'days':
        ret.setDate(ret.getDate() + units);
        break;

      case 'hour':
      case 'hours':
        ret.setTime(ret.getTime() + units * 3600000);
        break;

      case 'minute':
      case 'minutes':
        ret.setTime(ret.getTime() + units * 60000);
        break;

      case 'second':
      case 'seconds':
        ret.setTime(ret.getTime() + units * 1000);
        break;

      default:
        ret = undefined;
        break;
    }

    return ret;
  }

  function dateFromDifferenceString(difference) {
    var date = new Date();
    var interval = difference.split(' ')[1];
    var units = difference.split(' ')[0];
    date = dateAdd(date, interval, units);
    return date;
  }

  function remember(path, value, expires_at) {
    if (typeof path === 'undefined') {
      return false;
    }

    var memory = driver();
    var item = memory.roots[path] = {};
    expires_at = typeof expires_at === 'undefined' ? window.__jimcares.defaultExpiration : expires_at;
    item.value = value;
    item.created_at = new Date();
    item.updated_at = new Date();
    item.deleted_at = null;
    item.expires_at = dateFromDifferenceString(expires_at);
    setUpdatedAt();
    return true;
  }

  function writeToLS(path) {
    if (typeof Storage === "undefined") {
      throw new Error('Client does not support local storage');
    }

    return localStorage.setItem("__jimcares", toJson());
  }

  /**
   * Initialise Jimcares
   *
   * @param object settings
   * @return bool
   */

  function init(settings) {
    //Default settings
    var defaultExpiration = '24 hours';

    if (typeof settings !== 'undefined') {
      if (typeof settings.defaultExpiration !== 'undefined') {
        var _defaultExpiration = settings.defaultExpiration;
      }
    }

    window.__jimcares = {
      created_at: new Date(),
      updated_at: new Date(),
      roots: {},
      defaultExpiration: defaultExpiration
    };

    var expirationWorker = function expirationWorker() {
      return setInterval(function () {
        for (var i in window.__jimcares.roots) {
          if (getRoot(i).expires_at.getTime() < new Date().getTime()) {
            forget(i);
          }
        }
      }, 5000);
    };

    window.__jimcares.expirationWorker = expirationWorker();
    return true;
  }

  var Jim =
  /*#__PURE__*/
  function () {
    function Jim() {
      _classCallCheck(this, Jim);
    }

    _createClass(Jim, null, [{
      key: "init",
      value: function init$1() {
        return init();
      }
      /**
       * Determine whether jim has the given path.
       *
       * @param string path
       * @return bool
       */

    }, {
      key: "has",
      value: function has$1(path) {
        return has(path);
      }
      /**
       * Save a value at the given path.
       *
       * @param string path
       * @param mixed value
       * @return bool
       */

    }, {
      key: "remember",
      value: function remember$1(path, value, expires_at) {
        return remember(path, value, expires_at);
      }
      /**
       * Get the value from the given path.
       *
       * @param string path
       * @return mixed
       */

    }, {
      key: "get",
      value: function get(path) {
        return getValue(path);
      }
      /**
       * Get the root from the given path.
       *
       * @param string path
       * @return object
       */

    }, {
      key: "root",
      value: function root(path) {
        return getRoot(path);
      }
      /**
       * Write the cache to local storage.
       *
       * @todo optional path to store only a singe root.
       * @return bool
       */

    }, {
      key: "writeToLS",
      value: function writeToLS$1() {
        return writeToLS();
      }
      /**
       * Soft delete the root at the given root.
       *
       * @param string path
       * @return bool
       */

    }, {
      key: "trash",
      value: function trash$1(path) {
        return trash(path);
      }
      /**
       * Check if the given path has been soft deleted.
       *
       * @param string path
       * @return bool
       */

    }, {
      key: "isTrashed",
      value: function isTrashed(path) {
        return trash(path);
      }
      /**
       * Hard delete the root at the given path.
       *
       * @param string path
       * @return bool
       */

    }, {
      key: "forget",
      value: function forget$1(path) {
        return forget(path);
      }
      /**
       * Clear all roots from the cache.
       *
       * @return void
       */

    }, {
      key: "clear",
      value: function clear$1() {
        clear();
      }
      /**
       * Destroy the entire cache.
       *
       * @return void
       */

    }, {
      key: "destroy",
      value: function destroy$1() {
        destroy();
      }
      /**
       * Export the entire cache to json, or the given path.
       *
       * @todo optional parameter to return the json string for a given path.
       * @return string
       */

    }, {
      key: "toJson",
      value: function toJson$1() {
        return toJson();
      }
      /**
       * Get the size of the entire cache in bytes.
       *
       * @todo optional size of a given path if one is provided.
       * @return string
       */

    }, {
      key: "size",
      value: function size$1() {
        return size();
      }
      /**
       * Get the count of roots in the cache.
       *
       * @return string
       */

    }, {
      key: "count",
      value: function count$1() {
        return count();
      }
      /**
       * Determine if the given value matched the value at the given path in cache.
       *
       * @param path string
       * @param match mixed
       * @return bool
       */

    }, {
      key: "equals",
      value: function equals$1(path, match) {
        return equals(path, match);
      }
    }]);

    return Jim;
  }();

  return Jim;

}));
