// LAYAR 2: kamera, filter, dan hitung mundur.
import { COUNTDOWN, FILTERS, SCREEN } from '../config.js';
import { state } from '../state.js';
import { $, sleep, drawCover } from '../utils.js';
import { startCamera, snapshot } from '../camera.js';
import { chips, go } from '../ui.js';
import { restart } from '../effects.js';

export function initCapture({ onBack, onDone }) {
  const setFilter = i => { state.filter = i; $('#vid').style.filter = FILTERS[i].css; };
  chips($('#flt'), FILTERS.map(f => f.name), setFilter, state.filter);
  setFilter(state.filter);
  $('#back1').onclick = onBack;
  $('#shoot').onclick = () => runSession(onDone);
}

export async function openCapture() {
  state.shots = [];
  $('#thumbs').innerHTML = ''; $('#camMsg').textContent = '';
  $('#camSub').textContent = state.layout.n + ' foto • jeda ' + COUNTDOWN + ' detik. Pilih filter sebelum mulai.';
  go(SCREEN.CAPTURE);
  try { await startCamera($('#vid')); $('#shoot').disabled = false; }
  catch (e) { $('#camMsg').textContent = 'Kamera tidak bisa diakses. Izinkan webcam di browser lalu muat ulang.'; $('#shoot').disabled = true; }
}

async function runSession(onDone) {
  if (state.busy) return;
  state.busy = true; $('#shoot').disabled = true; state.shots = []; $('#thumbs').innerHTML = '';
  try { await document.fonts.load('700 40px Oswald'); } catch (e) {}
  for (let i = 0; i < state.layout.n; i++) {
    $('#camMsg').textContent = 'Foto ' + (i + 1) + ' dari ' + state.layout.n;
    for (let k = COUNTDOWN; k > 0; k--) { $('#count').textContent = k; restart($('#count'), 'tick'); await sleep(1000); }
    $('#count').textContent = '';
    const shot = snapshot($('#vid'), FILTERS[state.filter].css);
    state.shots.push(shot);
    flash(); addThumb(shot);
    await sleep(500);
  }
  state.busy = false;
  state.id = Math.random().toString(36).slice(2, 8).toUpperCase();
  onDone();
}
function flash() { const f = $('#flash'); f.style.opacity = 1; setTimeout(() => (f.style.opacity = 0), 120); }
function addThumb(src) {
  const t = document.createElement('canvas'); t.width = 64; t.height = 48;
  drawCover(t.getContext('2d'), src, 0, 0, 64, 48); $('#thumbs').append(t);
}
