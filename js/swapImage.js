$(document).ready(function () {
    $('.img-responsive').click(function (e) {
        console.log($(this).attr("id"))
        if ($(this).attr("id") !== "slika3") {
            console.log("treba se promijenit")
            var clickedImage = $(this).attr("src")
            var centerImage = $("#slika3").attr("src")

            var kliknutaSlika = $(this).attr("id")
            var centriranaSlika = $('#slika3')

            console.log("kliknuta slika " + clickedImage)
            console.log("slika u sredini " + centerImage)

            /* $(this).attr("src", centerImage)
            centriranaSlika.attr("src", clickedImage) */

            $(this).fadeOut(1000, function () {
                $(this).attr('src', centerImage).bind('onreadystatechange load', function () {
                    if (this.complete) {
                        $(this).fadeIn(1000);
                    }
                });

            });
            centriranaSlika.fadeOut(1000, function () {
                centriranaSlika.attr('src', clickedImage).bind('onreadystatechange load', function () {
                    if (this.complete) {
                        centriranaSlika.fadeIn(1000);
                    }
                });
            })
        } else {
            console.log("nek ostane isto")
        }
    })
})