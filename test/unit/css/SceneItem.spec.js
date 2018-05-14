import SceneItem from "../../../src/css/SceneItem";
import {toId} from "../../../src/css/utils";
import {SCENE_ROLES} from "../../../src/consts";
/* eslint-disable */

SCENE_ROLES["transform"] = true;
SCENE_ROLES["filter"] = true;

describe("CSS Frame Test", function() {
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
        it("should check 'exportCSS' method", () => {
            // Given
            // When
            this.item.exportCSS();
            const id = toId(this.item.state.id);
            // Then
            
            expect(document.querySelector(`#__SCENEJS_STYLE_${id}`)).to.be.ok;
        });
    });
});