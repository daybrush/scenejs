import fadeIn from "./fadeIn";
import { StateInterface } from "../Animator";

export default function fadeOut(options: StateInterface) {
	return fadeIn(Object.assign({
		from: 1,
		to: 0,
	}, options));
}
