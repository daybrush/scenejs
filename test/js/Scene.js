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

QUnit.test("load Scene2", function( assert ) {    
    var scene1 = new Scene({
		"sun1" : {
			0 : {"transform" : "scale(0, 0)"},
			0.2 : {"border-width" : "100px"},
			0.4998 : {"display": "none"},
			0.5 : {"border-width" : "0px", "transform" : "scale(1, 1)"}
		},
		"sun2" : {
			0 : {"transform" : "scale(0, 0)", "border-width" : "100px"},
			0.2 : {"transform" : "scale(0, 0)"},
			0.45 : {"transform": "scale(0.9, 0.9)", "border-width": "0px"},
		}
	})
    console.log(scene1);
    assert.equal(scene1.getItem("sun1").getFrame(0).getTransform("scale").toValue(), "0,0", "load scene json");
});

