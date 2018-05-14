import {hex3to6, cutHex, hexToRGB, hslToRGB} from "../../../src/utils/color";

/* eslint-disable */

describe("color Test", function() {
    describe("test color ", function() {
		it("should check 'cutHex'", ()=> {
			const hex1 = cutHex("#abc");
			const hex2 = cutHex("#aabbcc");
			const hex3 = cutHex("#aabbccdd");
			const hex4 = cutHex("abcdef");


			// Then
			expect(hex1).to.be.equals("abc");
			expect(hex2).to.be.equals("aabbcc");
			expect(hex3).to.be.equals("aabbccdd");
			expect(hex4).to.be.equals("abcdef");
            
        });
        it("should check 'hex3to6'", ()=> {
            const hex = hex3to6("#abc");

			// Then
			expect(hex).to.be.equals("#aabbcc");
            
		});
		it("should check 'hexToRGB'", () => {
			const rgb1 = hexToRGB("#000000");
			const rgb2 = hexToRGB("#ffffff");
			const rgb3 = hexToRGB("#00000000");
			const rgb4 = hexToRGB("#00000005");


			expect(rgb1).to.be.deep.equals([0, 0, 0, 1]);
			expect(rgb2).to.be.deep.equals([255, 255, 255, 1]);
			expect(rgb3).to.be.deep.equals([0, 0, 0, 0]);
			expect(rgb4).to.be.deep.equals([0, 0, 0, 5 / 255]);
		});
		it("should check 'hslToRGB'", () => {
			// Given, When
			const rgb1 = hslToRGB([0, 0.4, 0.5]);
			const rgb2 = hslToRGB([80, 0.4, 0.5]);
			const rgb3 = hslToRGB([150, 0.4, 0.5]);
			const rgb4 = hslToRGB([215, 0.4, 0.5]);
			const rgb5 = hslToRGB([260, 0.4, 0.5]);
			const rgb6 = hslToRGB([320, 0.4, 0.5]);
			const rgb7 = hslToRGB([320, 0.4, 0.5, 0.4]);
			const rgb8 = hslToRGB([-40, 0.4, 0.5]);

			// Then
			expect(rgb1).to.be.deep.equals([179, 77, 77]);
			expect(rgb2).to.be.deep.equals([145, 179, 77]);
			expect(rgb3).to.be.deep.equals([77, 179, 128]);
			expect(rgb4).to.be.deep.equals([77, 119, 179]);
			expect(rgb5).to.be.deep.equals([110, 77, 179]);
			expect(rgb6).to.be.deep.equals([179, 77, 145]);
			expect(rgb7).to.be.deep.equals([179, 77, 145, 0.4]);
			expect(rgb8).to.be.deep.equals([179, 77, 145]);
		});
    });  
});