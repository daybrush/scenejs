import SceneItem from "../../src/SceneItem";
import {SCENE_ROLES} from "../../src/consts";


SCENE_ROLES["transform"] = true;
SCENE_ROLES["filter"] = true;

describe("SceneItem Test", function() {
    describe("test sceneItem initialize", function() {
        it("should check default sceneItem", function() {
            const sceneItem = new SceneItem({
                0: {
                    a: 1,
                },
                1: {
                    display: "block",
                },
            });

            expect(sceneItem.get(0, "a")).to.be.equals(1);
            expect(sceneItem.get(1, "display")).to.be.equals("block");
        });
    });
});