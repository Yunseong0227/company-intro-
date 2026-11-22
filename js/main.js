(function () {
  // Header border on scroll
  var header = document.querySelector('.header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  var setNav = function (open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };
  toggle.addEventListener('click', function () {
    setNav(!nav.classList.contains('is-open'));
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setNav(false); });
  });

  // Reveal on scroll
  var revealTargets = document.querySelectorAll(
    '.section__head, .feature, .product, .work, .step, .area__copy, .area__group, .faq details, .contact__info, .form'
  );
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var start = null;
    var duration = 1200;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });

    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countIo.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { countIo.observe(el); });
  } else {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = parseInt(el.getAttribute('data-count'), 10).toLocaleString('ko-KR');
    });
  }

  // Contact form (front-end only — connect to email/form service when deploying)
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.className = 'form__msg';
    if (!form.name.value.trim() || !form.phone.value.trim()) {
      msg.textContent = '성함과 연락처를 입력해 주세요.';
      msg.classList.add('is-error');
      return;
    }
    if (!form.agree.checked) {
      msg.textContent = '개인정보 수집 및 이용에 동의해 주세요.';
      msg.classList.add('is-error');
      return;
    }
    msg.textContent = '문의가 접수되었습니다. 빠르게 연락드리겠습니다.';
    msg.classList.add('is-ok');
    form.reset();
  });
})();
