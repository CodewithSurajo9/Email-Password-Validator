const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("form");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const resultMessage = document.querySelector("#resultMessage");
const submitBtn = form.querySelector('button[type="submit"]');


const passGroup = password.parentElement;
let eyeBtn = document.createElement('span');
eyeBtn.setAttribute('tabindex', '0');
eyeBtn.setAttribute('role', 'button');
eyeBtn.setAttribute('aria-label', 'Show password');
eyeBtn.style.cursor = 'pointer';
eyeBtn.style.position = 'absolute';
eyeBtn.style.right = '12px';
eyeBtn.style.top = '49%';
eyeBtn.style.transform = 'translateY(-50%)';
eyeBtn.style.fontSize = '1.2em';
eyeBtn.innerHTML = '👁️';
passGroup.style.position = 'relative';
passGroup.appendChild(eyeBtn);

eyeBtn.addEventListener('click', function() {
    if (password.type === 'password') {
        password.type = 'text';
        eyeBtn.innerHTML = '🙈';
        eyeBtn.setAttribute('aria-label', 'Hide password');
    } else {
        password.type = 'password';
        eyeBtn.innerHTML = '👁️';
        eyeBtn.setAttribute('aria-label', 'Show password');
    }
});


let strengthMeter = document.createElement('div');
strengthMeter.id = 'strengthMeter';
strengthMeter.style.marginTop = '8px';
strengthMeter.style.height = '4px';
strengthMeter.style.borderRadius = '4px';
strengthMeter.style.transition = 'background 0.3s';
passGroup.appendChild(strengthMeter);


let strengthMeterText = document.createElement('span');
strengthMeterText.id = 'strengthMeterText';
passGroup.appendChild(strengthMeterText);

function getPasswordStrength(pass) {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;
    if (score <= 2) return { color: '#e74c3c'};
    if (score <= 4) return { color: '#f1c40f'};
    return { color: '#136f3aff'};
}

function updateStrengthBar(pass) {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;
    let percent = (score / 5) * 100;
    bar.style.width = percent + '%';
    let strength = getPasswordStrength(pass);
    bar.style.background = strength.color;
    strengthMeterText.textContent = strength.text;
    strengthMeterText.style.color = strength.color;
}


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validateEmail() {
    if (email.value === '') {
        emailError.textContent = '';
        emailError.style.display = 'none';
        email.style.borderColor = '';
        return false;
    }
    if (emailRegex.test(email.value)) {
        emailError.textContent = 'Valid email';
        emailError.style.display = 'initial';
        emailError.style.color = '#0c6832ff';
        email.style.borderColor = '#1a703eff';
        return true;
    } else {
        emailError.textContent = 'Email is incorrect';
        emailError.style.display = 'initial';
        emailError.style.color = '#e74c3c';
        email.style.borderColor = '#e74c3c';
        return false;
    }
}

function validatePassword() {
    if (password.value === '') {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
        password.style.borderColor = '';
        strengthMeter.style.background = '#eee';
        strengthMeter.textContent = '';
        return false;
    }
    let strength = getPasswordStrength(password.value);
    strengthMeter.style.background = strength.color;
    strengthMeter.textContent = strength.text;
    strengthMeter.style.color = strength.color;
    strengthMeter.style.textAlign = 'right';
    strengthMeter.style.fontSize = '0.9em';
    if (passwordRegex.test(password.value)) {
        passwordError.textContent = 'Valid password';
        passwordError.style.display = 'initial';
        passwordError.style.color = '#11592fff';
        password.style.borderColor = '#116534ff';
        return true;
    } else {
        passwordError.textContent = 'Password is incorrect';
        passwordError.style.display = 'initial';
        passwordError.style.color = '#e74c3c';
        password.style.borderColor = '#e74c3c';
        return false;
    }
}

email.setAttribute('required', 'required');
password.setAttribute('required', 'required');
emailError.setAttribute('aria-live', 'polite');
passwordError.setAttribute('aria-live', 'polite');

email.addEventListener('input', function() {
    validateEmail();
    checkFormValidity();
});
password.addEventListener('input', function() {
    validatePassword();
    checkFormValidity();
    updatePwdRequirements(password.value);
    updateStrengthBar(password.value);
});

function checkFormValidity() {
    if (validateEmail() && validatePassword()) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = 1;
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = 0.6;
        submitBtn.style.cursor = 'not-allowed';
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
        resultMessage.textContent = 'Everything is correct';
        resultMessage.style.color = '#136e39ff';
        resultMessage.style.transition = 'color 0.3s';
    } else {
        resultMessage.textContent = '';
    }
});



updatePwdRequirements(password.value);
updateStrengthBar(password.value);
