import { Component, Vue } from 'vue-property-decorator';
import NativeScene from 'scenejs';
import { SceneItemInterface, OPTIONS, EVENTS } from './SceneItemInterface';
import { StateInterface } from 'scenejs/declaration/Animator';
import { SceneItem } from './SceneItem';
import { SceneSlot } from './SceneSlot';

function find(children: Vue[], list: any[]) {
  children.forEach((component) => {
    if (component instanceof SceneSlot) {
      list.push(component.getItem());
    }
    find(component.$children, list);
  });
  return list;
}

@Component({
  name: 'scene',
})
export class Scene extends SceneItemInterface {
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
