"""
==========================================================================
MISI 5: GUARD CLAUSES & VALIDASI DALAM FUNGSI
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

KONSEP:
Fungsi profesional selalu memvalidasi input sebelum memprosesnya.
Di dunia jaringan komputer, nomor port jaringan hanya valid dari angka 1 sampai 65535.
Jika ada yang memasukkan port negatif (-80), nol (0), angka di atas 65535,
atau teks (bukan angka), program harus langsung menolaknya (Guard Clause).

--------------------------------------------------------------------------
TUGAS KAMU:
Buatlah sebuah fungsi bernama 'validasi_port' yang:
1. Menerima 1 parameter 'port'.
2. Memeriksa tipe data:
   Jika 'port' BUKAN integer (contohnya string "80"), kembalikan False.
   (TIPS: gunakan 'if not isinstance(port, int): return False')
3. Memeriksa jangkauan angka:
   Jika 'port' berada di antara 1 sampai 65535 (inklusif 1 <= port <= 65535),
   kembalikan True (bertipe boolean True, bukan string "True").
4. Selain itu, kembalikan False (boolean False).

Contoh:
validasi_port(80)     -> True
validasi_port(443)    -> True
validasi_port(0)      -> False
validasi_port(70000)  -> False
validasi_port("80")   -> False
--------------------------------------------------------------------------
"""

# TODO: Tulis fungsi validasi_port kamu di bawah baris ini:




# ========================================================================
# KODE UJI COBA MANDIRI:
# ========================================================================
if __name__ == "__main__":
    try:
        print("Port 80    ->", validasi_port(80))      # Harusnya True
        print("Port 443   ->", validasi_port(443))     # Harusnya True
        print("Port 0     ->", validasi_port(0))       # Harusnya False
        print("Port 70000 ->", validasi_port(70000))   # Harusnya False
        print("Port '80'  ->", validasi_port("80"))    # Harusnya False
    except NameError:
        print("[BELUM SELESAI] Fungsi validasi_port() belum dibuat!")
