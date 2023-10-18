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

async function fetchDataFromAPI() {
    try {
        const response = await fetch("https://6527e017931d71583df18810.mockapi.io/user");
        if (!response.ok) {
        throw new Error("Gagal mengambil data dari API");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

fetchDataFromAPI()

async function validateLogin(username, password) {
    const apiData = await fetchDataFromAPI();
    const lowercaseUsername = username.toLowerCase();
    const user = apiData.find(user => user.username.toLowerCase() === lowercaseUsername);

    if (user) {
        if (user.password === password) {
            Swal.fire({
                icon: "success",
                title: "Sukses!",
                text: "Selamat, Anda Berhasil login",
              }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/dashboard-page/index.html';
                    localStorage.setItem("username", user.username);
                }
              });
        } else {
            Swal.fire({
                icon: "error",
                title: "Eror Password",
                text: "Maaf, Password yang anda masukan salah",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Opss...!",
            text: "Maaf, Username tidak ditemukan, coba untuk ulangi atau daftar",
          });
    }
}

const loginForm = document.getElementById('form');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const usernameInput = loginForm.querySelector('#username').value;
    const passwordInput = loginForm.querySelector('#password').value;

    validateLogin(usernameInput, passwordInput);
    
});