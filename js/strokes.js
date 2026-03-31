// 한글 획순 데이터 (정규화 좌표 0~1)
// 각 글자: strokes 배열 → 각 stroke는 점의 배열 [{x,y}, ...]
// 순서대로 그려지며 빨간 점이 방향을 안내

var STROKE_DATA = {
  // === 준비 챕터 ===
  '─': { strokes: [[{x:0.15,y:0.5},{x:0.85,y:0.5}]] },
  '│': { strokes: [[{x:0.5,y:0.15},{x:0.5,y:0.85}]] },
  '╲': { strokes: [[{x:0.2,y:0.2},{x:0.8,y:0.8}]] },
  '⚡': { strokes: [[{x:0.2,y:0.2},{x:0.5,y:0.45},{x:0.3,y:0.55},{x:0.8,y:0.8}]] },
  '○': { strokes: [
    [{x:0.5,y:0.15},{x:0.75,y:0.2},{x:0.88,y:0.4},{x:0.88,y:0.6},{x:0.75,y:0.8},{x:0.5,y:0.85},{x:0.25,y:0.8},{x:0.12,y:0.6},{x:0.12,y:0.4},{x:0.25,y:0.2},{x:0.5,y:0.15}]
  ]},
  '🌀': { strokes: [
    [{x:0.5,y:0.5},{x:0.55,y:0.45},{x:0.6,y:0.5},{x:0.55,y:0.58},{x:0.45,y:0.6},{x:0.38,y:0.5},{x:0.42,y:0.38},{x:0.55,y:0.33},{x:0.68,y:0.4},{x:0.7,y:0.55},{x:0.62,y:0.68},{x:0.45,y:0.72},{x:0.3,y:0.62},{x:0.28,y:0.45},{x:0.35,y:0.3}]
  ]},

  // === 자음 14개 ===
  'ㄱ': { strokes: [
    [{x:0.25,y:0.25},{x:0.75,y:0.25}],  // 가로획
    [{x:0.75,y:0.25},{x:0.75,y:0.8}],   // 세로획
  ]},
  'ㄴ': { strokes: [
    [{x:0.25,y:0.2},{x:0.25,y:0.75}],   // 세로획
    [{x:0.25,y:0.75},{x:0.75,y:0.75}],  // 가로획
  ]},
  'ㄷ': { strokes: [
    [{x:0.25,y:0.2},{x:0.75,y:0.2}],    // 위 가로획
    [{x:0.25,y:0.2},{x:0.25,y:0.8}],    // 세로획
    [{x:0.25,y:0.8},{x:0.75,y:0.8}],    // 아래 가로획
  ]},
  'ㄹ': { strokes: [
    [{x:0.2,y:0.15},{x:0.8,y:0.15}],    // 1획
    [{x:0.8,y:0.15},{x:0.8,y:0.38}],    // 2획
    [{x:0.8,y:0.38},{x:0.2,y:0.38}],    // 3획
    [{x:0.2,y:0.38},{x:0.2,y:0.62}],    // 4획
    [{x:0.2,y:0.62},{x:0.8,y:0.62}],    // 5획
  ]},
  'ㅁ': { strokes: [
    [{x:0.25,y:0.2},{x:0.25,y:0.8}],    // 왼쪽 세로
    [{x:0.25,y:0.2},{x:0.75,y:0.2}],    // 위 가로
    [{x:0.75,y:0.2},{x:0.75,y:0.8}],    // 오른쪽 세로
    [{x:0.25,y:0.8},{x:0.75,y:0.8}],    // 아래 가로
  ]},
  'ㅂ': { strokes: [
    [{x:0.25,y:0.15},{x:0.25,y:0.85}],  // 왼쪽 세로
    [{x:0.75,y:0.15},{x:0.75,y:0.85}],  // 오른쪽 세로
    [{x:0.25,y:0.5},{x:0.75,y:0.5}],    // 가운데 가로
    [{x:0.25,y:0.85},{x:0.75,y:0.85}],  // 아래 가로
  ]},
  'ㅅ': { strokes: [
    [{x:0.5,y:0.15},{x:0.2,y:0.85}],    // 왼쪽 대각
    [{x:0.5,y:0.15},{x:0.8,y:0.85}],    // 오른쪽 대각
  ]},
  'ㅇ': { strokes: [
    [{x:0.5,y:0.15},{x:0.78,y:0.22},{x:0.88,y:0.45},{x:0.82,y:0.7},{x:0.6,y:0.85},{x:0.4,y:0.85},{x:0.18,y:0.7},{x:0.12,y:0.45},{x:0.22,y:0.22},{x:0.5,y:0.15}]
  ]},
  'ㅈ': { strokes: [
    [{x:0.25,y:0.2},{x:0.75,y:0.2}],    // 위 가로
    [{x:0.5,y:0.2},{x:0.2,y:0.85}],     // 왼쪽 대각
    [{x:0.5,y:0.2},{x:0.8,y:0.85}],     // 오른쪽 대각
  ]},
  'ㅊ': { strokes: [
    [{x:0.4,y:0.08},{x:0.6,y:0.08}],    // 꼭대기 점
    [{x:0.25,y:0.25},{x:0.75,y:0.25}],  // 가로
    [{x:0.5,y:0.25},{x:0.2,y:0.88}],    // 왼쪽 대각
    [{x:0.5,y:0.25},{x:0.8,y:0.88}],    // 오른쪽 대각
  ]},
  'ㅋ': { strokes: [
    [{x:0.25,y:0.2},{x:0.75,y:0.2}],    // 위 가로
    [{x:0.75,y:0.2},{x:0.75,y:0.8}],    // 세로
    [{x:0.25,y:0.5},{x:0.65,y:0.5}],    // 가운데 가로
  ]},
  'ㅌ': { strokes: [
    [{x:0.25,y:0.15},{x:0.75,y:0.15}],  // 위 가로
    [{x:0.25,y:0.15},{x:0.25,y:0.85}],  // 세로
    [{x:0.25,y:0.5},{x:0.65,y:0.5}],    // 가운데 가로
    [{x:0.25,y:0.85},{x:0.75,y:0.85}],  // 아래 가로
  ]},
  'ㅍ': { strokes: [
    [{x:0.2,y:0.2},{x:0.8,y:0.2}],      // 위 가로
    [{x:0.35,y:0.2},{x:0.35,y:0.8}],    // 왼쪽 세로
    [{x:0.65,y:0.2},{x:0.65,y:0.8}],    // 오른쪽 세로
    [{x:0.2,y:0.8},{x:0.8,y:0.8}],      // 아래 가로
  ]},
  'ㅎ': { strokes: [
    [{x:0.4,y:0.1},{x:0.6,y:0.1}],      // 꼭대기 점
    [{x:0.2,y:0.3},{x:0.8,y:0.3}],      // 가로
    [{x:0.5,y:0.5},{x:0.72,y:0.55},{x:0.78,y:0.68},{x:0.68,y:0.82},{x:0.5,y:0.88},{x:0.32,y:0.82},{x:0.22,y:0.68},{x:0.28,y:0.55},{x:0.5,y:0.5}]
  ]},

  // === 모음 10개 ===
  'ㅏ': { strokes: [
    [{x:0.4,y:0.1},{x:0.4,y:0.9}],      // 세로 긴 획
    [{x:0.4,y:0.45},{x:0.75,y:0.45}],   // 오른쪽 가로
  ]},
  'ㅑ': { strokes: [
    [{x:0.35,y:0.1},{x:0.35,y:0.9}],    // 세로
    [{x:0.35,y:0.32},{x:0.72,y:0.32}],  // 위 가로
    [{x:0.35,y:0.58},{x:0.72,y:0.58}],  // 아래 가로
  ]},
  'ㅓ': { strokes: [
    [{x:0.6,y:0.1},{x:0.6,y:0.9}],      // 세로
    [{x:0.25,y:0.45},{x:0.6,y:0.45}],   // 왼쪽 가로
  ]},
  'ㅕ': { strokes: [
    [{x:0.65,y:0.1},{x:0.65,y:0.9}],    // 세로
    [{x:0.28,y:0.32},{x:0.65,y:0.32}],  // 위 가로
    [{x:0.28,y:0.58},{x:0.65,y:0.58}],  // 아래 가로
  ]},
  'ㅗ': { strokes: [
    [{x:0.5,y:0.55},{x:0.5,y:0.2}],     // 세로 (아래→위)
    [{x:0.15,y:0.6},{x:0.85,y:0.6}],    // 가로
  ]},
  'ㅛ': { strokes: [
    [{x:0.38,y:0.55},{x:0.38,y:0.22}],  // 왼쪽 세로
    [{x:0.62,y:0.55},{x:0.62,y:0.22}],  // 오른쪽 세로
    [{x:0.15,y:0.6},{x:0.85,y:0.6}],    // 가로
  ]},
  'ㅜ': { strokes: [
    [{x:0.15,y:0.4},{x:0.85,y:0.4}],    // 가로
    [{x:0.5,y:0.4},{x:0.5,y:0.8}],      // 세로 (위→아래)
  ]},
  'ㅠ': { strokes: [
    [{x:0.15,y:0.4},{x:0.85,y:0.4}],    // 가로
    [{x:0.38,y:0.4},{x:0.38,y:0.78}],   // 왼쪽 세로
    [{x:0.62,y:0.4},{x:0.62,y:0.78}],   // 오른쪽 세로
  ]},
  'ㅡ': { strokes: [
    [{x:0.12,y:0.5},{x:0.88,y:0.5}],    // 가로
  ]},
  'ㅣ': { strokes: [
    [{x:0.5,y:0.1},{x:0.5,y:0.9}],      // 세로
  ]},

  // === 음절 (초성+중성 조합) ===
  '가': { strokes: [
    [{x:0.12,y:0.12},{x:0.42,y:0.12}],  // ㄱ 가로
    [{x:0.42,y:0.12},{x:0.42,y:0.45}],  // ㄱ 세로
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '나': { strokes: [
    [{x:0.12,y:0.08},{x:0.12,y:0.45}],  // ㄴ 세로
    [{x:0.12,y:0.45},{x:0.42,y:0.45}],  // ㄴ 가로
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '다': { strokes: [
    [{x:0.12,y:0.1},{x:0.42,y:0.1}],    // ㄷ 위
    [{x:0.12,y:0.1},{x:0.12,y:0.45}],   // ㄷ 세로
    [{x:0.12,y:0.45},{x:0.42,y:0.45}],  // ㄷ 아래
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '라': { strokes: [
    [{x:0.1,y:0.08},{x:0.42,y:0.08}],   // ㄹ 1획
    [{x:0.42,y:0.08},{x:0.42,y:0.2}],   // ㄹ 2획
    [{x:0.42,y:0.2},{x:0.1,y:0.2}],     // ㄹ 3획
    [{x:0.1,y:0.2},{x:0.1,y:0.35}],     // ㄹ 4획
    [{x:0.1,y:0.35},{x:0.42,y:0.35}],   // ㄹ 5획
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '마': { strokes: [
    [{x:0.1,y:0.08},{x:0.1,y:0.45}],    // ㅁ 왼
    [{x:0.1,y:0.08},{x:0.42,y:0.08}],   // ㅁ 위
    [{x:0.42,y:0.08},{x:0.42,y:0.45}],  // ㅁ 오른
    [{x:0.1,y:0.45},{x:0.42,y:0.45}],   // ㅁ 아래
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '바': { strokes: [
    [{x:0.1,y:0.08},{x:0.1,y:0.45}],    // ㅂ 왼
    [{x:0.42,y:0.08},{x:0.42,y:0.45}],  // ㅂ 오른
    [{x:0.1,y:0.26},{x:0.42,y:0.26}],   // ㅂ 중간
    [{x:0.1,y:0.45},{x:0.42,y:0.45}],   // ㅂ 아래
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '사': { strokes: [
    [{x:0.26,y:0.08},{x:0.1,y:0.45}],   // ㅅ 왼
    [{x:0.26,y:0.08},{x:0.42,y:0.45}],  // ㅅ 오른
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '아': { strokes: [
    [{x:0.26,y:0.08},{x:0.38,y:0.12},{x:0.42,y:0.25},{x:0.38,y:0.38},{x:0.26,y:0.42},{x:0.14,y:0.38},{x:0.1,y:0.25},{x:0.14,y:0.12},{x:0.26,y:0.08}],
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '자': { strokes: [
    [{x:0.1,y:0.1},{x:0.42,y:0.1}],     // ㅈ 가로
    [{x:0.26,y:0.1},{x:0.1,y:0.45}],    // ㅈ 왼
    [{x:0.26,y:0.1},{x:0.42,y:0.45}],   // ㅈ 오른
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '차': { strokes: [
    [{x:0.2,y:0.05},{x:0.32,y:0.05}],   // ㅊ 점
    [{x:0.1,y:0.15},{x:0.42,y:0.15}],   // ㅊ 가로
    [{x:0.26,y:0.15},{x:0.1,y:0.45}],   // ㅊ 왼
    [{x:0.26,y:0.15},{x:0.42,y:0.45}],  // ㅊ 오른
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '카': { strokes: [
    [{x:0.1,y:0.1},{x:0.42,y:0.1}],     // ㅋ 위
    [{x:0.42,y:0.1},{x:0.42,y:0.45}],   // ㅋ 세로
    [{x:0.1,y:0.28},{x:0.35,y:0.28}],   // ㅋ 중간
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '타': { strokes: [
    [{x:0.1,y:0.08},{x:0.42,y:0.08}],   // ㅌ 위
    [{x:0.1,y:0.08},{x:0.1,y:0.45}],    // ㅌ 세로
    [{x:0.1,y:0.26},{x:0.35,y:0.26}],   // ㅌ 중간
    [{x:0.1,y:0.45},{x:0.42,y:0.45}],   // ㅌ 아래
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '파': { strokes: [
    [{x:0.08,y:0.08},{x:0.44,y:0.08}],  // ㅍ 위
    [{x:0.18,y:0.08},{x:0.18,y:0.45}],  // ㅍ 왼세로
    [{x:0.34,y:0.08},{x:0.34,y:0.45}],  // ㅍ 오른세로
    [{x:0.08,y:0.45},{x:0.44,y:0.45}],  // ㅍ 아래
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
  '하': { strokes: [
    [{x:0.2,y:0.05},{x:0.32,y:0.05}],   // ㅎ 점
    [{x:0.08,y:0.16},{x:0.44,y:0.16}],  // ㅎ 가로
    [{x:0.26,y:0.28},{x:0.38,y:0.3},{x:0.42,y:0.38},{x:0.36,y:0.44},{x:0.26,y:0.46},{x:0.16,y:0.44},{x:0.1,y:0.38},{x:0.14,y:0.3},{x:0.26,y:0.28}],
    [{x:0.6,y:0.08},{x:0.6,y:0.48}],    // ㅏ 세로
    [{x:0.6,y:0.28},{x:0.85,y:0.28}],   // ㅏ 가로
  ]},
};

// 획순 애니메이션 클래스
function StrokeAnimator(canvasEl, charData, opts) {
  this.canvas = canvasEl;
  this.ctx = canvasEl.getContext('2d');
  this.charData = charData;
  this.strokeIdx = 0;
  this.pointIdx = 0;
  this.progress = 0;
  this.animSpeed = (opts && opts.speed) || 0.025; // 프레임당 진행량
  this.onComplete = (opts && opts.onComplete) || null;
  this.running = false;
  this.completedStrokes = [];
  this.dotColor = '#FF6B6B';
  this.strokeColor = '#4A3728';
  this.previewColor = '#D0D0D0';
  this.lineWidth = (opts && opts.lineWidth) || 6;
  this._raf = null;
}

StrokeAnimator.prototype.start = function() {
  this.running = true;
  this.strokeIdx = 0;
  this.progress = 0;
  this.completedStrokes = [];
  this._drawPreview();
  this._animate();
};

StrokeAnimator.prototype.stop = function() {
  this.running = false;
  if (this._raf) cancelAnimationFrame(this._raf);
};

StrokeAnimator.prototype._drawPreview = function() {
  // 모든 획을 연한 회색으로 미리 그림
  var ctx = this.ctx;
  var w = this.canvas.width, h = this.canvas.height;
  this.charData.strokes.forEach(function(stroke) {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x * w, stroke[0].y * h);
    for (var i = 1; i < stroke.length; i++) {
      ctx.lineTo(stroke[i].x * w, stroke[i].y * h);
    }
    ctx.strokeStyle = this.previewColor;
    ctx.lineWidth = this.lineWidth + 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }.bind(this));
};

StrokeAnimator.prototype._animate = function() {
  if (!this.running) return;
  var self = this;

  var ctx = this.ctx;
  var w = this.canvas.width, h = this.canvas.height;
  var strokes = this.charData.strokes;

  if (this.strokeIdx >= strokes.length) {
    // 모든 획 완료 → 잠시 후 콜백
    this.running = false;
    if (this.onComplete) setTimeout(this.onComplete, 600);
    return;
  }

  var stroke = strokes[this.strokeIdx];
  this.progress += this.animSpeed;

  // 캔버스 클리어 및 다시 그리기
  ctx.clearRect(0, 0, w, h);

  // 미리보기 (연한)
  this._drawPreview();

  // 완료된 획 (진한)
  this.completedStrokes.forEach(function(s) {
    self._drawStroke(s, self.strokeColor, self.lineWidth);
  });

  // 현재 진행 중인 획
  if (this.progress < 1) {
    this._drawPartialStroke(stroke, this.progress, this.strokeColor, this.lineWidth);
    // 빨간 안내 점
    var pos = this._getPointAt(stroke, this.progress);
    ctx.beginPath();
    ctx.arc(pos.x * w, pos.y * h, this.lineWidth + 4, 0, Math.PI * 2);
    ctx.fillStyle = this.dotColor;
    ctx.fill();

    // 숫자 표시 (획 번호)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold ' + (this.lineWidth + 4) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(this.strokeIdx + 1), pos.x * w, pos.y * h);

    this._raf = requestAnimationFrame(function() { self._animate(); });
  } else {
    // 현재 획 완료
    this.completedStrokes.push(stroke);
    this.strokeIdx++;
    this.progress = 0;
    // 다음 획 시작 전 잠시 대기
    setTimeout(function() { self._animate(); }, 300);
  }
};

StrokeAnimator.prototype._drawStroke = function(stroke, color, width) {
  var ctx = this.ctx;
  var w = this.canvas.width, h = this.canvas.height;
  if (stroke.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(stroke[0].x * w, stroke[0].y * h);
  for (var i = 1; i < stroke.length; i++) {
    ctx.lineTo(stroke[i].x * w, stroke[i].y * h);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};

StrokeAnimator.prototype._drawPartialStroke = function(stroke, progress, color, width) {
  var ctx = this.ctx;
  var w = this.canvas.width, h = this.canvas.height;
  if (stroke.length < 2) return;

  // 전체 길이 계산
  var totalLen = 0;
  for (var i = 1; i < stroke.length; i++) {
    var dx = (stroke[i].x - stroke[i-1].x) * w;
    var dy = (stroke[i].y - stroke[i-1].y) * h;
    totalLen += Math.sqrt(dx * dx + dy * dy);
  }
  var targetLen = totalLen * progress;

  ctx.beginPath();
  ctx.moveTo(stroke[0].x * w, stroke[0].y * h);
  var drawn = 0;
  for (var i = 1; i < stroke.length; i++) {
    var dx = (stroke[i].x - stroke[i-1].x) * w;
    var dy = (stroke[i].y - stroke[i-1].y) * h;
    var segLen = Math.sqrt(dx * dx + dy * dy);
    if (drawn + segLen <= targetLen) {
      ctx.lineTo(stroke[i].x * w, stroke[i].y * h);
      drawn += segLen;
    } else {
      var remaining = targetLen - drawn;
      var ratio = remaining / segLen;
      var px = stroke[i-1].x + (stroke[i].x - stroke[i-1].x) * ratio;
      var py = stroke[i-1].y + (stroke[i].y - stroke[i-1].y) * ratio;
      ctx.lineTo(px * w, py * h);
      break;
    }
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};

StrokeAnimator.prototype._getPointAt = function(stroke, progress) {
  if (stroke.length < 2) return stroke[0];
  // _drawPartialStroke과 동일하게 픽셀 좌표 기반 거리 계산
  var w = this.canvas.width, h = this.canvas.height;
  var totalLen = 0;
  for (var i = 1; i < stroke.length; i++) {
    var dx = (stroke[i].x - stroke[i-1].x) * w;
    var dy = (stroke[i].y - stroke[i-1].y) * h;
    totalLen += Math.sqrt(dx * dx + dy * dy);
  }
  var targetLen = totalLen * progress;
  var drawn = 0;
  for (var i = 1; i < stroke.length; i++) {
    var dx = (stroke[i].x - stroke[i-1].x) * w;
    var dy = (stroke[i].y - stroke[i-1].y) * h;
    var segLen = Math.sqrt(dx * dx + dy * dy);
    if (drawn + segLen >= targetLen) {
      var ratio = (targetLen - drawn) / segLen;
      return {
        x: stroke[i-1].x + (stroke[i].x - stroke[i-1].x) * ratio,
        y: stroke[i-1].y + (stroke[i].y - stroke[i-1].y) * ratio
      };
    }
    drawn += segLen;
  }
  return stroke[stroke.length - 1];
};
