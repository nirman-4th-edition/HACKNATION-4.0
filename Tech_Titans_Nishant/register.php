<?php
$servername = "localhost";
$username = "root";
$password = "Nishant2003@";
$dbname = "village";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$name = $_POST['name'];
$password = $_POST['password'];

$stmt = $conn->prepare("INSERT INTO student (name, password) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $password);

if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}
$stmt->close();
$conn->close();
?>
