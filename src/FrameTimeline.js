/*@export default */class FrameTimeline extends Timeline {
    constructor() {
        super();
        this.updateNumber = {};
        this.names = {};
    }
    addTime(time) {
        super.addTime(time);

        if(this.updateNumber.hasOwnProperty(time))
            return;
        this.updateNumber[time] = 0;
    }
    removeTime(time) {
        super.removeTime(time);
        delete this.updateNumber[time];
    }
    update() {
        const updateNumber = this.updateNumber;
        let frame, time;
        for(time in updateNumber) {
            frame = this.get(time);
            if(updateNumber[time] === frame.updateNumber)
                continue;

            this.updateFrame(time, frame);
        }
    }
    updateFrame(time, frame = this.get(time)) {
        if(!frame)
            return this;

        const frameNames = frame.names;
        const itemNames = this.names;
        let framePropertyNames, itemPropertyNames, name;
        for(let role in frameNames) {
            framePropertyNames = frameNames[role];
            itemPropertyNames = itemNames[role];

            for(name in framePropertyNames) {
                if(itemPropertyNames.hasOwnProperty(name))
                    continue;

                itemPropertyNames[name] = true;
            }
        }
        this.updateNumber[time] = frame.updateNumber
        return this;
    }
}
