import { splitUnit } from "@daybrush/utils";

describe("utils Test", () => {
    describe("test utils method", () => {
        it("should check 'splitUnit' method", () => {
            expect(splitUnit("1234")).to.be.deep.equals({ prefix: "", value: 1234, unit: "" });
            expect(splitUnit("d1234")).to.be.deep.equals({ prefix: "d", value: 1234, unit: "" });
            expect(splitUnit("d1234d")).to.be.deep.equals({ prefix: "d", value: 1234, unit: "d" });
            expect(splitUnit("ddddd")).to.be.deep.equals({ prefix: "", value: NaN, unit: "" });
        });
    });
});
