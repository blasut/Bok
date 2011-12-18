/* Author:

*/



// #DOCUMENT READY
//----------------------

$(function() {

   // Fluid width outer view
   outerListHeight();

   // When clicking nav item
   $('.n-item').click(function() {
      // Add .selected on nav item
      $('.n-item').removeClass('selected')
      $(this).addClass('selected');
   });

   // Toggle small/large nav size
   $('.nav-header').click(function() {
      $('#nav-container').toggleSize();
   });
});




// #FUNCTIONS
//----------------------

// For styling

// Enable active pseudo styles in Mobile Safari
document.addEventListener('touchstart', function() {},false);


// Fluid width outer view
function outerListHeight() {
   var outerHeight = $('.outer').height(),
       outerHeaderHeight = $('.outer-header').height();
   $('.outer-list').height(outerHeight - outerHeaderHeight).css('margin-top', outerHeaderHeight);
}
$(window).resize(function() { outerListHeight(); });

// Toggle large or small element size by adding .small class
$.fn.toggleSize = function() {
   var self = this;
   $(self).toggleClass('small');
}

