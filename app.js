/**
 * Presentation Slides & GSAP Morphing Engine
 * SMK Negeri 1 Bantaeng - Python 101
 */

let currentSlideIndex = 0;
const totalSlides = 10;
let activeMode = "presentation"; // 'presentation' or 'playground'
let isSoundEnabled = true;
let isAnimatingTransition = false;
let isRocketLaunching = false;

// Theme Colors for each slide morphing ambiance
const SLIDE_THEMES = [
  { primary: "#00f0ff", secondary: "#10b981" }, // Slide 1: Cyan/Emerald (Rocket)
  { primary: "#facc15", secondary: "#00f0ff" }, // Slide 2: Yellow/Cyan (IPO)
  { primary: "#10b981", secondary: "#38bdf8" }, // Slide 3: Emerald/Sky (Powers)
  { primary: "#00f0ff", secondary: "#a855f7" }, // Slide 4: Cyan/Purple (Print)
  { primary: "#a855f7", secondary: "#f97316" }, // Slide 5: Purple/Orange (Quiz 1)
  { primary: "#38bdf8", secondary: "#10b981" }, // Slide 6: Sky/Emerald (List & Quiz 2)
  { primary: "#facc15", secondary: "#ec4899" }, // Slide 7: Gold/Pink (Input & Hologram)
  { primary: "#f43f5e", secondary: "#10b981" }, // Slide 8: Rose/Emerald (If-Else & Quiz 3)
  { primary: "#00f0ff", secondary: "#facc15" }, // Slide 9: Cyan/Gold (Loop & Quiz 4)
  { primary: "#10b981", secondary: "#a855f7" }  // Slide 10: Emerald/Purple (Launch)
];

// ==========================================
// Web Audio API Synthesizer (Zero Assets)
// ==========================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playAudioFx(type) {
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
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.04);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "rocket") {
      // Rocket Thruster Ignition Rumble + Sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(650, now + 0.45);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === "morph") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "success") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === "laser") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "loopTick") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(750, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.005, now + 0.02);
      osc.start(now);
      osc.stop(now + 0.02);
    } else if (type === "levelUp") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.07);
      osc.frequency.setValueAtTime(659.25, now + 0.14);
      osc.frequency.setValueAtTime(880, now + 0.21);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(110, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch (err) {
    console.warn("Audio FX error:", err);
  }
}

