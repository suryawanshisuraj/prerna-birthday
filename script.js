/**
 * Romantic Birthday Website - Interactive & Visual Experience
 */

// ==================== CONFIGURATION ====================
const SITE_CONFIG = {
  herName: "Prerna",
  startDate: "2025-11-18", // YYYY-MM-DD
  customAudioFile: null,
};

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  initDayCounter();
  initBackgroundPetals();
  initCustomCursor();
  initAudio();
  initHugMeter();
  initPhotoReactions();
  initDoubleTapHearts();
});

// ==================== 1. DAY COUNTER ====================
function initDayCounter() {
  const daysEl = document.getElementById("counter-days");
  if (!daysEl) return;

  const start = new Date(2025, 10, 18); // Nov 18, 2025
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  if (!isNaN(diffDays)) {
    daysEl.textContent = `${diffDays}+`;
  }
}

// ==================== 2. MAGICAL CURSOR & STARDUST ENGINE ====================
function initCustomCursor() {
  const canvas = document.getElementById("cursor-canvas");
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");

  if (!canvas || !dot || !ring) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouse = { x: -100, y: -100 };
  let ringPos = { x: -100, y: -100 };
  let lastSpawn = { x: -100, y: -100 };
  let particles = [];

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    dot.style.left = `${mouse.x}px`;
    dot.style.top = `${mouse.y}px`;
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const dist = Math.hypot(mouse.x - lastSpawn.x, mouse.y - lastSpawn.y);
    if (dist > 14) {
      spawnTrailParticle(mouse.x, mouse.y);
      lastSpawn.x = mouse.x;
      lastSpawn.y = mouse.y;
    }
  });

  window.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  window.addEventListener("mousedown", () => {
    ring.classList.add("cursor-active");
  });

  window.addEventListener("mouseup", () => {
    ring.classList.remove("cursor-active");
  });

  window.addEventListener("click", (e) => {
    createClickBurst(e.clientX, e.clientY);
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      spawnTrailParticle(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      createClickBurst(touch.clientX, touch.clientY, 8);
    }
  }, { passive: true });

  function attachHoverEffects() {
    const interactables = document.querySelectorAll(
      "a, button, .flip-card, .polaroid-card, #candle, #envelope-closed, input, textarea, .gallery-item"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("cursor-hover"));
    });
  }
  attachHoverEffects();

  const colors = [
    { r: 244, g: 63, b: 94 },
    { r: 250, g: 204, b: 21 },
    { r: 254, g: 205, b: 207 },
    { r: 253, g: 230, b: 138 },
    { r: 255, g: 253, b: 249 }
  ];

  function spawnTrailParticle(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 + 0.4,
      size: Math.random() * 3.5 + 1.8,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.02,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.08,
      isStar: Math.random() > 0.45,
      color: color
    });
  }

  function createClickBurst(x, y, count = 14) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 3.5 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2.5,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.02,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1,
        isStar: true,
        color: color
      });
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.8})`;
    ctx.fill();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    ringPos.x += (mouse.x - ringPos.x) * 0.22;
    ringPos.y += (mouse.y - ringPos.y) * 0.22;
    ring.style.left = `${ringPos.x}px`;
    ring.style.top = `${ringPos.y}px`;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      if (p.isStar) {
        drawStar(ctx, p.x, p.y, 4, p.size, p.size * 0.35, p.color, p.alpha);
      } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.6})`;
        ctx.fill();
        ctx.restore();
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// ==================== 3. NATURAL ROSE PETAL & SAKURA DRIFT ====================
function initBackgroundPetals() {
  const container = document.getElementById("particle-container");
  if (!container) return;

  const symbols = ["🌸", "🌹", "✨", "🤍", "🍂", "🕊️"];

  function spawnPetal() {
    const p = document.createElement("div");
    p.classList.add("floating-petal");
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = `${Math.random() * 96}vw`;
    p.style.fontSize = `${14 + Math.random() * 18}px`;
    p.style.animationDuration = `${8 + Math.random() * 7}s`;
    p.style.opacity = (0.2 + Math.random() * 0.45).toFixed(2);

    container.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 15000);
  }

  for (let i = 0; i < 7; i++) spawnPetal();
  setInterval(spawnPetal, 2000);
}

