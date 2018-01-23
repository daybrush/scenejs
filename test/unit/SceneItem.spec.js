import SceneItem from "../../src/SceneItem";
import {SCENE_ROLES} from "../../src/consts";
/* eslint-disable */

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
                    a: 2,
                },
            });

            expect(sceneItem.get(0, "a")).to.be.equals(1);
            expect(sceneItem.get(1, "display")).to.be.equals("block");
        });
    });
    describe("test sceneItem method", function() {
        beforeEach(() => {
            this.sceneItem = new SceneItem({
                0: {
                    a: 1,
                    display: "block",
                },
                1: {
                    display: "none",
                    a: 2,
                },
            });
        });
        afterEach(() => {
            this.sceneItem = null;
        });
        it("should check 'setId' method", () => {
            // When
            this.sceneItem.setId(".a .b");

            // Given
            expect(this.sceneItem.options.id).to.be.equals(".a .b");
        });
        it("should check 'getNowFrame' method", () => {
            const sceneItem = this.sceneItem;

            expect(sceneItem.getNowFrame(0).get("display")).to.be.equals("block");
            expect(sceneItem.getNowFrame(0.5).get("display")).to.be.equals("block");
            expect(sceneItem.getNowFrame(0.5).get("a")).to.be.equals(1.5);
            expect(sceneItem.getNowFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'getFrame' method", () => {
            const sceneItem = this.sceneItem;

            expect(sceneItem.getFrame(0).get("display")).to.be.equals("block");
            expect(sceneItem.getFrame(0.5)).to.be.not.ok;
            expect(sceneItem.getFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'set' method", () => {
            const sceneItem = this.sceneItem;

            sceneItem.set(0.5, "a", 1);
            sceneItem.set(0.6, "transform", "a", 1);
            sceneItem.set(0.7, "b", "b");
            sceneItem.set(1, "display", "block");
            sceneItem.set(1, "c", 1);
            sceneItem.set(1, "d:1;e:2;f:a;transform:translate(10px, 20px);");
            expect(sceneItem.getFrame(0.5).get("a")).to.be.equals(1);
            expect(sceneItem.getFrame(0.6).get("transform", "a")).to.be.equals(1);
            expect(sceneItem.getFrame(0.7).get("b")).to.be.equals("b");
            expect(sceneItem.getFrame(1).get("display")).to.be.equals("block");
            expect(sceneItem.getFrame(1).get("a")).to.be.equals(2);
            expect(parseFloat(sceneItem.getFrame(1).get("d"))).to.be.equals(1);
        });
    });
    describe("test sceneItem events", function() {
        beforeEach(() => {
            this.sceneItem = new SceneItem({
                0: {
                    a: 1,
                    display: "block",
                },
                1: {
                    display: "none",
                    a: 2,
                },
            }, {
               iterationCount: 4, 
            });
        });
        afterEach(() => {
            this.sceneItem = null;
        });
        it("should check 'animate' event", done => {
            const sceneItem = this.sceneItem;

            sceneItem.on("animate", ({time, frame, currentTime}) => {
                console.log(time, currentTime);
                expect(time).to.be.equals(0.5);
                expect(currentTime).to.be.equals(1.5);
                expect(frame.get("a")).to.be.equals(1.5);
                expect(frame.get("display")).to.be.equals("block");
                done();
            });

            sceneItem.setTime(1.5);
        });   
    });
});