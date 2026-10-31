# -*- coding: utf-8 -*-
"""
Script to update frontend/src/ch2_lesson2_hardQ_part2.ts with full English translations
"""

content = '''// ============================================================
// Ch2 · Lesson 2 · Part 2 — أسئلة تحديات متقدمة ونمط الامتحان
// استراتيجية الدفاع في العمق · طبقات الحماية الأربع · نهج انعدام الثقة · المحيط الأمني
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية متقدمة — الجزء الثاني ───────────────────────────

export const CH2_L2_HARD_WRITTEN_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-HARD-W-P2-01',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 6,
    question_ar:
      'سؤال كتاب الوزارة الموسع (ص 46): شركة لديها موقع ويب عام، وموظفون يعملون عن بُعد، وقاعدة بيانات عملاء سرية.\\n'
      + '1. رتّب طبقات الدفاع في العمق الأربع من الأكثر حيوية إلى الأقل حيوية بالنسبة لحماية قاعدة البيانات السرية، وبرر اختيارك للطبقة الأولى.\\n'
      + '2. اذكر سببين يوضحان لماذا يُعد التصميم متعدد الطبقات أكثر أماناً من الاكتفاء بجدار حماية منفرد.',
    question_en:
      'Comprehensive Ministry Textbook Problem (p. 46): A company operates a public-facing website, remote telecommuting staff, and a confidential customer database.\\n'
      + '1. Prioritize the four Defense in Depth layers from most vital to least vital with respect to safeguarding the confidential database, justifying your top selection.\\n'
      + '2. State two explicit reasons why a multi-echelon design is fundamentally more secure than relying exclusively on a solitary firewall.',
    ideal_answer_ar:
      '1. الترتيب حسب الأولوية لحماية قاعدة البيانات:\\n'
      + '   • (1) وضع الخوادم (Server Placement / DMZ): التبرير: لأن عزل قاعدة البيانات داخلياً وفصل موقع الويب في DMZ يمنع وصول أي هجوم خارجي مباشرة لقاعدة البيانات حتى لو انهار جدار الحماية الخارجي.\\n'
      + '   • (2) مدخل الشبكة (Network Entry / جدار الحماية).\\n'
      + '   • (3) مسار الاتصال (Communication Path / تشفير VPN).\\n'
      + '   • (4) الأجهزة الطرفية (Endpoints).\\n\\n'
      + '2. سببان لتفوق التصميم متعدد الطبقات:\\n'
      + '   • السبب الأول: منع نقطة الفشل الفردية؛ فاختراق طبقة لا يسقط الشبكة بالكامل بل تصده الطبقات الأخرى.\\n'
      + '   • السبب الثاني: كسب الوقت لكشف المهاجم واحتواء الهجوم وتنبيه الفريق الأمني قبل وصوله للبيانات الحساسة.',
    ideal_answer_en:
      '1. Prioritized Defense Hierarchy for Database Security:\\n'
      + '   • (1) Server Placement / DMZ (Most Vital): Justification: Internal partitioning and isolating the public web daemon in a DMZ physically prevents direct traversal to the database cluster even if the external border firewall is fully penetrated.\\n'
      + '   • (2) Network Ingress / Perimeter Firewalls.\\n'
      + '   • (3) Communication Path / VPN & TLS Encryption.\\n'
      + '   • (4) Endpoint Workstation Hardening.\\n\\n'
      + '2. Two Superiority Drivers of Layered Architecture:\\n'
      + '   • Elimination of Single Point of Failure (SPOF): Subverting a perimeter barrier does not surrender the network; subsequent independent controls immediately arrest adversary momentum.\\n'
      + '   • Defense Time Dilution: Stacking heterogeneous layers slows adversary intrusion, generating audit alerts and affording Security Operations Center (SOC) engineers vital time to isolate the breach.',
    explanation_ar:
      'الشرح: هذا هو تمرين "Think as an Engineer" المعتمد في ص 46 من كتاب الوزارة، والترتيب يعتمد على قرب التدبير الأمني من حماية الأصل المستهدف (قاعدة البيانات).',
    explanation_en:
      'Ministry Textbook exercise (p. 46 "Think as an Engineer"): Prioritization correlates directly with proximity to the core protected asset (the customer database).',
  },
  {
    id: 'CH2-L2-HARD-W-P2-02',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar:
      'سؤال السياق الجديد بكتاب الوزارة (ص 47): مستشفى ينقل سجلات مرضاه إلى خدمة سحابية ويسمح للأطباء بالوصول إليها من منازلهم.\\n'
      + '1. باستخدام انعدام الثقة (Zero Trust) والدفاع في العمق، اقترح إجراءين محددين يجب على المستشفى تطبيقهما مع بيان فائدة كل منهما.\\n'
      + '2. حدد خطراً واحداً يمكن أن يظل قائماً، واقترح طريقة للحد منه.',
    question_en:
      'New Context Problem from Ministry Textbook (p. 47): A hospital migrates patient records to a cloud service and grants physicians remote home access.\\n'
      + '1. Using Zero Trust and Defense in Depth principles, propose two specific controls the hospital must enforce, detailing the benefit of each.\\n'
      + '2. Identify one residual risk that could persist and outline a method to mitigate it.',
    ideal_answer_ar:
      '1. الإجراءان المقترحان:\\n'
      + '   • الإجراء الأول (انعدام الثقة): إلزام الأطباء بمصادقة متعددة العوامل (MFA) وفحص سياق الجهاز والتحقق عند كل عملية طلب ملف طبي.\\n'
      + '   • الإجراء الثاني (الدفاع في العمق): تشفير قناة الاتصال (VPN / TLS) وفرض صلاحيات مقيدة (طبيب القلب لا يرى إلا مرضاه).\\n\\n'
      + '2. الخطر المتبقي وطريقة الحد منه:\\n'
      + '   • الخطر: اختراق أو سرقة حاسوب الطبيب الشخصي في المنزل أثناء تركه مسجلاً للدخول.\\n'
      + '   • طريقة الحد منه: فرض قفل الشاشة التلقائي بعد فترة خمول قصيرة، واستخدام التحقق البيومتري قبل فتح كل ملف.',
    ideal_answer_en:
      '1. Proposed Defensive Controls:\\n'
      + '   • Control 1 (Zero Trust): Enforcing mandatory Multi-Factor Authentication (MFA), context-aware device hygiene checks, and transactional re-authentication for every medical chart query.\\n'
      + '   • Control 2 (Defense in Depth): Enforcing AES-encrypted VPN/TLS tunneling in transit coupled with strict Role-Based Access Control (RBAC)—a cardiologist cannot access psychiatric or obstetrics records.\\n\\n'
      + '2. Residual Threat & Mitigation:\\n'
      + '   • Residual Threat: An unattended or physically stolen physician home laptop left with an active authenticated session.\\n'
      + '   • Mitigation: Enforce aggressive auto-logout idle timers (e.g., 2 minutes) paired with mandatory local biometric confirmation (Windows Hello / Touch ID) prior to decrypting any medical record.',
    explanation_ar:
      'الشرح: مستمد حرفياً من تمرين "In a New Context" ص 47 بكتاب الوزارة لتطبيق مبادئ Zero Trust وDefense in Depth في بيئة المستشفيات السحابية.',
    explanation_en:
      'Directly aligned with Ministry Textbook (p. 47 "In a New Context") demonstrating Zero Trust and Defense in Depth applied to cloud healthcare infrastructure.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-03',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    marks: 5,
    question_ar:
      'حلل العبارة: "المحيط الأمني التقليدي طُمس مع صعود السحابة والعمل عن بعد".\\n'
      + 'اشرح المقصود بهذه المقولة، موضحاً لماذا أصبحت فرضية "الداخل آمن والخارج خطر" غير صالحة اليوم.',
    question_en:
      'Analyze the statement: "The traditional security perimeter dissolved with the ascent of cloud computing and remote work."\\n'
      + 'Explain the meaning of this thesis, demonstrating why the legacy premise "Inside is safe, Outside is hostile" is obsolete today.',
    ideal_answer_ar:
      '• المقصود: لم تعد هناك أسوار فيزيائية تفصل شبكة الشركة عن العالم الخارجي.\\n'
      + '• عدم صلاحية الفرضية القديمة:\\n'
      + '  1. البيانات الحساسة أصبحت مخزنة خارج مبنى المؤسسة في خوادم سحابية موزعة.\\n'
      + '  2. الموظفون يدخلون من منازلهم وأجهزتهم المتنقلة من خارج المحيط.\\n'
      + '  3. وجود جهاز داخل المقر لا يضمن سلامته؛ فقد يكون مخترقاً ببرمجية خبيثة تتجسس من الداخل.',
    ideal_answer_en:
      '• Core Meaning: Physical building walls and localized router gateways no longer constitute a definitive perimeter dividing enterprise assets from the outside internet.\\n'
      + '• Why the Legacy Premise Fails Today:\\n'
      + '  1. Cloud Decentralization: Mission-critical databases and SaaS applications reside across geographically distributed cloud datacenters outside corporate premises.\\n'
      + '  2. Telecommuting Ingress: Employees routinely access private services from residential Wi-Fi, mobile devices, and foreign coffee shops.\\n'
      + '  3. Insider Threats: Physical presence on the office LAN no longer implies benign intent; internal devices can be silently infected with spyware pivoting from inside.',
    explanation_ar:
      'الشرح: نموذج القلعة القديم انهار تماماً لأن الموظفين والسيرفرات لم يعودوا محصورين داخل جدران المبنى.',
    explanation_en:
      'The Castle-and-Moat paradigm collapsed because compute servers and corporate workers are no longer housed inside physical perimeter walls.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-04',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 6,
    question_ar:
      'قارن بالتفصيل بين الأمان القائم على المحيط (Perimeter Security) ونهج انعدام الثقة (Zero Trust) من حيث: مفهوم الثقة، ومعايير التحقق، وأثر الاختراق الداخلي.',
    question_en:
      'Compare in detail Perimeter-Based Security and Zero Trust Architecture across: Core Trust Philosophy, Verification Criteria, and Blast Radius of an Internal Breach.',
    ideal_answer_ar:
      '• مفهوم الثقة:\\n'
      + '  - المحيط التقليدي: الثقة ضمنية وتلقائية لكل من هو داخل حدود الشبكة.\\n'
      + '  - انعدام الثقة (Zero Trust): لا توجد ثقة تلقائية مطلقاً؛ "لا تثق بأحد، وتحقق دائماً".\\n\\n'
      + '• معايير التحقق:\\n'
      + '  - المحيط التقليدي: فحص لمرة واحدة عند بوابة الدخول بكلمة المرور فقط.\\n'
      + '  - انعدام الثقة: تحقق مستمر وديناميكي عند كل طلب يشمل: الهوية، والصلاحيات، وسياق الجهاز والموقع.\\n\\n'
      + '• أثر الاختراق الداخلي:\\n'
      + '  - المحيط التقليدي: المهاجم يتحرك بحرية تامة بين الأجهزة الداخلية.\\n'
      + '  - انعدام الثقة: المهاجم محاصر ومقيد بالصلاحيات ولا يستطيع التحرك لأي ملف آخر دون إعادة التحقق.',
    ideal_answer_en:
      '• Core Trust Philosophy:\\n'
      + '  - Perimeter Security: Implicit trust granted automatically to any machine or user resident within internal IP subnets.\\n'
      + '  - Zero Trust: Absolute zero implicit trust. Operates on the dogma: "Never Trust, Always Verify."\\n\\n'
      + '• Verification Criteria:\\n'
      + '  - Perimeter Security: Static, single-instance perimeter checkpoint (typically basic credentials at VPN/firewall entry).\\n'
      + '  - Zero Trust: Dynamic, continuous micro-evaluation per transaction encompassing identity, RBAC authorization, device health, and environmental telemetry.\\n\\n'
      + '• Blast Radius of an Internal Breach:\\n'
      + '  - Perimeter Security: Catastrophic lateral traversal; once past the moat, attackers roam internal LAN shares unimpeded.\\n'
      + '  - Zero Trust: Heavily compartmentalized; breached credentials grant access strictly to a minimal isolated resource, containing lateral spread.',
    explanation_ar:
      'الشرح: Zero Trust يحول كل ملف وتطبيق إلى منطقة أمنية معزولة لا يفتحها إلا ترخيص فوري مستقل.',
    explanation_en:
      'Zero Trust turns every micro-service and datastore into a sovereign perimeter requiring autonomous, continuous cryptographic validation.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-05',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    marks: 5,
    question_ar:
      'ناقش: كيف يتعامل نهج انعدام الثقة (Zero Trust) مع مفهوم "السياق" (Context) عند فحص طلب وصول؟ اذكر 3 عناصر يتضمنها سياق الطلب.',
    question_en:
      'Discuss: How does Zero Trust leverage the concept of "Context" when evaluating access requests? Enumerate 3 specific parameters evaluated within request context.',
    ideal_answer_ar:
      '• التعامل مع السياق: لا يكتفي بفحص كلمة المرور فقط، بل يقيّم الظروف المحيطة بالطلب للتأكد من أمانه وعدم وجود احتيال.\\n'
      + '• ثلاثة عناصر للسياق:\\n'
      + '  1. الموقع الجغرافي وعنوان IP: (هل يحاول تسجيل الدخول من دولة غير معتادة؟).\\n'
      + '  2. حالة وسلامة الجهاز: (هل نظام التشغيل محدّث ومضاد الفيروسات مفعل؟).\\n'
      + '  3. توقيت وسلوك الوصول: (هل الطلب في ساعات العمل أم في منتصف الليل بشكل مفاجئ؟).',
    ideal_answer_en:
      '• Contextual Evaluation Mechanics: Zero Trust rejects binary authentication (valid password = grant access). Instead, it analyzes real-time environmental context to score risk before authorizing transactions.\\n'
      + '• Three Critical Context Parameters:\\n'
      + '  1. Geolocation & Network Origin: Assessing if the client IP originates from an atypical country, Tor exit node, or foreign ASN inconsistent with travel records.\\n'
      + '  2. Endpoint Device Health: Validating that the host machine runs an unrooted OS, holds current security patch levels, and maintains an active EDR/antivirus agent.\\n'
      + '  3. Behavioral & Temporal Anomalies: Checking if access requests arrive outside normal business hours or attempt atypical mass database downloads.',
    explanation_ar:
      'الشرح: السياق هو البُعد الثالث للأمان؛ فالحساب الصحيح قد يكون مسروقاً إذا استخدم في وقت وسياق مشبوه.',
    explanation_en:
      'Context represents the third dimension of security: valid credentials used from an anomalous device or foreign midnight IP indicate an active account hijack.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-06',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar:
      'سؤال التفكير النقدي بكتاب الوزارة (ص 48): في استراتيجية الدفاع في العمق، أي طبقة من طبقات الدفاع الأربع هي الأسهل للاختراق من قِبل المهاجمين ولماذا؟ وكيف تعالج الطبقات الأخرى هذا الضعف؟',
    question_en:
      'Critical Thinking Question from Ministry Textbook (p. 48): In a Defense in Depth strategy, which of the four defensive layers is most susceptible to adversary breach, and why? How do the other layers remediate this vulnerability?',
    ideal_answer_ar:
      '• الطبقة الأسهل للاختراق: طبقة "الأجهزة الطرفية" (Endpoints).\\n'
      + '• السبب: لأنها تحت تصرف المستخدم البشري الذي يُعد أضعف حلقة أمنية (عبر الوقوع في فخاخ التصيد الاحتيالي، أو تنزيل مرفقات خبيثة، أو استخدام كلمات مرور ضعيفة).\\n'
      + '• معالجة الطبقات الأخرى:\\n'
      + '  - جدار الحماية يمنع البرمجية الخبيثة من التواصل مع خادم المهاجم الخارجي.\\n'
      + '  - الـ DMZ وانعدام الثقة يمنعان الجهاز المخترق من استغلال اتصاله للوصول لقواعد البيانات الداخلية.',
    ideal_answer_en:
      '• Most Susceptible Layer: The "Endpoints" Layer (Laptops, Desktops, Mobile Devices).\\n'
      + '• Vulnerability Driver: Human behavioral psychology constitutes the weakest link in enterprise defense. Users are vulnerable to sophisticated social engineering, spear-phishing lures, and rogue downloads.\\n'
      + '• Remediation by Neighboring Layers:\\n'
      + '  - Perimeter Firewalls block outbound Command-and-Control (C2) callback beacons initiated by host malware.\\n'
      + '  - DMZ & Least-Privilege Segmentation block the infected endpoint from pivoting toward internal database clusters.',
    explanation_ar:
      'الشرح: الهندسة الاجتماعية تستهدف العنصر البشري؛ وتعدد طبقات الدفاع يضمن ألا يؤدي خطأ موظف واحد إلى تدمير الشركة بالكامل.',
    explanation_en:
      'Human error targets endpoints via social engineering; multi-layer Defense in Depth guarantees an individual employee slip does not sink the entire enterprise.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-07',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar:
      'قام موظف مفصول بتوصيل كمبيوتر محمول شخصي مصاب ببرمجية خبيثة بكابل شبكة داخل أحد مكاتب الشركة.\\n'
      + '1. وضح ما يحدث في بيئة تعتمد على الأمان التقليدي.\\n'
      + '2. وضح كيف يتصدى نهج انعدام الثقة (Zero Trust) لهذا التهديد ويمنعه من الوصول لقواعد البيانات.',
    question_en:
      'A terminated employee plugs a rogue, malware-infected personal laptop directly into an active office ethernet jack.\\n'
      + '1. Describe the resulting security impact in a traditional perimeter-based network.\\n'
      + '2. Describe how a Zero Trust framework intercepts this threat and prevents access to enterprise databases.',
    ideal_answer_ar:
      '1. في الأمان التقليدي: يحصل الحاسوب على عنوان IP داخلي ويثق به النظام تلقائياً لأنه "داخل المبنى"، فتنتشر البرمجية الخبيثة وتصل لقواعد البيانات دون عوائق.\\n'
      + '2. في نهج انعدام الثقة (Zero Trust):\\n'
      + '   • يرفض النظام منحه أي ثقة بمجرد توصيل الكابل.\\n'
      + '   • يفحص هوية الجهاز ويكتشف أنه غير مسجل ولا يملك شهادة أمان معتمدة.\\n'
      + '   • يمنعه فوراً من الوصول لأي خادم أو قاعدة بيانات ويعزله في نطاق مغلق.',
    ideal_answer_en:
      '1. In Traditional Perimeter Architecture: The rogue laptop receives a local DHCP lease on the internal LAN. Because perimeter security implicitly trusts internal ethernet ports, the rogue host scans the subnet, spreads malware horizontally, and queries backend SQL databases unimpeded.\\n'
      + '2. In Zero Trust Architecture:\\n'
      + '   • Physical connection conveys zero trust. The network switch port enforces 802.1X certificate-based Network Access Control (NAC).\\n'
      + '   • Lacking a managed corporate machine identity certificate, the device is denied network access or dropped into an isolated quarantine VLAN.\\n'
      + '   • Even if network packets reach a database socket, Zero Trust identity-aware proxies reject connection attempts lacking authenticated, verified user-device tokens.',
    explanation_ar:
      'الشرح: هذا هو الفارق الجوهري بين النموذج القديم وZero Trust؛ التوصيل المادي لم يعد يعطي أي صلاحية إطلاقاً.',
    explanation_en:
      'The defining paradigm shift: Physical ethernet attachment no longer conveys intrinsic authorization in Zero Trust.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-08',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    marks: 5,
    question_ar:
      'اشرح مبدأ "الحد الأدنى من الصلاحيات" (Least Privilege) وكيف يمثل حجر زاوية في بنية انعدام الثقة (Zero Trust Architecture).',
    question_en:
      'Explain the Principle of "Least Privilege" and describe how it serves as a cornerstone of Zero Trust Architecture.',
    ideal_answer_ar:
      '• المبدأ: منح كل مستخدم أو نظام فقط الحد الأدنى من الصلاحيات والوصول الضروري لأداء مهامه الوظيفية المحددة، ولأقصر وقت ممكن.\\n'
      + '• دوره في Zero Trust: يمنع انتشار الضرر؛ فلو سُرقت كلمة مرور موظف الحسابات، لا يستطيع المهاجم الوصول لملفات التطوير أو السجلات الطبية لأن صلاحيات الحساب مقصورة على الحسابات فقط.',
    ideal_answer_en:
      '• The Principle: Restricting user accounts, applications, and processes strictly to the minimum system privileges, data read/write capabilities, and time windows required to execute designated job duties.\\n'
      + '• Role in Zero Trust: Eliminates broad permissions and limits the blast radius of compromises. If an accounting associate credentials are stolen, the attacker cannot access source code repositories, engineering schematics, or HR health records because permissions are strictly walled off.',
    explanation_ar:
      'الشرح: مبدأ تقليص الصلاحيات يمنع "الحسابات الشاملة"، ويجعل كل موظف يملك مفتاح غرفته فقط وليس المفتاح الرئيسي للمبنى.',
    explanation_en:
      'Least Privilege eliminates universal master keys: every operator is issued a key strictly opening their assigned office cubicle.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-09',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    marks: 5,
    question_ar:
      'بيّن كيف تتكامل تقنية المصادقة متعددة العوامل (MFA) - التي درسناها في الدرس الأول - مع نهج انعدام الثقة (Zero Trust) في تأمين السحابة.',
    question_en:
      'Demonstrate how Multi-Factor Authentication (MFA)—studied in Lesson 1—integrates with the Zero Trust framework to secure cloud services.',
    ideal_answer_ar:
      '• MFA هي الركيزة الأساسية للتحقق من "الهوية" في نهج انعدام الثقة.\\n'
      + '• في السحابة: لأن الخدمات متاحة عبر الإنترنت، لا يكفي اسم المستخدم وكلمة المرور (عامل المعرفة).\\n'
      + '• التكامل: يفرض نظام Zero Trust إثبات الهوية بعامل مستقل ثانٍ (مثل OTP بالهاتف أو البصمة) قبل فتح أي تطبيق سحابي، مما يبطل أثر تسريب كلمات المرور.',
    ideal_answer_en:
      '• Foundational Identity Anchor: MFA serves as the core operational mechanism executing the "Verify Explicitly" pillar of Zero Trust.\\n'
      + '• Cloud Threat Defense: In cloud environments, enterprise services are accessible from public endpoints globally; static passwords (knowledge factor) are inadequate due to automated credential stuffing.\\n'
      + '• Cross-Lesson Synergy: Zero Trust mandates that every cloud access event proves identity through an independent second factor (hardware token, biometric scan, or push prompt), rendering stolen password databases harmless.',
    explanation_ar:
      'الشرح: التكامل بين الدرسين: MFA هي الأداة التنفيذية للتحقق من هوية المستخدم، وZero Trust هي السياسة الشاملة التي تفرض هذا التحقق عند كل وصول.',
    explanation_en:
      'Inter-lesson synergy: MFA is the tactical cryptographic weapon proving human identity; Zero Trust is the overarching policy mandating verification at every doorway.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-10',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    marks: 4,
    question_ar:
      'علل: لماذا يُعد تحديث أنظمة التشغيل وبرامج مكافحة الفيروسات في الأجهزة الطرفية جزءاً لا يتجزأ من أمان الشبكة المؤسسية وليس مجرد مسألة حماية شخصية؟',
    question_en:
      'Justify: Why are operating system updates and antivirus hygiene on endpoint workstations an integral element of enterprise network defense rather than merely a matter of personal computer care?',
    ideal_answer_ar:
      '• لأن الجهاز الطرفي المصاب يمثل نقطة دخول خلفية (Backdoor) وثغرة ينفذ منها المهاجم لاختراق الشبكة المؤسسية بالكامل.\\n'
      + '• التحديثات تغلق الثغرات الأمنية المكتشفة التي يستغلها المخترقون للتسلل، فسلامة الشبكة مرتبطة مباشرة بسلامة أضعف جهاز متصل بها.',
    ideal_answer_en:
      '• Strategic Gateway Vulnerability: An unpatched client machine serves as an external adversary initial beachhead and backdoor into enterprise networks.\\n'
      + '• Vulnerability Remediation: Operating system patches remediate documented zero-day remote execution exploits. Because network security is bounded by its weakest interconnected host, leaving endpoints unpatched compromises all adjacent internal servers.',
    explanation_ar:
      'الشرح: مثل السفينة التي تغرق من ثقب صغير؛ حاسوب موظف واحد غير محدث قد يعطل شبكة الشركة بأكملها بفيروس فدية.',
    explanation_en:
      'Analogy: A colossal ship sinks from a single puncture; one unpatched employee workstation introduces ransomware that cripples entire enterprise datacenters.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-11',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar:
      'بنك محلي يريد الانتقال لتقديم خدمات بنكية وتطبيقات هاتفية.\\n'
      + 'وضح كيف يوزع البنك إجراءاته الأمنية على الطبقات الأربع للدفاع في العمق لحماية أموال المودعين وبياناتهم.',
    question_en:
      'A regional bank is launching mobile banking and retail online web services.\\n'
      + 'Explain how the bank distributes security controls across the four layers of Defense in Depth to protect depositor funds and private records.',
    ideal_answer_ar:
      '1. مدخل الشبكة: جدران نارية متطورة تحظر كل المنافذ غير المخصصة وتصد هجمات حجب الخدمة (DDoS).\\n'
      + '2. مسار الاتصال: تشفير كامل لكافة المعاملات المنقولة بين تطبيق الهاتف وخوادم البنك باستخدام بروتوكولات تشفير قوية (TLS 1.3 / VPN).\\n'
      + '3. وضع الخوادم: وضع خوادم التطبيقات في DMZ معزولة تماماً عن قواعد بيانات الحسابات المصرفية المركزية.\\n'
      + '4. الأجهزة الطرفية: حظر استخدام الأجهزة المخترقة الحماية (Jailbroken) وفرض تحديثات الحماية والمصادقة البيومترية على تطبيق العميل.',
    ideal_answer_en:
      '1. Network Ingress: Redundant Next-Gen Firewalls filtering unauthorized traffic, rate-limiting API endpoints, and scrubbing DDoS volumetric floods.\\n'
      + '2. Communication Path: Strict TLS 1.3 mutual authentication and encrypted tunnels securing mobile API transmissions over public telecom networks.\\n'
      + '3. Server Placement: Web and mobile API gateway daemons isolated in a DMZ, completely partitioned from core transaction ledgers via internal stateful firewalls.\\n'
      + '4. Endpoints: Mobile app enforces root/jailbreak detection, hardware-backed keystore integration, biometrics (Face ID), and instant session termination upon compromise.',
    explanation_ar:
      'الشرح: حماية العمليات المصرفية تتطلب إحكام الحلقات الأربع؛ فلو سقطت حلقة واحدة يتعرض مال العميل للسرقة.',
    explanation_en:
      'Securing digital banking mandates fortifying all 4 links: ingress filtering, transit encryption, DMZ segregation, and endpoint hardening.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-12',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar:
      'حلل: هل يعني تطبيق نهج انعدام الثقة (Zero Trust) الاستغناء التام عن جدران الحماية والـ VPN؟ برر إجابتك موضحاً العلاقة بينهما.',
    question_en:
      'Analyze: Does adopting a Zero Trust security framework render firewalls and VPNs completely obsolete? Justify your answer by clarifying the relationship between them.',
    ideal_answer_ar:
      '• الإجابة: لا، لا يعني الاستغناء عنهما إطلاقاً.\\n'
      + '• التبرير والعلاقة:\\n'
      + '  - انعدام الثقة هو "فلسفة واستراتيجية إدارية" تحدد كيف نتعامل مع طلبات الوصول.\\n'
      + '  - جدران الحماية والـ VPN هي "أدوات تنفيذية وتكتيكية" ضرورية لتطبيق هذه الفلسفة (عزل الشبكات وتشفير القنوات والتحكم بالمنافذ).\\n'
      + '  - النتيجة: Zero Trust يوجه ويطور استخدام الأدوات ولا يلغيها.',
    ideal_answer_en:
      '• Verdict: No, Zero Trust does NOT eliminate firewalls and VPNs.\\n'
      + '• Justification & Operational Relationship:\\n'
      + '  - Zero Trust is a strategic paradigm and governance philosophy dictating access policies ("Never Trust, Always Verify").\\n'
      + '  - Firewalls and VPNs are tactical enforcement mechanisms required to realize this vision (network micro-segmentation, port isolation, transport-layer encryption).\\n'
      + '  - Synthesis: Zero Trust reconfigures how firewalls and tunnels are deployed (transitioning from broad network gateways to fine-grained micro-perimeters and Zero Trust Network Access / ZTNA).',
    explanation_ar:
      'الشرح: النهج الفكري يحتاج لأدوات هندسية لتنفيذه؛ بدون جدران نارية وتشفير لا يمكن تطبيق سياسات العزل والفحص لـ Zero Trust.',
    explanation_en:
      'Philosophies require concrete engineering tools: without cryptographic tunneling and packet filtering, micro-segmentation cannot exist.',
  },
  {
    id: 'CH2-L2-HARD-W-P2-13',
    part: 2,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar:
      'استنتج: ما الفرق بين "التحقق لمرة واحدة عند تسجيل الدخول" و"التحقق المستمر" (Continuous Verification) في نهج انعدام الثقة؟',
    question_en:
      'Deduce: What is the operational distinction between "One-Time Login Verification" and "Continuous Verification" in Zero Trust Architecture?',
    ideal_answer_ar:
      '• التحقق لمرة واحدة: يتم فحص هوية المستخدم عند بداية الجلسة فقط، وتظل الثقة ممنوحة له طوال ساعات عمله حتى لو تغير سلوكه أو موقعه.\\n'
      + '• التحقق المستمر (Zero Trust): يعيد فحص وتقييم الهوية والصلاحيات والسياق مع كل طلب جديد لمورد أو ملف حساس، ويغلق الجلسة فوراً عند رصد أي تغير مريب في سياق الاتصال.',
    ideal_answer_en:
      '• One-Time Login Verification: Evaluates identity solely at the initial session handshake. Once authenticated, implicit trust is granted for hours, leaving the connection vulnerable to post-login session hijacking or endpoint tampering.\\n'
      + '• Continuous Verification (Zero Trust): Re-evaluates risk dynamically on every single transaction. Continuously monitors telemetry, user behavior, device state, and requested file sensitivity, revoking privileges instantly if anomalies emerge.',
    explanation_ar:
      'الشرح: التحقق المستمر يمنع استغلال جلسات العمل المتروكة (Session Hijacking)؛ فالأمان عملية مستمرة وليست مجرد بوابة تُفتح لمرة واحدة.',
    explanation_en:
      'Continuous verification defeats session hijacking: security is an unbroken, ongoing assessment rather than a single turnstile doorway.',
  },
];

// ─── موضوعية متقدمة — الجزء الثاني ───────────────────────────

export const CH2_L2_HARD_MCQ_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-HARD-MCQ-P2-01',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'وفق مفهوم "الدفاع في العمق"، إذا نجح فيروس فدية في اختراق جدار الحماية الخارجي، فما الخط الدفاعي التالي الجاهز للتصدي له على أجهزة الموظفين؟',
    question_en: 'According to "Defense in Depth", if ransomware successfully penetrates the external perimeter firewall, what is the next defensive line prepared to neutralize it on employee machines?',
    options: [
      'بروتوكول تحويل العناوين DNS',
      'كابل الشبكة الملتوي الإيثرنت',
      'برنامج مكافحة الفيروسات المحدّث وسياسات الأجهزة الطرفية (Endpoints)',
      'شاشة الحاسوب عالية الدقة',
    ],
    options_en: [
      'The DNS resolution protocol',
      'Twisted-pair Ethernet copper wiring',
      'Updated Antivirus / EDR software and Endpoint security policies',
      'High-resolution desktop monitor displays',
    ],
    answer: 'برنامج مكافحة الفيروسات المحدّث وسياسات الأجهزة الطرفية (Endpoints)',
    answer_en: 'Updated Antivirus / EDR software and Endpoint security policies',
    explanation_ar: 'عندما تفشل طبقة مدخل الشبكة، تكون طبقة الأجهزة الطرفية هي خط الدفاع المباشر المسؤول عن فحص الملف ومنع تنفيذه.',
    explanation_en: 'When perimeter ingress fails, host-based endpoint security agents actively intercept malicious execution payloads.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-02',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'لماذا يُعد نموذج "قلعة وخندق" (Castle-and-Moat) التقليدي خطيراً وغير مناسب لبيئات الأعمال المعاصرة؟',
    question_en: 'Why is the traditional "Castle-and-Moat" model dangerously obsolete for modern enterprise business environments?',
    options: [
      'لأنه يستهلك طاقة كهربائية زائدة في مركز البيانات',
      'لأنه يفترض أن كل من تجاوز الخندق ودخل القلعة صديق موثوق، مما يتيح للمخترق حرية التحرك والتخريب بالداخل دون رقابة',
      'لأنه يتعارض برمجياً مع أنظمة تشغيل ويندوز الحديثة',
      'لأن القلاع التاريخية لم تكن آمنة هندسياً',
    ],
    options_en: [
      'Because it draws excessive electrical wattage in server datacenters',
      'Because it assumes anyone who breaches the perimeter moat is a trusted friend, granting attackers unmonitored lateral freedom once inside',
      'Because it introduces kernel driver conflicts with modern operating systems',
      'Because medieval fortresses were structurally unstable',
    ],
    answer: 'لأنه يفترض أن كل من تجاوز الخندق ودخل القلعة صديق موثوق، مما يتيح للمخترق حرية التحرك والتخريب بالداخل دون رقابة',
    answer_en: 'Because it assumes anyone who breaches the perimeter moat is a trusted friend, granting attackers unmonitored lateral freedom once inside',
    explanation_ar: 'نموذج القلعة يثق ثقة عمياء بكل ما هو داخل السور، بينما المهاجمون اليوم يخترقون الحسابات ويتواجدون بالفعل داخل الشبكة.',
    explanation_en: 'Castle-and-Moat assumes blind trust within perimeter boundaries; modern attackers compromise legitimate accounts to operate from within.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-03',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'في نظام يعتمد استراتيجية "انعدام الثقة" (Zero Trust)، طلب مدير التسويق من حاسوبه في الشركة الدخول على خادم الرواتب والأجور. ما الإجراء الصحيح للنظام؟',
    question_en: 'Under a Zero Trust architecture, the Marketing Director requests access to the corporate Payroll server from their office workstation. What is the correct system action?',
    options: [
      'منحه الوصول فوراً لأنه متواجد بمكتبه داخل مبنى الإدارة ومعه رتبة مدير',
      'رفض الوصول تلقائياً وتطبيق مبدأ الحد الأدنى من الصلاحيات لأن وظيفته لا تتطلب الاطلاع على الرواتب',
      'إرسال بريد إلكتروني لجميع موظفي الشركة للتصويت',
      'مسح كافة الملفات الموجودة على حاسوبه',
    ],
    options_en: [
      'Grant access immediately because the request originates from an internal executive office',
      'Reject access automatically and enforce Least Privilege, as marketing roles have no valid operational need to view payroll data',
      'Broadcast an all-staff company email to poll employee approval',
      'Wipe all local files stored on the workstation drive',
    ],
    answer: 'رفض الوصول تلقائياً وتطبيق مبدأ الحد الأدنى من الصلاحيات لأن وظيفته لا تتطلب الاطلاع على الرواتب',
    answer_en: 'Reject access automatically and enforce Least Privilege, as marketing roles have no valid operational need to view payroll data',
    explanation_ar: 'مبدأ Least Privilege يمنع الوصول لغير المصرح لهم بصرف النظر عن منصبهم أو تواجدهم المادي داخل الشركة.',
    explanation_en: 'Least Privilege strictly restricts access based on operational necessity, regardless of user seniority or on-premises location.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-04',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أي العناصر التالية يمثل تحليلاً صحيحاً لـ "السياق" (Context) في نهج Zero Trust عند محاولة تسجيل دخول مبرمج؟',
    question_en: 'Which of the following represents a valid evaluation of "Context" in a Zero Trust framework during a developer authentication attempt?',
    options: [
      'فحص لون حاسوب المبرمج ونوع لوحة المفاتيح',
      'التحقق من موقع الاتصال الجغرافي، وصحة شهادة الجهاز، وما إذا كان توقيت الاتصال غير معتاد (مثل 3 فجراً من دولة أخرى)',
      'فحص سرعة كتابة المستخدم على الشاشة حصراً',
      'التأكد من أن المبرمج يحمل بطاقة دفع بنكية سارية',
    ],
    options_en: [
      'Inspecting the color of the laptop chassis and mechanical keyboard switch model',
      'Evaluating the geographic source IP, valid machine identity certificate, and anomalous timestamps (e.g. 3 AM from a foreign country)',
      'Measuring raw keyboard typing speed across browser textfields',
      'Confirming the developer possesses a valid commercial debit card',
    ],
    answer: 'التحقق من موقع الاتصال الجغرافي، وصحة شهادة الجهاز، وما إذا كان توقيت الاتصال غير معتاد (مثل 3 فجراً من دولة أخرى)',
    answer_en: 'Evaluating the geographic source IP, valid machine identity certificate, and anomalous timestamps (e.g. 3 AM from a foreign country)',
    explanation_ar: 'سياق الطلب يشمل معايير البيئة الرقمية (الجهاز، التوقيت، الموقع، والنمط السلوكي).',
    explanation_en: 'Context encompasses operational parameters: origin geolocation, device posture and certificates, time of day, and behavioral baseline.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-05',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما الطبقة من طبقات الدفاع في العمق التي تتولى مهمة منع التنصت على البيانات أثناء مرورها عبر أجهزة توجيه تابعة لمزودي خدمة الإنترنت؟',
    question_en: 'Which Defense in Depth layer is responsible for preventing wiretapping on data packets as they transit intermediary ISP routers?',
    options: [
      'الأجهزة الطرفية',
      'مسار الاتصال (Communication Path)',
      'وضع الخوادم',
      'مدخل الشبكة',
    ],
    options_en: [
      'Endpoints',
      'Communication Path',
      'Server Placement',
      'Network Ingress',
    ],
    answer: 'مسار الاتصال (Communication Path)',
    answer_en: 'Communication Path',
    explanation_ar: 'طبقة مسار الاتصال تستخدم التشفير والـ VPN لحماية تدفق البيانات بين النقاط عبر الشبكات العامة.',
    explanation_en: 'The Communication Path layer deploys VPN tunneling and TLS encryption to shield packet payloads over untrusted carrier networks.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-06',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'نجح مهاجم في سرقة كلمة مرور صحيحة لموظف عبر التصيد الاحتيالي، وحاول تسجيل الدخول ليلاً من دولة أجنبية. ما الذي سيعطله فوراً في بنية Zero Trust؟',
    question_en: 'An attacker steals a valid employee password via phishing and attempts to log in at midnight from a foreign country. What stops the intrusion in a Zero Trust environment?',
    options: [
      'عدم معرفة المهاجم لاسم مدير الشركة',
      'طلب رمز العامل الثاني (MFA) واكتشاف النظام لتغير سياق الموقع الجغرافي غير المعتاد',
      'جدار الحماية الخارجي لمقر الشركة المغلق ليلاً',
      'انتهاء باقة الإنترنت لدى الموظف الأصلي',
    ],
    options_en: [
      'The attacker unfamiliarity with the CEO personal name',
      'Mandatory secondary MFA challenge combined with automated risk-based detection of anomalous foreign geolocation',
      'The corporate office physical perimeter security shutting down at night',
      'The legitimate employee cellular data plan expiring',
    ],
    answer: 'طلب رمز العامل الثاني (MFA) واكتشاف النظام لتغير سياق الموقع الجغرافي غير المعتاد',
    answer_en: 'Mandatory secondary MFA challenge combined with automated risk-based detection of anomalous foreign geolocation',
    explanation_ar: 'تقييم السياق ورصد الموقع الشاذ مع طلب العامل الثاني المستقل يبطل تماماً نفع كلمة المرور المسروقة.',
    explanation_en: 'Context-aware risk scoring flags the foreign IP and triggers step-up MFA verification, neutralizing stolen credentials.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-07',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما المبدأ القائل: "يجب منح المستخدم فقط الصلاحيات الضرورية لإنجاز وظيفته المحددة دون أي صلاحيات إضافية"؟',
    question_en: 'Which principle dictates: "Users must be granted only the minimal privileges strictly necessary to complete their specific job role, without superfluous access"?',
    options: [
      'مبدأ التشفير غير المتماثل',
      'مبدأ الحد الأدنى من الامتيازات (Least Privilege)',
      'مبدأ الدفاع المحيطي',
      'مبدأ انتحال الشخصية',
    ],
    options_en: [
      'Asymmetric Cryptographic Principle',
      'Principle of Least Privilege',
      'Perimeter Defense Doctrine',
      'Impersonation Principle',
    ],
    answer: 'مبدأ الحد الأدنى من الامتيازات (Least Privilege)',
    answer_en: 'Principle of Least Privilege',
    explanation_ar: 'Least Privilege هو القاعدة الذهبية لإدارة الصلاحيات في المعماريات الأمنية الحديثة.',
    explanation_en: 'The Principle of Least Privilege is the cornerstone access control rule in modern secure system architectures.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-08',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'شركة تطبق مفهوم الدفاع في العمق، أصيبت أجهزتها ببرمجية خبيثة تجاوزت مضاد الفيروسات. ما الطبقة التي يمكنها منع هذه البرمجية من تهريب البيانات المسروقة لخادم المهاجم الخارجي؟',
    question_en: 'An enterprise deploying Defense in Depth suffers an endpoint malware infection that bypassed local antivirus. Which layer can block the malware from exfiltrating stolen data to an external C2 server?',
    options: [
      'لوحة مفاتيح الحاسوب',
      'جدار الحماية عند مدخل الشبكة (قواعد منع الاتصالات الصادرة غير المصرح بها)',
      'شاشة العرض الملونة',
      'نظام تبريد المعالج',
    ],
    options_en: [
      'The client keyboard',
      'Network Ingress Firewall enforcing strict outbound egress filtering rules',
      'The workstation graphical display monitor',
      'The CPU liquid cooling radiator',
    ],
    answer: 'جدار الحماية عند مدخل الشبكة (قواعد منع الاتصالات الصادرة غير المصرح بها)',
    answer_en: 'Network Ingress Firewall enforcing strict outbound egress filtering rules',
    explanation_ar: 'جدار الحماية لا يراقب الدخول فقط، بل يراقب الاتصالات الصادرة (Egress filtering) ويمنع البرمجيات الخبيثة من الاتصال بمراكز القيادة والسيطرة (C2).',
    explanation_en: 'Firewalls enforce outbound egress filtering, dropping unrecognized outbound socket connections destined for rogue external Command-and-Control hosts.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-09',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما هي أهم نتيجة إيجابية لتطبيق مفهوم الدفاع في العمق مقارنة بالاعتماد على وسيلة دفاعية واحدة؟',
    question_en: 'What is the most significant positive outcome of adopting Defense in Depth compared to relying on a single defensive control?',
    options: [
      'القضاء على الحاجة لاستخدام كلمات المرور نهائياً',
      'القضاء على نقاط الفشل الفردية (Single Points of Failure) وتوفير حماية احتياطية متبادلة',
      'خفض سرعة تدفق البيانات لمنع وصول المخترقين',
      'الاستغناء التام عن الكوادر البشرية في تقنية المعلومات',
    ],
    options_en: [
      'Eliminating the necessity for passwords permanently',
      'Eliminating Single Points of Failure (SPOF) and establishing reciprocal fallback protection',
      'Artificially throttling broadband throughput to impede hackers',
      'Completely replacing human IT security personnel',
    ],
    answer: 'القضاء على نقاط الفشل الفردية (Single Points of Failure) وتوفير حماية احتياطية متبادلة',
    answer_en: 'Eliminating Single Points of Failure (SPOF) and establishing reciprocal fallback protection',
    explanation_ar: 'الهدف الأسمى للدفاع في العمق هو منع سقوط النظام بالكامل عند اختراق أي إجراء أمني منفرد.',
    explanation_en: 'The core purpose of Defense in Depth is eliminating single points of failure, ensuring system resilience if an individual control is breached.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-10',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'في نهج Zero Trust، ما المقصود بمصطلح "التجزئة الدقيقة" (Micro-segmentation) للشبكة؟',
    question_en: 'Within a Zero Trust framework, what is meant by network "Micro-segmentation"?',
    options: [
      'تقسيم كابلات الشبكة إلى أجزاء صغيرة الحجم',
      'تقسيم الشبكة إلى مناطق أمنية صغيرة ومعزولة تمنع المهاجم من التحرك العرضي بين الخوادم والتطبيقات',
      'مسح نصف ملفات القرص الصلب لتوفير المساحة',
      'تقليل حجم رسائل البريد الإلكتروني المتبادلة',
    ],
    options_en: [
      'Physically slicing Ethernet cables into shorter lengths',
      'Partitioning network workloads into granular, isolated security zones to prevent lateral traversal between servers and applications',
      'Erasing half of hard drive storage to free sector clusters',
      'Compressing the payload size of outbound email messages',
    ],
    answer: 'تقسيم الشبكة إلى مناطق أمنية صغيرة ومعزولة تمنع المهاجم من التحرك العرضي بين الخوادم والتطبيقات',
    answer_en: 'Partitioning network workloads into granular, isolated security zones to prevent lateral traversal between servers and applications',
    explanation_ar: 'التجزئة الدقيقة تحاصر كل عبء عمل وتطبيق داخل حدوده وتمنع استغلال جهاز مخترق للتسلل للأجهزة المجاورة.',
    explanation_en: 'Micro-segmentation confines individual workloads and applications into isolated micro-perimeters, eliminating lateral pivot pathways.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-11',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي الحالات التالية تمثل نموذج أمان "المحيط التقليدي" وتعتبر خطأً أمنياً بحسب المعايير المعاصرة؟',
    question_en: 'Which scenario exemplifies traditional "Perimeter Security" and constitutes a grave vulnerability under modern security standards?',
    options: [
      'مطالبة الموظف ببصمة وOTP عند الدخول من المنزل',
      'السماح لأي لابتوب متصل بشبكة Wi-Fi داخل مقر الشركة بالوصول لقواعد البيانات دون إعادة التحقق من الصلاحيات',
      'حظر خادم الويب من الاتصال التلقائي بالخوادم الداخلية',
      'فحص سلامة نظام التشغيل وتحديثاته قبل السماح بالاتصال',
    ],
    options_en: [
      'Requiring biometrics and OTP tokens when employees log in from home',
      'Permitting any laptop connected to internal corporate office Wi-Fi to query production databases without re-authenticating authorization',
      'Restricting web daemons from initiating unprompted sessions into internal servers',
      'Auditing operating system patch levels before authorizing network sessions',
    ],
    answer: 'السماح لأي لابتوب متصل بشبكة Wi-Fi داخل مقر الشركة بالوصول لقواعد البيانات دون إعادة التحقق من الصلاحيات',
    answer_en: 'Permitting any laptop connected to internal corporate office Wi-Fi to query production databases without re-authenticating authorization',
    explanation_ar: 'منح الثقة بمجرد الاتصال بشبكة المقر هو جوهر ضعف نموذج المحيط القديم الذي يتفاداه نهج انعدام الثقة.',
    explanation_en: 'Granting implicit trust based solely on internal network location represents the core vulnerability of legacy perimeter models.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-12',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي طبقة من طبقات الدفاع في العمق الأربع تقع عليها مسؤولية حماية البيانات من هجمات محركات الأقراص المحمولة الملوثة (USB) التي يدخلها الموظفون؟',
    question_en: 'Which of the four Defense in Depth layers is directly responsible for defending data against infected portable USB flash drives inserted by employees?',
    options: [
      'مدخل الشبكة',
      'مسار الاتصال',
      'وضع الخوادم',
      'الأجهزة الطرفية (Endpoints)',
    ],
    options_en: [
      'Network Ingress',
      'Communication Path',
      'Server Placement',
      'Endpoints',
    ],
    answer: 'الأجهزة الطرفية (Endpoints)',
    answer_en: 'Endpoints',
    explanation_ar: 'الفلاشات ومحركات USB تتصل مباشرة بالحاسوب الفردي، وحمايتها تتم عبر برمجيات مكافحة الفيروسات وسياسات التحكم بالأجهزة الطرفية.',
    explanation_en: 'Removable USB media attach directly to client hardware; defense relies on endpoint antivirus agents and device control policies.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P2-13',
    part: 2,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'VERY_HARD',
    question_ar: 'العبارة التي تعبر أدق تعبير عن العلاقة بين استراتيجية "الدفاع في العمق" ونهج "انعدام الثقة" هي:',
    question_en: 'Which statement most accurately expresses the relationship between "Defense in Depth" strategy and the "Zero Trust" framework?',
    options: [
      'انعدام الثقة يلغي تماماً الحاجة لطبقات الدفاع في العمق',
      'انعدام الثقة يمثل المبدأ التوجيهي الصارم (الفلسفة)، بينما الدفاع في العمق يوفر الهيكل التكتيكي والطبقات لتنفيذه',
      'الدفاع في العمق يقتصر على الهواتف الذكية بينما انعدام الثقة للحواسيب الكبيرة',
      'كلاهما بديل مجاني لبرامج مكافحة الفيروسات التجارية',
    ],
    options_en: [
      'Zero Trust completely eliminates the structural requirement for Defense in Depth layers',
      'Zero Trust serves as the governing philosophical principle ("Never Trust, Always Verify"), while Defense in Depth supplies the tactical multi-layer architecture to execute it',
      'Defense in Depth is restricted to mobile phones, whereas Zero Trust is designed for mainframe computers',
      'Both frameworks are free replacements for commercial antivirus software',
    ],
    answer: 'انعدام الثقة يمثل المبدأ التوجيهي الصارم (الفلسفة)، بينما الدفاع في العمق يوفر الهيكل التكتيكي والطبقات لتنفيذه',
    answer_en: 'Zero Trust serves as the governing philosophical principle ("Never Trust, Always Verify"), while Defense in Depth supplies the tactical multi-layer architecture to execute it',
    explanation_ar: 'Zero Trust يضع المبدأ ("لا تثق بأحد، وتحقق دائماً")، والدفاع في العمق يضع الحواجز والطبقات الأربع لتطبيق هذا المبدأ على أرض الواقع.',
    explanation_en: 'Zero Trust is the strategic mindset ("Never Trust, Always Verify"); Defense in Depth provides the operational multi-layer barrier architecture.',
  },
];
'''

with open('frontend/src/ch2_lesson2_hardQ_part2.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated frontend/src/ch2_lesson2_hardQ_part2.ts successfully!")

