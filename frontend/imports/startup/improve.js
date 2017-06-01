/* homapge navigation js */
function scrollHeader() {
  if (!Meteor.isClient) {
    return
  }
  offsetTop = 50
  var scrollTop = $(window).scrollTop();
  if (scrollTop > offsetTop) {
    $(".desktop_navigation .header").addClass('sticky');
    $(".mobile_navigation").addClass('sticky');
    $('html').addClass('dark-header');
    scrollTop = 0;
  } else {
    $(".desktop_navigation .header").removeClass('sticky');
    $(".mobile_navigation").removeClass('sticky');
    $('html').removeClass('dark-header');
  }
}

$(function () {
  $(window).scroll(function () {
    scrollHeader();
  });
});
