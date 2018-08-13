import SceneItem from "../SceneItem";
import { StateInterface } from "../Animator";

export default function fadeIn({from = 0, to = 1, ...options}: StateInterface) {
	return new SceneItem({
		"0%": {opacity: from},
		"100%": {opacity: to},
	}, options);
}
