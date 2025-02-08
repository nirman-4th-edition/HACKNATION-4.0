<?php
header('Content-Type: application/json');


$servername = "localhost";
$username = "root";
$password = "Nishant2003@";
$dbname = "village";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userId = $_GET['userId'];
$sql = "SELECT username, profile_picture FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    echo json_encode(array("username" => "Guest", "profile_picture" => "default.png"));
}

$stmt->close();
$conn->close();
?>
