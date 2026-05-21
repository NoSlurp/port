(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return;

  let rafId = 0;
  function update(x, y) {
    root.style.setProperty("--spot-x", `${(x / window.innerWidth) * 100}%`);
    root.style.setProperty("--spot-y", `${(y / window.innerHeight) * 100}%`);
  }

  window.addEventListener("mousemove", (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      update(e.clientX, e.clientY);
      rafId = 0;
    });
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (!t || rafId) return;
    rafId = requestAnimationFrame(() => {
      update(t.clientX, t.clientY);
      rafId = 0;
    });
  }, { passive: true });
})();
