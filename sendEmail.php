<?php

// Kontakt forma: prima samo POST, validira unos i salje mail.
// Odgovor 'sent' znaci uspjeh (JS provjerava taj tekst).

$siteEmail = 'info@abocdev.com';              // adresa sa koje stize mail (From)
$adminEmail = 'abdulrahman.almonajed@gmail.com'; // primalac poruka
$throttleSeconds = 30;                        // minimalni razmak izmedju poruka sa iste IP adrese

header('Content-Type: text/plain; charset=UTF-8');

function fail($code, $text)
{
    http_response_code($code);
    exit($text);
}

// jedna linija teksta: bez novih redova (header injection) i ogranicene duzine
function oneLine($value, $max)
{
    $value = trim((string) $value);
    $value = preg_replace('/[\r\n\t]+/', ' ', $value);
    return mb_substr($value, 0, $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'method not allowed');
}

if (($_POST['task'] ?? '') !== 'message') {
    fail(400, 'bad request');
}

// honeypot: botovi popunjavaju skriveno polje, ljudi ne
if (!empty($_POST['website'] ?? '')) {
    exit('sent');
}

$userEmail = oneLine($_POST['userEmail'] ?? '', 254);
$userName = oneLine($_POST['userName'] ?? '', 100);
$userSubject = oneLine($_POST['userSubject'] ?? '', 150);
$userMessage = mb_substr(trim((string) ($_POST['userMessage'] ?? '')), 0, 5000);

if (
    !filter_var($userEmail, FILTER_VALIDATE_EMAIL)
    || $userName === ''
    || $userSubject === ''
    || $userMessage === ''
) {
    fail(422, 'invalid');
}

// ogranicenje ucestalosti po IP adresi
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$throttleFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'aboc_mail_' . md5($ip);
if (is_file($throttleFile) && (time() - filemtime($throttleFile)) < $throttleSeconds) {
    fail(429, 'too many requests');
}

$e = function ($text) {
    return htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$htmlMessage = 'E-mail je poslao: ' . $e($userName) . '<br>'
    . 'Email adresa: ' . $e($userEmail) . '<br>'
    . 'Naslov poruke: ' . $e($userSubject) . '<br>'
    . 'Poruka:<br>' . nl2br($e($userMessage));

$headers = "MIME-Version: 1.0\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . 'From: ' . $siteEmail . "\r\n"
    . 'Reply-To: ' . $userEmail;

$subject = mb_encode_mimeheader('[ABOC] ' . $userSubject, 'UTF-8');

if (@mail($adminEmail, $subject, $htmlMessage, $headers)) {
    touch($throttleFile);
    echo 'sent';
} else {
    fail(500, 'mail failed');
}
