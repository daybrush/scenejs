import Scene from "../../src/Scene";
/* eslint-disable */


describe("Scene Test", function() {
    describe("test Scene initialize", function() {
        it("should check default Scene", function() {
            const scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
				},
            });


			// Then
			expect(scene.getItem("item").get(0, "a")).to.be.equals(1);
			expect(scene.getDuration()).to.be.equals(1);
        });
	});
    describe("test Scene method", function() {
		it("should check 'newItem' method", function() {
			const scene = new Scene({
				"item": {},
            });

			// When
			const item2 = scene.newItem("item2");
			const duplicateItem2 = scene.newItem("item2");

			expect(item2).to.be.equal(duplicateItem2);
		});
        it("should check 'getDuration' method", function() {
            const scene = new Scene({
				"item": {},
            });

			const noItemDuration = scene.getDuration();

			// When
			scene.getItem("item").set(0, "opacity", 0);

			const duration = scene.getDuration();

			scene.getItem("item").set(1, "opacity", 1);

			const duration2 = scene.getDuration();

			scene.newItem("item2").set(3, "opacity", 2);

			const duration3 = scene.getDuration();

			// Then
			expect(noItemDuration).to.be.equals(0);
			expect(duration).to.be.equals(0);
			expect(duration2).to.be.equals(1);
			expect(duration3).to.be.equals(3);
        });
        it("should check 'setDuration' method", function() {
            const scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
					2: {
						display: "none",
						a: 4,
					}
				},
            });

			const duration = scene.getDuration();

			// When
			scene.setDuration(4);

			// Then
			expect(duration).to.be.equals(2);
			expect(scene.getDuration()).to.be.equals(4);
		});
        it("should check 'setDuration' method(item's duration is infinite)", function() {
            const scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
					2: {
						display: "none",
						a: 4,
					},
					options: {
						iterationCount: "infinite",
					}
				},
            });



			// When
			scene.setDuration(4);

			// Then
			expect(scene.getDuration()).to.be.not.finite;
        });
	});
	describe("test Scene events", function() {
        beforeEach(() => {
            this.scene = new Scene({
				"item": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
					2: {
						display: "none",
						a: 4,
					},
				},
				"item2": {
					0: {
						a: 1,
					},
					1: {
						display: "block",
						a: 2,
					},
				},
            });
        });
        afterEach(() => {
            this.scene = null;
        });
        it("should check 'animate' event", done => {
            const scene = this.scene;

			const items = {
				item: {

				},
				item2: {

				}
			};
            scene.on("animate", ({target, time, frame, currentTime}) => {
                items[target.getId()][parseInt(time, 10)] = true;
            });

			scene.setTime(0.5);


			expect(items.item[0]).to.be.true;
			expect(items.item2[0]).to.be.true;
			done();
        });   
    });
});
