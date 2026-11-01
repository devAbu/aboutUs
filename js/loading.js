$(".welcome").addClass('hidden');

$(window).on("load", function () {
    $(document).ready(function () {
        $('.welcome').removeClass('hidden')
    })
});

// Skip intro: radi odmah, i ako se intro modul (js/src/shape.js) jos nije ucitao
$(document).on("click", ".skip-intro", function () {
    window.skipIntroRequested = true;
    if (window.finishIntro) window.finishIntro();
});
