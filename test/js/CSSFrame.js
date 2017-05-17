var Frame = Scene.Frame;

QUnit.test("cssText", function( assert ) {
	var frame = new Frame({
		a: 1,
		transform: "a(1, 1) b(2, 2)"
	});
	console.log(frame);
	var cssText = frame.cssText;
	assert.equal(cssText, "a:1;transform:a(1,1) b(2,2);-moz-transform:a(1,1) b(2,2);-ms-transform:a(1,1) b(2,2);-o-transform:a(1,1) b(2,2);-webkit-transform:a(1,1) b(2,2);");
	
});