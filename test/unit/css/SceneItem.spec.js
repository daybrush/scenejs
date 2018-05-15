import SceneItem from "../../../src/css/SceneItem";
import {toId} from "../../../src/css/utils";
import {SCENE_ROLES} from "../../../src/consts";
import removeProperty from "../injections/ClassListInjection";

/* eslint-disable */

SCENE_ROLES["transform"] = true;
SCENE_ROLES["filter"] = true;

describe("CSS Frame Test(", function() {
    describe("test frame for CSS", function() {
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
        })
        it("should check 'setId' method (Element)", () => {
            // Given
            const element = document.createElement("div");

            this.item._elements = [element];
            // When
            
            this.item.setId(".a .b");

           // Then
           expect(this.item.state.id).to.be.equals(".a .b");
           expect(this.item.options.selector).to.be.equals(`[data-scene-id="ab"]`);
           expect(this.item._elements[0].getAttribute("data-scene-id")).to.be.equal("ab");
        });
        it("should check 'setSelector' method", () => {
            // Given
            document.body.appendChild(this.element);
            // When
            this.item.setSelector("div");

            // Then
            expect(this.item.options.selector).to.be.equals("div");
            expect(this.item._elements[0].getAttribute("data-scene-id")).to.be.equals(this.item.state.id);
        });
        it("should check 'setElement' method", () => {
            // Given
            // When
            this.item.setElement(this.element);
            const id = this.item._elements[0].getAttribute("data-scene-id");
            // Then
            expect(this.item.state.id).to.be.equals(id);
            expect(this.item.options.selector).to.be.equals(`[data-scene-id="${id}"]`);
            expect(this.item._elements[0]).to.be.equals(this.element);
        });
        it("should check 'setElement' method (already has selector)", () => {
            // Given
            this.item.options.selector = "div";
            // When
            this.item.setElement(this.element);
            const id = this.item._elements[0].getAttribute("data-scene-id");
            // Then
            expect(this.item.state.id).to.be.equals(id);
            expect(this.item.options.selector).to.be.equals(`div`);
            expect(this.item._elements[0]).to.be.equals(this.element);
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
            expect(border2.toValue()).to.be.equals("5px solid rgba(0,0,0,1)");
        });
        it("should check 'exportCSS' method", () => {
            // Given
            // When
            this.item.exportCSS();
            const id = toId(this.item.state.id);
            // Then
            
            expect(document.querySelector(`#__SCENEJS_STYLE_${id}`)).to.be.ok;
        });
    });
    [true, false].forEach(hasClassList => {
        describe(`test SceneItem events(hasClassList = ${hasClassList})`, function() {
            beforeEach(() => {
                this.element = document.createElement("div");
                !hasClassList && removeProperty(this.element, "classList");
                document.body.appendChild(this.element);
                this.item = new SceneItem({
                    0: {
                        a: 1,
                    },
                    0.25: {
                        a: 3,
                    },
                    0.5: {
                        display: "block",
                        a: 2,
                    },
                });
            });
            afterEach(() => {
                document.body.innerHTML = "";
                this.element = null;
                this.item = null;
            });
            it (`should check "playCSS" and event order `, done => {
                // Given
                this.item.setElement(this.element);
                const play = sinon.spy();
                const ended = sinon.spy();
                const iteration = sinon.spy();
                const paused = sinon.spy();
                this.item.on("play", play);
                this.item.on("ended", ended);
                this.item.on("iteration", iteration);
                this.item.on("paused", paused);

                // When
                this.item.playCSS();
                this.item.playCSS();

                
                this.item.on("ended", e => {
                    // Then
                    expect(play.calledOnce).to.be.true;
                    expect(iteration.calledOnce).to.be.false;
                    expect(ended.calledOnce).to.be.true;
                    expect(paused.calledOnce).to.be.true;
                    done();
                });
            });
            it (`should check "playCSS" and replay`, done => {
                // Given
                this.item.setElement(this.element);
                const play = sinon.spy();
                const ended = sinon.spy();
                this.item.on("play", play);
                this.item.on("ended", ended);

                // When
                this.item.playCSS();

                
                this.item.on("ended", e => {
                    // Then
                    if (play.callCount === 1) {
                        this.item.playCSS();
                    } else {
                        expect(play.callCount).to.be.equals(2);
                        expect(ended.callCount).to.be.equals(2);
                        done();
                    }
                });
            });
            it (`should check "iteration" event `, done => {
                // Given
                this.item.setElement(this.element);
                const play = sinon.spy();
                const ended = sinon.spy();
                const iteration = sinon.spy();
                const paused = sinon.spy();
                this.item.on("play", play);
                this.item.on("ended", ended);
                this.item.on("iteration", iteration);
                this.item.on("paused", paused);

                // When
                this.item.setIterationCount(2);
                this.item.playCSS();

                
                this.item.on("ended", e => {
                    // Then
                    expect(play.calledOnce).to.be.true;
                    expect(iteration.calledOnce).to.be.true;
                    expect(ended.calledOnce).to.be.true;
                    expect(paused.calledOnce).to.be.true;
                    done();
                });
            });
            it (`should check "playCSS" and no elements `, () => {
                // Given
                // When
                this.item.playCSS();

                // Then
                expect(this.item.getPlayState()).to.be.equals("paused");
            });
        });
    });
});