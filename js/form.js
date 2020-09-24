$(document).ready(function() {

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