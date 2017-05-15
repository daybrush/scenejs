const timeline = new Scene.Timeline();
timeline.add(0, 1);
timeline.add(1, 2);
timeline.add(0.5, 3);
timeline.add(3, 7);
timeline.add(4, 5);
timeline.remove(3);

const step = timeline.step;

QUnit.test("Timline default function", function( assert ) {
    assert.equal(timeline.get(0), 1, "add, get same test");
    assert.equal(timeline.get(1), 2, "add, get same test");
    assert.equal(timeline.get(0.5), 3, "add, get same test");
    assert.ok(timeline.has(1), "has function");
    assert.notOk(timeline.has(3), "remove function");
});

/*
QUnit.test("Timline Step", function( assert ) {
    assert.equal(step.value(), 1, "step value test");// key : 0
    assert.equal(step.next().value(), 3, "step next value test"); // key : 0.5
    assert.equal(step.key(), 0.5, "step key test"); // key : 0.5
    assert.equal(step.next().next().prev().key(), 1, "step prev test"); // key : 1
    assert.equal(step.last().key(), 4, "step last test");
    assert.notOk(step.last().hasNext(), "step hasNext test");
    assert.ok(step.prev().hasNext(), "step hasNext test");
    assert.notOk(step.first().hasPrev(), "step first, hasPrev test"); // key : 0
    assert.ok(step.next().hasPrev(), "step hasPrev test"); // key : 0

});
*/
