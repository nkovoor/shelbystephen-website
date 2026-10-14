// Shelby Stephen site scripts

// Hide the right-edge fade once the project rail is scrolled to the end
document.querySelectorAll('.rail-wrap').forEach(function (wrap) {
  var rail = wrap.querySelector('.rail');
  function update() {
    wrap.classList.toggle('at-end', rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
  }
  rail.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

// Lenis smooth scrolling for the page
var lenis = null;
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.Lenis && !reduceMotion) {
  lenis = new Lenis();
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}

// Wheel over the projects section scrolls the rail sideways; at either end the page scrolls again
(function () {
  var section = document.getElementById('work');
  var rail = section && section.querySelector('.rail');
  if (!rail) return;
  var target = 0, running = false, lockUntil = 0, last = 0;

  function max() { return rail.scrollWidth - rail.clientWidth; }
  function step(t) {
    var dt = Math.min(t - last, 100);
    last = t;
    var diff = target - rail.scrollLeft;
    if (reduceMotion || Math.abs(diff) < 0.5) { rail.scrollLeft = target; running = false; return; }
    var before = rail.scrollLeft;
    rail.scrollLeft = before + diff * (1 - Math.exp(-dt / 90));
    if (rail.scrollLeft === before) { rail.scrollLeft = target; running = false; return; }
    requestAnimationFrame(step);
  }

  section.addEventListener('wheel', function (e) {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || max() <= 0) return;
    var now = performance.now();
    if (!running) target = rail.scrollLeft;
    var atEnd = target >= max() - 1, atStart = target <= 1;
    if (now > lockUntil && ((e.deltaY > 0 && atEnd) || (e.deltaY < 0 && atStart))) return;
    e.preventDefault();
    e.stopPropagation();
    var next = Math.max(0, Math.min(max(), target + e.deltaY));
    if (next !== target && (next === 0 || next === max())) lockUntil = now + 250;
    target = next;
    if (!running) { running = true; last = now; requestAnimationFrame(step); }
  }, { passive: false });
})();
