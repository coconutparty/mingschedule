import React, { useState, useEffect } from 'react';
import { BookOpen, Stethoscope, Globe, Coffee, MapPin, Clock, CalendarDays, List, Sparkles, X, Bot, Loader2, PlayCircle } from 'lucide-react';

// 주간 스케줄 데이터
const scheduleData = [
  // --- 월요일 (0) ---
  { id: 1, day: 0, start: '07:00', end: '09:30', title: '토익 LC/VOCA', type: 'toeic', desc: '아침 쉐도잉 및 단어 암기' },
  { id: 2, day: 0, start: '10:00', end: '13:00', title: '응용역학 I', type: 'major_red', location: '철도공학관 (412)' },
  { id: 3, day: 0, start: '13:00', end: '15:00', title: '전공 복습', type: 'self', desc: '응용역학 복습 및 과제' },
  { id: 4, day: 0, start: '15:00', end: '17:00', title: '철도환경공학', type: 'major_yellow', location: '철도공학관 (412)' },
  { id: 5, day: 0, start: '19:00', end: '23:00', title: '편입: 화학', type: 'premed', desc: '개념 완성과 문제 풀이' },

  // --- 화요일 (1) ---
  { id: 6, day: 1, start: '07:00', end: '09:30', title: '토익 LC/VOCA', type: 'toeic', desc: '아침 쉐도잉 및 단어 암기' },
  { id: 7, day: 1, start: '10:00', end: '13:00', title: '편입: 생물', type: 'premed', desc: '일반생물학 진도' },
  { id: 8, day: 1, start: '13:00', end: '17:00', title: '궤도재료 및 보선', type: 'major_green', location: '철도공학관 (412/413)' },
  { id: 9, day: 1, start: '19:00', end: '23:00', title: '편입: 생물', type: 'premed', desc: '오전 학습 누적 복습' },

  // --- 수요일 (2) ---
  { id: 10, day: 2, start: '07:00', end: '09:30', title: '토익 실전 모의고사', type: 'toeic', desc: '시간 맞춰 1세트 풀이' },
  { id: 11, day: 2, start: '10:00', end: '12:00', title: '토익 오답리뷰', type: 'toeic', desc: '틀린 원인 정확히 분석' },
  { id: 12, day: 2, start: '12:00', end: '15:00', title: '편입: 생물', type: 'premed', desc: '생물 기출문제 풀이' },
  { id: 13, day: 2, start: '15:00', end: '18:00', title: '편입: 화학', type: 'premed', desc: '화학 기출문제 풀이' },
  { id: 14, day: 2, start: '19:00', end: '23:00', title: '전공 자습', type: 'self', desc: '밀린 전공 과제 100% 처리' },

  // --- 목요일 (3) ---
  { id: 15, day: 3, start: '07:00', end: '09:30', title: '토익 LC/VOCA', type: 'toeic', desc: '아침 쉐도잉 및 단어 암기' },
  { id: 16, day: 3, start: '10:00', end: '13:00', title: '편입: 생물', type: 'premed', desc: '일반생물학 진도' },
  { id: 17, day: 3, start: '13:00', end: '15:00', title: '전공 복습', type: 'self', desc: '수업 전 철도환경공학 예복습' },
  { id: 18, day: 3, start: '15:00', end: '17:00', title: '철도환경공학', type: 'major_yellow', location: '철도공학관 (412)' },
  { id: 19, day: 3, start: '19:00', end: '23:00', title: '토익 RC', type: 'toeic', desc: 'Part 5,6,7 집중 공략' },

  // --- 금요일 (4) ---
  { id: 20, day: 4, start: '07:00', end: '09:30', title: '토익 LC/VOCA', type: 'toeic', desc: '아침 쉐도잉 및 단어 암기' },
  { id: 21, day: 4, start: '10:00', end: '13:00', title: '글쓰기와소통', type: 'major_teal', location: '본관동 (411)' },
  { id: 22, day: 4, start: '14:00', end: '18:00', title: '철도인프라설계', type: 'major_blue', location: '철도공학관 (411)' },
  { id: 23, day: 4, start: '19:00', end: '22:00', title: '주간 마감 / 휴식', type: 'self', desc: '가벼운 복습 후 재충전' },

  // --- 토요일 (5) ---
  { id: 24, day: 5, start: '09:00', end: '12:00', title: '편입: 생물 집중', type: 'premed', desc: '취약 단원 집중 공략' },
  { id: 25, day: 5, start: '13:00', end: '18:00', title: '편입: 화학 집중', type: 'premed', desc: '취약 단원 집중 공략' },
  { id: 26, day: 5, start: '19:00', end: '23:00', title: '토익 취약점 보완', type: 'toeic', desc: '모의고사 오답노트 복습' },

  // --- 일요일 (6) ---
  { id: 27, day: 6, start: '08:00', end: '10:00', title: '토익 실전 모의고사', type: 'toeic', desc: '시간 맞춰 1세트 풀이' },
  { id: 28, day: 6, start: '10:00', end: '13:00', title: '편입 주간 복습', type: 'premed', desc: '일주일 치 개념 총정리' },
  { id: 29, day: 6, start: '14:00', end: '18:00', title: '편입 실전 모의고사', type: 'premed', desc: '실전 감각 익히기' },
  { id: 30, day: 6, start: '19:00', end: '22:00', title: '계획 점검 / 휴식', type: 'self', desc: '다음 주 계획 세우기 및 휴식' },
];

const DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
const SHORT_DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const HOUR_HEIGHT = 65;
const START_HOUR = 7;
const END_HOUR = 24;
const HOURS_ARRAY = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);

// 한국 표준시(KST) 구하기
const getKSTDate = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (9 * 3600000));
};

const getTypeStyles = (type) => {
  const styles = {
    major_red: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900', lightBg: 'bg-red-50', iconColor: 'text-red-600' },
    major_yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900', lightBg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    major_green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900', lightBg: 'bg-green-50', iconColor: 'text-green-600' },
    major_teal: { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-900', lightBg: 'bg-teal-50', iconColor: 'text-teal-600' },
    major_blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900', lightBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    toeic: { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-900', lightBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    premed: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900', lightBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    self: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-900', lightBg: 'bg-gray-50', iconColor: 'text-gray-600' }
  };
  return styles[type] || styles.self;
};

const getTypeIcon = (type, className) => {
  if (type.startsWith('major')) return <BookOpen className={className} />;
  if (type === 'toeic') return <Globe className={className} />;
  if (type === 'premed') return <Stethoscope className={className} />;
  return <Coffee className={className} />;
};

const fetchWithRetry = async (url, options, retries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(res => setTimeout(res, delays[i]));
    }
  }
};

export default function App() {
  const [nowKST, setNowKST] = useState(getKSTDate());

  const realKstDay = nowKST.getDay();
  const realAppDay = realKstDay === 0 ? 6 : realKstDay - 1;

  const [activeDay, setActiveDay] = useState(realAppDay);

  const [aiBriefing, setAiBriefing] = useState('');
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [aiTutorResponse, setAiTutorResponse] = useState('');
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowKST(getKSTDate());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const currentHourStr = nowKST.getHours().toString().padStart(2, '0');
  const currentMinStr = nowKST.getMinutes().toString().padStart(2, '0');
  const currentTimeStr = `${currentHourStr}:${currentMinStr}`;

  const currentScheduleItem = scheduleData.find(item =>
    item.day === realAppDay &&
    item.start <= currentTimeStr &&
    item.end > currentTimeStr
  );

  const handleSaveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      setApiKey(trimmed);
      localStorage.setItem('gemini_api_key', trimmed);
    }
    setShowApiKeyModal(false);
    setApiKeyInput('');
  };

  const generateDailyBriefing = async () => {
    if (!apiKey) { setShowApiKeyModal(true); return; }
    setIsBriefingLoading(true);
    setAiBriefing('');
    try {
      const todaySchedule = scheduleData
        .filter(item => item.day === activeDay)
        .sort((a, b) => a.start.localeCompare(b.start));
      const scheduleText = todaySchedule.map(i => `[${i.title} ${i.start}~${i.end}]`).join(', ');

      const prompt = `오늘 요일은 ${DAYS[activeDay]}입니다. 학생의 오늘 일정은 다음과 같습니다: ${scheduleText || '일정 없음'}. 
      이 학생은 현재 철도공학 전공 학점 관리, 토익 990점 목표, 그리고 원광대 의대 편입(생물/화학)을 독하게 병행하고 있습니다. 
      이 일정을 바탕으로 오늘 하루를 어떻게 극복하면 좋을지, 주의할 점이나 강력한 동기부여가 되는 조언을 3문장 이내로 작성해 주세요. 친근하고 열정적인 멘토의 말투를 사용해 주세요.`;

      const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiBriefing(text || '조언을 불러오지 못했습니다. 다시 시도해 주세요!');
    } catch (error) {
      setAiBriefing('앗, AI 코치 서버와 연결이 원활하지 않아요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsBriefingLoading(false);
    }
  };

  const generateTutorTip = async (item) => {
    if (!apiKey) { setShowApiKeyModal(true); return; }
    setIsTutorLoading(true);
    setAiTutorResponse('');
    try {
      const prompt = `당신은 의대 편입, 전공, 토익을 준비하는 대학생의 1:1 개인 튜터입니다. 
      학생이 현재 학습할 내용: 과목명 "${item.title}", 세부 내용 "${item.desc || '없음'}". 
      이 과목/주제를 공부할 때 유용한 핵심 꿀팁이나, 꼭 알아야 할 필수 개념 1가지, 또는 복습용으로 좋은 아주 간단한 퀴즈 1개를 제공해 주세요. 
      스마트폰에서 읽기 좋게 짧고 간결하게(3~4문장 분량) 답변해 주세요.`;

      const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiTutorResponse(text || '팁을 불러오지 못했습니다.');
    } catch (error) {
      setAiTutorResponse('AI 튜터 응답을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setAiTutorResponse('');
  };

  const getGridStyle = (start, end) => {
    const parseTime = (time) => {
      const [h, m] = time.split(':').map(Number);
      return h + m / 60;
    };
    const startTime = parseTime(start);
    const endTime = parseTime(end);
    return {
      top: `${(startTime - START_HOUR) * HOUR_HEIGHT}px`,
      height: `${(endTime - startTime) * HOUR_HEIGHT}px`,
    };
  };

  const handleDayChange = (idx) => {
    setActiveDay(idx);
    setAiBriefing('');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-200">

      {/* API Key 설정 모달 */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Gemini API 키 설정</h2>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              AI 기능을 사용하려면 Google Gemini API 키가 필요합니다.
              키는 이 기기에만 저장되며 외부로 전송되지 않습니다.
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-500 underline mb-3 inline-block"
            >
              → Google AI Studio에서 무료 API 키 발급받기
            </a>
            <input
              type="password"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSaveApiKey()}
              placeholder="API 키를 입력하세요..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowApiKeyModal(false); setApiKeyInput(''); }}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                취소
              </button>
              <button
                onClick={handleSaveApiKey}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700"
              >
                저장
              </button>
            </div>
          </div>
      </div>
      )}

      {/* Header 영역 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                주간 마스터 스케줄
              </h1>
              <p className="text-sm md:text-base text-slate-500 mt-1 font-medium">
                철도공학 전공 <span className="mx-1 text-slate-300">|</span> 토익 990 <span className="mx-1 text-slate-300">|</span> 의대 편입 병행
        </p>
      </div>

            <div className="flex items-center gap-3">
              {/* API Key 설정 버튼 */}
              <button
                onClick={() => setShowApiKeyModal(true)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition-all
                  ${apiKey ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'}`}
              >
                <Bot className="w-3.5 h-3.5" />
                {apiKey ? 'AI 연결됨' : 'API 키 설정'}
              </button>

              {/* 범례 (Legend) */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold bg-slate-100 px-4 py-2 rounded-lg">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm"></span>전공 수업</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm"></span>토익</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm"></span>의대 편입</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-400 shadow-sm"></span>자습/휴식</span>
              </div>
            </div>
          </div>

          {/* AI 브리핑 영역 */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            {!aiBriefing && !isBriefingLoading ? (
              <button
                onClick={generateDailyBriefing}
                className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                ✨ {DAYS[activeDay]} 일정 AI 코칭받기
              </button>
            ) : (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 md:p-5 border border-indigo-100 relative shadow-inner">
                {isBriefingLoading ? (
                  <div className="flex items-center gap-3 text-indigo-600 font-medium text-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI 멘토가 {DAYS[activeDay]}의 치열한 일정을 분석 중입니다...
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm mb-2">
                      <Bot className="w-5 h-5" /> 오늘의 멘탈 코칭
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                      {aiBriefing}
                    </p>
                    <button
                      onClick={() => setAiBriefing('')}
                      className="absolute top-3 right-3 p-1.5 text-indigo-400 hover:text-indigo-700 hover:bg-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">

        {/* 실시간 KST 현황판 */}
        <div className="mb-6 bg-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-lg border border-slate-800 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="text-indigo-300 font-bold text-sm md:text-base flex items-center gap-2 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                현재 시각 (KST) • {nowKST.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })} {currentTimeStr}
              </div>
              <div className="text-xl md:text-2xl font-extrabold flex items-center gap-3">
                {currentScheduleItem ? (
                  <>
                    <PlayCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                    <span>진행 중: <span className="text-green-400">{currentScheduleItem.title}</span></span>
                  </>
                ) : (
                  <span className="text-slate-300">현재 진행 중인 일정이 없습니다. (자유 시간)</span>
                )}
              </div>
            </div>
            {currentScheduleItem && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 self-start md:self-center shrink-0">
                <div className="text-xs text-slate-400 font-semibold mb-1">스케줄 시간</div>
                <div className="font-bold text-slate-200">
                  {currentScheduleItem.start} - {currentScheduleItem.end}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === 모바일 뷰 (List Timeline) === */}
        <div className="block lg:hidden">
          {/* 요일 탭 */}
          <div className="flex overflow-x-auto pb-4 mb-2 gap-2 snap-x scrollbar-hide">
            {SHORT_DAYS.map((day, idx) => {
              const isToday = realAppDay === idx;
              const isSelected = activeDay === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleDayChange(idx)}
                  className={`flex-none snap-center px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm relative overflow-hidden
                    ${isSelected
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 shadow-indigo-200'
                      : isToday
                        ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-300'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                  {isToday && !isSelected && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full m-1 animate-pulse"></span>
                  )}
                  {day}요일 {isToday && '(오늘)'}
                </button>
              );
            })}
          </div>

          {/* 타임라인 리스트 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <CalendarDays className="w-5 h-5 text-indigo-500" />
              {DAYS[activeDay]} 일정 {realAppDay === activeDay && <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-md ml-2">TODAY</span>}
            </h2>

            <div className="relative border-l-2 border-slate-100 ml-3 md:ml-4 space-y-8 pb-4">
              {scheduleData
                .filter(item => item.day === activeDay)
                .sort((a, b) => a.start.localeCompare(b.start))
                .map((item) => {
                  const styles = getTypeStyles(item.type);
                  const isCurrentItem = currentScheduleItem && currentScheduleItem.id === item.id;
                  return (
                    <div key={item.id} className="relative pl-6 md:pl-8">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm 
                        ${isCurrentItem ? 'bg-red-500 ring-4 ring-red-100 animate-pulse' : styles.bg.replace('100', '400')}`}>
                      </div>
                      <div
                        onClick={() => handleItemClick(item)}
                        className={`p-4 rounded-xl border ${styles.lightBg} ${styles.border} shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer active:scale-[0.98] 
                          ${isCurrentItem ? 'ring-2 ring-red-400 shadow-md scale-[1.02] relative' : 'ring-1 ring-transparent hover:ring-indigo-300'}`}
                      >
                        {isCurrentItem && (
                          <div className="absolute -top-3 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm animate-bounce">
                            진행 중
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-bold text-base md:text-lg flex items-center gap-2 ${styles.text}`}>
                            {getTypeIcon(item.type, `w-4 h-4 ${styles.iconColor}`)}
                            {item.title}
                          </h3>
                          <span className="text-xs md:text-sm font-bold bg-white/60 px-2 py-1 rounded-md text-slate-600 shadow-sm border border-white/40">
                            {item.start} - {item.end}
                          </span>
                        </div>
                        {(item.location || item.desc) && (
                          <div className="mt-3 space-y-1.5">
                            {item.location && (
                              <p className="text-sm flex items-center gap-1.5 text-slate-600">
                                <MapPin className="w-3.5 h-3.5 opacity-70" /> {item.location}
                              </p>
                            )}
                            {item.desc && (
                              <p className="text-sm flex items-center gap-1.5 text-slate-600">
                                <List className="w-3.5 h-3.5 opacity-70" /> {item.desc}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="mt-3 flex justify-end">
                          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> AI 튜터 팁 보기
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {scheduleData.filter(item => item.day === activeDay).length === 0 && (
                <div className="pl-6 text-slate-400 text-sm py-4">일정이 없습니다.</div>
              )}
            </div>
          </div>
        </div>

        {/* === PC 뷰 (Grid Schedule) === */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* 그리드 헤더 (요일) */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] bg-slate-50 border-b border-slate-200">
            <div className="p-3 text-center text-xs font-semibold text-slate-400 flex items-center justify-center border-r border-slate-200 bg-white">
              <Clock className="w-4 h-4" />
            </div>
            {DAYS.map((day, idx) => {
              const isSelected = activeDay === idx;
              const isToday = realAppDay === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleDayChange(idx)}
                  className={`relative p-3 text-center font-bold text-sm border-r border-slate-200 last:border-r-0 cursor-pointer transition-colors
                    ${isSelected ? 'bg-indigo-100 text-indigo-900 shadow-sm z-10' : 'hover:bg-slate-100 text-slate-700'}
                    ${isToday && !isSelected ? 'text-indigo-600' : ''}`}
                >
                  {isSelected && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"></div>}
                  {isToday && <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>}
                  {day} {isToday && <span className="text-[10px] ml-1 opacity-70">(오늘)</span>}
                </div>
              );
            })}
          </div>

          {/* 그리드 바디 */}
          <div className="relative grid grid-cols-[60px_repeat(7,1fr)] bg-white" style={{ height: `${(END_HOUR - START_HOUR) * HOUR_HEIGHT}px` }}>

            {/* 배경 가이드라인 */}
            <div className="absolute inset-0 grid pointer-events-none">
              {HOURS_ARRAY.map((hour) => (
                <div key={hour} className="border-b border-slate-100/60 w-full" style={{ height: `${HOUR_HEIGHT}px` }}></div>
              ))}
            </div>

            {/* 좌측 시간 라벨 */}
            <div className="relative border-r border-slate-200 bg-white z-20 shadow-[1px_0_5px_rgba(0,0,0,0.02)]">
              {HOURS_ARRAY.map((hour) => (
                <div
                  key={hour}
                  className="absolute w-full text-center text-xs font-medium text-slate-400 pr-2 -translate-y-1/2"
                  style={{ top: `${(hour - START_HOUR) * HOUR_HEIGHT}px` }}
                >
                  {hour.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {/* 각 요일별 컬럼 */}
            {Array.from({ length: 7 }).map((_, dayIdx) => {
              const isSelected = activeDay === dayIdx;
              const isToday = realAppDay === dayIdx;
              return (
                <div
                  key={dayIdx}
                  className={`relative border-r border-slate-100 last:border-r-0 transition-colors
                    ${isSelected ? 'bg-indigo-50/50 border-x border-indigo-200 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)] z-10' : ''}`}
                >
                  {isToday && nowKST.getHours() >= START_HOUR && nowKST.getHours() < END_HOUR && (
                    <div
                      className="absolute left-0 right-0 border-t-2 border-red-500 z-30 pointer-events-none"
                      style={{ top: `${(nowKST.getHours() + nowKST.getMinutes() / 60 - START_HOUR) * HOUR_HEIGHT}px` }}
                    >
                      <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-md"></div>
                    </div>
                  )}

                  {scheduleData
                    .filter(item => item.day === dayIdx)
                    .map(item => {
                      const styles = getTypeStyles(item.type);
                      const positionStyle = getGridStyle(item.start, item.end);
                      const isCurrentItem = currentScheduleItem && currentScheduleItem.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          className={`absolute left-1 right-1 rounded-lg border p-2 overflow-hidden shadow-sm hover:shadow-md transition-all hover:z-40 cursor-pointer group flex flex-col ring-1 ring-transparent hover:ring-indigo-400
                            ${styles.bg} ${styles.border} ${styles.text}
                            ${isCurrentItem ? 'ring-2 ring-red-400 shadow-lg z-20' : ''}`}
                          style={positionStyle}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-[13px] leading-tight flex-1 pr-1">
                              {item.title}
                            </span>
                            {getTypeIcon(item.type, `w-3.5 h-3.5 opacity-60 flex-shrink-0 ${styles.iconColor}`)}
                          </div>
                          <div className="text-[10px] font-bold opacity-70 mb-1 flex items-center gap-1">
                            {item.start} - {item.end}
                            {isCurrentItem && <span className="text-[9px] bg-red-500 text-white px-1 rounded animate-pulse">LIVE</span>}
                          </div>
                          <div className="hidden group-hover:flex flex-col gap-1 mt-auto pt-1 text-[11px] border-t border-black/5 leading-tight">
                            {item.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>}
                            {item.desc && <span className="flex items-center gap-1"><List className="w-3 h-3" /> {item.desc}</span>}
                            <span className="flex items-center gap-1 text-indigo-600 font-bold mt-1"><Sparkles className="w-3 h-3" /> AI 꿀팁 보기</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* 개별 과목 AI 튜터 모달 */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setSelectedItem(null)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative z-10">
            <div className={`p-4 border-b flex justify-between items-center ${getTypeStyles(selectedItem.type).lightBg}`}>
              <div className="flex items-center gap-2 font-bold text-lg">
                {getTypeIcon(selectedItem.type, `w-5 h-5 ${getTypeStyles(selectedItem.type).iconColor}`)}
                <span className={getTypeStyles(selectedItem.type).text}>{selectedItem.title}</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">
                    {DAYS[selectedItem.day]}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedItem.start} - {selectedItem.end}
                  </span>
                </div>
                {selectedItem.location && (
                  <p className="text-sm flex items-center gap-2 text-slate-600 mb-1.5">
                    <MapPin className="w-4 h-4 opacity-60 text-slate-500" /> {selectedItem.location}
                  </p>
                )}
                {selectedItem.desc && (
                  <p className="text-sm flex items-center gap-2 text-slate-600">
                    <List className="w-4 h-4 opacity-60 text-slate-500" /> {selectedItem.desc}
                  </p>
                )}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-5">
                {!aiTutorResponse && !isTutorLoading ? (
                  <button
                    onClick={() => generateTutorTip(selectedItem)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-slate-900 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    ✨ AI 튜터에게 꿀팁/퀴즈 요청하기
                  </button>
                ) : (
                  <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl p-4 md:p-5 border border-slate-200">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-3 pb-3 border-b border-slate-200/60">
                      <Bot className="w-5 h-5 text-indigo-500" />
                      AI 튜터의 한마디
                    </div>
                    {isTutorLoading ? (
                      <div className="flex flex-col items-center justify-center py-6 gap-3 text-slate-500">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                        <span className="text-sm font-medium">학습에 필요한 핵심 정보를 고민 중입니다...</span>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                        {aiTutorResponse}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
