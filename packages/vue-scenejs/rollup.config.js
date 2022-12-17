const buildHelper = require("@daybrush/builder");
const vuePlugin = require("rollup-plugin-vue");

const defaultOptions = {
    sourcemap: true,
    input: "./src/index.ts",
    exports: "named",
    plugins: [
        vuePlugin(),
    ],
    external: {
        "vue": "Vue",
    },
};
module.exports = buildHelper([
    {
        ...defaultOptions,
        format: "es",
        output: "./dist/scene.esm.js",
    },
    {
        ...defaultOptions,
        format: "cjs",
        // input: "./src/index.umd.ts",
        exports: "named",
        output: "./dist/scene.cjs.js",
    },
]);
