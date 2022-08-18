var button_register = document.querySelector('.btn-register');
button_register.addEventListener("click", function(e) {
    e.preventDefault();
    var check_register = checkInputs_register();
    let validForm = [];
    const isValidEmail = check_register.email;
    const isValidPass = check_register.password;
    const isValidUser = check_register.username;
    const isValidPass2 = check_register.password2;
    if (validForm.every(ele => ele === true)) {
        document.querySelector('.login').classList.toggle('click_login');
        document.querySelector('.register').classList.toggle('click_login');
    } else {

    }
})

function checkInputs_register() {
    var username = document.getElementById('username');
    var email_register = document.getElementById('email_register');
    var password_register = document.getElementById('password_register');
    var password2 = document.getElementById('password2');
    // trim to remove the btn-register
    var usernameValue = username.value.trim();
    var emai_registerlValue = email_register.value.trim();
    var password_registerValue = password_register.value.trim();
    var password2Value = password2.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username không thể bỏ trống');
    } else if (password_registerValue.length <= 2) {
        setErrorFor(username, 'Username phải từ 3 ký tự trở lên');
    } else {
        setSuccessFor(username);
    }

    if (emai_registerlValue === '') {
        setErrorFor(email_register, 'Email không thể bỏ trống');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email_register, 'Không hợp lệ');
    } else {
        setSuccessFor(email_register);
    }
    if (password_registerValue === '') {
        setErrorFor(password_register, 'Password không thể bỏ trống');
    } else if (password_registerValue.length <= 8) {
        setErrorFor(password_register, 'Password phải có  ít nhất 8 ký tự');
    } else {
        setSuccessFor(password_register);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Confirm không thể bỏ trống');
    } else if (password_registerValue !== password2Value) {
        setErrorFor(password2, 'Không trùng khớp');
    } else {
        setSuccessFor(password2);
    }
    return {
        username: usernameValue,
        email_register: emai_registerlValue,
        password_register: password_registerValue,
        password2: password2Value
    }
}

function setErrorFor(input, message) {
    var formControl = input.parentElement;
    var small = formControl.querySelector('small');
    formControl.className = 'input-effect  error';
    small.innerText = message;
}


function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}