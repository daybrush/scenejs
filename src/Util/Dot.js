/*@import {isUndefined, isObject, splitUnit} from "../Util";*/
/*@import PropertyObject from "../PropertyObject";*/
/*@import {toColorObject} from "./Property";*/


/**
* The dot product of PropertyObject(type=color)
* If the values are not RGBA model, change them RGBA mdoel.
* @function Scene.Util#dotColor
* @param {PropertyObject|String} a1 value1
* @param {PropertyObject|String} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} PropertyObject(type=color).
* @example
var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
Util.dotColor("#000",  colorObject, 0.5, 0.5);
// "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
// return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
*/
/*@export */const dotColor = function(a1, a2, b1, b2) {
    /*
    convert array to PropertyObject(type=color)
    */
    if(!(a1 instanceof PropertyObject))
        a1 = toColorObject(a1);
    
    if(!(a2 instanceof PropertyObject))
        a2 = toColorObject(a2);
    
    
    let value1 = a1.value, value2 = a2.value;
    /*
        If the model name is not same, the inner product is impossible.
    */
    let model1 = a1.model, model2 = a2.model;
    if(model1 !== model2)
        return dot(a1.toValue(), a2.toValue(), b1, b2);
    
    if(value1.length === 3)
        value1[3] = 1;
    
    if(value2.length === 3)
        value2[3] = 1;
    
    var v = dotArray(value1, value2, b1, b2);
    var colorModel = model1;		
    for(var i = 0; i < 3; ++i) {
        v[i] = parseInt(v[i]);
    }
    
    var object = new PropertyObject(v, {
        type: "color",
        model: colorModel,
        prefix: colorModel + "(",
        suffix: ")"
    });

    return object;
}

/**
* The dot product of Arrays
* @function Scene.Util#dotArray
* @param {Array} a1 value1
* @param {Array} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {Array|Object} Array.
* @example
Util.dotArray([0, 0, 0, 1],[50, 50, 50, 1],0.5, 0.5);
// => [25, 25, 25, 1]
*/
/*@export */const dotArray = function(a1, a2, b1, b2) {
    const obj = [];
    let v1, v2;
    		
    for(let i in a1) {
        v1 = a1[i];
        if(!i in a2)
            obj[i] = v1;
        else
            obj[i] = dot(v1, a2[i], b1, b2);
    }	 
    
    return obj;
}
/*@export */const dotObject = function(a1, a2, b1, b2) {
    const a1Type = a1.type;
    if(a1Type === "color")
        return dotColor(a1, a2, b1, b2);
    
    let value1 = a1.value, value2 = a2.value;
    if(!isObject(a2))
        return a1;
        
    
    const arr = dotArray(value1, value2, b1, b2);
    const obj = new PropertyObject(arr, a1.separator);
    obj.prefix = a1.prefix;
    obj.suffix = a1.suffix;
    
    return obj;
}
/*@export */const dot = function dot(a1, a2, b1, b2) {
    
    //dot Object
    if(a1 instanceof PropertyObject)
        return dotObject(a1, a2, b1, b2);
    
    
    // 0일 경우 0으로 나누는 에러가 생긴다.
    if(b1 + b2 == 0)
        return a1;
    
    // 값과 단위를 나눠준다.	
    var v1 = splitUnit(a1);
    var v2 = splitUnit(a2);
    var r1 = b1 / (b1 + b2);
    var r2 = 1- r1;
    var v;
    
    // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
    if(isNaN(v1.value) || isNaN(v2.value)) {
        return r1 >=1 ? a2 : a1;
    } else {
        v = v1.value * r2 + v2.value * r1;
    }
    
    const unit = v1.unit || v2.unit || false;
    if(unit === false)
        return v;
    
    return v + unit.trim();
};