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

$(document).ready(function() {
    $("#toggle-password-confirm").click(function() {
        var passwordField = $("#confirmed");
        var passwordFieldType = passwordField.attr('type');

        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            $("#toggle-icon-confirm").removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            $("#toggle-icon-confirm").removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
});


// ---------------

    // task 
    //     1. get form value
    //     2. make a validate function in password
    //     3. post form value to APIs

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

async function postDataToAPI(data) {
    try {
        const response = await fetch("https://6527e017931d71583df18810.mockapi.io/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Gagal mengirim data ke API");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function isEmailTaken(email) {
    const apiData = await fetchDataFromAPI();
    const value = apiData.some(user => user.email.toLowerCase() === email);
    return value
}


function getFormValue() {
    const formData = new FormData(form);
    const dataObject = {};
    for (const [key, value] of formData.entries()) {
        dataObject[key] = value;
    }
    return dataObject
}

function passwordValidate(pass) {
    const uppercase = /[A-Z]/;
    const digit = /\d/;
    const symbol = /[^A-Za-z0-9]/;

    if (uppercase.test(pass) && digit.test(pass) && symbol.test(pass)) {
        return true;
    } else {
        return false;
    }

}

function passwordConfirm(pass, conf) {
    const lowercasePassword = pass.toLowerCase();
    const lowercaseConfirmed = conf.toLowerCase();
    return lowercasePassword === lowercaseConfirmed;
}


const form = document.getElementById('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    getFormValue();
    let validate = passwordValidate(getFormValue().password);
    let confirm = passwordConfirm(getFormValue().password, getFormValue().confirmed);
    const email = getFormValue().email.toLowerCase();

    const taken = await isEmailTaken(email);

    if (taken === false) {
        if (validate == true ) {
            if (confirm == true) {
                // masukin kondisi kirim form ke api
                const updatedData = {
                    username: getFormValue().username,
                    email: getFormValue().email,
                    password: getFormValue().password,
                };
                const response = await postDataToAPI(updatedData);
                if (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Selamat, Anda Berhasil Daftar, Mari Login",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'index.html'; 
                        }
                      });;
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Opss...!",
                        text: "Data Tidak Dapat Tersimpan",
                      });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error Validasi",
                    text: "Pasword Tidak sama",
                  });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Maaf",
                text: "Password Harus berisikan minimal 1 Huruf kapital, angka dan simbol",
              });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Maaf",
            text: "Email anda sudah terdaftar",
          });
    }

    
    
});