// Navigacija za scroll-snap sekcije (zamjena za fullPage.js)
(function () {
    var root = document.getElementById('fullPage');
    var sections = Array.prototype.slice.call(root.querySelectorAll('.section'));
    var links = Array.prototype.slice.call(document.querySelectorAll('#section-nav a'));
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = null;

    function goTo(id, instant) {
        var target = document.getElementById(id);
        if (!target) return;
        root.scrollTo({
            top: target.offsetTop,
            behavior: instant || reduceMotion ? 'instant' : 'smooth'
        });
    }

    function setActive(id) {
        if (id === current) return;
        current = id;
        links.forEach(function (a) {
            var on = a.getAttribute('data-section') === id;
            a.classList.toggle('active', on);
            if (on) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
        });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
    }

    // aktivna je sekcija koja prelazi sredinu ekrana (radi i za sekcije vise od ekrana)
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) setActive(e.target.id);
            });
        }, { root: root, rootMargin: '-50% 0px -50% 0px', threshold: 0 });
        sections.forEach(function (s) { io.observe(s); });
    }

    links.forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            goTo(a.getAttribute('data-section'));
        });
    });

    // tastatura: PageUp/PageDown/Home/End rade nativno kad skroler ima fokus
    root.focus({ preventScroll: true });

    // link u URL-u (npr. #teamsSection)
    var hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        goTo(hash, true);
        setActive(hash);
    } else {
        setActive('homeSection');
    }

    // kartice (Skills, Team): otkrivanje pri ulasku u vidno polje (radi i nakon skoka na sekciju)
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (cards.length && 'IntersectionObserver' in window && !reduceMotion) {
        document.documentElement.classList.add('reveal-ready');
        var revealIo = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    revealIo.unobserve(e.target);
                }
            });
        }, { root: root, threshold: 0.12 });
        cards.forEach(function (c) { revealIo.observe(c); });
    }
})();
