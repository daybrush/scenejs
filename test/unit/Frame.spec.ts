import Frame from "../../src/Frame";
import {setAlias} from "../../src/utils";

describe("Frame Test", () => {
    describe("test frame initialize", () => {
        it("should check default frame", () => {
            const frame = new Frame({
                a: 1,
                b: 2,
            });

            expect(frame.get("a")).to.be.equals(1);
            expect(frame.get("b")).to.be.equals(2);
        });
        it("should check default frame with deep object", () => {
            const frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2)",
                filter: {
                    brightness: "90%",
                },
            });

            expect(frame.get("transform", "scale")).to.be.equals("1,2");
            expect(frame.get("filter", "brightness")).to.be.equals("90%");
            expect(frame.get("a")).to.be.equals(1);
            expect(frame.get("b")).to.be.equals(2);
        });
        it("should check array", () => {
            const frame = new Frame({
                a: [1, 2, 3],
                b: {
                    c: [3, 4, 5],
                },
            });
            expect(frame.get("a")).to.deep.equals([1, 2, 3]);
            expect(frame.get("b", "c")).to.deep.equals([3, 4, 5]);
        });
    });
    describe("test frame method", () => {
        /** @type {Frame} */
        let frame = null;

        beforeEach(() => {
            frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2)",
                filter: {
                    brightness: "90%",
                },
            });
        });
        afterEach(() => {
            frame = null;
        });
        it("should check set method", () => {
            // Given
            // When
            frame.set("a", 10);
            // Then
            expect(frame.get("a")).to.be.equals(10);
        });
        it("should check set method with transform", () => {
            const frame2 = new Frame();

            frame2.set("transform: rotate(-90deg) scale(1, 0)");

            console.log("pro", frame2.properties);
            expect(frame2.get("transform", "rotate")).to.be.equals("-90deg");
        });
        it("should check set method", () => {
            // Given
            // When
            frame.set("a :2; b:3 ; c :1;transform:translate(10px, 20px) scale(10px); d: 1; e : 2;");
            frame.set("f", "path(1,4,3,2");
            // Then
            expect(parseFloat(frame.get("a"))).to.be.equals(2);
            expect(parseFloat(frame.get("b"))).to.be.equals(3);
            expect(parseFloat(frame.get("c"))).to.be.equals(1);
            expect(parseFloat(frame.get("d"))).to.be.equals(1);
            expect(parseFloat(frame.get("e"))).to.be.equals(2);
            expect(frame.get("transform", "translate")).to.be.equals("10px,20px");
            expect(frame.get("transform", "scale")).to.be.equals("10px");
            expect(frame.get("f")).to.be.equals("path(1,4,3,2");
        });
        it("sholud check clone method", () => {
            const frame2 = frame.clone();
            expect(frame2.properties).to.deep.equals(frame.properties);
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
            frame2.merge(frame);

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
            frame.remove("a");

            // Then
            expect(frame.get("a")).to.be.not.ok;
            expect(frame.get("transform", "scale")).to.be.ok;

            // When
            frame.remove("transform", "scale");
            // Then
            expect(frame.get("transform", "scale")).to.be.not.ok;

            // When
            frame.remove("transform");
            // Then
            expect(frame.get("transform", "scale")).to.be.not.ok;
            expect(frame.get("transform")).to.be.not.ok;
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
            frame.set("border-color", "1px solid rgb( 100 , 200 , 300)");
            const properties = frame.toObject();

            expect(properties).to.be.deep.equal({
                "a": 1,
                "b": 2,
                "border-color": "1px solid rgba(100,200,300,1)",
                "transform": {
                    scale: "1,2",
                },
                "filter": {
                    brightness: "90%",
                },
            });
        });

        it (`should check alias test`, () => {
            setAlias("tx", ["transform", "translateX"]);
            setAlias("ty", ["transform", "translateY"]);
            setAlias("tz", ["transform", "translateZ"]);
            frame.set("easing", 1);
            frame.set("tx", 2);
            frame.set("tz", 2);
            frame.remove("tz");

            expect(frame.has("easing")).to.be.true;
            expect(frame.has("animation-timing-function")).to.be.true;
            expect(frame.has("ease")).to.be.false;
            expect(frame.has("ty")).to.be.false;
            expect(frame.has("tz")).to.be.false;
            expect(frame.get("easing")).to.be.equals(1);
            expect(frame.get("animation-timing-function")).to.be.equals(1);
            expect(frame.get("tx")).to.be.equals(2);
            expect(frame.get("transform", "scale")).to.be.equals("1,2");
            expect(frame.get("transform", "translateX")).to.be.equals(2);
        });
    });
    describe("test frame for CSS", () => {
        let frame;

        beforeEach(() => {
            frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2) translateX(100px) translateY(200px)",
                filter: {
                    brightness: "90%",
                    grayscale: "40%",
                },
            });
        });
        it("should check 'toCSS' method", () => {
            const css = frame.toCSS().replace(/;(\S)/g, ";\n$1").split("\n");

            const result = `a:1;
b:2;
transform:scale(1,2) translateX(100px) translateY(200px);
filter:brightness(90%) grayscale(40%);`.split("\n");
            css.forEach((line, i) => {
                expect(line).to.be.deep.equal(result[i]);
            });
            expect(frame.toCSS()).to.be.deep.equal(result.join(""));
        });
        it("should check 'toCSS' method(multiple porperty)", () => {
            frame.set("transform", "scale2", "3, 4");
            frame.set("transform", "translateX2", "100px");
            const css = frame.toCSS();

            expect(css).to.have.string("scale(1,2) translateX(100px) translateY(200px) scale(3,4) translateX(100px)");
        });
    });
});
