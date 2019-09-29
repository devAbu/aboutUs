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
                    $('#slika').css('display', '')
                    $(this).attr('src', centerImage).bind('onreadystatechange load', function () {
                        if (this.complete) {
                            $('#slika').css('display', 'none')
                            $(this).fadeIn(1000);
                        }
                    });

                });
                centriranaSlika.fadeOut(1000, function () {
                    centriranaSlika.attr('src', clickedImage).bind('onreadystatechange load', function () {
                        $('#slika').css('display', '')
                        if (this.complete) {
                            centriranaSlika.fadeIn(1000);
                            progress = true
                            $('#slika').css('display', 'none')
                        }
                    });
                })
            }
        }
    })

})