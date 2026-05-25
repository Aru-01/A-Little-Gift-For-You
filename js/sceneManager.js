

let scene = 's1';
let busy = false;

function goTo(id, dur = 1000) {
  return new Promise((res) => {
    const from = document.querySelector('.scene.active');
    const to = document.getElementById(id);
    if (!to) { res(); return; }
    tw(dur / 2, eo3, (t) => { if (from) from.style.opacity = 1 - t; }, () => {
      if (from) { from.classList.remove('active'); from.style.opacity = 0; }
      to.classList.add('active');
      to.style.opacity = 0;
      if (to.scrollTop !== undefined) to.scrollTop = 0;
      scene = id;
      tw(dur, eo3, (t) => to.style.opacity = t, res);
    });
  });
}

function setBrighten(target, dur = 1600) {
  const from = parseFloat($('brighten').style.opacity) || 0;
  tw(dur, eis, (t) => { $('brighten').style.opacity = from + (target - from) * t; });
}

async function runS2() {
  await typeSequence($('t2'), [
    { text: 'Sometimes...', hold: 2000 },
    { text: 'some people become special', hold: 2000 },
    { text: 'without any reason.', hold: 4500 },
  ]);
  await goTo('s3', 1100);
  runS3();
}

async function runS3() {
  setBrighten(0.45);
  await typeSequence($('t3'), [
    { text: 'I don’t know', hold: 1500 },
    { text: 'if I ever became', hold: 1500 },
    { text: 'someone important to you.', hold: 3500 },
    { text: 'But somehow...', hold: 1800 },
    { text: 'you became', hold: 1500 },
    { text: 'someone special to me.', hold: 5000 },
  ]);
  await goTo('s4', 1100);
  runS4();
}

async function runS4() {
  setBrighten(0.7);
  spawnButterflies();
  pInt = 1.1;
  await typeSequence($('t4'), [
    { text: 'Maybe you’re not mine.', hold: 1800 },
    { text: 'Maybe you never will be.', hold: 2200 },
    { text: 'And maybe...', hold: 1600 },
    { text: 'that’s completely okay.', hold: 3800 },
    { text: 'Because some people', hold: 1500 },
    { text: 'don’t need promises', hold: 1500 },
    { text: 'to become unforgettable.', hold: 5000 },
  ]);
  clearButterflies();
  await goTo('s5', 1200);
  runS5();
}

async function runS5() {
  setBrighten(0.4);
  pInt = 1.7;
  bloomFlower5();
  await wait(1800);
  await typeSequence($('t5'), [
    { text: 'I don’t know', hold: 1500 },
    { text: 'whether life', hold: 1400 },
    { text: 'will ever bring us', hold: 1500 },
    { text: 'to the same destination.', hold: 3500 },
    { text: 'But...', hold: 1700 },
    { text: 'if there is one thing', hold: 1400 },
    { text: 'I wanted to do,', hold: 1700 },
    { text: 'it was to create', hold: 1500 },
    { text: 'one beautiful moment', hold: 1600 },
    { text: 'that belonged only to you.', hold: 5500 },
  ]);
  await goTo('sf', 1300);
  runFinal();
}

async function runFinal() {
  setBrighten(0.6);
  startFalling(900);
  pInt = 1.4;

  await bloomTree();
  await wait(500);

  await revealLines($('letter'), [
    'There are thousands of people', 'we meet in life.', '',
    'Most become memories.', '',
    'A very few become', 'a quiet part of our heart.', '',
    'I don’t know', 'what I am to you.', '',
    'Maybe just another name.', 'Maybe just another moment.', '',
    'But if one day', 'you ever remember me,', '',
    'I hope you remember', 'that someone once sat down,',
    'opened a blank page,', 'and built', 'a tiny little universe', 'just to make you smile.', '',
    '🌸'
  ], { stagger: 620, dur: 1100 });

  await wait(900);
  tw(1100, eo3, (t) => $('sign').style.opacity = t);
  await wait(1000);
  tw(800, eob, (t) => {
    $('mem-wrap').style.opacity = t;
    $('mem-wrap').style.transform = `scale(${.85 + t * .15})`;
  });
}
