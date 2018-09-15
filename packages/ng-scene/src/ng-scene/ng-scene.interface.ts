import { Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FillModeType, DirectionType, IterationCountType, EasingType } from 'scenejs/declaration/Animator';
import Scene, { SceneItem } from 'scenejs';

export const OPTIONS = ['duration', 'fillMode', 'direction', 'iterationCount', 'delay', 'easing', 'playSpeed'];
export const EVENTS = ['paused', 'ended', 'timeupdate', 'animate'];
export class NgSceneInterface implements OnDestroy {
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
  @Output() ngpaused: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngended: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngtimeupdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngiteration: EventEmitter<any> = new EventEmitter<any>();
  @Output() nganimate: EventEmitter<any> = new EventEmitter<any>();
  @Output() ngplay: EventEmitter<any> = new EventEmitter<any>();

  protected item: Scene | SceneItem;

  public setTime(time: number) {
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
}
