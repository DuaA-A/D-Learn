// ============================================================
// Chapter 2 — Comprehensive Unit Review Data
// ملزمة المراجعة المركزة للوحدة الثانية (الدروس 2-1 و2-2 و2-3)
// خالية تماماً من أي أيقونات أو إيموجي - تعتمد على النص والتنسيق الاحترافي
// ============================================================

export interface ReviewCard {
  id: string;
  lesson: '2-1' | '2-2' | '2-3';
  type: 'CONCEPT' | 'TABLE' | 'TIP' | 'WARNING' | 'ANALOGY' | 'EXAM_HINT' | 'QUICK_REF';
  typeLabel_ar: string;
  typeLabel_en: string;
  title_ar: string;
  title_en: string;
  summary_ar: string;
  summary_en: string;
  content_ar: string;
  content_en: string;
  keyTakeaway_ar: string;
  keyTakeaway_en: string;
  quickQuestion_ar: string;
  quickQuestion_en: string;
  quickAnswer_ar: string;
  quickAnswer_en: string;
}

// ─────────────────────────────────────────────────────────────
// LESSON 2-1: تقنيات التشفير والمصادقة
// ─────────────────────────────────────────────────────────────
export const REVIEW_L1: ReviewCard[] = [
  {
    id: 'r2-1-01',
    lesson: '2-1',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'بروتوكول HTTPS وضمانات الأمان الثلاث',
    title_en: 'HTTPS Protocol and the Three Security Guarantees',
    summary_ar: 'بروتوكول HTTPS هو تطبيق بروتوكول HTTP عبر طبقة أمان النقل TLS، ويوفر السرية والسلامة والمصادقة لقناة الاتصال.',
    summary_en: 'HTTPS runs HTTP over Transport Layer Security (TLS), providing confidentiality, integrity, and server authentication.',
    content_ar:
      'أولاً: معادلة البروتوكول:\n'
      + 'HTTPS = HTTP + TLS (Transport Layer Security)\n\n'
      + 'ثانياً: الضمانات الثلاث الأساسية لقناة الاتصال:\n'
      + '1. السرية (Confidentiality): تشفير كافة البيانات المتبادلة بين المتصفح والخادم بحيث يتعذر على أي طرف وسيط قراءتها أو التنصت عليها.\n'
      + '2. السلامة (Integrity): الكشف الفوري عن أي تعديل أو تلاعب في البيانات المنقولة أثناء مرورها عبر الشبكة.\n'
      + '3. المصادقة (Authentication): التحقق من صحة هوية خادم الويب وارتباطه بالنطاق المطلوب عبر الشهادة الرقمية المعتمدة.\n\n'
      + 'ثالثاً: حدود البروتوكول المهمة امتحانياً:\n'
      + 'HTTPS يؤمن مسار ونفق الاتصال فقط، لكنه لا يضمن سلامة محتوى الموقع ولا نزاهة صاحبه، حيث تستطيع مواقع التصيد الاحتيالي استخدام HTTPS وشهادات رقمية صالحة.',
    content_en:
      'Protocol Formula:\n'
      + 'HTTPS = HTTP + TLS (Transport Layer Security)\n\n'
      + 'The Three Core Channel Guarantees:\n'
      + '1. Confidentiality: Encrypts all data transmitted between browser and server, preventing eavesdropping by third parties.\n'
      + '2. Integrity: Instantly detects any alteration or tampering with data in transit.\n'
      + '3. Authentication: Confirms server identity and verified domain ownership via a digital certificate.\n\n'
      + 'Crucial Exam Boundary:\n'
      + 'HTTPS only secures the communication tunnel. It does not certify content validity or operator legitimacy; phishing sites frequently operate over valid HTTPS connections.',
    keyTakeaway_ar: 'قاعدة الامتحان: HTTPS يحمي مسار نقل البيانات فقط (السرية والسلامة والمصادقة)، ولا يمنع وجود مواقع احتيالية تستخدمه.',
    keyTakeaway_en: 'Exam Rule: HTTPS secures data transmission in transit (confidentiality, integrity, authentication), but does not guarantee the site itself is benign.',
    quickQuestion_ar: 'سؤال سريع: هل وجود قفل HTTPS يعني بالضرورة أن محتوى الموقع آمن وموثوق؟ علل إجابتك.',
    quickQuestion_en: 'Quick Check: Does HTTPS necessarily prove the website content is safe and legitimate? Explain.',
    quickAnswer_ar: 'الإجابة: لا. HTTPS يضمن فقط تشفير الاتصال والتحقق من هوية الخادم، لكنه لا يحكم على نوايا صاحب الموقع؛ فمواقع التصيد يمكنها الحصول على شهادة واستخدام HTTPS.',
    quickAnswer_en: 'Answer: No. HTTPS only protects the communication channel; phishing sites can register certificates and establish encrypted connections.',
  },

  {
    id: 'r2-1-02',
    lesson: '2-1',
    type: 'TABLE',
    typeLabel_ar: 'مقارنة معتمدة',
    typeLabel_en: 'Comparison Table',
    title_ar: 'مقارنة حاسمة: التشفير المتماثل مقابل التشفير غير المتماثل',
    title_en: 'Symmetric versus Asymmetric Encryption Comparison',
    summary_ar: 'التشفير المتماثل يعتمد على مفتاح واحد مشترك وسريع للبيانات الضخمة، بينما غير المتماثل يعتمد على زوج مفاتيح عام وخاص ويحل مشكلة التبادل الآمن للمفاتيح.',
    summary_en: 'Symmetric uses a single shared key and is fast for heavy data; asymmetric uses a public/private key pair and solves secure key exchange.',
    content_ar:
      'وجه المقارنة 1: عدد المفاتيح المستخدمة\n'
      + '• المتماثل (المفتاح المشترك): مفتاح واحد فقط للتشفير وفك التشفير.\n'
      + '• غير المتماثل (المفتاح العام): زوج من المفاتيح (مفتاح عام للتشفير + مفتاح خاص لفك التشفير).\n\n'
      + 'وجه المقارنة 2: سرعة المعالجة الحسابية\n'
      + '• المتماثل: سريع جداً ولا يتطلب قدرات حسابية معقدة.\n'
      + '• غير المتماثل: بطيء نسبياً بسبب العمليات الرياضية الضخمة للأزواج المفتاحية.\n\n'
      + 'وجه المقارنة 3: الدور الوظيفي في اتصال HTTPS\n'
      + '• المتماثل: يُستخدم في مرحلة نقل البيانات بعد المصافحة لتشفير محتوى الجلسة بالكامل.\n'
      + '• غير المتماثل: يُستخدم في مصافحة TLS فقط للتحقق من الشهادة وتبادل مفتاح الجلسة بأمان.\n\n'
      + 'وجه المقارنة 4: التحدي والميزة الأساسية\n'
      + '• المتماثل: يواجه معضلة تبادل المفتاح المشترك عبر قناة عامة غير آمنة.\n'
      + '• غير المتماثل: يحل مشكلة توزيع المفاتيح بنشر المفتاح العام والاحتفاظ بالمفتاح الخاص سراً.',
    content_en:
      'Comparison Dimension 1: Key Count\n'
      + '• Symmetric: Single shared key for both encryption and decryption.\n'
      + '• Asymmetric: Key pair (Public key for encryption + Private key for decryption).\n\n'
      + 'Comparison Dimension 2: Computational Speed\n'
      + '• Symmetric: Extremely fast, ideal for bulk payloads.\n'
      + '• Asymmetric: Computationally heavy and noticeably slower.\n\n'
      + 'Comparison Dimension 3: Function in HTTPS\n'
      + '• Symmetric: Encrypts bulk session payload after handshake completes.\n'
      + '• Asymmetric: Confined to TLS handshake to verify certificates and exchange the session key.\n\n'
      + 'Comparison Dimension 4: Core Challenge vs Advantage\n'
      + '• Symmetric: Challenge is secure key distribution over untrusted channels.\n'
      + '• Asymmetric: Solves distribution by allowing public key publishing while guarding the private key.',
    keyTakeaway_ar: 'قاعدة الامتحان: التشفير غير المتماثل يحل مشكلة تبادل المفاتيح، والتشفير المتماثل يحقق سرعة نقل البيانات الضخمة.',
    keyTakeaway_en: 'Exam Rule: Asymmetric encryption solves key exchange; symmetric encryption delivers high-throughput payload delivery.',
    quickQuestion_ar: 'سؤال سريع: لماذا لا يعتمد HTTPS على التشفير غير المتماثل طوال الجلسة بدلاً من استخدام التشفير المشترك؟',
    quickQuestion_en: 'Quick Check: Why does HTTPS not use asymmetric encryption throughout the entire session?',
    quickAnswer_ar: 'الإجابة: لأن التشفير غير المتماثل بطيء حسابياً ويستهلك موارد المعالجة، فيقتصر استخدامه على مصافحة TLS لتبادل المفتاح المشترك الذي يتولى باقي الجلسة بسرعة.',
    quickAnswer_en: 'Answer: Asymmetric encryption is computationally slow; limiting it to key exchange allows the faster symmetric cipher to handle ongoing data transmission.',
  },

  {
    id: 'r2-1-03',
    lesson: '2-1',
    type: 'CONCEPT',
    typeLabel_ar: 'تسلسل خطوات',
    typeLabel_en: 'Step-by-step Process',
    title_ar: 'مراحل اتصال ومصافحة TLS الثلاث بالتفصيل',
    title_en: 'The Three Stages of TLS Handshake and Communication',
    summary_ar: 'يمر اتصال HTTPS بثلاث مراحل: الاتصال والتحقق من الشهادة (غير متماثل)، ثم تبادل مفتاح الجلسة (غير متماثل)، ثم نقل البيانات الفعلي (متماثل).',
    summary_en: 'HTTPS progresses through three phases: connection and certificate verification (asymmetric), session key exchange (asymmetric), and payload transfer (symmetric).',
    content_ar:
      'المرحلة الأولى: مرحلة الاتصال والتعريف (Connection & Authentication)\n'
      + '• يرسل المتصفح طلباً أولياً (Client Hello).\n'
      + '• يرد خادم الويب بإرسال شهادته الرقمية متضمنة مفتاحه العام.\n'
      + '• يتحقق المتصفح من صحة الشهادة والجهة المصدرة المعتمدة (CA).\n'
      + '• أسلوب التشفير المستخدم: التشفير بالمفتاح العام (غير متماثل).\n\n'
      + 'المرحلة الثانية: مرحلة تبادل المفاتيح (Key Exchange)\n'
      + '• ينشئ المتصفح مفتاح جلسة سرياً ومشتركاً (Session Key).\n'
      + '• يُشفر المتصفح مفتاح الجلسة مستخدماً المفتاح العام للخادم ويرسله عبر الشبكة.\n'
      + '• يستقبل الخادم الرسالة ويفك تشفيرها بمفتاحه الخاص الوحيد القادر على فكها.\n'
      + '• النتيجة: امتلاك الطرفين لنفس المفتاح السري المشترك بأمان كامل.\n'
      + '• أسلوب التشفير المستخدم: التشفير بالمفتاح العام (غير متماثل).\n\n'
      + 'المرحلة الثالثة: مرحلة نقل وتبادل البيانات (Data Communication)\n'
      + '• يبدأ نقل الصفحات والمعاملات والبيانات الحقيقية بين الطرفين.\n'
      + '• تُشفر كل حزمة بيانات وتُفك باستخدام مفتاح الجلسة المشترك فقط.\n'
      + '• أسلوب التشفير المستخدم: التشفير بالمفتاح المشترك (المتماثل) للسرعة العالية.',
    content_en:
      'Phase 1: Connection & Authentication\n'
      + '• Browser initiates with Client Hello.\n'
      + '• Server returns its digital certificate containing its public key.\n'
      + '• Browser validates the certificate against trusted Certificate Authorities (CAs).\n'
      + '• Cryptography: Public-key (asymmetric) cryptography.\n\n'
      + 'Phase 2: Key Exchange\n'
      + '• Browser generates a random shared session key.\n'
      + '• Browser encrypts this session key using the server\'s public key and transmits it.\n'
      + '• Server decrypts the packet using its matching private key.\n'
      + '• Outcome: Both endpoints now securely share an identical session key.\n'
      + '• Cryptography: Public-key (asymmetric) cryptography.\n\n'
      + 'Phase 3: Data Communication\n'
      + '• Full bi-directional payload transfer begins.\n'
      + '• All application traffic is encrypted and decrypted using the shared session key.\n'
      + '• Cryptography: Common-key (symmetric) cryptography for optimal throughput.',
    keyTakeaway_ar: 'قاعدة الامتحان: المرحلتان 1 و 2 تستخدمان التشفير غير المتماثل (المفتاح العام)، والمرحلة 3 تستخدم التشفير المتماثل (المفتاح المشترك).',
    keyTakeaway_en: 'Exam Rule: Phases 1 and 2 employ asymmetric cryptography; Phase 3 transitions exclusively to symmetric encryption.',
    quickQuestion_ar: 'سؤال سريع: في أي مرحلة من مراحل HTTPS يتم استخدام التشفير المتماثل، ولماذا؟',
    quickQuestion_en: 'Quick Check: In which phase of HTTPS is symmetric encryption used, and why?',
    quickAnswer_ar: 'الإجابة: في المرحلة الثالثة (نقل البيانات)؛ لأن التشفير المتماثل يمتاز بالسرعة الفائقة والقدرة على معالجة أحجام البيانات الضخمة دون بطء.',
    quickAnswer_en: 'Answer: In phase 3 (data transfer), because symmetric ciphers are lightweight and fast enough to handle high volumes without performance degradation.',
  },

  {
    id: 'r2-1-04',
    lesson: '2-1',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'الشهادة الرقمية ومكوناتها الخمسة وسلسلة الثقة',
    title_en: 'Digital Certificates, Their Five Components, and Chain of Trust',
    summary_ar: 'الشهادة الرقمية بمثابة بطاقة هوية إلكترونية للخادم تصدرها سلطة شهادات معتمدة وتتضمن 5 مكونات تثبت الهوية وتمكن التشفير.',
    summary_en: 'A digital certificate is an electronic server credential issued by a trusted CA, containing five elements that verify identity and enable encryption.',
    content_ar:
      'أولاً: تعريف الشهادة الرقمية:\n'
      + 'وثيقة إلكترونية رسمية تصدرها جهة موثوقة عالمياً تُعرف بسلطة الشهادات (Certificate Authority - CA)، وتُستخدم للتحقق من هوية الخادم وربطه بالمفتاح العام الخاص به.\n\n'
      + 'ثانياً: المكونات الخمسة المعتمدة في كتاب الوزارة:\n'
      + '1. اسم النطاق أو المالك (Common Name): النطاق المصرح له بالشهادة (مثل bank.com).\n'
      + '2. المفتاح العام للخادم (Server Public Key): المفتاح المستخدم في تشفير تبادل مفتاح الجلسة.\n'
      + '3. بيانات سلطة الشهادات المصدرة (Issuer Information): هوية جهة الاعتماد (مثل DigiCert).\n'
      + '4. تواريخ الصلاحية (Validity Period): تاريخ بدء السريان وتاريخ انتهاء الصلاحية.\n'
      + '5. التوقيع الرقمي لسلطة الشهادات (CA Digital Signature): توقيع CA الموثوق الذي يمنع تزوير الشهادة.\n\n'
      + 'ثالثاً: مفهوم سلسلة الثقة (Chain of Trust):\n'
      + 'المتصفح يحتوي على قائمة مسبقة بسلطات الشهادات الجذرية الموثوقة (Root CA) ← الجذر يوثق سلطة وسيطة (Intermediate CA) ← السلطة الوسيطة توقع شهادة الموقع الإلكتروني.',
    content_en:
      'Definition:\n'
      + 'An electronic credential issued by a globally trusted Certificate Authority (CA) that authenticates server identity and binds it to its public key.\n\n'
      + 'The Five Standard Components:\n'
      + '1. Domain / Subject Name: Registered domain name (e.g., bank.com).\n'
      + '2. Server Public Key: Used to encrypt session key negotiation.\n'
      + '3. Issuer Information: Identity of the issuing CA (e.g., DigiCert).\n'
      + '4. Validity Period: Start and expiration timestamps.\n'
      + '5. CA Digital Signature: Cryptographic proof by the CA preventing certificate tampering.\n\n'
      + 'Chain of Trust Mechanism:\n'
      + 'Pre-installed Root CA in browser/OS validates an Intermediate CA, which in turn issues and signs the domain server certificate.',
    keyTakeaway_ar: 'قاعدة الامتحان: الشهادة الرقمية تثبت هوية الخادم، وتتضمن المفتاح العام للخادم، وهي نفسها موقعة رقمياً من سلطة CA.',
    keyTakeaway_en: 'Exam Rule: A digital certificate verifies server domain identity, contains the public key, and is digitally signed by the issuing CA.',
    quickQuestion_ar: 'سؤال سريع: اذكر اثنين من المكونات الأساسية للشهادة الرقمية، ومن يوقع على هذه الشهادة؟',
    quickQuestion_en: 'Quick Check: Name two primary components of a digital certificate, and state who signs it.',
    quickAnswer_ar: 'الإجابة: المكونات مثل المفتاح العام للخادم واسم النطاق، والجهة التي توقع عليها هي سلطة الشهادات المعتمدة (CA) بمفتاحها الخاص.',
    quickAnswer_en: 'Answer: Server public key and domain name; it is digitally signed by the trusted Certificate Authority (CA) using its private key.',
  },

  {
    id: 'r2-1-05',
    lesson: '2-1',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'التوقيع الرقمي: آلية التوليد والخصائص الثلاث',
    title_en: 'Digital Signatures: Generation Mechanism and Three Properties',
    summary_ar: 'التوقيع الرقمي يُنشأ بتشفير بصمة البيانات بالمفتاح الخاص للمرسل، ويحقق كشف التلاعب، كشف الانتحال، وعدم التنصل.',
    summary_en: 'Digital signatures encrypt a document hash with the sender\'s private key, delivering tamper detection, spoofing protection, and non-repudiation.',
    content_ar:
      'أولاً: آلية عمل التوقيع الرقمي خطوة بخطوة:\n'
      + '1. يقوم المرسل بحساب بصمة رقمية (Hash) للبيانات أو المستند.\n'
      + '2. يُشفر المرسل هذه البصمة باستخدام مفتاحه الخاص السري فقط ← الناتج هو "التوقيع الرقمي".\n'
      + '3. يرسل المرسل المستند الأصلي ومعه التوقيع الرقمي المرفق.\n'
      + '4. يستلم المستلم الرسالة، ويفك تشفير التوقيع باستخدام المفتاح العام للمرسل لاستخراج البصمة.\n'
      + '5. يحسب المستلم بصمة المستند المستلم، ويقارنها بالبصمة المستخرجة:\n'
      + '   - تطابق البصمتين = المستند أصيل ولم يتم التلاعب به وصادر فعلاً من صاحب المفتاح.\n\n'
      + 'ثانياً: الخصائص الثلاث التي يضمنها التوقيع الرقمي:\n'
      + '1. كشف التلاعب (Tamper Detection): أي تغيير في حرف واحد يغير قيمة البصمة فوراً.\n'
      + '2. كشف انتحال الشخصية (Impersonation Prevention): لا يمكن توليد التوقيع إلا بالمفتاح الخاص للمرسل.\n'
      + '3. عدم الإنكار أو التنصل (Non-repudiation): لا يستطيع المرسل إنكار قيامه بإرسال الرسالة.',
    content_en:
      'Operational Steps:\n'
      + '1. Sender generates a cryptographic digest (hash) of the message content.\n'
      + '2. Sender encrypts this digest using their private key, creating the digital signature.\n'
      + '3. Original payload is transmitted alongside the detached signature.\n'
      + '4. Recipient decrypts the signature using the sender\'s published public key to retrieve original hash.\n'
      + '5. Recipient computes hash of received message; exact match confirms validity.\n\n'
      + 'The Three Guaranteed Properties:\n'
      + '1. Tamper Detection: Content alterations disrupt cryptographic hash alignment.\n'
      + '2. Impersonation Prevention: Only the private key holder could have generated the signature.\n'
      + '3. Non-repudiation: Sender cannot plausibly deny authoring the message.',
    keyTakeaway_ar: 'قاعدة الامتحان: التوقيع الرقمي يُنشأ بالمفتاح الخاص للمرسل ويُفحص بالمفتاح العام للمرسل، ويضمن كشف التلاعب والانتحال وعدم الإنكار.',
    keyTakeaway_en: 'Exam Rule: Digital signatures are generated with the sender\'s private key, verified with the public key, and guarantee non-repudiation.',
    quickQuestion_ar: 'سؤال سريع: بمَ يختلف التوقيع الرقمي عن التشفير التقليدي للبيانات؟',
    quickQuestion_en: 'Quick Check: How does a digital signature differ from traditional data encryption?',
    quickAnswer_ar: 'الإجابة: التشفير التقليدي هدفه إخفاء البيانات للحفاظ على السرية، أما التوقيع الرقمي فهدفه إثبات صحة المحتوى وهوية المرسل ومنع الإنكار حتى لو كان المستند غير مشفر.',
    quickAnswer_en: 'Answer: Encryption conceals payload content for confidentiality; digital signatures authenticate author identity and data integrity.',
  },

  {
    id: 'r2-1-06',
    lesson: '2-1',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'المصادقة متعددة العوامل (MFA) وفئاتها الثلاث المعتمدة',
    title_en: 'Multi-Factor Authentication (MFA) and the Three Categories',
    summary_ar: 'تشترط المصادقة متعددة العوامل الجمع بين عاملين أو أكثر من فئات مختلفة: المعرفة (ما تعرفه)، الحيازة (ما تملكه)، والسمات الحيوية (ما أنت عليه).',
    summary_en: 'MFA requires combining two or more distinct categories: Knowledge (something you know), Possession (something you have), and Biometrics (something you are).',
    content_ar:
      'الفئات الثلاث المعتمدة في كتاب الوزارة:\n'
      + '1. فئة المعرفة (Knowledge) — شيء تعرفه:\n'
      + '   الأمثلة المعتمدة: كلمة المرور، الرمز السري الشخصي (PIN)، الإجابة على سؤال الأمان.\n\n'
      + '2. فئة الحيازة (Possession) — شيء تمتلكه:\n'
      + '   الأمثلة المعتمدة: الهاتف المحمول لاستقبال رمز التحقق المؤقت (OTP / SMS)، البطاقة الذكية، مفتاح الأمان المادي.\n\n'
      + '3. فئة السمات الحيوية (Biometrics) — شيء أنت عليه:\n'
      + '   الأمثلة المعتمدة: بصمة الإصبع، التعرف على الوجه، مسح قزحية العين، التعرف على الصوت.\n\n'
      + 'الفرق الحاسم بين 2FA و MFA:\n'
      + '• المصادقة الثنائية (2FA): دمج عاملين اثنين فقط من فئتين مختلفتين.\n'
      + '• المصادقة متعددة العوامل (MFA): المصطلح الأعم للجمع بين عاملين أو أكثر من الفئات المختلفة.\n\n'
      + 'أمثلة الامتحان:\n'
      + '• صحيح: كلمة مرور (معرفة) + رمز هاتف (حيازة) ← مصادقة متعددة العوامل صحيحة.\n'
      + '• خاطئ: كلمة مرور أولى + كلمة مرور ثانية (أو سؤال سري) ← كلاهما معرفة، فلا يعتبر مصادقة متعددة العوامل.',
    content_en:
      'The Three Standard MFA Categories:\n'
      + '1. Knowledge (Something you know):\n'
      + '   Standard examples: Password, PIN, security question answer.\n\n'
      + '2. Possession (Something you have):\n'
      + '   Standard examples: Mobile phone receiving one-time passcodes (OTP/SMS), smart cards, hardware security tokens.\n\n'
      + '3. Biometrics (Something you are):\n'
      + '   Standard examples: Fingerprint scanner, facial recognition, iris scan, voice verification.\n\n'
      + '2FA versus MFA Distinction:\n'
      + '• 2FA combines exactly two distinct factor categories.\n'
      + '• MFA is the broader standard combining two or more factor categories.\n\n'
      + 'Exam Rule Validation:\n'
      + '• Valid: Password (Knowledge) + Phone OTP (Possession).\n'
      + '• Invalid: Password + Security question (Both belong to Knowledge category).',
    keyTakeaway_ar: 'قاعدة الامتحان: حتى تتحقق المصادقة المتعددة يجب أن تكون العوامل من فئات مختلفة، واستخدام عاملين من نفس الفئة لا يعتبر MFA.',
    keyTakeaway_en: 'Exam Rule: MFA demands factors originating from different categories; two factors within the same category is never MFA.',
    quickQuestion_ar: 'سؤال سريع: طلب نظام مصرفي إدخال كلمة المرور ثم اسم أول مدرسة التحقت بها. هل هذا MFA؟ ولماذا؟',
    quickQuestion_en: 'Quick Check: A bank prompts for a password followed by your first school name. Is this MFA? Why?',
    quickAnswer_ar: 'الإجابة: ليس MFA؛ لأن كلاً من كلمة المرور وسؤال الأمان ينتميان لنفس الفئة (فئة المعرفة - شيء تعرفه).',
    quickAnswer_en: 'Answer: No; both credentials belong exclusively to the Knowledge category (something you know).',
  },

  {
    id: 'r2-1-07',
    lesson: '2-1',
    type: 'EXAM_HINT',
    typeLabel_ar: 'سر امتحاني',
    typeLabel_en: 'Exam Strategy',
    title_ar: 'الكلمات المفتاحية المعتمدة لأسئلة الدرس الأول في الامتحان',
    title_en: 'Approved Trigger Keywords for Lesson 2-1 Questions',
    summary_ar: 'دليل ربط المصطلحات بالكلمات المفتاحية الأكثر تكراراً في نماذج وتقييمات الوزارة الرسمية للدرس 2-1.',
    summary_en: 'Keyword association mapping for Lesson 2-1 ministry assessment questions and exam prompts.',
    content_ar:
      'دليل الكلمات المفتاحية وسرعة الحل:\n\n'
      + '1. "مشاركة المفاتيح بأمان دون اتفاق مسبق":\n'
      + '   الحل المباشر: التشفير بالمفتاح العام (غير المتماثل).\n\n'
      + '2. "نقل وتبادل كميات ضخمة من البيانات بسرعة فائقة":\n'
      + '   الحل المباشر: التشفير بالمفتاح المشترك (المتماثل).\n\n'
      + '3. "التحقق من صحة وهوية خادم الويب وارتباطه بالنطاق عبر CA":\n'
      + '   الحل المباشر: الشهادة الرقمية (Digital Certificate).\n\n'
      + '4. "كشف التلاعب وانتحال الشخصية وعدم الإنكار":\n'
      + '   الحل المباشر: التوقيع الرقمي (Digital Signature).\n\n'
      + '5. "الجمع بين عاملين أو أكثر من فئات مختلفة لمنع الاختراق عند تسرب كلمة المرور":\n'
      + '   الحل المباشر: المصادقة متعددة العوامل (MFA).',
    content_en:
      'Keyword Mapping Matrix:\n\n'
      + '1. "Secure key distribution without prior shared secrets":\n'
      + '   Select: Public-Key (Asymmetric) Cryptography.\n\n'
      + '2. "High-speed transmission of heavy payloads":\n'
      + '   Select: Common-Key (Symmetric) Cryptography.\n\n'
      + '3. "Server authentication and verified domain binding via CA":\n'
      + '   Select: Digital Certificate.\n\n'
      + '4. "Tamper detection, spoofing prevention, non-repudiation":\n'
      + '   Select: Digital Signature.\n\n'
      + '5. "Combining two or more distinct credential categories":\n'
      + '   Select: Multi-Factor Authentication (MFA).',
    keyTakeaway_ar: 'قاعدة الامتحان: احفظ الاقتران بين التوقيع الرقمي والخصائص الثلاث (التلاعب، الانتحال، عدم التنصل).',
    keyTakeaway_en: 'Exam Rule: Link digital signature immediately to tamper detection, identity proof, and non-repudiation.',
    quickQuestion_ar: 'سؤال سريع: إذا ورد في السؤال مصطلح "عدم التنصل"، فما المفهوم الأمني المقصود مباشرة؟',
    quickQuestion_en: 'Quick Check: If a prompt specifies "non-repudiation", what security mechanism is targeted?',
    quickAnswer_ar: 'الإجابة: التوقيع الرقمي (Digital Signature).',
    quickAnswer_en: 'Answer: Digital Signature.',
  },

  {
    id: 'r2-1-08',
    lesson: '2-1',
    type: 'WARNING',
    typeLabel_ar: 'أخطاء شائعة',
    typeLabel_en: 'Common Pitfalls',
    title_ar: 'الأخطاء الخمسة الشائعة في امتحانات الدرس الأول',
    title_en: 'Five Common Student Traps in Lesson 2-1 Exams',
    summary_ar: 'تحذيرات من الخلط الشائع بين المفاهيم في أسئلة الاختيار والمقالي الخاصة بالدرس 2-1.',
    summary_en: 'Warnings against frequent conceptual confusions in Lesson 2-1 multiple-choice and essay questions.',
    content_ar:
      'الخطأ الأول: الاعتقاد بأن التشفير غير المتماثل يُشفر صفحات الويب طوال الاتصال.\n'
      + 'الصواب: التشفير غير المتماثل يقتصر على مرحلة المصافحة فقط، وتشفير البيانات الفعلي يتم بالمفتاح المتماثل.\n\n'
      + 'الخطأ الثاني: الخلط بين الشهادة الرقمية والتوقيع الرقمي.\n'
      + 'الصواب: الشهادة تثبت هوية الخادم والنطاق، أما التوقيع الرقمي فيثبت سلامة المحتوى وهوية محرر المستند.\n\n'
      + 'الخطأ الثالث: الاعتقاد بأن التشفير المتماثل يستخدم مفتاحين متشابهين.\n'
      + 'الصواب: التشفير المتماثل يستخدم مفتاحاً واحداً مشتركاً فقط، ومفتاحان تعني تشفيراً غير متماثل.\n\n'
      + 'الخطأ الرابع: اعتبار سؤال الأمان عاملاً ثانياً مع كلمة المرور.\n'
      + 'الصواب: كلاهما من فئة المعرفة، ولتحقيق MFA يلزم عامل من فئة أخرى كالهاتف أو البصمة.\n\n'
      + 'الخطأ الخامس: الظن بأن HTTPS يكافح الرسائل الاحتيالية ومواقع التصيد.\n'
      + 'الصواب: HTTPS يحمي مسار النقل من التنصت فقط، ولا علاقة له بمصداقية ونزاهة صاحب الموقع.',
    content_en:
      'Trap 1: Believing asymmetric encryption handles web traffic throughout the whole session.\n'
      + 'Correction: Asymmetric cipher handles handshake only; symmetric cipher encrypts bulk session data.\n\n'
      + 'Trap 2: Confusing digital certificates with digital signatures.\n'
      + 'Correction: Certificates authenticate servers/domains; signatures authenticate document integrity and author.\n\n'
      + 'Trap 3: Believing symmetric encryption uses two twin keys.\n'
      + 'Correction: Symmetric uses exactly one shared secret key; two keys denote asymmetric.\n\n'
      + 'Trap 4: Treating security questions as a valid second factor with passwords.\n'
      + 'Correction: Both belong to Knowledge; a valid second factor must come from Possession or Biometrics.\n\n'
      + 'Trap 5: Assuming HTTPS protects against phishing campaigns.\n'
      + 'Correction: HTTPS only encrypts transmission against wiretapping, regardless of site legitimacy.',
    keyTakeaway_ar: 'قاعدة الامتحان: راجع تصنيف العامل جيداً قبل الحكم عليه بأنه MFA، وتأكد من اختلاف الفئتين.',
    keyTakeaway_en: 'Exam Rule: Verify factor categories strictly before validating an MFA implementation.',
    quickQuestion_ar: 'سؤال سريع: صح أم خطأ؟ التشفير المتماثل يستخدم زوجاً من المفاتيح المتشابهة في التشفير وفك التشفير.',
    quickQuestion_en: 'Quick Check: True or False? Symmetric encryption uses a pair of identical keys.',
    quickAnswer_ar: 'الإجابة: خطأ؛ التشفير المتماثل يستخدم مفتاحاً واحداً مفرداً مشتركاً، وزوج المفاتيح خاص بغير المتماثل.',
    quickAnswer_en: 'Answer: False; symmetric ciphers utilize a single shared key; key pairs are asymmetric.',
  },
];

