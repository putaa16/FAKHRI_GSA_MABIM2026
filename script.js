// 1. Data Kategori Sampah & Cara Pengolahannya
const categoryData = {
    organik: {
        title: "Sampah Organik (Mudah Terurai)",
        badgeClass: "badge-organik",
        badgeText: "Wadah Hijau",
        description: "Sampah yang berasal dari sisa makhluk hidup (tumbuhan maupun hewan) yang dapat terurai secara alami oleh mikroorganisme.",
        examples: [
            "Sisa makanan, nasi, sayuran, dan kulit buah",
            "Daun kering, ranting pohon, dan potongan rumput",
            "Ampas kopi, kantong teh celup (tanpa staples), dan cangkang telur",
            "Tulang ikan/ayam dalam jumlah kecil"
        ],
        processing: [
            "Komposting (Komposter ember tumpuk atau lubang biopori)",
            "Budidaya Maggot BSF (Black Soldier Fly) untuk pakan ternak",
            "Eco-Enzyme dari fermentasi kulit buah segar, gula merah, dan air",
            "Pupuk Organik Cair (POC) untuk tanaman pekarangan"
        ]
    },
    anorganik: {
        title: "Sampah Anorganik (Dapat Didaur Ulang)",
        badgeClass: "badge-anorganik",
        badgeText: "Wadah Kuning / Biru",
        description: "Sampah non-alami yang sulit terurai oleh tanah namun memiliki nilai ekonomi tinggi jika dipilah dalam kondisi bersih.",
        examples: [
            "Botol plastik PET, gelas kemasan, dan jerigen",
            "Kardus, kertas HVS, koran, dan majalah bekas",
            "Kaleng minuman aluminium, besi tua, dan tembaga",
            "Botol kaca dan stoples beling utuh"
        ],
        processing: [
            "Disetorkan ke Bank Sampah untuk ditukar saldo tabungan",
            "Daur ulang kreatif (Upcycling) menjadi kerajinan atau pot tanaman",
            "Pembuatan Ecobrick dari plastik kemasan bersih yang dipadatkan ke dalam botol",
            "Disalurkan ke pengepul atau fasilitas daur ulang industri (MRF)"
        ]
    },
    b3: {
        title: "Sampah B3 (Bahan Berbahaya & Beracun)",
        badgeClass: "badge-b3",
        badgeText: "Wadah Merah",
        description: "Sampah yang mengandung zat beracun, korosif, mudah meledak, atau mencemari lingkungan serta membahayakan kesehatan manusia.",
        examples: [
            "Baterai bekas, aki, dan powerbank rusak",
            "Lampu neon (CFL/TL) dan bohlam pecah",
            "Limbah elektronik (kabel, charger, HP/laptop rusak)",
            "Kaleng aerosol/obat nyamuk, botol pembersih kimia, dan limbah medis (masker/jarum)"
        ],
        processing: [
            "JANGAN dibakar, ditimbun di tanah, atau dibuang ke saluran air",
            "Simpan dalam wadah tertutup rapat dan beri label peringatan B3",
            "Serahkan ke Drop Box E-Waste atau TPS khusus B3 yang dikelola Dinas Lingkungan Hidup",
            "Untuk limbah medis rumah tangga (masker), gunting/rusak dan semprot disinfektan sebelum dibungkus rapat"
        ]
    }
};

// Render Kategori Awal & Event Listener Tab
const categoryDisplay = document.getElementById("category-display");
const tabButtons = document.querySelectorAll(".tab-btn");

function renderCategory(key) {
    const data = categoryData[key];
    categoryDisplay.innerHTML = `
        <div class="cat-header">
            <span class="cat-badge ${data.badgeClass}">${data.badgeText}</span>
            <h3>${data.title}</h3>
        </div>
        <p>${data.description}</p>
        <div class="cat-details">
            <div class="cat-box">
                <h4>Contoh Jenis Sampah:</h4>
                <ul>
                    ${data.examples.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
            <div class="cat-box">
                <h4>Cara Pengolahan yang Tepat:</h4>
                <ul>
                    ${data.processing.map(step => `<li>${step}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;
}

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCategory(btn.dataset.category);
    });
});

renderCategory("organik");

// 2. Data Lokasi Bank Sampah
const bankSampahList = [
    {
        name: "Bank Sampah Induk Hijau Lestari",
        address: "Jl. Merdeka No. 45, Pusat Kota",
        hours: "Senin - Sabtu | 08.00 - 15.00 WIB",
        accepted: ["Anorganik", "Minyak Jelantah", "Elektronik Kecil"],
        mapsQuery: "https://www.google.com/maps/search/?api=1&query=Bank+Sampah+Induk"
    },
    {
        name: "Bank Sampah Unit Mandiri Sejahtera",
        address: "Komplek Griya Asri Blok C2, Kec. Sukamaju",
        hours: "Rabu & Sabtu | 09.00 - 13.00 WIB",
        accepted: ["Plastik", "Kardus", "Logam", "Kaca"],
        mapsQuery: "https://www.google.com/maps/search/?api=1&query=Bank+Sampah+Unit"
    },
    {
        name: "Drop Point E-Waste & B3 EcoHub",
        address: "Area Kantor Dinas Lingkungan Hidup / Balai Warga",
        hours: "Setiap Hari | 08.00 - 17.00 WIB",
        accepted: ["B3", "Baterai", "Lampu Neon", "E-Waste"],
        mapsQuery: "https://www.google.com/maps/search/?api=1&query=Dinas+Lingkungan+Hidup"
    },
    {
        name: "Rumah Kompos & Bank Sampah Mekar",
        address: "Jl. Raya Kampung Baru No. 12",
        hours: "Selasa, Kamis, Minggu | 08.00 - 14.00 WIB",
        accepted: ["Organik", "Anorganik"],
        mapsQuery: "https://www.google.com/maps/search/?api=1&query=Rumah+Kompos+Bank+Sampah"
    }
];

