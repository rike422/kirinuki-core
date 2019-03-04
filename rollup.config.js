import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/kirinuki.standalone.ts',
  output: {
    file: 'lib/kirinuki.standalone.js',
    name: 'kirinuki',
    format: 'umd'
  },
  plugins: [
    typescript({
      exclude: [
        'node_modules/**',
        '**/*.json'
      ]
    }),
    resolve({
      jsnext: true,
      browser: true,
      main: true
    }),
    json({}),
    commonjs({
      include: 'node_modules/**',
      exclude: [
        '**/*.json'
      ]
    }),
    uglify()
  ]
};
