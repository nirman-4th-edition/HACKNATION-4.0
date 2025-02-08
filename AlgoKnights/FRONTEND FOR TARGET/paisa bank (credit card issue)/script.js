document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    alert("Logged in successfully!");
    setTimeout(() => {
        window.location.href = "phished.html";
    }, 1000);
});

document.querySelectorAll(".toggle-buttons button").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelector(".toggle-buttons .active").classList.remove("active");
        this.classList.add("active");
    });
});
