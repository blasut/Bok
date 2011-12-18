$(document).ready(function() {
  window.appRouter = Backbone.Router.extend({
    routes: {
     '' : 'dashboard',
     'utbetalningar' : 'outgoingpayments',
    },

    initialize: function() {
    },

    dashboard: function() {
      console.log("test");
      var container = $('.outer'); 
      container.empty().text("Dashboard router");
    },

    outgoingpayments: function() {
      var container = $('.outer'); 
      container.empty();
      this.OutGoingPaymentsView = new OutGoingPaymentsView({
        collection: window.OutGoingPayments
      });
      container.append(this.OutGoingPaymentsView.render().el);
    }, 

  });
});
