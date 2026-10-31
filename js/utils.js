// UTILS: fungsi kecil serbaguna.
export const $ = s => document.querySelector(s);
export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}
// Gambar src ke kotak tujuan dengan crop tengah (seperti object-fit: cover).
export function drawCover(ctx, src, dx, dy, dw, dh) {
  const r = dw / dh;
  let w = src.width, h = src.height, sx = 0, sy = 0;
  if (w / h > r) { const nw = h * r; sx = (w - nw) / 2; w = nw; }
  else { const nh = w / r; sy = (h - nh) / 2; h = nh; }
  ctx.drawImage(src, sx, sy, w, h, dx, dy, dw, dh);
}
