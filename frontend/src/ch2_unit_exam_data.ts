// ============================================================
// Chapter 2 — Unit Exam (All 3 Lessons)
// 15 Questions Total: 5 per lesson (3 MCQ + 2 Written)
// Level: Ministry Assessment Level (Medium)
// Bilingual: Arabic & English
// ============================================================

// ── Question Types ───────────────────────────────────────────
export interface UnitExamMcq {
  id: string;
  type: 'MCQ';
  lesson: '2-1' | '2-2' | '2-3';
  lessonName_ar: string;
  lessonName_en: string;
  question_ar: string;
  question_en: string;
  option_a_ar: string; option_a_en: string;
  option_b_ar: string; option_b_en: string;
  option_c_ar: string; option_c_en: string;
  option_d_ar: string; option_d_en: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation_ar: string;
  explanation_en: string;
}

export interface UnitExamWritten {
  id: string;
  type: 'WRITTEN';
  lesson: '2-1' | '2-2' | '2-3';
  lessonName_ar: string;
  lessonName_en: string;
  question_ar: string;
  question_en: string;
  ideal_answer_ar: string;
  ideal_answer_en: string;
  marks: number;
}

export type UnitExamQuestion = UnitExamMcq | UnitExamWritten;

// ─────────────────────────────────────────────────────────────
// LESSON 2-1 — تقنيات التشفير والمصادقة
// Encryption & Authentication Technologies
// ─────────────────────────────────────────────────────────────
export const UNIT2_EXAM_L1: UnitExamQuestion[] = [

  // MCQ 1
  {
    id: 'u2e-1-mcq-1',
    type: 'MCQ',
    lesson: '2-1',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'ما الفرق الجوهري بين التشفير المتماثل والتشفير غير المتماثل؟',
    question_en: 'What is the fundamental difference between symmetric and asymmetric encryption?',
    option_a_ar: 'التشفير المتماثل أكثر أماناً لأنه يستخدم مفتاحين',
    option_a_en: 'Symmetric encryption is more secure because it uses two keys',
    option_b_ar: 'التشفير المتماثل يستخدم مفتاحاً واحداً مشتركاً، أما غير المتماثل فيستخدم زوجاً من المفاتيح (عام وخاص)',
    option_b_en: 'Symmetric encryption uses one shared key; asymmetric uses a key pair (public & private)',
    option_c_ar: 'التشفير غير المتماثل أسرع دائماً في تشفير كميات كبيرة من البيانات',
    option_c_en: 'Asymmetric encryption is always faster for large volumes of data',
    option_d_ar: 'كلاهما يستخدم نفس المفتاح لكن بخوارزميات مختلفة',
    option_d_en: 'Both use the same key but with different algorithms',
    correct_option: 'B',
    explanation_ar: 'التشفير المتماثل يعتمد على مفتاح واحد يُستخدم للتشفير وفك التشفير معاً وهو أسرع. غير المتماثل يعتمد على زوج مفاتيح: مفتاح عام للتشفير ومفتاح خاص لفك التشفير.',
    explanation_en: 'Symmetric encryption uses one shared key for both encryption and decryption—fast but requires a secure key exchange. Asymmetric uses a public/private key pair, solving key distribution but slower.',
  },

  // MCQ 2
  {
    id: 'u2e-1-mcq-2',
    type: 'MCQ',
    lesson: '2-1',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'ما وظيفة التوقيع الرقمي (Digital Signature) في عملية التحقق من المستندات؟',
    question_en: 'What is the role of a Digital Signature in document verification?',
    option_a_ar: 'تشفير محتوى المستند لإخفائه عن القراء',
    option_a_en: 'Encrypting the document content to hide it from readers',
    option_b_ar: 'ضغط المستند لتسريع إرساله',
    option_b_en: 'Compressing the document to speed up transmission',
    option_c_ar: 'التحقق من هوية المُرسِل وضمان عدم التلاعب بالمحتوى',
    option_c_en: 'Verifying sender identity and ensuring content has not been tampered with',
    option_d_ar: 'تحديد عنوان IP المُرسِل لأغراض أمنية',
    option_d_en: 'Identifying the sender\'s IP address for security purposes',
    correct_option: 'C',
    explanation_ar: 'التوقيع الرقمي يستخدم المفتاح الخاص للمُرسِل لإنشاء بصمة مشفّرة للمستند. المستلم يتحقق منها بالمفتاح العام لإثبات الهوية وعدم التلاعب بالمحتوى.',
    explanation_en: 'A digital signature uses the sender\'s private key to create an encrypted fingerprint of the document. The recipient verifies it using the sender\'s public key, confirming identity and content integrity.',
  },

  // MCQ 3
  {
    id: 'u2e-1-mcq-3',
    type: 'MCQ',
    lesson: '2-1',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'قدّمت سارة كلمة المرور، ثم استلمت رمزاً على هاتفها لإكمال تسجيل الدخول. ما المصطلح الذي يصف هذا الأسلوب الأمني؟',
    question_en: 'Sara entered her password, then received a code on her phone to complete login. What security term describes this method?',
    option_a_ar: 'التشفير المتماثل (Symmetric Encryption)',
    option_a_en: 'Symmetric Encryption',
    option_b_ar: 'المصادقة متعددة العوامل (MFA)',
    option_b_en: 'Multi-Factor Authentication (MFA)',
    option_c_ar: 'بروتوكول SSL',
    option_c_en: 'SSL Protocol',
    option_d_ar: 'الجدار الناري (Firewall)',
    option_d_en: 'Firewall',
    correct_option: 'B',
    explanation_ar: 'المصادقة متعددة العوامل (MFA) تعتمد على أكثر من عامل للتحقق من الهوية: كلمة المرور (ما تعرفه) + رمز الهاتف (ما تملكه).',
    explanation_en: 'MFA requires more than one verification factor: a password (something you know) plus a phone code (something you have), making unauthorized access significantly harder.',
  },

  // Written 1
  {
    id: 'u2e-1-wr-1',
    type: 'WRITTEN',
    lesson: '2-1',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'اشرح دور بروتوكول TLS في تأمين اتصالات HTTPS، مع ذكر الخطوات الرئيسية لعملية المصافحة (Handshake).',
    question_en: 'Explain the role of the TLS protocol in securing HTTPS connections, mentioning the main steps of the Handshake process.',
    ideal_answer_ar: '• TLS (Transport Layer Security) هو البروتوكول المسؤول عن تشفير الاتصال بين المتصفح والخادم ضمن HTTPS.\n• الخطوات الرئيسية للمصافحة:\n  1. يرسل المتصفح طلب اتصال (Client Hello) مع قائمة خوارزميات التشفير المدعومة.\n  2. يرد الخادم بشهادته الرقمية التي تحتوي على مفتاحه العام.\n  3. يتحقق المتصفح من صحة الشهادة عبر جهة إصدار موثوقة (CA).\n  4. يتبادلان مفتاح جلسة مشتركاً بأمان باستخدام التشفير غير المتماثل.\n  5. تبدأ باقي الجلسة بالتشفير المتماثل (أسرع) باستخدام مفتاح الجلسة.',
    ideal_answer_en: '• TLS (Transport Layer Security) is the protocol responsible for encrypting the connection between browser and server within HTTPS.\n• Main Handshake steps:\n  1. Browser sends a connection request (Client Hello) listing supported cipher suites.\n  2. Server responds with its digital certificate containing its public key.\n  3. Browser verifies the certificate through a trusted Certificate Authority (CA).\n  4. They securely exchange a shared session key using asymmetric encryption.\n  5. The rest of the session uses faster symmetric encryption with the session key.',
    marks: 4,
  },

  // Written 2
  {
    id: 'u2e-1-wr-2',
    type: 'WRITTEN',
    lesson: '2-1',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'ما المقصود بالشهادة الرقمية (Digital Certificate)؟ ومن يصدرها؟ وما دورها في أمان الإنترنت؟',
    question_en: 'What is a Digital Certificate? Who issues it? And what is its role in internet security?',
    ideal_answer_ar: '• الشهادة الرقمية: وثيقة إلكترونية تُثبت هوية موقع أو جهة رقمية، وتحتوي على المفتاح العام الخاص بها.\n• تصدرها: جهات إصدار الشهادات الموثوقة (Certificate Authorities - CA) مثل DigiCert وLet\'s Encrypt.\n• دورها في الأمان:\n  - يتحقق المتصفح من صحة الشهادة قبل الاتصال بالموقع.\n  - تضمن أن الموقع الذي تتصل به هو الموقع الحقيقي وليس موقعاً مزيفاً.\n  - تُمكّن تشفير الاتصال عبر TLS.',
    ideal_answer_en: '• Digital Certificate: An electronic document that proves the identity of a website or digital entity, containing its public key.\n• Issued by: Trusted Certificate Authorities (CAs) such as DigiCert and Let\'s Encrypt.\n• Role in security:\n  - Browser verifies the certificate before connecting to the site.\n  - Ensures you are connecting to the legitimate site, not an impersonator.\n  - Enables encrypted communication via TLS.',
    marks: 3,
  },
];

