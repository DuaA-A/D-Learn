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
  PenLine,
  BookOpen,
} from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from './App';
import {
  UNIT2_FULL_EXAM,
  UNIT2_MCQ_ONLY,
  UNIT2_WRITTEN_ONLY,
} from './ch2_unit_exam_data';
import type { UnitExamMcq, UnitExamWritten, UnitExamQuestion } from './ch2_unit_exam_data';

// ── helpers ──────────────────────────────────────────────────
const t = (en: string, ar: string, lang: string) => lang === 'ar' ? ar : en;
const dir = (lang: string) => lang === 'ar' ? 'rtl' : 'ltr';

const ALL_QUESTIONS: UnitExamQuestion[] = UNIT2_FULL_EXAM;
const TOTAL = ALL_QUESTIONS.length; // 15
const MCQ_TOTAL = UNIT2_MCQ_ONLY.length; // 9
const TIMER_SECONDS = 30 * 60; // 30 minutes

// Lesson color map
const LESSON_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  '2-1': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-600 to-indigo-600' },
  '2-2': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', gradient: 'from-teal-600 to-emerald-600' },
  '2-3': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', gradient: 'from-violet-600 to-purple-600' },
};

export default function Chapter2UnitExam() {
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // ── state ─────────────────────────────────────────────────
  const [currentQ, setCurrentQ] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
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
    const correctCount = UNIT2_MCQ_ONLY.filter(q => mcqAnswers[q.id] === q.correct_option).length;
    const scorePct = Math.round((correctCount / MCQ_TOTAL) * 100);

    const mcqSnapshot = UNIT2_MCQ_ONLY.map(q => ({
      id: q.id,
      type: 'MCQ',
      lesson: q.lesson,
      question_ar: q.question_ar,
      question_en: q.question_en,
      correct_option: q.correct_option,
      student_option: mcqAnswers[q.id] || null,
      is_correct: mcqAnswers[q.id] === q.correct_option,
      option_a_ar: q.option_a_ar, option_a_en: q.option_a_en,
      option_b_ar: q.option_b_ar, option_b_en: q.option_b_en,
      option_c_ar: q.option_c_ar, option_c_en: q.option_c_en,
      option_d_ar: q.option_d_ar, option_d_en: q.option_d_en,
      explanation_ar: q.explanation_ar,
      explanation_en: q.explanation_en,
    }));

    const writtenSnapshot = UNIT2_WRITTEN_ONLY.map(q => ({
      id: q.id,
      type: 'WRITTEN',
      lesson: q.lesson,
      question_ar: q.question_ar,
      question_en: q.question_en,
      student_answer: writtenAnswers[q.id] || '',
      ideal_answer_ar: q.ideal_answer_ar,
      ideal_answer_en: q.ideal_answer_en,
      marks: q.marks,
    }));

    try {
      if (user) {
        await addDoc(collection(db, 'assessment_results'), {
          userId: user.uid,
          userName: profile?.displayName || user.email || 'Student',
          userEmail: user.email || '',
          lessonId: 'ch2-unit-exam',
          quizTitle_ar: 'امتحان الوحدة الثانية — الدروس 2-1 و 2-2 و 2-3',
          quizTitle_en: 'Chapter 2 Unit Exam — Lessons 2-1, 2-2 & 2-3',
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
          const alreadyDone = completedAssessments.includes('ch2-unit-exam');
          await updateDoc(doc(db, 'users', user.uid), {
            xp: (profile.xp || 0) + (alreadyDone ? 30 : 150),
            completedAssessments: alreadyDone
              ? completedAssessments
              : [...completedAssessments, 'ch2-unit-exam'],
          });
        }
      }
    } catch (err) {
      console.error('Error submitting Unit Exam:', err);
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── derived ───────────────────────────────────────────────
  const correctCount = UNIT2_MCQ_ONLY.filter(q => mcqAnswers[q.id] === q.correct_option).length;
  const scorePct = Math.round((correctCount / MCQ_TOTAL) * 100);

  const filteredMcqReview = UNIT2_MCQ_ONLY.filter(q => {
    const isCorrect = mcqAnswers[q.id] === q.correct_option;
    if (reviewFilter === 'CORRECT') return isCorrect;
    if (reviewFilter === 'WRONG') return !isCorrect;
    return true;
  });

  const isQuestionAnswered = (q: UnitExamQuestion) => {
    if (q.type === 'MCQ') return !!mcqAnswers[q.id];
    return (writtenAnswers[q.id] || '').trim().length > 0;
  };

  // ── lesson sections for results display ───────────────────
  const lessonGroups = ['2-1', '2-2', '2-3'] as const;

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
            <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black mb-2">
                    {t('Chapter 2 Unit Exam — All 3 Lessons', 'امتحان الوحدة الثانية — الدروس الثلاثة', lang)}
                  </h1>
                  <p className="text-indigo-100 text-sm font-medium leading-relaxed max-w-xl">
                    {t(
                      'Your answers have been saved. Review every question below.',
                      'تم حفظ إجاباتك. راجع كل سؤال وإجابته النموذجية أدناه.',
                      lang
                    )}
                  </p>
                </div>

                {/* Score Gauge — MCQ only */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[160px] shadow-lg flex-shrink-0">
                  <span className="block text-[11px] font-bold text-indigo-200 uppercase tracking-widest mb-1">
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
                { label: t('Written', 'مقالي', lang), value: `${UNIT2_WRITTEN_ONLY.length} ${t('Qs', 'أسئلة', lang)}`, color: 'text-violet-600' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm">
                  <span className="block text-xs font-bold text-slate-400 mb-1">{item.label}</span>
                  <span className={`block text-xl font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* ── MCQ Review Section ────────────────────────── */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-black text-primary-navy flex items-center gap-2">
                  <FileText size={18} className="text-indigo-600" />
                  {t('MCQ Review', 'مراجعة أسئلة الاختيار', lang)}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {(['ALL', 'CORRECT', 'WRONG'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setReviewFilter(f)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        reviewFilter === f
                          ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {f === 'ALL' ? t('All', 'الكل', lang) : f === 'CORRECT' ? t('Correct', 'صحيح', lang) : t('Wrong', 'خاطئ', lang)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredMcqReview.map((q, idx) => {
                  const studentAns = mcqAnswers[q.id];
                  const isCorrect = studentAns === q.correct_option;
                  const lc = LESSON_COLORS[q.lesson] || LESSON_COLORS['2-1'];

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`rounded-2xl border p-5 ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                          {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border mb-1.5 ${lc.bg} ${lc.text} ${lc.border}`}>
                            <BookOpen size={9} />
                            {lang === 'ar' ? q.lessonName_ar : q.lessonName_en}
                          </span>
                          <p className="text-sm font-bold text-primary-navy leading-relaxed">
                            {lang === 'ar' ? q.question_ar : q.question_en}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {(['A', 'B', 'C', 'D'] as const).map(opt => {
                          const optText = lang === 'ar'
                            ? q[`option_${opt.toLowerCase() as 'a' | 'b' | 'c' | 'd'}_ar`]
                            : q[`option_${opt.toLowerCase() as 'a' | 'b' | 'c' | 'd'}_en`];
                          const isChosen = studentAns === opt;
                          const isRight = opt === q.correct_option;
                          return (
                            <div
                              key={opt}
                              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold ${
                                isRight ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                                : isChosen ? 'bg-rose-100 border-rose-400 text-rose-800'
                                : 'bg-white border-slate-200 text-slate-500'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] flex-shrink-0 ${
                                isRight ? 'bg-emerald-500 text-white'
                                : isChosen ? 'bg-rose-500 text-white'
                                : 'bg-slate-100 text-slate-400'
                              }`}>{opt}</span>
                              <span className="leading-snug">{optText}</span>
                              {isRight && <CheckCircle size={12} className="ms-auto text-emerald-600 flex-shrink-0" />}
                              {isChosen && !isRight && <XCircle size={12} className="ms-auto text-rose-500 flex-shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      {!studentAns && (
                        <p className="text-xs text-amber-700 font-bold bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mb-2">
                          {t('Not answered', 'لم يُجب على هذا السؤال', lang)}
                        </p>
                      )}

                      <div className="bg-white/70 border border-slate-200 rounded-xl p-3 mt-2 flex gap-2">
                        <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Written Review Section ───────────────────── */}
            <div>
              <h2 className="text-lg font-black text-primary-navy flex items-center gap-2 mb-4">
                <PenLine size={18} className="text-violet-600" />
                {t('Written Questions — Model Answers', 'الأسئلة المقالية — نماذج الإجابة', lang)}
              </h2>

              <div className="space-y-5">
                {UNIT2_WRITTEN_ONLY.map((q, idx) => {
                  const studentText = writtenAnswers[q.id] || '';
                  const lc = LESSON_COLORS[q.lesson] || LESSON_COLORS['2-1'];

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                      <div className={`bg-gradient-to-r ${lc.gradient} px-5 py-3 flex items-center gap-2`}>
                        <span className="w-7 h-7 rounded-lg bg-white/20 text-white text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className={`text-[10px] font-bold text-white/80`}>
                          {lang === 'ar' ? q.lessonName_ar : q.lessonName_en}
                        </span>
                        <span className="ms-auto text-xs text-white/70 font-bold">{q.marks} {t('pts', 'درجات', lang)}</span>
                      </div>

                      <div className="p-5">
                        <p className="text-sm font-bold text-primary-navy mb-4 leading-relaxed">
                          {lang === 'ar' ? q.question_ar : q.question_en}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Student Answer */}
                          <div>
                            <span className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                              {t('Your Answer', 'إجابتك', lang)}
                            </span>
                            <div className={`min-h-[100px] p-3.5 rounded-xl border text-xs font-medium leading-relaxed whitespace-pre-wrap ${
                              studentText.trim() ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-amber-50 border-amber-200 text-amber-600 italic'
                            }`}>
                              {studentText.trim() || t('No answer written.', 'لم تُكتب إجابة.', lang)}
                            </div>
                          </div>

                          {/* Model Answer */}
                          <div>
                            <span className="block text-[11px] font-black text-emerald-600 uppercase tracking-wider mb-2">
                              {t('Model Answer', 'الإجابة النموذجية', lang)}
                            </span>
                            <div className="min-h-[100px] p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs font-medium text-emerald-900 leading-relaxed whitespace-pre-wrap">
                              {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
                {t('Retake Exam', 'إعادة الامتحان', lang)}
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-700 to-violet-700 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Home size={15} />
                {t('Back to Dashboard', 'العودة للوحة التحكم', lang)}
              </button>
            </div>
          </motion.div>

        ) : (

          /* ===================================================== */
          /* VIEW B — ACTIVE EXAM                                  */
          /* ===================================================== */
          <div className="space-y-6">

            {/* Top header */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-primary-navy">
                  {t('Chapter 2 Unit Exam', 'امتحان الوحدة الثانية', lang)}
                </h1>
                <p className="text-slate-400 text-xs font-semibold mt-1">
                  {t(
                    `Lessons 2-1, 2-2 & 2-3 • ${MCQ_TOTAL} MCQ + ${UNIT2_WRITTEN_ONLY.length} Essay • 30 min`,
                    `الدروس 2-1 و2-2 و2-3 • ${MCQ_TOTAL} اختيار متعدد + ${UNIT2_WRITTEN_ONLY.length} مقالي • 30 دقيقة`,
                    lang
                  )}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border flex-shrink-0 ${timeLeft < 180 ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                : timeLeft < 600 ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-slate-50 border-slate-200 text-primary-navy'
                }`}>
                <Clock size={16} className={timeLeft < 180 ? 'text-rose-600' : timeLeft < 600 ? 'text-amber-600' : 'text-teal-700'} />
                <span className="font-mono font-black text-lg tracking-wider">{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Lesson progress indicators */}
            <div className="grid grid-cols-3 gap-3">
              {lessonGroups.map(lesson => {
                const lc = LESSON_COLORS[lesson];
                const lessonQs = ALL_QUESTIONS.filter(q => q.lesson === lesson);
                const answered = lessonQs.filter(q => isQuestionAnswered(q)).length;
                const pct = Math.round((answered / lessonQs.length) * 100);
                return (
                  <div key={lesson} className={`bg-white rounded-xl border ${lc.border} p-3 text-center`}>
                    <div className={`text-[10px] font-black uppercase tracking-wider ${lc.text} mb-1`}>
                      {t(`L${lesson.split('-')[1]}`, `د${lesson.split('-')[1]}`, lang)}
                    </div>
                    <div className="text-xs text-slate-500 font-semibold mb-1.5">
                      {answered}/{lessonQs.length}
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${lc.gradient} transition-all duration-300`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
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
                  className="bg-gradient-to-r from-indigo-600 to-violet-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / TOTAL) * 100}%` }}
                />
              </div>
              {/* Question pills */}
              <div className="flex flex-wrap gap-2">
                {ALL_QUESTIONS.map((q, idx) => {
                  const answered = isQuestionAnswered(q);
                  const isCurrent = idx === currentQ;
                  const isWritten = q.type === 'WRITTEN';
                  const lc = LESSON_COLORS[q.lesson] || LESSON_COLORS['2-1'];
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(idx)}
                      title={`${isWritten ? t('Essay', 'مقالي', lang) : 'MCQ'} — ${q.lesson}`}
                      className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${isCurrent
                        ? `bg-gradient-to-br ${lc.gradient} text-white ring-2 ring-offset-1 shadow-md`
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
              {(() => {
                const lc = LESSON_COLORS[currentQuestion.lesson] || LESSON_COLORS['2-1'];
                return (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-xl bg-gradient-to-br ${lc.gradient} text-white text-xs font-black flex items-center justify-center`}>
                        {currentQ + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {lang === 'ar' ? currentQuestion.lessonName_ar : currentQuestion.lessonName_en}
                      </span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${isMcq
                      ? 'text-slate-500 bg-slate-50 border-slate-200'
                      : 'text-violet-700 bg-violet-50 border-violet-200'
                      }`}>
                      {isMcq ? t('MCQ', 'اختيار من متعدد', lang) : t('Essay', 'مقالي', lang)}
                    </span>
                  </div>
                );
              })()}

              {/* Question text */}
              <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-6 leading-relaxed">
                {lang === 'ar' ? currentQuestion.question_ar : currentQuestion.question_en}
              </h3>

              {/* ── MCQ Options ── */}
              {isMcq && (() => {
                const mcqQ = currentQuestion as UnitExamMcq;
                const selectedOption = mcqAnswers[mcqQ.id];
                const lc = LESSON_COLORS[mcqQ.lesson] || LESSON_COLORS['2-1'];
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
                          className={`w-full p-4 rounded-2xl border-2 text-start transition-all flex items-center gap-3.5 group cursor-pointer ${isSelected
                            ? `border-indigo-500 bg-indigo-50/60 text-primary-navy shadow-sm ring-1 ring-indigo-400/30`
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                            }`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors flex-shrink-0 ${isSelected
                            ? `bg-gradient-to-br ${lc.gradient} text-white shadow-sm`
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                            }`}>
                            {opt}
                          </span>
                          <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">{text}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${isSelected ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300'
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
                const wQ = currentQuestion as UnitExamWritten;
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
                      className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-sm font-medium text-primary-navy leading-relaxed resize-none transition-all bg-white placeholder-slate-300"
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
                      className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${unansweredCount > 0 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>
                  {unansweredCount > 0 ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                </div>

                <h3 className="text-xl font-black text-primary-navy mb-2">
                  {t('Confirm Submission', 'تأكيد تسليم الامتحان', lang)}
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
