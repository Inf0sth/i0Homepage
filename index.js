var iColor = 0;
const colores = ["#2fff8d","#00d9ff","#74fff8","#4e95f1", "#0096b1", "#87adff"];
const words = ["Devs", "Analysts", "Red team", "Blue team", "Tiers", "Hackers", "Explorers"];
const dynamicWord = document.getElementById("dynamic-word");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let pauseTime = 1500;

function typeEffect() {
  const currentWord = words[wordIndex];
  const currentText = dynamicWord.textContent;
  const myElement = document.getElementById("dynamic-word");

  if (isDeleting) {
    dynamicWord.textContent = currentWord.substring(0, charIndex--);
  } else {
    iColor++;
    dynamicWord.textContent = currentWord.substring(0, charIndex++);
    myElement.style.color = colores[iColor];
    if (iColor >= colores.length) {
      iColor = 0;
    }
  }

  if (!isDeleting && charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, pauseTime);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : typingSpeed);
  }
}

typeEffect();


const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();

    const enlaces = Array.from(card.querySelectorAll('a'));
    const matchEnlaces = enlaces.some(a => a.textContent.toLowerCase().includes(query));

    const match = title.includes(query) || matchEnlaces;
    card.style.display = match ? 'block' : 'none';
  });
});



searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query !== '') {
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
    searchInput.value = "";
  }
});
