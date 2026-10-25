import { useState } from 'react';
import {
  BookOpen,
  Printer,
  Shield,
  Lock,
  Unlock,
  Key,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Server,
  Laptop,
  User,
  Fingerprint,
  Smartphone,
  KeyRound,
  Layers,
  Check
} from 'lucide-react';

export default function Lesson1BookletPdf() {
  // Language State: 'ar' (العربية) | 'en' (English)
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  // View Mode: 'PAGES' (Book Pages Flip) | 'CONTINUOUS' (All on one scrollable paper)
  const [viewMode, setViewMode] = useState<'PAGES' | 'CONTINUOUS'>('PAGES');

  // Active Page in PAGES mode (1 to 7)
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active Interactive Tab in Diagram (Stages 1, 2, 3)
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);

  // Revealed answers for practice questions
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalPages = 7;

  return (
    <div className="space-y-6 max-w-5xl mx-auto print:max-w-none print:m-0 print:p-0">

      {/* ============================================================ */}
      {/* TOOLBAR: Mode Switcher, Language Toggle, Page Nav, Print CTA */}
      {/* ============================================================ */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 print:hidden">
        
        {/* Left: Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-navy to-primary-plum text-white flex items-center justify-center shadow-md">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                PDF Booklet Style
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {lang === 'ar' ? 'الوحدة 2 — الدرس 1' : 'Unit 2 — Lesson 1'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-primary-navy">
              {lang === 'ar'
                ? 'ملزمة الشرح والنوتات الذكية — تقنيات التشفير والمصادقة'
                : 'Smart Study Booklet — Cryptographic Technologies & Authentication'}
            </h2>
          </div>
        </div>

        {/* Right: Controls (Language Switcher, View Switcher, Print) */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-black">
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                lang === 'ar'
                  ? 'bg-white text-primary-navy shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🇸🇦</span>
              <span>عربي</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-primary-navy shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-black">
            <button
              onClick={() => setViewMode('PAGES')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'PAGES'
                  ? 'bg-primary-plum text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers size={13} />
              <span>{lang === 'ar' ? 'صفحات الملزمة' : 'Pages View'}</span>
            </button>
            <button
              onClick={() => setViewMode('CONTINUOUS')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'CONTINUOUS'
                  ? 'bg-primary-plum text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText size={13} />
              <span>{lang === 'ar' ? 'عرض متصل' : 'Continuous'}</span>
            </button>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            title={lang === 'ar' ? 'طباعة أو حفظ كملف PDF' : 'Print or Save as PDF'}
          >
            <Printer size={15} />
            <span className="hidden sm:inline">{lang === 'ar' ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
          </button>
        </div>
      </div>

      {/* Pagination Bar (Only in PAGES mode) */}
      {viewMode === 'PAGES' && (
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {lang === 'ar' ? `الصفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
            </span>
            <div className="hidden md:flex items-center gap-1 mr-3">
              {[1, 2, 3, 4, 5, 6, 7].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary-navy text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              {lang === 'ar' ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
              <span>{lang === 'ar' ? 'السابق' : 'Previous'}</span>
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-xl bg-primary-navy hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
              {lang === 'ar' ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* BOOKLET CONTAINER (Styled like real high-end printed pages)  */}
      {/* ============================================================ */}
      <div className="space-y-8 print:space-y-6">

        {/* ========================================================== */}
        {/* PAGE 1: COVER & FUNDAMENTALS OF ENCRYPTION                 */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 1) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header Badge & Chapter Info */}
            <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'منهج البكالوريا 2026/2027 — الذكاء الاصطناعي والبرمجة' : 'Baccalaureate 2026/2027 — AI & Programming'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-primary-navy">
                  {lang === 'ar' ? 'الدرس 2-1: تقنيات التشفير والمصادقة' : 'Lesson 2-1: Cryptographic Technologies and Authentication'}
                </h1>
                <p className="text-sm font-bold text-slate-500">
                  {lang === 'ar' ? 'الملزمة الشاملة ونوتات المذاكرة والحل السريع في الامتحانات' : 'Comprehensive Study Booklet & High-Yield Exam Capsules'}
                </p>
              </div>

              <div className="text-left sm:text-right text-xs font-bold text-slate-400 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 1 من 7' : 'Page 1 of 7'}</div>
                <div>{lang === 'ar' ? 'أساسيات التشفير' : 'Crypto Fundamentals'}</div>
              </div>
            </div>

            {/* Ministry Golden Fact Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-3">
              <Sparkles size={22} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                  {lang === 'ar' ? 'حقيقة ذهبية من كتاب الوزارة (Key Fact):' : 'Official Textbook Key Fact:'}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-amber-950 mt-1 leading-relaxed">
                  {lang === 'ar'
                    ? 'الاتصالات والخدمات الآمنة عبر الإنترنت لا تعتمد على تقنية أمنية واحدة منفردة، بل تتحقق من خلال الدمج التكاملي بين تقنيات التشفير والمصادقة.'
                    : 'Secure online communication and services depend on combining cryptography and authentication — not on any single technology.'}
                </p>
              </div>
            </div>

            {/* Concept: Encryption vs Decryption */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-primary-navy flex items-center gap-2">
                <Lock size={18} className="text-teal-600" />
                <span>{lang === 'ar' ? '1. ما هو التشفير وما هو فك التشفير؟' : '1. What is Encryption and Decryption?'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Encryption Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-primary-navy flex items-center gap-1.5">
                      <Lock size={16} className="text-primary-plum" />
                      <span>{lang === 'ar' ? 'التشفير (Encryption)' : 'Encryption'}</span>
                    </span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {lang === 'ar' ? 'صريح ◄ مشفر' : 'Plain ◄ Cipher'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {lang === 'ar'
                      ? 'عملية تحويل البيانات من نص مفهوم (النص الصريح - Plaintext) إلى نص غير مفهوم ومبهم (النص المشفر - Ciphertext) لمنع أي طرف ثالث غير مصرح له من قراءتها أثناء النقل.'
                      : 'The process of scrambling understandable data (Plaintext) into an unreadable format (Ciphertext) to prevent unauthorized third parties from reading it during transit.'}
                  </p>
                </div>

                {/* Decryption Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-primary-navy flex items-center gap-1.5">
                      <Unlock size={16} className="text-teal-600" />
                      <span>{lang === 'ar' ? 'فك التشفير (Decryption)' : 'Decryption'}</span>
                    </span>
                    <span className="text-[10px] font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                      {lang === 'ar' ? 'مشفر ◄ صريح' : 'Cipher ◄ Plain'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {lang === 'ar'
                      ? 'العملية العكسية تماماً: تحويل النص المشفر (Ciphertext) وإعادته إلى النص الأصلي الصريح المفهوم (Plaintext) باستخدام المفتاح الصحيح المخصص.'
                      : 'The exact reverse operation: converting Ciphertext back to its original understandable Plaintext format using the designated key.'}
                  </p>
                </div>

              </div>

              {/* Exact Visual Box from Whiteboard Notes */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/60 border border-indigo-200 space-y-3">
                <span className="text-xs font-black text-indigo-900 block">
                  {lang === 'ar' ? 'مثال توضيحي عملي (من دفتر الشرح):' : 'Practical Transformation Diagram (from whiteboard):'}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Step A: Transformation Rules */}
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-100 font-mono text-xs space-y-1 shadow-sm">
                    <div className="font-bold text-slate-500">{lang === 'ar' ? 'قاعدة الاستبدال المفترضة:' : 'Hypothetical Cipher Rule:'}</div>
                    <div className="text-emerald-700 font-bold">a ──► d</div>
                    <div className="text-emerald-700 font-bold">b ──► m</div>
                  </div>

                  {/* Step B: Encrypt / Decrypt in Action */}
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-100 font-mono text-xs space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700 font-black">Encrypt:</span>
                      <span className="font-bold text-slate-800">[ a b ] ──► [ d m ]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-700 font-black">Decrypt:</span>
                      <span className="font-bold text-slate-800">[ d m ] ──► [ a b ]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Exam Note Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-emerald-900 uppercase">
                    {lang === 'ar' ? 'نوتة ذكية للامتحان (إذا سألك كذا.. قل كذا):' : 'Smart Exam Tip (If asked this, say that):'}
                  </h4>
                  <p className="text-xs text-emerald-950 font-bold mt-0.5 leading-relaxed">
                    {lang === 'ar'
                      ? 'لو سألك في الامتحان: "ما الهدف الأساسي من التشفير بشكل عام؟" ◄ اكتب فوراً وبلا تردد: "منع الأطراف الثالثة من قراءة محتوى الرسائل والبيانات (توفير السرية Confidentiality)".'
                      : 'If asked: "What is the primary effect of encryption?" ◄ Answer immediately: "Prevents communication content from being read by third parties (Confidentiality)."' }
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 2: HTTPS & TLS HANDSHAKE DIAGRAM (THE HEART)          */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 2) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'المخطط التوضيحي الرئيسي' : 'Core Architecture Diagram'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                  {lang === 'ar' ? '2. مخطط تدفق اتصال HTTPS ومصافحة TLS' : '2. HTTPS Communication Flow & TLS Handshake'}
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs font-bold text-slate-400">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 2 من 7' : 'Page 2 of 7'}</div>
                <div>{lang === 'ar' ? 'مخطط التدفق' : 'Flow Architecture'}</div>
              </div>
            </div>

            {/* Guiding Question */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium">
              <strong className="text-primary-navy font-bold">
                {lang === 'ar' ? 'سيناريو عملي:' : 'Real-world Scenario:'}
              </strong>{' '}
              {lang === 'ar'
                ? 'عندما تفتح متصفحك وتكتب https://www.amazon.com، كيف يضمن المتصفح أن الموقع ليس منتحلاً، وكيف يتبادل معه المفاتيح المشفرة بأمان؟'
                : 'When entering https://www.amazon.com in your browser, how does the browser verify authenticity and safely negotiate encryption keys?'}
            </div>

            {/* ======================================================== */}
            {/* INTERACTIVE / VISUAL DIAGRAM (Server - Browser - User)    */}
            {/* ======================================================== */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 mr-2">https://www.amazon.com</span>
                </div>
                <span className="text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  TLS Secured
                </span>
              </div>

              {/* 3 Columns: Server (Left) | Browser (Middle) | User (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                
                {/* Entity 1: Web Server */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto">
                    <Server size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">
                      {lang === 'ar' ? 'خادم الويب (Server)' : 'Web Server'}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">amazon.com</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-right font-medium">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'المفتاح الخاص:' : 'Private Key:'}</span>
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <Key size={11} /> {lang === 'ar' ? 'سري للخادم' : 'Secret'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'المفتاح العام:' : 'Public Key:'}</span>
                      <span className="text-teal-400 font-bold flex items-center gap-1">
                        <Unlock size={11} /> {lang === 'ar' ? 'متاح للجميع' : 'Public'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'الشهادة الرقمية:' : 'Certificate:'}</span>
                      <span className="text-amber-300 font-bold">+ CA Authenticated</span>
                    </div>
                  </div>
                </div>

                {/* Entity 2: Web Browser */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto">
                    <Laptop size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">
                      {lang === 'ar' ? 'المتصفح (Browser)' : 'Browser (Client)'}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">Chrome / Edge / Safari</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-right font-medium">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'التحقق من CA:' : 'Verify CA:'}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check size={11} /> {lang === 'ar' ? 'موقع حقيقي' : 'Verified'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'توليد المفتاح:' : 'Session Key:'}</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <KeyRound size={11} /> {lang === 'ar' ? 'مفتاح مشترك' : 'Common Key'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'تشفير المفتاح:' : 'Encrypt Key:'}</span>
                      <span className="text-purple-300 font-bold">{lang === 'ar' ? 'بالمفتاح العام' : 'via Public Key'}</span>
                    </div>
                  </div>
                </div>

                {/* Entity 3: User */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">
                      {lang === 'ar' ? 'المستخدم (User)' : 'User (Student / Client)'}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">End User</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-right font-medium">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'المصادقة (Auth):' : 'Auth:'}</span>
                      <span className="text-emerald-400 font-bold">Login (user + pass)</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'القناة الآمنة:' : 'Channel:'}</span>
                      <span className="text-teal-300 font-bold">HTTPS Tunnel</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-slate-300">{lang === 'ar' ? 'عوامل الحماية:' : 'Protection:'}</span>
                      <span className="text-amber-300 font-bold">Password + 2FA</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Step-by-Step Flow Stages */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <span className="text-xs font-black text-slate-300 block">
                  {lang === 'ar' ? 'خطوات مصافحة TLS الثلاث (اضغط للتفاصيل):' : 'The 3 Stages of TLS Handshake (Click for details):'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveStage(1)}
                    className={`p-3 rounded-xl text-right transition-all text-xs font-bold border cursor-pointer ${
                      activeStage === 1
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md ring-2 ring-purple-400/30'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-black">1. {lang === 'ar' ? 'مرحلة الاتصال' : 'Connection Stage'}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{lang === 'ar' ? 'إرسال المفتاح العام + الشهادة (CA)' : 'Server sends Public Key + CA'}</div>
                  </button>

                  <button
                    onClick={() => setActiveStage(2)}
                    className={`p-3 rounded-xl text-right transition-all text-xs font-bold border cursor-pointer ${
                      activeStage === 2
                        ? 'bg-teal-600 text-white border-teal-400 shadow-md ring-2 ring-teal-400/30'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-black">2. {lang === 'ar' ? 'تبادل المفاتيح' : 'Key Exchange Stage'}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{lang === 'ar' ? 'المتصفح ينشئ Common Key ويشفره' : 'Browser sends encrypted Common Key'}</div>
                  </button>

                  <button
                    onClick={() => setActiveStage(3)}
                    className={`p-3 rounded-xl text-right transition-all text-xs font-bold border cursor-pointer ${
                      activeStage === 3
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-black">3. {lang === 'ar' ? 'نقل البيانات' : 'Data Communication'}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{lang === 'ar' ? 'تشفير الجلسة بالـ Common Key' : 'Fast session data encrypted'}</div>
                  </button>
                </div>

                {/* Stage Detail Explanation Callout */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200 leading-relaxed font-medium">
                  {activeStage === 1 && (
                    <div>
                      <strong className="text-purple-300 font-bold block mb-1">
                        {lang === 'ar' ? '① مرحلة الاتصال (طريقة التشفير: المفتاح العام):' : '① Connection Stage (Method: Public-key Cryptography):'}
                      </strong>
                      {lang === 'ar'
                        ? 'يُرسل خادم الويب شهادته الرقمية مع مفتاحه العام إلى المتصفح. يقوم المتصفح بالتحقق من صحة ومصداقية الخادم عبر سلطة الشهادات المعتمدة (CA) ليتأكد أنه يتصل بالموقع الحقيقي وليس موقعاً منتحلاً.'
                        : 'The web server sends its digital certificate and public key to the browser. The browser verifies the server\'s authenticity through a trusted certificate authority (CA).'}
                    </div>
                  )}
                  {activeStage === 2 && (
                    <div>
                      <strong className="text-teal-300 font-bold block mb-1">
                        {lang === 'ar' ? '② مرحلة تبادل المفاتيح (طريقة التشفير: المفتاح العام):' : '② Key Exchange Stage (Method: Public-key Cryptography):'}
                      </strong>
                      {lang === 'ar'
                        ? 'يُنشئ المتصفح مفتاحاً مشتركاً مؤقتاً للجلسة (Common Key). يُشفِّر المتصفح هذا المفتاح بمفتاح الخادم العام ويرسله للخادم. يقوم الخادم بفك التشفير بمفتاحه الخاص، فيحصل على المفتاح المشترك بأمان تام.'
                        : 'The browser creates a temporary common session key, encrypts it with the server\'s public key, and sends it. The server decrypts it with its private key to safely obtain the shared common key.'}
                    </div>
                  )}
                  {activeStage === 3 && (
                    <div>
                      <strong className="text-emerald-300 font-bold block mb-1">
                        {lang === 'ar' ? '③ مرحلة نقل البيانات وتسجيل الدخول (طريقة التشفير: المفتاح المشترك):' : '③ Data Communication Stage (Method: Common-key Cryptography):'}
                      </strong>
                      {lang === 'ar'
                        ? 'الآن كلا الطرفين يملكان المفتاح المشترك. يتم إرسال بيانات المستخدم (Login: user + password) وجميع بيانات صفحات الموقع مشفرة بالمفتاح المشترك بسرعة فائقة وخفة تامة على النظام.'
                        : 'Now both parties share the common key. Login credentials (user + pass) and all session data are exchanged quickly and efficiently using the shared common key.'}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Smart Exam Warning */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertTriangle size={20} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-rose-900 uppercase">
                  {lang === 'ar' ? '⚠️ فخ امتحاني خطير يتكرر كثيراً:' : '⚠️ Common Exam Pitfall:'}
                </h4>
                <p className="text-xs text-rose-950 font-bold mt-0.5 leading-relaxed">
                  {lang === 'ar'
                    ? 'احذر أن تقول في الامتحان: "يتم تشفير كل بيانات الجلسة بالمفتاح العام". الإجابة الصحيحة: المفتاح العام يُستخدم فقط في البداية (لمصافحة TLS وتبادل المفاتيح بأمان)، بينما بيانات الجلسة تُشفر بالمفتاح المشترك (المتماثل) لسرعته الفائقة!'
                    : 'Do NOT say: "All session data is encrypted using public-key cryptography". The correct fact: Public-key is ONLY used initially for key exchange; actual session data is encrypted using the common key for speed!'}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 3: REAL COMPARISON TABLE (Common vs Public Key)       */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 3) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'جدول المقارنة المعتمد' : 'Official Comparison Matrix'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                  {lang === 'ar' ? '3. المقارنة الذهبية: التشفير بالمفتاح المشترك vs التشفير بالمفتاح العام' : '3. Common-key Cryptography vs Public-key Cryptography'}
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs font-bold text-slate-400">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 3 من 7' : 'Page 3 of 7'}</div>
                <div>{lang === 'ar' ? 'جدول المقارنة' : 'Comparison Table'}</div>
              </div>
            </div>

            {/* Real Styled HTML Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-primary-navy text-white">
                    <th className="p-4 font-black border-b border-primary-plum text-right">
                      {lang === 'ar' ? 'وجه المقارنة (Feature)' : 'Comparison Feature'}
                    </th>
                    <th className="p-4 font-black border-b border-primary-plum bg-teal-800 text-teal-50 text-right">
                      {lang === 'ar' ? 'التشفير بالمفتاح المشترك (المتماثل)' : 'Common-key Cryptography (Symmetric)'}
                    </th>
                    <th className="p-4 font-black border-b border-primary-plum bg-purple-950 text-purple-100 text-right">
                      {lang === 'ar' ? 'التشفير بالمفتاح العام (غير المتماثل)' : 'Public-key Cryptography (Asymmetric)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50">
                      {lang === 'ar' ? 'عدد المفاتيح المستخدمة' : 'Number of Keys'}
                    </td>
                    <td className="p-4 text-teal-950 font-bold">
                      {lang === 'ar' ? 'مفتاح واحد مشترك للتشفير وفك التشفير' : 'Single shared key for both encryption and decryption'}
                    </td>
                    <td className="p-4 text-purple-950 font-bold">
                      {lang === 'ar' ? 'زوج من المفاتيح: مفتاح عام + مفتاح خاص' : 'Key pair: Public key + Private key'}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50">
                      {lang === 'ar' ? 'السرعة ومعالجة البيانات' : 'Processing Speed'}
                    </td>
                    <td className="p-4 text-emerald-700 font-black flex items-center gap-1.5">
                      <Sparkles size={16} />
                      <span>{lang === 'ar' ? 'سريع جداً وفائق الكفاءة' : 'Very fast and computationally efficient'}</span>
                    </td>
                    <td className="p-4 text-amber-700 font-bold">
                      <span>{lang === 'ar' ? 'بطيء نسبياً (عمليات حسابية معقدة)' : 'Relatively slow (heavy mathematical computations)'}</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50">
                      {lang === 'ar' ? 'الدور الأساسي في بروتوكول HTTPS' : 'Primary Role in HTTPS'}
                    </td>
                    <td className="p-4 text-slate-800 font-bold">
                      {lang === 'ar' ? 'نقل وتبادل كميات ضخمة من البيانات أثناء الجلسة' : 'Exchanging large amounts of session data quickly'}
                    </td>
                    <td className="p-4 text-slate-800 font-bold">
                      {lang === 'ar' ? 'تبادل ومشاركة المفتاح المشترك بأمان أثناء المصافحة' : 'Safely sharing the common key during handshake'}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50">
                      {lang === 'ar' ? 'القاعدة الذهبية في كتاب الوزارة' : 'Official Ministry Textbook Rule'}
                    </td>
                    <td className="p-4 text-teal-900 font-black bg-teal-50/50">
                      "{lang === 'ar' ? 'تبادل كميات كبيرة من البيانات بسرعة' : 'Exchange large amounts of data quickly'}"
                    </td>
                    <td className="p-4 text-purple-900 font-black bg-purple-50/50">
                      "{lang === 'ar' ? 'مشاركة المفاتيح بأمان' : 'Share keys safely'}"
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50">
                      {lang === 'ar' ? 'العيب أو التحدي' : 'Drawback or Challenge'}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {lang === 'ar' ? 'مشكلة توزيع المفتاح (كيف نتبادله في البداية بأمان؟)' : 'Key distribution problem (how to share it safely initially?)'}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {lang === 'ar' ? 'بطيء ولا يناسب تشفير ملفات ضخمة' : 'Too slow to encrypt large payloads directly'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Model Essay Question Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 space-y-3">
              <span className="text-xs font-black text-purple-900 uppercase flex items-center gap-2">
                <FileText size={16} />
                <span>{lang === 'ar' ? 'نموذج إجابة مقالي وزاري معتمد (6 درجات):' : 'Official Model Essay Answer (6 Marks):'}</span>
              </span>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium space-y-2">
                <p className="font-bold text-purple-950">
                  {lang === 'ar'
                    ? 'س: علل: لماذا يجمع بروتوكول HTTPS بين التشفير بالمفتاح العام والتشفير بالمفتاح المشترك؟'
                    : 'Q: Explain why HTTPS combines both public-key cryptography and common-key cryptography?'}
                </p>
                <div className="p-3 bg-white rounded-xl border border-purple-200 text-slate-700 space-y-1">
                  <p>
                    {lang === 'ar'
                      ? 'ج: يُستخدم التشفير بالمفتاح العام في البداية بهدف "مشاركة المفاتيح بأمان" دون الحاجة لاتفاق مسبق، بينما يُستخدم التشفير بالمفتاح المشترك (المتماثل) بعد ذلك بهدف "تبادل كميات ضخمة من البيانات بسرعة فائقة".'
                      : 'A: Public-key cryptography is used initially to "share keys safely" without prior agreements, while common-key cryptography is used subsequently to "exchange large amounts of data quickly".'}
                  </p>
                  <p className="text-emerald-700 font-bold">
                    {lang === 'ar'
                      ? 'النتيجة: هذا الدمج الذكي يحقق الأمان العالي والسرعة الفائقة معاً في نفس الوقت.'
                      : 'Result: This hybrid design achieves both high security and high speed simultaneously.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 4: AUTHENTICATION FACTORS TREE & 2FA / MFA            */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 4) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'شجرة المصادقة وعوامل الأمان' : 'Authentication Tree & Factors'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                  {lang === 'ar' ? '4. عوامل المصادقة الثلاثة (2FA & Multi-Factor Authentication)' : '4. The Three Factors of Authentication (2FA & MFA)'}
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs font-bold text-slate-400">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 4 من 7' : 'Page 4 of 7'}</div>
                <div>{lang === 'ar' ? 'شجرة المصادقة' : 'Auth Tree'}</div>
              </div>
            </div>

            {/* The 3 Factors Root Diagram */}
            <div className="space-y-4">
              <div className="text-center font-black text-sm text-primary-navy bg-slate-100 p-2.5 rounded-xl border border-slate-200 w-fit mx-auto px-6 shadow-sm">
                🔐 {lang === 'ar' ? 'المصادقة (Authentication) — ثلاث فئات معتمدة' : 'Authentication — Three Official Factors'}
              </div>

              {/* 3 Branching Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Factor 1: Knowledge */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-black">
                    <Key size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      Factor 1
                    </span>
                    <h4 className="font-black text-base text-amber-950 mt-1">
                      {lang === 'ar' ? 'المعرفة (Knowledge)' : 'Knowledge'}
                    </h4>
                    <p className="text-xs font-bold text-amber-800 mt-0.5">
                      {lang === 'ar' ? 'شيء تعرفه في عقلك' : 'Something you know'}
                    </p>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <div className="bg-white p-2 rounded-lg border border-amber-100 flex items-center gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'كلمة المرور (Password)' : 'Password'}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100 flex items-center gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'الرمز السري (PIN Code)' : 'PIN Code'}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100 flex items-center gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'السؤال السري وإجابته' : 'Security Question'}</span>
                    </div>
                  </div>
                </div>

                {/* Factor 2: Possession */}
                <div className="p-5 rounded-2xl bg-teal-50/70 border-2 border-teal-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-200 text-teal-900 flex items-center justify-center font-black">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                      Factor 2
                    </span>
                    <h4 className="font-black text-base text-teal-950 mt-1">
                      {lang === 'ar' ? 'الحيازة (Possession)' : 'Possession'}
                    </h4>
                    <p className="text-xs font-bold text-teal-800 mt-0.5">
                      {lang === 'ar' ? 'شيء تمتلكه بيدك' : 'Something you have'}
                    </p>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <div className="bg-white p-2 rounded-lg border border-teal-100 flex items-center gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'الهاتف المحمول (رسائل SMS)' : 'Smartphone (SMS notifications)'}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-teal-100 flex items-center gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'رمز مؤقت لمرة واحدة (OTP)' : 'One-Time Password (OTP)'}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-teal-100 flex items-center gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'البطاقة الذكية أو بطاقة ID' : 'Smart Card / Physical ID'}</span>
                    </div>
                  </div>
                </div>

                {/* Factor 3: Biometrics */}
                <div className="p-5 rounded-2xl bg-purple-50/70 border-2 border-purple-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center font-black">
                    <Fingerprint size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                      Factor 3
                    </span>
                    <h4 className="font-black text-base text-purple-950 mt-1">
                      {lang === 'ar' ? 'السمات الحيوية (Biometrics)' : 'Biometrics'}
                    </h4>
                    <p className="text-xs font-bold text-purple-800 mt-0.5">
                      {lang === 'ar' ? 'شيء أنت عليه (في جسدك)' : 'Something you are'}
                    </p>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <div className="bg-white p-2 rounded-lg border border-purple-100 flex items-center gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'بصمة الإصبع (Fingerprint)' : 'Fingerprint scan'}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-purple-100 flex items-center gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'التعرف على الوجه (Face ID)' : 'Facial recognition'}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-purple-100 flex items-center gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{lang === 'ar' ? 'بصمة العين / القزحية (Iris)' : 'Iris scan'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Combination Formulas: 2FA vs MFA */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-black text-primary-navy block">
                  {lang === 'ar' ? 'معادلات وتطبيقات المصادقة المعتمدة في كتاب الوزارة:' : 'Official Authentication Formulas & Combinations:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded w-fit">2FA</div>
                    <div className="font-bold text-slate-800">{lang === 'ar' ? 'معرفة + حيازة' : 'Knowledge + Possession'}</div>
                    <div className="text-slate-500 text-[11px]">{lang === 'ar' ? 'مثل: كلمة مرور + رمز OTP بالهاتف (البنوك)' : 'e.g. Password + OTP via SMS (Banking)'}</div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-fit">2FA</div>
                    <div className="font-bold text-slate-800">{lang === 'ar' ? 'حيازة + سمات حيوية' : 'Possession + Biometrics'}</div>
                    <div className="text-slate-500 text-[11px]">{lang === 'ar' ? 'مثل: بطاقة ذكية + بصمة إصبع (لابتوب العمل)' : 'e.g. Smart card + Fingerprint (Corporate PC)'}</div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded w-fit">MFA</div>
                    <div className="font-bold text-slate-800">{lang === 'ar' ? 'معرفة + حيازة + سمات حيوية' : 'Knowledge + Possession + Biometric'}</div>
                    <div className="text-slate-500 text-[11px]">{lang === 'ar' ? 'المصادقة متعددة العوامل الشاملة' : 'Full Multi-Factor Authentication'}</div>
                  </div>
                </div>
              </div>

              {/* Pause & Think Box */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <AlertTriangle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-blue-900 uppercase">
                    {lang === 'ar' ? 'سؤال تفكير وتثبيت (Pause & Think ص 36):' : 'Pause & Think Official Question (p. 36):'}
                  </h4>
                  <p className="text-xs text-blue-950 font-bold mt-0.5 leading-relaxed">
                    {lang === 'ar'
                      ? 'س: إذا تسربت كلمة المرور، لماذا يستمر العامل الثاني المُرسل للهاتف في حماية الحساب؟'
                      : 'Q: If a password is leaked, why can a second factor sent to a phone still keep the account safe?'}
                  </p>
                  <p className="text-xs text-blue-800 mt-1 font-medium">
                    {lang === 'ar'
                      ? 'ج: لأن المهاجم لا يملك الهاتف المحمول للمستخدم (عامل الحيازة)، فلا يمكنه الحصول على رمز التأكيد OTP، وبالتالي يفشل في تسجيل الدخول حتى مع معرفته لكلمة المرور.'
                      : 'A: Because the attacker lacks physical access to the user\'s phone (possession factor) to receive the OTP, preventing login even if the password is known.'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 5: 4 TECHNOLOGIES VS 4 THREATS MATRIX                */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 5) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'مصفوفة الحماية والأمان' : 'Security Technologies Matrix'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                  {lang === 'ar' ? '5. التقنيات الأربعة ومواجهة التهديدات الأربعة (كتاب الوزارة ص 36-37)' : '5. The Four Technologies vs Four Major Threats'}
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs font-bold text-slate-400">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 5 من 7' : 'Page 5 of 7'}</div>
                <div>{lang === 'ar' ? 'مصفوفة التهديدات' : 'Threats Matrix'}</div>
              </div>
            </div>

            {/* Real Styled HTML Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-primary-navy text-white">
                    <th className="p-4 font-black text-right w-1/4">
                      {lang === 'ar' ? 'التقنية الأمنية (Technology)' : 'Security Technology'}
                    </th>
                    <th className="p-4 font-black text-right w-1/4 bg-slate-800">
                      {lang === 'ar' ? 'التهديد الذي تمنعه (Threat)' : 'Threat Prevented'}
                    </th>
                    <th className="p-4 font-black text-right w-1/2 bg-teal-900 text-teal-100">
                      {lang === 'ar' ? 'الكلمات المفتاحية المعتمدة للامتحان (Key Effect)' : 'Official Textbook Keywords'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-primary-navy flex items-center gap-2">
                      <Lock size={16} className="text-primary-plum" />
                      <span>{lang === 'ar' ? 'التشفير (Encryption)' : 'Encryption (Common & Public)'}</span>
                    </td>
                    <td className="p-4 font-bold text-rose-700">
                      {lang === 'ar' ? 'التنصت وقراءة المحتوى (Eavesdropping)' : 'Eavesdropping / Wiretapping'}
                    </td>
                    <td className="p-4 text-slate-800 font-medium">
                      "{lang === 'ar' ? 'منع قراءة محتوى الاتصال من قِبل أطراف ثالثة' : 'Prevents communication content from being read by third parties'}"
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-primary-navy flex items-center gap-2">
                      <FileText size={16} className="text-purple-600" />
                      <span>{lang === 'ar' ? 'التوقيع الرقمي (Digital Signature)' : 'Digital Signature'}</span>
                    </td>
                    <td className="p-4 font-bold text-rose-700">
                      {lang === 'ar' ? 'تعديل البيانات (Tampering) والانتحال' : 'Data Tampering & Impersonation'}
                    </td>
                    <td className="p-4 text-slate-800 font-medium">
                      "{lang === 'ar'
                        ? 'كشف التلاعب بالبيانات أو انتحال شخصية المُرسِل، وتوفير عدم التنصل (Non-repudiation) بحيث يستحيل على المُرسِل إنكار إرسالها'
                        : 'Detects data tampering or sender impersonation, and provides non-repudiation (sender cannot deny having sent it)'}"
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-primary-navy flex items-center gap-2">
                      <Shield size={16} className="text-teal-600" />
                      <span>{lang === 'ar' ? 'الشهادة الرقمية (Digital Certificate)' : 'Digital Certificate'}</span>
                    </td>
                    <td className="p-4 font-bold text-rose-700">
                      {lang === 'ar' ? 'المواقع المزيفة وانتحال الخادم' : 'Spoofed Sites & Phishing Partners'}
                    </td>
                    <td className="p-4 text-slate-800 font-medium">
                      "{lang === 'ar' ? 'التحقق من أن شريك الاتصال أو موقع الويب حقيقي وموثوق عبر سلطة الشهادات (CA)' : 'Verifies that the communication partner/server is genuine via CA'}"
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-primary-navy flex items-center gap-2">
                      <KeyRound size={16} className="text-amber-600" />
                      <span>{lang === 'ar' ? 'المصادقة متعددة العوامل (MFA)' : 'Multi-Factor Authentication (MFA)'}</span>
                    </td>
                    <td className="p-4 font-bold text-rose-700">
                      {lang === 'ar' ? 'تسجيل الدخول غير المصرح به' : 'Unauthorized Login'}
                    </td>
                    <td className="p-4 text-slate-800 font-medium">
                      "{lang === 'ar' ? 'منع تسجيل الدخول غير المصرح به للحسابات حتى في حال تسرب كلمة المرور' : 'Prevents unauthorized logins even if a password has been compromised'}"
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Practical Shopping Example Box (ص 36 كتاب الوزارة) */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-primary-navy block">
                {lang === 'ar' ? 'كيف تعمل هذه التقنيات مجتمعة في سيناريو شراء حقيقي؟' : 'How these technologies combine in an Online Purchase:'}
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-teal-700 block mb-0.5">① {lang === 'ar' ? 'عند الدخول للموقع:' : 'Site Access:'}</span>
                  <p className="text-slate-600">{lang === 'ar' ? 'يبدأ اتصال HTTPS ويمنع التشفير أي طرف ثالث من قراءة المحتوى.' : 'HTTPS connection begins; encryption prevents eavesdropping.'}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-purple-700 block mb-0.5">② {lang === 'ar' ? 'التحقق من الموقع:' : 'Destination Verification:'}</span>
                  <p className="text-slate-600">{lang === 'ar' ? 'يفحص المتصفح الشهادة الرقمية ليتأكد أنه موقع التسوق الحقيقي.' : 'Browser checks digital certificate to confirm genuine shopping site.'}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-amber-700 block mb-0.5">③ {lang === 'ar' ? 'تسجيل الدخول بالحساب:' : 'Account Login:'}</span>
                  <p className="text-slate-600">{lang === 'ar' ? 'تمنع المصادقة متعددة العوامل (MFA) أي دخول غير مصرح به للحساب.' : 'MFA combining password + SMS prevents unauthorized account logins.'}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-indigo-700 block mb-0.5">④ {lang === 'ar' ? 'تأكيد عملية الشراء:' : 'Order Dispatch:'}</span>
                  <p className="text-slate-600">{lang === 'ar' ? 'يضمن التوقيع الرقمي كشف أي تلاعب بتفاصيل الطلب أثناء النقل.' : 'Digital signature ensures tampering of order details is instantly detected.'}</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 6: SMART EXAM CAPSULES ("IF ASKED X, WRITE Y")        */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 6) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'الكبسولات الذهبية للامتحان' : 'High-Yield Exam Capsules'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                  {lang === 'ar' ? '6. كبسولات الامتحان الذكية ("إذا سألك كذا.. اكتب كذا")' : '6. Smart Exam Capsules ("If Asked X, Write Y")'}
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs font-bold text-slate-400">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 6 من 7' : 'Page 6 of 7'}</div>
                <div>{lang === 'ar' ? 'كبسولات الامتحان' : 'Exam Capsules'}</div>
              </div>
            </div>

            {/* Smart Capsules List */}
            <div className="space-y-4">
              
              {/* Capsule 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white bg-primary-navy px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? 'كبسولة 1' : 'Capsule 1'}
                  </span>
                  <h4 className="font-black text-sm text-primary-navy">
                    {lang === 'ar' ? 'نوع التشفير المستخدم في كل مرحلة من مراحل HTTPS' : 'Cryptographic Method in each HTTPS Stage'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-purple-700 font-bold block">{lang === 'ar' ? 'سؤال: ما طريقة التشفير في مرحلة "مشاركة المفاتيح / الاتصال"؟' : 'Q: Method used in "Connection / Key Exchange"?'}</span>
                    <span className="text-slate-900 font-black mt-1 block">◄ {lang === 'ar' ? 'التشفير بالمفتاح العام (Public-key Cryptography)' : 'Public-key Cryptography'}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-teal-700 font-bold block">{lang === 'ar' ? 'سؤال: ما طريقة التشفير في مرحلة "نقل البيانات وتبادلها"؟' : 'Q: Method used in "Data Communication"?'}</span>
                    <span className="text-slate-900 font-black mt-1 block">◄ {lang === 'ar' ? 'التشفير بالمفتاح المشترك (Common-key Cryptography)' : 'Common-key Cryptography'}</span>
                  </div>
                </div>
              </div>

              {/* Capsule 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white bg-primary-plum px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? 'كبسولة 2' : 'Capsule 2'}
                  </span>
                  <h4 className="font-black text-sm text-primary-navy">
                    {lang === 'ar' ? 'الفرق الدقيق بين الشهادة الرقمية والتوقيع الرقمي' : 'Digital Certificate vs Digital Signature'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-teal-700 font-bold block">{lang === 'ar' ? 'الشهادة الرقمية (Certificate):' : 'Digital Certificate:'}</span>
                    <p className="text-slate-800 font-medium mt-0.5">
                      {lang === 'ar' ? 'تثبت هوية الخادم/الموقع وأنه حقيقي وليس منتحلاً عبر سلطة CA.' : 'Proves the authenticity of the site/server via a trusted CA.'}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-purple-700 font-bold block">{lang === 'ar' ? 'التوقيع الرقمي (Signature):' : 'Digital Signature:'}</span>
                    <p className="text-slate-800 font-medium mt-0.5">
                      {lang === 'ar' ? 'يثبت صحة البيانات المرسلة ويكشف التلاعب وعدم تنصل المُرسِل.' : 'Proves data integrity, detects tampering, and ensures non-repudiation.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Capsule 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white bg-teal-700 px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? 'كبسولة 3' : 'Capsule 3'}
                  </span>
                  <h4 className="font-black text-sm text-primary-navy">
                    {lang === 'ar' ? 'فخ تعيين كلمتي مرور (Two Passwords Trap)' : 'Setting Two Passwords Trap'}
                  </h4>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
                  {lang === 'ar' ? (
                    <div>
                      <span className="text-rose-700 font-bold block mb-1">❌ فخ السؤال: "مستخدم عيّن كلمتي مرور مختلفتين لحسابه، هل هذا يُعد MFA؟"</span>
                      <span className="text-emerald-700 font-bold block">
                        ✅ الإجابة: لا يُعد مصادقة متعددة العوامل! لأن كلاهما ينتميان إلى نفس فئة "المعرفة (Knowledge)". المصادقة متعددة العوامل تشترط وجود عاملين من فئات مختلفة (مثل معرفة + حيازة).
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-rose-700 font-bold block mb-1">❌ Trap Question: "A user sets two different passwords. Is this MFA?"</span>
                      <span className="text-emerald-700 font-bold block">
                        ✅ Answer: NO! Both belong to the "Knowledge" factor. MFA strictly requires factors from two or more DIFFERENT categories (e.g. Knowledge + Possession).
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 7: PRACTICE EXERCISES & MODEL ANSWERS (ASSESSMENTS)   */}
        {/* ========================================================== */}
        {(viewMode === 'CONTINUOUS' || currentPage === 7) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                  {lang === 'ar' ? 'تدريبات الامتحانات الوزارية' : 'Official Assessments Practice'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy mt-1">
                  {lang === 'ar' ? '7. بنك تدريبات الامتحانات ونماذج الإجابة المعتمدة' : '7. Practice Exam Questions & Model Solutions'}
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs font-bold text-slate-400">
                <div className="text-primary-plum font-black">{lang === 'ar' ? 'الصفحة 7 من 7' : 'Page 7 of 7'}</div>
                <div>{lang === 'ar' ? 'تدريبات وحلول' : 'Exercises & Keys'}</div>
              </div>
            </div>

            {/* Questions Bank */}
            <div className="space-y-4">
              
              {/* Question 1: True / False */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-primary-navy">
                    {lang === 'ar' ? 'س1: ضع علامة (○) أمام العبارة الصحيحة وعلامة (×) أمام الخطأ:' : 'Q1: Mark (○) if true or (×) if false:'}
                  </span>
                  <button
                    onClick={() => toggleReveal('Q1')}
                    className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    {revealedQuestions['Q1']
                      ? (lang === 'ar' ? 'إخفاء الإجابة' : 'Hide Answer')
                      : (lang === 'ar' ? 'كشف الإجابة والتعليل' : 'Reveal Answer & Key')}
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-800 font-medium">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                    <span>1. {lang === 'ar' ? 'يتبادل اتصال HTTPS جميع بيانات الجلسة باستخدام التشفير بالمفتاح العام.' : 'HTTPS communication exchanges all data using public-key cryptography.'}</span>
                    <span className="font-bold text-rose-600 shrink-0">
                      {revealedQuestions['Q1'] ? '× (خطأ)' : '[  ]'}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                    <span>2. {lang === 'ar' ? 'المصادقة متعددة العوامل هي طريقة تجمع بين عاملين أو أكثر من الفئات الثلاث للمصادقة.' : 'MFA is a method that combines two or more of the three factors of authentication.'}</span>
                    <span className="font-bold text-emerald-600 shrink-0">
                      {revealedQuestions['Q1'] ? '○ (صواب)' : '[  ]'}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                    <span>3. {lang === 'ar' ? 'يُعد تعيين كلمتي مرور مختلفتين مثالاً على المصادقة متعددة العوامل.' : 'An example of multi-factor authentication is setting two passwords.'}</span>
                    <span className="font-bold text-rose-600 shrink-0">
                      {revealedQuestions['Q1'] ? '× (خطأ)' : '[  ]'}
                    </span>
                  </div>
                </div>

                {revealedQuestions['Q1'] && (
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 font-medium">
                    <strong className="font-bold block mb-0.5">{lang === 'ar' ? 'التعليل الوزاري المعتمد:' : 'Official Justification:'}</strong>
                    {lang === 'ar'
                      ? 'الفقرة 1 خاطئة لأن تبادل كل البيانات بالمفتاح العام سيكون بطيئاً جداً، لذا يُستخدم المفتاح المشترك لبيانات الجلسة. الفقرة 3 خاطئة لأن كلمتي المرور كلاهما من فئة "المعرفة".'
                      : 'Item 1 is false because encrypting all data with public key would be slow; common key is used instead. Item 3 is false because both passwords are "knowledge" factors.'}
                  </div>
                )}
              </div>

              {/* Question 2: MCQ */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-primary-navy">
                    {lang === 'ar' ? 'س2: اختر الإجابة الصحيحة من بين الخيارات:' : 'Q2: Multiple Choice Question:'}
                  </span>
                  <button
                    onClick={() => toggleReveal('Q2')}
                    className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    {revealedQuestions['Q2']
                      ? (lang === 'ar' ? 'إخفاء الإجابة' : 'Hide Answer')
                      : (lang === 'ar' ? 'كشف الإجابة والتعليل' : 'Reveal Answer')}
                  </button>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                  <p className="font-bold text-slate-900">
                    {lang === 'ar'
                      ? 'في اتصال HTTPS، ما التقنية المستخدمة حتى يتمكن المتصفح والخادم من مشاركة مفتاح مشترك بأمان؟'
                      : 'In HTTPS communication, what cryptographic method is used so browser and server can safely share a common key?'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">A. {lang === 'ar' ? 'التشفير بالمفتاح المشترك' : 'Common-key Cryptography'}</div>
                    <div className={`p-2 rounded-lg border font-bold ${
                      revealedQuestions['Q2'] ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-50 border-slate-200'
                    }`}>
                      B. {lang === 'ar' ? 'التشفير بالمفتاح العام' : 'Public-key Cryptography'} {revealedQuestions['Q2'] && '✓'}
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">C. {lang === 'ar' ? 'جدار الحماية' : 'Firewall'}</div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">D. {lang === 'ar' ? 'بروتوكول HTTP العادي' : 'Plain HTTP'}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Motivational Footer Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-navy to-primary-plum text-white text-center space-y-1 shadow-md">
              <Sparkles size={20} className="mx-auto text-amber-300" />
              <h4 className="font-black text-sm">
                {lang === 'ar' ? 'أنت الآن جاهز بنسبة 100% لحصد الدرجة النهائية في الدرس الأول!' : 'You are now 100% ready to ace Lesson 1!'}
              </h4>
              <p className="text-xs text-white/80">
                {lang === 'ar'
                  ? 'انتقل الآن لتبويب "أسئلة الوزارة الرسمية" و "أسئلة التحديات" لحل كافة الأسئلة بثقة تامة.'
                  : 'Now switch to "Official Assessments" and "Exam Challenges" to practice with total confidence.'}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
