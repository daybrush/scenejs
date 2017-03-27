import Step from "./Step";
export default class TimelineStep extends Step{
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
