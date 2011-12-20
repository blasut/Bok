$(document).ready(function() {
  window.appRouter = Backbone.Router.extend({
    routes: {
     '' : 'dashboard',
     'utbetalningar': 'outgoingpayments',
     'fakturor': 'invoices',
    },

    initialize: function() {
      this.container = $('#content-wrapper'); 
    },

    dashboard: function() {
      console.log("test");
      this.container.empty().text("Dashboard router");
    },

    outgoingpayments: function() {
      this.container.empty();
      this.OutGoingPaymentsView = new OutGoingPaymentsView({
        collection: window.OutGoingPayments
      });
      this.container.append(this.OutGoingPaymentsView.render().el);
      window.OutGoingPayments.fetch();
    }, 

    invoices: function() {
    },

  });
});
