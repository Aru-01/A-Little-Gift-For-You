
let hintReady = false;
let tapped = false;
let memDone = false;
let _shimmerInt = null;

let bgm = null, musicOn = false;

function initMusic() {
  if (bgm) return;
  bgm = new Audio('./assets/audio/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.35;
}
function updateMusicBtn() {
  $('music-toggle').textContent = musicOn ? '🔈' : '🔇';
}
function showMusicBtn() {
  $('music-toggle').classList.add('show');
}
function playMusic() {
  initMusic();
  bgm.play()
    .then(() => { musicOn = true; updateMusicBtn(); })
    .catch(() => { musicOn = false; updateMusicBtn(); });
}
function toggleMusic() {
  initMusic();
  if (musicOn) { bgm.pause(); musicOn = false; }
  else { bgm.play().catch(() => { }); musicOn = true; }
  updateMusicBtn();
}
$('music-toggle').addEventListener('click', (e) => { e.stopPropagation(); toggleMusic(); });


async function onFirstTap(x, y) {
  if (tapped || !hintReady) return;
  tapped = true;

  if (_shimmerInt) { clearInterval(_shimmerInt); _shimmerInt = null; }

  ripple(x, y);
  spawnP(x, y, 14, true);

  $('hint').classList.remove('show');

  await wait(500);

  await bloomFlower1();

  const msg = $('s1-msg');
  msg.classList.add('blur-reveal');
  tw(950, eo3, (t) => {
    msg.style.opacity = t;
    msg.style.transform = `translateY(${(1 - t) * 22}px)`;
  });
  sparkleMsg();

  await wait(750);

  await typeSequence($('s1-type'), [
    { text: `I made something...`, hold: 1400 },
    { text: `just for you.`, hold: 700 },
  ], { cd: 58 });

  await wait(450);

  tw(780, eob, (t) => {
    $('s1-btnwrap').style.opacity = t;
    $('s1-btnwrap').style.transform = `scale(${0.85 + t * 0.15})`;
  });
  pInt = 0.6;
}

function s1Handler(e) {
  if (e.target.closest('#btn-start')) return;
  const t = e.touches ? e.touches[0] : e;
  onFirstTap(t.clientX, t.clientY);
}
$('s1').addEventListener('click', s1Handler);
$('s1').addEventListener('touchstart', s1Handler, { passive: true });

$('btn-start').addEventListener('click', async (e) => {
  e.stopPropagation();
  if (busy || scene !== 's1') return;
  busy = true;

  playMusic();
  showMusicBtn();

  ripple(e.clientX, e.clientY);
  spawnP(e.clientX, e.clientY, 20, true);
  for (let i = 0; i < 8; i++) setTimeout(() => makePetal(false), i * 130);
  startFalling(2400);

  await goTo('s2', 1000);
  busy = false;
  runS2();
});

$('btn-mem').addEventListener('click', async (e) => {
  e.stopPropagation();
  if (memDone) return;
  memDone = true;
  $('btn-mem').disabled = true;
  $('btn-mem').style.pointerEvents = 'none';

  heartBurst(e.clientX, e.clientY);

  tw(1200, eo3, (t) => {
    const b = t * 9;
    $('blurLayer').style.backdropFilter = `blur(${b}px)`;
    $('blurLayer').style.webkitBackdropFilter = `blur(${b}px)`;
    $('blurLayer').style.opacity = t;
  });

  stopFalling();
  const rise = setInterval(() => makePetal(true), 70);
  pInt = 2.6;

  await wait(2600);

  tw(900, eo3, (t) => $('finalMsg').style.opacity = t);
  await typeSequence($('finalMsg-text'), [
    { text: `Thank you`, hold: 1300 },
    { text: `for visiting`, hold: 1300 },
    { text: `this little world.`, hold: 2000 },
    { text: `Goodbye... 🌸`, hold: 1500 },
  ], { cd: 64 });

  await wait(4500);
  clearInterval(rise);
  if (bgm && musicOn) tw(2400, eis, (t) => { bgm.volume = 0.35 * (1 - t); });

  tw(2400, eis, (t) => {
    $('blackout').style.opacity = t * 0.97;
    $('finalMsg').style.opacity = 1 - t;
    document.querySelectorAll('.scene').forEach((s) => {
      s.style.opacity = (1 - t) * (s.classList.contains('active') ? 1 : 0);
    });
  }, () => {
    tw(1600, eo3, (t) => $('remainFlower').style.opacity = t);
    pInt = 0.4;
  });
});


(function boot() {
  initStars();
  initBokeh();
  initParticles();

  for (let i = 0; i < 26; i++) setTimeout(() => spawnP(null, null, 1, false), i * 70);


  $('s1').style.opacity = '0';
  tw(1100, eo3, (t) => { $('s1').style.opacity = t; });

  setTimeout(() => {
    hintReady = true;
    $('hint').classList.add('show');

    _shimmerInt = setInterval(() => {
      if (!hintReady || tapped) { clearInterval(_shimmerInt); _shimmerInt = null; return; }
      doHintEffect();
    }, 4000);
  }, 2500);
})();
