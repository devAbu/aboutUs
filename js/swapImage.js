$(document).ready(function () {
    var progress = true


    $('.img-responsive').click(function (e) {
        if (progress) {
            if ($(this).attr("id") !== "slika3") {
                var clickedImage = $(this).attr("src")
                var centerImage = $("#slika3").attr("src")

                var centriranaSlika = $('#slika3')

                progress = false
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
                            progress = true
                        }
                    });
                })
            }
        }
    })

})