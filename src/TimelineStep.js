import Step from "./Step";

class TimelineStep extends Step {
	constructor(list, value) {
		super();
		this._list = list;
		this._value = value;
	}
	list() {
		return this._list;
	}
	length() {
		return this._list.length;
	}
	get(step) {
		return this._value[this._list[step]];
	}
}
export default TimelineStep;
