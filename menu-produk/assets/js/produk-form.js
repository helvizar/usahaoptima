function formDataToJson(formData) {
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  return data;
}

let elmBtnSubmit = document.getElementById("btn-submit");
elmBtnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  let elmForm = document.getElementById("form-produk");
  let formData = new FormData(elmForm);

  let data = formDataToJson(formData);
  createProduct(data);
});

// submit to API
const productUrlApi =
  "https://6528eeb055b137ddc83de793.mockapi.io/api/v1/menu-produk";

function createProduct(product) {
  fetch(productUrlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => {
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Product Created",
          text: "Your product has been created successfully!",
        }).then(() => {
          window.location.href = "produk.html";
        });
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the product.",
      });
    });
}
