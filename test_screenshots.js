const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SHOTS_DIR = path.join(__dirname, '..', 'screenshots');
const URL = 'http://localhost:8080';

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--window-size=1280,800'],
    defaultViewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();
  var errors = [];
  page.on('pageerror', e => { errors.push('PAGE: ' + e.message); });
  page.on('console', msg => { if (msg.type() === 'error') errors.push('LOG: ' + msg.text()); });

  async function shot(name) {
    await page.screenshot({ path: path.join(SHOTS_DIR, name + '.png'), fullPage: false });
    if (errors.length > 0) {
      console.log('!! ERRORS at ' + name + ': ' + errors.join('; '));
      errors = [];
    } else {
      console.log('OK: ' + name);
    }
  }

  // 스플래시
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await wait(500);
  await shot('01_splash');

  // 홈
  await wait(2500);
  await shot('02_home');

  // 챕터
  await page.evaluate(() => goChapters());
  await wait(400);
  await shot('03_chapters');

  // 레슨
  await page.evaluate(() => goLessons('prep'));
  await wait(400);
  await shot('04_lessons');

  // LISTEN (가로선)
  await page.evaluate(() => startLesson('prep_lines'));
  await wait(400);
  await shot('05_listen');

  // ★ GUIDED 획순 애니메이션 (핵심 테스트)
  await page.evaluate(() => { currentStage = 'GUIDED'; renderStage(); });
  await wait(500);
  await shot('06_guided_start');
  await wait(1500);
  await shot('07_guided_mid');
  await wait(2000);
  await shot('08_guided_end');

  // TRACE
  await page.evaluate(() => { currentStage = 'TRACE'; renderStage(); });
  await wait(400);
  await shot('09_trace');

  // 자음 ㄱ LISTEN
  await page.evaluate(() => startLesson('consonant_set_1'));
  await wait(400);
  await shot('10_consonant_listen');

  // ★ 자음 ㄱ GUIDED 획순 (2획 애니메이션)
  await page.evaluate(() => { currentStage = 'GUIDED'; renderStage(); });
  await wait(500);
  await shot('11_giyeok_guided_start');
  await wait(2000);
  await shot('12_giyeok_guided_mid');
  await wait(2000);
  await shot('13_giyeok_guided_end');

  // 모음 ㅏ GUIDED 획순
  await page.evaluate(() => startLesson('vowel_set_1'));
  await wait(200);
  await page.evaluate(() => { currentStage = 'GUIDED'; renderStage(); });
  await wait(500);
  await shot('14_vowel_guided_start');
  await wait(2500);
  await shot('15_vowel_guided_end');

  // ★ 보호자 대시보드 (초기화 버튼 확인)
  await page.evaluate(() => showParentDashboard());
  await wait(400);
  await shot('16_parent_dashboard_reset');

  // 전체 플로우 확인
  await page.evaluate(() => goHome());
  await wait(300);
  await shot('17_home_final');

  await browser.close();
  console.log('\n=== Done: ' + SHOTS_DIR + ' ===');
})();
