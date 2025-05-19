
document.addEventListener('DOMContentLoaded', () => {
  initializeParticles();
  initializeIntroScreen();
  initializeMainContent();
  initializeEndingScreen();
});

// --- PARTICLES ---
function initializeParticles() {
  const container = document.querySelector('.particles-container');
  for (let i = 0; i < 50; i++) {
    createParticle(container);
  }
}
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';
  container.appendChild(particle);
}

// --- INTRO SCREEN ---
function initializeIntroScreen() {
  const elements = document.querySelectorAll('#intro-screen .element');
  const startBtn = document.getElementById('start-btn');
  const audio = document.getElementById('birthday-audio');

  elements.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.transform = 'scale(1.2) rotate(10deg)';
      createSparkle(element);
    });
    element.addEventListener('mouseout', () => {
      element.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  startBtn.addEventListener('click', () => {
    audio.play().catch(e => console.log('Audio play failed:', e));
    createConfetti();
    animateElements(elements);
    setTimeout(() => {
      transitionToMain();
    }, 1000);
  });
}

// --- MAIN CONTENT (SLIDESHOW) ---
function initializeMainContent() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let slideshowInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 3000);
  }

  document.querySelector('.next-btn').addEventListener('click', () => {
    clearInterval(slideshowInterval);
    nextSlide();
    startSlideshow();
  });
  document.querySelector('.prev-btn').addEventListener('click', () => {
    clearInterval(slideshowInterval);
    prevSlide();
    startSlideshow();
  });

  if (slides.length > 0) {
    showSlide(0);
    startSlideshow();
  }

  // Sparkle on message card hover
  const messageCard = document.querySelector('.message-card');
  messageCard.addEventListener('mouseover', () => {
    createSparkle(messageCard);
  });

  // Music mute toggle
  const muteToggle = document.getElementById('mute-toggle');
  muteToggle.addEventListener('click', () => {
    const audio = document.getElementById('birthday-audio');
    audio.muted = !audio.muted;
    muteToggle.textContent = audio.muted ? '🔇' : '🔊';
  });

  // Sparkle on mouse move
  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
      createSparkle(null, e.clientX, e.clientY);
    }
  });

  // Show ending screen after last slide
  slides[slides.length - 1].addEventListener('transitionend', () => {
    if (currentSlide === slides.length - 1) {
      setTimeout(showEndingScreen, 2000);
    }
  });
}

// --- ENDING SCREEN ---
function initializeEndingScreen() {
  const elements = document.querySelectorAll('#ending-screen .element');
  const restartBtn = document.getElementById('restart-btn');

  elements.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.style.transform = 'scale(1.2) rotate(10deg)';
      createSparkle(element);
    });
    element.addEventListener('mouseout', () => {
      element.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  restartBtn.addEventListener('click', () => {
    createConfetti();
    setTimeout(() => {
      transitionToIntro();
    }, 1000);
  });
}

// --- EFFECTS ---
function createSparkle(element, x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = '✨';

  if (element) {
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + rect.width / 2) + 'px';
    sparkle.style.top = (rect.top + rect.height / 2) + 'px';
  } else {
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
  }

  sparkle.style.position = 'fixed';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = 2000;
  sparkle.style.fontSize = '1.5rem';
  sparkle.style.opacity = 1;
  sparkle.style.transition = 'opacity 1s, transform 1s';
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.style.opacity = 0;
    sparkle.style.transform = 'scale(2)';
  }, 10);
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

function createConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff9a9e', '#fad0c4', '#ffffff']
    });
  }
}

function animateElements(elements) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.transform = 'scale(1.5) rotate(20deg)';
      element.style.opacity = '0';
    }, index * 100);
  });
}

// --- SCREEN TRANSITIONS ---
function transitionToMain() {
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');
  introScreen.style.opacity = '0';
  introScreen.style.transform = 'scale(1.2)';
  setTimeout(() => {
    introScreen.style.display = 'none';
    mainContent.style.display = 'block';
    requestAnimationFrame(() => {
      mainContent.style.opacity = '1';
    });
  }, 500);
}

function transitionToIntro() {
  const endingScreen = document.getElementById('ending-screen');
  const introScreen = document.getElementById('intro-screen');
  endingScreen.style.opacity = '0';
  endingScreen.style.transform = 'scale(1.2)';
  setTimeout(() => {
    endingScreen.style.display = 'none';
    introScreen.style.display = 'flex';
    requestAnimationFrame(() => {
      introScreen.style.opacity = '1';
    });
  }, 500);
}

function showEndingScreen() {
  const mainContent = document.getElementById('main-content');
  const endingScreen = document.getElementById('ending-screen');
  mainContent.style.opacity = '0';
  mainContent.style.transform = 'scale(0.9)';
  setTimeout(() => {
    mainContent.style.display = 'none';
    endingScreen.style.display = 'flex';
    requestAnimationFrame(() => {
      endingScreen.style.opacity = '1';
    });
  }, 500);
}

