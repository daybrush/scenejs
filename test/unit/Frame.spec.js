import Frame from "../../src/Frame.ts";
import {setAlias} from "../../src/utils.ts";
/* eslint-disable */

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

            expect(frame.get("transform", "scale")).to.be.equals("1,2");
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
        it("should check set method with transform", () => {
            const frame = new Frame();
            frame.set("transform: rotate(-90deg) scale(1, 0)");

            expect(frame.get("transform", "rotate")).to.be.equals("-90deg");
        })
        it("should check set method", () => {
            // Given
            // When
            this.frame.set("a :2; b:3 ; c :1;transform:translate(10px, 20px) scale(10px); d: 1; e : 2;");
            this.frame.set("f", "path(1,4,3,2");
            // Then
            expect(parseFloat(this.frame.get("a"))).to.be.equals(2);
            expect(parseFloat(this.frame.get("b"))).to.be.equals(3);
            expect(parseFloat(this.frame.get("c"))).to.be.equals(1);
            expect(parseFloat(this.frame.get("d"))).to.be.equals(1);
            expect(parseFloat(this.frame.get("e"))).to.be.equals(2);
            expect(this.frame.get("transform", "translate")).to.be.equals("10px,20px");
            expect(this.frame.get("transform", "scale")).to.be.equals("10px");
            expect(this.frame.get("f")).to.be.equals("path(1,4,3,2");
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
            frame2.merge({});
            frame2.merge(this.frame);

            expect(frame2.get("a")).to.be.equals(1);
            expect(frame2.get("b")).to.be.equals(2);
            expect(frame2.get("c")).to.be.equals(5);
            expect(frame2.get("transform", "translate")).to.be.equals("10px,10px");
            expect(frame2.get("transform", "scale")).to.be.equals("1,2");
            expect(frame2.get("filter", "brightness")).to.be.equals("90%");
            expect(frame2.get("filter", "grayscale")).to.be.equals("50%");
        });
        it("sholud check remove method", () => {
            // Given, When
            this.frame.remove("a");
            
            //Then
            expect(this.frame.get("a")).to.be.not.ok;
            expect(this.frame.get("transform", "scale")).to.be.ok;

            // When
            this.frame.remove("transform", "scale");
            // Then
            expect(this.frame.get("transform", "scale")).to.be.not.ok;


            // When
            this.frame.remove("transform");
            // Then
            expect(this.frame.get("transform", "scale")).to.be.not.ok;
            expect(this.frame.get("transform")).to.be.not.ok;
        });
        it("sholud check 'toObject' method", () => {
            /*
               this.frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2)",
                filter: {
                    brightness: "90%",
                }
            })
            */
            // Given
            this.frame.set("border-color", "1px solid rgb( 100 , 200 , 300)");
            const properties = this.frame.toObject();

            expect(properties).to.be.deep.equal({
                a: 1,
                b: 2,
                "border-color": "1px solid rgba(100,200,300,1)",
                transform: {
                    scale: "1,2",
                },
                filter: {
                    brightness: "90%",
                }
            });
        });

        it (`should check alias test`, () => {
            setAlias("tx", ["transform", "translateX"]);
            setAlias("ty", ["transform", "translateY"]);
            setAlias("tz", ["transform", "translateZ"]);            
            this.frame.set("easing", 1);
            this.frame.set("tx", 2);
            this.frame.set("tz", 2);
            this.frame.remove("tz");

            expect(this.frame.has("easing")).to.be.true;
            expect(this.frame.has("animation-timing-function")).to.be.true;
            expect(this.frame.has("ease")).to.be.false;
            expect(this.frame.has("ty")).to.be.false;
            expect(this.frame.has("tz")).to.be.false;
            expect(this.frame.get("easing")).to.be.equals(1);
            expect(this.frame.get("animation-timing-function")).to.be.equals(1);
            expect(this.frame.get("tx")).to.be.equals(2);
            expect(this.frame.get("transform", "scale")).to.be.equals("1,2");
            expect(this.frame.get("transform", "translateX")).to.be.equals(2);
        });
    });
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
filter:brightness(90%) grayscale(40%);`.split("\n");
            
            css.forEach((line, i) => {
                expect(line).to.be.deep.equal(result[i]);
            });
            expect(this.frame.toCSS()).to.be.deep.equal(result.join(""));
        });
        it("should check 'toCSS' method(multiple porperty)", () => {
            this.frame.set("transform", "scale2", "3, 4");
            this.frame.set("transform", "translateX2", "100px");
            const css = this.frame.toCSS();

            expect(css).to.have.string("scale(1,2) translateX(100px) translateY(200px) scale(3,4) translateX(100px)");
        });
    });
});