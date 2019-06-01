import { Component } from 'vue-property-decorator';
import { SceneItem } from 'scenejs';
import SceneInterface from './SceneInterface';

@Component
export class VueSceneItem extends SceneInterface<SceneItem> {
protected item: SceneItem = new SceneItem();
  protected mounted() {
    this.item.setElement(this.$el as HTMLElement);
    this.init();
  }
}
