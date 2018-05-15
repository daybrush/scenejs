import PropertyObject from "../../src/PropertyObject";
/* eslint-disable */


describe("PropertyObject Test", function() {
	describe("test PropertyObject initialize", function() {
		it ("should check PropertyObject initialize", () => {
			const obj = new PropertyObject("1,1,1");

			// When
			// Then
			expect(obj.get(0)).to.be.equals("1");
			expect(obj.get(1)).to.be.equals("1");
			expect(obj.get(2)).to.be.equals("1");
			expect(obj.toValue()).to.be.equals("1,1,1");
		});
		it ("should check set method", () => {
			const obj = new PropertyObject("1,1,1");

			// When
			obj.set(1, "2");
			obj.set(3, 3)
			// Then
			expect(obj.get(0)).to.be.equals("1");
			expect(obj.get(1)).to.be.equals("2");
			expect(obj.get(2)).to.be.equals("1");
			expect(obj.get(3)).to.be.equals(3);
			expect(obj.toValue()).to.be.equals("1,2,1,3");
		});
	});
});