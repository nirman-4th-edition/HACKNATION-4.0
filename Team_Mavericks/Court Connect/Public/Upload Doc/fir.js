// user/app.js

document.getElementById("fir-upload-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const fileInput = document.getElementById("fir-file");
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById("message").innerText = "Please upload an FIR file.";
        return;
    }

    const formData = new FormData();
    formData.append("fir", file);

    // Show a loading message while waiting for the response
    document.getElementById("message").innerText = "Uploading... Please wait.";

    fetch("uploadfir.php", {  
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            document.getElementById("message").innerText = data.message;
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("message").innerText = "Error uploading FIR. Please try again.";
        });
});
fetch('user/uploadfir.php', {
    method: 'POST',
    body: formData,
})
.then(response => {
    // Check if the response is ok and if it's JSON
    if (!response.ok) {
        throw new Error('Server returned an error: ' + response.status);
    }
    return response.json(); // Parse JSON if the response is OK
})
.then(data => {
    // Log the response data (from PHP)
    console.log('Response from server:', data);
    // Display success message
    document.getElementById("message").innerText = data.message;
})
.catch(error => {
    // Handle errors during fetch or response parsing
    console.error("Error:", error);
    document.getElementById("message").innerText = 'An error occurred: ' + error.message;
});
