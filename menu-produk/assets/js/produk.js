const elmLoading = document.getElementById("loading");
const elemenProductList = document.getElementById("product");
const productUrlApi =
  "https://6528eeb055b137ddc83de793.mockapi.io/api/v1/menu-produk";

var page = 1;
var limit = 10;

function showLoading() {
  elmLoading.style.display = "block";
}

function hideLoading() {
  elmLoading.style.display = "none";
}

function getProducts() {
  showLoading();

  fetch(`${productUrlApi}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      setProducts(products);
    })
    .catch((error) => {
      // handle error
    })
    .finally(() => {
      hideLoading();
    });
}

function componentProduct(product) {
  return `
  <tr>
    <td class="td">${product.id}</td>
    <td class="td">${product.name}</td>
    <td class="td">Rp. ${product.price}</td>
    <td class="td">${product.quantity}</td>
    <td><i class="fa-regular fa-pen-to-square edit"></i> <i class="fa-regular fa-trash-can delete"></i></td>
  </tr>`;
}

function clearProducts() {
  elemenProductList.innerHTML = "";
}

function setProducts(products) {
  clearProducts();
  products.forEach((product) => {
    elemenProductList.innerHTML += componentProduct(product);
  });
}

getProducts();

// Next Page
const elmNext = document.getElementById("next");
elmNext.addEventListener("click", () => {
  // Cek apakah ada produk pada halaman selanjutnya
  const nextPage = page + 1;
  checkPage(nextPage);
});

// Previous Page
const elmprevious = document.getElementById("previous");
elmprevious.addEventListener("click", () => {
  // Cek apakah ada produk pada halaman sebelumnya
  const previousPage = page - 1;
  checkPage(previousPage);
});

function checkPage(targetPage) {
  showLoading();

  fetch(`${productUrlApi}?page=${targetPage}&limit=${limit}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      if (products.length === 0) {
        alert("Tidak ada produk yang tersedia di halaman tersebut.");
      } else {
        page = targetPage;
        getProducts();
      }
    })
    .catch((error) => {
      // handle error
    })
    .finally(() => {
      hideLoading();
    });
}
