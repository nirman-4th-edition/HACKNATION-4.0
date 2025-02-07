<?php
session_start(); 
$servername = "localhost";
$username = "root"; 
$password = "Nishant2003@"; 
$dbname = "education"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT user_id, name, password FROM admin WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if ($password === $user['password']) {
        
        $_SESSION['user'] = $user['name']; 
        header("Location: Dashboard-EduNexus.php");
        exit(); 
    } else {
        echo "Invalid email or password";
    }
} else {
    echo "Invalid email or password";
}

$stmt->close();
$conn->close();
?>
