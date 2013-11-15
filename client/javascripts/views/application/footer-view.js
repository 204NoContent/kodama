ApplicationFooterView = Backbone.View.extend({

    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('application/footer'));
    }

});
