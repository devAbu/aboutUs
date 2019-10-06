$(document).ready(function () {
    setTimeout(function () {
        $('canvas').not('div.container > canvas').addClass('zoomCanvas');
        $('body').append("<script>$('#skills').load('./views/skills.html')</script>")
        $('body').append("<script>$('#teams').load('./views/teams.html')</script>")
        $('body').append("<script>$('#project').load('./views/project.html')</script>")
    }, 7000);

    setTimeout(function () {
        $('canvas').not('div.container > canvas').remove();
        /* $('.welcome').css('background-color', 'white'); */
        $('.welcome').remove();

    }, 9500);
    setTimeout(function () {
        $('body').append('<script src="js/fullPage.js"></script>')
        $('body').append("<script>$('#home').load('./views/home.html')</script>")
        $('#fullPage').removeClass('hidden')
    }, 9500)
})