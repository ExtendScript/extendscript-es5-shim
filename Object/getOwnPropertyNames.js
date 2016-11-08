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