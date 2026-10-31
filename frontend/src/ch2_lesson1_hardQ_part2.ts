// ============================================================
// Ch2 · Lesson 1 · Part 2 — أسئلة تحديات متقدمة (الجزء الثاني)
// شهادات رقمية · توقيع رقمي · MFA · مخاطر حديثة
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية متقدمة — الجزء الثاني ───────────────────────────

export const CH2_L1_HARD_WRITTEN_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-H-W-P2-01',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 6,
    question_ar: 'حلِّل سيناريو هجمة تصيد احتيالي (Phishing) كاملة، موضحاً كيف تعمل كل من: الشهادة الرقمية وMFA للحماية في مراحل مختلفة من الهجمة.',
    question_en: 'Analyze a complete phishing attack scenario, explaining how Digital Certificates and MFA provide layered defense at different stages of the attack.',
    ideal_answer_ar:
      'مراحل الهجمة والدفاع:\n\n'
      + 'المرحلة 1 — إنشاء الموقع المزيف:\n'
      + '- المهاجم ينشئ "mybank-secure.com" ويحصل على شهادة HTTPS مجانية.\n'
      + '- دور الشهادة الرقمية: الشهادة تُثبت فقط أن الخادم يملك نطاق "mybank-secure.com"، ولا تثبت أنه البنك الحقيقي.\n'
      + '- دفاع الشهادة: إذا حاول المهاجم استخدام نطاق البنك الأصلي مباشرة "mybank.com"، سيفشل تماماً لأن CA سترفض إصدار شهادة له دون إثبات الملكية.\n\n'
      + 'المرحلة 2 — خداع الضحية وإدخال البيانات:\n'
      + '- الضحية تنخدع وتُدخل اسم المستخدم وكلمة المرور في الموقع المزيف.\n'
      + '- المهاجم يحصل على كلمة المرور.\n\n'
      + 'المرحلة 3 — محاولة تسجيل الدخول ودور MFA:\n'
      + '- المهاجم يتوجه للموقع الحقيقي للبنك ويُدخل كلمة المرور المسروقة.\n'
      + '- حاجز MFA: النظام يطلب رمز OTP أو إشعاراً على هاتف الضحية المسجّل.\n'
      + '- النتيجة: المهاجم لا يملك الهاتف الفيزيائي للضحية، فيفشل تسجيل الدخول وتصل رسالة تنبيه للضحية بوجود محاولة دخول مشبوهة.\n\n'
      + 'الخلاصة: الشهادة تحمي اسم النطاق الأصلي من التزوير، وMFA تحمي الحساب حتى بعد نجاح التصيد وسرقة كلمة المرور.',
    ideal_answer_en:
      'Attack Lifecycle & Layered Defenses:\n\n'
      + 'Phase 1: Fraudulent Portal Creation & Certificate Role\n'
      + '- The adversary registers "mybank-login-secure.com" and obtains a Domain-Validated (DV) TLS certificate.\n'
      + '- Defense Role of PKI: The attacker CANNOT obtain a certificate for the legitimate domain "mybank.com" because CAs demand cryptographic ownership verification.\n'
      + '- Certificate Limitation: Browsers display a padlock for the phishing URL because it is encrypted, misleading unobservant users.\n\n'
      + 'Phase 2: Credential Harvest\n'
      + '- The victim enters username and master password onto the fraudulent portal, handing credentials directly to the attacker.\n\n'
      + 'Phase 3: Real Portal Login & MFA Defense Barrier\n'
      + '- The attacker navigates to the authentic bank portal and submits the harvested credentials.\n'
      + '- MFA Intervention: The bank identity provider triggers an out-of-band second factor challenge (e.g., hardware security key prompt or push notification on the victim phone).\n'
      + '- Containment: Lacking physical access to the victim second factor, the adversary is locked out, and the victim is alerted.\n\n'
      + 'Summary: Digital certificates prevent direct domain spoofing; MFA saves the account even after credentials are stolen.',
    explanation_ar:
      'سيناريو متكامل يربط بين الشهادة الرقمية (منع انتحال النطاق الأصلي) وMFA (منع الدخول بعد سرقة كلمة المرور).',
    explanation_en:
      'Holistic scenario illustrating how PKI prevents authentic domain impersonation, while MFA renders stolen passwords useless.',
  },
  {
    id: 'CH2-L1-H-W-P2-02',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'ما الفرق بين "إلغاء الشهادة" (Certificate Revocation) و"انتهاء صلاحيتها"؟ ومتى يُلجأ لكل منهما؟',
    question_en: 'What is the distinction between "Certificate Revocation" and "Certificate Expiration"? When is each triggered?',
    ideal_answer_ar:
      'انتهاء الصلاحية (Expiration):\n'
      + '- طبيعي ومُخطَّط مسبقاً: كل شهادة لها تاريخ انتهاء محدد (حالياً 398 يوماً كحد أقصى).\n'
      + '- السبب: فرض دورة تجديد دورية تضمن إعادة التحقق من ملكية النطاق وتحديث خوارزميات التشفير.\n'
      + '- الإجراء: تجديد الشهادة قبل موعد الانتهاء تلقائياً.\n\n'
      + 'إلغاء الشهادة (Revocation):\n'
      + '- استثنائي وطارئ: يتم قبل انتهاء الصلاحية المحددة.\n'
      + '- الأسباب الرئيسية:\n'
      + '  1. تسريب أو سرقة المفتاح الخاص بالخادم.\n'
      + '  2. تغيير ملكية النطاق أو اسم المؤسسة.\n'
      + '  3. اختراق جهة الـ CA المُصدِرة نفسها.\n'
      + '- آلية النشر: تُدرج الشهادة في قوائم الإلغاء (CRL) أو استعلام البروتوكول اللحظي (OCSP) لتبليغ المتصفحات برفضها فوراً.',
    ideal_answer_en:
      'Certificate Expiration:\n'
      + '- Routine & Scheduled: Every certificate has an explicit pre-set validity window (currently max 398 days).\n'
      + '- Objective: Enforces periodic domain ownership re-validation and cipher deprecation.\n'
      + '- Resolution: Automated re-issuance and certificate renewal prior to expiration.\n\n'
      + 'Certificate Revocation:\n'
      + '- Emergency & Unscheduled: Premature invalidation before the expiry timestamp.\n'
      + '- Primary Triggers:\n'
      + '  1. Server private key compromise or accidental exposure.\n'
      + '  2. Transfer of domain ownership or corporate dissolution.\n'
      + '  3. Compromise or fraudulent misissuance by the issuing CA.\n'
      + '- Notification: The serial number is added to Certificate Revocation Lists (CRLs) or published via OCSP responders so browsers immediately block the connection.',
    explanation_ar:
      'الانتهاء = أمر طبيعي بانتهاء مدة العقد. الإلغاء = فسخ العقد لظرف طارئ كسرقة المفتاح الخاص.',
    explanation_en:
      'Analogy: Expiration is a passport reaching its printed validity date. Revocation is canceling a stolen passport immediately.',
  },
  {
    id: 'CH2-L1-H-W-P2-03',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'ما "تثبيت الشهادة" (Certificate Pinning)؟ وكيف يُضيف طبقة حماية إضافية فوق نظام CA العادي؟',
    question_en: 'What is "Certificate Pinning"? And how does it supply an additional layer of security beyond traditional CA trust models?',
    ideal_answer_ar:
      'تثبيت الشهادة (Certificate Pinning):\n'
      + 'تقنية أمانية يُضمِّن فيها المطور بصمة الشهادة الرقمية أو المفتاح العام للخادم داخل كود التطبيق مباشرة (مثل تطبيقات البنوك على الهواتف).\n\n'
      + 'كيف تُضيف حماية إضافية:\n'
      + '1. نظام CA العادي: يثق التطبيق بأي شهادة موقَّعة من أي CA من بين مئات الـ CAs المعتمدة في النظام.\n'
      + '2. التهديد: إذا اختُرقت جهة CA واحدة (أو أصدرت حكومة شهادة مزيفة)، يمكن تنفيذ هجمة MITM دون تحذير.\n'
      + '3. مع Pinning: يرفض التطبيق الاتصال بالخادم إلا إذا تطابقت شهادته أو مفتاحه العام بدقة مع البصمة المحفوظة داخله، حتى لو كانت الشهادة الأخرى موقَّعة من CA معترف بها عالمياً.\n\n'
      + 'النتيجة: حماية شبه تامة لتطبيقات الهواتف المصرفية ضد هجمات رجل في الوسط (MITM).',
    ideal_answer_en:
      'Certificate / Public Key Pinning:\n'
      + 'A security practice where a client application (such as a mobile banking app) hardcodes the cryptographic hash digest of the server certificate or public key directly within its client binary.\n\n'
      + 'How it Augments Standard CA Security:\n'
      + '1. Baseline CA Architecture: Operating systems trust hundreds of public Root CAs. A breach in any single foreign CA allows adversaries to forge valid certificates for any domain.\n'
      + '2. Pinning Defense: During TLS negotiation, the client application strictly verifies that the presented server public key matches the hardcoded pin, discarding any certificate signed by an alternate CA regardless of general OS trust.\n\n'
      + 'Benefit: Provides bulletproof immunity against rogue CA compromise and hostile state-sponsored Man-in-the-Middle interceptions.',
    explanation_ar:
      'Pinning = "لا أثق إلا بهذه الشهادة المحددة المكتوبة في كودي، ولا يهمني من وقَّع غيرها من مئات الـ CA".',
    explanation_en:
      'Certificate Pinning restricts trust to a designated cryptographic signature baked directly into the mobile binary, bypassing generic CA pools.',
  },
  {
    id: 'CH2-L1-H-W-P2-04',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'قارن بين 4 تقنيات مصادقة: كلمة المرور التقليدية، OTP عبر SMS، تطبيق TOTP (مثل Google Authenticator)، ومفاتيح FIDO2/Passkeys — من حيث: الأمان ومقاومة التصيد والكفاءة.',
    question_en: 'Compare 4 authentication mechanisms: Traditional Passwords, SMS-based OTP, TOTP Authenticator Apps, and FIDO2/Passkeys — evaluated across Security, Phishing Resistance, and Usability.',
    ideal_answer_ar:
      '| التقنية | الأمان | مقاومة التصيد | الكفاءة وسهولة الاستخدام |\n'
      + '|---------|--------|---------------|-------------------------|\n'
      + '| كلمة المرور التقليدية | ضعيف جداً | معدومة (تُسرق بسهولة) | سهلة ولكن صعبة الحفظ بأمان |\n'
      + '| OTP عبر SMS | متوسط | ضعيفة (عرضة للتصيد وSIM Swap) | سهلة جداً وتعتمد على شبكة الهاتف |\n'
      + '| تطبيق TOTP | قوي | متوسطة (يمكن خداع المستخدم لإدخال الرمز) | ممتازة وتعمل بدون اتصال بالإنترنت |\n'
      + '| FIDO2 / Passkeys | فائق القوة | منيعة 100% (مرتبطة بالنطاق الأصلي) | سهلة جداً (بصمة الإصبع أو Face ID) |\n\n'
      + 'التحليل الأمني:\n'
      + '- FIDO2 هي الأقوى عالمياً لأنها تستخدم التشفير بالمفتاح العام وتربط المصادقة باسم النطاق المشفر، فلا يمكن استخدامها في موقع تصيد إطلاقاً.',
    ideal_answer_en:
      '| Mechanism | Security Level | Phishing Resistance | Usability & Overhead |\n'
      + '|---|---|---|---|\n'
      + '| Traditional Password | Very Low | None (readily harvested via phishing) | Familiar, but prone to reuse and memory failure |\n'
      + '| SMS OTP | Moderate | Poor (susceptible to real-time proxy & SIM Swaps) | Ubiquitous, depends on cellular reception |\n'
      + '| App-based TOTP | High | Moderate (attacker can proxy 6-digit code in real-time) | Fast, works offline, no carrier dependence |\n'
      + '| FIDO2 / WebAuthn / Passkeys | Maximum (State of the art) | 100% Phishing-Proof (origin-bound crypto challenge) | Seamless biometrics (Face ID/Touch ID) |\n\n'
      + 'Architectural Insight:\n'
      + 'FIDO2 utilizes origin-bound asymmetric key pairs negotiated directly by the client browser engine. Because the challenge includes the authentic origin URL, forged phishing sites cannot complete the cryptographic signature.',
    explanation_ar:
      'التسلسل التطوري للأمان: كلمة مرور ← SMS OTP ← تطبيق TOTP ← FIDO2 (الأقوى والمقاوم للتصيد بنسبة 100%).',
    explanation_en:
      'Authentication hierarchy: Passwords → SMS OTP → TOTP Authenticator → FIDO2/Passkeys (the gold standard for hardware-backed phishing immunity).',
  },
  {
    id: 'CH2-L1-H-W-P2-05',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar: 'ما "عدم التكرار" (Replay Attack) في سياق المصادقة؟ وكيف تمنعه تقنية OTP؟',
    question_en: 'What is a "Replay Attack" in the context of authentication? And how does OTP technology effectively prevent it?',
    ideal_answer_ar:
      'هجمة إعادة التشغيل (Replay Attack):\n'
      + 'يعترض المهاجم رسالة مصادقة صالحة (مثل كلمة مرور أو رمز مرور سابق) ويعيد إرسالها إلى الخادم لاحقاً دون تعديل لفتح الحساب منتحلاً شخصية الضحية.\n\n'
      + 'كيف تمنعها تقنية OTP (One-Time Password):\n'
      + '1. صالحة لمرة واحدة فقط (One-Time Use): بمجرد استخدام الرمز، يُلغى من قاعدة البيانات فوراً ويصبح باطلاً.\n'
      + '2. مقيدة زمنياً (Time-Limited): الرمز ينتهي مفعوله خلال نافذة قصيرة جداً (30-60 ثانية).\n'
      + '3. النتيجة: إذا اعترض المهاجم رمز OTP وسرقته، لا يمكنه استخدامه لأن الضحية استهلكته بالفعل، أو لأن نافذة الثواني انتهت قبل أن يرسله.',
    ideal_answer_en:
      'Replay Attack Definition:\n'
      + 'An attacker intercepts a valid authentication transmission (such as a session packet or captured credential) and retransmits it verbatim to the target server at a later time to fraudulently gain access.\n\n'
      + 'How One-Time Passwords (OTP) Neutralize It:\n'
      + '1. Ephemeral Singularity: An OTP can be submitted successfully exactly once. Once consumed by the server, the seed state increments, permanently retiring the code.\n'
      + '2. Temporal Bounding: TOTP algorithms (RFC 6238) derive codes using UNIX epoch time windows (typically 30 seconds). Outside this temporal frame, mathematical verification fails.\n'
      + '3. Result: Sniffed or intercepted historical codes are mathematically obsolete upon capture, defeating replay attempts.',
    explanation_ar:
      'OTP = استخدام لمرة واحدة + انتهاء صلاحية بالثواني. هذان القيدان يجعلان إعادة إرسال الحزمة القديمة مستحيلاً.',
    explanation_en:
      'OTP relies on single-use consumption and tight time-window synchronization to render captured authentication tokens inert against replay attacks.',
  },
  {
    id: 'CH2-L1-H-W-P2-06',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'ما هي هجمة "SIM Swap"؟ وكيف تُبطل الاعتماد على OTP عبر SMS كعامل ثانٍ؟ وما البديل الأقوى؟',
    question_en: 'What is a "SIM Swap" attack? How does it undermine SMS-based OTP as a second factor? And what is the recommended stronger alternative?',
    ideal_answer_ar:
      'هجمة SIM Swap:\n'
      + 'المهاجم يُقنع شركة الاتصالات (بالهندسة الاجتماعية أو وثائق هوية مزيفة) بنقل رقم هاتف الضحية إلى شريحة SIM جديدة تحت سيطرته.\n\n'
      + 'كيف تُبطل الـ 2FA عبر SMS:\n'
      + '1. بعد نجاح النقل، ينقطع الاتصال عن هاتف الضحية الأصلي.\n'
      + '2. تصبح جميع رسائل الـ SMS ورموز الـ OTP الخاصة بالبنوك والحسابات تصل مباشرة إلى هاتف المهاجم!\n'
      + '3. المهاجم يستخدم كلمة المرور المسروقة + رمز الـ OTP الذي وصله على شريحته للسيطرة على الحسابات.\n\n'
      + 'البديل الأقوى الموصى به:\n'
      + '- تطبيقات المصادقة (Authenticator Apps مثل Google Authenticator أو Microsoft Authenticator) لأن مفتاحها السري مخزن داخل ذاكرة الهاتف الفيزيائي ولا ينتقل بنقل شريحة الهاتف.\n'
      + '- مفاتيح الأمان الفيزيائية (Hardware Security Keys مثل YubiKey).',
    ideal_answer_en:
      'SIM Swap Attack Mechanism:\n'
      + 'An attacker uses social engineering, fraudulent credentials, or insider collusion at a cellular provider to transfer the victim phone number onto a replacement SIM card under the attacker physical control.\n\n'
      + 'How it Nullifies SMS 2FA:\n'
      + '1. The legitimate user cellular service is terminated.\n'
      + '2. All incoming SMS messages and two-factor authentication verification texts route directly to the attacker device.\n'
      + '3. By coupling previously breached passwords with intercepted OTPs, attackers execute account takeovers without touching the victim hardware.\n\n'
      + 'Recommended Robust Alternatives:\n'
      + '1. Software Authenticator Apps (Google/Microsoft Authenticator, 1Password): Cryptographic seeds remain securely isolated in local hardware storage, independent of cellular routing.\n'
      + '2. FIDO2 Hardware Tokens (YubiKey): Physically bounded cryptographic keys offering absolute immunity to telecommunication carrier exploits.',
    explanation_ar:
      'SIM Swap يُحوِّل هاتف المهاجم إلى مستقبل لرسائل الضحية؛ لذا لم تعد الهيئات الأمنية (مثل NIST) توصي بالـ SMS للمصادقة.',
    explanation_en:
      'SIM Swapping bypasses SMS 2FA at the telecom infrastructure level; NIST standards deprecate SMS-based out-of-band authentication in favor of authenticator apps and FIDO hardware.',
  },
  {
    id: 'CH2-L1-H-W-P2-07',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'مؤسسة تفكر في اختيار نظام MFA. قارن بين 3 سيناريوهات مختلفة من حيث الأمان والتكلفة وسهولة الاستخدام، واقترح الأنسب لكل حالة.',
    question_en: 'An enterprise is selecting an MFA strategy. Compare 3 distinct deployment scenarios across Security, Cost, and Usability, proposing the optimal fit for each use case.',
    ideal_answer_ar:
      'السيناريو الأول — مؤسسة صغيرة بميزانية محدودة:\n'
      + '- الاختيار: كلمة مرور + تطبيق مصادقة مجاني (Google/Microsoft Authenticator).\n'
      + '- التكلفة: صفر (مجاني تماماً).\n'
      + '- الأمان: عالي ومقاوم لهجمات SIM Swap والتنصت.\n'
      + '- سهولة الاستخدام: ممتازة على الهواتف الذكية للموظفين.\n\n'
      + 'السيناريو الثاني — بنك أو مؤسسة حكومية بالغة الحساسية:\n'
      + '- الاختيار: كلمة مرور + مفاتيح أمان فيزيائية FIDO2 (YubiKey) + بصمة الإصبع.\n'
      + '- التكلفة: مرتفعة (شراء مفاتيح لكل موظف وبنية تحتية تدعمها).\n'
      + '- الأمان: فائق القوة ومقاوم للتصيد الاحتيالي بنسبة 100%.\n'
      + '- سهولة الاستخدام: نقرة إصبع واحدة وسريعة جداً.\n\n'
      + 'السيناريو الثالث — منصة تجارة إلكترونية لعامة المستهلكين:\n'
      + '- الاختيار: كلمة مرور + رمز SMS أو Passkeys للأجهزة الحديثة.\n'
      + '- التكلفة: متوسطة (تكلفة رسائل الـ SMS).\n'
      + '- الأمان: متوسط إلى عالي.\n'
      + '- سهولة الاستخدام: ملائمة لأي مستخدم يملك هاتفاً دون الحاجة لتثبيت برامج إضافية.',
    ideal_answer_en:
      'Enterprise MFA Trade-Off Evaluation:\n\n'
      + 'Scenario 1: Small Business with Tight Budget\n'
      + '- Architecture: Password + Free Mobile TOTP App (Google/Microsoft Authenticator).\n'
      + '- Cost: Zero software licensing / hardware cost (utilizes existing staff mobile devices).\n'
      + '- Security: Strong; eliminates telecom SMS-interception vulnerabilities.\n'
      + '- Usability: Moderate; requires employees to generate codes during login.\n\n'
      + 'Scenario 2: Critical Infrastructure / Financial Institution\n'
      + '- Architecture: Master Credentials + FIDO2 Hardware Keys (YubiKey) + Local Biometrics.\n'
      + '- Cost: High capital expenditure for hardware tokens and enterprise directory integration.\n'
      + '- Security: State-of-the-art; 100% immune to credential-harvesting reverse proxies and phishing.\n'
      + '- Usability: Superior; one physical tap completes cryptographic authentication.\n\n'
      + 'Scenario 3: High-Volume Consumer Web Platform\n'
      + '- Architecture: Password + WebAuthn Passkeys fallback to SMS OTP.\n'
      + '- Cost: Low ongoing telecom operational fees.\n'
      + '- Security: Balanced risk posture.\n'
      + '- Usability: Maximum friction-free adoption across diverse consumer hardware.',
    explanation_ar:
      'الأمان دائماً موازنة بين التكلفة والمخاطر وسهولة الاستخدام (Usability vs Security vs Cost).',
    explanation_en:
      'Security engineering is the art of balancing risk tolerance against financial cost and operational friction.',
  },
  {
    id: 'CH2-L1-H-W-P2-08',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'ما أهمية "طول مفتاح التشفير" (Key Length) في الأمان؟ وما الفرق بين AES-128 وAES-256 من حيث المقاومة للهجمات؟',
    question_en: 'What is the security significance of "Key Length"? And what is the operational difference between AES-128 and AES-256 regarding attack resistance?',
    ideal_answer_ar:
      'أهمية طول المفتاح:\n'
      + 'طول المفتاح = حجم الفضاء الذي يجب على المهاجم البحث فيه بأسلوب القوة الغاشمة (Brute Force).\n'
      + 'كل بت إضافي يُضاعف عدد الاحتمالات إلى الضعف (2^n).\n\n'
      + 'المقارنة بين AES-128 وAES-256:\n'
      + '1. عدد الاحتمالات:\n'
      + '   - AES-128: يحتوي على 2^128 احتمالاً (رقم فلكي يحتاج مليارات السنين لأقوى حواسيب الأرض لكسره).\n'
      + '   - AES-256: يحتوي على 2^256 احتمالاً (يُعادل عدد الذرات في الكون المنظور تقريباً).\n\n'
      + '2. المقاومة للحوسبة الكمومية (Quantum Resistance):\n'
      + '   - خوارزمية جروفر (Grover\'s Algorithm) الكمومية تقلص الأمان الفعلي إلى النصف (جذر تربيعي).\n'
      + '   - AES-128 يصبح أمانه الفعلي 64-bit تحت الحاسوب الكمومي (قابل للكسر نظرياً).\n'
      + '   - AES-256 يظل أمانه الفعلي 128-bit تحت الحاسوب الكمومي، وهو أمان منيع ومستحيل الكسر.\n\n'
      + 'الخلاصة: AES-128 كافٍ وآمن لليوم، لكن AES-256 هو المعيار الذهبي المعتمد حكومياً والمقاوم للمستقبل الكمومي.',
    ideal_answer_en:
      'Significance of Key Length:\n'
      + 'Key length dictates the combinatorial keyspace an adversary must exhaust during brute-force cryptanalysis. Every additional key bit doubles the search complexity (2^n).\n\n'
      + 'AES-128 vs. AES-256 Comparison:\n'
      + '1. Classical Exhaustive Search:\n'
      + '   - AES-128 offers 2^128 keyspace permutations—astronomically secure; supercomputers require billions of years to exhaustively crack.\n'
      + '   - AES-256 expands permutations to 2^256—surpassing the estimated atomic count of the observable universe.\n\n'
      + '2. Quantum Cryptanalysis Resistance:\n'
      + '   - Quantum computers running Grover Algorithm yield a quadratic speedup, effectively halving key security bits.\n'
      + '   - Under Grover attack, AES-128 degrades to an effective 64-bit keyspace, rendering it theoretically vulnerable.\n'
      + '   - AES-256 degrades to 128 bits of post-quantum security, remaining unconditionally uncrackable.\n\n'
      + 'Conclusion: AES-128 is secure for classical commerce, but AES-256 is the government standard engineered for long-term quantum resilience.',
    explanation_ar:
      'إضافة بت واحد يضاعف الأمان. في مواجهة الحواسيب الكمومية: خوارزمية جروفر تقسم القوة للنصف، لذا AES-256 هو الأضمن.',
    explanation_en:
      'Grover quantum algorithm halves symmetric key strength; AES-256 is essential because its halved 128-bit security margin remains impenetrable.',
  },
  {
    id: 'CH2-L1-H-W-P2-09',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'ما "Perfect Forward Secrecy" (PFS)؟ وكيف يحمي البيانات حتى بعد كشف المفتاح الخاص للخادم؟',
    question_en: 'What is "Perfect Forward Secrecy" (PFS)? How does it protect past recorded communications even if the server private key is compromised in the future?',
    ideal_answer_ar:
      'Perfect Forward Secrecy (السرية المستقبلية التامة):\n'
      + 'خاصية في بروتوكولات التشفير الحديثة (مثل TLS 1.3) تضمن أن اختراق المفتاح الخاص للخادم في المستقبل لا يُمكن المهاجم من فك تشفير جلسات الاتصال السابقة التي سجلها.\n\n'
      + 'كيف تعمل وتوفر الحماية:\n'
      + '1. بدون PFS (أنظمة RSA القديمة): كان مفتاح الجلسة يُشفَّر مباشرة بالمفتاح الخاص للخادم. فإذا سجّل مهاجم حركة المرور لسنوات وسرق المفتاح الخاص لاحقاً، استطاع فك تشفير كل تلك الجلسات التاريخية دفعة واحدة!\n'
      + '2. مع PFS (خوارزميات ECDHE): يتم توليد مفاتيح جلسة سريعة الزوال (Ephemeral Keys) ومستقلة لكل جلسة اتصال على حدة. وبمجرد انتهاء الجلسة، تُحذف هذه المفاتيح من الذاكرة نهائياً.\n'
      + '3. النتيجة: حتى لو سرق المهاجم المفتاح الخاص للخادم غداً، لن يستفيد شيئاً لأن مفاتيح الجلسات السابقة قد حُذفت للأبد ولا يمكن اشتقاقها من مفتاح الخادم.',
    ideal_answer_en:
      'Perfect Forward Secrecy (PFS):\n'
      + 'A fundamental cryptographic property ensuring that the compromise of long-term server private keys does not compromise past encrypted session traffic.\n\n'
      + 'Mechanism & Historical Protection:\n'
      + '1. Static Key Exchange (Vulnerable Legacy Model): In older TLS RSA exchanges, the client encrypted the session key with the server static public key. Adversaries could intercept and store encrypted internet traffic for years, then decrypt all historical communications upon obtaining the private key.\n'
      + '2. Ephemeral Key Exchange (PFS with ECDHE): TLS generates unique, temporary (ephemeral) key parameters discarded immediately upon session closure.\n'
      + '3. Outcome: Even if an adversary subverts a corporate data center and seizes server private keys, historical recordings remain indecipherable forever.',
    explanation_ar:
      'PFS = كل جلسة لها مفتاح مؤقت يُدمَّر فور انتهائها؛ المفتاح طويل المدى للخادم لا يستطيع فك تشفير الجلسات الماضية.',
    explanation_en:
      'PFS ensures ephemeral session keys are destroyed upon disconnect; master private keys cannot reverse historical session ciphers.',
  },
  {
    id: 'CH2-L1-H-W-P2-10',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'ناقش تأثير الحوسبة الكمومية (Quantum Computing) على منظومة تشفير الإنترنت الحالية (TLS, PKI, RSA)، وما الحلول المقترحة؟',
    question_en: 'Discuss the impact of Quantum Computing on current internet encryption architectures (TLS, PKI, RSA), and outline the proposed post-quantum cryptographic remedies.',
    ideal_answer_ar:
      'الحوسبة الكمومية وتهديدها لتشفير الإنترنت:\n\n'
      + 'ما الذي تكسره الحوسبة الكمومية:\n'
      + '1. خوارزمية شور (Shor\'s Algorithm): تستطيع في دقائق حل المسائل الرياضية الصعبة (كالتحليل إلى عوامل أولية واللوغاريتم المنفصل) التي يعتمد عليها التشفير غير المتماثل بالكامل.\n'
      + '2. الأنظمة المهددة بالانهيار التام: خوارزميات RSA وDiffie-Hellman وECC (المنحنيات الإهليلجية) المستخدمة في مصافحة TLS، والشهادات الرقمية، والتوقيعات الرقمية.\n'
      + '3. التشفير المتماثل: يتأثر بخوارزمية جروفر التي تنصف طول المفتاح الفعلي، ولكن AES-256 يظل آمناً ومنيعاً.\n\n'
      + 'الحلول المقترحة (Post-Quantum Cryptography — PQC):\n'
      + '1. اعتماد معايير التشفير ما بعد الكمي الصادرة عن معهد NIST، مثل ML-KEM (Kyber) لتبادل المفاتيح وML-DSA (Dilithium) للتوقيعات الرقمية.\n'
      + '2. التشفير الهجين (Hybrid Key Exchange): دمج خوارزميات كلاسيكية (ECDHE) مع خوارزميات كمومية (Kyber) في نفس مصافحة TLS.\n'
      + '3. الترقية الإلزامية لـ AES-256 لتأمين البيانات المتماثلة المخزنة.',
    ideal_answer_en:
      'Impact of Quantum Computing on Cryptographic Architecture:\n\n'
      + 'Threat Landscape:\n'
      + '1. Shor Algorithm Threat: When fault-tolerant quantum computers emerge, Shor algorithm will solve prime factorization and discrete logarithms in polynomial time, completely shattering asymmetric cryptography.\n'
      + '2. Obsoleted Systems: RSA, Diffie-Hellman, and Elliptic Curve Cryptography (ECC) will collapse, invalidating traditional TLS handshakes, PKI digital certificates, and digital signatures.\n'
      + '3. Symmetric Cipher Resilience: Grover algorithm provides quadratic speedup (halving key security), but AES-256 retains 128 bits of quantum security, remaining effectively invincible.\n\n'
      + 'Post-Quantum Cryptography (PQC) Solutions:\n'
      + '1. NIST Standardized PQC Algorithms: Migrating to lattice-based cryptography, such as ML-KEM (Kyber) for key encapsulation and ML-DSA (Dilithium) for digital signatures.\n'
      + '2. Hybrid TLS Handshakes: Combining classical ECDHE with post-quantum Kyber in parallel so connections remain secure even if one algorithm develops unexpected mathematical flaws.\n'
      + '3. Mandatory AES-256 Transition: Phasing out legacy AES-128 across all long-term archived datastores.',
    explanation_ar:
      'الحوسبة الكمومية تهدد التشفير غير المتماثل (RSA, ECC) بخوارزمية شور. الحل = معايير NIST الجديدة (PQC مثل Kyber).',
    explanation_en:
      'Shor algorithm threatens asymmetric PKI; the defense is transitioning to NIST Post-Quantum Cryptography (PQC) standards like ML-KEM/Kyber.',
  },
];