function toggleSoundFx() {
  isSoundEnabled = !isSoundEnabled;
  const btn = document.getElementById("btn-sound-toggle");
  if (btn) {
    btn.innerHTML = isSoundEnabled
      ? `<i data-lucide="volume-2" class="w-4 h-4 text-cyan-400"></i>`
      : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i>`;
    if (window.lucide) lucide.createIcons();
  }
  if (isSoundEnabled) playAudioFx("click");
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initFluidMeshCanvas();
  initSlides();
  initKeyboardNavigation();
  initPlayground();
  updateIfElseSimulation();
  if (window.lucide) lucide.createIcons();
});

// ==========================================
// 1. GSAP Morphing Slide Navigation
// ==========================================
function initSlides() {
  renderPaginationDots();
  goToSlide(0, false);
}

function renderPaginationDots() {
  const container = document.getElementById("slide-dots-container");
  if (!container) return;

  container.innerHTML = Array.from({ length: totalSlides }, (_, i) => `
    <button onclick="goToSlide(${i})" title="Buka Slide ${i + 1}"
      class="h-2 rounded-full transition-all duration-300 ${
        i === currentSlideIndex 
          ? 'w-7 bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]' 
          : 'w-2 bg-slate-700 hover:bg-slate-500'
      }">
    </button>
  `).join("");
}

function goToSlide(targetIndex, animate = true) {
  if (targetIndex < 0 || targetIndex >= totalSlides) return;
  if (isAnimatingTransition && animate) return;

  const currentSlideEl = document.getElementById(`slide-${currentSlideIndex + 1}`);
  const targetSlideEl = document.getElementById(`slide-${targetIndex + 1}`);
  const morphOrb = document.getElementById("morph-portal-orb");

  // Reset Rocket if returning to Slide 1
  if (targetIndex === 0) {
    resetRocketState();
  }

  if (!animate || !window.gsap) {
    document.querySelectorAll(".slide-content").forEach(s => s.classList.remove("active"));
    if (targetSlideEl) targetSlideEl.classList.add("active");
    updateNavIndicators(targetIndex);
    return;
  }

  isAnimatingTransition = true;
  playAudioFx("morph");

  const theme = SLIDE_THEMES[targetIndex] || SLIDE_THEMES[0];
  if (morphOrb) {
    morphOrb.style.background = `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary} 70%, transparent 100%)`;
    morphOrb.style.boxShadow = `0 0 50px ${theme.primary}, 0 0 100px ${theme.secondary}`;
  }

  // GSAP Morphing Timeline
  const tl = gsap.timeline({
    onComplete: () => {
      isAnimatingTransition = false;
    }
  });

  // Step 1: Shrink & dissolve current slide into the morphing core
  if (currentSlideEl && currentSlideEl !== targetSlideEl) {
    tl.to(currentSlideEl, {
      scale: 0.82,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.26,
      ease: "power2.in",
      onComplete: () => {
        currentSlideEl.classList.remove("active");
      }
    });
  }

  // Step 2: Pulse the morphing luminous orb
  if (morphOrb) {
    tl.to(morphOrb, {
      scale: 1.5,
      opacity: 0.9,
      duration: 0.16,
      ease: "power2.out"
    }, "-=0.08")
    .to(morphOrb, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power3.in"
    });
  }

  // Step 3: Expand target slide with elastic spring bounce & stagger its inner cards
  tl.call(() => {
    if (targetSlideEl) {
      targetSlideEl.classList.add("active");
      gsap.set(targetSlideEl, { scale: 1.14, opacity: 0, filter: "blur(6px)" });
    }
    updateNavIndicators(targetIndex);
  })
  .to(targetSlideEl, {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    duration: 0.42,
    ease: "back.out(1.4)"
  })
  .from(targetSlideEl.querySelectorAll(".glass-panel, .terminal-window"), {
    y: 18,
    opacity: 0,
    stagger: 0.05,
    duration: 0.32,
    ease: "power2.out"
  }, "-=0.25");
}

function updateNavIndicators(index) {
  currentSlideIndex = index;

  // Progress Bar
  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
  const progressBar = document.getElementById("slide-progress-bar");
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  // Counter Text
  const counterEl = document.getElementById("slide-counter");
  if (counterEl) {
    const currStr = currentSlideIndex + 1 < 10 ? `0${currentSlideIndex + 1}` : `${currentSlideIndex + 1}`;
    const totStr = totalSlides < 10 ? `0${totalSlides}` : `${totalSlides}`;
    counterEl.textContent = `Slide ${currStr} / ${totStr}`;
  }

  // Dots
  renderPaginationDots();

  // Prev / Next Button State
  const prevBtn = document.getElementById("btn-prev-slide");
  const nextBtn = document.getElementById("btn-next-slide");
  if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
  if (nextBtn) {
    if (currentSlideIndex === totalSlides - 1) {
      nextBtn.innerHTML = `<span>Ke Arena Praktek</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
    } else {
      nextBtn.innerHTML = `<span>Lanjut</span> <i data-lucide="chevron-right" class="w-4 h-4"></i>`;
    }
  }

  if (window.lucide) lucide.createIcons();
}

function nextSlide() {
  if (currentSlideIndex === 0) {
    // If on Slide 1, trigger the Rocket Launch sequence first!
    launchRocketAndStart();
    return;
  }

  if (currentSlideIndex < totalSlides - 1) {
    goToSlide(currentSlideIndex + 1);
  } else {
    window.location.href = "practice.html";
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    goToSlide(currentSlideIndex - 1);
  }
}

