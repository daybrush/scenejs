import Component from 'vue-class-component';
import Scene from 'scenejs';
import SceneInterface from './SceneInterface';

@Component
export class VueScene extends SceneInterface<Scene> {
  protected item = new Scene({}, { selector: true });
  protected mounted() {
    this.init();
  }
}
