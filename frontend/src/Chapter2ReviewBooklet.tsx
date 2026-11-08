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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
                const lessonBorder =
                  card.lesson === '2-1'
                    ? 'border-blue-300 bg-blue-50/60 text-blue-900 hover:bg-blue-100'
                    : card.lesson === '2-2'
                      ? 'border-teal-300 bg-teal-50/60 text-teal-900 hover:bg-teal-100'
                      : 'border-purple-300 bg-purple-50/60 text-purple-900 hover:bg-purple-100';

                return (
                  <button
                    key={card.id}
                    onClick={() => setCurrentIndex(idx)}
                    title={card.title_ar}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all flex items-center justify-center flex-shrink-0 border cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-400 shadow-sm scale-105'
                        : isMastered
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : lessonBorder
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
// COLOR PALETTES & DYNAMIC GRID FOR MINI-CARDS
// ══════════════════════════════════════════════════════════════
export type BlockColorVariant = 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan' | 'slate';

interface BlockThemeStyle {
  cardBg: string;
  cardBorder: string;
  topBorder: string;
  badgeBg: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  titleColor: string;
  highlightBg: string;
  highlightText: string;
  highlightBorder: string;
}

const BLOCK_COLOR_STYLES: Record<BlockColorVariant, BlockThemeStyle> = {
  blue: {
    cardBg: 'bg-gradient-to-b from-blue-50/90 to-white hover:from-blue-100/60',
    cardBorder: 'border-blue-200/90 hover:border-blue-300',
    topBorder: 'border-t-blue-600',
    badgeBg: 'bg-blue-600 text-white shadow-xs',
    tagBg: 'bg-blue-100 text-blue-900',
    tagText: 'text-blue-900',
    tagBorder: 'border-blue-200',
    titleColor: 'text-blue-950',
    highlightBg: 'bg-blue-100/70',
    highlightText: 'text-blue-950',
    highlightBorder: 'border-blue-200',
  },
  emerald: {
    cardBg: 'bg-gradient-to-b from-emerald-50/90 to-white hover:from-emerald-100/60',
    cardBorder: 'border-emerald-200/90 hover:border-emerald-300',
    topBorder: 'border-t-emerald-600',
    badgeBg: 'bg-emerald-600 text-white shadow-xs',
    tagBg: 'bg-emerald-100 text-emerald-900',
    tagText: 'text-emerald-900',
    tagBorder: 'border-emerald-200',
    titleColor: 'text-emerald-950',
    highlightBg: 'bg-emerald-100/70',
    highlightText: 'text-emerald-950',
    highlightBorder: 'border-emerald-200',
  },
  violet: {
    cardBg: 'bg-gradient-to-b from-purple-50/90 to-white hover:from-purple-100/60',
    cardBorder: 'border-purple-200/90 hover:border-purple-300',
    topBorder: 'border-t-purple-600',
    badgeBg: 'bg-purple-600 text-white shadow-xs',
    tagBg: 'bg-purple-100 text-purple-900',
    tagText: 'text-purple-900',
    tagBorder: 'border-purple-200',
    titleColor: 'text-purple-950',
    highlightBg: 'bg-purple-100/70',
    highlightText: 'text-purple-950',
    highlightBorder: 'border-purple-200',
  },
  amber: {
    cardBg: 'bg-gradient-to-b from-amber-50/90 to-white hover:from-amber-100/60',
    cardBorder: 'border-amber-200/90 hover:border-amber-300',
    topBorder: 'border-t-amber-500',
    badgeBg: 'bg-amber-500 text-white shadow-xs',
    tagBg: 'bg-amber-100 text-amber-900',
    tagText: 'text-amber-900',
    tagBorder: 'border-amber-200',
    titleColor: 'text-amber-950',
    highlightBg: 'bg-amber-100/70',
    highlightText: 'text-amber-950',
    highlightBorder: 'border-amber-200',
  },
  rose: {
    cardBg: 'bg-gradient-to-b from-rose-50/90 to-white hover:from-rose-100/60',
    cardBorder: 'border-rose-200/90 hover:border-rose-300',
    topBorder: 'border-t-rose-500',
    badgeBg: 'bg-rose-500 text-white shadow-xs',
    tagBg: 'bg-rose-100 text-rose-900',
    tagText: 'text-rose-900',
    tagBorder: 'border-rose-200',
    titleColor: 'text-rose-950',
    highlightBg: 'bg-rose-100/70',
    highlightText: 'text-rose-950',
    highlightBorder: 'border-rose-200',
  },
  cyan: {
    cardBg: 'bg-gradient-to-b from-cyan-50/90 to-white hover:from-cyan-100/60',
    cardBorder: 'border-cyan-200/90 hover:border-cyan-300',
    topBorder: 'border-t-cyan-600',
    badgeBg: 'bg-cyan-600 text-white shadow-xs',
    tagBg: 'bg-cyan-100 text-cyan-900',
    tagText: 'text-cyan-900',
    tagBorder: 'border-cyan-200',
    titleColor: 'text-cyan-950',
    highlightBg: 'bg-cyan-100/70',
    highlightText: 'text-cyan-950',
    highlightBorder: 'border-cyan-200',
  },
  slate: {
    cardBg: 'bg-gradient-to-b from-slate-100/90 to-white hover:from-slate-200/60',
    cardBorder: 'border-slate-300/90 hover:border-slate-400',
    topBorder: 'border-t-slate-600',
    badgeBg: 'bg-slate-700 text-white shadow-xs',
    tagBg: 'bg-slate-200 text-slate-800',
    tagText: 'text-slate-800',
    tagBorder: 'border-slate-300',
    titleColor: 'text-slate-900',
    highlightBg: 'bg-slate-200/70',
    highlightText: 'text-slate-900',
    highlightBorder: 'border-slate-300',
  },
};

const DEFAULT_COLOR_ORDER: BlockColorVariant[] = ['blue', 'emerald', 'violet', 'amber', 'rose', 'cyan'];

function getGridColsClass(count: number): string {
  switch (count) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-3';
    case 4:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    case 5:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5';
    case 6:
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
    default:
      return 'grid-cols-1 md:grid-cols-3';
  }
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
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Card Number Badge */}
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center justify-center shadow-xs">
            {t('Card', 'بطاقة', lang)} {indexNumber ?? card.cardNumber} / {CHAPTER2_REVIEW_FLASHCARDS.length}
          </span>

          {/* Lesson Code Pill */}
          <span className={`px-3 py-1.5 rounded-xl text-xs font-black border uppercase tracking-wider ${theme.badge}`}>
            {lang === 'ar' ? theme.short_ar : theme.short_en}
          </span>

          {/* Category Tag */}
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {lang === 'ar' ? card.category_ar : card.category_en}
          </span>
        </div>

        {/* Mastered Status Button */}
        <button
          onClick={onToggleMastery}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
            isMastered
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
          }`}
        >
          {isMastered
            ? t('Mastered', 'تم إتقان البطاقة', lang)
            : t('Mark as Mastered', 'تحديد كبطاقة متقنة', lang)}
        </button>
      </div>

      {/* ── TITLE & SUMMARY ── */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-3xl font-black text-slate-950 mb-2 leading-tight">
          {lang === 'ar' ? card.title_ar : card.title_en}
        </h2>
        <div className="p-3.5 rounded-2xl bg-slate-100/70 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
          {lang === 'ar' ? card.summary_ar : card.summary_en}
        </div>
      </div>

      {/* ── OPTIONAL STEP FLOW HEADER (If 6 Sequential Stages) ── */}
      {card.blocks.length === 6 && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 text-xs font-black text-violet-900 flex items-center justify-between">
          <span>{t('Sequential Stages (1 to 6 in order):', 'المراحل المتتابعة بالترتيب الإلزامي من 1 إلى 6 (صف واحد متتابع):', lang)}</span>
          <span className="text-[11px] font-bold text-violet-700">{t('Strict Order', 'ترتيب إجباري بالامتحان', lang)}</span>
        </div>
      )}

      {/* ── MINI-CARDS GRID (Side-by-side in one row with semantic colors) ── */}
      <div className={`grid ${getGridColsClass(card.blocks.length)} gap-4 mb-6`}>
        {card.blocks.map((block, bIdx) => {
          const colorKey = (block.colorVariant as BlockColorVariant) || DEFAULT_COLOR_ORDER[bIdx % DEFAULT_COLOR_ORDER.length];
          const color = BLOCK_COLOR_STYLES[colorKey] || BLOCK_COLOR_STYLES.blue;

          return (
            <div
              key={bIdx}
              className={`p-4 sm:p-5 rounded-2xl border ${color.cardBorder} ${color.cardBg} border-t-4 ${color.topBorder} flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200`}
            >
              <div>
                {/* Box Header: Number badge + Tag Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`w-7 h-7 rounded-xl ${color.badgeBg} text-xs font-black flex items-center justify-center shrink-0`}>
                    {bIdx + 1}
                  </span>
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-black border ${color.tagBg} ${color.tagText} ${color.tagBorder}`}>
                    {lang === 'ar' ? block.tag_ar : block.tag_en}
                  </span>
                </div>

                {/* Box Title */}
                <h4 className={`text-sm sm:text-base font-black ${color.titleColor} mb-2 leading-snug`}>
                  {lang === 'ar' ? block.title_ar : block.title_en}
                </h4>

                {/* Box Text */}
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {lang === 'ar' ? block.text_ar : block.text_en}
                </p>
              </div>

              {/* Optional Highlight note */}
              {(block.highlight_ar || block.highlight_en) && (
                <div className={`mt-4 pt-2.5 border-t ${color.highlightBorder} ${color.highlightBg} -mx-1 px-3 py-2 rounded-xl text-[11px] font-black ${color.highlightText}`}>
                  {lang === 'ar' ? block.highlight_ar : block.highlight_en}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── COMPARISON TABLE (If present, with clear colored columns) ── */}
      {card.comparison && (
        <div className="mb-6 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 bg-slate-900 text-white text-xs font-black p-3.5 text-center">
            <span className="text-start ps-3 text-slate-400">{t('Aspect', 'وجه المقارنة', lang)}</span>
            <span className="bg-blue-800/80 py-1 px-2 rounded-lg text-blue-100">{lang === 'ar' ? card.comparison.header1_ar : card.comparison.header1_en}</span>
            <span className="bg-purple-800/80 py-1 px-2 rounded-lg text-purple-100">{lang === 'ar' ? card.comparison.header2_ar : card.comparison.header2_en}</span>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {card.comparison.rows.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 p-3.5 text-xs font-medium text-slate-700 hover:bg-slate-50/70">
                <span className="font-bold text-slate-900 text-start ps-3">
                  {lang === 'ar' ? row.aspect_ar : row.aspect_en}
                </span>
                <span className="text-center px-2 font-medium text-blue-950 bg-blue-50/40 rounded-lg py-1">
                  {lang === 'ar' ? row.col1_ar : row.col1_en}
                </span>
                <span className="text-center px-2 font-medium text-purple-950 bg-purple-50/40 rounded-lg py-1">
                  {lang === 'ar' ? row.col2_ar : row.col2_en}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EXAM GOLDEN RULE BOX (High-contrast Key Takeaway) ── */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-2 border-amber-300 mb-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
            {t('Golden Exam Rule', 'القاعدة الذهبية في الامتحان (مفتاح الحل الأسرع)', lang)}
          </span>
        </div>
        <p className="text-sm sm:text-base font-black text-amber-950 leading-relaxed">
          {lang === 'ar' ? card.goldenRule_ar : card.goldenRule_en}
        </p>
      </div>

      {/* ── INTERACTIVE QUICK-CHECK BOX ── */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span className="text-xs font-black uppercase tracking-wider text-teal-300">
              {t('Quick Self-Check Question', 'سؤال تطبيق سريع (تأكد من فهمك للبطاقة)', lang)}
            </span>
          </div>
          <button
            onClick={onToggleAnswer}
            className="px-4 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-black transition-colors cursor-pointer shadow-sm"
          >
            {isAnswerRevealed
              ? t('Hide Answer', 'إخفاء الإجابة', lang)
              : t('Show Model Answer', 'عرض الإجابة النموذجية', lang)}
          </button>
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-100 mb-2 leading-relaxed">
          {lang === 'ar' ? card.checkQuestion_ar : card.checkQuestion_en}
        </p>

        <AnimatePresence>
          {isAnswerRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-4 p-4 rounded-xl bg-slate-800 border-2 border-teal-500/50 text-xs sm:text-sm font-semibold text-teal-100 leading-relaxed"
            >
              <span className="block font-black text-xs text-teal-300 uppercase mb-1">
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
