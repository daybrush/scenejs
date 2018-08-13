import SceneItem from "../SceneItem";
import { StateInterface } from "../Animator";

export default function blink({from = 0, to = 1, ...options}: StateInterface) {
	return new SceneItem({
		"0%": {opacity: from},
		"50%": {opacity: to},
		"100%": {opacity: from},
	}, options);
}
