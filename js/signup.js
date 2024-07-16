document.querySelector('.button').addEventListener('click', function() {
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    alert('Form submitted successfully!');

});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phone) {
    return /^\+?\d{11}$/.test(phone);
}
