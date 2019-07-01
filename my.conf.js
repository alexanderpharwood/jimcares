// Karma configuration
// Generated on Mon Jul 01 2019 16:30:49 GMT+0100 (British Summer Time)

module.exports = function(config) {
  config.set({

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: 'src',

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['mocha', 'chai'],

	// list of files / patterns to load in the browser
	files: [
		// {pattern:'../src/*', type: 'module'},
		// {pattern:'../src/api/has.js', type: 'module'},
		// {pattern:'../src/api/*.js', type: 'module'},
		// {pattern:'../src/helpers/*.js', type: 'module'},
		{pattern:'Jim.js', type: 'module'},
		{pattern:'api/*.js', type: 'module'},
		{pattern:'helpers/*.js', type: 'module'},
		{pattern:'tests/api.test.js', type: 'module'},
		
	],

	// list of files / patterns to exclude
	exclude: [
	],

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
	},

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	reporters: ['progress'],

	// web server port
	port: 9876,

	// enable / disable colors in the output (reporters and logs)
	colors: true,

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_INFO,

	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: false,

	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	browsers: ['Chrome', 'Firefox', 'ChromeHeadless'],

	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: false,

	// Concurrency level
	// how many browser should be started simultaneous
	concurrency: Infinity,
  })
}
