import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.test.js',
    format: 'umd',
    name: 'Jim',
    sourcemap: true,
    sourcemapFile: 'dist/bundle.test.js.map'
  },
  plugins:
    [
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
}
