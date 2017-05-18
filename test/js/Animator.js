var Animator = window.Animator || Scene.Animator;

QUnit.test("test Animator", function( assert ) {
	var anim = new Animator({
		delay: 2,
		duration: 3,
		iterationCount: 2,
		fillMode: ""
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


QUnit.test("test fillMode", function( assert ) {
	var anim = new Animator({
		delay: 2,
		duration: 3,
		iterationCount: 2,
		fillMode: "forwards"
	});
	
	anim.currentTime = 8;
	assert.equal(anim.currentIterationTime, 3, "test direction forwards");


});


QUnit.test("iterationCount is infinite", function( assert ) {
	var anim = new Animator({
		delay: 2,
		duration: 3,
		iterationCount: "infinite",
	});
	assert.equal(anim.totalDuration, Infinity, "totalDuration is Infinity")
	anim.currentTime = 1;
	assert.equal(anim.currentIterationTime, 0, "test before delay");
	anim.currentTime = 3;
	assert.equal(anim.currentIterationTime, 1, "test before delay");
	anim.currentTime = 10;
	assert.equal(anim.currentIterationTime, 2, "test before delay");

});


QUnit.test("direction is reverse", function( assert ) {
	var anim = new Animator({
		delay: 2,
		duration: 3,
		iterationCount: 2,
		fillMode: "forwards",
		direction: "reverse"
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


QUnit.test("direction is alternate", function( assert ) {
	var anim = new Animator({
		delay: 2,
		duration: 3,
		iterationCount: 3,
		direction: "alternate",
		fillMode: "forwards"
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
		direction: "alternate"
	});
	
	anim2.currentTime = 8;
	assert.equal(anim2.currentIterationTime, 0, "current iteration count is 2 , endtime");
});

QUnit.test("direction is alternate-reverse", function( assert ) {
	var anim = new Animator({
		delay: 2,
		duration: 3,
		iterationCount: 2,
		direction: "alternate-reverse",
		fillMode: "forwards"
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