// ─────────────────────────────────────────────────────────────
// LESSON 2-2: تصميم أمان الشبكات
// ─────────────────────────────────────────────────────────────
export const REVIEW_L2: ReviewCard[] = [
  {
    id: 'r2-2-01',
    lesson: '2-2',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'جدار الحماية (Firewall) وآلية التصفية وفق القواعد',
    title_en: 'Firewall Architecture and Rule-Based Traffic Filtering',
    summary_ar: 'جدار الحماية نظام أمني عند مدخل الشبكة يراقب حركة المرور ويسمح بها أو يحظرها وفق قواعد مسبقة لمنافذ وعناوين IP.',
    summary_en: 'A firewall operates at the network perimeter, inspecting and filtering packets against predefined IP and port rules.',
    content_ar:
      'أولاً: الوظيفة والموقع:\n'
      + '• نظام برمجي أو جهاز مادي يُثبت عند نقطة الدخول بين الشبكة الخارجية (الإنترنت) والشبكة الداخلية.\n'
      + '• يراقب ويفحص كل حزم البيانات الواردة والصادرة.\n\n'
      + 'ثانياً: آلية العمل وفق القواعد المحددة مسبقاً (Rules):\n'
      + 'يفحص جدار الحماية معلومات ترويسة الحزمة:\n'
      + '1. عنوان IP للمرسل والوجهة (Source & Destination IP).\n'
      + '2. أرقام المنافذ (Port Numbers) مثل المنفذ 80 و 443 للويب أو 22 للإدارة.\n'
      + '3. نوع البروتوكول (TCP / UDP / ICMP).\n'
      + 'بناءً على مطابقة القواعد: يُسمح للحزمة بالمرور (Allow) أو يتم إسقاطها وحظرها (Block/Drop).\n\n'
      + 'ثالثاً: دوره في استراتيجية الدفاع في العمق:\n'
      + 'يمثل الطبقة الأولى المسؤولة عن "مدخل الشبكة" (Network Entry).\n\n'
      + 'رابعاً: الحدود التقنية لجدار الحماية التقليدي:\n'
      + 'لا يفحص جدار الحماية محتوى الملفات الداخلية للحزمة للبحث عن الفيروسات؛ هذا دور برامج مكافحة الفيروسات في الأجهزة الطرفية.',
    content_en:
      'Function & Placement:\n'
      + '• Hardware or software system deployed at ingress/egress points between public networks and private subnets.\n'
      + '• Continuously monitors bidirectional packet streams.\n\n'
      + 'Rule-Based Evaluation:\n'
      + 'Evaluates packet headers against predefined policies:\n'
      + '1. Source and destination IP addresses.\n'
      + '2. Port numbers (e.g., port 80/443 for web, 22 for SSH).\n'
      + '3. Transport protocols (TCP, UDP, ICMP).\n'
      + 'Executes deterministic Allow or Drop directives.\n\n'
      + 'Defense in Depth Assignment:\n'
      + 'Anchors the first defense layer: "Network Entry".\n\n'
      + 'Technical Boundary:\n'
      + 'Traditional firewalls inspect network headers, not deep file payloads for signature-based malware.',
    keyTakeaway_ar: 'قاعدة الامتحان: كلما ورد "مراقبة المرور والسماح أو المنع وفق قواعد مسبقة لعناوين IP ومنافذ" فالإجابة هي جدار الحماية (Firewall).',
    keyTakeaway_en: 'Exam Rule: Filter logic matching predefined IP and port rules always denotes a Firewall.',
    quickQuestion_ar: 'سؤال سريع: هل يمنع جدار الحماية التقليدي الموظف من تنزيل ملف يحتوي على فيروس عبر منفذ الويب المسموح به؟',
    quickQuestion_en: 'Quick Check: Does a traditional firewall prevent downloading a virus payload over an allowed HTTP port?',
    quickAnswer_ar: 'الإجابة: لا؛ لأن جدار الحماية يسمح بمرور حركة المنفذ المعتمد ولا يفحص محتوى الملف الداخلي كبرامج مكافحة الفيروسات.',
    quickAnswer_en: 'Answer: No; traditional firewalls permit traffic through allowed ports without scanning payload contents for virus signatures.',
  },

  {
    id: 'r2-2-02',
    lesson: '2-2',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'الشبكة الافتراضية الخاصة (VPN) وتأمين الاتصال عن بعد',
    title_en: 'Virtual Private Networks (VPN) and Remote Tunneling',
    summary_ar: 'تنشئ VPN نفقاً مشفراً عبر شبكة عامة يمنع التنصت على البيانات ويُمكّن الموظفين عن بعد من الاتصال الآمن بشبكة المؤسسة.',
    summary_en: 'A VPN establishes an encrypted logical tunnel over public networks, shielding data from interception during remote access.',
    content_ar:
      'أولاً: تعريف شبكة VPN:\n'
      + 'اتصال منطقي آمن يُنشأ عبر بنية تحتية عامة وغير موثوقة كالإنترنت، باستخدام تقنيات النفق المشفر (Encrypted Tunnel).\n\n'
      + 'ثانياً: الفوائد والوظائف الأساسية:\n'
      + '1. تشفير كامل البيانات المنقولة، مما يمنع التنصت وهجمات الوسيط (Man-in-the-Middle).\n'
      + '2. تأمين اتصال الأجهزة عبر شبكات Wi-Fi العامة في الأماكن المفتوحة كالمطارات والمقاهي.\n'
      + '3. تمكين الموظفين المتواجدين في المنازل أو الفروع من الوصول إلى خوادم وملفات الشركة بأمان كأنهم متصلون محلياً.\n\n'
      + 'ثالثاً: دورها في الدفاع في العمق:\n'
      + 'تمثل طبقة "مسار الاتصال" (Communication Path).\n\n'
      + 'رابعاً: توضيح امتحاني:\n'
      + 'VPN توفر قناة آمنة لنقل البيانات، لكنها لا تمنع الأجهزة المصابة بالفيروسات من نقل التهديد إذا كانت مخترقة بالفعل.',
    content_en:
      'Definition:\n'
      + 'A secure logical connection created over untrusted public infrastructure using encrypted encapsulation tunnels.\n\n'
      + 'Primary Functions:\n'
      + '1. Complete data ciphering preventing packet sniffing and wiretapping.\n'
      + '2. Protection when accessing services across insecure public Wi-Fi hotspots.\n'
      + '3. Secure seamless corporate intranet access for distributed and telecommuting staff.\n\n'
      + 'Defense in Depth Assignment:\n'
      + 'Occupies layer 2: "Communication Path".\n\n'
      + 'Exam Distinction:\n'
      + 'VPN secures data transport; it does not disinfect endpoint hosts infected with malware.',
    keyTakeaway_ar: 'قاعدة الامتحان: كلما ورد "نفق مشفر عبر شبكة عامة" أو "العمل عن بعد بأمان وحماية Wi-Fi العامة" فالإجابة هي VPN.',
    keyTakeaway_en: 'Exam Rule: Prompts mentioning encrypted tunnels over public networks or secure telecommuting specify a VPN.',
    quickQuestion_ar: 'سؤال سريع: ما الدور الذي تؤديه VPN في استراتيجية الدفاع في العمق؟',
    quickQuestion_en: 'Quick Check: What role does a VPN fulfill within a Defense in Depth strategy?',
    quickAnswer_ar: 'الإجابة: تمثل طبقة "مسار الاتصال" بتشفير البيانات المنقولة بين الجهاز والشبكة الداخلية وحمايتها من التنصت.',
    quickAnswer_en: 'Answer: It fulfills the "Communication Path" layer by encrypting transmitted data against interception.',
  },

  {
    id: 'r2-2-03',
    lesson: '2-2',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'المنطقة المعزولة (DMZ) وعزل الخوادم العامة',
    title_en: 'Demilitarized Zone (DMZ) and Public Server Isolation',
    summary_ar: 'المنطقة المعزولة هي شبكة فرعية تفصل الخوادم الموجهة للجمهور عن الشبكة الداخلية لحماية قواعد البيانات الحساسة عند اختراق الخادم.',
    summary_en: 'A DMZ isolates public-facing servers from internal private networks, preventing attackers from reaching internal databases after a web breach.',
    content_ar:
      'أولاً: تعريف الـ DMZ:\n'
      + 'شبكة فرعية معزولة تقع كمنطقة وسيطة ومحمية بجدران نارية بين الإنترنت الخارجي والشبكة الداخلية الخاصة للمؤسسة.\n\n'
      + 'ثانياً: تصنيف الخوادم وتوزيعها الصحيح:\n'
      + '• ما يوضع داخل منطقة الـ DMZ: الخوادم التي يحتاج الجمهور للوصول إليها مباشرة (خادم الويب، خادم البريد، خادم DNS الخارجي).\n'
      + '• ما يُمنع وضعه في الـ DMZ ويوضع في الشبكة الداخلية: قواعد البيانات الحساسة (Database Servers)، ملفات الموظفين، أنظمة الرواتب.\n\n'
      + 'ثالثاً: الفائدة الدفاعية الجوهرية:\n'
      + 'في حال تعرض خادم الويب العام للاختراق، يبقى المهاجم محاصراً داخل منطقة الـ DMZ وتمنعه الجدران النارية الداخلية من الوصول إلى قواعد البيانات الحساسة في الشبكة الداخلية.\n\n'
      + 'رابعاً: دورها في الدفاع في العمق:\n'
      + 'تمثل طبقة "وضع الخوادم" (Server Placement).',
    content_en:
      'Definition:\n'
      + 'A screened subnetwork bounded by firewalls serving as an intermediate zone between public internet and private intranets.\n\n'
      + 'Server Placement Architecture:\n'
      + '• Placed inside DMZ: Publicly accessible endpoints (Web, Mail, External DNS).\n'
      + '• Strictly confined to internal network: Confidential database servers, financial records, employee directories.\n\n'
      + 'Core Defensive Mechanism:\n'
      + 'If an internet-facing web server is compromised, containment rules prevent the intruder from pivoting into the internal subnet hosting sensitive databases.\n\n'
      + 'Defense in Depth Assignment:\n'
      + 'Occupies layer 3: "Server Placement".',
    keyTakeaway_ar: 'قاعدة الامتحان: عزل خوادم الويب العامة عن قواعد البيانات والشبكة الداخلية لحصر أثر الاختراق = المنطقة المعزولة (DMZ).',
    keyTakeaway_en: 'Exam Rule: Isolating public web servers to insulate internal databases against lateral breach containment = DMZ.',
    quickQuestion_ar: 'سؤال سريع: لماذا يعد وضع خادم قاعدة البيانات الرئيسية داخل منطقة DMZ خطأً أمنياً فادحاً؟',
    quickQuestion_en: 'Quick Check: Why is deploying a database server in the DMZ considered a critical architectural failure?',
    quickAnswer_ar: 'الإجابة: لأن اختراق أي خادم ويب عام في الـ DMZ سيمكن المهاجم من الوصول الفوري لقاعدة البيانات وسرقتها؛ مكانها الصحيح هو الشبكة الداخلية المحمية.',
    quickAnswer_en: 'Answer: Breaching an adjacent web server would grant immediate lateral access to database files; databases belong inside private zones.',
  },

  {
    id: 'r2-2-04',
    lesson: '2-2',
    type: 'TABLE',
    typeLabel_ar: 'جدول حفظ',
    typeLabel_en: 'Summary Table',
    title_ar: 'الطبقات الأربع للدفاع في العمق (Defense in Depth)',
    title_en: 'The Four Defense in Depth Layers Overview',
    summary_ar: 'استراتيجية متعددة الطبقات لمنع نقاط الفشل الفردية؛ تتكون من: مدخل الشبكة، مسار الاتصال، وضع الخوادم، والأجهزة الطرفية.',
    summary_en: 'A multi-layered posture eliminating single points of failure, comprised of entry, path, server placement, and endpoint controls.',
    content_ar:
      'المفهوم الأساسي للاستراتيجية:\n'
      + 'تطبيق ضوابط أمنية متعددة ومتتالية؛ بحيث إذا تم اختراق طبقة معينة أو فشلت، تتولى الطبقات التالية حماية النظام ومنع انهياره، مما يقضي على نقاط الفشل الفردية (Single Point of Failure).\n\n'
      + 'جدول الطبقات الأربع المعتمدة في منهج الوزارة:\n\n'
      + 'الطبقة 1: مدخل الشبكة (Network Entry)\n'
      + '• الإجراء الأمني: جدار الحماية (Firewall).\n'
      + '• الوظيفة: تصفية الاتصالات ومنع الوصول غير المصرح به عند الحدود الخارجية.\n\n'
      + 'الطبقة 2: مسار الاتصال (Communication Path)\n'
      + '• الإجراء الأمني: التشفير وبروتوكول VPN.\n'
      + '• الوظيفة: حماية البيانات المنقولة عبر الشبكات ومنع التنصت.\n\n'
      + 'الطبقة 3: وضع الخوادم (Server Placement)\n'
      + '• الإجراء الأمني: المنطقة المعزولة (DMZ).\n'
      + '• الوظيفة: عزل الخوادم العامة لمنع تسلل المخترق إلى قواعد البيانات الداخلية.\n\n'
      + 'الطبقة 4: الأجهزة الطرفية (Endpoints)\n'
      + '• الإجراء الأمني: برامج مكافحة الفيروسات وتحديثات أنظمة التشغيل.\n'
      + '• الوظيفة: حماية حواسيب وهواتف الموظفين من البرمجيات الخبيثة والثغرات.',
    content_en:
      'Strategic Objective:\n'
      + 'Layered defensive barriers ensure that single control breaches do not compromise the entire enterprise, eliminating single points of failure.\n\n'
      + 'The Four Ministry Curriculum Layers:\n\n'
      + 'Layer 1: Network Entry\n'
      + '• Control: Firewall.\n'
      + '• Purpose: Ingress/egress filtering at perimeter boundaries.\n\n'
      + 'Layer 2: Communication Path\n'
      + '• Control: Encryption and VPN.\n'
      + '• Purpose: Cryptographic payload protection over untrusted networks.\n\n'
      + 'Layer 3: Server Placement\n'
      + '• Control: Demilitarized Zone (DMZ).\n'
      + '• Purpose: Isolating public endpoints from core operational repositories.\n\n'
      + 'Layer 4: Endpoints\n'
      + '• Control: Antivirus software and OS patch management.\n'
      + '• Purpose: Safeguarding user workstations, laptops, and mobile assets.',
    keyTakeaway_ar: 'قاعدة الامتحان: اربط دائماً: مدخل = جدار حماية، مسار = VPN وتشفير، وضع خوادم = DMZ، أجهزة طرفية = مضاد فيروسات وتحديثات.',
    keyTakeaway_en: 'Exam Rule: Always link: Entry = Firewall, Path = VPN, Placement = DMZ, Endpoints = Antivirus/Updates.',
    quickQuestion_ar: 'سؤال سريع: ما الطبقة المعنية بحماية أجهزة حواسيب الموظفين في الدفاع في العمق، وما إجراؤها؟',
    quickQuestion_en: 'Quick Check: Which Defense in Depth layer covers employee laptops, and what control is applied?',
    quickAnswer_ar: 'الإجابة: طبقة الأجهزة الطرفية (Endpoints)، وإجراؤها هو برامج مكافحة الفيروسات والتحديثات المستمرة لأنظمة التشغيل.',
    quickAnswer_en: 'Answer: The Endpoints layer, secured via antivirus engines and systematic operating system patching.',
  },

  {
    id: 'r2-2-05',
    lesson: '2-2',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'أسباب سقوط مفهوم المحيط الأمني التقليدي (Perimeter Security)',
    title_en: 'Drivers Behind Traditional Perimeter Security Erosion',
    summary_ar: 'انهار نموذج المحيط الأمني التقليدي الذي يفترض أن داخل المقر آمن بسبب شيوع الحوسبة السحابية وانتشار العمل عن بعد.',
    summary_en: 'The classic perimeter model assuming internal assets are safe dissolved due to cloud computing adoption and remote workforces.',
    content_ar:
      'أولاً: ما هو نموذج المحيط الأمني التقليدي؟\n'
      + 'نموذج كلاسيكي يفترض وجود حدود واضحة: ما هو داخل مبنى المؤسسة وشبكتها السلكية موثوق وآمن، وما هو بالخارج خطر ومشكوك فيه.\n\n'
      + 'ثانياً: السببان الرئيسيان لسقوط وطمس هذا النموذج:\n'
      + '1. انتشار الحوسبة السحابية (Cloud Computing):\n'
      + '   لم تعد بيانات وخوادم المؤسسة موجودة داخل المقر الجغرافي للشركة، بل أصبحت مستضافة على مراكز بيانات سحابية خارجية عبر الإنترنت.\n'
      + '2. انتشار العمل عن بعد والاتصال بأجهزة شخصية (BYOD & Remote Work):\n'
      + '   أصبح الموظفون ينجزون مهامهم من المنازل والمقاهي باستخدام هواتفهم وأجهزتهم المحمولة، مما جعل حماية بوابة المبنى غير مجدية.\n\n'
      + 'النتيجة المترتبة:\n'
      + 'الحاجة إلى نهج جديد لا يربط الأمان بالموقع الجغرافي أو كابل الشبكة، وهو نهج انعدام الثقة (Zero Trust).',
    content_en:
      'Traditional Perimeter Security Defined:\n'
      + 'A historic castle-and-moat architecture assuming that whatever resides inside physical corporate walls is inherently trustworthy.\n\n'
      + 'The Two Primary Catalysts of Perimeter Dissolution:\n'
      + '1. Cloud Computing Expansion:\n'
      + '   Enterprise applications, databases, and services transitioned to external multi-tenant cloud data centers.\n'
      + '2. Remote Workforce and Personal Device Proliferation:\n'
      + '   Personnel access sensitive records from external residential and mobile connections, rendering fixed perimeter gates obsolete.\n\n'
      + 'Direct Consequence:\n'
      + 'Necessitated shifting from physical boundary trust to Zero Trust architecture.',
    keyTakeaway_ar: 'قاعدة الامتحان: سببا سقوط المحيط الأمني هما الحوسبة السحابية والعمل عن بعد، والحل البديل هو نهج انعدام الثقة (Zero Trust).',
    keyTakeaway_en: 'Exam Rule: Perimeter security collapsed due to cloud computing and telework, prompting adoption of Zero Trust.',
    quickQuestion_ar: 'سؤال سريع: اذكر العاملين اللذين تسببا في طمس الحدود الفاصلة بين داخل المؤسسة وخارجها.',
    quickQuestion_en: 'Quick Check: Name the two factors that blurred traditional enterprise boundaries.',
    quickAnswer_ar: 'الإجابة: 1. انتشار الحوسبة السحابية، 2. انتشار العمل عن بعد واستخدام الأجهزة الشخصية خارج المقر.',
    quickAnswer_en: 'Answer: 1. Cloud computing adoption, and 2. Remote telecommuting with mobile endpoints.',
  },

  {
    id: 'r2-2-06',
    lesson: '2-2',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'نهج انعدام الثقة (Zero Trust): الشعار والمبادئ والمعايير',
    title_en: 'Zero Trust Architecture: Motto, Principles, and Criteria',
    summary_ar: 'يقوم نهج انعدام الثقة على شعار "لا تثق بأحد وتحقق دائماً"، ويتحقق من الهوية والصلاحيات والسياق عند كل محاولة وصول.',
    summary_en: 'Zero Trust operates on "Never trust, always verify", validating identity, permissions, and contextual factors continuously.',
    content_ar:
      'أولاً: الشعار الذهبي لنهج Zero Trust:\n'
      + '"لا تثق بأحد إطلاقاً، وتحقق دائماً من كل شيء" (Never Trust, Always Verify).\n\n'
      + 'ثانياً: المبادئ الثلاثة الحاكمة:\n'
      + '1. التحقق المستمر والصريح: فحص المستخدم والجهاز في كل مرة يُطلب فيها الوصول لمورد جديد، وليس لمرة واحدة عند بداية اليوم.\n'
      + '2. مبدأ الحد الأدنى من الامتيازات (Least Privilege): منح الموظف صلاحية الوصول للملفات والبرامج اللازمة لأداء وظيفته فقط دون صلاحيات إضافية.\n'
      + '3. افتراض وقوع الاختراق (Assume Breach): التعامل الدائم بافتراض أن الشبكة مخترقة داخلياً، ومراقبة كل الاتصالات المشبوهة وحصر الأثر.\n\n'
      + 'ثالثاً: معايير الفحص الثلاثة عند كل طلب وصول:\n'
      + '• الهوية (Identity): التحقق من هوية الشخص باستخدام المصادقة متعددة العوامل (MFA).\n'
      + '• الصلاحيات (Permissions): التأكد من أحقية الحساب في فتح هذا الملف تحديداً.\n'
      + '• السياق (Context): فحص حالة الجهاز الأمني، والموقع الجغرافي، وتوقيت طلب الدخول.',
    content_en:
      'Strategic Motto:\n'
      + '"Never Trust, Always Verify".\n\n'
      + 'The Three Core Principles:\n'
      + '1. Continuous Explicit Verification: Authenticate identity and host state on every single transaction.\n'
      + '2. Principle of Least Privilege: Grant strictly the minimal access levels required for job completion.\n'
      + '3. Assume Breach: Architect systems assuming adversary presence within internal segments.\n\n'
      + 'The Three Evaluation Criteria:\n'
      + '• Identity: Validated via robust MFA challenges.\n'
      + '• Permissions: Checked against role-based authorization policies.\n'
      + '• Context: Evaluated against device posture, geographic coordinates, and access timeline.',
    keyTakeaway_ar: 'قاعدة الامتحان: Zero Trust يلغي الثقة التلقائية بالموقع، ويعتمد التحقق المستمر، وأقل الامتيازات، وفحص الهوية والصلاحيات والسياق.',
    keyTakeaway_en: 'Exam Rule: Zero Trust cancels implicit perimeter trust, enforcing continuous least-privilege context checks.',
    quickQuestion_ar: 'سؤال سريع: ما معايير الفحص الثلاثة التي يقيّمها نهج Zero Trust عند كل محاولة وصول لملف حساس؟',
    quickQuestion_en: 'Quick Check: What three criteria does Zero Trust evaluate on every resource access request?',
    quickAnswer_ar: 'الإجابة: 1. الهوية (التحقق بالـ MFA)، 2. الصلاحيات (أحقية الوصول)، 3. السياق (حالة الجهاز والموقع والوقت).',
    quickAnswer_en: 'Answer: 1. Identity (via MFA), 2. Permissions (access rights), and 3. Context (device health, location, time).',
  },

  {
    id: 'r2-2-07',
    lesson: '2-2',
    type: 'TABLE',
    typeLabel_ar: 'مقارنة معتمدة',
    typeLabel_en: 'Comparison Table',
    title_ar: 'مقارنة شاملة: الأمان التقليدي مقابل نهج انعدام الثقة (Zero Trust)',
    title_en: 'Traditional Perimeter Security versus Zero Trust Model',
    summary_ar: 'التقليدي يمنح الثقة التلقائية لمن بداخل المبنى ويتحقق لمرة واحدة، بينما Zero Trust يرفض الثقة التلقائية ويتحقق باستمرار وفق الصلاحيات والسياق.',
    summary_en: 'Traditional grants implicit trust inside perimeters with single logins; Zero Trust enforces continuous least-privilege verification everywhere.',
    content_ar:
      'وجه المقارنة 1: الافتراض الأمني المبدئي\n'
      + '• الأمان التقليدي: ما بداخل الشبكة موثوق وآمن، وما بالخارج غير موثوق.\n'
      + '• نهج Zero Trust: الجميع غير موثوق به تلقائياً (سواء كان بداخل المبنى أو خارجه).\n\n'
      + 'وجه المقارنة 2: آلية التحقق من الهوية\n'
      + '• الأمان التقليدي: تحقق لمرة واحدة عند نقطة الدخول (تسجيل الدخول الصباحي).\n'
      + '• نهج Zero Trust: تحقق مستمر وديناميكي عند كل محاولة فتح ملف أو تطبيق.\n\n'
      + 'وجه المقارنة 3: نطاق الصلاحيات الممنوحة\n'
      + '• الأمان التقليدي: صلاحيات وصول واسعة وشاملة بمجرد الدخول للشبكة.\n'
      + '• نهج Zero Trust: صلاحيات مقيدة بدقة وفق مبدأ الحد الأدنى من الامتيازات (Least Privilege).\n\n'
      + 'وجه المقارنة 4: حركة المهاجم بعد اختراق حساب موظف\n'
      + '• الأمان التقليدي: يتحرك المهاجم بحرية أفقياً بين أجهزة وخوادم الشبكة الداخلية.\n'
      + '• نهج Zero Trust: يظل المهاجم محاصراً لأن كل خطوة تتطلب مصادقة وفحص سياق مستقل.',
    content_en:
      'Comparison Dimension 1: Trust Assumption\n'
      + '• Traditional: Internal network hosts are inherently safe; external traffic is untrusted.\n'
      + '• Zero Trust: No entity or location is trusted by default.\n\n'
      + 'Comparison Dimension 2: Authentication Frequency\n'
      + '• Traditional: One-time login challenge at entry boundary.\n'
      + '• Zero Trust: Continuous, dynamic evaluation on each transactional call.\n\n'
      + 'Comparison Dimension 3: Access Scope\n'
      + '• Traditional: Broad lateral visibility and permissions once inside.\n'
      + '• Zero Trust: Strict Least Privilege permissions matching specific workflow needs.\n\n'
      + 'Comparison Dimension 4: Lateral Movement Resilience\n'
      + '• Traditional: Attackers pivot easily across internal resources.\n'
      + '• Zero Trust: Lateral progression is intercepted by segmented per-request authorization.',
    keyTakeaway_ar: 'قاعدة الامتحان: الأمان التقليدي = تحقق لمرة واحدة وصلاحيات واسعة. نهج Zero Trust = تحقق مستمر وصلاحيات محدودة وسياق.',
    keyTakeaway_en: 'Exam Rule: Traditional = one-time entry trust; Zero Trust = continuous validation with strict least privilege.',
    quickQuestion_ar: 'سؤال سريع: ماذا يحدث عندما يخترق مهاجم حساب موظف في بيئة تطبق Zero Trust مقارنة بالبيئة التقليدية؟',
    quickQuestion_en: 'Quick Check: How does Zero Trust limit breach blast radius compared to traditional architectures?',
    quickAnswer_ar: 'الإجابة: في البيئة التقليدية يتحرك المهاجم بحرية داخل الشبكة، أما في Zero Trust فيظل محاصراً لأن صلاحيات الحساب محدودة وكل مورد يتطلب فحص سياق جديد.',
    quickAnswer_en: 'Answer: Traditional permits free lateral movement; Zero Trust confines attackers because permissions are minimal and micro-checked.',
  },

  {
    id: 'r2-2-08',
    lesson: '2-2',
    type: 'EXAM_HINT',
    typeLabel_ar: 'سر امتحاني',
    typeLabel_en: 'Exam Strategy',
    title_ar: 'الكلمات المفتاحية المعتمدة لأسئلة الدرس الثاني في الامتحان',
    title_en: 'Approved Trigger Keywords for Lesson 2-2 Questions',
    summary_ar: 'دليل ربط المصطلحات بالكلمات المفتاحية الأكثر تكراراً في تقييمات الوزارة الرسمية للدرس 2-2.',
    summary_en: 'Keyword mapping reference for Lesson 2-2 network security design questions.',
    content_ar:
      'دليل الكلمات المفتاحية وسرعة الحل:\n\n'
      + '1. "مراقبة حركة البيانات والسماح أو المنع وفق قواعد محددة مسبقاً لعناوين ومنافذ":\n'
      + '   الحل المباشر: جدار الحماية (Firewall).\n\n'
      + '2. "نفق مشفر عبر شبكة عامة / تأمين العمل عن بعد / حماية Wi-Fi العامة":\n'
      + '   الحل المباشر: الشبكة الافتراضية الخاصة (VPN).\n\n'
      + '3. "عزل الخوادم العامة عن الشبكة الداخلية / حماية قواعد البيانات بعد اختراق خادم الويب":\n'
      + '   الحل المباشر: المنطقة المعزولة (DMZ).\n\n'
      + '4. "طبقات أمنية متعددة ومتتالية لتفادي نقاط الفشل الفردية":\n'
      + '   الحل المباشر: الدفاع في العمق (Defense in Depth).\n\n'
      + '5. "طمس الحدود التقليدية بسبب السحابة والعمل عن بعد":\n'
      + '   الحل المباشر: سقوط المحيط الأمني التقليدي (Perimeter Security).\n\n'
      + '6. "لا تثق بأحد وتحقق دائماً / التحقق المستمر والصلاحيات الدنيا":\n'
      + '   الحل المباشر: نهج انعدام الثقة (Zero Trust).',
    content_en:
      'Keyword Mapping Reference:\n\n'
      + '1. "Traffic filtering against predefined IP/port policies":\n'
      + '   Select: Firewall.\n\n'
      + '2. "Encrypted tunnel across untrusted public networks / remote staff access":\n'
      + '   Select: Virtual Private Network (VPN).\n\n'
      + '3. "Isolating web servers to safeguard back-end databases from external breach":\n'
      + '   Select: Demilitarized Zone (DMZ).\n\n'
      + '4. "Layered defenses mitigating single points of failure":\n'
      + '   Select: Defense in Depth.\n\n'
      + '5. "Perimeter dissolution driven by cloud expansion and remote telework":\n'
      + '   Select: Traditional Perimeter Security Erosion.\n\n'
      + '6. "Never trust, always verify / continuous verification / least privilege":\n'
      + '   Select: Zero Trust Architecture.',
    keyTakeaway_ar: 'قاعدة الامتحان: إذا كان السؤال عن عزل خوادم = DMZ، وإذا كان عن نفق مشفر = VPN، وإذا كان عن قواعد مرور = جدار حماية.',
    keyTakeaway_en: 'Exam Rule: Server isolation = DMZ, encrypted tunnel = VPN, packet rule filtering = Firewall.',
    quickQuestion_ar: 'سؤال سريع: ما المكون الأمني الذي يحمي قواعد البيانات الداخلية عند اختراق خادم الويب العام؟',
    quickQuestion_en: 'Quick Check: Which security component isolates internal databases when public web servers are hacked?',
    quickAnswer_ar: 'الإجابة: المنطقة المعزولة (DMZ).',
    quickAnswer_en: 'Answer: Demilitarized Zone (DMZ).',
  },
];

