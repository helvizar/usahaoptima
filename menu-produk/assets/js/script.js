// document.addEventListener("DOMContentLoaded", function () {
//   var calendarEl = document.getElementById("calendar");
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: "dayGridMonth",
//   });
//   calendar.render();
// });

async function getData() {
  try {
    let dataApi = await fetch(
      "https://6528eeb055b137ddc83de793.mockapi.io/api/v1/menu-produk"
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        responseJson.forEach((item) => {
          document.getElementById("table").innerHTML += `
          <tr>
            <td class="td">${item.id}</td>
            <td class="td">${item.name}</td>
            <td class="td">Rp. ${item.price}</td>
            <td class="td">${item.quantity}</td>
            <td><i class="fa-regular fa-pen-to-square edit"></i> <i class="fa-regular fa-trash-can delete"></i></td>

          </tr>
          `;
        });
      });
  } catch (error) {
    console.logo("error");
  }
}

getData();
