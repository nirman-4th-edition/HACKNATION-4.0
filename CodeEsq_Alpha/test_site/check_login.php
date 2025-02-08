<?php
session_start();
if (isset($_SESSION['user'])) {
    echo 'true';
} else {
    echo 'false';
}
?>
