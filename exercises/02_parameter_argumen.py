"""
==========================================================================
MISI 2: PARAMETER & ARGUMEN DINAMIS
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

KONSEP:
Agar fungsi bisa bekerja dengan data yang berbeda-beda, kita menambahkan
'parameter' di dalam tanda kurung saat mendefinisikan fungsi.
Saat fungsi dipanggil, kita mengirimkan 'argumen' ke parameter tersebut.

Contoh:
def sapa_user(nama):
    return f"Halo, {nama}!"

pesan = sapa_user("Ahmad")  # "Ahmad" adalah argumen yang masuk ke parameter nama

--------------------------------------------------------------------------
TUGAS KAMU:
Buatlah sebuah fungsi bernama 'buat_banner' yang:
1. Menerima 2 parameter: 'hostname' dan 'ip' (urutan parameter sesuai ini).
2. Mengembalikan (return) string banner router dengan format:
   "[ROUTER] Hostname: <hostname> | IP: <ip>"

Contoh:
Jika dipanggil dengan: buat_banner("MikroTik-Lab1", "192.168.1.1")
Maka harus mengembalikan:
"[ROUTER] Hostname: MikroTik-Lab1 | IP: 192.168.1.1"

TIPS:
Gunakan f-string di Python:
return f"[ROUTER] Hostname: {hostname} | IP: {ip}"
--------------------------------------------------------------------------
"""

# TODO: Tulis fungsi buat_banner kamu di bawah baris ini:




# ========================================================================
# KODE UJI COBA MANDIRI:
# ========================================================================
if __name__ == "__main__":
    try:
        contoh = buat_banner("Gateway-SMK", "192.168.10.1")
        print("Hasil banner ->", contoh)
    except NameError:
        print("[BELUM SELESAI] Fungsi buat_banner() belum dibuat!")
