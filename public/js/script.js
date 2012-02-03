/* Author:
Christopher Schmölzer
Anton Trollbäck
*/

var view = {};
// cache selectors
view.site = $('#site');
view.app = $('#app');;
view.body = $('body');

$(function() {

  console.log(view);

  // Transfer between app and site
  $('.transfer').click(function() {

    if (view.app.is(':visible')) {
      view.site.removeClass('active');
      view.app.addClass('active');
      view.body.attr('class', 'app');
    } else {
      view.app.removeClass('active');
      view.site.addClass('active');
      view.body.attr('class', 'site');
    }
  });



  // Universal form actions
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
      console.log(contentId);

      History.pushState({state:contentId}, "State " + contentId, "/app/" + contentId);

      changeContent(contentId);
    });

    function changeContent(id) {
      console.log("Change content");
      $('.content').removeClass('active');
      $('#view-' + id).addClass('active');
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


function getData() {

}

window.addEventListener("popstate", function(e) {
  console.log("popstate!");
})

