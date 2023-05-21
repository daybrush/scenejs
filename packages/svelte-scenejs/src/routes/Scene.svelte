<script>
  import { SceneItem, selectorAll, useScene, EASE_IN_OUT } from "../svelte-scenejs";

  function zoomIn({ duration }) {
    return new SceneItem(
      {
        0: `transform: scale(0)`,
        1: `transform: scale(1)`,
      },
      {
        duration,
      }
    );
  }
  const scene = useScene(
    {
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
      ".stick1 .rect": selectorAll(
        (i) => ({
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
        5
      ),
      ".stick2 .rect": selectorAll(
        (i) => ({
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
        5
      ),
    },
    {
      easing: EASE_IN_OUT,
      selector: true,
    }
  );

  scene.play();

  // const starFrame1 = useNowFrame(scene.getItem(".star1"));
  // const rectFrame1 = useNowFrame(scene.getItem(".rectangle1"));
</script>

<div class="clapper">
  <div class="clapper-container">
    <div class="clapper-body">
      <div class="top">
        <div class="stick stick1">
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
        </div>
        <div class="stick stick2">
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
          <div class="rect" />
        </div>
      </div>
      <div class="bottom" />
    </div>
    <div class="circle" />
    <div class="play" />
  </div>
</div>

<style>
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
</style>
