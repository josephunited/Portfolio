/* ==========================================
   Joseph Benedict — Portfolio JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // CURSOR GLOW ANIMATION
  // ==========================================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(-50%, -50%, 0)`;
      });
    });
  }

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==========================================
  // ACTIVE NAV LINK
  // ==========================================
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const isOpen = navLinksContainer.classList.contains('open');
    mobileMenuBtn.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // ANIMATED SKILL BARS
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ==========================================
  // COUNTER ANIMATION (Hero Stats)
  // ==========================================
  function animateCounter(element, target, suffix = '+') {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      element.textContent = current + suffix;
    }, 40);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(document.getElementById('statProjects'), 8, '+');
          animateCounter(document.getElementById('statSkills'), 8, '');
          animateCounter(document.getElementById('statEvents'), 10, '+');
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ==========================================
  // GALLERY LIGHTBOX
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==========================================
  // CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 3000);
  });

  // ==========================================
  // SMOOTH SCROLL for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // TILT EFFECT on project cards
  // ==========================================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================
  // TYPING EFFECT for tagline (optional polish)
  // ==========================================
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--accent-blue)';
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 30);
      } else {
        // Remove cursor after typing finishes
        setTimeout(() => {
          tagline.style.borderRight = 'none';
        }, 1500);
      }
    }

    // Start typing after hero animation plays
    setTimeout(typeChar, 800);
  }

  // ==========================================
  // VIRTUAL PIANO SYNTH
  // ==========================================
  const pianoKeys = document.querySelectorAll('.white-key, .black-key');
  if (pianoKeys.length > 0) {
    let audioCtx = null;

    const playNote = (frequency) => {
      // Resume or create AudioContext on user interaction
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'triangle'; // Warm, soft vintage synth tone
      oscillator.frequency.value = frequency;
      
      // ADSR Envelope
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05); // Attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8); // Decay/Release
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.85);
    };

    pianoKeys.forEach(key => {
      const freq = parseFloat(key.getAttribute('data-note'));
      
      key.addEventListener('mousedown', (e) => {
        e.preventDefault();
        playNote(freq);
        key.classList.add('active');
      });
      
      key.addEventListener('mouseup', () => key.classList.remove('active'));
      key.addEventListener('mouseleave', () => key.classList.remove('active'));
      
      // Touch support for mobile devices
      key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playNote(freq);
        key.classList.add('active');
      });
      key.addEventListener('touchend', () => key.classList.remove('active'));
    });
  }

  // ==========================================
  // FLOATING MUSIC NOTES BACKGROUND
  // ==========================================
  const notesBg = document.createElement('div');
  notesBg.className = 'music-notes-bg';
  notesBg.setAttribute('aria-hidden', 'true');
  document.body.appendChild(notesBg);

  const noteSymbols = ['♪', '♫', '♬', '♩', '♭', '♯', '𝄞', '𝄢'];
  const spawnNote = () => {
    const note = document.createElement('div');
    note.className = 'floating-note';
    note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
    note.style.left = Math.random() * 95 + 'vw';
    note.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
    note.style.animationDuration = (Math.random() * 12 + 10) + 's';
    note.style.opacity = Math.random() * 0.05 + 0.02;
    
    notesBg.appendChild(note);
    
    // Remove note element once animation is done
    setTimeout(() => {
      note.remove();
    }, 22000);
  };

  // Spawn notes at a steady interval
  setInterval(spawnNote, 2800);
  
  // Seed initial notes
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnNote, Math.random() * 6000);
  }
});
