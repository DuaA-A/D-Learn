# -*- coding: utf-8 -*-
"""
Script to update frontend/src/ch2_lesson2_hardQ_part1.ts with full English translations
"""

content = '''// ============================================================
// Ch2 · Lesson 2 · Part 1 — أسئلة تحديات ونمط الامتحان (الجزء الأول)
// Firewall · VPN · DMZ
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

// ─── مقالية متقدمة — الجزء الأول ───────────────────────────

export const CH2_L2_HARD_WRITTEN_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-HARD-W-P1-01',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 6,
    question_ar:
      'تقوم شركة تجارة إلكترونية بتصميم شبكتها. لديها موقع ويب عام يتلقى زيارات خارجية، وموظفون يخدمون العملاء من منازلهم، وقاعدة بيانات مركزية تحتوي على بطاقات الائتمان.\\n'
      + '1. حدد موضع كل أصل من هذه الأصول في التصميم الأمني.\\n'
      + '2. اشرح كيف تحمي الـ DMZ قاعدة البيانات لو تعرض خادم الويب لاختراق كامل.',
    question_en:
      'An e-commerce enterprise is architecting its network. It operates a public storefront receiving global traffic, telecommuting customer service representatives, and a core credit card database.\\n'
      + '1. Designate the architectural security zone for each asset.\\n'
      + '2. Explain how the DMZ insulates the core database if the public web server is completely compromised.',
    ideal_answer_ar:
      '1. توزيع الأصول:\\n'
      + '   • موقع الويب العام: يوضع داخل المنطقة المعزولة (DMZ).\\n'
      + '   • موظفو المنازل: يتصلون عبر شبكة افتراضية خاصة مشفرة (VPN) وصولاً لشبكة العمل.\\n'
      + '   • قاعدة بيانات بطاقات الائتمان: توضع في أعمق طبقة داخل الشبكة الداخلية المحمية خلف جدار الحماية الداخلي.\\n'
      + '2. حماية الـ DMZ لقاعدة البيانات عند الاختراق:\\n'
      + '   • الخادم العام معزول بين جدارين ناريين؛ فإذا سقط بالكامل بيد المهاجم، يُمنع من الوصول المباشر للشبكة الداخلية لأن جدار الحماية الداخلي يسقط أي محاولة اتصال تبدأ من الـ DMZ نحو الداخل، مما يحصر الضرر ويمنع سرقة قاعدة البيانات.',
    ideal_answer_en:
      '1. Asset Architectural Placement:\\n'
      + '   • Public Web Server: Placed inside the Demilitarized Zone (DMZ).\\n'
      + '   • Telecommuting Employees: Connect through an encrypted Remote-Access VPN gateway into private subnetworks.\\n'
      + '   • Credit Card Database: Placed in the innermost private database tier, isolated behind internal stateful firewalls.\\n'
      + '2. Database Insulation upon Front-End Breach:\\n'
      + '   • The web server is isolated between outer and inner firewalls. If compromised, internal firewall access control lists (ACLs) strictly drop any connection attempt initiated outward from the DMZ into internal subnets, containing the adversary within the DMZ and protecting the database.',
    explanation_ar:
      'التصميم النموذجي لشبكات المؤسسات: خوادم الإنترنت في الـ DMZ، الموظفون البعيدون عبر VPN، والبيانات الحساسة في الشبكة الداخلية خلف جدار حماية ثانٍ.',
    explanation_en:
      'Standard enterprise topology: Internet servers in DMZ, remote staff via VPN, and core database clusters locked behind internal segregation firewalls.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-02',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar:
      'ادعى مسؤول شبكات: "بما أننا قمنا بتركيب أقوى جدار حماية عند مدخل الشبكة، فلن نحتاج لتطبيق VPN لموظفي العمل عن بعد ولا نحتاج لوضع الخوادم في DMZ".\\n'
      + 'انقد هذا الادعاء مبيناً ثغرتين أمنيتين خطيرتين تنتجان عنه.',
    question_en:
      'A network administrator claimed: "Since we installed the strongest perimeter firewall at our network gateway, we do not need VPNs for remote employees, nor do we need a DMZ for our servers."\\n'
      + 'Critique this claim by exposing two grave security vulnerabilities that result from it.',
    ideal_answer_ar:
      '• الادعاء خاطئ وغير آمن تماماً.\\n'
      + '• الثغرة الأولى (غياب VPN): بيانات الموظفين أثناء انتقالها عبر الإنترنت العام ستكون غير مشفرة أو مكشوفة للتنصت والاعتراض على شبكات Wi-Fi، وجدار الحماية عند البوابة لا يستطيع حماية البيانات وهي لا تزال في طريقها عبر الإنترنت.\\n'
      + '• الثغرة الثانية (غياب DMZ): وضع الخوادم العامة داخل الشبكة الداخلية مباشرة يعني أنه في حال اختراق خادم الويب بثغرة برمجية، يصبح المهاجم فوراً داخل الشبكة الداخلية وبإمكانه الانتقال أفقياً وسرقة كافة الملفات وقواعد البيانات دون أي حواجز.',
    ideal_answer_en:
      '• Critique: The claim is fundamentally flawed and violates foundational Defense in Depth principles.\\n'
      + '• Vulnerability 1 (Absence of VPN): Perimeter firewalls only inspect packets arriving at the corporate gateway. Remote employee traffic traversing the public internet without an encrypted VPN tunnel is vulnerable to eavesdropping, packet sniffing, and credential theft over public Wi-Fi.\\n'
      + '• Vulnerability 2 (Absence of DMZ): Hosting public web servers directly on the internal LAN allows attackers who exploit a web application vulnerability to immediately achieve lateral movement across the entire corporate subnet, capturing file shares and databases unchecked.',
    explanation_ar:
      'جدار الحماية يحمي المدخل فقط، لكنه لا يحمي البيانات أثناء سفرها عبر الإنترنت (دور الـ VPN) ولا يحمي من الانتشار الداخلي إذا كان الخادم في نفس الشبكة الداخلية (دور الـ DMZ).',
    explanation_en:
      'Firewalls defend boundaries, but cannot protect unencrypted in-flight internet traffic (VPN role) or restrict lateral compromise without subnet segregation (DMZ role).',
  },
  {
    id: 'CH2-L2-HARD-W-P1-03',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 6,
    question_ar: 'قارن في جدول دقيق بين: جدار الحماية (Firewall)، والشبكة الافتراضية الخاصة (VPN)، والمنطقة المعزولة (DMZ) من حيث: الوظيفة، وموقع التطبيق، والتهديد المعالج.',
    question_en: 'Compare in a structured table: Firewall, Virtual Private Network (VPN), and Demilitarized Zone (DMZ) across: Primary Function, Deployment Location, and Specific Threat Mitigated.',
    ideal_answer_ar:
      '• جدار الحماية (Firewall):\\n'
      + '  - الوظيفة: مراقبة وتصفية حركة المرور وفق قواعد مسبقة.\\n'
      + '  - الموقع: مدخل/محيط الشبكة، وبين المناطق الشبكية المختلفة.\\n'
      + '  - التهديد: الاتصالات غير المصرح بها، وفحص المنافذ، والهجمات الشبكية المباشرة.\\n'
      + '• الشبكة الافتراضية الخاصة (VPN):\\n'
      + '  - الوظيفة: إنشاء نفق مشفر وآمن للاتصال عبر شبكة عامة.\\n'
      + '  - الموقع: مسار الاتصال بين الأجهزة البعيدة وبوابة الشبكة.\\n'
      + '  - التهديد: التنصت واعتراض البيانات وهجمات رجل في الوسط على الشبكات غير الموثوقة.\\n'
      + '• المنطقة المعزولة (DMZ):\\n'
      + '  - الوظيفة: عزل الخوادم العامة عن الشبكة الداخلية الحساسة.\\n'
      + '  - الموقع: منطقة شبكية فرعية بين جدار الحماية الخارجي والداخلي.\\n'
      + '  - التهديد: انتشار الاختراق والانتقال الأفقي للمهاجم عند سقوط الخادم العام.',
    ideal_answer_en:
      '• Firewall:\\n'
      + '  - Function: Inspects and filters packet traffic according to predetermined access control lists (ACLs).\\n'
      + '  - Location: Network ingress boundary and inter-subnet routing junctions.\\n'
      + '  - Threat Mitigated: Unauthorized port access, network probes, and external unauthorized connections.\\n'
      + '• Virtual Private Network (VPN):\\n'
      + '  - Function: Constructs an encrypted cryptographic tunnel encapsulating packets over public channels.\\n'
      + '  - Location: Communication transit path between remote hosts and the corporate gateway.\\n'
      + '  - Threat Mitigated: Eavesdropping, packet sniffing, credential harvesting, and public Wi-Fi MitM attacks.\\n'
      + '• Demilitarized Zone (DMZ):\\n'
      + '  - Function: Quarantines internet-facing services within an isolated subnetwork.\\n'
      + '  - Location: Buffer perimeter subnet situated between external and internal firewalls.\\n'
      + '  - Threat Mitigated: Lateral adversary movement and database compromise following front-end server exploitation.',
    explanation_ar:
      'لكل أداة دور فريد: جدار الحماية (حارس البوابة)، الـ VPN (النفق المدرع)، والـ DMZ (غرفة العزل المحصنة).',
    explanation_en:
      'Distinct specializations: Firewall is the gatekeeper, VPN is the armored transport tunnel, and DMZ is the quarantine containment room.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-04',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'اشرح بالتفصيل: لماذا لا يحمي استخدام الـ VPN الجهاز من الإصابة بالفيروسات، ولماذا لا يحمي جدار الحماية حركة مرور الـ VPN المشفرة إذا لم يتم فحصها؟',
    question_en: 'Explain in detail: Why does using a VPN fail to protect an endpoint device from malware infection? And why does a firewall struggle to protect encrypted VPN traffic if it cannot inspect payloads?',
    ideal_answer_ar:
      '1. الـ VPN لا يحمي من الفيروسات: لأن وظيفته تنحصر في تشفير قناة الاتصال أثناء النقل؛ فلو قام المستخدم بتنزيل ملف ضار أو مرفق مصاب بفيروس عبر نفق الـ VPN، سينقله النفق بأمان وسرية تامة دون كشفه لأنه نفق أعمى لا يفحص محتوى الملفات.\\n'
      + '2. جدار الحماية والـ VPN المشفر: حركة مرور الـ VPN مشفرة بالكامل، مما يجعل جدار الحماية العادي عاجزاً عن قراءة محتوى الحزم المارة بداخله لاكتشاف البرمجيات الخبيثة، ما لم يتم إنهاء التشفير وفحصه بجدران حماية متقدمة (Deep Packet Inspection).',
    ideal_answer_en:
      '1. Why VPN Fails Against Malware: A VPN is strictly an encrypted transport tunnel. It authenticates and encrypts packets, but does not inspect file contents. If a user downloads a trojan or ransomware payload over a VPN, the tunnel faithfully and securely delivers the malware directly to the endpoint.\\n'
      + '2. Why Firewalls Cannot Inspect Blind VPN Traffic: Firewalls rely on inspecting packet headers and payload contents. When traffic travels encapsulated in an encrypted VPN envelope, legacy packet-filtering firewalls perceive only indecipherable ciphertext, unable to detect malicious command-and-control signatures without deep packet inspection (DPI) decryption proxies.',
    explanation_ar:
      'الـ VPN يؤمن المسار فقط ولا يفحص الحمولة؛ وجدار الحماية يعجز عن فحص الحزم المشفرة دون فك تشفيرها.',
    explanation_en:
      'A VPN secures the pipeline without filtering payload semantics, while firewalls are blinded by encryption unless armed with SSL/TLS inspection engines.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-05',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar: 'علّل: لماذا يُعد وضع خادم البريد وخادم الويب في الـ DMZ آمناً، ومع ذلك يلزم فرض جدار حماية داخلي بين الـ DMZ والشبكة الداخلية؟',
    question_en: 'Justify: Why is placing web and mail servers in a DMZ considered secure, yet deploying an internal firewall between the DMZ and the private LAN remains strictly mandatory?',
    ideal_answer_ar:
      '• وضعهما في الـ DMZ يعزلهما عن الداخل لتلقي طلبات الإنترنت بأمان.\\n'
      + '• فرض جدار حماية داخلي ضروري للغاية لأنه في حال غيابه، تصبح الـ DMZ متصلة مباشرة بالشبكة الداخلية؛ وإذا استغل مهاجم ثغرة في خادم الويب، سيتمكن من اختراق أجهزة الموظفين وقواعد البيانات دون عائق. جدار الحماية الداخلي يمنع الخادم المخترق في الـ DMZ من بدء أي اتصال بالداخل.',
    ideal_answer_en:
      '• Placing servers in a DMZ isolates public services from the private LAN.\\n'
      + '• An internal firewall is mandatory because without it, the DMZ would possess unhindered routing access into the internal LAN. If an external attacker compromises the web server via remote code execution, the absence of an internal firewall would permit direct traversal into employee desktops and core database clusters. The internal firewall enforces strict one-way access control rules.',
    explanation_ar:
      'الـ DMZ بدون جدار حماية داخلي تفقد قيمتها؛ الحاجز الداخلي هو ما يمنع المهاجم من التوغل إلى قلب المؤسسة.',
    explanation_en:
      'A DMZ without an internal firewall is pointless; the internal barrier is what stops an adversary from executing lateral movement into internal assets.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-06',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar:
      'اتصل موظف بشبكة Wi-Fi عامة بمطار لفتح مستندات سرية للشركة.\\n'
      + '1. وضح كيف يمكن لمهاجم على نفس الشبكة التنصت عليه دون VPN؟\\n'
      + '2. اشرح كيف يعطل بروتوكول الـ VPN هذا الهجوم ويحمي البيانات؟',
    question_en:
      'An employee connects to a public airport Wi-Fi hotspot to access confidential corporate documents.\\n'
      + '1. Explain how an adversary on the same wireless network can eavesdrop on traffic without a VPN?\\n'
      + '2. Describe how a VPN protocol defeats this attack and safeguards enterprise data?',
    ideal_answer_ar:
      '1. بدون VPN: موجات Wi-Fi تنتشر في الهواء، وبإمكان المهاجم استخدام برنامج التقاط الحزم (Packet Sniffer) لجمع كل الحزم اللاسلكية المارة في الهواء، مما يتيح له قراءة المستندات وكلمات المرور غير المشفرة وسرقة ملفات تعريف الارتباط للجلسة.\\n'
      + '2. مع VPN: يقوم العميل بتشفير كل حزمة صادرة من حاسوب الموظف باستخدام خوارزميات قوية (كـ AES) قبل إرسالها عبر الهواء؛ فعندما يلتقط المهاجم الحزم، لا يرى سوى نص مشفر عشوائي لا يمكن فكه، وتمر البيانات بأمان عبر النفق إلى خادم الشركة.',
    ideal_answer_en:
      '1. Without VPN: Wi-Fi broadcasts radio waves omnidirectionally. An adversary operating in promiscuous mode with a packet analyzer (sniffer) captures unencrypted packets directly from the air, extracting plaintext session cookies, credentials, and confidential document fragments.\\n'
      + '2. With VPN: The client encrypts entire IP packets using military-grade ciphers (e.g., AES-256) inside an encrypted tunnel before emitting wireless signals. The eavesdropper captures only cryptographically opaque bytes routed to the corporate VPN gateway, protecting confidentiality.',
    explanation_ar:
      'الـ VPN يحول الاتصال عبر وسيط مفتوح (الهواء) إلى ما يشبه كابلاً خاصاً ومغلقاً بالكامل.',
    explanation_en:
      'A VPN converts an open, public broadcast medium into a cryptographically sealed private communication conduit.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-07',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar:
      'نجح مهاجم في استغلال ثغرة أمنية في خادم ويب موجود داخل الـ DMZ.\\n'
      + 'اشرح الآليات الدفاعية التي تمنع المهاجم من الانتقال أفقياً (Lateral Movement) إلى الخوادم الداخلية وقواعد البيانات.',
    question_en:
      'An attacker exploits a zero-day vulnerability in a web server located inside the DMZ.\\n'
      + 'Explain the defensive controls that prevent the attacker from moving laterally into internal corporate servers and databases.',
    ideal_answer_ar:
      '1. جدار الحماية الداخلي: يُهيأ لمنع أي اتصال يبدأ من الـ DMZ باتجاه الشبكة الداخلية (السماح فقط بالردود على الطلبات المبدوءة من الداخل).\\n'
      + '2. التجزئة الشبكية (Network Segmentation): وضع قاعدة البيانات في شبكة فرعية منفصلة تماماً لا تتحدث مع الـ DMZ إلا عبر منافذ محددة جداً (مثل منفذ SQL المحدد) مع المصادقة.\\n'
      + '3. عزل الخوادم: عدم مشاركة أي كلمات مرور أو مفاتيح تشفير أو حسابات مستخدمين بين خوادم الـ DMZ وخوادم الشبكة الداخلية، مما يحاصر المهاجم في جزيرة معزولة.',
    ideal_answer_en:
      '1. Internal Firewall Rules: Configured with a unidirectional policy: strictly drop any connection initiation request from the DMZ toward internal subnets, permitting only stateful return replies.\\n'
      + '2. Network Segmentation: Placing core database clusters in an isolated private VLAN accessible only via explicit database ports (e.g., TCP 1433/3306) with authenticated application queries, blocking direct shell or SSH traversal.\\n'
      + '3. Credential Isolation: Disallowing shared local administrative passwords between DMZ bastion servers and internal Active Directory domain controllers, preventing automated privilege escalation.',
    explanation_ar:
      'منع الانتقال الأفقي يتحقق بثلاثية: منع الاتصال الداخلي العكسي + قفل المنافذ + عزل الحسابات والاعتمادات.',
    explanation_en:
      'Halting lateral movement requires the security trifecta: asymmetric ingress firewall rules + tight port whitelisting + credential segregation.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-08',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar: 'ناقش: كيف يحقق الجمع بين التشفير عبر VPN وقواعد جدار الحماية توازناً فعالاً بين سرية البيانات والتحكم في الوصول؟',
    question_en: 'Discuss: How does pairing VPN encryption with firewall policy rules achieve an effective balance between data confidentiality and access control?',
    ideal_answer_ar:
      '• التشفير عبر VPN: يضمن سرية وسلامة البيانات أثناء نقلها عبر الشبكات العامة بحيث لا يقرأها أو يعدلها أي طرف خارجي في مسار الاتصال.\\n'
      + '• قواعد جدار الحماية: تفرض التحكم الدقيق في الوصول عند وصول تلك البيانات لبوابة الشبكة؛ فتفحص هوية المستخدم وتسمح له بالوصول فقط للموارد والمنافذ المصرح له بها دون غيرها.\\n'
      + '• التوازن: الـ VPN يحمي البيانات في الطريق (Confidentiality)، وجدار الحماية ينظم الأذونات عند الوصول (Access Control).',
    ideal_answer_en:
      '• VPN Encryption: Protects data confidentiality and integrity in transit across public infrastructure, ensuring unauthorized third parties cannot inspect or modify packet flows.\\n'
      + '• Firewall Policies: Enforce strict access control upon arrival at the network gateway, validating origin identity and restricting user traversal strictly to authorized enterprise subnets and ports.\\n'
      + '• Equilibrium: The VPN secures transmission channels (Confidentiality), while the firewall governs perimeter authorization (Access Control).',
    explanation_ar:
      'الأمان المتكامل = حماية البيانات في حالة النقل (Data in Transit عبر VPN) + حماية الموارد من الدخول غير المصرح به (عبر Firewall).',
    explanation_en:
      'Comprehensive security combines Data in Transit protection (VPN tunneling) with rigorous policy enforcement (Firewall filtering).',
  },
  {
    id: 'CH2-L2-HARD-W-P1-09',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'وضّح المسار التتابعي لطلب تصفح وارد من مستخدم عبر الإنترنت وصولاً لخادم الويب في الـ DMZ ثم استعلام قاعدة البيانات الداخلية، محدداً دور جدران الحماية.',
    question_en: 'Trace the sequential path of an inbound web request from an internet user to a DMZ web server, followed by an internal database query, highlighting the role of each firewall.',
    ideal_answer_ar:
      '1. يرسل الزائر طلب HTTP/HTTPS عبر الإنترنت.\\n'
      + '2. جدار الحماية الخارجي: يفحص الطلب ويسمح له بالمرور عبر منفذ 443 حصراً نحو خادم الويب داخل الـ DMZ.\\n'
      + '3. خادم الويب في الـ DMZ: يعالج الطلب ويولد استعلاماً للبيانات (SQL Query).\\n'
      + '4. جدار الحماية الداخلي: يفحص استعلام قاعدة البيانات الوارد من الـ DMZ ويسمح به حصرياً عبر منفذ قاعدة البيانات (مثل 3306) نحو خادم قاعدة البيانات في الشبكة الداخلية.\\n'
      + '5. الرد: تعيد قاعدة البيانات النتيجة لخادم الويب، الذي يُنشئ صفحة الويب ويرسلها للزائر عبر جدار الحماية الخارجي.',
    ideal_answer_en:
      '1. Internet Request: External client initiates an HTTPS request destined for the corporate web application.\\n'
      + '2. External Firewall Inspection: Evaluates incoming packets and permits traffic strictly on port 443 into the DMZ web server.\\n'
      + '3. DMZ Web Processing: The web server processes client business logic and formulates a structured SQL query.\\n'
      + '4. Internal Firewall Inspection: Inspects the outbound query from the DMZ server, permitting access exclusively across designated database ports (e.g., TCP 1433/3306) toward the internal database cluster.\\n'
      + '5. Response Propagation: The database returns records; the web daemon formats HTML/JSON and returns the payload to the external client via the perimeter firewall.',
    explanation_ar:
      'التدفق السليم: زائر ← جدار خارجي (منفذ 443) ← خادم DMZ ← جدار داخلي (منفذ قاعدة بيانات) ← قاعدة بيانات.',
    explanation_en:
      'Proper multi-tier flow: Client → External Firewall (Port 443) → DMZ Web Host → Internal Firewall (Port 3306/1433) → Production Database.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-10',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar:
      'مؤسسة طبية تسمح للأطباء بالوصول لملفات المرضى من منازلهم عبر الإنترنت.\\n'
      + 'صمم حلاً آمناً يعتمد على جدار الحماية وVPN والـ DMZ، مبيناً دور كل تقنية في حماية خصوصية المرضى.',
    question_en:
      'A healthcare institution permits physicians to access electronic patient health records remotely over the internet.\\n'
      + 'Design a secure architecture utilizing Firewalls, VPNs, and a DMZ, clarifying how each control safeguards patient confidentiality.',
    ideal_answer_ar:
      '• الـ VPN: تثبيت عميل VPN على أجهزة الأطباء لإنشاء نفق مشفر يمنع تنصت مزودي الإنترنت على السجلات الطبية الحساسة ويوثق هوية الطبيب بالمصادقة الثنائية.\\n'
      + '• الـ DMZ: وضع خادم بوابة التطبيق الطبي في الـ DMZ لإنهاء جلسات الأطباء دون منحهم وصولاً مباشراً لقاعدة البيانات المركزية.\\n'
      + '• جدار الحماية الخارجي: يسمح فقط باتصالات الـ VPN الموثقة ويغلق جميع المنافذ غير الضرورية أمام الجمهور.\\n'
      + '• جدار الحماية الداخلي: يفصل بوابة التطبيق في الـ DMZ عن خوادم سجلات المرضى الحساسة، ولا يسمح إلا بالاستعلامات الطبية المصرح بها وفق هوية الطبيب.',
    ideal_answer_en:
      '• Remote-Access VPN: Physicians install client software enforcing MFA to construct an AES-encrypted tunnel, immunizing patient records against telecommunication eavesdropping.\\n'
      + '• DMZ Application Portal: The web interface daemon resides in the DMZ, terminating external sessions without exposing underlying electronic medical databases directly.\\n'
      + '• External Firewall: Strictly permits encrypted VPN traffic, blocking arbitrary unsolicited public scans.\\n'
      + '• Internal Firewall: Partitions the DMZ application front-end from core healthcare databases, admitting only authenticated medical record queries conforming to strict role-based access controls.',
    explanation_ar:
      'الربط الطبي: VPN لتشفير السجلات في النقل + DMZ لعزل بوابة التطبيق + جدران نارية لحصر الوصول الطبي المعتمد.',
    explanation_en:
      'Healthcare design: VPN secures sensitive patient data in transit, DMZ isolates web portals, and firewalls enforce least-privilege medical access.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-11',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 4,
    question_ar: 'علّل بدقة: لماذا لا يُعتبر تشفير القرص الصلب أو استخدام HTTPS وحده كافياً كبديل عن جدار الحماية لحماية الشبكة المؤسسية؟',
    question_en: 'Justify precisely: Why is local disk encryption or HTTPS alone fundamentally inadequate as a substitute for an enterprise network firewall?',
    ideal_answer_ar:
      '• تشفير القرص يحمي البيانات المخزنة عند سرقة الجهاز المادية فقط، ولا يمنع الهجمات الشبكية أو الاتصالات الخبيثة أثناء تشغيل الجهاز.\\n'
      + '• HTTPS يشفر حركة مرور متصفح الويب فقط لمنع التنصت، لكنه لا يتحكم في المنافذ المفتوحة الأخرى على الخادم (كـ SSH أو RDP أو SMB) ولا يمنع الهجمات الموجهة لتلك الخدمات.\\n'
      + '• جدار الحماية: هو المنظومة الوحيدة القادرة على فحص حزم الشبكة بالكامل وإغلاق المنافذ والثغرات غير المستخدمة على مستوى الشبكة.',
    ideal_answer_en:
      '• Disk Encryption: Secures Data-at-Rest against physical equipment theft; it provides zero defense against active network-borne exploits while the operating system is online.\\n'
      + '• HTTPS: Secures application transit for web traffic, but leaves other exposed network daemons (SSH, SMB, RDP, database listeners) completely unprotected against port scans and remote exploitation.\\n'
      + '• Firewall Necessity: Network firewalls serve as the overarching gatekeeper enforcing perimeter traffic boundaries, closing unauthorized ports across the entire computing fabric.',
    explanation_ar:
      'تشفير القرص = أمان التخزين (At Rest) | HTTPS = أمان الويب فقط | جدار الحماية = حراسة كل منافذ الشبكة.',
    explanation_en:
      'Disk encryption protects Data-at-Rest; HTTPS protects web communication; Firewalls defend all exposed network ports.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-12',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'HARD',
    marks: 5,
    question_ar: 'قارن بين جدار حماية البرمجيات (Software Firewall) المثبت على جهاز الحاسوب وجدار حماية العتاد (Hardware Network Firewall) عند مدخل الشبكة.',
    question_en: 'Compare a Host-Based Software Firewall running on a client machine with a Dedicated Hardware Network Firewall deployed at the enterprise boundary.',
    ideal_answer_ar:
      '• جدار حماية العتاد (Hardware Network Firewall):\\n'
      + '  - جهاز مخصص مثبت عند بوابة الشبكة لحماية كافة الأجهزة خلفه.\\n'
      + '  - يفحص حركة مرور الشبكة بالكامل دون استهلاك موارد أجهزة الموظفين.\\n'
      + '  - يوفر نقطة إدارة مركزية وتصفية شاملة للحزم.\\n'
      + '• جدار حماية البرمجيات (Software Firewall):\\n'
      + '  - برنامج يُثبت مباشرة على نظام التشغيل لحماية الجهاز الفردي فقط.\\n'
      + '  - يراقب الاتصالات على مستوى التطبيقات والبرامج الفردية المثبتة.\\n'
      + '  - يظل فعالاً حتى لو غادر الموظف مبنى المؤسسة واتصل بشبكة خارجية.',
    ideal_answer_en:
      '• Dedicated Hardware Network Firewall:\\n'
      + '  - Enterprise appliance deployed at network ingress to shield all internal nodes collectively.\\n'
      + '  - Filters massive network throughput using dedicated silicon ASICs without impacting endpoint CPU cycles.\\n'
      + '  - Delivers centralized policy administration and macro packet filtering.\\n'
      + '• Host-Based Software Firewall:\\n'
      + '  - Software agent operating inside the local OS kernel to defend a specific host.\\n'
      + '  - Controls traffic granularly at the local application process level (e.g. blocking a rogue executable).\\n'
      + '  - Remains actively protective when the employee laptop roams outside the corporate perimeter.',
    explanation_ar:
      'أفضل ممارسة أمنية هي الجمع بينهما: جدار عتادي لحماية البوابة العامة + جدار برمجي لحماية الجهاز الفردي عند التنقل.',
    explanation_en:
      'Optimal defense combines both: hardware appliances protect macro enterprise boundaries, while software host firewalls defend mobile endpoints off-site.',
  },
  {
    id: 'CH2-L2-HARD-W-P1-13',
    part: 1,
    section: 'HARD',
    type: 'WRITTEN',
    difficulty: 'VERY_HARD',
    marks: 6,
    question_ar: 'اشرح مفهوم «نقطة الفشل الفردية» (Single Point of Failure) في تصاميم الشبكات، وكيف يتجنبها مهندس الشبكات باستخدام هيكلة الـ DMZ بجدارين ناريين منفصلين؟',
    question_en: 'Explain the concept of a "Single Point of Failure" (SPOF) in network topology, and describe how network architects eliminate it using a dual-firewall DMZ architecture?',
    ideal_answer_ar:
      '• نقطة الفشل الفردية: عنصر وحيد في المنظومة يؤدي تعطله أو اختراقه إلى انهيار النظام بالكامل (مثل الاعتماد على جدار حماية واحد لكل من الإنترنت والـ DMZ والشبكة الداخلية).\\n'
      + '• بنية الجدارين الناريين لتجنبها:\\n'
      + '  1. يُستخدم جدار حماية خارجي من شركة معينة (Vendor A) بين الإنترنت والـ DMZ.\\n'
      + '  2. يُستخدم جدار حماية داخلي مستقل من شركة أخرى (Vendor B) بين الـ DMZ والشبكة الداخلية.\\n'
      + '  3. الفائدة الأمنية: إذا اكتشف المهاجم ثغرة يوم الصفر (Zero-Day) في الجدار الخارجي ونجح في تجاوزه، فإنه لن يستطيع اختراق الجدار الداخلي بنفس الثغرة لاختلاف تصميمه ونظامه، وبذلك لا يسقط النظام بأكمله.',
    ideal_answer_en:
      '• Single Point of Failure (SPOF): Any singular architectural component whose compromise or hardware failure triggers total system collapse (e.g., routing all external, DMZ, and internal interfaces through one physical firewall box).\\n'
      + '• Dual-Firewall Mitigation Topology:\\n'
      + '  1. External Perimeter Firewall: Procured from Vendor A, mediating untrusted internet traffic into the DMZ.\\n'
      + '  2. Internal Security Firewall: Procured from Vendor B, guarding the boundary between the DMZ and internal core networks.\\n'
      + '  3. Heterogeneous Defense Benefit: If an adversary exploits a zero-day vulnerability specific to Vendor A to penetrate the DMZ, they encounter a completely distinct firmware codebase from Vendor B guarding internal assets, eliminating a single point of failure.',
    explanation_ar:
      'استخدام جدارين ناريين من مصنعين مختلفين (Dual-Vendor DMZ) يمنع انهيار المنظومة بثغرة برمجية واحدة.',
    explanation_en:
      'Deploying a dual-firewall DMZ with diverse vendor firmware guarantees that a single exploit cannot collapse both external and internal barriers.',
  },
];

// ─── MCQ متقدمة — الجزء الأول ───────────────────────────────

export const CH2_L2_HARD_MCQ_P1: Ch2QuizQuestion[] = [
  {
    id: 'CH2-L2-HARD-MCQ-P1-01',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'قامت شركة بوضع خادم الويب وخادم قاعدة البيانات معاً داخل الـ DMZ لتسهيل الاتصال السريع بينهما. ما الخطأ الأمني الفادح في هذا التصميم؟',
    question_en: 'A company co-located both its web server and database server inside the DMZ to minimize latency. What is the catastrophic security flaw in this topology?',
    options: [
      'بطء استجابة خادم الويب للزوار الخارجيين',
      'في حال اختراق خادم الويب سيتمكن المهاجم مباشرة من سرقة قاعدة البيانات لوجودها في نفس المنطقة المكشوفة',
      'تعذر استخدام بروتوكول HTTPS',
      'توقف جدار الحماية الخارجي عن العمل تلقائياً',
    ],
    options_en: [
      'Degraded web server responsiveness for outside visitors',
      'If the web server is compromised, the attacker directly steals the database because both reside in the same exposed subnetwork',
      'The complete inability to engage the HTTPS protocol',
      'The external firewall automatically terminates execution',
    ],
    answer: 'في حال اختراق خادم الويب سيتمكن المهاجم مباشرة من سرقة قاعدة البيانات لوجودها في نفس المنطقة المكشوفة',
    answer_en: 'If the web server is compromised, the attacker directly steals the database because both reside in the same exposed subnetwork',
    explanation_ar: 'قواعد البيانات الحساسة لا توضع أبداً في الـ DMZ؛ وجودها بجوار الخادم العام يعرضها للسرقة الفورية عند سقوط خادم الويب.',
    explanation_en: 'Databases must never reside in the DMZ; co-locating them with public web servers allows an attacker who exploits web code to immediately access raw records.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-02',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'يستخدم موظف تقنية VPN مشفرة للاتصال بمقر عمله من مقهى. أي من التهديدات التالية لا يزال الموظف معرضاً لها رغم تشفير الـ VPN؟',
    question_en: 'An employee uses an encrypted VPN to connect to work from a cafe. Which of the following threats does the employee remain vulnerable to despite VPN encryption?',
    options: [
      'التنصت على حزم البيانات المنقولة عبر شبكة المقهى',
      'اعتراض كلمات المرور أثناء النقل عبر النفق',
      'تنزيل الموظف لملف مصاب بفدية (Ransomware) من بريد تصيد احتيالي وتنفيذه على جهازه',
      'كشف محتوى المراسلات لمزود خدمة الإنترنت',
    ],
    options_en: [
      'Passive eavesdropping on transmitted packets over the cafe local Wi-Fi',
      'Intercepting login credentials in transit through the tunnel',
      'The employee downloading and executing a ransomware attachment from a phishing email',
      'Exposing plaintext correspondence to the local internet service provider',
    ],
    answer: 'تنزيل الموظف لملف مصاب بفدية (Ransomware) من بريد تصيد احتيالي وتنفيذه على جهازه',
    answer_en: 'The employee downloading and executing a ransomware attachment from a phishing email',
    explanation_ar: 'الـ VPN يشفر المسار فقط لمنع التنصت الخارجي، ولكنه لا يفحص الملفات الخبيثة أو يحمي من برمجيات الفدية المنزلة من الإنترنت.',
    explanation_en: 'A VPN encrypts transit channels; it does not protect endpoints from malicious malware attachments downloaded by the user.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-03',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'جدار حماية تم تكوينه لقفل جميع المنافذ ما عدا منفذي 80 و443. ما هي حركة المرور الوحيدة المسموح بمرورها عبر هذا الجدار؟',
    question_en: 'A firewall is configured to block all ports except 80 and 443. What is the only traffic permitted across this perimeter?',
    options: [
      'نقل الملفات عبر بروتوكول FTP فقط',
      'اتصالات البريد الإلكتروني الصادرة عبر SMTP',
      'اتصالات تصفح الويب العادية والمشفرة (HTTP و HTTPS)',
      'التحكم عن بعد في الخوادم عبر بروتوكول SSH',
    ],
    options_en: [
      'File transfers exclusively via the FTP protocol',
      'Outbound email transmissions over SMTP',
      'Standard unencrypted and encrypted web browsing traffic (HTTP & HTTPS)',
      'Remote shell management of servers via SSH',
    ],
    answer: 'اتصالات تصفح الويب العادية والمشفرة (HTTP و HTTPS)',
    answer_en: 'Standard unencrypted and encrypted web browsing traffic (HTTP & HTTPS)',
    explanation_ar: 'المنفذ 80 مخصص لـ HTTP والمنفذ 443 مخصص لـ HTTPS؛ قفل باقي المنافذ يحظر جميع الخدمات الأخرى مثل FTP وSSH.',
    explanation_en: 'Port 80 is dedicated to HTTP and Port 443 to HTTPS; blocking all other ports restricts traffic exclusively to web browsing.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-04',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'في هيكل أمان شبكي يحتوي على جدارين ناريين (خارجي وداخلي)، أين يتم وضع المنطقة المعزولة (DMZ) بدقة؟',
    question_en: 'In a network architecture featuring dual firewalls (external and internal), where is the Demilitarized Zone (DMZ) positioned?',
    options: [
      'خارج جدار الحماية الخارجي مباشرة على الإنترنت العام',
      'بين جدار الحماية الخارجي وجدار الحماية الداخلي',
      'خلف جدار الحماية الداخلي ملاصقة لقواعد البيانات',
      'مثبتة على الأجهزة الطرفية للموظفين',
    ],
    options_en: [
      'Directly outside the external firewall facing the public internet',
      'Sandwiched between the external firewall and the internal firewall',
      'Behind the internal firewall adjacent to core databases',
      'Installed locally upon employee endpoint workstations',
    ],
    answer: 'بين جدار الحماية الخارجي وجدار الحماية الداخلي',
    answer_en: 'Sandwiched between the external firewall and the internal firewall',
    explanation_ar: 'الـ DMZ توضع دائماً كمنطقة عازلة محصورة بين جدار الحماية الخارجي (المواجه للإنترنت) وجدار الحماية الداخلي (المواجه للشبكة الخاصة).',
    explanation_en: 'The DMZ functions as a buffer subnetwork situated between the external perimeter firewall and the internal protection firewall.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-05',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'عندما يقوم جدار الحماية بـ "تصفية الحزم" (Packet Filtering)، فإنه يتخذ قرار السماح أو المنع بناءً على:',
    question_en: 'When a firewall executes "Packet Filtering", it determines whether to allow or drop traffic based on:',
    options: [
      'عناوين IP للمرسل والمستقبل، وأرقام المنافذ، وبروتوكول الاتصال',
      'اسم المستخدم الرباعي المكتوب في عقد العمل',
      'بصمة الإصبع الحيوية لمستخدم الحاسوب',
      'سرعة المعالج وحجم الذاكرة العشوائية',
    ],
    options_en: [
      'Source and destination IP addresses, port numbers, and transport protocols',
      'The legal full name of the employee as stated in employment contracts',
      'The biological biometric fingerprint scan of the user',
      'CPU clock frequency and host RAM capacity',
    ],
    answer: 'عناوين IP للمرسل والمستقبل، وأرقام المنافذ، وبروتوكول الاتصال',
    answer_en: 'Source and destination IP addresses, port numbers, and transport protocols',
    explanation_ar: 'تصفية الحزم التقليدية تفحص ترويسة الحزمة: Source IP, Destination IP, Port Numbers, Protocol (TCP/UDP).',
    explanation_en: 'Standard packet filtering evaluates packet header fields: Source/Destination IP, Port numbers, and TCP/UDP protocol flags.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-06',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'لماذا يُسمى اتصال الـ VPN بـ "الافتراضي" (Virtual)؟',
    question_en: 'Why is a Virtual Private Network connection designated as "Virtual"?',
    options: [
      'لأنه لا ينقل بيانات حقيقية بل مجرد محاكاة حاسوبية',
      'لأنه ينشئ خط اتصال خاص ومنطقي فوق بنية تحتية عامة مشتركة دون الحاجة لكابلات فيزيائية ممتدة بين الموقعين',
      'لأنه يعمل فقط داخل نظارات الواقع الافتراضي',
      'لأنه لا يحتاج إلى أي اتصال حقيقي بالإنترنت',
    ],
    options_en: [
      'Because it transmits simulated data rather than genuine business records',
      'Because it establishes a logical, dedicated private conduit over shared public infrastructure without dedicated physical cables',
      'Because it runs exclusively within virtual reality headsets',
      'Because it functions without any actual internet connection',
    ],
    answer: 'لأنه ينشئ خط اتصال خاص ومنطقي فوق بنية تحتية عامة مشتركة دون الحاجة لكابلات فيزيائية ممتدة بين الموقعين',
    answer_en: 'Because it establishes a logical, dedicated private conduit over shared public infrastructure without dedicated physical cables',
    explanation_ar: 'يُسمى "افتراضياً" لأنه نفق منطقي مشفر يعمل فوق الإنترنت المشترك دون الحاجة لمد أسلاك فيزيائية خاصة بين المدن.',
    explanation_en: 'It is termed "Virtual" because it delivers private-circuit semantics over shared public channels without leased physical wiring.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-07',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما الميزة الأمنية الأساسية لعزل خادم البريد في DMZ عند تلقيه مرفقات برمجية ضارة من الإنترنت؟',
    question_en: 'What is the principal security advantage of quarantining a mail server within a DMZ when it receives malicious email attachments?',
    options: [
      'مسح الفيروسات من الإنترنت تلقائياً قبل وصولها',
      'حصر تهديد البرمجيات الخبيثة في بيئة الـ DMZ المعزولة ومنع انتشارها التلقائي إلى الأجهزة الداخلية للموظفين',
      'مضاعفة سعة تخزين صندوق البريد للمستخدمين',
      'منع الموظفين من إرسال رسائل بريد للخارج',
    ],
    options_en: [
      'Automatically purging malware from the global internet prior to arrival',
      'Confining malicious threats within the quarantined DMZ subnetwork and preventing lateral propagation into internal workstations',
      'Doubling user email storage quotas automatically',
      'Prohibiting staff from transmitting outbound correspondence externally',
    ],
    answer: 'حصر تهديد البرمجيات الخبيثة في بيئة الـ DMZ المعزولة ومنع انتشارها التلقائي إلى الأجهزة الداخلية للموظفين',
    answer_en: 'Confining malicious threats within the quarantined DMZ subnetwork and preventing lateral propagation into internal workstations',
    explanation_ar: 'عزل خادم البريد في الـ DMZ يحصر الخطر ويمنع البرمجيات الخبيثة من الوصول المباشر للشبكة الداخلية للمؤسسة.',
    explanation_en: 'Isolating mail transfer agents inside a DMZ contains zero-day malware threats, preventing automated network-wide lateral infections.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-08',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'تعرض متجر إلكتروني لهجوم حجب خدمة موزع (DDoS) على موقعه العام. كيف ساعد وضع الموقع في DMZ في حماية الشركة؟',
    question_en: 'An e-commerce site suffered a massive Distributed Denial-of-Service (DDoS) flood against its web front-end. How did DMZ positioning protect enterprise operations?',
    options: [
      'قام الـ DMZ بوقف الهجوم فوراً دون تدخل بشري',
      'ظلت شبكة المكاتب الداخلية ومحاسبة الشركة تعمل بانتظام لأن الضغط محصور في شبكة الـ DMZ المعزولة',
      'تم إخفاء عنوان IP الخاص بالمتجر عن العالم بالكامل',
      'تم إلغاء فواتير الإنترنت الخاصة بالمؤسسة',
    ],
    options_en: [
      'The DMZ autonomously terminated the DDoS flood with zero human intervention',
      'Internal office networks, accounting, and staff operations functioned normally because network congestion was quarantined to the DMZ',
      'The external web IP address was permanently concealed from global routing tables',
      'Corporate telecommunication bandwidth invoices were refunded',
    ],
    answer: 'ظلت شبكة المكاتب الداخلية ومحاسبة الشركة تعمل بانتظام لأن الضغط محصور في شبكة الـ DMZ المعزولة',
    answer_en: 'Internal office networks, accounting, and staff operations functioned normally because network congestion was quarantined to the DMZ',
    explanation_ar: 'فصل الـ DMZ يمنع وصول فيضان الحزم (Flood) إلى أجهزة وشبكة المكاتب الداخلية فتستمر أعمال المؤسسة دون شلل.',
    explanation_en: 'DMZ segregation isolates traffic saturation to the perimeter segment, keeping internal corporate LAN bandwidth unaffected.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-09',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'إذا كانت قواعد جدار الحماية الداخلي تمنع أي اتصال يبدأ من الـ DMZ نحو الشبكة الداخلية، فماذا يحدث إذا اخترق مهاجم خادم الويب في الـ DMZ؟',
    question_en: 'If internal firewall rules block any connection initiated from the DMZ toward the internal LAN, what happens when an attacker compromises the DMZ web server?',
    options: [
      'يتمكن من فتح اتصال فوري بقواعد البيانات والسيطرة عليها',
      'يعجز عن إنشاء اتصال جديد نحو الشبكة الداخلية لأن الجدار الداخلي يسقط أي طلب اتصال مبدوء من الـ DMZ',
      'يتم إيقاف تشغيل حاسوب المهاجم تلقائياً',
      'ينهار جدار الحماية الخارجي فوراً',
    ],
    options_en: [
      'The attacker establishes instant shell sessions into core databases and seizes control',
      'The attacker is blocked from establishing inbound sessions into the private LAN because the internal firewall drops all DMZ-initiated syn packets',
      'The attacker personal workstation immediately powers down',
      'The external perimeter firewall collapses spontaneously',
    ],
    answer: 'يعجز عن إنشاء اتصال جديد نحو الشبكة الداخلية لأن الجدار الداخلي يسقط أي طلب اتصال مبدوء من الـ DMZ',
    answer_en: 'The attacker is blocked from establishing inbound sessions into the private LAN because the internal firewall drops all DMZ-initiated syn packets',
    explanation_ar: 'قاعدة إسقاط الاتصالات المبدوءة من الـ DMZ تعزل المهاجم تماماً وتمنعه من استغلال الخادم كمنصة لاختراق الشبكة الداخلية.',
    explanation_en: 'Blocking DMZ-initiated connections traps the adversary inside the bastion host, preventing lateral pivoting into private internal subnets.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-10',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'ما الفرق الجوهري بين تشفير بروتوكول HTTPS وتشفير شبكة الـ VPN؟',
    question_en: 'What is the fundamental architectural difference between HTTPS encryption and VPN encryption?',
    options: [
      'الـ VPN يشفر المتصفح فقط بينما HTTPS يشفر الحاسوب كاملاً',
      'الـ HTTPS يشفر الاتصال الخاص بتطبيق الويب فقط، بينما الـ VPN يشفر كامل حركة مرور الشبكة الصادرة والواردة من الجهاز',
      'الـ HTTPS لا يستخدم أي مفاتيح تشفير',
      'كلاهما متطابقان تماماً ولا يوجد أي فرق تقني بينهما',
    ],
    options_en: [
      'A VPN encrypts the browser process exclusively while HTTPS encapsulates the entire operating system',
      'HTTPS encrypts traffic strictly for a specific web application session, whereas a VPN encrypts all inbound and outbound network IP packets from the host',
      'HTTPS operates without cryptographic cipher keys',
      'Both mechanisms are mathematically and architecturally identical with zero technical distinction',
    ],
    answer: 'الـ HTTPS يشفر الاتصال الخاص بتطبيق الويب فقط، بينما الـ VPN يشفر كامل حركة مرور الشبكة الصادرة والواردة من الجهاز',
    answer_en: 'HTTPS encrypts traffic strictly for a specific web application session, whereas a VPN encrypts all inbound and outbound network IP packets from the host',
    explanation_ar: 'الـ HTTPS يعمل على طبقة التطبيقات (App Layer) لموقع معين فقط؛ بينما الـ VPN يعمل على طبقة الشبكة (Network Layer) فيشفر كل حزم الجهاز.',
    explanation_en: 'HTTPS operates at the Application Layer for specific browser sessions; a VPN operates at the Network Layer, encapsulating all host communications.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-11',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أي التكوينات الآتية يُعد الأكثر أماناً لمنافذ خادم ويب موجود داخل الـ DMZ؟',
    question_en: 'Which configuration represents the most secure port hardening policy for a public web server positioned in a DMZ?',
    options: [
      'فتح جميع المنافذ من 1 إلى 65535 لتفادي أي أخطاء في الاتصال',
      'فتح المنفذين 80 و443 فقط لحركة المرور الخارجية وإغلاق كافة المنافذ الأخرى',
      'إغلاق المنفذ 443 وفتح منفذ Telnet غير المشفر',
      'تعطيل بطاقة الشبكة نهائياً لمنع أي اتصال',
    ],
    options_en: [
      'Opening all ports from 1 through 65535 to prevent potential connection timeouts',
      'Allowing external traffic exclusively across ports 80 and 443 while dropping all remaining unneeded ports',
      'Disabling port 443 and exposing unencrypted legacy Telnet management ports',
      'Disabling network interface cards entirely to eliminate all connectivity',
    ],
    answer: 'فتح المنفذين 80 و443 فقط لحركة المرور الخارجية وإغلاق كافة المنافذ الأخرى',
    answer_en: 'Allowing external traffic exclusively across ports 80 and 443 while dropping all remaining unneeded ports',
    explanation_ar: 'مبدأ تقليص مساحة الهجوم (Attack Surface Reduction): فتح المنفذين 80 و443 لخدمة الويب وإغلاق كل المنافذ الأخرى لحرمان المهاجم من ثغرات الخدمات الجانبية.',
    explanation_en: 'Attack surface minimization demands exposing exclusively required web ports (80/443), blocking all administrative and secondary service listeners.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-12',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'شركة متعددة الفروع تريد ربط فرع القاهرة بفرع الإسكندرية بشكل آمن دون دفع تكاليف مد خطوط فيزيائية خاصة. الحل الأمثل هو:',
    question_en: 'An enterprise wants to interconnect its Cairo and Alexandria offices securely without paying exorbitant fees for dedicated physical leased lines. The optimal solution is:',
    options: [
      'استخدام شبكة Wi-Fi عادية بدون كلمات مرور',
      'إنشاء شبكة افتراضية خاصة (Site-to-Site VPN) مشفرة عبر الإنترنت العام',
      'نقل قواعد البيانات يومياً على محركات أقراص USB عبر الشحن البريدي',
      'إلغاء أجهزة التوجيه بالكامل',
    ],
    options_en: [
      'Connecting offices across unencrypted public long-range Wi-Fi',
      'Deploying an encrypted Site-to-Site VPN tunnel across the commodity public internet',
      'Mailing encrypted physical USB hard drives via courier daily',
      'Removing edge routers entirely',
    ],
    answer: 'إنشاء شبكة افتراضية خاصة (Site-to-Site VPN) مشفرة عبر الإنترنت العام',
    answer_en: 'Deploying an encrypted Site-to-Site VPN tunnel across the commodity public internet',
    explanation_ar: 'شبكات الـ Site-to-Site VPN توفر نفقاً مشفراً دائماً يربط فرعين عبر الإنترنت العام بأمان تام وبتكلفة منخفضة جداً مقارنة بالخطوط الخاصة.',
    explanation_en: 'Site-to-Site VPNs deliver secure, continuously encrypted inter-branch connectivity over public internet lines at minimal cost.',
  },
  {
    id: 'CH2-L2-HARD-MCQ-P1-13',
    part: 1,
    section: 'HARD',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar: 'أرسل موظف يعمل عن بعد بيانات حساسة عبر الـ VPN أثناء اتصاله بشبكة مقهى، وحاول شخص بجواره استخدام أداة Sniffer للتنصت. ماذا سيرى المتنصت؟',
    question_en: 'A telecommuting employee transmits sensitive corporate files over a VPN while on cafe Wi-Fi. An attacker running a packet sniffer intercepts the radio packets. What does the eavesdropper see?',
    options: [
      'نص البيانات واسم المستخدم وكلمة المرور بوضوح تام',
      'حزم بيانات مشفرة عشوائية غير مفهومة متجهة إلى خادم الـ VPN',
      'رسالة تحذير تطلب منه التوقف عن التنصت على الشبكة',
      'عنوان المنزل الحقيقي للموظف',
    ],
    options_en: [
      'Plaintext confidential documents, usernames, and passwords in clear text',
      'Indecipherable, randomized encrypted packet payloads addressed strictly to the corporate VPN gateway',
      'A pop-up alert prompt commanding them to cease packet interception',
      'The physical residential address of the employee',
    ],
    answer: 'حزم بيانات مشفرة عشوائية غير مفهومة متجهة إلى خادم الـ VPN',
    answer_en: 'Indecipherable, randomized encrypted packet payloads addressed strictly to the corporate VPN gateway',
    explanation_ar: 'تشفير الـ VPN يحول البيانات إلى نص مشفر عشوائي لا يمكن فكه؛ ولا يرى المتنصت سوى عنوان خادم الـ VPN وحزماً مشفرة غير مفهومة.',
    explanation_en: 'VPN packet encapsulation renders payload bytes indecipherable; sniffers observe only encrypted ciphertext headers routed to the VPN endpoint.',
  },
];
'''

with open('frontend/src/ch2_lesson2_hardQ_part1.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated frontend/src/ch2_lesson2_hardQ_part1.ts successfully!")
