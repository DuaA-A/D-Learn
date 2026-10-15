import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Home,
  AlertTriangle,
  FileText,
  Lightbulb,
  Sparkles,
  Edit3,
  BookOpen,
  Send
} from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from './App';
import { QUIZ_QUESTIONS } from './courseData';
import type { QuizQuestion } from './courseData';
import {
  CH1_COMPREHENSIVE_MCQ_IDS,
  CH1_COMPREHENSIVE_WRITTEN_IDS,
} from './ch1ExamIds';

const EXAM_MCQS: QuizQuestion[] = QUIZ_QUESTIONS.filter(q =>
  CH1_COMPREHENSIVE_MCQ_IDS.includes(q.id)
);

const EXAM_WRITTEN: QuizQuestion[] = QUIZ_QUESTIONS.filter(q =>
  CH1_COMPREHENSIVE_WRITTEN_IDS.includes(q.id)
);

export default function ComprehensiveExamCh1() {
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  const STORAGE_KEY = 'DLEARN_CH1_EXAM_STATE_V1';

  // Active section: 'MCQ' or 'WRITTEN'
  const [activeSection, setActiveSection] = useState<'MCQ' | 'WRITTEN'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).activeSection || 'MCQ';
    } catch (e) {}
    return 'MCQ';
  });

  const [currentMcqIdx, setCurrentMcqIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && typeof JSON.parse(saved).currentMcqIdx === 'number') {
        return Math.min(Math.max(0, JSON.parse(saved).currentMcqIdx), EXAM_MCQS.length - 1);
      }
    } catch (e) {}
    return 0;
  });

  const [currentWrittenIdx, setCurrentWrittenIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && typeof JSON.parse(saved).currentWrittenIdx === 'number') {
        return Math.min(Math.max(0, JSON.parse(saved).currentWrittenIdx), EXAM_WRITTEN.length - 1);
      }
    } catch (e) {}
    return 0;
  });

  // Answers state
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).mcqAnswers || {};
    } catch (e) {}
    return {};
  });

  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).writtenAnswers || {};
    } catch (e) {}
    return {};
  });

  // Instant practice correction reveal state
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).revealedAnswers || {};
    } catch (e) {}
    return {};
  });

  // Submission & UI state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewTab, setReviewTab] = useState<'MCQ' | 'WRITTEN'>('MCQ');
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT'>('ALL');
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && typeof JSON.parse(saved).timeLeft === 'number') {
        return Math.max(JSON.parse(saved).timeLeft, 120);
      }
    } catch (e) {}
    return 60 * 60;
  });

  // Synchronize state to localStorage so progress is never lost on refresh or navigation
  useEffect(() => {
    if (isSubmitted) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeSection,
        currentMcqIdx,
        currentWrittenIdx,
        mcqAnswers,
        writtenAnswers,
        revealedAnswers,
        timeLeft,
      }));
    } catch (e) {}
  }, [activeSection, currentMcqIdx, currentWrittenIdx, mcqAnswers, writtenAnswers, revealedAnswers, timeLeft, isSubmitted]);

  // Stats
  const totalMcq = EXAM_MCQS.length;
  const totalWritten = EXAM_WRITTEN.length;
  const answeredMcqCount = Object.keys(mcqAnswers).length;
  const answeredWrittenCount = Object.keys(writtenAnswers).filter(
    k => (writtenAnswers[k] || '').trim().length > 0
  ).length;

  const unansweredMcq = totalMcq - answeredMcqCount;
  const unansweredWritten = totalWritten - answeredWrittenCount;

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
    const currentQ = EXAM_MCQS[currentMcqIdx];
    if (!currentQ) return;
    setMcqAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleWrittenChange = (text: string) => {
    if (isSubmitted) return;
    const currentQ = EXAM_WRITTEN[currentWrittenIdx];
    if (!currentQ) return;
    setWrittenAnswers(prev => ({
      ...prev,
      [currentQ.id]: text
    }));
  };

  const handleAutoSubmit = () => {
    setShowConfirmSubmit(false);
    executeSubmit();
  };

  const executeSubmit = async () => {
    setSubmitting(true);
    const correctCount = EXAM_MCQS.filter(
      q => mcqAnswers[q.id] === q.correct_option
    ).length;
    const scorePct = Math.round((correctCount / Math.max(totalMcq, 1)) * 100);

    try {
      if (user) {
        // Save submission to Firebase
        await addDoc(collection(db, 'assessment_results'), {
          userId: user.uid,
          userName: profile?.displayName || user.email || 'Student',
          userEmail: user.email || '',
          lessonId: 'exam-ch1-full',
          score: scorePct,
          totalMCQ: totalMcq,
          correctMCQ: correctCount,
          totalWritten: totalWritten,
          answeredWritten: answeredWrittenCount,
          answers: mcqAnswers,
          writtenAnswers: writtenAnswers,
          submittedAt: serverTimestamp(),
        });

        // Award XP and record assessment
        if (profile) {
          const completedAssessments = profile.completedAssessments || [];
          const alreadyRecorded = completedAssessments.includes('exam-ch1-full');
          await updateDoc(doc(db, 'users', user.uid), {
            xp: (profile.xp || 0) + (alreadyRecorded ? 75 : 250),
            completedAssessments: alreadyRecorded
              ? completedAssessments
              : [...completedAssessments, 'exam-ch1-full'],
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

  // Post-submission calculation
  const correctCount = EXAM_MCQS.filter(
    q => mcqAnswers[q.id] === q.correct_option
  ).length;
  const scorePct = Math.round((correctCount / Math.max(totalMcq, 1)) * 100);

  const filteredReviewMcqs = EXAM_MCQS.filter(q => {
    const isCorrect = mcqAnswers[q.id] === q.correct_option;
    if (reviewFilter === 'CORRECT') return isCorrect;
    if (reviewFilter === 'WRONG') return !isCorrect;
    return true;
  });

  const currentMcq = EXAM_MCQS[currentMcqIdx];
  const currentWritten = EXAM_WRITTEN[currentWrittenIdx];

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        
        {/* ========================================================= */}
        {/* VIEW 1: RESULTS & DETAILED REVIEW (POST SUBMISSION)        */}
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
                    {lang === 'ar' ? 'تقرير نتيجة الامتحان الشامل للفصل الأول' : 'Chapter 1 Official Exam Report'}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black mb-2">
                    {lang === 'ar' ? 'امتحان الفصل الأول الشامل (دروس 1 إلى 4)' : 'Chapter 1 Comprehensive Exam (Lessons 1-4)'}
                  </h1>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-xl">
                    {lang === 'ar'
                      ? 'تم تصحيح أسئلة الاختيار من متعدد وتوثيق إجاباتك المقالية مع النماذج الإرشادية. تفقّد تفاصيل الامتحان أدناه.'
                      : 'MCQs have been automatically scored and written essays documented alongside official model answers.'}
                  </p>
                </div>

                {/* Score Gauge */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[170px] shadow-lg">
                  <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1">
                    {lang === 'ar' ? 'نتيجة الاختيار من متعدد' : 'MCQ Score'}
                  </span>
                  <div className={`text-4xl font-black ${
                    scorePct >= 85 ? 'text-emerald-400' :
                    scorePct >= 70 ? 'text-blue-300' :
                    scorePct >= 50 ? 'text-amber-300' : 'text-rose-400'
                  }`}>
                    {scorePct}%
                  </div>
                  <span className="block text-xs font-bold text-slate-200 mt-1">
                    {correctCount} / {totalMcq} {lang === 'ar' ? 'صحيحة' : 'Correct'}
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
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'MCQ صحيح' : 'Correct MCQ'}</span>
                <span className="font-black text-lg text-emerald-600 flex items-center justify-center gap-1">
                  <CheckCircle size={16} /> {correctCount} / {totalMcq}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'الأسئلة المقالية' : 'Written Answers'}</span>
                <span className="font-black text-lg text-primary-plum flex items-center justify-center gap-1">
                  <Edit3 size={16} /> {answeredWrittenCount} / {totalWritten}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{lang === 'ar' ? 'نقاط الخبرة XP' : 'XP Earned'}</span>
                <span className="font-black text-lg text-primary-plum flex items-center justify-center gap-1">
                  <Sparkles size={16} className="text-accent-pink" /> +250 XP
                </span>
              </div>
            </div>

            {/* Review Section Tabs: MCQ vs WRITTEN */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2">
              <button
                onClick={() => setReviewTab('MCQ')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  reviewTab === 'MCQ'
                    ? 'bg-primary-navy text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CheckCircle size={16} />
                <span>{lang === 'ar' ? `مراجعة الاختيار من متعدد (${totalMcq})` : `MCQ Review (${totalMcq})`}</span>
              </button>

              <button
                onClick={() => setReviewTab('WRITTEN')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  reviewTab === 'WRITTEN'
                    ? 'bg-primary-plum text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Edit3 size={16} />
                <span>{lang === 'ar' ? `مراجعة الأسئلة المقالية والنموذج (${totalWritten})` : `Written & Model Answers (${totalWritten})`}</span>
              </button>
            </div>

            {/* TAB 1: MCQ REVIEW */}
            {reviewTab === 'MCQ' && (
              <div className="space-y-6">
                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="font-black text-primary-navy text-base flex items-center gap-2">
                    <FileText size={18} className="text-primary-plum" />
                    <span>{lang === 'ar' ? 'تفاصيل أسئلة الاختيار من متعدد' : 'MCQ Questions Breakdown'}</span>
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
                      {lang === 'ar' ? 'الكل' : 'All'} ({totalMcq})
                    </button>
                    <button
                      onClick={() => setReviewFilter('WRONG')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        reviewFilter === 'WRONG'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      {lang === 'ar' ? 'الخاطئة' : 'Wrong'} ({totalMcq - correctCount})
                    </button>
                    <button
                      onClick={() => setReviewFilter('CORRECT')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        reviewFilter === 'CORRECT'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {lang === 'ar' ? 'الصحيحة' : 'Correct'} ({correctCount})
                    </button>
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {filteredReviewMcqs.map((q, idx) => {
                    const studentPick = mcqAnswers[q.id];
                    const isCorrect = studentPick === q.correct_option;

                    return (
                      <div
                        key={q.id}
                        className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
                          isCorrect ? 'border-emerald-200' : 'border-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center text-white ${
                              isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-400">
                              الدرس {q.lesson}
                            </span>
                          </div>

                          <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {isCorrect ? (
                              <>
                                <CheckCircle size={14} />
                                <span>{lang === 'ar' ? 'إجابة صحيحة' : 'Correct'}</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={14} />
                                <span>{lang === 'ar' ? 'إجابة خاطئة' : 'Wrong'}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Question Text */}
                        <h4 className="text-base font-bold text-primary-navy mb-4 leading-relaxed">
                          {lang === 'ar' ? q.question_ar : q.question_en}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2 mb-4">
                          {(['A', 'B', 'C', 'D'] as const).map(opt => {
                            const optText = lang === 'ar'
                              ? (q as any)[`option_${opt.toLowerCase()}_ar`]
                              : (q as any)[`option_${opt.toLowerCase()}_en`];
                            const isModelAnswer = opt === q.correct_option;
                            const isStudentPick = opt === studentPick;

                            let optClasses = 'border-slate-200 bg-slate-50/50 text-slate-700';
                            let badge = null;

                            if (isModelAnswer) {
                              optClasses = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold';
                              badge = (
                                <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                                  <CheckCircle size={12} /> {lang === 'ar' ? 'الإجابة الصحيحة النموذجية ✅' : 'Model Answer ✅'}
                                </span>
                              );
                            } else if (isStudentPick && !isCorrect) {
                              optClasses = 'border-rose-500 bg-rose-50/70 text-rose-900 line-through';
                              badge = (
                                <span className="text-[11px] font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1">
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
              </div>
            )}

            {/* TAB 2: WRITTEN QUESTIONS REVIEW WITH MODEL ANSWERS */}
            {reviewTab === 'WRITTEN' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary-plum/10 to-accent-pink/10 p-5 rounded-2xl border border-primary-plum/20">
                  <h3 className="text-base font-black text-primary-navy mb-1 flex items-center gap-2">
                    <BookOpen size={18} className="text-primary-plum" />
                    <span>{lang === 'ar' ? 'النموذج الإرشادي الرسمي للأسئلة المقالية' : 'Official Essay Marking Rubric & Model Answers'}</span>
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {lang === 'ar'
                      ? 'قارن إجاباتك المكتوبة مع النموذج الإرشادي وعناصر الإجابة الكاملة لكل سؤال لتقييم تحصيلك الدراسي.'
                      : 'Compare your essay submissions directly against the official ministry model answers.'}
                  </p>
                </div>

                <div className="space-y-6">
                  {EXAM_WRITTEN.map((q, idx) => {
                    const studentAnswer = writtenAnswers[q.id]?.trim();
                    const hasAnswer = !!studentAnswer;

                    return (
                      <div
                        key={q.id}
                        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy text-white text-xs font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-black text-primary-navy block">
                                {lang === 'ar' ? `سؤال مقالي — الدرس ${q.lesson}` : `Written Essay — Lesson ${q.lesson}`}
                              </span>
                            </div>
                          </div>

                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            hasAnswer
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {hasAnswer ? (lang === 'ar' ? 'تمت الإجابة' : 'Answered') : (lang === 'ar' ? 'لم تتم الإجابة' : 'Left Blank')}
                          </span>
                        </div>

                        {/* Question Text */}
                        <h4 className="text-base sm:text-lg font-bold text-primary-navy leading-relaxed">
                          {lang === 'ar' ? q.question_ar : q.question_en}
                        </h4>

                        {/* Student Answer Box */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                            <Edit3 size={13} className="text-primary-plum" />
                            {lang === 'ar' ? 'إجابتك المسجلة أثناء الامتحان:' : 'Your Recorded Submission:'}
                          </span>
                          {hasAnswer ? (
                            <p className="text-sm font-semibold text-slate-800 whitespace-pre-wrap leading-relaxed">
                              {studentAnswer}
                            </p>
                          ) : (
                            <p className="text-xs font-semibold text-slate-400 italic">
                              {lang === 'ar' ? 'لم تقم بكتابة إجابة لهذا السؤال أثناء فترة الامتحان.' : 'No submission was typed during the test.'}
                            </p>
                          )}
                        </div>

                        {/* Model Answer Box */}
                        <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5 space-y-3">
                          <div className="flex items-center gap-2 text-emerald-900 font-black text-xs sm:text-sm uppercase tracking-wider">
                            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                            <span>{lang === 'ar' ? 'النموذج الإرشادي الرسمي للإجابة النموذجية:' : 'Official Model Answer:'}</span>
                          </div>
                          <p className="text-emerald-950 text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                            {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                          </p>
                        </div>

                        {/* Key Rubric Points */}
                        {q.explanation_ar && (
                          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex items-start gap-2.5">
                            <Lightbulb size={16} className="text-blue-700 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-0.5">
                                {lang === 'ar' ? 'عناصر التقييم ومفتاح الدرجة الكاملة:' : 'Marking Rubric & Essential Elements:'}
                              </span>
                              <p className="text-blue-950 text-xs sm:text-sm font-medium leading-relaxed">
                                {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setMcqAnswers({});
                  setWrittenAnswers({});
                  setIsSubmitted(false);
                  setCurrentMcqIdx(0);
                  setCurrentWrittenIdx(0);
                  setTimeLeft(50 * 60);
                  setActiveSection('MCQ');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-primary-navy font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={15} />
                <span>{lang === 'ar' ? 'إعادة خوض الامتحان الشامل' : 'Retake Exam'}</span>
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
          /* VIEW 2: ACTIVE EXAM MODE (MCQ + WRITTEN SECTIONS)         */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Top Exam Header */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-plum/10 text-primary-plum text-xs font-black uppercase tracking-wider mb-1">
                  <Award size={13} />
                  {lang === 'ar' ? 'الامتحان الرسمي الشامل — الفصل الأول' : 'Official Comprehensive Exam — Chapter 1'}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-primary-navy">
                  {lang === 'ar' ? 'امتحان الفصل الأول (شامل MCQ ومقالي)' : 'Chapter 1 Final Exam (MCQ & Essay)'}
                </h1>
                <p className="text-slate-400 text-xs font-semibold mt-0.5">
                  {lang === 'ar'
                    ? `الوحدة الأولى • ${totalMcq} سؤال اختيار من متعدد + ${totalWritten} أسئلة مقالية تحليلية`
                    : `Unit 1 • ${totalMcq} Multiple Choice + ${totalWritten} Analytical Written Questions`}
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

            {/* Section Switcher Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveSection('MCQ')}
                className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  activeSection === 'MCQ'
                    ? 'border-primary-navy bg-primary-navy text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CheckCircle size={16} />
                <span>{lang === 'ar' ? 'القسم 1: اختيار من متعدد' : 'Part 1: MCQ'}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeSection === 'MCQ' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {answeredMcqCount}/{totalMcq}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('WRITTEN')}
                className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  activeSection === 'WRITTEN'
                    ? 'border-primary-plum bg-primary-plum text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Edit3 size={16} />
                <span>{lang === 'ar' ? 'القسم 2: الأسئلة المقالية' : 'Part 2: Written'}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeSection === 'WRITTEN' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {answeredWrittenCount}/{totalWritten}
                </span>
              </button>
            </div>

            {/* SECTION 1: MCQ */}
            {activeSection === 'MCQ' && (
              <div className="space-y-6">
                {/* Navigator strip */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                    <span>{lang === 'ar' ? `سؤال ${currentMcqIdx + 1} من ${totalMcq} (اختيار من متعدد)` : `Question ${currentMcqIdx + 1} of ${totalMcq}`}</span>
                    <span>{lang === 'ar' ? `${answeredMcqCount} مجاب • ${unansweredMcq} متبقي` : `${answeredMcqCount} Answered • ${unansweredMcq} Left`}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-gradient-to-r from-primary-plum to-accent-pink h-full transition-all duration-300"
                      style={{ width: `${((currentMcqIdx + 1) / totalMcq) * 100}%` }}
                    ></div>
                  </div>

                  {/* Pills Grid */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {EXAM_MCQS.map((q, idx) => {
                      const isAnswered = !!mcqAnswers[q.id];
                      const isCurrent = idx === currentMcqIdx;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentMcqIdx(idx)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                            isCurrent
                              ? 'bg-primary-navy text-white ring-2 ring-primary-plum shadow-md'
                              : isAnswered
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active MCQ Question Card */}
                {currentMcq && (
                  <motion.div
                    key={currentMcq.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy text-white text-xs font-black flex items-center justify-center">
                          {currentMcqIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          الدرس {currentMcq.lesson}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                        {lang === 'ar' ? 'سؤال موضوعي (MCQ)' : 'Multiple Choice'}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-primary-navy mb-6 leading-relaxed">
                      {lang === 'ar' ? currentMcq.question_ar : currentMcq.question_en}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                      {(['A', 'B', 'C', 'D'] as const).map(opt => {
                        const optText = lang === 'ar'
                          ? (currentMcq as any)[`option_${opt.toLowerCase()}_ar`]
                          : (currentMcq as any)[`option_${opt.toLowerCase()}_en`];
                        const isSelected = mcqAnswers[currentMcq.id] === opt;

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

                    {/* Instant Practice Review / Real-time correction */}
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setRevealedAnswers(prev => ({ ...prev, [currentMcq.id]: !prev[currentMcq.id] }))}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <Lightbulb size={14} className="text-amber-500" />
                          <span>
                            {revealedAnswers[currentMcq.id]
                              ? (lang === 'ar' ? 'إخفاء الشرح والتصحيح' : 'Hide Explanation')
                              : (lang === 'ar' ? '🔍 تحقق من الإجابة والتصحيح الفوري' : 'Check Answer & Instant Review')}
                          </span>
                        </button>
                        
                        {mcqAnswers[currentMcq.id] && (
                          <span className="text-[11px] font-bold text-slate-400">
                            {lang === 'ar' ? 'تم حفظ اختيارك تلقائياً 💾' : 'Auto-saved 💾'}
                          </span>
                        )}
                      </div>

                      {revealedAnswers[currentMcq.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed ${
                            mcqAnswers[currentMcq.id] === currentMcq.correct_option
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : mcqAnswers[currentMcq.id]
                              ? 'bg-rose-50 border-rose-200 text-rose-950'
                              : 'bg-blue-50 border-blue-200 text-blue-950'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold mb-1.5">
                            {mcqAnswers[currentMcq.id] === currentMcq.correct_option ? (
                              <>
                                <CheckCircle size={16} className="text-emerald-600" />
                                <span>{lang === 'ar' ? 'إجابتك صحيحة! أحسنت 🎯' : 'Correct! Great job 🎯'}</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={16} className="text-rose-600" />
                                <span>
                                  {lang === 'ar'
                                    ? `إجابة غير صحيحة — الخيار الصحيح هو: (${currentMcq.correct_option})`
                                    : `Incorrect — Correct option is: (${currentMcq.correct_option})`}
                                </span>
                              </>
                            )}
                          </div>
                          {(currentMcq.explanation_ar || currentMcq.explanation_en) && (
                            <p className="text-slate-700 text-xs sm:text-sm mt-1">
                              💡 {lang === 'ar' ? currentMcq.explanation_ar : currentMcq.explanation_en}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentMcqIdx(prev => Math.max(0, prev - 1))}
                        disabled={currentMcqIdx === 0}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        {lang === 'ar' ? 'السابق' : 'Previous'}
                      </button>

                      {currentMcqIdx < totalMcq - 1 ? (
                        <button
                          onClick={() => setCurrentMcqIdx(prev => prev + 1)}
                          className="px-5 py-2.5 rounded-xl bg-primary-navy hover:bg-slate-800 text-white font-bold text-xs"
                        >
                          {lang === 'ar' ? 'التالي' : 'Next'}
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveSection('WRITTEN')}
                          className="px-5 py-2.5 rounded-xl bg-primary-plum hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5"
                        >
                          <span>{lang === 'ar' ? 'الانتقال للقسم المقالي ✏️' : 'Go to Essays ✏️'}</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* SECTION 2: WRITTEN / ESSAY QUESTIONS */}
            {activeSection === 'WRITTEN' && (
              <div className="space-y-6">
                {/* Navigator strip */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                    <span>{lang === 'ar' ? `سؤال مقالي ${currentWrittenIdx + 1} من ${totalWritten}` : `Essay Question ${currentWrittenIdx + 1} of ${totalWritten}`}</span>
                    <span>{lang === 'ar' ? `${answeredWrittenCount} مجاب • ${unansweredWritten} متبقي` : `${answeredWrittenCount} Answered • ${unansweredWritten} Left`}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-gradient-to-r from-primary-plum to-accent-pink h-full transition-all duration-300"
                      style={{ width: `${((currentWrittenIdx + 1) / totalWritten) * 100}%` }}
                    ></div>
                  </div>

                  {/* Pills Grid */}
                  <div className="flex flex-wrap gap-2">
                    {EXAM_WRITTEN.map((q, idx) => {
                      const isAnswered = !!(writtenAnswers[q.id] || '').trim();
                      const isCurrent = idx === currentWrittenIdx;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentWrittenIdx(idx)}
                          className={`w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                            isCurrent
                              ? 'bg-primary-plum text-white ring-2 ring-primary-plum shadow-md'
                              : isAnswered
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Written Question Card */}
                {currentWritten && (
                  <motion.div
                    key={currentWritten.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-plum to-accent-pink text-white text-xs font-black flex items-center justify-center">
                          {currentWrittenIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          الدرس {currentWritten.lesson}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-primary-plum bg-primary-plum/10 px-2.5 py-1 rounded-md border border-primary-plum/20">
                        {lang === 'ar' ? 'سؤال مقالي تحليلي ✍️' : 'Analytical Essay'}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-primary-navy leading-relaxed">
                      {lang === 'ar' ? currentWritten.question_ar : currentWritten.question_en}
                    </h3>

                    {/* Writing guidance banner */}
                    <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 font-medium">
                      <Lightbulb size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold block mb-0.5">
                          {lang === 'ar' ? 'توجيه الإجابة:' : 'Answering Guide:'}
                        </span>
                        {lang === 'ar'
                          ? 'اكتب تحليلاً وافياً مدعماً بالمصطلحات العلمية والخطوات أو الأمثلة الواقعية. سيتم حفظ إجابتك وعرض النموذج الإرشادي بعد التسليم.'
                          : 'Write a comprehensive analytical response supporting your points with technical terms and real-world examples.'}
                      </div>
                    </div>

                    {/* Textarea */}
                    <div>
                      <textarea
                        rows={8}
                        value={writtenAnswers[currentWritten.id] || ''}
                        onChange={e => handleWrittenChange(e.target.value)}
                        placeholder={
                          lang === 'ar'
                            ? 'اكتب إجابتك التحليلية الكاملة هنا بالتفصيل...'
                            : 'Type your detailed analytical response here...'
                        }
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 text-primary-navy text-sm sm:text-base font-medium focus:outline-none focus:border-primary-plum focus:ring-2 focus:ring-primary-plum/20 transition-all resize-y leading-relaxed"
                      />
                      <div className="flex justify-between items-center text-xs text-slate-400 mt-2 font-semibold">
                        <span>
                          {lang === 'ar' ? 'تُحفظ الإجابة تلقائياً 💾' : 'Auto-saved 💾'}
                        </span>
                        <span>
                          {(writtenAnswers[currentWritten.id] || '').length} {lang === 'ar' ? 'حرف' : 'characters'}
                        </span>
                      </div>
                    </div>

                    {/* Instant Model Answer & Self-Correction Toggle */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setRevealedAnswers(prev => ({ ...prev, [currentWritten.id]: !prev[currentWritten.id] }))}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary-plum/10 hover:bg-primary-plum/20 text-primary-plum border border-primary-plum/30 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Lightbulb size={14} className="text-primary-plum" />
                        <span>
                          {revealedAnswers[currentWritten.id]
                            ? (lang === 'ar' ? 'إخفاء النموذج الإرشادي' : 'Hide Model Answer')
                            : (lang === 'ar' ? '🔍 إظهار النموذج الإرشادي للتصحيح الفوري والشرح' : 'Show Official Model Answer & Rubric')}
                        </span>
                      </button>

                      {revealedAnswers[currentWritten.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 space-y-3"
                        >
                          <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
                              <CheckCircle size={15} className="text-emerald-600" />
                              <span>{lang === 'ar' ? 'النموذج الإرشادي الرسمي للإجابة (المختصر المركز):' : 'Official Model Answer:'}</span>
                            </div>
                            <p className="text-emerald-950 text-xs sm:text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                              {lang === 'ar' ? currentWritten.ideal_answer_ar : currentWritten.ideal_answer_en}
                            </p>
                          </div>

                          {(currentWritten.explanation_ar || currentWritten.explanation_en) && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 font-medium">
                              <span className="font-bold text-blue-900 block mb-1">
                                💡 {lang === 'ar' ? 'عناصر التقييم والشرح:' : 'Rubric & Explanation:'}
                              </span>
                              {lang === 'ar' ? currentWritten.explanation_ar : currentWritten.explanation_en}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentWrittenIdx(prev => Math.max(0, prev - 1))}
                        disabled={currentWrittenIdx === 0}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        {lang === 'ar' ? 'السابق' : 'Previous'}
                      </button>

                      {currentWrittenIdx < totalWritten - 1 ? (
                        <button
                          onClick={() => setCurrentWrittenIdx(prev => prev + 1)}
                          className="px-5 py-2.5 rounded-xl bg-primary-plum hover:opacity-90 text-white font-bold text-xs"
                        >
                          {lang === 'ar' ? 'التالي' : 'Next'}
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowConfirmSubmit(true)}
                          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <CheckCircle size={15} />
                          <span>{lang === 'ar' ? 'مراجعة وتسليم الامتحان' : 'Review & Submit'}</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Submit Bar Fixed / Bottom */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-semibold text-slate-500">
                {lang === 'ar' ? (
                  <>
                    الإجمالي: <strong className="text-primary-navy">{answeredMcqCount}/{totalMcq}</strong> اختيار من متعدد • <strong className="text-primary-navy">{answeredWrittenCount}/{totalWritten}</strong> مقالي
                  </>
                ) : (
                  <>
                    Total Progress: {answeredMcqCount}/{totalMcq} MCQ • {answeredWrittenCount}/{totalWritten} Written
                  </>
                )}
              </div>

              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <CheckCircle size={16} />
                <span>{lang === 'ar' ? 'إنهاء وتسليم ورقة الامتحان' : 'Finish & Submit Exam'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SUBMIT CONFIRMATION MODAL                                  */}
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
                  unansweredMcq > 0 || unansweredWritten > 0
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {unansweredMcq > 0 || unansweredWritten > 0 ? (
                    <AlertTriangle size={24} />
                  ) : (
                    <CheckCircle size={24} />
                  )}
                </div>

                <h3 className="text-xl font-black text-primary-navy mb-2">
                  {lang === 'ar' ? 'تأكيد تسليم ورقة الامتحان' : 'Confirm Exam Submission'}
                </h3>

                <div className="bg-slate-50 rounded-2xl p-4 mb-4 text-xs font-semibold text-slate-600 space-y-1.5 text-right sm:text-center">
                  <div>
                    {lang === 'ar' ? 'أسئلة الاختيار من متعدد:' : 'MCQs:'}{' '}
                    <span className={unansweredMcq === 0 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {answeredMcqCount} من {totalMcq} ({unansweredMcq} متبقي)
                    </span>
                  </div>
                  <div>
                    {lang === 'ar' ? 'الأسئلة المقالية:' : 'Written Essays:'}{' '}
                    <span className={unansweredWritten === 0 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                      {answeredWrittenCount} من {totalWritten} ({unansweredWritten} متبقي)
                    </span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs font-medium mb-5 leading-relaxed">
                  {lang === 'ar'
                    ? 'بمجرد تأكيد التسليم، ستُنقل إلى شاشة التقرير النهائي حيث يتم رصد درجتك وعرض النماذج الإرشادية لكل سؤال.'
                    : 'Once submitted, your final score will be calculated and model answers displayed.'}
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
                        <Send size={14} />
                        <span>{lang === 'ar' ? 'تأكيد التسليم الآن' : 'Submit Now'}</span>
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
