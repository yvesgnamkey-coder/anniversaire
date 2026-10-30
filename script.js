/* ============================================================
   script.js — Logique du site (ne rien modifier ici normalement)
   Dépend de data.js (CONFIG, PHOTOS, MESSAGES, REACTIONS, QUESTIONS)
   ============================================================ */

/* ---------- Utilitaires ---------- */
const $ = (id) => document.getElementById(id);

function safeStorageGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) { return fallback; }
}
function safeStorageSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignoré */ }
}

/* ---------- 1. ACCUEIL ---------- */
function initHero() {
  $("heroTitle").textContent = "Joyeux anniversaire, " + CONFIG.prenom + " 🎂";
  $("heroSub").textContent = CONFIG.sousTitre;
  $("footerText").textContent = "Fait avec ❤️ par " + CONFIG.auteur;
}

/* ---------- Cœurs flottants ---------- */
function startFloatingHearts() {
  const container = $("heartsBg");
  const symbols = ["❤️", "💖", "💕", "💗", "🌸"];
  setInterval(() => {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 14 + Math.random() * 22 + "px";
    h.style.animationDuration = 8 + Math.random() * 8 + "s";
    container.appendChild(h);
    setTimeout(() => h.remove(), 16000);
  }, 900);
}

/* ---------- 2. PHOTOS ---------- */
function initGallery() {
  const gallery = $("gallery");
  PHOTOS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "photo-card";

    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.legende;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
      const fb = document.createElement("span");
      fb.className = "photo-fallback";
      fb.textContent = "💖";
      card.insertBefore(fb, card.firstChild);
    });

    const cap = document.createElement("div");
    cap.className = "caption";
    cap.textContent = p.legende;

    card.append(img, cap);
    card.addEventListener("click", () => openLightbox(p));
    gallery.appendChild(card);
  });

  $("lightboxClose").addEventListener("click", closeLightbox);
  $("lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
}
function openLightbox(p) {
  $("lightboxImg").src = p.src;
  $("lightboxImg").alt = p.legende;
  $("lightboxCaption").textContent = p.legende;
  $("lightbox").hidden = false;
}
function closeLightbox() { $("lightbox").hidden = true; }

/* ---------- 3. MESSAGES + RÉACTIONS ---------- */
const STORAGE_KEY = "anniv_reactions_v1";
let reactionState = safeStorageGet(STORAGE_KEY, {}); // { "0": ["❤️","😍"], ... }

function initMessages() {
  const list = $("messagesList");

  MESSAGES.forEach((m, index) => {
    const card = document.createElement("article");
    card.className = "message-card";

    const title = document.createElement("h3");
    title.textContent = m.titre;
    const text = document.createElement("p");
    text.textContent = m.texte;

    const reactions = document.createElement("div");
    reactions.className = "reactions";

    REACTIONS.forEach((emoji) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "reaction-btn";
      btn.setAttribute("aria-label", "Réagir avec " + emoji);

      const count = document.createElement("span");
      count.className = "count";

      const refresh = () => {
        const active = (reactionState[index] || []).includes(emoji);
        btn.classList.toggle("active", active);
        count.textContent = active ? "1" : "";
        btn.replaceChildren(document.createTextNode(emoji), count);
      };

      btn.addEventListener("click", () => {
        const current = reactionState[index] || [];
        reactionState[index] = current.includes(emoji)
          ? current.filter((e) => e !== emoji)
          : [...current, emoji];
        safeStorageSet(STORAGE_KEY, reactionState);
        refresh();
        btn.classList.remove("pop");
        void btn.offsetWidth; // relance l'animation
        btn.classList.add("pop");
        if (reactionState[index].includes(emoji)) burstHearts(btn);
      });

      refresh();
      reactions.appendChild(btn);
    });

    card.append(title, text, reactions);
    list.appendChild(card);
  });

  // Apparition au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
  }, { threshold: 0.2 });
  document.querySelectorAll(".message-card").forEach((c) => observer.observe(c));
}

/* Petit jaillissement de cœurs depuis un élément */
function burstHearts(el) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("span");
    s.className = "confetti";
    s.textContent = "❤️";
    s.style.left = r.left + r.width / 2 + (Math.random() * 60 - 30) + "px";
    s.style.top = r.top + "px";
    s.style.fontSize = "16px";
    s.style.animationDuration = 1 + Math.random() + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2200);
  }
}

/* ---------- 4. LA QUESTION ---------- */
let attempts = 0;

