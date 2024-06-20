const password = document.querySelector('input[name=password]');
const confirmPassword = document.querySelector('input[name=confirm-password]');
const errorMessage = document.getElementById('confirm-password-error');

password.oninput = () => checkPassword();
confirmPassword.oninput = () => checkPassword();

// confirm if password matches //
function checkPassword() {
    if (password.value != confirmPassword.value) {
        password.classList.add("error");
        confirmPassword.classList.add("error");
        errorMessage.textContent = "*Passwords do not match";
    } else {
        password.classList.remove("error");
        confirmPassword.classList.remove("error");
        errorMessage.textContent = "";
    }
}