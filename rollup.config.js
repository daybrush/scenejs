import typescript from 'rollup-plugin-typescript';
import PrototypeMinify from "rollup-plugin-prototype-minify";
import { uglify } from "rollup-plugin-uglify";

// const visualizer = require('./rollup-plugin-visualizer');
const plugin = typescript({
  "module": "es2015",
  "target": "es3",
  "lib": ["es2015", "dom"],
  "exclude": "node_modules/**",
  "sourceMap": true,
});


export default [{
  input: 'src/index.ts',
  plugins: [plugin, PrototypeMinify({sourcemap: true})],
  output: [{
    format: "es",
    freeze: false,
    exports: "named",
    interop: false,
    sourcemap: true,
    file: `./dist/scene.esm.js`,
  }, {
    format: "cjs",
    freeze: false,
    exports: "named",
    interop: false,
    sourcemap: true,
    file: `./dist/scene.common.js`,
  }],
}, {
  input: 'src/index.umd.ts',
  plugins: [plugin, PrototypeMinify({sourcemap: true})],
  output: [{
    format: "umd",
    name: "Scene",
    freeze: false,
    exports: "default",
    interop: false,
    sourcemap: true,
    file: `./dist/scene.js`,
  }],
}, {
  input: 'src/index.umd.ts',
  plugins: [plugin, PrototypeMinify({sourcemap: true}), uglify({ sourcemap: true })], // , visualizer()
  output: [{
    format: "umd",
    name: "Scene",
    freeze: false,
    exports: "default",
    interop: false,
    sourcemap: true,
    file: `./dist/scene.min.js`,
  }],
}]
