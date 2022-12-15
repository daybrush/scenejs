const builder = require("@daybrush/builder");

const defaultOptions = {
    tsconfig: "tsconfig.build.json",
};

module.exports = builder([
    {
        ...defaultOptions,
        input: "src/react-scenejs/index.tsx",
        output: "./dist/scene.esm.js",
        visualizer: true,
        format: "es",
        exports: "named",
    },
    {
        ...defaultOptions,
        input: "src/react-scenejs/index.tsx",
        output: "./dist/scene.cjs.js",
        format: "cjs",
        exports: "named",
    },
]);
