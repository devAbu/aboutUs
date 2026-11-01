$(document).ready(function () {
    var progress = true


    $('.img-responsive').click(function (e) {
        if (progress) {
            if ($(this).attr("id") !== "slika3") {


                $(".teamMore").removeClass("active");
                $("#" + $(this).attr("data-member")).addClass("active");

                var clickedImage = $(this).attr("src")
                var centerImage = $("#slika3").attr("src")

                var idClickedImage = $(this).attr("data-member")
                var altClickedImage = $(this).attr("alt")
                var idCenterImage = $("#slika3").attr("data-member")
                var altCenterImage = $("#slika3").attr("alt")

                var centriranaSlika = $('#slika3')

                progress = false
                $(this).fadeOut(1000, function () {
                    $('#slika').css('display', '')
                    $(this).attr('src', centerImage).bind('onreadystatechange load', function () {
                        $(this).attr('data-member', idCenterImage).attr('alt', altCenterImage)
                        if (this.complete) {
                            $('#slika').css('display', 'none')
                            $(this).fadeIn(1000);
                        }
                    });

                });
                centriranaSlika.fadeOut(1000, function () {
                    $('#slika').css('display', '')
                    centriranaSlika.attr('src', clickedImage).bind('onreadystatechange load', function () {
                        centriranaSlika.attr("data-member", idClickedImage).attr("alt", altClickedImage)
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