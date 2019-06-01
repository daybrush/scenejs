import Component from 'vue-class-component';
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
