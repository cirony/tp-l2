$(document).ready(function() {
    $(".avatar").click(function() {
        $(".selected").removeClass("selected");
        $("#" + $(this).attr("target")).addClass("selected");
        $(this).addClass("selected");
    });
});