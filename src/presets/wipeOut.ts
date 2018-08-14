import wipeIn from "./wipeIn";
import { StateInterface } from "../Animator";

export default function wipeOut(options: StateInterface) {
	return wipeIn(Object.assign({
		from: "0%",
		to: "100%",
	}, options));
}
