<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$directory = 'E:/XAMAPP/htdocs/test_site/10/phy';

if (is_dir($directory)) {
    $files = scandir($directory);
    
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $filePath = $directory . '/' . $file;
            
            if (is_file($filePath)) {
                $fileExtension = pathinfo($filePath, PATHINFO_EXTENSION);
                
                $allowedExtensions = ['mp4', 'avi', 'mov', 'pdf'];
                if (in_array(strtolower($fileExtension), $allowedExtensions)) {
                    $relativePath = str_replace('E:/XAMAPP/htdocs/', '', $filePath);
                    echo "<li><a href='/$relativePath' target='_blank'>" . htmlspecialchars($file) . "</a></li>";
                }
            }
        }
    }
} else {
    echo "<li>No content available</li>";
}
?>
