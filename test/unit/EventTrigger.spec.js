import EventTrigger from "../../src/EventTrigger";
/* eslint-disable */


describe("EventTrigger Test", function() {
	describe("test EventTrigger initialize", function() {
		it ("should check EventTrigger initialize", done => {
			// Given
			const event = new EventTrigger();

			event.on("a", e => {
				// Then
				expect(e.currentTarget).to.be.equals(event);
				expect(e.target).to.be.equals(event);
				expect(e.a).to.be.equals(1);
				expect(e.b).to.be.equals(2);

				done();
			});

			// When
			event.trigger("a", {
				a: 1,
				b: 2,
			});
		});
		it ("should check add event multiple", done => {
			// Given
			const event = new EventTrigger();

			// Then
			let a = false;
			event.on({
				"a": e => {
					expect(e.currentTarget).to.be.equals(event);
					expect(e.target).to.be.equals(event);
					expect(e.a).to.be.equals(1);
					expect(e.b).to.be.equals(2);
					a = true;
				},
				"b": e => {
					expect(e.currentTarget).to.be.equals(event);
					expect(e.target).to.be.equals(2);
					expect(e.a).to.be.equals(2);
					expect(e.b).to.be.equals(3);
					expect(a).to.be.true;
					done();
				},
			});

			// When
			event.trigger("a", {
				a: 1,
				b: 2,
			});
			event.trigger("b", {
				target: 2,
				a: 2,
				b: 3,
			});
		});
		it ("should check add event multiple array", () => {
			// Given
			const event = new EventTrigger();

			// Then
			const event1 = sinon.spy((e, target2) => {
				expect(e.currentTarget).to.be.equals(event);
				expect(e.target).to.be.equals(event);
				expect(e.a).to.be.equals(1);
				expect(e.b).to.be.equals(2);
				expect(target2).to.be.equals(3);
			});
			const event2 = sinon.spy((e, target2) => {
				expect(e.currentTarget).to.be.equals(event);
				expect(e.target).to.be.equals(event);
				expect(e.a).to.be.equals(1);
				expect(e.b).to.be.equals(2);
				expect(target2).to.be.equals(3);
			});
			event.on({
				"a": [event1, event2]
			});

			// When
			event.trigger("a", {
				a: 1,
				b: 2,
			}, 3);

			expect(event1.calledOnce).to.be.true;
			expect(event2.calledOnce).to.be.true;
		});
		it ("should check 'off' method", () => {
			const event = new EventTrigger();
			const a = sinon.spy();
			const b = sinon.spy();
			const c = sinon.spy();


			// Then
			expect(event._events).to.be.deep.equals({});

			// When
			event.on("a");
			event.off("a", a);
			// Then
			expect(event._events).to.be.deep.equals({a: []});

			// When
			event.off();
			event.off("a", a);
			// Then
			expect(event._events).to.be.deep.equals({});

			// When
			event.on({"a": [a, b], "b": c});
			// Then
			expect(event._events).to.be.deep.equals({"a":[a, b], "b": [c]});

			// When
			event.off("a", a);
			// Then
			expect(event._events).to.be.deep.equals({"a":[b], "b": [c]});
			
			// When
			event.off("a");
			// Then
			expect(event._events).to.be.deep.equals({"a":[], "b": [c]});

			// When
			event.off();
			// Then
			expect(event._events).to.be.deep.equals({});
		});
		it ("should check 'off' method multiple", () => {
			// Given
			const event = new EventTrigger();
			const a = sinon.spy();
			const b = sinon.spy();
			const c = sinon.spy();


			// When
			event.on({"a": [a, b], "b": c});
			
			event.off("a", a);
			event.trigger("a");
			event.trigger("b");
			
			event.on("a", a);
			event.off("a");
			event.trigger("a");
			event.trigger("b");
			
			event.on("a", [a, b]);
			event.off();
			event.trigger("a");
			event.trigger("b");

			// Then
			expect(a.callCount).to.be.equals(0);
			expect(b.callCount).to.be.equals(1);
			expect(c.callCount).to.be.equals(2);
		});
	});
});