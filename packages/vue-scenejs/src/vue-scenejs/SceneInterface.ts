import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import Scene, {
    SceneItem, OPTIONS, EVENTS, AnimatorState,
} from 'scenejs';
import { SceneProps } from './types';

@Component({
    props: {
        keyframes: {
            type: Object,
            default: {},
        },
        css: {
            type: Boolean,
            default: false,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        time: {
            type: [String, Number],
            default: -1,
        },
        easing: {
            type: [String, Function, Number],
            default: 0,
        },
        fillMode: {
            type: String,
            default: 'forwards',
        },
        direction: {
            type: String,
            default: 'normal',
        },
        iterationCount: {
            type: [Number, String],
            default: 1,
        },
        delay: {
            type: Number,
            default: 0,
        },
        playSpeed: {
            type: Number,
            default: 1,
        },
        ready: {
            type: Boolean,
            default: true,
        },
    },
})
class SceneInterface<T extends Scene | SceneItem> extends Vue {
    protected item!: T;
    protected isReady: boolean = false;
    public setTime(time: number | string) {
        this.item.setTime(time);
    }
    public getTime() {
        return this.item.getTime();
    }
    public play() {
        this.css !== false ? (this.item as any).playCSS() : this.item.play();
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
    protected init() {
        if (!this.ready || this.isReady) {
            return;
        }
        this.isReady = true;
        const item = this.item;
        const sceneOptions: Partial<AnimatorState> = {};

        if (this.keyframes) {
            this.item.load(this.keyframes);
        }
        OPTIONS.forEach((name) => {
            sceneOptions[name] = this.$props[name];
        });

        (item as any).setOptions(sceneOptions);
        EVENTS.forEach((name) => {
            item.on(name, (e) => {
                this.$emit(name, e);
            });
        });
        if (this.autoplay !== false) {
            this.play();
        } else if (this.time !== -1) {
            this.setTime(this.time);
        } else {
            this.setTime(0);
        }
    }
    protected render() {
        return this.$slots.default![0];
    }
    protected updated() {
        if (this.ready && !this.isReady) {
            this.init();
        }
        if (this.time !== -1 && (this.autoplay === false || this.item.getPlayState() === 'paused')) {
            this.item.setTime(this.time);
        }
    }
    protected beforeDestroy() {
        this.item.off();
    }
}

interface SceneInterface<T extends Scene | SceneItem> extends Vue, SceneProps { }

export default SceneInterface;