// ─────────────────────────────────────────────────────────────
// LESSON 2-3: الاستجابة للحوادث وإدارة المخاطر
// ─────────────────────────────────────────────────────────────
export const REVIEW_L3: ReviewCard[] = [
  {
    id: 'r2-3-01',
    lesson: '2-3',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'الحادث الأمني (Security Incident) والأمثلة الثلاثة المعتمدة',
    title_en: 'Security Incident Definition and the Three Standard Examples',
    summary_ar: 'الحادث الأمني هو موقف يترتب عليه ضرر فعلي للأصول أو الأنظمة، وأمثلته: تسرب المعلومات، التلاعب بالبيانات، وانقطاع الخدمة.',
    summary_en: 'A security incident involves realized damage to information assets, exemplified by leaks, data tampering, and service outages.',
    content_ar:
      'أولاً: تعريف الحادث الأمني بدقة:\n'
      + 'موقف يحدث فيه ضرر فعلي لأصول المعلومات أو الأنظمة بسبب مشكلة في أمن المعلومات.\n\n'
      + 'ثانياً: التمييز الامتحاني بين الثغرة والحادث:\n'
      + '• الثغرة أو الضعف الأمني (Vulnerability): نقطة ضعف محتملة موجودة بالنظام لم تسبب ضرراً بعد.\n'
      + '• الحادث الأمني (Security Incident): تم استغلال الضعف بالفعل ووقع ضرر حقيقي ملموس على الأصول.\n\n'
      + 'ثالثاً: الأمثلة الثلاثة المعتمدة في كتاب الوزارة وعلاقتها بمثلث أمان المعلومات (CIA):\n'
      + '1. تسرب المعلومات (Information Leak):\n'
      + '   خروج بيانات شخصية أو سرية لأطراف خارجية دون ترخيص ← يمثل خرقاً لركيزة السرية (Confidentiality).\n'
      + '2. التلاعب بالبيانات (Data Tampering):\n'
      + '   تعديل وتزوير البيانات أو ملفات النظام دون إذن ← يمثل خرقاً لركيزة السلامة (Integrity).\n'
      + '3. انقطاع الخدمة (Service Outage):\n'
      + '   توقف الخادم أو تعطل الموقع عن العمل نتيجة هجمات حجب الخدمة ← يمثل خرقاً لركيزة التوافر (Availability).',
    content_en:
      'Exact Definition:\n'
      + 'An adverse occurrence resulting in actual, realized damage to information assets or operational IT infrastructure.\n\n'
      + 'Vulnerability versus Incident:\n'
      + '• Vulnerability: A passive latent flaw or weakness that has not yet caused harm.\n'
      + '• Incident: An active event where vulnerability exploitation causes tangible damage.\n\n'
      + 'The Three Ministry Benchmark Examples (Mapped to CIA Triad):\n'
      + '1. Information Leak:\n'
      + '   Unauthorized exfiltration of sensitive or personal records ← Breaches Confidentiality.\n'
      + '2. Data Tampering:\n'
      + '   Illicit alteration of records or transactional ledgers ← Breaches Integrity.\n'
      + '3. Service Outage:\n'
      + '   Downtime preventing legitimate user system access (e.g., DoS) ← Breaches Availability.',
    keyTakeaway_ar: 'قاعدة الامتحان: الحادث الأمني يشترط وقوع "ضرر فعلي"، وأمثلته الثلاثة تسرب وتلاعب وانقطاع تغطي أركان CIA الثلاثة.',
    keyTakeaway_en: 'Exam Rule: Incidents require actual damage; leak, tampering, and outage directly map to Confidentiality, Integrity, and Availability.',
    quickQuestion_ar: 'سؤال سريع: تعرض موقع لهجوم حجب الخدمة (DDoS) وتوقف عن العمل ساعتين. أي ركن من أركان الأمان انهار هنا؟',
    quickQuestion_en: 'Quick Check: A DDoS attack caused two hours of system downtime. Which CIA pillar was compromised?',
    quickAnswer_ar: 'الإجابة: ركن التوافر (Availability)؛ لأن الخدمة أصبحت غير متاحة للمستخدمين المصرح لهم.',
    quickAnswer_en: 'Answer: Availability; authorized users were blocked from accessing the service.',
  },

  {
    id: 'r2-3-02',
    lesson: '2-3',
    type: 'TABLE',
    typeLabel_ar: 'جدول حفظ',
    typeLabel_en: 'Ordered Process',
    title_ar: 'المراحل الست للاستجابة للحوادث بالترتيب الإلزامي',
    title_en: 'The Six Ordered Stages of Incident Response',
    summary_ar: 'دورة الاستجابة بالترتيب: 1. التحضير، 2. الاكتشاف، 3. الاحتواء، 4. الاستئصال، 5. الاستعادة، 6. منع التكرار / الدروس المستفادة.',
    summary_en: 'Ordered lifecycle: 1. Preparation, 2. Detection, 3. Containment, 4. Eradication, 5. Recovery, 6. Lessons Learned.',
    content_ar:
      'جدول المراحل الست والغرض الامتحاني لكل مرحلة:\n\n'
      + 'المرحلة 1: التحضير (Preparation) — إجراء استباقي قبل الهجوم\n'
      + '• الغرض: وضع خطط الاستجابة، وتدريب الفريق، وتجهيز وتخزين النسخ الاحتياطية دورياً مسبقاً.\n\n'
      + 'المرحلة 2: الاكتشاف والتحليل (Detection & Analysis) — لحظة وقوع الهجوم\n'
      + '• الغرض: رصد مؤشرات الاختراق، والتأكد من وقوع حادث حقيقي، وتحديد نطاقه ومصدره المبدئي.\n\n'
      + 'المرحلة 3: الاحتواء (Containment) — إيقاف الانتشار\n'
      + '• الغرض: عزل الأنظمة والأجهزة المتضررة (مثل فصل كابل الشبكة) لمنع انتشار التهديد لباقي أجهزة المؤسسة.\n\n'
      + 'المرحلة 4: الاستئصال أو إزالة التهديد (Eradication) — تنظيف البيئة\n'
      + '• الغرض: إزالة السبب الجذري للحادث بالكامل، كحذف البرمجيات الخبيثة وسد الثغرات وإلغاء الحسابات المخترقة.\n\n'
      + 'المرحلة 5: الاستعادة (Recovery) — العودة للتشغيل\n'
      + '• الغرض: إعادة تشغيل الأنظمة والخدمات للعمل الطبيعي، واسترجاع البيانات من نسخ احتياطية سليمة مع المراقبة.\n\n'
      + 'المرحلة 6: منع التكرار والدروس المستفادة (Prevention of Recurrence) — تحصين المستقبل\n'
      + '• الغرض: تحليل أسباب وقوع الحادث، وتوثيق الدروس، وتحديث الخطط والسياسات الأمنية لضمان عدم تكرار الهجوم.',
    content_en:
      'Ordered Six-Stage Incident Framework:\n\n'
      + 'Stage 1: Preparation (Proactive Pre-Incident)\n'
      + '• Objective: Formulate response procedures, train responders, and maintain secure offline backups.\n\n'
      + 'Stage 2: Detection & Analysis (Active Incident Identification)\n'
      + '• Objective: Identify indicators of compromise, confirm real breach occurrences, and evaluate initial scope.\n\n'
      + 'Stage 3: Containment (Blast Radius Mitigation)\n'
      + '• Objective: Segment and isolate infected hosts (e.g., disconnecting network cables) to halt lateral spread.\n\n'
      + 'Stage 4: Eradication (Root Cause Elimination)\n'
      + '• Objective: Cleanse environments by purging malware, patching exploited vulnerabilities, and revoking keys.\n\n'
      + 'Stage 5: Recovery (Operational Restoration)\n'
      + '• Objective: Bring business services back online safely, restoring integrity from verified clean backups.\n\n'
      + 'Stage 6: Prevention of Recurrence / Lessons Learned (Post-Incident Hardening)\n'
      + '• Objective: Conduct retrospective reviews, document takeaways, and reinforce security policies to prevent recurrence.',
    keyTakeaway_ar: 'قاعدة الامتحان: الترتيب إلزامي: تحضير ← اكتشاف ← احتواء ← استئصال ← استعادة ← منع التكرار (دروس مستفادة).',
    keyTakeaway_en: 'Exam Rule: Strict order: Preparation → Detection → Containment → Eradication → Recovery → Lessons Learned.',
    quickQuestion_ar: 'سؤال سريع: في أي مرحلة يتم استرجاع البيانات من النسخ الاحتياطية وإعادة تشغيل الخادم للجمهور؟',
    quickQuestion_en: 'Quick Check: In which incident stage are databases restored from backups and made accessible?',
    quickAnswer_ar: 'الإجابة: مرحلة الاستعادة (Recovery).',
    quickAnswer_en: 'Answer: The Recovery stage.',
  },

  {
    id: 'r2-3-03',
    lesson: '2-3',
    type: 'WARNING',
    typeLabel_ar: 'أولوية حرجة',
    typeLabel_en: 'Critical Rule',
    title_ar: 'قاعدة الأسبقية: لماذا الاحتواء يسبق الاستئصال دائماً؟',
    title_en: 'Precedence Rule: Why Containment Must Always Precede Eradication',
    summary_ar: 'يجب عزل الجهاز المصاب أولاً لمنع البرمجية الخبيثة من الانتشار والهروب؛ والبدء بالحذف قبل العزل يفاقم الضرر.',
    summary_en: 'Isolating compromised hosts halts lateral malware spread; attempting cleanup without isolation permits malware propagation.',
    content_ar:
      'السؤال المقالي الأكثر تكراراً:\n'
      + 'لماذا يجب تنفيذ مرحلة الاحتواء قبل مرحلة الاستئصال؟ وما العواقب الوخيمة لعكس هذا الترتيب؟\n\n'
      + 'أولاً: سبب أسبقية الاحتواء:\n'
      + 'الاحتواء يهدف إلى محاصرة التهديد وقطع اتصاله بالشبكة والإنترنت. والبدء بالاحتواء يوقف فوراً قدرة البرمجية الخبيثة على الانتشار لأجهزة وخوادم أخرى، ويمنع المهاجم من تسريب مزيد من البيانات.\n\n'
      + 'ثانياً: العواقب الكارثية إذا تم عكس الترتيب (البدء بالاستئصال قبل الاحتواء):\n'
      + '1. بينما ينشغل الفريق الفني بفحص وحذف الفيروس من جهاز واحد، يستغل الفيروس اتصاله بالشبكة لإصابة عشرات الخوادم الأخرى.\n'
      + '2. قد يقوم المهاجم أو برمجية الفدية بتشفير بيانات إضافية أو مسح سجلات الأدلة الجنائية أثناء محاولة حذفه.\n'
      + '3. اتساع نطاق الضرر وتضاعف الخسائر المادية والتشغيلية على المؤسسة.',
    content_en:
      'Core Essay Question Focus:\n'
      + 'Why must Containment precede Eradication, and what transpires if the sequence is reversed?\n\n'
      + 'Operational Rationale for Prioritizing Containment:\n'
      + 'Containment severs the adversary\'s network channel. Quarantining the infected node immediately blocks lateral expansion, command-and-control connectivity, and ongoing data exfiltration.\n\n'
      + 'Catastrophic Fallout of Inverting the Order (Eradicating Before Containing):\n'
      + '1. While responders attempt local disinfection, the active malware traverses subnet connections to compromise remaining nodes.\n'
      + '2. Ransomware engines may accelerate encryption or purge forensic audit logs upon detecting remediation efforts.\n'
      + '3. Damage blast radius expands uncontrollably, multiplying recovery cost and business interruption.',
    keyTakeaway_ar: 'قاعدة الامتحان: مثل إطفاء الحريق: تحاصر النيران أولاً (الاحتواء) لمنع انتقالها للغرف الأخرى، ثم تبدأ بإخماد السبب وتنظيف المكان (الاستئصال).',
    keyTakeaway_en: 'Exam Rule: Like firefighting: cordon off the burning perimeter (Containment) before extinguishing the root ignition source (Eradication).',
    quickQuestion_ar: 'سؤال سريع: لاحظ مهندس أمن أن فيروس فدية بدأ بتشفير حاسوب. هل يبدأ فوراً بفحص مكافح الفيروسات أم بفصل الجهاز عن الشبكة؟ ولماذا؟',
    quickQuestion_en: 'Quick Check: Ransomware is actively encrypting a workstation. Should the technician run an antivirus scan first or disconnect the Ethernet cable? Why?',
    quickAnswer_ar: 'الإجابة: يفصل الجهاز عن الشبكة فوراً (الاحتواء)؛ لمنع الفدية من الانتشار وتشفير باقي خوادم المؤسسة أثناء الفحص.',
    quickAnswer_en: 'Answer: Disconnect the network cable immediately (Containment) to prevent malware spreading to adjacent systems during cleanup.',
  },

  {
    id: 'r2-3-04',
    lesson: '2-3',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'مفهوم المخاطر ومصفوفة تقييم الأولويات (الاحتمالية × الأثر)',
    title_en: 'Risk Architecture and the Evaluation Matrix (Likelihood x Impact)',
    summary_ar: 'المخاطرة نتاج احتمالية حدوث التهديد مضروبة في حجم الأثر الناتج عنه، وتُستخدم مصفوفة المخاطر لترتيب أولويات المعالجة وتوجيه الميزانية.',
    summary_en: 'Risk equals threat likelihood multiplied by realized impact magnitude; the matrix prioritizes remediations and allocates budgets.',
    content_ar:
      'أولاً: معادلة تقييم المخاطرة:\n'
      + 'المخاطرة (Risk) = الاحتمالية (Likelihood) × الأثر (Impact)\n\n'
      + 'ثانياً: العامِلان الحاكمان في التقييم:\n'
      + '1. الاحتمالية (Likelihood): ما مدى احتمال تحقق التهديد واستغلال الضعف؟ (مرتفعة، متوسطة، منخفضة).\n'
      + '2. الأثر (Impact): ما حجم الضرر المادي أو المعنوي الواقع إذا حدث التهديد؟ (مرتفع، متوسط، منخفض).\n\n'
      + 'ثالثاً: مصفوفة المخاطر (Risk Matrix) وتصنيف الأولويات:\n'
      + '• احتمالية مرتفعة + أثر مرتفع: مخاطرة حرجة جداً تمثل "أولوية قصوى" وتتطلب تدخلاً ومعالجة فورية وتخصيص الميزانية.\n'
      + '• احتمالية مرتفعة + أثر منخفض: مخاطرة معتدلة يمكن إدارتها بضوابط روتينية.\n'
      + '• احتمالية منخفضة + أثر مرتفع: مخاطرة جسيمة تُعالج عادة بالنقل (كالتأمين الإلكتروني) أو خطط طوارئ.\n'
      + '• احتمالية منخفضة + أثر منخفض: مخاطرة ضعيفة غالباً ما يتم قبولها ومراقبتها فقط.\n\n'
      + 'الهدف النهائي من المصفوفة:\n'
      + 'توجيه الموارد المالية والبشرية المحدودة للمؤسسة نحو المخاطر الأكثر خطورة بدلاً من إهدارها عشوائياً.',
    content_en:
      'Risk Calculation Formulation:\n'
      + 'Risk = Likelihood x Impact\n\n'
      + 'The Two Primary Variables:\n'
      + '1. Likelihood: Probability of vulnerability discovery and exploitation (High, Medium, Low).\n'
      + '2. Impact: Magnitude of financial, legal, or operational loss (High, Medium, Low).\n\n'
      + 'The Risk Matrix Prioritization Framework:\n'
      + '• High Likelihood + High Impact: Critical hazard demanding top-priority capital allocation and urgent treatment.\n'
      + '• High Likelihood + Low Impact: Operational risk manageable through baseline technical controls.\n'
      + '• Low Likelihood + High Impact: Severe systemic threat often treated via risk transfer (cyber insurance).\n'
      + '• Low Likelihood + Low Impact: Minor exposure typically addressed via documented risk acceptance.\n\n'
      + 'Primary Governance Objective:\n'
      + 'Focusing scarce security budgets and technical teams on the highest-consequence enterprise exposures.',
    keyTakeaway_ar: 'قاعدة الامتحان: مصفوفة المخاطر تجمع بين الاحتمالية والأثر، والمخاطر ذات الاحتمالية العالية والأثر العالي تُعالج أولاً.',
    keyTakeaway_en: 'Exam Rule: The risk matrix combines likelihood and impact; high-likelihood/high-impact exposures receive top treatment priority.',
    quickQuestion_ar: 'سؤال سريع: ما المعياران اللذان تعتمد عليهما مصفوفة المخاطر لتحديد أولوية التعامل مع التهديدات؟',
    quickQuestion_en: 'Quick Check: What two metrics form the foundation of a risk evaluation matrix?',
    quickAnswer_ar: 'الإجابة: 1. احتمالية الحدوث (Likelihood)، 2. حجم الأثر والضرر المحتمل (Impact).',
    quickAnswer_en: 'Answer: 1. Likelihood of occurrence, and 2. Impact magnitude of potential damage.',
  },

  {
    id: 'r2-3-05',
    lesson: '2-3',
    type: 'TABLE',
    typeLabel_ar: 'مقارنة معتمدة',
    typeLabel_en: 'Comparison Table',
    title_ar: 'الاستراتيجيات الأربع للتعامل مع المخاطر الأمنية',
    title_en: 'The Four Security Risk Treatment Strategies',
    summary_ar: 'تتعامل المؤسسات مع المخاطر بأربع استراتيجيات: التجنب (إيقاف النشاط)، التخفيف (تقليل الضرر)، النقل (التأمين)، والقبول (التعايش معه).',
    summary_en: 'Enterprises manage exposures via four strategies: Avoidance (stopping activity), Mitigation (reducing impact), Transfer (insurance), and Acceptance (retaining risk).',
    content_ar:
      'الاستراتيجيات الأربع المعتمدة في كتاب الوزارة:\n\n'
      + '1. تجنب المخاطر (Risk Avoidance):\n'
      + '• المعنى: إيقاف النشاط أو إلغاء الخدمة أو عدم استخدام التقنية التي تسبب الخطر بالكامل للتخلص منه.\n'
      + '• متى تُستخدم؟ عندما تكون المخاطرة جسيمة وتكلفة حمايتها مستحيلة.\n'
      + '• مثال وزاري معتمد: إيقاف استخدام نظام تشغيل قديم غير مدعوم بتحديثات أمنية واستبداله بالكامل.\n\n'
      + '2. تخفيف المخاطر (Risk Mitigation):\n'
      + '• المعنى: تطبيق ضوابط وإجراءات أمنية تقلل من احتمالية وقوع الخطر أو تقلل من حجم الضرر الناتج عنه.\n'
      + '• متى تُستخدم؟ الاستراتيجية الأكثر شيوعاً في إدارة الأمن اليومية.\n'
      + '• مثال وزاري معتمد: تثبيت جدار ناري، تفعيل برامج مكافحة الفيروسات، وتدريب الموظفين بانتظام.\n\n'
      + '3. نقل المخاطر (Risk Transfer):\n'
      + '• المعنى: تحويل المسؤولية المالية عن الخسائر الناتجة عن الحادث لطرف ثالث خارجي.\n'
      + '• متى تُستخدم؟ عندما لا يمكن منع الخطر تقنياً بشكل كامل ويمكن تغطية آثاره مالياً.\n'
      + '• مثال وزاري معتمد: شراء وثيقة تأمين ضد الهجمات الإلكترونية (Cyber Insurance) أو الاستعانة بمزود خدمة سحابي يتكفل بالتعويض.\n\n'
      + '4. قبول المخاطر (Risk Acceptance):\n'
      + '• المعنى: الإقرار بوجود الخطر والتعايش معه دون اتخاذ إجراء إضافي بعد دراسة واعية وموافقة الإدارة.\n'
      + '• متى تُستخدم؟ عندما تكون تكلفة معالجة الخطر وتأمينه أعلى بكثير من قيمة الضرر المحتمل لو وقع الخطر.\n'
      + '• مثال وزاري معتمد: قبول احتمالية توقف خادم طباعة داخلي لساعات لأن تكلفة توفير خادم احتياطي أعلى من قيمة الضرر.',
    content_en:
      'The Four Ministry Curriculum Strategies:\n\n'
      + '1. Risk Avoidance:\n'
      + '• Meaning: Terminating the vulnerable process or discarding the risky technology completely.\n'
      + '• Context: When exposure is critical and effective defense is cost-prohibitive.\n'
      + '• Example: Decommissioning an end-of-life legacy platform that no longer receives vendor security updates.\n\n'
      + '2. Risk Mitigation:\n'
      + '• Meaning: Deploying controls and safeguards to diminish likelihood or blunt impact.\n'
      + '• Context: Primary routine baseline across corporate operations.\n'
      + '• Example: Implementing firewalls, mandating MFA, and conducting regular phishing simulation workshops.\n\n'
      + '3. Risk Transfer:\n'
      + '• Meaning: Shifting financial liability for loss events onto external third parties.\n'
      + '• Context: High-consequence risks unmanageable by internal technical mechanisms alone.\n'
      + '• Example: Procuring a dedicated cyber insurance policy covering breach remediation and legal liabilities.\n\n'
      + '4. Risk Acceptance:\n'
      + '• Meaning: Formally acknowledging residual risk and operating without additional countermeasures.\n'
      + '• Context: When mitigation expenditure substantially exceeds the potential loss value.\n'
      + '• Example: Accepting brief internal printer server downtime because redundant failover clusters cost more than the delay.',
    keyTakeaway_ar: 'قاعدة الامتحان: إيقاف النشاط = تجنب، تقليل الضرر = تخفيف، وثيقة تأمين = نقل، التكلفة أعلى من الضرر = قبول.',
    keyTakeaway_en: 'Exam Rule: Stop activity = Avoidance, reduce impact = Mitigation, insurance policy = Transfer, cost exceeds harm = Acceptance.',
    quickQuestion_ar: 'سؤال سريع: اشترت شركة وثيقة تأمين مالي ضد هجمات الفدية الإلكترونية. ما استراتيجية معالجة المخاطر المتبعة هنا؟',
    quickQuestion_en: 'Quick Check: An enterprise purchases an insurance policy covering ransomware extortion. Which strategy is this?',
    quickAnswer_ar: 'الإجابة: استراتيجية نقل المخاطر (Risk Transfer)؛ لأنها حولت العبء المالي لطرف ثالث (شركة التأمين).',
    quickAnswer_en: 'Answer: Risk Transfer; the financial liability was transferred to an external third-party insurer.',
  },

  {
    id: 'r2-3-06',
    lesson: '2-3',
    type: 'CONCEPT',
    typeLabel_ar: 'مفهوم أساسي',
    typeLabel_en: 'Core Concept',
    title_ar: 'التنسيق الخارجي أثناء الاستجابة: فرق CSIRT والهيئات القانونية',
    title_en: 'External Coordination: CSIRT Teams, Legal Entities, and Providers',
    summary_ar: 'يتطلب التعامل مع الحوادث الكبرى التنسيق مع جهات خارجية: فرق CSIRT الوطنية، السلطات القانونية والتنظيمية، ومزودي الخدمات التقنية.',
    summary_en: 'Major incident handling requires coordination with external entities: CSIRTs, law enforcement, regulatory bodies, and service vendors.',
    content_ar:
      'أولاً: فرق الاستجابة لحوادث أمن الحاسوب (CSIRT):\n'
      + '• فرق وطنية أو قطاعية متخصصة تقدم الدعم الفني والاستشاري للمؤسسات أثناء الحوادث الكبرى.\n'
      + '• دورها: تحليل الهجمات المعقدة، وتنسيق الجهود بين الهيئات المختلفة، ومشاركة معلومات التهديدات المستجدة (Threat Intelligence).\n\n'
      + 'ثانياً: السلطات القانونية والتنظيمية:\n'
      + '• إبلاغ الأجهزة الأمنية والقضائية في حالات الجرائم الإلكترونية المنظمة للحفاظ على الأدلة وملاحقة الجناة.\n'
      + '• الإبلاغ الإلزامي للهيئات الرقابية عند تسرب البيانات الشخصية في القطاعات الحساسة كالبنوك والرعاية الصحية وفق القانون.\n\n'
      + 'ثالثاً: مزودو الخدمات التقنية (Service Providers):\n'
      + '• التنسيق مع مزودي خدمة الإنترنت (ISPs) لحظر عناوين IP المهاجمة في هجمات حجب الخدمة (DDoS).\n'
      + '• التنسيق مع شركات الاستضافة السحابية لعزل الخوادم الافتراضية المخترقة ومراجعة سجلات الاتصال.',
    content_en:
      '1. Computer Security Incident Response Teams (CSIRTs):\n'
      + '• National and sector-level expert squads offering triage, advisory, and coordination during major emergencies.\n'
      + '• Function: Deep forensic analysis, cross-agency alignment, and threat intelligence distribution.\n\n'
      + '2. Law Enforcement and Regulatory Authorities:\n'
      + '• Engaging cybercrime police units to ensure forensic chain of custody for legal prosecution.\n'
      + '• Satisfying mandatory compliance disclosure windows for regulated banking or health privacy leaks.\n\n'
      + '3. Technical Service Providers:\n'
      + '• Teaming with Internet Service Providers (ISPs) to null-route hostile traffic during DDoS saturations.\n'
      + '• Engaging cloud platform vendors to snapshot compromised virtual appliances and scrutinize access logs.',
    keyTakeaway_ar: 'قاعدة الامتحان: التنسيق الخارجي ضروري في الحوادث الكبرى لتبادل معلومات التهديد مع CSIRT والالتزام بالقوانين وحظر الهجمات مع مزودي الخدمة.',
    keyTakeaway_en: 'Exam Rule: External coordination engages CSIRTs for threat intelligence, law enforcement for compliance, and ISPs for traffic mitigation.',
    quickQuestion_ar: 'سؤال سريع: ما اسم الفرق المتخصصة على المستوى الوطني أو القطاعي التي تقدم الدعم الفني وتشارك معلومات التهديدات أثناء الحوادث؟',
    quickQuestion_en: 'Quick Check: What is the designation for specialized national incident response teams that coordinate technical aid and threat intelligence?',
    quickAnswer_ar: 'الإجابة: فرق الاستجابة لحوادث أمن الحاسوب (CSIRT).',
    quickAnswer_en: 'Answer: Computer Security Incident Response Teams (CSIRT).',
  },

  {
    id: 'r2-3-07',
    lesson: '2-3',
    type: 'EXAM_HINT',
    typeLabel_ar: 'سر امتحاني',
    typeLabel_en: 'Exam Strategy',
    title_ar: 'الكلمات المفتاحية المعتمدة لأسئلة الدرس الثالث في الامتحان',
    title_en: 'Approved Trigger Keywords for Lesson 2-3 Questions',
    summary_ar: 'دليل ربط المصطلحات بالكلمات المفتاحية الأكثر تكراراً في تقييمات الوزارة الرسمية للدرس 2-3.',
    summary_en: 'Keyword mapping reference for Lesson 2-3 incident response and risk management questions.',
    content_ar:
      'دليل الكلمات المفتاحية وسرعة الحل:\n\n'
      + '1. "موقف يحدث فيه ضرر فعلي للأصول أو الأنظمة":\n'
      + '   الحل المباشر: الحادث الأمني (Security Incident).\n\n'
      + '2. "وضع الخطط وتدريب الفريق وتجهيز النسخ الاحتياطية قبل الهجوم":\n'
      + '   الحل المباشر: مرحلة التحضير (Preparation).\n\n'
      + '3. "رصد وتأكيد الحادث وتحديد نطاقه ومصدره المبدئي":\n'
      + '   الحل المباشر: مرحلة الاكتشاف والتحليل (Detection).\n\n'
      + '4. "عزل الأجهزة المتضررة وفصل كابل الشبكة لوقف الانتشار":\n'
      + '   الحل المباشر: مرحلة الاحتواء (Containment).\n\n'
      + '5. "حذف البرمجيات الخبيثة وسد الثغرة الأمنية بالكامل":\n'
      + '   الحل المباشر: مرحلة الاستئصال أو إزالة التهديد (Eradication).\n\n'
      + '6. "استعادة البيانات من نسخ احتياطية سليمة وإعادة التشغيل":\n'
      + '   الحل المباشر: مرحلة الاستعادة (Recovery).\n\n'
      + '7. "تحليل الحادث وتحديث السياسات وتدريب الموظفين لمنع تكراره":\n'
      + '   الحل المباشر: مرحلة منع التكرار / الدروس المستفادة (Lessons Learned).\n\n'
      + '8. "الاحتمالية × الأثر لتحديد أولوية المعالجة وتوجيه الميزانية":\n'
      + '   الحل المباشر: مصفوفة المخاطر (Risk Matrix).\n\n'
      + '9. "إيقاف النشاط تماماً للتخلص من الخطر":\n'
      + '   الحل المباشر: تجنب المخاطر (Risk Avoidance).\n\n'
      + '10. "تطبيق ضوابط أمنية لتقليل احتمالية أو حجم الضرر":\n'
      + '   الحل المباشر: تخفيف المخاطر (Risk Mitigation).\n\n'
      + '11. "شراء وثيقة تأمين إلكتروني / تحويل العبء المالي":\n'
      + '   الحل المباشر: نقل المخاطر (Risk Transfer).\n\n'
      + '12. "التعايش مع الخطر لأن تكلفة معالجته أعلى من قيمة الضرر":\n'
      + '   الحل المباشر: قبول المخاطر (Risk Acceptance).',
    content_en:
      'Keyword Mapping Reference:\n\n'
      + '1. "Actual damage occurring to information assets":\n'
      + '   Select: Security Incident.\n\n'
      + '2. "Proactive plans, team drill training, and backups pre-attack":\n'
      + '   Select: Preparation stage.\n\n'
      + '3. "Identifying and confirming adverse event scope":\n'
      + '   Select: Detection stage.\n\n'
      + '4. "Isolating infected hosts to stop lateral spread":\n'
      + '   Select: Containment stage.\n\n'
      + '5. "Purging malware binaries and patching root flaws":\n'
      + '   Select: Eradication stage.\n\n'
      + '6. "Restoring operational databases from verified backups":\n'
      + '   Select: Recovery stage.\n\n'
      + '7. "Post-incident analysis updating policies against recurrence":\n'
      + '   Select: Lessons Learned / Prevention of Recurrence.\n\n'
      + '8. "Likelihood times impact to prioritize security spend":\n'
      + '   Select: Risk Matrix.\n\n'
      + '9. "Ceasing operations completely to eliminate risk":\n'
      + '   Select: Risk Avoidance.\n\n'
      + '10. "Deploying controls reducing likelihood or impact":\n'
      + '   Select: Risk Mitigation.\n\n'
      + '11. "Purchasing cyber insurance policy":\n'
      + '   Select: Risk Transfer.\n\n'
      + '12. "Tolerating exposure because fix costs exceed loss potential":\n'
      + '   Select: Risk Acceptance.',
    keyTakeaway_ar: 'قاعدة الامتحان: تأكد دائماً أن مرحلة فصل الكابل وعزل الجهاز هي "الاحتواء"، وأن مرحلة حذف الفيروس هي "الاستئصال".',
    keyTakeaway_en: 'Exam Rule: Host disconnection is always Containment; purging malware binaries is always Eradication.',
    quickQuestion_ar: 'سؤال سريع: ما الفرق في التسمية والوظيفة بين مرحلة "الاحتواء" ومرحلة "الاستئصال"؟',
    quickQuestion_en: 'Quick Check: What differentiates the objective of Containment from Eradication?',
    quickAnswer_ar: 'الإجابة: الاحتواء يهدف لعزل الجزء المتضرر لوقف انتشار الهجوم، والاستئصال يهدف لحذف وتنظيف السبب الجذري للحادث بالكامل.',
    quickAnswer_en: 'Answer: Containment isolates infected systems to arrest spread; Eradication eliminates the root vulnerability and malware entirely.',
  },
];

