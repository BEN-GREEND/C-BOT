// JS: GSAP scroll animations + UX microinteractions
document.addEventListener('DOMContentLoaded', () => {
  // GSAP setup
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up for sections
    gsap.utils.toArray('.section, .card, .work-card, .hero-content').forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Horizontal parallax for hero visual
    gsap.to('.device', {
      x: -20,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    });

    // subtle scale on service cards when in center
    gsap.utils.toArray('.service-card').forEach(card => {
      ScrollTrigger.create({
        trigger: card,
        start: 'center center',
        end: 'center center',
        onEnter: () => gsap.to(card, { scale: 1.02, boxShadow: '0 18px 40px rgba(2,6,23,0.08)', duration: 0.45 }),
        onLeaveBack: () => gsap.to(card, { scale: 1, boxShadow: '0 6px 18px rgba(2,6,23,0.06)', duration: 0.35 }),
      });
    });
  }

  // Sticky CTA show/hide on scroll
  const sticky = document.getElementById('sticky-cta');
  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 120 && curr > lastScroll) {
      sticky.style.transform = 'translateY(120%)';
    } else {
      sticky.style.transform = 'translateY(0)';
    }
    lastScroll = curr;
  });
  sticky.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
  });

  // Smart hint cycling
  const hints = ['קביעת תורים','אוטומציה ללקוחות','אתר חדש','שיפור המרות','חיבור לוואטסאפ'];
  const hintEl = document.getElementById('smart-hint');
  if (hintEl) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % hints.length;
      hintEl.textContent = 'רמזים: "' + hints[idx] + '"';
    }, 2800);
  }

  // Form handling (example: POST to Formspree or backend)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      const data = new FormData(form);
      // Replace URL below with your real endpoint (Formspree, Netlify, or your API)
      const endpoint = 'https://formspree.io/f/your-form-id';
      try {
        await fetch(endpoint, { method: 'POST', body: data });
        btn.textContent = 'נשלח — תודה!';
        form.reset();
      } catch (err) {
        console.error(err);
        btn.textContent = 'השליחה נכשלה, נסה שוב';
      } finally {
        setTimeout(() => { btn.disabled = false; btn.textContent = 'שלח עכשיו' }, 2500);
      }
    });
  }

  // Reason form
  const rf = document.getElementById('reason-form');
  if (rf) {
    rf.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('תודה! נרשמת לרשימת הסיבות. (החלף בהטמעה ל-Formspree/MailerLite)');
      rf.reset();
    });
  }
});