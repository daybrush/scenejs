import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SceneItem, easing, Scene } from './react-scenejs';
import './raindrop.css';

class App extends React.Component<{}, { time: string | number }> {
  constructor(props: any) {
    super(props);

    this.state = {
      time: 0,
    };
  }
  public render() {
    const time = this.state.time;
    const EASE_IN_OUT = easing.EASE_IN_OUT;
    const keyframes = {
      0: { 'border-width': '150px', 'opacity': 1, 'transform': 'scale(0)' },
      1: { 'border-width': '0px', 'opacity': 0.3, 'transform': 'scale(0.7)' }
    };
    return <div className='wrapper'>
      <Scene easing={EASE_IN_OUT} keyframes={{
        raindrop1: { keyframes, options: { delay: 0 } },
        raindrop2: { keyframes, options: { delay: 0.4 } },
        raindrop3: { keyframes, options: { delay: 0.8 } },
      }} iterationCount='infinite' css autoplay>
        <div className='container'>
          <div className='raindrop' data-scene-id='raindrop1'></div>
          <div className='raindrop' data-scene-id='raindrop2'></div>
          <div className='raindrop' data-scene-id='raindrop3'></div>
        </div>
      </Scene>
      <br />
      <input type='range' value={time} onInput={(e) => {
        this.setState({ time: (e.target as HTMLInputElement).value });
      }} />
      <br />
      <Scene easing={EASE_IN_OUT} time={`${time}%`} keyframes={{
        raindrop1: { keyframes, options: { delay: 0 } },
        raindrop2: { keyframes, options: { delay: 0.4 } },
        raindrop3: { keyframes, options: { delay: 0.8 } },
      }}>
        <div className='container'>
          <div className='raindrop' data-scene-id='raindrop1'></div>
          <div className='raindrop' data-scene-id='raindrop2'></div>
          <div className='raindrop' data-scene-id='raindrop3'></div>
        </div>
      </Scene>
      <div className='container'>
        <SceneItem
          time={`${time}%`}
          duration={1}
          from={{ 'border-width': '150px', 'opacity': 1, 'transform': 'scale(0)' }}
          to={{ 'border-width': '0px', 'opacity': 0, 'transform': 'scale(1)' }}
          iterationCount='infinite'>
          <div className='raindrop'></div>
        </SceneItem>
      </div>
    </div >;
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
