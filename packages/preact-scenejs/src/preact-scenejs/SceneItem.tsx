import { SceneItem as NativeSceneItem } from "scenejs";
import { SceneInterface } from "./SceneInterface";

export class SceneItem extends SceneInterface<NativeSceneItem> {
  protected item: NativeSceneItem = new NativeSceneItem();
  public componentDidMount() {
    this.item.setElement(this.base as HTMLElement);
    this.init();
  }
}
