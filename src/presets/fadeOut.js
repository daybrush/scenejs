import SceneItem from "../SceneItem";

export default function fadeOut({duration, from = 1, to = 0, ...options}) {
	return new SceneItem({
		0: {opacity: from},
		[duration]: {opacity: to},
	}, options);
}
