<script>
import { EASE_OUT } from "scenejs";
import { onMounted } from "@vue/composition-api";
import { useScene, useNowFrame } from "../src/index.ts";

export default {
  setup() {
    const scene = useScene(
      {
        ".circle1": {
          0: {
            "border-width": "70px",
            transform: "scale(0)",
          },
          1: {
            "border-width": "0px",
            transform: "scale(1.5)",
          },
          2: 1,
        },
        ".triangle": {
          0: {
            transform: "rotate(0deg) translate(0px) scale(0.5)",
            opacity: 1,
          },
          1.5: {
            transform: "rotate(40deg) translate(100px) scale(1)",
            opacity: 0,
          },
        },
        ".rectangle1": {
          0: {
            opacity: 1,
            transform: "rotate(0deg) translate(0px) scale(0.3)",
          },
          1.5: {
            transform: "rotate(-40deg) translate(-100px) scale(0.9)",
            opacity: 0,
          },
        },
        ".rectangle2": {
          0: {
            transform: " translate(0px, 0px) rotate(0deg) scale(0.3)",
            opacity: 1,
          },
          1.5: {
            transform: "translate(100px, -100px) rotate(70deg) scale(0.7)",
            opacity: 0,
          },
        },
        ".circle2": {
          0: {
            transform: " translate(0px, 0px) scale(0.7)",
            opacity: 1,
          },
          1.5: {
            transform: "translate(-100px, -50px) scale(1)",
            opacity: 0,
          },
        },
        ".star1": {
          0: {
            transform: "translateY(0px) rotate(0deg) scale(0.5)",
            opacity: 1,
          },
          1.5: {
            transform: "translateY(-100px) rotate(90deg) scale(1)",
            opacity: 0,
          },
        },
      },
      {
        easing: EASE_OUT,
        iterationCount: "infinite",
        fillMode: "forwards",
      }
    );


    const { cssText: cssText1 } = useNowFrame(scene.getItem(".star1"));
    const { cssText: cssText2 } = useNowFrame(scene.getItem(".rectangle1"));

    onMounted(() => {
      scene.play();
    });

    return {
      cssText1,
      cssText2,
    }
  },
};

</script>
<template>
  <div class="App">
    <div class="area">
      <div class="motion">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
        <div class="triangle"></div>
        <div class="rectangle rectangle1" :style="cssText2"></div>
        <div class="rectangle rectangle2"></div>
        <div class="star star1" :style="cssText1">
          <div class="star">
            <div class="star">
              <div class="star">
                <div class="star"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.motion {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
  margin: auto;
}

.star {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  margin: auto;
}

.star::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 50%;
  right: 50%;
  border: 8px solid #5a5;
  border-bottom: 0;
  border-right: 0;
  transform: skew(9deg, 9deg);
  transform-origin: 100% 100%;
}

.star>.star {
  transform: rotate(72deg);
}

.triangle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 20px;
  margin: auto;
  width: 100px;
  height: 10px;
  border-radius: 5px;
  background: #f5f;
}

.triangle:before,
.triangle:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: inherit;
}

.triangle:before {
  transform-origin: 5px 50%;
  transform: rotate(60deg);
}

.triangle:after {
  transform-origin: calc(100% - 5px) 50%;
  transform: rotate(-60deg);
}

.rectangle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  border: 10px solid #f55;
}

.circle {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 70px solid #5ff;
  left: 0;
  right: 0;
  top: -20px;
  bottom: -20px;
  margin: auto;
}

.rectangle2 {
  border-color: #55f;
}

.circle2 {
  width: 40px;
  height: 40px;
  bottom: 20px;
  border: 8px solid #eed414;
}

.star1 {
  top: 0;
  bottom: 20px;
}
</style>
