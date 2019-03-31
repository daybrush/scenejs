// https://github.com/daybrush/demo
const banner = require("./config/banner");

module.exports = {
  input: "demo/src/index.ts",
  output: {
    sourcemap: true,
    uglify: false,
    banner: banner,
    file: "./demo/dist/index.js",
    css: "./demo/dist/index.css",
  }
}
