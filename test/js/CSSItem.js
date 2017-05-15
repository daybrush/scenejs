var SceneItem = Scene.SceneItem;



QUnit.test("set element", function( assert ) {
	var item = new SceneItem();
	var element = document.querySelector("#qunit-header");
	item.selector = "#qunit-header";
	assert.equal(item.element[0], element, "set selector");
	
	var id = item.id;
	assert.equal(id, element.getAttribute("data-scene-id"), "test if id is the same");
});


QUnit.test("copy css", function( assert ) {
	var item = new SceneItem();
	var element = document.querySelector("#qunit-header");
	item.selector = "#qunit-header";
	item.copyCSSProperty(0, "font-weight");
	
	assert.equal(item.getProperty(0, "font-weight"), "normal");
});

QUnit.test("syncrhonize element", function( assert ) {
	var item = new SceneItem();
	var element = document.querySelector("#qunit-header");
	item.selector = "#qunit-header";
	item.fillMode = "forwards";

	item.set({
		0: {
			"font-size": "10px",
		},
		4: {
			"font-size": "20px"
		}
	});
	item.currentTime = 2;
	assert.equal(element.style.fontSize, "15px", "syncrhonize font-size");
	item.currentTime = 4;
	assert.equal(element.style.fontSize, "20px", "syncrhonize font-size");
});