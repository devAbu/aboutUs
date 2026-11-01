// Kontakt forma: validacija u polju, slanje na sendEmail.php (POST) i potvrda
(function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var sendBtn = document.getElementById('send');
    var statusEl = document.getElementById('formStatus');
    var success = document.getElementById('formSuccess');
    var again = document.getElementById('sendAgain');

    var rules = [
        { id: 'fromName', message: 'Please enter your name.' },
        { id: 'fromEmail', message: 'Please enter a valid email address.', email: true },
        { id: 'fromSubject', message: 'Please enter a subject.' },
        { id: 'mainMessage', message: 'Please enter your message.' }
    ];
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(input, text) {
        var error = document.getElementById(input.id + '-error');
        error.textContent = text;
        if (text) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
    }

    function validate() {
        var firstInvalid = null;
        rules.forEach(function (rule) {
            var input = document.getElementById(rule.id);
            var value = input.value.trim();
            var bad = !value || (rule.email && !emailPattern.test(value));
            setError(input, bad ? rule.message : '');
            if (bad && !firstInvalid) firstInvalid = input;
        });
        if (firstInvalid) firstInvalid.focus();
        return !firstInvalid;
    }

    function setBusy(busy) {
        sendBtn.disabled = busy;
        sendBtn.textContent = busy ? 'Sending...' : 'Send message';
        form.setAttribute('aria-busy', busy ? 'true' : 'false');
    }

    // greska nestaje cim korisnik krene ispravljati polje
    rules.forEach(function (rule) {
        document.getElementById(rule.id).addEventListener('input', function () {
            setError(this, '');
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        statusEl.textContent = '';
        statusEl.classList.remove('is-error');
        if (!validate()) return;

        var body = new URLSearchParams({
            task: 'message',
            userEmail: document.getElementById('fromEmail').value.trim(),
            userName: document.getElementById('fromName').value.trim(),
            userSubject: document.getElementById('fromSubject').value.trim(),
            userMessage: document.getElementById('mainMessage').value.trim(),
            website: document.getElementById('website').value
        });

        setBusy(true);
        fetch('sendEmail.php', { method: 'POST', body: body })
            .then(function (response) {
                return response.text().then(function (text) {
                    return { status: response.status, ok: response.ok, text: text };
                });
            })
            .then(function (result) {
                if (result.ok && result.text.indexOf('sent') > -1) {
                    form.hidden = true;
                    success.hidden = false;
                    success.querySelector('h3').focus();
                    return;
                }
                statusEl.classList.add('is-error');
                statusEl.textContent = result.status === 429
                    ? 'Please wait a little before sending another message.'
                    : 'Something went wrong. Please try again later.';
            })
            .catch(function () {
                statusEl.classList.add('is-error');
                statusEl.textContent = 'Could not reach the server. Please check your connection and try again.';
            })
            .then(function () {
                setBusy(false);
            });
    });

    again.addEventListener('click', function () {
        form.reset();
        success.hidden = true;
        form.hidden = false;
        document.getElementById('fromName').focus();
    });
})();