// ==================== 4. ROMANTIC VINTAGE MUSIC BOX SYNTH ====================
let audioCtx = null;
let isPlaying = false;
let synthTimer = null;

const melody = [
  523.25, // C5
  659.25, // E5
  783.99, // G5
  659.25, // E5
  587.33, // D5
  739.99, // F#5
  880.00, // A5
  739.99, // F#5
  440.00, // A4
  523.25, // C5
  659.25, // E5
  523.25, // C5
  392.00, // G4
  493.88, // B4
  587.33, // D5
  493.88  // B4
];
let noteIndex = 0;

function initAudio() {
  const btn = document.getElementById("music-toggle-btn");
  if (!btn) return;
  const wave = btn.querySelector(".music-wave");
  wave.classList.add("paused");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isPlaying) {
      startMusic();
    } else {
      pauseMusic();
    }
  });

  // Automatically start music on first user interaction anywhere on the screen!
  const autoStart = () => {
    if (!isPlaying) {
      startMusic();
    }
    window.removeEventListener("click", autoStart);
    window.removeEventListener("touchstart", autoStart);
    window.removeEventListener("scroll", autoStart);
    window.removeEventListener("keydown", autoStart);
  };

  window.addEventListener("click", autoStart);
  window.addEventListener("touchstart", autoStart, { passive: true });
  window.addEventListener("scroll", autoStart, { passive: true });
  window.addEventListener("keydown", autoStart);

  // Attempt direct start
  setTimeout(() => {
    try {
      startMusic();
    } catch (e) {}
  }, 500);
}

function startMusic() {
  const btn = document.getElementById("music-toggle-btn");
  const wave = btn ? btn.querySelector(".music-wave") : null;
  const text = document.getElementById("music-text");

  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  isPlaying = true;
  if (wave) wave.classList.remove("paused");
  if (text) text.textContent = "Playing 💖";

  playMusicBoxNote();
}

function playMusicBoxNote() {
  if (!isPlaying || !audioCtx) return;

  const now = audioCtx.currentTime;
  const freq = melody[noteIndex % melody.length];

  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, now);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(freq * 2.01, now);

  gain1.gain.setValueAtTime(0.001, now);
  gain1.gain.exponentialRampToValueAtTime(0.14, now + 0.04);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

  gain2.gain.setValueAtTime(0.001, now);
  gain2.gain.exponentialRampToValueAtTime(0.04, now + 0.03);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(audioCtx.destination);
  gain2.connect(audioCtx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.9);
  osc2.stop(now + 1.3);

  noteIndex++;
  synthTimer = setTimeout(playMusicBoxNote, 620);
}

function pauseMusic() {
  const btn = document.getElementById("music-toggle-btn");
  const wave = btn ? btn.querySelector(".music-wave") : null;
  const text = document.getElementById("music-text");

  isPlaying = false;
  if (wave) wave.classList.add("paused");
  if (text) text.textContent = "Our Song 🎵";
  if (synthTimer) clearTimeout(synthTimer);
}

// ==================== 5. INTERACTIVE CANDLE & CELEBRATION ====================
let isBlownOut = false;

