import { Component } from 'vue-property-decorator';
import { SceneItem as NativeSceneItem } from 'scenejs';
import { SceneItemInterface, OPTIONS, EVENTS } from './SceneItemInterface';
import { StateInterface } from 'scenejs/declaration/Animator';

@Component({
  name: 'scene-slot',
})
export class SceneSlot extends SceneItemInterface {
  public item = new NativeSceneItem();
  protected mounted() {
    const item = this.item;

    item.setElement(this.$el);

    if (this.keyframes) {
      item.set(this.keyframes);
    } else {
      item.set('0%', this.from);
      item.set('100%', this.to);
    }
    this.init();
  }
  protected render() {
    return this.$slots.default[0];
  }
}
