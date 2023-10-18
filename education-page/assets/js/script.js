// URL API
const apiUrl = "https://api-berita-indonesia.vercel.app/antara/ekonomi";

// Fungsi untuk mengambil data dari API
async function fetchArticles() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      const articles = data.data.posts.slice(0, 6); // Mengambil 6 artikel pertama
      displayArticles(articles);
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

    const pubDate = new Date(article.pubDate).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const maxDescriptionLength = 15; // Batasan jumlah kata untuk deskripsi

    let description = article.description;
    if (description.split(" ").length > maxDescriptionLength) {
      description =
        description.split(" ").splice(0, maxDescriptionLength).join(" ") +
        "...";
    }

    const cardContent = `
      <div class="cards mb-5">
        <img src="${article.thumbnail}" alt="Image" class="card-img-top rounded">
        <div class="card-body">
          <a class="text-decoration-none" href="./finance-article.html">
            <h2 class="card-title text-center text-decoration-none title mb-2">${article.title}</h2>
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
