import Frame from "../../src/Frame";
import {SCENE_ROLES} from "../../src/consts";
SCENE_ROLES["transform"] = true;
SCENE_ROLES["filter"] = true;

describe("Frame Test", function() {
    describe("test frame initialize", function() {
        it("should check default frame", function() {
            const frame = new Frame({
                a: 1,
                b: 2,
            });
            expect(frame.get("a")).to.be.equals(1);
            expect(frame.get("b")).to.be.equals(2);
        });
        it("should check default frame with deep object", function() {
            const frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2)",
                filter: {
                    brightness: "90%",
                }
            });
            expect(frame.get("transform", "scale").toValue()).to.be.equals("scale(1,2)");
            expect(frame.get("filter", "brightness")).to.be.equals("90%");
            expect(frame.get("a")).to.be.equals(1);
            expect(frame.get("b")).to.be.equals(2);
        });
        it("should check array", function() {
            const frame = new Frame({
                a: [1, 2, 3],
                b: {
                    c: [3,4,5],
                }
            });
            expect(frame.get("a")).to.deep.equals([1,2,3]);
            expect(frame.get("b", "c")).to.deep.equals([3,4,5]);
        });
    });
    describe("test frame method", function() {
        beforeEach(() => {
            this.frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2)",
                filter: {
                    brightness: "90%",
                }
            })
        });
        afterEach(() => {
            this.frame = null;
        })
        it("should check set method", () => {
            // Given
            // When
            this.frame.set("a", 10);
            
            // Then
            expect(this.frame.get("a")).to.be.equals(10);
        });
        it("sholud check clone method", () => {
            const frame2 = this.frame.clone();
            expect(frame2.properties).to.deep.equals(this.frame.properties);
        });
        it("sholud check merge method", () => {
            const frame2 = new Frame({
                a: 10,
                c: 5,
                transform: "translate(10px, 10px)",
                filter: {
                    grayscale: "50%",
                },
            });
            frame2.merge(this.frame);

            expect(frame2.get("a")).to.be.equals(1);
            expect(frame2.get("b")).to.be.equals(2);
            expect(frame2.get("c")).to.be.equals(5);
            expect(frame2.get("transform", "translate").toValue()).to.be.equals("translate(10px,10px)");
            expect(frame2.get("transform", "scale").toValue()).to.be.equals("scale(1,2)");
            expect(frame2.get("filter", "brightness")).to.be.equals("90%");
            expect(frame2.get("filter", "grayscale")).to.be.equals("50%");
        });
    });
});