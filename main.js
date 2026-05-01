document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const hoverables = document.querySelectorAll('a, button, .hoverable, .nav-hamburger');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
      });
    });
  }

  // 2. Navbar Scroll & Hamburger Menu
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 3. Hero Text Staggered Word Reveal (Fixed spacing issue)
  const heroHeadline = document.getElementById('hero-headline');
  if (heroHeadline) {
    const text = heroHeadline.innerText;
    heroHeadline.innerHTML = '';
    const words = text.split(' ');
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      
      // Highlight "Dominate."
      if (word.includes('Dominate')) {
        span.classList.add('text-orange');
      }
      
      // Use standard non-breaking space after word to prevent collapsing
      span.innerHTML = word + '&nbsp;';
      span.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px)';
      
      heroHeadline.appendChild(span);
      
      // Trigger reflow
      void span.offsetWidth;
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // 4. Bento Grid Magnetic Glow Tracking
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 5. Particles.js Configuration for Fire Particles
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#F57C00", "#FF3D00", "#FFB347"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 5, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 1.5, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "bubble" },
          "onclick": { "enable": false },
          "resize": true
        },
        "modes": { "bubble": { "distance": 250, "size": 8, "duration": 2, "opacity": 1, "speed": 3 } }
      },
      "retina_detect": true
    });
  }

  // 6. Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Counter Animation
        if (entry.target.classList.contains('stats-grid')) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target;
              }
            };
            
            updateCounter();
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-right, .stats-grid, .bento-grid, .portfolio-item, .disclaimer-box').forEach(el => {
    observer.observe(el);
  });
  // 7. FAQ Accordion Logic
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;
      parent.classList.toggle('active');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item').forEach(child => {
        if (child !== parent) child.classList.remove('active');
      });
    });
  });
});
