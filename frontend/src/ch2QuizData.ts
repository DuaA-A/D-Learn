// ============================================================
// Chapter 2 Real Quiz — 16 Questions (Lessons 2-1 & 2-2)
// 10 MCQ (MEDIUM/HARD) + 6 WRITTEN (3 per lesson)
// Fully bilingual: Arabic & English
// ============================================================

// ── MCQ Question Type ────────────────────────────────────────
export interface Ch2McqQuestion {
  id: string;
  type: 'MCQ';
  lesson: '2-1' | '2-2';
  difficulty: 'MEDIUM' | 'HARD';
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

// ── Written Question Type ────────────────────────────────────
export interface Ch2WrittenQuestion {
  id: string;
  type: 'WRITTEN';
  lesson: '2-1' | '2-2';
  difficulty: 'MEDIUM' | 'HARD';
  lessonName_ar: string;
  lessonName_en: string;
  question_ar: string;
  question_en: string;
  ideal_answer_ar: string;
  ideal_answer_en: string;
  marks: number; // suggested marks for admin guidance
}

// ── Union Type ────────────────────────────────────────────────
export type Ch2QuizQuestion = Ch2McqQuestion | Ch2WrittenQuestion;

// ─────────────────────────────────────────────────────────────
// MCQ QUESTIONS — 10 total (5 per lesson)
// ─────────────────────────────────────────────────────────────
export const CH2_REAL_QUIZ_MCQ: Ch2McqQuestion[] = [

  // ── Lesson 2-1 ─────────────────────────────────────────────
  {
    id: 'rq-2-1-01',
    type: 'MCQ',
    lesson: '2-1',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'خلال عملية مصافحة TLS لـ HTTPS، يستخدم الخادم والعميل التشفير بالمفتاح العام (غير المتماثل) لغرض واحد محدد — ما هو؟',
    question_en: 'During the TLS handshake for HTTPS, the server and client use public-key (asymmetric) cryptography for one specific purpose — what is it?',
    option_a_ar: 'تشفير بيانات جلسة الإنترنت بالكامل بشكل دائم',
    option_a_en: 'To encrypt all session data for the entire connection permanently',
    option_b_ar: 'التحقق من هوية الخادم وتبادل مفتاح التشفير المشترك بأمان',
    option_b_en: 'To verify the server\'s identity and securely exchange a shared session key',
    option_c_ar: 'ضغط البيانات لتسريع الاتصال',
    option_c_en: 'To compress the data and speed up the connection',
    option_d_ar: 'إنشاء كلمة مرور مؤقتة يستخدمها العميل فقط',
    option_d_en: 'To generate a temporary password used only by the client',
    correct_option: 'B',
    explanation_ar: 'في مصافحة TLS، يُستخدم التشفير بالمفتاح العام فقط لتأمين تبادل مفتاح الجلسة المشترك. بعدها يتم تشفير بيانات الاتصال بالمفتاح المشترك (أسرع بكثير).',
    explanation_en: 'In the TLS handshake, asymmetric (public-key) cryptography is used only to safely exchange a shared session key and authenticate the server\'s certificate. All subsequent data is encrypted with the faster symmetric shared key.',
  },
  {
    id: 'rq-2-1-02',
    type: 'MCQ',
    lesson: '2-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'بعد إدخال كلمة المرور، يطلب التطبيق المصرفي من أحمد إدخال رمز من تطبيق المصادقة على هاتفه. هذا الرمز يمثل أي عامل من عوامل MFA؟',
    question_en: 'After entering his password, Ahmed\'s banking app asks for a code from an authenticator app on his phone. This code represents which MFA factor?',
    option_a_ar: 'ما تعرفه (شيء تعلمه)',
    option_a_en: 'Something you KNOW',
    option_b_ar: 'ما أنت عليه (شيء تكون عليه)',
    option_b_en: 'Something you ARE',
    option_c_ar: 'ما تملكه (شيء تمتلكه)',
    option_c_en: 'Something you HAVE',
    option_d_ar: 'ما تفعله (شيء تفعله)',
    option_d_en: 'Something you DO',
    correct_option: 'C',
    explanation_ar: 'رمز تطبيق المصادقة ينتمي لعامل "ما تملكه" لأنه يتطلب امتلاك الهاتف فعلياً. عوامل MFA: ما تعرفه (كلمة مرور)، ما تملكه (هاتف/رمز OTP)، ما أنت عليه (بصمة).',
    explanation_en: 'An authenticator app code belongs to "something you HAVE" because it requires physical possession of the device. The three MFA factors are: KNOW (password), HAVE (phone/OTP token), ARE (biometrics).',
  },
  {
    id: 'rq-2-1-03',
    type: 'MCQ',
    lesson: '2-1',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'ما الفرق الجوهري بين التوقيع الرقمي وشهادة المفتاح العام (الشهادة الرقمية)؟',
    question_en: 'What is the fundamental difference between a Digital Signature and a Public-Key Certificate (Digital Certificate)?',
    option_a_ar: 'التوقيع الرقمي يُثبت هوية المُرسِل وسلامة الرسالة؛ أما الشهادة الرقمية فتربط هوية كيان بمفتاحه العام وتصدر من جهة موثوقة (CA)',
    option_a_en: 'A digital signature proves the sender\'s identity and message integrity; a digital certificate binds an identity to a public key and is issued by a trusted CA',
    option_b_ar: 'التوقيع الرقمي أقوى تشفيراً من الشهادة الرقمية',
    option_b_en: 'A digital signature uses stronger encryption than a digital certificate',
    option_c_ar: 'الشهادة الرقمية تُستخدم فقط في البريد الإلكتروني',
    option_c_en: 'Digital certificates are only used in email',
    option_d_ar: 'لا يوجد فرق حقيقي؛ المصطلحان مترادفان',
    option_d_en: 'There is no real difference; the terms are interchangeable',
    correct_option: 'A',
    explanation_ar: 'التوقيع الرقمي: ينشئه المُرسِل بمفتاحه الخاص لإثبات الهوية والسلامة وعدم الإنكار. الشهادة الرقمية: وثيقة تصدرها CA تربط هوية كيان بمفتاحه العام.',
    explanation_en: 'A Digital Signature is created by the sender using their private key (authentication + integrity + non-repudiation). A Digital Certificate is a CA-issued document that binds an entity\'s identity to their public key.',
  },
  {
    id: 'rq-2-1-04',
    type: 'MCQ',
    lesson: '2-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'أي من المواقف التالية يُعدّ مثالاً على مبدأ "عدم الإنكار" (Non-repudiation)؟',
    question_en: 'Which situation is an example of "Non-repudiation" in information security?',
    option_a_ar: 'يتذكر أحمد كلمة المرور الخاصة به',
    option_a_en: 'Ahmed remembers his own password',
    option_b_ar: 'يتصل موظف بشبكة الشركة عبر VPN من المنزل',
    option_b_en: 'An employee connects to the company network via VPN from home',
    option_c_ar: 'يُرسل علي عقداً بتوقيعه الرقمي ولا يستطيع لاحقاً إنكار أنه أرسله',
    option_c_en: 'Ali sends a contract with his digital signature and cannot later deny he sent it',
    option_d_ar: 'يُطفئ المدير جدار الحماية لتحديثه',
    option_d_en: 'The manager turns off the firewall to update it',
    correct_option: 'C',
    explanation_ar: 'عدم الإنكار يعني أن المُرسِل لا يستطيع إنكار أنه أرسل رسالة. التوقيع الرقمي هو الأداة الرئيسية لأن المفتاح الخاص فريد للمُرسِل وحده.',
    explanation_en: 'Non-repudiation means the sender cannot deny having sent a message. A digital signature achieves this because the private key is unique to the sender — they cannot claim someone else sent it.',
  },
  {
    id: 'rq-2-1-05',
    type: 'MCQ',
    lesson: '2-1',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'اكتشف بنك أن الشهادة الرقمية لموظف قد سُرقت. ماذا يجب أن يفعل فوراً؟',
    question_en: 'A bank discovers that an employee\'s digital certificate was stolen. What should it immediately do?',
    option_a_ar: 'انتظر حتى تنتهي صلاحية الشهادة تلقائياً',
    option_a_en: 'Wait for the certificate to naturally expire on its own',
    option_b_ar: 'إلغاء الشهادة فوراً عبر قائمة إلغاء الشهادات (CRL) أو بروتوكول OCSP',
    option_b_en: 'Immediately revoke the certificate via the Certificate Revocation List (CRL) or OCSP',
    option_c_ar: 'إنشاء كلمة مرور جديدة للموظف فقط',
    option_c_en: 'Simply create a new password for the employee',
    option_d_ar: 'نقل بيانات الموظف إلى خادم آخر',
    option_d_en: 'Move the employee\'s data to a different server',
    correct_option: 'B',
    explanation_ar: 'الإلغاء (Revocation) يعني إبطال الشهادة قبل أوانها بسبب حادث أمني. الإلغاء الفوري عبر CRL/OCSP يمنع المهاجم من استخدام الشهادة المسروقة.',
    explanation_en: 'Certificate revocation is early invalidation due to a security event (theft/compromise). Immediate revocation via CRL or OCSP prevents the attacker from using the stolen certificate before its natural expiry.',
  },

  // ── Lesson 2-2 ─────────────────────────────────────────────
  {
    id: 'rq-2-2-01',
    type: 'MCQ',
    lesson: '2-2',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'ما هو السلوك الافتراضي المثالي لجدار الحماية عند عدم تطابق أي قاعدة مع حزمة البيانات؟',
    question_en: 'What is the ideal default behavior of a firewall when no rule matches a data packet?',
    option_a_ar: 'السماح للحزمة بالمرور (Default Allow) لضمان عدم انقطاع الخدمة',
    option_a_en: 'Allow the packet through (Default Allow) to ensure service continuity',
    option_b_ar: 'إرسال الحزمة للمراجعة اليدوية',
    option_b_en: 'Send the packet for manual review by the security administrator',
    option_c_ar: 'حظر الحزمة وتجاهلها (Default Deny) لأن ما لم يُسمح به صراحةً يُحظر',
    option_c_en: 'Block and drop the packet (Default Deny) because what is not explicitly permitted is forbidden',
    option_d_ar: 'تسجيل الحزمة فقط والسماح لها بالمرور',
    option_d_en: 'Only log the packet and allow it through to collect data',
    correct_option: 'C',
    explanation_ar: 'مبدأ "الحظر الافتراضي" هو المعيار الذهبي: تُسمح فقط الحركة المصرح بها صراحةً، ويُرفض أي شيء آخر. هذا يقلل سطح الهجوم بشكل كبير.',
    explanation_en: 'The "Default Deny" principle is the gold standard: only explicitly authorized traffic is allowed — everything else is rejected. This dramatically reduces the attack surface.',
  },
  {
    id: 'rq-2-2-02',
    type: 'MCQ',
    lesson: '2-2',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'تريد شركة وضع خادم ويب يمكن للعملاء العامين الوصول إليه، مع الحفاظ على أمان الشبكة الداخلية. ما البنية الشبكية الأمثل؟',
    question_en: 'A company wants a web server accessible to public internet users while keeping its internal network secure. What network architecture best achieves this?',
    option_a_ar: 'وضع الخادم مباشرةً على الشبكة الداخلية دون حماية',
    option_a_en: 'Place the server directly on the internal network without any protection',
    option_b_ar: 'وضع الخادم في منطقة DMZ محمية بجدران حماية من جانبَي الإنترنت والشبكة الداخلية',
    option_b_en: 'Place the server in a DMZ protected by firewalls on both the internet-facing and internal-network sides',
    option_c_ar: 'وضع الخادم خارج شبكة الشركة تماماً ودون أي جدار حماية',
    option_c_en: 'Place the server completely outside the company network without any firewall',
    option_d_ar: 'وضع الخادم خلف VPN يتطلب مصادقة من جميع المستخدمين العامين',
    option_d_en: 'Place the server behind a VPN requiring authentication from all public users',
    correct_option: 'B',
    explanation_ar: 'DMZ هي شبكة فرعية معزولة بين الإنترنت والشبكة الداخلية. جدار حماية خارجي يحميها من الإنترنت، وجدار حماية داخلي يمنع أي اختراق DMZ من الوصول للشبكة الداخلية.',
    explanation_en: 'A DMZ is an isolated subnet between the internet and the internal network. An outer firewall protects it from the internet, while an inner firewall prevents any DMZ breach from reaching the internal network — containment by design.',
  },
  {
    id: 'rq-2-2-03',
    type: 'MCQ',
    lesson: '2-2',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'تعمل مريم من مقهى وتحتاج للوصول لموارد شركتها الحساسة. لماذا يُعدّ استخدام VPN ضرورياً تحديداً في هذه الحالة؟',
    question_en: 'Mariam works from a café and needs to access her company\'s sensitive resources. Why is using a VPN specifically necessary here?',
    option_a_ar: 'لأن VPN يجعل الاتصال أسرع في الأماكن العامة',
    option_a_en: 'Because VPN makes the internet connection faster in public places',
    option_b_ar: 'لأن VPN ينشئ نفقاً مشفراً عبر شبكة Wi-Fi العامة غير الموثوقة، يمنع التنصت على البيانات',
    option_b_en: 'Because VPN creates an encrypted tunnel over the untrusted public Wi-Fi, preventing eavesdropping on the data',
    option_c_ar: 'لأن VPN يحول عنوان IP الخاص بها لتجاوز القيود الجغرافية',
    option_c_en: 'Because VPN changes her IP address to bypass geographic restrictions',
    option_d_ar: 'لأن VPN تحميها من الفيروسات والبرمجيات الخبيثة',
    option_d_en: 'Because VPN protects her from viruses and malware',
    correct_option: 'B',
    explanation_ar: 'شبكة Wi-Fi العامة غير مشفرة وقد يتنصت المهاجمون على البيانات (Man-in-the-Middle). VPN ينشئ نفقاً مشفراً آمناً حتى لو كانت الشبكة العامة مخترقة.',
    explanation_en: 'Public Wi-Fi is unencrypted and vulnerable to Man-in-the-Middle attacks. VPN creates an encrypted tunnel between Mariam\'s device and the company server — the data stays protected even on a compromised network.',
  },
  {
    id: 'rq-2-2-04',
    type: 'MCQ',
    lesson: '2-2',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'ما المقصود بمبدأ "الدفاع في العمق" (Defense in Depth) وما ميزته على طبقة حماية واحدة؟',
    question_en: 'What does the "Defense in Depth" principle mean, and what is its advantage over a single layer of protection?',
    option_a_ar: 'تعيين كلمات مرور قوية جداً كإجراء وحيد للحماية',
    option_a_en: 'Assigning very strong passwords as the sole security measure',
    option_b_ar: 'استخدام أقوى جدار حماية في السوق كحل شامل وكافٍ',
    option_b_en: 'Using the strongest firewall on the market as a complete and sufficient solution',
    option_c_ar: 'تطبيق طبقات حماية متعددة (جدار حماية، تشفير، MFA، مراقبة) بحيث يواجه المهاجم طبقات أخرى إذا اخترق طبقة',
    option_c_en: 'Applying multiple diverse security layers (firewall, encryption, MFA, monitoring) so a breach of one layer still leaves the attacker facing more',
    option_d_ar: 'تعميق برامج التوعية الأمنية كبديل عن الأدوات التقنية',
    option_d_en: 'Deepening security awareness programs as a substitute for technical tools',
    correct_option: 'C',
    explanation_ar: 'الدفاع في العمق: لا توجد نقطة فشل وحيدة. المهاجم يواجه جدار حماية ثم IDS ثم MFA ثم تشفير ثم مراقبة مستمرة — كل طبقة تزيد التكلفة والصعوبة عليه.',
    explanation_en: 'Defense in Depth: no single point of failure. If an attacker breaches the firewall, they then face an IDS, then MFA, then encryption, then continuous monitoring — each layer increases the attacker\'s cost and difficulty.',
  },
  {
    id: 'rq-2-2-05',
    type: 'MCQ',
    lesson: '2-2',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'يتبنى نموذج "الثقة الصفرية" (Zero Trust) شعار "لا تثق أبداً، تحقق دائماً". ما السلوك الذي يميزه عن النماذج التقليدية؟',
    question_en: 'The Zero Trust model adopts "Never Trust, Always Verify." What behavior distinguishes it from traditional security models?',
    option_a_ar: 'يثق بأي مستخدم داخل الشبكة الداخلية تلقائياً لأنه اجتاز جدار الحماية الخارجي',
    option_a_en: 'It automatically trusts any user inside the internal network because they passed the external firewall',
    option_b_ar: 'يطلب التحقق المستمر من هوية وصلاحيات كل مستخدم وجهاز في كل طلب وصول، بغض النظر عن موقعه',
    option_b_en: 'It requires continuous verification of the identity and permissions of every user and device for every access request, regardless of location',
    option_c_ar: 'يعتمد فقط على التشفير دون أي نظام للمصادقة',
    option_c_en: 'It relies only on encryption without any authentication system',
    option_d_ar: 'يسمح بالوصول الكامل لجميع الموظفين لتشجيع التعاون',
    option_d_en: 'It grants full access to all employees to encourage collaboration',
    correct_option: 'B',
    explanation_ar: 'النماذج التقليدية تثق بمن داخل الشبكة. Zero Trust يرفض ذلك: كل طلب وصول — حتى من الداخل — يجب التحقق منه. يقترن بمبدأ "الصلاحية الدنيا": كل مستخدم يحصل على أدنى صلاحيات ضرورية فقط.',
    explanation_en: 'Traditional models trust anyone already inside the network. Zero Trust rejects this entirely: every access request — even from inside — must be verified. It is paired with Least Privilege: each user gets only the minimum permissions needed for their role.',
  },
];

// ─────────────────────────────────────────────────────────────
// WRITTEN QUESTIONS — 6 total (3 per lesson)
// ─────────────────────────────────────────────────────────────
export const CH2_REAL_QUIZ_WRITTEN: Ch2WrittenQuestion[] = [

  // ── Lesson 2-1 Written ─────────────────────────────────────
  {
    id: 'rq-2-1-w1',
    type: 'WRITTEN',
    lesson: '2-1',
    difficulty: 'HARD',
    marks: 5,
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'اشرح آلية عمل HTTPS من خلال وصف خطوات مصافحة TLS، مع توضيح دور التشفير غير المتماثل (بالمفتاح العام) والتشفير المتماثل (بالمفتاح المشترك) في تأمين الاتصال، ولماذا يُستخدم كلٌّ منهما في مرحلة مختلفة.',
    question_en: 'Explain how HTTPS works by describing the steps of the TLS handshake. Clarify the role of asymmetric (public-key) cryptography and symmetric (shared-key) cryptography in securing the connection, and explain why each is used at a different stage.',
    ideal_answer_ar: 'خطوات مصافحة TLS:\n1. يبدأ العميل بإرسال طلب اتصال للخادم (Client Hello).\n2. يرد الخادم بشهادته الرقمية التي تحتوي على مفتاحه العام (Server Hello + Certificate).\n3. يتحقق العميل من صحة الشهادة من جهة CA موثوقة.\n4. يستخدم العميل المفتاح العام للخادم لتشفير مفتاح الجلسة المشترك وإرساله (التشفير غير المتماثل — لضمان الأمان في التبادل).\n5. بعد الاتفاق على مفتاح الجلسة، يتم تشفير كل بيانات الاتصال بالمفتاح المشترك (التشفير المتماثل — لأنه أسرع).\n\nالسبب: التشفير غير المتماثل آمن لكنه بطيء — يُستخدم فقط لتبادل المفتاح. التشفير المتماثل سريع — يُستخدم لتشفير البيانات الفعلية.',
    ideal_answer_en: 'TLS Handshake steps:\n1. Client sends a connection request (Client Hello).\n2. Server responds with its digital certificate containing its public key (Server Hello + Certificate).\n3. Client verifies the certificate against a trusted CA.\n4. Client uses the server\'s public key to encrypt and send a shared session key (asymmetric encryption — ensures secure exchange).\n5. After agreeing on the session key, all communication data is encrypted with it (symmetric encryption — much faster).\n\nReason: Asymmetric encryption is secure but slow — used only for key exchange. Symmetric encryption is fast — used for encrypting actual data.',
  },
  {
    id: 'rq-2-1-w2',
    type: 'WRITTEN',
    lesson: '2-1',
    difficulty: 'MEDIUM',
    marks: 4,
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'ما المقصود بالمصادقة متعددة العوامل (MFA)؟ اذكر عواملها الثلاثة مع مثال عملي لكل عامل، وفسّر لماذا الجمع بين عاملين أو أكثر أكثر أماناً من الاعتماد على عامل واحد فقط.',
    question_en: 'What is Multi-Factor Authentication (MFA)? Name its three factors with a practical example for each, and explain why combining two or more factors is more secure than relying on a single factor alone.',
    ideal_answer_ar: 'المصادقة متعددة العوامل (MFA): نظام يتطلب تقديم دليلَي هوية أو أكثر من فئات مختلفة قبل منح الوصول.\n\nالعوامل الثلاثة:\n1. ما تعرفه (Knowledge): كلمة المرور أو رقم PIN.\n2. ما تملكه (Possession): هاتف ذكي يستقبل رمز OTP، أو بطاقة ذكية.\n3. ما أنت عليه (Inherence): بصمة الأصبع، أو التعرف على الوجه، أو قزحية العين.\n\nلماذا MFA أكثر أماناً؟\nإذا سرق المهاجم كلمة مرور الضحية، لا يزال يحتاج إلى عاملٍ آخر (مثل الهاتف). هذا يعني أن اختراق عامل واحد لا يكفي للوصول، مما يزيد تكلفة الهجوم وصعوبته بشكل كبير.',
    ideal_answer_en: 'MFA requires presenting two or more identity proofs from different categories before granting access.\n\nThe Three Factors:\n1. Something you KNOW: password or PIN.\n2. Something you HAVE: smartphone receiving an OTP code, or a smart card.\n3. Something you ARE: fingerprint, facial recognition, or iris scan.\n\nWhy is MFA more secure?\nIf an attacker steals the victim\'s password, they still need another factor (e.g. the physical phone). A single compromised factor is not enough to gain access — this dramatically increases the cost and difficulty of an attack.',
  },
  {
    id: 'rq-2-1-w3',
    type: 'WRITTEN',
    lesson: '2-1',
    difficulty: 'HARD',
    marks: 5,
    lessonName_ar: 'الدرس 2-1: تقنيات التشفير والمصادقة',
    lessonName_en: 'Lesson 2-1: Cryptographic Technologies & Authentication',
    question_ar: 'قارن بين التوقيع الرقمي وشهادة المفتاح العام من حيث: (أ) الغرض والوظيفة، (ب) من يُنشئ كلاً منهما، (ج) الضمانات الأمنية التي يوفرها كلٌّ منهما. ثم اشرح دور مبدأ "عدم الإنكار" في هذا السياق.',
    question_en: 'Compare a Digital Signature and a Public-Key Certificate in terms of: (a) purpose and function, (b) who creates each, (c) the security guarantees each provides. Then explain the role of the "non-repudiation" principle in this context.',
    ideal_answer_ar: '(أ) الغرض:\n- التوقيع الرقمي: يثبت أن رسالة أو مستنداً بعينه صادر من شخص معين ولم يُعدَّل.\n- الشهادة الرقمية: تثبت أن مفتاحاً عاماً معيناً يعود لكيان (شخص أو موقع) محدد بشكل موثوق.\n\n(ب) من يُنشئ:\n- التوقيع الرقمي: يُنشئه المُرسِل بمفتاحه الخاص.\n- الشهادة الرقمية: تصدرها جهة تصديق موثوقة (Certificate Authority - CA) بعد التحقق من هوية الكيان.\n\n(ج) الضمانات الأمنية:\n- التوقيع الرقمي: المصادقة (Authentication) + سلامة البيانات (Integrity) + عدم الإنكار (Non-repudiation).\n- الشهادة الرقمية: تتيح التحقق من صحة المفتاح العام وتمنع هجمات الوسيط (Man-in-the-Middle).\n\nعدم الإنكار: بما أن المفتاح الخاص سري ومعروف للمُرسِل وحده، فإنه لا يستطيع لاحقاً إنكار أنه أرسل الرسالة أو وقّع المستند.',
    ideal_answer_en: '(a) Purpose:\n- Digital Signature: proves that a specific message/document was sent by a specific person and has not been altered.\n- Digital Certificate: proves that a specific public key belongs to a verified entity (person/website).\n\n(b) Who creates each:\n- Digital Signature: created by the sender using their private key.\n- Digital Certificate: issued by a trusted Certificate Authority (CA) after verifying the entity\'s identity.\n\n(c) Security guarantees:\n- Digital Signature: Authentication + Integrity + Non-repudiation.\n- Digital Certificate: enables verification of the public key\'s authenticity and prevents Man-in-the-Middle attacks.\n\nNon-repudiation: since the private key is secret and known only to the sender, they cannot later deny sending the message or signing the document.',
  },

  // ── Lesson 2-2 Written ─────────────────────────────────────
  {
    id: 'rq-2-2-w1',
    type: 'WRITTEN',
    lesson: '2-2',
    difficulty: 'MEDIUM',
    marks: 4,
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'اشرح دور جدار الحماية (Firewall) في أمن الشبكات. ما الفرق بين سياسة "السماح الافتراضي" (Default Allow) وسياسة "الحظر الافتراضي" (Default Deny)؟ ولماذا يُفضَّل الحظر الافتراضي في البيئات الأمنية؟',
    question_en: 'Explain the role of a Firewall in network security. What is the difference between "Default Allow" and "Default Deny" policies? Why is Default Deny preferred in security-sensitive environments?',
    ideal_answer_ar: 'دور جدار الحماية:\nجدار الحماية هو جهاز أو برنامج يراقب ويتحكم في حركة البيانات الواردة والصادرة بناءً على مجموعة من القواعد الأمنية. يعمل كحاجز بين الشبكة الداخلية الموثوقة وشبكات غير موثوقة (مثل الإنترنت).\n\nالفرق بين السياستين:\n- السماح الافتراضي (Default Allow): يسمح بمرور كل حركة البيانات إلا ما هو محظور صراحةً. خطر: قد يسمح بحركة ضارة غير معروفة.\n- الحظر الافتراضي (Default Deny): يحظر كل حركة البيانات إلا ما هو مسموح به صراحةً. أكثر أماناً بكثير.\n\nلماذا يُفضَّل الحظر الافتراضي؟\nلأنه يعتمد على مبدأ "ما لم يُسمح به صراحةً فهو محظور". يقلص سطح الهجوم لأن أي بروتوكول أو خدمة غير مصرح بها تصبح محجوبة تلقائياً، حتى لو لم يعلم المسؤول بوجودها.',
    ideal_answer_en: 'Firewall role:\nA firewall is a device or software that monitors and controls incoming/outgoing network traffic based on security rules. It acts as a barrier between the trusted internal network and untrusted networks (like the internet).\n\nDifference between policies:\n- Default Allow: permits all traffic except what is explicitly blocked. Risk: may allow unknown malicious traffic.\n- Default Deny: blocks all traffic except what is explicitly permitted. Much more secure.\n\nWhy Default Deny is preferred:\nIt follows the principle of "what is not explicitly permitted is forbidden." This minimizes the attack surface because any unauthorized protocol or service is automatically blocked — even if the administrator is unaware of its existence.',
  },
  {
    id: 'rq-2-2-w2',
    type: 'WRITTEN',
    lesson: '2-2',
    difficulty: 'HARD',
    marks: 5,
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'ما المقصود بالمنطقة المنزوعة السلاح (DMZ)؟ اشرح كيفية استخدامها لحماية الشبكة الداخلية مع السماح بالوصول العام لخوادم معينة، مع رسم توضيحي نصي لموضع الخوادم وجدران الحماية.',
    question_en: 'What is a DMZ (Demilitarized Zone)? Explain how it is used to protect the internal network while allowing public access to certain servers. Include a text-based diagram showing the placement of servers and firewalls.',
    ideal_answer_ar: 'المنطقة المنزوعة السلاح (DMZ):\nهي شبكة فرعية معزولة تقع بين الإنترنت العام والشبكة الداخلية للمؤسسة. تُستخدم لاحتضان الخوادم التي تحتاج للوصول العام مثل خوادم الويب والبريد الإلكتروني.\n\nكيف تعمل DMZ؟\n- توضع خوادم الويب العامة داخل DMZ.\n- جدار حماية خارجي (Outer Firewall) يقف بين الإنترنت وDMZ: يسمح فقط بحركة HTTP/HTTPS.\n- جدار حماية داخلي (Inner Firewall) يقف بين DMZ والشبكة الداخلية: يمنع أي وصول مباشر من DMZ للشبكة الداخلية.\n\nالرسم التوضيحي النصي:\nالإنترنت → [جدار حماية خارجي] → DMZ (خادم ويب، خادم بريد) → [جدار حماية داخلي] → الشبكة الداخلية\n\nالفائدة: حتى لو اخترق المهاجم خادم الويب في DMZ، يظل محاصراً فيها ولا يستطيع الوصول للشبكة الداخلية الحساسة.',
    ideal_answer_en: 'DMZ (Demilitarized Zone):\nAn isolated subnet located between the public internet and the organization\'s internal network. It hosts servers that need public access (e.g., web servers, email servers).\n\nHow a DMZ works:\n- Public web servers are placed inside the DMZ.\n- Outer Firewall stands between the internet and the DMZ: allows only HTTP/HTTPS traffic.\n- Inner Firewall stands between the DMZ and the internal network: blocks any direct access from the DMZ to the internal network.\n\nText diagram:\nInternet → [Outer Firewall] → DMZ (Web Server, Mail Server) → [Inner Firewall] → Internal Network\n\nBenefit: even if an attacker compromises the web server in the DMZ, they remain contained within it and cannot reach the sensitive internal network.',
  },
  {
    id: 'rq-2-2-w3',
    type: 'WRITTEN',
    lesson: '2-2',
    difficulty: 'HARD',
    marks: 5,
    lessonName_ar: 'الدرس 2-2: تصميم أمن الشبكات',
    lessonName_en: 'Lesson 2-2: Network Security Design',
    question_ar: 'قارن بين نموذج الأمن التقليدي "القلعة والخندق" ونموذج "الثقة الصفرية" (Zero Trust). ما مبدأ "الصلاحية الدنيا" (Least Privilege)؟ وكيف يتكامل مع Zero Trust لتحقيق حماية أقوى؟',
    question_en: 'Compare the traditional "Castle-and-Moat" security model with the "Zero Trust" model. What is the "Least Privilege" principle? How does it integrate with Zero Trust to achieve stronger protection?',
    ideal_answer_ar: 'نموذج القلعة والخندق (التقليدي):\n- يفترض أن كل من داخل الشبكة موثوق به تلقائياً.\n- الحماية مركزة على الحدود الخارجية (جدار حماية قوي).\n- نقطة ضعفه: إذا تجاوز المهاجم الحد الخارجي (مثلاً عبر بيانات اعتماد مسروقة)، يحصل على وصول واسع داخل الشبكة.\n\nنموذج الثقة الصفرية (Zero Trust):\n- مبدأه: "لا تثق أبداً، تحقق دائماً".\n- كل طلب وصول — حتى من داخل الشبكة — يجب التحقق منه في كل مرة.\n- يستخدم: MFA + التحقق من هوية الجهاز + مراقبة مستمرة.\n\nمبدأ الصلاحية الدنيا (Least Privilege):\nكل مستخدم أو نظام يحصل على أدنى صلاحيات ضرورية لأداء عمله فقط، ولا شيء أكثر.\n\nالتكامل مع Zero Trust:\nحتى لو تحقق المهاجم من هويته بنجاح (اخترق حساباً)، فإن الصلاحيات المحدودة تمنعه من الوصول لموارد حساسة خارج نطاق دور ذلك الحساب. هذا يحد من الضرر بشكل كبير.',
    ideal_answer_en: 'Castle-and-Moat (Traditional) model:\n- Assumes anyone inside the network is automatically trusted.\n- Protection is concentrated on the external perimeter (strong outer firewall).\n- Weakness: if an attacker bypasses the perimeter (e.g., via stolen credentials), they gain broad access inside the network.\n\nZero Trust model:\n- Principle: "Never Trust, Always Verify."\n- Every access request — even from inside the network — must be verified every time.\n- Uses: MFA + device identity verification + continuous monitoring.\n\nLeast Privilege principle:\nEvery user or system receives only the minimum permissions necessary to perform their specific job role — nothing more.\n\nIntegration with Zero Trust:\nEven if an attacker successfully authenticates (compromises an account), the limited permissions prevent them from accessing sensitive resources outside that account\'s role. This significantly limits the damage from any single breach.',
  },
];

// ─────────────────────────────────────────────────────────────
// COMBINED QUIZ — 16 questions total (MCQ first, then WRITTEN)
// Order: 5 MCQ (L2-1) → 3 Written (L2-1) → 5 MCQ (L2-2) → 3 Written (L2-2)
// ─────────────────────────────────────────────────────────────
export const CH2_REAL_QUIZ_QUESTIONS: Ch2QuizQuestion[] = [
  // Lesson 2-1 MCQ
  ...CH2_REAL_QUIZ_MCQ.filter(q => q.lesson === '2-1'),
  // Lesson 2-1 Written
  ...CH2_REAL_QUIZ_WRITTEN.filter(q => q.lesson === '2-1'),
  // Lesson 2-2 MCQ
  ...CH2_REAL_QUIZ_MCQ.filter(q => q.lesson === '2-2'),
  // Lesson 2-2 Written
  ...CH2_REAL_QUIZ_WRITTEN.filter(q => q.lesson === '2-2'),
];
