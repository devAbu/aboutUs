$(document).ready(function () {
    setTimeout(function () {
        $('canvas').not('div.container > canvas').addClass('zoomCanvas');
    }, 7000);
    setTimeout(function () {
        $('canvas').not('div.container > canvas').remove();
        $('.welcome').css('background-color', 'white');
        $('.welcome').remove();

    }, 9500);
    setTimeout(function () {
        $('body').append('<script src="js/fullPage.js"></script>')
        $('body').append("<script>$('#home').load('./views/home.html')</script>")
        /* $('html, body').css({
            "width": "100%",
            "height": "100%",
            "padding": 0,
            "margin": 0,
            "overflow": "hidden"
        }) */
        $('#fullPage').removeClass('hidden')
    }, 9500)
})