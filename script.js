const CLIPS = [
  { file: "yell.mp3",             title: "The Classic",          teaser: "No words. Just rage." },
  { file: "what-you-doing.mp3",   title: "What Are You Doing",   teaser: "Said three times. Each one worse than the last." },
  { file: "nothing.mp3",          title: "Nothing",              teaser: "You're doing nothing. NOTHING." },
  { file: "liar.mp3",             title: "Liar",                 teaser: "You said you were working. She checked." },
  { file: "twitter.mp3",          title: "Twitter Specifically", teaser: "Yes, she knows it's called X now. She doesn't care." },
  { file: "tiktok-scrollers.mp3", title: "TikTok Brain",         teaser: "Diagnosis: brain rot. Prognosis: poor." },
  { file: "no-friends.mp3",       title: "No Friends",           teaser: "Because you're always on the computer." },
  { file: "basement.mp3",         title: "Basement Dweller",     teaser: "You're in the basement. Of HER house. At your age." },
  { file: "cousin.mp3",           title: "Your Cousin",          teaser: "Your cousin just got into med school. And you?" },
  { file: "doctor-sister.mp3",    title: "Your Sister, the Doctor", teaser: "She passed her boards. At your age." },
  { file: "not-doctor.mp3",       title: "Not a Doctor",         teaser: "She raised you for one thing. ONE THING." },
  { file: "mmr.mp3",              title: "Your MMR",             teaser: "She knows your rank. She is not proud." },
  { file: "sacrifice.mp3",        title: "The Sacrifice",        teaser: "She came here with seven dollars. You opened Reddit." },
  { file: "hey-gang.mp3",         title: "Hey, Gang",            teaser: "Folksy opener. Do not trust it." },
  { file: "wildcard.mp3",         title: "Wildcard",             teaser: "Surprise rant. You don't get to know which." },
  { file: "love-mother.mp3",      title: "Love, Mother",         teaser: "She still loves you. Probably." },
];

const audio = document.getElementById("audio-player");
const grid = document.getElementById("clip-grid");
let currentCard = null;

function stopCurrent() {
  if (!currentCard) return;
  currentCard.classList.remove("playing");
  currentCard.querySelector(".play-icon").textContent = "▶";
  currentCard = null;
}

function playClip(card, file) {
  if (currentCard === card) {
    audio.pause();
    stopCurrent();
    return;
  }
  stopCurrent();
  audio.src = `clips/${file}`;
  audio.play().catch(() => {});
  card.classList.add("playing");
  card.querySelector(".play-icon").textContent = "■";
  currentCard = card;
}

audio.addEventListener("ended", stopCurrent);

CLIPS.forEach((clip) => {
  const card = document.createElement("button");
  card.className = "clip-card";
  card.type = "button";
  card.dataset.file = clip.file;
  card.innerHTML = `
    <div class="play-row">
      <span class="play-icon">▶</span>
      <span>Play clip</span>
    </div>
    <div class="clip-title">${clip.title}</div>
    <p class="clip-teaser">${clip.teaser}</p>
  `;
  card.addEventListener("click", () => playClip(card, clip.file));
  grid.appendChild(card);
});

document.getElementById("hero-play").addEventListener("click", () => {
  const cards = grid.querySelectorAll(".clip-card");
  if (!cards.length) return;
  const random = cards[Math.floor(Math.random() * cards.length)];
  random.scrollIntoView({ behavior: "smooth", block: "center" });
  random.click();
});

// TODO: wire to a real backend (Buttondown / Vercel function / etc.) before launch.
// For now this only shows a success message — submitted emails are not stored anywhere.
const form = document.getElementById("signup-form");
const successMsg = document.getElementById("signup-success");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!email || !email.includes("@")) {
    form.email.focus();
    return;
  }
  form.hidden = true;
  successMsg.hidden = false;
});

document.getElementById("year").textContent = new Date().getFullYear();