// ─────────────────────────────────────────────────────────────
// LESSON 2-2 — تصميم أمان الشبكات
// Network Security Design
// ─────────────────────────────────────────────────────────────
export const UNIT2_EXAM_L2: UnitExamQuestion[] = [

  // MCQ 1
  {
    id: 'u2e-2-mcq-1',
    type: 'MCQ',
    lesson: '2-2',
    lessonName_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'ما وظيفة المنطقة المُجرَّدة (DMZ) في تصميم أمان الشبكة؟',
    question_en: 'What is the function of a Demilitarized Zone (DMZ) in network security design?',
    option_a_ar: 'تخزين النسخ الاحتياطية بشكل آمن بعيداً عن الإنترنت',
    option_a_en: 'Storing backups securely away from the internet',
    option_b_ar: 'عزل الخوادم العامة (كخادم الويب) عن الشبكة الداخلية الخاصة',
    option_b_en: 'Isolating public-facing servers (like web servers) from the private internal network',
    option_c_ar: 'تشفير كل حركة البيانات داخل المؤسسة',
    option_c_en: 'Encrypting all data traffic within the organization',
    option_d_ar: 'إخفاء عناوين IP الداخلية عن الإنترنت الخارجي',
    option_d_en: 'Hiding internal IP addresses from the external internet',
    correct_option: 'B',
    explanation_ar: 'الـ DMZ منطقة شبكية وسيطة تضم الخوادم التي يجب الوصول إليها من الإنترنت (كخادم الويب)، لكنها معزولة عن الشبكة الداخلية الحساسة. حتى لو اختُرق الخادم العام، لا يستطيع المهاجم الوصول للشبكة الداخلية.',
    explanation_en: 'The DMZ is an intermediate network zone containing servers that must be internet-accessible (like web servers), but isolated from the sensitive internal network. Even if the public server is breached, the attacker cannot reach the internal network.',
  },

  // MCQ 2
  {
    id: 'u2e-2-mcq-2',
    type: 'MCQ',
    lesson: '2-2',
    lessonName_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'تعمل شركة من مقرها الرئيسي وتريد موظفيها في الفروع الوصول بأمان للملفات الداخلية عبر الإنترنت العام. أي حل أمني يناسب هذا السيناريو؟',
    question_en: 'A company wants its branch employees to securely access internal files over the public internet. Which security solution fits this scenario?',
    option_a_ar: 'جدار ناري (Firewall)',
    option_a_en: 'Firewall',
    option_b_ar: 'برنامج مكافحة الفيروسات (Antivirus)',
    option_b_en: 'Antivirus software',
    option_c_ar: 'شبكة خاصة افتراضية (VPN)',
    option_c_en: 'Virtual Private Network (VPN)',
    option_d_ar: 'نظام كشف التسلل (IDS)',
    option_d_en: 'Intrusion Detection System (IDS)',
    correct_option: 'C',
    explanation_ar: 'الـ VPN ينشئ نفقاً مشفراً آمناً عبر الإنترنت العام، مما يتيح للموظف في أي مكان الاتصال بالشبكة الداخلية للشركة بأمان تام كأنه موجود في المقر الرئيسي.',
    explanation_en: 'A VPN creates a secure encrypted tunnel over the public internet, allowing an employee anywhere to connect to the company\'s internal network safely—as if they were physically at headquarters.',
  },

  // MCQ 3
  {
    id: 'u2e-2-mcq-3',
    type: 'MCQ',
    lesson: '2-2',
    lessonName_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'ما المقصود بمبدأ "الدفاع في العمق" (Defense in Depth) في أمان الشبكات؟',
    question_en: 'What is meant by the "Defense in Depth" principle in network security?',
    option_a_ar: 'الاعتماد على حل أمني واحد قوي لحماية الشبكة بالكامل',
    option_a_en: 'Relying on a single powerful security solution to protect the entire network',
    option_b_ar: 'تثبيت أعمق نسخة من برنامج الحماية المتاحة',
    option_b_en: 'Installing the deepest version of available security software',
    option_c_ar: 'تطبيق طبقات متعددة من الحماية بحيث إذا اختُرقت طبقة تبقى الطبقات الأخرى تعمل',
    option_c_en: 'Applying multiple layers of protection so that if one layer is breached, others remain active',
    option_d_ar: 'تعميق تحليل الحوادث بعد وقوعها',
    option_d_en: 'Deepening incident analysis after they occur',
    correct_option: 'C',
    explanation_ar: 'الدفاع في العمق يعني عدم الاعتماد على حل أمني واحد، بل استخدام طبقات (جدار ناري + كشف تسلل + تشفير + إجراءات الموظفين...) بحيث إذا تخطى المهاجم طبقة واجه التالية.',
    explanation_en: 'Defense in Depth means not relying on a single security solution, but layering multiple controls (firewall + IDS + encryption + policies...) so that breaching one layer still leaves additional barriers for the attacker.',
  },

  // Written 1
  {
    id: 'u2e-2-wr-1',
    type: 'WRITTEN',
    lesson: '2-2',
    lessonName_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'قارن بين الجدار الناري (Firewall) ونظام كشف التسلل (IDS) من حيث الوظيفة وطريقة الحماية.',
    question_en: 'Compare a Firewall and an Intrusion Detection System (IDS) in terms of function and protection method.',
    ideal_answer_ar: '• الجدار الناري (Firewall):\n  - يراقب حركة البيانات الداخلة والخارجة ويسمح أو يمنع الاتصالات بناءً على قواعد محددة مسبقاً.\n  - يعمل كـ "حارس بوابة" يمنع الاتصالات الغير مصرح بها من البداية.\n• نظام كشف التسلل (IDS):\n  - يراقب حركة البيانات داخل الشبكة ويبحث عن أنماط مشبوهة أو هجمات معروفة.\n  - يُنبّه المسؤولين عند اكتشاف نشاط مشبوه، لكنه لا يمنع الهجوم بنفسه (يكتشف فقط).\n• الفرق الجوهري: الجدار الناري يمنع، بينما IDS يكتشف ويُبلّغ.',
    ideal_answer_en: '• Firewall:\n  - Monitors incoming and outgoing network traffic, permitting or blocking connections based on predefined rules.\n  - Acts as a "gatekeeper" that prevents unauthorized connections from the outset.\n• IDS (Intrusion Detection System):\n  - Monitors internal network traffic looking for suspicious patterns or known attack signatures.\n  - Alerts administrators when suspicious activity is detected, but does not block attacks by itself (detection only).\n• Key difference: Firewall prevents; IDS detects and alerts.',
    marks: 4,
  },

  // Written 2
  {
    id: 'u2e-2-wr-2',
    type: 'WRITTEN',
    lesson: '2-2',
    lessonName_ar: 'الدرس 2-2: تصميم أمان الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'اشرح مبدأ "الثقة الصفرية" (Zero Trust) ولماذا أصبح ضرورياً في بيئات العمل الحديثة؟',
    question_en: 'Explain the "Zero Trust" principle and why it has become essential in modern work environments.',
    ideal_answer_ar: '• مبدأ الثقة الصفرية (Zero Trust): يقوم على فكرة "لا تثق بأحد تلقائياً حتى لو كان داخل الشبكة" ويشترط التحقق من كل مستخدم وكل جهاز في كل مرة يطلب فيها الوصول لأي مورد.\n• سبب الحاجة إليه في بيئات العمل الحديثة:\n  - انتشار العمل عن بُعد جعل الحدود التقليدية للشبكة غير كافية للحماية.\n  - يمكن أن يتعرض موظف داخل الشبكة لاختراق حسابه ويصبح تهديداً داخلياً.\n  - يُقلل من الأضرار في حال اختراق أي حساب لأن الصلاحيات محدودة ومراقبة.',
    ideal_answer_en: '• Zero Trust Principle: Based on the idea of "never trust, always verify"—even users inside the network must be verified every time they request access to any resource.\n• Why it\'s essential in modern environments:\n  - Remote work has dissolved traditional network perimeters, making them insufficient for protection.\n  - An employee inside the network can have a compromised account and become an insider threat.\n  - Limits damage if any account is breached, since permissions are minimal and monitored.',
    marks: 4,
  },
];