function blowCandle() {
  if (isBlownOut) {
    launchConfetti();
    return;
  }

  const flame = document.getElementById("flame");
  const candle = document.getElementById("candle");
  const congratsCard = document.getElementById("congrats-card");
  const blowBtn = document.getElementById("blow-btn");
  const blowBtnText = document.getElementById("blow-btn-text");

  if (flame) {
    flame.style.transition = "all 0.5s ease-out";
    flame.style.opacity = "0";
    flame.style.transform = "scale(0.2)";
    setTimeout(() => {
      flame.style.display = "none";
    }, 500);
  }

  if (candle) {
    const smoke = document.createElement("div");
    smoke.className = "smoke-puff";
    candle.appendChild(smoke);
  }

  playCelebrationSound();
  launchConfetti();

  if (congratsCard) {
    congratsCard.classList.remove("hidden");
  }

  if (blowBtn && blowBtnText) {
    blowBtnText.textContent = "Wish Made! ❤️ (Click for more confetti)";
    blowBtn.classList.remove("from-romance-600", "via-rose-500", "to-warmgold-500");
    blowBtn.classList.add("from-emerald-600", "to-teal-500");
  }

  isBlownOut = true;
}

function launchConfetti() {
  if (typeof confetti !== "function") return;

  const duration = 3.5 * 1000;
  const end = Date.now() + duration;
  const colors = ["#f43f5e", "#facc15", "#f472b6", "#fda4af", "#e11d48", "#fff", "#fde047"];

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function playCelebrationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const notesToPlay = [523.25, 659.25, 783.99, 1046.50];

    notesToPlay.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.95);
    });
  } catch (e) {}
}

// ==================== 6. LOVE LETTER UNVEIL ====================
let isLetterOpen = false;

function toggleLetter() {
  const envelopeClosed = document.getElementById("envelope-closed");
  const openedLetter = document.getElementById("opened-letter");

  if (!isLetterOpen) {
    if (envelopeClosed) envelopeClosed.classList.add("hidden");
    if (openedLetter) {
      openedLetter.classList.remove("hidden");
      openedLetter.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    isLetterOpen = true;
  } else {
    if (openedLetter) openedLetter.classList.add("hidden");
    if (envelopeClosed) envelopeClosed.classList.remove("hidden");
    isLetterOpen = false;
  }
}

// ==================== 7. GALLERY CATEGORY FILTER ====================
function filterGallery(category) {
  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".gallery-filter-btn");

  buttons.forEach(btn => {
    btn.classList.remove("active", "bg-romance-600", "text-white");
    btn.classList.add("bg-stone-100", "text-stone-600");
  });

  const activeBtn = Array.from(buttons).find(b =>
    b.getAttribute("onclick").includes(`'${category}'`)
  );
  if (activeBtn) {
    activeBtn.classList.remove("bg-stone-100", "text-stone-600");
    activeBtn.classList.add("active", "bg-romance-600", "text-white");
  }

  items.forEach(item => {
    const itemCat = item.getAttribute("data-category");
    if (category === "all" || itemCat === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// ==================== 8. SECRET EASTER EGG ====================
function triggerEasterEgg() {
  const banner = document.getElementById("easter-egg-banner");
  if (!banner) return;

  banner.classList.remove("hidden");
  banner.classList.add("flex");

  if (typeof confetti === "function") {
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.9, x: 0.9 }
    });
  }

  setTimeout(() => {
    dismissEasterEgg();
  }, 8000);
}

function dismissEasterEgg() {
  const banner = document.getElementById("easter-egg-banner");
  if (banner) {
    banner.classList.add("hidden");
    banner.classList.remove("flex");
  }
}

// ==================== 9. GENTLE CHIME SOUND EFFECTS ====================
function playSoftChime(notes = [523.25, 659.25, 783.99, 1046.50]) {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      
      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.08, now + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.9);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 1.0);
    });
  } catch (e) {}
}

// ==================== 10. INTERACTIVE HUG METER ====================
let hugInterval = null;
let hugProgress = 0;

