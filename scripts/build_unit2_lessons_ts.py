# Python script to build Unit 2 lessons and update courseData.ts
import sys

unit2_lessons_code = '''
  // ==================== UNIT 2 ====================
  {
    id: "2-1",
    unit: 2,
    lesson_number: "2-1",
    title_en: "Cryptographic Technologies and Authentication",
    title_ar: "تقنيات التشفير والمصادقة",
    learning_objectives_en: [
      "Explain how HTTPS secures communication: how the TLS handshake uses public-key cryptography to share a key safely, and how common-key cryptography then protects the data that follows.",
      "Describe how authentication, including multi-factor authentication, is used in real services, and explain why security technologies are combined.",
    ],
    learning_objectives_ar: [
      "شرح كيفية قيام HTTPS بتأمين الاتصال: كيف تستخدم مصافحة TLS التشفير بالمفتاح العام لمشاركة المفتاح بأمان، وكيف يحمي التشفير بالمفتاح المشترك (المتماثل) البيانات التي تلي ذلك.",
      "وصف كيفية استخدام المصادقة، بما في ذلك المصادقة متعددة العوامل، في الخدمات الفعلية، وشرح سبب الجمع بين تقنيات الأمان المتعددة.",
    ],
    key_terms: [
      {
        term_en: "HTTPS (HTTP Secure)",
        term_ar: "بروتوكول HTTPS",
        def_en: "A communication protocol that adds TLS encryption to HTTP, providing encryption, detection of tampering, and verification of the communication partner.",
        def_ar: "بروتوكول اتصال يضيف تشفير TLS إلى HTTP، موفراً التشفير وكشف التلاعب بالبيانات والتحقق من هوية شريك الاتصال.",
      },
      {
        term_en: "TLS Handshake",
        term_ar: "مصافحة TLS",
        def_en: "The procedure for establishing a secure communication between the browser and the web server before transmitting data.",
        def_ar: "الإجراءات والخطوات المتبعة لإنشاء اتصال مشفر وآمن بين المتصفح وخادم الويب قبل بدء نقل البيانات.",
      },
      {
        term_en: "Common-key Cryptography",
        term_ar: "التشفير بالمفتاح المشترك (المتماثل)",
        def_en: "A cryptographic method that uses the same single key for both encryption and decryption. Fast; used to exchange large amounts of data quickly.",
        def_ar: "طريقة تشفير تستخدم نفس المفتاح الواحد المشترك للتشفير وفك التشفير. سريعة جداً وتُستخدم لتبادل كميات كبيرة من البيانات بكفاءة.",
      },
      {
        term_en: "Public-key Cryptography",
        term_ar: "التشفير بالمفتاح العام (غير المتماثل)",
        def_en: "A cryptographic method that uses a pair of keys: a public key for encryption and a private key for decryption. Used to share keys safely.",
        def_ar: "طريقة تشفير تعتمد على زوج من المفاتيح: مفتاح عام للتشفير ومفتاح خاص لفك التشفير. تُستخدم لمشاركة المفاتيح بأمان عبر الشبكة.",
      },
      {
        term_en: "Multi-factor Authentication (MFA)",
        term_ar: "المصادقة متعددة العوامل",
        def_en: "An authentication method combining two or more of the three factors: knowledge, possession, and biometrics.",
        def_ar: "طريقة مصادقة تجمع بين عاملين أو أكثر من فئات المصادقة الثلاث: المعرفة، والحيازة، والسمات الحيوية.",
      },
      {
        term_en: "Digital Certificate",
        term_ar: "الشهادة الرقمية",
        def_en: "An electronic document issued by a Certificate Authority (CA) verifying that the web server and communication partner are authentic and genuine.",
        def_ar: "وثيقة إلكترونية تصدرها سلطة الشهادات (CA) للتحقق وإثبات أن خادم الويب وجهة الاتصال حقيقية وموثوقة وليست مزيفة.",
      },
      {
        term_en: "Digital Signature",
        term_ar: "التوقيع الرقمي",
        def_en: "A mathematical mechanism that detects data tampering or impersonation of the sender, and provides non-repudiation.",
        def_ar: "آلية رياضية تكشف التلاعب بالبيانات أو انتحال شخصية المرسل، وتوفر خاصية عدم الإنكار.",
      },
      {
        term_en: "Non-repudiation",
        term_ar: "عدم الإنكار",
        def_en: "A security property making it impossible for the sender of data to deny having sent the data afterward.",
        def_ar: "خاصية أمنية تجعل من المستحيل على مرسل البيانات أن ينكر لاحقاً قيامه بإرسال تلك البيانات.",
      },
    ],
    sections: [
      {
        heading_en: "1. How HTTPS Communication Works",
        heading_ar: "1. آلية عمل اتصال HTTPS",
        content_en: `Every time you log in to a banking app, purchase items online, or visit a site showing a padlock in the browser address bar, cryptographic technologies work together in the background to keep your data safe.

**HTTPS (HTTP Secure)** adds TLS (Transport Layer Security) encryption to standard HTTP. It safeguards users against three major threats:
- **Eavesdropping:** Scrambles data so third parties cannot read it.
- **Tampering:** Detects if data was altered in transit.
- **Impersonation:** Proves that the website is genuine and authentic.

The process of setting up this secure channel is called the **TLS handshake**, which progresses through three distinct stages:

| Stage | What Happens | Cryptographic Method |
|---|---|---|
| **① Connection** | The web server sends its digital certificate and public key to the browser. The browser validates server authenticity through a trusted Certificate Authority (CA). | Public-key cryptography |
| **② Key Exchange** | The browser creates a common session key, encrypts it using the server's public key, and sends it. The server decrypts it using its own private key. | Public-key cryptography |
| **③ Data Communication** | All subsequent webpage data is encrypted and transferred using the shared common key. | Common-key cryptography |

**Why Combine Both Methods?**
- **Public-key cryptography** excels at **sharing keys safely** over an insecure network without prior secrets.
- **Common-key cryptography** is computationally much faster, making it ideal for **exchanging large amounts of data quickly**.
- By combining them, HTTPS achieves the highest security during key agreement while maintaining maximum transmission speed for webpage content.`,
        content_ar: `في كل مرة تسجل فيها الدخول إلى تطبيق بنكي، أو تشتري منتجاً عبر الإنترنت، أو تتصفح موقعاً يظهر بجواره قفل صغير في شريط العنوان، تعمل تقنيات التشفير في الخفاء لحماية بياناتك.

**بروتوكول HTTPS (HTTP Secure)** هو إضافة لتشفير TLS إلى بروتوكول HTTP المعتاد. وهو يحمي المستخدمين من ثلاثة تهديدات رئيسية:
- **التنصت (Eavesdropping):** تشفير المحتوى بحيث لا يستطيع أي طرف ثالث قراءته.
- **التلاعب (Tampering):** اكتشاف أي تعديل غير مصرح به على البيانات أثناء النقل.
- **الانتحال (Impersonation):** إثبات أن الموقع حقيقي وليس موقعاً احتيالياً مزيفاً.

تُسمى إجراءات إنشاء هذا الاتصال الآمن **مصافحة TLS (TLS Handshake)**، وتمر بثلاث مراحل رئيسية:

| المرحلة | ماذا يحدث؟ | طريقة التشفير المستخدمة |
|---|---|---|
| **① الاتصال (Connection)** | يرسل خادم الويب شهادته الرقمية ومفتاحه العام إلى المتصفح. يتحقق المتصفح من صحة وهوية الخادم عبر سلطة الشهادات (CA). | التشفير بالمفتاح العام |
| **② تبادل المفاتيح (Key Exchange)** | يُنشئ المتصفح مفتاحاً مشتركاً للجلسة، ويقوم بتشفيره باستخدام المفتاح العام للخادم ويرسله. يقوم الخادم بفك تشفيره بمفتاحه الخاص. | التشفير بالمفتاح العام |
| **③ نقل البيانات (Data Communication)** | يتم تشفير كافة بيانات الجلسة اللاحقة وتبادلها بسرعة باستخدام المفتاح المشترك المتفق عليه. | التشفير بالمفتاح المشترك (المتماثل) |

**لماذا يتم الجمع بين الطريقتين؟**
- يُستخدم **التشفير بالمفتاح العام** لـ **«مشاركة المفاتيح بأمان»** عبر شبكة غير آمنة دون الحاجة لاتفاق مسبق.
- يُستخدم **التشفير بالمفتاح المشترك (المتماثل)** لـ **«تبادل كميات ضخمة من البيانات بسرعة فائقة»**.
- هذا التقسيم الذكي للأدوار يحقق الأمان المطلق والكفاءة والسرعة العالية معاً.`,
      },
      {
        heading_en: "2. Use of Authentication in Real Services",
        heading_ar: "2. استخدام المصادقة في الخدمات الفعلية",
        content_en: `When only a single factor is used for authentication (such as a password alone), an attacker who steals or guesses that factor instantly gains full access. To prevent unauthorized logins, modern systems implement **Multi-Factor Authentication (MFA)**, combining two or more of the three fundamental authentication factors:

1. **Knowledge (Something you know):** Passwords, PIN codes, secret answers.
2. **Possession (Something you have):** Smartphone receiving an OTP or SMS, security token, smart card.
3. **Biometrics (Something you are):** Fingerprint scan, facial recognition, iris scan.

**Why Multi-Factor Authentication Protects Accounts:**
If a password leaks on the dark web, an attacker attempting to log in will still be blocked because they do not physically possess the victim's smartphone to provide the one-time authentication code.

**Real-World Examples of Multi-Factor Authentication:**

| Service | Factor 1 | Factor 2 | Factor Types |
|---|---|---|---|
| **Online Banking** | Password | One-time password (OTP) | Knowledge + Possession |
| **Social Media Login** | Password | SMS confirmation code | Knowledge + Possession |
| **Company Laptop Login** | Smart card | Fingerprint scan | Possession + Biometric |
| **E-Commerce Checkout** | Account Password | 3-D Secure one-time code | Knowledge + Possession |

*Exam Note:* Setting two passwords does NOT constitute multi-factor authentication; it is two-step verification using the same factor (knowledge). True MFA requires factors from different categories.`,
        content_ar: `عند الاعتماد على عامل مصادقة واحد فقط (مثل كلمة المرور وحدها)، يمكن للمخترق الوصول الكامل فور تسرب كلمة المرور أو تخمينها. لذلك، تعتمد الخدمات الحديثة **المصادقة متعددة العوامل (MFA)**، والتي تجمع بين عاملين أو أكثر من الفئات الثلاث التالية:

1. **المعرفة (شيء تعرفه):** كلمات المرور، رموز PIN، الإجابات السرية.
2. **الحيازة (شيء تمتلكه):** هاتف محمول يستقبل رمز OTP أو SMS، بطاقة ذكية، جهاز أمني.
3. **السمات الحيوية (شيء أنت عليه):** بصمة الإصبع، التعرف على الوجه، بصمة قزحية العين.

**لماذا تحمي المصادقة متعددة العوامل الحسابات؟**
إذا تسربت كلمة المرور (عامل المعرفة)، فلن يستطيع المهاجم تسجيل الدخول لأنه لا يمتلك هاتف المستخدم (عامل الحيازة) لتأكيد الإشعار أو إدخال الرمز المؤقت، وبذلك يظل الحساب آمناً.

**أمثلة واقعية على المصادقة متعددة العوامل في الخدمات:**

| الخدمة | العامل الأول | العامل الثاني | فئات العوامل المستخدمة |
|---|---|---|---|
| **الخدمات المصرفية عبر الإنترنت** | كلمة المرور | رمز مرور لمرة واحدة (OTP) | معرفة + حيازة |
| **تسجيل الدخول لشبكات التواصل** | كلمة المرور | رسالة تأكيد نصية (SMS) | معرفة + حيازة |
| **حاسوب العمل المؤسسي** | بطاقة ذكية | مصادقة ببصمة الإصبع | حيازة + سمة حيوية |
| **الشراء عبر المتاجر الإلكترونية** | كلمة مرور الحساب | رمز مؤقت عبر 3-D Secure | معرفة + حيازة |

*تنبيه هام للامتحان:* تعيين كلمتي مرور مختلفتين لا يُعتبر مصادقة متعددة العوامل، لأن كلتيهما تنتميان لنفس الفئة (المعرفة). المصادقة المتعددة تشترط الجمع بين فئات مختلفة تماماً.`,
      },
      {
        heading_en: "3. Combinations of Security Technologies",
        heading_ar: "3. الجمع بين تقنيات الأمان المتعددة",
        content_en: `True cybersecurity is never achieved by relying on a single technology. Online platforms combine multiple layered technologies to counter distinct attack vectors simultaneously.

| Security Technology | Primary Effect & Protection |
|---|---|
| **Encryption (Public-key & Common-key)** | Prevents communication content from being read or intercepted by third parties (Confidentiality). |
| **Digital Certificate** | Verifies through a trusted Certificate Authority that the destination server is genuine (Authenticity). |
| **Digital Signature** | Detects data tampering or sender impersonation, and provides **non-repudiation** (Integrity & Accountability). |
| **Multi-Factor Authentication (MFA)** | Prevents unauthorized account takeovers even if login credentials leak (Access Control). |

**Scenario: A Complete Secure Online Shopping Flow:**
1. **Accessing the Site:** The browser opens an HTTPS connection; encryption prevents eavesdropping on your session.
2. **Verifying the Store:** The browser validates the store's digital certificate to confirm you are not on a spoofed phishing website.
3. **User Authentication:** When logging into your customer account, MFA (password + phone code) prevents unauthorized access.
4. **Submitting Order & Payment:** A digital signature verifies order details and provides non-repudiation so neither party can deny the transaction.

By layering these technologies, organizations protect systems against eavesdropping, tampering, impersonation, and unauthorized login all at once.`,
        content_ar: `لا يتحقق الأمان السيبراني الفعلي بالاعتماد على تقنية واحدة منعزلة، بل بدمج طبقات أمنية متكاملة تتصدى لمختلف التهديدات في آن واحد.

| تقنية الأمان | التأثير الأمني والحماية المقدمة |
|---|---|
| **التشفير (المفتاح العام والمتماثل)** | يمنع قراءة محتوى الاتصال أو اعتراضه من قِبل أي طرف ثالث (السرية). |
| **الشهادة الرقمية** | تثبت عبر سلطة الشهادات الموثوقة أن خادم الوجهة حقيقي وليس موقعاً وهمياً (المصادقة). |
| **التوقيع الرقمي** | يكشف أي تلاعب بالبيانات أو انتحال لمرسلها، ويوفر خاصية **عدم الإنكار** (السلامة والمسؤولية). |
| **المصادقة متعددة العوامل (MFA)** | تمنع عمليات تسجيل الدخول غير المصرح بها حتى لو تسربت كلمة المرور (التحكم بالوصول). |

**سيناريو واقعي: دورة الشراء الآمن في متجر إلكتروني:**
1. **دخول الموقع:** يبدأ اتصال HTTPS، ويقوم التشفير بمنع التنصت على ما تتصفحه.
2. **التحقق من المتجر:** يفحص المتصفح الشهادة الرقمية ليتأكد من أنك في المتجر الحقيقي وليس موقع تصيد احتيالي.
3. **تسجيل الدخول:** تطلب المنصة كلمة المرور ورمز هاتف (MFA) لمنع سرقة حسابك.
4. **تأكيد الطلب والدفع:** يُستخدم التوقيع الرقمي لتأكيد بيانات الطلب وكشف أي تعديل، وضمان عدم إنكار العملية لاحقاً.

من خلال دمج هذه التقنيات، تتم مواجهة تهديدات التنصت، والتلاعب، والانتحال، والدخول غير المشروع في وقت واحد.`,
      },
    ],
    pause_and_think: [
      {
        q_en: "If a password is leaked, why can a second factor sent to a phone still keep the account safe?",
        q_ar: "إذا تسربت كلمة المرور، فلماذا يمكن لعامل ثانٍ يُرسل إلى الهاتف أن يحافظ على أمان الحساب؟",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Explain why HTTPS uses public-key cryptography to share the key safely, but common-key cryptography to exchange webpage data. Refer to: security and speed.",
        q_ar: "اشرح لماذا يستخدم بروتوكول HTTPS التشفير بالمفتاح العام لمشاركة المفتاح بأمان، بينما يستخدم التشفير بالمفتاح المشترك (المتماثل) لنقل البيانات. استند إلى: الأمان والسرعة.",
        type: "WRITTEN",
      },
      {
        q_en: "Which of the following is NOT an appropriate example of multi-factor authentication? A) Password + Smartphone notification, B) Password + Secret question, C) Fingerprint + Smart card, D) Password + SMS authentication.",
        q_ar: "أي من الخيارات التالية لا يمثل مثالاً صحيحاً على المصادقة متعددة العوامل؟ أ) كلمة مرور + إشعار هاتف، ب) كلمة مرور + سؤال سري، ج) بصمة إصبع + بطاقة ذكية، د) كلمة مرور + رمز رسالة نصية قصيرة.",
        type: "MCQ",
      },
    ],
  },

  // ==================== LESSON 2-2 ====================
  {
    id: "2-2",
    unit: 2,
    lesson_number: "2-2",
    title_en: "Network Security Design",
    title_ar: "تصميم أمان الشبكات",
    learning_objectives_en: [
      "Explain the roles of firewalls, VPNs, and DMZs in protecting a network.",
      "Describe defense in depth and zero trust, and explain why layered, verified access is stronger than a single barrier.",
    ],
    learning_objectives_ar: [
      "شرح أدوار جدران الحماية، والشبكات الافتراضية الخاصة (VPN)، والمناطق المعزولة (DMZ) في حماية الشبكة.",
      "وصف مفهوم الدفاع في العمق وانعدام الثقة (Zero Trust)، وشرح سبب كون الوصول متعدد الطبقات والمتحقق منه أقوى من حاجز أمني منفرد.",
    ],
    key_terms: [
      {
        term_en: "Firewall",
        term_ar: "جدار الحماية",
        def_en: "A security system installed at the entry/exit point of a network that allows or denies communication based on preset security rules.",
        def_ar: "نظام أمني يُثبَّت عند نقطة الدخول والخروج للشبكة، يسمح بحركة المرور أو يمنعها وفقاً لقواعد أمنية محددة مسبقاً.",
      },
      {
        term_en: "VPN (Virtual Private Network)",
        term_ar: "الشبكة الافتراضية الخاصة (VPN)",
        def_en: "A technology that creates an encrypted virtual private tunnel over the Internet, enabling secure remote connections to a network.",
        def_ar: "تقنية تُنشئ نفقاً افتراضياً خاصاً مشفراً عبر الإنترنت، يتيح الاتصال الآمن بشبكة المؤسسة من مواقع بعيدة.",
      },
      {
        term_en: "DMZ (Demilitarized Zone)",
        term_ar: "المنطقة المعزولة (DMZ)",
        def_en: "A network segment where servers exposed to external access (web, mail) are isolated separately from the organization's internal network.",
        def_ar: "منطقة شبكية توضع فيها الخوادم المعرضة للشبكة الخارجية (كالويب والبريد) بشكل معزول ومفصول عن الشبكة الداخلية للمؤسسة.",
      },
      {
        term_en: "Defense in Depth",
        term_ar: "الدفاع في العمق",
        def_en: "The strategy of layering multiple security measures so that if one defensive layer is breached, subsequent layers still protect the system.",
        def_ar: "استراتيجية تطبيق تدابير أمنية متعددة الطبقات بحيث إذا تم اختراق طبقة دفاعية، تتولى الطبقات التالية حماية النظام.",
      },
      {
        term_en: "Zero Trust",
        term_ar: "انعدام الثقة (Zero Trust)",
        def_en: "A modern security paradigm stating that the system never trusts any communication by default, even from within the network, and always verifies every access request.",
        def_ar: "مفهوم أمني حديث يقضي بعدم الوثوق بأي اتصال أو طلب وصول بشكل افتراضي، حتى لو كان من داخل الشبكة، والتحقق المستمر من كل وصول.",
      },
      {
        term_en: "Perimeter",
        term_ar: "المحيط الأمني التقليدي",
        def_en: "The traditional security boundary assuming everything inside is safe and everything outside is dangerous, which cloud and remote work have blurred.",
        def_ar: "الحدود الأمنية التقليدية القائمة على افتراض أن 'الداخل آمن والخارج خطر'، والتي تلاشت مع انتشار الحوسبة السحابية والعمل عن بعد.",
      },
    ],
    sections: [
      {
        heading_en: "1. The Role of Firewalls",
        heading_ar: "1. دور جدار الحماية (Firewall)",
        content_en: `An organization's network contains highly sensitive assets: employee databases, confidential financial records, and operational servers. A single lock on the front door is not enough, because if an attacker picks it, the entire infrastructure becomes exposed.

A **Firewall** is a foundational security barrier installed at the network's entry and exit points. It acts as an inspector, screening incoming and outgoing data packets against predetermined rules:
- **Rule Example:** Allow external web traffic (port 80/443) directed toward the public web server.
- **Rule Example:** Block all direct external inbound traffic directed toward internal database servers.

By enforcing these strict access lists, firewalls prevent unauthorized external traffic from freely roaming inside the internal network.`,
        content_ar: `تحتوي شبكة أي مؤسسة على أصول بالغة الحساسية: قواعد بيانات العملاء، والسجلات المالية، والخوادم التشغيلية. والاعتماد على قفل واحد عند المدخل لا يكفي، لأنه إذا تم اختراقه تنكشف جميع موارد المؤسسة.

**جدار الحماية (Firewall)** هو نظام أمني يوضع عند نقاط الدخول والخروج للشبكة. ويعمل كحارس يراقب حزم البيانات الصادرة والواردة ويفحصها وفقاً لقواعد محددة مسبقاً:
- **مثال على قاعدة:** السماح بحركة مرور الويب الخارجية الموجهة لخادم الويب العام.
- **مثال على قاعدة:** حظر ومنع أي وصول خارجي مباشر إلى خوادم قواعد البيانات الداخلية.

من خلال فرض هذه القواعد الصارمة، يمنع جدار الحماية المتسللين من الدخول غير المصرح به إلى داخل الشبكة.`,
      },
      {
        heading_en: "2. Virtual Private Network (VPN)",
        heading_ar: "2. الشبكة الافتراضية الخاصة (VPN)",
        content_en: `When employees connect over public networks (like public Wi-Fi in cafes or home broadband), traffic can easily be intercepted. 

A **VPN (Virtual Private Network)** establishes an **encrypted virtual tunnel** across the public Internet:
- **Remote Work:** Staff working remotely can securely log in to the organization's intranet as if they were physically sitting in the office.
- **Connecting Branches:** Safely links headquarters with branch offices across different cities without paying for expensive private physical cables.
- **Wi-Fi Protection:** Encrypts communication packets end-to-end, dramatically reducing the threat of eavesdropping on untrusted public Wi-Fi networks.`,
        content_ar: `عندما يتصل الموظفون بالشبكة من منازلهم أو عبر شبكات عامة (مثل مقاهي الإنترنت)، تصبح البيانات عرضة للاعتراض والتنصت.

تقوم **الشبكة الافتراضية الخاصة (VPN)** بإنشاء **خط افتراضي خاص مشفر (نفق آمن)** عبر شبكة الإنترنت العامة:
- **العمل عن بُعد:** يتيح للموظفين الاتصال الآمن بشبكة مؤسستهم واستخدام مواردها كأنهم متواجدون داخل مقر العمل.
- **ربط الفروع:** ربط المكاتب والفروع الجغرافية المتباعدة بمركز المؤسسة بأمان تام ودون الحاجة لتمديد كابلات خاصة باهظة التكلفة.
- **الحماية عبر الشبكات العامة:** تشفير حركة المرور بالكامل يقلل من مخاطر التنصت وسرقة البيانات حتى عند الاتصال بشبكات Wi-Fi العامة غير الموثوقة.`,
      },
      {
        heading_en: "3. Demilitarized Zone (DMZ)",
        heading_ar: "3. المنطقة المعزولة (DMZ)",
        content_en: `Public-facing servers (such as company web servers and email gateways) must inevitably be accessible to anyone on the Internet, making them primary targets for attacks.

A **DMZ (Demilitarized Zone)** is an isolated subnetwork positioned between the hostile external Internet and the trusted internal network:
- Public web and mail servers are hosted inside the DMZ.
- Sensitive databases and internal workstations reside deep inside the internal network behind a second firewall barrier.
- **Containment Benefit:** Even if an attacker completely compromises the public web server, the DMZ's isolation prevents them from leaping directly into the internal network or downloading customer databases.`,
        content_ar: `خوادم الويب العامة وبوابات البريد الإلكتروني للمؤسسة يجب أن تكون متاحة للجمهور عبر الإنترنت، مما يجعلها الهدف الأول لهجمات المخترقين.

**المنطقة المعزولة (DMZ)** هي منطقة شبكية وسيطة ومعزولة تقع بين الإنترنت الخارجي المفتوح والشبكة الداخلية المحمية:
- توضع فيها الخوادم الموجهة للجمهور (خوادم الويب وخوادم البريد).
- تظل قواعد البيانات الحساسة وأجهزة الموظفين في الشبكة الداخلية خلف حاجز جدار حماية آخر.
- **فائدة الاحتواء:** إذا نجح مهاجم في اختراق خادم الويب العام، فإن عزله داخل الـ DMZ يمنعه من الوصول مباشرة إلى الشبكة الداخلية أو سحب بيانات العملاء الحساسة.`,
      },
      {
        heading_en: "4. Defense in Depth — The 4 Layers",
        heading_ar: "4. استراتيجية الدفاع في العمق — الطبقات الأربع",
        content_en: `**Defense in Depth** is the strategic philosophy of layering multiple defensive safeguards so that, even if an adversary breaches one measure, the next layer still preserves system integrity.

| Layer | Primary Measure & Technology | Function in Defense in Depth |
|---|---|---|
| **Layer 1: Network Entry** | Firewall | Blocks unauthorized incoming and outgoing connections at network entry points. |
| **Layer 2: Communication Path** | VPN & Encryption | Encrypts network transit data, protecting remote links and branch traffic from snooping. |
| **Layer 3: Server Placement** | DMZ (Demilitarized Zone) | Isolates public-facing servers so internal databases remain untouched if a public server falls. |
| **Layer 4: Endpoints** | Antivirus & OS Updates | Protects individual user devices, desktops, and servers from malware execution and unpatched vulnerabilities. |

*Core Rule:* An organization that layers all four barriers ensures that a single point of failure never exposes its entire digital infrastructure.`,
        content_ar: `**الدفاع في العمق (Defense in Depth)** هو مفهوم تطبيق تدابير أمنية متعددة الطبقات بحيث إذا اختُرقت طبقة أمنية، فإن الطبقة التي تليها تواصل حماية النظام.

| الطبقة الدفاعية | الإجراء والتقنية المستخدمة | الدور في استراتيجية الدفاع في العمق |
|---|---|---|
| **الطبقة 1: مدخل الشبكة** | جدار الحماية (Firewall) | حظر ومنع الاتصالات غير المصرح بها عند مداخل ومخارج الشبكة. |
| **الطبقة 2: مسار الاتصال** | الشبكة الافتراضية الخاصة (VPN) | تشفير مسار نقل البيانات لحماية الموظفين عن بعد وحركة مرور الفروع من التنصت. |
| **الطبقة 3: وضع الخوادم** | المنطقة المعزولة (DMZ) | عزل الخوادم العامة بحيث تظل قواعد البيانات الداخلية محمية حتى لو سقط خادم ويب. |
| **الطبقة 4: الأجهزة الطرفية** | برامج مكافحة الفيروسات وتحديثات النظام | حماية أجهزة المستخدمين والخوادم الفردية من البرمجيات الخبيثة والثغرات غير المعالجة. |

*القاعدة الجوهرية:* المؤسسة التي تطبق هذه الطبقات الأربع تضمن أن اختراق عنصر واحد لن يؤدي إلى انهيار منظومة الأمان بالكامل.`,
      },
      {
        heading_en: "5. The Concept of Zero Trust",
        heading_ar: "5. مفهوم انعدام الثقة (Zero Trust)",
        content_en: `Traditional network security focused on guarding a **perimeter**, operating under the assumption that *"everything inside the organization's office network is safe, and everything outside is hostile."*

**Why Perimeter Defense Broke Down:**
With the explosion of cloud platforms, mobile devices, and remote work, employees access systems from homes, hotels, and cafes. The boundary between "inside" and "outside" has completely blurred. Moreover, internal threats or compromised inside laptops can move laterally if trusted implicitly.

**The Zero Trust Principle:**
**"Never trust, always verify."**
Under Zero Trust, the network does NOT grant trust to any device or user automatically—even when connected directly to the office Ethernet. Every single access request must verify user identity, device posture, and granular authorization rights every time.`,
        content_ar: `اعتمد الأمان التقليدي للشبكات تاريخياً على حماية **المحيط الأمني (Perimeter)**، انطلاقاً من فرضية أن: *«كل ما بداخل شبكة المؤسسة آمن وموثوق، وكل ما خارجها خطير ومعادٍ»*.

**لماذا سقط مفهوم المحيط الأمني التقليدي؟**
مع انتشار الحوسبة السحابية والعمل عن بعد، بات الموظفون يدخلون على الأنظمة من المنازل والمقاهي والسفر. ونتيجة لذلك، تلاشت الحدود الفاصلة بين 'الداخل' و'الخارج'. بالإضافة إلى ذلك، فإن منح الثقة التلقائية للأجهزة الداخلية يتيح لأي جهاز مصاب داخل المؤسسة التحرك بحرية وإصابة باقي الشبكة.

**مبدأ انعدام الثقة (Zero Trust):**
**«لا تثق بأي طرف أبداً، وتحقق دائماً من كل شيء (Never trust, always verify).»**
وفق نهج انعدام الثقة، لا يمنح النظام الثقة لأي جهاز أو مستخدم بشكل مسبق أو تلقائي، حتى لو كان متصلاً من داخل مقر المؤسسة. بل يتم التحقق الصارم من الهوية وصلاحيات الوصول مع كل طلب اتصال على حدة.`,
      },
    ],
    pause_and_think: [
      {
        q_en: "Why is it safer to place a public web server in a DMZ rather than inside the internal network?",
        q_ar: "لماذا يعد وضع خادم ويب عام في منطقة معزولة (DMZ) أكثر أماناً من وضعه داخل الشبكة الداخلية للمؤسسة؟",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Explain why layering several security measures (defense in depth) protects an organization better than relying on a firewall alone. Refer to: what happens if one measure is breached.",
        q_ar: "اشرح لماذا يوفر تطبيق تدابير أمنية متعددة الطبقات (الدفاع في العمق) حماية أفضل للمؤسسة مقارنة بالاعتماد على جدار حماية منفرد. استند إلى: ماذا يحدث إذا تم اختراق أحد التدابير.",
        type: "WRITTEN",
      },
      {
        q_en: "Which of the following is NOT an appropriate use case for a VPN? A) Connecting safely from home to an organization's network, B) Connecting offices in different locations safely, C) Automatically deleting files infected with viruses, D) Encrypting communication content on public Wi-Fi.",
        q_ar: "أي من الخيارات التالية لا يمثل استخداماً مناسباً للشبكة الافتراضية الخاصة (VPN)؟ أ) الاتصال الآمن من المنزل بشبكة المؤسسة، ب) ربط المكاتب في مواقع مختلفة بأمان، ج) الحذف التلقائي للملفات المصابة بالفيروسات، د) تشفير محتوى الاتصال عبر شبكات Wi-Fi العامة.",
        type: "MCQ",
      },
    ],
  },

  // ==================== LESSON 2-3 ====================
  {
    id: "2-3",
    unit: 2,
    lesson_number: "2-3",
    title_en: "Incident Response and Risk Management",
    title_ar: "الاستجابة للحوادث وإدارة المخاطر",
    learning_objectives_en: [
      "Explain what a security incident is and describe the stages of incident response in the correct order.",
      "Apply the idea of risk assessment by prioritizing risks according to their impact and likelihood.",
    ],
    learning_objectives_ar: [
      "شرح مفهوم الحادث الأمني ووصف مراحل الاستجابة للحوادث بالترتيب الصحيح.",
      "تطبيق فكرة تقييم المخاطر من خلال تحديد أولويات المخاطر وفقاً لتأثيرها واحتمالية حدوثها.",
    ],
    key_terms: [
      {
        term_en: "Security Incident",
        term_ar: "الحادث الأمني",
        def_en: "A situation in which actual damage occurs due to an information security problem.",
        def_ar: "حالة يحدث فيها ضرر أو خسارة فعلية نتيجة مشكلة في أمان المعلومات.",
      },
      {
        term_en: "Incident Response: 6 Stages",
        term_ar: "المراحل الست للاستجابة للحوادث",
        def_en: "The ordered procedure for handling security incidents: Preparation → Detection → Containment → Eradication → Recovery → Prevention of Recurrence.",
        def_ar: "الإجراءات المرتبة للتعامل مع الحوادث الأمنية: الاستعداد → الاكتشاف → الاحتواء → الاستئصال → الاستعادة → منع التكرار.",
      },
      {
        term_en: "Containment",
        term_ar: "الاحتواء",
        def_en: "Limiting the scope of impact and isolating compromised systems so damage does not spread further across the network.",
        def_ar: "حصر نطاق الأثر وعزل الأنظمة والأجهزة المصابة حتى لا يتفشى الضرر وينتشر لباقي أجهزة الشبكة.",
      },
      {
        term_en: "Eradication",
        term_ar: "الاستئصال (إزالة التهديد)",
        def_en: "Removing the root cause of the security incident, such as deleting malware and eliminating system backdoors.",
        def_ar: "إزالة السبب الجذري للحادث الأمني بشكل كامل، مثل حذف البرمجيات الخبيثة وإغلاق الثغرات المستغلة.",
      },
      {
        term_en: "Risk",
        term_ar: "المخاطرة",
        def_en: "The possibility of an information security problem occurring in the future, and its potential impact.",
        def_ar: "احتمال وقوع مشكلة في أمان المعلومات مستقبلاً، وحجم الأثر أو الضرر المترتب عليها.",
      },
      {
        term_en: "Impact",
        term_ar: "التأثير",
        def_en: "How much damage or loss occurs if the risk actually materializes.",
        def_ar: "مقدار وحجم الضرر أو الخسارة الناتجة إذا تحققت المخاطرة بالفعل.",
      },
      {
        term_en: "Likelihood",
        term_ar: "الاحتمالية",
        def_en: "How probable it is that the security risk will actually occur.",
        def_ar: "مدى احتمال أو نسبة إمكانية وقوع المخاطرة الأمنية في الواقع.",
      },
      {
        term_en: "Risk Evaluation Matrix",
        term_ar: "مصفوفة تقييم المخاطر",
        def_en: "A tool that prioritizes risks based on the formula: Risk Size = Impact × Likelihood, addressing high-impact, high-likelihood risks first.",
        def_ar: "أداة لتحديد أولويات معالجة المخاطر بالمعادلة: حجم الخطر = التأثير × الاحتمالية، مع البدء بالمخاطر ذات التأثير المرتفع والاحتمالية المرتفعة أولاً.",
      },
    ],
    sections: [
      {
        heading_en: "1. What is a Security Incident?",
        heading_ar: "1. ما هو الحادث الأمني؟",
        content_en: `Even in well-defended environments, security breaches can happen. A **Security Incident** is defined as a situation in which actual damage occurs due to an information security problem.

When an incident occurs, chaotic, unorganized reactions make the damage much worse. Organizations must recognize the distinct types of security incidents:

| Incident Type | Description & Example |
|---|---|
| **Information Leak (Data Breach)** | Personal information, passwords, or proprietary customer data is exposed or leaked to unauthorized external parties. |
| **Data Tampering** | System databases, customer balances, or web pages are maliciously altered without authorization. |
| **Service Outage** | Critical servers or websites become unresponsive and unavailable due to DoS attacks, server crashes, or hardware failure. |
| **Ransomware Infection** | Malicious software encrypts organizational files and locks access, demanding a ransom to restore operations. |`,
        content_ar: `حتى مع أفضل أنظمة الحماية، قد تقع خروقات أمنية. ويُعرَّف **الحادث الأمني (Security Incident)** بأنه: حالة يحدث فيها ضرر أو خسارة فعلية نتيجة مشكلة في أمان المعلومات.

عند وقوع حادث أمني، فإن التصرف العشوائي غير المخطط له يزيد من حجم الكارثة. وتنقسم الحوادث الأمنية إلى أنواع نموذجية واضحة:

| نوع الحادث الأمني | الوصف والأمثلة |
|---|---|
| **تسريب المعلومات (Data Leak)** | خروج وتسريب معلومات شخصية أو بيانات سرية خاصة بالعملاء إلى أطراف خارجية غير مصرح بها. |
| **التلاعب بالبيانات (Data Tampering)** | تعديل وتغيير البيانات داخل النظام دون تصريح (مثل تعديل درجات الطلاب أو الأرصدة البنكية). |
| **انقطاع الخدمة (Service Outage)** | توقف خوادم أو مواقع المؤسسة عن العمل وعجز المستخدمين عن الوصول إليها نتيجة هجمات حجب الخدمة أو تعطل الخادم. |
| **الإصابة ببرمجيات الفدية (Ransomware)** | تشفير ملفات المؤسسة وقفل الوصول إليها ومطالبة الضحية بدفع فدية مالية لاستعادة البيانات. |`,
      },
      {
        heading_en: "2. The Flow of Incident Response — The 6 Ordered Stages",
        heading_ar: "2. خطوات الاستجابة للحوادث — المراحل الست بالترتيب",
        content_en: `When a security incident strikes, an organization must progress through **six ordered stages**:

| Stage Number & Name | Key Actions in this Stage | Critical Practical Example |
|---|---|---|
| **① Preparation** | Establish emergency procedures, train incident teams, and create backups in advance. | Creating offline backup policies and incident communication contacts before an attack occurs. |
| **② Detection** | Discover and confirm that an anomaly is indeed a security breach. | Network monitoring alarms detect massive unauthorized data outbound traffic. |
| **③ Containment** | Limit the blast radius and scope of impact so damage does not spread further. | **Immediately disconnecting the infected workstation from the network** to stop malware propagation. |
| **④ Eradication** | Completely remove the root cause of the incident. | Scanning all systems, deleting malware executables, and patching the exploited vulnerability. |
| **⑤ Recovery** | Restore systems and operational services to a safe, normal operational state. | Restoring clean data files from known uninfected backups and verifying system health. |
| **⑥ Prevention of Recurrence** | Conduct root cause analysis and upgrade safeguards so the incident never repeats. | Documenting lessons learned, retraining staff against phishing, and enforcing tighter firewall rules. |

**Why Strict Order Matters:**
- **Containment must precede Eradication:** You must isolate the infected system first; otherwise, while you spend time analyzing malware, the virus spreads across the entire network.
- **Eradication must precede Recovery:** If you restore systems from backup *before* removing the malware or patching the backdoor, the attacker or virus will immediately re-infect the restored system!`,
        content_ar: `عند وقوع حادث أمني، تتبع المؤسسة مساراً منظماً يتكون من **ست مراحل مرتبة تسلسلياً**:

| رقم واسم المرحلة | الإجراءات الرئيسية في هذه المرحلة | مثال عملي وتطبيقي |
|---|---|---|
| **① التحضير والتعيين (Preparation)** | وضع خطط الطوارئ وتشكيل فرق الاستجابة وإنشاء النسخ الاحتياطية مسبقاً. | إعداد سياسات النسخ الاحتياطي وتحديد مسؤوليات الفريق قبل وقوع أي حادث. |
| **② الاكتشاف (Detection)** | اكتشاف وتأكيد وقوع حادث أمني حقيقي عبر أنظمة المراقبة والإنذار. | إطلاق جرس إنذار عند ملاحظة محاولات متكررة لاختراق خادم الشركة. |
| **③ الاحتواء (Containment)** | حصر نطاق الضرر وعزل الجزء المتأثر حتى لا ينتشر الأثر لباقي الأجهزة. | **فصل الحاسوب المصاب عن الشبكة فوراً** لمنع انتقال الفيروس لباقي الحواسيب. |
| **④ الاستئصال وإزالة التهديد (Eradication)** | القضاء التام على مسببات الحادث وسد الثغرات المستغلة. | حذف البرمجيات الخبيثة وتطهير النظام وإغلاق المنافذ المفتوحة. |
| **⑤ الاستعادة (Recovery)** | إعادة تشغيل الأنظمة والخدمات إلى وضعها الطبيعي والآمن. | استرجاع البيانات النظيفة من النسخ الاحتياطية الموثوقة والتأكد من استقرار الخدمة. |
| **⑥ منع التكرار والدروس المستفادة (Prevention of Recurrence)** | تحليل الأسباب وتوثيق الدروس وتحديث الضوابط لمنع تكرار الحادث. | توثيق كيفية حدوث الاختراق، وتدريب الموظفين، وتشديد سياسات كلمات المرور وجدار الحماية. |

**لماذا الترتيب التسلسلي حاسم؟**
- **الاحتواء يجب أن يسبق الاستئصال:** لأن عزل الجهاز المصاب يوقف انتشار العدوى لباقي الشبكة فوراً بينما يتم البحث عن سبب المشكلة.
- **الاستئصال يجب أن يسبق الاستعادة:** لأنك إذا استعدت النظام من النسخة الاحتياطية قبل حذف الفيروس وسد الثغرة، فسيصاب النظام النظيف مجدداً فور استرجاعه!`,
      },
      {
        heading_en: "3. The Concept of Risk Assessment",
        heading_ar: "3. مفهوم تقييم المخاطر وتحديد الأولويات",
        content_en: `An organization cannot eliminate all risks simultaneously because financial and human resources are finite. Therefore, organizations prioritize risks systematically using **Risk Assessment**.

**The Risk Sizing Formula:**
$$\\text{Risk Size} = \\text{Impact} \\times \\text{Likelihood}$$

1. **Impact:** How much financial, operational, or legal damage occurs if the risk actually materializes.
2. **Likelihood:** How probable it is that the security threat will actually occur.

**The Risk Evaluation Matrix:**

| | **Likelihood: Low (1)** | **Likelihood: Medium (2)** | **Likelihood: High (3)** |
|---|---|---|---|
| **Impact: Large (3)** | Medium Priority (3) | High Priority (6) | **TOP PRIORITY (9) — Address First!** |
| **Impact: Medium (2)** | Low Priority (2) | Medium Priority (4) | High Priority (6) |
| **Impact: Small (1)** | Lowest Priority (1) | Low Priority (2) | Medium Priority (3) |

**Decision Rule:** Risks scoring highest in both **Impact and Likelihood** receive top budget and immediate mitigation. Teams systematically work downward from the top-priority quadrant.`,
        content_ar: `لا تستطيع أي مؤسسة معالجة كافة المخاطر الأمنية في وقت واحد، لأن الموارد البشرية والمالية محدودة. لذلك، تعتمد المؤسسات أسلوباً علمياً لتحديد الأولويات يُعرف بـ **تقييم المخاطر (Risk Assessment)**.

**معادلة حساب حجم الخطر:**
$$\\text{حجم الخطر} = \\text{التأثير} \\times \\text{الاحتمالية}$$

1. **التأثير (Impact):** مقدار وحجم الضرر أو الخسارة التي تقع في حال تحقق الخطر فعلياً.
2. **الاحتمالية (Likelihood):** مدى احتمال أو نسبة تكرار وقوع هذا الخطر في الواقع.

**مصفوفة تقييم المخاطر وتحديد الأولويات:**

| | **احتمالية منخفضة (1)** | **احتمالية متوسطة (2)** | **احتمالية مرتفعة (3)** |
|---|---|---|---|
| **تأثير كبير (3)** | أولوية متوسطة (3) | أولوية عالية (6) | **الأولوية القصوى (9) — تُعالج أولاً!** |
| **تأثير متوسط (2)** | أولوية منخفضة (2) | أولوية متوسطة (4) | أولوية عالية (6) |
| **تأثير صغير (1)** | أدنى أولوية (1) | أولوية منخفضة (2) | أولوية متوسطة (3) |

**قاعدة القرار المهنية:** المخاطر التي تجمع بين **تأثير كبير واحتمالية مرتفعة** تُمنح الأولوية القصوى وتُوجَّه إليها الجهود والميزانيات فوراً قبل غيرها.`,
      },
    ],
    pause_and_think: [
      {
        q_en: "Why must containment come before eradication in the six-stage incident response?",
        q_ar: "لماذا يجب أن تسبق مرحلة الاحتواء مرحلة الاستئصال في الاستجابة للحوادث المكونة من 6 مراحل؟",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Explain why the six stages of incident response must be carried out in order, using recovery and eradication as an example. Refer to: what happens if the cause is not removed.",
        q_ar: "اشرح لماذا يجب تنفيذ المراحل الست للاستجابة للحوادث بالترتيب، مستعيناً بمرحلتي الاستعادة والاستئصال كمثال. استند إلى: ماذا يحدث إذا لم يتم إزالة السبب أولاً.",
        type: "WRITTEN",
      },
      {
        q_en: "Which of the following is NOT an appropriate example of a security incident? A) Data was encrypted by a ransomware infection, B) Customer information was leaked through unauthorized access, C) A software update was performed to add new features, D) A web service became unavailable due to a server attack.",
        q_ar: "أي من الخيارات التالية لا يمثل مثالاً على حادث أمني؟ أ) تشفير البيانات بواسطة برمجية فدية خبيثة، ب) تسريب بيانات العملاء عبر وصول غير مصرح به، ج) إجراء تحديث للبرنامج لإضافة ميزات جديدة، د) توقف خدمة ويب بسبب هجوم على الخادم.",
        type: "MCQ",
      },
    ],
  },
'''

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import for OFFICIAL_ASSESSMENTS_UNIT2 if not present
if 'OFFICIAL_ASSESSMENTS_UNIT2' not in content:
    import_stmt = "import { OFFICIAL_ASSESSMENTS_UNIT2 } from './officialAssessments_Unit2';\n"
    content = content.replace("import { CHAPTER1_WORKSHOP_QUESTIONS } from './chapter1WorkshopQuestions';", "import { CHAPTER1_WORKSHOP_QUESTIONS } from './chapter1WorkshopQuestions';\n" + import_stmt)

# 2. Insert Unit 2 lessons into LESSONS array (before the end of LESSONS array)
# Find the end of LESSONS array: `export const QUIZ_QUESTIONS: QuizQuestion[] = [`
marker = "// ==================== ALL QUIZ QUESTIONS ===================="
if marker in content:
    # Find the closing bracket before this marker
    pos = content.find(marker)
    bracket_pos = content.rfind("];", 0, pos)
    if bracket_pos != -1:
        content = content[:bracket_pos] + unit2_lessons_code + "\n];\n\n" + content[pos:]

# 3. Add OFFICIAL_ASSESSMENTS_UNIT2 into QUIZ_QUESTIONS array
if '...OFFICIAL_ASSESSMENTS_UNIT2' not in content:
    content = content.replace("export const QUIZ_QUESTIONS: QuizQuestion[] = [", "export const QUIZ_QUESTIONS: QuizQuestion[] = [\n  ...OFFICIAL_ASSESSMENTS_UNIT2,")

with open('frontend/src/courseData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated frontend/src/courseData.ts successfully!')
