class Scene {
    constructor() {
        this.options = {};
        this._playState = "paused";//paused|running|initial|inherit
    }
    load() {

    }
    set timgingFunction(value) {

    }
    get timingFunction() {

    }
    get duration() {
    }
    get playState() {

    }
    static addRole(role) {
        //frame.set
        //frame(time)
        //frame.property.get("")
        //frame.property.set("", "")
        //frame.property.remove("")
        Object.defineProperty(Scene.prototype, role, {
            get: function() {

            },
        });
    }
}

//timingFunciton
//duration
//playState  paused|running|initial|inherit

//iterationCount //infinite | number
Util.defineGetterSetter(Scene.prototype, "inifiniteCount", "options");
//none|forwards|backwards|both|initial
Util.defineGetterSetter(Scene.prototype, "fillMode", "options");
//normal|reverse|alternate|alternate-reverse|initial
Util.defineGetterSetter(Scene.prototype, "direction", "options");
//delay - time
Util.defineGetterSetter(Scene.prototype, "delay", "options");

//time
Util.defineGetterSetter(Scene.prototype, "time", "options");
