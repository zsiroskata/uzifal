<?php
require_once "../connect.php";

$name = isset($_POST['name']) ? trim($_POST['name']) : "";
$content = isset($_POST['content']) ? trim($_POST['content']) : "";
$imagePath = null;

// Ellenőrizzük, hogy a 'name' és 'content' mezők ki vannak-e töltve
if (empty($name) || empty($content)) {
    echo json_encode(["success" => false, "error" => "Név és üzenet mező kitöltése kötelező."]);
    exit;
}

$uploadDir = 'uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true); // Létrehozza az 'uploads' könyvtárat, ha nem létezik
}

// Kép feltöltése
if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($_FILES['image']['type'], $allowedTypes)) {
        echo json_encode(["success" => false, "error" => "Csak JPEG, PNG és GIF fájlok engedélyezettek."]);
        exit;
    }

    $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
    $imagePath = $uploadDir . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        echo json_encode(["success" => false, "error" => "Kép feltöltése sikertelen. Ellenőrizze a fájlméretet és a könyvtár jogosultságait."]);
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

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
