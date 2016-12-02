//every.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
*/
if (!Array.prototype.every) {
  Array.prototype.every = function(callback, thisArg) {
    var T, k;

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.every called on null or undefined');
    }

    // 1. Let O be the result of calling ToObject passing the this 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    T = (arguments.length > 1) ? thisArg : void 0;

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callback with T as the this value and argument list 
        //     containing kValue, k, and O.
        var testResult = callback.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
//filter.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.filter called on null or undefined');
    }

    var t = Object(this);
    var len = t.length >>> 0;

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var res = [];

    var T = (arguments.length > 1) ? thisArg : void 0;
    
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (callback.call(T, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
//indexOf.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {


    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.indexOf called on null or undefined');
    }

    var k;
    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
//forEach.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {


        if (this === void 0 || this === null) {
            throw new TypeError('Array.prototype.forEach called on null or undefined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (callback.__class__ !== 'Function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        var T = (arguments.length > 1) ? thisArg : void 0;


        // 6. Let k be 0
        //k = 0;

        // 7. Repeat, while k < len
        for (var k = 0; k < len; k++) {
            var kValue;
            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {
                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];
                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
        }
        // 8. return undefined
    }
}
//isArray.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*/
if (!Array.isArray) {
  Array.isArray = function(arg) {

    if (arg === void 0 || arg === null) {
      return false;
    }
  	return (arg.__class__ === 'Array');
  };
}
//lastIndexOf.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.15
// Reference: http://es5.github.io/#x15.4.4.15
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement, fromIndex) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
    }

    var n, k,
      t = Object(this),
      len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
//map.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.map called on null or undefined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    T = (arguments.length > 1) ? thisArg : void 0;

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    for (var k = 0; k < len; k++) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
    }
    // 9. return A
    return A;
  };
}
//reduceRight.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.22
// Reference: http://es5.github.io/#x15.4.4.22
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callback, initialValue) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length > 1) 
      {
        value = initialValue;
      } 
    else 
      {
        while (k >= 0 && !(k in t)) {
          k--;
        }
        if (k < 0) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k--];
      }
      
    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
//reduce.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this), len = t.length >>> 0, k = 0, value;

    if (arguments.length > 1) 
      {
        value = initialValue;
      } 
    else 
      {
        while (k < len && !(k in t)) {
          k++; 
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k++];
      }

    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
