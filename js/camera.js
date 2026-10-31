// CAMERA: akses webcam dan ambil snapshot.
let stream = null;

export async function startCamera(video) {
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false,
  });
  video.srcObject = stream;
}
export function stopCamera() {
  if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
}
// Ambil satu frame (dicerminkan, dengan filter).
export function snapshot(video, filterCss) {
  const c = document.createElement('canvas');
  c.width = video.videoWidth || 640; c.height = video.videoHeight || 480;
  const x = c.getContext('2d');
  x.filter = filterCss; x.translate(c.width, 0); x.scale(-1, 1);
  x.drawImage(video, 0, 0);
  return c;
}
