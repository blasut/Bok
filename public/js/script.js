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

  // Transfer between app and site
  $('.transfer').click(function() {
    toggleView();
  });



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

    $('.link').not('.transfer').click(function(e) {
      e.preventDefault();
      var contentId = $(this).attr('href');
      if (contentId == 0) {
        var contentId = 'overview';
      }
      console.log(contentId);

      History.pushState({state:contentId}, "State " + contentId, "/app/" + contentId);

      changeContent(contentId);
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


    $('.transfer').click(function(e) {
      e.preventDefault();
      var contentId = $(this).attr('href');
      console.log(contentId);

      History.pushState({state:contentId}, "State " + contentId, "/" + contentId);

      console.log(view.app.hasClass('active'));

      if (view.app.hasClass('active')) {
        view.app.removeClass('active');
        view.site.addClass('active');
      } else {
        view.site.removeClass('active');
        view.app.addClass('active');
      }
    });

})(window);

function toggleView() {
  if (view.app.hasClass('active')) {
    view.site.removeClass('active');
    view.app.addClass('active');
    view.body.attr('class', 'app');
  } else {
    view.app.removeClass('active');
    view.site.addClass('active');
    view.body.attr('class', 'site');
  }
}

function getData() {
}

window.addEventListener("popstate", function(e) {
  console.log("popstate!");
})

