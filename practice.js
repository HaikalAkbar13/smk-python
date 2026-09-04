/**
 * SMK Negeri 1 Bantaeng - Python Quest: Hands-on Practice Engine
 * Skulpt-based In-Browser Python IDE with Automated Test Runner & Dual Code Mode
 */

// ==========================================
// 1. DATA KURIKULUM: 9 MISI TENTANG TJKT & IT
// ==========================================
const MISSIONS = [
  {
    id: 1,
    category: "Dasar Output",
    badge: "Misi 1 • Dasar",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Broadcast Pesan Selamat Datang Lab Komputer",
    concept: "Fungsi <code>print()</code>",
    desc: "Sebagai admin baru di Lab Komputer SMK Negeri 1 Bantaeng, tugas pertamamu adalah menyalakan layar terminal dan menyiarkan pesan sambutan selamat datang kepada seluruh siswa.",
    objective: "Gunakan fungsi <code>print()</code> untuk mencetak minimal 3 baris tulisan: Nama Laboratorium, Salam Pembuka, dan Motto SMK.",
    specifications: [
      "Wajib memuat kata 'Lab' atau 'SMK' di baris pertama.",
      "Gunakan tanda kutip dua <code>\"...\"</code> atau satu <code>'...'</code> untuk membungkus teks.",
      "Cetak minimal 3 baris terpisah dengan <code>print()</code>."
    ],
    hint: "Ketik <code>print(\"Teks yang ingin kamu cetak\")</code>. Jangan lupa tanda kurung buka dan tutup!",
    starterTemplate: `# Misi 1: Broadcast Pesan Selamat Datang Lab Komputer
# Ganti dan lengkapi teks di dalam tanda kutip berikut:

print("=== SELAMAT DATANG DI LAB TJKT SMK NEGERI 1 BANTAENG ===")
print("Status Sistem: Semua komputer client siap digunakan!")
print("Motto: SMK Bisa, SMK Hebat, Siap Kerja Santun Mandiri Kreatif! 🚀")
`,
    blankTemplate: `# Misi 1: Ketik kodinganmu sendiri dari awal!
# Tulis minimal 3 baris fungsi print() di bawah ini:


`,
    testValidator: (output, code) => {
      const lines = output.trim().split("\n").filter(l => l.trim().length > 0);
      const hasPrint = code.includes("print(");
      const hasSMK = /smk|bantaeng|lab|tjkt/i.test(output);
      
      const tests = [
        { desc: "Menggunakan perintah print()", pass: hasPrint },
        { desc: "Mencetak minimal 3 baris teks terpisah", pass: lines.length >= 3 },
        { desc: "Memuat identitas SMK / Lab Komputer", pass: hasSMK }
      ];
      return tests;
    }
  },
  {
    id: 2,
    category: "Variabel & Tipe Data",
    badge: "Misi 2 • Variabel",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    title: "Konfigurasi Identitas Server & Port Router",
    concept: "Variabel (String & Integer)",
    desc: "Di jaringan komputer, kita menyimpan pengaturan server ke dalam variabel agar mudah dikelola dan tidak perlu diketik ulang berkali-kali.",
    objective: "Buatlah 3 variabel: <code>hostname</code> (String), <code>ip_server</code> (String), dan <code>port_ssh</code> (Integer angka murni tanpa kutip), lalu cetak semuanya ke layar.",
    specifications: [
      "Variabel <code>hostname</code> berisi nama server (contoh: <code>\"MikroTik-SMK\"</code>).",
      "Variabel <code>ip_server</code> berisi alamat IP (contoh: <code>\"192.168.1.1\"</code>).",
      "Variabel <code>port_ssh</code> berisi angka murni <code>22</code> (tanpa tanda kutip).",
      "Cetak ketiga variabel tersebut ke layar menggunakan <code>print()</code>."
    ],
    hint: "Contoh deklarasi variabel: <code>nama_server = \"Server-1\"</code> dan angka murni: <code>port = 22</code>.",
    starterTemplate: `# Misi 2: Menyimpan Identitas Server ke Variabel
# Isi dan lengkapi nilai variabel berikut:

hostname = "MikroTik-SMK-Bantaeng"
ip_server = "192.168.1.1"
port_ssh = 22

print("--- PROFIL ROUTER UTAMA ---")
print("Hostname : " + hostname)
print("Alamat IP: " + ip_server)
print("Port SSH : " + str(port_ssh))
`,
    blankTemplate: `# Misi 2: Ketik kodinganmu sendiri dari awal!
# Definisikan variabel hostname, ip_server, dan port_ssh, lalu cetak hasilnya:


`,
    testValidator: (output, code) => {
      const hasHostname = /hostname\s*=/i.test(code);
      const hasIp = /ip_server\s*=/i.test(code) || /ip\s*=/i.test(code);
      const hasPort = /port_ssh\s*=\s*\d+|port\s*=\s*\d+/i.test(code);
      const outputValid = /192\.168|\.1|22/i.test(output);

      return [
        { desc: "Mendefinisikan variabel nama host (hostname)", pass: hasHostname },
        { desc: "Mendefinisikan variabel alamat IP", pass: hasIp },
        { desc: "Mendefinisikan variabel port SSH dengan angka integer", pass: hasPort },
        { desc: "Output menampilkan data server di terminal", pass: outputValid }
      ];
    }
  },
  {
    id: 3,
    category: "Operasi Matematika",
    badge: "Misi 3 • Aritmatika",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    title: "Kalkulator Konversi Bandwidth & Kuota Lab",
    concept: "Operasi Matematika (Perkalian <code>*</code>)",
    desc: "Teknisi jaringan sering kali harus mengonversi satuan kuota internet dari Megabyte (MB) ke Kilobyte (KB). Diketahui rumus: <code>1 MB = 1024 KB</code>.",
    objective: "Buat variabel <code>kuota_mb = 50</code>. Hitung jumlah Kilobyte-nya dengan rumus <code>kuota_kb = kuota_mb * 1024</code>, lalu cetak hasilnya ke layar.",
    specifications: [
      "Gunakan operator perkalian bintang <code>*</code>.",
      "Hasil perhitungan wajib menunjukkan angka <code>51200</code> KB.",
      "Cetak kalimat yang informatif dengan <code>print()</code>."
    ],
    hint: "Rumus: <code>kuota_kb = kuota_mb * 1024</code>. Gunakan <code>print(\"Total:\", kuota_kb, \"KB\")</code>.",
    starterTemplate: `# Misi 3: Kalkulator Konversi Kuota MB ke KB

kuota_mb = 50

# Hitung kuota dalam satuan Kilobyte (KB) di bawah ini:
kuota_kb = kuota_mb * 1024

print("=== KALKULATOR BANDWIDTH LAB ===")
print("Kapasitas MB :", kuota_mb, "MB")
print("Kapasitas KB :", kuota_kb, "KB")
`,
    blankTemplate: `# Misi 3: Ketik kodinganmu sendiri dari awal!
# Hitung konversi kuota 50 MB ke KB (1 MB = 1024 KB):


`,
    testValidator: (output, code) => {
      const hasMath = code.includes("*") && code.includes("1024");
      const hasResult = output.includes("51200");

      return [
        { desc: "Menggunakan operator perkalian * dengan faktor 1024", pass: hasMath },
        { desc: "Menghasilkan nilai konversi yang tepat (51200 KB)", pass: hasResult }
      ];
    }
  },
  {
    id: 4,
    category: "Input Pengguna",
    badge: "Misi 4 • Interaktif",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    title: "Berita Acara Perbaikan LAN Interaktif",
    concept: "Fungsi <code>input()</code>",
    desc: "Ketika ada kabel LAN yang rusak di sekolah, teknisi mengisi formulir digital secara interaktif dengan mengetikkan nama teknisi dan nomor lab di terminal.",
    objective: "Gunakan <code>input()</code> untuk menanyakan Nama Teknisi dan Nomor Ruangan Lab, lalu cetak format Berita Acara yang rapi.",
    specifications: [
      "Gunakan minimal 2 fungsi <code>input()</code> untuk menangkap data dari keyboard.",
      "Cetak format laporan yang mencantumkan kedua data yang diketikkan."
    ],
    hint: "Contoh: <code>nama = input(\"Nama teknisi: \")</code>.",
    simInputs: ["Ahmad Al-Fatih", "Lab TJKT 1"],
    starterTemplate: `# Misi 4: Formulir Digital Interaktif Teknisi Jaringan

nama_teknisi = input("Masukkan Nama Teknisi: ")
lokasi_lab = input("Masukkan Lokasi Lab (contoh: Lab TJKT 1): ")

print("")
print("==========================================")
print("       BERITA ACARA PERBAIKAN JARINGAN    ")
print("==========================================")
print("Petugas Pelaksana : " + nama_teknisi)
print("Lokasi Gangguan   : " + lokasi_lab)
print("Status Pekerjaan  : SELESAI & NORMAL ✔")
print("==========================================")
`,
    blankTemplate: `# Misi 4: Ketik kodinganmu sendiri dari awal!
# Minta input nama dan lokasi lab, lalu cetak Berita Acara:


`,
    testValidator: (output, code) => {
      const hasInput = (code.match(/input\s*\(/g) || []).length >= 2;
      const hasOutputFormat = output.length > 20;

      return [
        { desc: "Menggunakan minimal 2 perintah input()", pass: hasInput },
        { desc: "Mencetak laporan hasil pengisian formulir", pass: hasOutputFormat }
      ];
    }
  },
  {
    id: 5,
    category: "Koleksi Data",
    badge: "Misi 5 • List",
    badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    title: "Manajemen Whitelist IP Gateway MikroTik",
    concept: "List / Array & <code>.append()</code>",
    desc: "Daripada membuat puluhan variabel terpisah, kita menyimpan daftar alamat IP perangkat sekolah yang diizinkan ke dalam satu struktur data List <code>[...]</code>.",
    objective: "Buat list <code>daftar_ip</code> yang awalnya berisi 2 IP (<code>\"192.168.1.1\"</code> dan <code>\"192.168.1.2\"</code>). Tambahkan IP ketiga menggunakan metode <code>.append(\"192.168.1.3\")</code>, lalu cetak IP pertama menggunakan indeks <code>[0]</code> serta jumlah total isi list menggunakan <code>len()</code>.",
    specifications: [
      "Buat list dengan kurung siku <code>[...]</code>.",
      "Gunakan fungsi <code>.append()</code> untuk menambah elemen baru.",
      "Cetak elemen pertama dengan indeks <code>daftar_ip[0]</code>.",
      "Cetak total data menggunakan fungsi bawaan <code>len(daftar_ip)</code>."
    ],
    hint: "Indeks pertama komputer selalu [0]! Gunakan <code>daftar_ip.append(\"192.168.1.3\")</code>.",
    starterTemplate: `# Misi 5: Mengelola Koleksi Alamat IP dengan List

daftar_ip = ["192.168.1.1", "192.168.1.2"]

# Tambahkan IP ketiga ke dalam list:
daftar_ip.append("192.168.1.3")

print("=== WHITELIST FIREWALL ROUTER ===")
print("Gateway Utama [Index 0]:", daftar_ip[0])
print("Total IP Terdaftar    :", len(daftar_ip), "Perangkat")
print("Semua IP Tersimpan    :", daftar_ip)
`,
    blankTemplate: `# Misi 5: Ketik kodinganmu sendiri dari awal!
# Buat list IP, tambahkan data dengan append(), lalu cetak index 0 dan len():


`,
    testValidator: (output, code) => {
      const hasList = code.includes("[") && code.includes("]");
      const hasAppend = code.includes(".append(");
      const hasIndex = code.includes("[0]");
      const hasLen = code.includes("len(");
      const hasCorrectOutput = output.includes("192.168.1.1") && (output.includes("3") || output.includes("192.168.1.3"));

      return [
        { desc: "Membuat List dengan kurung siku [...]", pass: hasList },
        { desc: "Menambahkan data dengan .append()", pass: hasAppend },
        { desc: "Mengakses elemen pertama dengan indeks [0]", pass: hasIndex },
        { desc: "Menghitung jumlah data dengan len()", pass: hasLen },
        { desc: "Data berhasil dicetak di terminal", pass: hasCorrectOutput }
      ];
    }
  },
  {
    id: 6,
    category: "Percabangan",
    badge: "Misi 6 • Logika",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    title: "Gerbang Firewall Pemeriksa Port Server",
    concept: "Logika <code>if - else</code>",
    desc: "Firewall bertugas memeriksa paket data yang lewat. Jika port yang diminta adalah port web yang aman (contoh: port 80 atau 443), izinkan akses. Jika port lain, tolak!",
    objective: "Tentukan variabel <code>port = 80</code>. Gunakan <code>if port == 80:</code> untuk mencetak <code>\"AKSES DIIZINKAN (Port HTTP Aktif) 🟢\"</code>, dan <code>else:</code> untuk mencetak <code>\"AKSES DITOLAK FIREWALL 🔴\"</code>.",
    specifications: [
      "Gunakan operator perbandingan sama dengan ganda <code>==</code>.",
      "Gunakan indentasi (spasi menjorok ke dalam) di bawah baris <code>if</code> dan <code>else</code>.",
      "Pastikan blok logika mencetak pesan sesuai kondisi port."
    ],
    hint: "Ingat tanda titik dua <code>:</code> di akhir baris `if` dan `else`, serta spasi menjorok pada perintah print di dalamnya!",
    starterTemplate: `# Misi 6: Gerbang Logika Firewall (if-else)

port = 80

print("Memeriksa izin lalu lintas data...")

# Lengkapi struktur percabangan di bawah:
if port == 80:
    print("AKSES DIIZINKAN (Port HTTP 80 Terbuka) 🟢")
else:
    print("AKSES DITOLAK OLEH FIREWALL 🔴")
`,
    blankTemplate: `# Misi 6: Ketik kodinganmu sendiri dari awal!
# Buat variabel port, periksa dengan if-else, dan cetak statusnya:


`,
    testValidator: (output, code) => {
      const hasIf = code.includes("if ") && code.includes("==");
      const hasElse = code.includes("else:");
      const outputCorrect = /diizinkan|terbuka|aktif|80/i.test(output);

      return [
        { desc: "Menggunakan percabangan if dengan operator ==", pass: hasIf },
        { desc: "Menggunakan blok alternatif else:", pass: hasElse },
        { desc: "Hasil pemeriksaan port berhasil dicetak", pass: outputCorrect }
      ];
    }
  },
  {
    id: 7,
    category: "Percabangan Lanjut",
    badge: "Misi 7 • Multi-Logika",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    title: "Klasifikasi Status Kecepatan Koneksi Jaringan",
    concept: "Percabangan <code>if - elif - else</code>",
    desc: "Sebagai teknisi, kamu memantau latency ping router. Kecepatan diklasifikasikan ke dalam 3 level: Bagus (< 20ms), Sedang (< 60ms), atau Gangguan (di atas 60ms).",
    objective: "Tentukan variabel <code>ping_ms = 15</code>. Buat struktur <code>if ping_ms < 20:</code> cetak 'Koneksi Sangat Cepat 🚀', <code>elif ping_ms < 60:</code> cetak 'Koneksi Stabil ⚡', dan <code>else:</code> cetak 'Koneksi Lambat / RTO ⚠️'.",
    specifications: [
      "Gunakan kata kunci <code>elif</code> untuk kondisi perantara.",
      "Gunakan operator lebih kecil <code><</code>.",
      "Cetak diagnosa kondisi yang akurat sesuai nilai ping."
    ],
    hint: "Urutannya: <code>if ... :</code> lalu <code>elif ... :</code> lalu <code>else:</code>.",
    starterTemplate: `# Misi 7: Klasifikasi Status Koneksi (if - elif - else)

ping_ms = 15

print("Mengukur latency router gateway...")

if ping_ms < 20:
    print("STATUS: Koneksi Sangat Cepat (Latency Sangat Baik) 🚀")
elif ping_ms < 60:
    print("STATUS: Koneksi Normal & Stabil ⚡")
else:
    print("STATUS: Peringatan! Koneksi Lambat / RTO ⚠️")
`,
    blankTemplate: `# Misi 7: Ketik kodinganmu sendiri dari awal!
# Gunakan if - elif - else untuk mengklasifikasikan nilai ping_ms:


`,
    testValidator: (output, code) => {
      const hasIf = code.includes("if ");
      const hasElif = code.includes("elif ");
      const hasElse = code.includes("else:");
      const outputCorrect = /cepat|stabil|latency|baik/i.test(output);

      return [
        { desc: "Menggunakan pernyataan kondisi if", pass: hasIf },
        { desc: "Menggunakan percabangan perantara elif", pass: hasElif },
        { desc: "Menggunakan penanganan akhir else", pass: hasElse },
        { desc: "Diagnosa kecepatan tercetak dengan benar", pass: outputCorrect }
      ];
    }
  },
  {
    id: 8,
    category: "Perulangan & Otomasi",
    badge: "Misi 8 • Loop",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    title: "Otomasi Patroli Auto-Ping 10 Client Lab",
    concept: "Perulangan <code>for</code> & <code>range()</code>",
    desc: "Daripada teknisi mengetik perintah ping satu-satu secara manual sebanyak 10 kali, gunakan kekuatan perulangan Python untuk melakukannya secara instan!",
    objective: "Gunakan <code>for i in range(1, 11):</code> untuk melakukan perulangan dari 1 sampai 10, lalu cetak teks: <code>\"Pinging 192.168.1.[i] ... ONLINE ✔\"</code>.",
    specifications: [
      "Gunakan sintaks <code>for variabel in range(1, 11):</code>.",
      "Harus mencetak tepat 10 baris pengulangan.",
      "Gunakan variabel putaran <code>i</code> di dalam pesan yang dicetak."
    ],
    hint: "Ingat fungsi <code>range(1, 11)</code> akan menghasilkan angka 1 sampai 10 (angka stop 11 tidak diikutsertakan).",
    starterTemplate: `# Misi 8: Otomasi Patroli Auto-Ping dengan Perulangan for

print("=== MEMULAI PATROLI OTOMATIS SUBNET LAB ===")

# Jalankan loop dari 1 hingga 10:
for i in range(1, 11):
    print("Pinging IP 192.168.1." + str(i) + " ... ONLINE ✔")

print("Patroli selesai! Semua 10 komputer terpantau aktif.")
`,
    blankTemplate: `# Misi 8: Ketik kodinganmu sendiri dari awal!
# Buat for loop dengan range(1, 11) untuk ping 10 client:


`,
    testValidator: (output, code) => {
      const hasFor = code.includes("for ") && code.includes("in range(");
      const pingCount = (output.match(/ping/gi) || []).length;
      const hasTen = pingCount >= 10 || output.includes("10");

      return [
        { desc: "Menggunakan struktur perulangan for ... in range()", pass: hasFor },
        { desc: "Melakukan perulangan otomatis sebanyak 10 kali", pass: hasTen }
      ];
    }
  },
  {
    id: 9,
    category: "Proyek Akhir",
    badge: "Misi 9 • GRAND CAPSTONE",
    badgeColor: "bg-gradient-to-r from-yellow-500 via-amber-400 to-cyan-400 text-slate-950 font-black border-yellow-400",
    title: "SMK Cyber Sentinel: CLI Network & Security Manager",
    concept: "Integrasi Semua Konsep (Full Capstone)",
    desc: "Selamat datang di ujian puncak petualangan! Di proyek ini, kamu akan membangun aplikasi mini Command Line Interface (CLI) nyata yang menggabungkan seluruh konsep: menu antarmuka, input pilihan, percabangan logika, dan manipulasi data list perangkat.",
    objective: "Rancang program CLI dengan menu pilihan:\n1. Tampilkan Menu Pilihan (1: Cek Server, 2: Tambah Perangkat ke Whitelist, 3: Keluar).\n2. Terima input pilihan dari teknisi menggunakan <code>input()</code>.\n3. Periksa input dengan <code>if-elif-else</code> dan berikan respons yang sesuai.\n4. Jalankan aksi manipulasi data list perangkat.",
    specifications: [
      "Menampilkan banner aplikasi 'SMK CYBER SENTINEL'.",
      "Memiliki daftar list perangkat awal (misal <code>perangkat = [\"Router-1\", \"Switch-Core\"]</code>).",
      "Menerima input pilihan menu (1, 2, atau 3).",
      "Menggunakan logika <code>if / elif / else</code> untuk menangani tiap opsi menu.",
      "Mencetak umpan balik status aksi yang jelas ke layar."
    ],
    hint: "Ini adalah proyek mandirimu! Kamu bisa bebas menambahkan emoji keren dan fitur keamanan versimu sendiri.",
    simInputs: ["1", "Switch-Baru", "3"],
    starterTemplate: `# Misi 9 (GRAND CAPSTONE): SMK Cyber Sentinel CLI Manager
# Program integrasi lengkap seluruh konsep Python 101

perangkat_lab = ["Router-Mikrotik", "Switch-Cisco-Core"]

print("==========================================")
print("     🛡️ SMK CYBER SENTINEL MANAGER 🛡️     ")
print("==========================================")
print("1. Cek Status Perangkat Terhubung")
print("2. Daftarkan Perangkat Baru")
print("3. Keluar dari Sistem")
print("------------------------------------------")

pilihan = input("Pilih menu (1/2/3): ")

if pilihan == "1":
    print("\n[STATUS KONEKSI]")
    for item in perangkat_lab:
        print("✔ " + item + " -> AKTIF & AMAN")
elif pilihan == "2":
    baru = input("Ketik nama perangkat baru: ")
    perangkat_lab.append(baru)
    print("\n✔ Sukses! " + baru + " berhasil ditambahkan ke whitelist.")
    print("Daftar terbaru:", perangkat_lab)
elif pilihan == "3":
    print("\nKeluar dari sistem. Terima kasih, Admin!")
else:
    print("\nPeringatan: Pilihan tidak valid!")
`,
    blankTemplate: `# Misi 9 (GRAND CAPSTONE): Bangun SMK Cyber Sentinel dari awal!
# Rancang aplikasi CLI interaktif lengkap dengan menu, input, if-elif-else, dan list:


`,
    testValidator: (output, code) => {
      const hasPrint = code.includes("print(");
      const hasInput = code.includes("input(");
      const hasBranch = code.includes("if ") && (code.includes("elif ") || code.includes("else:"));
      const hasList = code.includes("[") && code.includes("]");
      const isExecuted = output.length > 30;

      return [
        { desc: "Memiliki antarmuka menu teks (print)", pass: hasPrint },
        { desc: "Menerima input pilihan pengguna (input)", pass: hasInput },
        { desc: "Menerapkan percabangan logika menu (if-elif-else)", pass: hasBranch },
        { desc: "Mengelola koleksi data perangkat (list)", pass: hasList },
        { desc: "Program CLI berhasil dijalankan dan merespons interaksi", pass: isExecuted }
      ];
    }
  }
];

// ==========================================
// 2. STATE APLIKASI
// ==========================================
let currentMissionIndex = 0;
let currentCodeMode = "blank"; // 'blank' (default) atau 'template'
let isRunning = false;
let terminalInputResolver = null;
let completedMissions = new Set();
let isSoundEnabled = true;

// Custom Code Cache per Mission & Mode so user doesn't lose code
const codeStorage = {};

// ==========================================
// 3. SOUND SYNTHESIZER (WEB AUDIO API)
// ==========================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playSound(type) {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === "run") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "testPass") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "levelUp") {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.08, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.005, now + (idx + 1) * 0.07);
        osc.start(now + idx * 0.07);
        osc.stop(now + (idx + 1) * 0.07);
      });
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(140, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch (err) {
    console.warn("Sound error:", err);
  }
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  const btn = document.getElementById("btn-sound-toggle");
  if (btn) {
    btn.innerHTML = isSoundEnabled
      ? `<i data-lucide="volume-2" class="w-4 h-4 text-cyan-400"></i>`
      : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i>`;
    if (window.lucide) lucide.createIcons();
  }
  if (isSoundEnabled) playSound("click");
}

// ==========================================
// 4. INISIALISASI & PERSISTENSI PROGRESS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadProgressFromStorage();
  renderMissionSidebar();
  loadMission(0);
  setupTerminalInputListener();
  if (window.lucide) lucide.createIcons();
});

function loadProgressFromStorage() {
  try {
    const saved = localStorage.getItem("smk_python_quest_progress");
    if (saved) {
      const arr = JSON.parse(saved);
      completedMissions = new Set(arr);
    }
  } catch (e) {
    console.warn("Storage load error:", e);
  }
}

function saveProgressToStorage() {
  try {
    localStorage.setItem("smk_python_quest_progress", JSON.stringify([...completedMissions]));
    updateUserRankCard();
  } catch (e) {
    console.warn("Storage save error:", e);
  }
}

function updateUserRankCard() {
  const count = completedMissions.size;
  const total = MISSIONS.length;
  const xp = count * 100 + (completedMissions.has(9) ? 150 : 0);

  let rankName = "Level 1: Novice Cadet 🐣";
  let rankColor = "text-slate-300";
  if (count >= 3 && count < 6) {
    rankName = "Level 2: Junior IT Admin 💻";
    rankColor = "text-cyan-400";
  } else if (count >= 6 && count < 9) {
    rankName = "Level 3: Network Security Specialist 🛡️";
    rankColor = "text-emerald-400";
  } else if (count === 9) {
    rankName = "Level 4: CYBER SENTINEL MASTER 👑";
    rankColor = "text-yellow-400 font-extrabold";
  }

  const xpEl = document.getElementById("user-xp-display");
  const rankEl = document.getElementById("user-rank-display");
  const progBar = document.getElementById("overall-progress-bar");
  const countEl = document.getElementById("completed-count-display");

  if (xpEl) xpEl.textContent = `${xp} XP`;
  if (rankEl) {
    rankEl.textContent = rankName;
    rankEl.className = `text-xs font-semibold ${rankColor}`;
  }
  if (progBar) progBar.style.width = `${(count / total) * 100}%`;
  if (countEl) countEl.textContent = `${count} / ${total} Misi Selesai`;
}

// ==========================================
// 5. SIDEBAR MISI & SWITCHER
// ==========================================
function renderMissionSidebar() {
  const container = document.getElementById("missions-list-container");
  if (!container) return;

  container.innerHTML = MISSIONS.map((m, idx) => {
    const isCompleted = completedMissions.has(m.id);
    const isActive = idx === currentMissionIndex;
    const isCapstone = m.id === 9;

    return `
      <button onclick="loadMission(${idx})" id="nav-mission-btn-${idx}"
        class="w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group ${
          isActive 
            ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.2)]' 
            : isCompleted
            ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
            : isCapstone
            ? 'bg-yellow-500/10 border-yellow-500/40 hover:bg-yellow-500/20'
            : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
        }">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
            isCompleted 
              ? 'bg-emerald-500 text-slate-950 font-black'
              : isActive
              ? 'bg-cyan-400 text-slate-950 shadow-md'
              : isCapstone
              ? 'bg-yellow-400 text-slate-950 font-black'
              : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
          }">
            ${isCompleted ? '✔' : idx + 1}
          </div>
          <div class="truncate">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-mono uppercase tracking-wider ${
                isCompleted ? 'text-emerald-400 font-bold' : isCapstone ? 'text-yellow-400 font-bold' : 'text-slate-400'
              }">
                ${m.category}
              </span>
            </div>
            <div class="text-xs font-semibold ${isActive ? 'text-cyan-300' : 'text-slate-200'} truncate">
              ${m.title}
            </div>
          </div>
        </div>
        <i data-lucide="${isCompleted ? 'check-circle-2' : isActive ? 'chevron-right' : 'circle'}" 
          class="w-4 h-4 shrink-0 ${
            isCompleted ? 'text-emerald-400' : isActive ? 'text-cyan-400' : 'text-slate-600'
          }"></i>
      </button>
    `;
  }).join("");

  updateUserRankCard();
  if (window.lucide) lucide.createIcons();
}

function loadMission(index) {
  playSound("click");
  saveCurrentEditorCode();

  currentMissionIndex = index;
  const m = MISSIONS[index];

  renderMissionSidebar();

  // Header Info
  const badgeEl = document.getElementById("active-mission-badge");
  const titleEl = document.getElementById("active-mission-title");
  const conceptEl = document.getElementById("active-mission-concept");
  const descEl = document.getElementById("active-mission-desc");
  const objectiveEl = document.getElementById("active-mission-objective");
  const specsContainer = document.getElementById("active-mission-specs");
  const hintEl = document.getElementById("active-mission-hint");

  if (badgeEl) {
    badgeEl.className = `px-2.5 py-1 rounded-full text-xs font-bold border ${m.badgeColor}`;
    badgeEl.textContent = m.badge;
  }
  if (titleEl) titleEl.textContent = m.title;
  if (conceptEl) conceptEl.innerHTML = `Fokus Materi: ${m.concept}`;
  if (descEl) descEl.innerHTML = m.desc;
  if (objectiveEl) objectiveEl.innerHTML = m.objective;
  if (hintEl) hintEl.innerHTML = m.hint;

  if (specsContainer) {
    specsContainer.innerHTML = m.specifications.map(s => `
      <li class="flex items-start gap-2 text-xs text-slate-300">
        <span class="text-cyan-400 mt-0.5">•</span>
        <span>${s}</span>
      </li>
    `).join("");
  }

  // Load Code into Editor (Check if custom code exists, else load template)
  loadCodeForCurrentMode();

  // Reset Test Output Tab to clean state
  clearTerminal();
  renderEmptyTestReport();
  switchRightTab("terminal");
}

// ==========================================
// 6. DUAL CODE MODE (TEMPLATE vs DARI NOL)
// ==========================================
function setCodeMode(mode) {
  if (currentCodeMode === mode) return;
  playSound("click");
  saveCurrentEditorCode();

  currentCodeMode = mode;

  // Update Pills UI
  const btnTpl = document.getElementById("btn-mode-template");
  const btnBlk = document.getElementById("btn-mode-blank");
  if (btnTpl && btnBlk) {
    if (mode === "template") {
      btnTpl.classList.add("active");
      btnBlk.classList.remove("active");
    } else {
      btnBlk.classList.add("active");
      btnTpl.classList.remove("active");
    }
  }

  loadCodeForCurrentMode();
}

function saveCurrentEditorCode() {
  const editor = document.getElementById("code-editor");
  if (!editor) return;
  const key = `m_${currentMissionIndex}_${currentCodeMode}`;
  codeStorage[key] = editor.value;
}

function loadCodeForCurrentMode() {
  const m = MISSIONS[currentMissionIndex];
  const editor = document.getElementById("code-editor");
  if (!editor) return;

  const key = `m_${currentMissionIndex}_${currentCodeMode}`;
  if (codeStorage[key] !== undefined) {
    editor.value = codeStorage[key];
  } else {
    editor.value = currentCodeMode === "template" ? m.starterTemplate : m.blankTemplate;
  }

  updateLineNumbers();
}

function resetCurrentCode() {
  playSound("click");
  const m = MISSIONS[currentMissionIndex];
  const editor = document.getElementById("code-editor");
  if (!editor) return;

  const defaultCode = currentCodeMode === "template" ? m.starterTemplate : m.blankTemplate;
  editor.value = defaultCode;
  saveCurrentEditorCode();
  updateLineNumbers();

  clearTerminal();
  appendTerminalOutput("System: Editor telah di-reset ke template awal.\n", "system");
}

// ==========================================
// 7. LINE NUMBERS & EDITOR UTILITIES
// ==========================================
function updateLineNumbers() {
  const editor = document.getElementById("code-editor");
  const lineNumbers = document.getElementById("line-numbers");
  if (!editor || !lineNumbers) return;

  const lines = editor.value.split("\n").length;
  lineNumbers.innerHTML = Array.from({ length: Math.max(lines, 14) }, (_, i) => `<div>${i + 1}</div>`).join("");
}

function downloadCurrentCode() {
  playSound("click");
  const editor = document.getElementById("code-editor");
  if (!editor) return;

  const blob = new Blob([editor.value], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `smk_python_misi_${currentMissionIndex + 1}.py`;
  a.click();
}

// ==========================================
// 8. TERMINAL OUTPUT & INTERACTIVE INPUT
// ==========================================
function clearTerminal() {
  const terminal = document.getElementById("terminal-output");
  if (terminal) terminal.innerHTML = "";
  hideTerminalInput();
}

function appendTerminalOutput(text, type = "normal") {
  const terminal = document.getElementById("terminal-output");
  if (!terminal) return;

  const span = document.createElement("span");
  if (type === "system") {
    span.className = "text-slate-500 italic block mb-1 font-mono text-xs";
  } else if (type === "error") {
    span.className = "text-rose-400 font-mono block my-1 font-bold";
  } else if (type === "success") {
    span.className = "text-emerald-400 font-mono block my-1 font-bold";
  } else if (type === "input-echo") {
    span.className = "text-yellow-300 font-mono";
  } else {
    span.className = "text-slate-200 font-mono whitespace-pre-wrap";
  }

  span.textContent = text;
  terminal.appendChild(span);

  const container = document.getElementById("terminal-scroll-area");
  if (container) container.scrollTop = container.scrollHeight;
}

function showTerminalInput(promptText) {
  const promptLabel = document.getElementById("terminal-prompt-label");
  const inputContainer = document.getElementById("terminal-interactive-input");
  const inputField = document.getElementById("terminal-user-input");

  if (promptLabel) promptLabel.textContent = promptText || ">>";
  if (inputContainer) inputContainer.classList.remove("hidden");
  if (inputField) {
    inputField.value = "";
    inputField.focus();
  }
}

function hideTerminalInput() {
  const inputContainer = document.getElementById("terminal-interactive-input");
  if (inputContainer) inputContainer.classList.add("hidden");
}

function setupTerminalInputListener() {
  const inputField = document.getElementById("terminal-user-input");
  if (!inputField) return;

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = inputField.value;
      hideTerminalInput();
      appendTerminalOutput(val + "\n", "input-echo");
      if (terminalInputResolver) {
        const resolve = terminalInputResolver;
        terminalInputResolver = null;
        resolve(val);
      }
    }
  });
}

// ==========================================
// 9. PYTHON CODE RUNNER (SKULPT ENGINE)
// ==========================================
function runCodeOnly() {
  if (isRunning) return;
  playSound("run");
  switchRightTab("terminal");

  const editor = document.getElementById("code-editor");
  const code = editor.value;

  clearTerminal();
  appendTerminalOutput("▶ Menjalankan program Python...\n", "system");

  executePython(code, (output, error) => {
    if (error) {
      playSound("error");
      appendTerminalOutput("\n❌ Terjadi Kesalahan Eksekusi:\n" + error.toString() + "\n", "error");
      appendTerminalOutput("💡 Bantuan: Cek tanda kutip, kurung tutup, atau ejaan variabel.\n", "system");
    } else {
      playSound("click");
      appendTerminalOutput("\n✨ Program selesai dijalankan (Exit Code: 0).\n", "system");
    }
  });
}

// ==========================================
// 10. AUTOMATED TEST RUNNER
// ==========================================
function runTestSuite() {
  if (isRunning) return;
  playSound("run");
  switchRightTab("tests");

  const editor = document.getElementById("code-editor");
  const code = editor.value;
  const m = MISSIONS[currentMissionIndex];

  const reportContainer = document.getElementById("test-report-container");
  if (reportContainer) {
    reportContainer.innerHTML = `
      <div class="p-6 text-center text-slate-400">
        <i data-lucide="loader-2" class="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2"></i>
        <p class="text-xs font-mono">Menjalankan kodingan dan memvalidasi kriteria tes...</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  // Execute in isolated collector
  executePython(code, (output, error) => {
    if (error) {
      playSound("error");
      renderTestReport([
        { desc: "Kode dapat dieksekusi tanpa error syntax", pass: false }
      ], false, error.toString());
      return;
    }

    // Run custom test validator for current mission
    const testResults = m.testValidator(output, code);
    const allPassed = testResults.every(t => t.pass);

    if (allPassed) {
      playSound("testPass");
      completedMissions.add(m.id);
      saveProgressToStorage();
      renderMissionSidebar();

      // Check if Capstone completed
      if (m.id === 9) {
        setTimeout(() => triggerCapstoneVictoryModal(), 600);
      }
    } else {
      playSound("error");
    }

    renderTestReport(testResults, allPassed, null);
  }, { simulateInputs: m.simInputs ? [...m.simInputs] : ["1", "Ahmad", "Lab 1", "Router-Tambahan"] });
}

