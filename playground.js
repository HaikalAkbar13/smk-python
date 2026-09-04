/**
 * Coding Playground Engine (Client-Side Python Runner)
 * SMK Negeri 1 Bantaeng - Python 101
 */

// Level & Mission Data
const PLAYGROUND_LEVELS = [
  {
    id: 1,
    badge: "Level 1 • Mudah",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Misi 1: Komputer Menyapa Dunia",
    desc: "Gunakan perintah <code class='text-cyan-400'>print()</code> untuk menyuruh komputer menampilkan teks ke layar.",
    objective: "Ubah tulisan di dalam tanda kutip menjadi sapaan untuk namamu sendiri dan SMK Negeri 1 Bantaeng!",
    hint: "Ingat: Tulisan teks harus selalu diapit tanda kutip dua <code>\"...\"</code> atau kutip satu <code>'...'</code>.",
    starterCode: `# Misi 1: Komputer Berbicara (Output)
# Ganti teks di bawah ini dengan namamu sendiri!

print("Halo Dunia! 🌍")
print("Nama saya [Isi Namamu Disini]")
print("Saya siswa hebat di SMK Negeri 1 Bantaeng! 🚀")
`
  },
  {
    id: 2,
    badge: "Level 2 • Menengah",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    title: "Misi 2: Kotak Inventori Ajaib (Variabel)",
    desc: "Simpan informasi ke dalam kotak <b>Variabel</b> lalu gabungkan dengan perintah <code class='text-cyan-400'>print()</code>.",
    objective: "Ubah isi variabel <code>nama_hero</code>, <code>jurusan</code>, dan <code>level_kekuatan</code> sesuai keinginanmu, lalu jalankan!",
    hint: "Jika tipe datanya angka (seperti <code>99</code>), gunakan <code>str(variabel)</code> saat digabung dengan teks.",
    starterCode: `# Misi 2: Menyimpan data di dalam Kotak Variabel

nama_hero = "Satria Cyber"
jurusan = "TJKT"
level_kekuatan = 99

print("=== PROFIL HERO SMK ===")
print("Nama Hero : " + nama_hero)
print("Jurusan   : " + jurusan)
print("Kekuatan  : " + str(level_kekuatan) + " XP 🔥")
`
  },
  {
    id: 3,
    badge: "Level 3 • Seru",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    title: "Misi 3: Komputer Mendengarkan (input)",
    desc: "Buat program yang bisa bertanya dan merespons jawaban yang diketik oleh pengguna secara langsung.",
    objective: "Jalankan kode, lalu ketik jawabanmu di kotak terminal di sebelah kanan begitu komputer bertanya!",
    hint: "Perintah <code>input()</code> akan menunggu kamu mengetik di terminal dan menekan Enter.",
    starterCode: `# Misi 3: Komputer Mendengarkan Jawabanmu

nama = input("Siapa nama lengkap kamu? ")
cita_cita = input("Apa impian terbesar kamu di bidang teknologi? ")

print("")
print("------------------------------------------")
print("Halo " + nama + "! Senang berkenalan denganmu!")
print("Semoga cita-citamu menjadi " + cita_cita + " tercapai! ✨")
print("------------------------------------------")
`
  },
  {
    id: 4,
    badge: "Level 4 • Tantangan",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    title: "Tantangan Bebas: Kartu ID Card Digital",
    desc: "Gabungkan semua ilmu (print, variabel, dan input) untuk membuat kartu profil digital kerenmu sendiri.",
    objective: "Kreasikan format teks, tambahkan emoji, dan ajak teman sebangkumu untuk mencoba programmu!",
    hint: "Kamu bisa menambahkan variabel baru seperti <code>game_favorit = input(...)</code> atau <code>makanan = ...</code>!",
    starterCode: `# Tantangan Kreatif: Generator ID Card Digital SMK

nama = input("Masukkan Nickname / Nama Panggilan: ")
kelas = input("Kelas & Jurusan (Contoh: X TJKT 1): ")
skill = input("Keahlian yang ingin kamu kuasai: ")

print("")
print("==========================================")
print("   🛡️ KARTU IDENTITAS PROGRAMMER SMK 🛡️   ")
print("==========================================")
print(" 👤 NAMA    : " + nama)
print(" 🏫 KELAS   : " + kelas)
print(" ⚡ SPESIALIS: " + skill)
print(" 🚀 STATUS  : Siap Menaklukkan Dunia Digital!")
print("==========================================")
`
  }
];

let currentLevelIndex = 0;
let isRunning = false;
let terminalInputResolver = null;

// Initialize Playground
function initPlayground() {
  renderLevelSelector();
  loadLevel(0);
  setupTerminalInputListener();
}

