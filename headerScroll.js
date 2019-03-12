var bannerHeight = $('#banner').height();
$('#spainHeader').addClass('noshow');
$('#vis').addClass('noshow');

$(window).scroll(function() {

  if ($(window).scrollTop() < bannerHeight) {
    $('#spainHeader').addClass('noshow');
    $('#vis').addClass('noshow');
    // console.log('sticky');
  } else {
    $('#spainHeader').removeClass('noshow');
    $('#vis').removeClass('noshow');
    // console.log('remove sticky');
  }

});

// $('#madridLink').click(function() {
//   event.preventDefault();
//   console.log('Madrid');
//   $('#madridTop').animate({scrollTop: $('#madridTop').offset().top});
// });

$('a[href^=\\#]').click(function(){
  event.preventDefault();
  var target = $(this).attr('href');
  console.log($(target).offset().top);
  if (target === '#') {
    $('html, body').animate({scrollTop : 0}, 600);
  } else {
    $('html, body').animate({
        scrollTop: $(target).offset().top
    });
}
});