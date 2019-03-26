<template>
<div class='wrapper' id='app'>
  <vue-scene v-bind:easing='easing' v-bind:time='time' iterationCount="infinite" css autoplay>
	<div class='container'>
    <vue-scene-item v-bind:keyframes='keyframes'>
      <div class='raindrop'></div>
    </vue-scene-item>
    <vue-scene-item v-bind:keyframes='keyframes' v-bind:delay='0.4'>
      <div class='raindrop'></div>
    </vue-scene-item>
    <vue-scene-item v-bind:keyframes='keyframes' v-bind:delay='0.8'>
      <div class='raindrop'></div>
    </vue-scene-item>
	</div>
  
  </vue-scene>
  <br/>
	<input type='range' value='0' v-on:input='update($event)' />
	<br/>
  <vue-scene v-bind:easing='easing' v-bind:time='time'>
	<div class='container'>
    <vue-scene-item v-bind:keyframes='keyframes'>
      <div class='raindrop'></div>
    </vue-scene-item>
    <vue-scene-item v-bind:keyframes='keyframes' v-bind:delay='0.4'>
      <div class='raindrop'></div>
    </vue-scene-item>
    <vue-scene-item v-bind:keyframes='keyframes' v-bind:delay='0.8'>
      <div class='raindrop'></div>
    </vue-scene-item>
	</div>
  </vue-scene>
	<div class='container'>
		<vue-scene-item v-bind:time="time" v-bind:duration=1 v-bind:from="{'border-width': '150px', opacity: 1, transform: 'scale(0)'}" v-bind:to="{'border-width': '0px', opacity: 0, transform: 'scale(1)'}"
		 iterationCount='infinite'>
			<div class='raindrop'></div>
		</vue-scene-item>
	</div>
</div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { VueScene, VueSceneItem, EASE_IN_OUT } from "./vue-scene";
import { EasingType } from "scenejs";

@Component({
  components: {
    VueScene,
    VueSceneItem
  }
})
export default class App extends Vue {
  public easing: EasingType = EASE_IN_OUT;
  public time: string | number = 0;
  public keyframes = {
    0: { "border-width": "150px", opacity: 1, transform: "scale(0)" },
    1: { "border-width": "0px", opacity: 0.3, transform: "scale(0.7)" }
  };
  public update(e: Event) {
    this.time = `${(e.target as HTMLInputElement).value}%`;

  }
}
</script>

<style>
.wrapper {
  text-align: center;
}

.container {
  position: relative;
  display: inline-block;
  width: 300px;
  height: 300px;
}

.raindrop {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 100px solid black;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
}

.test {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #333;
}
</style>