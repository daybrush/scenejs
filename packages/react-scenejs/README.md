# react-scenejs [![npm version](https://badge.fury.io/js/react-scenejs.svg)](https://badge.fury.io/js/react-scenejs)


* [Demo](https://codesandbox.io/s/knz6l89wv)

## Install
```bash
$ npm install @egjs/react-scenejs  --save
```

## How to use
```jsx
import {SceneItem} from "react-scenejs";
```

```jsx
<SceneItem timeline={{
	0: {opacity: 0, left: "0px"},
	1: {opacity: 0.3, left: "40px"},
	2: {opacity: 1, left: "100px"},
}}>
	{({styles, time, currentTime, frame}) => (<div style={styles}></div>)}
</SceneItem>
```
