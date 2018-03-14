if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

        if (Object(object) !== object) {
            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
        }
        var names = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
        for (var prop in object) {
            if (hasOwnProperty.call(object, prop)) {
                names.push(prop);
            }
        }
        var properties = object.reflect.properties;
        var methods = object.reflect.methods;
        var all = methods.concat(properties);
        for (var i = 0; i < all.length; i++) {
            var prop = all[i].name;
            if (hasOwnProperty.call(object, prop) && !(propertyIsEnumerable.call(object, prop))) {
                names.push(prop);
            }
        }
        return names;
    };
}