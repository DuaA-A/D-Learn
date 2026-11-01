import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  AlertTriangle,
  FileText,
  Lightbulb,
  Sparkles,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from './App';
import { CH2_REAL_QUIZ_QUESTIONS } from './ch2QuizData';
import type { Ch2QuizQuestion } from './ch2QuizData';

// ── helpers ──────────────────────────────────────────────────
const t = (en: string, ar: string, lang: string) => lang === 'ar' ? ar : en;
const dir = (lang: string) => lang === 'ar' ? 'rtl' : 'ltr';

const TOTAL = CH2_REAL_QUIZ_QUESTIONS.length; // 10
const TIMER_SECONDS = 20 * 60; // 20 minutes

export default function Chapter2RealQuiz() {
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // ── state ─────────────────────────────────────────────────
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT'>('ALL');
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = TOTAL - answeredCount;

  // ── timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          executeSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── selection ────────────────────────────────────────────
  const handleSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [CH2_REAL_QUIZ_QUESTIONS[currentQ].id]: option }));
  };

  // ── submit ────────────────────────────────────────────────
  const executeSubmit = async () => {
    setSubmitting(true);
    const correctCount = CH2_REAL_QUIZ_QUESTIONS.filter(q => answers[q.id] === q.correct_option).length;
    const scorePct = Math.round((correctCount / TOTAL) * 100);

    // Build per-question snapshot for admin inspection
    const questionSnapshot = CH2_REAL_QUIZ_QUESTIONS.map(q => ({
      id: q.id,
      question_ar: q.question_ar,
      question_en: q.question_en,
      correct_option: q.correct_option,
      student_option: answers[q.id] || null,
      is_correct: answers[q.id] === q.correct_option,
      difficulty: q.difficulty,
      lesson: q.lesson,
      option_a_ar: q.option_a_ar, option_a_en: q.option_a_en,
      option_b_ar: q.option_b_ar, option_b_en: q.option_b_en,
      option_c_ar: q.option_c_ar, option_c_en: q.option_c_en,
      option_d_ar: q.option_d_ar, option_d_en: q.option_d_en,
      explanation_ar: q.explanation_ar,
      explanation_en: q.explanation_en,
    }));

    try {
      if (user) {
        await addDoc(collection(db, 'assessment_results'), {
          userId: user.uid,
          userName: profile?.displayName || user.email || 'Student',
          userEmail: user.email || '',
          lessonId: 'ch2-real-quiz',
          quizTitle_ar: 'الاختبار الرسمي — الفصل الثاني (الدرسان 2-1 و 2-2)',
          quizTitle_en: 'Chapter 2 Real Quiz (Lessons 2-1 & 2-2)',
          score: scorePct,
          totalMCQ: TOTAL,
          correctMCQ: correctCount,
          answers: answers,
          writtenAnswers: {},
          questionSnapshot,           // full per-question data for admin
          submittedAt: serverTimestamp(),
        });

        // Award XP
        if (profile) {
          const completedAssessments = profile.completedAssessments || [];
          const alreadyDone = completedAssessments.includes('ch2-real-quiz');
          await updateDoc(doc(db, 'users', user.uid), {
            xp: (profile.xp || 0) + (alreadyDone ? 30 : 100),
            completedAssessments: alreadyDone
              ? completedAssessments
              : [...completedAssessments, 'ch2-real-quiz'],
          });
        }
      }
    } catch (err) {
      console.error('Error submitting Ch2 quiz:', err);
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── derived ───────────────────────────────────────────────
  const currentQuestion: Ch2QuizQuestion = CH2_REAL_QUIZ_QUESTIONS[currentQ];
  const selectedOption = answers[currentQuestion?.id];
  const correctCount = CH2_REAL_QUIZ_QUESTIONS.filter(q => answers[q.id] === q.correct_option).length;
  const scorePct = Math.round((correctCount / TOTAL) * 100);

  const filteredReview = CH2_REAL_QUIZ_QUESTIONS.filter(q => {
    const isCorrect = answers[q.id] === q.correct_option;
    if (reviewFilter === 'CORRECT') return isCorrect;
    if (reviewFilter === 'WRONG') return !isCorrect;
    return true;
  });

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-20" dir={dir(lang)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">

        {/* ===================================================== */}
        {/* VIEW A — RESULTS (shown only after submit)            */}
        {/* ===================================================== */}
        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-black uppercase tracking-wider mb-3">
                    <Shield size={14} />
                    {t('Official Quiz Results', 'نتائج الاختبار الرسمي', lang)}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black mb-2">
                    {t('Chapter 2 Quiz — Lessons 2-1 & 2-2', 'اختبار الفصل الثاني — الدرسان 2-1 و 2-2', lang)}
                  </h1>
                  <p className="text-emerald-100 text-sm font-medium leading-relaxed max-w-xl">
                    {t(
                      'Your quiz has been graded and saved to the platform. Review every question and explanation below.',
                      'تم تصحيح اختبارك وحفظه في سجل المنصة. راجع كل سؤال وشرحه أدناه.',
                      lang
                    )}
                  </p>
                </div>

                {/* Score Gauge */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[160px] shadow-lg flex-shrink-0">
                  <span className="block text-[11px] font-bold text-emerald-200 uppercase tracking-widest mb-1">
                    {t('Total Score', 'النتيجة الإجمالية', lang)}
                  </span>
                  <div className={`text-4xl font-black ${
                    scorePct >= 85 ? 'text-emerald-300'
                    : scorePct >= 70 ? 'text-blue-300'
                    : scorePct >= 50 ? 'text-amber-300'
                    : 'text-rose-300'
                  }`}>
                    {scorePct}%
                  </div>
                  <span className="block text-xs font-bold text-white/80 mt-1">
                    {correctCount} / {TOTAL} {t('Correct', 'إجابات صحيحة', lang)}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: t('Rating', 'التقدير', lang),
                  value: scorePct >= 85 ? t('Excellent', 'ممتاز', lang)
                       : scorePct >= 70 ? t('Very Good', 'جيد جداً', lang)
                       : scorePct >= 50 ? t('Passing', 'مقبول', lang)
                       : t('Needs Review', 'يحتاج مراجعة', lang),
                  color: scorePct >= 85 ? 'text-emerald-600' : scorePct >= 70 ? 'text-blue-600' : scorePct >= 50 ? 'text-amber-600' : 'text-rose-600',
                },
                { label: t('Correct', 'إجابات صحيحة', lang), value: `✅ ${correctCount}`, color: 'text-emerald-600' },
                { label: t('Wrong', 'إجابات خاطئة', lang), value: `❌ ${TOTAL - correctCount}`, color: 'text-rose-600' },
                { label: t('XP Earned', 'نقاط XP', lang), value: `+100 XP`, color: 'text-primary-plum' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{card.label}</span>
                  <span className={`font-black text-sm ${card.color}`}>{card.value}</span>
                </div>
              ))}
            </div>

            {/* Review Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-black text-primary-navy text-base flex items-center gap-2">
                <FileText size={18} className="text-teal-600" />
                {t('Question Review & Explanations', 'مراجعة الأسئلة والشرح النموذجي', lang)}
              </h3>
              <div className="flex items-center gap-2">
                {[
                  { key: 'ALL', label: t(`All (${TOTAL})`, `الكل (${TOTAL})`, lang), active: 'bg-primary-navy text-white' },
                  { key: 'WRONG', label: t(`Wrong (${TOTAL - correctCount})`, `خاطئة (${TOTAL - correctCount})`, lang), active: 'bg-rose-600 text-white' },
                  { key: 'CORRECT', label: t(`Correct (${correctCount})`, `صحيحة (${correctCount})`, lang), active: 'bg-emerald-600 text-white' },
                ].map(btn => (
                  <button
                    key={btn.key}
                    onClick={() => setReviewFilter(btn.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === btn.key ? btn.active : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question-by-question breakdown */}
            <div className="space-y-5">
              {filteredReview.map((q) => {
                const studentChoice = answers[q.id];
                const isCorrect = studentChoice === q.correct_option;
                const isUnanswered = !studentChoice;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-2xl border-2 p-5 sm:p-6 shadow-sm transition-all ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/20'
                      : isUnanswered ? 'border-slate-200'
                      : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-teal-700 text-white text-xs font-black flex items-center justify-center">
                          {CH2_REAL_QUIZ_QUESTIONS.indexOf(q) + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {lang === 'ar' ? q.lessonName_ar : q.lessonName_en}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          q.difficulty === 'HARD' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <div>
                        {isCorrect ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                            <CheckCircle size={13} /> {t('Correct (+1 point)', 'إجابة صحيحة (+1 درجة)', lang)}
                          </span>
                        ) : isUnanswered ? (
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1">
                            <HelpCircle size={13} /> {t('Unanswered', 'لم تتم الإجابة', lang)}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1 border border-rose-200">
                            <XCircle size={13} /> {t(`Wrong — you chose ${studentChoice}`, `خاطئة — اخترت ${studentChoice}`, lang)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <h4 className="font-bold text-base text-primary-navy mb-4 leading-relaxed">
                      {lang === 'ar' ? q.question_ar : q.question_en}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2.5 mb-5">
                      {(['A', 'B', 'C', 'D'] as const).map(opt => {
                        const text = lang === 'ar'
                          ? (q as any)[`option_${opt.toLowerCase()}_ar`]
                          : (q as any)[`option_${opt.toLowerCase()}_en`];
                        const isStudentPick = studentChoice === opt;
                        const isModelAnswer = opt === q.correct_option;

                        let cls = 'bg-white border-slate-200 text-slate-700';
                        let badge: React.ReactNode = null;

                        if (isModelAnswer && isStudentPick) {
                          cls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-sm';
                          badge = <span className="ms-auto px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1"><CheckCircle size={12} /> {t('Your Pick & Correct ✅', 'إجابتك صحيحة ✅', lang)}</span>;
                        } else if (isModelAnswer) {
                          cls = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          badge = <span className="ms-auto px-2 py-0.5 rounded bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1"><CheckCircle size={12} /> {t('Model Answer ✅', 'الإجابة الصحيحة ✅', lang)}</span>;
                        } else if (isStudentPick) {
                          cls = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                          badge = <span className="ms-auto px-2 py-0.5 rounded bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1"><XCircle size={12} /> {t('Your Choice (Wrong) ❌', 'اختيارك (خاطئ) ❌', lang)}</span>;
                        }

                        return (
                          <div key={opt} className={`p-3.5 rounded-xl border-2 flex items-center gap-3 ${cls}`}>
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                              isModelAnswer ? 'bg-emerald-600 text-white' : isStudentPick ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>{opt}</span>
                            <span className="text-sm font-semibold flex-1 leading-snug">{text}</span>
                            {badge}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-start gap-2.5">
                      <Lightbulb size={16} className="text-blue-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-0.5">
                          {t('Explanation:', 'الشرح النموذجي:', lang)}
                        </span>
                        <p className="text-blue-950 text-xs sm:text-sm font-medium leading-relaxed">
                          {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setAnswers({});
                  setIsSubmitted(false);
                  setCurrentQ(0);
                  setTimeLeft(TIMER_SECONDS);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-primary-navy font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={15} />
                {t('Retake Quiz', 'إعادة الاختبار', lang)}
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Home size={15} />
                {t('Back to Dashboard', 'العودة للوحة التحكم', lang)}
              </button>
            </div>
          </motion.div>

        ) : (

          /* ===================================================== */
          /* VIEW B — ACTIVE QUIZ (NO answers revealed!)           */
          /* ===================================================== */
          <div className="space-y-6">

            {/* Top header */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-black uppercase tracking-wider mb-1">
                  <Shield size={13} />
                  {t('Real Quiz — Answers Revealed After Submission', 'اختبار رسمي — الإجابات تظهر بعد التسليم', lang)}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-primary-navy">
                  {t('Chapter 2 Quiz — Lessons 2-1 & 2-2', 'اختبار الفصل الثاني — الدرسان 2-1 و 2-2', lang)}
                </h1>
                <p className="text-slate-400 text-xs font-semibold mt-0.5">
                  {t('10 Questions • Medium & Hard • 20 min', '10 أسئلة • متوسط وصعب • 20 دقيقة', lang)}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border flex-shrink-0 ${
                timeLeft < 180 ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                : timeLeft < 600 ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-slate-50 border-slate-200 text-primary-navy'
              }`}>
                <Clock size={16} className={timeLeft < 180 ? 'text-rose-600' : timeLeft < 600 ? 'text-amber-600' : 'text-teal-700'} />
                <span className="font-mono font-black text-lg tracking-wider">{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Navigation strip */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                <span>{t(`Question ${currentQ + 1} of ${TOTAL}`, `السؤال ${currentQ + 1} من ${TOTAL}`, lang)}</span>
                <span>{t(`${answeredCount} Answered • ${unansweredCount} Left`, `${answeredCount} مجاب • ${unansweredCount} متبقي`, lang)}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / TOTAL) * 100}%` }}
                />
              </div>
              {/* Question pills */}
              <div className="flex flex-wrap gap-2">
                {CH2_REAL_QUIZ_QUESTIONS.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentQ;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(idx)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                        isCurrent ? 'bg-teal-700 text-white ring-2 ring-teal-400 shadow-md'
                        : isAnswered ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active question card */}
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-700 to-emerald-600 text-white text-xs font-black flex items-center justify-center">
                    {currentQ + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {lang === 'ar' ? currentQuestion.lessonName_ar : currentQuestion.lessonName_en}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    currentQuestion.difficulty === 'HARD' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                  {t('MCQ', 'اختيار من متعدد', lang)}
                </span>
              </div>

              {/* Question text */}
              <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-6 leading-relaxed">
                {lang === 'ar' ? currentQuestion.question_ar : currentQuestion.question_en}
              </h3>

              {/* Options — NO correctness shown! */}
              <div className="space-y-3 mb-8">
                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                  const text = lang === 'ar'
                    ? (currentQuestion as any)[`option_${opt.toLowerCase()}_ar`]
                    : (currentQuestion as any)[`option_${opt.toLowerCase()}_en`];
                  const isSelected = selectedOption === opt;

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`w-full p-4 rounded-2xl border-2 text-start transition-all flex items-center gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/60 text-primary-navy shadow-sm ring-1 ring-teal-500/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors flex-shrink-0 ${
                        isSelected ? 'bg-teal-700 text-white shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        {opt}
                      </span>
                      <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">{text}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                <button
                  onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
                  disabled={currentQ === 0}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-primary-navy font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                  {t('Previous', 'السابق', lang)}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors border border-emerald-200 flex items-center gap-1.5"
                  >
                    <CheckCircle size={14} />
                    {t('Submit Quiz', 'تسليم الاختبار', lang)}
                  </button>

                  {currentQ < TOTAL - 1 ? (
                    <button
                      onClick={() => setCurrentQ(prev => Math.min(TOTAL - 1, prev + 1))}
                      className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      {t('Next', 'التالي', lang)}
                      <ArrowLeft size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <Sparkles size={14} />
                      {t('Finish & Submit', 'إنهاء وتسليم', lang)}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ===================================================== */}
        {/* CONFIRM SUBMIT MODAL                                  */}
        {/* ===================================================== */}
        <AnimatePresence>
          {showConfirmSubmit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 text-center"
                dir={dir(lang)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  unansweredCount > 0 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {unansweredCount > 0 ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                </div>

                <h3 className="text-xl font-black text-primary-navy mb-2">
                  {t('Confirm Submission', 'تأكيد تسليم الاختبار', lang)}
                </h3>

                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                  {unansweredCount > 0 ? (
                    t(
                      `You have ${unansweredCount} unanswered question(s) out of ${TOTAL}. Submit anyway?`,
                      `لديك ${unansweredCount} سؤال/أسئلة لم يُجب عليها من أصل ${TOTAL}. هل تريد التسليم الآن؟`,
                      lang
                    )
                  ) : (
                    t(
                      `All ${TOTAL} questions answered! Submit and reveal your score and explanations?`,
                      `أجبت على جميع الأسئلة الـ ${TOTAL}! هل تريد التسليم والاطلاع على نتيجتك والشرح النموذجي؟`,
                      lang
                    )
                  )}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {t('Keep Reviewing', 'الرجوع للمراجعة', lang)}
                  </button>
                  <button
                    onClick={executeSubmit}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>{t('Submitting...', 'جاري الرصد...', lang)}</span>
                    ) : (
                      <>
                        <CheckCircle size={15} />
                        {t('Confirm & Submit', 'تأكيد التسليم', lang)}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
