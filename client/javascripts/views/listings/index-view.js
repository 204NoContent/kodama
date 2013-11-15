ListingsIndexView = Backbone.View.extend({

    events: {
    },

    initialize: function () {
        this.initial_data = $('#data').data('response');

        this.collection = new ListingCollection(this.initial_data.listings); // init listings
        this.collection.parse(this.initial_data); // init pagination

        this.render();

        this.listingsListView = new ListingsListView({
            el: 'ul.listings-list',
            collection: this.collection
        });

        this.paginationView = new PaginationView({
            el: '.listings-list-pagination',
            collection: this.collection
        });
    },

    render: function () {
        this.$el.html(render('listings/index'));
    }

});