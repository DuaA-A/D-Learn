import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Search,
  RotateCcw,
  Sparkles,
  Home,
  Award,
  FileText
} from 'lucide-react';
import { AppContext } from './App';

// Lesson 1 Questions
import { CH2_L1_OFFICIAL_WRITTEN_P1, CH2_L1_OFFICIAL_MCQ_P1 } from './ch2_lesson1_officialQ_part1';
import { CH2_L1_OFFICIAL_WRITTEN_P2, CH2_L1_OFFICIAL_MCQ_P2 } from './ch2_lesson1_officialQ_part2';
import { CH2_L1_HARD_WRITTEN_P1, CH2_L1_HARD_MCQ_P1 } from './ch2_lesson1_hardQ_part1';
import { CH2_L1_HARD_WRITTEN_P2, CH2_L1_HARD_MCQ_P2 } from './ch2_lesson1_hardQ_part2';
import Lesson1BookletPdf from './Lesson1BookletPdf';

// Lesson 2 Questions
import { CH2_L2_OFFICIAL_WRITTEN_P1, CH2_L2_OFFICIAL_MCQ_P1 } from './ch2_lesson2_officialQ_part1';
import { CH2_L2_OFFICIAL_WRITTEN_P2, CH2_L2_OFFICIAL_MCQ_P2 } from './ch2_lesson2_officialQ_part2';
import { CH2_L2_HARD_WRITTEN_P1, CH2_L2_HARD_MCQ_P1 } from './ch2_lesson2_hardQ_part1';
import { CH2_L2_HARD_WRITTEN_P2, CH2_L2_HARD_MCQ_P2 } from './ch2_lesson2_hardQ_part2';
import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

const STORAGE_KEY = 'DLEARN_CH2_PRACTICE_V1';

