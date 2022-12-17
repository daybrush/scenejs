
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">Vue 3 Scene.js</h2>


<p align="middle"><a href="https://www.npmjs.com/package/vue-scenejs" target="_blank"><img src="https://img.shields.io/npm/v/vue-scenejs.svg?style=flat-square&color=007acc&label=version" alt="npm version" /></a>
<img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
<a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/daybrush/scenejs.svg?style=flat-square&label=license&color=08CE5D"/></a>
</p>


<p align="middle">🎬 A Vue 3 Component that create JavaScript & CSS timeline-based animation with Scene.js.</p>

<p align="middle"><a href="https://daybrush.com/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html"><strong>Features</strong></a></p>
<br/>

## 🚀 Exampless
* [Raindrop Selector Example](https://codesandbox.io/s/eager-morning-ykizyp)
* [Raindrop No Selector Example](https://codesandbox.io/s/vue-3-raindrop-no-selector-example-c939pt)

## ⚙️ Installation
```bash
$ npm install vue-scenejs
```


## 🎬 Make Scene
```vue
<script>
import {
    useScene,
    useSceneItem,
    useFrame,
    useNowFrame,
} from "vue-scenejs";

export default {
    setup() {
        const scene = new Scene({
            "a1": {
                0: {
                    left: "0px",
                    top: "0px",
                    transform: `translate(0px, 0px)`,
                },
                1: {
                    left: "100px",
                    top: "100px",
                    transform: `translate(100px, 0px)`,
                },
            },
            "a2": {
                0: {
                    left: "0px",
                    top: "0px",
                    transform: `translate(0px, 0px)`,
                },
                1: {
                    left: "100px",
                    top: "100px",
                    transform: `translate(100px, 0px)`,
                },
            }
        });
        const { cssText: cssText1 } = useNowFrame(scene.getItem("a1"));
        const { cssText: cssText2 } = useNowFrame(scene.getItem("a2"));

        return {
            cssText1,
            cssText2,
        };
    },
};
</script>
<template>
<div class="container">
    <div class="a1" :style="cssText1"></div>
    <div class="a2" :style="cssText2"></div>
</div>
</template>
```



## Development

### `yarn serve`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## ⭐️ Show Your Support
Please give a ⭐️ if this project helped you!


## 👏 Contributing

If you have any questions or requests or want to contribute to `scenejs` or other packages, please write the [issue](https://github.com/daybrush/scenejs/issues) or give me a Pull Request freely.


### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].

<a href="https://github.com/daybrush/scenejs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=daybrush/scenejs" />
</a>


## Sponsors
<p align="center">
	<a href="https://daybrush.com/sponsors/sponsors.svg">
		<img src="https://daybrush.com/sponsors/sponsors.svg"/>
	</a>
</p>


## 🐞 Bug Report

If you find a bug, please report to us opening a new [Issue](https://github.com/daybrush/scenejs/issues) on GitHub.



## 📝 License

This project is [MIT](https://github.com/daybrush/scenejs/blob/master/LICENSE) licensed.


## License

```

MIT License

Copyright (c) 2016 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```