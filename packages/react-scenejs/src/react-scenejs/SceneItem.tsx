import { SceneItem as NativeSceneItem } from 'scenejs';
import { findDOMNode } from 'react-dom';
import { SceneInterface } from './SceneInterface';


export class SceneItem extends SceneInterface<NativeSceneItem> {
  protected item: NativeSceneItem = new NativeSceneItem();
  public render() {
    return this.props.children;
  }
  public componentDidMount() {
    this.item.setElement(findDOMNode(this) as HTMLElement);

    if (this.props.keyframes) {
      this.item.set(this.props.keyframes);
    } else {
      this.item.set('0%', this.props.from);
      this.item.set('100%', this.props.to);
    }
    this.init();
  }
}