// ─── MCQ متقدمة — الجزء الثاني ───────────────────────────────

export const CH2_L1_HARD_MCQ_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-H-MCQ-P2-01',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما الميزة الأساسية لـ TLS 1.3 مقارنةً بـ TLS 1.2؟',
    question_en: 'What is the primary advantage of TLS 1.3 compared to TLS 1.2?',
    options: [
      'دعم تشفير RC4 الأقدم للتوافق',
      'تقليل جولات المصافحة من 2 إلى 1 + Perfect Forward Secrecy إلزامي',
      'إضافة دعم MD5 لتوقيع الشهادات',
      'السماح بـ RSA لتبادل المفاتيح مباشرةً',
    ],
    options_en: [
      'Supporting legacy RC4 ciphers for backward compatibility',
      'Reducing handshake latency from 2 Round Trips to 1 RTT + mandatory Perfect Forward Secrecy',
      'Adding MD5 hashing support for certificate validation',
      'Permitting legacy RSA key exchange modes directly',
    ],
    answer: 'تقليل جولات المصافحة من 2 إلى 1 + Perfect Forward Secrecy إلزامي',
    answer_en: 'Reducing handshake latency from 2 Round Trips to 1 RTT + mandatory Perfect Forward Secrecy',
    explanation_ar: 'TLS 1.3 أسرع (1-RTT بدلاً من 2-RTT) وأكثر أماناً بحذف الخوارزميات الضعيفة وإلزام خاصية Perfect Forward Secrecy.',
    explanation_en: 'TLS 1.3 optimizes latency to a single round-trip (1-RTT) while eliminating legacy insecure ciphers and mandating Perfect Forward Secrecy.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-02',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما الهدف من خاصية "Perfect Forward Secrecy" في TLS؟',
    question_en: 'What is the objective of the "Perfect Forward Secrecy" (PFS) property in TLS?',
    options: [
      'تسريع عملية مصافحة TLS',
      'ضمان أن كشف المفتاح الخاص مستقبلاً لا يُفك تشفير الجلسات السابقة',
      'تمكين التشفير المتماثل فقط بدون مفتاح عام',
      'منع استخدام شهادات منتهية الصلاحية',
    ],
    options_en: [
      'Accelerating the computational speed of the TLS handshake',
      'Guaranteeing that future compromise of a private key cannot decrypt past recorded sessions',
      'Enabling symmetric ciphers exclusively without requiring public keys',
      'Preventing web browsers from accepting expired digital certificates',
    ],
    answer: 'ضمان أن كشف المفتاح الخاص مستقبلاً لا يُفك تشفير الجلسات السابقة',
    answer_en: 'Guaranteeing that future compromise of a private key cannot decrypt past recorded sessions',
    explanation_ar: 'PFS تولد مفاتيح جلسة مؤقتة (Ephemeral) تُحذف فور انتهاء الاتصال، فلا يفيد المهاجم سرقة مفتاح الخادم لاحقاً.',
    explanation_en: 'PFS relies on ephemeral key parameters destroyed after each session, immunizing historical traffic against future key compromise.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-03',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أي من مواقف التالية يُثبت أن HTTPS وحده لا يكفي للأمان الكامل؟',
    question_en: 'Which scenario proves that HTTPS alone does NOT guarantee comprehensive security?',
    options: [
      'موقع يستخدم TLS 1.3 + AES-256',
      'موقع تصيد احتيالي يحمل شهادة HTTPS صادرة بشكل قانوني من CA',
      'موقع بنكي بدون 2FA',
      'موقع يستخدم شهادة موقَّعة ذاتياً (Self-Signed)',
    ],
    options_en: [
      'A server running modern TLS 1.3 with AES-256 ciphers',
      'A phishing scam website sporting a legally issued, valid HTTPS certificate from an accredited CA',
      'An online banking system operating without two-factor authentication',
      'A local staging server presenting a self-signed development certificate',
    ],
    answer: 'موقع تصيد احتيالي يحمل شهادة HTTPS صادرة بشكل قانوني من CA',
    answer_en: 'A phishing scam website sporting a legally issued, valid HTTPS certificate from an accredited CA',
    explanation_ar: 'مواقع التصيد الاحتيالي تستطيع الحصول على شهادات HTTPS قانونية ومجانية، مما يثبت أن HTTPS يؤمِّن النقل لكنه لا يضمن صدق المحتوى.',
    explanation_en: 'Phishing websites routinely acquire legitimate automated DV certificates, demonstrating that encrypted transit does not equal trustworthy content.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-04',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'VERY_HARD',
    question_ar: 'ما الخوارزمية الكمومية التي تُهدد مباشرةً أمان RSA وTLS الحالي؟',
    question_en: 'Which quantum algorithm directly threatens the security foundation of RSA and current asymmetric TLS?',
    options: ['خوارزمية Grover', 'خوارزمية Shor', 'خوارزمية Dijkstra', 'خوارزمية AES-GCM'],
    options_en: ['Grover Algorithm', 'Shor Algorithm', 'Dijkstra Algorithm', 'AES-GCM Algorithm'],
    answer: 'خوارزمية Shor',
    answer_en: 'Shor Algorithm',
    explanation_ar: "خوارزمية شور (Shor's Algorithm) تستطيع تفكيك الأعداد الأولية في وقت قياسي مما يكسر RSA وECC.",
    explanation_en: 'Shor algorithm efficiently factors large integers and computes discrete logs in polynomial time, breaking asymmetric crypto.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-05',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما هجمة "SIM Swap" وكيف تتحايل على 2FA عبر SMS؟',
    question_en: 'What is a "SIM Swap" attack, and how does it circumvent SMS-based 2FA?',
    options: [
      'المهاجم يكسر تشفير الرسائل النصية باستخدام نص مشفر',
      'المهاجم يُقنع شركة الاتصالات بنقل رقم الهاتف لشريحة يتحكم بها',
      'المهاجم يُثبِّت برنامجاً خبيثاً على هاتف الضحية',
      'المهاجم يستخدم هوائياً لاعتراض إشارة SMS',
    ],
    options_en: [
      'The attacker cracks SMS encryption using differential cryptanalysis',
      'The attacker socially engineers the cellular carrier into reassigning the victim phone number to an attacker SIM',
      'The attacker covertly installs malware onto the physical smartphone of the victim',
      'The attacker sets up a radio antenna tower to sniff cellular SMS frequencies',
    ],
    answer: 'المهاجم يُقنع شركة الاتصالات بنقل رقم الهاتف لشريحة يتحكم بها',
    answer_en: 'The attacker socially engineers the cellular carrier into reassigning the victim phone number to an attacker SIM',
    explanation_ar: 'في هجمة SIM Swap ينقل المهاجم خط الهاتف بالاحتيال على مزود الخدمة فتصله رموز الـ SMS مباشرة.',
    explanation_en: 'SIM swapping transfers victim mobile routing to the attacker SIM card, redirecting all one-time SMS verification codes.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-06',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما "Certificate Transparency" (CT) وما هدفه؟',
    question_en: 'What is "Certificate Transparency" (CT), and what is its primary security objective?',
    options: [
      'إخفاء هوية مالك الشهادة للحفاظ على الخصوصية',
      'سجل عام يُوثِّق كل الشهادات المُصدَرة لمراقبة الشهادات المزيفة',
      'تشفير الشهادة الرقمية بمفتاح إضافي',
      'تقليل حجم الشهادة لتسريع المصافحة',
    ],
    options_en: [
      'Masking the identity of domain holders to preserve privacy',
      'A publicly auditable, append-only ledger logging all issued certificates to detect rogue or fraudulent issuances',
      'Encrypting digital certificates with secondary corporate keys',
      'Compressing certificate file sizes to minimize handshake overhead',
    ],
    answer: 'سجل عام يُوثِّق كل الشهادات المُصدَرة لمراقبة الشهادات المزيفة',
    answer_en: 'A publicly auditable, append-only ledger logging all issued certificates to detect rogue or fraudulent issuances',
    explanation_ar: 'شفافية الشهادات (CT) تجعل كل شهادة تصدرها أي CA مسجلة علناً في سجل عام لمنع وإلغاء الشهادات المشبوهة.',
    explanation_en: 'Certificate Transparency (CT) is an open audit framework logging every issued TLS certificate to detect malicious or unauthorized certificates.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-07',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أي من الخوارزميات التالية اختارتها NIST كمعيار للتشفير المقاوم للحوسبة الكمومية؟',
    question_en: 'Which algorithm was chosen by NIST as a primary standard for post-quantum key encapsulation (PQC)?',
    options: ['RSA-4096', 'ML-KEM (Kyber)', 'AES-128', 'Elliptic Curve P-256'],
    options_en: ['RSA-4096', 'ML-KEM (Kyber)', 'AES-128', 'Elliptic Curve P-256'],
    answer: 'ML-KEM (Kyber)',
    answer_en: 'ML-KEM (Kyber)',
    explanation_ar: 'اعتمدت NIST خوارزمية ML-KEM (المعروفة سابقاً بـ Crystals-Kyber) كمعيار رئيسي للتشفير ما بعد الكمي.',
    explanation_en: 'NIST officially standardized ML-KEM (formerly Crystals-Kyber) as the global post-quantum key encapsulation standard.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-08',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما الفرق بين OCSP وCRL في التحقق من حالة الشهادة؟',
    question_en: 'What is the operational distinction between OCSP and CRL for certificate validation status?',
    options: [
      'OCSP قائمة ثابتة، CRL استعلام فوري',
      'OCSP استعلام فوري عن شهادة محددة، CRL قائمة دورية بالشهادات الملغاة',
      'كلاهما متطابق في الوظيفة',
      'OCSP للمواقع الكبيرة، CRL للمواقع الصغيرة',
    ],
    options_en: [
      'OCSP is a static offline text list, whereas CRL is an instantaneous query protocol',
      'OCSP provides real-time online status queries for a specific certificate; CRL is a periodic downloaded list of revoked certificates',
      'Both protocols perform identical synchronous file downloads',
      'OCSP is reserved for enterprise intranets; CRL is used exclusively on public domains',
    ],
    answer: 'OCSP استعلام فوري عن شهادة محددة، CRL قائمة دورية بالشهادات الملغاة',
    answer_en: 'OCSP provides real-time online status queries for a specific certificate; CRL is a periodic downloaded list of revoked certificates',
    explanation_ar: 'CRL قائمة طويلة تُحمَّل دورياً، بينما OCSP يُرسل استعلاماً فورياً خفيفاً عن شهادة واحدة محددة.',
    explanation_en: 'CRL downloads large periodic revocation files; OCSP queries the revocation status of an individual certificate in real time.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-09',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما هجمة "Replay Attack" وما الميزة في OTP التي تمنعها؟',
    question_en: 'What is a "Replay Attack", and which design property in OTP neutralizes it?',
    options: [
      'المهاجم يُعيد تشغيل نفس رمز المصادقة لاحقاً — يمنعها OTP بصلاحية لمرة واحدة ووقت محدود',
      'المهاجم يُكرِّر طلبات HTTP — يمنعها OTP بتشفير الجلسة',
      'المهاجم يُكرِّر فتح صفحة تسجيل الدخول — يمنعها OTP بالحدّ من المحاولات',
      'المهاجم يُعيد إرسال كلمة المرور — يمنعها OTP بطول الرمز',
    ],
    options_en: [
      'An attacker retransmits a previously captured valid authentication token—neutralized by OTP single-use and time expiration',
      'An attacker repeats HTTP GET requests—neutralized by session token encryption',
      'An attacker rapidly reopens login tabs—neutralized by rate-limiting algorithms',
      'An attacker re-submits a static password—neutralized by code character length',
    ],
    answer: 'المهاجم يُعيد تشغيل نفس رمز المصادقة لاحقاً — يمنعها OTP بصلاحية لمرة واحدة ووقت محدود',
    answer_en: 'An attacker retransmits a previously captured valid authentication token—neutralized by OTP single-use and time expiration',
    explanation_ar: 'OTP يُستخدم لمرة واحدة فقط ولدقائق محدودة جداً، مما يجعل إعادة إرسال الرمز القديم غير مجدية إطلاقاً.',
    explanation_en: 'Replay attacks re-send sniffed credentials; OTP single-use semantics and expiring time windows render historical tokens useless.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-10',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'VERY_HARD',
    question_ar: 'ما الميزة الفريدة لـ FIDO2/Passkeys التي تجعلها مقاومة للتصيد الاحتيالي؟',
    question_en: 'What unique architectural property makes FIDO2 / Passkeys fundamentally phishing-proof?',
    options: [
      'الرمز أطول وأكثر تعقيداً من OTP التقليدي',
      'يستخدم تشفيراً أقوى من AES-256',
      'الاستجابة مرتبطة بنطاق الموقع — لا تعمل على مواقع مزيفة',
      'يتطلب اتصال إنترنت بدون شبكة',
    ],
    options_en: [
      'The generated token string is significantly longer and more complex than 6-digit OTPs',
      'It deploys proprietary symmetric ciphers mathematically stronger than AES-256',
      'The cryptographic assertion is cryptographically bound to the authentic domain origin—it will not respond to phishing URLs',
      'It requires offline isolated air-gapped connectivity',
    ],
    answer: 'الاستجابة مرتبطة بنطاق الموقع — لا تعمل على مواقع مزيفة',
    answer_en: 'The cryptographic assertion is cryptographically bound to the authentic domain origin—it will not respond to phishing URLs',
    explanation_ar: 'FIDO2 يربط التوقيع بالمجال (Origin-bound) في كود المتصفح نفسه، فلا يُرسل التوقيع لموقع تصيد أبداً مهما تشابه اسمه.',
    explanation_en: 'FIDO2 WebAuthn credentials are bound cryptographically to the authentic domain origin, rendering them non-functional on spoofed lookalike sites.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-11',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما "Certificate Pinning" ومتى يُستخدم؟',
    question_en: 'What is "Certificate Pinning", and when is it primarily implemented?',
    options: [
      'إلغاء الشهادة وتثبيت شهادة جديدة تلقائياً',
      'تضمين شهادة محددة داخل التطبيق ورفض أي شهادة أخرى حتى من CA موثوقة',
      'تثبيت الشهادة في ذاكرة المتصفح لتسريع الاتصال',
      'قفل الشهادة بكلمة مرور إضافية',
    ],
    options_en: [
      'Automatically revoking and reinstalling fresh certificates upon reboot',
      'Embedding specific certificate hashes inside client apps, rejecting all others even if signed by trusted CAs',
      'Caching certificates in browser RAM to expedite DNS resolution',
      'Encrypting digital certificates with secondary administrative passwords',
    ],
    answer: 'تضمين شهادة محددة داخل التطبيق ورفض أي شهادة أخرى حتى من CA موثوقة',
    answer_en: 'Embedding specific certificate hashes inside client apps, rejecting all others even if signed by trusted CAs',
    explanation_ar: 'Pinning يمنع هجمات MITM المتقدمة بتجاوز فحص الـ CAs العامة والاعتماد الحصري على الشهادة المدمجة في التطبيق.',
    explanation_en: 'Pinning protects mobile applications by hardcoding explicit public keys, rejecting rogue certificates issued by compromised external CAs.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-12',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما "OCSP Stapling" وكيف يُحسِّن أداء HTTPS؟',
    question_en: 'What is "OCSP Stapling", and how does it enhance HTTPS performance and privacy?',
    options: [
      'يُرسِل الخادم استجابة OCSP مُحدَّثة كجزء من مصافحة TLS بدلاً من طلبها من CA',
      'يُلغي الحاجة للشهادات الرقمية تماماً',
      'يُشفِّر استجابة OCSP بالمفتاح العام للعميل',
      'يُوقِف صلاحية الشهادة عند انتهاء كل جلسة',
    ],
    options_en: [
      'The server appends a pre-fetched, CA-signed OCSP response directly inside the TLS handshake instead of the client querying the CA',
      'Completely eliminates the architectural requirement for digital certificates',
      'Encrypts revocation responses using the ephemeral client public key',
      'Terminates certificate validity immediately upon session completion',
    ],
    answer: 'يُرسِل الخادم استجابة OCSP مُحدَّثة كجزء من مصافحة TLS بدلاً من طلبها من CA',
    answer_en: 'The server appends a pre-fetched, CA-signed OCSP response directly inside the TLS handshake instead of the client querying the CA',
    explanation_ar: 'OCSP Stapling يُسرِّع الاتصال ويحمي خصوصية العميل لأن الخادم يُرفق إثبات صلاحية شهادته موقَّعة من CA مع المصافحة مباشرة.',
    explanation_en: 'OCSP Stapling bundles a time-stamped CA revocation proof within the initial server handshake, improving latency and preserving client privacy.',
  },
  {
    id: 'CH2-L1-H-MCQ-P2-13',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'VERY_HARD',
    question_ar: 'في TLS 1.3، لماذا لا يُستخدَم RSA لتبادل المفاتيح مباشرةً رغم وجوده في الشهادة؟',
    question_en: 'In TLS 1.3, why is RSA key exchange completely eliminated despite RSA certificates still being supported for authentication?',
    options: [
      'لأن RSA أبطأ من ECDHE ولا يوفر Perfect Forward Secrecy',
      'لأن RSA لا يعمل مع AES-256',
      'لأن الشهادة لا تحتوي على المفتاح العام في TLS 1.3',
      'لأن ECDHE يُلغي الحاجة للشهادات الرقمية',
    ],
    options_en: [
      'Because RSA static key exchange fails to provide Perfect Forward Secrecy and is computationally slower than ECDHE',
      'Because RSA is mathematically incompatible with modern AES-256 ciphers',
      'Because digital certificates no longer contain public keys in TLS 1.3',
      'Because ECDHE entirely removes the necessity for digital certificates',
    ],
    answer: 'لأن RSA أبطأ من ECDHE ولا يوفر Perfect Forward Secrecy',
    answer_en: 'Because RSA static key exchange fails to provide Perfect Forward Secrecy and is computationally slower than ECDHE',
    explanation_ar: 'تبادل مفاتيح RSA الثابت لا يوفر السرية المستقبلية (PFS)، فإذا كُشف مفتاح الخادم تم فك كل الجلسات السابقة؛ لذا ألغاه TLS 1.3 تماماً.',
    explanation_en: 'Static RSA key exchange lacks Perfect Forward Secrecy; TLS 1.3 mandates ephemeral Diffie-Hellman (ECDHE) for all session derivations.',
  },
];
