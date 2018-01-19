## How To Use
### Installation with npm

```bash
$ npm install scenejs-stopmotion
```

### Import Library
#### ES5
```html
<script src="//daybrush.github.io/scenejs/scenejs-stopmotion/release/latest/stopmotion.min.js">
```
```js
var StopMotionItem = StopMotion.Item;
```
#### ES6
```js
import StopMotion, {StopMotionItem} from "scenejs-stopmotion";
```

### Go

```js
const motion = StopMotion({
    ".circle": {
        0: {"background":"rgb(100, 100, 100)", left: "0px"},
        5: {"background":"rgb(255, 100, 100)", left: "300px"}
    }
}, {
    selector: true,
    count: 5
}).play();

const motionItem = StopMotionItem({
    0: {"background":"rgb(100, 100, 100)", left: "0px"},
    5: {"background":"rgb(255, 100, 100)", left: "300px"}
}, {
    selector: ".circle",
    level: 5
}).play();
```