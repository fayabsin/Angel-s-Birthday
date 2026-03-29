const flame = document.getElementById('flame');
const cakePage = document.getElementById('cakePage');
const messagePage = document.getElementById('messagePage');

let audioContext, mic, analyser;

// Mobile and desktop require user interaction to allow mic
document.body.addEventListener('click', initMic, { once: true });
document.body.addEventListener('touchstart', initMic, { once: true });

function initMic() {
  // Request mic access
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      mic = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      mic.connect(analyser);
      analyser.fftSize = 256;
      detectBlow();
    })
    .catch(err => {
      console.log('Microphone access denied', err);
      alert('Please allow microphone access to blow out the candle!');
    });
}

function detectBlow() {
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function checkVolume() {
    analyser.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      let value = dataArray[i] - 128;
      sum += value * value;
    }
    let rms = Math.sqrt(sum / dataArray.length);

    // Threshold for detecting blow, adjust if needed
    if (rms > 20) {
      // Candle goes out
      flame.style.opacity = 0;

      // Show message
      cakePage.style.display = 'none';
      messagePage.style.display = 'block';

      return; // Stop checking
    }
    requestAnimationFrame(checkVolume);
  }

  checkVolume();
}