<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "village";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the village_files table class-wise
$classes = ['8', '9', '10']; 


$data = [];
$subjects = [];

// Fetch subjects
foreach ($classes as $class) {
    $stmt = $conn->prepare("SELECT DISTINCT subject FROM student_file WHERE class = ?");
    $stmt->bind_param("s", $class);
    $stmt->execute();
    $result = $stmt->get_result();
    $subjects[$class] = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
}

// Fetch files
foreach ($classes as $class) {
    $stmt = $conn->prepare("SELECT date, user, fileName, subject FROM student_file WHERE class = ?");
    $stmt->bind_param("s", $class);
    $stmt->execute();
    $result = $stmt->get_result();
    $data[$class] = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E.N.C.O.D.E.S. - Student Home Page</title>
    <link rel="icon" type="image/x-icon" href="https://lh3.googleusercontent.com/proxy/fS4JozlNzj0bL2G37CBNISw04VvYv3kdn6BdfbnlaKt_H-ynxRvS9NeJgCyIWU-B-zH6Ch9s3D-zq-L0Uhv6np1Gk16UTM5r8wNOj_VSF4tZEm8uqMTSfjLsr2zAvpQlg878uCtdfrKe">
    <link rel="stylesheet" href="studentPortal.css" />
    <style>
        
        body {
            font-family: "Times New Roman", Times, serif;
            margin: 0;
            background: linear-gradient(135deg, #011422, #122266);
            /*background-image: url('https://www.shutterstock.com/image-photo/man-using-virtual-screen-text-260nw-2396531205.jpg');*/
            background-size: cover;
            background-repeat: no-repeat;
            min-height: 100vh;
            text-align: center;
            color: white;
            transition: background 0.5s ease;
        }
        .background-image {
    /*width: 600px;  Adjusts the width of the image
    height: 300px; /* Maintains aspect ratio */
    position: absolute; /* Positioning the image */
    top: 420px;
    left: 450px;
    z-index: -1; /* Ensures the image is in the background */
    border-radius: 50%;  /* Makes the image circular */
    max-width: 100%;     /* Ensures the image doesn't exceed its container */
    max-height: 500px;   /* Limits the height */
    display: block;      /* Centers the image horizontally */
    margin: 0 auto;      /* Centers the image within the container */
}

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 800;
            border-bottom: 1px solid #2C2F48;
            background-color: rgba(0, 0, 0, 0.5); 
            transition: background-color 0.3s ease;
        }

        .header:hover {
            background-color: rgba(0, 0, 0, 0.7);
            animation: headerHoverAnimation 0.3s ease;
        }

        @keyframes headerHoverAnimation {
            0% { background-color: rgba(0, 0, 0, 0.5); }
            100% { background-color: rgba(0, 0, 0, 0.7); }
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            color: #FFD700; 
            transition: color 0.3s ease;
        }

        .title:hover {
            color: #FF4500; 
            animation: titleHoverAnimation 0.3s ease;
        }

        @keyframes titleHoverAnimation {
            0% { color: #FFD700; }
            100% { color: #FF4500; }
        }

        .welcome {
            font-size: 18px;
        }

        .navbar {
            display: flex;
            align-items: center;
            color: white;
        }

        .user-info {
            display: flex;
            align-items: center;
        }

        .user-info span {
            margin-left: 10px;
        }

        .user-icon img,
        .hamburger-icon img {
            width: 70px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            margin: -1 10px;
            
            transition: transform 0.3s ease;
        }

        .user-icon img:hover,
        .hamburger-icon img:hover {
            transform: scale(1.1);
            animation: iconHoverAnimation 0.3s ease;
        }

        @keyframes iconHoverAnimation {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }

        
        .dropdown-container {
            display: flex;
            justify-content: center;
            margin-top: 100px;
            padding-top: 80px;
            flex-wrap: wrap;
            transition: margin-top 0.3s ease, padding-top 0.3s ease;
        }

        .dropdown {
            margin: 10px;
            position: relative;
            transition: transform 0.3s ease;
        }

        .dropdown:hover {
            animation: dropdownHoverAnimation 0.3s ease;
        }

        @keyframes dropdownHoverAnimation {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
        }

        .dropbtn {
            background-color: #333766;
            color: white;
            padding: 10px;
            font-size: 16px;
            border-radius: 10px;
            width: 225px;
            height: 152px;
            border: 2px solid transparent;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            transition: transform 0.2s, border-color 0.2s;
        }

        .dropbtn:hover {
            transform: scale(1.05);
            border-color: #fff;
            animation: dropbtnHoverAnimation 0.2s ease;
        }

        @keyframes dropbtnHoverAnimation {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
            top: 160px;
            left: 0;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        .dropdown:hover .dropdown-content {
            display: block;
            opacity: 1;
            animation: dropdownContentFadeIn 0.3s ease-in-out;
        }

        @keyframes dropdownContentFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            transition: background-color 0.2s ease;
        }

        .dropdown-content a:hover {
            background-color: #ddd;
        }

        
        .side-menu {
            width: 200px;
            height: 100%;
            background-color: #c517e8;
            color: white;
            position: fixed;
            top: 0;
            right: -200px;
            transition: right 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
            opacity: 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .side-menu.active {
            right: 0;
            opacity: 1;
            animation: sideMenuSlideIn 0.3s ease;
        }

        @keyframes sideMenuSlideIn {
            0% { right: -200px; opacity: 0; }
            100% { right: 0; opacity: 1; }
        }

        .side-menu ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        .side-menu ul li {
            padding: 15px 20px;
            text-align: left;
            cursor: pointer;
            border-bottom: 1px solid #c9cacb;
            transition: background-color 0.3s ease, font-size 0.3s ease;
        }

        .side-menu ul li a {
            color: white;
            text-decoration: none;
        }

        .side-menu ul li:hover {
            background-color: #13e78f;
            font-size: 19px;
            animation: sideMenuItemHover 0.3s ease;
        }

        @keyframes sideMenuItemHover {
            0% { background-color: #c517e8; }
            100% { background-color: #13e78f; }
        }

        .menu-button {
            color: white;
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            font: inherit;
            cursor: pointer;
            text-align: left;
            display: block;
            transition: color 0.3s ease, background-color 0.3s ease;
        }

        .menu-button:hover {
            color: #ff6347; 
            background-color: #333;
            animation: menuButtonHover 0.3s ease;
        }

        @keyframes menuButtonHover {
            0% { color: white; background-color: none; }
            100% { color: #ff6347; background-color: #333; }
        }

        
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: center;
            }
            .title, .welcome {
                font-size: 20px;
                padding: 5px;
            }
            .dropdown-container {
                flex-direction: column;
                align-items: center;
            }
            .dropbtn {
                width: 80%;
                height: auto;
                padding: 20px;
            }
            .dropdown-content {
                min-width: 90%;
                position: static;
            }
        }

        .class-section {
            margin: 20px auto;
            padding: 20px;
            width: 80%;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .class-section h3 {
            margin-top: 0;
            color: #333766;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th,td {
            background-color: #333766;
            color: white;
        }
        td {
            background-color: green;
            color: white;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }
        a {
    color: yellow;
    /*background-color: green;*/
    text-decoration:none;
}
.title {
    background: linear-gradient(45deg, #ff0066, #ffcc00, #00ccff, #66ff66);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400% 400%;
    animation: gradientAnimation 5s ease infinite;
}

@keyframes gradientAnimation {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
}

.dropbtn {
    background: linear-gradient(45deg, #ff0066, #ffcc00, #00ccff, #66ff66);
    background-size: 400% 400%;
    border: 2px solid transparent;
    animation: gradientAnimation 5s ease infinite;
}

.dropbtn:hover {
    transform: scale(1.05);
    border-color: #fff;
    animation: gradientHoverAnimation 0.3s ease;
}

@keyframes gradientHoverAnimation {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
}


.dropdown-content a {
    background: linear-gradient(45deg, #ff0066, #ffcc00, #00ccff, #66ff66);
    background-size: 400% 400%;
    color: black;
    transition: background-color 0.2s ease;
    animation: gradientAnimation 5s ease infinite;
}

.dropdown-content a:hover {
    background: rgba(255, 255, 255, 0.3);
}


.dropdown-container {
    background: linear-gradient(45deg, #ff0066, #ffcc00, #00ccff, #66ff66);
    background-size: 400% 400%;
    animation: gradientAnimation 10s ease infinite;
}

    </style>
</head>
<body>
    <header class="header">
    <a href="javascript:location.reload()" style="text-decoration: none;">
        <span class="title" style="font-weight: bold; font-size: 21px" >E.N.C.O.D.E.S.</span>
</a>
<img src=".gif" alt="" class="background-image" />
        <div class="navbar">
            <div class="logo">
                            </div>
            <div class="user-info">
                <span id="greeting">Hello, User</span>
                <div class="user-icon">
                    <img id="user-icon" src="user_icon.png" alt="User Icon" />
                </div>
                <button onclick="showMenu()" class="hamburger-icon">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-icon-download-in-svg-png-gif-file-formats--list-checklist-document-user-interface-pack-icons-1244641.png" alt="Hamburger Icon" />
                </button>
            </div>
        </div>
    </header>
    <div class="dropdown-container">
        <div class="dropdown">
            <button class="dropbtn" onclick="toggleClassDropdown()">Select Class</button>
            <div id="classDropdown" class="dropdown-content">
                <?php foreach ($classes as $class): ?>
                    <a href="#" onclick="selectClass('<?php echo htmlspecialchars($class); ?>')">Class <?php echo htmlspecialchars($class); ?></a>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropbtn" id="subjectDropdownButton" onclick="toggleSubjectDropdown()">Select Subject</button>
            <div id="subjectDropdown" class="dropdown-content">
                
            </div>
        </div>
    </div>

    <div class="content" id="fileContent">
        
    </div>
    <div class="side-menu">
            <ul>
                <li>
                    <a href="profile.html">
                        <button class="menu-button" id="user-account">
                            Your Account
                        </button>
                    </a>
                </li>
                <li>
                    <a href="settings.html">
                        <button class="menu-button" id="user-settings">Settings</button>
                    </a>
                </li>
                <li id="about-us">
                    <a href="about-us.html" target="_blank">
                        <button class="menu-button" id="user-settings">About Us</button>
                    </a>
                </li>
                <li onclick="handleLogout()">
                    <button class="menu-button" id="logout-btn">Logout</button>
                </li>
            </ul>
        </div>

        <script>
        let filesData = <?php echo json_encode($data); ?>;
        let subjectsData = <?php echo json_encode($subjects); ?>;
        let selectedClass = null;

        function toggleClassDropdown() {
            document.getElementById("classDropdown").classList.toggle("show");
        }

        function toggleSubjectDropdown() {
            document.getElementById("subjectDropdown").classList.toggle("show");
        }

        function selectClass(className) {
            selectedClass = className;
            updateSubjectDropdown(); 
            displayFiles();         

            const fileContainer = document.getElementById('fileContainer');
            fileContainer.innerHTML = '';  
            fileContainer.style.display = 'none';  
        }

        function selectSubject(subject) {
            displayFiles(subject);
        }

        function updateSubjectDropdown() {
            const subjectDropdown = document.getElementById("subjectDropdown");
            subjectDropdown.innerHTML = ''; 

            if (selectedClass && subjectsData[selectedClass]) {
                subjectsData[selectedClass].forEach(({ subject }) => {
                    const a = document.createElement("a");
                    a.href = "#";
                    a.textContent = subject;
                    a.onclick = () => selectSubject(subject);
                    subjectDropdown.appendChild(a);
                });
            }
        }

        function displayFiles(subject = null) {
            const contentDiv = document.getElementById("fileContent");
            contentDiv.innerHTML = ''; 

            if (selectedClass && filesData[selectedClass]) {
                const filteredFiles = subject ? filesData[selectedClass].filter(file => file.subject === subject) : filesData[selectedClass];
                
                if (filteredFiles.length > 0) {
                    const table = document.createElement("table");
                    table.innerHTML = `
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Admin</th>
                                <th>File Name</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
        ${filteredFiles.map(file => `
            <tr>
                <td>${file.date}</td>
                <td>${file.user}</td>
                <td>
                    ${file.fileName.endsWith('.pdf') || 
                    file.fileName.endsWith('.mp4') || 
                    file.fileName.endsWith('.jpg') || 
                    file.fileName.endsWith('.jpeg') || 
                    file.fileName.endsWith('.png')  ? `
                        <a href="#" onclick="showFile('uploads/${file.fileName}', 
    ${file.fileName.endsWith('.pdf') ? `'pdf'` : 
    file.fileName.endsWith('.mp4') ? `'video'` : 
    (file.fileName.endsWith('.jpg') || file.fileName.endsWith('.jpeg') || file.fileName.endsWith('.png')) ? `'image'` : 
    `'unknown'`})">
    ${file.fileName}
</a>
                    ` : `
                        <a href='uploads/${file.fileName}' download>${file.fileName}</a>
                    `}
                </td>
                <td>${file.subject}</td>
            </tr>
        `).join('')}
    </tbody>
                    `;
                    contentDiv.appendChild(table);
                    speakText("Files have been updated successfully.");
                } else {
                    contentDiv.innerHTML = '<p>No records found</p>';
                    speakText("No records found for the selected subject.");
                }
            }
        }

        // Initialize
        function initialize() {
            const classDropdownButton = document.getElementById("classDropdownButton");
            const subjectDropdownButton = document.getElementById("subjectDropdownButton");
            classDropdownButton.addEventListener("click", toggleClassDropdown);
            subjectDropdownButton.addEventListener("click", toggleSubjectDropdown);
        }
        
        document.addEventListener("DOMContentLoaded", () => {
            initialize();
            speakText("Welcome to the student dashboard.");
        });

        function showMenu() {
            const sideMenu = document.querySelector('.side-menu');
            sideMenu.classList.toggle('active');
        }

        // Close the menu if clicked outside
        document.addEventListener('click', function (event) {
            const sideMenu = document.querySelector('.side-menu');
            const hamburgerIcon = document.querySelector('.hamburger-icon');

            if (!sideMenu.contains(event.target) &&
                !hamburgerIcon.contains(event.target) &&
                sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
            }
        });

        // Retrieve username and profile picture from localStorage
        const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (savedUser && savedUser.username) {
            greeting.textContent = `Hello, ${savedUser.username}`;
            speakText(`Hello, ${savedUser.username}. Welcome back to Your Dashboard!`);
        }

        const savedProfilePicture = localStorage.getItem("profilePicture");
        if (savedProfilePicture) {
            profilePicture.src = savedProfilePicture;
        }

        function handleLogout() {
            const confirmLogout = confirm("Are you sure you want to log out?");
            
            if (confirmLogout) {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("profilePicture");
                speakText("You have successfully logged out.");
                window.location.href = 'login.html';
            }
        }

        // Function to enable speech output
        function speakText(text) {
            if ('speechSynthesis' in window) {
                let speech = new SpeechSynthesisUtterance(text);
                speech.lang = 'en-US';
                speech.rate = 1;
                window.speechSynthesis.speak(speech);
            }
        }
    </script>
    <script>
    function showFile(fileUrl, fileType) {
    const container = document.getElementById('fileContainer');
    container.style.display = 'block';  
    
    container.scrollIntoView({ behavior: 'smooth' });

    if (fileType === 'pdf') {
        container.innerHTML = `<iframe src="${fileUrl}" style="width: 100%; height: 100%;"></iframe>`;
    } else if (fileType === 'video') {
        container.innerHTML = `
            <video width="100%" height="100%" controls>
                <source src="${fileUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else if (fileType === 'image') {
        container.innerHTML = `<img src="${fileUrl}" style="max-width: 100%; max-height: 500px; display: block; margin: 0 auto;"  />`;
    } else {
        container.innerHTML = `<p>File type not supported for display.</p>`;
    }
}

</script>

<div id="fileContainer" style="width: 100%; height: 500px; border: 1px solid #ccc; margin-top: 20px;">
    
</div>
</body>
</html>

<?php

$conn->close();
?>
