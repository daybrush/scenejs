import builder from "@daybrush/builder";
import cssbundle from "rollup-plugin-css-bundle";

export default builder([
    {
        input: 'demo/src/index/index.ts',
        output: "./demo/dist/index.js",
        format: "iife",
        exports: "named",
        plugins: [cssbundle({output: "./demo/dist/index.css"})],
        resolve: true,
    },
    {
        input: 'demo/src/features/index.ts',
        output: "./demo/dist/features.js",
        format: "iife",
        exports: "named",
        plugins: [cssbundle({output: "./demo/dist/features.css"})],
        resolve: true,
    },
]);
