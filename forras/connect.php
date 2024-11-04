<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$database = "uzenofal";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    echo json_encode(["success" => false, "error" => "Adatbázis kapcsolat hiba"]);
    exit;
}