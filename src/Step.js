/*@export default */class Step {
    constructor() {
        this._step = 0;
    }
    length() {}
    get() {}
    list() {}

    hasNext() {
        const length = this.length();
        if(this._step + 1 >= length)
            return false;

        return true;
    }
    hasPrev() {
        const length = this.length();
        if(this._step - 1 < 0 || length === 0)
            return false;

        return true;
    }
    next() {
        this.set(this._step + 1);
        return this;
    }
    prev() {
        this.set(this._step - 1);
        return this;
    }
    value() {
        return this.get(this._step);
    }
    key() {
        return this.list()[this._step];
    }
    set(step) {
        const length = this.length();
        if(length === 0 || this._step < 0)
            this._step = 0;
        else if(length <= this._step)
            this._step = length - 1;
        else
            this._step = step;
        return this;
    }
    first() {
        this._step = 0;
        return this;
    }
    last() {
        const length = this.length();
        this._step = length === 0 ? 0 : length - 1;
        return this;
    }
    valid() {
        return this._step >= 0 && this._step <= this.length();
    }
}

//step.set(1);
//step.next().value();
//step.prev().value();
