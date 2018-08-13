import {dotArray, dotColor, dotObject} from "../../../src/utils/dot";
import PropertyObject from "../../../src/PropertyObject";
import { stringToColorObject } from "../../../src/utils/property";
/* eslint-disable */

describe("utils/dot Test", function() {
    describe("test dot", function() {
        it("should check 'dotArray' method", () => {
			expect(dotArray([1, 2, 3], 2, 1, 1)).to.be.deep.equal([1, 2, 3]);
			expect(dotArray([1, 2, 3], "a", 1, 2)).to.be.deep.equal([1, 2, 3]);
			expect(dotArray([1, 2, 3], [2 ,3, 4], 1, 1)).to.be.deep.equal([1.5, 2.5, 3.5]);
			expect(dotArray([1, 2, 3, 4], [2, 3, 4], 0, 1)).to.be.deep.equal([1, 2, 3, 4]);
			expect(dotArray([1, 2, 3, 4], [2, 3, 4], 1, 0)).to.be.deep.equal([2, 3, 4]);
			expect(dotArray([1, 2, 3, 4], [2, 3, 4], 1, 1)).to.be.deep.equal([1.5, 2.5, 3.5, 4]);
		});
		it("should check 'dotColor' method(rgb vs rgb)", () => {
			const color1 = stringToColorObject("rgb(0, 0, 0)");
			const color2 = stringToColorObject("rgb(100, 200, 220)");
			const color3 = stringToColorObject("rgba(0, 0, 0, 0.5)");
			const color4 = stringToColorObject("rgba(100, 200, 220, 0.2)");
			const color5 = new PropertyObject([0, 0, 0], {
				model: "rgba",
				prefix: "rgba(",
				suffix: ")",
			});
			const color6 = new PropertyObject([50, 40, 20, 1], {
				model: "rgba",
				prefix: "rgba(",
				suffix: ")",
			});
			expect(dotColor(color1, color2, 1, 1).toValue()).to.be.equal("rgba(50,100,110,1)");
			expect(dotColor(color1, color3, 1, 1).toValue()).to.be.equal("rgba(0,0,0,0.75)");
			expect(dotColor(color2, color3, 1, 1).toValue()).to.be.equal("rgba(50,100,110,0.75)");
			expect(dotColor(color3, color4, 1, 1).toValue()).to.be.equal("rgba(50,100,110,0.35)");
			expect(dotColor(color3, color5, 1, 1).toValue()).to.be.equal("rgba(0,0,0,0.75)");
			expect(dotColor(color4, color5, 1, 1).toValue()).to.be.equal("rgba(50,100,110,0.6)");
			expect(dotColor(color4, color5, 1, 1).toValue()).to.be.equal("rgba(50,100,110,0.6)");
			expect(dotColor(color5, color6, 1, 1).toValue()).to.be.equal("rgba(25,20,10,1)");
			expect(dotColor(color4, color6, 1, 1).toValue()).to.be.equal("rgba(75,120,120,0.6)");
		});
		it(`should check 'dotObject' method`, () => {
			const color5 = new PropertyObject([0, 0, 0], {
				type: "color",
				model: "rgba",
				prefix: "rgba(",
				suffix: ")",
			});
			const color6 = new PropertyObject([50, 40, 20, 1], {
				type: "color",
				model: "rgba",
				prefix: "rgba(",
				suffix: ")",
			});
			const object = new PropertyObject([10, 10, 10]);
			const object2 = new PropertyObject([4, 3, 5, 1]);

			expect(dotObject(color5, color6, 1, 1).toValue()).to.be.equal("rgba(25,20,10,1)");
			expect(dotObject(object, color6, 1, 1).toValue()).to.be.equal("rgba(30,25,15)");
			expect(dotObject(object, object2, 1, 1).toValue()).to.be.equal("7,6.5,7.5");
		});
    });  
});