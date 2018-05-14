import cubicBezier from "../../src/cubicBezier";

/* eslint-disable */

describe("cubic bezier Test", function() {
    describe("test cubic bezier ", function() {
		it("should check linear", ()=> {
			const bezier = cubicBezier(0, 0, 1, 1);
			
			for (let i = 0; i <= 1; i += 0.1) {
				expect(bezier(i)).to.be.closeTo(i, 0.01);
			}
        });
	});
});