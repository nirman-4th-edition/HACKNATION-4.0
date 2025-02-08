document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Basic validation
    if (email === 'test@example.com' && password === 'password123') {
      alert('Login successful!');
      // Redirect or perform other actions here
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });