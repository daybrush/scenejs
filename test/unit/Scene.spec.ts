import Scene from "../../src/Scene";
import { hasClass } from "@daybrush/utils";
import { START_ANIMATION, PAUSE_ANIMATION } from "../../src/consts";
import SceneItem from "../../src/SceneItem";
import * as sinon from "sinon";
/* eslint-disable */

describe("Scene Test", () => {
    describe("test Scene initialize", () => {
        it("should check default Scene", () => {
            const scene = new Scene({
                item: {
                    0: {
                        a: 1,
                    },
                    1: {
                        display: "block",
                        a: 2,
                    },
                },
            });

            // Then
            expect(scene.getItem<SceneItem>("item").get(0, "a")).to.be.equals(1);
            expect(scene.getDuration()).to.be.equals(1);
        });
    });
    describe("test Scene method", () => {
        it("should check 'newItem' method", () => {
            const scene = new Scene({
                item: {},
            });

            // When
            scene.newItem("item2");
            const duplicateItem2 = scene.newItem("item2");

            expect(duplicateItem2).to.be.not.ok;
        });
        it("should check 'getDuration' method", () => {
            const scene = new Scene({
                item: {},
            });

            const noItemDuration = scene.getDuration();

            // When
            scene.getItem("item").set(0, "opacity", 0);

            const duration = scene.getDuration();

            scene.getItem("item").set(1, "opacity", 1);

            const duration2 = scene.getDuration();

            scene.newItem("item2").set(3, "opacity", 2);

            const duration3 = scene.getDuration();

            // Then
            expect(noItemDuration).to.be.equals(0);
            expect(duration).to.be.equals(0);
            expect(duration2).to.be.equals(1);
            expect(duration3).to.be.equals(3);
        });
        it("should check 'setDuration' method", () => {
            const scene = new Scene({
                item: {
                    0: {
                        a: 1,
                    },
                    1: {
                        display: "block",
                        a: 2,
                    },
                    2: {
                        display: "none",
                        a: 4,
                    },
                },
            });

            const duration = scene.getDuration();

            // When
            scene.setDuration(4);

            // Then
            expect(duration).to.be.equals(2);
            expect(scene.getDuration()).to.be.equals(4);
        });
        it("should check 'setDuration' method(item's duration is infinite)", () => {
            const scene = new Scene({
                item: {
                    0: {
                        a: 1,
                    },
                    1: {
                        display: "block",
                        a: 2,
                    },
                    2: {
                        display: "none",
                        a: 4,
                    },
                    options: {
                        iterationCount: "infinite",
                    },
                },
            });

            // When
            scene.setDuration(4);

            // Then
            expect(isFinite(scene.getDuration())).to.be.not.ok;
        });
        it(`should check 'append' method`, () => {
            const scene = new Scene({
                item: {
                    0: {
                        a: 1,
                    },
                    1: {
                        display: "block",
                        a: 2,
                    },
                    2: {
                        display: "none",
                        a: 4,
                    },
                    options: {
                        iterationCount: 2,
                    },
                },
            });

            // When
            scene.append(new SceneItem({
                0: {
                    display: "none",
                },
                1: {
                    diplay: "block",
                },
            }, {
                    id: "item2",
                }));

            // Then
            expect(scene.getDuration()).to.be.equals(5);
            expect(scene.getItem("item2").getDuration()).to.be.equals(1);
        });
    });
    describe("test Scene events", () => {
        beforeEach(() => {
            this.scene = new Scene({
                item: {
                    0: {
                        a: 1,
                    },
                    1: {
                        display: "block",
                        a: 2,
                    },
                    2: {
                        display: "none",
                        a: 4,
                    },
                },
                item2: {
                    0: {
                        a: 1,
                    },
                    1: {
                        display: "block",
                        a: 2,
                    },
                },
            });
        });
        afterEach(() => {
            this.scene = null;
        });
        it(`should check forEach method`, () => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                ".test2": {
                    0: {
                        width: "200px",
                        height: "200px",
                    },
                    1: {
                        width: "100px",
                        height: "100px",
                    },
                },
            });
            const test = {};
            let test2 = {};

            scene.forEach((item, name, items) => {
                test[name] = item;
                test2 = items;
            });
            expect(test[".test"]).to.be.ok;
            expect(test[".test2"]).to.be.ok;
            expect(test[".test"].get(0, "width")).to.be.equals("100px");
            expect(test[".test2"].get(0, "width")).to.be.equals("200px");
            expect(test).to.be.deep.equals(test2);
        });
        it(`should check 'animate' event`, done => {
            // Given
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                ".test2": {
                    0: {
                        width: "200px",
                        height: "200px",
                    },
                    1: {
                        width: "100px",
                        height: "100px",
                    },
                },
            });
            scene.on("animate", e => {
                // Then
                expect(e.time).to.be.equals(0.25);
                expect(e.currentTime).to.be.equals(0.25);
                expect(e.frames[".test"].get("width")).to.be.equals("125px");
                expect(e.frames[".test2"].get("width")).to.be.equals("175px");
                done();
            });
            // When
            scene.setTime(0.25);
        });
    });
    describe(`test body's element`, () => {
        beforeEach(() => {
            document.body.innerHTML = `<div class="test test1"></div><div class="test test2"></div>
			<div class="testf testf1"></div><div class="testf testf2"></div>`;
        });
        afterEach(() => {
            document.body.innerHTML = "";
        });
        it(`should check Scene load`, () => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    1: {
                        width: "200px",
                        height: "200px",
                    },
                },
            }, {
                    selector: true,
                });

            expect(scene.getItem<SceneItem>(".test").elements.length).to.be.equals(2);
        });
        it(`should check Scene load with function`, () => {
            // Given, When
            const scene = new Scene({
                ".test": i => ({
                    0: {
                        width: `${i * 100}px`,
                        height: "100px",
                    },
                    1: {
                        width: "200px",
                        height: "200px",
                    },
                }),
            }, {
                    selector: true,
                }).playCSS();
            const item0 = scene.getItem<Scene>(".test").getItem<SceneItem>(0);
            const item1 = scene.getItem<Scene>(".test").getItem<SceneItem>(1);
            const item2 = scene.getItem(".test", 0);
            const item3 = scene.getItem(".test", 1);

            // Then
            expect(item0).to.be.equals(item2);
            expect(item1).to.be.equals(item3);
            expect(scene.getItem(".test") instanceof Scene).to.be.true;
            expect(item0.state.selector).to.be.equals(`[data-scene-id="${item0.state.id}"]`);
            expect(item1.state.selector).to.be.equals(`[data-scene-id="${item1.state.id}"]`);
            expect(item0.elements.length).to.be.equals(1);
            expect(item1.elements.length).to.be.equals(1);
            expect(item0.get(0, "width")).to.be.equals("0px");
            expect(item1.get(0, "width")).to.be.equals("100px");
        });
        it(`should check load options`, () => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                "options": {
                    selector: true,
                },
            });

            expect(scene.getItem<SceneItem>(".test").elements.length).to.be.equals(2);
        });
        it(`should check playCSS method`, done => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    0.1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                "options": {
                    selector: true,
                },
            });

            scene.playCSS();

            expect(hasClass(document.querySelector(".test1"), START_ANIMATION)).to.be.true;
            expect(hasClass(document.querySelector(".test2"), START_ANIMATION)).to.be.true;
            expect(scene.getPlayState()).to.be.equals("running");
            scene.on("ended", e => {
                expect(scene.getPlayState()).to.be.equals("paused");
                expect(scene.state.playCSS).to.be.false;
                done();
            });
        });
        it(`should check playCSS method with function`, done => {
            // Given
            const scene = new Scene({
                ".test": i => ({
                    0: {
                        width: `${i * 100}px`,
                        height: "100px",
                    },
                    0.1: {
                        width: "200px",
                        height: "200px",
                    },
                    options: {
                        iterationCount: "infinite",
                    },
                }),
                ".testf": {
                    0: {
                        width: "0px",
                    },
                    0.1: {
                        height: "1px",
                    },
                    options: {
                        // iterationCount: "infinite",
                    },
                },
            }, {
                    selector: true,
                });

            // When
            scene.playCSS();

            setTimeout(() => {
                // Then
                expect(scene.isEnded()).to.be.false;
                scene.finish();
                done();
            }, 300);

            // Then
        });
        it(`should check playCSS & pauseCSS method`, () => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    0.1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                "options": {
                    selector: true,
                },
            });

            // when
            scene.playCSS();
            scene.pause();

            // then
            expect(hasClass(document.querySelector(".test1"), START_ANIMATION)).to.be.true;
            expect(hasClass(document.querySelector(".test1"), PAUSE_ANIMATION)).to.be.true;
            expect(hasClass(document.querySelector(".test2"), START_ANIMATION)).to.be.true;
            expect(hasClass(document.querySelector(".test2"), PAUSE_ANIMATION)).to.be.true;
            expect(scene.getPlayState()).to.be.equals("paused");
            expect(scene.state.playCSS).to.be.true;

            scene.finish();
        });
        it(`should check toCSS method with no element`, () => {
            const scene = new Scene({
                ".noelement": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    0.1: {
                        width: "200px",
                        height: "200px",
                    },
                },
            }, {
                    selector: true,
                });

            // when
            const css = scene.toCSS();

            // then
            expect(css).to.be.have.string(".noelement.startAnimation");
            expect(css).to.be.have.string(".noelement.pauseAnimation");
            expect(css).to.be.have.string("width:200px;");
        });
        it(`should check playCSS & finish method`, () => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    0.1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                "options": {
                    selector: true,
                },
            });

            // when
            scene.playCSS();
            scene.finish();

            // then
            expect(hasClass(document.querySelector(".test1"), START_ANIMATION)).to.be.false;
            expect(hasClass(document.querySelector(".test1"), PAUSE_ANIMATION)).to.be.false;
            expect(hasClass(document.querySelector(".test2"), START_ANIMATION)).to.be.false;
            expect(hasClass(document.querySelector(".test2"), PAUSE_ANIMATION)).to.be.false;
            expect(scene.getPlayState()).to.be.equals("paused");
            expect(scene.state.playCSS).to.be.false;
        });
        it(`should check playCSS method with iteration count = 2`, done => {
            const scene = new Scene({
                ".test": {
                    0: {
                        width: "100px",
                        height: "100px",
                    },
                    0.1: {
                        width: "200px",
                        height: "200px",
                    },
                },
                "options": {
                    iterationCount: 2,
                    selector: true,
                },
            });
            scene.playCSS();

            expect(hasClass(document.querySelector(".test1"), START_ANIMATION)).to.be.true;
            expect(hasClass(document.querySelector(".test2"), START_ANIMATION)).to.be.true;
            expect(scene.getPlayState()).to.be.equals("running");
            expect(scene.state.playCSS).to.be.true;

            const spy = sinon.spy();

            scene.on("iteration", spy);
            scene.on("ended", e => {
                expect(spy.calledOnce).to.be.true;
                expect(scene.getPlayState()).to.be.equals("paused");
                expect(scene.state.playCSS).to.be.false;
                done();
            });
        });
    });
});
