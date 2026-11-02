# ABOC - About us

Jednostranična (single page) prezentacija firme ABOC: hero s animiranim laptopom, vještine, tim, projekti i kontakt forma.
Stranica je čist HTML/CSS/JS (bez frameworka i bez build koraka). Kontakt forma šalje poruke preko PHP skripte.

- Sajt: https://a-boc.com
- Kontakt: info@a-boc.com

## Pokretanje lokalno

Potreban je samo Node.js (za mali razvojni server).

```bash
npm install
npm start
```

Zatim otvori http://localhost:8765.

- `npm install` instalira samo razvojne alate (`http-server`, `prettier`, `sharp`). Za samu stranicu nisu potrebne
  nikakve npm biblioteke.
- Na `localhost` kontakt forma radi u **dev modu**: kad su sva polja ispravna, odigra se animacija koverte, ali se
  mail **ne šalje** (lokalno nema PHP-a ni mail servera). Na pravom domenu forma šalje preko `sendEmail.php`.
- Intro animacija traje oko 5 s. Može se preskočiti dugmetom "Skip intro" (ili tipkama `Esc` / `Enter`).

## Struktura projekta

| Putanja | Čemu služi |
|---|---|
| `index.html` | Cijela stranica (hero, Skills, Team, Projects, Contact), meta tagovi i JSON-LD |
| `views/home.html`, `views/welcome.html` | Dijelovi koji se učitavaju kasnije (hero canvas s heksagonima, intro) |
| `css/style.css` | Glavni stilovi (font-face, sekcije, responsive) |
| `css/computer-illustration.webflow.css`, `css/webflow.css`, `css/laserCss.css`, `css/normalize.css` | Stilovi hero ilustracije i osnovni reset (Webflow izvoz, smanjen na ono što se koristi) |
| `js/snap.js` | Navigacija sekcija (scroll-snap), aktivna ikona, pojavljivanje kartica pri skrolu |
| `js/sendEmail.js` | Validacija i slanje kontakt forme, animacija koverte, dev mod |
| `js/src/*.js` | Intro animacija (Pixi + GSAP), gasi se kad intro završi |
| `js/main.js`, `js/laser.js`, `js/include.js`, `js/loading.js` | Heksagoni u hero-u, laser efekat naslova, učitavanje dijelova stranice |
| `js/webflow.js` | Webflow runtime za animaciju laptopa (smanjen i minificiran) |
| `sendEmail.php` | Serverski dio kontakt forme |
| `fonts/` | Open Sans (self-hosted, woff2) |
| `images/` | Slike u WebP formatu, SVG sprite ikone (`skills.svg`, `icons.svg`), favicon, OG slika |
| `robots.txt`, `sitemap.xml` | SEO |

## Kontakt forma (PHP)

`sendEmail.php` prima samo `POST`, validira unos (email, dužine polja, zaštita od header injectiona), ima skriveno
"honeypot" polje i ograničenje od 1 poruke u 30 s po IP adresi. Postavke su na vrhu fajla:

```php
$siteEmail  = 'info@a-boc.com';                    // adresa sa koje stiže mail (From)
$adminEmail = 'abdulrahman.almonajed@gmail.com';   // primalac poruka
$throttleSeconds = 30;
```

Prije puštanja u rad provjeri da hosting ima PHP i da funkcija `mail()` radi (ili podesi SMTP). Preporučeno je da
`display_errors` bude isključen na produkciji.

## Postavljanje na hosting (deploy)

Nema build koraka. Na server prebaci ove fajlove i foldere:

```
index.html  robots.txt  sitemap.xml  sendEmail.php
css/  js/  views/  images/  fonts/
```

Ne treba slati `node_modules/`, `package*.json` ni `.git`. Stranica učitava još i sa CDN-ova: jQuery, GSAP (TweenMax),
Pixi.js i Splitting.js (svi sa SRI hash zaštitom gdje je moguće), pa je potreban internet.

Preporuke za server: uključiti gzip/brotli i keširanje statičkih fajlova (`css`, `js`, `fonts`, `images`).

## Uobičajeni zadaci

- **Dodati društvene mreže:** u `index.html`, sekcija Contact, `<span class="socialBtn">` zamijeniti sa
  `<a class="socialBtn" href="..." aria-label="Facebook">` i ukloniti `aria-hidden="true"`. Ikone su već u
  `images/icons.svg`.
- **Dodati/izmijeniti vještinu:** kartice u sekciji Skills (`index.html`). Ikone tehnologija su u `images/skills.svg`
  (svaka kao `<symbol id="...">`).
- **Dodati člana tima ili projekt:** kopirati postojeći `<li class="teamCard">` ili `<li class="projectCard">`.
  Nove slike konvertovati u WebP (`sharp` je u razvojnim zavisnostima).
- **Promijeniti domen/URL:** `index.html` (`canonical`, `og:*`, `twitter:image`, JSON-LD), `robots.txt`, `sitemap.xml`.

## Poznata ograničenja

- Pravo slanje maila se može provjeriti samo na hostingu s PHP-om i mailom.
- Opisi i linkovi projekata još ne postoje (kartice su samo logo i ime).
- Sadržaj sekcija se prikazuje tek nakon intro animacije (~5 s), osim ako se preskoči.
