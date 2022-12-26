const  builder = require("@daybrush/builder");

const external = {
    "@daybrush/utils": "utils",
    "list-map": "ListMap",
}
module.exports = builder([
    {
        input: 'src/index.ts',
        output: "./dist/scene.esm.js",
        format: "es",
        exports: "named",
        external,
    },
    {
        input: 'src/index.cjs.ts',
        output: "./dist/scene.cjs.js",
        format: "cjs",
        exports: "named",
        external,
    },
    {
        name: "Scene",
        input: "src/index.umd.ts",
        output: "./dist/scene.js",
        resolve: true,
    },
    {
        name: "Scene",
        input: "src/index.umd.ts",
        output: "./dist/scene.min.js",
        resolve: true,
        uglify: true,
        visualizer: {},
    }
]);
