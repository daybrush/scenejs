import {dotArray} from "../../../src/utils/dot";

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
		it("should check 'dotColor' method", () => {
			
		});
    });  
});