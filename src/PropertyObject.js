/*@import {isObject, isString} from "./Util";*/

/*@export default */class PropertyObject {
    /**
	* Make string, array to PropertyObject for the dot product
	* @param {String|Array} value - This value is in the array format ..
	* @param {String} separator - Array separator.
	* @example
var obj1 = new Scene.PropertyObject("1,2,3", ",");
var obj2 = new Scene.PropertyObject([1,2,3], " ");
var obj3 = new Scene.PropertyObject("1$2$3", "$");

//rgba(100, 100, 100, 0.5)
var obj4 = new Scene.PropertyObject([100,100,100,0.5], {
	"separator" : ",",
	"prefix" : "rgba(",
	"suffix" : ")"
});
     */
	constructor(value, options = ",") {
        this.prefix = "";
        this.suffix = "";
        this.model = "";
        this.type = "";
		this.separator = ",";
		this.init(value, options);
    }
    init(value, options) {
        if(isObject(options)) {
            for(var key in options) {
                this[key] = options[key];
            }
        } else {
            this.separator = options;
        }
        
        if(isString(value))
        	this.value = value.split(this.separator);
        else if(isObject(value))
        	this.value = value;
        else
        	this.value = [value];
    }
    get length() {
        const value = this.value;
        if(value.hasOwnProperty("length"))
            return value.length;
        let length = 0;
		for(let i in value) {
    		++length;
		}
		return length;
        
    }
    get(index) {
        return this.value[index];
    }
    set(index, value) {
        this.value[index] = value;
        return this;
    }
    copy() { 
		let v = "";
		const arr = [], value = this.value;
	    
		for(let i in value) {
			v = value[i];
			arr.push((v instanceof PropertyObject) ? v.copy() : v);
		}
		return new PropertyObject(arr, {
            separator: this.separator,
            prefix: this.prefix,
            suffix: this.suffix,
            model: this.model,
            type: this.type    
        });
    }
	/**
	* Make Property Object to String
	* @return {String} Make Property Object to String
	* @example
//rgba(100, 100, 100, 0.5)
var obj4 = new Scene.PropertyObject([100,100,100,0.5], {
	"separator" : ",",
	"prefix" : "rgba(",
	"suffix" : ")"
});
obj4.toValue();  // =>   "rgba(100,100,100,0.5)"
	*/
	toValue() {
        return this.prefix + this.join() + this.suffix;	
	}    
	/**
	* Make Property Object's array to String
	* @return {String} Join the elements of an array into a string
	* @example
	//rgba(100, 100, 100, 0.5)
	var obj4 = new Scene.PropertyObject([100,100,100,0.5], {
		"separator" : ",",
		"prefix" : "rgba(",
		"suffix" : ")"
	});
	
	obj4.join();  // =>   "100,100,100,0.5"
     */
    join() {
		let v = "";
		const arr = [], value = this.value, separator = this.separator;
	    
		for(let i in value) {
			v = value[i];
			arr.push((v instanceof PropertyObject) ? v.toValue() : v);
		}
		return arr.join(separator);
	}

	/**
	* executes a provided function once per array element.
	* @param {Function} callback - Function to execute for each element, taking three arguments
	* @param {All} [callback.currentValue] The current element being processed in the array.
	* @param {Number} [callback.index] The index of the current element being processed in the array.
	* @param {Array} [callback.array] the array.
	* @return {String} Join the elements of an array into a string
	* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
	* @example
//rgba(100, 100, 100, 0.5)
var obj4 = new Scene.PropertyObject([100,100,100,0.5], {
	"separator" : ",",
	"prefix" : "rgba(",
	"suffix" : ")"
});

obj4.join();  // =>   "100,100,100,0.5"
	*/
	each(func) {
		var arr = this.value;
		for(var i in arr) {
			func(arr[i], i, arr);
		}
	}
}