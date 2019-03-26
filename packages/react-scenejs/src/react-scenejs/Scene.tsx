import NativeScene, { SceneItem } from 'scenejs';
import { findDOMNode } from 'react-dom';
import { SceneInterface } from './SceneInterface';


export class Scene extends SceneInterface<NativeScene> {
  protected item: NativeScene = new NativeScene({}, {});
  constructor(props: any) {
    super(props);
  }
  public render() {
    return this.props.children;
  }
  public componentDidMount() {
    const element = findDOMNode(this) as HTMLElement;
    if (this.props.keyframes) {
      const keyframes = this.props.keyframes;

      this.item.load(this.props.keyframes);
    }

    this.item.forEach((item: SceneItem) => {
      const id = item.getId();

      item.setElement(element.querySelector(`[data-scene-id="${id}"]`) as HTMLElement);
      item.setId(id);
    });
    this.init();
  }
}
