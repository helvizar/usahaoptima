$(document).ready(function() {
    $("#toggle-password").click(function() {
        var passwordField = $("#password");
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $("#toggle-icon").removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            $("#toggle-icon").removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
});

// ---------------

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
 
});