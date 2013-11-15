var PaginationView = Backbone.View.extend({

    page: 1,

    events: {
        'click button.page': 'changePage'
    },

    initialize: function () {
        this.render();
        this.listenTo(this.collection, 'reset', this.render);
    },

    changePage: function (event) {
        if (!((event.target.name === 'previous' && this.page === 1) || (event.target.name === 'next' && this.collection.total_pages <= this.page))) {
            this.page += ($(event.target).hasClass('next') ? 1 : -1);
            if (this.collection.current_request) {
                this.collection.current_request.abort();
            }
            var params = this.collection.predicate({ page: this.page });
            this.collection.current_request = this.collection.fetch({ data: params, reset: true });
            window.history.replaceState('Object', 'Title', window.location.pathname + '?' + params);
        }
        $(event.target).prop('disabled', true);
    },

    render: function () {
        this.$el.html('');
        $('body').scrollTop(0);
        this.$el.html(render('application/pagination', this.collection));
        this.checkPaginationLimits();
        return this;
    },

    checkPaginationLimits: function () {
        this.page = this.collection.page;
        $('button[name="next"]').removeClass('disabled');
        $('button[name="previous"]').removeClass('disabled');
        if (this.page === this.collection.total_pages) {
            $('button[name="next"]').addClass('disabled');
        }
        $('button[name="next"]').prop('disabled', this.page === this.collection.total_pages);
        if (this.page <= 1) {
            $('button[name="previous"]').addClass('disabled');
        }
        $('button[name="previous"]').prop('disabled', this.page <= 1);
    }
});