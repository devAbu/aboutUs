window.onload = function () {

    var sendBtn = document.querySelector("#send");
    var envelope = document.querySelector(".envelope");
    var envelopebg = document.querySelector(".envbg");
    var finished = document.querySelector(".finished");
    var resetButton = document.querySelector(".resetButton");
    var lid = document.querySelector(".lid");
    var email = document.querySelector(".emailBody");
    var fromEmail = document.getElementById("fromEmail");
    var fromName = document.getElementById("fromName");
    var fromSubject = document.getElementById("fromSubject");
    var mainMessage = document.getElementById("mainMessage");

    toastr.options.closeButton = true;
    toastr.options.preventDuplicates = true;

    function startAnimation() {
        envelope.classList.add("show");
        envelopebg.classList.add("show");
        email.classList.add("move");
        lid.classList.add("move");
        envelope.classList.add("move");
        setTimeout(function () {
            email.classList.add("hide");
            envelopebg.classList.add("hide");
        }, 5000);
    }

    function reset() {
        // Resetting Inputs
        fromEmail.value = "";
        fromName.value = "";
        fromSubject.value = "";
        mainMessage.value = "";
        // Allowing Button again
        sendBtn.disabled = false;
        // Ressting all classes	
        envelopebg.classList.remove("show");
        envelopebg.classList.remove("hide");
        envelope.classList.remove("show");
        envelope.classList.remove("done");
        envelope.classList.remove("move");
        lid.classList.remove("move");
        email.classList.remove("move");
        email.classList.remove("hide");
        finished.classList.remove("show");
    }



    sendBtn.addEventListener("click", function () {
        var userEmail = $('#fromEmail').val()
        var userName = $('#fromName').val()
        var userSubject = $('#fromSubject').val()
        var userMessage = $('#mainMessage').val()

        function validateEmail($emailSign) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test($emailSign);
        }

        if (userEmail == "") {
            toastr.error("Please enter your email address.")
        } else if (!validateEmail(userEmail)) {
            toastr.warning("Please enter a valid email address.")
        } else if (userName == "") {
            toastr.error("Please enter your name.")
        } else if (userSubject == "") {
            toastr.error("Please enter the message's subject.")
        } else if (userMessage == "") {
            toastr.error("Please enter your message.")
        } else {
            $.ajax({
                url: "sendEmail.php?task=message&userEmail=" + userEmail + "&userName=" + userName + "&userSubject=" + userSubject + "&userMessage=" + userMessage,
                success: function (data) {
                    if (data.indexOf('sent') > -1) {
                        toastr.success("Thank you.")
                        this.disabled = true;

                        startAnimation();
                        setTimeout(function () {
                            reset();
                            email.classList.add("hide");
                            envelope.classList.add("done");
                        }, 7500);
                        setTimeout(function () {
                            envelope.classList.add("show");
                            finished.classList.add("show");
                        }, 7800);
                    } else {
                        toastr.error("An error occurred. Please try later.")
                    }
                },
                error: function (data, err) {
                    toastr.error("There is an error. Please try again later.")
                }
            });

        }
    });

    resetButton.addEventListener("click", reset);


}