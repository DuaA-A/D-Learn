// ============================================================
// Ch2 · Lesson 2 · Part 1 — أسئلة وزارة الرسمية (الجزء الأول)
// Firewall · VPN · DMZ
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية وزارية — الجزء الأول ───────────────────────────

export const CH2_L2_OFFICIAL_WRITTEN_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-OFF-W-P1-01',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'وضح الدور الأساسي لجدار الحماية (Firewall) في أمان الشبكات، واذكر مثالاً على كيفية تحكمه في حركة المرور.',
    question_en: 'Clarify the primary role of a Firewall in network security, and provide an example of how it controls network traffic?',
    ideal_answer_ar:
      '• الدور الأساسي: مراقبة حركة مرور الشبكة الواردة والصادرة، والسماح بها أو منعها وفقاً لمجموعة من القواعد الأمنية المحددة مسبقاً (Security Rules).\n'
      + '• مثال عملي: تكوين جدار الحماية للسماح فقط بحركة مرور الويب الآمنة عبر منفذ HTTPS (منفذ 443) ومنع كافة المنافذ والبروتوكولات الأخرى غير المصرح بها لحماية الخوادم من الهجمات.',
    ideal_answer_en:
      '• Primary Role: Inspects inbound and outbound network traffic, permitting or blocking packets based on predetermined security rules.\n'
      + '• Practical Example: Configuring the firewall to permit encrypted web traffic exclusively via port 443 (HTTPS) while blocking all unauthorized ports and administrative services to shield internal servers from intrusion.',
    explanation_ar:
      'جدار الحماية هو خط الدفاع الأول للشبكة؛ يعمل كحارس بوابة يفحص الحزم وعناوين IP والمنافذ المسموح بها.',
    explanation_en:
      'A firewall acts as the initial perimeter gatekeeper, inspecting packet headers, IP addresses, and designated ports against defined access control lists (ACLs).',
  },
  {
    id: 'CH2-L2-OFF-W-P1-02',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ما المقصود بمصطلح «الشبكة الافتراضية الخاصة (VPN)»؟ اذكر اثنين من استخداماتها الرئيسية في بيئات العمل الحديثة.',
    question_en: 'What is meant by a "Virtual Private Network (VPN)"? Mention two primary use cases in modern corporate environments?',
    ideal_answer_ar:
      '• المفهوم: شبكة منطقية خاصة تُنشأ عبر شبكة عامة (كالإنترنت) وتستخدم التشفير وتقنية الأنفاق (Tunneling) لتوفير اتصال آمن وخاص بين الأجهزة البعيدة وشبكة المؤسسة.\n'
      + '• الاستخدامات:\n'
      + '1. تمكين الموظفين من العمل عن بعد والاتصال بأمان بالشبكة الداخلية للمؤسسة والوصول لملفاتها وخوادمها.\n'
      + '2. حماية سرية البيانات والاتصالات عند الاتصال عبر شبكات Wi-Fi عامة غير موثوقة (كالمقاهي والمطارات) لمنع التنصت.',
    ideal_answer_en:
      '• Definition: A logical private network established over a public infrastructure (like the Internet) utilizing encryption and tunneling protocols to deliver secure, confidential communication between remote endpoints and corporate resources.\n'
      + '• Primary Use Cases:\n'
      + '1. Secure Remote Work: Enabling telecommuting employees to securely access corporate internal intranets, databases, and file servers.\n'
      + '2. Public Wi-Fi Protection: Encrypting network transmissions over untrusted public Wi-Fi hotspots (cafes, airports) to prevent packet sniffing and eavesdropping.',
    explanation_ar:
      'الـ VPN ينشئ نفقاً مشفراً (Encrypted Tunnel) يعزل البيانات عن أعين المتنصتين على الشبكات العامة.',
    explanation_en:
      'A VPN constructs an encrypted tunnel that shields sensitive corporate traffic from interception across public internet pathways.',
  },
  {
    id: 'CH2-L2-OFF-W-P1-03',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'لماذا يكون وضع خادم ويب عام في «المنطقة المعزولة (DMZ)» أكثر أماناً من وضعه مباشرة داخل الشبكة الداخلية للمؤسسة؟',
    question_en: 'Why is positioning a public web server in a Demilitarized Zone (DMZ) more secure than locating it directly inside the internal corporate network?',
    ideal_answer_ar:
      '• لعزل الخادم المعرض للإنترنت عن الأجهزة وقواعد البيانات الداخلية الحساسة.\n'
      + '• الفائدة الأمنية: إذا نجح مهاجم في اختراق خادم الويب العام، فإنه يظل محاصراً داخل منطقة الـ DMZ، ويمنعه جدار الحماية الداخلي من الوصول المباشر إلى الشبكة الداخلية أو سرقة بيانات العملاء وقواعد البيانات السرية.',
    ideal_answer_en:
      '• Isolation: Separates internet-facing servers directly accessible to the public from sensitive internal workstations and databases.\n'
      + '• Containment: If an adversary breaches the public web server, the attack is contained entirely within the isolated DMZ subnetwork. Internal firewalls prevent lateral movement into confidential core business systems.',
    explanation_ar:
      'الـ DMZ تحقق مبدأ حصر الأضرار (Containment)؛ الخوادم العامة معرضة للاختراق دائماً لذا يجب عزلها بحاجز ناري داخلي.',
    explanation_en:
      'The DMZ implements damage containment: since public-facing servers endure constant external exposure, they must be partitioned behind an internal barrier.',
  },
  {
    id: 'CH2-L2-OFF-W-P1-04',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'وضح المقصود بـ «المنطقة المعزولة (DMZ)» في تصاميم الشبكات، وكيف تحمي مكونات البنية التحتية الداخلية وقواعد البيانات الحساسة؟',
    question_en: 'Explain the concept of a Demilitarized Zone (DMZ) in network design, and how it protects internal infrastructure and sensitive databases?',
    ideal_answer_ar:
      '• المفهوم: منطقة شبكية توضع فيها الخوادم المواجهة للجمهور (كالويب والبريد) معزولة بين جدارين ناريين (أو واجهتين لجدار حماية) تفصلها عن الإنترنت من جهة وعن الشبكة الداخلية من جهة أخرى.\n'
      + '• آلية الحماية: تعمل كمنطقة عازلة تمنع الاتصال المباشر بين الإنترنت والشبكة الداخلية؛ فحتى لو سقط خادم الويب في يد المهاجم، لا يستطيع الاتصال تلقائياً بقاعدة البيانات الداخلية إلا عبر قواعد فحص أمنية مشددة جداً يفرضها جدار الحماية الداخلي.',
    ideal_answer_en:
      '• Concept: A perimeter subnetwork hosting public-facing services (HTTP, DNS, Mail) positioned as a buffer zone between the untrusted internet and the private internal network.\n'
      + '• Protection Mechanism: Eliminates direct outside connectivity to private assets. Even if a DMZ bastion host is compromised, strict internal firewall access control lists forbid arbitrary lateral communication into internal databases.',
    explanation_ar:
      'الـ DMZ تمنع الاتصال المباشر من الإنترنت إلى الشبكة الداخلية الحساسة وتعمل كمنطقة عازلة (Buffer Zone).',
    explanation_en:
      'The DMZ serves as a cryptographic and routing buffer preventing untrusted external hosts from directly reaching internal subnets.',
  },
  {
    id: 'CH2-L2-OFF-W-P1-05',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اذكر المفهوم التفصيلي لـ «الشبكة الافتراضية الخاصة (VPN)» وبيّن كيف تحمي البيانات المنقولة عبر شبكات Wi-Fi العامة من مخاطر التنصت.',
    question_en: 'Provide a detailed definition of a Virtual Private Network (VPN) and describe how it shields transmitted data on public Wi-Fi from eavesdropping?',
    ideal_answer_ar:
      '• المفهوم: اتصال مشفر ينشئ نفقاً آمناً لنقل البيانات عبر شبكة عامة غير موثوقة.\n'
      + '• حماية شبكات Wi-Fi: في المقاهي والمطارات، يستطيع أي متطفل التقاط حزم البيانات غير المشفرة (Packet Sniffing). عند تفعيل الـ VPN، تُشفَّر كافة الحزم الصادرة من جهاز المستخدم قبل إرسالها عبر الهواء، فلا يرى المتنصت سوى بيانات عشوائية غير مفهومة، مما يحمي كلمات المرور والبيانات المالية والرسائل الشخصية.',
    ideal_answer_en:
      '• Detailed Definition: An encrypted point-to-point logical tunnel established across untrusted communication infrastructure that encapsulates and secures data packets.\n'
      + '• Wi-Fi Defense: On unencrypted or open public Wi-Fi networks, eavesdroppers can capture radio packets using packet sniffers. A VPN wraps all outbound traffic in strong cryptographic ciphers, rendering intercepted packets indecipherable gibberish.',
    explanation_ar:
      'تشفير نفق الـ VPN يحمي البيانات على مستوى طبقة النقل والشبكة بحيث تفشل جميع محاولات التنصت (Sniffing) في قراءة المحتوى.',
    explanation_en:
      'VPN tunneling encryption protects communication at the network layer, preventing packet capture analyzers from extracting plaintext credentials.',
  },
  {
    id: 'CH2-L2-OFF-W-P1-06',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح كيف تحمي «المنطقة المعزولة (DMZ)» شبكة المؤسسة الداخلية عند تعرض أحد خوادم الويب العامة للاختراق الهجومي الخارجي.',
    question_en: 'Explain how a DMZ safeguards the internal corporate network when an external attacker successfully breaches a public web server?',
    ideal_answer_ar:
      '• تحصر الضرر داخل بيئة الـ DMZ المعزولة فقط.\n'
      + '• وجود جدار حماية داخلي يمنع الخادم المخترق في الـ DMZ من بدء اتصالات جديدة مع أجهزة وشبكة الموظفين الداخلية.\n'
      + '• تسمح القواعد فقط للشبكة الداخلية ببدء الاتصال بالـ DMZ (وليس العكس)، مما يحمي قواعد البيانات السرية وملفات المؤسسة من التسريب أو التدمير.',
    ideal_answer_en:
      '• Containment: Confines the security breach strictly within the quarantined DMZ perimeter.\n'
      + '• Blocked Lateral Traversal: The internal firewall blocks the compromised DMZ server from initiating new arbitrary sessions into the internal employee network.\n'
      + '• Asymmetric Flow: Security rules strictly permit internal nodes to query the DMZ, but forbid DMZ hosts from initiating connections inward, insulating core database servers.',
    explanation_ar:
      'القاعدة الذهبية في الـ DMZ: لا يُسمح بأي اتصال يبدأ من الـ DMZ باتجاه الشبكة الداخلية (No Inward Initiation).',
    explanation_en:
      'Golden rule of DMZ architecture: DMZ hosts must never be allowed to initiate inbound connections toward internal core subnets.',
  },
  {
    id: 'CH2-L2-OFF-W-P1-07',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'ناقش الأهمية الأمنية لاستخدام «الشبكة الافتراضية الخاصة (VPN)» عند الاتصال بشبكات غير موثوقة ومخاطر إرسال البيانات بدونها.',
    question_en: 'Discuss the security necessity of using a Virtual Private Network (VPN) when connecting over untrusted networks and the risks of transmitting without it?',
    ideal_answer_ar:
      '• الأهمية: توفير نفق مشفر يحافظ على سرية كلمات المرور والبيانات المنقولة ويخفي عنوان الـ IP الحقيقي للمستخدم عن المتلصصين.\n'
      + '• مخاطر الإرسال بدونها:\n'
      + '1. تعرض البيانات الحساسة للتنصت والاعتراض من قِبل المتطفلين على نفس الشبكة.\n'
      + '2. سهولة تنفيذ هجمات "رجل في الوسط" (Man-in-the-Middle) وتزوير حزم البيانات.\n'
      + '3. تسريب اعتمادات الدخول والرموز البرمجية وبطاقات الائتمان غير المشفرة.',
    ideal_answer_en:
      '• Security Necessity: Establishes an encrypted conduit ensuring end-to-end confidentiality, masking source IP addresses, and preventing session hijacking on untrusted carriers.\n'
      + '• Risks Without VPN:\n'
      + '1. Passive Eavesdropping: Raw unencrypted packets are easily intercepted by peers on shared Wi-Fi networks.\n'
      + '2. Man-in-the-Middle (MitM) Attacks: Malicious actors can spoof routers and tamper with data streams.\n'
      + '3. Credential Harvesting: Unencrypted authentication tokens and sensitive records can be captured in transit.',
    explanation_ar:
      'الاتصال عبر شبكة عامة بدون VPN يشبه إرسال رسائل على بطاقات بريدية مكشوفة يقرؤها أي شخص في مسار النقل.',
    explanation_en:
      'Transmitting sensitive data over public Wi-Fi without a VPN is like sending open postcards: any intermediary can inspect the contents.',
  },
  {
    id: 'CH2-L2-OFF-W-P1-08',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح لماذا يُعد وضع خادم البريد الإلكتروني أو خادم الويب في «المنطقة المعزولة (DMZ)» إجراءً وقائياً أساسياً لسلامة قواعد البيانات الداخلية الحساسة.',
    question_en: 'Explain why locating mail or web servers in a DMZ is an essential precaution for preserving the integrity of sensitive internal databases?',
    ideal_answer_ar:
      '• لأن هذه الخوادم على تماس دائم ومباشر مع الجمهور الخارجي مما يجعلها الأكثر استهدافاً بالثغرات والهجمات الإلكترونية المستمرة.\n'
      + '• وضعها في الـ DMZ يضع حاجزاً أمنياً (جدار حماية داخلي) بينها وبين قواعد البيانات الحساسة، فلا تستطيع حركة المرور الخارجية التوغل في أعماق البنية التحتية، وتبقى البيانات الحيوية معزولة في بيئة داخلية محمية.',
    ideal_answer_en:
      '• Exposure Profile: Mail and web servers inherently accept unsolicited public connections from across the internet, exposing them to continuous zero-day exploits and brute-force scans.\n'
      + '• Database Shielding: Placing them in a DMZ inserts an internal firewall barrier between the bastion hosts and the internal database tiers. Outside visitors can never connect directly to production data repositories.',
    explanation_ar:
      'الخوادم العامة معرضة للاستهداف دوماً؛ فصلها في DMZ يضمن أن سقوط خادم الويب لا يعني بالضرورة سقوط قاعدة البيانات الداخلية.',
    explanation_en:
      'Public servers face nonstop vulnerability probing; placing them in a DMZ ensures a compromised front-end does not equate to a compromised corporate database.',
  },
];

