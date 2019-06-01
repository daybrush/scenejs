<template>
  <div class="wrapper">
    <div class="clapper-area">
      <vue-scene :keyframes="keyframes" :css="true" :autoplay="true" easing="ease-in-out" iterationCount="infinite">
        <div class="clapper">
          <div class="clapper-container">
            <div class="clapper-body">
              <div class="top">
                <div class="stick stick1">
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                </div>
                <div class="stick stick2">
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                  <div class="rect"></div>
                </div>
              </div>
              <div class="bottom"></div>
            </div>
            <div class="circle"></div>
            <div class="play">
              <svg viewBox="0 0 70 77.73502691896255">
                        <path d="M 60 38.86751345948127 L 10.000000000000021 67.73502691896255 L 10 10 L 60 38.86751345948127 Z"
                          fill="#333" stroke-line-join="round" stroke-width="10" stroke="#333"></path>
                      </svg>
            </div>
          </div>
        </div>
      </vue-scene>
    </div>
    <div class="circle-area">
      <vue-scene
        ref="scene"
        :keyframes="keyframes2"
        fillMode="forwards"
        easing="ease-in-out"
        @animate="onAnimate"
        @play="onPlay"
        @paused="onPaused"
      >
        <div class="circles">
          <div class="circle circle1"></div>
          <div class="circle circle2"></div>
          <div class="circle circle3"></div>
        </div>
      </vue-scene>
      <div class="player">
        <div :class="playState" @click="onClick"></div>
        <input class="progress" type="range" :value="time" min="0" max="100" @input="onInput" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import {
    VueScene,
    VueSceneItem
  } from "./vue-scenejs";
  import {
    zoomIn
  } from "@scenejs/effects";
  export default {
    name: 'app',
    components: {
      VueScene,
    },
    methods: {
      onAnimate(this: any, e: any) {
        this.time = 100 * e.time / e.currentTarget.getDuration();
      },
      onPlay(this: any, e: any) {
        this.playState = 'pause';
      },
      onPaused(this: any, e: any) {
        this.playState = 'play';
      },
      onInput(this: any, e: any) {
        const scene = this.$refs.scene;

        scene.pause();
        scene.setTime((e.currentTarget as HTMLInputElement).value + '%');
      },
      onClick(this: any) {
        const scene = this.$refs.scene;

        scene.isPaused() ? scene.play() : scene.pause();
      },
    },
    data() {
      return {
        time: 0,
        playState: "play",
        keyframes: {
          ".clapper": {
            2: "transform: translate(-50%, -50%) rotate(0deg)",
            2.5: {
              transform: "rotate(-15deg)",
            },
            3: {
              transform: "rotate(0deg)",
            },
            3.5: {
              transform: "rotate(-10deg)",
            },
          },
          ".clapper .clapper-container": {
            0: zoomIn({
              duration: 1
            }),
          },
          ".clapper .circle": {
            0.3: zoomIn({
              duration: 1
            }),
          },
          ".clapper .play": {
            0: {
              transform: "translate(-50%, -50%)",
            },
            0.6: zoomIn({
              duration: 1
            }),
          },
          ".clapper .top .stick1": {
            2: {
              transform: {
                rotate: "0deg",
              },
            },
            2.5: {
              transform: {
                rotate: "-20deg",
              },
            },
            3: {
              transform: {
                rotate: "0deg",
              },
            },
            3.5: {
              transform: {
                rotate: "-10deg",
              },
            },
          },
          ".clapper .stick1 .rect": (i: number) => ({
            0: {
              transform: {
                scale: 0,
                skew: "15deg",
              },
            },
            0.7: {
              transform: {
                scale: 1,
              },
            },
            options: {
              delay: 0.6 + i * 0.1,
            },
          }),
          ".clapper .stick2 .rect": (i: number) => ({
            0: {
              transform: {
                scale: 0,
                skew: "-15deg",
              },
            },
            0.7: {
              transform: {
                scale: 1,
              },
            },
            options: {
              delay: 0.8 + i * 0.1,
            },
          }),
        },
        keyframes2: {
          ".circles .circle": (i: number) => ({
            0: {
              "border-width": "150px",
              "opacity": 1,
              "transform": "translate(-50%, -50%) scale(0)"
            },
            1.5: {
              "border-width": "0px",
              "opacity": 0.3,
              "transform": "scale(0.7)"
            },
            options: {
              delay: i * 0.4,
            },
          }),
        },
      };
    },
  };
</script>

<style>
  .circle-area,
  .clapper-area {
    position: relative;
  }
  .clapper-area {
    height: 400px;
  }
  .circle-area {
    height: 400px;
  }
  .clapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    z-index: 2;
    transform-origin: 20% 60%;
    will-change: transform;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
  }
  .clapper .clapper-container {
    position: absolute;
    margin: auto;
    width: 200px;
    height: 170px;
    left: -200px;
    right: -200px;
    top: -200px;
    bottom: -200px;
  }
  .clapper .clapper-container .clapper-body {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .clapper .stick {
    position: absolute;
    box-sizing: border-box;
    width: 200px;
    height: 32px;
    font-size: 0;
    overflow: hidden;
    white-space: nowrap;
    padding: 5px 8px;
    text-align: center;
    background: #333;
  }
  .clapper .stick1 {
    transform-origin: 0% 100%;
    border-radius: 5px 5px 0px 0px;
  }
  .clapper .stick2 {
    top: 30px;
  }
  .clapper .rect {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 20px;
    background: white;
    vertical-align: top;
    margin: 0px 5px 0px;
    border-radius: 5px;
  }
  .clapper .stick1 .rect {
    transform: skew(15deg);
  }
  .clapper .stick2 .rect {
    transform: skew(-15deg);
  }
  .clapper .top {
    position: absolute;
    top: 0;
    border-radius: 5px 5px 0px 0px;
    width: 100%;
    height: 37%;
  }
  .clapper .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64%;
    background: #333;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .clapper .circle {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    margin: auto;
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 50%;
  }
  .clapper .play {
    position: absolute;
    left: 50%;
    margin-left: 3px;
    bottom: 7%;
    transform: translate(-50%, -50%);
    width: 32px;
    /* 	overflow: hidden; */
  }
  .clapper .play svg {
    -webkit-backface-visibility: hidden;
    outline: 1px solid transparent;
  }
  .circles {
    position: relative;
    width: 300px;
    height: 300px;
    margin: auto;
  }
  .circles .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    border: 150px solid black;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }
  .player {
    position: relative;
    text-align: center;
  }
  .player .play,
  .player .pause,
  .player .progress {
    display: inline-block;
    vertical-align: middle;
  }
  .player .play {
    border-left: 14px solid #333;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  .player .pause {
    border-left: 4px solid #333;
    border-right: 4px solid #333;
    width: 14px;
    height: 16px;
    box-sizing: border-box;
  }
  .player input[type=range] {
    width: 200px;
  }
  .player input[type=range] {
    -webkit-appearance: none;
    background: rgba(0, 0, 0, 0.2);
    height: 5px;
  }
  .player input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background: #333;
  }
  .player input[type=range]:focus {
    outline: none;
  }
</style>