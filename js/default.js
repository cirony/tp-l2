$(document).ready(function() {
    /* Utilidad para hacer la barra Sticky*/
    $('.status').waypoint(function(direction) {
        if (direction == 'down') {
            $('.navigation').addClass('sticky');

        } else {
            $('.navigation').removeClass('sticky');


        }
    }, {
        offset: '100px'
    });

    /* Mobile Nav - sacar si no se usa*/
    $('.js--mobile-nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--mobile-nav-icon i');

        if (icon.hasClass('ion-navicon-round')) {
            nav.slideDown(200);
            icon.removeClass('ion-navicon-round');
            icon.addClass('ion-close-round');
        } else {
            nav.slideUp(200);
            icon.removeClass('ion-close-round');
            icon.addClass('ion-navicon-round');
        }

    });
});