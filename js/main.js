// MAIN: menyambungkan semua layar. Alur: Hero → Galeri → Kamera → Kustom → Bayar → Hasil.
import { SCREEN } from './config.js';
import { state } from './state.js';
import { $ } from './utils.js';
import { go } from './ui.js';
import { initParallax } from './effects.js';
import { initGallery } from './screens/gallery.js';
import { initCapture, openCapture } from './screens/capture.js';
import { initEditor, openEditor } from './screens/editor.js';
import { initPayment, openPayment } from './screens/payment.js';

initGallery((layout, bg) => { state.layout = layout; state.bg = bg; state.sticker = ''; openCapture(); });
initCapture({ onBack: () => go(SCREEN.GALLERY), onDone: openEditor });
initEditor({ onRetake: openCapture, onNext: openPayment });
initPayment();

$('#start').onclick = () => go(SCREEN.GALLERY);
$('#home').onclick = () => initParallax($('.hero'));
go(SCREEN.HERO);
go(SCREEN.HERO);
