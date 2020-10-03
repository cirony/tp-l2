$(document).scroll(function() {
    if ($(window).scrollTop() === 0) {
        $('.navigation').removeClass('sticky');
    } else {
        $('.navigation').addClass('sticky');
    }
});