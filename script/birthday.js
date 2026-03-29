// 🎤 BLOW DETECTION USING MICROPHONE
navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const mic = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  mic.connect(analyser);
  analyser.fftSize = 256;

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function detectBlow() {
    analyser.getByteFrequencyData(dataArray);

    let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

    // 🔥 Adjust sensitivity here (lower = easier to trigger)
    if (volume > 60) {
      blowCandles();
      return;
    }

    requestAnimationFrame(detectBlow);
  }

  detectBlow();
})
.catch(err => {
  console.log("Microphone access denied:", err);
});

// 🎂 BLOW ACTION
function blowCandles() {
  document.getElementById("flame").style.display = "none";

  setTimeout(() => {
    document.getElementById("cakePage").style.display = "none";
    document.getElementById("messagePage").style.display = "flex";
  }, 1000);
}

// 💖 HEARTS
function createHeart() {
  const heart = document.createElement("span");
  const emojis = ["💖","💗","💘","💕","💞"];

  heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * 100 + "vw";

  const size = Math.random() * 20 + 10;
  heart.style.fontSize = size + "px";

  const duration = Math.random() * 3 + 4;
  heart.style.animationDuration = duration + "s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 300);