// document.addEventListener("DOMContentLoaded", function () {
//   var calendarEl = document.getElementById("calendar");
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: "dayGridMonth",
//   });
//   calendar.render();
// });

const dataApi = async () => {
  const api = await fetch("https://api-berita-indonesia.vercel.app/cnn/ekonomi");
  const data = await api.json();
  const firstPoint = data.title
  // items(data);
  console.log("datanya adalah: ", data.data.posts);
}

// const items = (articles) => {
//   articles.forEach((arcile) => {
//     console.log(arcile)
//   })
// }

dataApi();
