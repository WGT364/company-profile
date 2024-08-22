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
        whatsappButton.style.bottom = '100px'; // Memindahkan tombol WhatsApp ke atas saat scroll
    } else {
        backToTopButton.style.display = "none";
        whatsappButton.style.bottom = '30px'; // Mengembalikan posisi asli tombol WhatsApp
    }
}

// Scroll ke atas saat tombol "back to top" diklik
document.getElementById('back-to-top').addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// IIFE untuk menangani pengiriman form dan validasi email
(function() {
    // Validasi format email
    function validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    // Mengambil data dari form
    function getFormData(form) {
        var elements = form.elements;
        var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== "honeypot");
        }).map(function(k) {
            if(elements[k].name !== undefined) {
                return elements[k].name;
            } else if(elements[k].length > 0){
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name){
            var element = elements[name];
            formData[name] = element.value;
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        // Menambahkan nilai khusus form ke dalam data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "sheet1"; // Nama sheet default
        formData.formGoogleSendEmail = form.dataset.email || ""; // Email default

        console.log(formData);
        return formData;
    }

    // Menangani pengiriman form
    function handleFormSubmit(event) {  
        event.preventDefault();           
        var form = event.target;
        var data = getFormData(form);         
        if( data.email && !validEmail(data.email) ) {   
            var invalidEmail = form.querySelector(".email-invalid");
            if (invalidEmail) {
                invalidEmail.style.display = "block";
                return false;
            }
        } else {
            disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                console.log(xhr.status, xhr.statusText);
                console.log(xhr.responseText);
                var formElements = form.querySelector(".form-elements");
                if (formElements) {
                    formElements.style.display = "none"; // Sembunyikan form
                }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                    thankYouMessage.style.display = "block";
                }
                form.reset(); // Reset the form to clear all fields
                
                return;
            };
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }
    }
    
    // Fungsi yang dipanggil saat DOM telah dimuat
    function loaded() {
        console.log("Contact form submission handler loaded successfully.");
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    // Menonaktifkan semua tombol pada form
    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();
