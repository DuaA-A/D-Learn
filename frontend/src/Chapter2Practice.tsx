import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

// Lesson 2 Questions
import { CH2_L2_OFFICIAL_WRITTEN_P1, CH2_L2_OFFICIAL_MCQ_P1 } from './ch2_lesson2_officialQ_part1';
import { CH2_L2_OFFICIAL_WRITTEN_P2, CH2_L2_OFFICIAL_MCQ_P2 } from './ch2_lesson2_officialQ_part2';
import { CH2_L2_HARD_WRITTEN_P1, CH2_L2_HARD_MCQ_P1 } from './ch2_lesson2_hardQ_part1';
import { CH2_L2_HARD_WRITTEN_P2, CH2_L2_HARD_MCQ_P2 } from './ch2_lesson2_hardQ_part2';
import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';
// Mixed L1+L2 Assessment
import { CH2_MIXED_ASSESSMENT } from './ch2_mixed_assessment';

const STORAGE_KEY = 'DLEARN_CH2_PRACTICE_V1';

export default function Chapter2Practice() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  // Primary Lesson Switcher: 'L1' (تقنيات التشفير والمصادقة) or 'L2' (تصميم أمان الشبكات)
  const [selectedLesson, setSelectedLesson] = useState<'L1' | 'L2'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).selectedLesson || 'L1';
    } catch (e) { }
    return 'L1';
  });

  // Check URL query params for ?lesson=L1 or ?lesson=L2
  useEffect(() => {
    const qLesson = searchParams.get('lesson');
    if (qLesson === 'L1' || qLesson === 'L2') {
      setSelectedLesson(qLesson);
      setCurrentIdx(0);
    }
    // Also handle 'section' param for OFFICIAL, HARD, or MIXED
    const qSection = searchParams.get('section');
    if (qSection === 'OFFICIAL' || qSection === 'HARD' || qSection === 'MIXED') {
      setSelectedSection(qSection);
      setCurrentIdx(0);
    }
  }, [searchParams]);

  // Section: 'OFFICIAL' (وزارة) | 'HARD' (تحديات ونمط الامتحان) | 'MIXED' (تقييم شامل)
  const [selectedSection, setSelectedSection] = useState<'OFFICIAL' | 'HARD' | 'MIXED'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const sec = JSON.parse(saved).selectedSection;
        if (sec === 'OFFICIAL' || sec === 'HARD' || sec === 'MIXED') return sec;
      }
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
    // Mixed Assessment spans both lessons
    if (selectedSection === 'MIXED') {
      return CH2_MIXED_ASSESSMENT;
    }
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
        const text = `${q.question_ar} ${q.question_en || ''} ${q.explanation_ar || ''} ${q.explanation_en || ''} ${q.ideal_answer_ar || ''} ${q.ideal_answer_en || ''}`.toLowerCase();
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
    if (window.confirm(lang === 'ar'
      ? 'هل أنت متأكد من رغبتك في إعادة تعيين كافة الإجابات لهذا الدرس والبدء من جديد؟'
      : 'Are you sure you want to reset all your answers for this section and start over?')) {
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
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${lang === 'ar' ? 'text-right' : 'text-left'} cursor-pointer ${selectedLesson === 'L1'
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
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${lang === 'ar' ? 'text-right' : 'text-left'} cursor-pointer ${selectedLesson === 'L2'
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
        {/* SECTION SELECTOR: OFFICIAL vs HARD                        */}
        {/* ========================================================= */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 flex-wrap">
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
              onClick={() => { setSelectedSection('MIXED'); setCurrentIdx(0); }}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${selectedSection === 'MIXED'
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <FileText size={16} />
              <span>{lang === 'ar' ? 'تقييم شامل: الدرسان معاً' : 'Mixed Assessment: L1 + L2'}</span>
            </button>
          </div>

          <button
            onClick={() => navigate(`/lesson/${selectedLesson === 'L1' ? '2-1' : '2-2'}`)}
            className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <BookOpen size={16} className="text-teal-700" />
            <span>{lang === 'ar' ? 'ملزمة الشرح والخرائط' : 'Study Booklet & Maps'}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* QUESTION PRACTICE MODE                                    */}
        {/* ========================================================= */}
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
                    {lang === 'ar' ? 'كل الأجزاء' : 'All Parts'}
                  </button>
                  <button
                    onClick={() => { setSelectedPart(1); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedPart === 1 ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    {lang === 'ar' ? 'الجزء 1' : 'Part 1'}
                  </button>
                  <button
                    onClick={() => { setSelectedPart(2); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedPart === 2 ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    {lang === 'ar' ? 'الجزء 2' : 'Part 2'}
                  </button>
                </div>

                {/* Type Filter */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                  <button
                    onClick={() => { setSelectedType('ALL'); setCurrentIdx(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedType === 'ALL' ? 'bg-white text-primary-navy shadow-sm' : ''}`}
                  >
                    {lang === 'ar' ? 'الكل' : 'All'}
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
                    {lang === 'ar' ? 'مقالي' : 'Written'}
                  </button>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <Search size={15} className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 text-slate-400`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentIdx(0); }}
                  placeholder={lang === 'ar' ? 'ابحث في الأسئلة والمفاهيم...' : 'Search questions and concepts...'}
                  className={`w-full ${lang === 'ar' ? 'pl-3 pr-9' : 'pr-3 pl-9'} py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary-plum`}
                />
              </div>
            </div>

            {/* Questions Navigator Grid */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2.5">


                <span>
                  {lang === 'ar'
                    ? `السؤال ${totalInFilter > 0 ? currentIdx + 1 : 0} من ${totalInFilter}`
                    : `Question ${totalInFilter > 0 ? currentIdx + 1 : 0} of ${totalInFilter}`}
                </span>
                <span>
                  {lang === 'ar'
                    ? `${answeredCount} مجاب • ${totalInFilter - answeredCount} متبقي (${progressPct}%)`
                    : `${answeredCount} Answered • ${totalInFilter - answeredCount} Remaining (${progressPct}%)`}
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
                      {lang === 'ar'
                        ? `الجزء ${activeQuestion.part} • ${activeQuestion.difficulty}`
                        : `Part ${activeQuestion.part} • ${activeQuestion.difficulty}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeQuestion.marks && (
                      <span className="text-[11px] font-bold text-primary-plum bg-primary-plum/10 px-2.5 py-0.5 rounded-full border border-primary-plum/20">
                        {lang === 'ar' ? `[${activeQuestion.marks} درجات]` : `[${activeQuestion.marks} Marks]`}
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {activeQuestion.type === 'MCQ'
                        ? (lang === 'ar' ? 'اختيار من متعدد' : 'Multiple Choice')
                        : (lang === 'ar' ? 'سؤال مقالي' : 'Written Essay')}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-lg sm:text-xl font-bold text-primary-navy leading-relaxed whitespace-pre-wrap">
                  {lang === 'en' && (activeQuestion as any).question_en
                    ? (activeQuestion as any).question_en
                    : activeQuestion.question_ar}
                </h3>

                {/* ─── CASE 1: MCQ QUESTION ─── */}
                {activeQuestion.type === 'MCQ' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {(() => {
                        const rawOptions = (lang === 'en' && activeQuestion.options_en && activeQuestion.options_en.length > 0)
                          ? activeQuestion.options_en
                          : (activeQuestion.options || []);

                        const isEn = lang === 'en';
                        const correctAnswer = (isEn && activeQuestion.answer_en)
                          ? activeQuestion.answer_en
                          : activeQuestion.answer;

                        return rawOptions.map((opt, oIdx) => {
                          let displayOpt = opt;
                          if (isEn && !activeQuestion.options_en && opt.includes(' / ')) {
                            displayOpt = opt.split(' / ')[1] || opt;
                          } else if (isEn && !activeQuestion.options_en && opt.includes(' | ')) {
                            displayOpt = opt.split(' | ')[1] || opt;
                          }

                          const arOriginalOpt = activeQuestion.options?.[oIdx] || opt;
                          const isSelected = mcqAnswers[activeQuestion.id] === opt || mcqAnswers[activeQuestion.id] === arOriginalOpt;
                          const isCorrectOption = opt === correctAnswer || arOriginalOpt === activeQuestion.answer;
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
                              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 cursor-pointer ${lang === 'ar' ? 'text-right' : 'text-left'} ${btnStyle}`}
                            >
                              <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors flex-shrink-0 ${showCorrection && isCorrectOption
                                  ? 'bg-emerald-600 text-white'
                                  : showCorrection && isSelected
                                    ? 'bg-rose-600 text-white'
                                    : isSelected
                                      ? 'bg-primary-plum text-white'
                                      : 'bg-slate-100 text-slate-500'
                                }`}>
                                {lang === 'ar' ? String.fromCharCode(1571 + oIdx) : ['A', 'B', 'C', 'D'][oIdx]}
                              </span>
                              <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">
                                {displayOpt}
                              </span>
                              {showCorrection && isCorrectOption && (
                                <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                              )}
                              {showCorrection && isSelected && !isCorrectOption && (
                                <XCircle size={18} className="text-rose-600 flex-shrink-0" />
                              )}
                            </button>
                          );
                        });
                      })()}
                    </div>

                    {/* Instant Correction Feedback Box */}
                    {(!!mcqAnswers[activeQuestion.id] || revealedAnswers[activeQuestion.id]) && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed ${
                          (mcqAnswers[activeQuestion.id] === activeQuestion.answer ||
                           (activeQuestion.answer_en && mcqAnswers[activeQuestion.id] === activeQuestion.answer_en))
                            ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                            : 'bg-rose-50/90 border-rose-300 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-black mb-1.5 text-sm">
                          {(mcqAnswers[activeQuestion.id] === activeQuestion.answer ||
                            (activeQuestion.answer_en && mcqAnswers[activeQuestion.id] === activeQuestion.answer_en)) ? (
                            <>
                              <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                              <span>{lang === 'ar' ? 'إجابة صحيحة! أحسنت' : 'Correct answer! Excellent'}</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={18} className="text-rose-600 flex-shrink-0" />
                              <span>
                                {lang === 'ar'
                                  ? `إجابة غير صحيحة — الإجابة الصحيحة هي: (${activeQuestion.answer})`
                                  : `Incorrect answer — The correct answer is: (${activeQuestion.answer_en || activeQuestion.answer})`}
                              </span>
                            </>
                          )}
                        </div>

                        {(activeQuestion.explanation_ar || activeQuestion.explanation_en) && (
                          <div className="mt-2 pt-2 border-t border-slate-200/50 text-slate-800 text-xs sm:text-sm">
                            <span className="font-bold text-slate-900 block mb-0.5">
                              {lang === 'ar' ? 'الشرح والتعليل:' : 'Explanation & Reasoning:'}
                            </span>
                            {lang === 'en' && activeQuestion.explanation_en
                              ? activeQuestion.explanation_en
                              : activeQuestion.explanation_ar}
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
                        placeholder={lang === 'ar'
                          ? '...اكتب إجابتك هنا بيدك ثم اضغط زر التحقق لمطابقتها مع النموذج الإرشادي'
                          : 'Write your answer here in your own words, then reveal the official model answer to evaluate...'}
                        className={`w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 text-primary-navy text-sm sm:text-base font-medium focus:outline-none focus:border-primary-plum focus:ring-2 focus:ring-primary-plum/20 transition-all resize-y leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                      />
                      <div className="flex justify-between items-center text-xs text-slate-400 mt-1.5 font-semibold">
                        <span>{lang === 'ar' ? 'تُحفظ إجابتك تلقائياً لحظياً' : 'Your answer is saved automatically in real-time'}</span>
                        <span>{lang === 'ar' ? `${(writtenAnswers[activeQuestion.id] || '').length} حرف` : `${(writtenAnswers[activeQuestion.id] || '').length} characters`}</span>
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
                            ? (lang === 'ar' ? 'إخفاء النموذج الإرشادي' : 'Hide Model Answer')
                            : (lang === 'ar' ? 'إظهار النموذج الإرشادي للتصحيح الفوري والشرح' : 'Reveal Model Answer & Detailed Explanation')}
                        </span>
                      </button>

                      {revealedAnswers[activeQuestion.id] && (
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-slate-400">
                            {lang === 'ar' ? 'تقييمك لإجابتك:' : 'Self-Assessment:'}
                          </span>
                          <button
                            onClick={() => handleGradeSelf(activeQuestion.id, 'CORRECT')}
                            className={`px-3 py-1.5 rounded-lg border transition-all ${selfGrades[activeQuestion.id] === 'CORRECT'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                          >
                            {lang === 'ar' ? 'أجبت بشكل صحيح' : 'Answered Correctly'}
                          </button>
                          <button
                            onClick={() => handleGradeSelf(activeQuestion.id, 'REVIEW')}
                            className={`px-3 py-1.5 rounded-lg border transition-all ${selfGrades[activeQuestion.id] === 'REVIEW'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                          >
                            {lang === 'ar' ? 'يحتاج مراجعة' : 'Needs Review'}
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
                            <span>
                              {lang === 'ar'
                                ? 'النموذج الإرشادي الرسمي للإجابة (المختصر المركز للامتحان):'
                                : 'Official Model Answer (Exam-Focused Summary):'}
                            </span>
                          </div>
                          <p className="text-emerald-950 text-xs sm:text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                            {lang === 'en' && activeQuestion.ideal_answer_en
                              ? activeQuestion.ideal_answer_en
                              : activeQuestion.ideal_answer_ar}
                          </p>
                        </div>

                        {/* 2. Deep Explanation (Why this answer) */}
                        {(activeQuestion.explanation_ar || activeQuestion.explanation_en) && (
                          <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-medium">
                            <span className="font-bold text-blue-900 block mb-1">
                              {lang === 'ar' ? 'الشرح والتعليل وعناصر التقييم:' : 'Detailed Explanation & Key Grading Points:'}
                            </span>
                            <p className="leading-relaxed">
                              {lang === 'en' && activeQuestion.explanation_en
                                ? activeQuestion.explanation_en
                                : activeQuestion.explanation_ar}
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
                    <span>{lang === 'ar' ? 'السابق' : 'Previous'}</span>
                  </button>

                  <span className="text-xs font-bold text-slate-400">
                    {currentIdx + 1} / {totalInFilter}
                  </span>

                  <button
                    onClick={() => setCurrentIdx(prev => Math.min(totalInFilter - 1, prev + 1))}
                    disabled={currentIdx >= totalInFilter - 1}
                    className="px-5 py-2 rounded-xl bg-primary-navy hover:bg-slate-800 text-white font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
                    <ArrowLeft size={14} className={lang === 'ar' ? '' : 'rotate-180'} />
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400">
                <FileText size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-bold text-sm">
                  {lang === 'ar' ? 'لا توجد أسئلة تطابق معايير الفلترة الحالية.' : 'No questions match the current filter criteria.'}
                </p>
                <button
                  onClick={() => { setSelectedPart('ALL'); setSelectedType('ALL'); setSearchQuery(''); }}
                  className="mt-3 px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-primary-navy hover:bg-slate-200"
                >
                  {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                </button>
              </div>
            )}

          </div>

      </div>
    </div>
  );
}
