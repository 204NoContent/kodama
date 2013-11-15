ListingsListView = Backbone.View.extend({

    events: {
    },

    initialize: function () {
        this.render();

        this.listenTo(this.collection, 'reset', this.render);

        // This never gets called because there is no UI for sorting
        this.listenTo(this.collection, 'sort', this.render);
    },

    render: function () {
        this.$el.html('');
        this.collection.each(this.renderListing, this);
    },

    renderListing: function (listing) {
        var listingView = new ListingView({
            tagName: 'li',
            model: listing
        });
        this.$el.append(listingView.$el);
    }
});