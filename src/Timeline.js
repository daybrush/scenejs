/*@import TimelineStep from "./TimelineStep"*/



/*@export default */class Timeline {
    constructor() {
        this.times = [];
        this.item = {};
        this.step = new TimelineStep(this.times, this.item);
    }
    get last() {
        const times = this.times;
        return times.length === 0 ? 0 : times[times.length - 1];
    }
    get length() {
        return this.times.length;
    }
    add(time, object) {
        this.item[time] = object;
        this.addTime(time);
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
        return this.item.hasOwnProperty(time);
    }
    get(time) {
        return this.item[time];
    }
    remove(time) {
        delete this.item[time];
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
