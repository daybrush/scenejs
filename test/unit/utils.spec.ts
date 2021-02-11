import { splitUnit } from "@daybrush/utils";
import Frame from "../../src/Frame";
import { flatSceneObject, isFrame } from "../../src/utils";

describe("utils Test", () => {
    it("should check 'splitUnit' method", () => {
        expect(splitUnit("1234")).to.be.deep.equals({ prefix: "", value: 1234, unit: "" });
        expect(splitUnit("d1234")).to.be.deep.equals({ prefix: "d", value: 1234, unit: "" });
        expect(splitUnit("d1234d")).to.be.deep.equals({ prefix: "d", value: 1234, unit: "d" });
        expect(splitUnit("ddddd")).to.be.deep.equals({ prefix: "", value: NaN, unit: "" });
    });
    it("test flatSceneObject", () => {
        // Given
        const frames = {
            a: new Frame(),
            b: new Frame(),
            c: {
                c1: new Frame(),
                c2: {
                    c21: new Frame(),
                    c22: new Frame(),
                },
            },
        };

        // When
        const obj = flatSceneObject(frames, "/");
        const objKeys = Object.keys(obj);

        // Then
        expect(objKeys).to.be.deep.equals(["a", "b", "c/c1", "c/c2/c21", "c/c2/c22"]);
        objKeys.forEach(key => {
            expect(isFrame(obj[key])).to.be.true;
        });
    });
});
