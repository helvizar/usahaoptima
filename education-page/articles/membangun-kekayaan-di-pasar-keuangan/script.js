// URL API artikel
const apiUrl = "https://652a65c84791d884f1fce0bd.mockapi.io/usahaoptima/api/article/4";

// Fungsi untuk mengambil data artikel
async function fetchArticle() {
  try {
    const response = await fetch(apiUrl);
    const article = await response.json();
    displayArticle(article);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

// Fungsi untuk menampilkan artikel
function displayArticle(article) {
  document.querySelector(".article-title").textContent = article.title;

  // Tampilkan gambar utama
  const mainImage = document.querySelector(".main-image");
  mainImage.src = article.images[0].titleImg;
  mainImage.alt = "Image 2";

  // Tampilkan poin dan konten artikel
  const articleContent = document.querySelector(".article-content");
  article.points.forEach((point, index) => {
    const contentDiv = document.createElement("div");
    contentDiv.className = "container mt-5";

    const rowDiv = document.createElement("div");
    rowDiv.className = "row g-5 flex-md-nowrap";

    const imgCol = document.createElement("div");
    imgCol.className = "col-md-6";

    const textCol = document.createElement("div");
    textCol.className = "col-md-6 border-bottom";

    const pointImg = document.createElement("img");
    pointImg.loading = "lazy";
    pointImg.src = article.images[1].pointImg[index];
    pointImg.className = "img-fluid rounded w-100";
    pointImg.alt = "Image 3";

    const pointTitle = document.createElement("h2");
    pointTitle.className = "color";
    pointTitle.textContent = point;

    const pointContent = document.createElement("p");
    pointContent.className = "lead";
    pointContent.textContent = article.contents[index];

    imgCol.appendChild(pointImg);
    textCol.appendChild(pointTitle);
    textCol.appendChild(pointContent);

    rowDiv.appendChild(imgCol);
    rowDiv.appendChild(textCol);
    contentDiv.appendChild(rowDiv);

    articleContent.appendChild(contentDiv);
  });

  // Tampilkan gambar penutup
  const closingImage = document.querySelector(".closing-image");
  closingImage.src = article.images[2].closingImg;
  closingImage.alt = "Image 6";

  // Tampilkan kutipan dan penulis
  document.querySelector(".quote-text").textContent = `"${article.quotes}"`;
  document.querySelector(".quote-author").textContent = article.quotesAuthor;
}

// Panggil fungsi untuk mengambil dan menampilkan artikel
fetchArticle();
