import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from './App';
import {
  CHAPTER2_REVIEW_FLASHCARDS,
  type ReviewFlashcard,
} from './ch2_unit_review_data';

// ── Translation & Direction ──────────────────────────────────
const t = (en: string, ar: string, lang: string) => (lang === 'ar' ? ar : en);
const dir = (lang: string) => (lang === 'ar' ? 'rtl' : 'ltr');

// ── Color Themes per Lesson (No Icons) ───────────────────────
const LESSON_THEMES = {
  '2-1': {
    code: '2-1',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
    border: 'border-blue-200',
    activeTab: 'bg-blue-700 text-white shadow-md shadow-blue-700/20',
    cardBorder: 'border-blue-300 ring-1 ring-blue-200',
    accentText: 'text-blue-700',
    subtleBg: 'bg-blue-50/60',
    boxBorder: 'border-blue-100',
    tagBg: 'bg-blue-100/80 text-blue-800',
    name_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    name_en: 'Lesson 2-1: Cryptography & Authentication',
    short_ar: 'الدرس 1 (التشفير)',
    short_en: 'Lesson 1 (Crypto)',
  },
  '2-2': {
    code: '2-2',
    badge: 'bg-teal-100 text-teal-900 border-teal-300',
    border: 'border-teal-200',
    activeTab: 'bg-teal-700 text-white shadow-md shadow-teal-700/20',
    cardBorder: 'border-teal-300 ring-1 ring-teal-200',
    accentText: 'text-teal-700',
    subtleBg: 'bg-teal-50/60',
    boxBorder: 'border-teal-100',
    tagBg: 'bg-teal-100/80 text-teal-800',
    name_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    name_en: 'Lesson 2-2: Network Security Design',
    short_ar: 'الدرس 2 (الشبكات)',
    short_en: 'Lesson 2 (Networks)',
  },
  '2-3': {
    code: '2-3',
    badge: 'bg-violet-100 text-violet-900 border-violet-300',
    border: 'border-violet-200',
    activeTab: 'bg-violet-700 text-white shadow-md shadow-violet-700/20',
    cardBorder: 'border-violet-300 ring-1 ring-violet-200',
    accentText: 'text-violet-700',
    subtleBg: 'bg-violet-50/60',
    boxBorder: 'border-violet-100',
    tagBg: 'bg-violet-100/80 text-violet-800',
    name_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    name_en: 'Lesson 2-3: Incident Response & Risk Management',
    short_ar: 'الدرس 3 (الحوادث)',
    short_en: 'Lesson 3 (Incidents)',
  },
};

