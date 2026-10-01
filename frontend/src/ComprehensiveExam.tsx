import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
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
  HelpCircle
} from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from './App';
import { COMPREHENSIVE_EXAM_QUESTIONS, ComprehensiveExamQuestion } from './comprehensiveExamData';

export default function ComprehensiveExam() {
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT'>('ALL');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes timer

  const totalQuestions = COMPREHENSIVE_EXAM_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [COMPREHENSIVE_EXAM_QUESTIONS[currentQ].id]: option
    }));
  };

  const handleAutoSubmit = () => {
    setShowConfirmSubmit(false);
    executeSubmit();
  };

  const executeSubmit = async () => {
    setSubmitting(true);
    const correctCount = COMPREHENSIVE_EXAM_QUESTIONS.filter(
      q => answers[q.id] === q.correct_option
    ).length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);

    try {
      if (user) {
        // Save submission to Firebase
        await addDoc(collection(db, 'assessment_results'), {
          userId: user.uid,
          userName: profile?.displayName || user.email || 'Student',
          userEmail: user.email || '',
          lessonId: 'exam-1-3',
          score: scorePct,
          totalMCQ: totalQuestions,
          correctMCQ: correctCount,
          answers: answers,
          writtenAnswers: {},
          submittedAt: serverTimestamp(),
        });

        // Award XP and record assessment
        if (profile) {
          const completedAssessments = profile.completedAssessments || [];
          const alreadyRecorded = completedAssessments.includes('exam-1-3');
          await updateDoc(doc(db, 'users', user.uid), {
            xp: (profile.xp || 0) + (alreadyRecorded ? 50 : 150),
            completedAssessments: alreadyRecorded
              ? completedAssessments
              : [...completedAssessments, 'exam-1-3'],
          });
        }
      }
    } catch (err) {
      console.error('Error submitting exam to Firebase:', err);
    } finally {
      setSubmitting(false);
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentQuestion: ComprehensiveExamQuestion = COMPREHENSIVE_EXAM_QUESTIONS[currentQ];
  const selectedOption = answers[currentQuestion?.id];

  // Post-submission stats
  const correctCount = COMPREHENSIVE_EXAM_QUESTIONS.filter(
    q => answers[q.id] === q.correct_option
  ).length;
  const scorePct = Math.round((correctCount / totalQuestions) * 100);

  const filteredReviewQuestions = COMPREHENSIVE_EXAM_QUESTIONS.filter(q => {
    const isCorrect = answers[q.id] === q.correct_option;
    if (reviewFilter === 'CORRECT') return isCorrect;
    if (reviewFilter === 'WRONG') return !isCorrect;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        
        {/* ========================================================= */}
        {/* VIEW 1: RESULTS & DETAILED QUESTION-BY-QUESTION REVIEW */}
        {/* (Only shown after the student submits all answers!) */}
        {/* ========================================================= */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-primary-navy via-primary-plum to-primary-navy rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-pink/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-pink text-xs font-black uppercase tracking-wider mb-3">
                    <Award size={14} className="text-accent-pink" />
                    {lang === 'ar' ? 'تقرير نتائج الامتحان الرسمي' : 'Official Exam Report'}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black mb-2">
                    {lang === 'ar' ? 'الامتحان الشامل — أول 3 دروس' : 'Comprehensive Exam — First 3 Lessons'}
                  </h1>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-xl">
                    {lang === 'ar'
                      ? 'تم تصحيح إجاباتك كاملة وحفظ النتيجة في سجل المنصة بنجاح. تفقّد تفاصيل كل سؤال والشرح النموذجي أدناه.'
                      : 'Your exam paper has been fully graded and stored. Review the question-by-question breakdown below.'}
                  </p>
                </div>

                {/* Score Gauge */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[160px] shadow-lg">
                  <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1">
                    {lang === 'ar' ? 'النتيجة الإجمالية' : 'Total Score'}
                  </span>
                  <div className={`text-4xl font-black ${
                    scorePct >= 85 ? 'text-emerald-400' :
                    scorePct >= 70 ? 'text-blue-300' :
                    scorePct >= 50 ? 'text-amber-300' : 'text-rose-400'
                  }`}>
                    {scorePct}%
                  </div>
                  <span className="block text-xs font-bold text-slate-200 mt-1">
                    {correctCount} / {totalQuestions} {lang === 'ar' ? 'إجابة صحيحة' : 'Correct'}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'التقييم العام' : 'Rating'}</span>
                <span className={`font-black text-sm ${
                  scorePct >= 85 ? 'text-emerald-600' : scorePct >= 70 ? 'text-blue-600' : scorePct >= 50 ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {scorePct >= 85 ? (lang === 'ar' ? '🌟 ممتاز ومتفوق' : '🌟 Excellent') :
                   scorePct >= 70 ? (lang === 'ar' ? '🥇 جيد جداً' : '🥇 Very Good') :
                   scorePct >= 50 ? (lang === 'ar' ? '📘 جيد ومقبول' : '📘 Passing') :
                   (lang === 'ar' ? '⚠️ يحتاج مراجعة' : '⚠️ Needs Study')}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'إجابات صحيحة' : 'Correct'}</span>
                <span className="font-black text-lg text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle size={16} /> {correctCount}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'إجابات خاطئة' : 'Wrong'}</span>
                <span className="font-black text-lg text-rose-600 flex items-center justify-center gap-1">
                  <XCircle size={16} /> {totalQuestions - correctCount}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'نقاط الخبرة XP' : 'XP Earned'}</span>
                <span className="font-black text-lg text-primary-plum flex items-center justify-center gap-1">
                  <Sparkles size={16} className="text-accent-pink" /> +150 XP
                </span>
              </div>
            </div>

            {/* Review Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="font-black text-primary-navy text-base flex items-center gap-2">
                <FileText size={18} className="text-primary-plum" />
                <span>{lang === 'ar' ? 'مراجعة الأسئلة والحلول النموذجية' : 'Questions & Model Answers Review'}</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReviewFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    reviewFilter === 'ALL'
                      ? 'bg-primary-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ar' ? 'جميع الأسئلة' : 'All'} ({totalQuestions})
                </button>
                <button
                  onClick={() => setReviewFilter('WRONG')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    reviewFilter === 'WRONG'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ar' ? 'الخاطئة فقط ❌' : 'Wrong Only'} ({totalQuestions - correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('CORRECT')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    reviewFilter === 'CORRECT'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ar' ? 'الصحيحة فقط ✅' : 'Correct Only'} ({correctCount})
                </button>
              </div>
            </div>

            {/* Questions Breakdown List */}
            <div className="space-y-5">
              {filteredReviewQuestions.map((q, idx) => {
                const studentChoice = answers[q.id];
                const isCorrect = studentChoice === q.correct_option;
                const isUnanswered = !studentChoice;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-2xl border-2 p-5 sm:p-6 transition-all shadow-sm ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : isUnanswered
                        ? 'border-slate-200'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-primary-navy text-white text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-primary-plum/10 text-primary-plum">
                          {lang === 'ar' ? q.lessonName_ar : q.lessonName_en}
                        </span>
                      </div>

                      <div>
                        {isCorrect ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                            <CheckCircle size={13} /> {lang === 'ar' ? 'إجابتك صحيحة (+1 درجة)' : 'Correct (+1 point)'}
                          </span>
                        ) : isUnanswered ? (
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-1">
                            <HelpCircle size={13} /> {lang === 'ar' ? 'لم تتم الإجابة' : 'Unanswered'}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1 border border-rose-200">
                            <XCircle size={13} /> {lang === 'ar' ? `إجابتك خاطئة (اخترت ${studentChoice})` : `Wrong Choice (${studentChoice})`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Text */}
                    <h4 className="font-bold text-base sm:text-lg text-primary-navy mb-4 leading-relaxed">
                      {lang === 'ar' ? q.question_ar : q.question_en}
                    </h4>

                    {/* Options Grid */}
                    <div className="space-y-2.5 mb-5">
                      {(['A', 'B', 'C', 'D'] as const).map(opt => {
                        const optText = lang === 'ar' ? (q as any)[`option_${opt.toLowerCase()}_ar`] : (q as any)[`option_${opt.toLowerCase()}_en`];
                        const isStudentPick = studentChoice === opt;
                        const isModelAnswer = opt === q.correct_option;

                        let optClasses = 'bg-white border-slate-200 text-slate-700';
                        let badge = null;

                        if (isModelAnswer && isStudentPick) {
                          optClasses = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-sm';
                          badge = (
                            <span className="ml-auto mr-auto sm:ml-auto px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1">
                              <CheckCircle size={12} /> {lang === 'ar' ? 'إجابتك ومطابقة للنموذج ✅' : 'Your Pick & Correct ✅'}
                            </span>
                          );
                        } else if (isModelAnswer) {
                          optClasses = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          badge = (
                            <span className="ml-auto mr-auto sm:ml-auto px-2 py-0.5 rounded bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1">
                              <CheckCircle size={12} /> {lang === 'ar' ? 'الإجابة النموذجية الصحيحة ✅' : 'Model Answer ✅'}
                            </span>
                          );
                        } else if (isStudentPick) {
                          optClasses = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                          badge = (
                            <span className="ml-auto mr-auto sm:ml-auto px-2 py-0.5 rounded bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1">
                              <XCircle size={12} /> {lang === 'ar' ? 'اختيارك (خاطئ) ❌' : 'Your Choice (Wrong) ❌'}
                            </span>
                          );
                        }

                        return (
                          <div
                            key={opt}
                            className={`p-3.5 rounded-xl border-2 flex items-center gap-3 transition-colors ${optClasses}`}
                          >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                              isModelAnswer ? 'bg-emerald-600 text-white' : isStudentPick ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {opt}
                            </span>
                            <span className="text-sm font-semibold flex-1">{optText}</span>
                            {badge}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-start gap-2.5">
                      <Lightbulb size={16} className="text-blue-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-0.5">
                          {lang === 'ar' ? 'الشرح والتعليل النموذجي:' : 'Model Explanation:'}
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
                  setTimeLeft(25 * 60);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-primary-navy font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={15} />
                <span>{lang === 'ar' ? 'إعادة خوض الامتحان' : 'Retake Exam'}</span>
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-primary-plum to-primary-navy hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Home size={15} />
                <span>{lang === 'ar' ? 'العودة للوحة التحكم الرئيسية' : 'Back to Dashboard'}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: ACTIVE EXAM MODE (STRICTLY NO ANSWERS REVEALED!)   */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Top Exam Header */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-plum/10 text-primary-plum text-xs font-black uppercase tracking-wider mb-1">
                  <Award size={13} />
                  {lang === 'ar' ? 'امتحان رسمي بدون إجابات فورية' : 'Official Exam — Final Results Only'}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-primary-navy">
                  {lang === 'ar' ? 'الامتحان الشامل على أول 3 دروس' : 'Comprehensive Exam — First 3 Lessons'}
                </h1>
                <p className="text-slate-400 text-xs font-semibold mt-0.5">
                  {lang === 'ar'
                    ? 'الوحدة الأولى: تكنولوجيا المعلومات والمجتمع • 15 سؤالاً اختيار من متعدد'
                    : 'Unit 1: Information Technology & Society • 15 MCQ Questions'}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border ${
                timeLeft < 300
                  ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-primary-navy'
              }`}>
                <Clock size={16} className={timeLeft < 300 ? 'text-rose-600' : 'text-primary-plum'} />
                <span className="font-mono font-black text-lg tracking-wider">
                  {formatTimer(timeLeft)}
                </span>
              </div>
            </div>

            {/* Quick Navigation Strip (Questions 1 to 15) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                <span>{lang === 'ar' ? `السؤال ${currentQ + 1} من ${totalQuestions}` : `Question ${currentQ + 1} of ${totalQuestions}`}</span>
                <span>{lang === 'ar' ? `${answeredCount} مجاب • ${unansweredCount} متبقي` : `${answeredCount} Answered • ${unansweredCount} Left`}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-primary-plum to-accent-pink h-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>

              {/* Pills Grid */}
              <div className="flex flex-wrap gap-2">
                {COMPREHENSIVE_EXAM_QUESTIONS.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = idx === currentQ;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(idx)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                        isCurrent
                          ? 'bg-primary-navy text-white ring-2 ring-primary-plum shadow-md'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                      title={`${lang === 'ar' ? 'السؤال' : 'Question'} ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy text-white text-xs font-black flex items-center justify-center">
                    {currentQ + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {lang === 'ar' ? currentQuestion.lessonName_ar : currentQuestion.lessonName_en}
                  </span>
                </div>

                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                  {lang === 'ar' ? 'سؤال اختيار من متعدد' : 'Multiple Choice'}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-6 leading-relaxed">
                {lang === 'ar' ? currentQuestion.question_ar : currentQuestion.question_en}
              </h3>

              {/* Options Cards (Clean, NO correctness shown!) */}
              <div className="space-y-3 mb-8">
                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                  const optText = lang === 'ar'
                    ? (currentQuestion as any)[`option_${opt.toLowerCase()}_ar`]
                    : (currentQuestion as any)[`option_${opt.toLowerCase()}_en`];
                  const isSelected = selectedOption === opt;

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-4 rounded-2xl border-2 text-left sm:text-right transition-all flex items-center gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'border-primary-plum bg-primary-plum/5 text-primary-navy shadow-sm ring-1 ring-primary-plum/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                        isSelected
                          ? 'bg-primary-plum text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        {opt}
                      </span>
                      <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">
                        {optText}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-primary-plum bg-primary-plum text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Question Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                <button
                  onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
                  disabled={currentQ === 0}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-primary-navy font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                  <span>{lang === 'ar' ? 'السابق' : 'Previous'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-5 py-2.5 rounded-xl bg-accent-pink/10 hover:bg-accent-pink/20 text-accent-pink font-bold text-xs transition-colors border border-accent-pink/30 flex items-center gap-1.5"
                  >
                    <CheckCircle size={14} />
                    <span>{lang === 'ar' ? 'تسليم الامتحان' : 'Submit Exam'}</span>
                  </button>

                  {currentQ < totalQuestions - 1 ? (
                    <button
                      onClick={() => setCurrentQ(prev => Math.min(totalQuestions - 1, prev + 1))}
                      className="px-6 py-2.5 rounded-xl bg-primary-navy hover:bg-primary-plum text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
                      <ArrowLeft size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <CheckCircle size={14} />
                      <span>{lang === 'ar' ? 'إنهاء وتسليم' : 'Finish & Submit'}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CONFIRMATION MODAL BEFORE SUBMITTING EXAM */}
        {/* ========================================================= */}
        <AnimatePresence>
          {showConfirmSubmit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  unansweredCount > 0 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {unansweredCount > 0 ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                </div>

                <h3 className="text-xl font-black text-primary-navy mb-2">
                  {lang === 'ar' ? 'تأكيد تسليم ورقة الامتحان' : 'Confirm Exam Submission'}
                </h3>

                <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">
                  {unansweredCount > 0 ? (
                    lang === 'ar'
                      ? `لديك ${unansweredCount} سؤالاً لم تقم بالإجابة عليها بعد من أصل ${totalQuestions} سؤالاً. هل تريد بالتأكيد إنهاء الامتحان وتسليم الإجابات الآن؟`
                      : `You have ${unansweredCount} unanswered questions out of ${totalQuestions}. Are you sure you want to finish and submit now?`
                  ) : (
                    lang === 'ar'
                      ? 'لقد أجبت على جميع الأسئلة الـ 15 بنجاح! بمجرد التسليم، ستظهر لك النتيجة النهائية والحلول النموذجية فوراً.'
                      : 'You have answered all 15 questions! Once submitted, your final score and detailed explanations will be revealed.'
                  )}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmSubmit(false)}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {lang === 'ar' ? 'الرجوع للمتابعة' : 'Keep Reviewing'}
                  </button>

                  <button
                    onClick={executeSubmit}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>{lang === 'ar' ? 'جاري الرصد...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <CheckCircle size={15} />
                        <span>{lang === 'ar' ? 'تأكيد التسليم' : 'Confirm & Submit'}</span>
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
