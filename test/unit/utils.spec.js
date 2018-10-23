import {splitUnit} from "@daybrush/utils";

/* eslint-disable */


describe("utils Test", function() {
    describe("test utils method", function() {
        it("should check 'splitUnit' method", function() {
			expect(splitUnit("1234")).to.be.deep.equals({prefix: "", value: 1234, unit: ""});
			expect(splitUnit("d1234")).to.be.deep.equals({prefix: "d", value: 1234, unit: ""});
			expect(splitUnit("d1234d")).to.be.deep.equals({prefix: "d", value: 1234, unit: "d"});
			expect(splitUnit("ddddd")).to.be.deep.equals({prefix: "", value: NaN, unit: ""});
        });
    });
});