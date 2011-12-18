(function($){
  $(document).ready(function() {

  // Add out the outgoingpayments model
  window.OutGoingPayment = Backbone.Model.extend({
  });

  OutGoingPaymentsList = Backbone.Collection.extend({
    model: OutGoingPayment,
    localStorage: new Store("todos"),
    
    sortModels: function() {
      this.sort();
    },

    comparator: function(model) {
      return model.get("title");
    }
  });

  window.OutGoingPayments = new OutGoingPaymentsList();

  // For individual payments
  window.OutGoingPaymentView = Backbone.View.extend({
    className: "outgoingpayment o-l-item",
    tagName: "li",
    template: _.template($('#payment-template').html()),
    
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);

    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }, 
    
  });

 window.OutGoingPaymentsView = Backbone.View.extend({
   template: _.template($('#outgoingpayments-template').html()),
    events : {
      "click #new-utbetalning": "createOnEnter",
      "click .o-h-button": "showAddForm",
      "click .o-sort button": "sortModels",
      "click .outgoingpayment button": "showEditForm"
    },
   
   // TODO: event för att rendera "New outgoingpayment" ?

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.addOne);
    this.form = '.inner-form';
  },
    
  render: function() {
    var collection = this.collection;
    var self = this;

    $(this.el).html(this.template({}));
    collection.each(function (outgoingpayment) {
      self.addOne(outgoingpayment);
    });
    return this;
  },
  
  addOne: function(outgoingpayment) {
    var view = new OutGoingPaymentView({
      model: outgoingpayment,
      collection: this.collection
    });
    $('.utbetalningar').append(view.render().el);
  },

  createOnEnter: function(e) {
    e.preventDefault();               
    var title = $(this.form + " #payout-title").val();
    var date  = $(this.form + " #payout-date").val();
    var price  = $(this.form + " #payout-price").val();
    var vat  = $(this.form + " .vat input").attr("id");

    OutGoingPayments.create({title: title, date: date, cost: price, vat: vat});
   },

  showAddForm: function() {
    $('.outer-list').append($('#new-payment-template').html());
  },

  showEditForm: function() {
    $('.inner').append($('#new-payment-template').html());
  },

  sortModels: function(e) {
    // Delegate the id of the clicked button
    this.collection.sortModels(e.currentTarget.id);
  }


  });

  }); // End document ready

})(jQuery);
