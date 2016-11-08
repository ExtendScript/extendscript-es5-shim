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