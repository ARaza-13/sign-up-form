document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('sign-up-form');

    // check if the form field is valid whenever the user types something
    form.addEventListener('input', function (event) {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            validateField(target);
        }
    });

    function validateField(field) {
        console.log(field);
    }
});

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