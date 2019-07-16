import * as React from "react";
import * as ReactDOM from "react-dom";
import { Scene } from "../react-scenejs";
import { zoomIn } from "@scenejs/effects";

import "./App.css";

export default class App extends React.Component<{}, { time: string | number, ready: boolean, keyframes: any }> {
  public state = {
    time: 0,
    ready: false,
    keyframes: {},
  };
  private keyframes = {
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
      0: zoomIn({ duration: 1 }),
    },
    ".clapper .circle": {
      0.3: zoomIn({ duration: 1 }),
    },
    ".clapper .play": {
      0: {
        transform: "translate(-50%, -50%)",
      },
      0.6: zoomIn({ duration: 1 }),
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
  };
  private keyframes2 = {
    ".circles .circle": (i: number) => ({
      0: { "border-width": "150px", "opacity": 1, "transform": "translate(-50%, -50%) scale(0)" },
      1.5: { "border-width": "0px", "opacity": 0.3, "transform": "scale(0.7)" },
      options: {
        delay: i * 0.4,
      },
    }),
  };
  private scene!: Scene;
  private inputEl!: HTMLInputElement;
  private playEl!: HTMLDivElement;
  constructor(props: any) {
    super(props);
  }
  public render() {
    return <div className="wrapper">
      <div className="clapper-area">
        <Scene easing="ease-in-out"
          keyframes={this.state.keyframes} iterationCount="infinite" css ready={this.state.ready} autoplay>
          <div className="clapper">
            <div className="clapper-container">
              <div className="clapper-body">
                <div className="top">
                  <div className="stick stick1">
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                  </div>
                  <div className="stick stick2">
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                    <div className="rect"></div>
                  </div>
                </div>
                <div className="bottom"></div>
              </div>
              <div className="circle"></div>
              <div className="play">
                <svg viewBox="0 0 70 77.73502691896255">
                  <path
                    d="M 60 38.86751345948127 L 10.000000000000021 67.73502691896255 L 10 10 L 60 38.86751345948127 Z"
                    fill="#333" strokeLinejoin="round" strokeWidth="10" stroke="#333"></path></svg>
              </div>
            </div>
          </div>
        </Scene>
      </div>
      <div className="circle-area">
        <Scene
          ref={e => { this.scene = e as any; }}
          keyframes={this.keyframes2}
          easing={"ease-in-out"}
          fillMode={"forwards"}
          onAnimate={e => {
            if (this.inputEl) {
              this.inputEl.value = `${100 * e.time / e.currentTarget.getDuration()}`;
            }
          }}
          onPlay={() => {
            this.playEl.className = "pause";
          }}
          onPaused={() => {
            this.playEl.className = "play";
          }}
        >
          <div className="circles">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
          </div>
        </Scene>
        <div className="player">
          <div className="play"
            ref={e => { this.playEl = e as any; }}
            onClick={e => {
              this.scene.isPaused() ? this.scene.play() : this.scene.pause();
            }}
          ></div>
          <input
            ref={e => { this.inputEl = e as any; }}
            className="progress"
            type="range" defaultValue="0"
            min="0" max="100"
            onInput={e => {
              this.scene.pause();
              this.scene.setTime((e.currentTarget as HTMLInputElement).value + "%");
            }}
          />
        </div>
      </div>
    </div >;
  }
  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        ready: true,
        keyframes: this.keyframes,
      });
    }, 500);
  }
}
