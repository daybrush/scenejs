QUnit.test("load Scene", function( assert ) {    
    var scene1 = new Scene({
        item1: {
            0: {
                "hi" : 1,
                "hi2" : 2
            },
            1: {
                "hi": 3,
                "hi2": 5
            }
        },
        item2: {
            1: {
                "hi" : 3,
                "s" : 1
            },
            3: {
                "aa" : 1,
                "bb" : 2
            }
        },
        options: {
            delay: 2
        }
    });
    console.log(scene1);
    assert.ok(scene1.getItem("item1"), "load scene json");
    assert.equal(scene1.delay, 2, "load scene options");
    assert.equal(scene1.duration, 3, "caculate duration");
});