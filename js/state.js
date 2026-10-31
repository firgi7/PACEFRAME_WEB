// STATE: data yang dibawa antar layar.
export const state = {
  layout: null,   // layout terpilih (dari LAYOUTS)
  bg: '#151515',  // warna frame
  sticker: '',
  filter: 2,      // index FILTERS
  shots: [],      // canvas tiap foto
  id: '',         // kode sesi
  final: null,    // canvas hasil akhir tanpa watermark
  busy: false,
};
