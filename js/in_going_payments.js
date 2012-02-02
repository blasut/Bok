(function($){
  $(document).ready(function() {

  // Add out the ingoingpayments model
  window.InGoingPayment = Backbone.Model.extend({
  });

  InGoingPaymentsList = Backbone.Collection.extend({
    model: InGoingPayment,
    localStorage: new Store("ingoingpayments"),
  });

  window.InGoingPayments = new InGoingPaymentsList();

  // For individual payments
  window.InGoingPaymentView = Backbone.View.extend({
    className: "ingoingpayment o-l-item",
    tagName: "li",
    template: _.template($('#payment-template').html()),
    editTemplate: _.template($('#edit-in-payment-template').html()),
    
    events : {
      "click .ingoingpayment .o-l-link": "showEditForm",
      "click .ingoingpayment .remove": "destroy",
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

 window.InGoingPaymentsView = Backbone.View.extend({

    className: "",
   template: _.template($('#ingoingpayments-template').html()),

    events : {
      "click #new-inbetalning": "create",
      "click .o-h-button.inbetalning": "showAddForm",
      "click .o-sort button": "sortModels",
      "click #edit-inbetalning" : "editPayment"
    },
   
   // TODO: event för att rendera "New ingoingpayment" ?

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
    collection.each(function (ingoingpayment) {
      self.addOne(ingoingpayment);
    });
    return this;
  },
  
  addOne: function(ingoingpayment) {
    var view = new InGoingPaymentView({
      model: ingoingpayment,
      collection: this.collection
    });
    $('.inbetalningar').append(view.render().el);
  },

  create: function(e) {
    e.preventDefault();        
    console.log("Create");       
    
    data = this.getDataFromForm(this.form);
    InGoingPayments.create(data);
   },

  showAddForm: function() {
    console.log(this, "Försök hitta namnet på klassen");
    $('.inner').html($('#new-in-payment-template').html());
  },

  editPayment: function(e) {
    console.log("EDIT!");
    e.preventDefault();               
    var id = $(this.editForm + " #modelId").val();
    data = this.getDataFromForm(this.editForm);

    console.log(data);
    console.log(id);
    console.log(typeof id);
    
    var model = InGoingPayments.get(id);
    model.set(data);

    console.log(model, "model");
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
