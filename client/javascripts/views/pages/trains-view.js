PagesTrainsView = Backbone.View.extend({

    events: {
    },

    initialize: function () {
        this.trains = $('#data').data('response');
        this.render();
    },

    render: function () {
        this.$el.html(render('pages/trains', { trains: this.trains }));
    }
});
