$(document).ready(function(){
  // cart products fade-in/fade-out animation
  $('.theCart').hide(); 
  $('.cart').click(function(e){
    $('.theCart').fadeToggle('show');
  });
})
