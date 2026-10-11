import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Filter,
  Check,
  Eye,
  EyeOff,
  Search,
  Users
} from 'lucide-react';
import { AppContext } from './App';
import { QUIZ_QUESTIONS } from './courseData';
import type { QuizQuestion } from './courseData';
import {
  CH1_WORKSHOP_MCQ_IDS,
  CH1_WORKSHOP_WRITTEN_IDS,
} from './ch1ExamIds';

// Load all workshop & training questions
const WORKSHOP_QUESTIONS: QuizQuestion[] = QUIZ_QUESTIONS.filter(q =>
  CH1_WORKSHOP_MCQ_IDS.includes(q.id) || CH1_WORKSHOP_WRITTEN_IDS.includes(q.id)
);

export default function Chapter1Workshop() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // Filters
  const [selectedLesson, setSelectedLesson] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | 'MCQ' | 'WRITTEN'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive student state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  // Filtered questions
  const filteredQuestions = WORKSHOP_QUESTIONS.filter(q => {
    if (selectedLesson !== 'ALL' && q.lesson !== selectedLesson) return false;
    if (selectedType !== 'ALL' && q.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const qText = `${q.question_ar} ${q.question_en} ${q.explanation_ar || ''} ${q.ideal_answer_ar || ''}`.toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const toggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const toggleCompleted = (qId: string) => {
    setCompletedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const totalCount = WORKSHOP_QUESTIONS.length;
  const completedCount = Object.keys(completedQuestions).filter(k => completedQuestions[k]).length;

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-primary-navy via-primary-plum to-primary-navy rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-pink/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-pink text-xs font-black uppercase tracking-wider mb-3">
                <Users size={14} className="text-accent-pink" />
                {lang === 'ar' ? 'ورشة حل تفاعلية مشتركة' : 'Interactive Collaborative Workshop'}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-2">
                {lang === 'ar' ? 'ورشة تدريبات الشابتر الأول (جلسة حل مع المعلم)' : 'Chapter 1 Practice Workshop (Live Session)'}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
                {lang === 'ar'
                  ? 'هذه المساحة مخصصة للتدريب والتطبيق العملي ومناقشة الأفكار الصعبة مع المعلم (ليست امتحاناً). يمكنك تجربة الحلول وإظهار النماذج الإرشادية لكل سؤال مباشرة.'
                  : 'A dedicated practice lab for live collaborative problem-solving with the tutor. Toggle model answers instantly to verify solutions.'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[150px] shadow-lg">
              <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1">
                {lang === 'ar' ? 'التقدم في الورشة' : 'Workshop Progress'}
              </span>
              <div className="text-3xl font-black text-accent-mint">
                {completedCount} / {totalCount}
              </div>
              <span className="block text-[11px] font-bold text-slate-300 mt-1">
                {lang === 'ar' ? 'سؤال تمت مناقشته' : 'Discussed Questions'}
              </span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث في أسئلة ورشة العمل...' : 'Search workshop questions...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-10 pl-4 text-xs font-semibold focus:outline-none focus:border-primary-plum transition-all"
              />
            </div>

            {/* Type selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedType('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === 'ALL' ? 'bg-white text-primary-navy shadow-sm' : 'text-slate-500 hover:text-primary-navy'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setSelectedType('MCQ')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === 'MCQ' ? 'bg-white text-primary-navy shadow-sm' : 'text-slate-500 hover:text-primary-navy'
                }`}
              >
                {lang === 'ar' ? 'اختر (MCQ)' : 'MCQ'}
              </button>
              <button
                onClick={() => setSelectedType('WRITTEN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === 'WRITTEN' ? 'bg-white text-primary-navy shadow-sm' : 'text-slate-500 hover:text-primary-navy'
                }`}
              >
                {lang === 'ar' ? 'مقالي (Written)' : 'Written'}
              </button>
            </div>
          </div>

          {/* Lesson selector pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 ml-2">
              <Filter size={13} />
              {lang === 'ar' ? 'الدرس:' : 'Lesson:'}
            </span>
            {[
              { id: 'ALL', labelAr: 'جميع الدروس', labelEn: 'All Lessons' },
              { id: '1-1', labelAr: '1-1: تكنولوجيا المعلومات', labelEn: '1-1: IT Evolution' },
              { id: '1-2', labelAr: '1-2: كيف يعمل الذكاء', labelEn: '1-2: How AI Works' },
              { id: '1-3', labelAr: '1-3: تطبيقات الحياة والصناعة', labelEn: '1-3: AI Applications' },
              { id: '1-4', labelAr: '1-4: أخلاقيات الذكاء', labelEn: '1-4: AI Ethics' },
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setSelectedLesson(l.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLesson === l.id
                    ? 'bg-primary-plum text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'ar' ? l.labelAr : l.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
              <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-500">
                {lang === 'ar' ? 'لا توجد أسئلة تطابق هذه المرشحات.' : 'No questions matched your filter.'}
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isRevealed = !!revealedAnswers[q.id];
              const isDone = !!completedQuestions[q.id];
              const studentChoice = selectedOptions[q.id];

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-3xl border-2 p-6 sm:p-7 shadow-sm space-y-5 transition-all ${
                    isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Question top badge row */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy text-white text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-500">
                          الدرس {q.lesson} • {q.type === 'MCQ' ? 'اختيار من متعدد' : 'سؤال مقالي تحليلي'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCompleted(q.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={lang === 'ar' ? 'تحديد كـ "تمت مناقشته وحله مع المعلم"' : 'Mark as discussed with tutor'}
                      >
                        <Check size={14} />
                        <span>{isDone ? (lang === 'ar' ? 'تمت المناقشة والحل ✓' : 'Discussed ✓') : (lang === 'ar' ? 'تحديد كمحلول' : 'Mark Solved')}</span>
                      </button>

                      <button
                        onClick={() => toggleReveal(q.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isRevealed
                            ? 'bg-primary-navy text-white shadow-sm'
                            : 'bg-primary-plum/10 text-primary-plum hover:bg-primary-plum/20'
                        }`}
                      >
                        {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>{isRevealed ? (lang === 'ar' ? 'إخفاء النموذج' : 'Hide Answer') : (lang === 'ar' ? 'إظهار نموذج الحل' : 'Reveal Answer')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-bold text-primary-navy leading-relaxed">
                    {lang === 'ar' ? q.question_ar : q.question_en}
                  </h3>

                  {/* Content based on type */}
                  {q.type === 'MCQ' ? (
                    <div className="space-y-2.5">
                      {(['A', 'B', 'C', 'D'] as const).map(opt => {
                        const optText = lang === 'ar'
                          ? (q as any)[`option_${opt.toLowerCase()}_ar`]
                          : (q as any)[`option_${opt.toLowerCase()}_en`];
                        if (!optText) return null;

                        const isChosen = studentChoice === opt;
                        const isCorrectOption = opt === q.correct_option;

                        let styleCls = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700';

                        if (isRevealed) {
                          if (isCorrectOption) {
                            styleCls = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                          } else if (isChosen && !isCorrectOption) {
                            styleCls = 'border-rose-300 bg-rose-50 text-rose-950 line-through';
                          }
                        } else if (isChosen) {
                          styleCls = 'border-primary-plum bg-primary-plum/5 text-primary-navy font-bold';
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              setSelectedOptions(prev => ({
                                ...prev,
                                [q.id]: opt
                              }));
                            }}
                            className={`w-full p-3.5 rounded-2xl border-2 text-right transition-all flex items-center gap-3 cursor-pointer ${styleCls}`}
                          >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                              isRevealed && isCorrectOption
                                ? 'bg-emerald-600 text-white'
                                : isChosen
                                ? 'bg-primary-plum text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {opt}
                            </span>
                            <span className="text-sm font-semibold flex-1 leading-snug">{optText}</span>
                            {isRevealed && isCorrectOption && (
                              <span className="text-xs font-black text-emerald-700 flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-md">
                                <CheckCircle size={13} /> {lang === 'ar' ? 'الإجابة الصحيحة' : 'Correct'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Written discussion area */
                    <div className="space-y-3">
                      <textarea
                        rows={4}
                        value={studentNotes[q.id] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setStudentNotes(prev => ({ ...prev, [q.id]: val }));
                        }}
                        placeholder={
                          lang === 'ar'
                            ? 'مساحة كتابة الحل والتحليل المشترك مع المعلم أثناء الورشة...'
                            : 'Type collaborative solution notes and analysis here...'
                        }
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-xs sm:text-sm font-medium focus:outline-none focus:border-primary-plum transition-all resize-y"
                      />
                    </div>
                  )}

                  {/* Revealed Model Answer & Explanation Box */}
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-3 pt-3 border-t border-slate-100"
                      >
                        {/* If written, show ideal answer */}
                        {q.type === 'WRITTEN' && (
                          <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-2">
                            <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider">
                              <CheckCircle size={15} className="text-emerald-600" />
                              {lang === 'ar' ? 'النموذج الإرشادي الرسمي للإجابة:' : 'Official Model Answer:'}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-emerald-950 whitespace-pre-wrap leading-relaxed">
                              {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                            </p>
                          </div>
                        )}

                        {/* Explanation & Rubric */}
                        {(q.explanation_ar || q.explanation_en) && (
                          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-start gap-2.5">
                            <Lightbulb size={16} className="text-blue-700 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-0.5">
                                {lang === 'ar' ? 'الشرح والتعليل ومفتاح التقييم:' : 'Explanation & Key Concepts:'}
                              </span>
                              <p className="text-xs sm:text-sm font-medium text-blue-950 leading-relaxed">
                                {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Floating return button */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-primary-navy font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft size={15} />
            <span>{lang === 'ar' ? 'الرجوع للوحة التحكم الرئيسية' : 'Back to Dashboard'}</span>
          </button>

          <button
            onClick={() => navigate('/comprehensive-exam-ch1')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-plum to-primary-navy hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-md"
          >
            <span>{lang === 'ar' ? 'الذهاب للامتحان الشامل (50 سؤالاً) 📝' : 'Go to Comprehensive Exam (50 Qs) 📝'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