export default function Chapter2ReviewBooklet() {
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  // ── Mode: 'SLIDES' (One card at a time with Prev/Next) | 'LIST' (All cards)
  const [viewMode, setViewMode] = useState<'SLIDES' | 'LIST'>('SLIDES');

  // ── Active Slide Index (0 to total-1)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // ── Lesson Filter
  const [selectedLesson, setSelectedLesson] = useState<'ALL' | '2-1' | '2-2' | '2-3'>('ALL');

  // ── Self-check revealed answers
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // ── Mastery Tracking (LocalStorage)
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('DLEARN_CH2_FLASHCARDS_MASTERED_V2');
      if (saved) return JSON.parse(saved);
    } catch { }
    return {};
  });

  const toggleMastery = (cardId: string) => {
    setMasteredCards(prev => {
      const next = { ...prev, [cardId]: !prev[cardId] };
      try {
        localStorage.setItem('DLEARN_CH2_FLASHCARDS_MASTERED_V2', JSON.stringify(next));
      } catch { }
      return next;
    });
  };

  const toggleAnswer = (cardId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // ── Filtered list of cards
  const filteredCards: ReviewFlashcard[] = CHAPTER2_REVIEW_FLASHCARDS.filter(card => {
    if (selectedLesson !== 'ALL' && card.lesson !== selectedLesson) return false;
    return true;
  });

  const totalFiltered = filteredCards.length;

  // Keep index within bounds if filter changes
  useEffect(() => {
    if (currentIndex >= totalFiltered) {
      setCurrentIndex(0);
    }
  }, [selectedLesson, totalFiltered, currentIndex]);

  // Keyboard navigation for Slides mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'SLIDES') return;
      if (e.key === 'ArrowRight') {
        if (lang === 'ar') {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (lang === 'ar') {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, currentIndex, totalFiltered, lang]);

  const handleNext = () => {
    if (currentIndex < totalFiltered - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // ── Overall Stats
  const totalAllCards = CHAPTER2_REVIEW_FLASHCARDS.length;
  const totalMastered = CHAPTER2_REVIEW_FLASHCARDS.filter(c => masteredCards[c.id]).length;
  const masteryPercentage = Math.round((totalMastered / totalAllCards) * 100);

  const activeCard: ReviewFlashcard | undefined = filteredCards[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-24" dir={dir(lang)}>
      {/* ── TOP HEADER (Clean, Professional, No Icons) ────────── */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              {t('Back to Dashboard', 'العودة للرئيسية', lang)}
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20">
                {t('Chapter 2 Study Notes', 'نوتات مراجعة الفصل الثاني', lang)}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {totalAllCards} {t('Notes Cards', 'بطاقة نوتس', lang)}
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">
            {t('Unit 2 Flashcards & Visual Notes', 'بطاقات ونوتات مراجعة الوحدة الثانية', lang)}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed mb-5">
            {t(
              'Easy-to-read structured cards covering the core concepts of Lessons 2-1, 2-2, and 2-3 in bite-sized boxes and visual tables.',
              'نوتات وبطاقات مراجعة مقسمة في مربعات وأشكال سهلة ومريحة للعين، لمراجعة الدروس 2-1 و 2-2 و 2-3 خطوة بخطوة.',
              lang
            )}
          </p>

          {/* Mastery Progress Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300">
                {t('Overall Mastery Progress', 'مؤشر إتقان بطاقات الوحدة', lang)}
              </span>
              <span className="text-emerald-400 font-mono text-xs sm:text-sm">
                {totalMastered} / {totalAllCards} {t('Cards Mastered', 'بطاقة متقنة', lang)} ({masteryPercentage}%)
              </span>
            </div>
            <div className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOLBAR: LESSON FILTER & VIEW MODE ────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Lesson Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
            <button
              onClick={() => { setSelectedLesson('ALL'); setCurrentIndex(0); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                selectedLesson === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('All Lessons', 'كل الدروس', lang)} ({totalAllCards})
            </button>

            {(['2-1', '2-2', '2-3'] as const).map(lKey => {
              const theme = LESSON_THEMES[lKey];
              const isSelected = selectedLesson === lKey;
              const count = CHAPTER2_REVIEW_FLASHCARDS.filter(c => c.lesson === lKey).length;
              return (
                <button
                  key={lKey}
                  onClick={() => { setSelectedLesson(lKey); setCurrentIndex(0); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                    isSelected
                      ? theme.activeTab
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'ar' ? theme.short_ar : theme.short_en} ({count})
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setViewMode('SLIDES')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                viewMode === 'SLIDES'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('Slide by Slide', 'نظام السلايدز (بطاقة ببطاقة)', lang)}
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                viewMode === 'LIST'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('All on One Page', 'عرض الكل معاً', lang)}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* VIEW A: SLIDES MODE (ONE FOCUSED CARD AT A TIME)       */}
        {/* ══════════════════════════════════════════════════════ */}
        {viewMode === 'SLIDES' && activeCard && (
          <div className="space-y-6">
            {/* Top Navigation Strip */}
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-black transition-all border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t('Previous Card', 'البطاقة السابقة', lang)}
              </button>

              {/* Progress Count */}
              <div className="text-center">
                <span className="text-xs font-black text-slate-800 font-mono">
                  {t('Card', 'بطاقة', lang)} {currentIndex + 1} / {totalFiltered}
                </span>
                <span className="block text-[10px] font-bold text-slate-400 mt-0.5">
                  {activeCard.lessonName_ar}
                </span>
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === totalFiltered - 1}
                className="px-4 py-2 rounded-xl text-xs font-black transition-all bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                {t('Next Card', 'البطاقة التالية', lang)}
              </button>
            </div>

            {/* Quick Card Thumbnails Strip */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {filteredCards.map((card, idx) => {
                const isCurrent = idx === currentIndex;
                const isMastered = !!masteredCards[card.id];
                return (
                  <button
                    key={card.id}
                    onClick={() => setCurrentIndex(idx)}
                    title={card.title_ar}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all flex items-center justify-center flex-shrink-0 border ${
                      isCurrent
                        ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-400'
                        : isMastered
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* The Active Flashcard View */}
            <motion.div
              key={activeCard.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FlashcardCardView
                card={activeCard}
                lang={lang}
                isMastered={!!masteredCards[activeCard.id]}
                isAnswerRevealed={!!revealedAnswers[activeCard.id]}
                onToggleMastery={() => toggleMastery(activeCard.id)}
                onToggleAnswer={() => toggleAnswer(activeCard.id)}
              />
            </motion.div>

            {/* Bottom Nav Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-2xl text-xs font-black transition-all border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                {t('Previous Card', 'البطاقة السابقة', lang)}
              </button>

              <button
                onClick={() => toggleMastery(activeCard.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border ${
                  masteredCards[activeCard.id]
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {masteredCards[activeCard.id]
                  ? t('Mastered', 'تم إتقان هذه البطاقة', lang)
                  : t('Mark as Mastered', 'تحديد كبطاقة متقنة', lang)}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === totalFiltered - 1}
                className="px-6 py-3 rounded-2xl text-xs font-black transition-all bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
              >
                {t('Next Card', 'البطاقة التالية', lang)}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* VIEW B: ALL CARDS LIST (CONTINUOUS SCROLL)             */}
        {/* ══════════════════════════════════════════════════════ */}
        {viewMode === 'LIST' && (
          <div className="space-y-6">
            {filteredCards.map((card, idx) => (
              <FlashcardCardView
                key={card.id}
                card={card}
                lang={lang}
                indexNumber={idx + 1}
                isMastered={!!masteredCards[card.id]}
                isAnswerRevealed={!!revealedAnswers[card.id]}
                onToggleMastery={() => toggleMastery(card.id)}
                onToggleAnswer={() => toggleAnswer(card.id)}
              />
            ))}
          </div>
        )}

        {/* ── FOOTER CALL-TO-ACTION ────────────────────────────── */}
        <div className="mt-12 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-400 block mb-1">
                {t('Finished Reviewing?', 'هل أنهيت مراجعة البطاقات؟', lang)}
              </span>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                {t('Test Yourself with the Unit 2 Exam', 'اختبر مستواك في امتحان الوحدة الثانية', lang)}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl">
                {t(
                  '15 balanced questions across all 3 lessons (9 MCQ + 6 Essay) with a 30-minute timer and full model answers post-submit.',
                  '15 سؤالاً موزعة على الدروس الثلاثة (9 اختيار من متعدد + 6 مقالي) بوقت 30 دقيقة ونماذج إجابة كاملة بعد التسليم.',
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
                {t('Practice Question Bank', 'بنك الأسئلة والتدريبات', lang)}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STANDALONE FLASHCARD CARD COMPONENT (Clean Visual Boxes)
// ══════════════════════════════════════════════════════════════
function FlashcardCardView({
  card,
  lang,
  indexNumber,
  isMastered,
  isAnswerRevealed,
  onToggleMastery,
  onToggleAnswer,
}: {
  card: ReviewFlashcard;
  lang: string;
  indexNumber?: number;
  isMastered: boolean;
  isAnswerRevealed: boolean;
  onToggleMastery: () => void;
  onToggleAnswer: () => void;
}) {
  const theme = LESSON_THEMES[card.lesson];

  return (
    <div className={`bg-white rounded-3xl border ${theme.cardBorder} p-6 sm:p-8 shadow-sm transition-all`}>
      {/* ── CARD HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {/* Card Number Badge */}
          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center justify-center">
            {indexNumber ?? card.cardNumber}
          </span>

          {/* Lesson Code Pill */}
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black border uppercase tracking-wider ${theme.badge}`}>
            {theme.code}
          </span>

          {/* Category Tag */}
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {lang === 'ar' ? card.category_ar : card.category_en}
          </span>
        </div>

        {/* Mastered Status Button */}
        <button
          onClick={onToggleMastery}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
            isMastered
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          {isMastered
            ? t('Mastered', 'تم الإتقان', lang)
            : t('Mark as Mastered', 'تحديد كمتقن', lang)}
        </button>
      </div>

      {/* ── TITLE & SUMMARY ── */}
      <h2 className="text-lg sm:text-2xl font-black text-primary-navy mb-2 leading-tight">
        {lang === 'ar' ? card.title_ar : card.title_en}
      </h2>
      <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
        {lang === 'ar' ? card.summary_ar : card.summary_en}
      </p>

      {/* ── MINI-CARDS GRID (Visual Boxes for each idea) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
        {card.blocks.map((block, bIdx) => (
          <div
            key={bIdx}
            className={`p-4 rounded-2xl border ${theme.boxBorder} ${theme.subtleBg} flex flex-col justify-between`}
          >
            <div>
              {/* Box Tag Pill */}
              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black mb-2 ${theme.tagBg}`}>
                {lang === 'ar' ? block.tag_ar : block.tag_en}
              </span>

              {/* Box Title */}
              <h4 className="text-sm font-black text-primary-navy mb-1.5 leading-snug">
                {lang === 'ar' ? block.title_ar : block.title_en}
              </h4>

              {/* Box Text */}
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                {lang === 'ar' ? block.text_ar : block.text_en}
              </p>
            </div>

            {/* Optional Highlight note */}
            {(block.highlight_ar || block.highlight_en) && (
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] font-bold text-rose-700">
                {lang === 'ar' ? block.highlight_ar : block.highlight_en}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── COMPARISON TABLE (If present) ── */}
      {card.comparison && (
        <div className="mb-6 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 bg-slate-800 text-white text-xs font-black p-3 text-center">
            <span className="text-start ps-2">{t('Aspect', 'وجه المقارنة', lang)}</span>
            <span>{lang === 'ar' ? card.comparison.header1_ar : card.comparison.header1_en}</span>
            <span>{lang === 'ar' ? card.comparison.header2_ar : card.comparison.header2_en}</span>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {card.comparison.rows.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 p-3 text-xs font-medium text-slate-700 hover:bg-slate-50/50">
                <span className="font-bold text-primary-navy text-start ps-2">
                  {lang === 'ar' ? row.aspect_ar : row.aspect_en}
                </span>
                <span className="text-center px-2">
                  {lang === 'ar' ? row.col1_ar : row.col1_en}
                </span>
                <span className="text-center px-2">
                  {lang === 'ar' ? row.col2_ar : row.col2_en}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EXAM GOLDEN RULE BOX ── */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
        <span className="block text-[10px] font-black uppercase tracking-wider text-amber-800 mb-1">
          {t('Golden Exam Rule', 'القاعدة الذهبية في الامتحان', lang)}
        </span>
        <p className="text-xs sm:text-sm font-black text-primary-navy leading-relaxed">
          {lang === 'ar' ? card.goldenRule_ar : card.goldenRule_en}
        </p>
      </div>

      {/* ── INTERACTIVE QUICK-CHECK BOX ── */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
            {t('Quick Self-Check Question', 'سؤال تطبيق سريع (تأكد من فهمك)', lang)}
          </span>
          <button
            onClick={onToggleAnswer}
            className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-black transition-colors border border-indigo-200 cursor-pointer"
          >
            {isAnswerRevealed
              ? t('Hide Answer', 'إخفاء الإجابة', lang)
              : t('Show Model Answer', 'عرض الإجابة النموذجية', lang)}
          </button>
        </div>

        <p className="text-xs sm:text-sm font-bold text-primary-navy mb-2 leading-relaxed">
          {lang === 'ar' ? card.checkQuestion_ar : card.checkQuestion_en}
        </p>

        <AnimatePresence>
          {isAnswerRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed"
            >
              <span className="block font-black text-[11px] text-emerald-800 uppercase mb-1">
                {t('Model Answer', 'نموذج الإجابة المعتمد', lang)}
              </span>
              {lang === 'ar' ? card.checkAnswer_ar : card.checkAnswer_en}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
