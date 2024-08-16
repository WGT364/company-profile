// JavaScript untuk menambahkan kelas 'show' saat elemen masuk ke viewport
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll('.fade-in-element');

  function checkVisibility() {
      fadeElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              element.classList.add('show');
          }
      });
  }

  // Jalankan saat halaman di-scroll
  window.addEventListener('scroll', checkVisibility);
  // Jalankan saat halaman pertama kali dimuat
  checkVisibility();
});

// Menampilkan tombol ketika scroll turun lebih dari 100px
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const backToTopButton = document.getElementById("back-to-top");
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
        whatsappButton.style.bottom = '100px'; // Moves the WhatsApp button up when scrolling
    } else {
        backToTopButton.style.display = "none";
        whatsappButton.style.bottom = '30px'; // Resets the WhatsApp button to its original position
    }
}

// Scroll to the top when "back to top" button is clicked
document.getElementById('back-to-top').addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
