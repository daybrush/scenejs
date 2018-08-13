import SceneItem from "../SceneItem";
import { StateInterface } from "../Animator";

export default function wipeOut({property = "left", from = "0%", to = "100%", ...options}: StateInterface) {
	return new SceneItem({
		"0%": {[property]: from},
		"100%": {[property]: to},
	}, options);
}
