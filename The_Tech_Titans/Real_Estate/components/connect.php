<?php

   $db_name = 'mysql:host=localhost;dbname=home_db';
   $db_user_name = 'root';
   $db_user_pass = '';

   try {
       $conn = new PDO($db_name, $db_user_name, $db_user_pass);
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       echo "Database connected successfully!";
   } catch (PDOException $e) {
       die("Connection failed: " . $e->getMessage());
   }

   function create_unique_id(){
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < 20; $i++) {
          $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
      }
      return $randomString;
  }

?>
