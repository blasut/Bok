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
elements.shrinker = $('#shrinker');
// cache random selectors




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

  $('.shrink').keydown(function() {
    var width = $(this).width();
    shrinkToFill(this, 18, width);
  })

  /*
  $(':not(input)').keydown(function(e){
    var links = $('.link');

    if (e.keyCode == 74 ||
      e.keyCode ==  75  ||
      e.keyCode == 76   ||
      e.keyCode == 186  ||
      e.keyCode == 83   ||
      e.keyCode == 81) {

      for (var i = links.length - 1; i >= 0; i--) {
        if($(links[i]).data('key') == e.keyCode)
          $(links[i]).click();
      };

      $('input').keydown(function(e) {
        e.stopPropagation();
      });
    }

  });

  $(window).keypress(function(e) {
    if (!(e.which == 115 && e.ctrlKey) && !(e.which == 19)) return true;
    e.preventDefault();
    return false;
  });
  */



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
      if (contentId == 0) {
        var contentId = 'book';
      }
      //console.log(contentId);
      //console.log(contentTitle);

      // view.body.attr('class', '');
      // view.body.attr('class', contentId);
      // History.pushState({state:contentId}, "Bok - " + contentTitle, "/app/" + contentId);
      // changeContent(contentId);


      // Dev mode: Toggle view
      if (!$(this).hasClass('transfer')) {
        view.body.attr('class', '');
        view.body.attr('class', contentId);

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
      //console.log("Change content");
      $('.content').removeClass('active');
      $('#view-' + id).addClass('active');
      $('#view-' + id + ' .shrink').focus();
    }

})(window);


function shrinkToFill(input, fontSize, width) {
  var $input = $(input),
    txt = $input.val(),
    size = fontSize + "px",
    textWidth = elements.shrinker.html(txt).width();

  if (textWidth > width) {
    fontSize = fontSize * width / textWidth * .9;
    size = fontSize + "px";

    // minimum font size
    if (fontSize > 12) {
      $input.css({fontSize:size});
    }
  } else {
    $input.css({fontSize:size});
  }
}


function getData() {
}


window.addEventListener("popstate", function(e) {
  console.log("popstate!");
})

