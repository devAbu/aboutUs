$(document).ready(function () {
    setTimeout(function () {
        $('canvas').addClass('zoomCanvas');
    }, 6000);
    setTimeout(function () {
        $('canvas').remove();
        $('.s1').css('background-color', 'white');
        $('.s1').remove();
    }, 9000);



})