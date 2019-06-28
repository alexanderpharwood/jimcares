const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify').uglify;

const outputOptions = {
	file: 'dist/jimcares.js',
	format: 'umd',
	name: 'Jim'
};

const inputOptions = {
	input: 'index.js',
	plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
};

const inputOptionsMin = {
	input: 'index.js',
	plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
};

const outputOptionsMin = {
	file: 'dist/jimcares.min.js',
	format: 'umd',
	name: 'Jim',
	sourcemap: true
};

async function build(inputOptions, outputOptions, callback) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
  callback();
}

console.log('Starting build. Have you run "npm run test"?');

console.log('Building bundle...');
build(inputOptions, outputOptions, function(){
	console.log('Finished bundle.');
});

console.log('Building minified bundle...');
build(inputOptionsMin, outputOptionsMin, function(){
	console.log('Finished minified bundle.');
});
