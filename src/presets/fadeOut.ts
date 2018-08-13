import SceneItem from "../SceneItem";
import { StateInterface } from "../Animator";

export default function fadeOut({from = 1, to = 0, ...options}: StateInterface) {
	return new SceneItem({
		"0%": {opacity: from},
		"100%": {opacity: to},
	}, options);
}
