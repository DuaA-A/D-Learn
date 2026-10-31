# -*- coding: utf-8 -*-
"""
Script to update frontend/src/ch2_lesson1_officialQ_part2.ts with full English translations
"""

content = '''// ============================================================
// Ch2 · Lesson 1 · Part 2 — أسئلة وزارة الرسمية (الجزء الثاني)
// الشهادة الرقمية · التوقيع الرقمي · 2FA · MFA
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية وزارية — الجزء الثاني ─────────────────────────

export const CH2_L1_OFFICIAL_WRITTEN_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-OFF-W-P2-01',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ما هي الشهادة الرقمية؟ وما مكوناتها الأساسية؟',
    question_en: 'What is a digital certificate? And what are its fundamental components?',
    ideal_answer_ar:
      'الشهادة الرقمية هي وثيقة إلكترونية تُصدرها جهة إصدار شهادات موثوقة (Certificate Authority — CA).\\n\\n'
      + 'مكوناتها الأساسية:\\n'
      + '1. اسم النطاق (Domain Name): الموقع الذي تخص له الشهادة.\\n'
      + '2. المفتاح العام للخادم: يُستخدم في تشفير مفتاح الجلسة.\\n'
      + '3. معلومات الجهة المُصدِرة (CA).\\n'
      + '4. تواريخ الصلاحية (بداية — انتهاء).\\n'
      + '5. التوقيع الرقمي للـ CA: يثبت صحة الشهادة.\\n\\n'
      + 'تشبيه: الشهادة الرقمية = بطاقة الهوية الوطنية للموقع الإلكتروني.',
    ideal_answer_en:
      'A digital certificate is an electronic credential issued by a trusted Certificate Authority (CA).\\n\\n'
      + 'Key Components:\\n'
      + '1. Domain Name / Subject: The website or organization identity.\\n'
      + '2. Server Public Key: Used to encrypt the session key or negotiate keys.\\n'
      + '3. Issuer (CA) Information: Identifying the certificate authority.\\n'
      + '4. Validity Dates: Valid-from and expiration timestamps.\\n'
      + '5. CA Digital Signature: Authenticates that the certificate has not been altered.\\n\\n'
      + 'Analogy: Digital certificate = national ID card of a website.',
    explanation_ar:
      'تذكّر: الشهادة = 5 مكونات. الأهم: اسم النطاق + المفتاح العام + توقيع CA.',
    explanation_en:
      'Remember: A certificate contains 5 core components. Most critical: Domain name + Public key + CA signature.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-02',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح مفهوم "سلسلة الثقة" في الشهادات الرقمية وكيف تعمل؟',
    question_en: 'Explain the concept of "Chain of Trust" in digital certificates and how it operates?',
    ideal_answer_ar:
      'سلسلة الثقة (Chain of Trust) هي التسلسل الهرمي الذي يمتد من CA الجذرية إلى شهادة الموقع:\\n\\n'
      + '1. CA الجذرية (Root CA):\\n'
      + '   - جهة الثقة العليا (مثل DigiCert، Comodo).\\n'
      + '   - شهاداتها مُثبَّتة مسبقاً في المتصفحات وأنظمة التشغيل.\\n\\n'
      + '2. CA الوسيطة (Intermediate CA):\\n'
      + '   - تُصدر شهاداتها CA الجذرية.\\n'
      + '   - تُصدر هي بدورها شهادات المواقع.\\n\\n'
      + '3. شهادة الموقع (End-entity Certificate):\\n'
      + '   - تُصدرها CA الوسيطة للموقع المحدد.\\n\\n'
      + 'كيف يتحقق المتصفح:\\n'
      + 'يتتبع المتصفح السلسلة من شهادة الموقع صعوداً حتى يصل لـ CA جذرية يثق بها.',
    ideal_answer_en:
      'The Chain of Trust is a hierarchical validation path extending from a Root CA down to the end-entity certificate:\\n\\n'
      + '1. Root CA:\\n'
      + '   - Top-level trust anchor (e.g., DigiCert, GlobalSign).\\n'
      + '   - Pre-installed directly into browser and operating system trust stores.\\n\\n'
      + '2. Intermediate CA:\\n'
      + '   - Certified by the Root CA to isolate the root key from daily signing.\\n'
      + '   - Directly signs and issues certificates to domain owners.\\n\\n'
      + '3. End-Entity (Website) Certificate:\\n'
      + '   - Issued to a specific website domain.\\n\\n'
      + 'Validation Process: The browser traces the cryptographic signatures up the chain until it matches a pre-trusted Root CA.',
    explanation_ar:
      'السلسلة: CA جذرية → CA وسيطة → شهادة الموقع. المتصفح يثق بالجذرية مسبقاً فيثق بكل ما توقعه.',
    explanation_en:
      'Chain structure: Root CA → Intermediate CA → Server Certificate. Pre-existing trust in the root validates all certificates below it.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-03',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ما التوقيع الرقمي؟ وما الخصائص الثلاث التي يوفرها؟',
    question_en: 'What is a digital signature? And what are the three security properties it delivers?',
    ideal_answer_ar:
      'التوقيع الرقمي هو تقنية تشفير تُستخدم للتحقق من صحة البيانات وهوية المُرسِل.\\n\\n'
      + 'آلية العمل:\\n'
      + '1. يُنشئ المرسل "بصمة" (hash) للبيانات.\\n'
      + '2. يُشفِّر البصمة بمفتاحه الخاص → يُصبح هذا التوقيع الرقمي.\\n'
      + '3. يُرسِل البيانات + التوقيع معاً.\\n'
      + '4. يفك المستقبل تشفير التوقيع بالمفتاح العام للمرسل ويُقارن البصمة.\\n\\n'
      + 'الخصائص الثلاث:\\n'
      + '1. كشف التلاعب: أي تعديل في البيانات يُغيِّر البصمة.\\n'
      + '2. كشف انتحال الشخصية: فقط صاحب المفتاح الخاص يستطيع توليد التوقيع.\\n'
      + '3. عدم التنصل (Non-repudiation): المُرسِل لا يستطيع إنكار رسالته.',
    ideal_answer_en:
      'A digital signature is a cryptographic mechanism used to authenticate data integrity and sender origin.\\n\\n'
      + 'Mechanism:\\n'
      + '1. Sender computes a cryptographic hash of the message.\\n'
      + '2. Sender encrypts the hash with their private key → yielding the digital signature.\\n'
      + '3. The message and signature are transmitted together.\\n'
      + '4. Recipient decrypts the signature using the sender public key and compares the hashes.\\n\\n'
      + 'Three Core Guarantees:\\n'
      + '1. Data Integrity: Any alteration in transit corrupts the hash comparison.\\n'
      + '2. Sender Authentication: Only the holder of the unique private key could have produced it.\\n'
      + '3. Non-Repudiation: The sender cannot dispute having authored and transmitted the message.',
    explanation_ar:
      'توقيع رقمي = مفتاح خاص للتوقيع + مفتاح عام للتحقق. الخصائص الثلاث لا يُفيد حفظها منفصلة — احفظها مجتمعة: "تلاعب + انتحال + عدم التنصل".',
    explanation_en:
      'Digital signature: Private key signs + Public key verifies. Three guarantees: Integrity + Authentication + Non-repudiation.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-04',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'اشرح الفرق بين مفهوم "المصادقة" (Authentication) ومفهوم "التفويض" (Authorization) بمثال عملي؟',
    question_en: 'Explain the difference between "Authentication" and "Authorization" with a practical real-world example?',
    ideal_answer_ar:
      'المصادقة (Authentication):\\n'
      + '- التعريف: عملية التحقق من هوية المستخدم ("من أنت؟").\\n'
      + '- الأمثلة: كلمة المرور، بصمة الإصبع، 2FA.\\n'
      + '- الهدف: إثبات أنك من تدّعيه.\\n\\n'
      + 'التفويض (Authorization):\\n'
      + '- التعريف: تحديد ما يُسمح للمستخدم الموثَّق بالوصول إليه ("ماذا يُمكنك فعله؟").\\n'
      + '- الأمثلة: صلاحيات القراءة/الكتابة، الوصول لصفحات معينة، أذونات الملفات.\\n'
      + '- الهدف: التحكم في مستوى الوصول.\\n\\n'
      + 'مثال عملي:\\n'
      + 'بنك إلكتروني: المصادقة = تسجيل الدخول بكلمة مرور + OTP.\\n'
      + 'التفويض = يمكنك رؤية رصيدك ولكن لا يمكنك تعديل إعدادات النظام.',
    ideal_answer_en:
      'Authentication:\\n'
      + '- Definition: Verifying user identity ("Who are you?").\\n'
      + '- Examples: Password, fingerprint, 2FA/MFA token.\\n'
      + '- Purpose: Confirming that the claimant is genuine.\\n\\n'
      + 'Authorization:\\n'
      + '- Definition: Granting permission to specific resources ("What are you allowed to do?").\\n'
      + '- Examples: Read/write privileges, admin portal access, file permissions.\\n'
      + '- Purpose: Enforcing access control policies.\\n\\n'
      + 'Practical Example:\\n'
      + 'In online banking, Authentication verifies you via password + SMS OTP. Authorization permits you to view your own account balance, but denies access to system administrative settings.',
    explanation_ar:
      'Authentication = "من أنت؟" (الهوية). Authorization = "ماذا يمكنك فعله؟" (الصلاحيات). المصادقة تأتي قبل التفويض دائماً.',
    explanation_en:
      'Authentication = "Who are you?" | Authorization = "What can you access?" Authentication must always precede authorization.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-05',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'قارن بين المصادقة الثنائية (2FA) والمصادقة متعددة العوامل (MFA) بالتفصيل؟',
    question_en: 'Compare Two-Factor Authentication (2FA) and Multi-Factor Authentication (MFA) in detail?',
    ideal_answer_ar:
      '| المعيار | 2FA | MFA |\\n'
      + '|---|---|---|\\n'
      + '| عدد العوامل | اثنان بالضبط | اثنان أو أكثر |\\n'
      + '| الفئات | فئتان مختلفتان | فئتان أو أكثر مختلفة |\\n'
      + '| مثال | كلمة مرور + OTP | كلمة مرور + بطاقة + بصمة |\\n'
      + '| العلاقة | نوع خاص من MFA | مصطلح أشمل |\\n\\n'
      + 'الفئات المعتمدة:\\n'
      + '- المعرفة: كلمة مرور، PIN، سؤال سري\\n'
      + '- الحيازة: هاتف (OTP)، بطاقة ذكية، مفتاح USB\\n'
      + '- السمات الحيوية: بصمة، وجه، شبكية، صوت\\n\\n'
      + 'الخلاصة: كل 2FA هي MFA، لكن ليست كل MFA ثنائية العوامل.',
    ideal_answer_en:
      'Comparison Table:\\n'
      + '| Criterion | 2FA | MFA |\\n'
      + '|---|---|---|\\n'
      + '| Number of factors | Exactly two | Two or more |\\n'
      + '| Categories | 2 distinct categories | 2 or more distinct categories |\\n'
      + '| Example | Password + Phone OTP | Password + Smart card + Fingerprint |\\n'
      + '| Taxonomy | Specific subset of MFA | Umbrella concept |\\n\\n'
      + 'Standard Factor Categories:\\n'
      + '- Knowledge (Something you know): password, PIN, passphrase.\\n'
      + '- Possession (Something you have): smartphone (OTP), smart card, security key.\\n'
      + '- Inherence (Something you are): fingerprint, face ID, iris scan.\\n\\n'
      + 'Summary: All 2FA systems are MFA, but not all MFA deployments are limited to two factors.',
    explanation_ar:
      '2FA ⊂ MFA. اذكر الجدول في الامتحان — يُظهر فهماً واضحاً للفروق.',
    explanation_en:
      '2FA is a specific instance of MFA (2FA ⊂ MFA). Mentioning the category breakdown demonstrates complete exam mastery.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-06',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'ما هي هجمة "رجل في الوسط" (MITM)؟ وكيف تحمي الشهادات الرقمية منها؟',
    question_en: 'What is a Man-in-the-Middle (MitM) attack? And how do digital certificates prevent it?',
    ideal_answer_ar:
      'هجمة رجل في الوسط (Man-in-the-Middle Attack):\\n'
      + 'يضع المهاجم نفسه بين العميل والخادم دون علمهما، فيستطيع قراءة البيانات أو تعديلها.\\n\\n'
      + 'سيناريو بدون HTTPS:\\n'
      + 'عميل ← مهاجم (يقرأ/يُعدِّل) ← خادم\\n\\n'
      + 'كيف تحمي الشهادات الرقمية:\\n'
      + '1. المتصفح يطلب شهادة الخادم عند بدء الاتصال.\\n'
      + '2. يتحقق من توقيع CA على الشهادة وصلاحيتها ومطابقة النطاق.\\n'
      + '3. المهاجم لا يستطيع تقديم شهادة صحيحة لنطاق لا يملكه.\\n'
      + '4. إذا قدّم شهادة مزيفة، يُحذِّر المتصفح المستخدم فوراً.\\n'
      + '5. التشفير يجعل البيانات المعترضة غير قابلة للقراءة.',
    ideal_answer_en:
      'Man-in-the-Middle (MitM) Attack:\\n'
      + 'An attacker secretly intercepts communications between client and server, eavesdropping on or altering exchanged packets.\\n\\n'
      + 'How Digital Certificates Prevent It:\\n'
      + '1. During the TLS handshake, the server presents its digital certificate to the browser.\\n'
      + '2. The browser validates that the certificate is signed by a trusted CA and matches the requested domain.\\n'
      + '3. The adversary cannot forge a trusted CA digital signature for a domain they do not own.\\n'
      + '4. If the adversary presents a self-signed or fraudulent certificate, the browser raises an immediate warning and halts the connection.\\n'
      + '5. The negotiated symmetric encryption prevents wiretappers from deciphering the payload.',
    explanation_ar:
      'MITM = مهاجم يضع نفسه في المنتصف. الشهادة = بطاقة هوية لا يمكن تزويرها بدون موافقة CA.',
    explanation_en:
      'MitM: adversary sits in the middle. Digital certificates act as an unfalsifiable cryptographic ID that defeats impersonation.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-07',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'وضح دور "الجهة المانحة للشهادات" (CA) في نظام الأمان الرقمي؟',
    question_en: 'Clarify the role of a Certificate Authority (CA) in the digital security ecosystem?',
    ideal_answer_ar:
      'الجهة المانحة للشهادات (Certificate Authority — CA):\\n\\n'
      + 'دورها:\\n'
      + '1. التحقق من هوية طالب الشهادة (الموقع/المؤسسة).\\n'
      + '2. إصدار شهادة رقمية موقَّعة رقمياً بمفتاحها الخاص.\\n'
      + '3. نشر قوائم الشهادات المُلغاة (CRL/OCSP).\\n'
      + '4. الحفاظ على سلسلة الثقة الهرمية.\\n\\n'
      + 'أمثلة: DigiCert، Let\\'s Encrypt، Comodo، GlobalSign.\\n\\n'
      + 'لماذا نثق بالـ CA؟\\n'
      + 'شهادات CA الجذرية مُثبَّتة مسبقاً في المتصفحات وأنظمة التشغيل من الشركات المصنِّعة.',
    ideal_answer_en:
      'Certificate Authority (CA) Responsibilities:\\n'
      + '1. Vetting: Verifies the legal and administrative ownership of the domain requesting a certificate.\\n'
      + '2. Issuance: Cryptographically signs the public key and domain metadata using its private key.\\n'
      + '3. Revocation Management: Maintains real-time status feeds (CRL and OCSP responders) for compromised certificates.\\n'
      + '4. Trust Maintenance: Anchors the hierarchical public key infrastructure (PKI).\\n\\n'
      + 'Examples: DigiCert, Let\\'s Encrypt, GlobalSign.\\n\\n'
      + 'Trust Anchor: Operating systems and web browsers ship with verified Root CA public certificates pre-installed.',
    explanation_ar:
      'CA = الجهة الثالثة الموثوقة. بدونها، لا يوجد معيار للتحقق من هوية المواقع.',
    explanation_en:
      'A CA serves as the trusted third-party guarantor in Public Key Infrastructure (PKI).',
  },
  {
    id: 'CH2-L1-OFF-W-P2-08',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ما فئات عوامل المصادقة الثلاث؟ أعطِ مثالين لكل فئة؟',
    question_en: 'What are the three categories of authentication factors? Provide two examples for each category?',
    ideal_answer_ar:
      'فئات عوامل المصادقة:\\n\\n'
      + '1. فئة المعرفة (Something you KNOW):\\n'
      + '   - كلمة المرور\\n'
      + '   - رقم التعريف الشخصي (PIN)\\n'
      + '   - السؤال السري\\n\\n'
      + '2. فئة الحيازة (Something you HAVE):\\n'
      + '   - الهاتف الذكي (لاستقبال OTP)\\n'
      + '   - البطاقة الذكية (Smart Card)\\n'
      + '   - مفتاح USB للأمان (YubiKey)\\n\\n'
      + '3. فئة السمات الحيوية (Something you ARE):\\n'
      + '   - بصمة الإصبع\\n'
      + '   - التعرف على الوجه\\n'
      + '   - بصمة الشبكية\\n'
      + '   - بصمة الصوت',
    ideal_answer_en:
      'Three Authentication Factor Categories:\\n\\n'
      + '1. Knowledge (Something you KNOW):\\n'
      + '   - Alphanumeric password\\n'
      + '   - Personal Identification Number (PIN)\\n'
      + '   - Security answer\\n\\n'
      + '2. Possession (Something you HAVE):\\n'
      + '   - Smartphone (receiving SMS/App OTP)\\n'
      + '   - Smart card / chip badge\\n'
      + '   - Hardware token (YubiKey)\\n\\n'
      + '3. Inherence / Biometrics (Something you ARE):\\n'
      + '   - Fingerprint scan\\n'
      + '   - Facial recognition\\n'
      + '   - Iris or retinal scan',
    explanation_ar:
      'الثلاث فئات: "تعرف + تملك + أنت". في الامتحان: اذكر الاسم الإنجليزي للفئة + مثالين على الأقل.',
    explanation_en:
      'Mnemonic: Know + Have + Are. Always state the category name and provide two concrete examples in exam answers.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-09',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'ما أهمية خاصية "عدم التنصل" في التوقيع الرقمي؟ وأعطِ مثالاً قانونياً أو تجارياً؟',
    question_en: 'What is the significance of "Non-Repudiation" in digital signatures? Provide a legal or commercial example?',
    ideal_answer_ar:
      'عدم التنصل (Non-repudiation):\\n'
      + 'التعريف: عدم قدرة الطرف الذي أرسل رسالة أو أجرى معاملة على إنكارها لاحقاً.\\n\\n'
      + 'لماذا مهم؟\\n'
      + '- يُوفِّر دليلاً قانونياً لا يُمكن إنكاره.\\n'
      + '- يُحمِّل الأطراف المسؤولية عن أفعالهم الرقمية.\\n'
      + '- يُقلِّل النزاعات القانونية في العقود الإلكترونية.\\n\\n'
      + 'مثال تجاري:\\n'
      + 'شركة تُرسِل أمر شراء بقيمة مليون دولار موقَّعاً رقمياً. بعد أسبوع تنكر إرسال الأمر.\\n'
      + 'لكن التوقيع الرقمي (الذي استخدم مفتاحهم الخاص) يُثبت قانونياً أنهم أرسلوه.\\n\\n'
      + 'مثال قانوني:\\n'
      + 'عقد إيجار إلكتروني موقَّع رقمياً يُعتدّ به أمام المحاكم كدليل لا يُنكر.',
    ideal_answer_en:
      'Non-Repudiation:\\n'
      + 'Definition: The impossibility for the originator of a transmission to deny sending the message or executing the transaction.\\n\\n'
      + 'Significance:\\n'
      + '- Provides indisputable cryptographic proof admissible in court.\\n'
      + '- Enforces legal accountability in digital commerce.\\n'
      + '- Prevents contract breach and fraudulent order cancellations.\\n\\n'
      + 'Commercial Example:\\n'
      + 'A company issues a $1M digitally signed purchase order. Even if market conditions fluctuate, the private key signature prevents them from claiming they never placed the order.\\n\\n'
      + 'Legal Example:\\n'
      + 'A digital lease agreement or notary contract signed with a certified private key is binding in legal arbitration.',
    explanation_ar:
      'عدم التنصل = "لا تستطيع إنكار ما فعلته". مهم جداً في العقود الإلكترونية والمعاملات المالية.',
    explanation_en:
      'Non-repudiation means undeniable accountability. Crucial for financial transactions, e-contracts, and legal compliance.',
  },
  {
    id: 'CH2-L1-OFF-W-P2-10',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'صف نظام أمان متكاملاً لتطبيق بنكي إلكتروني يجمع بين التشفير والشهادات والتوقيع الرقمي والمصادقة متعددة العوامل؟',
    question_en: 'Describe a comprehensive security architecture for an online banking platform integrating encryption, digital certificates, digital signatures, and MFA?',
    ideal_answer_ar:
      'نظام أمان متكامل للبنك الإلكتروني:\\n\\n'
      + '1. طبقة النقل (Transport Layer):\\n'
      + '   - HTTPS بـ TLS 1.3: تشفير جميع البيانات أثناء الإرسال.\\n'
      + '   - شهادة EV رقمية: تُثبت هوية البنك وتظهر اسمه باللون الأخضر.\\n\\n'
      + '2. طبقة المصادقة (Authentication Layer):\\n'
      + '   - MFA من 3 عوامل: كلمة مرور + OTP + بصمة إصبع.\\n'
      + '   - انتهاء صلاحية الجلسة تلقائياً بعد 5 دقائق من عدم النشاط.\\n\\n'
      + '3. طبقة المعاملات (Transaction Layer):\\n'
      + '   - توقيع رقمي على كل تحويل مالي: يمنع التلاعب ويوفر عدم التنصل.\\n'
      + '   - إشعار SMS/Email عند كل عملية للتنبيه المبكر.\\n\\n'
      + '4. طبقة التخزين (Storage Layer):\\n'
      + '   - تشفير قواعد البيانات.\\n'
      + '   - تشفير كلمات المرور بـ hashing قوي (bcrypt).',
    ideal_answer_en:
      'Comprehensive Online Banking Security Architecture:\\n\\n'
      + '1. Transport Layer (Encryption & Identity):\\n'
      + '   - HTTPS with TLS 1.3 to encrypt all client-server traffic.\\n'
      + '   - Extended Validation (EV) digital certificate from a top-tier CA validating bank authenticity.\\n\\n'
      + '2. Authentication Layer (Identity Assurance):\\n'
      + '   - 3-Factor Authentication: Master password (knowledge) + Hardware/SMS OTP (possession) + Biometric scan (inherence).\\n'
      + '   - Auto session timeout after 5 minutes of inactivity.\\n\\n'
      + '3. Transaction Layer (Integrity & Non-Repudiation):\\n'
      + '   - Cryptographic digital signing of every wire transfer order to enforce non-repudiation.\\n'
      + '   - Instant transactional push notifications.\\n\\n'
      + '4. Storage Layer (Data at Rest):\\n'
      + '   - AES-256 database encryption for sensitive financial ledger records.\\n'
      + '   - Salted cryptographic hashing (bcrypt/Argon2) for user credentials.',
    explanation_ar:
      'نمط الإجابة المثالية: صِف 4 طبقات واذكر تقنية محددة لكل طبقة. هذا يُظهر فهماً شاملاً.',
    explanation_en:
      'Ideal answer framework: Outline 4 architectural layers and designate specific cryptographic technologies for each.',
  },
];

// ─── MCQ وزارية — الجزء الثاني ──────────────────────────────

export const CH2_L1_OFFICIAL_MCQ_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-OFF-MCQ-P2-01',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما الجهة التي تتحقق من هوية الموقع وتُصدر له شهادة رقمية؟',
    question_en: 'Which entity verifies the identity of a website and issues its digital certificate?',
    options: ['المتصفح', 'جهة إصدار الشهادات (CA)', 'الخادم', 'المستخدم'],
    options_en: ['Browser', 'Certificate Authority (CA)', 'Server', 'End user'],
    answer: 'جهة إصدار الشهادات (CA)',
    answer_en: 'Certificate Authority (CA)',
    explanation_ar: 'CA (Certificate Authority) هي الجهة الوحيدة المخوَّلة بالتحقق من هوية الجهات وإصدار الشهادات الرقمية الموثوقة.',
    explanation_en: 'A Certificate Authority (CA) is the sole trusted third-party authorized to vet organizational credentials and issue trusted digital certificates.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-02',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ماذا يحدث عندما يكتشف المتصفح أن شهادة الموقع منتهية الصلاحية؟',
    question_en: 'What happens when a browser detects that a website certificate has expired?',
    options: [
      'يستمر الاتصال بشكل طبيعي',
      'يُوقف الاتصال تلقائياً بدون تحذير',
      'يُحذِّر المستخدم ويُخيِّره في الاستمرار',
      'يُجدِّد الشهادة تلقائياً',
    ],
    options_en: [
      'Connection proceeds normally without indication',
      'Silently terminates connection without explanation',
      'Warns the user with a security prompt and lets them choose whether to proceed',
      'Automatically renews the expired certificate',
    ],
    answer: 'يُحذِّر المستخدم ويُخيِّره في الاستمرار',
    answer_en: 'Warns the user with a security prompt and lets them choose whether to proceed',
    explanation_ar: 'الشهادة المنتهية تعني أن CA لا تضمن هوية الخادم حالياً. المتصفح يُظهر تحذيراً أمنياً لكنه يتيح للمستخدم تجاوزه بوعي.',
    explanation_en: 'An expired certificate implies the CA no longer guarantees server authenticity. Browsers display a prominent security alert allowing an override.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-03',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما مفتاح التشفير الذي يستخدمه المُرسِل لإنشاء التوقيع الرقمي؟',
    question_en: 'Which cryptographic key does the sender use to generate a digital signature?',
    options: ['المفتاح العام للمستقبل', 'المفتاح الخاص للمرسل', 'مفتاح الجلسة', 'المفتاح العام للـ CA'],
    options_en: ['Recipient public key', 'Sender private key', 'Session key', 'CA public key'],
    answer: 'المفتاح الخاص للمرسل',
    answer_en: 'Sender private key',
    explanation_ar: 'التوقيع الرقمي = تشفير بصمة البيانات بالمفتاح الخاص للمرسل. فقط المرسل يملك مفتاحه الخاص، لذا لا يمكن تزوير توقيعه.',
    explanation_en: 'A digital signature is produced by encrypting the message hash using the sender private key, which only the sender possesses.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-04',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من التالي يُعد مثالاً على عامل "الحيازة" في المصادقة؟',
    question_en: 'Which of the following is an example of a "Possession" factor in authentication?',
    options: ['كلمة المرور', 'رقم PIN', 'مفتاح USB للأمان (YubiKey)', 'بصمة الإصبع'],
    options_en: ['Password', 'PIN number', 'USB Hardware Security Key (YubiKey)', 'Fingerprint scan'],
    answer: 'مفتاح USB للأمان (YubiKey)',
    answer_en: 'USB Hardware Security Key (YubiKey)',
    explanation_ar: 'الحيازة = شيء تملكه مادياً. YubiKey هو جهاز USB مادي. كلمة المرور وPIN = معرفة. بصمة الإصبع = سمات حيوية.',
    explanation_en: 'Possession represents a physical artifact owned by the user, such as a hardware token (YubiKey). Password/PIN are knowledge; fingerprint is biometric.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-05',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: '"عدم التنصل" في التوقيع الرقمي يعني:',
    question_en: '"Non-repudiation" in digital signatures signifies that:',
    options: [
      'المستخدم لا يستطيع الاتصال بخوادم غير موثوقة',
      'المُرسِل لا يستطيع إنكار إرسال رسالة وقَّع عليها',
      'البيانات لا يمكن قراءتها من أطراف ثالثة',
      'الشهادة الرقمية لا تنتهي صلاحيتها',
    ],
    options_en: [
      'Users cannot connect to untrusted servers',
      'The sender cannot deny having sent a message they digitally signed',
      'Data cannot be intercepted or read by third parties',
      'Digital certificates never expire',
    ],
    answer: 'المُرسِل لا يستطيع إنكار إرسال رسالة وقَّع عليها',
    answer_en: 'The sender cannot deny having sent a message they digitally signed',
    explanation_ar: 'Non-repudiation = عدم الإنكار. بمجرد توقيع المُرسِل بمفتاحه الخاص الذي يملكه وحده، يصبح الدليل غير قابل للدحض.',
    explanation_en: 'Non-repudiation legally and cryptographically binds the author to the signed content via their unique private key.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-06',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من الأزواج التالية يمثل 2FA من فئتين مختلفتين (سمات حيوية + حيازة)؟',
    question_en: 'Which pair represents 2FA spanning Biometric and Possession categories?',
    options: ['كلمة مرور + OTP', 'بصمة + OTP على الهاتف', 'PIN + سؤال سري', 'كلمة مرور + بصمة'],
    options_en: ['Password + OTP', 'Fingerprint + Mobile OTP', 'PIN + Security Question', 'Password + Fingerprint'],
    answer: 'بصمة + OTP على الهاتف',
    answer_en: 'Fingerprint + Mobile OTP',
    explanation_ar: 'بصمة = سمات حيوية. OTP على الهاتف = حيازة. هذا مثال 2FA من فئة السمات الحيوية + الحيازة. (كلمة مرور + بصمة = معرفة + سمات).',
    explanation_en: 'Fingerprint is Biometric (Inherence); mobile OTP is Possession. Password + OTP is Knowledge + Possession.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-07',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما المقصود بـ "التحقق من سلسلة الثقة" عند فتح موقع HTTPS؟',
    question_en: 'What is meant by "Verifying the Chain of Trust" when accessing an HTTPS website?',
    options: [
      'التحقق من سرعة اتصال الإنترنت',
      'التحقق من أن الشهادة موقَّعة بسلسلة من CA موثوق بها وصولاً للجذرية',
      'التحقق من تشفير كلمة مرور المستخدم',
      'التحقق من صحة عنوان IP للخادم',
    ],
    options_en: [
      'Testing the bandwidth throughput of the connection',
      'Verifying the certificate signature hierarchy from intermediate CAs up to a trusted Root CA',
      'Checking that the client password hash is encrypted',
      'Validating the server reverse IP address resolution',
    ],
    answer: 'التحقق من أن الشهادة موقَّعة بسلسلة من CA موثوق بها وصولاً للجذرية',
    answer_en: 'Verifying the certificate signature hierarchy from intermediate CAs up to a trusted Root CA',
    explanation_ar: 'المتصفح يتتبع سلسلة التوقيعات: شهادة الموقع (موقَّعة من CA وسيطة) → CA وسيطة (موقَّعة من CA جذرية) → CA جذرية (موثوقة مسبقاً).',
    explanation_en: 'The browser recursively validates cryptographic signatures up through intermediate authorities until terminating at an embedded trusted root.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-08',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي مما يلي لا يُعد من فئة "السمات الحيوية"؟',
    question_en: 'Which of the following does NOT belong to the "Biometric" (Inherence) category?',
    options: ['بصمة الإصبع', 'التعرف على الوجه', 'بصمة الشبكية', 'رقم PIN'],
    options_en: ['Fingerprint scan', 'Facial recognition', 'Retinal scan', 'PIN number'],
    answer: 'رقم PIN',
    answer_en: 'PIN number',
    explanation_ar: 'رقم PIN = فئة المعرفة (شيء تعرفه). بصمة الإصبع والوجه والشبكية = فئة السمات الحيوية (شيء أنت عليه بيولوجياً).',
    explanation_en: 'A PIN number is a Knowledge factor (something you know), whereas fingerprints, facial features, and iris patterns are biological attributes.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-09',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما الفرق الأساسي بين التوقيع الرقمي والشهادة الرقمية؟',
    question_en: 'What is the primary difference between a digital signature and a digital certificate?',
    options: [
      'كلاهما يؤدي نفس الوظيفة تماماً',
      'التوقيع يُثبت صحة البيانات/المرسل، الشهادة تُثبت هوية الخادم/النطاق',
      'الشهادة للتشفير والتوقيع للمصادقة',
      'التوقيع يُصدر من CA والشهادة من المستخدم',
    ],
    options_en: [
      'Both perform the exact same security operation',
      'The signature verifies data integrity & sender origin, while the certificate authenticates server/domain identity',
      'Certificates are for encryption, whereas signatures are for authorization',
      'Signatures are issued by CAs, whereas certificates are created by users',
    ],
    answer: 'التوقيع يُثبت صحة البيانات/المرسل، الشهادة تُثبت هوية الخادم/النطاق',
    answer_en: 'The signature verifies data integrity & sender origin, while the certificate authenticates server/domain identity',
    explanation_ar: 'التوقيع = يتحقق من البيانات ومن أرسلها. الشهادة = تتحقق من هوية الموقع/الخادم. الشهادة نفسها مُوقَّعة رقمياً من CA.',
    explanation_en: 'Digital signatures authenticate messages and detect tampering; digital certificates validate identity and ownership of public keys.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-10',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما الذي يضمنه وجود قفل أخضر (🔒) وHTTPS في شريط العنوان؟',
    question_en: 'What does the presence of a padlock icon (🔒) and HTTPS in the browser address bar guarantee?',
    options: [
      'أن محتوى الموقع آمن وغير ضار',
      'أن الاتصال مشفر وهوية الخادم متحقَّق منها',
      'أن الموقع لا يجمع بيانات المستخدم',
      'أن الموقع مُعتمَد حكومياً',
    ],
    options_en: [
      'That website content is entirely safe and benevolent',
      'That communication is encrypted and server identity is verified',
      'That the website collects no user telemetry',
      'That the organization is a certified governmental body',
    ],
    answer: 'أن الاتصال مشفر وهوية الخادم متحقَّق منها',
    answer_en: 'That communication is encrypted and server identity is verified',
    explanation_ar: 'القفل الأخضر يعني فقط: الاتصال مشفر + الشهادة صالحة. لا يعني أن الموقع أخلاقي أو آمن المحتوى — مواقع التصيد تستخدم HTTPS أيضاً!',
    explanation_en: 'HTTPS and the padlock icon guarantee encryption in transit and certificate validity; they do not guarantee the moral intent of the content.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-11',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'نظام يستخدم: كلمة مرور + PIN + OTP. ما عدد الفئات المستخدمة؟',
    question_en: 'A system employs: Password + PIN + Mobile OTP. How many distinct factor categories are used?',
    options: ['فئة واحدة', 'فئتان', 'ثلاث فئات', 'لا يُعدّ MFA أصلاً'],
    options_en: ['One category', 'Two categories', 'Three categories', 'Not considered MFA'],
    answer: 'فئتان',
    answer_en: 'Two categories',
    explanation_ar: 'كلمة المرور = معرفة. PIN = معرفة. OTP (على الهاتف) = حيازة. الفئات هي: معرفة + حيازة = فئتان فقط رغم وجود 3 عوامل.',
    explanation_en: 'Password (Knowledge) + PIN (Knowledge) + OTP (Possession) span only 2 distinct categories despite utilizing 3 credentials.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P2-12',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما الذي يجعل التوقيع الرقمي قادراً على كشف التلاعب بالبيانات؟',
    question_en: 'What mechanism empowers a digital signature to detect data tampering?',
    options: [
      'تشفير البيانات بالكامل',
      'حساب بصمة (hash) للبيانات وتضمينها في التوقيع',
      'إرسال نسختين من الرسالة',
      'استخدام شهادة رقمية',
    ],
    options_en: [
      'Encrypting the complete message payload',
      'Computing a cryptographic hash of the data and embedding it within the signature',
      'Transmitting redundant duplicate copies of the message',
      'Embedding a digital certificate in the message',
    ],
    answer: 'حساب بصمة (hash) للبيانات وتضمينها في التوقيع',
    answer_en: 'Computing a cryptographic hash of the data and embedding it within the signature',
    explanation_ar: 'التوقيع يتضمن hash للبيانات. أي تعديل ولو بحرف واحد يُغيِّر الـ hash تماماً، فيكتشف المستقبل التلاعب عند مقارنة الـ hash.',
    explanation_en: 'Any minute alteration to the message drastically alters its cryptographic hash digest, causing immediate verification failure.',
  },
];
'''

with open('frontend/src/ch2_lesson1_officialQ_part2.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated frontend/src/ch2_lesson1_officialQ_part2.ts successfully!")
