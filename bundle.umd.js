(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('.src/Jim')) :
	typeof define === 'function' && define.amd ? define(['.src/Jim'], factory) :
	(global = global || self, global.Jim = factory(global.Jim));
}(this, function (Jim) { 'use strict';

	Jim = Jim && Jim.hasOwnProperty('default') ? Jim['default'] : Jim;



	return Jim;

}));
