document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();
});

// Mengambil data dari localStorage
const username = localStorage.getItem("username");

// Memasukkan data ke dalam elemen dengan id "usernamePlaceholder"
const usernamePlaceholder = document.getElementById("usernamePlaceholder");
if (username && usernamePlaceholder) {
  usernamePlaceholder.textContent = username;
}

const logoutButton = document.getElementById("logout");

// Remove localstorage dan pindah halaman menggunakan arrow function
const handleLogout = () => {
  localStorage.removeItem("username");
  window.location.href = "../login-register-page/index.html";
};

// Event listener untuk menangani logout
logoutButton.addEventListener("click", handleLogout);
