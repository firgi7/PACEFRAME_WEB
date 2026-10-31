// CANVAS: menyusun foto + frame menjadi satu gambar.
import { PAD } from './config.js';
import { luminance, drawCover } from './utils.js';

export function compose(shots, layout, bg, sticker, watermark) {
  const t = layout;
  const dark = luminance(bg) < 0.5;
  const fg = dark ? '#fff' : '#151515', accent = dark ? '#D7FF48' : '#151515';
  const rows = Math.ceil(t.n / t.cols);
  const W = PAD * 2 + t.cols * t.pw + (t.cols - 1) * t.gap;
  const H = PAD * 2 + rows * t.ph + (rows - 1) * t.gap + t.foot;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, W, H);

  for (let i = 0; i < t.n; i++) {
    const px = PAD + (i % t.cols) * (t.pw + t.gap);
    const py = PAD + Math.floor(i / t.cols) * (t.ph + t.gap);
    drawCover(x, shots[i], px, py, t.pw, t.ph);
    if (sticker) { x.font = '52px serif'; x.textAlign = 'right'; x.fillText(sticker, px + t.pw - 10, py + 60); }
    if (watermark) {
      x.globalAlpha = 0.55; x.fillStyle = '#fff'; x.textAlign = 'right';
      x.font = '700 ' + Math.round(t.pw * 0.07) + 'px Oswald,Impact,sans-serif';
      x.fillText('[ PACEFRAME ]', px + t.pw - 14, py + t.ph - 14);
      x.globalAlpha = 1;
    }
  }
  // Footer: logo teks + tagline + tanggal
  const fy = H - t.foot;
  x.font = '700 46px Oswald,Impact,sans-serif'; x.textAlign = 'left';
  const a = x.measureText('PACE').width, b = x.measureText('FRAME').width, sx = (W - a - b) / 2;
  x.fillStyle = accent; x.fillText('PACE', sx, fy + 50);
  x.fillStyle = fg; x.fillText('FRAME', sx + a, fy + 50);
  x.font = '400 17px Inter,sans-serif'; x.textAlign = 'center'; x.globalAlpha = 0.7;
  x.fillText('EVERY PACE, A STORY. • ' + new Date().toLocaleDateString('id-ID'), W / 2, fy + 82);
  x.globalAlpha = 1;
  return c;
}
// Foto contoh untuk thumbnail galeri.
export function placeholder() {
  const c = document.createElement('canvas'); c.width = 640; c.height = 480;
  const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 640, 480);
  g.addColorStop(0, '#444'); g.addColorStop(1, '#1c1c1c');
  x.fillStyle = g; x.fillRect(0, 0, 640, 480);
  x.fillStyle = 'rgba(215,255,72,.8)';
  x.beginPath(); x.moveTo(380, 480); x.lineTo(460, 480); x.lineTo(640, 200); x.lineTo(600, 200); x.fill();
  return c;
}
// Salin canvas sumber ke canvas di halaman.
export function draw(target, source) {
  target.width = source.width; target.height = source.height;
  target.getContext('2d').drawImage(source, 0, 0);
}
