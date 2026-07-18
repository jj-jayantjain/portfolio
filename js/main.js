/* ==========================================================================
   JAYANT JAIN — PORTFOLIO — SHARED BEHAVIOR
   Theme (auto/manual + persisted), nav, scroll reveal, counters, timeline
   accordions, contact form, footer year. Loaded on every page.
   ========================================================================== */
(function(){
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){ document.body.classList.add('reduced-motion'); }

  /* ---------- THEME ---------- */
  var THEME_KEY = 'jj-portfolio-theme';
  function applyTheme(t){
    if(t === 'light'){ root.setAttribute('data-theme','light'); }
    else { root.removeAttribute('data-theme'); }
  }
  var saved = null;
  try{ saved = localStorage.getItem(THEME_KEY); }catch(e){}
  if(saved){
    applyTheme(saved);
  } else if(window.matchMedia('(prefers-color-scheme: light)').matches){
    applyTheme('light');
  }
  // Keep in sync with OS-level changes if user hasn't set an explicit preference
  try{
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e){
      var explicit = null;
      try{ explicit = localStorage.getItem(THEME_KEY); }catch(err){}
      if(!explicit){ applyTheme(e.matches ? 'light' : 'dark'); }
    });
  }catch(e){}

  document.addEventListener('DOMContentLoaded', function(){
    var themeToggle = document.getElementById('themeToggle');
    if(themeToggle){
      themeToggle.addEventListener('click', function(){
        var isLight = root.getAttribute('data-theme') === 'light';
        var next = isLight ? 'dark' : 'light';
        applyTheme(next);
        try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
        if(!reduceMotion){
          themeToggle.classList.remove('spin');
          void themeToggle.offsetWidth;
          themeToggle.classList.add('spin');
        }
      });
    }

    /* ---------- HEADER SCROLL STATE ---------- */
    var header = document.getElementById('siteHeader');
    var toTop = document.getElementById('toTop');
    var navResumeBtn = document.getElementById('navResumeBtn');
    function onScroll(){
      var y = window.scrollY || document.documentElement.scrollTop;
      if(header){ header.classList.toggle('scrolled', y > 10); }
      if(toTop){ toTop.classList.toggle('show', y > 600); }
      if(navResumeBtn){ navResumeBtn.style.display = y > 360 ? 'inline-flex' : 'none'; }
    }
    document.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    if(toTop){
      toTop.addEventListener('click', function(){
        window.scrollTo({top:0, behavior: reduceMotion ? 'auto' : 'smooth'});
      });
    }

    /* ---------- MOBILE NAV ---------- */
    var burger = document.getElementById('burgerBtn');
    var mobileNav = document.getElementById('mobileNav');
    if(burger && mobileNav){
      function closeMobileNav(){
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
        burger.innerHTML = '<svg class="icon"><use href="#i-menu"/></svg>';
        document.body.style.overflow = '';
      }
      burger.addEventListener('click', function(){
        var open = mobileNav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.innerHTML = open ? '<svg class="icon"><use href="#i-close"/></svg>' : '<svg class="icon"><use href="#i-menu"/></svg>';
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMobileNav); });
    }

    /* ---------- REVEAL ON SCROLL ---------- */
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if(reduceMotion){
      revealEls.forEach(function(el){ el.classList.add('in'); });
    } else {
      var revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
      revealEls.forEach(function(el){ revealObserver.observe(el); });
    }

    /* ---------- ANIMATED COUNTERS ---------- */
    var counters = document.querySelectorAll('[data-count]');
    function runCounter(el){
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'),10) : 0;
      var dur = 1400;
      var start = null;
      if(reduceMotion){ el.textContent = target.toFixed(decimals); return; }
      function step(ts){
        if(!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if(p < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(step);
    }
    if(counters.length){
      var countObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            runCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, {threshold:0.4});
      counters.forEach(function(el){ countObserver.observe(el); });
    }

    /* ---------- SKILL BARS ---------- */
    var skillCards = document.querySelectorAll('.skill-card[data-pct]');
    if(skillCards.length){
      var skillObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.setProperty('--pct', entry.target.getAttribute('data-pct') + '%');
            entry.target.classList.add('in');
            skillObserver.unobserve(entry.target);
          }
        });
      }, {threshold:0.3});
      skillCards.forEach(function(el){ skillObserver.observe(el); });
    }

    /* ---------- TIMELINE ACCORDION ---------- */
    var items = Array.prototype.slice.call(document.querySelectorAll('.t-item'));
    items.forEach(function(item){
      var head = item.querySelector('.t-head');
      var hint = item.querySelector('.t-toggle-hint');
      function setHint(){
        if(!hint) return;
        var open = item.classList.contains('open');
        hint.childNodes[0].nodeValue = open ? 'Click to collapse ' : 'Click to expand ';
      }
      function toggle(){ item.classList.toggle('open'); setHint(); }
      if(head){ head.addEventListener('click', toggle); }
      if(hint){ hint.addEventListener('click', toggle); }
    });
    if(items.length){
      var itemObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
      }, {rootMargin:'-10% 0px -55% 0px', threshold:0});
      items.forEach(function(i){ itemObserver.observe(i); });
    }

    /* ---------- BLOG CARD TOGGLES ---------- */
    document.querySelectorAll('.blog-toggle').forEach(function(btn){
      btn.addEventListener('click', function(){
        btn.closest('.blog-card').classList.toggle('open');
      });
    });

    /* ---------- CONTACT FORM (mailto) ---------- */
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    var CONTACT_EMAIL = 'hello@jayantjain.dev'; /* PLACEHOLDER — replace with real email */
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        // honeypot spam check
        var hp = document.getElementById('cf-company');
        if(hp && hp.value){ return; }
        var name = document.getElementById('cf-name').value.trim();
        var email = document.getElementById('cf-email').value.trim();
        var reason = document.getElementById('cf-reason') ? document.getElementById('cf-reason').value : '';
        var message = document.getElementById('cf-message').value.trim();
        var subject = encodeURIComponent('Portfolio inquiry from ' + name + (reason ? ' — ' + reason : ''));
        var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
        if(status){ status.classList.add('show'); }
        window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
      });
    }

    /* ---------- SCROLL CUE ---------- */
    var scrollCue = document.getElementById('scrollCue');
    if(scrollCue){
      scrollCue.addEventListener('click', function(){
        var heroEl = document.querySelector('.hero');
        var next = heroEl ? heroEl.nextElementSibling : null;
        var target = next || document.body;
        window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - 20, behavior: reduceMotion ? 'auto' : 'smooth'});
      });
    }

    /* ---------- BUTTON RIPPLE ---------- */
    if(!reduceMotion){
      document.querySelectorAll('.btn').forEach(function(btn){
        btn.addEventListener('click', function(e){
          var rect = btn.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height) * 1.2;
          var span = document.createElement('span');
          span.className = 'ripple';
          span.style.width = span.style.height = size + 'px';
          span.style.left = (e.clientX - rect.left - size/2) + 'px';
          span.style.top = (e.clientY - rect.top - size/2) + 'px';
          btn.appendChild(span);
          setTimeout(function(){ span.remove(); }, 650);
        });
      });
    }

    /* ---------- CURSOR SPOTLIGHT (hero) ---------- */
    var heroSection = document.querySelector('.hero');
    if(heroSection && !reduceMotion && window.matchMedia('(pointer: fine)').matches){
      heroSection.addEventListener('mousemove', function(e){
        var r = heroSection.getBoundingClientRect();
        heroSection.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        heroSection.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    }

    /* ---------- HERO VISUAL PARALLAX TILT ---------- */
    var heroVisual = document.querySelector('.hero-visual .block-panel');
    if(heroVisual && !reduceMotion && window.matchMedia('(pointer: fine)').matches){
      var heroVisualWrap = document.querySelector('.hero-visual');
      heroVisualWrap.addEventListener('mousemove', function(e){
        var r = heroVisualWrap.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        heroVisual.style.transform = 'perspective(900px) rotateY(' + (px * 7) + 'deg) rotateX(' + (py * -7) + 'deg) translateZ(0)';
      });
      heroVisualWrap.addEventListener('mouseleave', function(){
        heroVisual.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      });
    }

    /* ---------- FOOTER YEAR ---------- */
    var yearEls = document.querySelectorAll('.js-year');
    yearEls.forEach(function(el){ el.textContent = new Date().getFullYear(); });

    /* ---------- ACTIVE NAV LINK (current page) ---------- */
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === path || (path === '' && href === 'index.html')){
        a.classList.add('active');
      }
    });
  });
})();
