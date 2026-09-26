"""
==========================================================================
MISI 6: MEMPROSES & MEMFILTER LIST DENGAN FUNGSI
SMK Negeri 1 Bantaeng - Teknik Jaringan Komputer & Telekomunikasi (TJKT)
==========================================================================

KONSEP:
Fungsi sangat ampuh ketika dikombinasikan dengan struktur data seperti List
dan Dictionary. Kita bisa mengirimkan daftar ratusan perangkat ke dalam fungsi,
lalu fungsi akan menyaringnya dan mengembalikan list baru yang bersih.

Contoh Struktur Data:
daftar = [
    {"ip": "192.168.1.1", "status": "ONLINE"},
    {"ip": "192.168.1.2", "status": "OFFLINE"}
]

--------------------------------------------------------------------------
TUGAS KAMU:
Buatlah sebuah fungsi bernama 'filter_ip_aktif' yang:
1. Menerima 1 parameter 'daftar_perangkat' (sebuah list berisi dictionary).
   Setiap dictionary memiliki key 'ip' dan 'status'.
2. Memeriksa setiap perangkat:
   HANYA ambil alamat IP dari perangkat yang memiliki status "ONLINE".
3. Mengembalikan (return) sebuah list baru yang HANYA berisi string alamat IP
   yang berstatus "ONLINE".

Contoh:
input_data = [
    {"ip": "192.168.1.1", "status": "ONLINE"},
    {"ip": "192.168.1.2", "status": "OFFLINE"},
    {"ip": "192.168.1.3", "status": "ONLINE"}
]

filter_ip_aktif(input_data)
-> mengembalikan: ["192.168.1.1", "192.168.1.3"]

TIPS:
hasil = []
for p in daftar_perangkat:
    if p["status"] == "ONLINE":
        hasil.append(p["ip"])
return hasil
--------------------------------------------------------------------------
"""

# TODO: Tulis fungsi filter_ip_aktif kamu di bawah baris ini:




# ========================================================================
# KODE UJI COBA MANDIRI:
# ========================================================================
if __name__ == "__main__":
    contoh_data = [
        {"ip": "10.0.0.1", "status": "ONLINE"},
        {"ip": "10.0.0.2", "status": "OFFLINE"},
        {"ip": "10.0.0.3", "status": "ONLINE"},
    ]
    try:
        aktif = filter_ip_aktif(contoh_data)
        print("Perangkat yang aktif ->", aktif)
    except NameError:
        print("[BELUM SELESAI] Fungsi filter_ip_aktif() belum dibuat!")
