Scene.js
============


Scene.js is an Javascript Aniamtion Library. Make Your Homepage Dynamic.
<br>

## Component
* **Scene** : Control SceneItem, Speed & Count, Play & Stop
* **Scene.SceneItem** : Add & Manage Frame
* **Scene.Frame** : Set Property & get CSSText
* **Scene.Animator** : Control Speed & Count, Play & Stop
* **Scene.Util** : dot product with array, object, number, color, PropertyObject
* **Scene.PropertyObject** : Make String to Property Object for the dot product
* **Scene.Curve** : Make Transition Function with Bezier Curve.
* **Scene.Color** : Convert RGB, HSL HEX4, HEX6 to RGBA Model.

## Support Browser
**Default**

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|9+|(yes)|2.0|3.0|9.5|

**Transform**

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|9+|4+|3.5+|3.2+|10.5+|

**Transform 3D**

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|10+|12+|10+|4+|15+|

**Filter**

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|X|18+|35+|6+|15+|


## Demo

[Circle Burst](http://daybrush.com/Scene.js2/example/circleburst.html)

[Cube](http://daybrush.com/Scene.js2/example/cube.html)




## How to use?

Only load Scene,js

```HTML
<script src="./dist/Scene.js"></script>
or
<script src="./dist/Scene.min.js"></script>

```
 
Ready to start using Scene.js! Scene.js has Scene namespace and can be used as below example.

```javascript
var element = document.querySelector(".sample")
var scene = new Scene();
var sceneItem = scene.setElement(element); // add Item

sceneItem.setProperty(time, property, value);
// width margin padding height ....


sceneItem.setTransform(time, name, value);
//translate, scale, rotate, skew ....

sceneItem.setFilter(time, name, value);
//blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate, sepia

scene.play();
        
```

or

```javascript
var scene = new Scene({
	".sample" : {
		0: {width: "30px", height: "20px", property:value},
		2: {width: "50px", property:value},
		6.5: {height: "200px", property:value},
	},
	"item2" : {
		0 : {transform:{scale:0.5}, property:value},
		2 : {transform:{scale:1.5, rotate:"0deg"}, width: "50px", property:value},
		6.5: {transform:{scale:1, rotate:"50deg"}, width: "10px", property:value},
	},
	options: {
		selector: true // set selector to ".sample" item automatically.
	}
});

scene.setSelector({
	".item1" : "item1",
	".item2" : "item2"
});


scene.play();

```


