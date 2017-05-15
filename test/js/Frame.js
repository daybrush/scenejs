var Frame = Scene.Frame;
Frame.addRole("property");
Frame.addRole("transform");
Frame.addRole("filter");


QUnit.test("Frame", function( assert ) {
    var frame = new Frame({
        "a" : 1,
        "b" : 2,
        "c" : 3,
        transform : {
            a : 4,
            b: 5
        }
    });

    frame.setTransform("c", 1);
    frame.removeProperty("c");

    assert.equal(frame.getProperty("a"), 1, "get property test");
    assert.equal(frame.getProperty("b"), 2, "get property test");
    assert.equal(frame.getTransform("a"), 4, "get transform test");
    assert.notOk(frame.getProperty("c"), "remove property test");
    assert.equal(frame.get("transform", "b"), 5, "get test");
    assert.equal(frame.get("transform", "c"), 1, "get test");
});


QUnit.test("split text in frame", function( assert ) {
    var frame = new Frame({
       "a" : "1, 2, 3" ,
        filter: "a(10) b(15)"
    });
    assert.equal(frame.getProperty("a").get(0), "1", "split text by comma");
    
    frame.setProperty("b", "a(5) c(5)");
    frame.setProperty("e(5) g(6)");
    assert.equal(frame.getProperty("b").get(0).get(0), 5,  "split text in brackets"); 
    assert.equal(frame.getProperty("e"), 5,  "split properties"); 
    assert.equal(frame.getProperty("g"), 6,  "split properties"); 
    
    assert.equal(frame.getFilter("a"), 10,  "split text in brackets"); 
    assert.equal(frame.getFilter("b"), 15,  "split text in brackets"); 
});


QUnit.test("test frame foramt", function( assert ) {
    var frame = new Frame({
       "a" : "1, 2, 3" ,
        filter: "a(10) b(15)"
    });
    assert.equal(frame.format("filter","$1($2)", " "), "a(10) b(15)", "test format");
});


QUnit.test("copy Frame", function( assert ) {
    var frame = new Frame({
        "a" : 1,
        "b" : 2,
        "c" : 3,
        transform : {
            a : 4,
            b: 5
        },
        filter: "a(10) b(15)"
    });
    
    var frame2 = new Frame();
    
    
    var frame3 = new Frame({
        "a" : 1,
        "b" : 2,
        "c" : 3,
        transform : {
            a : "b(10) a(10)",
            b: 5
        },
        filter: "a(10) b(15)"
    });
    
    frame2.merge(frame);
    assert.deepEqual(frame.properties, frame2.properties, "equal frame and frame2");
    assert.deepEqual(frame.properties, frame.clone().properties, "equal frame and copy");
    assert.deepEqual(frame3.properties, frame3.clone().properties, "copy PropertyObject");
});