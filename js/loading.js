$(".welcome").addClass('hidden');

$(window).on("load", function () {
    $(document).ready(function () {
        $('.welcome').removeClass('hidden')
        console.log('pokrenuta stranica')
        $('.loader').addClass('hidden')
    })
});