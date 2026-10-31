// EFFECTS: efek kecil (animasi ulang, parallax, confetti).
export function restart(el, cls) {          // putar ulang animasi class
  el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
}
export function initParallax(el) {          // strip foto mengikuti gerak mouse
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5) * 2);
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5) * 2);
  });
  el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0); });
}
export function confetti(count = 40) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#D7FF48', '#151515', '#ffd400', '#ffffff', '#ff4d6d'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = 'confetti';
    p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', (Math.random() - .5) * 600 + 'px');
    p.style.setProperty('--dy', (Math.random() * 500 - 150) + 'px');
    p.style.setProperty('--r', Math.random() * 720 + 'deg');
    document.body.append(p);
    setTimeout(() => p.remove(), 1700);
  }
}
