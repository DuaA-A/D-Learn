import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import { CH3_L1_PRACTICE_QUESTIONS } from './ch3_lesson1_practice_data';

const t = (en: string, ar: string, lang: string) => (lang === 'ar' ? ar : en);
const dir = (lang: string) => (lang === 'ar' ? 'rtl' : 'ltr');

export default function Chapter3Practice() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  const [typeFilter, setTypeFilter] = useState<'ALL' | 'MCQ' | 'WRITTEN'>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');
  const [search, setSearch] = useState('');

  // Selected option per MCQ question id
  const [selectedOptions, setSelectedOptions] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Revealed model answers for written questions
  const [revealedWritten, setRevealedWritten] = useState<Record<string, boolean>>({});

  const filteredQuestions = CH3_L1_PRACTICE_QUESTIONS.filter(q => {
    if (typeFilter !== 'ALL' && q.type !== typeFilter) return false;
    if (difficultyFilter !== 'ALL' && q.difficulty !== difficultyFilter) return false;
    if (search.trim() !== '') {
      const s = search.toLowerCase();
      const inAr = q.question_ar.includes(s) || q.ideal_answer_ar.includes(s);
      const inEn = q.question_en.toLowerCase().includes(s) || q.ideal_answer_en.toLowerCase().includes(s);
      if (!inAr && !inEn) return false;
    }
    return true;
  });

  const mcqCount = CH3_L1_PRACTICE_QUESTIONS.filter(q => q.type === 'MCQ').length;
  const writtenCount = CH3_L1_PRACTICE_QUESTIONS.filter(q => q.type === 'WRITTEN').length;

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-24" dir={dir(lang)}>
      {/* ── HEADER ── */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            >
              {t('Back to Dashboard', 'العودة للرئيسية', lang)}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/chapter3-review')}
                className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-black text-white transition-all shadow-sm cursor-pointer"
              >
                {t('Study Notes & Review', 'ملزمة ونوتات الشرح', lang)}
              </button>
              <button
                onClick={() => navigate('/chapter3-quiz')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 cursor-pointer"
              >
                {t('Take Quiz', 'بدء الكويز', lang)}
              </button>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/20 inline-block mb-2">
            {t('Official Ministry Practice Bank', 'بنك أسئلة وتدريبات الوزارة الرسمية', lang)}
          </span>
          <h1 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">
            {t('Unit 3 · Lesson 3-1 Practice & Assessments', 'تدريبات وتقييمات الوحدة الثالثة · الدرس 3-1', lang)}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
            {t(
              'All official classroom tasks, homeworks, and weekly assessment models (A, B, C) from pages 48 to 52 with certified model answers.',
              'جميع أسئلة كتاب التقييمات والأداءات الصفية والمنزلية ونماذج التقييم الأسبوعي (A، B، C) من ص 48 إلى ص 52 بنماذج إجابة واقعية ومعتمدة.',
              lang
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold text-slate-300">
            <span className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              {CH3_L1_PRACTICE_QUESTIONS.length} {t('Total Questions', 'سؤال تدريبي', lang)}
            </span>
            <span className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              {mcqCount} {t('MCQ Questions', 'سؤال اختيار من متعدد', lang)}
            </span>
            <span className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              {writtenCount} {t('Written Questions', 'سؤال مقالي وتحليلي', lang)}
            </span>
          </div>
        </div>
      </div>

      {/* ── TOOLBAR / FILTERS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Question Type Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTypeFilter('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                typeFilter === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('All Questions', 'كل الأسئلة', lang)} ({CH3_L1_PRACTICE_QUESTIONS.length})
            </button>
            <button
              onClick={() => setTypeFilter('MCQ')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                typeFilter === 'MCQ'
                  ? 'bg-sky-700 text-white border-sky-700 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('MCQ Only', 'اختيار من متعدد فقط', lang)} ({mcqCount})
            </button>
            <button
              onClick={() => setTypeFilter('WRITTEN')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                typeFilter === 'WRITTEN'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('Written Only', 'مقالي وتحليلي فقط', lang)} ({writtenCount})
            </button>
          </div>

          {/* Difficulty & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-black">
              {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    difficultyFilter === diff
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff === 'ALL' ? t('All', 'الكل', lang) : diff}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('Search questions...', 'ابحث في الأسئلة...', lang)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
            />
          </div>
        </div>

        {/* ── QUESTIONS LIST ── */}
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm transition-all"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg font-black border uppercase ${
                      q.type === 'MCQ'
                        ? 'bg-sky-100 text-sky-900 border-sky-300'
                        : 'bg-purple-100 text-purple-900 border-purple-300'
                    }`}
                  >
                    {q.type === 'MCQ' ? t('MCQ', 'اختيار من متعدد', lang) : t('Written', 'سؤال مقالي', lang)}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg font-bold bg-slate-100 text-slate-600 border border-slate-200">
                    {q.difficulty}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-lg font-bold bg-slate-50 text-slate-500 border border-slate-200 text-[11px]">
                  {lang === 'ar' ? q.source_ar : q.source_en}
                </span>
              </div>

              {/* Question Prompt */}
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-4 leading-snug">
                {lang === 'ar' ? q.question_ar : q.question_en}
              </h3>

              {/* ── MCQ RENDERING ── */}
              {q.type === 'MCQ' && q.options_ar && (
                <div className="space-y-2.5 mb-4">
                  {q.options_ar.map((opt, oIdx) => {
                    const optEn = q.options_en ? q.options_en[oIdx].text : '';
                    const isSelected = selectedOptions[q.id] === opt.key;
                    const isCorrect = q.correct_option === opt.key;
                    const isAnswered = !!selectedOptions[q.id];

                    let btnClass = 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'border-rose-400 bg-rose-50 text-rose-950';
                      } else {
                        btnClass = 'opacity-50 border-slate-200 bg-slate-50 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          if (!isAnswered) {
                            setSelectedOptions(prev => ({ ...prev, [q.id]: opt.key }));
                          }
                        }}
                        disabled={isAnswered}
                        className={`w-full p-3.5 rounded-2xl border text-start text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 border ${
                              isAnswered && isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : isAnswered && isSelected && !isCorrect
                                  ? 'bg-rose-500 text-white border-rose-500'
                                  : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span>{lang === 'ar' ? opt.text : optEn}</span>
                        </div>
                        {isAnswered && isCorrect && (
                          <span className="text-[11px] font-black text-emerald-700 shrink-0 uppercase tracking-wider">
                            {t('Correct Answer', 'الإجابة الصحيحة', lang)}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {selectedOptions[q.id] && (
                    <div className="mt-3 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm">
                      <span className="block font-black text-emerald-900 uppercase text-[11px] mb-1">
                        {t('Explanation & Verification:', 'التوضيح والتحقق من المنهج:', lang)}
                      </span>
                      <p className="font-medium text-emerald-950 leading-relaxed">
                        {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── WRITTEN RENDERING ── */}
              {q.type === 'WRITTEN' && (
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        setRevealedWritten(prev => ({ ...prev, [q.id]: !prev[q.id] }))
                      }
                      className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-black transition-colors border border-purple-200 cursor-pointer"
                    >
                      {revealedWritten[q.id]
                        ? t('Hide Model Answer', 'إخفاء الإجابة النموذجية', lang)
                        : t('Show Certified Model Answer', 'عرض نموذج الإجابة المعتمد', lang)}
                    </button>
                  </div>

                  {revealedWritten[q.id] && (
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-50/80 to-white border-2 border-purple-200 text-xs sm:text-sm">
                      <span className="block font-black text-purple-900 uppercase text-[11px] mb-2">
                        {t('Ideal Student Answer (Egyptian Baccalaureate Model):', 'نموذج الإجابة الوزاري المعتمد للطالب:', lang)}
                      </span>
                      <p className="font-medium text-slate-800 leading-relaxed whitespace-pre-wrap mb-3">
                        {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                      </p>
                      {q.explanation_ar && (
                        <div className="pt-2 border-t border-purple-100 text-xs text-purple-950 font-bold">
                          {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-slate-500">
                {t('No questions found matching your filters.', 'لا توجد أسئلة تطابق الفلاتر المحددة.', lang)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
