import SceneItem from "../SceneItem";

export default function fadeIn({duration, from = 0, to = 1, ...options}) {
	return new SceneItem({
		0: {opacity: from},
		[duration]: {opacity: to},
	}, options);
}
