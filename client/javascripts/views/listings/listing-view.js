ListingView = Backbone.View.extend({

    events: {
    },

    initialize: function () {
        this.render();

        // this is never gets called because pagination perfroms a collection reset not add/remove
        this.listenTo(this.model, 'remove', this.remove);
    },

    render: function () {
        this.$el.html(render('listings/show', this.model));
    }
});