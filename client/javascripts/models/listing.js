Listing = Backbone.Model.extend({
    urlRoot: 'api',

    display_name: function () {
        return (this.get('address').name || '') + (this.get('unit') ? ', Unit: ' + this.get('unit') : '') + (this.get('floor') ? ', Floor: ' + this.get('floor') : '');
    }
});