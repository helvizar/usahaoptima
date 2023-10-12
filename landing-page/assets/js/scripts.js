// Fungsi untuk efek pengetikan
  function typeEffect() {
    const text = "Hai Sobat UMKM!!";
    const speed = 100; // Kecepatan typing (ms)
    const textContainer = document.getElementById("animated-text");
    let i = 0;

    function type() {
      if (i < text.length) {
        textContainer.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    // Mulai efek typing
    type();
  }

  // Panggil fungsi typeEffect setelah dokumen dimuat
  document.addEventListener("DOMContentLoaded", function () {
    typeEffect();
  });

