import NativeScene from "scenejs";
import { SceneInterface } from "./SceneInterface";

export class Scene extends SceneInterface<NativeScene> {
  protected item: NativeScene = new NativeScene({}, { selector: true });
  public componentDidMount() {
    this.init();
  }
}
