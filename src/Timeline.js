class Timeline {
    constructor() {
        this.times = [];
        this.timeObject = {};
    }
    get last() {
        const times = this.times;
        return times.length === 0 ? 0 : times[times.length - 1];
    }
    get length() {
        return this.times.length;
    }
    add(time, object) {
        this.timeObject[time] = object;
        this.adTime(time);
        return this;
    }
    addTime(time) {
        const times = this.times;
        const length = times.length;
        let pushIndex = length;
        //order by time
        for(let i = 0; i < length; ++i) {
            //if time is smaller than times[i], add time to index
            if(time === times[i]) {
                return this;
            } else if(time < times[i]) {
                pushIndex = i;
                break;
            }
        }
        this.times.splice(pushIndex, 0, time);
        return this;
    }
    has(time) {
        return this.timeObject.hasOwnProperty(time);
    }
    get(time) {
        return this.timeObject[time];
    }
    remove(time) {
        delete this.timeObject[time];
        this.removeTime(time);
        return this;
    }
    removeTime(time) {
        const index = this.times.indexOf(time);
        if(index === -1)
            return this;

        this.times.splice(index, 1);
        return this;
    }
}
