// CONFIG: semua pengaturan yang sering diubah ada di sini.
export const PRICE = { value: 15000, label: 'Rp 15.000' };
export const DOWNLOAD_URL = 'https://paceframe.id/d/'; // QR unduh = URL ini + kode sesi
export const COUNTDOWN = 3;   // detik antar foto
export const PAD = 36;        // jarak tepi frame (px)

export const SCREEN = { HERO: 0, GALLERY: 1, CAPTURE: 2, EDIT: 3, PAY: 4, RESULT: 5 };
export const STEPS = ['Template', 'Foto', 'Kustom', 'Bayar', 'Unduh'];

// Layout frame. pw/ph = ukuran tiap foto, foot = tinggi area logo bawah.
export const LAYOUTS = [
  { name: 'Duo',   n: 2, cols: 1, pw: 480, ph: 360, gap: 20, foot: 130 },
  { name: 'Strip', n: 3, cols: 1, pw: 480, ph: 360, gap: 20, foot: 130 },
  { name: 'Tall',  n: 4, cols: 1, pw: 400, ph: 300, gap: 16, foot: 120 },
  { name: 'Grid',  n: 4, cols: 2, pw: 360, ph: 360, gap: 20, foot: 130 },
  { name: 'Cine',  n: 1, cols: 1, pw: 720, ph: 480, gap: 20, foot: 120 },
];
// Gaya awal template di galeri: [nama, warna frame]
export const STYLES = [['Midnight', '#151515'], ['Lime', '#D7FF48'], ['Clean', '#ffffff']];
export const COLORS = ['#151515', '#D7FF48', '#ffffff', '#ff4d6d', '#4da3ff', '#ff9f1c', '#7b2cbf', '#2ec4b6'];
export const STICKERS = ['', '⚡', '🏃', '🚴', '🔥', '⭐'];
export const FILTERS = [
  { name: 'Normal',    css: 'none' },
  { name: 'B&W',       css: 'grayscale(1) contrast(1.1)' },
  { name: 'Sinematik', css: 'saturate(.85) contrast(1.08) brightness(.96)' },
  { name: 'Hangat',    css: 'sepia(.35) saturate(1.1)' },
];
