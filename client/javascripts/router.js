Router = Backbone.Router.extend({
    routes: {
        '': 'pagesIndex',
        'about': 'pagesAbout',
        'trains': 'pagesTrains',
        'listings/:id': 'listingsShow',
        'listings': 'listingsIndex'
    },

    pagesIndex: function () {
        new PagesIndexView({ el: '.pages-index .dynamic-content' });
    },

    pagesAbout: function () {
        // Note: ApplicationLayout({ body selector, controller name, action name }) all args are mandatory
        new ApplicationLayout({ el: '.pages-about', controller: 'pages', action: 'about' });
    },

    pagesTrains: function () {
        // Note: ApplicationLayout({ body selector, controller name, action name }) all args are mandatory
        new ApplicationLayout({ el: '.pages-trains', controller: 'pages', action: 'trains' });
    },

    listingsShow: function () {
        // Note: ApplicationLayout({ body selector, controller name, action name }) all args are mandatory
        new ApplicationLayout({ el: '.listings-show', controller: 'listings', action: 'show' });
    },

    listingsIndex: function () {
        // Note: ApplicationLayout({ body selector, controller name, action name }) all args are mandatory
        new ApplicationLayout({ el: '.listings-index', controller: 'listings', action: 'index' });
    }
});
