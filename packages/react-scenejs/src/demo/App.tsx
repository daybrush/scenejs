import * as React from "react";
import * as ReactDOM from "react-dom";
import { SceneItem, EASE_IN_OUT, Scene } from "../react-scenejs";
import { zoomIn } from "@scenejs/effects";

import "./App.css";

export default class App extends React.Component<{}, { time: string | number }> {
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
    ".clapper-container": {
      0: zoomIn({ duration: 1 }),
    },
    ".circle": {
      0.3: zoomIn({ duration: 1 }),
    },
    ".play": {
      0: {
        transform: "translate(-50%, -50%)",
      },
      0.6: zoomIn({ duration: 1 }),
    },
    ".top .stick1": {
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
    ".stick1 .rect": (i: number) => ({
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
    ".stick2 .rect": (i: number) => ({
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
    "[data-progress] .circle": (i: number) => ({
      0: { "border-width": "150px", opacity: 1, transform: "translate(-50%, -50%) scale(0)" },
      1.5: { "border-width": "0px", opacity: 0.3, transform: "scale(0.7)" },
      options: {
        delay: i * 0.4,
      },
    }),
  }
  private scene!: Scene;
  constructor(props: any) {
    super(props);
  }
  public render() {
    return <div className="wrapper">
      <Scene easing="ease-in-out" keyframes={this.keyframes} iterationCount="infinite" css autoplay>
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
                <path d="M 60 38.86751345948127 L 10.000000000000021 67.73502691896255 L 10 10 L 60 38.86751345948127 Z" fill="#333" stroke-linejoin="round" stroke-width="10" stroke="#333"></path></svg>
            </div>
          </div>
        </div>
      </Scene>
      <Scene
        ref={e => { this.scene = e as any; }}
        keyframes={this.keyframes2}
        onAnimate={() => {}}
      >
        <div className="circles">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="circle circle3"></div>
        </div>
      </Scene>
      <div className="player">
        <div className="play"></div>
        <input className="progress" type="range" value="0" min="0" max="100" />
      </div>
    </div >;
  }
}
