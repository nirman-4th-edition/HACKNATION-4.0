// Get the input fields and login button
const usernameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginButton = document.querySelector('.submit-button');

// Function to enable/disable the login button
function updateLoginButton() {
    if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
        loginButton.style.backgroundColor = "#0095f6"; // Enable button color
        loginButton.disabled = false; // Enable the button
    } else {
        loginButton.style.backgroundColor = "#b2dffc"; // Disable button color
        loginButton.disabled = true; // Disable the button
    }
}

// Add event listeners to the input fields
usernameInput.addEventListener('input', updateLoginButton);
passwordInput.addEventListener('input', updateLoginButton);

// Handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Simulate a successful login
    showMessage('Login successful!', 'success');

    // Redirect to the phishing page after 2 seconds
    setTimeout(() => {
        window.location.href = 'phished.html'; // Redirect to the phishing page
    }, 2000);
});

// Function to show a message
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = message;

    // Insert the message above the form
    const loginBox = document.querySelector('.white-bg');
    loginBox.insertBefore(messageElement, loginBox.firstChild);
}