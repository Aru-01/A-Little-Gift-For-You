
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


    { text: `Funny, isn't it?`, hold: 2200 },
    { text: ``, hold: 500 },
    { text: `How someone,`, hold: 1600 },
    { text: `can become special...`, hold: 1800 },
    { text: `Without a big moment.`, hold: 1900 },
    { text: `Without a beginning`, hold: 1700 },
    { text: ``, hold: 500 },
    { text: `You can point to.`, hold: 1500 },
    { text: `They simply arrive.`, hold: 1400 },
    { text: `And little by little,`, hold: 1600 },
    { text: `they turn into`, hold: 1700 },
    { text: `one of your favorite thoughts.`, hold: 5500 },
  ]);
  await goTo('s3', 1100);
  runS3();
}

async function runS3() {
  setBrighten(0.42);
  await typeSequence($('t3'), [

    { text: `I don't know what place I have in your story.`, hold: 2800 },
    { text: ``, hold: 500 },
    { text: `Maybe only a small chapter.`, hold: 2500 },
    { text: `Maybe only a passing page.`, hold: 3000 },
    { text: ``, hold: 500 },
    { text: `But you...`, hold: 2400 },
    { text: `became one of those thoughts,`, hold: 3200 },
    { text: `that stay with me.`, hold: 1600 },
    { text: `long after the day is over.`, hold: 5500 },
  ]);
  await goTo('s4', 1100);
  runS4();
}

async function runS4() {
  setBrighten(0.68);
  spawnButterflies();
  pInt = 1.1;
  await typeSequence($('t4'), [
    { text: `Maybe you're not mine.`, hold: 2200 },
    { text: `Maybe you never will be.`, hold: 2600 },
    { text: `And that's okay.`, hold: 3500 },
    { text: ``, hold: 500 },
    { text: `Not everything beautiful`, hold: 1600 },
    { text: `needs to stay forever.`, hold: 2200 },
    { text: `Some things just need`, hold: 1600 },
    { text: `to have existed.`, hold: 5500 },
  ]);
  clearButterflies();
  await goTo('s5', 1200);
  runS5();
}

async function runS5() {
  setBrighten(0.38);
  pInt = 1.7;
  bloomFlower5();
  await wait(1800);
  await typeSequence($('t5'), [
    { text: `I wanted to make something small.`, hold: 2200 },
    { text: `Something quiet.`, hold: 2400 },
    { text: `A little place`, hold: 1900 },
    { text: ``, hold: 500 },
    { text: `where you could pause`, hold: 2200 },
    { text: `for a moment...`, hold: 3200 },
    { text: `and simply feel.`, hold: 2200 },
    { text: ``, hold: 500 },
    { text: `that your existence made the world a little softer.`, hold: 5800 },
  ]);
  await goTo('sf', 1300);
  runFinal();
}

async function runFinal() {
  setBrighten(0.58);
  startFalling(900);
  pInt = 1.4;

  await bloomTree();
  await wait(500);

  await revealLines($('letter'), [
    `I don't really know what this is.`,
    ``,
    `Maybe, 
    it doesn't need a name.`,
    ``,
    `Some people,`,
    `simply appear`,
    ``,
    `and quietly become`,
    `one of your
    favorite thoughts.`,
    ``,
    `So I made
    this little place.`,
    ``,
    `Not for answers.`,
    `Not for promises.`,
    `Just to leave behind`,
    ``,
    `something soft.`,
    `Something kind.`,
    `And a quiet hope`,
    ``,
    `that for one small moment,`,
    `this made your day`,
    ``,
    `feel`,
    `a little brighter.`,
    ``,
    `🌸`,
  ], { stagger: 620, dur: 1100 });

  await wait(900);
  tw(1100, eo3, (t) => $('sign').style.opacity = t);
  await wait(1000);
  tw(800, eob, (t) => {
    $('mem-wrap').style.opacity = t;
    $('mem-wrap').style.transform = `scale(${0.85 + t * 0.15})`;
  });
}