function initHugMeter() {
  const btn = document.getElementById("hug-heart-btn");
  if (!btn) return;

  const startHold = (e) => {
    e.preventDefault();
    if (hugInterval) clearInterval(hugInterval);
    const circle = document.getElementById("hug-circle-progress");
    const percentText = document.getElementById("hug-percent");
    const statusText = document.getElementById("hug-status");
    const icon = document.getElementById("hug-icon");

    if (icon) icon.classList.add("scale-125");

    hugInterval = setInterval(() => {
      hugProgress += 2.5;
      if (circle) {
        const offset = 276.46 - (276.46 * (hugProgress / 100));
        circle.style.strokeDashoffset = offset;
      }
      if (percentText) percentText.textContent = `${Math.min(100, Math.round(hugProgress))}%`;
      if (statusText) {
        if (hugProgress < 40) statusText.textContent = "Sending warm embrace... 🤗";
        else if (hugProgress < 80) statusText.textContent = "Wrapping you tightly... ❤️";
        else statusText.textContent = "Almost there, hold tight! 💖";
      }

      if (hugProgress >= 100) {
        clearInterval(hugInterval);
        hugInterval = null;
        triggerHugDelivered();
      }
    }, 45);
  };

  const stopHold = () => {
    if (hugInterval) {
      clearInterval(hugInterval);
      hugInterval = null;
    }
    if (hugProgress < 100) {
      hugProgress = 0;
      const circle = document.getElementById("hug-circle-progress");
      const percentText = document.getElementById("hug-percent");
      const statusText = document.getElementById("hug-status");
      const icon = document.getElementById("hug-icon");

      if (circle) circle.style.strokeDashoffset = 276.46;
      if (percentText) percentText.textContent = "Hold Me";
      if (statusText) statusText.textContent = "Hold down for 3 seconds ❤️";
      if (icon) icon.classList.remove("scale-125");
    }
  };

  btn.addEventListener("mousedown", startHold);
  btn.addEventListener("touchstart", startHold, { passive: false });

  window.addEventListener("mouseup", stopHold);
  window.addEventListener("touchend", stopHold);
  window.addEventListener("touchcancel", stopHold);
}

function triggerHugDelivered() {
  playSoftChime([523.25, 659.25, 783.99, 1046.50, 1318.51]);
  
  if (typeof confetti === "function") {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#facc15', '#fef08a']
    });
  }

  const modal = document.getElementById("hug-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeHugModal() {
  const modal = document.getElementById("hug-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  hugProgress = 0;
  const circle = document.getElementById("hug-circle-progress");
  const percentText = document.getElementById("hug-percent");
  const statusText = document.getElementById("hug-status");
  const icon = document.getElementById("hug-icon");

  if (circle) circle.style.strokeDashoffset = 276.46;
  if (percentText) percentText.textContent = "Hold Me";
  if (statusText) statusText.textContent = "Hold down for 3 seconds ❤️";
  if (icon) icon.classList.remove("scale-125");
}

// ==================== 11. SWEET THOUGHTS JAR ====================
const SWEET_THOUGHTS = [
  "Your smile in that blue saree took my breath away the second I saw you.",
  "You have the kindest heart and the cutest, most contagious laugh in the world.",
  "Even on ordinary days, just sitting next to you makes everything feel special.",
  "I'm so lucky to be the one who gets to hold your hand and stand by your side.",
  "You make life feel so light, fun, and full of adventures.",
  "Even when you steal my food, you're the prettiest girl in the room.",
  "Thank you for being my favorite person to talk to, laugh with, and dream with.",
  "You are beautiful inside and out, Prerna — never doubt how special you are.",
  "I fall a little more in love with your sweet soul every single day.",
  "Whenever I look at you, I still get that exact same butterfly feeling.",
  "You are my peace, my best friend, and my whole heart.",
  "Happy Birthday, gorgeous! Today is all about celebrating you 🎉❤️"
];
let currentThoughtIndex = 0;

function drawSweetThought() {
  currentThoughtIndex = (currentThoughtIndex + 1) % SWEET_THOUGHTS.length;
  const textEl = document.getElementById("thought-text");
  const countBadge = document.getElementById("thought-count-badge");
  const jarBtn = document.getElementById("thought-jar-btn");

  if (jarBtn) {
    jarBtn.classList.add("animate-jar-wobble");
    setTimeout(() => jarBtn.classList.remove("animate-jar-wobble"), 400);

    const rect = jarBtn.getBoundingClientRect();
    spawnFloatingMiniHearts(rect.left + rect.width / 2, rect.top + 10, 6);
  }

  playSoftChime([587.33, 739.99, 880.00]);

  if (textEl) {
    textEl.style.opacity = 0;
    setTimeout(() => {
      textEl.textContent = `"${SWEET_THOUGHTS[currentThoughtIndex]}"`;
      textEl.style.opacity = 1;
    }, 150);
  }

  if (countBadge) {
    countBadge.textContent = currentThoughtIndex + 1;
  }
}

// ==================== 12. FLOATING HEARTS & PHOTO INTERACTIONS ====================
const PHOTO_COMPLIMENTS = [
  "1000/10 Prettiest! 😍",
  "My favorite smile 🥰",
  "Breathtaking in saree ✨",
  "Cutest cuddle ever 🧸",
  "My whole heart ❤️",
  "Perfection 🌸",
  "How are you this gorgeous? 🥺",
  "Stunning view 💖",
  "Love this so much! ✨"
];

function initPhotoReactions() {
  const photoSelectors = ["#sides img", "#gallery img", "#together img", ".flip-card"];
  document.querySelectorAll(photoSelectors.join(", ")).forEach(el => {
    el.style.cursor = "pointer";
    el.addEventListener("click", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || (rect.top + rect.height / 3);

      const msg = PHOTO_COMPLIMENTS[Math.floor(Math.random() * PHOTO_COMPLIMENTS.length)];
      spawnFloatingBadge(x, y, msg);
      spawnFloatingMiniHearts(x, y, 7);
      playSoftChime([659.25, 880.00, 1174.66]);
    });
  });
}

