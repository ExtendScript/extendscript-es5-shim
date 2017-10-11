if (!Object.keys) {
    Object.keys = function(object) {
        if (Object(object) !== object) {
            throw new TypeError('Object.keys can only be called on Objects.');
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var result = [];
        for (var prop in object) {
            if (hasOwnProperty.call(object, prop)) {
                result.push(prop);
            }
        }
        return result;
    };
}