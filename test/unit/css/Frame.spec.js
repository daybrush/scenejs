import Frame from "../../../src/css/Frame";
import {SCENE_ROLES} from "../../../src/consts";
/* eslint-disable */

SCENE_ROLES["transform"] = true;
SCENE_ROLES["filter"] = true;

describe("CSS Frame Test", function() {
    describe("test frame for CSS", function() {
        beforeEach(() => {
            this.frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2) translateX(100px) translateY(200px)",
                filter: {
                    brightness: "90%",
                    grayscale: "40%",
                }
            });
        })
        it("should check 'toCSS' method", () => {
            const css = this.frame.toCSS().replace(/;(\S)/g, ";\n$1").split("\n");

            const result = `a:1;
b:2;
transform:scale(1,2) translateX(100px) translateY(200px);
-moz-transform:scale(1,2) translateX(100px) translateY(200px);
-ms-transform:scale(1,2) translateX(100px) translateY(200px);
-o-transform:scale(1,2) translateX(100px) translateY(200px);
-webkit-transform:scale(1,2) translateX(100px) translateY(200px);
filter:brightness(90%) grayscale(40%);
-moz-filter:brightness(90%) grayscale(40%);
-ms-filter:brightness(90%) grayscale(40%);
-o-filter:brightness(90%) grayscale(40%);
-webkit-filter:brightness(90%) grayscale(40%);`.split("\n");
            
            css.forEach((line, i) => {
                expect(line).to.be.deep.equal(result[i]);
            });
            expect(this.frame.cssText()).to.be.deep.equal(result.join(""));
        });
    });
});