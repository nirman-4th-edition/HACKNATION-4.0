document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username === '' || password === '') {
        document.getElementById('error-message').textContent = 'Please fill in all fields.';
    } else {
        // Here you can add your logic to handle the login, e.g., send data to a server
        console.log('Username:', username);
        console.log('Password:', password);

        // Clear the form and error message
        document.getElementById('loginForm').reset();
        document.getElementById('error-message').textContent = '';

        // For demonstration purposes, just show an alert alert('Login Sucessful');
    }
});