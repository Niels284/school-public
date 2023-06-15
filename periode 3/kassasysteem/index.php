<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

session_start();

if (isset($_SESSION['user']) && $_SESSION['user']['logdedin']) {
    header("location: ./pages/administrator.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE= edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./src/scss/build/reset.css" rel="stylesheet">
    <link href="./src/scss/build/layout.css" rel="stylesheet">
    <link href="./src/scss/build/main.css" rel="stylesheet">
    <link href="./src/scss/build/mediaqueries.css" rel="stylesheet">
    <script src="./src/js/build/index.js" type="module" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Home</title>
</head>

<body>
    <div class="qr_codes_container">
        <h1 class="qr_codes_title">Scan this QR code to make a order:</h1>
        <div class="qr_codes">
        </div>
    </div>
</body>

</html>