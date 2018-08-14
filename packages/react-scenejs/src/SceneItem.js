import React from "react";
import PropTypes from "prop-types";
import {SceneItem as NativeSceneItem, Frame} from "scenejs";

export default class SceneItem extends React.Component {
	static options = {
		duration: PropTypes.number,
		fillMode: PropTypes.string,
		direction: PropTypes.string,
		iterationCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		delay: PropTypes.number,
		easing: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
		playSpeed: PropTypes.number,
	};
	static events = {
		onPlay: PropTypes.func,
		onPaused: PropTypes.func,
		onEnded: PropTypes.func,
		onTimeUpdate: PropTypes.func,
		onIteration: PropTypes.func,
		onAnimate: PropTypes.func,
	};
	static propTypes = {
		keyframes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		play: PropTypes.bool,
		...SceneItem.options,
		...SceneItem.events,

	};
	static defaultProps = {
		duration: 0,
		fillMode: "forwards",
		direction: "normal",
		playSpeed: 1,
		iterationCount: 1,
		delay: 0,
		easing: 0,
		play: true,
		onPlay: () => {},
		onPaused: () => {},
		onEnded: () => {},
		onTimeUpdate: () => {},
		onIteration: () => {},
		onAnimate: () => {},
	};
	constructor(props) {
		super(props);

		this.state = {
			frame: new Frame(),
			styles: {},
			currentTime: 0,
			time: 0,
		};
		this.item = new NativeSceneItem();
		const events = SceneItem.events;

		for (const name in events) {
			const eventName = name.replace("on", "").toLowerCase();

			this.item.on(eventName, this[name]);
		}
		this.item.on("animate", ({currentTime, time, frame}) => {
			this.setState({
				time,
				currentTime,
				frame,
				styles: frame.toCSSObject(),
			});
		});
		if (this.props.keyframes) {
			this.item.set(this.props.keyframes);
		} else {
			this.item.set("0%", this.props.from);
			this.item.set("100%", this.props.to);
		}
		const itemOptions = {};
		const options = SceneItem.options;

		for (const name in options) {
			itemOptions[name] = this.props[name];
		}
		this.item.setOptions(itemOptions);
	}
	render() {
		const state = this.state;
		const children = this.props.children;

		return Array.isArray(children) ?
			children.map(component => (typeof component === "function" ? component(state) : component)) :
			children(state);
	}
	componentDidMount() {
		if (this.props.play === true) {
			this.play();
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.play !== this.props.play) {
			if (this.props.play) {
				this.play();
			} else {
				this.pause();
			}
		}
	}
	play() {
		this.item.play();
	}
	pause() {
		this.item.pause();
	}
	onPlay = e => this.props.onPlay(e);
	onPaused = e => this.props.onPaused(e);
	onEnded = e => this.props.onEnded(e);
	onTimeUpdate = e => this.props.onTimeUpdate(e);
	onIteration = e => this.props.onIteration(e);
	onAnimate = e => this.props.onAnimate(e);
}
