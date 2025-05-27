document.getElementById('login-form')?.addEventListener('submit', function (e: Event) {
  e.preventDefault();

  const emailInput = document.getElementById('user-id') as HTMLInputElement | null;
  const passwordInput = document.getElementById('user-password') as HTMLInputElement | null;

  if (!emailInput || !passwordInput) {
    alert("Form inputs not found.");
    return;
  }

  const enteredEmail: string = emailInput.value.trim();
  const enteredPassword: string = passwordInput.value;

  const storedEmail: string | null = localStorage.getItem('userEmail');
  const storedPassword: string | null = localStorage.getItem('userPassword');

  if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
});
