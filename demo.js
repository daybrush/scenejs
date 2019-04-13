// https://github.com/daybrush/demo
const pkg = require("./package.json");
const banner = `/*
Copyright (c) 2017 ${pkg.author}
name: ${pkg.name}
license: ${pkg.license}
author: ${pkg.author}
repository: ${pkg.repository.url}
version: ${pkg.version}
*/`;

module.exports = {
  input: "demo/src/index.ts",
  output: {
    sourcemap: true,
    uglify: true,
    banner: banner,
    file: "./demo/dist/index.js",
    css: "./demo/dist/index.css",
  }
}
