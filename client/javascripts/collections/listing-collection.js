ListingCollection = Backbone.Collection.extend({
    model: Listing,

    url: 'api/listings',

    parse: function (response) {
        this.total = response.total;
        this.page = response.page;
        this.per_page = response.per_page;
        this.total_pages = response.total_pages;
        return response.listings;
    },

    predicate: function (options) {
        var params = {
            per_page: this.per_page,
            page: this.page
        };
        params = _.extend(params, options);
        params = AppHelper.removeBlanks(params);
        return $.param(params);
    }

});