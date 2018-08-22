import * as utils from "../../src/utils";

/* eslint-disable */


describe("utils Test", function() {
    describe("test utils method", function() {
        it("should check 'splitUnit' method", function() {
			expect(utils.splitUnit("1234")).to.be.deep.equals({prefix: "", value: 1234, unit: ""});
			expect(utils.splitUnit("d1234")).to.be.deep.equals({prefix: "d", value: 1234, unit: ""});
			expect(utils.splitUnit("d1234d")).to.be.deep.equals({prefix: "d", value: 1234, unit: "d"});
			expect(utils.splitUnit("ddddd")).to.be.deep.equals({prefix: "", value: NaN, unit: ""});
        });
    });
});