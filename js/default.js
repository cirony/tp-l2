$(document).ready(function() {

    /* Agrego footer y headr a la pantalla */
    addHeader();
    addFooter();

    /* si estoy en user, cargar formulario acorde */
    loadAccountForm();

    /* On avatar click, make it selected */
    $(document).on("click", ".select", function(event) {
        $(this).closest('.selector').find('.selected').removeClass('selected')
        $(this).addClass("selected");

        if ($("#" + $(this).attr("target"))) {
            $("#" + $(this).attr("target")).addClass("selected");
        }

    });

    /* Utilidad para los pop-ups */
    $("body").click(function() {
        $(".success").hide("fast")
    });

    $(document).on("change", "input", function(event) {
        $(".error").hide();
    });

    /* Validación formularios - se usa "on" porque se insertan dinamicamente segun navegación*/
    $(document).on("submit", "#join-form", function(event) {
        event.preventDefault();

        if ($(this).find("input[name='password']").val() != $(this).find("input[name='password2']").val()) {
            $(".error").show("fast");
        } else {
            $(".success span").text("¡Todo listo! Enviamos un correo a tu casilla " + $(this).find("input[name='email']").val() + " con los datos del registro.");
            $(".success").show();
            $('#join-form').trigger("reset");
        }
    });

    $(document).on("submit", "#forgot-password-form", function(event) {
        event.preventDefault();
        $(".success span").text("Enviamos las instrucciones de recuperación a " + $(this).find("input[name='email']").val() + ".");
        $(".success").show();

        $('#forgot-password-form').trigger("reset");
    });

    $(document).on("submit", "#login-form", function(event) {
        event.preventDefault();

        var hardcodedUser = 'admin';
        var harcodedPass = 'admin';

        if ($(this).find("input[name='password']").val() != hardcodedUser || $(this).find("input[name='password']").val() != harcodedPass) {
            $(".error").show("fast");
        } else {
            window.location.replace("../views/panel.html");
        }
    });

    $(document).on("submit", "#newsletter", function(event) {
        event.preventDefault();
        $(".success span").text("¡Gracias por suscribirte! Estarás recibiendo novedades proximamente en " + $(this).find("input[name='email']").val() + ".");
        $(".success").show();

        $('#newsletter').trigger("reset");
    });

    $(document).on("submit", "#change-password", function(event) {
        event.preventDefault();
        var harcodedPass = 'admin';

        if ($(this).find("input[name='password']").val() != harcodedPass || $(this).find("input[name='password2']").val() != $(this).find("input[name='password3']").val()) {
            $(".error").show("fast");
        } else {
            $(".success span").text("¡La contraseña se cambió con éxito!");
            $(".success").show();
            $('#change-password').trigger("reset");
        }

    });

    $(document).on("submit", "#create-character", function(event) {
        event.preventDefault();
        $(".success span").text('¡Creación Exitosa! ' + $(this).find('input[name="name"]').val().toUpperCase() + ': ' + $(this).find('input[name="race"]:checked').attr('description') + ' - ' + $(this).find('input[name="class"]:checked').attr('description') + ' ya se encuenta disponible para jugar.');
        $(".success").show();

        $('#create-character').trigger("reset");
    });

    $(document).on("change", "form#create-character checkbox, form#create-character input, form#create-character select", function(event) {
        var parent = $(this).closest('.parameters');
        var race = $(parent).find('input[name="race"]:checked');
        var clase = $(parent).find('input[name="class"]:checked');
        var sex = $(parent).find('select').val();
        $(parent).find('.character-display img').css('background-image', 'url(../img/classes/' + $(clase).val() + '.png)');
        $(parent).find('.character-display img').attr('src', '../img/races/' + $(race).val() + '-' + sex + '.png');
        $(parent).find('.race-name').html($(race).attr('description'));
        $(parent).find('.class-name').html($(clase).attr('description'));

    });

    $(document).on("submit", "#news-edit", function(event) {
        event.preventDefault();

        if (getSearchParams().get('id')) {
            $(".success span").text('Modificación Exitosa!');

        } else {
            $(".success span").text('¡Creación Exitosa!');
        }
        $(".success").show();

        $('form img').attr('src', '');

        $('#news-edit').trigger("reset");
    });

});

function isIndex() {
    return getCurrentPage() != '' || getCurrentPage() != 'index.html';
}

function normalizeLinks(id) {
    if (!isIndex) {
        $(id + ' a').each(function(ref, ele) {

            if ($(ele).attr('href').startsWith('./')) {
                $(ele).attr('href', "." + $(ele).attr('href'))
            }
        });
        $(id + ' img').each(function(ref, ele) {
            if ($(ele).attr('src').startsWith('./')) {
                $(ele).attr('src', "." + $(ele).attr('src'));
            }

        });
    }
}

function addHeader() {
    if ($('#header-navigation')) {
        var path = isIndex() ? './' : '../';

        $('#header-navigation').load(path + "views/common/header-navigation.html", function() {
            normalizeLinks('#header-navigation');
        });
    }
};

function addFooter() {

    var path = isIndex() ? './' : '../';

    var footerPath = path + "views/common/footer";
    if ($('footer').hasClass('small')) {
        footerPath = footerPath + "-small";
    }

    $('footer').load(footerPath + ".html", function() {
        normalizeLinks('footer');
    });
}

function loadAccountForm() {

    if (getCurrentPage() == 'account.html') {
        var search = new URLSearchParams(window.location.search);
        $('.form-container').load('../views/account/' + search.get('page') + "-form.html");
    } else if (getCurrentPage() == 'panel.html') {
        var search = getSearchParams();
        var setting = search.get('setting');

        if (!setting) {
            setting = 'summary'
        }

        $('#' + setting).addClass('selected');

        $('.settings-content').load('../views/panel/' + setting + ".html", function() {
            if (setting == 'news' && search.get('edit')) {
                loadNews();
            }
        });
    }
}

function getCurrentPage() {

    return document.location.pathname.match(/[^\/]+$/) != null ? document.location.pathname.match(/[^\/]+$/)[0] : '';
}

function getSearchParams() {
    return new URLSearchParams(window.location.search);;
}

function loadNews() {
    var search = getSearchParams();
    var newsId = search.get('id');

    var row = $('#' + newsId);

    $('form #id').val(newsId);
    $('form #title').val($(row.find('td')[0]).html());
    $('form #description').val($(row.find('td')[1]).html());
    $('form img').attr('src', $(row.find('img')).attr('src'));
    $('form #text').val($(row.find('td')[3]).html());
    $('form #checkbox').val($(row.find('td')[4]).html() == 'SI');

    $('html,body').animate({ scrollTop: $("#news-edit").offset().top }, 'fast');

}