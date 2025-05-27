var _a;
(_a = document.getElementById('login-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailInput = document.getElementById('user-id');
    var passwordInput = document.getElementById('user-password');
    if (!emailInput || !passwordInput) {
        alert("Form inputs not found.");
        return;
    }
    var enteredEmail = emailInput.value.trim();
    var enteredPassword = passwordInput.value;
    var storedEmail = localStorage.getItem('userEmail');
    var storedPassword = localStorage.getItem('userPassword');
    if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid credentials. Please try again.");
    }
});
