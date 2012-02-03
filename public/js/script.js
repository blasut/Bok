/* Author: 
Christopher Schmölzer
Anton Trollbäck
*/
(function(window,undefined){

    // Prepare
    var History = window.History; // Note: We are using a capital H instead of a lower h
    if ( !History.enabled ) {
         // History.js is disabled for this browser.
         // This is because we can optionally choose to support HTML4 browsers or not.
        return false;
    }

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        History.log(State.data, State.title, State.url);
    });

    $('.link').click(function(e) {
      e.preventDefault(); 
      var contentId = $(this).attr('href');
      console.log(contentId);

      History.pushState({state:contentId}, "State " + contentId, "/" + contentId);
      
      changeContent(contentId);
    });

    function changeContent(id) {
      console.log("Change content");
      $('.content').hide();
      $('#view-' + id).show();
      console.log('#view-' + id);
    }

})(window);


$('form .btn-add').click(function(e) {
  e.preventDefault();

  console.log("SEND DA FORM");

  var form = $(this).parent(); 

  console.log(form);

  $.post(form.attr('action'), form.serialize(), function(data) { 
    console.log(data);

    if(data == "true_login") {
      getData();
      $('#login').hide();
      $('#btn-logout').removeClass('hidden');
      $('#app').fadeIn().show();
    } else if(data == "false_login") {
      alert('Fel inlogg')
    }
  });
});


function getData() {
}
