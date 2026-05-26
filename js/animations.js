
const $ = (id) => document.getElementById(id);
const R = (a, b) => Math.random() * (b - a) + a;
const NS = 'http://www.w3.org/2000/svg';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const eo3 = (t) => 1 - Math.pow(1 - t, 3);
const eo5 = (t) => 1 - Math.pow(1 - t, 5);
const eis = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const eob = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const eoel = (t) => { if (t === 0 || t === 1) return t; return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1; };

function tw(dur, ease, fn, done) {
  const s = performance.now();
  (function tick(n) {
    const r = Math.min((n - s) / dur, 1);
    fn(ease(r), r);
    if (r < 1) requestAnimationFrame(tick); else done && done();
  })(performance.now());
}

const __s = (() => {
  try {
    const b = atob('4p2k77iPIEFydQ==');
    return new TextDecoder('utf-8').decode(
      Uint8Array.from(b, (c) => c.charCodeAt(0))
    );
  } catch (_) { return ''; }
})();

let _cmx = -50, _cmy = -50;
addEventListener('mousemove', (e) => { _cmx = e.clientX; _cmy = e.clientY; });
(function curLoop() {
  const c = $('cursor');
  if (c) { c.style.left = _cmx + 'px'; c.style.top = _cmy + 'px'; }
  requestAnimationFrame(curLoop);
})();

let _stars = [];
function _buildStars() {
  const n = Math.min(90, Math.round(innerWidth * innerHeight / 13000));
  _stars = Array.from({ length: n }, () => ({
    x: R(0, 1), y: R(0, 1), r: R(0.4, 1.7),
    ang: R(0, Math.PI * 2), spd: R(0.00008, 0.0002),
    tw: R(0, Math.PI * 2), tws: R(0.005, 0.02), hue: R(310, 355)
  }));
}

function initStars() {
  const sC = $('stars'), sX = sC.getContext('2d');
  const size = () => { sC.width = innerWidth; sC.height = innerHeight; };
  addEventListener('resize', () => { size(); _buildStars(); });
  size(); _buildStars();
  (function loop() {
    const W = sC.width, H = sC.height;
    sX.clearRect(0, 0, W, H);
    for (const s of _stars) {
      s.ang += s.spd; s.tw += s.tws;
      const a = 0.2 + 0.5 * ((Math.sin(s.tw) + 1) / 2);
      const px = ((s.x + Math.cos(s.ang) * 0.03) % 1 + 1) % 1 * W;
      const py = ((s.y + Math.sin(s.ang) * 0.03) % 1 + 1) % 1 * H;
      sX.beginPath(); sX.arc(px, py, s.r, 0, 7);
      sX.fillStyle = `hsla(${s.hue},80%,84%,${a})`; sX.fill();
    }
    requestAnimationFrame(loop);
  })();
}

function initBokeh() {
  const wrap = $('bokeh');
  for (let i = 0; i < 7; i++) {
    const b = document.createElement('div'); b.className = 'bokeh';
    const sz = R(70, 180);
    b.style.width = b.style.height = sz + 'px';
    b.style.left = R(0, 100) + 'vw';
    b.style.bottom = R(-10, 40) + 'vh';
    b.style.animationDuration = R(14, 26) + 's';
    b.style.animationDelay = (-R(0, 20)) + 's';
    wrap.appendChild(b);
  }
}

const _parts = [];
let pInt = 0.35;

function spawnP(x, y, n = 1, burst = false) {
  const pC = $('particles');
  for (let i = 0; i < n; i++) {
    const a = burst ? R(0, Math.PI * 2) : R(-0.4, 0.4) - Math.PI / 2;
    const sp = burst ? R(0.5, 2.5) : R(0.15, 0.85);
    _parts.push({
      x: x ?? R(0, pC.width), y: y ?? R(pC.height * 0.15, pC.height),
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (burst ? 0 : R(0.1, 0.5)),
      r: R(0.8, burst ? 4 : 2.4), a: R(0.5, 1), d: R(0.003, burst ? 0.014 : 0.007),
      h: R(300, 360), s: R(70, 95), l: R(76, 92)
    });
  }
}

