// Shelby Stephen site scripts
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav turns solid once you scroll past the first screen
  var nav = document.querySelector('.home-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reviews: duplicate each row once so the loop is seamless
  document.querySelectorAll('[data-loop]').forEach(function (row) {
    if (reduce) return;
    Array.prototype.slice.call(row.children).forEach(function (c) {
      var d = c.cloneNode(true);
      d.setAttribute('aria-hidden', 'true');
      row.appendChild(d);
    });
  });

  // Name poster: description slides in from the sides as you scroll
  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    var opts = { scrollTrigger: { trigger: '.poster', start: 'top 55%', end: 'top 10%', scrub: true } };
    gsap.from('.desc-left', Object.assign({ x: -160, opacity: 0 }, opts));
    gsap.from('.desc-right', Object.assign({ x: 160, opacity: 0 }, opts));
  }
})();
