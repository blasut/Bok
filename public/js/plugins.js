


/* HTML5 boilerplate console.log fix */
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery)


/*
 * jquery.placeholder.js
 * Copyright (c) 2011 Caleb Ogden LLC - http://calebogden.com
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Modded for use with Modernizr and prepareTransition()
 */

;(function( $ ){
  $.fn.placeholder = function(options) {

    var settings = {
    };

    return this.each(function() {

      if ( options ) {
        $.extend( settings, options );
      }

      var base = $(this);



      var placeholder = $('<span class="ui-placeholder" />')
        .on("click.placeholder",function(){
          $(this).siblings('input').focus();
          $(this).parent().addClass('ui-placeholder-active');
        })
        .html(base.attr('placeholder'));
      base
        .attr("placeholder","")
        .after(placeholder)
        .on("focus.placeholder focusout.placeholder",function(){
          if ($(this).val() == "") {
            $(this).siblings('.ui-placeholder').removeClass('fadeOut');
          }
          $(this)
            .parent()
            .toggleClass('ui-placeholder-active');
        })
        .on('keydown.placeholder', function(e){
          e.stopPropagation();
          setTimeout(function(){


          if (base.val() == "") {
            base.siblings('.ui-placeholder').removeClass('fadeOut');
          } else {
            base.siblings('.ui-placeholder').prepareTransition().addClass('fadeOut');
          }

          },50);
        });

      if (base.val() !== "") {
        placeholder.addClass('fadeOut');
      }

    });

  };
})( jQuery );

/*
 * Lightweight DatePicker - jQuery Plugin
 * © 2011 Maxim Zhukov (zhkv.mxm@gmail.com)
 * Dual licensed under the MIT and GPL licenses
 */
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

