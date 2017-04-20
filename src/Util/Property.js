/*@import PropertyObject from "../PropertyObject";*/
/*@import {COLOR_MODELS, hexToRGB, hex4to6, hslToRGB} from "./Color";*/
/*@import {isString, isObject, isUndefined} from "../Util";*/



/*@export */const splitComma = function(text) {
    //divide comma(,)
    const matches = text.split(/("[^"]"|'[^']'|[^,\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^,\s()]*)|\s*\,\s*/g);
    const length = matches.length;
    const arr = [];
    let value, arrValue, index = 0;
    for(let i = 0; i < length; ++i) {
        value = matches[i];
        if(isUndefined(value)) {
            ++index;
            continue;
        } else if(!value) {
            continue;
        }
        arrValue = arr[index];
        arr[index] = arrValue ? arrValue + value : value;
    }
    return arr;
}
/*@export */const arrayToColorObject = function(arr) {
    let model = "rgba";
    if(arr instanceof PropertyObject) {
        arr.type = "color";
        arr.model = model;
        arr.prefix = model + "(";
        return arr;
    }

    if(arr.length === 3)
        arr[3] = 1;

    const object = new PropertyObject(arr, {
        separator : ",",
        type : "color",
        model : model,
        prefix : model + "(",
        suffix : ")"
    });

    return object;
}

/*@export */const stringToColorObject = function(value) {
    let colorArray = 0,colorObject = 0; 
    if(value.charAt(0) === "#")  {
        if(value.length === 4) {
            colorArray = hexToRGB(hex4to6(value));
        } else if(value.length === 7) {
            colorArray = hexToRGB(value);
        } else {
            colorArray = hexToRGB(value);
        }
        return arrayToColorObject(colorArray);
    } else if(value.indexOf("(") !== -1) {		
        colorObject = toBracketObject(value);
    } else {
        throw new Error("Invalid Format : Not a Color - " + value);
    }

    return toColorObject(colorObject);
}


 /**
	* convert text with parentheses to PropertyObject[type=color].
	* If the values are not RGBA model, change them RGBA mdoel.
	* @param {String|PropertyObject} value - color value "rgba(0,0,0,1)"
	* @return {PropertyObject} PropertyObject[type=color]
	* @example
toColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/

/*@export */const toColorObject = function(value) {
    
    let colorObject;
    if(value instanceof PropertyObject) {
        colorObject = value;
    } else if(isObject(value)) {
        colorObject = arrayToColorObject(value);
    } else if(isString(value)) {
        return stringToColorObject(value);
    } else {
        return value;
    }
    let colorArray = colorObject.value;
    
    const length = colorArray.length;
    if(length === 4)
        colorArray[3] = parseFloat(colorArray[3]);
    else if(length === 3)
        colorArray[3] = 1;


    colorObject.type = "color";
    let colorModel = colorObject.model.toLowerCase(), i;

    //rgb hsl model to CHANGE rgba hsla
    //string -> number
    switch(colorModel) {
        case "rgb":
            arrayToColorObject(colorObject);
        case "rgba":
            for(i = 0; i < 3; ++i) {
                colorArray[i] = parseInt(colorArray[i]);
            }
        break;
        case "hsl":
        case "hsla":
            for(i = 1; i < 3; ++i) {
                if(colorArray[i].indexOf("%") !== -1)
                    colorArray[i] = parseFloat(colorArray[i]) / 100;
            }
            // hsl, hsla to rgba
            colorArray = hslToRGB(colorArray);
            return arrayToColorObject(colorArray);
    }
    return colorObject;
}

/*@export */const toBracketObject = function(value) {
    /*
    [prefix, value, other]
    */
    const matches = (/([^\(]*)\(([\s\S]*)\)([\s\S]*)/g).exec(value);
    if(!matches || matches.length < 4)
        return value;
        
    const model = matches[1] || "", prefix = model + "(";
    const text = matches[2];
    const suffix = ")" + matches[3];
    
    //divide comma(,)
    const texts = splitComma(text);
    const length = texts.length;
    let result, separator = ",";
    if(length === 1) {
        result = toPropertyObject(text);
        if(!result.prefix && !result.suffix) {
            separator = result.separator;
            result = result.value;
        }
    }
    if(!result)
        result = texts.map(text => toPropertyObject(text));
    return new PropertyObject(result, {
        separator,
        model,
        prefix,
        suffix
    });
    return object;
};
/*@export */const toPropertyObject = function(value) {
    if(!isString(value))
        return value;
    
    //ref http://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex
    //inner brackets 
    // one level nesting \(([^()]*|\([^()]*\))*\)
    // two level nesting \(([^()]*|\(([^()]*|\([^()]*\))*\))*\)
    //one level nesting
    const matches = value.match(/"[^"]*"|'[^']*'|[^()\s]*\(([^()]*|\([^()]*\))*\)[^()\s]*|[^()\s,]+/g);
    
    
    
    let result;
    if(matches && matches.length != 1) {
        result = new PropertyObject(matches.map(v => toPropertyObject(v)), " ");
        result.type = "array";

        return result;
    } else if((result = value.charAt(0)) && (result === '"' || result === "'")) {
        return value;
    } else if(value.indexOf("(") != -1) {//in bracket.
        result = toBracketObject(value);
        if(!isObject(result))
            return result;
		
        const model = result.model.toLowerCase();
        
        if(COLOR_MODELS.indexOf(model) !== -1)
            return toColorObject(result);
        
        result.each(function(value, index) {
           result.set(index, toPropertyObject(value));
        });
        return result;
    }else if(value.indexOf("#") === 0) {
        return toColorObject(value);
    }
    
    return value;
}