// Render Level Selector Buttons
function renderLevelSelector() {
  const container = document.getElementById("level-selector-container");
  if (!container) return;

  container.innerHTML = PLAYGROUND_LEVELS.map((lvl, idx) => `
    <button onclick="loadLevel(${idx})" id="lvl-btn-${idx}" 
      class="w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
        idx === currentLevelIndex 
          ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
          : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600'
      }">
      <div class="flex items-center gap-3">
        <span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
          idx === currentLevelIndex ? 'bg-cyan-400 text-slate-950 shadow-sm' : 'bg-slate-700 text-slate-300'
        }">${idx + 1}</span>
        <div>
          <div class="text-sm font-semibold text-slate-200">${lvl.title.split(':')[0]}</div>
          <div class="text-xs text-slate-400 truncate max-w-[180px]">${lvl.title.split(':')[1] || lvl.title}</div>
        </div>
      </div>
      <i data-lucide="${idx === currentLevelIndex ? 'chevron-right' : 'circle'}" class="w-4 h-4 ${idx === currentLevelIndex ? 'text-cyan-400' : 'text-slate-600'}"></i>
    </button>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

// Load a specific level
function loadLevel(index) {
  currentLevelIndex = index;
  const level = PLAYGROUND_LEVELS[index];
  
  // Update Selector UI
  renderLevelSelector();

  // Update Mission Info UI
  document.getElementById("mission-badge").className = `px-2.5 py-1 rounded-full text-xs font-semibold border ${level.badgeColor}`;
  document.getElementById("mission-badge").textContent = level.badge;
  document.getElementById("mission-title").textContent = level.title;
  document.getElementById("mission-desc").innerHTML = level.desc;
  document.getElementById("mission-objective").innerHTML = level.objective;
  document.getElementById("mission-hint-text").innerHTML = level.hint;

  // Update Code Editor with Starter Code
  const editor = document.getElementById("code-editor");
  if (editor) {
    editor.value = level.starterCode;
    updateLineNumbers();
  }

  // Clear Terminal Output
  clearTerminal();
  appendTerminalOutput("System: Modul " + (index + 1) + " siap. Klik 'Jalankan Kode' untuk mencoba!\n", "system");
}

// Line Numbers Handler
function updateLineNumbers() {
  const editor = document.getElementById("code-editor");
  const lineNumbers = document.getElementById("line-numbers");
  if (!editor || !lineNumbers) return;

  const lines = editor.value.split("\n").length;
  lineNumbers.innerHTML = Array.from({ length: Math.max(lines, 12) }, (_, i) => `<div>${i + 1}</div>`).join("");
}

// Terminal Helpers
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
    span.className = "text-rose-400 font-mono block my-1";
  } else if (type === "success") {
    span.className = "text-emerald-400 font-mono block my-1";
  } else if (type === "input-echo") {
    span.className = "text-yellow-300 font-mono";
  } else {
    span.className = "text-slate-200 font-mono whitespace-pre-wrap";
  }

  span.textContent = text;
  terminal.appendChild(span);
  
  // Scroll terminal to bottom
  const container = document.getElementById("terminal-scroll-area");
  if (container) container.scrollTop = container.scrollHeight;
}

// Show/Hide Terminal Input Bar
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

// In-Browser Python Execution Engine using Skulpt
function runPythonCode() {
  if (isRunning) return;

  const editor = document.getElementById("code-editor");
  const runBtn = document.getElementById("btn-run-code");
  const code = editor.value;

  clearTerminal();
  appendTerminalOutput("▶ Menjalankan program Python...\n", "system");
  
  isRunning = true;
  if (runBtn) {
    runBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Memproses...</span>`;
    if (window.lucide) lucide.createIcons();
  }

  // Configure Skulpt
  Sk.configure({
    output: function(text) {
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
        terminalInputResolver = resolve;
        showTerminalInput(prompt);
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
      appendTerminalOutput("\n✨ Program selesai dijalankan dengan sukses (Exit Code: 0)!\n", "success");
      triggerSuccessCelebration();
      finishExecution();
    },
    function(err) {
      appendTerminalOutput("\n❌ Terjadi Error pada Kode:\n" + err.toString() + "\n", "error");
      appendTerminalOutput("💡 Tips: Periksa tanda kutip, tanda kurung, atau ejaan variabel kamu.\n", "system");
      finishExecution();
    }
  );
}

function finishExecution() {
  isRunning = false;
  const runBtn = document.getElementById("btn-run-code");
  if (runBtn) {
    runBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 text-slate-950"></i><span>Jalankan Kode</span>`;
    if (window.lucide) lucide.createIcons();
  }
}

// Reset Code to Starter Code
function resetCurrentCode() {
  const level = PLAYGROUND_LEVELS[currentLevelIndex];
  const editor = document.getElementById("code-editor");
  if (editor && level) {
    editor.value = level.starterCode;
    updateLineNumbers();
    clearTerminal();
    appendTerminalOutput("System: Kode telah di-reset ke bentuk awal.\n", "system");
  }
}

// Toggle Hint Popup
function toggleHintModal() {
  const modal = document.getElementById("hint-modal");
  if (modal) modal.classList.toggle("hidden");
}

// Celebration / Sparkle feedback
function triggerSuccessCelebration() {
  const badge = document.getElementById("mission-badge");
  if (badge) {
    badge.classList.add("scale-110");
    setTimeout(() => badge.classList.remove("scale-110"), 300);
  }
}
