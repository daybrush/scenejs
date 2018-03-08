import SceneItem from "../../src/SceneItem";
import {SCENE_ROLES} from "../../src/consts";
/* eslint-disable */

SCENE_ROLES["transform"] = true;
SCENE_ROLES["filter"] = true;

describe("item Test", function() {
    describe("test item initialize", function() {
        it("should check default item", function() {
            const item = new SceneItem({
                0: {
                    a: 1,
                },
                1: {
                    display: "block",
                    a: 2,
                },
            });

            expect(item.get(0, "a")).to.be.equals(1);
            expect(item.get(1, "display")).to.be.equals("block");
        });
    });
    describe("test item method", function() {
        beforeEach(() => {
            this.item = new SceneItem({
                0: {
                    a: 1,
                    display: "block",
                },
                "0.5": {
                    a: 1.5,
                },
                1: {
                    display: "none",
                    a: 2,
                },
            });
        });
        afterEach(() => {
            this.item = null;
        });
        it("should check 'setId' method", () => {
            // When
            this.item.setId(".a .b");

            // Given
            expect(this.item.options.id).to.be.equals(".a .b");
        });
        it("should check 'getNowFrame' method", () => {
            const item = this.item;

            expect(item.getNowFrame(0).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'getFrame' method", () => {
            const item = this.item;

            expect(item.getFrame(0).get("display")).to.be.equals("block");
            expect(item.getFrame(0.7)).to.be.not.ok;
            expect(item.getFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'set' method", () => {
            const item = this.item;

            item.set(0.5, "a", 1);
            item.set(0.6, "transform", "a", 1);
            item.set(0.7, "b", "b");
            item.set(1, "display", "block");
            item.set(1, "c", 1);
            item.set(1, "d:1;e:2;f:a;transform:translate(10px, 20px);");
            expect(item.getFrame(0.5).get("a")).to.be.equals(1);
            expect(item.getFrame(0.6).get("transform", "a")).to.be.equals(1);
            expect(item.getFrame(0.7).get("b")).to.be.equals("b");
            expect(item.getFrame(1).get("display")).to.be.equals("block");
            expect(item.getFrame(1).get("a")).to.be.equals(2);
            expect(parseFloat(item.getFrame(1).get("d"))).to.be.equals(1);
        });
        it("should check 'getDuration' method", () => {
            // Given
            // When
            this.item.setDuration(10);
            // Then
            expect(this.item.getDuration()).to.be.equals(10);
            expect(this.item.getActiveDuration()).to.be.equals(10);
            expect(this.item.getTotalDuration()).to.be.equals(10);
            
            // When
            this.item.setDelay(5);
            // Then
            expect(this.item.getDuration()).to.be.equals(10);
            expect(this.item.getActiveDuration()).to.be.equals(10);
            expect(this.item.getTotalDuration()).to.be.equals(15);
        });
        it("should check 'getDuration' method with iterationCount", () => {
            // Given
            // When
            this.item.setDuration(10);
            this.item.setIterationCount(2);
            // Then
            expect(this.item.getDuration()).to.be.equals(10);
            expect(this.item.getActiveDuration()).to.be.equals(20);
            expect(this.item.getTotalDuration()).to.be.equals(20);

            // When
            this.item.setDelay(5);
            // Then
            expect(this.item.getDuration()).to.be.equals(10);
            expect(this.item.getActiveDuration()).to.be.equals(20);
            expect(this.item.getTotalDuration()).to.be.equals(25);

            // When
            this.item.setIterationCount("infinite");
            // Then
            expect(this.item.getDuration()).to.be.equals(10);
            expect(this.item.getActiveDuration()).to.be.equals(Infinity);
            expect(this.item.getTotalDuration()).to.be.equals(Infinity);
        });
    });
    describe("test item events", function() {
        beforeEach(() => {
            this.item = new SceneItem({
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
            this.item = null;
        });
        it("should check 'animate' event", done => {
            const item = this.item;

            item.on("animate", ({time, frame, currentTime}) => {
                expect(time).to.be.equals(0.5);
                expect(currentTime).to.be.equals(1.5);
                expect(frame.get("a")).to.be.equals(1.5);
                expect(frame.get("display")).to.be.equals("block");
                done();
            });

            item.setTime(1.5);
        });   
    });
});