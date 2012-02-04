/* Author:
Christopher Schmölzer
Anton Trollbäck
*/

var view = {};
// cache view selectors
view.body = $('body');
view.site = $('#site');
view.app = $('#app');

var elements = {};
// cache random selectors
elements.btnOverview = $('#btn-overview');




$(function() {

  // Universal form actions
  $('form .btn-add').click(function(e) {
    e.preventDefault();
    var form = $(this).parent();
    console.log("Sending from form");

    $.post(form.attr('action'), form.serialize(), function(data) {
      console.log(data);

      if(data == "true_login") {
        getData();
        $('#login').hide();
        $('.btn-logout').removeClass('hidden');
        view.app.fadeIn().show();
      } else if(data == "false_login") {
        alert('Fel inlogg')
      }
    });
  });

});


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

    $('.link, .transfer').click(function(e) {
      e.preventDefault();
      var contentId = $(this).attr('href');
      var contentTitle = $(this).data('title');
      console.log(contentId);
      console.log(contentTitle);

      // History.pushState({state:contentId}, "Bok - " + contentTitle, "/app/" + contentId);
      // changeContent(contentId);

      // Dev mode: Toggle view
      if (!$(this).hasClass('transfer')) {
        History.pushState({state:contentId}, "Bok - " + contentTitle, "/app/" + contentId);
        changeContent(contentId);
      } else {
        if (view.app.hasClass('active')) {
          view.app.removeClass('active');
          view.site.addClass('active');
        } else {
          view.site.removeClass('active');
          view.app.addClass('active');
        }
      }
    });

    function changeContent(id) {
      console.log("Change content");
      $('.content').removeClass('active');
      $('#view-' + id).addClass('active');
      if (!$('#view-overview').hasClass('active')) {
        elements.btnOverview.addClass('active');
      } else {
        elements.btnOverview.removeClass('active');
      }
      console.log('#view-' + id);
    }

})(window);


function getData() {
}

window.addEventListener("popstate", function(e) {
  console.log("popstate!");
})

