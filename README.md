# 🚀 Python Quest: Lab Interaktif Materi Fungsi (Functions)
### SMK Negeri 1 Bantaeng — Jurusan Teknik Jaringan Komputer & Telekomunikasi (TJKT)

Lingkungan latihan koding Python interaktif berbasis Terminal (*CLI Lab ala freeCodeCamp / Rustlings*) dengan **fitur Auto-Watch / Hot-Reload** instan. Didesain khusus untuk melatih logika dan pemahaman mendalam tentang **Fungsi (`def`, `return`, parameter, default arguments, guard clauses, dan arsitektur modular)** tanpa perlu install package eksternal yang rumit.

Menggunakan **`uv`** sebagai package dan project manager Python modern.

---

## ⚡ Alur Belajar Siswa (Alur Auto-Watch)

1. Siswa membuka **Terminal** di satu sisi layar, lalu menjalankan:
   ```bash
   uv run lab.py
   ```
2. Siswa membuka **VS Code** (atau editor teks favorit) di sisi layar lainnya.
3. Buka file latihan yang sedang aktif di folder `exercises/` (misal: `exercises/01_definisi_fungsi.py`).
4. Tulis kodingan solusi, lalu tekan **`Ctrl + S` (Save)**.
5. **Terminal akan otomatis mendeteksi perubahan seketika (< 100ms)**, menguji kode, dan menampilkan status visual:
   * 🔴 **Merah**: Masih ada yang belum sesuai, lengkap dengan petunjuk (*hint*) penyebab error.
   * 🟢 **Hijau**: Berhasil! Terminal otomatis berpindah ke latihan berikutnya!

---

## 📚 Kurikulum Latihan Fungsi (7 Tingkat Bertahap)

| File Latihan | Materi & Konsep | Tantangan Kontekstual TJKT |
| :--- | :--- | :--- |
| **`01_definisi_fungsi.py`** | Anatomi `def` & cara panggil | Membuat fungsi `sapa_lab()` untuk menyambut teknisi di terminal |
| **`02_parameter_argumen.py`** | Menerima data dinamis | Membuat fungsi `buat_banner(hostname, ip)` |
| **`03_return_vs_print.py`** | Memahami nilai kembalian | Kalkulator konversi kuota MB ke KB & total kuota list |
| **`04_default_parameter.py`** | Parameter opsional bawaan | Generator URL koneksi `koneksi_ssh(host, port=22, timeout=10)` |
| **`05_validasi_logika.py`** | Guard clauses & type check | Fungsi validasi nomor port jaringan (1–65535) |
| **`06_fungsi_dengan_list.py`** | Filter list & dictionary | Fungsi penyaring daftar perangkat aktif `filter_ip_aktif()` |
| **`07_capstone_fungsi.py`** | **GRAND CAPSTONE** | Modul analisis *Network Health Inspector* modular |

---

## 🛠️ Cara Menjalankan Lab

Pastikan `uv` sudah terpasang di komputer Anda.

### 1. Jalankan Lab dalam Mode Interaktif (Watch Mode):
```bash
uv run lab.py
```
*(atau bisa juga `uv run main.py`)*

### 2. Cek Seluruh Latihan Sekaligus (Mode Non-Interaktif / CI):
```bash
uv run lab.py --check
```

---

## 📂 Struktur Direktori Proyek

```
smk-python/
├── exercises/                    # Tempat siswa menulis kodingan
│   ├── 01_definisi_fungsi.py
│   ├── 02_parameter_argumen.py
│   ├── 03_return_vs_print.py
│   ├── 04_default_parameter.py
│   ├── 05_validasi_logika.py
│   ├── 06_fungsi_dengan_list.py
│   └── 07_capstone_fungsi.py
├── internal/
│   ├── __init__.py
│   └── test_suite.py             # Mesin validator penguji otomatis
├── lab.py                        # Runner utama dengan file watcher & ANSI UI
├── main.py                       # Titik masuk aplikasi
├── pyproject.toml                # Konfigurasi proyek uv
└── README.md
```

---

*Dibuat khusus untuk mendukung pembelajaran praktik langsung pemrograman siswa SMK Negeri 1 Bantaeng.*
