import SceneItem from "../SceneItem";

export default function wipeIn({duration, property = "left", from = "-100%", to = "0%", ...options}) {
	return new SceneItem({
		0: {[property]: from},
		[duration]: {[property]: to},
	}, options);
}
