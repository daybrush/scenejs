import { Component, Vue } from 'vue-property-decorator';
import NativeScene from 'scenejs';
import { SceneItemInterface } from './SceneItemInterface';
import { VueSceneItem } from './VueSceneItem';

function find(children: Vue[], list: any[]) {
  children.forEach((component) => {
    if (component instanceof VueSceneItem) {
      list.push(component.getItem());
    }
    find(component.$children, list);
  });
  return list;
}

@Component({
  name: 'vue-scene',
})
export class VueScene extends SceneItemInterface {
  public item = new NativeScene({}, {});
  protected mounted() {
    const scene = this.item;
    const items = find(this.$children, []);

    items.forEach((item) => {
      const id = item.getId() || item.setId().getId();

      scene.setItem(id, item);
    });
    this.init();
  }
  protected render() {
    return this.$slots.default[0];
  }
}
