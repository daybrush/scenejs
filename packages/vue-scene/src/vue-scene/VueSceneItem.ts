import { Component } from 'vue-property-decorator';
import { SceneItem as NativeSceneItem } from 'scenejs';
import { SceneItemInterface } from './SceneItemInterface';

@Component({
  name: 'vue-scene-item',
})
export class VueSceneItem extends SceneItemInterface {
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
