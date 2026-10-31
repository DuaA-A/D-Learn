// ============================================================
// Ch2 · Lesson 1 · Part 1 — أسئلة وزارة الرسمية (الجزء الأول)
// HTTPS · TLS Handshake · التشفير المتماثل · التشفير بالمفتاح العام
// ============================================================

export interface Ch2QuizQuestion {
  id: string;
  part: 1 | 2;
  section: 'OFFICIAL' | 'HARD';
  type: 'WRITTEN' | 'MCQ';
  difficulty: 'MEDIUM' | 'HARD' | 'VERY_HARD';
  question_ar: string;
  question_en?: string;          // bilingual support
  options?: string[];          // MCQ فقط
  options_en?: string[];       // MCQ English options
  answer?: string;             // MCQ فقط — الخيار الصحيح
  answer_en?: string;          // MCQ English answer
  ideal_answer_ar?: string;    // WRITTEN — نموذج الإجابة
  ideal_answer_en?: string;    // WRITTEN English model answer
  explanation_ar: string;
  explanation_en?: string;     // English explanation
  marks?: number;
}

// ─── مقالية وزارية — الجزء الأول ───────────────────────────

export const CH2_L1_OFFICIAL_WRITTEN_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-OFF-W-P1-01',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح كيف تعمل اتصالات HTTPS على حماية الاتصال، وما دور بروتوكول TLS في ذلك؟',
    question_en: 'Explain how HTTPS communication secures data exchange, and what role the TLS protocol plays in this process?',
    ideal_answer_ar:
      'HTTPS هو بروتوكول HTTP يعمل عبر طبقة تشفير TLS (Transport Layer Security). يقوم TLS بتوفير ثلاث ضمانات أساسية:\n'
      + '1. السرية: يُشفَّر كل المحتوى المرسل بين المتصفح والخادم بحيث لا يستطيع أي طرف ثالث قراءته.\n'
      + '2. السلامة: يتم اكتشاف أي تلاعب بالبيانات أثناء النقل.\n'
      + '3. المصادقة: يتحقق المتصفح من هوية الخادم عبر الشهادة الرقمية.\n'
      + 'يبدأ TLS بـ"مصافحة" (Handshake) تتم فيها: التحقق من الشهادة → الاتفاق على خوارزمية التشفير → توليد مفتاح الجلسة → بدء التشفير المتماثل لبيانات الجلسة.',
    ideal_answer_en:
      'HTTPS is HTTP running over a Transport Layer Security (TLS) cryptographic layer. TLS provides three core security guarantees:\n'
      + '1. Confidentiality: All content transmitted between browser and server is encrypted so third parties cannot read it.\n'
      + '2. Integrity: Any tampering or data alteration during transmission is detected.\n'
      + '3. Authentication: The browser verifies server identity via a digital certificate.\n'
      + 'TLS starts with a Handshake: Certificate verification → Cipher suite agreement → Session key generation → Fast symmetric encryption for the rest of the session.',
    explanation_ar:
      'تذكّر: HTTPS = HTTP + TLS. TLS يوفر السرية والسلامة والمصادقة عبر مصافحة أولى تستخدم المفتاح العام، ثم تشفير متماثل لبقية الجلسة.',
    explanation_en:
      'Remember: HTTPS = HTTP + TLS. TLS delivers confidentiality, integrity, and authentication via an initial public-key handshake, followed by symmetric session encryption.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-02',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ميّز بين دور كل من التشفير المتماثل والتشفير بالمفتاح العام أثناء تدفق اتصال HTTPS؟',
    question_en: 'Distinguish between the roles of symmetric encryption and public-key encryption during an HTTPS connection flow?',
    ideal_answer_ar:
      'التشفير بالمفتاح العام (غير المتماثل):\n'
      + '- يُستخدم في مرحلة مصافحة TLS فقط.\n'
      + '- يعتمد على زوج مفاتيح: عام للتشفير + خاص لفك التشفير.\n'
      + '- بطيء نسبياً لكنه يحل مشكلة تبادل المفاتيح بأمان.\n\n'
      + 'التشفير المتماثل:\n'
      + '- يُستخدم لتشفير بيانات الجلسة بعد اكتمال المصافحة.\n'
      + '- يعتمد على مفتاح واحد مشترك بين الطرفين.\n'
      + '- أسرع بكثير ومناسب لتشفير كميات كبيرة من البيانات.',
    ideal_answer_en:
      'Public-Key (Asymmetric) Encryption:\n'
      + '- Used exclusively during the TLS handshake phase.\n'
      + '- Uses a key pair: public for encryption + private for decryption.\n'
      + '- Computationally slower, but securely solves the key exchange dilemma over untrusted networks.\n\n'
      + 'Symmetric Encryption:\n'
      + '- Used to encrypt bulk session data once the handshake completes.\n'
      + '- Relies on a single shared secret session key.\n'
      + '- Highly efficient and orders of magnitude faster for high-volume data streams.',
    explanation_ar:
      'القاعدة الذهبية: المفتاح العام = مصافحة TLS | المتماثل = بيانات الجلسة. "أيهما أسرع؟" → المتماثل دائماً.',
    explanation_en:
      'Golden rule: Public-key = TLS handshake | Symmetric = bulk session payload. Symmetric encryption is far faster.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-03',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ما الدور الأساسي للشهادة الرقمية وآليات المفتاح العام في بدء اتصال TLS آمن؟',
    question_en: 'What is the primary role of digital certificates and public-key mechanisms in establishing a secure TLS connection?',
    ideal_answer_ar:
      'دور الشهادة الرقمية:\n'
      + '- تُصدرها جهة إصدار شهادات موثوقة (CA — Certificate Authority).\n'
      + '- تحتوي على اسم النطاق + المفتاح العام للخادم + توقيع CA الرقمي.\n'
      + '- تتيح للمتصفح التحقق أن الخادم الذي يتصل به هو فعلاً صاحب النطاق.\n\n'
      + 'دور المفتاح العام في مصافحة TLS:\n'
      + '- يُستخدم المفتاح العام للخادم لتشفير مفتاح الجلسة المؤقت بأمان.\n'
      + '- يُستخدم المفتاح الخاص للخادم لفك تشفيره.\n'
      + '- يضمن أن مفتاح الجلسة لن يصل لأي طرف آخر.',
    ideal_answer_en:
      'Role of Digital Certificate:\n'
      + '- Issued by a trusted Certificate Authority (CA).\n'
      + '- Contains the server domain name + server public key + digital signature of the CA.\n'
      + '- Enables the client browser to authenticate that the server genuinely owns the requested domain.\n\n'
      + 'Role of Public Key in TLS Handshake:\n'
      + '- Server public key encrypts the ephemeral session key or validates key exchange parameters.\n'
      + '- Only the server private key can decrypt it, ensuring the session key remains completely confidential.',
    explanation_ar:
      'تشبيه: الشهادة الرقمية = بطاقة هوية الموقع مع ختم رسمي من CA. المفتاح العام = قفل يستطيع الجميع قفله لكن فقط صاحب المفتاح الخاص يفتحه.',
    explanation_en:
      'Analogy: Digital certificate = website national ID card stamped by a trusted CA. Public key = a lock anyone can snap shut, but only the private key owner can open.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-04',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'قارن بإيجاز بين وظيفة التوقيع الرقمي ووظيفة الشهادة الرقمية في أنظمة الأمان؟',
    question_en: 'Briefly compare the function of a digital signature versus a digital certificate in security systems?',
    ideal_answer_ar:
      'التوقيع الرقمي:\n'
      + '- يثبت صحة البيانات المرسلة وهوية المُرسِل.\n'
      + '- يكشف التلاعب بالبيانات.\n'
      + '- يوفر خاصية "عدم التنصل" (Non-repudiation): المُرسِل لا يستطيع إنكار إرساله.\n\n'
      + 'الشهادة الرقمية:\n'
      + '- تثبت هوية الخادم/الموقع ومطابقة اسم النطاق.\n'
      + '- تربط اسم النطاق بمفتاحه العام.\n'
      + '- تُصدرها جهة CA موثوقة وتحمل توقيعها الرقمي.',
    ideal_answer_en:
      'Digital Signature:\n'
      + '- Validates data integrity and verifies the sender identity.\n'
      + '- Instantly reveals any tampering with the transmitted payload.\n'
      + '- Provides non-repudiation: the sender cannot deny having created and sent the message.\n\n'
      + 'Digital Certificate:\n'
      + '- Proves the authentic identity of a website/server and matches its domain name.\n'
      + '- Cryptographically binds a public key to an entity domain name.\n'
      + '- Issued and digitally signed by a trusted Certificate Authority (CA).',
    explanation_ar:
      '"التوقيع الرقمي" = يثبت صحة البيانات/المرسل. "الشهادة الرقمية" = تثبت هوية الخادم. الشهادة نفسها مُوقَّعة رقمياً من CA.',
    explanation_en:
      'Digital signature proves data integrity & sender identity. Digital certificate authenticates the server domain. The certificate itself is digitally signed by a CA.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-05',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ما المقصود بـ«المصادقة الثنائية (2FA)»، وكيف يقلل العامل المستقل الثاني من مخاطر الاختراق؟',
    question_en: 'What is meant by Two-Factor Authentication (2FA), and how does an independent second factor mitigate breach risks?',
    ideal_answer_ar:
      'المصادقة الثنائية (Two-Factor Authentication) هي نظام تحقق من الهوية يستخدم عاملين مستقلين من فئتين مختلفتين:\n'
      + '- فئة المعرفة (Something you know): كلمة مرور، PIN، سؤال سري.\n'
      + '- فئة الحيازة (Something you have): هاتف، بطاقة ذكية، مفتاح USB.\n'
      + '- فئة السمات الحيوية (Something you are): بصمة، وجه، شبكية.\n\n'
      + 'كيف يقلل من مخاطر الاختراق:\n'
      + 'حتى لو سرق مهاجم كلمة المرور (العامل الأول)، فهو يحتاج أيضاً للعامل الثاني (مثل هاتف الضحية الجسدي) ليتمكن من الوصول. هذا يجعل الاختراق يتطلب اختراق فئتين مستقلتين في آنٍ واحد.',
    ideal_answer_en:
      'Two-Factor Authentication (2FA) is an identity verification system combining two independent factors from two distinct categories:\n'
      + '- Knowledge (Something you know): password, PIN, security answer.\n'
      + '- Possession (Something you have): mobile phone, smart card, hardware security token.\n'
      + '- Biometrics (Something you are): fingerprint, facial scan, iris scan.\n\n'
      + 'Risk Mitigation:\n'
      + 'Even if an adversary compromises the password (knowledge factor), access remains blocked without physical possession of the second factor (e.g. victim smartphone receiving OTP).',
    explanation_ar:
      '2FA = عاملان من فئتين مختلفتين. مثال صحيح: كلمة مرور + OTP. مثال خاطئ: كلمة مرور + PIN (كلاهما "معرفة").',
    explanation_en:
      '2FA requires two factors from distinct categories. Valid: Password + SMS/OTP. Invalid: Password + PIN (both knowledge factors).',
  },
  {
    id: 'CH2-L1-OFF-W-P1-06',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اذكر الفروق الأساسية بين 2FA وMFA من حيث عدد وفئات العوامل المستخدمة؟',
    question_en: 'State the primary distinctions between 2FA and MFA regarding factor counts and category types?',
    ideal_answer_ar:
      'المصادقة الثنائية (2FA):\n'
      + '- عدد العوامل: اثنان بالضبط.\n'
      + '- الفئات: من فئتين مختلفتين على الأقل.\n'
      + '- مثال: كلمة مرور + OTP للهاتف.\n\n'
      + 'المصادقة متعددة العوامل (MFA):\n'
      + '- عدد العوامل: اثنان أو أكثر.\n'
      + '- الفئات: من فئات مختلفة.\n'
      + '- مثال: كلمة مرور + بطاقة ذكية + بصمة إصبع.\n\n'
      + 'العلاقة: كل 2FA هي MFA، لكن ليست كل MFA هي 2FA (قد تكون 3FA أو أكثر).',
    ideal_answer_en:
      'Two-Factor Authentication (2FA):\n'
      + '- Number of factors: Exactly two.\n'
      + '- Categories: Must span two distinct factor categories.\n'
      + '- Example: Password (knowledge) + Phone OTP (possession).\n\n'
      + 'Multi-Factor Authentication (MFA):\n'
      + '- Number of factors: Two or more.\n'
      + '- Categories: Distinct authentication categories.\n'
      + '- Example: Password + Smart Card + Fingerprint (3 factors).\n\n'
      + 'Relationship: Every 2FA is an MFA, but not all MFA implementations are limited to 2 factors (can be 3FA or higher).',
    explanation_ar:
      '2FA ⊂ MFA. كل ثنائي العوامل هو متعدد العوامل، والعكس ليس صحيحاً. MFA أوسع وأكثر أماناً.',
    explanation_en:
      '2FA is a specific subset of MFA (2FA ⊂ MFA). MFA is the broader, more comprehensive security architecture.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-07',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'اشرح بالتفصيل كيف تستخدم اتصالات HTTPS تقنيات مختلفة لحماية الاتصال منذ لحظة بدء المصافحة وحتى تبادل البيانات؟',
    question_en: 'Explain in detail how HTTPS communication leverages different security technologies from initial handshake through data transfer?',
    ideal_answer_ar:
      'مراحل اتصال HTTPS:\n'
      + '1. يُرسل المتصفح "ClientHello" يُعلن فيه بروتوكولات TLS وخوارزميات التشفير التي يدعمها.\n'
      + '2. يرد الخادم بـ"ServerHello" مُرفقاً بشهادته الرقمية.\n'
      + '3. يتحقق المتصفح من الشهادة عبر التحقق من توقيع CA وصلاحية الشهادة ومطابقة النطاق.\n'
      + '4. يُولِّد المتصفح مفتاح جلسة مؤقت ويُشفِّره بالمفتاح العام للخادم (تشفير بالمفتاح العام).\n'
      + '5. يفك الخادم تشفير مفتاح الجلسة بمفتاحه الخاص.\n'
      + '6. الآن كلا الطرفين يملكان مفتاح الجلسة المشترك.\n'
      + '7. تبدأ مرحلة تبادل البيانات بالتشفير المتماثل السريع باستخدام مفتاح الجلسة.',
    ideal_answer_en:
      'HTTPS Transmission Lifecycle:\n'
      + '1. ClientHello: The browser sends supported TLS versions and cipher suites.\n'
      + '2. ServerHello & Certificate: The server selects the cipher suite and presents its digital certificate.\n'
      + '3. Authentication: The browser verifies the CA digital signature, validity period, and domain name match.\n'
      + '4. Key Exchange: A pre-master/session key is generated and encrypted using the server public key (asymmetric).\n'
      + '5. Key Decryption: The server decrypts the session key using its private key.\n'
      + '6. Symmetric Session: Both parties derive identical shared secret keys.\n'
      + '7. Data Exchange: Application traffic (HTTP requests/responses) is encrypted via ultra-fast symmetric encryption.',
    explanation_ar:
      'التسلسل الزمني: Handshake (تحقق + مفتاح عام) → توليد مفتاح الجلسة → تشفير متماثل للبيانات. المصافحة تحدث مرة واحدة في بداية كل جلسة.',
    explanation_en:
      'Chronology: Handshake (auth + public-key exchange) → Shared session key derivation → High-speed symmetric payload encryption.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-08',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ميّز بدقة بين التشفير المتماثل والتشفير بالمفتاح العام، موضحاً سبب استخدام كل منهما في مراحل اتصال HTTPS؟',
    question_en: 'Distinguish precisely between symmetric encryption and public-key encryption, clarifying why each is utilized in HTTPS phases?',
    ideal_answer_ar:
      'جدول المقارنة:\n'
      + '| المعيار | التشفير المتماثل | التشفير بالمفتاح العام |\n'
      + '|---|---|---|\n'
      + '| عدد المفاتيح | مفتاح واحد مشترك | زوج: عام + خاص |\n'
      + '| السرعة | سريع جداً | بطيء نسبياً |\n'
      + '| الاستخدام في HTTPS | تشفير بيانات الجلسة | مصافحة TLS |\n\n'
      + 'سبب التصميم الهجين:\n'
      + '- المفتاح العام يحل مشكلة تبادل المفاتيح بأمان عبر شبكة غير موثوقة.\n'
      + '- المتماثل يوفر الكفاءة اللازمة لتشفير كميات ضخمة من البيانات في الوقت الفعلي.',
    ideal_answer_en:
      'Comparison Table:\n'
      + '| Criterion | Symmetric Encryption | Public-Key Encryption |\n'
      + '|---|---|---|\n'
      + '| Keys | Single shared secret key | Key pair: Public + Private |\n'
      + '| Speed | Extremely fast | Computationally intensive / slower |\n'
      + '| HTTPS Role | Bulk session data payload | TLS handshake & key negotiation |\n\n'
      + 'Why Hybrid Design:\n'
      + '- Public-key cryptography securely solves key sharing across insecure networks.\n'
      + '- Symmetric cryptography guarantees real-time throughput and low latency for transferring web data.',
    explanation_ar:
      'HTTPS هجين: مفتاح عام للأمان أثناء الاتفاق على المفتاح، ومتماثل للسرعة أثناء نقل البيانات.',
    explanation_en:
      'HTTPS is hybrid: public-key for safe key negotiation, and symmetric encryption for fast communication speed.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-09',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'وضح بمثال عملي كيف تستخدم 2FA في تسجيل الدخول للخدمات المصرفية أو وسائل التواصل الاجتماعي؟',
    question_en: 'Demonstrate with a practical example how 2FA operates during authentication in online banking or social media platforms?',
    ideal_answer_ar:
      'مثال: الدخول لتطبيق مصرفي:\n'
      + '1. يُدخل المستخدم اسم المستخدم وكلمة المرور (العامل الأول — المعرفة).\n'
      + '2. يتحقق الخادم من صحة كلمة المرور.\n'
      + '3. يُرسل النظام رمز OTP مكوَّن من 6 أرقام إلى هاتف المستخدم المسجّل (العامل الثاني — الحيازة).\n'
      + '4. يُدخل المستخدم الرمز خلال مدة صلاحيته (عادةً 30-60 ثانية).\n'
      + '5. يمنح النظام الوصول بعد التحقق من كلا العاملين.\n\n'
      + 'مثال Gmail:\n'
      + 'كلمة المرور ← اختيار تلقي إشعار على Google Authenticator ← الموافقة على الهاتف ← منح الوصول.',
    ideal_answer_en:
      'Online Banking Example:\n'
      + '1. User enters username and password (Factor 1 — Knowledge).\n'
      + '2. The bank authentication server validates the credentials.\n'
      + '3. System generates and sends a time-sensitive 6-digit OTP to the registered mobile device (Factor 2 — Possession).\n'
      + '4. User submits the OTP within the validity window (30-60 seconds).\n'
      + '5. Access granted only after both independent factors are satisfied.\n\n'
      + 'Social Media / Google Example:\n'
      + 'Password prompt → Push prompt on Google Authenticator / Authenticator app → Approve on physical device → Login successful.',
    explanation_ar:
      'الهدف: حتى لو سُرقت كلمة المرور، لا يستطيع المهاجم الدخول بدون الهاتف الفعلي لصاحب الحساب.',
    explanation_en:
      'Core purpose: Even if credentials are breached, attackers cannot access accounts without physical control of the second factor device.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-10',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'ناقش: «الاتصال الآمن يعتمد على الجمع بين التشفير والمصادقة وليس على تقنية واحدة» — موضحاً دور كل تقنية مجتمعة؟',
    question_en: 'Discuss: "Secure communication relies on combining encryption and authentication rather than a single technology" — clarifying the complementary roles?',
    ideal_answer_ar:
      'العبارة صحيحة تماماً، وإليك التفصيل:\n\n'
      + '1. التشفير (متماثل وبالمفتاح العام):\n'
      + '   - يضمن سرية البيانات أثناء النقل.\n'
      + '   - يمنع أي طرف ثالث من قراءة محتوى الاتصال.\n\n'
      + '2. الشهادة الرقمية:\n'
      + '   - تضمن أن المتصفح يتحدث مع الخادم الصحيح وليس نظيراً مزيفاً.\n'
      + '   - تمنع هجمات رجل في الوسط (MITM).\n\n'
      + '3. التوقيع الرقمي:\n'
      + '   - يضمن سلامة البيانات وعدم التلاعب بها.\n'
      + '   - يمنع إنكار المُرسِل لرسالته.\n\n'
      + '4. المصادقة الثنائية (2FA):\n'
      + '   - تضمن أن المستخدم المتصل هو من يدّعيه حتى لو سُرقت بيانات الدخول.\n\n'
      + 'بدون إحدى هذه التقنيات تبقى ثغرة: التشفير وحده لا يمنع التحدث مع خادم مزيف، والشهادة وحدها لا تحمي إذا سُرق حساب المستخدم.',
    ideal_answer_en:
      'The statement is completely accurate:\n\n'
      + '1. Encryption (Symmetric & Public-Key):\n'
      + '   - Guarantees confidentiality in transit.\n'
      + '   - Prevents eavesdropping and interception by unauthorized third parties.\n\n'
      + '2. Digital Certificates:\n'
      + '   - Validates server authenticity against spoofing and phishing.\n'
      + '   - Defeats Man-in-the-Middle (MitM) attacks.\n\n'
      + '3. Digital Signatures:\n'
      + '   - Ensures data integrity and non-repudiation.\n'
      + '   - Detects any byte alteration post-signing.\n\n'
      + '4. Multi-Factor Authentication (2FA/MFA):\n'
      + '   - Protects account access when passwords leak.\n\n'
      + 'Conclusion: Encryption without authentication allows talking securely to an impostor. Authentication without encryption exposes data. True security is defense in depth.',
    explanation_ar:
      'نمط الإجابة: اذكر كل تقنية → دورها → ما الذي يحدث لو غابت. الأمان الحقيقي = طبقات متكاملة.',
    explanation_en:
      'Answer structure: State each technology → its security objective → vulnerabilities if omitted. Security is layered.',
  },
  {
    id: 'CH2-L1-OFF-W-P1-11',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar: 'اشرح كيف يتم الجمع بين تقنيات الأمان المختلفة عند إتمام عملية شراء عبر متجر إلكتروني؟',
    question_en: 'Explain how multiple security technologies are integrated when completing a transaction on an e-commerce website?',
    ideal_answer_ar:
      'خطوات عملية الشراء الآمنة:\n'
      + '1. يفتح المتصفح موقع المتجر → تبدأ مصافحة TLS (HTTPS):\n'
      + '   - يتحقق المتصفح من شهادة الموقع الرقمية (هوية الخادم).\n'
      + '   - يتم توليد مفتاح جلسة باستخدام التشفير بالمفتاح العام.\n'
      + '2. يُدخل المستخدم بيانات الدخول → تُرسل مشفرة بالتشفير المتماثل.\n'
      + '3. يُطلب النظام رمز 2FA للتحقق من هوية المستخدم (OTP على الهاتف).\n'
      + '4. يُدخل المستخدم بيانات البطاقة البنكية → تُرسل مشفرة عبر HTTPS.\n'
      + '5. تُوقَّع المعاملة المالية رقمياً لضمان عدم التلاعب وعدم التنصل.\n'
      + '6. يُصدر المتجر إيصالاً إلكترونياً موقعاً رقمياً.',
    ideal_answer_en:
      'End-to-End Secure Transaction Flow:\n'
      + '1. Connection & Server Authentication: Browser opens store URL → TLS Handshake verifies server digital certificate; session key established via public-key crypto.\n'
      + '2. Confidential Channel: Login credentials sent encrypted via symmetric cipher.\n'
      + '3. User Authentication: E-commerce platform requests 2FA (SMS OTP or Authenticator prompt).\n'
      + '4. Payment Data Protection: Credit card details transmitted over encrypted HTTPS pipeline directly to payment gateway.\n'
      + '5. Transaction Integrity & Non-Repudiation: Payment order digitally signed to prevent tampering and repudiation.\n'
      + '6. Receipt: Digital receipt issued with cryptographic signature.',
    explanation_ar:
      'كل خطوة في عملية الشراء تستخدم تقنية أمان مختلفة. الأمان الحقيقي = تشفير + مصادقة + شهادات + توقيع رقمي معاً.',
    explanation_en:
      'Every phase of an e-commerce transaction utilizes a specialized security primitive: encryption + certificates + signatures + MFA.',
  },
];

