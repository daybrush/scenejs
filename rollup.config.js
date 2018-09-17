import typescript from 'rollup-plugin-typescript';

const env = process.env.ENV || "es";

export default {
  entry: 'src/index.ts',
  format: env,
  plugins: [typescript({
    "module": "es2015",
    "target": "es3",
    "lib": ["es2015", "dom"],
    "exclude": "node_modules/**",
  })],
  output: {
    freeze: false,
    exports: "named",
  },
  dest: `./dist/scene.${env === "es" ? "esm" : "common"}.js`,
};
