/* --------  Helpers  -------- */
const randHex = () =>
  "#" + [...Array(6)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")
          .toUpperCase();

const paletteEl   = document.getElementById("palette");
const toastEl     = document.getElementById("toast");
const genBtn      = document.getElementById("generate-btn");
const navLinksBox = document.getElementById("nav-links");
const toggleBtn   = document.getElementById("toggle");

/* --------  Palette generation  -------- */
function generatePalette() {
  paletteEl.innerHTML = "";           // clear previous colors
  for (let i = 0; i < 5; i++) {
    const hex = randHex();
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.background = hex;
    swatch.innerHTML = `<span class="hex-label">${hex}</span>`;
    swatch.addEventListener("click", () => copyHex(hex));
    paletteEl.appendChild(swatch);
  }
}

/* --------  Copy to clipboard & toast  -------- */
async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex);
    showToast(`Copied ${hex}`);
  } catch (err) {
    showToast("Copy failed 🤕");
  }
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.style.opacity = 1;
  toastEl.style.transform = "translate(-50%, 0)";
  setTimeout(() => {
    toastEl.style.opacity = 0;
    toastEl.style.transform = "translate(-50%, 15px)";
  }, 1600);
}

/* --------  Smooth scrolling for nav links  -------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    navLinksBox.classList.remove("open");
    document.querySelector(link.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
  });
});

/* --------  Mobile nav toggle  -------- */
toggleBtn.addEventListener("click", () =>
  navLinksBox.classList.toggle("open")
);

/* --------  Keyboard shortcut (spacebar)  -------- */
window.addEventListener("keydown", e => {
  if (e.code === "Space" && document.activeElement === document.body) {
    e.preventDefault();
    generatePalette();
  }
});

/* --------  Init  -------- */
generatePalette();
genBtn.addEventListener("click", generatePalette);