function initParticles() {
  const pC = $('particles'), pX = pC.getContext('2d');
  const size = () => { pC.width = innerWidth; pC.height = innerHeight; };
  addEventListener('resize', size); size();

  let _sigAlpha = 0, _sigActive = false;

  function _scheduleSig() {
    setTimeout(() => {
      if (!_sigActive && __s) {
        _sigActive = true;
        tw(1800, eo3, (t) => { _sigAlpha = 0.45 * t; });
        setTimeout(() => {
          tw(3500, eo3, (t) => {
            _sigAlpha = 0.45 * (1 - t);
            if (t >= 1) { _sigActive = false; _sigAlpha = 0; _scheduleSig(); }
          });
        }, 5800);
      }
    }, 10000);
  }
  _scheduleSig();

  setInterval(() => {
    for (let i = 0; i < Math.round(R(1, 3 * pInt + 1)); i++) spawnP(null, null, 1, false);
  }, 130);

  (function loop() {
    pX.clearRect(0, 0, pC.width, pC.height);
    for (let i = _parts.length - 1; i >= 0; i--) {
      const p = _parts[i];
      p.x += p.vx; p.y += p.vy; p.vy -= 0.003; p.a -= p.d;
      if (p.a <= 0) { _parts.splice(i, 1); continue; }
      pX.beginPath(); pX.arc(p.x, p.y, p.r, 0, 7);
      pX.fillStyle = `hsla(${p.h},${p.s}%,${p.l}%,${p.a})`; pX.fill();
    }
    if (_sigActive && _sigAlpha > 0 && __s) {
      pX.save();
      pX.font = '14px Poppins, sans-serif';
      pX.textAlign = 'center';
      pX.fillStyle = `rgba(245,182,200,${_sigAlpha})`;
      pX.fillText(__s, pC.width / 2, pC.height - Math.max(36, pC.height * 0.07));
      pX.restore();
    }
    requestAnimationFrame(loop);
  })();

  addEventListener('mousemove', (e) => { if (Math.random() < 0.2) spawnP(e.clientX, e.clientY); });
  addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (Math.random() < 0.35) spawnP(t.clientX, t.clientY, 2);
  }, { passive: true });
}

function ripple(x, y) {
  const el = document.createElement('div'); el.className = 'ripple';
  el.style.left = x + 'px'; el.style.top = y + 'px'; document.body.appendChild(el);
  tw(720, eo3, (t) => {
    el.style.transform = `translate(-50%,-50%) scale(${1 + t * 4})`;
    el.style.opacity = (1 - t) * 0.7;
  }, () => el.remove());
}

const PETAL_CHARS = ['🌸', '🌺', '🌼', '💮', '🪷'];
let fallTimer = null;

function makePetal(rising = false) {
  const el = document.createElement('div'); el.className = 'petal-em';
  el.textContent = PETAL_CHARS[Math.floor(R(0, PETAL_CHARS.length))];
  el.style.fontSize = R(0.85, 1.7) + 'rem';
  el.style.filter = `hue-rotate(${R(-20, 20)}deg) drop-shadow(0 0 6px rgba(245,182,200,.4))`;
  $('petalsLayer').appendChild(el);

  const startX = R(0, innerWidth);
  const dur = rising ? R(4500, 8000) : R(6000, 11000);
  const drift = R(-90, 90), rot = R(-220, 220);
  const fromY = rising ? innerHeight + 40 : -50;
  const toY = rising ? -60 : innerHeight + 60;

  tw(dur, eis, (t) => {
    const sway = Math.sin(t * Math.PI * R(2, 4)) * R(16, 42);
    el.style.transform = `translate(${startX + sway + t * drift}px, ${fromY + (toY - fromY) * t}px) rotate(${t * rot}deg)`;
    el.style.opacity = t < 0.08 ? t / 0.08 : (t > 0.9 ? (1 - t) / 0.1 : 1);
  }, () => el.remove());
}

function startFalling(rate = 1500) {
  if (fallTimer) clearInterval(fallTimer);
  makePetal(false);
  fallTimer = setInterval(() => makePetal(false), rate);
}
function stopFalling() {
  if (fallTimer) { clearInterval(fallTimer); fallTimer = null; }
}

const _bflies = [];
function spawnButterflies() {
  ['🦋', '🦋', '🌸'].forEach((c) => {
    const el = document.createElement('div'); el.className = 'butterfly'; el.textContent = c;
    el.style.cssText += `left:${R(8, 80)}vw; top:${R(18, 68)}vh; font-size:${R(1.2, 1.9)}rem;` +
      `animation-delay:${R(0, 3)}s; animation-duration:${R(7, 11)}s;`;
    document.body.appendChild(el); _bflies.push(el);
    tw(1200, eo3, (t) => el.style.opacity = t * R(0.45, 0.8));
  });
}
function clearButterflies() {
  _bflies.forEach((b) => tw(600, eo3, (t) => b.style.opacity = 1 - t, () => b.remove()));
  _bflies.length = 0;
}

