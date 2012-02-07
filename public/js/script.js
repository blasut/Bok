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
elements.inpDayMonth = $('.inp-day, .inp-moth');

// Regex stuff
var intRegex = /^\d+$/;
var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;


$(function() {

  //////
  // INPUT AND KEYBOARD STUFF
  //////

  // Universal form actions
  $('form .btn-add').click(function(e) {
    e.preventDefault();
    var form = $(this).parent();
    console.log("Sending from form");

    $.post(form.attr('action'), form.serialize(), function(data) {
      console.log(data);

      if(data == "true_login") {
        getData();
        $('#site').hide();
        $('.btn-logout').removeClass('hidden');
        view.app.fadeIn().show();
      } else if(data == "false_login") {
        alert('Fel inlogg')
      }
    });
  });

  // Activate shrink input text
  $('.shrink').keydown(function() {
    var width = $(this).width();
    shrinkToFill(this, 18, width);
  })

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
  $('#inp-salary-sum').keyup(function() {
    var str = $(this).val();
    if(intRegex.test(str) || floatRegex.test(str)) {
       elements.salaryAfter.find('ins').text(str);
    } else {
       elements.salaryAfter.find('ins').text('');
    }
  });


  // add keydown 'ENTER' to press down submit button when focus on submit and date inputs
  // add keyup to post

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

























var g=!0,h=null,i=!1;
(function(){function d(a,b){return function(){return a.apply(b,arguments)}}var c,r,n,o,p,q,s;c=jQuery;s={startDate:h,endDate:h,dowNames:"sun,mon,tue,wed,thu,fri,sat".split(","),monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),firstDayOfTheWeekIndex:0,autoFillToday:i,alwaysVisible:i,autoHideAfterClick:i,parseDate:h,formatDate:h,onChange:h};p="lw-dp";q="lw-datepicker";n=function(a,b){return a.getFullYear()<b.getFullYear()?-1:a.getFullYear()>
b.getFullYear()?1:a.getMonth()<b.getMonth()?-1:a.getMonth()>b.getMonth()?1:a.getDate()<b.getDate()?-1:a.getDate()>b.getDate()?1:0};o=function(a){return"[object Date]"!==Object.prototype.toString.call(a)?i:!isNaN(a.getTime())};r=function(){function a(b,f){this.r=d(this.r,this);this.s=d(this.s,this);this.t=d(this.t,this);this.show=d(this.show,this);this.hide=d(this.hide,this);this.l=d(this.l,this);this.g=d(this.g,this);this.e=d(this.e,this);this.h=d(this.h,this);this.q=d(this.q,this);this.input=b;this.input.bind("focus",
this.show);this.input.bind("blur",this.hide);this.input.bind("keydown",this.r);this.input.bind("change",d(function(){return this.e(this.m(this.input.val()))},this));this.input.bind("click",d(function(){if(!c("."+p).has(this.c).length)return this.show()},this));this.z=c.browser.msie&&8>=parseInt(c.browser.version,10);this.input.data(q,g);this.a={o:f.startDate,j:f.endDate,w:f.dowNames,K:f.monthNames,p:f.firstDayOfTheWeekIndex,F:f.autoFillToday,f:f.alwaysVisible,G:f.autoHideAfterClick,m:f.parseDate,
k:f.formatDate,A:f.onChange};if(this.a.F)this.b=new Date;this.M=new Date;this.d=new Date;this.I();this.a.f?this.c.insertAfter(this.input):this.c.appendTo(document.body);this.margin=parseInt(this.c.css("margin-top"),10);this.c.css("margin",0);this.H();this.a.f&&this.D();this.C();this.h();this.hide()}a.prototype.v=g;a.prototype.u=g;a.prototype.n=g;a.prototype.I=function(){this.c=c("<div class="+p+"/>");this.toolbar=c("<div class=lw-dp-toolbar/>").appendTo(this.c);this.B=c("<div class=lw-dp-previous>\u25c4</div>").appendTo(this.toolbar);
this.next=c("<div class=lw-dp-next>\u25ba</div>").appendTo(this.toolbar);this.J=c("<div class=lw-dp-month/>").appendTo(this.toolbar);this.L().appendTo(this.c);this.i=c("<div/>").appendTo(this.c)};a.prototype.H=function(){var b;this.c.bind("mousedown",d(function(b){b.preventDefault();b.stopPropagation();if(this.z)return this.n=i},this));b=this.z?"mousedown":"click";this.toolbar.delegate(".lw-dp-next",b,this.s);this.toolbar.delegate(".lw-dp-previous",b,this.t);this.i.delegate("li:not(.lw-dp-active-day)",
b,d(function(b){this.e(this.q(c(b.currentTarget)));this.a.G&&this.hide();"function"===typeof this.a.A&&this.a.A(this.b,this.input);return i},this))};a.prototype.q=function(b){var f,a,e;f=b.text();a=this.d.getFullYear();e=0;b.hasClass("lw-dp-neighbour-month-day")&&(e=10<f?-1:1);return new Date(a,this.d.getMonth()+e,f)};a.prototype.C=function(){this.input.val(this.k(this.b))};a.prototype.h=function(){var b,f,a,e,l,m,j,k;this.J.html(this.a.K[this.d.getMonth()]+", "+this.d.getFullYear());b=this.d;a=new Date(b.getFullYear(),
b.getMonth(),0);this.a.o!=h&&a.getTime()<this.a.o.getTime()?(this.v=i,c(this.B).hide()):(this.v=g,c(this.B).show());a=new Date(b.getFullYear(),b.getMonth()+1,1);this.a.j!=h&&a.getTime()>this.a.j.getTime()?(this.u=i,c(this.next).hide()):(this.u=g,c(this.next).show());a=(new Date(b.getFullYear(),b.getMonth(),1)).getDay();l=(this.a.p+6)%7;a=(7-a+this.a.p)%7;0===a&&(a=7);f=new Date(b.getFullYear(),b.getMonth(),a-6);k=Math.ceil(((new Date(b.getFullYear(),b.getMonth()+1,0)).getDate()+7-a)/7);m=d(function(a){var e,
c,d;c=[];e="";d=a.getDate();a.getMonth()!==b.getMonth()&&c.push("lw-dp-neighbour-month-day");(0===a.getDay()||6===a.getDay())&&c.push("lw-dp-weekend");a.getDay()===l&&c.push("lw-dp-week-last-column");0===n(a,this.M)&&(c.push("lw-dp-today"),d="<span>"+d+"</span>");this.b!=h&&0===n(a,this.b)&&c.push("lw-dp-active-day");this.l(f)||(c.push("lw-dp-out-of-interval"),d="");c.length&&(e=" class='"+c.join(" ")+"'");a.setDate(a.getDate()+1);return"<li"+e+">"+d+"</li>"},this);e="";for(j=1;1<=k?j<=k:j>=k;1<=
k?j++:j--){e=1===j?e+"<ul class='lw-dp-week lw-dp-firstweek'>":j===k?e+"<ul class='lw-dp-week lw-dp-lastweek'>":e+"<ul class=lw-dp-week>";for(a=1;7>=a;a++)e+=m(f);e+="</ul>"}return this.i.html(e)};a.prototype.e=function(b){var a;if(!o(b)||!this.l(b))return i;a=this.b;this.b=b;this.g(b);this.C();if(a!=h&&b.getFullYear()===a.getFullYear()&&b.getMonth()===a.getMonth())return this.i.find("li.lw-dp-active-day").removeClass("lw-dp-active-day"),a=this.i.find("li:not(.lw-dp-neighbour-month-day)").filter(function(){return parseInt(c(this).text(),
10)===b.getDate()}),a.addClass("lw-dp-active-day")};a.prototype.g=function(b){this.d=b;return this.h()};a.prototype.l=function(b){return this.a.o!=h&&-1===n(b,this.a.o)||this.a.j!=h&&1===n(b,this.a.j)?i:g};a.prototype.m=function(b){return"function"===typeof this.a.m?this.a.m(b):new Date(Date.parse(b))};a.prototype.k=function(b){return!o(b)?void 0:"function"===typeof this.a.k?this.a.k(b):b!=h?b.getMonth()+1+"/"+b.getDate()+"/"+b.getFullYear():""};a.prototype.L=function(){var b,a,d,e,l,m,j,k;a=this.a.w[this.a.p];
d=i;e="<ul class=lw-dp-dows>";l="";k=this.a.w;for(m=0,j=k.length;m<j;m++)b=k[m],b===a&&(d=g),b="<li>"+b+"</li>",d?e+=b:l+=b;return c(e+l+"</ul>")};a.prototype.D=function(){var b,a,d,e;b=this.a.f?this.input.position():this.input.offset();e=this.c.outerWidth();d=this.c.outerHeight();a=b.left;c("body").width()>a+e?this.c.css({left:a}):b.left>e+this.margin?this.c.css({left:b.left-e-this.margin}):this.c.css({left:a});a=b.top+this.input.outerHeight()+this.margin;c(document).height()>a+d?this.c.css({top:a}):
b.top>d+this.margin?this.c.css({top:b.top-d-this.margin}):this.c.css({top:a})};a.prototype.hide=function(){var b;!this.a.f&&this.n&&this.c.detach();if(!this.n)(b=this.input)!=h&&b.focus();return this.n=g};a.prototype.show=function(){this.a.f||this.c.appendTo(document.body);this.D();return this.h()};a.prototype.t=function(){return this.g(new Date(this.d.getFullYear(),this.d.getMonth()-1,this.d.getDate()))};a.prototype.s=function(){return this.g(new Date(this.d.getFullYear(),this.d.getMonth()+1,this.d.getDate()))};
a.prototype.r=function(b){var a;a=b.keyCode;b=g;switch(a){case 27:this.input.blur();break;case 33:for(a=new Date(this.b.getFullYear(),this.b.getMonth()-1,this.b.getDate());a.getMonth()===this.b.getMonth();)a.setDate(a.getDate()-1);this.e(a);break;case 34:for(a=new Date(this.b.getFullYear(),this.b.getMonth()+1,this.b.getDate());a.getMonth()===this.b.getMonth()+2;)a.setDate(a.getDate()-1);this.e(a);break;case 38:this.e(new Date(this.b.getFullYear(),this.b.getMonth(),this.b.getDate()-1));break;case 40:this.e(new Date(this.b.getFullYear(),
this.b.getMonth(),this.b.getDate()+1));break;default:b=i}return!b};return a}();c.fn.lwDatepicker=function(a){a=c.extend({},s,a);return this.each(function(){var b;b=c(this);if(b.is("input, textarea")&&!b.data(q))return new r(b,a)})}}).call(this);

