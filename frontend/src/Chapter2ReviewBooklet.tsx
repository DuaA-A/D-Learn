import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from './App';
import {
  REVIEW_L1,
  REVIEW_L2,
  REVIEW_L3,
  REVIEW_QUICK_REF,
  type ReviewCard,
} from './ch2_unit_review_data';

// ── Translation & Direction ──────────────────────────────────
const t = (en: string, ar: string, lang: string) => (lang === 'ar' ? ar : en);
const dir = (lang: string) => (lang === 'ar' ? 'rtl' : 'ltr');

// ── Color Schemes (Pure CSS & Tailwind, No Icons) ────────────
const LESSON_THEMES = {
  '2-1': {
    code: '2-1',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
    border: 'border-blue-200 hover:border-blue-400',
    borderActive: 'border-blue-600 ring-2 ring-blue-100',
    headerBg: 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800',
    chipActive: 'bg-blue-700 text-white shadow-md shadow-blue-700/20',
    lightBg: 'bg-blue-50/50',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-200',
    name_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    name_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    short_ar: 'الدرس الأول: التشفير',
    short_en: 'Lesson 1: Cryptography',
  },
  '2-2': {
    code: '2-2',
    badge: 'bg-teal-100 text-teal-900 border-teal-300',
    border: 'border-teal-200 hover:border-teal-400',
    borderActive: 'border-teal-600 ring-2 ring-teal-100',
    headerBg: 'bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800',
    chipActive: 'bg-teal-700 text-white shadow-md shadow-teal-700/20',
    lightBg: 'bg-teal-50/50',
    accentText: 'text-teal-700',
    accentBorder: 'border-teal-200',
    name_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    name_en: 'Lesson 2-2: Network Security Design',
    short_ar: 'الدرس الثاني: الشبكات',
    short_en: 'Lesson 2: Networks',
  },
  '2-3': {
    code: '2-3',
    badge: 'bg-violet-100 text-violet-900 border-violet-300',
    border: 'border-violet-200 hover:border-violet-400',
    borderActive: 'border-violet-600 ring-2 ring-violet-100',
    headerBg: 'bg-gradient-to-r from-violet-700 via-purple-700 to-violet-800',
    chipActive: 'bg-violet-700 text-white shadow-md shadow-violet-700/20',
    lightBg: 'bg-violet-50/50',
    accentText: 'text-violet-700',
    accentBorder: 'border-violet-200',
    name_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    name_en: 'Lesson 2-3: Incident Response & Risk Management',
    short_ar: 'الدرس الثالث: المخاطر والحوادث',
    short_en: 'Lesson 3: Incident Response',
  },
};

