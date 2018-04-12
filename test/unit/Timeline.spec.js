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
	describe("test Timeline methods", function() {
		beforeEach(() => {
			this.timeline = new Timeline();
		})
		afterEach(() => {
			this.timeline = null;
		});
		it("should check 'add, get, size, getLastTime' method", () => {
			const timeline = this.timeline;

			this.timeline.add(0, 1);
			expect(timeline.size()).to.be.equals(1);
			expect(timeline.get(0)).to.be.equals(1);
			expect(timeline.getLastTime()).to.be.equals(0);
			this.timeline.add(1, 4);
			expect(timeline.size()).to.be.equals(2);
			expect(timeline.get(1)).to.be.equals(4);
			expect(timeline.getLastTime()).to.be.equals(1);
			this.timeline.add(3, 5);
			expect(timeline.size()).to.be.equals(3);
			expect(timeline.get(3)).to.be.equals(5);
			expect(timeline.getLastTime()).to.be.equals(3);
			this.timeline.add(5, 3);
			expect(timeline.size()).to.be.equals(4);
			expect(timeline.get(5)).to.be.equals(3);
			expect(timeline.getLastTime()).to.be.equals(5);
			this.timeline.add(6, 2);
			expect(timeline.size()).to.be.equals(5);
			expect(timeline.get(6)).to.be.equals(2);
			expect(timeline.getLastTime()).to.be.equals(6);
		});
		it("should check 'remove' method", () => {
			const timeline = this.timeline;

			this.timeline.add(0, 1);
			expect(timeline.size()).to.be.equals(1);
			expect(timeline.get(0)).to.be.equals(1);
			this.timeline.add(1, 4);
			expect(timeline.size()).to.be.equals(2);
			expect(timeline.get(1)).to.be.equals(4);
			this.timeline.add(3, 5);
			expect(timeline.size()).to.be.equals(3);
			expect(timeline.get(3)).to.be.equals(5);
			this.timeline.add(5, 3);
			expect(timeline.size()).to.be.equals(4);
			expect(timeline.get(5)).to.be.equals(3);
			this.timeline.add(6, 2);
			expect(timeline.size()).to.be.equals(5);
			expect(timeline.get(6)).to.be.equals(2);


			expect(timeline.has(6)).to.be.true;

			this.timeline.remove(6);
			expect(timeline.get(6)).to.be.not.equals(2);
			expect(timeline.getLastTime()).to.be.equals(5);
			expect(timeline.size()).to.be.equals(4);
			expect(timeline.has(6)).to.be.false;

			this.timeline.remove(5);
			expect(timeline.get(5)).to.be.not.equals(3);
			expect(timeline.getLastTime()).to.be.equals(3);
			expect(timeline.size()).to.be.equals(3);
			expect(timeline.has(5)).to.be.false;

			this.timeline.remove(1);
			expect(timeline.get(1)).to.be.not.equals(4);
			expect(timeline.getLastTime()).to.be.equals(3);
			expect(timeline.size()).to.be.equals(2);
			expect(timeline.has(1)).to.be.false;
		});
	})
});