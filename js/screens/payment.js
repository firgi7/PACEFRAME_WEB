// LAYAR 4 & 5: pembayaran QRIS lalu hasil + QR unduh.
import { PRICE, DOWNLOAD_URL, SCREEN } from '../config.js';
import { state } from '../state.js';
import { $ } from '../utils.js';
import { compose, draw } from '../canvas.js';
import { go, renderQR } from '../ui.js';
import { confetti } from '../effects.js';

export function initPayment() {
  $('#price').textContent = PRICE.label;
  $('#paid').onclick = openResult;   // DEMO: ganti dengan cek status bayar dari server
  $('#dl').onclick = download;
  $('#again').onclick = () => go(SCREEN.GALLERY);
}
export function openPayment() {
  draw($('#prev'), compose(state.shots, state.layout, state.bg, state.sticker, true)); // berwatermark
  renderQR($('#payQr'), 'PACEFRAME-DEMO-QRIS|' + state.id + '|' + PRICE.value);        // DEMO: ganti QRIS asli
  go(SCREEN.PAY);
}
function openResult() {
  state.final = compose(state.shots, state.layout, state.bg, state.sticker, false);    // tanpa watermark
  draw($('#final'), state.final);
  const url = DOWNLOAD_URL + state.id;
  renderQR($('#dlQr'), url); $('#dlUrl').textContent = url;
  go(SCREEN.RESULT);
  confetti();
}
function download() {
  const a = document.createElement('a');
  a.download = 'paceframe-' + state.id + '.png';
  a.href = state.final.toDataURL('image/png'); a.click();
}