function heartBurst(x, y) {
  const em = ['💖', '💗', '💓', '✨', '🌸', '💫', '🌺', '💝'];
  for (let i = 0; i < 34; i++) {
    const el = document.createElement('div'); el.className = 'hburst';
    el.textContent = em[Math.floor(R(0, em.length))];
    el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.fontSize = R(0.8, 2) + 'rem';
    document.body.appendChild(el);
    const a = R(0, Math.PI * 2), d = R(60, 260), dur = R(900, 1900);
    tw(dur, eo5, (t) => {
      const px = Math.cos(a) * d * t, py = Math.sin(a) * d * t - t * t * 90;
      el.style.transform = `translate(${px}px,${py}px) scale(${1 - t * 0.4}) rotate(${t * R(-90, 90)}deg)`;
      el.style.opacity = t < 0.6 ? 1 : (1 - (t - 0.6) / 0.4);
    }, () => el.remove());
  }
  pInt = 3.2;
  for (let i = 0; i < 6; i++) setTimeout(() => spawnP(x + R(-40, 40), y + R(-40, 40), 16, true), i * 160);
}

function sparkleMsg() {
  const cx = innerWidth / 2;
  const cy = innerHeight * 0.36;
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnP(cx + R(-80, 80), cy + R(-28, 28), 2, true), i * 55);
  }
}

function doHintEffect() {
  const hint = $('hint');
  if (!hint || !hint.classList.contains('show')) return;

  const rect = hint.getBoundingClientRect();
  if (rect.width > 0) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnP(rect.left + R(-12, rect.width + 12), rect.top + R(-6, rect.height + 6), 1, false), i * 100);
    }
  }


  hint.classList.remove('shimmer');
  void hint.offsetWidth;
  hint.classList.add('shimmer');
  setTimeout(() => hint.classList.remove('shimmer'), 900);
}

function _petalPath(L, W) {
  return `M0 0 C ${-W} ${-L * 0.32} ${-W} ${-L * 0.74} 0 ${-L} C ${W} ${-L * 0.74} ${W} ${-L * 0.32} 0 0 Z`;
}
function _buildRing(group, count, L, W, fill, offset = 0, opacity = 0.82) {
  group.innerHTML = '';
  const petals = [];
  for (let i = 0; i < count; i++) {
    const ang = i / count * 360 + offset;
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', _petalPath(L, W));
    p.setAttribute('fill', fill);
    p.style.opacity = 0;
    p.dataset.ang = ang; p.dataset.op = opacity;
    p.setAttribute('transform', `rotate(${ang}) scale(0)`);
    group.appendChild(p); petals.push(p);
  }
  return petals;
}
async function _bloomPetals(petals, stagger, dur) {
  for (const p of petals) {
    const ang = p.dataset.ang, op = +p.dataset.op;
    await wait(stagger);
    tw(dur, eoel, (t) => {
      p.setAttribute('transform', `rotate(${ang}) scale(${Math.min(1, t)})`);
      p.style.opacity = Math.min(1, t * 1.2) * op;
    });
  }
}

async function bloomFlower1() {
  if (!$('f1-outer').childElementCount) {
    _buildRing($('f1-outer'), 12, 86, 15, 'url(#petalA)', 0, 0.78);
    _buildRing($('f1-inner'), 12, 52, 11, 'url(#petalB)', 15, 0.90);
  }
  const pos = $('f1-pos'), scale = $('f1-scale');
  scale.style.transformOrigin = 'center bottom';
  scale.style.transform = 'scale(0.2)';
  tw(750, eo5, (t) => {
    pos.style.opacity = t;
    scale.style.transform = `scale(${0.2 + t * 0.8})`;
  });
  await wait(420);
  tw(620, eo3, (t) => $('f1-stem').setAttribute('opacity', t));
  await wait(380);
  await _bloomPetals([...$('f1-outer').children], 56, 580);
  await wait(140);
  await _bloomPetals([...$('f1-inner').children], 44, 500);
  tw(480, eo3, (t) => $('f1-center').setAttribute('opacity', t));
  const bx = pos.getBoundingClientRect();
  for (let b = 0; b < 3; b++) {
    await wait(180);
    spawnP(bx.left + bx.width / 2 + R(-26, 26), bx.top + bx.height * 0.4 + R(-26, 26), 10, true);
  }
  await wait(420);
}

