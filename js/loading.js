var width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

if (width <= 767) {
    $('.s3').addClass('normalScroll')
} else {
    $('.s3').removeClass('normalScroll')
}

$(".welcome").addClass('hidden');

$(window).on("load", function () {
    $(document).ready(function () {
        $('.welcome').removeClass('hidden')
    })
});