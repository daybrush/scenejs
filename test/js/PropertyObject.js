var PropertyObject = Scene.PropertyObject;

var obj1 = new PropertyObject([1,2,3]);
var obj2 = new PropertyObject([1,2,3], {
    separator: "@"
});
var obj3 = new PropertyObject([1,2,3], {
    separator: "$",
    prefix: "rgba(",
    suffix: ")"
});
var obj4 = new PropertyObject("1,2,3");
var obj5 = new PropertyObject("1@2@3", {
    separator: "@",
    prefix: "rgba(",
    suffix: ")"
});
QUnit.test("PropertyObject", function( assert ) {
    assert.equal(obj1.get(0), 1, "get test");
    assert.equal(obj4.get(0), "1", "get test");
    assert.equal(obj5.get(0), "1", "get test");
});

QUnit.test("PropertyObject join", function( assert ) {
    assert.equal(obj1.join(), "1,2,3", "join test");
    assert.equal(obj2.join(), "1@2@3", "join test");
    assert.equal(obj4.join(), "1,2,3", "join test"); 
});

QUnit.test("PropertyObject toValue", function( assert ) {
    assert.equal(obj2.toValue(), "1@2@3", "toValue test");
    assert.equal(obj3.toValue(), "rgba(1$2$3)", "toValue test");
    assert.equal(obj5.toValue(), "rgba(1@2@3)", "toValue test");    
});

QUnit.test("Copy PropertyObject", function( assert ) {
    assert.deepEqual(obj2, obj2.clone(), "copy test");
    assert.notEqual(obj2, obj2.clone(), "original and copy are not equal");
    assert.equal(obj2.toValue(), obj2.clone().toValue(), "original and copy are not equal");
});