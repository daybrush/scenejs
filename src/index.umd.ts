import Scene, * as others from "./index";

for (const name in others) {
    (Scene as any)[name] = (others as any)[name];
}

export default Scene;