// ─────────────────────────────────────────────────────────────
// QUICK CAPSULES: كبسولات المراجعة المركزة
// ─────────────────────────────────────────────────────────────
export const REVIEW_QUICK_REF: ReviewCard[] = [
  {
    id: 'capsule-2-1',
    lesson: '2-1',
    type: 'QUICK_REF',
    typeLabel_ar: 'كبسولة ليلة الامتحان',
    typeLabel_en: 'Exam Capsule',
    title_ar: 'كبسولة الدرس 2-1: التشفير والمصادقة',
    title_en: 'Lesson 2-1 Capsule: Cryptography & Authentication',
    summary_ar: 'ملخص شامل ومكثف لأهم نقاط الدرس 2-1 للمراجعة السريعة قبل الامتحان.',
    summary_en: 'High-density review capsule covering all essential Lesson 2-1 concepts.',
    content_ar:
      '1. معادلة HTTPS:\n'
      + 'HTTPS = HTTP + TLS ← يوفر السرية، السلامة، والمصادقة.\n\n'
      + '2. قواعد التشفير في مصافحة TLS:\n'
      + '• مرحلة 1 (الاتصال والتعريف) + مرحلة 2 (تبادل مفتاح الجلسة) ← تشفير بالمفتاح العام (غير متماثل).\n'
      + '• مرحلة 3 (نقل البيانات الضخمة) ← تشفير بالمفتاح المشترك (المتماثل) للسرعة العالية.\n\n'
      + '3. الشهادة الرقمية:\n'
      + 'بطاقة هوية الخادم الصادرة من سلطة CA موثوقة، وتحتوي على المفتاح العام للخادم وتوقيع CA.\n\n'
      + '4. التوقيع الرقمي:\n'
      + 'يُنشأ بالمفتاح الخاص للمرسل ويُفحص بالمفتاح العام للمرسل، ويضمن: كشف التلاعب + كشف الانتحال + عدم الإنكار.\n\n'
      + '5. المصادقة متعددة العوامل (MFA):\n'
      + 'تشترط الجمع بين عاملين أو أكثر من فئات مختلفة: المعرفة (ما تعرفه) + الحيازة (ما تملكه) + السمات الحيوية (ما أنت عليه). استخدام عاملين من نفس الفئة ليس MFA.',
    content_en:
      '1. HTTPS Formula:\n'
      + 'HTTPS = HTTP + TLS delivering Confidentiality, Integrity, and Authentication.\n\n'
      + '2. TLS Handshake Cryptography Rules:\n'
      + '• Phases 1 and 2 utilize Public-Key (asymmetric) encryption for identity verification and session key negotiation.\n'
      + '• Phase 3 utilizes Common-Key (symmetric) encryption for fast, high-volume data payloads.\n\n'
      + '3. Digital Certificates:\n'
      + 'Server credentials issued by a trusted CA, containing server public keys and cryptographic CA signatures.\n\n'
      + '4. Digital Signatures:\n'
      + 'Created using the sender\'s private key and verified with their public key; delivers tamper detection, sender verification, and non-repudiation.\n\n'
      + '5. Multi-Factor Authentication (MFA):\n'
      + 'Requires credentials from two or more distinct categories: Knowledge, Possession, and Biometrics. Two factors from one category fails MFA standards.',
    keyTakeaway_ar: 'قاعدة ذهبية: المتماثل للسرعة ونقل البيانات، وغير المتماثل لتبادل المفاتيح، والشهادة للخادم، والتوقيع للمستند، و MFA فئات مختلفة.',
    keyTakeaway_en: 'Golden Rule: Symmetric for payload speed, asymmetric for key exchange, certificates for servers, signatures for documents, MFA across different categories.',
    quickQuestion_ar: 'سؤال سريع: اذكر نوع التشفير المستخدم في كل من: أ) مصافحة تبادل مفتاح الجلسة، ب) نقل بيانات الجلسة بعد المصافحة.',
    quickQuestion_en: 'Quick Check: Identify the cipher type used in: a) session key handshake, b) payload transmission post-handshake.',
    quickAnswer_ar: 'الإجابة: أ) التشفير غير المتماثل (بالمفتاح العام)، ب) التشفير المتماثل (بالمفتاح المشترك).',
    quickAnswer_en: 'Answer: a) Asymmetric (public-key) cipher, b) Symmetric (common-key) cipher.',
  },

  {
    id: 'capsule-2-2',
    lesson: '2-2',
    type: 'QUICK_REF',
    typeLabel_ar: 'كبسولة ليلة الامتحان',
    typeLabel_en: 'Exam Capsule',
    title_ar: 'كبسولة الدرس 2-2: تصميم أمان الشبكات',
    title_en: 'Lesson 2-2 Capsule: Network Security Design',
    summary_ar: 'ملخص شامل ومكثف لأهم نقاط الدرس 2-2 للمراجعة السريعة قبل الامتحان.',
    summary_en: 'High-density review capsule covering all essential Lesson 2-2 concepts.',
    content_ar:
      '1. جدار الحماية (Firewall):\n'
      + 'يتحكم في حركة المرور عند مدخل الشبكة ويسمح أو يمنع وفق قواعد مسبقة لمنافذ وعناوين IP، ولا يفحص محتوى الملفات من الفيروسات.\n\n'
      + '2. الشبكة الافتراضية الخاصة (VPN):\n'
      + 'نفق مشفر عبر شبكة عامة يمنع التنصت ويؤمن العمل عن بعد والاتصال عبر شبكات Wi-Fi المفتوحة.\n\n'
      + '3. المنطقة المعزولة (DMZ):\n'
      + 'شبكة وسيطة تضم الخوادم العامة (ويب، بريد) وتعزلها عن الشبكة الداخلية لحماية قواعد البيانات الحساسة عند اختراق الخادم.\n\n'
      + '4. الدفاع في العمق (Defense in Depth):\n'
      + 'طبقات متتالية لمنع نقاط الفشل الفردية:\n'
      + '• مدخل الشبكة = Firewall\n'
      + '• مسار الاتصال = VPN والتشفير\n'
      + '• وضع الخوادم = DMZ\n'
      + '• الأجهزة الطرفية = مضاد الفيروسات والتحديثات\n\n'
      + '5. نهج انعدام الثقة (Zero Trust):\n'
      + 'الشعار: "لا تثق بأحد، وتحقق دائماً". المبادئ: التحقق المستمر + الحد الأدنى من الصلاحيات + افتراض الاختراق. معايير الفحص: الهوية، الصلاحيات، والسياق.',
    content_en:
      '1. Firewalls:\n'
      + 'Inspect and filter packet headers at network ingress using predefined IP and port rules; does not disinfect payload files.\n\n'
      + '2. Virtual Private Networks (VPN):\n'
      + 'Encrypted tunnels across public networks preventing wiretapping for remote work and public Wi-Fi security.\n\n'
      + '3. Demilitarized Zones (DMZ):\n'
      + 'Intermediate screened subnets hosting public servers, insulating internal databases against lateral compromise.\n\n'
      + '4. Defense in Depth Framework:\n'
      + 'Eliminates single points of failure via layered controls:\n'
      + '• Entry = Firewall\n'
      + '• Path = VPN & Encryption\n'
      + '• Placement = DMZ\n'
      + '• Endpoints = Antivirus & Updates\n\n'
      + '5. Zero Trust Architecture:\n'
      + 'Motto: "Never Trust, Always Verify". Enforces continuous verification, least privilege, and assumed breach against identity, permissions, and context.',
    keyTakeaway_ar: 'قاعدة ذهبية: جدار الحماية يفرز، و VPN يشفر النفق، و DMZ تعزل الخوادم، و الدفاع في العمق 4 طبقات، و Zero Trust يلغي الثقة التلقائية.',
    keyTakeaway_en: 'Golden Rule: Firewalls filter, VPN tunnels encrypt, DMZ isolates, Defense in Depth layers four controls, Zero Trust eliminates implicit trust.',
    quickQuestion_ar: 'سؤال سريع: اذكر الطبقات الأربع لاستراتيجية الدفاع في العمق مع الإجراء الأمني المعتمد لكل طبقة.',
    quickQuestion_en: 'Quick Check: List the four Defense in Depth layers alongside their assigned security controls.',
    quickAnswer_ar: 'الإجابة: 1. مدخل الشبكة (جدار الحماية)، 2. مسار الاتصال (VPN والتشفير)، 3. وضع الخوادم (المنطقة المعزولة DMZ)، 4. الأجهزة الطرفية (مكافحة الفيروسات والتحديثات).',
    quickAnswer_en: 'Answer: 1. Entry (Firewall), 2. Path (VPN/Encryption), 3. Placement (DMZ), 4. Endpoints (Antivirus/Patching).',
  },

  {
    id: 'capsule-2-3',
    lesson: '2-3',
    type: 'QUICK_REF',
    typeLabel_ar: 'كبسولة ليلة الامتحان',
    typeLabel_en: 'Exam Capsule',
    title_ar: 'كبسولة الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    title_en: 'Lesson 2-3 Capsule: Incident Response & Risk Management',
    summary_ar: 'ملخص شامل ومكثف لأهم نقاط الدرس 2-3 للمراجعة السريعة قبل الامتحان.',
    summary_en: 'High-density review capsule covering all essential Lesson 2-3 concepts.',
    content_ar:
      '1. الحادث الأمني (Security Incident):\n'
      + 'ضرر فعلي واقع على الأصول. أمثلته الثلاثة: تسرب المعلومات (سرية) + التلاعب بالبيانات (سلامة) + انقطاع الخدمة (توافر).\n\n'
      + '2. المراحل الست بالترتيب الإلزامي:\n'
      + '1. التحضير (استباقي مسبقاً) ← 2. الاكتشاف والتحليل (رصد الحادث) ← 3. الاحتواء (عزل وفصل الجهاز) ← 4. الاستئصال (حذف الفيروس وسد الثغرة) ← 5. الاستعادة (استرجاع النسخ الاحتياطية) ← 6. منع التكرار / الدروس المستفادة (تحليل وتطوير).\n\n'
      + '3. قاعدة الأسبقية الحرجة:\n'
      + 'الاحتواء يسبق الاستئصال حتماً؛ اعزل أولاً لوقف انتشار الحريق، ثم احذف السبب الجذري.\n\n'
      + '4. مصفوفة المخاطر:\n'
      + 'المخاطرة = الاحتمالية × الأثر. المخاطر ذات الاحتمالية العالية والأثر العالي هي الأولوية القصوى لمعالجة الميزانية.\n\n'
      + '5. استراتيجيات معالجة المخاطر الأربع:\n'
      + '• تجنب المخاطر: إيقاف النشاط المسبب للخطر كلياً.\n'
      + '• تخفيف المخاطر: تطبيق ضوابط لتقليل الاحتمالية أو الأثر.\n'
      + '• نقل المخاطر: تحويل المسؤولية المالية لطرف ثالث (شراء وثيقة تأمين).\n'
      + '• قبول المخاطر: التعايش مع الخطر لأن تكلفة معالجته أعلى من قيمة الضرر المحتمل.\n\n'
      + '6. التنسيق الخارجي: فرق CSIRT للدعم الفني وتبادل معلومات التهديد، والهيئات القانونية للامتثال الجنائي، ومزودو الخدمة لحظر الهجمات.',
    content_en:
      '1. Security Incident:\n'
      + 'Realized harm to assets. The three examples: Leaks (Confidentiality), Tampering (Integrity), Outages (Availability).\n\n'
      + '2. The Six Ordered Lifecycle Stages:\n'
      + '1. Preparation (proactive drills) → 2. Detection (identification) → 3. Containment (isolation/quarantine) → 4. Eradication (root cleanup) → 5. Recovery (backup restore) → 6. Lessons Learned (policy updates).\n\n'
      + '3. Critical Precedence Rule:\n'
      + 'Containment must precede Eradication; isolate to halt infection spread before purging malware.\n\n'
      + '4. Risk Evaluation Matrix:\n'
      + 'Risk = Likelihood x Impact. High-likelihood, high-impact risks receive top-priority remediation.\n\n'
      + '5. Four Risk Handling Strategies:\n'
      + '• Avoidance: Ceasing the risky process.\n'
      + '• Mitigation: Applying technical controls reducing likelihood/impact.\n'
      + '• Transfer: Shifting financial liability to insurers.\n'
      + '• Acceptance: Retaining risk because remediation cost exceeds loss value.\n\n'
      + '6. External Incident Alignment: CSIRTs for technical and threat intelligence, law enforcement for legal compliance, ISPs for bandwidth defense.',
    keyTakeaway_ar: 'قاعدة ذهبية: الحادث = ضرر فعلي، الاحتواء قبل الاستئصال، المصفوفة = احتمالية × أثر، والاستراتيجيات: تجنب (إيقاف) وتخفيف (تقليل) ونقل (تأمين) وقبول (تعايش).',
    keyTakeaway_en: 'Golden Rule: Incidents require actual damage, Containment precedes Eradication, Risk equals Likelihood x Impact, Strategies are Avoid, Mitigate, Transfer, Accept.',
    quickQuestion_ar: 'سؤال سريع: ما الاستراتيجية المناسبة عندما تقرر إدارة المؤسسة عدم ترقية برنامج قديم لأن تكلفة الترقية تفوق أي خسارة محتملة؟',
    quickQuestion_en: 'Quick Check: Which risk strategy applies when management chooses not to patch an old tool because patch costs exceed loss potential?',
    quickAnswer_ar: 'الإجابة: قبول المخاطر (Risk Acceptance).',
    quickAnswer_en: 'Answer: Risk Acceptance.',
  },
];

// ─────────────────────────────────────────────────────────────
// Combined export
// ─────────────────────────────────────────────────────────────
export const ALL_REVIEW_CARDS: ReviewCard[] = [
  ...REVIEW_L1,
  ...REVIEW_L2,
  ...REVIEW_L3,
  ...REVIEW_QUICK_REF,
];
