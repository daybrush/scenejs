import {isObject, isString} from "./utils";

interface PropertyObjectInterface {
	prefix?: string;
	suffix?: string;
	model?: string;
	type?: string;
	separator?: string;
	[key: string]: any;
}
/**
* Make string, array to PropertyObject for the dot product
* @memberof Scene
*/
class PropertyObject {
	public value: any[];
	public options: PropertyObjectInterface;

	/**
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
	constructor(value: string | any[], options: PropertyObjectInterface = {}) {
		this.options = {
			prefix: "",
			suffix: "",
			model: "",
			type: "",
			separator: ",",
		};
		this.setOptions(options);
		this.init(value);
	}
	public setOptions(options: PropertyObjectInterface) {
		(Object as any).assign(this.options, options);
		return this;
	}
	public getOption(name: string) {
		return this.options[name];
	}
	/**
	* the number of values.
	* @example
const obj1 = new PropertyObject("1,2,3", ",");

console.log(obj1.length);
// 3
	 */
	public size() {
		return this.value.length;
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
	public get(index: number) {
		return this.value[index];
	}
	/**
	* Set the value at that index
	* @param {Number} index - index
	* @param {Object} value - text, a number, object to set
	* @return {PropertyObject} An instance itself
	* @example
const obj1 = new PropertyObject("1,2,3", ",");
obj1.set(0, 2);
console.log(obj1.toValue());
// 2,2,3
	 */
	public set(index: number, value: any) {
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
	public clone(): PropertyObject {
		const arr = this.value.map(v => ((v instanceof PropertyObject) ? v.clone() : v));

		return new PropertyObject(arr, {
			separator: this.options.separator,
			prefix: this.options.prefix,
			suffix: this.options.suffix,
			model: this.options.model,
			type: this.options.type,
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
	public toValue(): string {
		return this.options.prefix + this.join() + this.options.suffix;
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
	public join() {
		return this.value.map(v => ((v instanceof PropertyObject) ? v.toValue() : v)).join(this.options.separator);
	}
	/**
	* executes a provided function once per array element.
	* @param {Function} callback - Function to execute for each element, taking three arguments
	* @param {All} [callback.currentValue] The current element being processed in the array.
	* @param {Number} [callback.index] The index of the current element being processed in the array.
	* @param {Array} [callback.array] the array.
	* @return {PropertyObject} An instance itself
	* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
	* @example
//rgba(100, 100, 100, 0.5)
var obj4 = new PropertyObject([100,100,100,0.5], {
	"separator" : ",",
	"prefix" : "rgba(",
	"suffix" : ")"
});

obj4.forEach(t => {
	console.log(t);
});  // =>   "100,100,100,0.5"
	*/
	public forEach(func: (value?: any, index?: number, array?: any[]) => void) {
		this.value.forEach(func);
		return this;
	}
	private init(value: string | any[]) {
		if (isString(value)) {
			this.value = value.split(this.options.separator);
		} else if (isObject(value)) {
			this.value = value;
		} else {
			this.value = [value];
		}
		return this;
	}
}
export default PropertyObject;
