var Animator = window.Animator || Scene.Animator;





QUnit.test("test Animator", function( assert ) {
    var anim = new Animator({
        delay: 2,
        duration: 3,
        iterationCount: 2
    });
    


    anim.setTime(1);
    
    assert.equal(anim.currentIterationTime, 0, "test delay");
    
    anim.setTime(4);
    assert.equal(anim.currentTime, 4, "test get currentTime");
    assert.equal(anim.currentIterationTime, 2, "test get currentIterationTime");
    
    anim.setTime(5);
    
    assert.equal(anim.currentTime, 5, "test get currentTime");
    assert.equal(anim.currentIterationTime, 0, "test get currentIterationTime");
    
    anim.setTime(8);
    
    assert.equal(anim.currentTime, 8, "test get currentTime");
    assert.equal(anim.currentIterationTime, 0, "test get currentIterationTime");


    anim.currentTime = 9;
    assert.equal(anim.currentTime, 8, "test get currentTime");
});


QUnit.test("test direction", function( assert ) {
    var anim = new Animator({
        delay: 2,
        duration: 3,
        iterationCount: 2,
        direction: "forwards"
    });
    
    anim.currentTime = 8;
    assert.equal(anim.currentIterationTime, 3, "test direction forwards");


});




QUnit.test("fillMode is reverse", function( assert ) {
    var anim = new Animator({
        delay: 2,
        duration: 3,
        iterationCount: 2,
        direction: "forwards",
        fillMode: "reverse"
    });
    anim.currentTime = 1;
    assert.equal(anim.currentIterationTime, 3, "test before delay");

    anim.currentTime = 2;
    assert.equal(anim.currentIterationTime, 3, "test fillMode reverse");
            
    anim.currentTime = 3;
    assert.equal(anim.currentIterationTime, 2, "test fillMode reverse");

    anim.currentTime = 8;
    assert.equal(anim.currentIterationTime, 0, "test endtime");
});


QUnit.test("fillMode is alternate", function( assert ) {
    var anim = new Animator({
        delay: 2,
        duration: 3,
        iterationCount: 3,
        fillMode: "alternate",
        direction: "forwards"
    });
    anim.currentTime = 1;

    assert.equal(anim.currentIterationTime, 0, "test before delay");

    anim.currentTime = 2;
    assert.equal(anim.currentIterationTime, 0, "test when currentIterationCount is even");
            
    anim.currentTime = 3;
    assert.equal(anim.currentIterationTime, 1, "test when currentIterationCount is even");

    anim.currentTime = 5;
    assert.equal(anim.currentIterationTime, 3, "test end iteration");
    
    anim.currentTime = 6;
    assert.equal(anim.currentIterationTime, 2, "current iteration count is 1");
    
    anim.currentTime = 8;
    assert.equal(anim.currentIterationTime, 0, "current iteration count is 2");
    
    
    anim.currentTime = 11;
    assert.equal(anim.currentIterationTime, 3, "current iteration count is 3 , endtime");
    
    
    var anim2 = new Animator({
        delay: 2,
        duration: 3,
        iterationCount: 2,
        fillMode: "alternate"
    });
    
    anim2.currentTime = 8;
    assert.equal(anim2.currentIterationTime, 0, "current iteration count is 2 , endtime");
});

QUnit.test("fillMode is alternate-reverse", function( assert ) {
    var anim = new Animator({
        delay: 2,
        duration: 3,
        iterationCount: 2,
        fillMode: "alternate-reverse",
        direction: "forwards"
    });
    anim.currentTime = 1;
    assert.equal(anim.currentIterationTime, 3, "test before delay");

    anim.currentTime = 2;
    assert.equal(anim.currentIterationTime, 3, "test when currentIterationCount is even");
            
    anim.currentTime = 3;
    assert.equal(anim.currentIterationTime, 2, "test when currentIterationCount is even");

    anim.currentTime = 5;
    assert.equal(anim.currentIterationTime, 0, "test end iteration");
    
    anim.currentTime = 6;
    assert.equal(anim.currentIterationTime, 1, "current iteration count is 1");
    
    anim.currentTime = 8;
    assert.equal(anim.currentIterationTime, 3, "current iteration count is 2 , endtime");
});