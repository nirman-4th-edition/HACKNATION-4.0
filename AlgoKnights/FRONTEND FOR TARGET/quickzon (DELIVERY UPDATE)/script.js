document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Always show success message
    showMessage('Login successful!', 'success');
  
    // Redirect to the "phished" page after 2 seconds
    setTimeout(() => {
      window.location.href = 'phished.html'; // Redirect to the new page
    }, 2000);
  });
  
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
    const loginBox = document.querySelector('.login-box');
    loginBox.insertBefore(messageElement, loginBox.firstChild);
  }