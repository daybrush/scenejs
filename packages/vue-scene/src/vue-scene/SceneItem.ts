import { Component, Prop, Vue } from 'vue-property-decorator';
import { SceneItem as NativeSceneItem } from 'scenejs';
import { EasingType, FillModeType, DirectionType, IterationCountType } from 'scenejs/declaration/Animator';
import { FunctionalComponentOptions, RenderContext, CreateElement } from 'vue';
import { SceneSlot } from './SceneSlot';
import { SceneItemInterface } from './SceneItemInterface';

@Component({
  functional: true,
} as FunctionalComponentOptions)
export class SceneItem extends SceneItemInterface {
  protected render(createElement: CreateElement, context: RenderContext) {
    const datas = { props: context.props, data: context.data, on: context.listeners };

    return context.children.map((vnode) => {
      return createElement(SceneSlot, datas, [vnode]);
    });
  }
}
