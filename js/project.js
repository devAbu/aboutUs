$(document).ready(function () {
    var zindex = 10;
    console.log('project')


    $('.card').click(function (e) {
        e.preventDefault()
        console.log('test')

        var isShowing = false;

        if ($(this).hasClass("show")) {
            isShowing = true
        }

        if ($("div.cards").hasClass("showing")) {
            // a card is already in view
            $("div.card.show")
                .removeClass("show");

            if (isShowing) {
                // this card was showing - reset the grid
                $("div.cards")
                    .removeClass("showing");
            } else {
                // this card isn't showing - get in with it
                $(this)
                    .css({
                        zIndex: zindex
                    })
                    .addClass("show");

            }

            zindex++;

        } else {
            // no cards in view
            $("div.cards")
                .addClass("showing");
            $(this)
                .css({
                    zIndex: zindex
                })
                .addClass("show");

            zindex++;
        }

    });
});