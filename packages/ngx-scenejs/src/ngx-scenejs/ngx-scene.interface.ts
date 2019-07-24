import { Input, Output, EventEmitter, OnDestroy, AfterViewChecked } from '@angular/core';
import Scene, { SceneItem, OPTIONS, DirectionType, FillModeType, IterationCountType, EasingType, AnimatorState, EVENTS } from 'scenejs';
import { camelize } from '@daybrush/utils';
import { EVENT_MAP } from './consts';

export class NgxSceneInterface implements OnDestroy, AfterViewChecked {
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
  @Input() public ready = true;
  @Output() scenePaused: EventEmitter<any> = new EventEmitter<any>();
  @Output() sceneEnded: EventEmitter<any> = new EventEmitter<any>();
  @Output() sceneTimeUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() sceneIteration: EventEmitter<any> = new EventEmitter<any>();
  @Output() sceneAnimate: EventEmitter<any> = new EventEmitter<any>();
  @Output() scenePlay: EventEmitter<any> = new EventEmitter<any>();

  protected item: Scene | SceneItem;
  protected isReady = false;

  public init() {
    if (!this.ready || this.isReady) {
      return;
    }
    this.isReady = true;
    const item = this.item;
    const sceneOptions: Partial<AnimatorState> = {};

    if (this.keyframes) {
      this.item.load(this.keyframes);
    }
    OPTIONS.forEach(name => {
      (sceneOptions[name] as any) = this[name];
    });
    (item as any).setOptions(sceneOptions);
    EVENTS.forEach(name => {
      if (name in EVENT_MAP) {
        this.item.on(name, e => {
          (this[EVENT_MAP[name]] as EventEmitter<any>).emit(e);
        });
      }
    });
    if (this.autoplay !== false) {
      this.play();
    } else if (this.time !== -1) {
      this.setTime(this.time);
    } else {
      this.setTime(0);
    }

    if (this.autoplay !== false) {
      this.play();
    }
  }
  public setTime(time: number | string) {
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
  public isPaused() {
    return this.item.isPaused();
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
    if (this.ready && !this.isReady) {
      this.init();
    }
    if (this.time !== -1 && (this.autoplay === false || this.item.getPlayState() === 'paused')) {
      this.setTime(this.time);
    }
  }
}
