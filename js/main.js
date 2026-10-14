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
