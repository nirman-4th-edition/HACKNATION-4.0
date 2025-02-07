<?php
$servername = "localhost";
$username = "root";
$password = "Nishant2003@";
$dbname = "village";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM student WHERE name = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo 'Login successful';
} else {
    echo 'Invalid username or password';
}

$stmt->close();
$conn->close();
?>
