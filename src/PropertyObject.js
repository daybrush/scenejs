import {has, isObject, isString} from "./utils";

class PropertyObject {
	/**
	* Make string, array to PropertyObject for the dot product
	* @param {String|Array} value - This value is in the array format ..
	* @param {String} separator - Array separator.
	* @example
var obj1 = new PropertyObject("1,2,3", ",");
var obj2 = new PropertyObject([1,2,3], " ");
var obj3 = new PropertyObject("1$2$3", "$");

// rgba(100, 100, 100, 0.5)
var obj4 = new PropertyObject([100,100,100,0.5], {
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
		let key;

		if (isObject(options)) {
			for (key in options) {
				this[key] = options[key];
			}
		} else {
			this.separator = options;
		}
		if (isString(value)) {
			this.value = value.split(this.separator);
		} else if (isObject(value)) {
			this.value = value;
		} else {
			this.value = [value];
		}
	}
	/**
	* the number of values.
	* @example
const obj1 = new PropertyObject("1,2,3", ",");

console.log(obj1.length);
// 3
	 */
	size() {
		const value = this.value;

		if (Array.isArray(value)) {
			return value.length;
		}
		let length = 0;
		let i;

		for (i in value) {
			if (!has(value, i)) {
				continue;
			}
			++length;
		}
		return length;
	}
	/**
	* retrieve one of values at the index
	* @param {Number} index - index
	* @return {Object} one of values at the index
	* @example
const obj1 = new PropertyObject("1,2,3", ",");

console.log(obj1.get(0));
// 1
	 */
	get(index) {
		return this.value[index];
	}
	/**
	* Set the value at that index
	* @param {Number} index - index
	* @param {Object} value - text, a number, object to set
	* @return {Object} one of values at the index
	* @example
const obj1 = new PropertyObject("1,2,3", ",");
obj1.set(0, 2);
console.log(obj1.toValue());
// 2,2,3
	 */
	set(index, value) {
		this.value[index] = value;
		return this;
	}
	/**
	* create a copy of an instance itself.
	* @return {PropertyObject} clone
	* @example
const obj1 = new PropertyObject("1,2,3", ",");
const obj2 = obj1.clone();

	 */
	clone() {
		const arr = [];
		const value = this.value;
		let v = "";
		let i;

		for (i in value) {
			v = value[i];
			arr.push((v instanceof PropertyObject) ? v.clone() : v);
		}
		return new PropertyObject(arr, {
			separator: this.separator,
			prefix: this.prefix,
			suffix: this.suffix,
			model: this.model,
			type: this.type,
		});
	}
	/**
	* Make Property Object to String
	* @return {String} Make Property Object to String
	* @example
//rgba(100, 100, 100, 0.5)
const obj4 = new PropertyObject([100,100,100,0.5], {
	"separator" : ",",
	"prefix" : "rgba(",
	"suffix" : ")",
});
console.log(obj4.toValue());
// "rgba(100,100,100,0.5)"
	*/
	toValue() {
		return this.prefix + this.join() + this.suffix;
	}
	/**
	* Make Property Object's array to String
	* @return {String} Join the elements of an array into a string
	* @example
	//rgba(100, 100, 100, 0.5)
	var obj4 = new PropertyObject([100,100,100,0.5], {
		"separator" : ",",
		"prefix" : "rgba(",
		"suffix" : ")"
	});
	obj4.join();  // =>   "100,100,100,0.5"
	 */
	join() {
		const arr = [];
		const value = this.value;
		const separator = this.separator;
		let v = "";
		let i;

		for (i in value) {
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
var obj4 = new PropertyObject([100,100,100,0.5], {
	"separator" : ",",
	"prefix" : "rgba(",
	"suffix" : ")"
});

obj4.join();  // =>   "100,100,100,0.5"
	*/
	each(func) {
		const arr = this.value;

		for (const i in arr) {
			func(arr[i], i, arr);
		}
	}
	multiply(number) {
		const arr = this.value;

		for (const i in arr) {
			if (arr[i] instanceof PropertyObject) {
				arr[i].multiply(number);
			} else {
				arr[i] *= number;
			}
		}
	}
}
export default PropertyObject;
