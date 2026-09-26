"""
==========================================================================
MISI 4: NILAI BAWAAN (DEFAULT PARAMETER)
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

KONSEP:
Seringkali sebuah fungsi memiliki parameter yang nilainya hampir selalu sama.
Daripada kita mengetiknya setiap kali fungsi dipanggil, kita bisa memberikan
'Default Value' (nilai bawaan).

Contoh:
def kirim_paket(ip, protocol="TCP"):
    return f"Mengirim data ke {ip} via {protocol}"

kirim_paket("192.168.1.1")          # protocol otomatis menjadi "TCP"
kirim_paket("192.168.1.1", "UDP")   # protocol diganti menjadi "UDP"

--------------------------------------------------------------------------
TUGAS KAMU:
Buatlah sebuah fungsi bernama 'koneksi_ssh' yang:
1. Menerima 3 parameter:
   - 'host' (wajib, tidak punya nilai default)
   - 'port' (opsional, nilai default = 22)
   - 'timeout' (opsional, nilai default = 10)
2. Mengembalikan (return) string URL koneksi dengan format:
   f"ssh://{host}:{port}?timeout={timeout}s"

Contoh:
koneksi_ssh("192.168.1.1")
-> mengembalikan: "ssh://192.168.1.1:22?timeout=10s"

koneksi_ssh("10.0.0.1", port=2222, timeout=30)
-> mengembalikan: "ssh://10.0.0.1:2222?timeout=30s"
--------------------------------------------------------------------------
"""

# TODO: Tulis fungsi koneksi_ssh kamu di bawah baris ini:




# ========================================================================
# KODE UJI COBA MANDIRI:
# ========================================================================
if __name__ == "__main__":
    try:
        url_default = koneksi_ssh("192.168.1.1")
        print("Default connection ->", url_default)

        url_custom = koneksi_ssh("10.0.0.5", port=8022, timeout=5)
        print("Custom connection  ->", url_custom)
    except NameError:
        print("[BELUM SELESAI] Fungsi koneksi_ssh() belum dibuat!")