const bankListContainer = document.getElementById("bank-list");
const bankSearchInput = document.getElementById("bank-search");

function renderBanks(filterText = "") {
    const query = filterText.toLowerCase();
    const filtered = bankSampahList.filter(bank =>
        bank.name.toLowerCase().includes(query) ||
        bank.address.toLowerCase().includes(query) ||
        bank.accepted.some(tag => tag.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
        bankListContainer.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color:#64748b;">Lokasi bank sampah tidak ditemukan untuk kata kunci tersebut.</p>`;
        return;
    }

    bankListContainer.innerHTML = filtered.map(bank => `
        <div class="bank-card">
            <div>
                <h3>${bank.name}</h3>
                <p class="bank-meta">📍 ${bank.address}<br>🕒 ${bank.hours}</p>
                <div class="bank-tags">
                    ${bank.accepted.map(tag => `<span class="tag">${tag}</span>`).join("")}
                </div>
            </div>
            <a href="${bank.mapsQuery}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="text-align:center;">Buka di Google Maps ↗</a>
        </div>
    `).join("");
}

bankSearchInput.addEventListener("input", (e) => renderBanks(e.target.value));
renderBanks();

// 3. Fitur EcoLens (Deteksi Kategori Foto Sampah)
const imageInput = document.getElementById("waste-image-input");
const uploadArea = document.getElementById("upload-area");
const previewContainer = document.getElementById("preview-container");
const imagePreview = document.getElementById("image-preview");
const resetImageBtn = document.getElementById("reset-image-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const wasteHintInput = document.getElementById("waste-hint");
const lensResult = document.getElementById("lens-result");

let imageLoaded = false;

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        uploadArea.classList.add("hidden");
        previewContainer.classList.remove("hidden");
        lensResult.classList.add("hidden");
        imageLoaded = true;
    };
    reader.readAsDataURL(file);
});

resetImageBtn.addEventListener("click", () => {
    imageInput.value = "";
    imagePreview.src = "";
    previewContainer.classList.add("hidden");
    uploadArea.classList.remove("hidden");
    lensResult.classList.add("hidden");
    imageLoaded = false;
});

function classifyWaste(hintText, imgElement) {
    const text = hintText.toLowerCase().trim();

    // Deteksi berbasis kata kunci (prioritas tinggi jika pengguna mengisi petunjuk atau nama file)
    const b3Keywords = ["baterai", "aki", "lampu", "neon", "elektronik", "kabel", "hp", "obat", "kimia", "aerosol", "kaleng semprot", "masker", "suntik", "cat", "oli"];
    const organikKeywords = ["daun", "nasi", "makanan", "sayur", "buah", "kulit", "pisang", "tulang", "ranting", "rumput", "kopi", "teh", "telur", "roti"];
    const anorganikKeywords = ["botol", "plastik", "kardus", "kertas", "kaleng", "kaca", "beling", "besi", "aluminium", "kresek", "sedotan", "styrofoam", "kemasan"];

    if (b3Keywords.some(k => text.includes(k))) {
        return {
            category: "Sampah B3 (Berbahaya & Beracun)",
            badgeClass: "badge-b3",
            confidence: "94%",
            advice: "Pisahkan dari sampah rumah tangga biasa. Simpan di wadah tertutup dan serahkan ke Drop Box E-Waste atau TPS khusus B3."
        };
    }

    if (organikKeywords.some(k => text.includes(k))) {
        return {
            category: "Sampah Organik",
            badgeClass: "badge-organik",
            confidence: "92%",
            advice: "Dapat langsung diolah menjadi pupuk kompos, eco-enzyme, atau pakan maggot BSF."
        };
    }

    if (anorganikKeywords.some(k => text.includes(k))) {
        return {
            category: "Sampah Anorganik",
            badgeClass: "badge-anorganik",
            confidence: "91%",
            advice: "Pastikan dalam kondisi bersih dan kering, pipihkan jika memungkinkan, lalu setor ke Bank Sampah terdekat."
        };
    }

    // Analisis heuristik warna dominan dari Canvas jika tidak ada kata kunci spesifik
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 50;
    canvas.height = 50;
    ctx.drawImage(imgElement, 0, 0, 50, 50);

    const data = ctx.getImageData(0, 0, 50, 50).data;
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r /= pixelCount;
    g /= pixelCount;
    b /= pixelCount;

    // Dominan hijau/cokelat alami cenderung Organik; cerah/biru/putih reflektif cenderung Anorganik
    if (g > r && g > b) {
        return {
            category: "Sampah Organik (Prediksi Visual)",
            badgeClass: "badge-organik",
            confidence: "78%",
            advice: "Terdeteksi dominasi spektrum alami/vegetasi. Cocok untuk pengomposan atau biopori."
        };
    } else if (r > 180 && g < 90 && b < 90) {
        return {
            category: "Periksa Potensi Sampah B3",
            badgeClass: "badge-b3",
            confidence: "72%",
            advice: "Jika objek berupa kemasan bahan kimia, baterai, atau elektronik, pastikan dibuang ke titik pengumpulan B3."
        };
    } else {
        return {
            category: "Sampah Anorganik (Prediksi Visual)",
            badgeClass: "badge-anorganik",
            confidence: "80%",
            advice: "Terdeteksi karakteristik material kemasan/sintetis. Bersihkan dan kumpulkan untuk didaur ulang di Bank Sampah."
        };
    }
}

