(function () {
  // Highlight the current section in the tab bar
  var links = Array.prototype.slice.call(document.querySelectorAll('.tabs a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  var setActive = function (id) {
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on && a.scrollIntoView && window.innerWidth < 960) {
        a.parentNode.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
      }
    });
  };

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  // Contact form (front-end only — connect to a form/email service when deploying)
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
