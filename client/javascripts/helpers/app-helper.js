AppHelper = {
	removeBlanks: function (obj) {
        if (_.isString(obj) || _.isNumber(obj)) {
            return obj;
        }
        if (_.isArray(obj)) {
            obj = _.map(obj, function (element) {
                return this.removeBlanks(element);
            }, this);
            return _.reject(obj, function (element) {
                return (_.isUndefined(element) || (_.isString(element) && element.replace(/^\s+|\s+$/g, '') === '') || (_.isObject(element) &&  _.isEmpty(element)));
            });
        }
        _.each(obj, function (value, key) {
            obj[key] = this.removeBlanks(value);
        },  this);
        var delete_keys = [];
        _.each(obj, function (value, key) {
            if (_.isUndefined(value) || (_.isString(value) && value.replace(/^\s+|\s+$/g, '') === '') || (_.isObject(value) &&  _.isEmpty(value))) {
                delete_keys.push(key);
            }
        });
        _.each(delete_keys, function (key) {
            delete obj[key];
        });
        return obj;
    }
};