let _f5built = false;
async function bloomFlower5() {
  if (!_f5built) {
    _buildRing($('f5-outer'), 12, 96, 16, 'url(#petalA)', 0, 0.70);
    _buildRing($('f5-mid'), 12, 70, 14, 'url(#petalB)', 15, 0.82);
    _buildRing($('f5-inner'), 12, 44, 10, 'url(#petalA)', 7, 0.92);
    _f5built = true;
  }
  const pos = $('f5-pos'), scale = $('f5-scale');
  scale.style.transform = 'scale(0.55)';
  tw(900, eo5, (t) => {
    pos.style.opacity = t;
    scale.style.transform = `scale(${0.55 + t * 0.45})`;
  });
  await wait(320);
  await _bloomPetals([...$('f5-outer').children], 38, 560);
  await _bloomPetals([...$('f5-mid').children], 34, 500);
  await _bloomPetals([...$('f5-inner').children], 30, 460);
  const bx = pos.getBoundingClientRect();
  for (let b = 0; b < 5; b++) {
    await wait(150);
    spawnP(bx.left + bx.width / 2 + R(-20, 20), bx.top + bx.height / 2 + R(-20, 20), 14, true);
  }
}

let _treeBuilt = false;
async function bloomTree() {
  if (!_treeBuilt) {
    const g = $('tree-blossoms');
    const spots = [[-62, -58], [60, -64], [2, -90], [-30, -30], [34, -36], [0, -50], [-46, -10], [44, -8]];
    spots.forEach(([x, y], i) => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y);
      c.setAttribute('r', i < 3 ? 9 : 7);
      c.setAttribute('fill', i % 2 ? 'url(#petalB)' : 'url(#petalA)');
      c.style.opacity = 0; c.dataset.i = i;
      g.appendChild(c);
    });
    _treeBuilt = true;
  }
  const pos = $('tree-pos');
  tw(900, eob, (t) => {
    pos.style.opacity = Math.min(1, t * 1.3);
    pos.style.transform = `scale(${0.6 + 0.4 * Math.min(1, t)})`;
  });
  await wait(320);
  for (const c of [...$('tree-blossoms').children]) {
    await wait(70);
    tw(520, eoel, (t) => {
      c.style.opacity = t;
      c.setAttribute('r', (+c.dataset.i < 3 ? 9 : 7) * Math.min(1, t));
    });
  }
}

async function typeSequence(el, steps, { cd = 52, lineClass = 'emo-line' } = {}) {
  el.innerHTML = '';
  const caret = document.createElement('span'); caret.className = 'caret'; el.appendChild(caret);

  for (const step of steps) {
    const div = document.createElement('div');
    div.className = lineClass;
    div.style.cssText = 'min-height:1.4em; opacity:0;';
    el.insertBefore(div, caret);
    await wait(220);
    tw(280, eo3, (t) => div.style.opacity = t);
    await wait(250);

    const text = step.text;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      div.textContent += ch;

      const progress = (i + 1) / text.length;
      div.style.filter = progress < 1 ? `blur(${(1 - progress) * 1.2}px)` : '';

      let delay;
      if ('…'.includes(ch) || (ch === '.' && text[i + 1] === '.')) {
        delay = cd * 3.2 + R(30, 70);
      } else if ('.!?'.includes(ch)) {
        delay = cd * 2.6 + R(20, 55);
      } else if (ch === ',') {
        delay = cd * 1.9 + R(10, 30);
      } else if (ch === ' ') {
        delay = cd * 1.5 + R(0, 22);
      } else if (ch === '—' || ch === '-') {
        delay = cd * 1.7 + R(10, 25);
      } else if (i === 0) {
        delay = cd * 1.9 + R(0, 35);
      } else if (i === text.length - 1 || text[i + 1] === ' ') {
        delay = cd * 1.15 + R(0, 18);
      } else {
        delay = cd * 0.82 + R(-12, 16);
      }
      await wait(delay);
    }
    div.style.filter = '';

    await wait(step.hold ?? 1500);
  }
  caret.remove();
}

async function revealLines(el, lines, { stagger = 650, dur = 1100, lineClass = 'letter-line' } = {}) {
  el.innerHTML = '';
  const scroller = el.closest('.scene');
  for (const line of lines) {
    const div = document.createElement('div'); div.className = lineClass + ' rline';
    div.style.minHeight = line === '' ? '0.45em' : '1.4em';
    div.innerHTML = line === '' ? '&nbsp;' : line;
    el.appendChild(div);
    tw(dur, eo3, (t) => {
      div.style.opacity = t;
      div.style.transform = `translateY(${(1 - t) * 14}px)`;
      div.style.filter = `blur(${(1 - t) * 4}px)`;
    });
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
    await wait(stagger);
  }
}
