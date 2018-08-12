import SceneItem from "../SceneItem";

export default function wipeOut({duration, property = "left", from = "0%", to = "100%", ...options}) {
	return new SceneItem({
		0: {[property]: from},
		[duration]: {[property]: to},
	}, options);
}
