import builder from "@daybrush/builder";

const defaultOptions = {
    tsconfig: "",
    commonjs: true,
    external: {
        svelte: "svelte",
    },
};

export default builder([
    {
        ...defaultOptions,
        input: "./src/svelte-scenejs/index.ts",
        output: "dist/scene.cjs.js",
        format: "cjs",
        exports: "named",
    },
    {
        ...defaultOptions,
        input: "./src/svelte-scenejs/index.ts",
        output: "dist/scene.esm.js",
        format: "es",
        exports: "named",
    },
]);
