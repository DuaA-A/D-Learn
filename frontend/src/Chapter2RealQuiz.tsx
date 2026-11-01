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
  HelpCircle,
  PenLine,
} from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from './App';
import { CH2_REAL_QUIZ_MCQ, CH2_REAL_QUIZ_WRITTEN } from './ch2QuizData';
import type { Ch2McqQuestion, Ch2WrittenQuestion } from './ch2QuizData';

// ── helpers ──────────────────────────────────────────────────
const t = (en: string, ar: string, lang: string) => lang === 'ar' ? ar : en;
const dir = (lang: string) => lang === 'ar' ? 'rtl' : 'ltr';

// All questions in order: MCQ (10) + Written (6) = 16
type AnyQuestion = Ch2McqQuestion | Ch2WrittenQuestion;
const ALL_QUESTIONS: AnyQuestion[] = [
  ...CH2_REAL_QUIZ_MCQ,
  ...CH2_REAL_QUIZ_WRITTEN,
];
const TOTAL = ALL_QUESTIONS.length; // 16
const MCQ_TOTAL = CH2_REAL_QUIZ_MCQ.length; // 10
const TIMER_SECONDS = 30 * 60; // 30 minutes

export default function Chapter2RealQuiz() {
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // ── state ─────────────────────────────────────────────────
  const [currentQ, setCurrentQ] = useState(0);
  // MCQ answers: questionId -> option letter
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Written answers: questionId -> student text
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT'>('ALL');
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  const mcqAnsweredCount = Object.keys(mcqAnswers).length;
  const writtenAnsweredCount = Object.values(writtenAnswers).filter(v => v.trim().length > 0).length;
  const totalAnswered = mcqAnsweredCount + writtenAnsweredCount;
  const unansweredCount = TOTAL - totalAnswered;

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

  const currentQuestion = ALL_QUESTIONS[currentQ];
  const isMcq = currentQuestion?.type === 'MCQ';

  // ── selection ────────────────────────────────────────────
  const handleSelectMcq = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setMcqAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleWrittenChange = (text: string) => {
    if (isSubmitted) return;
    setWrittenAnswers(prev => ({ ...prev, [currentQuestion.id]: text }));
  };

  // ── submit ────────────────────────────────────────────────
  const executeSubmit = async () => {
    setSubmitting(true);
    const correctCount = CH2_REAL_QUIZ_MCQ.filter(q => mcqAnswers[q.id] === q.correct_option).length;
    const scorePct = Math.round((correctCount / MCQ_TOTAL) * 100);

    const mcqSnapshot = CH2_REAL_QUIZ_MCQ.map(q => ({
      id: q.id,
      type: 'MCQ',
      question_ar: q.question_ar,
      question_en: q.question_en,
      correct_option: q.correct_option,
      student_option: mcqAnswers[q.id] || null,
      is_correct: mcqAnswers[q.id] === q.correct_option,
      difficulty: q.difficulty,
      lesson: q.lesson,
      option_a_ar: q.option_a_ar, option_a_en: q.option_a_en,
      option_b_ar: q.option_b_ar, option_b_en: q.option_b_en,
      option_c_ar: q.option_c_ar, option_c_en: q.option_c_en,
      option_d_ar: q.option_d_ar, option_d_en: q.option_d_en,
      explanation_ar: q.explanation_ar,
      explanation_en: q.explanation_en,
    }));

    const writtenSnapshot = CH2_REAL_QUIZ_WRITTEN.map(q => ({
      id: q.id,
      type: 'WRITTEN',
      question_ar: q.question_ar,
      question_en: q.question_en,
      student_answer: writtenAnswers[q.id] || '',
      ideal_answer_ar: q.ideal_answer_ar,
      ideal_answer_en: q.ideal_answer_en,
      marks: q.marks,
      difficulty: q.difficulty,
      lesson: q.lesson,
    }));

    try {
      if (user) {
        await addDoc(collection(db, 'assessment_results'), {
          userId: user.uid,
          userName: profile?.displayName || user.email || 'Student',
          userEmail: user.email || '',
          lessonId: 'ch2-real-quiz',
          quizTitle_ar: 'اختبار الفصل الثاني — الدرسان 2-1 و 2-2',
          quizTitle_en: 'Chapter 2 Quiz — Lessons 2-1 & 2-2',
          score: scorePct,
          totalMCQ: MCQ_TOTAL,
          correctMCQ: correctCount,
          answers: mcqAnswers,
          writtenAnswers,
          mcqSnapshot,
          writtenSnapshot,
          submittedAt: serverTimestamp(),
        });

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
  const correctCount = CH2_REAL_QUIZ_MCQ.filter(q => mcqAnswers[q.id] === q.correct_option).length;
  const scorePct = Math.round((correctCount / MCQ_TOTAL) * 100);

  const filteredMcqReview = CH2_REAL_QUIZ_MCQ.filter(q => {
    const isCorrect = mcqAnswers[q.id] === q.correct_option;
    if (reviewFilter === 'CORRECT') return isCorrect;
    if (reviewFilter === 'WRONG') return !isCorrect;
    return true;
  });

  // ── is question answered? ────────────────────────────────
  const isQuestionAnswered = (q: AnyQuestion) => {
    if (q.type === 'MCQ') return !!mcqAnswers[q.id];
    return (writtenAnswers[q.id] || '').trim().length > 0;
  };

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
                  <h1 className="text-2xl sm:text-3xl font-black mb-2">
                    {t('Chapter 2 Quiz — Lessons 2-1 & 2-2', 'اختبار الفصل الثاني — الدرسان 2-1 و 2-2', lang)}
                  </h1>
                  <p className="text-emerald-100 text-sm font-medium leading-relaxed max-w-xl">
                    {t(
                      'Your answers have been saved. Review every question below.',
                      'تم حفظ إجاباتك. راجع كل سؤال وإجابته النموذجية أدناه.',
                      lang
                    )}
                  </p>
                </div>

                {/* Score Gauge — MCQ only */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[160px] shadow-lg flex-shrink-0">
                  <span className="block text-[11px] font-bold text-emerald-200 uppercase tracking-widest mb-1">
                    {t('MCQ Score', 'درجة الاختيار', lang)}
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
                    {correctCount} / {MCQ_TOTAL} {t('Correct', 'إجابات صحيحة', lang)}
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
                { label: t('Correct MCQ', 'اختيار صحيح', lang), value: `${correctCount} / ${MCQ_TOTAL}`, color: 'text-emerald-600' },
                { label: t('Wrong MCQ', 'اختيار خاطئ', lang), value: `${MCQ_TOTAL - correctCount}`, color: 'text-rose-600' },
                { label: t('XP Earned', 'نقاط XP', lang), value: `+100 XP`, color: 'text-primary-plum' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{card.label}</span>
                  <span className={`font-black text-sm ${card.color}`}>{card.value}</span>
                </div>
              ))}
            </div>

            {/* ── MCQ REVIEW SECTION ── */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-black text-primary-navy text-base flex items-center gap-2">
                <FileText size={18} className="text-teal-600" />
                {t('MCQ Review', 'مراجعة أسئلة الاختيار من متعدد', lang)}
              </h3>
              <div className="flex items-center gap-2">
                {[
                  { key: 'ALL',     label: t(`All (${MCQ_TOTAL})`, `الكل (${MCQ_TOTAL})`, lang),                        active: 'bg-primary-navy text-white' },
                  { key: 'WRONG',   label: t(`Wrong (${MCQ_TOTAL - correctCount})`, `خاطئة (${MCQ_TOTAL - correctCount})`, lang), active: 'bg-rose-600 text-white' },
                  { key: 'CORRECT', label: t(`Correct (${correctCount})`, `صحيحة (${correctCount})`, lang),              active: 'bg-emerald-600 text-white' },
                ].map(btn => (
                  <button
                    key={btn.key}
                    onClick={() => setReviewFilter(btn.key as 'ALL' | 'WRONG' | 'CORRECT')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === btn.key ? btn.active : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MCQ question-by-question breakdown */}
            <div className="space-y-5">
              {filteredMcqReview.map((q) => {
                const studentChoice = mcqAnswers[q.id];
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
                          {CH2_REAL_QUIZ_MCQ.indexOf(q) + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {lang === 'ar' ? q.lessonName_ar : q.lessonName_en}
                        </span>
                      </div>
                      <div>
                        {isCorrect ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                            <CheckCircle size={13} /> {t('Correct', 'إجابة صحيحة', lang)}
                          </span>
                        ) : isUnanswered ? (
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1">
                            <HelpCircle size={13} /> {t('Unanswered', 'لم تتم الإجابة', lang)}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1 border border-rose-200">
                            <XCircle size={13} /> {t(`Wrong — chose ${studentChoice}`, `خاطئة — اخترت ${studentChoice}`, lang)}
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
                          ? q[`option_${opt.toLowerCase() as 'a' | 'b' | 'c' | 'd'}_ar`]
                          : q[`option_${opt.toLowerCase() as 'a' | 'b' | 'c' | 'd'}_en`];
                        const isStudentPick = studentChoice === opt;
                        const isModelAnswer = opt === q.correct_option;

                        let cls = 'bg-white border-slate-200 text-slate-700';
                        let badge: React.ReactNode = null;

                        if (isModelAnswer && isStudentPick) {
                          cls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-sm';
                          badge = <span className="ms-auto px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1"><CheckCircle size={12} /> {t('Your answer ✓', 'إجابتك صحيحة ✓', lang)}</span>;
                        } else if (isModelAnswer) {
                          cls = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          badge = <span className="ms-auto px-2 py-0.5 rounded bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1"><CheckCircle size={12} /> {t('Correct answer', 'الإجابة الصحيحة', lang)}</span>;
                        } else if (isStudentPick) {
                          cls = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                          badge = <span className="ms-auto px-2 py-0.5 rounded bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1"><XCircle size={12} /> {t('Your choice', 'اختيارك', lang)}</span>;
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
                        <span className="text-[11px] font-bold text-blue-800 block mb-0.5">
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

            {/* ── WRITTEN REVIEW SECTION ── */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-black text-primary-navy text-base flex items-center gap-2 mb-5">
                <PenLine size={18} className="text-teal-600" />
                {t('Essay Questions — Model Answers', 'الأسئلة المقالية — الإجابات النموذجية', lang)}
              </h3>
              <div className="space-y-5">
                {CH2_REAL_QUIZ_WRITTEN.map((q, wi) => {
                  const studentText = writtenAnswers[q.id] || '';
                  const hasAnswer = studentText.trim().length > 0;

                  return (
                    <div key={q.id} className="bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 shadow-sm">
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-teal-700 text-white text-xs font-black flex items-center justify-center">
                            {MCQ_TOTAL + wi + 1}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                            {lang === 'ar' ? q.lessonName_ar : q.lessonName_en}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700">
                            {t('Essay', 'مقالي', lang)} • {q.marks} {t('pts', 'درجات', lang)}
                          </span>
                        </div>
                        {!hasAnswer && (
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-xs">
                            {t('Not answered', 'لم يتم الإجابة', lang)}
                          </span>
                        )}
                      </div>

                      {/* Question text */}
                      <h4 className="font-bold text-base text-primary-navy mb-4 leading-relaxed">
                        {lang === 'ar' ? q.question_ar : q.question_en}
                      </h4>

                      {/* Student answer */}
                      {hasAnswer && (
                        <div className="mb-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                            {t('Your Answer:', 'إجابتك:', lang)}
                          </span>
                          <p className="text-slate-700 text-sm font-medium leading-relaxed whitespace-pre-wrap">{studentText}</p>
                        </div>
                      )}

                      {/* Model answer */}
                      <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                        <span className="text-[11px] font-bold text-emerald-800 block mb-1.5">
                          {t('Model Answer:', 'الإجابة النموذجية:', lang)}
                        </span>
                        <p className="text-emerald-950 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                          {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setMcqAnswers({});
                  setWrittenAnswers({});
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
          /* VIEW B — ACTIVE QUIZ                                  */
          /* ===================================================== */
          <div className="space-y-6">

            {/* Top header */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-primary-navy">
                  {t('Chapter 2 Quiz — Lessons 2-1 & 2-2', 'اختبار الفصل الثاني — الدرسان 2-1 و 2-2', lang)}
                </h1>
                <p className="text-slate-400 text-xs font-semibold mt-1">
                  {t(
                    `${MCQ_TOTAL} MCQ + ${CH2_REAL_QUIZ_WRITTEN.length} Essay • 30 min`,
                    `${MCQ_TOTAL} اختيار متعدد + ${CH2_REAL_QUIZ_WRITTEN.length} مقالي • 30 دقيقة`,
                    lang
                  )}
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
                <span>{t(`${totalAnswered} Answered • ${unansweredCount} Left`, `${totalAnswered} مجاب • ${unansweredCount} متبقي`, lang)}</span>
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
                {ALL_QUESTIONS.map((q, idx) => {
                  const answered = isQuestionAnswered(q);
                  const isCurrent = idx === currentQ;
                  const isWritten = q.type === 'WRITTEN';
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(idx)}
                      title={isWritten ? t('Essay', 'مقالي', lang) : 'MCQ'}
                      className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                        isCurrent ? 'bg-teal-700 text-white ring-2 ring-teal-400 shadow-md'
                        : answered ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isWritten ? 'bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200 inline-block" />{t('Answered', 'مجاب', lang)}</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-100 border border-violet-200 inline-block" />{t('Essay', 'مقالي', lang)}</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-100 inline-block" />{t('Not answered', 'لم يُجب', lang)}</span>
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
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                  isMcq
                    ? 'text-slate-500 bg-slate-50 border-slate-200'
                    : 'text-violet-700 bg-violet-50 border-violet-200'
                }`}>
                  {isMcq ? t('MCQ', 'اختيار من متعدد', lang) : t('Essay', 'مقالي', lang)}
                </span>
              </div>

              {/* Question text */}
              <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-6 leading-relaxed">
                {lang === 'ar' ? currentQuestion.question_ar : currentQuestion.question_en}
              </h3>

              {/* ── MCQ Options ── */}
              {isMcq && (() => {
                const mcqQ = currentQuestion as Ch2McqQuestion;
                const selectedOption = mcqAnswers[mcqQ.id];
                return (
                  <div className="space-y-3 mb-8">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const text = lang === 'ar'
                        ? mcqQ[`option_${opt.toLowerCase() as 'a' | 'b' | 'c' | 'd'}_ar`]
                        : mcqQ[`option_${opt.toLowerCase() as 'a' | 'b' | 'c' | 'd'}_en`];
                      const isSelected = selectedOption === opt;

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectMcq(opt)}
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
                );
              })()}

              {/* ── Written Answer ── */}
              {!isMcq && (() => {
                const wQ = currentQuestion as Ch2WrittenQuestion;
                return (
                  <div className="mb-8">
                    <label className="block text-xs font-bold text-slate-500 mb-2">
                      {t('Your Answer:', 'إجابتك:', lang)}
                      <span className="ms-1 text-violet-600">({wQ.marks} {t('pts', 'درجات', lang)})</span>
                    </label>
                    <textarea
                      value={writtenAnswers[wQ.id] || ''}
                      onChange={e => handleWrittenChange(e.target.value)}
                      rows={7}
                      placeholder={t('Write your answer here...', 'اكتب إجابتك هنا...', lang)}
                      className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-medium text-primary-navy leading-relaxed resize-none transition-all bg-white placeholder-slate-300"
                    />
                    <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                      {t('Model answer will be shown after submission.', 'الإجابة النموذجية ستظهر بعد التسليم.', lang)}
                    </p>
                  </div>
                );
              })()}

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
                    {t('Submit', 'تسليم', lang)}
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
                  {unansweredCount > 0
                    ? t(
                        `${unansweredCount} question(s) not answered. Submit anyway?`,
                        `${unansweredCount} سؤال/أسئلة لم يُجب عليها. هل تريد التسليم الآن؟`,
                        lang
                      )
                    : t(
                        'All questions answered. Ready to submit?',
                        'تمت الإجابة على جميع الأسئلة. هل تريد التسليم؟',
                        lang
                      )
                  }
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {t('Go Back', 'الرجوع', lang)}
                  </button>
                  <button
                    onClick={executeSubmit}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>{t('Saving...', 'جاري الحفظ...', lang)}</span>
                    ) : (
                      <>
                        <CheckCircle size={15} />
                        {t('Submit', 'تسليم', lang)}
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
