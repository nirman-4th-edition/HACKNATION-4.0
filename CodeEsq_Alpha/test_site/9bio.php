<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class 9 Biology Content</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #011422, #122266);
            color: white;
            text-align: center;
            padding: 20px;
        }
        h1 {
            margin-top: 20px;
        }
        .content-list {
            list-style-type: none;
            padding: 0;
        }
        .content-list li {
            margin: 10px 0;
            padding: 10px;
            background-color: #333766;
            border-radius: 8px;
            width: 60%;
            margin-left: auto;
            margin-right: auto;
        }
        .content-list a {
            color: #C1FF72;
            text-decoration: none;
        }
        .content-list a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Class 9 Biology Content</h1>
    <ul class="content-list">
        <!-- Include the PHP script to dynamically generate content -->
        <?php include '9bio_content.php'; ?>
    </ul>
</body>
</html>
