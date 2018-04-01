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
        it("should check array item", function() {
            const item = new SceneItem([{
                a: 1,
            }]);
            const item2 = new SceneItem([
                {
                    a: 1,
                },
                {
                    a: 2,
                },
                {
                    a: 3,
                }
            ]);
            const item3 = new SceneItem([
                {
                    a: 1,
                },
                {
                    a: 2,
                },
                {
                    a: 3,
                }
            ], {
                duration: 2
            });

            expect(item.get(0, "a")).to.be.equals(1);
            expect(item.getDuration()).to.be.equals(0);

            expect(item2.get(0, "a")).to.be.equals(1);
            expect(item2.get(100, "a")).to.be.equals(3);
            expect(item2.get("0%", "a")).to.be.equals(1);
            expect(item2.get("50%", "a")).to.be.equals(2);
            expect(item2.get("100%", "a")).to.be.equals(3);
            expect(item2.get("from", "a")).to.be.equals(1);
            expect(item2.get("to", "a")).to.be.equals(3);
            expect(item2.getDuration()).to.be.equals(100);

            expect(item3.get(0, "a")).to.be.equals(1);
            expect(item3.get(1, "a")).to.be.equals(2);
            expect(item3.get(2, "a")).to.be.equals(3);
            expect(item2.get("from", "a")).to.be.equals(1);
            expect(item2.get("to", "a")).to.be.equals(3);
            expect(item3.getDuration()).to.be.equals(2);
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

            // Then
            expect(this.item.options.id).to.be.equals(".a .b");
        });
        it("should check 'getNowFrame' method", () => {
            const item = this.item;

            expect(item.getNowFrame(0).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'getNowFrame' method(getDuration < time <= duration)", () => {
            const item = this.item;

            item.state.duration = 2;
            expect(item.getDuration()).to.be.equals(2);
        });
        it("should check 'getFillFrame' method", () => {
            const item = this.item;

            item.set(3, "transform", "translate", "40px, 40px");
            item.set(3, "transform", "f", "40px 40px");
            // When
            const frame = item.getFillFrame(0);
            const frame2 = item.getFillFrame(1);

            // Then
            expect(frame.get("a")).to.be.equals(0);
            expect(frame2.get("a")).to.be.equals(1);
            expect(frame.get("display")).to.be.equals(0);
            expect(frame2.get("display")).to.be.equals(1);
            expect(frame.get("transform", "translate").toValue()).to.be.equals("0,0");
            expect(frame2.get("transform", "translate").toValue()).to.be.equals("1,1");
            expect(frame.get("transform", "f").toValue()).to.be.equals("0 0");
            expect(frame2.get("transform", "f").toValue()).to.be.equals("1 1");
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
            item.set([0.8, 1, 1.2, 1.4], "c", 1);
            item.set([0.8, 1, 1.2, 1.4], "g:1;h:5;transform:scale(5);");
            expect(item.getFrame(0.5).get("a")).to.be.equals(1);
            expect(item.getFrame(0.6).get("transform", "a")).to.be.equals(1);
            expect(item.getFrame(0.7).get("b")).to.be.equals("b");
            expect(item.getFrame(1).get("display")).to.be.equals("block");
            expect(item.getFrame(1).get("a")).to.be.equals(2);
            expect(parseFloat(item.getFrame(1).get("d"))).to.be.equals(1);
            [0.8, 1, 1.2, 1.4].forEach(time => {
                expect(item.getFrame(time).get("c")).to.be.equals(1);
                expect(item.getFrame(time).get("g")).to.be.equals("1");
                expect(item.getFrame(time).get("h")).to.be.equals("5");
            });
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
        it("should check 'from, to' method", () => {
            // Given
            // When
            this.item.setDuration(10);
            this.item.load({
                "from": {
                    a: 1,
                },
                "to": {
                    a: 2,
                }
            });
            // Then
            expect(this.item.getDuration()).to.be.equals(10);
            expect(this.item.get("from", "a")).to.be.equal(1);
            expect(this.item.get("to", "a")).to.be.equal(2);
            expect(this.item.get("50%", "a")).to.be.equal(1.5);
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