<?php
require_once "../connect.php";

$name = $content = "";
//egészítsd ki....
$imagePath = null;

//ha nincs kitöltve a név és a szöveg mező: egészítsd ki 
if("....") {
    echo json_encode(["success" => false, "error" => "Név és üzenet mező kitöltése kötelező."]);
    exit;
}

// Kép feltöltése: ha van kép, és nem hibás egészítsd ki 
if (...) {
    $uploadDir = 'uploads/';
    $imageName = basename($_FILES['image']['name']);
    $imagePath = $uploadDir . uniqid() . '_' . $imageName;
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        echo json_encode(["success" => false, "error" => "Kép feltöltése sikertelen"]);
        exit;
    }
}

// Üzenet mentése az adatbázisba
$sql = "INSERT INTO messages (name, content, image_path) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => "SQL hiba: " . mysqli_error($conn)]);
    exit;
}

mysqli_stmt_bind_param($stmt, "sss", $name, $content, $imagePath);

if (!mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => false, "error" => "Adatbázis végrehajtási hiba: " . mysqli_stmt_error($stmt)]);
    exit;
}

echo json_encode(["success" => true]);

// Kapcsolat és előkészített utasítás bezárása
mysqli_stmt_close($stmt);
mysqli_close($conn);
