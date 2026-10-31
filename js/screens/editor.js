// LAYAR 3: kustomisasi warna frame dan stiker.
import { COLORS, STICKERS, SCREEN } from '../config.js';
import { state } from '../state.js';
import { $ } from '../utils.js';
import { compose, draw } from '../canvas.js';
import { chips, go } from '../ui.js';
import { restart } from '../effects.js';

const bump = () => restart($('#edit'), 'bump');
const redraw = () => draw($('#edit'), compose(state.shots, state.layout, state.bg, state.sticker, false));

export function initEditor({ onRetake, onNext }) {
  COLORS.forEach(color => {
    const b = document.createElement('button');
    b.style.background = color; b.dataset.color = color;
    b.onclick = () => { state.bg = color; markColor(); redraw(); bump(); };
    $('#cols').append(b);
  });
  chips($('#stk'), STICKERS.map(s => s || 'Tanpa'), i => { state.sticker = STICKERS[i]; redraw(); bump(); }, 0);
  $('#retake').onclick = onRetake;
  $('#toPay').onclick = onNext;
}
export function openEditor() { markColor(); redraw(); go(SCREEN.EDIT); }

function markColor() {
  [...$('#cols').children].forEach(b => b.classList.toggle('on', b.dataset.color === state.bg));
}
