const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const SHOTS = path.join(__dirname, '..', 'screenshots');
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  if (!fs.existsSync(SHOTS)) fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'], defaultViewport: { width: 1280, height: 800 } });
  const page = await browser.newPage();
  var errs = [];
  page.on('pageerror', e => errs.push(e.message));
  async function shot(n) {
    await page.screenshot({ path: path.join(SHOTS, n + '.png') });
    if (errs.length) { console.log('!! ' + n + ': ' + errs.join('; ')); errs = []; }
    else console.log('OK ' + n);
  }

  await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
  await wait(500); await shot('01_splash');
  await wait(2500); await shot('02_home');

  // 테마 학습
  await page.evaluate(() => goThemes());
  await wait(400); await shot('03_themes');

  // 동물 테마 시작
  await page.evaluate(() => startTheme('animals'));
  await wait(400); await shot('04_theme_listen');

  // GUIDED 획순
  await page.evaluate(() => { currentStage = 'GUIDED'; renderStage(); });
  await wait(1500); await shot('05_theme_guided');

  // TRACE (2배 큰 캔버스)
  await page.evaluate(() => { currentStage = 'TRACE'; renderStage(); });
  await wait(400); await shot('06_trace_big');

  // 캔버스에 그리기
  var canvas = await page.$('#writingCanvas');
  if (canvas) {
    var box = await canvas.boundingBox();
    await page.mouse.move(box.x + 40, box.y + box.height / 2);
    await page.mouse.down();
    for (var x = 40; x < box.width - 40; x += 3)
      await page.mouse.move(box.x + x, box.y + box.height / 2);
    await page.mouse.up();
    await wait(300); await shot('07_trace_drawn');
    await wait(2000); await shot('08_auto_eval');
  }

  // FREE → PRAISE
  await wait(1500);
  canvas = await page.$('#writingCanvas');
  if (canvas) {
    var box = await canvas.boundingBox();
    await page.mouse.move(box.x + 40, box.y + box.height / 2);
    await page.mouse.down();
    for (var x = 40; x < box.width - 40; x += 3)
      await page.mouse.move(box.x + x, box.y + box.height / 2);
    await page.mouse.up();
    await wait(2000); await shot('09_free_eval');
  }
  await wait(1500); await shot('10_praise');

  // 자음 학습
  await page.evaluate(() => startLesson('consonant_set_1'));
  await wait(400); await shot('11_consonant_listen');
  await page.evaluate(() => { currentStage = 'TRACE'; renderStage(); });
  await wait(400); await shot('12_consonant_trace');

  // 보호자 대시보드 (이름 설정 확인)
  await page.evaluate(() => showParentDashboard());
  await wait(400); await shot('13_parent_name');

  await page.evaluate(() => goHome());
  await wait(300); await shot('14_home_final');

  await browser.close();
  console.log('\nDone: ' + SHOTS);
})();
