// 한글나라 학습 콘텐츠 데이터
const CHAPTERS = [
  { id:'prep', title:'준비', emoji:'✏️', order:0, unlock:'none',
    lessons:['prep_lines','prep_circles'] },
  { id:'stage1_consonants', title:'자음', emoji:'ㄱ', order:1, unlock:'chapter_complete:prep',
    lessons:['consonant_set_1','consonant_set_2','consonant_set_3'] },
  { id:'stage1_vowels', title:'모음', emoji:'ㅏ', order:2, unlock:'chapter_complete:stage1_consonants',
    lessons:['vowel_set_1','vowel_set_2'] },
  { id:'stage2', title:'쉬운 음절', emoji:'가', order:3, unlock:'chapter_complete:stage1_vowels',
    lessons:['syllable_set_ga','syllable_set_na','syllable_set_da'] },
];

const LESSONS = {
  prep_lines: { title:'선 긋기', threshold:3, items:[
    { id:'prep_h', char:'─', name:'가로선', type:'PREP', tts:'가로선을 그어보자' },
    { id:'prep_v', char:'│', name:'세로선', type:'PREP', tts:'세로선을 그어보자' },
    { id:'prep_d', char:'╲', name:'대각선', type:'PREP', tts:'대각선을 그어보자' },
    { id:'prep_z', char:'⚡', name:'지그재그', type:'PREP', tts:'지그재그로 그어보자' },
  ]},
  prep_circles: { title:'동그라미', threshold:2, items:[
    { id:'prep_o', char:'○', name:'원', type:'PREP', tts:'동그라미를 그려보자' },
    { id:'prep_sp', char:'🌀', name:'나선', type:'PREP', tts:'빙글빙글 그려보자' },
  ]},
  consonant_set_1: { title:'ㄱ ㄴ ㄷ ㄹ ㅁ', threshold:4, items:[
    { id:'c_g', char:'ㄱ', name:'기역', type:'CHAR', tts:'기역', word:'기차' },
    { id:'c_n', char:'ㄴ', name:'니은', type:'CHAR', tts:'니은', word:'나비' },
    { id:'c_d', char:'ㄷ', name:'디귿', type:'CHAR', tts:'디귿', word:'다리' },
    { id:'c_r', char:'ㄹ', name:'리을', type:'CHAR', tts:'리을', word:'라면' },
    { id:'c_m', char:'ㅁ', name:'미음', type:'CHAR', tts:'미음', word:'모자' },
  ]},
  consonant_set_2: { title:'ㅂ ㅅ ㅇ ㅈ ㅊ', threshold:4, items:[
    { id:'c_b', char:'ㅂ', name:'비읍', type:'CHAR', tts:'비읍', word:'바다' },
    { id:'c_s', char:'ㅅ', name:'시옷', type:'CHAR', tts:'시옷', word:'사자' },
    { id:'c_ng', char:'ㅇ', name:'이응', type:'CHAR', tts:'이응', word:'오리' },
    { id:'c_j', char:'ㅈ', name:'지읒', type:'CHAR', tts:'지읒', word:'자동차' },
    { id:'c_ch', char:'ㅊ', name:'치읓', type:'CHAR', tts:'치읓', word:'치마' },
  ]},
  consonant_set_3: { title:'ㅋ ㅌ ㅍ ㅎ', threshold:3, items:[
    { id:'c_k', char:'ㅋ', name:'키읔', type:'CHAR', tts:'키읔', word:'코' },
    { id:'c_t', char:'ㅌ', name:'티읕', type:'CHAR', tts:'티읕', word:'토끼' },
    { id:'c_p', char:'ㅍ', name:'피읖', type:'CHAR', tts:'피읖', word:'포도' },
    { id:'c_h', char:'ㅎ', name:'히읗', type:'CHAR', tts:'히읗', word:'하마' },
  ]},
  vowel_set_1: { title:'ㅏ ㅑ ㅓ ㅕ ㅗ', threshold:4, items:[
    { id:'v_a', char:'ㅏ', name:'아', type:'CHAR', tts:'아' },
    { id:'v_ya', char:'ㅑ', name:'야', type:'CHAR', tts:'야' },
    { id:'v_eo', char:'ㅓ', name:'어', type:'CHAR', tts:'어' },
    { id:'v_yeo', char:'ㅕ', name:'여', type:'CHAR', tts:'여' },
    { id:'v_o', char:'ㅗ', name:'오', type:'CHAR', tts:'오' },
  ]},
  vowel_set_2: { title:'ㅛ ㅜ ㅠ ㅡ ㅣ', threshold:4, items:[
    { id:'v_yo', char:'ㅛ', name:'요', type:'CHAR', tts:'요' },
    { id:'v_u', char:'ㅜ', name:'우', type:'CHAR', tts:'우' },
    { id:'v_yu', char:'ㅠ', name:'유', type:'CHAR', tts:'유' },
    { id:'v_eu', char:'ㅡ', name:'으', type:'CHAR', tts:'으' },
    { id:'v_i', char:'ㅣ', name:'이', type:'CHAR', tts:'이' },
  ]},
  syllable_set_ga: { title:'가 나 다 라 마', threshold:4, items:[
    { id:'s_ga', char:'가', name:'가', type:'CHAR', tts:'가' },
    { id:'s_na', char:'나', name:'나', type:'CHAR', tts:'나' },
    { id:'s_da', char:'다', name:'다', type:'CHAR', tts:'다' },
    { id:'s_ra', char:'라', name:'라', type:'CHAR', tts:'라' },
    { id:'s_ma', char:'마', name:'마', type:'CHAR', tts:'마' },
  ]},
  syllable_set_na: { title:'바 사 아 자 차', threshold:4, items:[
    { id:'s_ba', char:'바', name:'바', type:'CHAR', tts:'바' },
    { id:'s_sa', char:'사', name:'사', type:'CHAR', tts:'사' },
    { id:'s_a', char:'아', name:'아', type:'CHAR', tts:'아' },
    { id:'s_ja', char:'자', name:'자', type:'CHAR', tts:'자' },
    { id:'s_cha', char:'차', name:'차', type:'CHAR', tts:'차' },
  ]},
  syllable_set_da: { title:'카 타 파 하', threshold:3, items:[
    { id:'s_ka', char:'카', name:'카', type:'CHAR', tts:'카' },
    { id:'s_ta', char:'타', name:'타', type:'CHAR', tts:'타' },
    { id:'s_pa', char:'파', name:'파', type:'CHAR', tts:'파' },
    { id:'s_ha', char:'하', name:'하', type:'CHAR', tts:'하' },
  ]},
};

const PRAISE = {
  1: ['잘했어!','좋아요!','할 수 있어!','잘 그렸어!'],
  2: ['멋져요!','잘 썼어!','대단해!','훌륭해!'],
  3: ['참 잘했어요~','최고야!','완벽해!','천재!','정말 잘했어요~'],
};
const FAIL_MSG = ['다시 써보자!','괜찮아, 한 번 더!','천천히 써보자!','조금만 더 힘내자!'];
const STICKERS = ['🐻','🐰','🦊','🐱','🐶','🐸','🦁','🐼','🌟','🌈','🎈','🎀','🍎','🍓','🌻','🦋','🚀','💎','🏆','🎨'];

function getPraise(stars) { const a = PRAISE[Math.max(1,Math.min(3,stars))]; return a[Math.random()*a.length|0]; }
function getFailMsg() { return FAIL_MSG[Math.random()*FAIL_MSG.length|0]; }
