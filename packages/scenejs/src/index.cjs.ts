import Scene, * as others from "./index";

for (const name in others) {
    (Scene as any)[name] = (others as any)[name];
}
declare const module: any;

export * from "./index";
module.exports = Scene;
export default Scene;
