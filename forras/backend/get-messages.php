<?php
require_once "../connect.php";

$result = mysqli_query($conn, "SELECT name, content, image_path, created_at FROM messages ORDER BY created_at DESC");
$messages = [];

while ($row = mysqli_fetch_assoc($result)) {
    $messages[] = $row;
}

echo json_encode($messages);

mysqli_close($conn);
?>


