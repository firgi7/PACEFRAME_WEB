// UI: navigasi layar, tombol chip, dan QR code.
import { SCREEN, STEPS } from './config.js';
import { $ } from './utils.js';
import { stopCamera } from './camera.js';

export function go(n) {
  document.querySelectorAll('main section').forEach((s, i) => s.classList.toggle('on', i === n));
  $('#steps').innerHTML = n ? STEPS.map((s, i) => (i === n - 1 ? '<b>' + s + '</b>' : s)).join(' › ') : '';
  window.scrollTo(0, 0);
  if (n !== SCREEN.CAPTURE) stopCamera();
}
// Deretan tombol pilihan (satu aktif).
export function chips(el, labels, onSelect, selected) {
  el.innerHTML = '';
  labels.forEach((label, i) => {
    const b = document.createElement('button');
    b.className = 'chip' + (i === selected ? ' on' : '');
    b.textContent = label;
    b.onclick = () => { onSelect(i); [...el.children].forEach((e, j) => e.classList.toggle('on', j === i)); };
    el.appendChild(b);
  });
}
export function renderQR(el, text) {
  el.innerHTML = '';
  if (!window.QRCode) { el.textContent = 'QR gagal dimuat'; return; }
  new QRCode(el, { text, width: 190, height: 190, colorDark: '#151515', colorLight: '#fff', correctLevel: QRCode.CorrectLevel.M });
}
