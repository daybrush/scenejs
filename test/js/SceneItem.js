var sceneItem = new SceneItem();
var frame0 = sceneItem.newFrame(0);
var frame1 = sceneItem.newFrame(1);
var frame05 = sceneItem.newFrame(0.5);

QUnit.test("SceneItem", function( assert ) {
   assert.equal(frame0, sceneItem.getFrame(0), "get frame test");
    assert.equal(frame1, sceneItem.getFrame(1), "get frame test");
    assert.equal(frame05, sceneItem.getFrame(0.5), "get frame test");
});
