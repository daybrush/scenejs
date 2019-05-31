
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">React Scene.js</h2>
<p align="middle"><a href="https://badge.fury.io/js/scenejs" target="_blank"><img src="https://badge.fury.io/js/scenejs.svg" alt="npm version" height="18"/></a> <a href="https://travis-ci.org/daybrush/scenejs"><img src="https://travis-ci.org/daybrush/scenejs.svg?branch=master"/></a> <a href="https://coveralls.io/github/daybrush/scenejs?branch=master"><img src="https://coveralls.io/repos/github/daybrush/scenejs/badge.svg?branch=master"/></a> <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬 Scene.js is an JavaScript & CSS timeline-based animation library.</p>

<p align="middle"><a href="https://daybrush.com/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codepen.io/collection/DLWxrd/"><strong>Demo</strong></a></p>
<br/>




## Installation
```bash
$ npm install react-scenejs
```


## Documents
* [API Documentation](https://daybrush.com/scenejs/release/latest/doc/)
* [Features Documentation](https://daybrush.com/scenejs/features.html)


## Make scene
```javascript
import Scene from "scenejs";

const scene = new Scene({
  ".class": {
    0: "left: 0px; top: 0px"
    1: {
      "left": "100px",
      "top": "0px"
    },
    2: {
      "left": "200px",
      "top": "100px"
    }
  }
}, {
  selector: true,
  easing: "ease-in-out",
}).play();

```


```
MIT License

Copyright (c) 2016 Daybrush
```




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
