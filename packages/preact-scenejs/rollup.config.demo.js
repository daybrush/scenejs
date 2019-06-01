import resolve from "rollup-plugin-node-resolve";
import builder from "@daybrush/builder";
import css from "rollup-plugin-css-bundle";

const resolvePlugin = resolve();
const customResolvePlugin = {
    ...resolvePlugin,
    resolveId(importee, importer) {
        if (importee === "react" || importee === "react-dom") {
            return resolvePlugin.resolveId("preact-compat/dist/preact-compat.es.js", importer);
        }
        return resolvePlugin.resolveId(importee, importer);
    },
}
const external = {
    "prop-types": "prop-types",
};


export default builder({
    input: "./src/demo/index.tsx",
    tsconfig: "./tsconfig.build.json",
    sourcemap: true,
    format: "umd",
    output: "./demo/dist/index.js",
    name: "app",
    exports: "named",
    external,
    plugins: [
        customResolvePlugin,
        css({ output: "./demo/dist/index.css" }),
    ],
});
