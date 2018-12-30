import {
    stringToColorObject, arrayToColorObject,
    toPropertyObject, splitStyle, toObject
} from "../../../src/utils/property";
import {splitSpace} from "@daybrush/utils";
import PropertyObject from "../../../src/PropertyObject";

/* eslint-disable */

describe("property Test", () => {
    describe("test color string", () => {
        it("should check rgb type", () => {
            const rgb1 = stringToColorObject("rgb(1, 2, 3)") as PropertyObject;
            const rgb2 = stringToColorObject("rgb( 1, 2, 3)") as PropertyObject;
            const rgb3 = stringToColorObject("rgb(1,2,3)") as PropertyObject;
            const rgb4 = stringToColorObject("rgb(1, 2, 3 )") as PropertyObject;
            const rgb5 = stringToColorObject("rgb( 1 , 2 , 3 )") as PropertyObject;

            expect(rgb1.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb2.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb3.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb4.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb5.toValue()).to.be.equal("rgba(1,2,3,1)");
        });
        it("should check hex type", () => {
            const rgb1 = stringToColorObject("#000") as PropertyObject;
            const rgb2 = stringToColorObject("#00ff00") as PropertyObject;
            const rgb3 = stringToColorObject("#00ff0033") as PropertyObject;

            expect(rgb1.toValue()).to.be.equal("rgba(0,0,0,1)");
            expect(rgb2.toValue()).to.be.equal("rgba(0,255,0,1)");
            expect(rgb3.toValue()).to.be.equal("rgba(0,255,0,0.2)");
        });
    });
    describe("test methods", () => {
        it ("should check 'splitSpace' method", () => {
            // Given
            // When
            const arr = splitSpace("a b c d e f g");
            const arr2 = splitSpace(" 'a,b' c 'd,e' f g ");
            const arr3 = splitSpace(" a    b    c  d ");
            const arr4 = splitSpace("");
            const arr5 = splitSpace("   ");
            const arr6 = splitSpace(" 1  2 ");

            expect(arr).to.be.deep.equals(["a", "b", "c", "d", "e", "f", "g"]);
            expect(arr2).to.be.deep.equals(["'a,b'", "c", "'d,e'", "f", "g"]);
            expect(arr3).to.be.deep.equals(["a", "b", "c", "d"]);
            expect(arr4).to.be.deep.equals([]);
            expect(arr5).to.be.deep.equals([]);
            expect(arr6).to.be.deep.equals(["1", "2"]);
        });
        it (`should check 'arrayToColorObject' method`, () => {
            // Given
            // When
            const arr = arrayToColorObject([0, 0, 0]);
            const arr2 = arrayToColorObject([0, 0, 0, 0.5]);

            expect(arr.toValue()).to.be.equals("rgba(0,0,0,1)");
            expect(arr.options.model).to.be.equals("rgba");
            expect(arr.options.type).to.be.equals("color");
            expect(arr2.toValue()).to.be.equals("rgba(0,0,0,0.5)");
            expect(arr2.options.model).to.be.equals("rgba");
            expect(arr2.options.type).to.be.equals("color");
        });
        it (`should check 'toPropertyObject' method`, () => {
            const obj = toPropertyObject([0, 0, 0]);
            const obj2 = stringToColorObject("hsl(0, 0.4, 0.5)") as PropertyObject;
            const obj3 = stringToColorObject("hsla(0, 40%, 50%, 0.4)") as PropertyObject;
            const obj4 = stringToColorObject("hsla(0, 40%, 50%, 0.4") as PropertyObject;

            expect(obj.toValue()).to.be.equals("0,0,0");
            expect(obj.options.type).to.be.equals("array");
            expect(obj2.toValue()).to.be.equals("rgba(179,77,77,1)");
            expect(obj3.toValue()).to.be.equals("rgba(179,77,77,0.4)");
            expect(obj4).to.be.equals("hsla(0, 40%, 50%, 0.4");
        });
        it (`should check 'toPropertyObject' method with Quotes`, () => {

            expect((toPropertyObject("'1'") as PropertyObject).toValue()).to.be.equals("'1'");
            expect((toPropertyObject("p('1')") as PropertyObject).toValue()).to.be.equals("p('1')");
        });
        it (`should check 'splitStyle' method`, () => {
            const obj = splitStyle(`a:1; b:2; c: 3;`);
            const obj2 = splitStyle(`a:1; b:2; c: a(1) b(2) d(3);`);
            const obj3 = splitStyle(`transform: translate(10px) rotate(10deg);`);

            expect(obj).to.be.deep.equals({styles: {a: "1", b: "2", c: "3"}, length: 3});
            expect((obj2.styles.c as PropertyObject).size()).to.be.equals(3);
            expect((obj2.styles.c as PropertyObject).toValue()).to.be.equals("a(1) b(2) d(3)");
            expect((obj3.styles.transform as PropertyObject).size()).to.be.equals(2);
            expect((obj3.styles.transform as PropertyObject).toValue()).to.be.equals("translate(10px) rotate(10deg)");
        });
        it (`should check 'toObject' method`, () => {
            const obj = toObject(toPropertyObject("a(1)") as PropertyObject);
            const obj2 = toObject(toPropertyObject("a(1,3)") as PropertyObject);
            const obj3 = toObject(toPropertyObject("a(1,3) b(1) c(3)") as PropertyObject);

            expect(obj.a).to.be.equals("1");
            expect(obj2.a.toValue()).to.be.equals("1,3");
            expect(obj3.a.toValue()).to.be.equals("1,3");
            expect(obj3.b).to.be.equals("1");
            expect(obj3.c).to.be.equals("3");

        });
    });
});
