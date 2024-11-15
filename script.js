document.getElementById('searchBtn').addEventListener('click', function() {
    let query = document.getElementById('searchInput').value;
    if (query) {
        alert('Qidirilmoqda: ' + query);
        // Bu yerda qidirish funktsiyasini qo'shish mumkin
    } else {
        alert('Iltimos, qidirish maydoniga so\'z kiriting.');
    }
});





// Izlash kerak bo'lgan sahifalar ro'yxati
const pages = ["fizika.html", "kimyo.html", "mexanika.html", "oliymatem.html", "tarih.html", "iqtisod.html", "adabiyot.html", "arxitektura.html", "elektrotexnika.html"];

function searchAcrossPages() {
    const searchWord = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Natijalarni tozalash
    
    let found = false;
    
    pages.forEach(page => {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                // Sahifani HTML sifatida yuklash va DOMga qo'shmasdan izlash
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, "text/html");
                
                const paragraphs = doc.querySelectorAll("p");
                paragraphs.forEach((paragraph, index) => {
                    const text = paragraph.textContent.toLowerCase();
                    if (text.includes(searchWord)) {
                        const resultLink = document.createElement("a");
                        
                        // Topilgan `<p>` yoki `<div>` elementning `id`si mavjudligini tekshirish
                        if (!paragraph.id) {
                            paragraph.id = `result-${index}`; // Agar `id` bo'lmasa, avtomatik beriladi
                        }
                        
                        resultLink.href = `${page}#${paragraph.id}`; // Sahifa va kotvka
                        resultLink.textContent = `Natija (${page}): ${paragraph.textContent}`;
                        resultLink.style.display = "block";
                        resultsContainer.appendChild(resultLink);
                        found = true;
                    }
                });
                
                if (!found) {
                    const noResult = document.createElement("p");
                    noResult.textContent = "Hech qanday natija topilmadi.";
                    resultsContainer.appendChild(noResult);
                }
            })
            .catch(error => console.error(`Sahifa yuklanmadi: ${page}`, error));
    });
}





// // Izlash kerak bo'lgan sahifalar ro'yxati
// const pages = ["fizika.html", "kimyo.html", "mexanika.html", "oliymatem.html", "tarih.html", "iqtisod.html", "adabiyot.html", "arxitektura.html", "elektrotexnika.html"];

// function searchAcrossPages() {
//     const searchWord = document.getElementById("searchInput").value.toLowerCase();
//     const resultsContainer = document.getElementById("results");
//     resultsContainer.innerHTML = ""; // Natijalarni tozalash
    
//     let found = false;
    
//     pages.forEach(page => {
//         fetch(page)
//             .then(response => response.text())
//             .then(data => {
//                 // Sahifani HTML sifatida yuklash va DOMga qo'shmasdan izlash
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(data, "text/html");
                
//                 const paragraphs = doc.querySelectorAll("p");
//                 paragraphs.forEach((paragraph, index) => {
//                     const text = paragraph.textContent.toLowerCase();
//                     if (text.includes(searchWord)) {
//                         const result = document.createElement("a");
//                         result.href = page; // Sahifa havolasi
//                         result.textContent = `Natija (${page}): ${paragraph.textContent}`;
//                         result.style.display = "block";
//                         resultsContainer.appendChild(result);
//                         found = true;
//                     }
//                 });
                
//                 if (!found) {
//                     const noResult = document.createElement("p");
//                     noResult.textContent = "Hech qanday natija topilmadi.";
//                     resultsContainer.appendChild(noResult);
//                 }
//             })
//             .catch(error => console.error(`Sahifa yuklanmadi: ${page}`, error));
//     });
// }
