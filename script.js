/* ============================================================
   FOR HEAVEN — ROMANTIC MINI WEBSITE
   Main JavaScript
   
   Handles:
   - Screen transitions (fade between sections)
   - Floating particles (hearts, petals, sparkles)
   - Flower bloom animation on screen 2
   - Typing effect for reveal text
   - Music toggle
   ============================================================ */

// ====== WAIT FOR DOM TO LOAD ======
document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // CONFIGURATION — Easy to customize
  // ============================================================

  // EDIT THIS: The text that types out on screen 2
  const TYPING_TEXT = "There's something I wanted to tell you...";

  // Particle symbols — hearts, petals, sparkles, stars
  const PARTICLE_SYMBOLS = [
    '♡', '♥', '❤', '💕',           // hearts
    '🌸', '🌷', '🌹',              // flowers
    '✨', '⭐', '·',                // sparkles / stars
    '❀', '✿', '🩷'                 // more florals
  ];

  // Flower emojis for the bloom garden on screen 2
  const BLOOM_FLOWERS = ['🌸', '🌷', '🌹', '🌺', '💮', '🏵️', '🌸', '🌷', '🌹'];

  // How many floating particles to generate
  const PARTICLE_COUNT = 35;

  // Typing speed in milliseconds per character
  const TYPING_SPEED = 55;


  // ============================================================
  // ELEMENT REFERENCES
  // ============================================================

  const screens = document.querySelectorAll('.screen');
  const particlesContainer = document.getElementById('particles-container');
  const bloomGarden = document.getElementById('bloom-garden');
  const typingElement = document.getElementById('typing-text');
  const btnOpen = document.getElementById('btn-open');
  const btnContinue = document.getElementById('btn-continue');
  const btnMore = document.getElementById('btn-more');
  const btnFinal = document.getElementById('btn-final');
  const btnMusic = document.getElementById('btn-music');
  const bgMusic = document.getElementById('bg-music');
  const musicIcon = document.getElementById('music-icon');

  // Track which screen is currently showing (1-indexed)
  let currentScreen = 1;
  let musicPlaying = false;


  // ============================================================
  // SCREEN TRANSITION SYSTEM
  // Smoothly fades out the current screen and fades in the next
  // ============================================================

  function goToScreen(screenNumber) {
    // Find the currently active screen and deactivate it
    const current = document.getElementById('screen-' + currentScreen);
    if (current) {
      current.classList.remove('active');
    }

    // Small delay so the fade-out can start before fade-in
    setTimeout(function () {
      const next = document.getElementById('screen-' + screenNumber);
      if (next) {
        next.classList.add('active');
        currentScreen = screenNumber;

        // Trigger special animations for specific screens
        if (screenNumber === 2) {
          startScreen2Animations();
        } else if (screenNumber === 3) {
          startScreen3Animations();
        }
      }
    }, 500); // half-second gap between screens
  }


  // ============================================================
  // BUTTON CLICK HANDLERS
  // Wire up each button to navigate to the next screen
  // ============================================================

  // Screen 1 → Screen 2
  if (btnOpen) {
    btnOpen.addEventListener('click', function () {
      goToScreen(2);
    });
  }

  // Screen 2 → Screen 3
  if (btnContinue) {
    btnContinue.addEventListener('click', function () {
      goToScreen(3);
    });
  }

  // Screen 3 → Screen 4
  if (btnMore) {
    btnMore.addEventListener('click', function () {
      goToScreen(4);
    });
  }

  // Screen 4 → Screen 5
  if (btnFinal) {
    btnFinal.addEventListener('click', function () {
      goToScreen(5);
    });
  }


  // ============================================================
  // SCREEN 2 ANIMATIONS
  // 1. Flowers bloom in one by one
  // 2. Typing effect for the message
  // 3. Continue button fades in after typing
  // ============================================================

  function startScreen2Animations() {
    // Clear any previous content (in case user navigates back somehow)
    bloomGarden.innerHTML = '';
    typingElement.textContent = '';
    typingElement.classList.remove('typing');
    btnContinue.style.opacity = '0';
    btnContinue.style.pointerEvents = 'none';

    // Step 1: Bloom flowers one by one
    BLOOM_FLOWERS.forEach(function (flower, index) {
      setTimeout(function () {
        var flowerSpan = document.createElement('span');
        flowerSpan.className = 'bloom-flower';
        flowerSpan.textContent = flower;
        flowerSpan.style.animationDelay = '0s';
        bloomGarden.appendChild(flowerSpan);
      }, index * 200); // each flower appears 200ms after the last
    });

    // Step 2: Start typing effect after flowers finish blooming
    var typingDelay = BLOOM_FLOWERS.length * 200 + 400;
    setTimeout(function () {
      typeText(TYPING_TEXT, typingElement, TYPING_SPEED, function () {
        // Step 3: Show the Continue button after typing finishes
        setTimeout(function () {
          btnContinue.style.transition = 'opacity 0.8s ease';
          btnContinue.style.opacity = '1';
          btnContinue.style.pointerEvents = 'auto';
        }, 500);
      });
    }, typingDelay);
  }


  // ============================================================
  // SCREEN 3 ANIMATIONS (MWAAHH kiss effect after 3.5s)
  // ============================================================

  var muahTimer = null;

  function startScreen3Animations() {
    var muahTarget = document.getElementById('muah-target');
    if (!muahTarget) return;

    // Reset state if visited again
    muahTarget.classList.remove('pop-kiss');
    if (muahTimer) clearTimeout(muahTimer);

    // After 3.5 seconds (estimated reading time for the top lines), trigger kiss animation
    muahTimer = setTimeout(function () {
      muahTarget.classList.add('pop-kiss');
      spawnKissBurst(muahTarget);
    }, 3500);
  }

  function spawnKissBurst(targetElement) {
    if (!targetElement) return;
    var kissEmojis = ['💋', '💕', '😘', '🌸'];

    for (var i = 0; i < 4; i++) {
      (function (idx) {
        setTimeout(function () {
          var kiss = document.createElement('span');
          kiss.className = 'floating-kiss';
          kiss.textContent = kissEmojis[idx % kissEmojis.length];

          var kx = (Math.random() - 0.5) * 60;
          var kr = (Math.random() - 0.5) * 40;
          kiss.style.setProperty('--kx', kx + 'px');
          kiss.style.setProperty('--kr', kr + 'deg');
          kiss.style.left = (targetElement.offsetLeft + targetElement.offsetWidth / 2 + (Math.random() - 0.5) * 20) + 'px';
          kiss.style.top = (targetElement.offsetTop - 8) + 'px';

          if (targetElement.parentElement) {
            targetElement.parentElement.style.position = 'relative';
            targetElement.parentElement.appendChild(kiss);
          }

          setTimeout(function () {
            if (kiss && kiss.parentNode) {
              kiss.parentNode.removeChild(kiss);
            }
          }, 1900);
        }, idx * 240);
      })(i);
    }
  }

  // Also allow tapping/clicking MWAAHH to trigger another burst anytime!
  var muahTarget = document.getElementById('muah-target');
  if (muahTarget) {
    muahTarget.addEventListener('click', function () {
      muahTarget.classList.add('pop-kiss');
      spawnKissBurst(muahTarget);
    });
  }

  // Interactive tap animation for secret future children card
  var secretFutureCard = document.getElementById('secret-future-card');
  if (secretFutureCard) {
    secretFutureCard.addEventListener('click', function () {
      secretFutureCard.style.transform = 'scale(1.04)';
      setTimeout(function () {
        secretFutureCard.style.transform = '';
      }, 250);
    });
  }


  // ============================================================
  // TYPING EFFECT
  // Types out text one character at a time with a blinking cursor
  // ============================================================

  function typeText(text, element, speed, onComplete) {
    var index = 0;
    element.textContent = '';
    element.classList.add('typing');

    var interval = setInterval(function () {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        // Remove cursor after a moment
        setTimeout(function () {
          element.classList.remove('typing');
          if (onComplete) onComplete();
        }, 600);
      }
    }, speed);
  }


  // ============================================================
  // FLOATING PARTICLES
  // Creates hearts, petals, and sparkles that float upward
  // continuously across the entire page
  // ============================================================

  function createParticles() {
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      createSingleParticle();
    }
  }

  function createSingleParticle() {
    var particle = document.createElement('span');
    particle.className = 'particle';

    // Pick a random symbol
    var symbol = PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)];
    particle.textContent = symbol;

    // Random horizontal position
    var xPos = Math.random() * 100;

    // Random animation duration (5–14 seconds)
    var duration = 5 + Math.random() * 9;

    // Random start delay so they don't all appear at once
    var delay = Math.random() * duration;

    // Random rotation amount
    var rotation = Math.random() * 720 - 360;

    // Random size variation
    var size = 0.7 + Math.random() * 1.2;

    // Apply styles via CSS custom properties
    particle.style.setProperty('--x', xPos + '%');
    particle.style.setProperty('--duration', duration + 's');
    particle.style.setProperty('--delay', delay + 's');
    particle.style.setProperty('--rotation', rotation + 'deg');
    particle.style.fontSize = size + 'rem';

    // Slight horizontal offset for variety
    particle.style.filter = 'blur(' + (Math.random() > 0.7 ? '1px' : '0px') + ')';

    particlesContainer.appendChild(particle);
  }


  // ============================================================
  // MUSIC TOGGLE
  // Plays/pauses background music when the button is clicked
  // Audio does NOT autoplay — only plays on user interaction
  // ============================================================

  if (btnMusic && bgMusic) {
    btnMusic.addEventListener('click', function () {
      if (musicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🎵';
        btnMusic.classList.remove('playing');
        musicPlaying = false;
      } else {
        bgMusic.play().then(function () {
          musicIcon.textContent = '🎶';
          btnMusic.classList.add('playing');
          musicPlaying = true;
        }).catch(function (err) {
          // If no audio file is found, silently handle the error
          console.log('Music file not found or could not play:', err.message);
        });
      }
    });
  }


  // ============================================================
  // INITIALIZE
  // Start the particles floating and prepare the page
  // ============================================================

  createParticles();

  // Add a subtle parallax-like movement to particles on mouse move (desktop)
  document.addEventListener('mousemove', function (e) {
    var moveX = (e.clientX / window.innerWidth - 0.5) * 8;
    var moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    particlesContainer.style.transform =
      'translate(' + moveX + 'px, ' + moveY + 'px)';
  });

}); // end DOMContentLoaded
