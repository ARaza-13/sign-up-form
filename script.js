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
            } else if (field.id = 'password') {
                errorMessage = getPasswordErrorMessage(field.value);
            }
        } else if (validity.typeMismatch) {
            if (field.type === 'email') {
                errorMessage = 'Enter a valid email address.'
            }
        } else if (validity.tooShort) {
            if (field.type === 'email') {
                errorMessage = `Email should be at least ${field.minLength} characters. You entered ${field.value.length}.`
            }
        }

        return errorMessage;
    }

    function getPasswordErrorMessage(password) {
        let errorMessage = 'Password must have:';
        const requirements = [
            { regex: /[A-Z]/, message: 'a capital letter' },
            { regex: /\d/, message: 'a number' },
            { regex: /[@$!%*?&]/, message: 'a special character' },
            { regex: /.{8,}/, message: 'at least 8 characters' },
        ];

        // test the password against each regular expression 
        // add requirement the the 'errors' array if requirement not met
        // transform array of unmet requirements into array of error messages
        const errors = requirements.filter(req => !req.regex.test(password)).map(req => req.message);

        if (errors.length > 0) {
            errorMessage += ' ' + errors.join(', ') + '.';
        } else {
            errorMessage = '';
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