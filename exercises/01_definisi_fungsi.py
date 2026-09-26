"""
==========================================================================
MISI 1: DEFINISI & ANATOMI FUNGSI (def)
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

KONSEP:
Fungsi adalah blok kode terorganisir yang dapat digunakan kembali berkali-kali.
Untuk membuat fungsi di Python, kita menggunakan kata kunci 'def' diikuti nama
fungsi, tanda kurung (), dan tanda titik dua (:).

Sintaks Dasar:
def nama_fungsi():
    # Isi instruksi di dalam fungsi (wajib menjorok/indentasi)
    return "Nilai yang dikembalikan"

PENTING:
- 'return' digunakan untuk mengembalikan nilai hasil kerja fungsi ke pemanggilnya.
- 'print()' hanya menampilkan tulisan ke terminal, tetapi tidak mengembalikan nilai.

--------------------------------------------------------------------------
TUGAS KAMU:
Buatlah sebuah fungsi bernama 'sapa_lab' yang:
1. Tidak membutuhkan parameter apapun di dalam kurung ().
2. Mengembalikan (return) string persis seperti ini:
   "Selamat Datang di Lab TJKT SMK Negeri 1 Bantaeng!"
--------------------------------------------------------------------------
"""

# TODO: Tulis fungsi sapa_lab kamu di bawah baris ini:





# ========================================================================
# KODE UJI COBA MANDIRI (Jalankan file ini untuk melihat hasilmu):
# ========================================================================
if __name__ == "__main__":
    try:
        hasil = sapa_lab()
        print("Hasil fungsi sapa_lab() ->", hasil)
    except NameError:
        print("[BELUM SELESAI] Fungsi sapa_lab() belum kamu buat. Cek petunjuk di atas!")