export default function Chapter2Practice() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // Primary Lesson Switcher: 'L1' (تقنيات التشفير والمصادقة) or 'L2' (تصميم أمان الشبكات)
  const [selectedLesson, setSelectedLesson] = useState<'L1' | 'L2'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).selectedLesson || 'L1';
    } catch (e) { }
    return 'L1';
  });

  // Section: 'OFFICIAL' (وزارة) | 'HARD' (تحديات ونمط الامتحان) | 'NOTES' (شرح ونوتات)
  const [selectedSection, setSelectedSection] = useState<'OFFICIAL' | 'HARD' | 'NOTES'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).selectedSection || 'OFFICIAL';
    } catch (e) { }
    return 'OFFICIAL';
  });

  // Filters
  const [selectedPart, setSelectedPart] = useState<'ALL' | 1 | 2>('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | 'MCQ' | 'WRITTEN'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active question index in filtered list
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && typeof JSON.parse(saved).currentIdx === 'number') {
        return JSON.parse(saved).currentIdx;
      }
    } catch (e) { }
    return 0;
  });

  // Interactive Answers State (MCQ options + written texts)
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).mcqAnswers || {};
    } catch (e) { }
    return {};
  });

  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).writtenAnswers || {};
    } catch (e) { }
    return {};
  });

  // Revealed model answers & instant checks
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).revealedAnswers || {};
    } catch (e) { }
    return {};
  });

  // Student self-grading for written questions: 'CORRECT' | 'REVIEW'
  const [selfGrades, setSelfGrades] = useState<Record<string, 'CORRECT' | 'REVIEW'>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).selfGrades || {};
    } catch (e) { }
    return {};
  });

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedLesson,
        selectedSection,
        currentIdx,
        mcqAnswers,
        writtenAnswers,
        revealedAnswers,
        selfGrades,
      }));
    } catch (e) { }
  }, [selectedLesson, selectedSection, currentIdx, mcqAnswers, writtenAnswers, revealedAnswers, selfGrades]);

  // Aggregate questions based on current Lesson & Section
  const currentQuestions: Ch2QuizQuestion[] = useMemo(() => {
    if (selectedSection === 'NOTES') return [];

    if (selectedLesson === 'L1') {
      if (selectedSection === 'OFFICIAL') {
        return [
          ...CH2_L1_OFFICIAL_WRITTEN_P1,
          ...CH2_L1_OFFICIAL_MCQ_P1,
          ...CH2_L1_OFFICIAL_WRITTEN_P2,
          ...CH2_L1_OFFICIAL_MCQ_P2,
        ];
      } else {
        return [
          ...CH2_L1_HARD_WRITTEN_P1,
          ...CH2_L1_HARD_MCQ_P1,
          ...CH2_L1_HARD_WRITTEN_P2,
          ...CH2_L1_HARD_MCQ_P2,
        ];
      }
    } else {
      // Lesson 2
      if (selectedSection === 'OFFICIAL') {
        return [
          ...CH2_L2_OFFICIAL_WRITTEN_P1,
          ...CH2_L2_OFFICIAL_MCQ_P1,
          ...CH2_L2_OFFICIAL_WRITTEN_P2,
          ...CH2_L2_OFFICIAL_MCQ_P2,
        ];
      } else {
        return [
          ...CH2_L2_HARD_WRITTEN_P1,
          ...CH2_L2_HARD_MCQ_P1,
          ...CH2_L2_HARD_WRITTEN_P2,
          ...CH2_L2_HARD_MCQ_P2,
        ];
      }
    }
  }, [selectedLesson, selectedSection]);

  // Apply filters (Part, Type, Search)
  const filteredQuestions = useMemo(() => {
    return currentQuestions.filter(q => {
      if (selectedPart !== 'ALL' && q.part !== selectedPart) return false;
      if (selectedType !== 'ALL' && q.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const text = `${q.question_ar} ${q.explanation_ar || ''} ${q.ideal_answer_ar || ''}`.toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [currentQuestions, selectedPart, selectedType, searchQuery]);

  // Reset or constrain current index when filter changes
  useEffect(() => {
    if (currentIdx >= filteredQuestions.length) {
      setCurrentIdx(0);
    }
  }, [filteredQuestions.length, currentIdx]);

  const activeQuestion = filteredQuestions[currentIdx];

  // Stats calculation
  const totalInFilter = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter(q => {
    if (q.type === 'MCQ') return !!mcqAnswers[q.id];
    return !!(writtenAnswers[q.id] || '').trim();
  }).length;
  const progressPct = totalInFilter > 0 ? Math.round((answeredCount / totalInFilter) * 100) : 0;

  const handleSelectMcq = (qId: string, option: string) => {
    setMcqAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleWriteAnswer = (qId: string, text: string) => {
    setWrittenAnswers(prev => ({ ...prev, [qId]: text }));
  };

  const toggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleGradeSelf = (qId: string, grade: 'CORRECT' | 'REVIEW') => {
    setSelfGrades(prev => ({ ...prev, [qId]: grade }));
  };

  const handleClearProgress = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين كافة الإجابات لهذا الدرس والبدء من جديد؟')) {
      setMcqAnswers({});
      setWrittenAnswers({});
      setRevealedAnswers({});
      setSelfGrades({});
      setCurrentIdx(0);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">

        {/* ========================================================= */}
        {/* TOP HERO HEADER                                           */}
        {/* ========================================================= */}
        <div className="bg-gradient-to-r from-primary-navy via-primary-plum to-primary-navy rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-pink/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-pink text-xs font-black uppercase tracking-wider mb-3">
                <Shield size={14} className="text-accent-pink" />
                <span>{lang === 'ar' ? 'الوحدة الثانية: الأمن السيبراني' : 'Unit 2: Cybersecurity'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-2">
                {lang === 'ar' ? 'بنك الأسئلة والتدريبات التفاعلية' : 'Interactive Cybersecurity Question Bank'}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
                {lang === 'ar'
                  ? 'تدرب على أسئلة الوزارة الرسمية وتحديات نمط الامتحان مع تصحيح فوري لكل سؤال، ونماذج إجابة نموذجية مختصرة يسهل كتابتها، وشرح تفصيلي مدعم.'
                  : 'Practice official ministry assessments and hard exam challenges with real-time scoring, concise model answers, and deep explanations.'}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Home size={14} />
                <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
              </button>

              <button
                onClick={handleClearProgress}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-rose-500/30 border border-white/20 text-rose-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <RotateCcw size={14} />
                <span>{lang === 'ar' ? 'تصفير التقدم' : 'Reset'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LESSON SELECTOR TABS                                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => { setSelectedLesson('L1'); setCurrentIdx(0); }}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-right cursor-pointer ${selectedLesson === 'L1'
                ? 'border-primary-plum bg-white shadow-md ring-2 ring-primary-plum/20'
                : 'border-slate-200 bg-white/80 hover:bg-white text-slate-600'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${selectedLesson === 'L1' ? 'bg-primary-plum text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                <Lock size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-primary-plum uppercase tracking-wider">
                  {lang === 'ar' ? 'الدرس الأول' : 'Lesson 1'}
                </span>
                <h3 className="font-black text-sm sm:text-base text-primary-navy">
                  {lang === 'ar' ? 'تقنيات التشفير والمصادقة' : 'Encryption & Authentication'}
                </h3>
              </div>
            </div>
            {selectedLesson === 'L1' && <CheckCircle size={18} className="text-primary-plum" />}
          </button>

          <button
            onClick={() => { setSelectedLesson('L2'); setCurrentIdx(0); }}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-right cursor-pointer ${selectedLesson === 'L2'
                ? 'border-teal-600 bg-white shadow-md ring-2 ring-teal-500/20'
                : 'border-slate-200 bg-white/80 hover:bg-white text-slate-600'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${selectedLesson === 'L2' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                <Shield size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-teal-600 uppercase tracking-wider">
                  {lang === 'ar' ? 'الدرس الثاني' : 'Lesson 2'}
                </span>
                <h3 className="font-black text-sm sm:text-base text-primary-navy">
                  {lang === 'ar' ? 'تصميم أمان الشبكات' : 'Network Security Design'}
                </h3>
              </div>
            </div>
            {selectedLesson === 'L2' && <CheckCircle size={18} className="text-teal-600" />}
          </button>
        </div>

        {/* ========================================================= */}
        {/* SECTION SELECTOR: OFFICIAL vs HARD vs NOTES               */}
        {/* ========================================================= */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
          <button
            onClick={() => { setSelectedSection('OFFICIAL'); setCurrentIdx(0); }}
            className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${selectedSection === 'OFFICIAL'
                ? 'bg-primary-navy text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <Award size={16} />
            <span>{lang === 'ar' ? 'أسئلة الوزارة الرسمية' : 'Official Assessments'}</span>
          </button>

          <button
            onClick={() => { setSelectedSection('HARD'); setCurrentIdx(0); }}
            className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${selectedSection === 'HARD'
                ? 'bg-primary-plum text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <Sparkles size={16} />
            <span>{lang === 'ar' ? 'أسئلة التحديات ونمط الامتحان' : 'Exam-Style Challenges'}</span>
          </button>

          <button
            onClick={() => setSelectedSection('NOTES')}
            className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${selectedSection === 'NOTES'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <BookOpen size={16} />
            <span>{lang === 'ar' ? 'ملزمة الشرح الذكية (PDF)' : 'Study Booklet (PDF)'}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* VIEW A: STUDY NOTES & PDF BOOKLET TAB                     */}
        {/* ========================================================= */}
        {selectedSection === 'NOTES' && (
          selectedLesson === 'L1' ? (
            <Lesson1BookletPdf />
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <BookOpen size={40} className="text-teal-600 mx-auto opacity-40" />
              <h3 className="font-black text-lg text-primary-navy">
                {lang === 'ar' ? 'ملزمة شرح الدرس الثاني قيد الإعداد' : 'Lesson 2 Study Booklet in progress'}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {lang === 'ar'
                  ? 'يمكنك التبديل إلى "الدرس الأول" للاطلاع على الملزمة التفاعلية ونوتات الامتحانات الذكية.'
                  : 'Switch to "Lesson 1" to view the interactive booklet and exam capsules.'}
              </p>
            </div>
          )
        )}

        {/* ========================================================= */}
        {/* VIEW B: QUESTION PRACTICE MODE                            */}
        {/* ========================================================= */}
        {selectedSection !== 'NOTES' && (
          <div className="space-y-6">

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* Part Filter */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                  <button
                    onClick={() => { setSelectedPart('ALL'); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedPart === 'ALL' ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    كل الأجزاء
                  </button>
                  <button
                    onClick={() => { setSelectedPart(1); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedPart === 1 ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    الجزء 1
                  </button>
                  <button
                    onClick={() => { setSelectedPart(2); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedPart === 2 ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    الجزء 2
                  </button>
                </div>

                {/* Type Filter */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                  <button
                    onClick={() => { setSelectedType('ALL'); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedType === 'ALL' ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => { setSelectedType('MCQ'); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedType === 'MCQ' ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    MCQ
                  </button>
                  <button
                    onClick={() => { setSelectedType('WRITTEN'); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedType === 'WRITTEN' ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    مقالي
                  </button>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <Search size={15} className="absolute right-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentIdx(0); }}
                  placeholder="ابحث في الأسئلة والمفاهيم..."
                  className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary-plum"
                />
              </div>
            </div>

            {/* Questions Navigator Grid */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">
                <span>
                  السؤال {totalInFilter > 0 ? currentIdx + 1 : 0} من {totalInFilter}
                </span>
                <span>
                  {answeredCount} مجاب • {totalInFilter - answeredCount} متبقي ({progressPct}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-primary-plum to-teal-600 h-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>

              {/* Pills Grid */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-36 overflow-y-auto p-1">
                {filteredQuestions.map((q, idx) => {
                  const isAnswered = q.type === 'MCQ' ? !!mcqAnswers[q.id] : !!(writtenAnswers[q.id] || '').trim();
                  const isCurrent = idx === currentIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${isCurrent
                          ? 'bg-primary-navy text-white ring-2 ring-primary-plum shadow-md scale-105'
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

            {/* Active Question Card */}
            {activeQuestion ? (
              <motion.div
                key={activeQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy text-white text-xs font-black flex items-center justify-center">
                      {currentIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      الجزء {activeQuestion.part} • {activeQuestion.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeQuestion.marks && (
                      <span className="text-[11px] font-bold text-primary-plum bg-primary-plum/10 px-2.5 py-0.5 rounded-full border border-primary-plum/20">
                        [{activeQuestion.marks} درجات]
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {activeQuestion.type === 'MCQ' ? 'اختيار من متعدد' : 'سؤال مقالي'}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-lg sm:text-xl font-bold text-primary-navy leading-relaxed whitespace-pre-wrap">
                  {activeQuestion.question_ar}
                </h3>

                {/* ─── CASE 1: MCQ QUESTION ─── */}
                {activeQuestion.type === 'MCQ' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {(activeQuestion.options || []).map((opt, oIdx) => {
                        const isSelected = mcqAnswers[activeQuestion.id] === opt;
                        const isCorrectOption = opt === activeQuestion.answer;
                        const showCorrection = !!mcqAnswers[activeQuestion.id] || revealedAnswers[activeQuestion.id];

                        let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';
                        if (showCorrection) {
                          if (isCorrectOption) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm';
                          } else if (isSelected) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 shadow-sm';
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-primary-plum bg-primary-plum/5 text-primary-navy shadow-sm ring-1 ring-primary-plum/30';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectMcq(activeQuestion.id, opt)}
                            className={`w-full p-4 rounded-2xl border-2 text-right transition-all flex items-center gap-3.5 cursor-pointer ${btnStyle}`}
                          >
                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${showCorrection && isCorrectOption
                                ? 'bg-emerald-600 text-white'
                                : showCorrection && isSelected
                                  ? 'bg-rose-600 text-white'
                                  : isSelected
                                    ? 'bg-primary-plum text-white'
                                    : 'bg-slate-100 text-slate-500'
                              }`}>
                              {String.fromCharCode(1571 + oIdx)}
                            </span>
                            <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">
                              {opt}
                            </span>
                            {showCorrection && isCorrectOption && (
                              <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                            )}
                            {showCorrection && isSelected && !isCorrectOption && (
                              <XCircle size={18} className="text-rose-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Instant Correction Feedback Box */}
                    {mcqAnswers[activeQuestion.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed ${mcqAnswers[activeQuestion.id] === activeQuestion.answer
                            ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                            : 'bg-rose-50/90 border-rose-300 text-rose-950'
                          }`}
                      >
                        <div className="flex items-center gap-2 font-black mb-1.5 text-sm">
                          {mcqAnswers[activeQuestion.id] === activeQuestion.answer ? (
                            <>
                              <CheckCircle size={18} className="text-emerald-600" />
                              <span>إجابة صحيحة! أحسنت 🎯</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={18} className="text-rose-600" />
                              <span>
                                إجابة غير صحيحة — الإجابة الصحيحة هي: ({activeQuestion.answer})
                              </span>
                            </>
                          )}
                        </div>

                        {activeQuestion.explanation_ar && (
                          <div className="mt-2 pt-2 border-t border-slate-200/50 text-slate-800 text-xs sm:text-sm">
                            <span className="font-bold text-slate-900 block mb-0.5">💡 الشرح والتعليل:</span>
                            {activeQuestion.explanation_ar}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ─── CASE 2: WRITTEN QUESTION ─── */}
                {activeQuestion.type === 'WRITTEN' && (
                  <div className="space-y-4">
                    {/* Student Input Textarea */}
                    <div>
                      <textarea
                        rows={7}
                        value={writtenAnswers[activeQuestion.id] || ''}
                        onChange={e => handleWriteAnswer(activeQuestion.id, e.target.value)}
                        placeholder="اكتب إجابتك هنا بيدك ثم اضغط زر التحقق لمطابقتها مع النموذج الإرشادي..."
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 text-primary-navy text-sm sm:text-base font-medium focus:outline-none focus:border-primary-plum focus:ring-2 focus:ring-primary-plum/20 transition-all resize-y leading-relaxed"
                      />
                      <div className="flex justify-between items-center text-xs text-slate-400 mt-1.5 font-semibold">
                        <span>تُحفظ إجابتك تلقائياً لحظياً 💾</span>
                        <span>{(writtenAnswers[activeQuestion.id] || '').length} حرف</span>
                      </div>
                    </div>

                    {/* Reveal Button */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleReveal(activeQuestion.id)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary-plum/10 hover:bg-primary-plum/20 text-primary-plum border border-primary-plum/30 flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Lightbulb size={15} className="text-primary-plum" />
                        <span>
                          {revealedAnswers[activeQuestion.id]
                            ? 'إخفاء النموذج الإرشادي'
                            : '🔍 إظهار النموذج الإرشادي للتصحيح الفوري والشرح'}
                        </span>
                      </button>

                      {revealedAnswers[activeQuestion.id] && (
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-slate-400">تقييمك لإجابتك:</span>
                          <button
                            onClick={() => handleGradeSelf(activeQuestion.id, 'CORRECT')}
                            className={`px-3 py-1.5 rounded-lg border transition-all ${selfGrades[activeQuestion.id] === 'CORRECT'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                          >
                            أجبت بشكل صحيح ✅
                          </button>
                          <button
                            onClick={() => handleGradeSelf(activeQuestion.id, 'REVIEW')}
                            className={`px-3 py-1.5 rounded-lg border transition-all ${selfGrades[activeQuestion.id] === 'REVIEW'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                          >
                            يحتاج مراجعة ⚠️
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Model Answer & Explanation Box */}
                    {revealedAnswers[activeQuestion.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 pt-2"
                      >
                        {/* 1. Concise Model Answer (What student writes) */}
                        <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5">
                          <div className="flex items-center gap-2 text-emerald-900 font-black text-xs sm:text-sm uppercase tracking-wider mb-2">
                            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                            <span>النموذج الإرشادي الرسمي للإجابة (المختصر المركز للامتحان):</span>
                          </div>
                          <p className="text-emerald-950 text-xs sm:text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                            {activeQuestion.ideal_answer_ar}
                          </p>
                        </div>

                        {/* 2. Deep Explanation (Why this answer) */}
                        {activeQuestion.explanation_ar && (
                          <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-medium">
                            <span className="font-bold text-blue-900 block mb-1">
                              💡 الشرح والتعليل وعناصر التقييم:
                            </span>
                            <p className="leading-relaxed">
                              {activeQuestion.explanation_ar}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Question Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                    <span>السابق</span>
                  </button>

                  <span className="text-xs font-bold text-slate-400">
                    {currentIdx + 1} / {totalInFilter}
                  </span>

                  <button
                    onClick={() => setCurrentIdx(prev => Math.min(totalInFilter - 1, prev + 1))}
                    disabled={currentIdx >= totalInFilter - 1}
                    className="px-5 py-2 rounded-xl bg-primary-navy hover:bg-slate-800 text-white font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>التالي</span>
                    <ArrowLeft size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400">
                <FileText size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-bold text-sm">لا توجد أسئلة تطابق معايير الفلترة الحالية.</p>
                <button
                  onClick={() => { setSelectedPart('ALL'); setSelectedType('ALL'); setSearchQuery(''); }}
                  className="mt-3 px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-primary-navy hover:bg-slate-200"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
