ListingsShowView = Backbone.View.extend({

    events: {
    },

    initialize: function () {
        this.initial_data = $('#data').data('response');

        this.model = new Listing(this.initial_data.listing);
        this.render();
    },

    render: function () {
        this.$el.html(render('listings/show', this.model));
    }

});