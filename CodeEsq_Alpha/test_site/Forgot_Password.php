<?php
$servername = "localhost";
$username = "root";
$password = "Nishant2003@";
$dbname = "village";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['username'];

$stmt = $conn->prepare("SELECT name FROM users WHERE name = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) 
{
    header("Location: reset_password_form.php?username=" . urlencode($user));
    exit();
} 
else
 {
    echo 'No user found with that username.';
}

$stmt->close();
$conn->close();
?>
