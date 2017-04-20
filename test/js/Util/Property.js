var text1 = toPropertyObject("123");
var text2 = toPropertyObject("123,123");
var text3 = toPropertyObject("123 a(123)");
var text4 = toPropertyObject("123 a(123)a b(123)");
var text5 = toPropertyObject("123 a(123 345) b(123, 123)a");
var text6 = toPropertyObject("#123456");
var text7 = toPropertyObject("123 a(b(10) c(10))bb");
var text8 = toPropertyObject("123 '123 45,12 a(1)' a \"123 a(1)\"");



QUnit.test("Util/Property", function( assert ) {
    assert.equal(text1, "123", "string test");
    assert.equal(text2.get(0), "123", "string test");
    assert.equal(text3.get(0), "123", "string test");
    assert.equal(text4.get(0), "123", "string test");
});
QUnit.test("split by comma", function(assert) {
   assert.deepEqual(splitComma("1,2"), ["1","2"], "splitComma default test");
   assert.deepEqual(splitComma("rgb(1),2"), ["rgb(1)","2"], "split by comma with one pair brackets");
   assert.deepEqual(splitComma("rgb(1),rgb(2)"), ["rgb(1)","rgb(2)"], "split by comma with two pair brackets");
});
QUnit.test("if text has Brackets, call toBracketObject function", function( assert ) {
    assert.equal(text3.get(1).get(0), "123", "test one pair brackets");
    assert.equal(text3.get(1).model, "a", "test model of one pair brackets");
    assert.equal(text4.get(1).toValue(), "a(123)a", "test two pair brackets");
    assert.equal(text4.get(1).suffix, ")a", "test suffix");
    assert.equal(text4.get(2).toValue(), "b(123)", "test second brackets");
    assert.equal(text5.get(1).toValue(), "a(123 345)", "test two pair brackets");
    assert.equal(text5.get(1).get(0), "123", "test two pair brackets");
    assert.equal(text5.get(1).get(1), "345", "test two pair brackets");
});
QUnit.test("test one level nesting", function( assert ) {
    assert.equal(text7.get(1).toValue(), "a(b(10) c(10))bb", "test one level nesting");
    assert.equal(text7.get(1).get(0).toValue(), "b(10)", "test one level nesting");
});
QUnit.test("If text has quotation marks, split this first", function( assert ) {
    assert.equal(text8.get(1), "'123 45,12 a(1)'", "test quotation marks");
    assert.equal(text8.get(2), "a", "test third text");
    assert.equal(text8.get(3), "\"123 a(1)\"", "test quotation marks");
    
});
