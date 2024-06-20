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
        const errorElement = document.getElementById(field.id + '-error');
         if (field.validity.valid) {
            field.classList.remove('invalid');
            errorElement.textContent = '';
            return true;
         } else {
            field.classList.add('invalid');
            errorElement.textContent = getErrorMessage(field);
            return false;
         }
    }

    function getErrorMessage(field) {
        const validity = field.validity;
        let errorMessage = '';
        console.log(validity);

        if (validity.valueMissing) {
            errorMessage = 'This field is required';
        } else if (validity.patternMismatch) {
            if (field.id === 'phone') {
                errorMessage = 'Enter a valid phone number (xxx-xxx-xxxx).';
            }
        }

        return errorMessage;
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
        password.classList.add("invalid");
        confirmPassword.classList.add("invalid");
        errorMessage.textContent = "*Passwords do not match";
    } else {
        password.classList.remove("invalid");
        confirmPassword.classList.remove("invalid");
        errorMessage.textContent = "";
    }
}