// ==========================================
// 2. Animated Rocket Launch Sequence (Slide 1)
// ==========================================
function launchRocketAndStart() {
  if (isRocketLaunching || isAnimatingTransition) return;
  isRocketLaunching = true;

  playAudioFx("rocket");

  const rocketEl = document.getElementById("hero-rocket-svg");
  const heroCard = document.getElementById("slide-1-card");
  const smokeContainer = document.getElementById("rocket-smoke-container");

  // Spawn smoke puffs
  if (smokeContainer) {
    for (let i = 0; i < 8; i++) {
      const puff = document.createElement("div");
      puff.className = "smoke-puff";
      const size = 30 + Math.random() * 40;
      puff.style.width = `${size}px`;
      puff.style.height = `${size}px`;
      puff.style.left = `${50 + (Math.random() - 0.5) * 60}%`;
      puff.style.bottom = `${-10 + Math.random() * 20}px`;
      smokeContainer.appendChild(puff);
      setTimeout(() => puff.remove(), 1200);
    }
  }

  // Card Shake
  if (heroCard) {
    heroCard.classList.add("shake-screen");
    setTimeout(() => heroCard.classList.remove("shake-screen"), 400);
  }

  // Animate Rocket Shooting Off Screen
  if (rocketEl && window.gsap) {
    gsap.to(rocketEl, {
      y: -750,
      scale: 0.5,
      duration: 0.55,
      ease: "power3.in",
      onComplete: () => {
        isRocketLaunching = false;
        goToSlide(1); // Advance to Slide 2
      }
    });
  } else {
    isRocketLaunching = false;
    goToSlide(1);
  }
}

function resetRocketState() {
  const rocketEl = document.getElementById("hero-rocket-svg");
  if (rocketEl && window.gsap) {
    gsap.set(rocketEl, { y: 0, scale: 1 });
  }
}

// ==========================================
// 3. Interactive Micro-Quizzes Handler
// ==========================================
function voteGenericQuiz(quizId, selectedOption, correctOption) {
  const isCorrect = selectedOption === correctOption;
  playAudioFx(isCorrect ? "success" : "error");

  const btnA = document.getElementById(`quiz-${quizId}-btn-a`);
  const btnB = document.getElementById(`quiz-${quizId}-btn-b`);
  const cardExpl = document.getElementById(`quiz-${quizId}-explanation`);

  if (btnA && btnB) {
    if (selectedOption === "A") {
      btnA.className = `w-full p-3.5 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-slate-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-rose-500/20 border-rose-500 text-slate-100'} text-left transition-all`;
      btnB.className = "w-full p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left text-slate-400 opacity-60";
    } else {
      btnB.className = `w-full p-3.5 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-slate-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-rose-500/20 border-rose-500 text-slate-100'} text-left transition-all`;
      btnA.className = "w-full p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left text-slate-400 opacity-60";
    }
  }

  if (cardExpl) {
    cardExpl.classList.remove("hidden");
  }
}

// Robust Flip Card Handler (Works 100% on any slide)
function toggleCardFlip(element) {
  playAudioFx("click");
  const card = element.closest(".flip-card");
  if (card) {
    card.classList.toggle("flipped");
  }
}

