import Frame from "../../src/Frame";
import { setAlias, setRole } from "../../src/utils";
import { EASE_IN_OUT } from "../../src/easing";
import { TIMING_FUNCTION, EASING_NAME } from "../../src/consts";
import Scene from "../../src";

describe("Frame Test", () => {
    describe("test frame initialize", () => {
        it("should check default frame", () => {
            const frame = new Frame({
                a: 1,
                b: 2,
            });

            expect(frame!.get("a")).to.be.equals(1);
            expect(frame!.get("b")).to.be.equals(2);
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

            expect(frame!.get("transform", "scale")).to.be.equals("1,2");
            expect(frame!.get("filter", "brightness")).to.be.equals("90%");
            expect(frame!.get("a")).to.be.equals(1);
            expect(frame!.get("b")).to.be.equals(2);
        });
        it("should check incomplete bracket", () => {
            const frame = new Frame({
                "mask-image": {
                    prefix: "linear-gradient(",
                    suffix: ")",
                    model: "linear-gradient",
                    type: "",
                    separator: ",",
                    value: [
                        {
                            prefix: "",
                            suffix: "",
                            model: "",
                            type: "array",
                            separator: " ",
                            value: ["to", "left"]
                        },
                        {
                            prefix: "",
                            suffix: "",
                            model: "",
                            type: "array",
                            separator: " ",
                            value: ["transparent", "40%"]
                        },
                        {
                            prefix: "",
                            suffix: "",
                            model: "",
                            type: "array",
                            separator: " ",
                            value: ["black", "60%"]
                        }
                    ]
                }
            });

            // Then
            expect(frame.get("mask-image").suffix).to.be.equals(")");
        });
        it("should check array", () => {
            const frame = new Frame({
                a: [1, 2, 3],
                b: {
                    c: [3, 4, 5],
                },
            });
            expect(frame!.get("a")).to.deep.equals([1, 2, 3]);
            expect(frame!.get("b", "c")).to.deep.equals([3, 4, 5]);
        });
    });
    describe("test frame method", () => {
        let frame: Frame | null = null;

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
            frame!.set("a", 10);
            // Then
            expect(frame!.get("a")).to.be.equals(10);
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
            frame!.set("a :2; b:3 ; c :1;transform:translate(10px, 20px) scale(10px); d: 1; e : 2;");
            frame!.set("f", "path(1,4,3,2");
            // Then
            expect(parseFloat(frame!.get("a"))).to.be.equals(2);
            expect(parseFloat(frame!.get("b"))).to.be.equals(3);
            expect(parseFloat(frame!.get("c"))).to.be.equals(1);
            expect(parseFloat(frame!.get("d"))).to.be.equals(1);
            expect(parseFloat(frame!.get("e"))).to.be.equals(2);
            expect(frame!.get("transform", "translate")).to.be.equals("10px,20px");
            expect(frame!.get("transform", "scale")).to.be.equals("10px");
            expect(frame!.get("f")).to.be.equals("path(1,4,3,2");
        });
        it("sholud check clone method", () => {
            const frame2 = frame!.clone();
            expect(frame2.properties).to.deep.equals(frame!.properties);
        });
        it(`should check "setOrders" method`, () => {
            // Given
            frame!.set("transform:translate(10px, 20px) scale(10px);");
            const given1 = frame!.toCSS();

            // When
            frame!.setOrders(["transform"], ["translate", "scale"]);
            const given2 = frame!.toCSS();

            // Then
            expect(frame!.getOrders(["transform"])).to.be.deep.equals(["translate", "scale"]);
            expect(given1).to.have.string("scale(10px) translate(10px,20px)");
            expect(given2).to.have.string("translate(10px,20px) scale(10px)");
        });
        it(`should check "getKeys" method`, () => {
            // Given
            frame!.set("transform:translate(10px, 20px) scale(10px);");
            const keys1 = frame!.getKeys();
            const transformKeys1 = frame!.getKeys("transform");

            // When
            frame!.setOrders([], ["a", "transform", "b", "filter"]);
            frame!.setOrders(["transform"], ["translate", "scale"]);
            const keys2 = frame!.getKeys();
            const transformKeys2 = frame!.getKeys("transform");

            // Then
            expect(keys1).to.be.deep.equals(["a", "b", "transform", "filter"]);
            expect(keys2).to.be.deep.equals(["a", "transform", "b", "filter"]);
            expect(transformKeys1).to.be.deep.equals(["scale", "translate"]);
            expect(transformKeys2).to.be.deep.equals(["translate", "scale"]);
            // expect(given2).to.have.string("translate(10px,20px) scale(10px)");
        });
        it(`should check "gets" method`, () => {
            // Given
            frame!.set("transform:translate(10px, 20px) scale(10px);");
            const values1 = frame!.gets();
            const transformValues1 = frame!.gets("transform");

            // When
            frame!.setOrders([], ["a", "transform", "b", "filter"]);
            frame!.setOrders(["transform"], ["translate", "scale"]);
            const values2 = frame!.gets();
            const transformValues2 = frame!.gets("transform");

            // Then
            expect(values1.map(v => v.key)).to.be.deep.equals(["a", "b", "transform", "filter"]);
            expect(transformValues1.map(v => v.key)).to.be.deep.equals(["scale", "translate"]);
            expect(values1[2].children).to.be.deep.equals(transformValues1);

            expect(values2.map(v => v.key)).to.be.deep.equals(["a", "transform", "b", "filter"]);
            expect(transformValues2.map(v => v.key)).to.be.deep.equals(["translate", "scale"]);
            expect(values2[1].children).to.be.deep.equals(transformValues2);
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
            frame2.merge(frame!);

            expect(frame2.get("a")).to.be.equals(1);
            expect(frame2.get("b")).to.be.equals(2);
            expect(frame2.get("c")).to.be.equals(5);
            expect(frame2.get("transform", "translate")).to.be.equals("10px,10px");
            expect(frame2.get("transform", "scale")).to.be.equals("1,2");
            expect(frame2.get("filter", "brightness")).to.be.equals("90%");
            expect(frame2.get("filter", "grayscale")).to.be.equals("50%");
        });
        it("should check `set` method with no value", () => {
            // Given, When
            frame!.set(`text-shadow:5px 5px 5px;-webkit-mask-image:;filter:blur(6px);`);

            // Then
            expect(frame!.has("filter", "blur")).to.be.equals(true);
        });
        it("sholud check remove method", () => {
            // Given, When
            frame!.remove("a");

            // Then
            expect(frame!.get("a")).to.be.not.ok;
            expect(frame!.get("transform", "scale")).to.be.ok;

            // When
            frame!.remove("transform", "scale");
            // Then
            expect(frame!.get("transform", "scale")).to.be.not.ok;

            // When
            frame!.remove("transform");
            // Then
            expect(frame!.get("transform", "scale")).to.be.not.ok;
            expect(frame!.get("transform")).to.be.not.ok;
        });
        it(`should check get(ease-in-out) test1`, () => {
            frame!.set("easing", "ease-in-out");

            expect(typeof frame!.get("easing")).to.be.equals("function");
            expect(frame!.get("easing").easingName).to.be.equals("cubic-bezier(0.42,0,0.58,1)");
        });
        it(`should check get(cubic-bezier) test2`, () => {
            frame!.set("easing", "cubic-bezier(0.41,0,0.58,1)");

            expect(typeof frame!.get("easing")).to.be.equals("function");
            expect(frame!.get("easing").easingName).to.be.equals("cubic-bezier(0.41,0,0.58,1)");
        });
        it("should check # is color ? or id?", () => {
            // Given, When
            frame!.set("background", "url(#id)");
            frame!.set("background2", "#fff");
            frame!.set("filter", "url(#id)");

            expect(frame!.get("background")).to.be.equals("url(#id)");
            expect(frame!.get("filter", "url")).to.be.equals("#id");
            expect(frame!.get("background2")).to.be.equals("rgba(255,255,255,1)");
        });
        it("sholud check 'get(toObject)' method", () => {
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
            frame!.set("border-color", "1px solid rgb( 100 , 200 , 300)");
            const properties = frame!.get();

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

        it(`should check alias test`, () => {
            setAlias("tx", ["transform", "translateX"]);
            setAlias("ty", ["transform", "translateY"]);
            setAlias("tz", ["transform", "translateZ"]);
            frame!.set("easing", 1);
            frame!.set("tx", 2);
            frame!.set("tz", 2);
            frame!.remove("tz");

            expect(frame!.has("easing")).to.be.true;
            expect(frame!.has("animation-timing-function")).to.be.true;
            expect(frame!.has("ease")).to.be.false;
            expect(frame!.has("ty")).to.be.false;
            expect(frame!.has("tz")).to.be.false;
            expect(frame!.get("easing")).to.be.equals(1);
            expect(frame!.get("animation-timing-function")).to.be.equals(1);
            expect(frame!.get("tx")).to.be.equals(2);
            expect(frame!.get("transform", "scale")).to.be.equals("1,2");
            expect(frame!.get("transform", "translateX")).to.be.equals(2);
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
        it("should check 'toCSSObject' method", () => {
            frame = new Frame({
                a: 1,
                b: 2,
                transform: "scale(1, 2) translateX(100px) translateY(200px)",
                filter: {
                    brightness: "90%",
                    grayscale: "40%",
                },
                easing: EASE_IN_OUT,
            });
            const obj = frame!.toCSSObject();

            expect(obj.a).to.be.equals(1);
            expect(obj.b).to.be.equals(2);
            expect(obj.transform).to.be.equals("scale(1,2) translateX(100px) translateY(200px)");
            expect(obj.filter).to.be.equals("brightness(90%) grayscale(40%)");
            expect(obj[TIMING_FUNCTION]).to.be.equals(EASE_IN_OUT[EASING_NAME]);
        });
        it("should check 'toCSS' method", () => {
            const css = frame!.toCSS().replace(/;(\S)/g, ";\n$1").split("\n");

            const result = `a:1;
b:2;
transform:scale(1,2) translateX(100px) translateY(200px);
filter:brightness(90%) grayscale(40%);`.split("\n");
            css.forEach((line, i) => {
                expect(line).to.be.deep.equal(result[i]);
            });
            expect(frame!.toCSS()).to.be.deep.equal(result.join(""));
        });
        it("should check 'toCSS' method(multiple porperty)", () => {
            frame!.set("transform", "scale2", "3, 4");
            frame!.set("transform", "translateX2", "100px");
            const css = frame!.toCSS();

            expect(css).to.have.string("scale(1,2) translateX(100px) translateY(200px) scale(3,4) translateX(100px)");
        });
    });
    it("should check text is text when setRole", () => {
        // Given, When
        setRole(["text"], false, true);
        const frame = new Frame({
            text: "#Scene.js #Moveable",
        });

        // restore
        setRole(["text"], false, false);

        // Then
        expect(frame!.get("text")).to.be.equals("#Scene.js #Moveable");
        expect(frame!.raw("text")).to.be.equals("#Scene.js #Moveable");
    });
    it("should check semiclone, clone style", () => {
        // Given, When
        const frame = new Frame({
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "background-size": "cover",
            "background-image": 'url("https://a/a.jpg")',
            "background-img": "url(https://b/b.jpg)",
        });
        const frame2 = new Frame(`background-repeat: no-repeat;background-image: url("https://a/a.jpg");background-img: url(https://b/b.jpg)`);

        // Then
        expect(frame!.get("background-image")).to.be.equals(`url("https://a/a.jpg")`);
        expect(frame!.get("background-img")).to.be.equals(`url(https://b/b.jpg)`);
        expect(frame2.get("background-image")).to.be.equals(`url("https://a/a.jpg")`);
        expect(frame2.get("background-img")).to.be.equals(`url(https://b/b.jpg)`);
    });
});
