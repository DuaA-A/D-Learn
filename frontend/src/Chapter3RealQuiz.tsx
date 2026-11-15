import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import {
  CH3_L1_QUIZ_MCQS,
  CH3_L1_QUIZ_WRITTEN,
} from './ch3_lesson1_quiz_data';

const t = (en: string, ar: string, lang: string) => (lang === 'ar' ? ar : en);
const dir = (lang: string) => (lang === 'ar' ? 'rtl' : 'ltr');

export default function Chapter3RealQuiz() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // ── States ──────────────────────────────────────────────────
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const mcqs = CH3_L1_QUIZ_MCQS;
  const writtens = CH3_L1_QUIZ_WRITTEN;
  const allQuestions = [...mcqs, ...writtens];
  const totalQuestions = allQuestions.length;

  // ── Timer Effect ────────────────────────────────────────────
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ── Score Calculation ───────────────────────────────────────
  const calculateMcqScore = () => {
    let score = 0;
    mcqs.forEach(q => {
      if (selectedMcqAnswers[q.id] === q.correct_option) {
        score += 1;
      }
    });
    return score;
  };

  const mcqScore = calculateMcqScore();
  const totalMcq = mcqs.length;
  const mcqPct = Math.round((mcqScore / totalMcq) * 100);

  const activeQuestion = allQuestions[currentQuestionIndex];
  const isMcq = activeQuestion.type === 'MCQ';

  const answeredCount =
    Object.keys(selectedMcqAnswers).length +
    Object.values(writtenAnswers).filter(text => text.trim().length > 0).length;

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-24" dir={dir(lang)}>
      {/* ── TOP HEADER (Clean, Professional, Zero Icons) ──────── */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            >
              {t('Back to Dashboard', 'العودة للرئيسية', lang)}
            </button>

            {/* Timer Badge */}
            {!isSubmitted && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {t('Time Remaining:', 'الوقت المتبقي:', lang)}
                </span>
                <span className={`px-3.5 py-1.5 rounded-xl font-mono text-sm font-black border ${
                  timeLeft < 300
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-800 text-teal-300 border-slate-700'
                }`}>
                  {formatTime(timeLeft)}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 cursor-pointer"
                >
                  {isTimerRunning ? t('Pause', 'إيقاف', lang) : t('Resume', 'استئناف', lang)}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/20 inline-block mb-1.5">
                {t('Lesson 3-1 Real Assessment Quiz', 'كويز تقييم الدرس 3-1 المعتمد', lang)}
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                {t('The Overall Structure of Web Applications Quiz', 'اختبار إتقان: البنية العامة لتطبيقات الويب', lang)}
              </h1>
            </div>

            {/* Progress stats */}
            <div className="flex items-center gap-2 text-xs font-bold bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
              <span className="text-slate-300">
                {t('Answered:', 'تمت الإجابة:', lang)}
              </span>
              <span className="text-sky-300 font-mono font-black">
                {answeredCount} / {totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ══════════════════════════════════════════════════════ */}
        {/* VIEW 1: ACTIVE QUIZ VIEW (BEFORE SUBMISSION)           */}
        {/* ══════════════════════════════════════════════════════ */}
        {!isSubmitted && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Questions Navigator (Sidebar on desktop) */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm sticky top-6">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
                  {t('Question Palette', 'لوحة الأسئلة', lang)}
                </h4>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  {allQuestions.map((q, qIdx) => {
                    const isCur = qIdx === currentQuestionIndex;
                    const isAns =
                      q.type === 'MCQ'
                        ? !!selectedMcqAnswers[q.id]
                        : !!writtenAnswers[q.id]?.trim();

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(qIdx)}
                        className={`h-9 rounded-xl text-xs font-black transition-all flex items-center justify-center border cursor-pointer ${
                          isCur
                            ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-400'
                            : isAns
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {qIdx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-1.5 text-[11px] font-bold text-slate-500 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-sky-600"></span>
                    <span>{t('Answered', 'تمت الإجابة عليه', lang)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300"></span>
                    <span>{t('Pending', 'متبقٍ بدون إجابة', lang)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => {
                    if (window.confirm(t('Are you sure you want to submit your quiz?', 'هل أنت متأكد من تسليم الكويز الآن؟', lang))) {
                      setIsSubmitted(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-500 hover:opacity-95 text-white text-xs font-black transition-all shadow-md shadow-sky-600/20 cursor-pointer"
                >
                  {t('Submit Quiz Now', 'تسليم الكويز وإنهاء الاختبار', lang)}
                </button>
              </div>
            </div>

            {/* Active Question Box */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                {/* Question Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                      {currentQuestionIndex + 1}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-black border uppercase ${
                        isMcq
                          ? 'bg-sky-100 text-sky-900 border-sky-300'
                          : 'bg-purple-100 text-purple-900 border-purple-300'
                      }`}
                    >
                      {isMcq ? t('Multiple Choice (1 Mark)', 'اختيار من متعدد (درجة واحدة)', lang) : t('Written Response', 'سؤال مقالي وتطبيقي', lang)}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {activeQuestion.difficulty}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    {t('Question', 'سؤال', lang)} {currentQuestionIndex + 1} {t('of', 'من', lang)} {totalQuestions}
                  </span>
                </div>

                {/* Prompt */}
                <h3 className="text-base sm:text-xl font-black text-slate-900 mb-6 leading-relaxed">
                  {lang === 'ar' ? activeQuestion.question_ar : activeQuestion.question_en}
                </h3>

                {/* ── MCQ Form ── */}
                {isMcq && 'option_a_ar' in activeQuestion && (
                  <div className="space-y-3 mb-6">
                    {(['A', 'B', 'C', 'D'] as const).map(optKey => {
                      const optTextAr = activeQuestion[`option_${optKey.toLowerCase()}_ar` as keyof typeof activeQuestion] as string;
                      const optTextEn = activeQuestion[`option_${optKey.toLowerCase()}_en` as keyof typeof activeQuestion] as string;
                      const isSelected = selectedMcqAnswers[activeQuestion.id] === optKey;

                      return (
                        <button
                          key={optKey}
                          onClick={() => setSelectedMcqAnswers(prev => ({ ...prev, [activeQuestion.id]: optKey }))}
                          className={`w-full p-4 rounded-2xl border text-start text-xs sm:text-sm font-semibold transition-all flex items-center gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'bg-sky-50 border-sky-500 text-sky-950 font-black shadow-xs ring-1 ring-sky-300'
                              : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-sky-600 text-white border-sky-600'
                                : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span>{lang === 'ar' ? optTextAr : optTextEn}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Written Response Form ── */}
                {!isMcq && (
                  <div className="mb-6">
                    <label className="block text-xs font-black text-slate-700 mb-2">
                      {t('Write your answer here (for self-practice):', 'اكتب إجابتك هنا للتدرب الذاتي:', lang)}
                    </label>
                    <textarea
                      value={writtenAnswers[activeQuestion.id] || ''}
                      onChange={e =>
                        setWrittenAnswers(prev => ({ ...prev, [activeQuestion.id]: e.target.value }))
                      }
                      rows={5}
                      placeholder={t('Type your detailed explanation or answer...', 'اكتب إجابتك المنظمة هنا بالنقاط...', lang)}
                      className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm font-medium bg-slate-50 leading-relaxed"
                    />
                    <span className="text-[11px] font-bold text-slate-400 mt-1 block">
                      {t('You will compare this with the official model answer upon submitting.', 'ستقارن إجابتك بنموذج الإجابة الوزاري المعتمد فور تسليم الاختبار.', lang)}
                    </span>
                  </div>
                )}

                {/* Bottom Card Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-black text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {t('Previous Question', 'السؤال السابق', lang)}
                  </button>

                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  >
                    {t('Next Question', 'السؤال التالي', lang)}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* VIEW 2: POST-SUBMISSION RESULTS & MODEL ANSWERS        */}
        {/* ══════════════════════════════════════════════════════ */}
        {isSubmitted && (
          <div className="space-y-8">
            {/* Score Hero */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <span className="text-xs font-black text-sky-600 uppercase tracking-wider block mb-1">
                {t('Quiz Results & Evaluation', 'تقرير نتيجة الاختبار', lang)}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
                {t('Lesson 3-1 Performance Summary', 'ملخص أداء الدرس 3-1: البنية العامة لتطبيقات الويب', lang)}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                  <span className="text-xs font-bold text-sky-800 block mb-1">{t('MCQ Score', 'درجة الاختيار من متعدد', lang)}</span>
                  <span className="text-2xl font-black text-sky-950 font-mono">
                    {mcqScore} / {totalMcq} ({mcqPct}%)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-xs font-bold text-purple-800 block mb-1">{t('Written Questions', 'الأسئلة المقالية', lang)}</span>
                  <span className="text-2xl font-black text-purple-950 font-mono">
                    {writtens.length} {t('Questions', 'أسئلة', lang)}
                  </span>
                  <span className="text-[11px] font-bold text-purple-700 block mt-0.5">{t('Self-Grade via Model', 'تصحيح ذاتي بالنموذج', lang)}</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 block mb-1">{t('Status', 'التقدير التقييمي', lang)}</span>
                  <span className="text-lg font-black text-emerald-950">
                    {mcqPct >= 80 ? t('Excellent Mastery', 'إتقان ممتاز', lang) : mcqPct >= 50 ? t('Good Progress', 'مستوى جيد', lang) : t('Needs Review', 'يحتاج لمراجعة النوتات', lang)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentQuestionIndex(0);
                    setSelectedMcqAnswers({});
                    setWrittenAnswers({});
                    setTimeLeft(20 * 60);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-sm cursor-pointer"
                >
                  {t('Retake Quiz', 'إعادة الاختبار من جديد', lang)}
                </button>
                <button
                  onClick={() => navigate('/chapter3-review')}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black shadow-sm cursor-pointer"
                >
                  {t('Open Lesson Notes', 'فتح ملزمة النوتات للدرس', lang)}
                </button>
                <button
                  onClick={() => navigate('/chapter3-practice')}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 cursor-pointer"
                >
                  {t('Practice More Questions', 'بنك أسئلة الوزارة الكامل', lang)}
                </button>
              </div>
            </div>

            {/* Detailed Questions Review */}
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {t('Detailed Answer Key & Certified Explanations', 'مراجعة الإجابات ونماذج التصحيح المعتمدة', lang)}
            </h3>

            <div className="space-y-6">
              {allQuestions.map((q, idx) => {
                const isItemMcq = q.type === 'MCQ';
                const userChoice = selectedMcqAnswers[q.id];
                const isCorrect = isItemMcq && userChoice === (q as any).correct_option;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm transition-all ${
                      isItemMcq
                        ? isCorrect
                          ? 'border-emerald-300'
                          : 'border-rose-300'
                        : 'border-purple-200'
                    }`}
                  >
                    {/* Item Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-lg font-black border uppercase ${
                            isItemMcq
                              ? 'bg-sky-100 text-sky-900 border-sky-300'
                              : 'bg-purple-100 text-purple-900 border-purple-300'
                          }`}
                        >
                          {isItemMcq ? t('MCQ', 'اختيار من متعدد', lang) : t('Written', 'سؤال مقالي', lang)}
                        </span>
                      </div>

                      {isItemMcq && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black border ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {isCorrect ? t('Correct (+1)', 'إجابة صحيحة (+1)', lang) : t('Incorrect (0)', 'إجابة خاطئة (0)', lang)}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-slate-900 mb-4">
                      {lang === 'ar' ? q.question_ar : q.question_en}
                    </h4>

                    {/* MCQ Options Review */}
                    {isItemMcq && (
                      <div className="space-y-2 mb-4">
                        {(['A', 'B', 'C', 'D'] as const).map(optKey => {
                          const optTextAr = (q as any)[`option_${optKey.toLowerCase()}_ar`];
                          const optTextEn = (q as any)[`option_${optKey.toLowerCase()}_en`];
                          const isRight = (q as any).correct_option === optKey;
                          const wasPicked = userChoice === optKey;

                          let rowClass = 'border-slate-200 bg-slate-50/60 text-slate-700';
                          if (isRight) rowClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          else if (wasPicked && !isRight) rowClass = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold';

                          return (
                            <div
                              key={optKey}
                              className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${rowClass}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 text-xs font-black flex items-center justify-center text-slate-800">
                                  {optKey}
                                </span>
                                <span>{lang === 'ar' ? optTextAr : optTextEn}</span>
                              </div>
                              {isRight && (
                                <span className="text-[11px] font-black text-emerald-800 uppercase">
                                  {t('Correct Option', 'الخيار الصحيح المعتمد', lang)}
                                </span>
                              )}
                              {wasPicked && !isRight && (
                                <span className="text-[11px] font-black text-rose-700 uppercase">
                                  {t('Your Choice', 'اختيارك', lang)}
                                </span>
                              )}
                            </div>
                          );
                        })}

                        {/* Explanation */}
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
                          <span className="block font-black text-slate-900 uppercase text-[11px] mb-1">
                            {t('Curriculum Explanation:', 'التوضيح المعتمد في المنهج:', lang)}
                          </span>
                          <p className="font-medium text-slate-700 leading-relaxed">
                            {lang === 'ar' ? (q as any).explanation_ar : (q as any).explanation_en}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Written Review */}
                    {!isItemMcq && (
                      <div className="space-y-4">
                        {/* Student Response */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-black text-slate-600 block mb-1">
                            {t('Your Written Answer:', 'إجابتك المسجلة أثناء الاختبار:', lang)}
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {writtenAnswers[q.id]?.trim() || t('(No response was typed)', '(لم يتم كتابة إجابة)', lang)}
                          </p>
                        </div>

                        {/* Official Model Answer */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/80 border-2 border-purple-200">
                          <span className="text-xs font-black text-purple-900 uppercase tracking-wider block mb-1.5">
                            {t('Certified Model Answer:', 'نموذج الإجابة الوزاري المعتمد:', lang)}
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-purple-950 whitespace-pre-wrap leading-relaxed mb-3">
                            {lang === 'ar' ? (q as any).ideal_answer_ar : (q as any).ideal_answer_en}
                          </p>

                          {/* Grading Criteria */}
                          <div className="pt-2 border-t border-purple-200/80">
                            <span className="text-[11px] font-black text-purple-900 block mb-1">
                              {t('Grading Criteria (Marks Breakdown):', 'معايير توزيع الدرجات (دليل التصحيح):', lang)}
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-xs text-purple-900 font-medium">
                              {(lang === 'ar' ? (q as any).grading_criteria_ar : (q as any).grading_criteria_en).map((crit: string, cIdx: number) => (
                                <li key={cIdx}>{crit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