const TYPE_BADGES: Record<ReviewCard['type'], { ar: string; en: string; style: string }> = {
  CONCEPT: {
    ar: 'مفهوم أساسي',
    en: 'Core Concept',
    style: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  TABLE: {
    ar: 'مقارنة معتمدة',
    en: 'Comparison Table',
    style: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
  TIP: {
    ar: 'نصيحة ذهبية',
    en: 'Golden Tip',
    style: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  WARNING: {
    ar: 'أخطاء شائعة',
    en: 'Common Traps',
    style: 'bg-rose-100 text-rose-900 border-rose-300',
  },
  ANALOGY: {
    ar: 'تشبيه مبسط',
    en: 'Analogy',
    style: 'bg-cyan-100 text-cyan-900 border-cyan-300',
  },
  EXAM_HINT: {
    ar: 'سر امتحاني',
    en: 'Exam Strategy',
    style: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  QUICK_REF: {
    ar: 'كبسولة سريعة',
    en: 'Quick Capsule',
    style: 'bg-orange-100 text-orange-900 border-orange-300',
  },
};

type LessonFilter = 'ALL' | '2-1' | '2-2' | '2-3' | 'CAPSULE';
type MasteryFilter = 'ALL' | 'MASTERED' | 'UNMASTERED';

export default function Chapter2ReviewBooklet() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // ── Filters & Search ───────────────────────────────────────
  const [selectedLesson, setSelectedLesson] = useState<LessonFilter>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [masteryFilter, setMasteryFilter] = useState<MasteryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ── Expanded States ────────────────────────────────────────
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // ── Mastery Tracking (LocalStorage) ────────────────────────
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('DLEARN_CH2_MASTERED_CARDS_V1');
      if (saved) return JSON.parse(saved);
    } catch { }
    return {};
  });

  const toggleMastery = (cardId: string) => {
    setMasteredCards(prev => {
      const next = { ...prev, [cardId]: !prev[cardId] };
      try {
        localStorage.setItem('DLEARN_CH2_MASTERED_CARDS_V1', JSON.stringify(next));
      } catch { }
      return next;
    });
  };

  const toggleExpand = (cardId: string) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const toggleQuickAnswer = (cardId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // ── Aggregate Data ─────────────────────────────────────────
  const allCoreCards: ReviewCard[] = [...REVIEW_L1, ...REVIEW_L2, ...REVIEW_L3];
  const allCardsList = selectedLesson === 'CAPSULE' ? REVIEW_QUICK_REF : allCoreCards;

  // ── Filtering Logic ────────────────────────────────────────
  const filteredCards = allCardsList.filter(card => {
    if (selectedLesson !== 'ALL' && selectedLesson !== 'CAPSULE' && card.lesson !== selectedLesson) {
      return false;
    }
    if (selectedType !== 'ALL' && card.type !== selectedType) {
      return false;
    }
    const isMastered = !!masteredCards[card.id];
    if (masteryFilter === 'MASTERED' && !isMastered) return false;
    if (masteryFilter === 'UNMASTERED' && isMastered) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const haystack = `${card.title_ar} ${card.title_en} ${card.summary_ar} ${card.summary_en} ${card.content_ar} ${card.content_en} ${card.keyTakeaway_ar} ${card.quickQuestion_ar}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // ── Stats ──────────────────────────────────────────────────
  const totalCore = allCoreCards.length;
  const masteredCount = allCoreCards.filter(c => masteredCards[c.id]).length;
  const progressPct = Math.round((masteredCount / totalCore) * 100);

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    filteredCards.forEach(c => {
      next[c.id] = true;
    });
    setExpandedCards(next);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-24" dir={dir(lang)}>
      {/* ── TOP HERO HEADER (No Icons) ────────────────────────── */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              {t('Back to Dashboard', 'العودة للرئيسية', lang)}
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20">
                {t('Chapter 2 Review', 'مراجعة الفصل الثاني', lang)}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {t('All 3 Lessons', 'الدروس الثلاثة كاملة', lang)}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black mb-3 tracking-tight">
            {t('Unit 2 Comprehensive Review Booklet', 'ملزمة المراجعة الشاملة للوحدة الثانية', lang)}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
            {t(
              'Interactive study guide covering all essential concepts, comparison tables, exam strategies, and common pitfalls for Lessons 2-1, 2-2, and 2-3.',
              'دليل مراجعة تفاعلي يجمع المفاهيم الأساسية، وجداول المقارنات، وأسرار الامتحانات، وتصحيح الأخطاء الشائعة للدروس 2-1 و 2-2 و 2-3.',
              lang
            )}
          </p>

          {/* Progress Tracker Card */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="flex flex-wrap items-center justify-between text-xs font-bold mb-2 gap-2">
              <span className="text-slate-300">
                {t('Unit Mastery Progress', 'مؤشر إتقان محاور الوحدة', lang)}
              </span>
              <span className="text-emerald-400 font-mono text-sm">
                {masteredCount} / {totalCore} {t('Topics Mastered', 'محور تم إتقانه', lang)} ({progressPct}%)
              </span>
            </div>
            <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ───────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">

        {/* ── LESSON SWITCHER TABS (Clean & Colorful, No Icons) ─ */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => { setSelectedLesson('ALL'); }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border ${
              selectedLesson === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {t('All Unit Topics', 'كل محاور الوحدة', lang)} ({totalCore})
          </button>

          {(['2-1', '2-2', '2-3'] as const).map(lessonKey => {
            const theme = LESSON_THEMES[lessonKey];
            const isSelected = selectedLesson === lessonKey;
            const count = allCoreCards.filter(c => c.lesson === lessonKey).length;

            return (
              <button
                key={lessonKey}
                onClick={() => setSelectedLesson(lessonKey)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border ${
                  isSelected
                    ? theme.chipActive
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {lang === 'ar' ? theme.short_ar : theme.short_en} ({count})
              </button>
            );
          })}

          <button
            onClick={() => setSelectedLesson('CAPSULE')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border ${
              selectedLesson === 'CAPSULE'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20'
                : 'bg-white text-amber-900 border-amber-200 hover:border-amber-300'
            }`}
          >
            {t('Exam Night Capsules', 'كبسولات ليلة الامتحان', lang)} (3)
          </button>
        </div>

        {/* ── CONTROLS BAR: SEARCH & FILTERS ───────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('Search concepts, tables, exam rules...', 'ابحث في المفاهيم، الجداول، القواعد...', lang)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm font-medium text-primary-navy outline-none focus:border-teal-600 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Type Filter */}
            {selectedLesson !== 'CAPSULE' && (
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 outline-none focus:border-teal-600 focus:bg-white transition-all cursor-pointer"
              >
                <option value="ALL">{t('All Content Types', 'جميع أنواع المحتوى', lang)}</option>
                <option value="CONCEPT">{t('Core Concepts', 'مفاهيم أساسية', lang)}</option>
                <option value="TABLE">{t('Comparison Tables', 'جداول مقارنة معتمدة', lang)}</option>
                <option value="EXAM_HINT">{t('Exam Strategies', 'أسرار واستراتيجيات الامتحان', lang)}</option>
                <option value="WARNING">{t('Common Pitfalls', 'أخطاء وأفخاخ شائعة', lang)}</option>
              </select>
            )}

            {/* Mastery Filter */}
            {selectedLesson !== 'CAPSULE' && (
              <select
                value={masteryFilter}
                onChange={e => setMasteryFilter(e.target.value as MasteryFilter)}
                className="h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 outline-none focus:border-teal-600 focus:bg-white transition-all cursor-pointer"
              >
                <option value="ALL">{t('Mastery Status: All', 'حالة الإتقان: الكل', lang)}</option>
                <option value="UNMASTERED">{t('Needs Review', 'بحاجة لمراجعة', lang)}</option>
                <option value="MASTERED">{t('Mastered', 'تم إتقانها', lang)}</option>
              </select>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-slate-500 gap-2">
            <span>
              {t('Showing', 'المعروض', lang)} {filteredCards.length} {t('topics', 'محور', lang)}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
              >
                {t('Expand All', 'فتح جميع المحاور', lang)}
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
              >
                {t('Collapse All', 'طي الكل', lang)}
              </button>
            </div>
          </div>
        </div>

        {/* ── CARDS LIST ───────────────────────────────────────── */}
        {filteredCards.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-16 h-1 rounded-full bg-slate-200 mx-auto mb-4" />
            <h3 className="text-base font-black text-primary-navy mb-1">
              {t('No matching topics found', 'لم يتم العثور على محاور مطابقة للبحث', lang)}
            </h3>
            <p className="text-slate-400 text-xs font-medium mb-4">
              {t('Try adjusting your search terms or filters.', 'جرّب تعديل كلمات البحث أو تصفية العرض.', lang)}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedType('ALL'); setMasteryFilter('ALL'); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              {t('Reset Filters', 'إعادة ضبط التصفية', lang)}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCards.map((card, idx) => {
              const theme = LESSON_THEMES[card.lesson];
              const typeMeta = TYPE_BADGES[card.type];
              const isExpanded = !!expandedCards[card.id];
              const isMastered = !!masteredCards[card.id];
              const isAnswerRevealed = !!revealedAnswers[card.id];

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                  className={`bg-white rounded-3xl border transition-all duration-200 shadow-sm ${
                    isExpanded ? theme.borderActive : theme.border
                  }`}
                >
                  {/* Card Header Strip */}
                  <div
                    onClick={() => toggleExpand(card.id)}
                    className="p-5 sm:p-6 cursor-pointer select-none"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {/* Lesson Indicator Pill */}
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black border uppercase tracking-wider ${theme.badge}`}>
                          {theme.code}
                        </span>

                        {/* Content Type Pill */}
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${typeMeta.style}`}>
                          {lang === 'ar' ? typeMeta.ar : typeMeta.en}
                        </span>
                      </div>

                      {/* Mastery Check Button */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleMastery(card.id);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-black transition-all border ${
                          isMastered
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        {isMastered
                          ? t('Mastered', 'تم الإتقان', lang)
                          : t('Mark as Mastered', 'تحديد كمتقن', lang)}
                      </button>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-black text-primary-navy leading-snug mb-2">
                      {lang === 'ar' ? card.title_ar : card.title_en}
                    </h3>

                    {/* Summary One-Liner */}
                    <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                      {lang === 'ar' ? card.summary_ar : card.summary_en}
                    </p>

                    {/* Expand/Collapse Toggle Hint */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400">
                      <span className={theme.accentText}>
                        {isExpanded
                          ? t('Click to collapse details', 'اضغط لطي التفاصيل', lang)
                          : t('Click to read full explanation & check', 'اضغط لعرض الشرح الكامل وسؤال الفهم', lang)}
                      </span>
                      <span>
                        {isExpanded ? t('Collapse', 'طي', lang) : t('Read More', 'عرض الشرح', lang)}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-5 sm:p-6 bg-slate-50/50 space-y-5">
                          {/* Full Content */}
                          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200">
                            <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                              {t('Detailed Explanation', 'الشرح المفصل والمعتمد', lang)}
                            </span>
                            <pre className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                              {lang === 'ar' ? card.content_ar : card.content_en}
                            </pre>
                          </div>

                          {/* Key Takeaway Rule */}
                          <div className={`p-4 rounded-2xl border ${theme.lightBg} ${theme.accentBorder}`}>
                            <span className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                              {t('Exam Core Rule', 'القاعدة الذهبية في الامتحان', lang)}
                            </span>
                            <p className="text-xs sm:text-sm font-black text-primary-navy leading-relaxed">
                              {lang === 'ar' ? card.keyTakeaway_ar : card.keyTakeaway_en}
                            </p>
                          </div>

                          {/* Quick Interactive Self-Check (تأكد من فهمك لحظياً) */}
                          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                                {t('Instant Quick Check', 'سؤال تطبيقي سريع (تأكد من فهمك)', lang)}
                              </span>
                              <button
                                onClick={() => toggleQuickAnswer(card.id)}
                                className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-black transition-colors border border-indigo-200"
                              >
                                {isAnswerRevealed
                                  ? t('Hide Answer', 'إخفاء الإجابة', lang)
                                  : t('Show Model Answer', 'عرض الإجابة والتحقق', lang)}
                              </button>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-primary-navy mb-3">
                              {lang === 'ar' ? card.quickQuestion_ar : card.quickQuestion_en}
                            </p>

                            <AnimatePresence>
                              {isAnswerRevealed && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-medium text-emerald-900 leading-relaxed"
                                >
                                  {lang === 'ar' ? card.quickAnswer_ar : card.quickAnswer_en}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── BOTTOM CALL-TO-ACTION (No Icons) ────────────────── */}
        <div className="mt-10 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-400 block mb-1">
                {t('Ready to Evaluate Your Progress?', 'هل أتممت مراجعة المحاور؟', lang)}
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                {t('Take the Official Unit 2 Assessment Exam', 'انتقل للامتحان التقييمي الشامل للوحدة 2', lang)}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl">
                {t(
                  '15 balanced questions across all 3 lessons (9 MCQ + 6 Essay) timed at 30 minutes with instant model answer review.',
                  '15 سؤالاً موزعة بالتساوي على الدروس الثلاثة (9 اختيار من متعدد + 6 مقالي) بوقت 30 دقيقة ونماذج إجابة معتمدة.',
                  lang
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/chapter2-unit-exam')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                {t('Start Unit 2 Exam', 'بدء امتحان الوحدة 2', lang)}
              </button>

              <button
                onClick={() => navigate('/chapter2-practice')}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700 cursor-pointer"
              >
                {t('Practice Question Bank', 'بنك التدريبات والتطبيقات', lang)}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
