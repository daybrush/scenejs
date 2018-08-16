import Keyframes from "../../src/Keyframes";
/* eslint-disable */


describe("Keyframes Test", function() {
	describe("test Keyframes initialize", function() {
		it ("should check Keyframes initialize", function() {
			const keyframes = new Keyframes();

			keyframes.add(0, 1);
			expect(keyframes.size()).to.be.equals(1);
			expect(keyframes.get(0)).to.be.equals(1);
			expect(keyframes.get(1)).not.ok;
		});
	});
	describe("test Keyframes methods", function() {
		beforeEach(() => {
			this.keyframes = new Keyframes();
		})
		afterEach(() => {
			this.keyframes = null;
		});
		it("should check 'add, get, size, getLastTime' method", () => {
			const keyframes = this.keyframes;

			this.keyframes.add(0, 1);
			expect(keyframes.size()).to.be.equals(1);
			expect(keyframes.get(0)).to.be.equals(1);
			expect(keyframes.getDuration()).to.be.equals(0);
			this.keyframes.add(1, 4);
			expect(keyframes.size()).to.be.equals(2);
			expect(keyframes.get(1)).to.be.equals(4);
			expect(keyframes.getDuration()).to.be.equals(1);
			this.keyframes.add(3, 5);
			expect(keyframes.size()).to.be.equals(3);
			expect(keyframes.get(3)).to.be.equals(5);
			expect(keyframes.getDuration()).to.be.equals(3);
			this.keyframes.add(5, 3);
			expect(keyframes.size()).to.be.equals(4);
			expect(keyframes.get(5)).to.be.equals(3);
			expect(keyframes.getDuration()).to.be.equals(5);
			this.keyframes.add(6, 2);
			expect(keyframes.size()).to.be.equals(5);
			expect(keyframes.get(6)).to.be.equals(2);
			expect(keyframes.getDuration()).to.be.equals(6);
		});
		it("should check 'getNames' method", () => {
			const keyframes = new Keyframes();

			keyframes.names = {
				a: true,
				b: true,
				c: {
					d: true,
					e: true,
				},
				f: {
					g: true,
					h: true,
				}
			}
			expect(keyframes.getNames()).to.be.deep.equals([['a'], ['b'], ['c', 'd'], ['c', 'e'], ['f', 'g'], ['f', 'h']]);
		});
		it("should check 'hasName' method", () => {
			const keyframes = new Keyframes();

			keyframes.names = {
				a: true,
				b: true,
				c: {
					d: true,
					e: true,
				},
				f: {
					g: true,
					h: true,
				}
			}
			expect(keyframes.hasName("a")).to.be.true;
			expect(keyframes.hasName("b")).to.be.true;
			expect(keyframes.hasName("c")).to.be.true;
			expect(keyframes.hasName("c", "d")).to.be.true;
			expect(keyframes.hasName("c", "e")).to.be.true;
			expect(keyframes.hasName("f")).to.be.true;
			expect(keyframes.hasName("f", "g")).to.be.true;
			expect(keyframes.hasName("f", "h")).to.be.true;
			expect(keyframes.hasName("a", "b")).to.be.false;
			expect(keyframes.hasName("b")).to.be.true;
			expect(keyframes.hasName("f", "g", "h")).to.be.false;
		});
		it ("should check 'unshift' method", () => {
			const keyframes = new Keyframes();
			keyframes.add(0, 1);
			keyframes.add(1, 2);
			keyframes.add(2, 3);
			keyframes.unshift(3);

			// Then
			expect(keyframes.getDuration()).to.be.equals(5);
			expect(keyframes.get(3)).to.be.equals(1);
			expect(keyframes.get(4)).to.be.equals(2);
			expect(keyframes.get(5)).to.be.equals(3);
			
		});
		it("should check 'remove' method", () => {
			const keyframes = this.keyframes;

			this.keyframes.add(0, 1);
			expect(keyframes.size()).to.be.equals(1);
			expect(keyframes.get(0)).to.be.equals(1);
			this.keyframes.add(1, 4);
			expect(keyframes.size()).to.be.equals(2);
			expect(keyframes.get(1)).to.be.equals(4);
			this.keyframes.add(3, 5);
			expect(keyframes.size()).to.be.equals(3);
			expect(keyframes.get(3)).to.be.equals(5);
			this.keyframes.add(5, 3);
			expect(keyframes.size()).to.be.equals(4);
			expect(keyframes.get(5)).to.be.equals(3);
			this.keyframes.add(6, 2);
			expect(keyframes.size()).to.be.equals(5);
			expect(keyframes.get(6)).to.be.equals(2);


			expect(keyframes.has(6)).to.be.true;

			this.keyframes.remove(6);
			expect(keyframes.get(6)).to.be.not.equals(2);
			expect(keyframes.getDuration()).to.be.equals(5);
			expect(keyframes.size()).to.be.equals(4);
			expect(keyframes.has(6)).to.be.false;

			this.keyframes.remove(5);
			expect(keyframes.get(5)).to.be.not.equals(3);
			expect(keyframes.getDuration()).to.be.equals(3);
			expect(keyframes.size()).to.be.equals(3);
			expect(keyframes.has(5)).to.be.false;

			this.keyframes.remove(1);
			expect(keyframes.get(1)).to.be.not.equals(4);
			expect(keyframes.getDuration()).to.be.equals(3);
			expect(keyframes.size()).to.be.equals(2);
			expect(keyframes.has(1)).to.be.false;
		});
	})
});