function spawnFloatingBadge(x, y, text) {
  const badge = document.createElement("div");
  badge.className = "floating-love-badge bg-white/95 text-romance-600 px-4 py-1.5 rounded-full shadow-lg border border-romance-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 backdrop-blur-sm pointer-events-none";
  badge.style.left = `${x}px`;
  badge.style.top = `${y}px`;
  badge.innerHTML = `<span>✨</span><span>${text}</span>`;
  document.body.appendChild(badge);

  setTimeout(() => badge.remove(), 1800);
}

function spawnFloatingMiniHearts(x, y, count = 6) {
  const hearts = ["❤️", "💖", "💕", "✨", "🌸", "🧸"];
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "floating-mini-heart text-base pointer-events-none";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const tx = (Math.random() - 0.5) * 100;
    const ty = - (40 + Math.random() * 80);
    const tr = (Math.random() - 0.5) * 60;

    span.style.setProperty("--tx", `${tx}px`);
    span.style.setProperty("--ty", `${ty}px`);
    span.style.setProperty("--tr", `${tr}deg`);

    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1250);
  }
}

// ==================== 13. DOUBLE-TAP HEARTS ANYWHERE ====================
function initDoubleTapHearts() {
  let lastTap = 0;
  window.addEventListener("click", (e) => {
    if (e.target && e.target.closest && e.target.closest("button, a, input, select, textarea")) return;

    const now = Date.now();
    if (now - lastTap < 380 && now - lastTap >= 0) {
      const clientX = e.clientX || window.innerWidth / 2;
      const clientY = e.clientY || window.innerHeight / 2;
      spawnFloatingBadge(clientX, clientY - 20, "Love you, Prerna! ❤️");
      spawnFloatingMiniHearts(clientX, clientY, 10);
      playSoftChime([523.25, 783.99, 1046.50]);
      if (typeof confetti === "function") {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight }
        });
      }
    }
    lastTap = now;
  });
}
