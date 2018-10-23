/* eslint-disable */
import "./injections/PrefixInjection";
import {TRANSFORM, FILTER, ANIMATION, KEYFRAMES} from "@daybrush/utils";


describe("Prefix Test", function() {
	it("should check no standard property", function() {
		expect(TRANSFORM).to.be.equals("");
		expect(FILTER).to.be.equals("-webkit-filter");
		expect(ANIMATION).to.be.equals("-webkit-animation");
		expect(KEYFRAMES).to.be.equals("-webkit-keyframes");
	});
});