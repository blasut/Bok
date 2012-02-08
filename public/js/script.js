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
elements.shrinker = $('#shrinker');
elements.vat = $('.vat');
elements.salaryAfter = $('#salary-after');


$(function() {

  // Form actions
  $('form .btn-add').click(function(e) {
    e.preventDefault();
    var form = $(this).parent('form');
    console.log('Sending from '+form.parent().attr('id')+':');

    $.post(form.attr('action'), form.serialize(), function(data) {
      console.log('response: '+data);

      if(data == "true_login") {
        getData();
        var contentId,
            contentTitle = 'Bokföring';
        view.site.removeClass('active');
        $('html, body').animate({scrollTop: '0'}, 0);
        view.app.addClass('active');

        History.pushState({state:contentId}, "Bok - " + contentTitle, "/app/");

      } else if(data == "false_login") {
        alert('Fel inlogg')
      }
    });
  });


  // Shrink input text if to long
  $('.shrink').keydown(function() {
    var width = $(this).width();
    shrinkToFill(this, 18, width);
  })


  // JS placeholders
  $('input[type=text]').placeholder();


  // Date picker
   $('.date').lwDatepicker({
    firstDayOfTheWeekIndex: 1,
    dowNames: ['sön', 'mån', 'tis', 'ons', 'tos', 'fre', 'lör'],
    monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
    formatDate: function (date) {
      return date.getDate() + '/' + (date.getMonth()+1) + ' ' + date.getFullYear()
    },
    autoFillToday: true
  });


  // Radio buttons (vat)
  elements.vat.click(function() {
    $(this).siblings(elements.vat).removeClass('checked').find('input').attr('checked', false);
    $(this).addClass('checked').find('input').attr('checked', true);
  });


  // Salary after taxes
  var intRegex = /^\d+$/,
    floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
  $('#inp-salary-sum').keyup(function() {
    var str = $(this).val();
    if(intRegex.test(str) || floatRegex.test(str)) {
       elements.salaryAfter.find('ins').text(str);
    } else {
       elements.salaryAfter.find('ins').text('');
    }
  });


  // Keyboard hotkeys
  /* $(':not(input)').keydown(function(e){
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
  }); */
});



(function(window,undefined){

    // Prepare
    var History = window.History;
    if ( !History.enabled ) {
        return false;
    }

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){
        var State = History.getState();
        History.log(State.data, State.title, State.url);
    });

    $('.link, .transfer').click(function(e) {
      e.preventDefault();
      var contentId = $(this).attr('href'),
          contentTitle = $(this).data('title');
      if (contentId == 0) {
        var contentId = 'book';
      }

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
});


