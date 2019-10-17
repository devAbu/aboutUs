<?php

$userEmail = $_REQUEST["userEmail"];
$email = "info@abocdev.com";
$userName = $_REQUEST["userName"];
$userSubject = $_REQUEST["userSubject"];
$userMessage = $_REQUEST["userMessage"];


if ($_REQUEST['task'] == "message") {

    $admin_email = "abdulrahman.almonajed@gmail.com";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . $email;

    $message = 'E-mail je poslao: ' . $userName . ' <br> Email adresa: ' . $userEmail . ' <br> Naslov poruke: ' . $userSubject . ' <br> Poruka: ' . $userMessage;

    $htmlMessage = html_entity_decode($message);

    //send email

    if (mail($admin_email, "$userEmail", $htmlMessage, $headers)) {
        echo ('sent');
    } else {
        echo ('ne radi');
    }
}
