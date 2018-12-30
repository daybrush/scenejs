import { bezier, STEP_START, STEP_END, steps } from "../../src/easing";

describe("cubic bezier Test", () => {
  describe("test easing ", () => {
    it("should check linear", () => {
      const curve = bezier(0, 0, 1, 1);

      for (let i = 0; i <= 1; i += 0.1) {
        expect(curve(i)).to.be.closeTo(i, 0.01);
      }
    });
    it("should check steps", () => {
      const steps4 = steps(4, "start");
      const steps4end = steps(4, "end");

      expect(STEP_START(0)).to.be.equals(1);
      expect(STEP_START(0.5)).to.be.equals(1);
      expect(STEP_START(1)).to.be.equals(1);
      expect(STEP_END(0)).to.be.equals(0);
      expect(STEP_END(0.5)).to.be.equals(0);
      expect(STEP_END(1)).to.be.equals(1);

      expect(steps4(0)).to.be.equals(0.25);
      expect(steps4(0.1)).to.be.equals(0.25);
      expect(steps4(0.25)).to.be.equals(0.5);
      expect(steps4(0.6)).to.be.equals(0.75);
      expect(steps4(0.9)).to.be.equals(1);
      expect(steps4(1)).to.be.equals(1);

      expect(steps4end(0)).to.be.equals(0);
      expect(steps4end(0.1)).to.be.equals(0);
      expect(steps4end(0.25)).to.be.equals(0.25);
      expect(steps4end(0.6)).to.be.equals(0.5);
      expect(steps4end(0.9)).to.be.equals(0.75);
      expect(steps4end(1)).to.be.equals(1);
    });
  });
});
