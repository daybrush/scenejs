import {stringToColorObject} from "../../../src/utils/property";

/* eslint-disable */

describe("property Test", function() {
    describe("test color string", function() {
        it("should check rgb type", ()=> {
            const rgb1 = stringToColorObject("rgb(1, 2, 3)");
            const rgb2 = stringToColorObject("rgb( 1, 2, 3)");
            const rgb3 = stringToColorObject("rgb(1,2,3)");
            const rgb4 = stringToColorObject("rgb(1, 2, 3 )");
            const rgb5 = stringToColorObject("rgb( 1 , 2 , 3 )");

            expect(rgb1.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb2.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb3.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb4.toValue()).to.be.equal("rgba(1,2,3,1)");
            expect(rgb5.toValue()).to.be.equal("rgba(1,2,3,1)");
        })
    });  
});