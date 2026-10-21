import { useState } from 'react';
import {
  Printer,
  Shield,
  Lock,
  Server,
  Laptop,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Network,
  Globe,
  Database,
  Eye,
  KeyRound,
  FileText
} from 'lucide-react';

export default function Lesson2BookletPdf() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [viewMode, setViewMode] = useState<'PAGES' | 'CONTINUOUS'>('PAGES');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeNetworkComponent, setActiveNetworkComponent] = useState<'FIREWALL' | 'DMZ' | 'VPN' | 'INTERNAL_DB'>('FIREWALL');
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalPages = 6;

  return (
    <div className="space-y-6 max-w-5xl mx-auto print:max-w-none print:m-0 print:p-0">

      {/* ============================================================ */}
      {/* TOOLBAR: Mode Switcher, Language Toggle, Page Nav, Print CTA */}
      {/* ============================================================ */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 print:hidden">
        {/* Left: Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-700 to-primary-navy text-white flex items-center justify-center shadow-md">
            <Network size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                PDF Booklet Style
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {lang === 'ar' ? 'الوحدة 2 — الدرس 2' : 'Unit 2 — Lesson 2'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-primary-navy">
              {lang === 'ar'
                ? 'ملزمة الشرح والنوتات الذكية — تصميم أمان الشبكات'
                : 'Smart Study Booklet — Network Security Design'}
            </h2>
          </div>
        </div>

        {/* Right: Controls */}
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
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('PAGES')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'PAGES'
                  ? 'bg-white text-primary-navy shadow-sm font-black'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'صفحات (PDF)' : 'Pages View'}
            </button>
            <button
              onClick={() => setViewMode('CONTINUOUS')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'CONTINUOUS'
                  ? 'bg-white text-primary-navy shadow-sm font-black'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'مستمر (شاشة كاملة)' : 'Continuous'}
            </button>
          </div>

          {/* Print / Save PDF CTA */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs rounded-xl shadow-md shadow-teal-600/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer size={15} />
            <span>{lang === 'ar' ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
          </button>
        </div>
      </div>

      {/* Pagination Bar (when in PAGES mode) */}
      {viewMode === 'PAGES' && (
        <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {lang === 'ar' ? 'الصفحة' : 'Page'}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-black border border-teal-200">
              {currentPage} / {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  currentPage === p
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'cursor-pointer hover:bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <ChevronRight size={16} />
              <span className="hidden sm:inline">{lang === 'ar' ? 'السابق' : 'Prev'}</span>
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'cursor-pointer hover:bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <span className="hidden sm:inline">{lang === 'ar' ? 'التالي' : 'Next'}</span>
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* BOOKLET CONTENT PAGES CONTAINER                              */}
      {/* ============================================================ */}
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none print:rounded-none"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >

        {/* ------------------------------------------------------------ */}
        {/* PAGE 1: COVER & TOPOLOGY MAP                                 */}
        {/* ------------------------------------------------------------ */}
        {(viewMode === 'CONTINUOUS' || currentPage === 1) && (
          <div className="p-8 sm:p-12 border-b border-slate-200 print:page-break-after print:border-none">
            {/* Header / Meta */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-700 to-primary-navy flex items-center justify-center text-white shadow-md">
                  <Shield size={26} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-primary-navy">
                    {lang === 'ar' ? 'تصميم أمان الشبكات' : 'Network Security Design'}
                  </h1>
                  <p className="text-xs text-slate-500 font-semibold">
                    {lang === 'ar'
                      ? 'البكالوريا المصرية — مادة تكنولوجيا المعلومات والاتصالات'
                      : 'Egyptian Baccalaureate — ICT Curriculum'}
                  </p>
                </div>
              </div>
              <div className="text-left" dir="ltr">
                <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-black">
                  Unit 2 · Lesson 2
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-1">D-Learn Series</p>
              </div>
            </div>

            {/* Overview Banner */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-primary-navy p-6 rounded-2xl text-white mb-8 shadow-lg">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>{lang === 'ar' ? 'ملخص الدرس السريع للمذاكرة' : 'Quick Study Digest'}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                {lang === 'ar'
                  ? 'يتناول هذا الدرس تأمين بيئات الشبكات الحديثة ضد الهجمات الإلكترونية من خلال: جدار الحماية (Firewall)، الشبكات الافتراضية الخاصة (VPN)، المناطق المعزولة (DMZ)، استراتيجية الدفاع في العمق، ونموذج انعدام الثقة (Zero Trust).'
                  : 'This lesson covers securing modern network environments against cyber threats via: Firewalls, Virtual Private Networks (VPN), Demilitarized Zones (DMZ), Defense in Depth, and the Zero Trust architecture.'}
              </p>
            </div>

            {/* Interactive Network Topology Map */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-black text-primary-navy flex items-center gap-2">
                  <Network size={18} className="text-teal-700" />
                  <span>
                    {lang === 'ar'
                      ? 'خارطة التوبولوجيا التفاعلية للشبكة الآمنة (Firewall + DMZ + VPN)'
                      : 'Interactive Network Topology Architecture'}
                  </span>
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  {lang === 'ar' ? 'انقر على أي مكوّن لاستعراض وظيفته' : 'Click components to inspect'}
                </span>
              </div>

              {/* Component Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { id: 'FIREWALL', titleAr: 'جدار الحماية (Firewall)', titleEn: 'Perimeter Firewall' },
                  { id: 'DMZ', titleAr: 'المنطقة المعزولة (DMZ)', titleEn: 'Demilitarized Zone' },
                  { id: 'VPN', titleAr: 'نفق الـ VPN المشفر', titleEn: 'Encrypted VPN Tunnel' },
                  { id: 'INTERNAL_DB', titleAr: 'الشبكة الداخلية (LAN/DB)', titleEn: 'Protected Internal LAN' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNetworkComponent(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      activeNetworkComponent === item.id
                        ? 'bg-teal-700 text-white border-teal-800 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </button>
                ))}
              </div>

              {/* Visual Architecture Box */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
                  
                  {/* Step 1: Internet / Attacker */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                    <Globe size={32} className="mx-auto text-amber-400 mb-2" />
                    <h4 className="font-black text-sm text-amber-300">
                      {lang === 'ar' ? 'شبكة الإنترنت العامة' : 'Public Internet'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {lang === 'ar' ? 'شبكة غير موثوقة (مخاطر وتنصت)' : 'Untrusted Zone (Attacks & Eavesdropping)'}
                    </p>
                  </div>

                  {/* Step 2: Perimeter Firewall */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    activeNetworkComponent === 'FIREWALL'
                      ? 'bg-teal-900/60 border-teal-400 ring-2 ring-teal-400/30'
                      : 'bg-slate-800/80 border-slate-700'
                  }`}>
                    <Shield size={32} className="mx-auto text-teal-400 mb-2" />
                    <h4 className="font-black text-sm text-teal-300">
                      {lang === 'ar' ? 'جدار الحماية الخارجي' : 'Perimeter Firewall'}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {lang === 'ar' ? 'فلترة الحزم والمنافذ وفق قواعد Rules' : 'Filters packets & ports based on rules'}
                    </p>
                  </div>

                  {/* Step 3: DMZ */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    activeNetworkComponent === 'DMZ'
                      ? 'bg-primary-plum/40 border-pink-400 ring-2 ring-pink-400/30'
                      : 'bg-slate-800/80 border-slate-700'
                  }`}>
                    <Server size={32} className="mx-auto text-pink-400 mb-2" />
                    <h4 className="font-black text-sm text-pink-300">
                      {lang === 'ar' ? 'المنطقة المعزولة (DMZ)' : 'DMZ Buffer Zone'}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {lang === 'ar' ? 'خوادم الويب والبريد المتاحة للجمهور' : 'Public-facing Web & Mail Servers'}
                    </p>
                  </div>

                  {/* Step 4: Internal LAN & DB */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    activeNetworkComponent === 'INTERNAL_DB'
                      ? 'bg-emerald-900/60 border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'bg-slate-800/80 border-slate-700'
                  }`}>
                    <Database size={32} className="mx-auto text-emerald-400 mb-2" />
                    <h4 className="font-black text-sm text-emerald-300">
                      {lang === 'ar' ? 'الشبكة الداخلية وقواعد البيانات' : 'Internal LAN & Database'}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {lang === 'ar' ? 'بيانات حساسة لا تصل إليها الإنترنت مباشرة' : 'Sensitive assets isolated behind 2nd firewall'}
                    </p>
                  </div>
                </div>

                {/* Remote VPN Tunnel Connector */}
                <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between transition-all ${
                  activeNetworkComponent === 'VPN'
                    ? 'bg-teal-950 border-teal-400'
                    : 'bg-slate-800/50 border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <Laptop size={20} className="text-teal-400" />
                    <span className="text-xs font-bold text-slate-300">
                      {lang === 'ar'
                        ? 'الموظف عن بُعد ← نفق مشفر (VPN Tunnel) يمر عبر الإنترنت بسلامة وسرية تامة إلى الشبكة الداخلية'
                        : 'Remote Worker ← Encrypted VPN Tunnel bypassing public internet threats straight into LAN'}
                    </span>
                  </div>
                  <Lock size={16} className="text-teal-400" />
                </div>
              </div>
            </div>

            {/* Smart Capsule 1 */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-amber-900 text-xs sm:text-sm">
                    {lang === 'ar' ? '💡 كبسولة الامتحان الذكية: القاعدة الذهبية' : '💡 Exam Capsule: Golden Rule'}
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed font-semibold mt-1">
                    {lang === 'ar'
                      ? 'إذا سألك عن "أين نضع خوادم قواعد البيانات الحساسة؟" ← إياك أن تجيب بـ DMZ! قواعد البيانات توضع دائماً في "الشبكة الداخلية"، بينما خوادم الويب والبريد الموجهة للعامة هي التي توضع في الـ DMZ.'
                      : 'If asked: "Where do we place sensitive database servers?" ← Never say DMZ! Database servers always reside in the protected Internal Network; only public-facing web/mail servers go in the DMZ.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PAGE 2: FIREWALL & VPN DEEP DIVE                              */}
        {/* ------------------------------------------------------------ */}
        {(viewMode === 'CONTINUOUS' || currentPage === 2) && (
          <div className="p-8 sm:p-12 border-b border-slate-200 print:page-break-after print:border-none">
            <h2 className="text-lg sm:text-xl font-black text-primary-navy mb-6 flex items-center gap-2">
              <Shield size={20} className="text-teal-700" />
              <span>
                {lang === 'ar'
                  ? 'القسم الأول: جدار الحماية (Firewall) والشبكة الافتراضية الخاصة (VPN)'
                  : 'Section 1: Firewalls and Virtual Private Networks (VPN)'}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: Firewall */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-primary-navy text-base">
                      {lang === 'ar' ? '1. جدار الحماية (Firewall)' : '1. Firewall'}
                    </h3>
                    <span className="text-[11px] font-bold text-teal-700">
                      {lang === 'ar' ? 'حارس بوابة مدخل الشبكة' : 'Gatekeeper of Network Entry'}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                  {lang === 'ar'
                    ? 'جهاز أو برنامج يراقب حركة المرور الواردة والصادرة للشبكة، ويقرر السماح بها أو حظرها وفق قواعد أمنية محددة مسبقاً (Security Rules).'
                    : 'A hardware or software system that inspects inbound and outbound network traffic, permitting or blocking packets according to predetermined security rules.'}
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 mb-4 font-semibold text-slate-700">
                  <div className="text-primary-navy font-black">
                    {lang === 'ar' ? '🔍 معايير الفحص في جدار الحماية:' : '🔍 Firewall Inspection Criteria:'}
                  </div>
                  <div>• {lang === 'ar' ? 'عنوان IP المصدر والوجهة (Source & Dest IP)' : 'Source and destination IP addresses'}</div>
                  <div>• {lang === 'ar' ? 'أرقام المنافذ (Port Numbers مثل 80 للـ HTTP و 443 للـ HTTPS)' : 'Port numbers (e.g. 80 HTTP, 443 HTTPS)'}</div>
                  <div>• {lang === 'ar' ? 'بروتوكول النقل (TCP / UDP)' : 'Transport protocol (TCP / UDP)'}</div>
                </div>

                <div className="mt-auto p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 font-semibold">
                  <strong>{lang === 'ar' ? '🎯 التشبيه التوضيحي:' : '🎯 Analogy:'}</strong>{' '}
                  {lang === 'ar'
                    ? 'حارس أمن المبنى الذي يتحقق من بطاقة كل زائر ومطابقتها مع قائمة المصرح لهم بالدخول.'
                    : 'A building security guard checking visitor IDs against an authorized entry list.'}
                </div>
              </div>

              {/* Card 2: VPN */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-plum/20 text-primary-plum flex items-center justify-center font-bold">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-primary-navy text-base">
                      {lang === 'ar' ? '2. الشبكة الافتراضية الخاصة (VPN)' : '2. Virtual Private Network (VPN)'}
                    </h3>
                    <span className="text-[11px] font-bold text-primary-plum">
                      {lang === 'ar' ? 'النفق المشفر عبر الشبكات العامة' : 'Encrypted Tunnel Over Public Networks'}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                  {lang === 'ar'
                    ? 'تقنية تنشئ نفقاً منطقياً مشفراً عبر شبكة عامة (كالإنترنت)، تضمن سرية البيانات وسلامتها وتمنع التنصت (Eavesdropping) والعبث.'
                    : 'A technology that creates an encrypted logical tunnel over public networks like the internet, ensuring data confidentiality, integrity, and eavesdropping prevention.'}
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 mb-4 font-semibold text-slate-700">
                  <div className="text-primary-navy font-black">
                    {lang === 'ar' ? '🔒 فوائد الـ VPN الأساسية في الامتحان:' : '🔒 Core VPN Benefits for Exams:'}
                  </div>
                  <div>• {lang === 'ar' ? 'حماية بيانات الموظفين أثناء العمل عن بُعد (Telework)' : 'Securing telework and remote employee connections'}</div>
                  <div>• {lang === 'ar' ? 'الحماية من التنصت عند استخدام شبكات Wi-Fi العامة المفتوحة' : 'Protection against sniffing on public Wi-Fi'}</div>
                  <div>• {lang === 'ar' ? 'تمثيل طبقة "مسار الاتصال" في استراتيجية الدفاع في العمق' : 'Represents "Communication Path" layer in defense in depth'}</div>
                </div>

                <div className="mt-auto p-3 bg-primary-plum/10 border border-primary-plum/30 rounded-xl text-xs text-primary-navy font-semibold">
                  <strong>{lang === 'ar' ? '🎯 التشبيه التوضيحي:' : '🎯 Analogy:'}</strong>{' '}
                  {lang === 'ar'
                    ? 'سيارة مصفحة تسير في نفق سري معزول تحت طريق عام مزدحم يراك فيه الجميع.'
                    : 'An armored vehicle driving through an exclusive tunnel beneath a crowded public highway.'}
                </div>
              </div>
            </div>

            {/* Smart Capsule 2 */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <h4 className="font-black text-teal-900 text-xs sm:text-sm flex items-center gap-2 mb-1">
                <CheckCircle2 size={16} />
                <span>{lang === 'ar' ? 'إذا سألك كذا قل كذا (كبسولة الحفظ السريع):' : 'If Asked This, Say That (Exam Capsule):'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-teal-950 font-semibold mt-2">
                <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                  <span className="text-teal-700 font-black">{lang === 'ar' ? 'إذا سألك:' : 'If asked:'}</span>{' '}
                  {lang === 'ar' ? 'التحكم بالمرور بالسماح أو الحظر بناءً على قواعد؟' : 'Filtering traffic based on predefined rules?'}
                  <div className="text-primary-navy font-black mt-1">
                    ← {lang === 'ar' ? 'قل: جدار الحماية (Firewall)' : 'Say: Firewall'}
                  </div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                  <span className="text-teal-700 font-black">{lang === 'ar' ? 'إذا سألك:' : 'If asked:'}</span>{' '}
                  {lang === 'ar' ? 'تأمين الاتصال عن بعد ومنع التنصت عبر الإنترنت؟' : 'Securing remote communication & preventing eavesdropping?'}
                  <div className="text-primary-navy font-black mt-1">
                    ← {lang === 'ar' ? 'قل: الشبكة الافتراضية الخاصة (VPN)' : 'Say: VPN'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PAGE 3: DMZ & DEFENSE IN DEPTH                                */}
        {/* ------------------------------------------------------------ */}
        {(viewMode === 'CONTINUOUS' || currentPage === 3) && (
          <div className="p-8 sm:p-12 border-b border-slate-200 print:page-break-after print:border-none">
            <h2 className="text-lg sm:text-xl font-black text-primary-navy mb-6 flex items-center gap-2">
              <Layers size={20} className="text-teal-700" />
              <span>
                {lang === 'ar'
                  ? 'القسم الثاني: المنطقة المعزولة (DMZ) والدفاع في العمق'
                  : 'Section 2: Demilitarized Zone (DMZ) & Defense in Depth'}
              </span>
            </h2>

            {/* DMZ Concept */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Server size={20} />
                </div>
                <div>
                  <h3 className="font-black text-primary-navy text-base">
                    {lang === 'ar' ? 'المنطقة المعزولة (DMZ - Demilitarized Zone)' : 'Demilitarized Zone (DMZ)'}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    {lang === 'ar' ? 'درع عزل الخوادم العامة عن الشبكة الداخلية' : 'Buffer zone isolating public servers from internal LAN'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                {lang === 'ar'
                  ? 'شبكة فرعية معزولة منطقياً توضع فيها الخوادم المتاحة للجمهور (مثل خادم الويب وخادم البريد). الهدف الأساسي: إذا تمكن مخترق من اختراق خادم الويب، لا يستطيع الوصول مباشرة إلى الشبكة الداخلية أو قواعد بيانات المؤسسة الحساسة.'
                  : 'An isolated subnetwork hosting public-facing servers (web, email). Its purpose: if a public server is compromised, attackers cannot immediately pivot to confidential internal assets.'}
              </p>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-semibold">
                <strong>{lang === 'ar' ? '⚠️ خطأ شائع يقع فيه الطلاب:' : '⚠️ Common Student Pitfall:'}</strong>{' '}
                {lang === 'ar'
                  ? 'الاعتقاد بأن قواعد البيانات توضع في DMZ! خوادم قواعد البيانات الحساسة توضع حصراً في الشبكة الداخلية المحمية خلف جدار الحماية الداخلي.'
                  : 'Thinking database servers go into DMZ! Databases are always strictly isolated in the internal network behind a secondary internal firewall.'}
              </div>
            </div>

            {/* Defense in Depth Concept */}
            <div className="mb-8">
              <h3 className="font-black text-primary-navy text-base mb-3 flex items-center gap-2">
                <Shield size={18} className="text-teal-700" />
                <span>
                  {lang === 'ar'
                    ? 'استراتيجية الدفاع في العمق (Defense in Depth) — القلعة متعددة الأسوار'
                    : 'Defense in Depth Strategy — Multi-Layered Protection'}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                {lang === 'ar'
                  ? 'استراتيجية أمنية تطبق طبقات متعددة ومتتالية من الضوابط الدفاعية. الفلسفة الأساسية: "لا تعتمد على خط دفاع واحد أبداً؛ إذا سقطت طبقة أو فشلت، تتولى الطبقات التالية احتواء الخطر ومنع الاختراق الكامل".'
                  : 'A security strategy applying multiple redundant layers of defense. The core philosophy: never rely on a single defensive barrier; if one layer is breached, subsequent layers contain the threat.'}
              </p>

              {/* Table of 4 Layers */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-xs text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <thead className="bg-slate-900 text-white font-black">
                    <tr>
                      <th className="p-3">{lang === 'ar' ? 'رقم الطبقة' : 'Layer'}</th>
                      <th className="p-3">{lang === 'ar' ? 'اسم الطبقة في المنهج' : 'Layer Name'}</th>
                      <th className="p-3">{lang === 'ar' ? 'التقنية الأمنية المطبقة' : 'Security Measure'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الهدف الوظيفي' : 'Objective'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-700">
                    <tr className="bg-white hover:bg-slate-50">
                      <td className="p-3 font-black text-teal-700">1</td>
                      <td className="p-3 font-bold text-primary-navy">
                        {lang === 'ar' ? 'مدخل الشبكة (Network Entry)' : 'Network Entry'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                          {lang === 'ar' ? 'جدار الحماية (Firewall)' : 'Firewall'}
                        </span>
                      </td>
                      <td className="p-3">
                        {lang === 'ar' ? 'حظر المنافذ والوصول غير المصرح به' : 'Block unauthorized ports & connections'}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-slate-50">
                      <td className="p-3 font-black text-teal-700">2</td>
                      <td className="p-3 font-bold text-primary-navy">
                        {lang === 'ar' ? 'مسار الاتصال (Communication Path)' : 'Communication Path'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-primary-plum/10 text-primary-plum border border-primary-plum/30 font-bold">
                          {lang === 'ar' ? 'الـ VPN والتشفير' : 'VPN & Encryption'}
                        </span>
                      </td>
                      <td className="p-3">
                        {lang === 'ar' ? 'منع التنصت وحماية البيانات المنقولة' : 'Prevent sniffing & encrypt in-flight data'}
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50">
                      <td className="p-3 font-black text-teal-700">3</td>
                      <td className="p-3 font-bold text-primary-navy">
                        {lang === 'ar' ? 'وضع الخوادم (Server Placement)' : 'Server Placement'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-200 font-bold">
                          {lang === 'ar' ? 'المنطقة المعزولة (DMZ)' : 'DMZ Buffer'}
                        </span>
                      </td>
                      <td className="p-3">
                        {lang === 'ar' ? 'عزل الخوادم العامة وحماية قواعد البيانات' : 'Isolate public web servers from DBs'}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-slate-50">
                      <td className="p-3 font-black text-teal-700">4</td>
                      <td className="p-3 font-bold text-primary-navy">
                        {lang === 'ar' ? 'الأجهزة الطرفية (Endpoints)' : 'Endpoints'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          {lang === 'ar' ? 'مضاد الفيروسات والتحديثات' : 'Antivirus & OS Patches'}
                        </span>
                      </td>
                      <td className="p-3">
                        {lang === 'ar' ? 'حماية حواسيب الموظفين من البرمجيات الخبيثة' : 'Protect workstations against malware'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PAGE 4: ZERO TRUST ARCHITECTURE                               */}
        {/* ------------------------------------------------------------ */}
        {(viewMode === 'CONTINUOUS' || currentPage === 4) && (
          <div className="p-8 sm:p-12 border-b border-slate-200 print:page-break-after print:border-none">
            <h2 className="text-lg sm:text-xl font-black text-primary-navy mb-6 flex items-center gap-2">
              <KeyRound size={20} className="text-teal-700" />
              <span>
                {lang === 'ar'
                  ? 'القسم الثالث: نموذج انعدام الثقة (Zero Trust Architecture)'
                  : 'Section 3: Zero Trust Architecture'}
              </span>
            </h2>

            {/* Why Traditional Perimeter Fell */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <h3 className="font-black text-primary-navy text-sm sm:text-base mb-2">
                {lang === 'ar'
                  ? 'لماذا سقط نموذج المحيط الأمني التقليدي (Perimeter Security)؟'
                  : 'Why Did Traditional Perimeter Security Fail?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-3">
                {lang === 'ar'
                  ? 'كان النموذج التقليدي يفترض أن ما بداخل جدران الشركة آمن وموثوق تماماً وما بالخارج خطر. انهار هذا المفهوم بسبب عاملين رئيسيين:'
                  : 'The legacy perimeter model assumed everything inside the company walls was safe. This model collapsed due to two drivers:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-teal-700 mb-1">
                    ☁️ {lang === 'ar' ? '1. الحوسبة السحابية (Cloud)' : '1. Cloud Computing'}
                  </div>
                  <div>
                    {lang === 'ar'
                      ? 'البيانات والتطبيقات لم تعد مخزنة داخل مبنى الشركة بل في مراكز بيانات خارجية عبر السحابة.'
                      : 'Data and apps moved outside physical corporate premises into cloud datacenters.'}
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-teal-700 mb-1">
                    🏠 {lang === 'ar' ? '2. العمل عن بُعد (Telework)' : '2. Remote & Mobile Work'}
                  </div>
                  <div>
                    {lang === 'ar'
                      ? 'الموظفون يتصلون من منازلهم والمقاهي باستخدام أجهزة متنوعة خارج نطاق المحيط المادي.'
                      : 'Employees access resources from homes, cafés, and mobile devices beyond physical boundaries.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Zero Trust Principles */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-teal-800/50 mb-8 shadow-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase mb-3">
                <Sparkles size={14} />
                <span>{lang === 'ar' ? 'الشعار الذهبي لـ Zero Trust' : 'Golden Motto'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-2">
                {lang === 'ar'
                  ? '«لا تثق بأحد إطلاقاً، وتحقق دائماً من كل شيء»'
                  : '“Never Trust, Always Verify”'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mb-4 leading-relaxed">
                {lang === 'ar'
                  ? 'لا يُمنح أي مستخدم أو جهاز ثقة تلقائية لمجرد وجوده داخل الشبكة. يتم فحص كل طلب وصول وفق 3 محاور:'
                  : 'Zero automatic trust is granted based on network location. Every access request is verified along 3 pillars:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-teal-400 font-black text-sm mb-1">
                    {lang === 'ar' ? '1. الهوية' : '1. Identity'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {lang === 'ar' ? 'المصادقة متعددة العوامل (MFA)' : 'Multi-Factor Auth (MFA)'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-teal-400 font-black text-sm mb-1">
                    {lang === 'ar' ? '2. الصلاحيات' : '2. Privileges'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {lang === 'ar' ? 'الحد الأدنى من الامتيازات (Least Privilege)' : 'Least Privilege principle'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-teal-400 font-black text-sm mb-1">
                    {lang === 'ar' ? '3. السياق' : '3. Context'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {lang === 'ar' ? 'حالة الجهاز، الموقع، ووقت الطلب' : 'Device health, geo-location, time'}
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table: Traditional vs Zero Trust */}
            <div className="mb-6">
              <h3 className="font-black text-primary-navy text-sm sm:text-base mb-3">
                {lang === 'ar'
                  ? 'جدول المقارنة الحاسم للامتحان: الأمان التقليدي vs نموذج Zero Trust'
                  : 'Definitive Comparison Table: Traditional Perimeter vs Zero Trust'}
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-xs text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  <thead className="bg-slate-900 text-white font-black">
                    <tr>
                      <th className="p-3">{lang === 'ar' ? 'وجه المقارنة' : 'Criterion'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الأمان التقليدي (Perimeter)' : 'Traditional Perimeter'}</th>
                      <th className="p-3 bg-teal-900">{lang === 'ar' ? 'نموذج انعدام الثقة (Zero Trust)' : 'Zero Trust'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-slate-700">
                    <tr className="bg-white">
                      <td className="p-3 font-bold text-primary-navy">{lang === 'ar' ? 'موقع الثقة' : 'Trust Location'}</td>
                      <td className="p-3 text-rose-700 font-bold">{lang === 'ar' ? 'ما بداخل الشبكة يُعامل كموثوق تلقائياً' : 'Inside network is trusted by default'}</td>
                      <td className="p-3 text-teal-800 font-bold bg-teal-50/50">{lang === 'ar' ? 'لا ثقة بأحد أبداً (الداخل والخارج متساويان)' : 'Never trust, regardless of location'}</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="p-3 font-bold text-primary-navy">{lang === 'ar' ? 'توقيت التحقق' : 'Verification Timing'}</td>
                      <td className="p-3">{lang === 'ar' ? 'مرة واحدة فقط عند مدخل الشبكة' : 'Once at perimeter entry'}</td>
                      <td className="p-3 text-teal-800 font-bold bg-teal-50/50">{lang === 'ar' ? 'تحقق مستمر وديناميكي عند كل طلب مورد' : 'Continuous re-verification for every access'}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-bold text-primary-navy">{lang === 'ar' ? 'نطاق الصلاحيات' : 'Privilege Scope'}</td>
                      <td className="p-3">{lang === 'ar' ? 'واسع (الوصول لكافة أرجاء الشبكة بعد الدخول)' : 'Broad lateral access granted'}</td>
                      <td className="p-3 text-teal-800 font-bold bg-teal-50/50">{lang === 'ar' ? 'الحد الأدنى المطلوب للمهمة فقط (Least Privilege)' : 'Strict Least Privilege on per-asset basis'}</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="p-3 font-bold text-primary-navy">{lang === 'ar' ? 'أثر الاختراق' : 'Breach Impact'}</td>
                      <td className="p-3 text-rose-700 font-bold">{lang === 'ar' ? 'المخترق يتحرك بحرية أفقياً (Lateral Movement)' : 'High risk of lateral movement'}</td>
                      <td className="p-3 text-teal-800 font-bold bg-teal-50/50">{lang === 'ar' ? 'حصر الخطر ومنع التحرك الأفقي تماماً' : 'Blast radius contained, lateral movement blocked'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PAGE 5: SMART EXAM CAPSULES & "SAY THIS"                     */}
        {/* ------------------------------------------------------------ */}
        {(viewMode === 'CONTINUOUS' || currentPage === 5) && (
          <div className="p-8 sm:p-12 border-b border-slate-200 print:page-break-after print:border-none">
            <h2 className="text-lg sm:text-xl font-black text-primary-navy mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-teal-700" />
              <span>
                {lang === 'ar'
                  ? 'كبسولات الامتحان الذكية: إذا سألك كذا قل كذا 🎯'
                  : 'Smart Exam Capsules: "If Asked This, Say That" 🎯'}
              </span>
            </h2>

            <div className="space-y-4 mb-8">
              {[
                {
                  triggerAr: 'نظام يراقب حركة مرور الشبكة ويسمح بها أو يحظرها وفق قواعد محددة مسبقاً (Rules)؟',
                  triggerEn: 'System monitoring network traffic and permitting/blocking based on rules?',
                  answerAr: 'جدار الحماية (Firewall) — وظيفته حظر المنافذ والاتصالات غير المصرح بها.',
                  answerEn: 'Firewall — filters traffic based on pre-defined IP, port, and protocol rules.'
                },
                {
                  triggerAr: 'وسيلة لتأمين العمل عن بُعد عبر شبكة الإنترنت العامة وحماية البيانات من التنصت؟',
                  triggerEn: 'Securing telework over public internet and preventing eavesdropping?',
                  answerAr: 'الشبكة الافتراضية الخاصة (VPN) — تنشئ نفقاً منطقياً مشفراً عبر الشبكة العامة.',
                  answerEn: 'Virtual Private Network (VPN) — establishes an encrypted logical tunnel.'
                },
                {
                  triggerAr: 'منطقة شبكية فرعية توضع فيها خوادم الويب الموجهة للجمهور لعزلها عن الشبكة الداخلية؟',
                  triggerEn: 'Subnetwork hosting public servers to isolate them from internal LAN?',
                  answerAr: 'المنطقة المعزولة (DMZ) — تمنع المخترق من الوصول لقواعد البيانات إذا اخترق خادم الويب.',
                  answerEn: 'Demilitarized Zone (DMZ) — contains breaches and protects internal databases.'
                },
                {
                  triggerAr: 'استراتيجية وضع طبقات أمنية متعددة ومتتالية بحيث إذا فشلت واحدة تحمي الأخرى النظام؟',
                  triggerEn: 'Applying multiple redundant layers of security controls?',
                  answerAr: 'الدفاع في العمق (Defense in Depth) — يقضي على نقاط الفشل الفردية (Single Point of Failure).',
                  answerEn: 'Defense in Depth — eliminates single points of failure via layered controls.'
                },
                {
                  triggerAr: 'نهج أمني لا يمنح أي ثقة تلقائية ويتحقق باستمرار من الهوية والصلاحيات والسياق؟',
                  triggerEn: 'Security approach granting zero automatic trust and verifying context continuously?',
                  answerAr: 'نموذج انعدام الثقة (Zero Trust) — شعاره: "لا تثق بأحد إطلاقاً، وتحقق دائماً".',
                  answerEn: 'Zero Trust Architecture — motto: "Never Trust, Always Verify".'
                },
              ].map((capsule, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-teal-700 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-500 mb-1">
                        {lang === 'ar' ? 'سؤال الامتحان المحتمل:' : 'Potential Exam Question:'}
                      </div>
                      <div className="text-sm font-black text-primary-navy mb-2">
                        {lang === 'ar' ? capsule.triggerAr : capsule.triggerEn}
                      </div>
                      <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-950 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-teal-700 flex-shrink-0" />
                        <span>
                          <strong className="text-teal-800">{lang === 'ar' ? 'الإجابة النموذجية: ' : 'Model Answer: '}</strong>
                          {lang === 'ar' ? capsule.answerAr : capsule.answerEn}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PAGE 6: SAMPLE EXAM DRILLS & VERIFICATION                    */}
        {/* ------------------------------------------------------------ */}
        {(viewMode === 'CONTINUOUS' || currentPage === 6) && (
          <div className="p-8 sm:p-12 print:border-none">
            <h2 className="text-lg sm:text-xl font-black text-primary-navy mb-6 flex items-center gap-2">
              <FileText size={20} className="text-teal-700" />
              <span>
                {lang === 'ar'
                  ? 'تدريبات ونماذج أسئلة امتحانية للتقييم الذاتي السريع'
                  : 'Self-Check Practice Questions with Model Answers'}
              </span>
            </h2>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-teal-100 text-teal-800">
                    {lang === 'ar' ? 'سؤال اختيار من متعدد (MCQ)' : 'MCQ Question'}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Q1</span>
                </div>
                <h4 className="font-black text-sm sm:text-base text-primary-navy mb-3">
                  {lang === 'ar'
                    ? 'أي مما يلي يصف بدقة وظيفة المنطقة المعزولة (DMZ) في حماية الشبكة؟'
                    : 'Which statement accurately describes the function of a Demilitarized Zone (DMZ)?'}
                </h4>
                <div className="space-y-2 text-xs font-semibold text-slate-700 mb-4">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    أ) {lang === 'ar' ? 'فحص جميع الملفات الواردة وحذف الفيروسات تلقائياً' : 'A) Scanning all files and deleting viruses'}
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 font-bold">
                    ب) {lang === 'ar' ? 'فصل الخوادم المتاحة للجمهور عن الشبكة الداخلية للحد من أثر أي اختراق' : 'B) Isolating public-facing servers from internal network to contain breaches'}
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    ج) {lang === 'ar' ? 'تخزين قواعد البيانات المصرفية السرية في منطقة يسهل وصول الجمهور إليها' : 'C) Storing secret banking databases in an easy-to-reach zone'}
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    د) {lang === 'ar' ? 'تشفير الاتصال بين أجهزة الموظفين في منازلهم وخادم الشركة' : 'D) Encrypting connections between employee laptops and company servers'}
                  </div>
                </div>

                <button
                  onClick={() => toggleReveal('l2-q1')}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>
                    {revealedQuestions['l2-q1']
                      ? (lang === 'ar' ? 'إخفاء الشرح' : 'Hide Explanation')
                      : (lang === 'ar' ? 'إظهار الحل والتعليل' : 'Show Answer & Rationale')}
                  </span>
                </button>

                {revealedQuestions['l2-q1'] && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-teal-200 text-xs text-teal-950 font-semibold space-y-1">
                    <p className="font-black text-teal-800">
                      {lang === 'ar' ? 'الإجابة الصحيحة: (ب)' : 'Correct Answer: (B)'}
                    </p>
                    <p className="text-slate-600">
                      {lang === 'ar'
                        ? 'التعليل: الـ DMZ تعمل كمنطقة عازلة تحتضن الخوادم المعرضة للإنترنت (كالويب والبريد) لحماية الشبكة الداخلية وقواعد البيانات الحساسة من التعرض المباشر للهجمات.'
                        : 'Rationale: The DMZ acts as a buffer zone hosting internet-facing servers, protecting internal sensitive systems from direct assault.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary-plum/20 text-primary-plum">
                    {lang === 'ar' ? 'سؤال مقالي تحليلي' : 'Analytical Written Question'}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Q2</span>
                </div>
                <h4 className="font-black text-sm sm:text-base text-primary-navy mb-3">
                  {lang === 'ar'
                    ? 'علل: لماذا لم يعد الاعتماد على جدار الحماية عند المحيط كافياً لتأمين المنشآت الحديثة، وما هو البديل الاستراتيجي؟'
                    : 'Explain why perimeter firewalls alone are no longer sufficient, and what is the strategic replacement?'}
                </h4>

                <button
                  onClick={() => toggleReveal('l2-q2')}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>
                    {revealedQuestions['l2-q2']
                      ? (lang === 'ar' ? 'إخفاء الإجابة النموذجية' : 'Hide Model Answer')
                      : (lang === 'ar' ? 'إظهار الإجابة النموذجية' : 'Show Model Answer')}
                  </span>
                </button>

                {revealedQuestions['l2-q2'] && (
                  <div className="mt-3 p-4 bg-white rounded-xl border border-teal-200 text-xs text-slate-800 font-semibold space-y-2">
                    <p className="font-black text-teal-800">
                      {lang === 'ar' ? 'عناصر الإجابة النموذجية الكاملة:' : 'Model Answer Components:'}
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700">
                      <li>
                        {lang === 'ar'
                          ? 'طمس الحدود المادية بسبب الحوسبة السحابية (البيانات خارج المقر) وانتشار العمل عن بُعد.'
                          : 'Perimeter blurring due to cloud computing and widespread remote work.'}
                      </li>
                      <li>
                        {lang === 'ar'
                          ? 'تجنب نقطة الفشل الفردية؛ فإذا اخترق المهاجم جدار الحماية، يتحرك بحرية في الشبكة الداخلية.'
                          : 'Eliminating single points of failure that permit lateral traversal once breached.'}
                      </li>
                      <li>
                        {lang === 'ar'
                          ? 'البديل الاستراتيجي: الجمع بين الدفاع في العمق (طبقات متعددة) ونموذج انعدام الثقة Zero Trust (التحقق المستمر من الهوية والصلاحيات والسياق).'
                          : 'Strategic replacement: combining Defense in Depth with Zero Trust continuous verification.'}
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
