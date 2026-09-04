# 🚀 Python Quest: Introduction to Programming with Python
### Workshop Interaktif Komunitas Programmer — SMK Negeri 1 Bantaeng

Platform pembelajaran pemrograman Python berbasis web (*zero-backend, client-side only*) yang dirancang khusus untuk siswa SMK (khususnya jurusan TJKT / IT) dengan memadukan estetika *Cyber-Arcade*, animasi morphing, audio 8-bit retro, dan pengujian kode otomatis.

Proyek ini terbagi menjadi **dua modul mandiri yang terpisah**:
1. **Modul Presentasi Interaktif (`index.html`)**: Slide materi visual yang dinamis untuk guru/pemateri di depan kelas.
2. **Modul Hands-on Practice Arena (`practice.html`)**: Web IDE mandiri untuk siswa praktek langsung dengan 9 misi bertingkat, verifikasi tes otomatis, dan pengerjaan dari nol.

---

## ✨ Fitur Utama

### 📽️ 1. Modul Slide Presentasi (`index.html`)
* **10 Slide Kurikulum Bertahap**:
  1. **Quest Lobby & Hero Rocket Launch**: Animasi peluncuran roket dengan kepulan asap (*smoke puffs*) dan deru pendorong audio saat tombol ditekan.
  2. **Model IPO (Input $\to$ Process $\to$ Output)**: Visualisasi alur kartu bertahap tanpa garis mengganggu.
  3. **Python Superpowers di TJKT**: Tab interaktif simulasi auto-ping MikroTik, bot keamanan siber, dan fondasi AI.
  4. **Konsep 1 — `print()`**: Terminal virtual interaktif dengan template preset.
  5. **Konsep 2 — Variabel & Tipe Data**: Kuis interaktif audiens (`"10" + "10"` vs `10 + 10`).
  6. **Konsep 3 — List / Array**: Visualisasi kontainer dinamis + Kuis Index `[0]`.
  7. **Konsep 4 — `input()`**: Generator Kartu Identitas Siswa Hologram secara live.
  8. **Konsep 5 — Logika `if - else`**: Gerbang syarat KKM 75 dengan slider responsif (Lulus/Remedial) + Kuis Syarat SIM.
  9. **Konsep 6 — Perulangan `for loop`**: Simulator auto-ping 100x kecepatan tinggi + Kuis `range(5)`.
  10. **Mentalitas Debugging & Grand Launchpad**: 3D Flip Card rahasia developer + 6 checklist pilar materi + Akses langsung ke Arena Praktek.

* **Kontrol Presenter**:
  * `Spasi` atau `Panah Kanan` $\rightarrow$ Slide Berikutnya / Peluncuran Roket
  * `Panah Kiri` $\rightarrow$ Slide Sebelumnya
  * `F` $\rightarrow$ Fullscreen (Layar Penuh Proyektor)
  * Tombol navigasi langsung ke **Arena Praktek Mandiri**.

---

### 💻 2. Modul Hands-on Practice Web IDE (`practice.html`)
* **Benar-benar Terpisah dari PPT**: Antarmuka layar penuh profesional (*full workspace Web IDE*) layaknya LeetCode / VS Code Web.
* **Pilihan Pengerjaan Fleksibel**:
  * **✍️ Ketik Dari Nol (Blank Canvas)**: Editor kosong bersih untuk melatih siswa menyusun kode dari awal sesuai target spesifikasi.
  * **💡 Pakai Template (Mode Bimbingan)**: Dilengkapi kerangka kode awal dan komentar panduan.
* **Kurikulum 9 Misi Bertingkat (Kontekstual SMK TJKT)**:
  * 🟢 **Misi 1**: Broadcast Pesan Selamat Datang Lab Komputer (`print`)
  * 🔵 **Misi 2**: Konfigurasi Identitas Server & Port Router (Variabel String & Integer)
  * 🟡 **Misi 3**: Kalkulator Konversi Bandwidth Kuota Lab (Perkalian Matematika `* 1024`)
  * 🟣 **Misi 4**: Berita Acara Perbaikan LAN Interaktif (`input`)
  * 🔷 **Misi 5**: Manajemen Whitelist IP MikroTik (`list`, `.append()`, `len()`)
  * 🔴 **Misi 6**: Gerbang Firewall Pemeriksa Port (`if - else`)
  * 🟠 **Misi 7**: Klasifikasi Status Kecepatan Jaringan (`if - elif - else`)
  * 🟣 **Misi 8**: Otomasi Patroli Auto-Ping 10 Client Lab (`for loop` & `range(1, 11)`)
  * 👑 **Misi 9 (GRAND CAPSTONE)**: **"SMK Cyber Sentinel - CLI Network Manager"** (Aplikasi CLI utuh dengan menu pilihan, input pilihan teknisi, percabangan, dan list manipulasi data perangkat).
* **Automated Test Runner**:
  * Tombol **"Uji Tantangan (Run Tests)"** yang memeriksa output kode siswa secara otomatis terhadap kriteria keberhasilan spesifikasi.
* **Gamifikasi & Progress Tracker**:
  * Kemajuan misi tersimpan di *Local Storage* per-browser.
  * Level XP & Lencana Rank: *Novice Cadet $\to$ Junior IT Admin $\to$ Network Security Specialist $\to$ Cyber Sentinel Master*.
  * Modal selebrasi Piala Juara saat Capstone terselesaikan!
* **Contekan Sintaks Python (*Cheat Sheet Drawer*)**:
  * Panel referensi cepat bawaan yang bisa dibuka kapan saja dengan tombol 1-klik salin snippet.

---

## 🏃 Cara Menjalankan Secara Lokal

Cukup jalankan web server lokal bawaan Python di komputer:

```bash
# Masuk ke folder project
python3 -m http.server 8000
```

* Buka Presentasi: **`http://localhost:8000`** (atau `http://localhost:8000/index.html`)
* Buka Arena Praktek: **`http://localhost:8000/practice.html`**

---

## 🌐 Cara Publikasi Online Gratis (Bisa Diakses HP & Laptop Siswa)

### Opsi A: Vercel (Paling Direkomendasikan)
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub.
2. Buat repository baru di GitHub dan push folder ini.
3. Import project di Vercel, lalu klik **Deploy**.
4. Dalam 15 detik website langsung aktif online di `https://nama-project.vercel.app`.

### Opsi B: Netlify (Drag and Drop / Tanpa Terminal)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop).
2. Seret (*drag and drop*) folder `smk-python` langsung ke area upload browser.
3. Website langsung aktif dan link publik siap dibagikan ke siswa!

### Opsi C: GitHub Pages
1. Push project ini ke repository GitHub.
2. Masuk ke tab **Settings** $\rightarrow$ **Pages**.
3. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.

---

## 📂 Struktur File Project

```
├── index.html        # Modul 1: Slide Presentasi Interaktif (10 slide & rocket launch)
├── styles.css        # Stylesheet utama & animasi morphing GSAP
├── app.js            # Engine kontrol slide, keyboard nav & audio synthesizer
│
├── practice.html     # Modul 2: Hands-on Practice Web IDE (Terpisah dari PPT)
├── practice.css      # Stylesheet antarmuka IDE & test report
├── practice.js       # Engine Python Skulpt, 9 kurikulum misi, test runner & XP
│
├── README.md         # Dokumentasi & panduan deployment
└── playground.js     # Engine pendukung internal
```

---

*Dibuat khusus untuk mendukung kemajuan literasi teknologi & komunitas programmer siswa SMK Negeri 1 Bantaeng.*