function initQuestion() {
  const form = $("loveForm");
  const btnYes = $("btnYes");
  const btnNo = $("btnNo");
  const questionText = $("questionText");

  questionText.textContent = QUESTIONS[0];

  // Le bouton "Non" s'enfuit au survol / toucher
  const dodge = () => {
    const x = (Math.random() - 0.5) * 220;
    const y = (Math.random() - 0.5) * 120;
    btnNo.style.transform = "translate(" + x + "px," + y + "px) scale(" + Math.max(0.5, 1 - attempts * 0.07) + ")";
  };
  btnNo.addEventListener("mouseenter", () => { if (attempts >= 2) dodge(); });
  btnNo.addEventListener("touchstart", (e) => { if (attempts >= 2) { e.preventDefault(); dodge(); attemptNo(); } }, { passive: false });

  btnNo.addEventListener("click", attemptNo);

  function attemptNo() {
    attempts++;
    // La question change, puis la dernière phrase se répète indéfiniment
    questionText.textContent = QUESTIONS[Math.min(attempts, QUESTIONS.length - 1)];
    // "Oui" grossit, "Non" rétrécit
    btnYes.style.transform = "scale(" + Math.min(1 + attempts * 0.18, 2.4) + ")";
    if (attempts >= 2) dodge();
  }

  // Seul "Oui" peut valider le formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.hidden = true;
    const answer = $("loveAnswer");
    $("loveAnswerSub").textContent = CONFIG.reponseFinale;
    answer.hidden = false;
    launchConfetti();
  });
}

function launchConfetti() {
  const symbols = ["❤️", "💖", "🎉", "🎂", "💕", "✨", "🎈"];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const c = document.createElement("span");
      c.className = "confetti";
      c.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.fontSize = 18 + Math.random() * 22 + "px";
      c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }, i * 40);
  }
}

/* ---------- COMPTE À REBOURS ---------- */
function initCountdown() {
  const box = $("countdown");
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(CONFIG.dateAnniversaire || "");
  if (!m) { box.hidden = true; return; }
  const month = Number(m[1]) - 1;
  const day = Number(m[2]);

  const tick = () => {
    const now = new Date();
    if (now.getMonth() === month && now.getDate() === day) {
      box.innerHTML = '<span class="cd-today">🎉 C\'est aujourd\'hui, ton grand jour ! 🎉</span>';
      return;
    }
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let target = new Date(now.getFullYear(), month, day);
    if (target < todayStart) target = new Date(now.getFullYear() + 1, month, day);

    const diff = target - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const mi = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const unit = (n, label) => '<div class="cd-unit"><span class="cd-num">' + n + '</span><span class="cd-label">' + label + '</span></div>';
    box.innerHTML = unit(d, "jours") + unit(h, "heures") + unit(mi, "min") + unit(s, "sec");
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- POURQUOI JE T'AIME (cartes à retourner) ---------- */
function initReasons() {
  const grid = $("reasonsGrid");
  RAISONS.forEach((texte, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "flip-card";
    card.setAttribute("aria-label", "Raison numéro " + (i + 1) + " : retourner la carte");

    const inner = document.createElement("div");
    inner.className = "flip-inner";

    const front = document.createElement("div");
    front.className = "flip-face flip-front";
    const heart = document.createElement("span");
    heart.className = "flip-heart";
    heart.textContent = "💗";
    const label = document.createElement("span");
    label.textContent = "Raison n°" + (i + 1);
    front.append(heart, label);

    const back = document.createElement("div");
    back.className = "flip-face flip-back";
    back.textContent = texte;

    inner.append(front, back);
    card.appendChild(inner);
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    grid.appendChild(card);
  });
}

/* ---------- MUSIQUE ---------- */
let audio = null;
let musicOn = false;

function initMusic() {
  const btn = $("musicBtn");
  if (!CONFIG.musique) { btn.hidden = true; return; }
  audio = new Audio(CONFIG.musique);
  audio.loop = true;
  audio.volume = 0.5;
  audio.addEventListener("error", () => { btn.hidden = true; audio = null; });
  btn.addEventListener("click", () => setMusic(!musicOn));
}

function setMusic(on) {
  const btn = $("musicBtn");
  if (!audio) return;
  if (on) {
    audio.play().then(() => { musicOn = true; btn.textContent = "🔊"; }).catch(() => { musicOn = false; btn.textContent = "🎵"; });
  } else {
    audio.pause();
    musicOn = false;
    btn.textContent = "🔇";
  }
}

/* ---------- MOT DE PASSE ---------- */
function initLock(onUnlock) {
  const lock = $("lockScreen");
  if (!CONFIG.motDePasse) { lock.hidden = true; return; }

  document.body.classList.add("locked");
  $("lockHint").textContent = CONFIG.indiceMotDePasse || "";

  $("lockForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const saisie = $("lockInput").value.trim().toLowerCase();
    if (saisie === CONFIG.motDePasse.trim().toLowerCase()) {
      lock.hidden = true;
      document.body.classList.remove("locked");
      onUnlock(); // le clic sert d'autorisation pour lancer la musique
    } else {
      $("lockError").textContent = "Ce n'est pas ça… réessaie 💭";
      lock.classList.remove("shake");
      void lock.offsetWidth;
      lock.classList.add("shake");
      $("lockInput").select();
    }
  });
}

/* ---------- Démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  startFloatingHearts();
  initCountdown();
  initGallery();
  initMessages();
  initReasons();
  initQuestion();
  initMusic();
  initLock(() => setMusic(true));
});
