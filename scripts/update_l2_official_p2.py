# -*- coding: utf-8 -*-
"""
Script to update frontend/src/ch2_lesson2_officialQ_part2.ts with full English translations
"""

content = '''// ============================================================
// Ch2 · Lesson 2 · Part 2 — أسئلة وزارة الرسمية (الجزء الثاني)
// Defense in Depth · Zero Trust
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية وزارية — الجزء الثاني ─────────────────────────

export const CH2_L2_OFFICIAL_WRITTEN_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-OFF-W-P2-01',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح ما المقصود بمفهوم «الدفاع في العمق» في أمان الشبكات، ولماذا يُعد توفير طبقات متعددة أضمن من الاعتماد على وسيلة حماية واحدة؟',
    question_en: 'Explain what is meant by "Defense in Depth" in network security, and why providing multiple defensive layers is more reliable than relying on a single protection mechanism?',
    ideal_answer_ar:
      '• المفهوم: استراتيجية أمنية تعتمد على تطبيق طبقات متعددة ومتتالية من الضوابط والتدابير الأمنية عبر مكونات الشبكة والأنظمة المختلفة لحماية الأصول والبيانات.\\n'
      + '• لماذا هو أضمن: لأنه لا توجد وسيلة حماية واحدة منيعة بنسبة 100%؛ فإذا فشل خط دفاعي معين أو تم اختراقه (مثل جدار الحماية الخارجي)، تتولى الطبقة الأمنية التالية (مثل الـ DMZ أو الـ VPN أو برامج مكافحة الفيروسات على الأجهزة الطرفية) إيقاف الهجوم واحتواء الخطر، مما يمنع سقوط المنظومة بالكامل.',
    ideal_answer_en:
      '• Concept: A layered security strategy that implements multiple defensive controls across network perimeters, communication paths, and compute hosts to protect confidential enterprise data.\\n'
      + '• Why Layering is Superior: No single defense control is 100% impenetrable. If an initial barrier fails or is breached (e.g., an external firewall bypassed by an exploit), subsequent independent layers (e.g., DMZ containment, encrypted VPN tunnels, endpoint EDR/antivirus, strict access permissions) halt the threat, preventing total system collapse.',
    explanation_ar:
      'الدفاع في العمق مستوحى من الاستراتيجيات العسكرية: قلاع متعددة الأسوار؛ اختراق سور واحد لا يعني سقوط القلعة بالكامل.',
    explanation_en:
      'Defense in depth is modeled on military architecture: multiple concentric walls ensure breaching the outer wall does not surrender the fortress.',
  },
  {
    id: 'CH2-L2-OFF-W-P2-02',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'قارن بإيجاز بين الأمان التقليدي و«نهج انعدام الثقة (Zero Trust)» من حيث التعامل مع مستخدمي الشبكة الداخلية.',
    question_en: 'Briefly compare traditional perimeter security with the "Zero Trust" architecture regarding how internal network users are handled?',
    ideal_answer_ar:
      '• الأمان التقليدي: يفترض أن كل مستخدم أو جهاز داخل الشبكة الداخلية موثوق به تلقائياً بمجرد تجاوزه المحيط الخارجي (نموذج "القلعة والخندق: ثق ولكن تحقق من الخارج فقط").\\n'
      + '• نهج انعدام الثقة (Zero Trust): لا يمنح أي ثقة تلقائية لأي مستخدم أو جهاز لمجرد وجوده داخل الشبكة المؤسسية؛ ويطبق مبدأ "لا تثق بأحد أبداً، وتحقق دائماً وبشكل مستمر" (Never Trust, Always Verify)، حيث يتم التحقق من الهوية والصلاحيات وسياق الطلب مع كل محاولة وصول لمورد معين.',
    ideal_answer_en:
      '• Traditional Security: Implicit trust model ("Castle-and-Moat"). Assumes anyone or any device inside the internal network perimeter is trustworthy once past external firewalls.\\n'
      + '• Zero Trust Architecture: Completely eliminates implicit trust. Enforces the guiding principle "Never Trust, Always Verify." Every access request—regardless of originating inside or outside the physical LAN—must be dynamically authenticated, authorized, and continuously monitored.',
    explanation_ar:
      'شعار Zero Trust الأساسي هو: "Never Trust, Always Verify" (لا تثق إطلاقاً، وتحقق دائماً).',
    explanation_en:
      'The foundational tenet of Zero Trust is "Never Trust, Always Verify"—location does not equal trust.',
  },
  {
    id: 'CH2-L2-OFF-W-P2-03',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح كيف تغيرت الفرضيات الأمنية حول «المحيط الأمني» التقليدي في ظل انتشار الحوسبة السحابية والعمل عن بعد.',
    question_en: 'Explain how security assumptions regarding traditional "Perimeter Security" evolved due to cloud computing and remote work?',
    ideal_answer_ar:
      '• طُمست الحدود الخارجية للشبكة (المحيط) ولم تعد هناك خطوط فاصلة واضحة بين "داخل المؤسسة الآمن" و"خارج المؤسسة الخطر".\\n'
      + '• أصبحت خوادم وبيانات المؤسسات موزعة على خدمات سحابية متعددة (Cloud)، وأصبح الموظفون يصلون للأنظمة من منازلهم وهواتفهم وشبكات عامة متنوعة، مما جعل الاعتماد على فكرة "المحيط الأمني الواحد" غير كافٍ، وفرض التحول لنهج انعدام الثقة (Zero Trust) لحماية البيانات أينما وُجدت.',
    ideal_answer_en:
      '• Dissolution of the Perimeter: The traditional physical network perimeter dissolved; clear demarcations between "safe internal network" and "untrusted outside internet" no longer exist.\\n'
      + '• Cloud & Mobile Reality: Enterprise workloads reside across multi-cloud environments, and employees access resources remotely from personal laptops and home Wi-Fi. This architectural shift rendered centralized firewall perimeters obsolete, mandating identity-centric Zero Trust controls everywhere.',
    explanation_ar:
      'السحابة والعمل عن بعد جعلا "المحيط" يتمحور حول هوية المستخدم وبياناته (Identity as the new perimeter) وليس حول الجدران الفيزيائية للمبنى.',
    explanation_en:
      'Cloud and mobile paradigms shifted the perimeter from physical building cables to identity and cryptographic policy (Identity is the new perimeter).',
  },
  {
    id: 'CH2-L2-OFF-W-P2-04',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اذكر أمثلة على الإجراءات الأمنية الأربعة المرتبطة بطبقات الدفاع في العمق (مدخل الشبكة، مسار الاتصال، وضع الخوادم، الأجهزة الطرفية).',
    question_en: 'Provide examples of the four defensive security controls associated with Defense in Depth layers (network perimeter, communication path, server placement, endpoints)?',
    ideal_answer_ar:
      '1. مدخل الشبكة: تثبيت جدار حماية (Firewall) لحظر المنافذ غير المصرح بها وفلترة حركة المرور.\\n'
      + '2. مسار الاتصال: استخدام الشبكة الافتراضية الخاصة (VPN) وتشفير HTTPS لحماية البيانات أثناء نقلها.\\n'
      + '3. وضع الخوادم: وضع خوادم الويب العامة في المنطقة المعزولة (DMZ) وعزلها عن قواعد البيانات الحساسة.\\n'
      + '4. الأجهزة الطرفية: تثبيت وتحديث برامج مكافحة الفيروسات (Antivirus) والتحديث المستمر لأنظمة التشغيل وفرض المصادقة متعددة العوامل.',
    ideal_answer_en:
      '1. Network Perimeter: Deploying border firewalls to block unauthorized ports and screen incoming packet traffic.\\n'
      + '2. Communication Path: Enforcing encrypted VPN tunnels and TLS/HTTPS to protect in-flight data packets against wiretapping.\\n'
      + '3. Server Placement: Quarantining public-facing web/mail nodes within a Demilitarized Zone (DMZ), isolated from internal database tiers.\\n'
      + '4. Endpoints: Installing active Antivirus/EDR suites, enforcing OS security patch updates, and requiring MFA on all user workstations.',
    explanation_ar:
      'طبقات الدفاع في العمق الأربعة بكتاب الوزارة: مدخل الشبكة ← مسار الاتصال ← وضع الخوادم ← الأجهزة الطرفية.',
    explanation_en:
      'Ministry curriculum four Defense in Depth layers: Network Entrance → Communication Path → Server Placement → Endpoints.',
  },
  {
    id: 'CH2-L2-OFF-W-P2-05',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح بالتفصيل كيف يعمل «الدفاع في العمق» على حماية المؤسسة بشكل أفضل، مستعيناً بما يحدث عند اختراق أحد خطوط الدفاع.',
    question_en: 'Explain in detail how "Defense in Depth" provides superior enterprise protection, illustrating what happens when a single defensive line is breached?',
    ideal_answer_ar:
      '• يوزع التدابير الأمنية عبر مستويات متتابعة ومستقلة.\\n'
      + '• عند الاختراق: إذا تجاوز المهاجم جدار الحماية الخارجي (الطبقة 1)، يواجه فوراً عزل الـ DMZ (الطبقة 2) فلا يصل للشبكة الداخلية؛ وإذا حاول التنصت على الأسلاك، يجد البيانات مشفرة بالـ VPN (الطبقة 3)؛ وإذا أرسل برمجية خبيثة، يكتشفها ويحذفها برنامج مكافحة الفيروسات على الجهاز الطرفي (الطبقة 4). هذا التتابع يمنح فرق الأمن وقتاً للرصد والاستجابة ويمنع الخسائر الكارثية.',
    ideal_answer_en:
      '• Independent Redundancy: Distributes disparate defensive controls across consecutive independent levels.\\n'
      + '• Incident Scenario: If an attacker evades the perimeter firewall (Layer 1), they find themselves trapped within the quarantined DMZ (Layer 2). If they try network snooping, traffic is shielded by VPN encryption (Layer 3). If an exploit payload is planted, endpoint Antivirus/EDR (Layer 4) neutralizes it. Layered defenses slow attackers down and buy critical time for incident response.',
    explanation_ar:
      'ميزة الدفاع في العمق أنه لا ينهار بانهيار طبقة واحدة، بل يستمر باقي النظام في الدفاع والصمود.',
    explanation_en:
      'The principal virtue of Defense in Depth is fault tolerance: system security does not fail catastrophically upon the breach of any single control.',
  },
  {
    id: 'CH2-L2-OFF-W-P2-06',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'تحدث عن طبقات «الدفاع في العمق» الأربعة مبيناً الإجراء الأمني المرتبط بكل طبقة من مدخل الشبكة وحتى الأجهزة الطرفية.',
    question_en: 'Discuss the four layers of "Defense in Depth", specifying the designated security control assigned to each layer from network ingress down to endpoints?',
    ideal_answer_ar:
      '• مدخل الشبكة: تصفية حركة المرور ومنع المتسللين بجدار الحماية (Firewall).\\n'
      + '• مسار الاتصال: تأمين البيانات المنقولة ضد التنصت عبر الشبكة الافتراضية الخاصة (VPN) وتشفير TLS.\\n'
      + '• وضع الخوادم: عزل الخوادم المعرضة للإنترنت داخل المنطقة المعزولة (DMZ) لحماية قواعد البيانات الداخلية.\\n'
      + '• الأجهزة الطرفية: حماية حواسيب الموظفين ببرامج مكافحة الفيروسات وجدران الحماية الشخصية وتحديثات النظام الدورية.',
    ideal_answer_en:
      '• Network Ingress: Packet screening and unauthorized port blocking via Perimeter Firewalls.\\n'
      + '• Communication Path: Confidential data transport protection using VPN tunnels and cryptographic TLS.\\n'
      + '• Server Placement: Segregation of public-facing web daemons within a DMZ buffer to insulate backend databases.\\n'
      + '• Endpoints: Hardening user laptops and workstations via endpoint Antivirus, host firewalls, and timely OS patch management.',
    explanation_ar:
      'الربط الصحيح: مدخل = جدار حماية | مسار = VPN | خوادم = DMZ | أجهزة طرفية = Antivirus وتحديثات.',
    explanation_en:
      'Key pairings: Entrance = Firewall | Path = VPN | Placement = DMZ | Endpoints = Antivirus & patches.',
  },
  {
    id: 'CH2-L2-OFF-W-P2-07',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'وضح كيف يساهم تطبيق «نهج انعدام الثقة (Zero Trust)» في التحقق من كل عملية وصول بناءً على الهوية والصلاحيات والسياق.',
    question_en: 'Clarify how implementing a "Zero Trust" framework verifies every access request based on identity, privileges, and context?',
    ideal_answer_ar:
      '• الهوية: التأكد من هوية المستخدم الحقيقية عبر المصادقة القوية (MFA) وعدم الاكتفاء باسم المستخدم وكلمة المرور.\\n'
      + '• الصلاحيات: تطبيق مبدأ "الامتياز الأقل" (Least Privilege)، بحيث لا يُعطى المستخدم إلا الحد الأدنى من الأذونات التي تلزم لإنجاز مهامه فقط.\\n'
      + '• السياق: تقييم حالة الجهاز (هل هو محدث وخالٍ من الفيروسات؟)، وموقع الاتصال الجغرافي، وتوقيت الطلب قبل منح حق الوصول للملفات والبيانات الحساسة.',
    ideal_answer_en:
      '• Identity Verification: Demanding robust MFA credentials, eliminating reliance on static single passwords.\\n'
      + '• Least Privilege Permissions: Restricting access strictly to the minimal data and tools required for the immediate task.\\n'
      + '• Contextual Inspection: Evaluating endpoint health (OS patch status, antivirus state), geolocation anomalies, device ownership, and access timestamps before authorizing access to sensitive assets.',
    explanation_ar:
      'أركان فحص Zero Trust الثلاثة: الهوية (من أنت؟) + الصلاحيات (ما حقك الأدنى؟) + السياق (أمان جهازك وبيئتك).',
    explanation_en:
      'The three validation pillars of Zero Trust: Identity (Who?) + Least Privilege (Minimal necessary access) + Context (Device health & telemetry).',
  },
  {
    id: 'CH2-L2-OFF-W-P2-08',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar: 'اشرح كيف يتكامل كل من جدار الحماية، والشبكة الافتراضية الخاصة، والمنطقة المعزولة، وضوابط الأجهزة الطرفية لتشكيل استراتيجية دفاع في العمق متكاملة.',
    question_en: 'Explain how Firewalls, VPNs, DMZs, and Endpoint controls integrate synergistically to form a complete Defense in Depth strategy?',
    ideal_answer_ar:
      '• جدار الحماية يحمي المدخل بفرز حركة المرور.\\n'
      + '• الـ VPN يؤمن النقل بتشفير القناة للموظفين والشبكات البعيدة.\\n'
      + '• الـ DMZ تعزل الخوادم العامة عن البنية التحتية الداخلية لحصر الاختراقات.\\n'
      + '• ضوابط الأجهزة الطرفية تحمي الحواسيب الفردية من البرمجيات الخبيثة وتمنع تسريب البيانات.\\n'
      + '• التكامل: يشكل سداً دفاعياً متعدد الطبقات يعالج كل مرحلة من مراحل الهجوم السيبراني (المدخل، النقل، الاستضافة، والاستخدام).',
    ideal_answer_en:
      '• Firewalls guard the perimeter by filtering untrusted ingress/egress packets.\\n'
      + '• VPNs secure transport channels via cryptographic tunneling for remote operators.\\n'
      + '• DMZs quarantine internet-exposed servers to contain breach blast radiuses away from private databases.\\n'
      + '• Endpoint Controls neutralize malware and enforce client-side access hygiene on local devices.\\n'
      + '• Synergy: Together they establish a resilient multi-echelon shield securing all phases of the cyber threat kill chain (ingress, transit, compute hosting, and endpoint execution).',
    explanation_ar:
      'التكامل الأمني الحقيقي يعني أن كل أداة تعالج ثغرة لا تستطيع الأداة الأخرى تغطيتها بمفردها.',
    explanation_en:
      'Holistic security integration ensures that each technology directly mitigates blind spots left unguarded by the others.',
  },
];

// ─── MCQ وزارية — الجزء الثاني ──────────────────────────────

export const CH2_L2_OFFICIAL_MCQ_P2: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-OFF-MCQ-P2-01',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من الخيارات التالية يُعَد التعريف الدقيق لمفهوم «الدفاع في العمق» في أمان الشبكات؟',
    question_en: 'Which of the following represents the exact definition of "Defense in Depth" in network security?',
    options: [
      'الاعتماد الكامل على جدار حماية قوي عند حدود الشبكة',
      'استخدام طبقات متعددة من الضوابط الأمنية بحيث تقلل الطبقات الأخرى الخطر إذا فشلت إحدى الطبقات',
      'منح الثقة التلقائية لجميع الأجهزة داخل المؤسسة',
      'تشفير حركة المرور بالكامل حصرياً عند استخدام شبكات Wi-Fi العامة',
    ],
    options_en: [
      'Relying entirely on a single high-performance firewall at the network perimeter',
      'Using multiple layers of security controls so that if one layer fails, subsequent layers mitigate the risk',
      'Granting automatic implicit trust to all internal corporate devices',
      'Encrypting network traffic exclusively when connected to public Wi-Fi hotspots',
    ],
    answer: 'استخدام طبقات متعددة من الضوابط الأمنية بحيث تقلل الطبقات الأخرى الخطر إذا فشلت إحدى الطبقات',
    answer_en: 'Using multiple layers of security controls so that if one layer fails, subsequent layers mitigate the risk',
    explanation_ar: 'الدفاع في العمق هو استراتيجية تعدد الطبقات الأمنية لتقليل الخطر عند فشل أي خط دفاعي.',
    explanation_en: 'Defense in Depth is explicitly defined as deploying multi-layered defensive barriers to ensure security resilience if any single control fails.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-02',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما هي الفرضية الأساسية التي يعتمد عليها «نهج انعدام الثقة (Zero Trust)» في تأمين موارد المؤسسة؟',
    question_en: 'What is the foundational premise underlying the "Zero Trust" model for securing organizational resources?',
    options: [
      'اعتبار كل جهاز أو مستخدم داخل شبكة المؤسسة موثوقاً تلقائياً',
      'عدم منح الثقة تلقائياً لمستخدم أو جهاز لمجرد وجوده داخل الشبكة وفحص الهوية والسياق دائماً',
      'الاعتماد المطلق على المحيط الأمني الخارجي وعدم فحص التطبيقات الداخلية',
      'تشفير رسائل البريد الإلكتروني فقط دون الاهتمام بصلاحيات الوصول للبيانات',
    ],
    options_en: [
      'Assuming all devices and users inside the physical office network are inherently trustworthy',
      'Never granting implicit trust to users or devices based on network location, always verifying identity and context',
      'Relying entirely on outer perimeter barriers while leaving internal communication uninspected',
      'Encrypting email correspondence while ignoring data access privileges',
    ],
    answer: 'عدم منح الثقة تلقائياً لمستخدم أو جهاز لمجرد وجوده داخل الشبكة وفحص الهوية والسياق دائماً',
    answer_en: 'Never granting implicit trust to users or devices based on network location, always verifying identity and context',
    explanation_ar: 'الفرضية الأساسية لـ Zero Trust: غياب الثقة التلقائية والتحقق المستمر من الهوية وسياق كل طلب.',
    explanation_en: 'Zero Trust assumes breach and mandates continuous verification of identity and context rather than trusting internal location.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-03',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'المفهوم الذي يصف الحدود التقليدية التي تفترض أن ما بداخل شبكة المؤسسة آمن تماماً وما خارجها غير آمن والتي طمستها السحابة والعمل عن بعد هو:',
    question_en: 'Which concept describes the traditional boundary assuming everything inside the enterprise network is safe and everything outside is hostile, now eroded by cloud and remote work?',
    options: ['المنطقة المعزولة', 'المحيط الأمني (Perimeter Security)', 'الحوسبة الطرفية', 'التراكب الكمي'],
    options_en: ['Demilitarized Zone', 'Perimeter Security', 'Edge Computing', 'Quantum Superposition'],
    answer: 'المحيط الأمني (Perimeter Security)',
    answer_en: 'Perimeter Security',
    explanation_ar: 'المحيط الأمني (Perimeter Security) هو النموذج الكلاسيكي الذي طمسته الحوسبة السحابية وانتقال الموظفين للعمل عن بعد.',
    explanation_en: 'Perimeter Security represents the historic boundary defense model that has been eroded by dispersed cloud workloads and telecommuting.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-04',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي من طبقات «الدفاع في العمق» التالية ترتبط ارتباطاً مباشراً بتثبيت برامج مكافحة الفيروسات وتحديث نظام التشغيل؟',
    question_en: 'Which of the following "Defense in Depth" layers is directly concerned with installing antivirus software and updating operating systems?',
    options: ['مدخل الشبكة', 'مسار الاتصال', 'وضع الخوادم', 'الأجهزة الطرفية (Endpoints)'],
    options_en: ['Network Ingress', 'Communication Path', 'Server Placement', 'Endpoints'],
    answer: 'الأجهزة الطرفية (Endpoints)',
    answer_en: 'Endpoints',
    explanation_ar: 'طبقة الأجهزة الطرفية (Endpoints) هي المسؤولة عن تأمين حواسيب وهواتف المستخدمين ببرامج مكافحة الفيروسات وتحديثات النظام.',
    explanation_en: 'Endpoint security directly oversees client laptops, smartphones, and workstations through antivirus deployment and OS patch management.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-05',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'ما هو المصطلح الذي يعبر عن نهج أمني لا يمنح الثقة تلقائياً لمستخدم أو جهاز لمجرد وجوده داخل الشبكة؟',
    question_en: 'What term describes a security approach that refuses to grant automatic trust to users or devices merely because they reside inside the network?',
    options: ['الدفاع في العمق', 'جدار الحماية', 'نهج انعدام الثقة (Zero Trust)', 'الشبكة الافتراضية الخاصة'],
    options_en: ['Defense in Depth', 'Firewall', 'Zero Trust Architecture', 'Virtual Private Network'],
    answer: 'نهج انعدام الثقة (Zero Trust)',
    answer_en: 'Zero Trust Architecture',
    explanation_ar: 'نهج انعدام الثقة (Zero Trust) هو المصطلح الدقيق لنفي الثقة التلقائية عن مكونات الشبكة الداخلية.',
    explanation_en: 'Zero Trust is the formal industry framework that eliminates default trust based on physical or logical network position.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-06',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'طبقة الدفاع في العمق التي تهتم بتثبيت برنامج مكافحة الفيروسات والحفاظ على تحديث نظام التشغيل هي:',
    question_en: 'The Defense in Depth layer dedicated to running antivirus software and maintaining current OS patches is:',
    options: ['مدخل الشبكة', 'مسار الاتصال', 'وضع الخوادم', 'الأجهزة الطرفية'],
    options_en: ['Network Entrance', 'Communication Path', 'Server Placement', 'Endpoints'],
    answer: 'الأجهزة الطرفية',
    answer_en: 'Endpoints',
    explanation_ar: 'الأجهزة الطرفية تشمل كافة حواسيب ومحطات عمل الموظفين المعرضة للبرمجيات الخبيثة.',
    explanation_en: 'Endpoints encompass employee desktops and personal devices that require endpoint protection agents and regular software updates.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-07',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'الحدود التقليدية التي تفترض أن داخل شبكة المؤسسة آمن تماماً وخارجها خطر تُعرف بـ:',
    question_en: 'The traditional boundary assuming internal enterprise networks are completely safe while outside networks are hostile is known as:',
    options: ['المحيط الأمني', 'المنطقة المعزولة', 'الحوسبة الطرفية', 'الكيوبت'],
    options_en: ['Perimeter Security', 'Demilitarized Zone', 'Edge Computing', 'Qubit'],
    answer: 'المحيط الأمني',
    answer_en: 'Perimeter Security',
    explanation_ar: 'المحيط الأمني هو المفهوم الكلاسيكي الذي كان يفصل شبكة الشركة عن العالم الخارجي.',
    explanation_en: 'Perimeter Security is the conventional boundary paradigm that segregated corporate LANs from external threats.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-08',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'أي مما يلي يمثل الطبقة الأولى (مدخل الشبكة) في استراتيجية الدفاع في العمق؟',
    question_en: 'Which of the following represents the first layer (Network Entrance) in a Defense in Depth strategy?',
    options: [
      'منع الاتصال غير المصرح به باستخدام جدار الحماية',
      'تشفير الاتصال باستخدام الشبكة الافتراضية الخاصة',
      'فصل الخوادم المواجهة للجمهور باستخدام المنطقة المعزولة',
      'تثبيت برنامج مكافحة الفيروسات على الأجهزة الطرفية',
    ],
    options_en: [
      'Blocking unauthorized incoming connections using a perimeter Firewall',
      'Encrypting data in transit using a Virtual Private Network (VPN)',
      'Segregating public-facing web servers using a Demilitarized Zone (DMZ)',
      'Installing antivirus software on local endpoint workstations',
    ],
    answer: 'منع الاتصال غير المصرح به باستخدام جدار الحماية',
    answer_en: 'Blocking unauthorized incoming connections using a perimeter Firewall',
    explanation_ar: 'مدخل الشبكة (الطبقة 1) يُحمى دائماً بجدار الحماية (Firewall) لفرز الحزم والمنافذ.',
    explanation_en: 'The Network Ingress layer (Layer 1) is defended by firewalls filtering packet traffic at the outer boundary.',
  },
  {
    id: 'CH2-L2-OFF-MCQ-P2-09',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar: 'نهج أمني لا يمنح الثقة تلقائياً لمستخدم أو جهاز لمجرد وجوده داخل الشبكة أو ملكيته للمؤسسة هو:',
    question_en: 'A security strategy that refuses implicit trust to users or devices simply because they are inside the network or corporate-owned is:',
    options: ['الدفاع في العمق', 'نهج انعدام الثقة (Zero Trust)', 'جدار الحماية', 'المحيط الأمني'],
    options_en: ['Defense in Depth', 'Zero Trust Architecture', 'Firewall', 'Perimeter Security'],
    answer: 'نهج انعدام الثقة (Zero Trust)',
    answer_en: 'Zero Trust Architecture',
    explanation_ar: 'نهج انعدام الثقة (Zero Trust) يعتبر أي جهاز أو مستخدم غير موثوق حتى يتم التحقق الصريح منه.',
    explanation_en: 'Zero Trust assumes every device and user is untrusted until explicitly and continuously authenticated.',
  },
];
'''

with open('frontend/src/ch2_lesson2_officialQ_part2.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated frontend/src/ch2_lesson2_officialQ_part2.ts successfully!")
