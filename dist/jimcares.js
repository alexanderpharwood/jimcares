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

  function accessor() {
    if (typeof window.__jimcares === 'undefined') {
      throw new Error('Jim is not initialised yet. Call Jim.init({options}) first');
    }

    return window.__jimcares;
  }

  function getPathProps(path) {
    return path.split('/');
  }

  function getValue(path) {
    var memory = accessor();
    var pathProps = getPathProps(path);

    if (pathProps.length === 0) {
      return memory[path].value;
    }

    if (typeof memory[pathProps[0]] === 'undefined') {
      return undefined;
    }

    var node = memory[pathProps[0]].value;
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
    return sizeof(accessor());
  }

  function getRoot(path) {
    var memory = accessor();
    var pathProps = getPathProps(path);

    if (pathProps.length === 0) {
      return memory[path].value;
    }

    return memory[pathProps[0]];
  }

  function setUpdatedAt() {
    accessor().updated_at = new Date();
  }

  function trash(path) {
    var node = getRoot(path);

    if (typeof node === 'undefined') {
      return false;
    }

    node.deleted_at = new Date();
    setUpdatedAt();
    return true;
  }

  function clear(path) {
    var memory = accessor();
    var exclusions = ["created_at", "updated_at"];

    for (var i in memory) {
      if (exclusions.indexOf(i) === -1) {
        delete memory[i];
      }
    }
  }

  function count(path) {
    var exclusions = ["created_at", "updated_at"];
    var memory = accessor();
    return Object.keys(memory).length - exclusions.length;
  }

  function equals(path, match) {
    return getValue(path) === match;
  }

  function toJson(path) {
    return JSON.stringify(accessor());
  }

  function forget(path) {
    var memory = accessor();
    var pathProps = getPathProps(path);
    setUpdatedAt();
    return delete memory[path];
  }

  function destroy(path) {
    return delete window.__jimcares;
  }

  function remember(path, value) {
    if (typeof path === 'undefined') {
      throw new Error('path cannot be undefined');
    }

    var memory = accessor();
    var item = memory[path] = {};
    item.value = value;
    item.created_at = new Date();
    item.updated_at = new Date();
    item.deleted_at = null;
    setUpdatedAt();
    return true;
  }

  function writeToLS(path) {
    if (typeof Storage === "undefined") {
      console.error('Client does not support local storage');
      return false;
    }

    return localStorage.setItem("__jimcares", toJson());
  }

  /**
   * Initialise Jimcares
   * @todo This method should accept options, such as a default expiration time. It should also set up the timeout for removing properties from the cache.
   * @return bool
   */
  function init() {
    window.__jimcares = {
      "created_at": new Date(),
      "updated_at": new Date()
    };
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
      value: function remember$1(path, value) {
        return remember(path, value);
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