analyzeBtn.addEventListener("click", () => {
    const fileName = imageInput.files[0] ? imageInput.files[0].name : "";
    const combinedHint = `${wasteHintInput.value} ${fileName}`;

    if (!imageLoaded && !wasteHintInput.value.trim()) {
        alert("Silakan unggah foto sampah terlebih dahulu atau ketik nama objek sampah.");
        return;
    }

    const result = classifyWaste(combinedHint, imagePreview);

    lensResult.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
            <span class="cat-badge ${result.badgeClass}">${result.category}</span>
            <small style="color:#64748b; font-weight:600;">Tingkat Keyakinan: ${result.confidence}</small>
        </div>
        <p style="font-size:0.95rem; margin-top:0.5rem;"><strong>Rekomendasi Tindakan:</strong> ${result.advice}</p>
    `;
    lensResult.classList.remove("hidden");
});

// 4. Pencatatan Kontribusi Daur Ulang (LocalStorage)
const contribForm = document.getElementById("contribution-form");
const contribTableBody = document.getElementById("contribution-table-body");
const totalWeightEl = document.getElementById("total-weight");
const totalCo2El = document.getElementById("total-co2");
const totalEntriesEl = document.getElementById("total-entries");
const clearHistoryBtn = document.getElementById("clear-history-btn");

let contributions = JSON.parse(localStorage.getItem("ecosort_contributions")) || [
    { id: 1, date: "2026-11-20", item: "Botol Plastik & Kardus", category: "Anorganik", weight: 2.5 },
    { id: 2, date: "2026-11-21", item: "Sisa Sayuran Dapur", category: "Organik", weight: 1.5 }
];

function saveAndRenderContributions() {
    localStorage.setItem("ecosort_contributions", JSON.stringify(contributions));

    // Hitung Statistik
    const totalWeight = contributions.reduce((sum, entry) => sum + parseFloat(entry.weight), 0);
    const estimatedCo2 = totalWeight * 1.8; // Faktor estimasi ~1.8 kg CO2 dicegah per kg sampah terpilah

    totalWeightEl.textContent = `${totalWeight.toFixed(1)} kg`;
    totalCo2El.textContent = `${estimatedCo2.toFixed(1)} kg CO₂`;
    totalEntriesEl.textContent = `${contributions.length} kali`;

    // Render Tabel
    if (contributions.length === 0) {
        contribTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">Belum ada catatan kontribusi. Mulai catat sekarang!</td></tr>`;
        return;
    }

    contribTableBody.innerHTML = contributions.map(entry => {
        let badgeClass = "badge-organik";
        if (entry.category === "Anorganik") badgeClass = "badge-anorganik";
        if (entry.category === "B3") badgeClass = "badge-b3";

        return `
            <tr>
                <td>${entry.date}</td>
                <td>${entry.item}</td>
                <td><span class="cat-badge ${badgeClass}" style="font-size:0.75rem;">${entry.category}</span></td>
                <td><strong>${parseFloat(entry.weight).toFixed(1)} kg</strong></td>
                <td><button class="delete-row-btn" onclick="deleteContribution(${entry.id})">Hapus</button></td>
            </tr>
        `;
    }).join("");
}

contribForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const item = document.getElementById("contrib-item").value.trim();
    const category = document.getElementById("contrib-category").value;
    const weight = parseFloat(document.getElementById("contrib-weight").value);

    if (!item || isNaN(weight) || weight <= 0) return;

    const today = new Date().toISOString().split("T")[0];
    contributions.unshift({
        id: Date.now(),
        date: today,
        item,
        category,
        weight
    });

    contribForm.reset();
    saveAndRenderContributions();
});

window.deleteContribution = function(id) {
    contributions = contributions.filter(item => item.id !== id);
    saveAndRenderContributions();
};

clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Hapus seluruh riwayat kontribusi daur ulang?")) {
        contributions = [];
        saveAndRenderContributions();
    }
});

saveAndRenderContributions();