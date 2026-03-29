document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const flame = document.getElementById("flame");
  const cakePage = document.getElementById("cakePage");
  const messagePage = document.getElementById("messagePage");

  // 1️⃣ Try autoplay muted (some browsers require muted)
  music.play().catch(err => console.log("Autoplay muted failed:", err));

  // 2️⃣ Function to unmute + fade in music
  function fadeInMusic() {
    music.muted = false;
    music.volume = 0;
    music.play().catch(err => console.log("Play after unmute failed:", err));

    const fade = setInterval(() => {
      if (music.volume < 1) music.volume += 0.05;
      else clearInterval(fade);
    }, 200);
  }

  // 3️⃣ Candle click triggers fade-in music + show message
  flame.addEventListener("click", () => {
    fadeInMusic();

    // Hide cake page, show message page
    cakePage.style.display = "none";
    messagePage.style.display = "block";
  });

  // 4️⃣ Optional: fallback, allow music on first click anywhere
  document.addEventListener("click", () => {
    if (music.muted) fadeInMusic();
  }, { once: true });

});