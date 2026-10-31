// LAYAR 1: galeri template (filter jumlah foto + pencarian).
import { LAYOUTS, STYLES } from '../config.js';
import { $ } from '../utils.js';
import { compose, placeholder, draw } from '../canvas.js';
import { chips } from '../ui.js';

export function initGallery(onPick) {
  const cards = [];
  let count = 0, query = '';
  const apply = () => cards.forEach(c => {
    c.hidden = !((!count || c.dataset.n == count) && c.dataset.name.includes(query));
  });

  const build = () => {
    LAYOUTS.forEach(l => STYLES.forEach(([style, bg]) => {
      const b = document.createElement('button');
      b.className = 'tpl';
      b.dataset.n = l.n; b.dataset.name = (style + ' ' + l.name).toLowerCase();
      const c = document.createElement('canvas');
      draw(c, compose(Array.from({ length: l.n }, placeholder), l, bg, '', false));
      b.append(c);
      b.insertAdjacentHTML('beforeend', '<b>' + style + ' ' + l.name + '</b><small>' + l.n + ' foto</small>');
      b.onclick = () => onPick(l, bg);
      b.style.setProperty('--i', cards.length);
      $('#tpls').append(b); cards.push(b);
    }));
  };

  chips($('#fil'), ['Semua', '1 Foto', '2 Foto', '3 Foto', '4 Foto'], i => { count = i; apply(); }, 0);
  $('#fil').insertAdjacentHTML('beforeend', '<input type="search" id="q" placeholder="Cari template">');
  $('#q').oninput = e => { query = e.target.value.toLowerCase(); apply(); };
  // tunggu font Oswald agar thumbnail tidak memakai font cadangan
  document.fonts.load('700 40px Oswald').catch(() => {}).finally(build);
}
