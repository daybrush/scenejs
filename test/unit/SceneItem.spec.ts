import SceneItem, { getEntries } from "../../src/SceneItem";
import { THRESHOLD } from "../../src/consts";
import { EASE_IN_OUT } from "../../src/easing";
import removeProperty from "./injections/ClassListInjection";
import { orderByASC, group, waitEvent } from "./TestHelper";
import { setRole, toFixed } from "../../src/utils";
import Animator from "../../src/Animator";
import * as sinon from "sinon";
import { isTemplateSpan } from "typescript";
import Scene from "../../src/Scene";
import { DirectionType } from "../../src/types";
import { Frame } from "../../src";

describe("SceneItem Test", () => {
    describe("test item initialize", () => {
        it("should check default item", () => {
            const item = new SceneItem({
                0: {
                    a: 1,
                },
                1: {
                    display: "block",
                    a: 2,
                },
            });
            item.mergeFrame(2, item.getFrame(0));

            expect(item.get(0, "a")).to.be.equals(1);
            expect(item.get(1, "display")).to.be.equals("block");
            expect(item.get(1, "a")).to.be.equals(2);
            expect(item.get(2, "a")).to.be.equals(1);
            expect(item.size()).to.be.equals(3);
        });
        it("should check array item", () => {
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
                },
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
                },
            ], {
                    duration: 2,
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
        it("should check array item", () => {
            const item = new SceneItem({ keyframes: { 0: { opacity: 0 }, 1: { opacity: 1 } } });

            expect(item.getDuration()).to.be.equals(1);
            expect(item.get(0, "opacity")).to.be.equals(0);
            expect(item.get(1, "opacity")).to.be.equals(1);
        });
        it("should check floating-point", () => {
            // Given, When
            const item = new SceneItem({
                [1 / 3]: "opacity: 0.5",
                [1 + 2]: "opacity: 1",
            });

            // Then
            expect(item.get(1 / 3, "opacity")).to.be.equals("0.5");
            expect(item.get(1 + 2, "opacity")).to.be.equals("1");
        });
        it("should check array property", () => {
            // Given, When
            const item = new SceneItem({
                opacity: [0, 1],
            });
            const item2 = new SceneItem({
                transform: {
                    translate: ["0px", "20px"],
                },
            });
            const item3 = new SceneItem({
                transform: [
                    "translate(0px)",
                    "translate(20px)",
                ],
            });

            // Then
            expect(item.getDuration()).to.be.equals(100);
            expect(item.get(0, "opacity")).to.be.equals(0);
            expect(item.get("100%", "opacity")).to.be.equals(1);

            expect(item2.get(0, "transform", "translate")).to.be.equals("0px");
            expect(item2.get("100%", "transform", "translate")).to.be.equals("20px");

            expect(item3.get(0, "transform", "translate")).to.be.equals("0px");
            expect(item3.get("100%", "transform", "translate")).to.be.equals("20px");
        });
        it("should check multiple time", () => {
            // Given, When
            const item = new SceneItem({
                "0, 1": {
                    opacity: 1,
                },
            });
            const item2 = new SceneItem();
            const item3 = new SceneItem();
            const item4 = new SceneItem();

            // When
            item2.set("0%, 100%", "opacity", 0.5);
            item3.set({
                "0, 1": new Frame().set({
                    opacity: 1,
                    transform: {
                        rotate: `100deg`,
                        scale: 1,
                    },
                }),
            });
            item4.set({
                "0, 0": new Frame().set({
                    opacity: 1,
                    transform: {
                        rotate: `100deg`,
                        scale: 1,
                    },
                }),
            });

            // Then
            expect(item.getDuration()).to.be.equals(1);
            expect(item.get(0, "opacity")).to.be.equals(1);
            expect(item.get(1, "opacity")).to.be.equals(1);

            expect(item2.getDuration()).to.be.equals(100);
            expect(item2.get("0%", "opacity")).to.be.equals(0.5);
            expect(item2.get("100%", "opacity")).to.be.equals(0.5);

            expect(item3.getDuration()).to.be.equals(1);
            expect(item3.get(0, "opacity")).to.be.equals(1);
            expect(item3.get(1, "opacity")).to.be.equals(1);

            expect(item4.get(0, "transform", "rotate")).to.be.equals("100deg");
        });
    });
    describe("test item method", () => {
        let item: SceneItem;

        beforeEach(() => {
            item = new SceneItem({
                0: {
                    a: 1,
                    display: "block",
                },
                0.5: {
                    a: 1.5,
                },
                1: {
                    display: "none",
                    a: 2,
                },
            });
        });
        afterEach(() => {
            item = null;
        });
        it("should check 'setId' method", () => {
            // When
            item.setId(".a .b");

            // Then
            expect(item.getId()).to.be.equals(".a .b");
        });
        it("should check 'get' method with transform", () => {
            // Given // When
            item.set(0, "transform", {});

            // Then
            expect(item.getFrame(0).has("transform")).to.be.equals(true);
            expect(item.get(0, "transform")).to.be.deep.equals({});
        });
        it("should check 'getNowFrame' method", () => {
            // Then
            expect(item.getNowFrame(0).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'getNowFrame' method with wrong easing", () => {
            ["easdasd", "easde(aa)"].forEach(easing => {
                // When
                item.setEasing(easing);
                // Then
                expect(item.getNowFrame(0).get("display")).to.be.equals("block");
                expect(item.getNowFrame(0.5).get("display")).to.be.equals("block");
                expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
                expect(item.getNowFrame(1).get("display")).to.be.equals("none");
            });
        });
        it("should check 'getNowFrame' method with easing", () => {
            // When
            item.setEasing("ease-out");

            // Then
            expect(item.getNowFrame(0.25).get("a")).to.be.not.equals(1.25);
            expect(item.getNowFrame(0).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'getNowFrame' method with steps(start) easing", () => {
            // When
            item.setEasing("steps(2, start)");

            // Then
            expect(item.getNowFrame(0).get("a")).to.be.equals(1);
            expect(item.getNowFrame(0.1).get("a")).to.be.equals(1.25);
            expect(item.getNowFrame(0.2).get("a")).to.be.equals(1.25);
            expect(item.getNowFrame(0.25).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(0.4).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
        });
        it("should check 'getNowFrame' method with steps(end) easing", () => {
            // When
            item.setEasing("steps(2, end)");

            // Then
            expect(item.getNowFrame(0).get("a")).to.be.equals(1);
            expect(item.getNowFrame(0.2).get("a")).to.be.equals(1);
            expect(item.getNowFrame(0.25).get("a")).to.be.equals(1.25);
            expect(item.getNowFrame(0.4).get("a")).to.be.equals(1.25);
            expect(item.getNowFrame(0.5).get("a")).to.be.equals(1.5);
        });
        it("should check 'getNowFrame(true)' method", () => {
            // When
            item.set(0, "transform", "translate(20px)");
            item.set(1, "transform", "scale(0)");
            item.set(2, "transform", "translate(40px)");

            // Then
            expect(item.getNowFrame(0, 0, true).get("display")).to.be.equals("block");
            expect(item.getNowFrame(0.5, 0, true).get("display")).to.be.not.ok;
            expect(item.getNowFrame(1, 0, true).get("display")).to.be.equals("none");

            expect(item.getNowFrame(0, 0, true).get("transform", "translate")).to.be.equals("20px");
            expect(item.getNowFrame(0.5, 0, true).get("transform", "translate")).to.be.not.ok;
            expect(item.getNowFrame(1, 0, true).get("transform", "translate")).to.be.equals("30px");
            expect(item.getNowFrame(2, 0, true).get("transform", "translate")).to.be.equals("40px");

            expect(item.getNowFrame(0, 0, true).get("transform", "scale")).to.be.equals("0");
            expect(item.getNowFrame(0.5, 0, true).get("transform", "scale")).to.be.not.ok;
            expect(item.getNowFrame(1, 0, true).get("transform", "scale")).to.be.equal("0");
            expect(item.getNowFrame(2, 0, true).get("transform", "scale")).to.be.equal("0");
        });
        it("should check 'getNowFrame' method (no 0%)", () => {
            item = new SceneItem({
                0.5: {
                    display: "none",
                    a: 1.5,
                    filter: { "hue-rotate": "0deg" },
                },
                1: {
                    display: "block",
                    a: 2,
                    filter: { "hue-rotate": "100deg" },
                },
                1.2: {

                },
            });

            expect(item.getNowFrame(0).get("display")).to.be.equals("none");
            expect(item.getNowFrame(0).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(0.4).get("display")).to.be.equals("none");
            expect(item.getNowFrame(0.4).get("a")).to.be.equals(1.5);
            expect(item.getNowFrame(0.6).get("display")).to.be.equals("none");
            expect(item.getNowFrame(0.75).get("filter", "hue-rotate")).to.be.equals("50deg");
            expect(item.getNowFrame(0.6).get("a")).to.be.equals(1.6);
            expect(item.getNowFrame(1).get("display")).to.be.equals("block");
            expect(item.getNowFrame(1).get("a")).to.be.equals(2);
        });
        it("should check 'getFrame' method", () => {
            expect(item.getFrame(0).get("display")).to.be.equals("block");
            expect(item.getFrame(0.7)).to.be.not.ok;
            expect(item.getFrame(1).get("display")).to.be.equals("none");
        });
        it("should check 'hasFrame' method", () => {
            expect(item.hasFrame("0")).to.be.true;
            expect(item.hasFrame("0.5")).to.be.true;
            expect(item.hasFrame("1")).to.be.true;
            expect(item.hasFrame("1.2")).to.be.false;
        });
        it("should check 'removeFrame' method", () => {
            expect(item.hasFrame("0")).to.be.true;
            expect(item.hasFrame("1")).to.be.true;
            item.removeFrame(0);
            expect(item.hasFrame("0")).to.be.false;
            expect(item.getDuration()).to.be.equals(1);
            item.removeFrame(1);
            expect(item.hasFrame("1")).to.be.false;
            expect(item.getDuration()).to.be.equals(0.5);
        });
        it("should check dot function", () => {
            let vari = 0;

            item = new SceneItem({
                0: {
                    a: "rgb(0, 0, 0)",
                    b: 0,
                    c: () => {
                        return vari;
                    },
                },
                1: {
                    a: () => {
                        return "rgb(200, 200, 200)";
                    },
                    b: () => {
                        return vari;
                    },
                    c: () => {
                        return vari + 2;
                    },
                },
            });
            [0, 0.2, 0.5, 0.7, 1].forEach((t, i) => {
                const frame = item.getNowFrame(t);
                if (t !== 1) {
                    expect(frame.get("a")).to.be.equals(`rgba(${200 * t},${200 * t},${200 * t},1)`);
                    expect(frame.get("b")).to.be.equals(i * t);
                } else {
                    expect(frame.get("a")).to.be.equals(`rgb(200, 200, 200)`);
                }
                expect(frame.get("c")).to.be.closeTo(i + 2 * t, 0.001);
                expect(frame.get("b")).to.be.equals(i * t);
                ++vari;
            });
        });
        it("should check 'set' method", () => {
            item.set(0.5, "a", 1);
            item.set(0.6, "transform", "a", 1);
            item.set(0.7, "b", "b");
            item.set(1, "display", "block");
            item.set(1, "c", 1);
            item.set(1, "d:1;e:2;f:a;transform:translate(10px, 20px);");
            [0.8, 1, 1.2, 1.4].forEach(time => item.set(time, "c", 1));
            [0.8, 1, 1.2, 1.4].forEach(time => item.set(time, "g:1;h:5;transform:scale(5);"));
            item.set({
                5: {
                    a: 1,
                    b: 2,
                },
                10: {
                    a: 4,
                    b: 5,
                },
            });
            item.set(12, [
                {
                    a: 1,
                    b: 2,
                },
                {
                    c: 1,
                    d: 2,
                },
            ]);
            expect(item.getFrame(0.5).get("a")).to.be.equals(1);
            expect(item.getFrame(0.6).get("transform", "a")).to.be.equals(1);
            expect(item.getFrame(0.7).get("b")).to.be.equals("b");
            expect(item.getFrame(1).get("display")).to.be.equals("block");
            expect(item.getFrame(1).get("a")).to.be.equals(2);
            expect(item.getFrame(5).get("a")).to.be.equals(1);
            expect(item.getFrame(5).get("b")).to.be.equals(2);
            expect(item.getFrame(10).get("a")).to.be.equals(4);
            expect(item.getFrame(10).get("b")).to.be.equals(5);
            expect(parseFloat(item.getFrame(1).get("d"))).to.be.equals(1);
            [0.8, 1, 1.2, 1.4].forEach(time => {
                expect(item.getFrame(time).get("c")).to.be.equals(1);
                expect(item.getFrame(time).get("g")).to.be.equals("1");
                expect(item.getFrame(time).get("h")).to.be.equals("5");
            });
            expect(item.getFrame(12).get("a")).to.be.equals(1);
            expect(item.getFrame(12).get("b")).to.be.equals(2);
            expect(item.getFrame(12).get("c")).to.be.equals(1);
            expect(item.getFrame(12).get("d")).to.be.equals(2);
        });
        it("should check 'remove' method", () => {
            // When
            item.remove(0, "a");

            // Then
            expect(item.get(0, "a")).to.be.not.equals(1);

        });
        it("should check 'getDuration' method", () => {
            // Given
            // When
            item.setDuration(10);
            // Then
            expect(item.getDuration()).to.be.equals(10);
            expect(item.getActiveDuration()).to.be.equals(10);
            expect(item.getTotalDuration()).to.be.equals(10);

            // When
            item.setDelay(5);
            // Then
            expect(item.getDuration()).to.be.equals(10);
            expect(item.getActiveDuration()).to.be.equals(10);
            expect(item.getTotalDuration()).to.be.equals(15);
        });
        it("should check 'setDuration' with no frame", () => {
            item = new SceneItem({});

            item.setDuration(0);

            expect(item.getDuration()).to.be.equals(0);
        });
        it("should check 'setDuration' option", () => {
            item = new SceneItem({
                "0%": {
                    transform: "translate(0px, 0px) rotate(0deg)",
                },
                "25%": {
                    transform: "translate(200px, 0px) rotate(90deg)",
                },
                "50%": {
                    transform: "translate(200px, 200px) rotate(180deg)",
                },
                "75%": {
                    transform: "translate(0px, 200px) rotate(270deg)",
                },
                "100%": {
                    transform: "translate(0px, 0px) rotate(360deg)",
                },
            }, {
                    duration: 3,
                });
            const item2 = new SceneItem({
                0: {
                    transform: "translate(0px, 0px) rotate(0deg)",
                },
                1: {
                    transform: "translate(200px, 0px) rotate(90deg)",
                },
                2: {
                    transform: "translate(200px, 200px) rotate(180deg)",
                },
                3: {
                    transform: "translate(0px, 200px) rotate(270deg)",
                },
                4: {
                    transform: "translate(0px, 0px) rotate(360deg)",
                },
            }, {
                    duration: 3,
                });
            expect(item.getDuration()).to.be.equals(3);
            expect(item2.getDuration()).to.be.equals(3);
        });
        it("should check 'getDuration' method with iterationCount", () => {
            // Given
            // When
            item.setDuration(10);
            item.setIterationCount(2);
            // Then
            expect(item.getDuration()).to.be.equals(10);
            expect(item.getActiveDuration()).to.be.equals(20);
            expect(item.getTotalDuration()).to.be.equals(20);

            // When
            item.setDelay(5);
            // Then
            expect(item.getDuration()).to.be.equals(10);
            expect(item.getActiveDuration()).to.be.equals(20);
            expect(item.getTotalDuration()).to.be.equals(25);

            // When
            item.setIterationCount("infinite");
            // Then
            expect(item.getDuration()).to.be.equals(10);
            expect(item.getActiveDuration()).to.be.equals(Infinity);
            expect(item.getTotalDuration()).to.be.equals(Infinity);
        });
        it("should check 'from, to' method", () => {
            // Given
            // When
            item.setDuration(10);
            item.load({
                from: {
                    a: 1,
                },
                to: {
                    a: 2,
                },
            });
            // Then
            expect(item.getDuration()).to.be.equals(10);
            expect(item.get("from", "a")).to.be.equal(1);
            expect(item.get("to", "a")).to.be.equal(2);
            expect(item.get("50%", "a")).to.be.equal(1.5);
        });
        it("should check 'clone' method", () => {
            // Given
            /*
            item = new SceneItem({
                0: {
                    a: 1,
                    display: "block",
                },
                0.5: {
                    a: 1.5,
                },
                1: {
                    display: "none",
                    a: 2,
                },
            });
            */
            const item1 = item.clone();

            // Then
            expect(item.getDuration()).to.be.equals(1);
            expect(item1.getDuration()).to.be.equals(1);
            expect(item.get("from", "a")).to.be.equal(1);
            expect(item.get("to", "a")).to.be.equal(2);
            expect(item.get("50%", "a")).to.be.equal(1.5);
            expect(item1.get("from", "a")).to.be.equal(1);
            expect(item1.get("to", "a")).to.be.equal(2);
            expect(item1.get("50%", "a")).to.be.equal(1.5);
            expect(item1.getNowFrame(0).get("a")).to.be.equal(1);
            expect(item1.getNowFrame(1).get("a")).to.be.equal(2);
            expect(item1.getNowFrame(0.5).get("a")).to.be.equal(1.5);
            expect(item1.getDelay()).to.be.equal(0);
            expect(item.constructor).to.be.equals(item1.constructor);
        });
        it(`should check 'mergeFrame' method`, () => {
            /*
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
            */
            // Given
            item.set(0.5, "b", 2);
            item.set(0.7, "c", 3);
            // When
            item.mergeFrame(1.5, item.getFrame(0.5));
            item.mergeFrame(1.5, item.getFrame(1));
            item.mergeFrame(1.5, item.getFrame(0.7));
            item.mergeFrame(1.5, item.getFrame(0.8));

            expect(item.getFrame(1.5).get("a")).to.be.deep.equals(2);
            expect(item.getFrame(1.5).get("b")).to.be.deep.equals(2);
            expect(item.getFrame(1.5).get("c")).to.be.deep.equals(3);
            expect(item.getFrame(1.5).get("display")).to.be.deep.equals("none");
        });
        it("should check no frame", () => {
            item = new SceneItem({});

            item.setTime(0);
            expect(item.getDuration()).to.be.equals(0);
            expect(item.getTime()).to.be.equals(0);
        });
    });
    describe("test item events", () => {
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

            item.on("animate", ({ time, frame, currentTime }) => {
                expect(time).to.be.equals(0.5);
                expect(currentTime).to.be.equals(1.5);
                expect(frame.get("a")).to.be.equals(1.5);
                expect(frame.get("display")).to.be.equals("block");
                done();
            });

            item.setTime(1.5);
        });
    });
    describe("test frame for CSS", () => {
        beforeEach(() => {
            this.element = document.createElement("div");
            this.item = new SceneItem({
                0: {
                    a: 1,
                },
                0.5: {
                    a: 3,
                },
                1: {
                    display: "block",
                    a: 2,
                },
            });
        });
        afterEach(() => {
            this.element = "";
            document.body.innerHTML = "";
        });
        it("should check 'setId' method (Element)", () => {
            // Given
            const element = document.createElement("div");

            this.item.elements = [element];
            // When

            this.item.setId(".a .b");

            // Then
            expect(this.item.state.id).to.be.equals(".a .b");
            expect(this.item.state.selector).to.be.equals(`[data-scene-id="ab"]`);
            expect(this.item.elements[0].getAttribute("data-scene-id")).to.be.equal("ab");
        });
        it("should check 'setSelector' method", () => {
            // Given
            document.body.appendChild(this.element);
            // When
            this.item.setSelector("div");

            // Then
            expect(this.item.state.selector).to.be.equals("div");
            expect(this.item.elements[0].getAttribute("data-scene-id")).to.be.not.ok;
        });
        it("should check 'setSelector' method(peusdo)", () => {
            // Given
            document.body.appendChild(this.element);
            // When
            this.item.setSelector("div:before");

            // Then
            expect(this.item.state.selector).to.be.equals("div:before");
            expect(this.item.elements[0].tagName).to.be.equals("DIV");
        });
        it("should check 'setElement' method", () => {
            // Given
            // When
            this.item.setElement(this.element);
            const id = this.item.elements[0].getAttribute("data-scene-id");
            // Then
            expect(this.item.state.id).to.be.equals(id);
            expect(this.item.state.selector).to.be.equals(`[data-scene-id="${id}"]`);
            expect(this.item.elements[0]).to.be.equals(this.element);
        });
        it("should check 'setElement' method  with 'attribute'", () => {
            // Given
            this.item.setElement(this.element);

            this.item.set(1, "attribute", "a", 1);
            // When
            this.item.setTime(1);

            // Then
            expect(this.item.elements[0].getAttribute("a")).to.be.equals("1");
        });
        it("should check 'setElement' method (already has id)", () => {
            // Given
            this.item.state.id = "id123";
            // When
            this.item.setElement(this.element);
            const id = this.item.elements[0].getAttribute("data-scene-id");
            // Then
            expect(this.item.state.id).to.be.equals(id);
            expect(this.item.state.id).to.be.equals("id123");
            expect(this.item.elements[0]).to.be.equals(this.element);
        });
        it("should check 'setElement' method (already has selector)", () => {
            // Given
            this.item.state.selector = "div";
            // When
            this.item.setElement(this.element);
            const id = this.item.elements[0].getAttribute("data-scene-id");
            // Then
            expect(id).to.be.not.ok;
            expect(this.item.state.selector).to.be.equals(`div`);
            expect(this.item.elements[0]).to.be.equals(this.element);
        });
        it("should check 'toKeyframes' method", () => {
            // Given
            // When
            // Then
            // console.log(this.item.toKeyframes());
        });
        it("should check 'toCSS' method", () => {
            // Given

            // When
            // Then
            // console.log(this.item.toCSS());
        });
        it(`should check toCSS method with no element`, () => {
            const scene = new SceneItem({
                0: {
                    width: "100px",
                    height: "100px",
                },
                0.1: {
                    width: "200px",
                    height: "200px",
                },
            }, {
                    selector: ".noelement",
                });

            // when
            const css = scene.toCSS();

            // then
            expect(css).to.be.have.string(".noelement.startAnimation");
            expect(css).to.be.have.string(".noelement.pauseAnimation");
            expect(css).to.be.have.string("width:200px;");
        });
        it("should check 'setCSS' method", () => {
            // Given
            this.element.style.width = "200px";
            this.element.style.border = "5px solid black";
            // When
            this.item.setCSS(0, ["width"]);
            const width = this.item.get(0, "width");
            this.item.setCSS(0, ["border"]);
            const border = this.item.get(0, "border");
            this.item.setCSS(0);

            document.body.appendChild(this.element);
            this.item.setElement(this.element);

            this.item.setCSS(0, ["width"]);
            const width2 = this.item.get(0, "width");
            this.item.setCSS(0, ["border"]);
            const border2 = this.item.get(0, "border");

            // Then
            expect(width).to.be.undefined;
            expect(border).to.be.undefined;
            expect(width2).to.be.equals("200px");
            expect(border2).to.be.equals("5px solid rgba(0,0,0,1)");
        });
        it("should check 'exportCSS' method", () => {
            // Given
            // When
            this.item.setElement(this.element);
            this.item.exportCSS();
            const id = this.item.getId().match(/[0-9a-zA-Z]+/g).join("");
            // Then

            expect(document.querySelector(`#__SCENEJS_STYLE_${id}`)).to.be.ok;
        });
        it(`should check role test`, () => {
            // Given
            setRole(["html"], true, true);
            setRole(["html2"], true, false);
            setRole(["html3"], false);

            // When
            this.item.set(0, "html", "a(1) b(2) c(3)");
            this.item.set(2, "html", "a(3) b(4) c(5)");
            this.item.set(0, "html2", "a(1) b(2) c(3)");
            this.item.set(2, "html2", "a(3) b(4) c(5)");
            this.item.set(0, "html3", "a(1) b(2) c(3)");
            this.item.set(2, "html3", "a(3) b(4) c(5)");

            // Then
            const frame = this.item.getNowFrame(1);

            expect(frame.get("html")).to.be.equals("a(1) b(2) c(3)");
            expect(frame.get("html2")).to.be.equals("a(2) b(3) c(4)");
            expect(frame.get("html3")).to.be.deep.equals({ a: 2, b: 3, c: 4 });
            expect(frame.get("html3", "a")).to.be.deep.equals(2);
            expect(frame.get("html3", "b")).to.be.deep.equals(3);
            expect(frame.get("html3", "c")).to.be.deep.equals(4);
        });
        it(`should check 'append' method`, () => {
            // 1 3 2
            this.item.append(new SceneItem({
                0: {
                    a: 3,
                },
                1: {
                    a: 5,
                },
            }, {
                    iterationCount: 1,
                }));
            this.item.append(new SceneItem({
                0: {
                    a: 4,
                },
                1: {
                    a: 6,
                },
            }, {
                    iterationCount: 2,
                    easing: EASE_IN_OUT,
                }));

            // Then
            expect(this.item.getDuration()).to.be.equals(3);
            expect(this.item.get(1, "a")).to.be.equals(2);
            expect(this.item.get(1 + THRESHOLD, "a")).to.be.equals(3);
            expect(this.item.get("1>", "a")).to.be.equals(3);
            expect(this.item.get(2, "a")).to.be.equals(5);

            expect(this.item.get(2 + THRESHOLD, "a")).to.be.equals(4);
            expect(this.item.get("2>", "a")).to.be.equals(4);
            expect(this.item.get(3, "a")).to.be.equals(6);
        });
        it(`should check 'prepend' method`, () => {
            this.item.prepend(new SceneItem({
                0: {
                    a: 3,
                },
                1: {
                    a: 5,
                },
            }, {
                    iterationCount: 1,
                }));
            this.item.prepend({
                0: {
                    a: 4,
                },
                1: {
                    a: 6,
                },
            });
            /*
            0: {
                a: 1,
                display: "block",
            },
            1: {
                display: "none",
                a: 2,
            },

            */
            // Then
            expect(this.item.getDuration()).to.be.equals(3);

            expect(this.item.get(0, "a")).to.be.equals(4);
            expect(this.item.get(1, "a")).to.be.equals(6);
            expect(this.item.get("1>", "a")).to.be.equals(3);
            expect(this.item.get(2, "a")).to.be.equals(5);

            expect(this.item.get(2 + THRESHOLD, "a")).to.be.equals(1);
            expect(this.item.get(3, "a")).to.be.equals(2);
        });
        function testEntries(...animators: Animator[]) {
            const states = animators.map(({ state }) => state);
            it(`should check 'getEntries' => ${
                states.map(({ direction, delay, iterationCount }) =>
                    `{delay:${delay}, direction:${direction}, iterationCount:${iterationCount}}`).join(",")
                }`, () => {
                    // Given
                    const entries = getEntries([0, 0.5, 1], states);
                    const item = animators[0];
                    const scene = animators[animators.length - 1];
                    const delay = scene.getDelay();

                    entries.forEach(([time, iterationTime], i) => {
                        const [prevTime] = entries[i - 1] || [-1, -1];
                        const [nextTime] = entries[i + 1] || [-1, -1];
                        const currentTime = time - delay;
                        // When
                        if (time === scene.getTotalDuration()) {
                            scene.setTime(currentTime - THRESHOLD);
                        } else if (time === prevTime) {
                            // 0
                            scene.setTime(currentTime + THRESHOLD);
                        } else if (time === nextTime) {
                            // duration
                            scene.setTime(currentTime - THRESHOLD);
                        } else {
                            scene.setTime(currentTime, true);
                        }

                        const animatorTime = item.getIterationTime();

                        // Then
                        expect(animatorTime).to.be.closeTo(iterationTime, 0.0001);
                    });
                });
        }
        describe(`should check 'getEntries' function`, () => {
            ["normal", "reverse", "alternate", "alternate-reverse"].forEach((direction: DirectionType) => {
                [0.3, 1, 1.3, 2, 2.3].forEach(iterationCount => {
                    const item1 = new SceneItem({
                        0: { a: 1 },
                        0.5: { a: 3 },
                        1: { a: 2 },
                    }, {
                            iterationCount, direction,
                            fillMode: "both",
                        });
                    const item2 = new SceneItem({
                        0: { a: 1 },
                        0.5: { a: 3 },
                        1: { a: 2 },
                    }, {
                            delay: 1, iterationCount, direction,
                            fillMode: "both",
                        });

                    // Then
                    testEntries(item1);
                    testEntries(item2);
                    ["normal", "reverse", "alternate", "alternate-reverse"].forEach((direction2: DirectionType) => {
                        [0.5, 1, 1.5, 2].forEach(iterationCount2 => {
                            // Given
                            const scene1 = new Scene({
                                item1,
                            }, {
                                    iterationCount: iterationCount2,
                                    direction: direction2,
                                    fillMode: "both",
                                });
                            const scene2 = new Scene({
                                item2,
                            }, {
                                    iterationCount: iterationCount2,
                                    direction: direction2,
                                    fillMode: "both",
                                });

                            // Then
                            testEntries(item1, scene1);
                            testEntries(item2, scene2);
                        });
                    });
                });
            });
        });
    });
    [true, false].forEach(hasClassList => {
        describe(`test SceneItem events(hasClassList = ${hasClassList})`, () => {
            let item: SceneItem;

            beforeEach(() => {
                this.element = document.createElement("div");
                !hasClassList && removeProperty(this.element, "classList");
                document.body.appendChild(this.element);

                item = new SceneItem({
                    0: {
                        a: 1,
                    },
                    0.1: {
                        a: 3,
                    },
                    0.2: {
                        display: "block",
                        a: 2,
                    },
                });
            });
            afterEach(() => {
                document.body.innerHTML = "";
                this.element = null;
                item.off();
                item = null;
            });
            it(`should check "playCSS" and event order `, async () => {
                // Given
                item.setElement(this.element);
                const play = sinon.spy();
                const ended = sinon.spy();
                const iteration = sinon.spy();
                const paused = sinon.spy();
                item.on("play", play);
                item.on("ended", ended);
                item.on("iteration", iteration);
                item.on("paused", paused);

                // When
                item.playCSS();
                item.playCSS();

                // Then
                expect(item.getPlayState()).to.be.equals("running");
                expect(item.state.playCSS).to.be.true;

                await waitEvent(item, "ended");
                expect(play.calledOnce).to.be.true;
                expect(iteration.calledOnce).to.be.false;
                expect(ended.calledOnce).to.be.true;
                expect(paused.calledOnce).to.be.true;
            });
            it(`should check "playCSS" and replay`, async () => {
                // Given
                item.setElement(this.element);
                const play = sinon.spy();
                const ended = sinon.spy();
                item.on("play", play);
                item.on("ended", ended);

                // When
                item.playCSS();
                await waitEvent(item, "ended");

                // replay
                item.playCSS();
                await waitEvent(item, "ended");

                // Then
                expect(play.callCount).to.be.equals(2);
                expect(ended.callCount).to.be.equals(2);
            });
            it(`should check "iteration" event `, done => {
                // Given
                item.setElement(this.element);
                const play = sinon.spy();
                const ended = sinon.spy();
                const iteration = sinon.spy();
                const paused = sinon.spy();
                item.on("play", play);
                item.on("ended", ended);
                item.on("iteration", iteration);
                item.on("paused", paused);

                // When
                item.setIterationCount(2);
                item.playCSS();

                item.on("ended", e => {
                    // Then
                    expect(play.calledOnce).to.be.true;
                    expect(iteration.calledOnce).to.be.true;
                    expect(ended.calledOnce).to.be.true;
                    expect(paused.calledOnce).to.be.true;
                    done();
                });
            });
            it(`should check "playCSS" and no elements `, () => {
                // Given
                // When
                item.playCSS();

                // Then
                expect(item.getPlayState()).to.be.equals("paused");
            });
        });
    });
    describe("test property", () => {
        let item!: SceneItem;
        let element!: HTMLElement;

        beforeEach(() => {
            element = document.createElement("div");
            document.body.appendChild(element);

            item = new SceneItem();

            item.setElement(element);
        });
        afterEach(() => {
            document.body.innerHTML = "";
            element = null;
            item.off();
            item = null;
        });
        it("test 'html' property", () => {
            // Given
            item.set(0, "html", "1");
            item.set(1, "html", "2");
            item.set(2, "html", "3");

            // When
            item.setTime(0);
            const html1 = element.innerHTML;
            item.setTime(0.5);
            const html2 = element.innerHTML;
            item.setTime(1);
            const html3 = element.innerHTML;
            item.setTime(2);
            const html4 = element.innerHTML;

            // then
            expect(html1).to.be.equals("1");
            expect(html2).to.be.equals("1");
            expect(html3).to.be.equals("2");
            expect(html4).to.be.equals("3");
        });
    });
});
