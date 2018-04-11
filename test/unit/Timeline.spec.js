import Timeline from "../../src/Timeline";
/* eslint-disable */


describe("Timeline Test", function() {
	describe("test Timeline initialize", function() {
		it ("should check Timeline initialize", function() {
			const timeline = new Timeline();

			timeline.add(0, 1);
			expect(timeline.size()).to.be.equals(1);
			expect(timeline.get(0)).to.be.equals(1);
			expect(timeline.get(1)).not.ok;
		});
	});
});