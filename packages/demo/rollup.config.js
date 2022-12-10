const builder = require("@daybrush/builder");
const cssonly = require("rollup-plugin-css-only");
const { resolve } = require("path");

module.exports = builder([
    {
        input: './src/index/index.ts',
        output: "../../demo/dist/index.js",
        format: "iife",
        exports: "named",
        plugins: [cssonly({
            output: "index.css",
        })],
        resolve: true,
        uglify: false,
    },
    {
        input: './src/features/index.ts',
        output: "../../demo/dist/features.js",
        format: "iife",
        exports: "named",
        plugins: [cssonly({
            output: "features.css",
        })],
        resolve: true,
        uglify: true,
    },
]);
