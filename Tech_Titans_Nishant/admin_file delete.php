<?php
session_start(); // Start the session to access session variables like username

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "education";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the 'files' table exists
if ($conn->query("SHOW TABLES LIKE 'files'")->num_rows == 0) {
    echo "<script>alert('The required table does not exist in the database.'); window.location.href = 'Dashboard-EduNexus.php';</script>";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize the file name to prevent security issues
    $fileName = htmlspecialchars($_POST['fileName']);

    // Get the current logged-in username from the session
    $currentUser = $_SESSION['user'];

    // Fetch the file record from the database
    $stmt = $conn->prepare("SELECT user FROM admin_file WHERE fileName = ?");
    $stmt->bind_param("s", $fileName);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($fileOwner);
        $stmt->fetch();

        // Check if the logged-in user is the owner of the file
        if ($currentUser === $fileOwner) {
            $filePath = 'uploads/' . $fileName;

            // Check if the file exists on the server
            if (file_exists($filePath)) {
                // Attempt to delete the file from the server
                if (unlink($filePath)) {
                    // Delete the file record from the database in admin_file table
                    $deleteStmt = $conn->prepare("DELETE FROM admin_file WHERE fileName = ?");
                    $deleteStmt->bind_param("s", $fileName);
                    $deleteStmt->execute();

                    // Delete the file record from the files table (for students)
                    $deleteStudentFileStmt = $conn->prepare("DELETE FROM files WHERE fileName = ?");
                    $deleteStudentFileStmt->bind_param("s", $fileName);
                    $deleteStudentFileStmt->execute();

                    $message = 'File deleted successfully.';
                    echo "<script>alert('$message'); window.location.href = 'Dashboard-EduNexus.php';</script>";
                } else {
                    echo "<script>alert('Error deleting file from server.'); window.location.href = 'Dashboard-EduNexus.php';</script>";
                }
            } else {
                echo "<script>alert('File not found on the server.'); window.location.href = 'Dashboard-EduNexus.php';</script>";
            }
        } else {
            // If the logged-in user is not the owner of the file, deny deletion
            echo "<script>alert('You can only delete files that belong to you.'); window.location.href = 'Dashboard-EduNexus.php';</script>";
        }
    } else {
        // If the file does not exist in the database
        echo "<script>alert('File not found in the database.'); window.location.href = 'Dashboard-EduNexus.php';</script>";
    }

    $stmt->close();
} else {
    // If the request method is not POST
    echo "<script>alert('Invalid request method.'); window.location.href = 'Dashboard-EduNexus.php';</script>";
}

$conn->close();
?>