//some.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
*/
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function(callback, thisArg) {

    if (this === void 0 || this === null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (callback.__class__ !== 'Function') {
      throw new TypeError(callback + ' is not a function');
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var T = arguments.length > 1 ? thisArg : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && callback.call(T, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}
//create.js
if (!Object.create) {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function(O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (Object(O) !== O && O !== null) {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            var descriptor = Properties[prop];
            if (Object(descriptor) !== descriptor) {
              throw TypeError(prop + 'must be an object');
            }
            if ('get' in descriptor || 'set' in descriptor) {
              throw new TypeError('getters & setters can not be defined on this javascript engine');
            }
            if ('value' in descriptor) {
              obj[prop] = Properties[prop];
            }

          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}
//defineProperty.js
if (!Object.defineProperty) {

    Object.defineProperty = function defineProperty(object, property, descriptor) {

        if (Object(object) !== object) {
            throw new TypeError('Object.defineProperty can only be called on Objects.');
        }

        if (Object(descriptor) !== descriptor) {
            throw new TypeError('Property description can only be an Object.');
        }

        if ('get' in descriptor || 'set' in descriptor) {
            throw new TypeError('getters & setters can not be defined on this javascript engine');
        }
        // If it's a data property.
        if ('value' in descriptor) {
            // fail silently if 'writable', 'enumerable', or 'configurable'
            // are requested but not supported
            // can't implement these features; allow true but not false
            /* if ( 
                     ('writable' in descriptor && !descriptor.writable) ||
                     ('enumerable' in descriptor && !descriptor.enumerable) ||
                     ('configurable' in descriptor && !descriptor.configurable)
                 )
                     {
                         throw new RangeError('This implementation of Object.defineProperty does not support configurable, enumerable, or writable properties SET to FALSE.');
                     }*/


            object[property] = descriptor.value;
        }
        return object;
    }
}
//freeze.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.9
// http://es5.github.com/#x15.2.3.9
if (!Object.freeze) {
    Object.freeze = function freeze(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.freeze can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
//defineProperties.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
*/
if (!Object.defineProperties) {

  Object.defineProperties = function(object, props) {

    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function convertToDescriptor(desc) {

      if (Object(desc) !== desc) {
        throw new TypeError('Descriptor can only be an Object.');
      }


      var d = {};

      if (hasProperty(desc, "enumerable")) {
        d.enumerable = !!desc.enumerable;
      }

      if (hasProperty(desc, "configurable")) {
        d.configurable = !!desc.configurable;
      }

      if (hasProperty(desc, "value")) {
        d.value = desc.value;
      }

      if (hasProperty(desc, "writable")) {
        d.writable = !!desc.writable;
      }

      if (hasProperty(desc, "get")) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      }

      if (hasProperty(desc, "set")) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      }

      return d;
    }

    if (Object(object) !== object) {
      throw new TypeError('Object.defineProperties can only be called on Objects.');
    }

    if (Object(props) !== props) {
      throw new TypeError('Properties can only be an Object.');
    }

    var properties = Object(props);
    for (propName in properties) {
      if (hasOwnProperty.call(properties, propName)) {
        var descr = convertToDescriptor(properties[propName]);
        object[propName] = descr.value;
      }
    }
    return object;
  }
}
//getOwnPropertyNames.js
if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
        }

        var props = object.reflect.properties;
        var methods = object.reflect.methods;
        var all = methods.concat(props);
        var names = [];
        for (var i = 0; i < all.length; i++) {
            names.push(all[i].name);
        }
        return names;
    };
}
//getPrototypeOf.js
if (!Object.getPrototypeOf) {
	Object.getPrototypeOf = function(object) {
		if (Object(object) !== object) {
			throw new TypeError('Object.getPrototypeOf can only be called on Objects.');
		}
		return object.__proto__;
	}
}
//getOwnPropertyDescriptor.js
if (!Object.getOwnPropertyDescriptor) {

	Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
	if (Object(object) !== object) 
		{
			throw new TypeError('Object.getOwnPropertyDescriptor can only be called on Objects.');
		}

	var descriptor;
	if(!Object.prototype.hasOwnProperty.call(object, property))
		{
			return descriptor;
		}

    descriptor = {
        enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
        configurable: true
    };

    descriptor.value = object[property];

    var psPropertyType = object.reflect.find(property).type;
	descriptor.writable = (psPropertyType === "readwrite");

    return descriptor;
	}
}
//isSealed.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.11
// http://es5.github.com/#x15.2.3.11
if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isSealed can only be called on Objects.');
        }
        return false;
    };
}
//isFrozen.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.12
// http://es5.github.com/#x15.2.3.12
if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isFrozen can only be called on Objects.');
        }
        return false;
    };
}
//isExtensible.js
// ES5 15.2.3.13
// http://es5.github.com/#x15.2.3.13
if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.isExtensible can only be called on Objects.');
        }
        return true;
    };
}
//keys.js
/*
Original taken from
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Polyfill

Ther is no EnumBug in Photoshop scripting environment, so i cut unused code.
*/

if (!Object.keys) {
  Object.keys = (function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    return function(obj) {
      if (Object(obj) !== obj) {
        throw new TypeError('Object.keys can only be called on Objects.');
      }

      var result = [],
        prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      return result;
    };
  }());
}
//preventExtensions.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.10
// http://es5.github.com/#x15.2.3.10
if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.preventExtensions can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
//seal.js
/*
https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
*/
// ES5 15.2.3.8
// http://es5.github.com/#x15.2.3.8
if (!Object.seal) {
    Object.seal = function seal(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.seal can only be called on Objects.');
        }
        // this is misleading and breaks feature-detection, but
        // allows "securable" code to "gracefully" degrade to working
        // but insecure code.
        return object;
    };
}
//bind.js
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

WARNING! Bound functions used as constructors NOT supported by this polyfill!
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Bound_functions_used_as_constructors
*/
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (this.__class__ !== 'Function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
//trim.js
/*
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
*/
if (!String.prototype.trim) {
	// Вырезаем BOM и неразрывный пробел
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}
