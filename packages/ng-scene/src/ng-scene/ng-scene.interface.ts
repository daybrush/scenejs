import { Input, Output, EventEmitter, OnDestroy, AfterContentChecked, Component, AfterViewChecked } from '@angular/core';
import Scene, { SceneItem, OPTIONS, DirectionType, FillModeType, IterationCountType, EasingType, AnimatorState } from 'scenejs';

export class NgSceneInterface implements OnDestroy, AfterViewChecked {
  @Input() public from: { [key: string]: any } = {};
  @Input() public to: { [key: string]: any } = {};
  @Input() public keyframes: any[] | { [key: string]: any };
  @Input() public fillMode: FillModeType = 'forwards';
  @Input() public direction: DirectionType = 'normal';
  @Input() public iterationCount: IterationCountType = 1;
  @Input() public duration = 0;
  @Input() public playSpeed = 1;
  @Input() public delay = 0;
  @Input() public easing: EasingType = 0;
  @Input() public autoplay = false;
  @Input() public css = false;
  @Input() public time = -1;
  @Output() ngpaused: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngended: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngtimeupdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngiteration: EventEmitter<any> = new EventEmitter<any>();
  @Output() nganimate: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngplay: EventEmitter<any> = new EventEmitter<any>();

  protected item: Scene | SceneItem;

  public init() {
    const itemOptions: Partial<AnimatorState> = {};

    OPTIONS.forEach(name => {
      itemOptions[name] = this[name];
    });
    (this.item as any).setOptions(itemOptions);


    if (this.autoplay !== false) {
      this.play();
    }
  }
  public setTime(time: string | number) {
    this.item.setTime(time);
  }
  public getTime() {
    return this.item.getTime();
  }
  public play() {
    this.css !== false ? this.item.playCSS() : this.item.play();
  }
  public pause() {
    this.item.pause();
  }
  public getItem() {
    return this.item;
  }
  public getDuration() {
    return this.item.getDuration();
  }
  ngOnDestroy() {
    this.item.off();
  }
  ngAfterViewChecked() {
    if (this.time !== -1 && (this.autoplay === false || this.item.getPlayState() === 'paused')) {
      this.setTime(this.time);
    }
  }
}
