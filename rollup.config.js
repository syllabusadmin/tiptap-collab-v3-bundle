import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/editor.js',
  output: {
    file: 'dist/tiptap-collab-v3.js',
    format: 'iife',
    name: 'TiptapCollabV3'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};
