// URL API yang baru
const apiUrl = "https://652a65c84791d884f1fce0bd.mockapi.io/usahaoptima/api/article";

// Fungsi untuk mengambil data dari API
async function fetchArticles() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (Array.isArray(data)) { // Data adalah array
      displayArticles(data);
    } else {
      console.error("Gagal mengambil data artikel.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

// Fungsi untuk menampilkan list artikel
function displayArticles(articles) {
  const articleList = document.getElementById("article-list");

  articles.forEach((article) => {
    const articleCard = document.createElement("div");
    articleCard.classList.add("col-md-4", "col-sm-6");

    const pubDate = new Date(article.createdAt).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const maxDescriptionLength = 15; // Batasan jumlah kata untuk deskripsi

    let description = article.contents[0];
    if (description.split(" ").length > maxDescriptionLength) {
      description =
        description.split(" ").splice(0, maxDescriptionLength).join(" ") +
        "...";
    }

    const cardContent = `
      <div class="cards mb-5">
        <img src="${article.images[0].titleImg}" alt="Image" class="card-img-top rounded">
        <div class="card-body">
        <a class="text-decoration-none article-title" href="${article.articleUrl}">
        <h2 class="card-title text-center text-decoration-none title mb-2 article-title">${article.title}</h2>
      </a>
      
          <p class="description">${description}</p>
          <p class="pub-date">${pubDate} <span>Author: Dick Mullen</span></p>
        </div>
      </div>
    `;

    articleCard.innerHTML = cardContent;
    articleList.appendChild(articleCard);
  });
}

// Memanggil fungsi untuk mengambil data artikel
fetchArticles();