// ==========================================
// 4. Keyboard Shortcuts & Controls
// ==========================================
function initKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    if (["TEXTAREA", "INPUT", "SELECT"].includes(document.activeElement.tagName)) {
      return;
    }

    if (activeMode === "presentation") {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      }
    }

    if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleFullscreen();
    }
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn("Fullscreen request error:", err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function toggleShortcutModal() {
  playAudioFx("click");
  const modal = document.getElementById("shortcut-modal");
  if (modal) modal.classList.toggle("hidden");
}

// ==========================================
// 5. Mode Switcher (Presentation <-> Playground)
// ==========================================
function switchMode(mode) {
  if (mode === "playground") {
    window.location.href = "practice.html";
    return;
  }
  playAudioFx("click");
  activeMode = mode;
  const presContainer = document.getElementById("presentation-container");
  const playContainer = document.getElementById("playground-container");
  const floatingNav = document.getElementById("floating-nav-hud");
  
  const btnPres = document.getElementById("nav-btn-presentation");
  const btnPlay = document.getElementById("nav-btn-playground");

  if (mode === "presentation") {
    if (presContainer) presContainer.classList.remove("hidden");
    if (playContainer) playContainer.classList.add("hidden");
    if (floatingNav) floatingNav.classList.remove("hidden");

    if (btnPres) {
      btnPres.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm flex items-center gap-1.5";
    }
    if (btnPlay) {
      btnPlay.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 border border-transparent flex items-center gap-1.5";
    }
  } else {
    if (presContainer) presContainer.classList.add("hidden");
    if (playContainer) playContainer.classList.remove("hidden");
    if (floatingNav) floatingNav.classList.add("hidden");

    if (btnPlay) {
      btnPlay.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm flex items-center gap-1.5";
    }
    if (btnPres) {
      btnPres.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 border border-transparent flex items-center gap-1.5";
    }
  }

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 6. Interactive Slide Widgets
// ==========================================

// SLIDE 2: Interactive IPO Step-by-Step Flow Simulation
let isDataFlowing = false;

function triggerDataFlow() {
  if (isDataFlowing) return;
  isDataFlowing = true;

  const card1 = document.getElementById("ipo-card-1");
  const card2 = document.getElementById("ipo-card-2");
  const card3 = document.getElementById("ipo-card-3");
  const arrow1 = document.getElementById("ipo-flow-arrow-1");
  const arrow2 = document.getElementById("ipo-flow-arrow-2");
  const status = document.getElementById("data-flow-status");

  // Step 1: Input Stage
  playAudioFx("click");
  if (card1) {
    card1.style.setProperty("--pulse-color", "#facc15");
    card1.classList.add("card-pulse-active");
  }
  if (status) {
    status.innerHTML = `<span class="text-yellow-400 font-bold">1. INPUT:</span> <span class="text-slate-200">Keyboard menangkap ketikan user <code class="text-yellow-300 font-mono">nama = "Ahmad"</code>...</span>`;
  }

  // Step 2: Flow to Process
  setTimeout(() => {
    playAudioFx("laser");
    if (arrow1) arrow1.classList.add("flow-badge-active");
  }, 500);

  // Step 3: Process / CPU Stage
  setTimeout(() => {
    playAudioFx("laser");
    if (card1) card1.classList.remove("card-pulse-active");
    if (card2) {
      card2.style.setProperty("--pulse-color", "#00f0ff");
      card2.classList.add("card-pulse-active");
    }
    if (status) {
      status.innerHTML = `<span class="text-cyan-400 font-bold">2. PROCESS:</span> <span class="text-slate-200">CPU mengolah data, mengalokasikan memori RAM & merangkai logika teks...</span>`;
    }
  }, 1000);

  // Step 4: Flow to Output
  setTimeout(() => {
    playAudioFx("laser");
    if (arrow2) arrow2.classList.add("flow-badge-active");
  }, 1500);

  // Step 5: Output Stage
  setTimeout(() => {
    playAudioFx("success");
    if (card2) card2.classList.remove("card-pulse-active");
    if (card3) {
      card3.style.setProperty("--pulse-color", "#10b981");
      card3.classList.add("card-pulse-active");
    }
    if (status) {
      status.innerHTML = `<span class="text-emerald-400 font-bold">3. OUTPUT:</span> <span class="text-slate-100 font-semibold">Teks berhasil dicetak ke layar: <code class="text-emerald-300 font-mono">"Halo Ahmad!"</code> ✨</span>`;
    }
  }, 2000);

  // Reset State
  setTimeout(() => {
    if (card3) card3.classList.remove("card-pulse-active");
    if (arrow1) arrow1.classList.remove("flow-badge-active");
    if (arrow2) arrow2.classList.remove("flow-badge-active");
    isDataFlowing = false;
  }, 3800);
}

// SLIDE 3: Superpower Tab Switcher
function selectSuperpower(type) {
  playAudioFx("click");
  const tabs = ["network", "cyber", "ai"];
  tabs.forEach((t) => {
    const btn = document.getElementById(`power-tab-${t}`);
    const panel = document.getElementById(`power-panel-${t}`);
    if (t === type) {
      if (btn) btn.className = "p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-left font-semibold text-xs flex items-center gap-2 shadow-sm";
      if (panel) panel.classList.remove("hidden");
    } else {
      if (btn) btn.className = "p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 text-left font-semibold text-xs flex items-center gap-2";
      if (panel) panel.classList.add("hidden");
    }
  });

  if (type === "network") {
    simulateNetworkPing();
  }
}

function simulateNetworkPing() {
  const pingLogs = document.getElementById("network-ping-logs");
  if (!pingLogs) return;
  
  pingLogs.innerHTML = `
    <div class="text-slate-500">> python3 auto_ping_router.py</div>
    <div class="text-cyan-400">> Memeriksa status 3 Gateway MikroTik SMK...</div>
  `;

  setTimeout(() => {
    pingLogs.innerHTML += `<div class="text-emerald-400">✔ 192.168.1.1 (Lab TJKT 1) - ONLINE (Latency 1ms)</div>`;
    playAudioFx("click");
  }, 350);

  setTimeout(() => {
    pingLogs.innerHTML += `<div class="text-emerald-400">✔ 192.168.2.1 (Server Utama) - ONLINE (Latency 2ms)</div>`;
    playAudioFx("click");
  }, 700);

  setTimeout(() => {
    pingLogs.innerHTML += `<div class="text-yellow-400">⚡ Otomasi Selesai: Semua jaringan sekolah terpantau normal!</div>`;
    playAudioFx("success");
  }, 1050);
}

// SLIDE 4: Print Templates Injector
function injectPrintTemplate(type) {
  playAudioFx("click");
  const inputEl = document.getElementById("demo-print-input");
  if (!inputEl) return;

  if (type === "hacker") {
    inputEl.value = "[ALERT] Firewall SMK Bantaeng Aktif • Port 80 & 443 Aman! 🛡️";
  } else if (type === "banner") {
    inputEl.value = "=== SELAMAT DATANG DI KOMUNITAS PROGRAMMER SMK 🚀 ===";
  } else {
    inputEl.value = "Halo kawan-kawan TJKT! Siap coding hari ini? ✨";
  }

  demoPrintToScreen();
}

function demoPrintToScreen() {
  playAudioFx("laser");
  const inputEl = document.getElementById("demo-print-input");
  const outputScreen = document.getElementById("demo-print-screen");
  const text = inputEl ? inputEl.value : "Halo SMK Negeri 1 Bantaeng! 🚀";

  if (outputScreen) {
    outputScreen.innerHTML = `<span class="text-cyan-400 font-mono">> </span><span class="text-slate-100 font-mono">${escapeHtml(text)}</span>`;
  }
}

// SLIDE 6: Interactive List / Array Storage Demo
let demoArrayList = ["192.168.1.1", "192.168.1.2", "192.168.1.3"];

function addArrayItem(item) {
  playAudioFx("click");
  if (demoArrayList.length >= 6) {
    demoArrayList = ["192.168.1.1"];
  } else {
    demoArrayList.push(item || `192.168.1.${demoArrayList.length + 1}`);
  }
  renderArrayList();
}

function clearArrayList() {
  playAudioFx("click");
  demoArrayList = ["192.168.1.1"];
  renderArrayList();
}

function renderArrayList() {
  const container = document.getElementById("array-items-container");
  const codeEl = document.getElementById("array-code-preview");
  const countEl = document.getElementById("array-item-count");

  if (container) {
    container.innerHTML = demoArrayList.map((ip, idx) => `
      <div class="list-item-capsule px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs flex items-center gap-2">
        <span class="text-[10px] text-slate-400">[${idx}]</span>
        <span class="font-bold">${ip}</span>
      </div>
    `).join("");
  }

  if (codeEl) {
    codeEl.innerHTML = `<span class="text-purple-400">daftar_ip</span> = [${demoArrayList.map(ip => `<span class="text-emerald-400">"${ip}"</span>`).join(", ")}]`;
  }

  if (countEl) countEl.textContent = `${demoArrayList.length} Data Tersimpan`;
}

// SLIDE 7: Live Hologram ID Card Generator
function generateStudentIdCard() {
  playAudioFx("levelUp");
  const nameInput = document.getElementById("id-gen-name");
  const roleSelect = document.getElementById("id-gen-role");
  
  const cardName = document.getElementById("hologram-card-name");
  const cardRole = document.getElementById("hologram-card-role");
  const cardId = document.getElementById("hologram-card-id");

  const name = nameInput && nameInput.value.trim() !== "" ? nameInput.value.trim() : "Satria Programmer";
  const role = roleSelect ? roleSelect.value : "Network Security Specialist";
  const randomId = "SMK-" + Math.floor(1000 + Math.random() * 9000);

  if (cardName) cardName.textContent = name;
  if (cardRole) cardRole.textContent = role;
  if (cardId) cardId.textContent = randomId;

  const card = document.getElementById("hologram-card-element");
  if (card) {
    card.classList.add("scale-105", "shadow-[0_0_35px_rgba(0,240,255,0.6)]");
    setTimeout(() => card.classList.remove("scale-105"), 300);
  }
}

// SLIDE 8: Live If-Else Decision Gate Simulation
function updateIfElseSimulation() {
  const slider = document.getElementById("if-else-slider");
  const scoreVal = slider ? parseInt(slider.value, 10) : 80;

  const scoreDisplay = document.getElementById("if-else-score-display");
  const codePreview = document.getElementById("if-else-code-preview");
  const statusBadge = document.getElementById("if-else-status-badge");

  if (scoreDisplay) scoreDisplay.textContent = scoreVal;

  const isPassed = scoreVal >= 75;

  if (codePreview) {
    codePreview.innerHTML = `
<span class="text-purple-400">nilai</span> = <span class="text-yellow-400 font-bold">${scoreVal}</span>

<span class="text-rose-400 font-bold">if</span> <span class="text-purple-400">nilai</span> >= <span class="text-yellow-400">75</span>:
    <span class="text-cyan-400">status</span> = <span class="${isPassed ? 'text-emerald-400 font-bold bg-emerald-500/20 px-1 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-slate-500'}">"AKSES DITERIMA / LULUS 🟢"</span>
<span class="text-rose-400 font-bold">else</span>:
    <span class="text-cyan-400">status</span> = <span class="${!isPassed ? 'text-rose-400 font-bold bg-rose-500/20 px-1 rounded shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'text-slate-500'}">"AKSES DITOLAK / REMEDIAL 🔴"</span>
`;
  }

  if (statusBadge) {
    if (isPassed) {
      statusBadge.className = "px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all";
      statusBadge.innerHTML = `
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>GERBANG TERBUKA (LULUS >= 75)</span>
        </div>
        <span class="font-mono text-emerald-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/40">🟢 AKSES DITERIMA</span>
      `;
    } else {
      statusBadge.className = "px-3 py-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold text-xs flex items-center justify-between shadow-[0_0_15px_rgba(244,63,94,0.25)] transition-all";
      statusBadge.innerHTML = `
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-rose-400"></span>
          <span>GERBANG TERKUNCI (NILAI < 75)</span>
        </div>
        <span class="font-mono text-rose-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-rose-500/40">🔴 AKSES DITOLAK</span>
      `;
    }
  }
}

// SLIDE 9: Interactive For-Loop Simulation (Automation Superpower)
let isLoopRunning = false;

function triggerLoopSimulation() {
  if (isLoopRunning) return;
  isLoopRunning = true;
  playAudioFx("laser");

  const countDisplay = document.getElementById("loop-counter-display");
  const progressBar = document.getElementById("loop-progress-bar");
  const logTerminal = document.getElementById("loop-terminal-log");
  const statusEl = document.getElementById("loop-status-text");

  if (logTerminal) logTerminal.innerHTML = `<div class="text-slate-500">> for i in range(1, 101):</div>`;

  let currentCount = 0;
  const maxCount = 100;
  const interval = setInterval(() => {
    currentCount += 4;
    if (currentCount > maxCount) currentCount = maxCount;

    if (countDisplay) countDisplay.textContent = currentCount;
    if (progressBar) progressBar.style.width = `${currentCount}%`;

    if (currentCount % 12 === 0) {
      playAudioFx("loopTick");
      if (logTerminal) {
        logTerminal.innerHTML += `<div class="text-cyan-300 font-mono text-[11px]">[Loop #${currentCount}] Auto-Pinging Router 192.168.1.${currentCount} ... <span class="text-emerald-400 font-bold">SUKSES (1ms)</span></div>`;
        logTerminal.scrollTop = logTerminal.scrollHeight;
      }
    }

    if (currentCount >= maxCount) {
      clearInterval(interval);
      isLoopRunning = false;
      playAudioFx("success");
      if (statusEl) {
        statusEl.innerHTML = `<span class="text-emerald-400 font-bold">⚡ SELESAI: 100 Perulangan tuntas dalam 1.2 detik tanpa lelah!</span>`;
      }
      if (logTerminal) {
        logTerminal.innerHTML += `<div class="text-yellow-400 font-bold mt-1">✔ Selesai: 100 Perangkat berhasil diperiksa secara instan!</div>`;
        logTerminal.scrollTop = logTerminal.scrollHeight;
      }
    }
  }, 45);
}

// Helper: Escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// 7. Reactive Fluid Cyber-Mesh Canvas
// ==========================================
function initFluidMeshCanvas() {
  const canvas = document.getElementById("fluid-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let mouseX = width / 2;
  let mouseY = height / 2;
  let step = 0;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawWave() {
    ctx.clearRect(0, 0, width, height);

    step += 0.015;
    const theme = SLIDE_THEMES[currentSlideIndex] || SLIDE_THEMES[0];

    // Draw Cybernetic Grid Lines
    const lines = 6;
    for (let i = 0; i < lines; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = i % 2 === 0 ? theme.primary : theme.secondary;
      ctx.globalAlpha = 0.15 - (i * 0.018);

      for (let x = 0; x < width; x += 30) {
        const distToMouse = Math.abs(x - mouseX) / width;
        const mouseEffect = Math.sin(distToMouse * Math.PI) * 25;
        const y = height * 0.5 + Math.sin(x * 0.003 + step + i * 0.6) * (60 + i * 15) + Math.cos(step * 0.8) * 20 + mouseEffect;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Floating glowing particles
    ctx.globalAlpha = 0.25;
    for (let p = 0; p < 18; p++) {
      const px = (Math.sin(p * 99 + step * 0.5) * 0.5 + 0.5) * width;
      const py = (Math.cos(p * 33 + step * 0.4) * 0.5 + 0.5) * height;
      ctx.beginPath();
      ctx.arc(px, py, (p % 3) + 1.5, 0, Math.PI * 2);
      ctx.fillStyle = p % 2 === 0 ? theme.primary : theme.secondary;
      ctx.fill();
    }

    requestAnimationFrame(drawWave);
  }

  drawWave();
}
