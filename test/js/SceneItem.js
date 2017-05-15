var SceneItem = Scene.SceneItem;
SceneItem.addRole("transform");
SceneItem.addRole("filter");


var item = new SceneItem();
var frame0 = item.newFrame(0);
var frame1 = item.newFrame(1);
var frame05 = item.newFrame(0.5);


item.setProperty(0, "hi", 10);
item.setProperty(4, "hi", 14);
item.setProperty(5, "hi2", 10);


QUnit.test("item", function( assert ) {
   assert.equal(frame0, item.getFrame(0), "get frame test");
    assert.equal(frame1, item.getFrame(1), "get frame test");
    assert.equal(frame05, item.getFrame(0.5), "get frame test");
});

QUnit.test("item Role", function( assert ) {
    assert.equal(item.getProperty(0, "hi"), 10, "get property role test // time : 0");
    
    assert.equal(item.getProperty(5, "hi2"), 10, "get property role test // time : 5");
    assert.equal(item.setProperty(10, "hi2", "10").getProperty(10, "hi2"), "10", "dry property role test // time : 10");
});

QUnit.test("item FrameTimeline", function( assert ) {
    item.update();
    var timeline = item.timeline;
    
    assert.ok(timeline.names["property"]["hi"], "update names");
    assert.ok(timeline.names["property"]["hi2"], "update names");
});
QUnit.test("item dot product frames", function( assert ) {    
    assert.equal(item.getNowFrame(0).getProperty("hi"), 10,  "test getNowFrame");
    assert.equal(item.getNowFrame(2).getProperty("hi"), 12,  "test getNowFrame");
    assert.equal(item.getNowFrame(4).getProperty("hi"), 14,  "test getNowFrame");
});

QUnit.test("load item", function( assert ) {    
    var item1 = new SceneItem({
       0: {
           hi: "1",
           transform: "1(2) s(20)"
       } 
    });
    assert.equal(item1.getProperty(0, "hi"), 1, "load item");
    assert.equal(item1.getTransform(0, "1"), 2, "load item");
    
    var item2 = new SceneItem({
       0: {
           hi: "1",
           transform: "1(2) s(20)"
       },
       options: {
           delay: 4,
           iterationCount: 3
       }
    });
    
    assert.equal(item2.delay, 4, "load options");
    assert.equal(item2.iterationCount, 3, "load options");
});
QUnit.test("SceneItem Animator", function( assert ) {
    var item = new SceneItem();
    assert.equal(item.duration, 0, "no duration");
    item.currentTime = 1;
    assert.equal(item.currentTime, 0, "duration is 0");    
    
    item.setProperty(1, "hi", 10);
    assert.equal(item.duration, 1, "duration is 1");    
    item.delay = 1;
    assert.equal(item.totalDuration, 2, "total duration is 2");
    
    item.setProperty(2, "hi2", 15);
    
    assert.equal(item.duration, 2, "duration is 2");    
    assert.equal(item.totalDuration, 3, "total duration is 3");
    
    item.iterationCount = 2;
    
    assert.equal(item.totalDuration, 5, "total duration is 1 + 2 * 2");
    item.on("animate", function(itime, frame, ctime) {
        assert.equal(ctime, 4, "currentTime is ended time");        
        assert.equal(itime, 1, "iterationTime is 0");  
        assert.equal(frame.getProperty("hi"), 10, "current frame");
        
    });
    item.on("timeupdate", function(time, frame) {
        assert.equal(time, 4, "currentTime is 4");                
    });    
    item.on("iterationtimeupdate", function(time, frame) {
        assert.equal(time, 1, "currentIterationTime is 1");
    });
    
    item.currentTime = 4;
});
