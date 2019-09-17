import { Component, ViewChild } from '@angular/core';
import { zoomIn } from '@scenejs/effects';
import { NgxSceneComponent } from '../../projects/ngx-scenejs/src/lib/ngx-scene.module';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-scenejs';
  keyframes = {
    '.clapper': {
      2: 'transform: translate(-50%, -50%) rotate(0deg)',
      2.5: {
        transform: 'rotate(-15deg)',
      },
      3: {
        transform: 'rotate(0deg)',
      },
      3.5: {
        transform: 'rotate(-10deg)',
      },
    },
    '.clapper .clapper-container': {
      0: zoomIn({ duration: 1 }),
    },
    '.clapper .circle': {
      0.3: zoomIn({ duration: 1 }),
    },
    '.clapper .play': {
      0: {
        transform: 'translate(-50%, -50%)',
      },
      0.6: zoomIn({ duration: 1 }),
    },
    '.clapper .top .stick1': {
      2: {
        transform: {
          rotate: '0deg',
        },
      },
      2.5: {
        transform: {
          rotate: '-20deg',
        },
      },
      3: {
        transform: {
          rotate: '0deg',
        },
      },
      3.5: {
        transform: {
          rotate: '-10deg',
        },
      },
    },
    '.clapper .stick1 .rect': (i: number) => ({
      0: {
        transform: {
          scale: 0,
          skew: '15deg',
        },
      },
      0.7: {
        transform: {
          scale: 1,
        },
      },
      options: {
        delay: 0.6 + i * 0.1,
      },
    }),
    '.clapper .stick2 .rect': (i: number) => ({
      0: {
        transform: {
          scale: 0,
          skew: '-15deg',
        },
      },
      0.7: {
        transform: {
          scale: 1,
        },
      },
      options: {
        delay: 0.8 + i * 0.1,
      },
    }),
  };
  playState = 'play';
  time = 0;
  keyframes2 = {
    '.circles .circle': (i: number) => ({
      0: { 'border-width': '150px', opacity: 1, transform: 'translate(-50%, -50%) scale(0)' },
      1.5: { 'border-width': '0px', opacity: 0.3, transform: 'scale(0.7)' },
      options: {
        delay: i * 0.4,
      },
    }),
  };
  @ViewChild('scene', { static: false }) scene: NgxSceneComponent;

  onAnimate = e => {
    this.time = 100 * e.time / e.currentTarget.getDuration();
  }
  onPlay = e => {
    this.playState = 'pause';
  }
  onPaused = e => {
    this.playState = 'play';
  }
  onClick = () => {
    this.scene.isPaused() ? this.scene.play() : this.scene.pause();
  }
  onInput = e => {
    this.scene.pause();
    this.scene.setTime((e.currentTarget as HTMLInputElement).value + '%');
  }
}