// ─── MCQ وزارية — الجزء الأول ────────────────────────────────

export const CH2_L2_OFFICIAL_MCQ_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-OFF-MCQ-P1-01',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما هو المصطلح الذي يطلق على نظام أو برنامج يراقب حركة مرور الشبكة ويسمح بها أو يمنعها وفق قواعد أمنية محددة؟',
    question_en: 'What term describes a hardware system or software program that monitors network traffic and permits or blocks packets based on specified security rules?',
    options: ['الشبكة الافتراضية الخاصة', 'المنطقة المعزولة', 'جدار الحماية (Firewall)', 'نهج انعدام الثقة'],
    options_en: ['Virtual Private Network', 'Demilitarized Zone', 'Firewall', 'Zero Trust Architecture'],
    answer: 'جدار الحماية (Firewall)',
    answer_en: 'Firewall',
    explanation_ar: 'جدار الحماية (Firewall) هو المنظومة المسؤولة عن مراقبة وتصفية حركة المرور بناءً على قواعد الأمان المحددة مسبقاً.',
    explanation_en: 'A firewall is the foundational network defense mechanism inspecting and filtering traffic according to defined access rules.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-02',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'اتصال أو شبكة منطقية خاصة تُنشأ عبر شبكة عامة مثل الإنترنت وتستخدم التشفير لحماية البيانات هي:',
    question_en: 'A logical private connection or network established over a public network such as the internet using encryption to protect data is:',
    options: ['جدار الحماية', 'الشبكة الافتراضية الخاصة (VPN)', 'المنطقة المعزولة (DMZ)', 'نهج انعدام الثقة'],
    options_en: ['Firewall', 'Virtual Private Network (VPN)', 'Demilitarized Zone (DMZ)', 'Zero Trust Architecture'],
    answer: 'الشبكة الافتراضية الخاصة (VPN)',
    answer_en: 'Virtual Private Network (VPN)',
    explanation_ar: 'الشبكة الافتراضية الخاصة (VPN) توفر اتصالاً منطقياً خاصاً ومشفراً عبر شبكة الإنترنت العامة.',
    explanation_en: 'A Virtual Private Network (VPN) delivers a cryptographically secured private tunnel over public communications channels.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-03',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من الخيارات الآتية يمثل الاستخدام الأنسب والأكثر شيوعاً للشبكة الافتراضية الخاصة (VPN) في بيئات العمل الحديثة؟',
    question_en: 'Which of the following represents the most common and appropriate use of a VPN in modern enterprise environments?',
    options: [
      'الاتصال بأمان بشبكة المؤسسة من المنزل أو أثناء التنقل والعمل عن بعد',
      'حماية الأجهزة الطرفية من الفيروسات وإزالتها تلقائياً',
      'مراقبة حركة مرور الشبكة المحلية ومنع البريد العشوائي',
      'تسريع اتصالات الإنترنت العامة بدون كلمات مرور',
    ],
    options_en: [
      'Securely connecting to corporate enterprise networks while working remotely or traveling',
      'Protecting endpoint hard drives and automatically removing malicious viruses',
      'Monitoring local network traffic and eliminating incoming spam emails',
      'Accelerating public broadband throughput without requiring authentication',
    ],
    answer: 'الاتصال بأمان بشبكة المؤسسة من المنزل أو أثناء التنقل والعمل عن بعد',
    answer_en: 'Securely connecting to corporate enterprise networks while working remotely or traveling',
    explanation_ar: 'الاستخدام الأساسي للـ VPN في المؤسسات هو تمكين الموظفين البعيدين من الوصول الآمن لموارد وشبكة الشركة الداخلية.',
    explanation_en: 'The primary enterprise application of VPNs is providing secure, authenticated remote access into private corporate resources.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-04',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ماذا يُقصد بمصطلح «المنطقة المعزولة (DMZ)» في هيكلة أمان الشبكات؟',
    question_en: 'What is meant by the term "Demilitarized Zone (DMZ)" in network security architecture?',
    options: [
      'شبكة عامة مفتوحة تتيح للجميع الوصول لقواعد البيانات الحساسة',
      'منطقة توضع فيها الخوادم المعرضة للشبكة الخارجية بشكل منفصل عن الشبكة الداخلية للمؤسسة',
      'برمجية خبيثة تراقب حركة المرور وتعدل القواعد',
      'خط خاص افتراضي مشفر يربط بين الفروع',
    ],
    options_en: [
      'An open public subnet allowing universal direct access to core internal databases',
      'A segregated subnetwork where external-facing servers are isolated from the private corporate network',
      'Malicious malware that monitors packet flows and alters routing rules',
      'A dedicated encrypted point-to-point leased line connecting regional branches',
    ],
    answer: 'منطقة توضع فيها الخوادم المعرضة للشبكة الخارجية بشكل منفصل عن الشبكة الداخلية للمؤسسة',
    answer_en: 'A segregated subnetwork where external-facing servers are isolated from the private corporate network',
    explanation_ar: 'المنطقة المعزولة (DMZ) هي شبكة فرعية تعزل الخوادم العامة (كالويب) عن الشبكة الداخلية الحساسة لتقليل أثر الاختراق.',
    explanation_en: 'A Demilitarized Zone (DMZ) is a perimeter subnet that isolates external-facing hosts from internal core infrastructure.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-05',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'منطقة توضع فيها الخوادم المواجهة للجمهور لعزلها عن الشبكة الداخلية وتقليل أثر الهجمات تُسمى:',
    question_en: 'A perimeter zone where public-facing servers are placed to isolate them from internal subnets and limit breach impact is called:',
    options: ['المحيط الأمني', 'المنطقة المعزولة (DMZ)', 'مسار الاتصال', 'الأجهزة الطرفية'],
    options_en: ['Perimeter Security', 'Demilitarized Zone (DMZ)', 'Communication Path', 'Endpoints'],
    answer: 'المنطقة المعزولة (DMZ)',
    answer_en: 'Demilitarized Zone (DMZ)',
    explanation_ar: 'المنطقة المعزولة (DMZ) هي المصطلح الأكاديمي الدقيق لعزل الخوادم العامة عن الشبكة الداخلية.',
    explanation_en: 'The Demilitarized Zone (DMZ) is the specific architectural subnetwork dedicated to quarantining internet-accessible services.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-06',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من الخيارات التالية لا يمثل استخداماً صحيحاً أو وظيفة للشبكة الافتراضية الخاصة (VPN)؟',
    question_en: 'Which of the following does NOT represent a valid use case or function of a Virtual Private Network (VPN)?',
    options: [
      'تشفير الاتصال وحماية البيانات عبر شبكات غير موثوقة',
      'التخلص التلقائي من الفيروسات الموجودة على القرص الصلب',
      'الاتصال الآمن لموظفي العمل عن بعد',
      'منع التنصت على البيانات عبر شبكات Wi-Fi العامة',
    ],
    options_en: [
      'Encrypting data transmissions across untrusted networks',
      'Automatically purging and deleting viruses resident on a local hard drive',
      'Providing authenticated remote network access for telecommuting employees',
      'Preventing packet sniffing and eavesdropping over public Wi-Fi hotspots',
    ],
    answer: 'التخلص التلقائي من الفيروسات الموجودة على القرص الصلب',
    answer_en: 'Automatically purging and deleting viruses resident on a local hard drive',
    explanation_ar: 'الـ VPN يوفر نفقاً مشفراً للاتصال الشبكي ولا علاقة له بفحص الملفات أو مكافحة الفيروسات على القرص الصلب (وظيفة الـ Antivirus).',
    explanation_en: 'A VPN provides an encrypted communication tunnel; it does not scan local disks or clean infected files (which is the role of Antivirus software).',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-07',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'اتصال أو شبكة منطقية خاصة عبر شبكة عامة مثل الإنترنت تستخدم التشفير وتقنيات النفق لحماية البيانات هي:',
    question_en: 'A private logical network connection established over a public network using encryption and tunneling techniques is:',
    options: ['جدار الحماية', 'الشبكة الافتراضية الخاصة (VPN)', 'المنطقة المعزولة (DMZ)', 'نهج انعدام الثقة'],
    options_en: ['Firewall', 'Virtual Private Network (VPN)', 'Demilitarized Zone (DMZ)', 'Zero Trust'],
    answer: 'الشبكة الافتراضية الخاصة (VPN)',
    answer_en: 'Virtual Private Network (VPN)',
    explanation_ar: 'تقنية الأنفاق (Tunneling) مع التشفير عبر شبكة عامة هي التعريف العلمي الصريح لشبكات الـ VPN.',
    explanation_en: 'Tunneling protocols combined with cryptographic encapsulation over shared public media define Virtual Private Networks.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-08',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'وضع خادم الويب في DMZ يضمن أنه في حال اختراقه:',
    question_en: 'Locating a web server inside a DMZ guarantees that in the event it is compromised:',
    options: [
      'يعود الخادم للعمل تلقائياً دون إعادة تشغيل',
      'تصبح سرعة الإنترنت مضاعفة داخل الشركة',
      'يتعذر على المهاجم الوصول المباشر لقواعد البيانات والشبكة الداخلية',
      'يتم حظر عنوان IP المهاجم عالمياً في كل الشركات',
    ],
    options_en: [
      'The server immediately reboots automatically without downtime',
      'Internal corporate internet bandwidth is immediately doubled',
      'The attacker cannot directly access confidential internal databases and the corporate network',
      'The attacking IP address is globally blacklisted across all ISPs worldwide',
    ],
    answer: 'يتعذر على المهاجم الوصول المباشر لقواعد البيانات والشبكة الداخلية',
    answer_en: 'The attacker cannot directly access confidential internal databases and the corporate network',
    explanation_ar: 'فائدة الـ DMZ الكبرى هي منع الانتقال الجانبي (Lateral Movement) نحو الشبكة الداخلية وقواعد البيانات عند سقوط الخادم العام.',
    explanation_en: 'The primary value of DMZ segregation is blocking lateral movement toward production databases upon front-end web server compromise.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P1-09',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من الأجهزة أو الأنظمة التالية يراقب حركة مرور الشبكة ويسمح بها أو يمنعها وفق قواعد أمنية محددة؟',
    question_en: 'Which of the following devices or software systems inspects network traffic and permits or drops packets according to specified security rules?',
    options: ['جدار الحماية (Firewall)', 'المنطقة المعزولة', 'الشبكة الافتراضية الخاصة', 'الحوسبة الطرفية'],
    options_en: ['Firewall', 'Demilitarized Zone', 'Virtual Private Network', 'Edge Computing'],
    answer: 'جدار الحماية (Firewall)',
    answer_en: 'Firewall',
    explanation_ar: 'جدار الحماية (Firewall) هو المنظومة المصممة لمراقبة وفلترة حزم الشبكة وفق قواعد أمنية محددة.',
    explanation_en: 'A firewall is explicitly engineered to monitor, filter, and enforce access control policies on network packet flows.',
  },
];
