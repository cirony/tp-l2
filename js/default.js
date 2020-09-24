$(document).ready(function() {
    /* Utilidad para hacer la barra Sticky*/

    if ($('.status').length > 0) {
        $('.status').waypoint(function(direction) {
            if (direction == 'down') {
                $('.navigation').addClass('sticky');

            } else {
                $('.navigation').removeClass('sticky');


            }
        }, {
            offset: '100px'
        });
    }

    /* Mobile Nav - sacar si no se usa*/
    $('.js--mobile-nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--mobile-nav-icon');

        if (icon.hasClass('fa-bars')) {
            nav.slideDown(200);
            icon.removeClass('fa-bars');
            icon.addClass('fa-times');
        } else {
            nav.slideUp(200);
            icon.removeClass('fa-times');
            icon.addClass('fa-bars');
        }

    });

    $(document).ready(function() {
        $(".avatar").click(function() {
            $(".selected").removeClass("selected");
            $("#" + $(this).attr("target")).addClass("selected");
            $(this).addClass("selected");
        });
    });

    $("body").click(function() {
        $(".success").hide("fast")
    });

    $("#join-form").change(function() {
        $(".error").hide();
    });


    $("#join-form").submit(function(event) {
        event.preventDefault();

        if ($(this).find("input[name='password']").val() != $(this).find("input[name='password2']").val()) {
            console.log("pass invalida");
            $(".error").show("fast");
        } else {
            $(".success span").text("¡Todo listo! Enviamos un correo a tu casilla " + $(this).find("input[name='email']").val() + " con los datos del registro.");
            $(".success").show();
        }

    });

    $("#newsletter").submit(function(event) {
        event.preventDefault();
        $(".success span").text("¡Gracias por suscribirte! Estarás recibiendo novedades proximamente en " + $(this).find("input[name='email']").val() + ".");
        $(".success").show();
    });
});