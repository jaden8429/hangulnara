// localStorage 기반 진도/보상 관리
const STORAGE_KEY = 'hangulnara';

function loadData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData(); }
  catch(e) { return defaultData(); }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function defaultData() {
  return {
    progress: {},
    stars: 0,
    stickers: 0,
    awardedStickers: {},  // lessonId → true (중복 방지)
    settings: { dailyLimit: 30, sound: true, tts: true }
  };
}

function getProgress(itemId) {
  var d = loadData();
  return d.progress[itemId] || { success: 0, fail: 0, passed: false, bestStars: 0 };
}

function recordResult(itemId, isCorrect, stars) {
  var d = loadData();
  var p = d.progress[itemId] || { success: 0, fail: 0, passed: false, bestStars: 0 };
  if (isCorrect) {
    // 이미 통과한 문항의 재도전 → 기존 별보다 높을 때만 차이만큼 추가
    var prevStars = p.bestStars;
    p.success++;
    p.passed = true;
    if (stars > prevStars) {
      d.stars += (stars - prevStars);
      p.bestStars = stars;
    }
  } else {
    p.fail++;
  }
  d.progress[itemId] = p;
  saveData(d);
  return p;
}

function awardSticker(lessonId) {
  var d = loadData();
  // 이미 이 레슨에서 스티커를 받았으면 무시
  if (!d.awardedStickers) d.awardedStickers = {};
  if (d.awardedStickers[lessonId]) return;
  d.stickers++;
  d.awardedStickers[lessonId] = true;
  saveData(d);
}

function isLessonStickerAwarded(lessonId) {
  var d = loadData();
  return !!(d.awardedStickers && d.awardedStickers[lessonId]);
}

function getTotalStars() { return loadData().stars; }
function getTotalStickers() { return loadData().stickers; }

function getPassedCount(lessonId) {
  var lesson = LESSONS[lessonId];
  if (!lesson) return 0;
  var d = loadData();
  return lesson.items.filter(function(it) {
    var p = d.progress[it.id];
    return p && p.passed;
  }).length;
}

function isLessonUnlocked(chapterId, lessonIndex) {
  var chapter = CHAPTERS.find(function(c) { return c.id === chapterId; });
  if (!chapter) return false;
  if (lessonIndex === 0) return true;
  var prevLessonId = chapter.lessons[lessonIndex - 1];
  var prevLesson = LESSONS[prevLessonId];
  return getPassedCount(prevLessonId) >= prevLesson.threshold;
}

function isChapterUnlocked(chapterIndex) {
  if (chapterIndex === 0) return true;
  var prev = CHAPTERS[chapterIndex - 1];
  return prev.lessons.every(function(lid) {
    var lesson = LESSONS[lid];
    return getPassedCount(lid) >= lesson.threshold;
  });
}

function getChapterCompletion(chapterId) {
  var chapter = CHAPTERS.find(function(c) { return c.id === chapterId; });
  if (!chapter) return 0;
  var total = 0, passed = 0;
  chapter.lessons.forEach(function(lid) {
    var lesson = LESSONS[lid];
    total += lesson.items.length;
    passed += getPassedCount(lid);
  });
  return total > 0 ? passed / total : 0;
}

// === 초기화 기능 ===
function resetAll() {
  saveData(defaultData());
}

function resetChapter(chapterId) {
  var chapter = CHAPTERS.find(function(c) { return c.id === chapterId; });
  if (!chapter) return;
  var d = loadData();
  chapter.lessons.forEach(function(lid) {
    var lesson = LESSONS[lid];
    if (!lesson) return;
    // 해당 레슨의 아이템 진도 삭제
    lesson.items.forEach(function(it) {
      if (d.progress[it.id]) {
        d.stars -= (d.progress[it.id].bestStars || 0);
        delete d.progress[it.id];
      }
    });
    // 스티커 회수
    if (d.awardedStickers && d.awardedStickers[lid]) {
      d.stickers = Math.max(0, d.stickers - 1);
      delete d.awardedStickers[lid];
    }
  });
  d.stars = Math.max(0, d.stars);
  saveData(d);
}

function resetLesson(lessonId) {
  var lesson = LESSONS[lessonId];
  if (!lesson) return;
  var d = loadData();
  lesson.items.forEach(function(it) {
    if (d.progress[it.id]) {
      d.stars -= (d.progress[it.id].bestStars || 0);
      delete d.progress[it.id];
    }
  });
  if (d.awardedStickers && d.awardedStickers[lessonId]) {
    d.stickers = Math.max(0, d.stickers - 1);
    delete d.awardedStickers[lessonId];
  }
  d.stars = Math.max(0, d.stars);
  saveData(d);
}

function getFailedItems() {
  var d = loadData();
  var items = [];
  Object.keys(d.progress).forEach(function(id) {
    var p = d.progress[id];
    if (p.fail > 0 && !p.passed) {
      for (var lid of Object.keys(LESSONS)) {
        var item = LESSONS[lid].items.find(function(it) { return it.id === id; });
        if (item) { items.push(item); break; }
      }
    }
  });
  return items;
}
