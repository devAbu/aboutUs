// Kontakt forma: validacija u polju, slanje na sendEmail.php (POST) i potvrda
(function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var sendBtn = document.getElementById('send');
    var statusEl = document.getElementById('formStatus');
    var success = document.getElementById('formSuccess');
    var again = document.getElementById('sendAgain');
    var scene = document.getElementById('envelopeScene');
    var card = form.parentElement;
    var host = location.hostname;
    var isDev = host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || /\.localhost$/.test(host);
    var reduceMotion =window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // forma se sklopi u kovertu, koverta se zatvori i odleti, pa se prikaze potvrda
    function showSuccess() {
        scene.hidden = true;
        scene.className = 'envelope';
        success.hidden = false;
        success.classList.add('is-entering');
        success.querySelector('h3').focus();
    }

    function playEnvelope() {
        card.style.minHeight = card.offsetHeight + 'px';
        if (reduceMotion) {
            form.hidden = true;
            showSuccess();
            return;
        }
        form.classList.add('is-folding');
        setTimeout(function () {
            form.hidden = true;
            scene.hidden = false;
            void scene.offsetWidth;
            scene.classList.add('is-in');
        }, 450);
        setTimeout(function () { scene.classList.add('is-letter'); }, 900);
        setTimeout(function () { scene.classList.add('is-closed'); }, 1800);
        setTimeout(function () { scene.classList.add('is-away'); }, 2400);
        setTimeout(showSuccess, 3300);
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

        // dev mod (localhost): nema PHP-a ni maila, pa se samo odigra animacija nakon uspjesne validacije
        if (isDev) {
            console.info('[dev] Forma je validna. Mail se ne salje na localhost, prikazujem samo animaciju.');
            setTimeout(function () {
                playEnvelope();
                setBusy(false);
            }, 400);
            return;
        }

        fetch('sendEmail.php', { method: 'POST', body: body })
            .then(function (response) {
                return response.text().then(function (text) {
                    return { status: response.status, ok: response.ok, text: text };
                });
            })
            .then(function (result) {
                if (result.ok && result.text.indexOf('sent') > -1) {
                    playEnvelope();
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
        success.classList.remove('is-entering');
        form.classList.remove('is-folding');
        form.hidden = false;
        card.style.minHeight = '';
        document.getElementById('fromName').focus();
    });
})();
