import { toFullHex, cutHex, hexToRGBA, hslToRGBA } from "@daybrush/utils";
import { rgbaToHexa } from "../../../src/utils";

describe("color Test", () => {
    describe("test color ", () => {
        it("should check 'cutHex'", () => {
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
        it("should check 'toFullHex'", () => {
            const hex = toFullHex("#abc");

            // Then
            expect(hex).to.be.equals("#aabbcc");
        });
        it("should check 'hexToRGBA'", () => {
            const rgb1 = hexToRGBA("#000000");
            const rgb2 = hexToRGBA("#ffffff");
            const rgb3 = hexToRGBA("#00000000");
            const rgb4 = hexToRGBA("#00000005");

            expect(rgb1).to.be.deep.equals([0, 0, 0, 1]);
            expect(rgb2).to.be.deep.equals([255, 255, 255, 1]);
            expect(rgb3).to.be.deep.equals([0, 0, 0, 0]);
            expect(rgb4).to.be.deep.equals([0, 0, 0, 5 / 255]);
        });
        it("should check 'hslToRGBA'", () => {
            // Given, When
            const rgb1 = hslToRGBA([0, 0.4, 0.5]);
            const rgb2 = hslToRGBA([80, 0.4, 0.5]);
            const rgb3 = hslToRGBA([150, 0.4, 0.5]);
            const rgb4 = hslToRGBA([215, 0.4, 0.5]);
            const rgb5 = hslToRGBA([260, 0.4, 0.5]);
            const rgb6 = hslToRGBA([320, 0.4, 0.5]);
            const rgb7 = hslToRGBA([320, 0.4, 0.5, 0.4]);
            const rgb8 = hslToRGBA([-40, 0.4, 0.5]);

            // Then
            expect(rgb1).to.be.deep.equals([179, 77, 77, 1]);
            expect(rgb2).to.be.deep.equals([145, 179, 77, 1]);
            expect(rgb3).to.be.deep.equals([77, 179, 128, 1]);
            expect(rgb4).to.be.deep.equals([77, 119, 179, 1]);
            expect(rgb5).to.be.deep.equals([110, 77, 179, 1]);
            expect(rgb6).to.be.deep.equals([179, 77, 145, 1]);
            expect(rgb7).to.be.deep.equals([179, 77, 145, 0.4]);
            expect(rgb8).to.be.deep.equals([179, 77, 145, 1]);
        });
        it("should check 'rgbaToHexa'", () => {
            // Given, When
            const rgba1 = rgbaToHexa(`rgba(179, 77, 77, 1)`);
            const rgba2 = rgbaToHexa(`rgba(145, 179, 77, 1)`);
            const rgba3 = rgbaToHexa(`rgba(77, 179, 128, 1)`);
            const rgba4 = rgbaToHexa(`rgba(77, 119, 179, 1)`);
            const rgba5 = rgbaToHexa(`rgba(110, 77, 179, 1)`);
            const rgba6 = rgbaToHexa(`rgba(179, 77, 145, 1)`);
            const rgba7 = rgbaToHexa(`rgba(179, 77, 145, 0.4)`);
            const rgba8 = rgbaToHexa(`rgba(179, 77, 145, 1)`);
            const rgba9 = rgbaToHexa(`transparent`);

            // Then
            expect(rgba1).to.be.equals("#b34d4dff");
            expect(rgba2).to.be.equals("#91b34dff");
            expect(rgba3).to.be.equals("#4db380ff");
            expect(rgba4).to.be.equals("#4d77b3ff");
            expect(rgba5).to.be.equals("#6e4db3ff");
            expect(rgba6).to.be.equals("#b34d91ff");
            expect(rgba7).to.be.equals("#b34d9166");
            expect(rgba8).to.be.equals("#b34d91ff");
            expect(rgba9).to.be.equals("");
        });
    });
});