function renderTestReport(testResults, allPassed, errorMsg) {
  const container = document.getElementById("test-report-container");
  if (!container) return;

  const passedCount = testResults.filter(t => t.pass).length;
  const totalCount = testResults.length;

  container.innerHTML = `
    <div class="space-y-4 test-card">
      <!-- Summary Card -->
      <div class="p-4 rounded-2xl border ${
        allPassed 
          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200' 
          : 'bg-rose-500/15 border-rose-500/50 text-rose-200'
      } flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center ${
            allPassed ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-slate-950'
          }">
            <i data-lucide="${allPassed ? 'check-check' : 'alert-triangle'}" class="w-6 h-6"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold">${allPassed ? 'SEMUA TES LOLOS! 🎉' : 'BELUM SEMPURNA ⚠️'}</h4>
            <p class="text-xs opacity-80">${passedCount} dari ${totalCount} kriteria spesifikasi terpenuhi.</p>
          </div>
        </div>
        ${allPassed ? '<span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950">+100 XP</span>' : ''}
      </div>

      ${errorMsg ? `
        <div class="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-700/60 text-xs font-mono text-rose-300">
          <div class="font-bold mb-1 flex items-center gap-1.5"><i data-lucide="x-circle" class="w-3.5 h-3.5"></i> Pesan Kesalahan:</div>
          <div class="whitespace-pre-wrap">${errorMsg}</div>
        </div>
      ` : ''}

      <!-- Detailed Test Items -->
      <div class="space-y-2">
        <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Rincian Kriteria Keberhasilan:</div>
        ${testResults.map((t, idx) => `
          <div class="p-3 rounded-xl border flex items-center justify-between text-xs ${
            t.pass 
              ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200' 
              : 'bg-slate-900/80 border-rose-500/40 text-slate-400'
          }">
            <div class="flex items-center gap-2.5">
              <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                t.pass ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }">
                ${t.pass ? '✔' : '✖'}
              </span>
              <span>${t.desc}</span>
            </div>
            <span class="font-mono text-[11px] font-bold ${t.pass ? 'text-emerald-400' : 'text-rose-400'}">
              ${t.pass ? 'PASSED' : 'FAILED'}
            </span>
          </div>
        `).join("")}
      </div>

      ${allPassed && currentMissionIndex < MISSIONS.length - 1 ? `
        <div class="pt-2">
          <button onclick="loadMission(${currentMissionIndex + 1})" 
            class="btn-arcade w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <span>Lanjut ke Misi Berikutnya (${MISSIONS[currentMissionIndex + 1].title})</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      ` : ''}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function renderEmptyTestReport() {
  const container = document.getElementById("test-report-container");
  if (!container) return;
  container.innerHTML = `
    <div class="p-8 text-center text-slate-400 space-y-2">
      <div class="w-12 h-12 rounded-2xl bg-slate-800/80 text-cyan-400 flex items-center justify-center mx-auto mb-2">
        <i data-lucide="check-square" class="w-6 h-6"></i>
      </div>
      <h4 class="text-sm font-bold text-slate-200">Uji Solusi Mandirimu</h4>
      <p class="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
        Klik tombol <b>"Uji Tantangan (Run Tests)"</b> di atas untuk memeriksa apakah kodinganmu sudah memenuhi seluruh spesifikasi tugas secara otomatis!
      </p>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 11. INTERNAL SKULPT WRAPPER
// ==========================================
function executePython(code, callback, options = {}) {
  isRunning = true;
  const runBtn = document.getElementById("btn-run-code");
  const testBtn = document.getElementById("btn-test-code");

  if (runBtn) runBtn.disabled = true;
  if (testBtn) testBtn.disabled = true;

  let capturedOutput = "";
  let simInputs = options.simulateInputs ? [...options.simulateInputs] : [];

  Sk.configure({
    output: function(text) {
      capturedOutput += text;
      appendTerminalOutput(text);
    },
    read: function(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw "File not found: '" + x + "'";
      }
      return Sk.builtinFiles["files"][x];
    },
    inputfun: function(prompt) {
      return new Promise((resolve) => {
        appendTerminalOutput(prompt);
        if (simInputs.length > 0) {
          const autoVal = simInputs.shift();
          appendTerminalOutput(autoVal + " (Auto-Input)\n", "input-echo");
          resolve(autoVal);
        } else {
          terminalInputResolver = resolve;
          showTerminalInput(prompt);
        }
      });
    },
    inputfunTakesPrompt: true,
    __future__: Sk.python3
  });

  const myPromise = Sk.misceval.asyncToPromise(() => {
    return Sk.importMainWithBody("<stdin>", false, code, true);
  });

  myPromise.then(
    function(mod) {
      isRunning = false;
      if (runBtn) runBtn.disabled = false;
      if (testBtn) testBtn.disabled = false;
      callback(capturedOutput, null);
    },
    function(err) {
      isRunning = false;
      if (runBtn) runBtn.disabled = false;
      if (testBtn) testBtn.disabled = false;
      callback(capturedOutput, err);
    }
  );
}

// ==========================================
// 12. TAB SWITCHER (TERMINAL vs TESTS vs HINTS)
// ==========================================
function switchRightTab(tab) {
  playSound("click");
  const tabTerminal = document.getElementById("tab-pane-terminal");
  const tabTests = document.getElementById("tab-pane-tests");
  const tabHints = document.getElementById("tab-pane-hints");

  const btnTerminal = document.getElementById("btn-tab-terminal");
  const btnTests = document.getElementById("btn-tab-tests");
  const btnHints = document.getElementById("btn-tab-hints");

  const tabs = [
    { name: "terminal", pane: tabTerminal, btn: btnTerminal },
    { name: "tests", pane: tabTests, btn: btnTests },
    { name: "hints", pane: tabHints, btn: btnHints }
  ];

  tabs.forEach(t => {
    if (t.name === tab) {
      if (t.pane) t.pane.classList.remove("hidden");
      if (t.btn) {
        t.btn.className = "px-3.5 py-2 text-xs font-bold border-b-2 border-cyan-400 text-cyan-300 flex items-center gap-1.5 transition-all";
      }
    } else {
      if (t.pane) t.pane.classList.add("hidden");
      if (t.btn) {
        t.btn.className = "px-3.5 py-2 text-xs font-semibold border-b-2 border-transparent text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-all";
      }
    }
  });

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 13. CHEAT SHEET DRAWER
// ==========================================
function toggleCheatsheetDrawer() {
  playSound("click");
  const drawer = document.getElementById("cheatsheet-drawer");
  if (!drawer) return;
  drawer.classList.toggle("open");
  drawer.classList.toggle("closed");
}

function copySnippetToClipboard(text) {
  playSound("click");
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast-notification");
    if (toast) {
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 1800);
    }
  });
}

// ==========================================
// 14. GRAND CAPSTONE VICTORY MODAL
// ==========================================
function triggerCapstoneVictoryModal() {
  playSound("levelUp");
  const modal = document.getElementById("capstone-victory-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeCapstoneVictoryModal() {
  playSound("click");
  const modal = document.getElementById("capstone-victory-modal");
  if (modal) modal.classList.add("hidden");
}
