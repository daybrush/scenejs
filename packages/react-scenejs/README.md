# react-scenejs [![npm version](https://badge.fury.io/js/react-scenejs.svg)](https://badge.fury.io/js/react-scenejs)


* [Demo](https://codesandbox.io/s/knz6l89wv)

## Install
```bash
$ npm install @egjs/react-scenejs  --save
```

## How to use
```jsx
import { SceneItem, EASE_IN_OUT } from "react-scenejs";

<SceneItem keyframes={{
	0: {opacity: 0, left: "0px"},
	1: {opacity: 0.3, left: "40px"},
	2: {opacity: 1, left: "100px"},
}}
playSpeed={1}
iterationCount={1}
delay={0}
direction="normal"
fillMode="forwards"
easing={EASE_IN_OUT}
onPlay={() => {}}
onPaused={() => {}}
onEnded={() => {}}
onTimeUpdate={({currentTime, time, iterationCount}) => {}}
onIteration={({currentTime, iterationCount}) => {}}
onAnimate={({currentTime, time, frmae}) => {}}
>
	{({styles, time, currentTime, frame}) => (<div style={styles}></div>)}
</SceneItem>
```

* [Events Documentation](https://daybrush.github.io/scenejs/release/latest/doc/SceneItem.html#events)

## Raindrop Example
```jsx
import { SceneItem, EASE_IN_OUT } from "react-scenejs";

<SceneItem
	from={{ "borderWidth": "150px", opacity: 1, transform: "scale(0)" }}
	to={{ "borderWidth": "0px", opacity: 0.3, transform: "scale(0.7)" }}
	delay={delay}
	duration={1.5}
	easing={EASE_IN_OUT}
	iterationCount="infinite">
	{({ styles }) => <div className="raindrop" style={styles}></div>}
</SceneItem>
```