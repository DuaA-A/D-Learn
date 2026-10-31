# -*- coding: utf-8 -*-
"""
Script to update frontend/src/ch2_lesson1_hardQ_part1.ts with full English translations
"""

content = '''// ============================================================
// Ch2 · Lesson 1 · Part 1 — أسئلة تحديات متقدمة (الجزء الأول)
// HTTPS · TLS · التشفير المتماثل · التشفير بالمفتاح العام
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية متقدمة — الجزء الأول ───────────────────────────

export const CH2_L1_HARD_WRITTEN_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-H-W-P1-01',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 6,
    question_ar: 'اشرح لماذا يستخدم TLS المفتاح العام في مصافحة الاتصال ثم يتحول للتشفير المتماثل لبيانات الجلسة. استعن بمفهومي الأمان والكفاءة.',
    question_en: 'Explain why TLS uses public-key cryptography in the initial handshake and then transitions to symmetric encryption for session data. Reference the concepts of security and efficiency.',
    ideal_answer_ar:
      'السبب المزدوج: الأمان + الكفاءة\\n\\n'
      + 'لماذا المفتاح العام في المصافحة أولاً (الأمان):\\n'
      + '- مشكلة تبادل المفاتيح: إذا أرادا تشفيراً متماثلاً من البداية، كيف يتفقان على المفتاح المشترك عبر قناة غير آمنة؟\\n'
      + '- الحل: المفتاح العام يحل هذه المشكلة — العميل يُشفِّر مفتاح الجلسة بالمفتاح العام للخادم، ولا أحد غير الخادم يستطيع فك تشفيره بمفتاحه الخاص.\\n'
      + '- النتيجة: مفتاح الجلسة يُنقَل بأمان بدون المرور عبر الشبكة بصورة مكشوفة.\\n\\n'
      + 'لماذا المتماثل بعد ذلك (الكفاءة):\\n'
      + '- التشفير بالمفتاح العام أبطأ بـ 100-1000 مرة من المتماثل حسابياً.\\n'
      + '- صفحة ويب واحدة قد تحتوي على MBs من البيانات — استخدام المفتاح العام لكلها سيُبطِّئ الإنترنت تماماً.\\n'
      + '- التشفير المتماثل (مثل AES-256) يُشفِّر مئات الـ MBs في الثانية.\\n\\n'
      + 'الخلاصة: الحل الهجين = أمان المفتاح العام لتبادل المفتاح + كفاءة المتماثل لتشفير البيانات.',
    ideal_answer_en:
      'Dual Imperative: Security + Efficiency\\n\\n'
      + '1. Why Public-Key in the Handshake (Security):\\n'
      + '- Key Distribution Dilemma: How can two strangers agree upon a shared secret across an untrusted, eavesdropped channel?\\n'
      + '- Solution: Asymmetric cryptography elegantly solves this—the client encrypts an ephemeral session key using the server public key; only the server private key can decrypt it.\\n'
      + '- Outcome: The secret session key is negotiated securely without ever exposing it plaintext on the wire.\\n\\n'
      + '2. Why Symmetric Encryption for Bulk Data (Efficiency):\\n'
      + '- Asymmetric algorithms (RSA, ECC) are 100 to 1,000 times slower due to heavy modular arithmetic.\\n'
      + '- Modern web traffic transfers megabytes of payload—relying purely on asymmetric ciphers would degrade internet performance into unresponsiveness.\\n'
      + '- Symmetric ciphers (e.g., AES-256-GCM) process hundreds of MBs per second with hardware acceleration (AES-NI).\\n\\n'
      + 'Conclusion: The Hybrid Architecture delivers the theoretical security of public-key exchange coupled with the raw throughput speed of symmetric encryption.',
    explanation_ar:
      'الإجابة المثالية تذكر السببين معاً: حل مشكلة تبادل المفاتيح (أمان) + السرعة في تشفير البيانات الضخمة (كفاءة).',
    explanation_en:
      'The ideal answer emphasizes both drivers: solving key exchange securely (Security) + high-throughput streaming performance (Efficiency).',
  },
  {
    id: 'CH2-L1-H-W-P1-02',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'حلّل: زارت طالبة موقعاً يعرض قفلاً أخضر وHTTPS. هل هذا يضمن أن محتوى الموقع موثوق؟ برر إجابتك مستخدماً مفهوم الشهادة الرقمية والتوقيع الرقمي.',
    question_en: 'Analyze: A student visited a website displaying a padlock icon and HTTPS. Does this guarantee the site content is trustworthy and benevolent? Justify using digital certificate and signature concepts.',
    ideal_answer_ar:
      'الإجابة: لا، HTTPS لا يضمن موثوقية المحتوى.\\n\\n'
      + 'ما يضمنه القفل الأخضر وHTTPS فعلاً:\\n'
      + '1. الاتصال مُشفَّر: لا أحد يستطيع قراءة البيانات المتبادلة أثناء النقل.\\n'
      + '2. هوية الخادم مُتحقَّق منها: الشهادة الرقمية تُثبت أن الخادم هو فعلاً صاحب النطاق.\\n\\n'
      + 'ما لا يضمنه:\\n'
      + '1. موثوقية المحتوى: مواقع التصيد الاحتيالي (Phishing) تستطيع الحصول على شهادة HTTPS مجانية (من Let\\'s Encrypt مثلاً).\\n'
      + '2. نظافة المحتوى: الموقع قد يحتوي على محتوى ضار أو مضلل مع شهادة صالحة.\\n'
      + '3. نوايا مالك الموقع: الشهادة تُثبت فقط ملكية النطاق، لا أخلاق مالكه.\\n\\n'
      + 'مثال: موقع "paypa1.com" (باستبدال L بـ 1) يمكنه الحصول على HTTPS مع شهادة صالحة.\\n\\n'
      + 'الخلاصة: HTTPS = خط نقل آمن، لكن ما يُنقَل عبره قد يكون خطيراً.',
    ideal_answer_en:
      'Verdict: No, HTTPS does NOT guarantee that website content is legitimate or trustworthy.\\n\\n'
      + 'What the Padlock and HTTPS Actually Guarantee:\\n'
      + '1. Encryption in Transit: Data cannot be eavesdropped or modified by intermediate network eavesdroppers.\\n'
      + '2. Authenticated Domain Ownership: The digital certificate proves that the server possesses the cryptographic keys corresponding to the registered domain name.\\n\\n'
      + 'What They Do NOT Guarantee:\\n'
      + '1. Legitimacy of Intent: Malicious phishing sites routinely obtain automated, valid domain-validated (DV) certificates for deceptive domains (e.g., "paypa1.com").\\n'
      + '2. Malware Safety: A server can securely and cleanly transmit ransomware payloads over an encrypted HTTPS connection.\\n'
      + '3. Moral / Business Integrity: Certificates only validate domain control, not legal compliance or honest business ethics.\\n\\n'
      + 'Summary: HTTPS guarantees an encrypted delivery pipe, but an armored transport can still deliver poisoned cargo.',
    explanation_ar:
      'نقطة جوهرية: الشهادة تُثبت هوية النطاق فقط وليس مصداقية المحتوى. مواقع التصيد تستخدم HTTPS!',
    explanation_en:
      'Crucial insight: A certificate authenticates domain registration, not operational trustworthiness. Phishing portals regularly deploy valid HTTPS certificates.',
  },
  {
    id: 'CH2-L1-H-W-P1-03',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'قارن بدقة بين التشفير المتماثل والتشفير بالمفتاح العام من حيث: (أ) عدد المفاتيح، (ب) السرعة، (ج) الاستخدام في HTTPS — في جدول مقارنة.',
    question_en: 'Compare precisely symmetric encryption and public-key encryption regarding: (a) Key count, (b) Computational speed, (c) Role in HTTPS — structured in a comparison table.',
    ideal_answer_ar:
      '| المعيار | التشفير المتماثل | التشفير بالمفتاح العام |\\n'
      + '|---------|-----------------|----------------------|\\n'
      + '| عدد المفاتيح | مفتاح واحد مشترك | زوج: عام (للتشفير) + خاص (لفك التشفير) |\\n'
      + '| السرعة | سريع جداً (AES: مئات MB/ثانية) | بطيء نسبياً (RSA: آلاف أبطأ من AES) |\\n'
      + '| الاستخدام في HTTPS | تشفير بيانات الجلسة (بعد المصافحة) | مصافحة TLS (تبادل مفتاح الجلسة) |\\n'
      + '| مشكلة | كيف تتبادل المفتاح بأمان؟ | بطيء للبيانات الضخمة |\\n'
      + '| مثال خوارزمية | AES-256, ChaCha20 | RSA-2048, ECDHE |\\n\\n'
      + 'لماذا HTTPS يجمعهما؟\\n'
      + 'يستخدم المفتاح العام لحل مشكلة تبادل مفتاح الجلسة بأمان، ثم يستخدم المتماثل لكفاءة تشفير البيانات.',
    ideal_answer_en:
      '| Criterion | Symmetric Encryption | Public-Key (Asymmetric) Encryption |\\n'
      + '|---|---|---|\\n'
      + '| Key Count | Single shared secret key | Key Pair: Public (encrypt) + Private (decrypt) |\\n'
      + '| Processing Speed | Extremely fast (hundreds of MB/s) | Computationally expensive / orders of magnitude slower |\\n'
      + '| HTTPS Role | Bulk session payload encryption | TLS Handshake & session key exchange |\\n'
      + '| Inherent Weakness | How to securely exchange the initial key | High CPU overhead for large datasets |\\n'
      + '| Representative Ciphers | AES-256, ChaCha20 | RSA-2048/4096, ECDHE |\\n\\n'
      + 'Why HTTPS Merges Both:\\n'
      + 'It applies asymmetric crypto to resolve the key negotiation dilemma, and shifts immediately to symmetric ciphers to deliver seamless web streaming throughput.',
    explanation_ar:
      'الجدول يُسرِّع قراءة الممتحن ويُظهر تنظيماً في التفكير. احفظ: عدد المفاتيح + السرعة + الاستخدام.',
    explanation_en:
      'Tabular presentation ensures full marks: emphasize Key Count + Relative Speed + Specific HTTPS Responsibility.',
  },
  {
    id: 'CH2-L1-H-W-P1-04',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'افترض أن متجراً إلكترونياً يعمل بدون TLS. اشرح 3 مخاطر محددة يواجهها المستخدم، وكيف يُعالج كل من: التشفير والشهادة الرقمية والتوقيع الرقمي هذه المخاطر.',
    question_en: 'Suppose an online retail shop operates without TLS. Detail 3 specific threats users confront, and explain how encryption, digital certificates, and digital signatures remediate each threat.',
    ideal_answer_ar:
      'بدون TLS — المخاطر والعلاج:\\n\\n'
      + 'الخطر الأول: اعتراض البيانات (Eavesdropping)\\n'
      + '- الخطر: أي شخص على نفس الشبكة يستطيع قراءة رقم البطاقة وكلمة المرور.\\n'
      + '- العلاج: التشفير (المتماثل وبالمفتاح العام) يحوِّل البيانات لنص مشفر غير مقروء.\\n\\n'
      + 'الخطر الثاني: هجمة رجل في الوسط (MITM)\\n'
      + '- الخطر: مهاجم يضع نفسه بين المتصفح والخادم، ينتحل شخصية المتجر.\\n'
      + '- العلاج: الشهادة الرقمية تُثبت هوية الخادم — المتصفح يتحقق أن الخادم هو فعلاً المتجر الأصلي.\\n\\n'
      + 'الخطر الثالث: التلاعب بأمر الشراء\\n'
      + '- الخطر: مهاجم يُعدِّل أمر الشراء في الطريق (يغيِّر المبلغ أو وجهة التحويل).\\n'
      + '- العلاج: التوقيع الرقمي على المعاملة يكشف أي تعديل ويُثبت عدم التلاعب.',
    ideal_answer_en:
      'Operating Without TLS — Risks & Cryptographic Solutions:\\n\\n'
      + '1. Threat: Passive Eavesdropping / Packet Sniffing\\n'
      + '- Vulnerability: Unencrypted credit card numbers, passwords, and billing addresses are transmitted in plain HTTP text across public networks.\\n'
      + '- Remediation: Symmetric & Asymmetric Encryption transforms plaintext into ciphered bytes unreadable to third parties.\\n\\n'
      + '2. Threat: Man-in-the-Middle (MitM) Spoofing\\n'
      + '- Vulnerability: An adversary intercepts connections, impersonating the merchant site to collect victim payments.\\n'
      + '- Remediation: Digital Certificates validate true server identity, allowing client browsers to verify CA signatures before transacting.\\n\\n'
      + '3. Threat: Order Data Tampering / Modification in Transit\\n'
      + '- Vulnerability: Routers along the transmission path can modify purchase orders, shipping destinations, or payment sums.\\n'
      + '- Remediation: Digital Signatures and Message Authentication Codes (MACs) ensure data integrity; any modification renders verification invalid.',
    explanation_ar:
      'نمط الإجابة: لكل خطر: اسمه → سيناريو واقعي → التقنية التي تعالجه. ثلاث فقرات منظمة = 6 درجات.',
    explanation_en:
      'Answer formula: For each risk: Name → Attack scenario → Specific cryptographic remedy. Three clean pairings guarantee full credit.',
  },
  {
    id: 'CH2-L1-H-W-P1-05',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar: 'وضح لماذا لا يكتفي TLS بالتشفير بالمفتاح العام لجميع بيانات الجلسة، واشرح الحل الذي يحقق التوازن بين الأمان والكفاءة.',
    question_en: 'Clarify why TLS does not exclusively use public-key cryptography for all session data, and explain the hybrid solution that balances security with efficiency.',
    ideal_answer_ar:
      'لماذا المفتاح العام وحده غير كافٍ:\\n'
      + '- بطء حسابي شديد: خوارزميات المفتاح العام (RSA, ECDH) تستهلك قدرة معالجة عالية جداً.\\n'
      + '- المقارنة: AES-256 (متماثل) يُشفِّر 3 GB في الثانية على معالج عادي، بينما RSA يُشفِّر بضعة KB فقط.\\n'
      + '- التطبيق العملي: فيديو HD يعني نقل عشرات الـ MB في الثانية — استخدام RSA مستحيل تقنياً.\\n\\n'
      + 'الحل الهجين (Hybrid Encryption):\\n'
      + '1. مصافحة TLS بالمفتاح العام: تبادل مفتاح الجلسة بأمان (يحدث مرة واحدة فقط — بيانات صغيرة).\\n'
      + '2. بيانات الجلسة بالمتماثل: بعد تبادل مفتاح الجلسة، كل بيانات الجلسة تُشفَّر بـ AES السريع.\\n'
      + 'النتيجة: أمان المفتاح العام + كفاءة المتماثل.',
    ideal_answer_en:
      'Why Public-Key Alone Fails for Bulk Transmission:\\n'
      + '- Extreme Computational Latency: Asymmetric algorithms perform complex multi-precision arithmetic on 2048-bit primes, consuming massive CPU cycles.\\n'
      + '- Performance Disparity: AES-256 processes gigabytes of data per second on standard hardware, whereas RSA can manage only tens of kilobytes per second.\\n'
      + '- Practical Bottleneck: Streaming media or heavy web assets over RSA would completely saturate server processors and introduce debilitating page latency.\\n\\n'
      + 'The Hybrid Cryptosystem Solution:\\n'
      + '1. Asymmetric Handshake: Public-key cryptography runs once during session setup to authenticate identities and negotiate a temporary secret key.\\n'
      + '2. Symmetric Data Transfer: The negotiated session key drives AES symmetric encryption for all subsequent web page requests and streaming payload.\\n'
      + 'Result: Combines key-distribution security with line-rate encryption speed.',
    explanation_ar:
      'التوازن الذهبي: استخدم المفتاح العام لتبادل المفتاح فقط (بيانات صغيرة مرة واحدة)، ثم المتماثل للبيانات الضخمة المستمرة.',
    explanation_en:
      'The golden equilibrium: Deploy asymmetric keys once for exchange (tiny payload), then switch to symmetric ciphers for ongoing bulk transfers.',
  },
  {
    id: 'CH2-L1-H-W-P1-06',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'اشرح مفهوم "سلسلة الثقة" في الشهادات الرقمية، وكيف تُمكِّن المتصفح من التحقق من موقع لم يسمع بجهة إصداره من قبل؟',
    question_en: 'Explain the "Chain of Trust" concept in digital certificates, and how it enables a browser to authenticate a website issued by an unfamiliar subordinate entity?',
    ideal_answer_ar:
      'سلسلة الثقة — المفهوم:\\n'
      + 'بدلاً من أن يثق المتصفح بكل شهادة على حدة، يثق بـ CA جذرية موثوقة مُثبَّتة مسبقاً، وتنتقل الثقة منها للأسفل.\\n\\n'
      + 'التسلسل الهرمي:\\n'
      + '1. CA الجذرية (Root CA):\\n'
      + '   - شهاداتها مُثبَّتة في Chrome وFirefox وWindows وiOS.\\n'
      + '   - لا تُصدر شهادات مواقع مباشرةً (حمايةً لنفسها).\\n\\n'
      + '2. CA الوسيطة (Intermediate CA):\\n'
      + '   - CA الجذرية تُصدر لها شهادة وتوقِّعها.\\n'
      + '   - تُصدر هي شهادات المواقع الفعلية.\\n\\n'
      + '3. شهادة الموقع:\\n'
      + '   - موقَّعة من CA الوسيطة التي بدورها موقَّع من الجذرية.\\n\\n'
      + 'كيف يتحقق المتصفح من موقع جديد؟\\n'
      + '1. يتلقى شهادة الموقع + شهادة CA الوسيطة.\\n'
      + '2. يتحقق من توقيع الوسيطة على شهادة الموقع ✓\\n'
      + '3. يتحقق من توقيع الجذرية على شهادة الوسيطة ✓\\n'
      + '4. يجد الجذرية في قائمة الـ CA الموثوقة المُثبَّتة لديه ✓\\n'
      + '5. سلسلة الثقة مكتملة — يثق بالموقع.',
    ideal_answer_en:
      'Chain of Trust — Conceptual Framework:\\n'
      + 'Rather than requiring client devices to maintain records of every issuer on earth, browsers trust a curated set of pre-installed Root CAs, allowing trust to cascade hierarchically downward.\\n\\n'
      + 'Hierarchical Levels:\\n'
      + '1. Root CA: Pre-installed in operating system and browser trust stores (e.g., Windows, macOS, Chrome). Root keys are kept offline in high-security vaults.\\n'
      + '2. Intermediate CA: Delegated and digitally signed by the Root CA to handle operational certificate generation.\\n'
      + '3. End-Entity (Server) Certificate: Issued and signed by the intermediate authority for a specific website domain.\\n\\n'
      + 'Browser Verification Algorithm for Unfamiliar Issuers:\\n'
      + '1. Browser downloads the server certificate along with the intermediate certificate bundle.\\n'
      + '2. Validates intermediate signature on the server certificate.\\n'
      + '3. Traces and validates the Root CA signature on the intermediate certificate.\\n'
      + '4. Matches the Root CA against its embedded local trust store.\\n'
      + '5. The cryptographic chain is unbroken; the website is marked secure.',
    explanation_ar:
      'الفكرة الأساسية: الثقة تنتقل عبر السلسلة من الجذرية للوسيطة للموقع. المتصفح لا يحتاج لمعرفة كل CA مسبقاً — يكفي أن يعرف الجذرية.',
    explanation_en:
      'Core principle: Trust flows transitively down the signature chain. Browsers do not need prior knowledge of every intermediate authority, only the root.',
  },
  {
    id: 'CH2-L1-H-W-P1-07',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'صمِّم خطوات التحقق التي يجريها متصفحك عند فتح موقع بنكي لأول مرة، موضحاً دور: (أ) مصافحة TLS، (ب) الشهادة الرقمية، (ج) التشفير المتماثل — في ترتيبها الزمني الصحيح.',
    question_en: 'Design the sequential verification steps executed by your browser when connecting to an online banking portal, clarifying the chronological roles of: (a) TLS Handshake, (b) Digital Certificate, (c) Symmetric Encryption.',
    ideal_answer_ar:
      'التسلسل الزمني عند فتح الموقع البنكي:\\n\\n'
      + 'المرحلة 1: طلب الاتصال (0 ms)\\n'
      + '- المتصفح يُرسل ClientHello: "أدعم TLS 1.3، إليك خوارزميات التشفير التي أفهمها."\\n'
      + '- الخادم يرد بـ ServerHello: "حسناً، سنستخدم AES-256-GCM."\\n\\n'
      + 'المرحلة 2: الشهادة الرقمية (ب)\\n'
      + '- الخادم يُرسل شهادته الرقمية.\\n'
      + '- المتصفح يتحقق:\\n'
      + '  ✓ هل الشهادة صادرة من CA موثوقة؟ (سلسلة الثقة)\\n'
      + '  ✓ هل اسم النطاق مطابق لـ bank.com؟\\n'
      + '  ✓ هل الشهادة ضمن مدة صلاحيتها؟\\n'
      + '  ✓ هل الشهادة مُلغاة؟ (OCSP)\\n\\n'
      + 'المرحلة 3: مصافحة TLS — توليد المفتاح (أ)\\n'
      + '- المتصفح يُولِّد مفتاح جلسة عشوائياً.\\n'
      + '- يُشفِّره بالمفتاح العام للخادم (من الشهادة).\\n'
      + '- يُرسله للخادم — الخادم يفكه بمفتاحه الخاص.\\n'
      + '- كلاهما الآن يملك مفتاح الجلسة.\\n\\n'
      + 'المرحلة 4: التشفير المتماثل — البيانات (ج)\\n'
      + '- جميع بيانات الجلسة (رقم حسابك، تحويلاتك) تُشفَّر بـ AES باستخدام مفتاح الجلسة.\\n'
      + '- سريع وآمن — لا أحد يستطيع قراءته حتى لو اعترضه.',
    ideal_answer_en:
      'Chronological Lifecycle of Banking Session Initiation:\\n\\n'
      + 'Phase 1: Session Initiation (TLS Handshake Start)\\n'
      + '- Browser transmits ClientHello containing supported TLS versions and cryptographic cipher suites.\\n'
      + '- Server responds with ServerHello selecting preferred parameters (e.g. TLS 1.3, AES-256-GCM).\\n\\n'
      + 'Phase 2: Identity Authentication (Digital Certificate)\\n'
      + '- Server transmits its digital certificate chain.\\n'
      + '- Browser performs four automated validations:\\n'
      + '  1. Validates signature chain back to trusted local Root CA store.\\n'
      + '  2. Matches domain string against bank URL.\\n'
      + '  3. Checks validity timestamps (not expired, not premature).\\n'
      + '  4. Queries OCSP/CRL to ensure the certificate has not been revoked.\\n\\n'
      + 'Phase 3: Key Negotiation (Public-Key Cryptography)\\n'
      + '- Parties exchange ephemeral key parameters (e.g., ECDHE) authenticated by the server private key.\\n'
      + '- Both compute identical symmetric session keys independently without sending secrets across the wire.\\n\\n'
      + 'Phase 4: Bulk Payload Encryption (Symmetric Encryption)\\n'
      + '- Transition is complete: all banking application data (account balances, wire instructions) are encrypted with hardware-accelerated AES-GCM.',
    explanation_ar:
      'الترتيب: ClientHello → ServerHello + شهادة → التحقق من الشهادة → توليد مفتاح جلسة (مفتاح عام) → تشفير متماثل.',
    explanation_en:
      'Execution sequence: ClientHello → ServerHello + Cert → Chain Verification → Key Derivation → Symmetric Data Stream.',
  },
  {
    id: 'CH2-L1-H-W-P1-08',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'ناقش لماذا يُعد نظام المصادقة بكلمة مرور واحدة غير كافٍ، مستخدماً أمثلة على التهديدات التي تتجاوزه وكيف تعالجها 2FA.',
    question_en: 'Discuss why single-password authentication is fundamentally inadequate, using threat scenarios that defeat it and illustrating how 2FA mitigates them.',
    ideal_answer_ar:
      'ضعف كلمة المرور الواحدة:\\n\\n'
      + 'التهديد 1: هجمات التصيد (Phishing)\\n'
      + '- المستخدم ينخدع ويُدخل كلمته في موقع مزيف → تُسرق كلمة المرور.\\n'
      + '- 2FA: حتى مع سرقة كلمة المرور، المهاجم لا يملك هاتف الضحية للحصول على OTP.\\n\\n'
      + 'التهديد 2: خروقات قواعد البيانات (Data Breaches)\\n'
      + '- الموقع يُخترق وقاعدة بيانات كلمات المرور تُسرق (حتى لو مُشفَّرة).\\n'
      + '- 2FA: المهاجم يحتاج أيضاً الوصول لهاتف كل مستخدم — مستحيل بالجملة.\\n\\n'
      + 'التهديد 3: هجمات القوة الغاشمة (Brute Force)\\n'
      + '- المهاجم يجرب ملايين كلمات المرور تلقائياً.\\n'
      + '- 2FA: حتى لو خمَّن الكلمة الصحيحة، يحتاج العامل الثاني الفيزيائي.\\n\\n'
      + 'التهديد 4: إعادة استخدام كلمات المرور\\n'
      + '- معظم المستخدمين يستخدمون نفس الكلمة في مواقع متعددة.\\n'
      + '- 2FA: اختراق موقع واحد لا يمنح وصولاً لمواقع أخرى.',
    ideal_answer_en:
      'Vulnerabilities of Single-Factor Passwords & 2FA Countermeasures:\\n\\n'
      + '1. Phishing Attacks:\\n'
      + '- Threat: Victims are duped into typing credentials on fraudulent lookalike portals.\\n'
      + '- 2FA Mitigation: Possessing the victim stolen password is insufficient; access is rejected without physical possession of the second factor (e.g. mobile authenticator code).\\n\\n'
      + '2. Corporate Database Breaches:\\n'
      + '- Threat: Attackers compromise third-party databases, dumping millions of credential hashes.\\n'
      + '- 2FA Mitigation: Dumped credentials cannot be monetized because the attacker cannot mass-compromise physical user tokens.\\n\\n'
      + '3. Brute Force & Dictionary Cracking:\\n'
      + '- Threat: Automated botnets guess billions of common password combinations per minute.\\n'
      + '- 2FA Mitigation: Even if a dictionary attack correctly guesses the password, account penetration remains thwarted.\\n\\n'
      + '4. Password Reuse Exploitation (Credential Stuffing):\\n'
      + '- Threat: Breaching an inconsequential forum yields credentials matching the victim primary banking or work email.\\n'
      + '- 2FA Mitigation: Stops credential stuffing in its tracks by demanding an out-of-band second factor.',
    explanation_ar:
      'أذكر 3-4 تهديدات محددة + كيف تحمي 2FA منها. لا تكتفِ بالتعريف النظري.',
    explanation_en:
      'Cite concrete threats (Phishing, Database leaks, Brute-force, Credential stuffing) and show explicitly why 2FA renders stolen passwords inert.',
  },
  {
    id: 'CH2-L1-H-W-P1-09',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar: 'علّل: لماذا يُعد (كلمة مرور + بصمة) أقوى من (كلمة مرور + PIN) كنظام 2FA؟',
    question_en: 'Justify: Why is (Password + Fingerprint) considered significantly more robust than (Password + PIN) as a 2FA deployment?',
    ideal_answer_ar:
      'السبب الجوهري: فئات العوامل المختلفة\\n\\n'
      + 'كلمة مرور + PIN (ضعيف):\\n'
      + '- كلاهما من فئة المعرفة (Something you KNOW).\\n'
      + '- يمكن سرقتهما معاً بنفس الطريقة: تجسس، تصيد، خرق البيانات.\\n'
      + '- من الناحية الفنية: هذا مصادقة بعامل واحد (المعرفة) ولكن بخطوتين.\\n'
      + '- الهجمة الواحدة تكسرهما معاً.\\n\\n'
      + 'كلمة مرور + بصمة (قوي):\\n'
      + '- كلمة المرور = فئة المعرفة (يمكن سرقتها).\\n'
      + '- البصمة = فئة السمات الحيوية (لا يمكن سرقتها عن بُعد، وليست رقماً يُخمَّن).\\n'
      + '- المهاجم يحتاج اختراق فئتين مختلفتين تماماً في آنٍ واحد.\\n'
      + '- حتى لو سُرقت كلمة المرور، لا يمكن تزوير البصمة عن بُعد.\\n\\n'
      + 'الخلاصة: القوة الحقيقية لـ 2FA تأتي من تنوع الفئات وليس مجرد تعدد الخطوات.',
    ideal_answer_en:
      'Foundational Principle: Orthogonal Factor Diversity\\n\\n'
      + 'Password + PIN (Deficient Architecture):\\n'
      + '- Both credentials belong to the Knowledge factor (Something you know).\\n'
      + '- Vulnerable to identical attack vectors: keyloggers, over-the-shoulder peeking, phishing, and database compromise.\\n'
      + '- Technically constitutes Two-Step Verification within a single factor, rather than genuine Two-Factor Authentication.\\n\\n'
      + 'Password + Fingerprint (Robust Architecture):\\n'
      + '- Spans two completely distinct categories: Knowledge (Password) + Inherence (Biometric trait).\\n'
      + '- Attackers cannot exploit a remote database leak to reproduce a physical human biological attribute.\\n'
      + '- Compromising the account requires orchestrating two totally unrelated attack vectors simultaneously (cyber credential theft + physical biological impersonation).\\n\\n'
      + 'Conclusion: Genuine 2FA strength stems from category heterogeneity, not redundant verification hurdles within the same factor.',
    explanation_ar:
      'النقطة الجوهرية: 2FA تعني فئتان مختلفتان. كلمة مرور + PIN = فئة واحدة = مصادقة أحادية العامل فعلياً.',
    explanation_en:
      'Core distinction: True 2FA requires two distinct factor categories. Password + PIN shares the same category, reducing it to two-step single factor authentication.',
  },
  {
    id: 'CH2-L1-H-W-P1-10',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'افترض أن مديراً يريد حماية نظام حساس للغاية. صف نظام MFA من 3 عوامل من فئات مختلفة، موضحاً لكل عامل: الفئة، المثال، وسبب تفوق الثلاثة معاً على كل منها منفرداً.',
    question_en: 'Suppose an administrator must secure an ultra-sensitive infrastructure. Formulate a 3-factor MFA design spanning distinct categories, defining for each: Factor category, Implementation example, and Why the combination outperforms isolated factors.',
    ideal_answer_ar:
      'نظام MFA الثلاثي للنظام الحساس:\\n\\n'
      + 'العامل الأول — المعرفة:\\n'
      + '- المثال: كلمة مرور طويلة معقدة (18+ حرفاً).\\n'
      + '- الفئة: Something you KNOW.\\n'
      + '- وحده: يُسرق بالتصيد أو خروقات البيانات.\\n\\n'
      + 'العامل الثاني — الحيازة:\\n'
      + '- المثال: مفتاح USB للأمان (مثل YubiKey).\\n'
      + '- الفئة: Something you HAVE.\\n'
      + '- وحده: يُسرق جسدياً أو يُفقد.\\n\\n'
      + 'العامل الثالث — السمات الحيوية:\\n'
      + '- المثال: بصمة الإصبع أو شبكية العين.\\n'
      + '- الفئة: Something you ARE.\\n'
      + '- وحده: يمكن التحايل عليه بتقنيات DeepFake أو قسراً (إجبار الشخص).\\n\\n'
      + 'لماذا الثلاثة معاً أقوى:\\n'
      + '- المهاجم يحتاج: معرفة كلمة المرور + سرقة YubiKey + تزوير البصمة — في آنٍ واحد.\\n'
      + '- كل عامل يحمي الثغرة في العامل الآخر.\\n'
      + '- احتمالية نجاح الهجمة = ضرب احتمالية اختراق كل عامل × الآخر (ضئيلة جداً).',
    ideal_answer_en:
      'Three-Factor MFA Design for High-Security Systems:\\n\\n'
      + '1. Factor 1: Knowledge (Something you KNOW)\\n'
      + '- Implementation: High-entropy 20+ character passphrase.\\n'
      + '- Standalone Vulnerability: Susceptible to credential leaks, keylogging, and social engineering.\\n\\n'
      + '2. Factor 2: Possession (Something you HAVE)\\n'
      + '- Implementation: FIDO2 Hardware USB Token (YubiKey).\\n'
      + '- Standalone Vulnerability: Can be physically misplaced, lost, or stolen from an office desk.\\n\\n'
      + '3. Factor 3: Inherence (Something you ARE)\\n'
      + '- Implementation: Integrated biometric hardware fingerprint or iris scanner.\\n'
      + '- Standalone Vulnerability: Vulnerable to coercion or spoofed synthetic molds in extreme targeted scenarios.\\n\\n'
      + 'Multiplicative Defense Synergy:\\n'
      + '- An adversary must simultaneously obtain the mental passphrase, physically steal the specific hardware key, and spoof the live human biometric.\\n'
      + '- Each layer directly offsets the security vulnerability of the others, making remote automated penetration mathematically infinitesimal.',
    explanation_ar:
      'الإجابة المثالية: جدول بـ 3 صفوف (عامل، فئة، مثال، ضعف منفرداً) + فقرة تُفسِّر قوة التركيب.',
    explanation_en:
      'Provide a 3-tier breakdown: factor category, concrete deployment, individual weakness, and combined multiplicative defense.',
  },
  {
    id: 'CH2-L1-H-W-P1-11',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'قارن بين 3 حالات: (أ) كلمة مرور + PIN، (ب) كلمة مرور + OTP، (ج) كلمة مرور + بصمة. حدد أيها يُعد 2FA حقيقية ولماذا؟',
    question_en: 'Compare 3 authentication scenarios: (a) Password + PIN, (b) Password + SMS OTP, (c) Password + Biometric fingerprint. Determine which constitute genuine 2FA and explain why.',
    ideal_answer_ar:
      'التحليل الدقيق للحالات الثلاث:\\n\\n'
      + 'الحالة أ: كلمة مرور + PIN\\n'
      + '- كلمة مرور: فئة المعرفة ✗\\n'
      + '- PIN: فئة المعرفة ✗\\n'
      + '- الحكم: ليست 2FA حقيقية — كلاهما من نفس الفئة.\\n'
      + '- التسمية الصحيحة: مصادقة ثنائية الخطوة (Two-Step Verification) وليست ثنائية العامل.\\n\\n'
      + 'الحالة ب: كلمة مرور + OTP ✅\\n'
      + '- كلمة مرور: فئة المعرفة ✓\\n'
      + '- OTP على الهاتف: فئة الحيازة ✓\\n'
      + '- الحكم: 2FA حقيقية — فئتان مختلفتان.\\n'
      + '- مثال: Gmail، الإنترنت البنكي.\\n\\n'
      + 'الحالة ج: كلمة مرور + بصمة ✅\\n'
      + '- كلمة مرور: فئة المعرفة ✓\\n'
      + '- بصمة: فئة السمات الحيوية ✓\\n'
      + '- الحكم: 2FA حقيقية — فئتان مختلفتان.\\n'
      + '- أقوى من الحالة ب لأن البصمة لا تُرسَل عبر الشبكة.\\n\\n'
      + 'الخلاصة: الحالتان ب وج هما 2FA حقيقية. الحالة أ مصادقة بعامل واحد فعلياً.',
    ideal_answer_en:
      'Systematic Analysis of the Three Cases:\\n\\n'
      + 'Case A: Password + PIN\\n'
      + '- Password: Knowledge factor\\n'
      + '- PIN: Knowledge factor\\n'
      + '- Verdict: INVALID 2FA. Both credentials reside in the same category. Termed "Two-Step Verification," not Two-Factor.\\n\\n'
      + 'Case B: Password + Mobile OTP (SMS / App)\\n'
      + '- Password: Knowledge factor (Something you know)\\n'
      + '- OTP on Mobile Device: Possession factor (Something you have)\\n'
      + '- Verdict: VALID 2FA. Bridges two distinct independent factor categories.\\n\\n'
      + 'Case C: Password + Fingerprint\\n'
      + '- Password: Knowledge factor (Something you know)\\n'
      + '- Fingerprint Scan: Inherence factor (Something you are)\\n'
      + '- Verdict: VALID 2FA. Highly secure because biometric vectors cannot be intercepted over standard telecommunication carriers.\\n\\n'
      + 'Conclusion: Cases B and C represent authentic 2FA. Case A is single-factor redundant authentication.',
    explanation_ar:
      'المعيار الوحيد: هل العاملان من فئتين مختلفتين؟ نعم → 2FA. لا → مصادقة ثنائية الخطوة وليست ثنائية العامل.',
    explanation_en:
      'The sole determinative benchmark: Do the two factors belong to separate categories? Yes = 2FA; No = Two-Step Verification.',
  },
  {
    id: 'CH2-L1-H-W-P1-12',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'وضح الفرق الجوهري بين وظيفة التوقيع الرقمي ووظيفة الشهادة الرقمية، مستخدماً تشبيهاً واقعياً لكل منهما.',
    question_en: 'Clarify the fundamental operational difference between a digital signature and a digital certificate, providing an intuitive real-world analogy for each.',
    ideal_answer_ar:
      'التوقيع الرقمي — الوظيفة:\\n'
      + '- يُثبت صحة البيانات (لم تُعدَّل) وهوية المُرسِل (لم يُنتحَل).\\n'
      + '- يوفر عدم التنصل.\\n'
      + '- يُنشئه المُرسِل بمفتاحه الخاص.\\n'
      + '- التشبيه: كتوقيعك الشخصي بالقلم على عقد — يُثبت أنك من وقَّع وأن النص لم يُعدَّل.\\n\\n'
      + 'الشهادة الرقمية — الوظيفة:\\n'
      + '- تُثبت هوية الخادم/الموقع وارتباطه باسم نطاقه.\\n'
      + '- تُصدرها CA موثوقة (جهة خارجية مُحايدة).\\n'
      + '- تحتوي على المفتاح العام للخادم.\\n'
      + '- التشبيه: كبطاقة الهوية الوطنية — صادرة من جهة حكومية موثوقة، تُثبت أنك من تدَّعيه.\\n\\n'
      + 'الفرق الجوهري:\\n'
      + '| | التوقيع الرقمي | الشهادة الرقمية |\\n'
      + '|---|---|---|\\n'
      + '| ما يُثبت | صحة البيانات/المرسل | هوية الخادم/النطاق |\\n'
      + '| مَن يُنشئه | المُرسِل نفسه | CA موثوقة |\\n'
      + '| يُستخدم على | الرسائل والمعاملات | الخوادم والمواقع |',
    ideal_answer_en:
      'Digital Signature:\\n'
      + '- Function: Validates payload integrity, authenticates author origin, and enforces non-repudiation.\\n'
      + '- Generated By: The author/sender using their private key.\\n'
      + '- Real-World Analogy: A handwritten signature or wax seal on a legal deed—proves who authored the contract and exposes if text was rewritten.\\n\\n'
      + 'Digital Certificate:\\n'
      + '- Function: Cryptographically binds an entity domain name to their public key, authenticating server identity.\\n'
      + '- Generated By: An independent, trusted Certificate Authority (CA).\\n'
      + '- Real-World Analogy: A government-issued passport or national ID—issued by an official authority confirming you are who you claim to be.\\n\\n'
      + 'Comparative Matrix:\\n'
      + '| Property | Digital Signature | Digital Certificate |\\n'
      + '|---|---|---|\\n'
      + '| Proves | Message integrity & author origin | Server/Domain legal identity |\\n'
      + '| Issuer | Sender (using private key) | Trusted Third-Party CA |\\n'
      + '| Target Object | Documents, emails, code releases | Web hosts, servers, endpoints |',
    explanation_ar:
      'التشبيه يُسهِّل الفهم ويُرسِّخ المعلومة. توقيع = إثبات صحة البيانات. شهادة = إثبات الهوية.',
    explanation_en:
      'Analogies anchor understanding: Signature = contract signature proving message authenticity; Certificate = passport proving bearer identity.',
  },
  {
    id: 'CH2-L1-H-W-P1-13',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'اشرح كيف يمنع العامل الثاني المستقل اختراق الحساب حتى لو تسربت كلمة المرور، مستعيناً بتسلسل مراحل الهجوم والدفاع.',
    question_en: 'Explain how an independent second factor halts account takeover even if passwords leak, detailing the attack-and-defense progression.',
    ideal_answer_ar:
      'سيناريو الهجوم بدون 2FA:\\n'
      + '1. مهاجم يُرسل بريداً تصيدياً → الضحية تُدخل كلمة مرورها في موقع مزيف.\\n'
      + '2. المهاجم يستخدم الكلمة المسروقة → يدخل الحساب فوراً.\\n'
      + '3. النتيجة: اختراق تام في ثوانٍ.\\n\\n'
      + 'سيناريو الهجوم مع 2FA:\\n\\n'
      + 'المرحلة 1 — نجاح جزئي للمهاجم:\\n'
      + '- المهاجم يُرسل التصيد ← الضحية تُدخل كلمة مرورها ← يحصل عليها.\\n\\n'
      + 'المرحلة 2 — حاجز 2FA:\\n'
      + '- المهاجم يُدخل كلمة المرور في الموقع الحقيقي.\\n'
      + '- النظام يطلب OTP على هاتف الضحية.\\n'
      + '- OTP يصل لهاتف الضحية (وليس للمهاجم).\\n'
      + '- صلاحية OTP: 30-60 ثانية فقط.\\n\\n'
      + 'المرحلة 3 — إخفاق المهاجم:\\n'
      + '- المهاجم لا يملك الهاتف الفيزيائي.\\n'
      + '- الوقت ينتهي — OTP يُلغى.\\n'
      + '- الدخول مرفوض ✓\\n\\n'
      + 'الخلاصة: العامل الثاني يُحوِّل اختراق رقمي (سرقة كلمة مرور) إلى حاجة لاختراق فيزيائي (سرقة الهاتف) — وهو أصعب بكثير.',
    ideal_answer_en:
      'Attack Lifecycle Progression — Without vs. With 2FA:\\n\\n'
      + 'Baseline Scenario (Single Factor):\\n'
      + '1. Phishing email lures victim into submitting credentials to spoofed portal.\\n'
      + '2. Attacker logs into real service using the harvested password.\\n'
      + '3. Account takeover successful in under 30 seconds.\\n\\n'
      + 'Defended Scenario (With 2FA):\\n'
      + '• Phase 1 (Partial Adversary Gain): Victim enters password on phishing page; attacker captures credential string.\\n'
      + '• Phase 2 (The 2FA Interception Barrier):\\n'
      + '  - Attacker attempts login on real enterprise platform.\\n'
      + '  - Authentication server verifies password and instantly prompts for secondary factor.\\n'
      + '  - A dynamic, single-use OTP is pushed to victim registered smartphone (possession factor).\\n'
      + '  - The OTP carries a strict 30-second cryptographic validity lifetime.\\n'
      + '• Phase 3 (Attack Collapse):\\n'
      + '  - Attacker lacks physical custody of victim mobile device.\\n'
      + '  - Timer expires without second-factor challenge completion.\\n'
      + '  - Platform terminates session and notifies user of unauthorized attempt.\\n\\n'
      + 'Conclusion: 2FA elevates digital password theft into an exponentially harder physical logistics barrier.',
    explanation_ar:
      'مراحل الهجوم: نجاح جزئي → حاجز 2FA → إخفاق كامل. التسلسل الزمني يُثبت فهماً عميقاً.',
    explanation_en:
      'Structure the chronology clearly: Initial credential theft → 2FA Challenge checkpoint → Complete adversary containment.',
  },
];

// ─── MCQ متقدمة — الجزء الأول ───────────────────────────────

export const CH2_L1_HARD_MCQ_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-H-MCQ-P1-01',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'اكتشف المتصفح أن شهادة موقع HTTPS منتهية الصلاحية. ما معنى ذلك بدقة؟',
    question_en: 'A browser discovers an HTTPS website certificate has expired. What does this technically mean?',
    options: [
      'البيانات غير مشفرة تماماً',
      'جهة الإصدار (CA) لا تضمن حالياً أن الخادم هو فعلاً صاحب النطاق',
      'التوقيع الرقمي للموقع مسروق',
      'مفتاح الجلسة أصبح عاماً ومكشوفاً',
    ],
    options_en: [
      'Transmission data is completely unencrypted',
      'The Certificate Authority (CA) no longer guarantees the server currently owns the domain',
      'The website digital signature private key was stolen',
      'The symmetric session key became publicly compromised',
    ],
    answer: 'جهة الإصدار (CA) لا تضمن حالياً أن الخادم هو فعلاً صاحب النطاق',
    answer_en: 'The Certificate Authority (CA) no longer guarantees the server currently owns the domain',
    explanation_ar: 'الشهادة المنتهية لا تعني غياب التشفير — بل تعني أن CA لم تُجدِّد تحققها من هوية الخادم. قد يكون الخادم قد تغيَّر ملكيته أو انتُحلت شخصيته.',
    explanation_en: 'An expired certificate does not imply encryption is disabled; it means the CA identity vetting period has lapsed, leaving current ownership unverified.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-02',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'لماذا يستخدم TLS المفتاح العام أولاً ثم يتحول للمتماثل؟',
    question_en: 'Why does TLS use public-key cryptography initially and then switch to symmetric encryption?',
    options: [
      'المفتاح العام لا يتوافق مع بروتوكول HTTP',
      'التشفير المتماثل أكثر أماناً في كل الأحوال',
      'التشفير المتماثل أسرع بكثير لتشفير كميات كبيرة من البيانات',
      'المفتاح العام للتحقق فقط وليس للتشفير مطلقاً',
    ],
    options_en: [
      'Public-key cryptography is incompatible with HTTP formatting',
      'Symmetric encryption is mathematically superior in every threat scenario',
      'Symmetric encryption is vastly faster for encrypting high-volume payloads',
      'Public keys are used exclusively for verification and cannot perform encryption',
    ],
    answer: 'التشفير المتماثل أسرع بكثير لتشفير كميات كبيرة من البيانات',
    answer_en: 'Symmetric encryption is vastly faster for encrypting high-volume payloads',
    explanation_ar: 'المفتاح العام يُستخدم لحل مشكلة تبادل المفتاح بأمان (مرة واحدة). المتماثل يُستخدم للبيانات الضخمة لأنه أسرع بمئات المرات.',
    explanation_en: 'Public-key cryptography securely negotiates keys once; symmetric encryption processes bulk streaming payloads hundreds of times faster.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-03',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما الفرق الجوهري بين التوقيع الرقمي والشهادة الرقمية؟',
    question_en: 'What is the core distinction between a digital signature and a digital certificate?',
    options: [
      'التوقيع يُثبت صحة البيانات/المرسل، الشهادة تُثبت هوية الخادم/النطاق',
      'التوقيع تُصدره CA والشهادة يُنشئها المستخدم',
      'كلاهما يؤدي نفس الوظيفة تماماً',
      'الشهادة للتشفير والتوقيع للمصادقة',
    ],
    options_en: [
      'The signature verifies data integrity and sender origin; the certificate authenticates server and domain identity',
      'Signatures are issued by CAs, whereas certificates are crafted by users',
      'Both mechanisms perform identical cryptographic routines',
      'Certificates are for encryption, whereas signatures are for authorization',
    ],
    answer: 'التوقيع يُثبت صحة البيانات/المرسل، الشهادة تُثبت هوية الخادم/النطاق',
    answer_en: 'The signature verifies data integrity and sender origin; the certificate authenticates server and domain identity',
    explanation_ar: 'الفرق جوهري: التوقيع = أنشأه المُرسِل على البيانات (يثبت صحتها). الشهادة = أصدرتها CA على الخادم (تثبت هويته). الشهادة نفسها مُوقَّعة رقمياً من CA.',
    explanation_en: 'Signatures certify that specific data has not been modified; certificates certify that a public key genuinely belongs to a specific domain entity.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-04',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'VERY_HARD',
    question_ar: 'نظام يستخدم: كلمة مرور + PIN + بصمة. كم عدد العوامل والفئات على الترتيب؟',
    question_en: 'A security system utilizes: Password + PIN + Fingerprint scan. How many factors and categories are employed, respectively?',
    options: [
      '3 عوامل، فئة واحدة (معرفة)',
      '3 عوامل، فئتان (معرفة × 2 + سمات × 1)',
      '3 عوامل، 3 فئات مختلفة',
      'عاملان فقط، فئتان',
    ],
    options_en: [
      '3 factors, 1 category (Knowledge)',
      '3 factors, 2 categories (Knowledge × 2 + Biometric × 1)',
      '3 factors, 3 distinct categories',
      '2 factors only, 2 categories',
    ],
    answer: '3 عوامل، فئتان (معرفة × 2 + سمات × 1)',
    answer_en: '3 factors, 2 categories (Knowledge × 2 + Biometric × 1)',
    explanation_ar: 'كلمة المرور = معرفة. PIN = معرفة. بصمة = سمات حيوية. الإجمالي: 3 عوامل من فئتين (معرفة وسمات). العوامل تُعدَّ منفردةً، لكن الفئات لا تُكرَّر.',
    explanation_en: 'Password (Knowledge) + PIN (Knowledge) + Fingerprint (Biometric). Total: 3 distinct credentials spanning 2 factor categories.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-05',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'تسرَّبت كلمة مرور مستخدم من خرق بيانات. أي نظام يبقى آمناً؟',
    question_en: 'A user password leaked in a major corporate data breach. Which authentication setup remains secure?',
    options: [
      'كلمة مرور فقط',
      'كلمة مرور + سؤال سري (كلاهما معرفة)',
      'كلمة مرور + تطبيق مصادقة على هاتفه الشخصي (OTP)',
      'كلمة مرور + كلمة مرور احتياطية',
    ],
    options_en: [
      'Password only',
      'Password + Security question (both Knowledge)',
      'Password + Mobile Authenticator App OTP (Possession)',
      'Password + Secondary backup password',
    ],
    answer: 'كلمة مرور + تطبيق مصادقة على هاتفه الشخصي (OTP)',
    answer_en: 'Password + Mobile Authenticator App OTP (Possession)',
    explanation_ar: 'بعد سرقة كلمة المرور، الأنظمة الأخرى مخترقة (كلها من فئة المعرفة). فقط تطبيق OTP على الهاتف (حيازة) يتطلب الوصول الفيزيائي للهاتف.',
    explanation_en: 'Knowledge-based second steps are compromised alongside leaked credentials; only an out-of-band possession factor (Authenticator OTP) maintains security.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-06',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أي العبارات تصف "سلسلة الثقة" في الشهادات بدقة؟',
    question_en: 'Which statement accurately describes the "Chain of Trust" in digital certificates?',
    options: [
      'تسلسل من CA الجذرية إلى CA الوسيطة إلى شهادة الموقع',
      'تشفير متتابع للبيانات بمفاتيح متعددة',
      'سلسلة كلمات مرور متداخلة في قاعدة البيانات',
      'تسلسل تبادل البيانات بين الخادم والعميل',
    ],
    options_en: [
      'A signature hierarchy extending from a Root CA through Intermediate CAs down to the end-entity certificate',
      'Sequential multi-layered data encryption using cascading ciphers',
      'Nested password hashing rounds stored in a relational database',
      'The chronological sequence of packet handshakes between client and server',
    ],
    answer: 'تسلسل من CA الجذرية إلى CA الوسيطة إلى شهادة الموقع',
    answer_en: 'A signature hierarchy extending from a Root CA through Intermediate CAs down to the end-entity certificate',
    explanation_ar: 'سلسلة الثقة هرمية: Root CA (موثوقة مسبقاً) ← Intermediate CA ← شهادة الموقع. الثقة تتدفق من الأعلى للأسفل.',
    explanation_en: 'The Chain of Trust is a structured hierarchy: Root CA (anchored trust) → Intermediate CA → Website Certificate.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-07',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'يريد مهاجم التنصت على اتصال HTTPS مكتمل. ما الذي يجعل ذلك شبه مستحيل؟',
    question_en: 'An attacker attempts to eavesdrop on an established HTTPS connection. What makes this practically impossible?',
    options: [
      'المتصفح يُخفي عنوان URL عن الشبكة',
      '2FA تُبلِّغ الخادم بوجود مهاجم محتمل',
      'البيانات مُشفَّرة بمفتاح جلسة لا يعرفه إلا الخادم والعميل',
      'الشهادة الرقمية تمنع فيزيائياً وصول أطراف ثالثة',
    ],
    options_en: [
      'The browser completely conceals the destination URL from routers',
      '2FA alerts the server of prospective network sniffers',
      'Data is encrypted using a shared session key known exclusively to the server and client',
      'The digital certificate physically severs access to third parties',
    ],
    answer: 'البيانات مُشفَّرة بمفتاح جلسة لا يعرفه إلا الخادم والعميل',
    answer_en: 'Data is encrypted using a shared session key known exclusively to the server and client',
    explanation_ar: 'مفتاح الجلسة يُتفَق عليه عبر تبادل المفتاح العام في المصافحة. المهاجم قد يرى البيانات المشفرة لكنه لا يملك مفتاح الجلسة لفك تشفيرها.',
    explanation_en: 'Symmetric session keys are derived privately during handshake negotiation; eavesdroppers see only high-entropy ciphertext bytes.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-08',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما مبدأ "عدم التنصل" في التوقيع الرقمي؟',
    question_en: 'What is the principle of "Non-Repudiation" in digital signatures?',
    options: [
      'البيانات مُشفَّرة بالكامل لا تقرأها أي جهة',
      'المُرسِل لا يستطيع إنكار إرسال رسالة وقَّع عليها بمفتاحه الخاص',
      'التوقيع يمنع التلاعب بالبيانات قبل إرسالها',
      'الخادم يحتفظ بنسخة سرية من كل المراسلات',
    ],
    options_en: [
      'Data is fully encrypted and unreadable by any party',
      'The sender cannot deny authoring and transmitting a message signed with their unique private key',
      'The signature actively prevents client machines from modifying data prior to transmission',
      'The server retains a confidential audit ledger of all communications',
    ],
    answer: 'المُرسِل لا يستطيع إنكار إرسال رسالة وقَّع عليها بمفتاحه الخاص',
    answer_en: 'The sender cannot deny authoring and transmitting a message signed with their unique private key',
    explanation_ar: 'Non-repudiation = لا إنكار. فقط صاحب المفتاح الخاص يستطيع توليد التوقيع. إذن التوقيع = دليل لا يُدحَض على أن هذا الشخص أرسل هذه البيانات.',
    explanation_en: 'Non-repudiation ensures cryptographic accountability: only the private key holder could have generated the signature digest.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-09',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'موقع يعرض قفلاً أخضر وHTTPS. ما الذي لا يضمنه بالضرورة؟',
    question_en: 'A website displays a padlock icon and HTTPS. What does this NOT inherently guarantee?',
    options: [
      'أن الاتصال مشفر',
      'أن الشهادة صادرة من CA معترف بها',
      'أن محتوى الموقع نفسه آمن وغير ضار',
      'أن اسم النطاق مطابق للشهادة',
    ],
    options_en: [
      'That communication packets are encrypted in transit',
      'That the certificate originates from an accredited CA',
      'That the site content and operator intentions are benevolent and safe',
      'That the domain name resolves accurately to the certificate subject',
    ],
    answer: 'أن محتوى الموقع نفسه آمن وغير ضار',
    answer_en: 'That the site content and operator intentions are benevolent and safe',
    explanation_ar: 'مواقع التصيد والاحتيال تستطيع الحصول على شهادة HTTPS مجانية (Let\\'s Encrypt). القفل يُثبت الاتصال الآمن فقط — وليس نوايا مالك الموقع أو محتواه.',
    explanation_en: 'Malicious phishing schemes obtain legitimate domain-validated certificates; HTTPS secures the transport pipeline, not website morality.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-10',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أي الأزواج يُعبِّر عن MFA من 3 فئات مختلفة؟',
    question_en: 'Which combination demonstrates authentic MFA spanning three distinct factor categories?',
    options: [
      'كلمة مرور + PIN + سؤال سري (معرفة × 3)',
      'بصمة + وجه + شبكية (سمات × 3)',
      'كلمة مرور + بطاقة ذكية + بصمة (معرفة + حيازة + سمات)',
      'OTP + تطبيق مصادقة + SMS (حيازة × 3)',
    ],
    options_en: [
      'Password + PIN + Security question (Knowledge × 3)',
      'Fingerprint + Facial scan + Retinal scan (Biometric × 3)',
      'Password + Smart Card + Fingerprint (Knowledge + Possession + Inherence)',
      'OTP + Authenticator App + SMS token (Possession × 3)',
    ],
    answer: 'كلمة مرور + بطاقة ذكية + بصمة (معرفة + حيازة + سمات)',
    answer_en: 'Password + Smart Card + Fingerprint (Knowledge + Possession + Inherence)',
    explanation_ar: 'كلمة مرور = معرفة. بطاقة ذكية = حيازة. بصمة = سمات حيوية. 3 عوامل من 3 فئات مختلفة = MFA حقيقية متعددة الفئات.',
    explanation_en: 'Password (Knowledge) + Smart Card (Possession) + Fingerprint (Inherence) represents true multi-category MFA.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-11',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'الوظيفة الرئيسية للمفتاح الخاص في نظام التشفير بالمفتاح العام:',
    question_en: 'The primary functions of the Private Key in an asymmetric cryptosystem are:',
    options: [
      'تشفير البيانات وإرسالها للجمهور',
      'فك تشفير البيانات وإنشاء التوقيع الرقمي',
      'إصدار شهادات للمواقع الأخرى',
      'توليد مفاتيح الجلسة للتشفير المتماثل',
    ],
    options_en: [
      'Encrypting data payloads and publishing them openly to the public',
      'Decrypting inbound encrypted ciphertext and generating digital signatures',
      'Directly issuing TLS certificates to third-party domains',
      'Deriving symmetric session keys for network routers',
    ],
    answer: 'فك تشفير البيانات وإنشاء التوقيع الرقمي',
    answer_en: 'Decrypting inbound encrypted ciphertext and generating digital signatures',
    explanation_ar: 'المفتاح الخاص له وظيفتان: (1) فك تشفير ما شُفِّر بالمفتاح العام المقابل. (2) إنشاء التوقيع الرقمي (تشفير الـ hash). يُحتفَظ به سراً دائماً.',
    explanation_en: 'A private key performs two non-delegable operations: decrypting data sealed with its public key, and generating digital signatures.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-12',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'VERY_HARD',
    question_ar: 'اختُرق حساب موظف رغم استخدامه "2FA" بعد سرقة كلمة مروره فقط. ما أرجح سبب للاختراق؟',
    question_en: 'An employee account was breached despite supposedly having "2FA" configured, immediately following password compromise. What is the most probable architectural flaw?',
    options: [
      'كلمة المرور كانت قصيرة جداً',
      'شهادة الخادم كانت منتهية الصلاحية',
      'العامل الثاني كان PIN أو سؤالاً سرياً — أي من نفس فئة المعرفة',
      'التشفير المتماثل للجلسة لم يكن مُفعَّلاً',
    ],
    options_en: [
      'The password character length was insufficiently short',
      'The web server certificate had lapsed and expired',
      'The secondary factor was a PIN or security question—residing in the identical Knowledge category',
      'Symmetric session encryption was not engaged on the gateway',
    ],
    answer: 'العامل الثاني كان PIN أو سؤالاً سرياً — أي من نفس فئة المعرفة',
    answer_en: 'The secondary factor was a PIN or security question—residing in the identical Knowledge category',
    explanation_ar: 'إذا كان العاملان من نفس الفئة (معرفة)، فهجمة واحدة تستطيع اختراقهما معاً. 2FA حقيقية = فئتان مختلفتان. النظام المذكور لم يكن 2FA فعلياً.',
    explanation_en: 'If both credentials draw from the Knowledge category, a single phishing or database breach compromises both simultaneously. True 2FA requires distinct categories.',
  },
  {
    id: 'CH2-L1-H-MCQ-P1-13',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'في HTTPS، متى تنتهي الحاجة للمفتاح العام وتبدأ للتشفير المتماثل؟',
    question_en: 'In HTTPS, exactly when does the role of public-key cryptography conclude and symmetric encryption begin?',
    options: [
      'عند إرسال اسم المستخدم وكلمة المرور',
      'بعد اكتمال مصافحة TLS وتوليد مفتاح الجلسة المشترك',
      'عند النقر على زر "تسجيل الدخول"',
      'عند انتهاء صلاحية الشهادة الرقمية',
    ],
    options_en: [
      'When user credentials (username and password) are initially submitted',
      'Immediately upon conclusion of the TLS Handshake and derivation of the shared session key',
      'When the user clicks the "Submit / Login" button in their browser',
      'When the digital certificate reaches its designated expiration date',
    ],
    answer: 'بعد اكتمال مصافحة TLS وتوليد مفتاح الجلسة المشترك',
    answer_en: 'Immediately upon conclusion of the TLS Handshake and derivation of the shared session key',
    explanation_ar: 'المفتاح العام يُستخدم فقط في مصافحة TLS لتبادل مفتاح الجلسة بأمان. بعد ذلك، كل بيانات الجلسة تُشفَّر بالمتماثل باستخدام مفتاح الجلسة.',
    explanation_en: 'Public-key cryptography operates exclusively during the TLS handshake to authenticate and negotiate session parameters. Bulk transmission shifts to symmetric ciphers.',
  },
];
'''

with open('frontend/src/ch2_lesson1_hardQ_part1.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated frontend/src/ch2_lesson1_hardQ_part1.ts successfully!")
