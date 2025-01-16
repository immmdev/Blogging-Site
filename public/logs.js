function confirmDeletion(event) {
    event.preventDefault(); // Prevent default form submission
    
    const password = prompt("Please enter your password to confirm deletion:");
    if (!password) {
      alert("Deletion canceled.");
      return false; // Do not proceed
    }

    // Add the password to the hidden input field
    const form = event.target; // Reference the form
    const passwordInput = form.querySelector("#password-input");
    passwordInput.value = password;

    // Submit the form programmatically
    form.submit();
  }

  function redirectToHome() {
    window.location.href = '/';
  }

  function redirectToLogs() {
    window.location.href = '/logs';
  }

  function redirectToSignup() {
    window.location.href = '/signup';
  }
  function redirectTologin() {
    window.location.href = '/login';
  }