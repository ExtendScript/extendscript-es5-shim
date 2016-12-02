# extendscript-es5-shim
A collection of ES5 shims for polyfiling Exendscript


## Installation  

Currently you can install the package using npm:  
    
    npm init -y
    npm install git+https://github.com/ExtendScript/extendscript-es5-shim.git

## Usage

## Array, String and Function notes
All polyfills could be used in your code.

## Object notes
Because it is impossible to emulate property descriptors in ES3 engine, the following functions are just a mocks and you should avoid to use them in your code if it is possible, only shim thirdparty libraries:
	
### defineProperty, defineProperties
Supports only **_data descriptor_**. **_Writable_**, **_enumerable_** and **_configurable_** properties of descriptor are ignored. If you try to define **_set_** or **_get_** propperty this methods will throw an error. 

### getOwnPropertyDescriptor
Supports only **_data descriptor_**. **_Configurable_** property of descriptor is always **TRUE**. **_Enumerable_** and  **_writable_** properties of descriptor will be always **TRUE** on user defined objects, but may vary on build in. 

### freeze, preventExtensions, seal
Only validate input parameter and return input if it is an object.

### isExtensible, isFrozen, isSealed
Validates input and returns **TRUE, FALSE, FALSE, respectively** if input parametr is an object.


**These functions you can use in your code:**

### create
Support of property descriptor is in the same level as in _**defineProperty**_. Although, you can use this function in your code like this:

```js
var obj1 = {a : 1};
var obj2 = Object.create(obj1, {b : {value : 2}});
```

or like that:

```js
var obj1 = {a : 1};
var obj2 = Object.create(obj1);
obj2.b = 2;
```


### getOwnPropertyNames
This function uses reflection interface, that ExtendScript provides (see JavaScript Tools Guide), to get own properties of an object (enumerable or not). But ther is no guarantee that the order of enumeration will be the same as in _for in loop_.
	
### keys
Use _for in loop_ along with _hasOwnProperty_ function to get own enumerable properties in object.

### getPrototypeOf
Use build in `__proto__` property as return value.  

## Development  

- Install the devDependencies by running `npm install`
- Bundle the index.js by running `npm run bundle`
- Add new prototypes in the respective folders
- If you need new folders, add the folder to the top of `./bin/concat.js` into the `folders` array