// ─────────────────────────────────────────────────────────────
// LESSON 2-3 — الاستجابة للحوادث وإدارة المخاطر
// Incident Response & Risk Management
// ─────────────────────────────────────────────────────────────
export const UNIT2_EXAM_L3: UnitExamQuestion[] = [

  // MCQ 1
  {
    id: 'u2e-3-mcq-1',
    type: 'MCQ',
    lesson: '2-3',
    lessonName_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    lessonName_en: 'Lesson 2-3: Incident Response & Risk Management',
    question_ar: 'تعرّض خادم الشركة لهجوم فدية (Ransomware). ما أول إجراء يجب على فريق الأمن اتخاذه وفق نموذج الاستجابة للحوادث؟',
    question_en: 'A company\'s server was hit by a Ransomware attack. What is the first action the security team should take according to the incident response model?',
    option_a_ar: 'الاستئصال — حذف برمجية الفدية فوراً من الخادم',
    option_a_en: 'Eradication — immediately delete the ransomware from the server',
    option_b_ar: 'الاستعادة — استعادة البيانات من النسخ الاحتياطية',
    option_b_en: 'Recovery — restore data from backups immediately',
    option_c_ar: 'الاحتواء — عزل الخادم المصاب عن بقية الشبكة لوقف الانتشار',
    option_c_en: 'Containment — isolate the infected server from the rest of the network to stop the spread',
    option_d_ar: 'دفع الفدية لاسترداد البيانات بأسرع وقت ممكن',
    option_d_en: 'Pay the ransom to recover data as quickly as possible',
    correct_option: 'C',
    explanation_ar: 'وفق نموذج الاستجابة للحوادث، الاحتواء يأتي بعد الاكتشاف مباشرة. يجب عزل الخادم المصاب أولاً لمنع برمجية الفدية من الانتشار لأجهزة وخوادم أخرى، ثم بعد العزل يبدأ الاستئصال والاستعادة.',
    explanation_en: 'According to the incident response model, Containment follows Detection immediately. The infected server must be isolated first to prevent ransomware from spreading to other devices, then Eradication and Recovery can begin safely.',
  },

  // MCQ 2
  {
    id: 'u2e-3-mcq-2',
    type: 'MCQ',
    lesson: '2-3',
    lessonName_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    lessonName_en: 'Lesson 2-3: Incident Response & Risk Management',
    question_ar: 'قرّرت الشركة قبول خطر استخدام برنامج قديم لأن تكلفة ترقيته أعلى من قيمة الضرر المحتمل. ما استراتيجية التعامل مع المخاطر التي تعكسها هذه القرار؟',
    question_en: 'A company decided to accept the risk of using outdated software because the upgrade cost exceeds the potential damage value. Which risk management strategy does this reflect?',
    option_a_ar: 'تجنب المخاطر (Risk Avoidance)',
    option_a_en: 'Risk Avoidance',
    option_b_ar: 'قبول المخاطر (Risk Acceptance)',
    option_b_en: 'Risk Acceptance',
    option_c_ar: 'نقل المخاطر (Risk Transfer)',
    option_c_en: 'Risk Transfer',
    option_d_ar: 'تخفيف المخاطر (Risk Mitigation)',
    option_d_en: 'Risk Mitigation',
    correct_option: 'B',
    explanation_ar: 'قبول المخاطر (Risk Acceptance) يعني أن المؤسسة تُقرّ بوجود الخطر وتقرر التعايش معه دون إجراء إضافي، عادة عندما تكون تكلفة المعالجة أعلى من قيمة الضرر المحتمل.',
    explanation_en: 'Risk Acceptance means the organization acknowledges the risk and decides to live with it without further action—typically when the cost of treatment exceeds the potential damage value.',
  },

  // MCQ 3
  {
    id: 'u2e-3-mcq-3',
    type: 'MCQ',
    lesson: '2-3',
    lessonName_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    lessonName_en: 'Lesson 2-3: Incident Response & Risk Management',
    question_ar: 'ما الهدف الأساسي من المرحلة الأخيرة في نموذج الاستجابة للحوادث (منع التكرار / الدروس المستفادة)؟',
    question_en: 'What is the primary goal of the last stage in the incident response model (Lessons Learned / Prevention of Recurrence)?',
    option_a_ar: 'معاقبة المسؤولين عن الثغرة التي أدت للاختراق',
    option_a_en: 'Punishing those responsible for the security gap',
    option_b_ar: 'استعادة الخدمات المتأثرة وإعادتها للعمل الطبيعي',
    option_b_en: 'Restoring affected services to normal operation',
    option_c_ar: 'تحليل الحادث واستخلاص الدروس لتحسين الإجراءات ومنع تكرار نفس الحادث',
    option_c_en: 'Analyzing the incident and extracting lessons to improve procedures and prevent recurrence',
    option_d_ar: 'نقل المسؤولية لشركة تأمين خارجية',
    option_d_en: 'Transferring responsibility to an external insurance company',
    correct_option: 'C',
    explanation_ar: 'مرحلة الدروس المستفادة تهدف لتحليل كيف حدث الاختراق وما الذي نجح وما الذي فشل في الاستجابة، ثم تحديث الإجراءات والضوابط الأمنية لمنع تكرار نفس الحادث مستقبلاً.',
    explanation_en: 'The Lessons Learned stage analyzes how the breach occurred, what worked and what failed in the response, then updates procedures and security controls to prevent the same incident from happening again.',
  },

  // Written 1
  {
    id: 'u2e-3-wr-1',
    type: 'WRITTEN',
    lesson: '2-3',
    lessonName_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    lessonName_en: 'Lesson 2-3: Incident Response & Risk Management',
    question_ar: 'ما المقصود بـ "مصفوفة المخاطر"؟ وكيف يُستخدم لتحديد أولوية التعامل مع المخاطر الأمنية؟',
    question_en: 'What is a "Risk Matrix"? And how is it used to prioritize dealing with security risks?',
    ideal_answer_ar: '• مصفوفة المخاطر: أداة تقييمية تساعد المؤسسة على تصنيف المخاطر بناءً على عاملين:\n  1. الاحتمالية (Likelihood): ما مدى احتمال حدوث الخطر؟\n  2. الأثر (Impact): ما حجم الضرر إذا وقع؟\n• طريقة الاستخدام:\n  - تُمثَّل المخاطر على جدول يتقاطع فيه العاملان.\n  - المخاطر ذات الاحتمالية العالية والأثر الكبير تُعامَل كأولوية قصوى وتعالَج أولاً.\n  - المخاطر ذات الاحتمالية المنخفضة والأثر الضعيف قد تُقبَل أو تُراقَب فقط.\n  - تساعد في توجيه ميزانية الأمن نحو ما يستحق الاستثمار الأكبر.',
    ideal_answer_en: '• Risk Matrix: An evaluation tool that helps organizations classify risks based on two factors:\n  1. Likelihood: How probable is it that the risk will occur?\n  2. Impact: How severe is the damage if it occurs?\n• How it\'s used:\n  - Risks are plotted on a grid where the two factors intersect.\n  - High-likelihood, high-impact risks are treated as top priority and addressed first.\n  - Low-likelihood, low-impact risks may be accepted or only monitored.\n  - Helps direct security budgets toward what deserves the greatest investment.',
    marks: 4,
  },

  // Written 2
  {
    id: 'u2e-3-wr-2',
    type: 'WRITTEN',
    lesson: '2-3',
    lessonName_ar: 'الدرس 2-3: الاستجابة للحوادث وإدارة المخاطر',
    lessonName_en: 'Lesson 2-3: Incident Response & Risk Management',
    question_ar: 'اذكر أربع استراتيجيات للتعامل مع المخاطر الأمنية، وأعطِ مثالاً عملياً على كل استراتيجية.',
    question_en: 'List four strategies for handling security risks, and give a practical example for each strategy.',
    ideal_answer_ar: '1. تجنب المخاطر (Risk Avoidance): إيقاف النشاط الذي يسبب الخطر.\n   مثال: إيقاف استخدام نظام قديم لا يدعم التشفير وليس له تحديثات أمنية.\n2. تخفيف المخاطر (Risk Mitigation): تطبيق إجراءات تقلل من احتمال الخطر أو حجم ضرره.\n   مثال: تثبيت جدار ناري وتحديث البرامج بانتظام لتقليل خطر الاختراق.\n3. نقل المخاطر (Risk Transfer): تحويل المسؤولية المالية لطرف آخر.\n   مثال: الاشتراك في وثيقة تأمين إلكتروني تغطي خسائر الاختراق الأمني.\n4. قبول المخاطر (Risk Acceptance): الاعتراف بالخطر والتعايش معه دون إجراء إضافي.\n   مثال: قبول خطر توقف نظام ثانوي غير حساس لأن تكلفة حمايته أعلى من قيمته.',
    ideal_answer_en: '1. Risk Avoidance: Stop the activity causing the risk.\n   Example: Discontinuing the use of an old system that lacks encryption and security updates.\n2. Risk Mitigation: Apply measures that reduce the likelihood or impact of the risk.\n   Example: Installing a firewall and regularly updating software to reduce breach risk.\n3. Risk Transfer: Transfer financial responsibility to another party.\n   Example: Purchasing a cyber insurance policy that covers data breach losses.\n4. Risk Acceptance: Acknowledge the risk and live with it without further action.\n   Example: Accepting the risk of a non-critical secondary system outage because protection costs exceed its value.',
    marks: 4,
  },
];

// ── Combined for export ───────────────────────────────────────
export const UNIT2_FULL_EXAM: UnitExamQuestion[] = [
  ...UNIT2_EXAM_L1,
  ...UNIT2_EXAM_L2,
  ...UNIT2_EXAM_L3,
];

export const UNIT2_MCQ_ONLY: UnitExamMcq[] = UNIT2_FULL_EXAM.filter(
  (q): q is UnitExamMcq => q.type === 'MCQ'
);

export const UNIT2_WRITTEN_ONLY: UnitExamWritten[] = UNIT2_FULL_EXAM.filter(
  (q): q is UnitExamWritten => q.type === 'WRITTEN'
);

