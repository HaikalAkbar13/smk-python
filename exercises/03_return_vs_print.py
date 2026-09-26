"""
==========================================================================
MISI 3: MEMAHAMI RETURN VS PRINT (Kalkulator Bandwidth)
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

JEBAKAN PEMULA:
Banyak yang mengira 'print()' dan 'return' itu sama. Padahal:
- print() HANYA menampilkan tulisan ke layar monitor. Hasilnya TIDAK BISA
  disimpan ke variabel lain untuk dihitung lagi.
- return MENGIRIMKAN NILAI KELUAR dari fungsi, sehingga nilainya bisa disimpan,
  dijumlahkan, atau diproses oleh fungsi lain!

--------------------------------------------------------------------------
TUGAS KAMU (ADA 2 FUNGSI):

1. Buat fungsi 'konversi_mb_ke_kb(mb)':
   - Menerima 1 parameter 'mb' (angka kuota dalam Megabyte).
   - Mengembalikan (return) nilai dalam Kilobyte (dikali 1024).
   - Contoh: konversi_mb_ke_kb(50) mengembalikan angka 51200.

2. Buat fungsi 'hitung_total_kb(kuota_list_mb)':
   - Menerima 1 parameter 'kuota_list_mb' (sebuah list berisi angka-angka MB).
     Contoh input: [10, 20, 30] (total 60 MB).
   - Menghitung total semua MB di list tersebut.
   - Mengonversi total tersebut ke KB menggunakan fungsi 'konversi_mb_ke_kb'.
   - Mengembalikan (return) total kuota dalam KB!
--------------------------------------------------------------------------
"""

# TODO 1: Buat fungsi konversi_mb_ke_kb(mb) di bawah ini:




# TODO 2: Buat fungsi hitung_total_kb(kuota_list_mb) di bawah ini:




# ========================================================================
# KODE UJI COBA MANDIRI:
# ========================================================================
if __name__ == "__main__":
    try:
        kb = konversi_mb_ke_kb(50)
        print("50 MB =", kb, "KB")

        daftar_paket = [10, 20, 30]
        total_kb = hitung_total_kb(daftar_paket)
        print("Total paket [10, 20, 30] MB dalam KB =", total_kb)
    except NameError as e:
        print("[BELUM SELESAI] Error:", e)