// ─── MCQ وزارية — الجزء الأول ────────────────────────────────

export const CH2_L1_OFFICIAL_MCQ_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L1-OFF-MCQ-P1-01',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي تقنية تُستخدم لتشفير بيانات الجلسة بسرعة وكفاءة عالية بعد اكتمال مصافحة TLS؟',
    question_en: 'Which technology is used to encrypt bulk session data quickly and efficiently after the TLS handshake completes?',
    options: ['التشفير بالمفتاح العام', 'التشفير المتماثل', 'التوقيع الرقمي', 'الشهادة الرقمية'],
    options_en: ['Public-key encryption', 'Symmetric encryption', 'Digital signature', 'Digital certificate'],
    answer: 'التشفير المتماثل',
    answer_en: 'Symmetric encryption',
    explanation_ar: 'بعد مصافحة TLS (التي تستخدم المفتاح العام)، يتم توليد مفتاح جلسة مشترك ويُستخدم التشفير المتماثل لكونه أسرع بكثير لتشفير البيانات الضخمة.',
    explanation_en: 'Following the TLS handshake (which uses public-key cryptography), a shared session key is agreed upon and symmetric encryption is used because it is far faster for large payloads.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-02',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ماذا تُسمى خطوات إنشاء الاتصال الآمن والتحقق من هوية الخادم في HTTPS؟',
    question_en: 'What is the procedure for establishing a secure connection and verifying server identity in HTTPS called?',
    options: ['مصافحة TLS', 'التوقيع الرقمي', 'المصادقة الثنائية', 'التشفير المتماثل'],
    options_en: ['TLS Handshake', 'Digital Signature', 'Two-Factor Authentication', 'Symmetric Encryption'],
    answer: 'مصافحة TLS',
    answer_en: 'TLS Handshake',
    explanation_ar: 'مصافحة TLS (TLS Handshake) هي سلسلة الرسائل الأولية التي تتم بين المتصفح والخادم لإنشاء اتصال آمن، تشمل التحقق من الشهادة والاتفاق على مفاتيح التشفير.',
    explanation_en: 'The TLS Handshake is the initial sequence of messages exchanged between client and server to verify certificates and agree upon encryption keys.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-03',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي الخيارات يمثل عاملين من فئتي المعرفة والحيازة صحيحاً للخدمات المصرفية؟',
    question_en: 'Which of the following represents two valid factors from the Knowledge and Possession categories for banking?',
    options: ['كلمة مرور + كلمة مرور ثانية', 'كلمة مرور + OTP', 'بصمة + وجه', 'بطاقة ورقية + اسم مستخدم'],
    options_en: ['Password + Second Password', 'Password + OTP', 'Fingerprint + Facial scan', 'Paper card + Username'],
    answer: 'كلمة مرور + OTP',
    answer_en: 'Password + OTP',
    explanation_ar: 'كلمة المرور = فئة المعرفة. OTP على الهاتف = فئة الحيازة. هذا هو تعريف 2FA الصحيح: فئتان مختلفتان. الخيارات الأخرى تجمع نفس الفئة.',
    explanation_en: 'Password = Knowledge factor. OTP sent to mobile = Possession factor. Valid 2FA must draw from two distinct categories.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-04',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما المقصود بـ MFA؟',
    question_en: 'What is meant by MFA (Multi-Factor Authentication)?',
    options: [
      'استخدام كلمة مرور واحدة قوية',
      'استخدام عاملين أو أكثر من فئات مختلفة (معرفة + حيازة + سمات)',
      'الاعتماد على بصمة الإصبع حصراً',
      'استخدام البريد الإلكتروني مع كلمة المرور',
    ],
    options_en: [
      'Using a single complex password',
      'Using two or more factors from different categories (knowledge + possession + biometrics)',
      'Relying exclusively on fingerprint recognition',
      'Using an email address together with a password',
    ],
    answer: 'استخدام عاملين أو أكثر من فئات مختلفة (معرفة + حيازة + سمات)',
    answer_en: 'Using two or more factors from different categories (knowledge + possession + biometrics)',
    explanation_ar: 'MFA = Multi-Factor Authentication. تعني استخدام عاملين أو أكثر من فئات مختلفة. الفئات: المعرفة، الحيازة، السمات الحيوية.',
    explanation_en: 'MFA stands for Multi-Factor Authentication, requiring two or more independent authentication factors across knowledge, possession, and biometric categories.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-05',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما التقنية التي تساعد المتصفح على التحقق من هوية الخادم ومطابقة اسم النطاق؟',
    question_en: 'Which technology enables the browser to verify server identity and validate domain name matching?',
    options: ['التشفير المتماثل', 'التوقيع الرقمي', 'الشهادة الرقمية', 'المصادقة الثنائية'],
    options_en: ['Symmetric Encryption', 'Digital Signature', 'Digital Certificate', 'Two-Factor Authentication'],
    answer: 'الشهادة الرقمية',
    answer_en: 'Digital Certificate',
    explanation_ar: 'الشهادة الرقمية تحتوي على اسم النطاق + المفتاح العام + توقيع CA. المتصفح يتحقق منها للتأكد أن الخادم هو فعلاً صاحب النطاق وليس موقعاً مزيفاً.',
    explanation_en: 'A digital certificate contains domain details, server public key, and CA digital signature to prove domain ownership.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-06',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي التقنيات تكتشف التلاعب وانتحال الشخصية وتوفر دليل عدم التنصل؟',
    question_en: 'Which technology detects tampering, exposes impersonation, and provides proof of non-repudiation?',
    options: ['التشفير المتماثل', 'التوقيع الرقمي', 'مصافحة TLS', 'المصادقة الثنائية'],
    options_en: ['Symmetric Encryption', 'Digital Signature', 'TLS Handshake', 'Two-Factor Authentication'],
    answer: 'التوقيع الرقمي',
    answer_en: 'Digital Signature',
    explanation_ar: 'التوقيع الرقمي يوفر 3 خصائص حصرية: (1) كشف التلاعب، (2) كشف انتحال الشخصية، (3) عدم التنصل. هذه الخصائص الثلاث معاً لا توفرها تقنية أخرى.',
    explanation_en: 'A digital signature uniquely delivers three guarantees: data integrity (tamper detection), authentication (impersonation detection), and non-repudiation.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-07',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي التقنيات تمنع قراءة محتوى الاتصال من أطراف ثالثة أثناء النقل؟',
    question_en: 'Which technology prevents third parties from reading transmitted communication content in transit?',
    options: ['التشفير (متماثل وبمفتاح عام)', 'التوقيع الرقمي', 'المصادقة الثنائية', 'الشهادة الرقمية'],
    options_en: ['Encryption (Symmetric & Public-key)', 'Digital Signature', 'Two-Factor Authentication', 'Digital Certificate'],
    answer: 'التشفير (متماثل وبمفتاح عام)',
    answer_en: 'Encryption (Symmetric & Public-key)',
    explanation_ar: 'التشفير هو الوحيد الذي يحوّل البيانات إلى نص مشفر غير مقروء. التوقيع يثبت الأصالة، والشهادة تثبت الهوية، لكن فقط التشفير يمنع القراءة.',
    explanation_en: 'Encryption alone transforms plaintext into unreadable ciphertext to prevent unauthorized eavesdropping during transit.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-08',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي خيار هو مثال خاطئ لـ 2FA لأنه يعتمد على نفس فئة العامل؟',
    question_en: 'Which option is an invalid example of 2FA because it relies on the same factor category?',
    options: ['كلمة مرور + OTP للهاتف', 'كلمة مرور + بصمة', 'كلمة مرور + تطبيق مصادقة', 'كلمة مرور + كلمة مرور ثانية'],
    options_en: ['Password + Phone OTP', 'Password + Fingerprint', 'Password + Authenticator App', 'Password + Second Password'],
    answer: 'كلمة مرور + كلمة مرور ثانية',
    answer_en: 'Password + Second Password',
    explanation_ar: 'كلتا "كلمة المرور" و"كلمة المرور الثانية" تنتميان لفئة المعرفة. 2FA يشترط أن تكون العوامل من فئتين مختلفتين. الخيارات الأخرى تجمع فئتين.',
    explanation_en: 'Both password and second password belong to the knowledge factor category. 2FA strictly requires two different categories.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-09',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'بروتوكول HTTP عبر TLS يُعرف بـ:',
    question_en: 'HTTP operating over TLS is known as:',
    options: ['HTTPS', 'FTP', 'SMTP', 'DNS'],
    options_en: ['HTTPS', 'FTP', 'SMTP', 'DNS'],
    answer: 'HTTPS',
    answer_en: 'HTTPS',
    explanation_ar: 'HTTPS = HTTP Secure = HTTP + TLS. الـ S في HTTPS تعني Secure وتشير لطبقة TLS التي توفر التشفير والمصادقة.',
    explanation_en: 'HTTPS stands for Hypertext Transfer Protocol Secure, which is standard HTTP encapsulated in a TLS encryption session.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-10',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'استخدام عاملين من فئتين مختلفتين لإثبات الهوية يُعرف بـ:',
    question_en: 'Using two factors from different categories to establish identity is known as:',
    options: ['التشفير المتماثل', 'المصادقة الثنائية (2FA)', 'التوقيع الرقمي', 'الشهادة الرقمية'],
    options_en: ['Symmetric Encryption', 'Two-Factor Authentication (2FA)', 'Digital Signature', 'Digital Certificate'],
    answer: 'المصادقة الثنائية (2FA)',
    answer_en: 'Two-Factor Authentication (2FA)',
    explanation_ar: 'التعريف الدقيق لـ 2FA: نظام مصادقة يستخدم عاملين مستقلين من فئتين مختلفتين للتحقق من هوية المستخدم.',
    explanation_en: 'Two-Factor Authentication (2FA) is strictly defined as identity verification using two distinct factor categories.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-11',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'تقنية تكتشف التلاعب وتوفر دليل عدم التنصل هي:',
    question_en: 'A technology that detects tampering and provides proof of non-repudiation is:',
    options: ['التوقيع الرقمي', 'التشفير بالمفتاح العام', 'مصافحة TLS', 'الحوسبة السحابية'],
    options_en: ['Digital Signature', 'Public-Key Encryption', 'TLS Handshake', 'Cloud Computing'],
    answer: 'التوقيع الرقمي',
    answer_en: 'Digital Signature',
    explanation_ar: 'عدم التنصل (Non-repudiation) هي خاصية فريدة للتوقيع الرقمي: بمجرد التوقيع، لا يستطيع المرسل إنكار إرساله للبيانات.',
    explanation_en: 'Non-repudiation is the signature feature of digital signatures: once signed with the private key, the sender cannot deny sending the message.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-12',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'مثال على عامل «السمات الحيوية» في المصادقة:',
    question_en: 'An example of a "Biometric" (Inherence) factor in authentication is:',
    options: ['كلمة المرور النصية', 'بصمة الإصبع أو التعرف على الوجه', 'بطاقة ATM', 'رمز SMS'],
    options_en: ['Text password', 'Fingerprint or Facial recognition', 'ATM Card', 'SMS Code'],
    answer: 'بصمة الإصبع أو التعرف على الوجه',
    answer_en: 'Fingerprint or Facial recognition',
    explanation_ar: 'السمات الحيوية = شيء أنت عليه فيزيائياً. بصمة الإصبع والوجه والشبكية كلها سمات بيولوجية. كلمة المرور = معرفة. البطاقة والرمز = حيازة.',
    explanation_en: 'Biometric factors represent physical human biological traits such as fingerprints, facial structure, or retinal patterns.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-13',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'الاتصالات الآمنة عبر الإنترنت تعتمد على:',
    question_en: 'Secure communication over the internet relies on:',
    options: [
      'تقنية واحدة فريدة',
      'الجمع بين التشفير والمصادقة والشهادات والتوقيعات',
      'إلغاء استخدام المفاتيح العامة',
      'كلمات مرور بسيطة فقط',
    ],
    options_en: [
      'A single isolated security technology',
      'Combining encryption, authentication, digital certificates, and signatures',
      'Eliminating public keys entirely',
      'Simple passwords only',
    ],
    answer: 'الجمع بين التشفير والمصادقة والشهادات والتوقيعات',
    answer_en: 'Combining encryption, authentication, digital certificates, and signatures',
    explanation_ar: 'الأمان الحقيقي متعدد الطبقات: تشفير للسرية + شهادات للهوية + توقيعات للسلامة + مصادقة للوصول. كل طبقة تُعالج تهديداً مختلفاً.',
    explanation_en: 'True security is defense in depth: combining encryption (confidentiality), certificates (identity), signatures (integrity), and authentication (access control).',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-14',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'زوج من المفاتيح (عام + خاص) يُستخدم للتشفير وفك التشفير هو:',
    question_en: 'A key pair (public + private) used for encryption and decryption is called:',
    options: ['التشفير بالمفتاح العام', 'التشفير المتماثل', 'الكيوبت الكمومي', 'البت الكلاسيكي'],
    options_en: ['Public-Key Encryption (Asymmetric)', 'Symmetric Encryption', 'Quantum Qubit', 'Classical Bit'],
    answer: 'التشفير بالمفتاح العام',
    answer_en: 'Public-Key Encryption (Asymmetric)',
    explanation_ar: 'التشفير بالمفتاح العام (Asymmetric Encryption) يستخدم زوج مفاتيح: المفتاح العام للتشفير ويوزَّع على الجميع، والمفتاح الخاص لفك التشفير يحتفظ به صاحبه.',
    explanation_en: 'Public-key (asymmetric) cryptography utilizes a mathematical key pair: a publicly distributed key for encryption, and a secret private key for decryption.',
  },
  {
    id: 'CH2-L1-OFF-MCQ-P1-15',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'مثال صحيح لعامل «الحيازة» في المصادقة الثنائية:',
    question_en: 'A correct example of a "Possession" factor in two-factor authentication is:',
    options: ['السؤال السري', 'OTP على الهاتف أو بطاقة ذكية', 'التعرف على الوجه', 'بصمة الإصبع'],
    options_en: ['Security question', 'Mobile OTP or Smart Card', 'Facial recognition', 'Fingerprint'],
    answer: 'OTP على الهاتف أو بطاقة ذكية',
    answer_en: 'Mobile OTP or Smart Card',
    explanation_ar: 'الحيازة = شيء تملكه مادياً. الهاتف (لاستقبال OTP) والبطاقة الذكية هي أشياء مادية. السؤال السري = معرفة. البصمة والوجه = سمات حيوية.',
    explanation_en: 'Possession represents a physical item held by the user: a mobile smartphone receiving an OTP, a smart card, or a hardware security key.',
  },
];
