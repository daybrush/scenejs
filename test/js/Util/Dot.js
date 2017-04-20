var Dot = Scene.Dot;
QUnit.test("test dot product", function( assert ) {
    assert.equal(Dot.dot(1, 5, 0.5, 0.5), 3, "test dot product 1:1");
    assert.equal(Dot.dot(0, 9, 3, 6), 3, "test dot product 1:2");
});


QUnit.test("test dot product object", function( assert ) {
    assert.deepEqual(Dot.dotArray([1,4, 6], [3, 4,10], 0.5, 0.5), [2,4,8], "test dot product array");
    
    
    var obj = new Scene.PropertyObject([1,4,5]);
    var obj2 = new Scene.PropertyObject([11,4,7]);
    var obj3 = "1";
    var obj4 = new Scene.PropertyObject([1,10, 1], {
        separator: "@",
        prefix: "hi(",
        suffix: ")"
    });
    var result1 = Dot.dotObject(obj, obj2, 0.5, 0.5);
    assert.deepEqual(Dot.dotObject(obj, obj2, 0.5, 0.5).value,[6,4,6], "test dot product PropertyObject");
    assert.deepEqual(Dot.dotObject(obj4, obj2, 0.5, 0.5).toValue(),"hi(6@7@4)", "test dot product PropertyObject");    
});


QUnit.test("test dot product color object", function( assert ) {
    assert.equal(Dot.dotColor("#000", "rgba(200, 200, 200, 1)", 1, 1).toValue(), "rgba(100,100,100,1)", "test dot proudct color text");
    assert.equal(Dot.dotColor("#000", "hsl(202, 70%, 17%)", 1, 1).toValue(), "rgba(6,25,37,1)", "test dot proudct color text");
        /*
            #0D3349
            HSL(202, 70%, 17%)
            RGB(13, 51, 73)
        */
});