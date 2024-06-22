document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('sign-up-form');

    const passwordField = document.getElementById('password');
    passwordField.addEventListener('input', function () {
        validateField(passwordField);
        validateField(document.getElementById('confirm-password'));
    });

    // check if the form field is valid whenever the user types something
    form.addEventListener('input', function (event) {
        const target = event.target;
        if (target.tagName === 'INPUT' && target.id !== 'password') {
            validateField(target);
        }
    });

    function validateField(field) {
        const errorElement = document.getElementById(field.id + '-error');
         if (field.validity.valid && !(
        (field.id === 'confirm-password' && field.value !== document.getElementById('password').value))) {
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
        } else if (field.id === 'confirm-password') {
            if (field.value !== document.getElementById('password').value) {
                errorMessage = 'Passwords do not match.'
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