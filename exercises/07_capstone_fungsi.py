"""
==========================================================================
MISI 7 (GRAND CAPSTONE): NETWORK HEALTH INSPECTOR MODULAR
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

SELAMAT DATANG DI TANTANGAN TERAKHIR!
Di industri perangkat lunak, kode yang baik tersusun dari fungsi-fungsi kecil
yang modular (masing-masing punya 1 tugas spesifik), yang kemudian digabungkan
oleh satu fungsi utama.

--------------------------------------------------------------------------
TUGAS KAMU (3 FUNGSI YANG SALING TERHUBUNG):

1. Buat fungsi 'hitung_rata_rata_latency(daftar_ms)':
   - Menerima list angka latency ping (contoh: [10, 20, 30]).
   - Mengembalikan (return) nilai rata-rata (float atau int).
   - TIPS: sum(daftar_ms) / len(daftar_ms)

2. Buat fungsi 'diagnosa_koneksi(avg_latency)':
   - Menerima 1 angka rata-rata latency.
   - Mengembalikan string status:
     * Jika avg_latency < 20       -> return "SANGAT CEPAT"
     * Jika avg_latency < 50       -> return "STABIL"
     * Jika avg_latency >= 50      -> return "GANGGUAN"

3. Buat fungsi utama 'laporan_kesehatan_jaringan(nama_lab, daftar_ms)':
   - Menerima string 'nama_lab' dan list angka 'daftar_ms'.
   - Hitung rata-rata latency dengan memanggil 'hitung_rata_rata_latency(daftar_ms)'.
   - Tentukan status dengan memanggil 'diagnosa_koneksi(avg_latency)'.
   - Mengembalikan sebuah DICTIONARY dengan struktur tepat seperti ini:
     {
         "lab": nama_lab,
         "rata_rata_ms": rata_rata,
         "status": status_diagnosa
     }
--------------------------------------------------------------------------
"""

# TODO 1: Tulis fungsi hitung_rata_rata_latency(daftar_ms):




# TODO 2: Tulis fungsi diagnosa_koneksi(avg_latency):




# TODO 3: Tulis fungsi laporan_kesehatan_jaringan(nama_lab, daftar_ms):




# ========================================================================
# KODE UJI COBA MANDIRI:
# ========================================================================
if __name__ == "__main__":
    try:
        lab_name = "Lab Komputer TJKT 1"
        data_ping = [14, 16, 12, 18, 15]

        laporan = laporan_kesehatan_jaringan(lab_name, data_ping)
        print("=== HASIL INSPEKSI JARINGAN ===")
        print("Nama Lab     :", laporan["lab"])
        print("Rata-rata    :", laporan["rata_rata_ms"], "ms")
        print("Status Akhir :", laporan["status"])
    except (NameError, KeyError, TypeError) as e:
        print("[BELUM SELESAI] Error:", e)
