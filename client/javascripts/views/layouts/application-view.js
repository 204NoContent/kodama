ApplicationLayout = Backbone.View.extend({

    events: {
    },

    initialize: function (options) {
        var controller = options.controller;
        var action = options.action;

        this.section_class = controller + '-' + action + '-container';

        this.render();

        this.applicationHeaderView = new ApplicationHeaderView({ el: 'header' });
        this.sectionView = new window[controller.capitalize() + action.capitalize() + 'View']({ el: '.' + this.section_class });
        this.applicationFooterView = new ApplicationFooterView({ el: 'footer' });
    },

    render: function () {
        this.$el.html(render('layouts/application', { section_class: this.section_class }));
    }

});
