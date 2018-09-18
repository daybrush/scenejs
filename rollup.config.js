import typescript from 'rollup-plugin-typescript';

const env = process.env.ENV || "es";

export default {
  input: 'src/index.ts',
  plugins: [typescript({
    "module": "es2015",
    "target": "es3",
    "lib": ["es2015", "dom"],
    "exclude": "node_modules/**",
  })],
  output: [{
    format: "es",
    freeze: false,
    exports: "named",
    interop: false,
    file: `./dist/scene.esm.js`,
  }],
};
