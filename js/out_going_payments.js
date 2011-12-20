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
    editTemplate: _.template($('#edit-payment-template').html()),
    
    events : {
      "click .outgoingpayment .o-l-link": "showEditForm",
      "click .outgoingpayment .remove": "destroy",
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }, 

    showEditForm: function(e) {
      $('.inner').html(this.editTemplate(this.model.toJSON()));
      console.log(this.model.toJSON());
    },

    destroy: function(e) {
      this.model.destroy();  
      $(this.el).remove(); 
    }
  });

 window.OutGoingPaymentsView = Backbone.View.extend({

    className: "",
   template: _.template($('#outgoingpayments-template').html()),

    events : {
      "click #new-utbetalning": "create",
      "click .o-h-button": "showAddForm",
      "click .o-sort button": "sortModels",
      "click #edit-utbetalning" : "editPayment"
    },
   
   // TODO: event för att rendera "New outgoingpayment" ?

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.addOne);
    this.form = '.inner-form';
    this.editForm = '.edit';
    console.log(this, "Initialize");
    
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

  create: function(e) {
    e.preventDefault();               
    
    data = this.getDataFromForm(this.form);
    OutGoingPayments.create(data);
   },

  showAddForm: function() {
    console.log(this, "Försök hitta namnet på klassen");
    $('.inner').html($('#new-payment-template').html());
  },

  editPayment: function(e) {
    console.log("EDIT!");
    e.preventDefault();               
    var id = $(this.editForm + " #modelId").val();
    data = this.getDataFromForm(this.editForm);
    
    var model = OutGoingPayments.get(id);
    model.set(data);
  },


  sortModels: function(e) {
    // Delegate the id of the clicked button
    this.collection.sortModels(e.currentTarget.id);
  },
  
  getDataFromForm: function(form) {
    var title = $(form + " #payout-title").val(),
          date  = $(form + " #payout-date").val(),
          price  = $(form + " #payout-price").val(),
          vat  = $(form + " .vat input").attr("id");      
    return {title: title, date: date, cost: price, vat: vat};
  }

  });

  }); // End document ready

})(jQuery);
