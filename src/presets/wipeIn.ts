import SceneItem from "../SceneItem";
import { StateInterface } from "../Animator";

export default function wipeIn({property = "left", from = "-100%", to = "0%", ...options}: StateInterface) {
	return new SceneItem({
		"0%": {[property]: from},
		"100%": {[property]: to},
	}, options);
}
