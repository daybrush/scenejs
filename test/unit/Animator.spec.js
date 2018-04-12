import Animator from "../../src/Animator";
/* eslint-disable */


describe("Animator Test", function() {
	describe("test Animator initialize", function() {
		it ("should check Animator initialize", function() {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
			});

			animator.setDuration(5);

			expect(animator.getDirection()).to.be.equals("none");
			expect(animator.getFillMode()).to.be.equals("forwards");
			expect(animator.getDelay()).to.be.equals(1);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(16);
		});
		it ("should check setter, getter", function() {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});


			expect(animator.getEasing()).to.be.equals(0);
			expect(animator.getEasingName()).to.be.equals("linear");
			expect(animator.getPlaySpeed()).to.be.equals(1);
			expect(animator.getDirection()).to.be.equals("none");
			expect(animator.getFillMode()).to.be.equals("forwards");
			expect(animator.getDelay()).to.be.equals(1);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(16);


			expect(animator.setEasing([0,0,1,1]).getEasingName()).to.be.equals("cubic-bezier(0,0,1,1)");
			expect(animator.setPlaySpeed(2).getPlaySpeed()).to.be.equals(2);
			expect(animator.setDirection("reverse").getDirection()).to.be.equals("reverse");
			expect(animator.setFillMode("backwards").getFillMode()).to.be.equals("backwards");
			expect(animator.setDelay(2).getDelay()).to.be.equals(2);
			expect(animator.setIterationCount(2).getIterationCount()).to.be.equals(2);
			expect(animator.setDuration(4).getDuration()).to.be.equals(4);
			expect(animator.getActiveDuration()).to.be.equals(8);
			expect(animator.getTotalDuration()).to.be.equals(10);
		});
		it ("should check duration", function() {
			const animator = new Animator({
				iterationCount: 3,
				delay: 1,
				fillMode: "forwards",
				direction: "none",
				duration: 5,
			});

			expect(animator.getDelay()).to.be.equals(1);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(16);

			animator.setDelay(4);
			expect(animator.getIterationCount()).to.be.equals(3);
			expect(animator.getDelay()).to.be.equals(4);
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.equals(15);
			expect(animator.getTotalDuration()).to.be.equals(19);

			animator.setIterationCount("infinite");
			expect(animator.getIterationCount()).to.be.equals("infinite");
			expect(animator.getDuration()).to.be.equals(5);
			expect(animator.getActiveDuration()).to.be.not.finite;
			expect(animator.getTotalDuration()).to.be.not.finite;
		});
	});
});