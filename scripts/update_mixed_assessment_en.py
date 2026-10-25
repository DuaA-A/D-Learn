# Script to update frontend/src/ch2_mixed_assessment.ts with full English translations

content = '''// ============================================================
// Ch2 · Mixed Assessment — Lessons 1 & 2
// Covers: HTTPS · TLS · Encryption · Digital Signatures · MFA
//         Firewall · VPN · DMZ · Defense in Depth · Zero Trust
// ============================================================

import type { Ch2QuizQuestion } from './ch2_lesson1_officialQ_part1';

export const CH2_MIXED_ASSESSMENT: Ch2QuizQuestion[] = [

  // ── Q1 (L2 · MCQ · MEDIUM) ──────────────────────────────────
  {
    id: 'CH2-MIX-01',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar:
      'تعرّض الخادم العام لشركة للاختراق، لكن المهاجم لم يتمكن من الوصول إلى قاعدة البيانات الداخلية. أي مكوّن أمني حقق ذلك؟',
    question_en:
      "A company's public web server was compromised. Despite this, the attacker could not reach the internal database. Which security component achieved this?",
    options: [
      'Firewall — جدار الحماية',
      'VPN — الشبكة الافتراضية الخاصة',
      'DMZ — المنطقة المعزولة',
      'Antivirus — مكافحة الفيروسات',
    ],
    options_en: [
      'Firewall',
      'VPN (Virtual Private Network)',
      'DMZ (Demilitarized Zone)',
      'Antivirus',
    ],
    answer: 'DMZ — المنطقة المعزولة',
    answer_en: 'DMZ (Demilitarized Zone)',
    explanation_ar:
      'المنطقة المعزولة (DMZ) تضع الخوادم العامة في منطقة معزولة منفصلة عن الشبكة الداخلية. حتى لو اُخترق الخادم العام، يظل المهاجم محاصراً في الـ DMZ ولا يستطيع الوصول لقواعد البيانات الداخلية.',
    explanation_en:
      'A Demilitarized Zone (DMZ) places public-facing servers in an isolated subnetwork separate from the internal private network. Even if the public web server is breached, the attacker remains confined within the DMZ and cannot reach confidential internal databases.',
  },

  // ── Q2 (L1 · WRITTEN · MEDIUM) ──────────────────────────────
  {
    id: 'CH2-MIX-02',
    part: 1,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar:
      'يدّعي أحد الطلاب أن أي موقع يستخدم HTTPS هو موقع آمن وموثوق بالكامل. هل هذا صحيح؟ وضح إجابتك.',
    question_en:
      'A student claims that any website using HTTPS is fully safe and trustworthy. Is this correct? Explain your answer.',
    ideal_answer_ar:
      'هذا الادعاء غير صحيح. HTTPS يضمن أمان الاتصال فقط — أي أنه يشفّر البيانات المنقولة بين المتصفح والخادم ويتحقق من هوية الخادم. لكنه لا يضمن نزاهة صاحب الموقع أو مصداقيته. مواقع التصيد الاحتيالي يمكنها الحصول على شهادات TLS واستخدام HTTPS مع بقائها مواقع خادعة.',
    ideal_answer_en:
      'This claim is incorrect. HTTPS only guarantees communication channel security—meaning it encrypts data transferred between browser and server and validates server domain identity. It does not guarantee the integrity, safety, or legitimacy of the site operator. Phishing websites can easily obtain valid TLS certificates and use HTTPS while remaining malicious.',
    explanation_ar:
      'HTTPS يحمي قناة الاتصال لا المحتوى. موقع تصيد مشفّر لا يزال موقع تصيد.',
    explanation_en:
      'HTTPS secures the transmission tunnel, not the intent of the site owner. An encrypted phishing site is still a phishing site.',
  },

  // ── Q3 (L1 · MCQ · MEDIUM) ──────────────────────────────────
  {
    id: 'CH2-MIX-03',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar:
      'أثناء جلسة HTTPS، أي نوع من التشفير يُستخدم لنقل بيانات الجلسة الفعلية، ولماذا؟',
    question_en:
      'During an HTTPS session, which type of encryption is used to transfer the actual session data, and why?',
    options: [
      'تشفير المفتاح العام — لأنه أكثر أماناً / Public-key — because it\\'s more secure',
      'التشفير المتماثل — لأنه أسرع لنقل كميات كبيرة من البيانات / Symmetric — because it\\'s faster for large data',
      'التشفير المتماثل — لأنه لا يحتاج إلى شهادة رقمية / Symmetric — because it needs no certificate',
      'تشفير المفتاح العام — لأنه لا يحتاج مفتاحاً مشتركاً / Public-key — because it needs no shared key',
    ],
    options_en: [
      'Public-key cryptography — because it is more secure',
      'Symmetric encryption — because it is much faster for transmitting large volumes of data',
      'Symmetric encryption — because it requires no digital certificate',
      'Public-key cryptography — because it does not require a shared key',
    ],
    answer:
      'التشفير المتماثل — لأنه أسرع لنقل كميات كبيرة من البيانات / Symmetric — because it\\'s faster for large data',
    answer_en:
      'Symmetric encryption — because it is much faster for transmitting large volumes of data',
    explanation_ar:
      'تشفير المفتاح العام بطيء حسابياً ويُستخدم فقط في مصافحة TLS لتبادل مفتاح الجلسة بأمان. بعدها يتولى التشفير المتماثل نقل بيانات الجلسة كلها بسرعة وكفاءة.',
    explanation_en:
      'Public-key cryptography is computationally expensive and is only used during the TLS handshake to safely agree upon a shared session key. Once established, symmetric encryption efficiently transmits all bulk session data.',
  },

  // ── Q4 (L2 · MCQ · MEDIUM) ──────────────────────────────────
  {
    id: 'CH2-MIX-04',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar:
      'موظف يعمل من مقهى ويحتاج للاتصال بأمان بشبكة الشركة الداخلية. ما الأداة الصحيحة، وأي طبقة من طبقات الدفاع في العمق تمثّل؟',
    question_en:
      "An employee is working from a cafe and needs to securely connect to the company's internal network. What is the correct tool, and which layer of Defense in Depth does it represent?",
    options: [
      'Firewall — طبقة مدخل الشبكة / Network Entry layer',
      'VPN — طبقة مسار الاتصال / Communication Path layer',
      'DMZ — طبقة وضع الخوادم / Server Placement layer',
      'Antivirus — طبقة الأجهزة الطرفية / Endpoints layer',
    ],
    options_en: [
      'Firewall — Network Entry layer',
      'VPN — Communication Path layer',
      'DMZ — Server Placement layer',
      'Antivirus — Endpoints layer',
    ],
    answer: 'VPN — طبقة مسار الاتصال / Communication Path layer',
    answer_en: 'VPN — Communication Path layer',
    explanation_ar:
      'الـ VPN ينشئ نفقاً مشفراً عبر الإنترنت يمنع التنصت على بيانات الموظف. في استراتيجية الدفاع في العمق يقع في طبقة مسار الاتصال، إذ يحمي البيانات أثناء انتقالها.',
    explanation_en:
      'A VPN creates an encrypted virtual tunnel over the public Internet that prevents eavesdropping on employee traffic. In Defense in Depth, it represents the Communication Path layer, protecting data in transit.',
  },

  // ── Q5 (L1 · MCQ · HARD) ────────────────────────────────────
  {
    id: 'CH2-MIX-05',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar:
      'بعد اكتمال مصافحة TLS، يتحول المتصفح والخادم من تشفير المفتاح العام إلى التشفير المتماثل. لماذا هذا التحول ضروري؟',
    question_en:
      'After the TLS handshake completes, the browser and server switch from public-key to symmetric encryption. Why is this switch necessary?',
    options: [
      'التشفير المتماثل أصعب في الكسر من تشفير المفتاح العام / Symmetric is harder to break',
      'تشفير المفتاح العام لا يستطيع توليد مفاتيح الجلسة / Public-key cannot generate session keys',
      'تشفير المفتاح العام بطيء حسابياً جداً للتعامل مع حجم بيانات الجلسة الكبير / Public-key is too slow for bulk session data',
      'التشفير المتماثل يستخدم شهادات رقمية مطلوبة لنقل البيانات / Symmetric uses digital certificates required for transfer',
    ],
    options_en: [
      'Symmetric encryption is harder to break than public-key cryptography',
      'Public-key cryptography cannot generate session keys',
      'Public-key cryptography is computationally too slow to handle high-volume session data',
      'Symmetric encryption uses digital certificates required for data exchange',
    ],
    answer:
      'تشفير المفتاح العام بطيء حسابياً جداً للتعامل مع حجم بيانات الجلسة الكبير / Public-key is too slow for bulk session data',
    answer_en:
      'Public-key cryptography is computationally too slow to handle high-volume session data',
    explanation_ar:
      'الهدف من مصافحة TLS هو فقط تبادل مفتاح الجلسة بأمان عبر تشفير المفتاح العام. بمجرد الاتفاق على المفتاح، يستخدمان التشفير المتماثل الأسرع بكثير لنقل بيانات الجلسة.',
    explanation_en:
      'The purpose of the TLS handshake is solely to exchange the session key securely using public-key cryptography. Once agreed upon, they switch to symmetric encryption because it is vastly faster for bulk traffic.',
  },

  // ── Q6 (L1 · MCQ · HARD) ────────────────────────────────────
  {
    id: 'CH2-MIX-06',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar:
      'أُرسل عقد موقَّع إلكترونياً. بعدها ادّعى المُرسِل أنه لم يُرسله. أي خاصية أمنية تمنع هذا الادعاء، وأي تقنية توفرها؟',
    question_en:
      'A signed document was sent electronically. The sender later claimed they never sent it. Which security property directly prevents this claim, and which technology provides it?',
    options: [
      'السرية — يوفرها التشفير المتماثل / Confidentiality — symmetric encryption',
      'عدم الإنكار — يوفره التوقيع الرقمي / Non-repudiation — digital signature',
      'السلامة — توفرها الشهادة الرقمية / Integrity — digital certificate',
      'المصادقة — توفرها مصافحة TLS / Authentication — TLS handshake',
    ],
    options_en: [
      'Confidentiality — provided by symmetric encryption',
      'Non-repudiation — provided by digital signatures',
      'Integrity — provided by digital certificates',
      'Authentication — provided by TLS handshakes',
    ],
    answer: 'عدم الإنكار — يوفره التوقيع الرقمي / Non-repudiation — digital signature',
    answer_en: 'Non-repudiation — provided by digital signatures',
    explanation_ar:
      'التوقيع الرقمي يُنشأ بالمفتاح الخاص للمُرسِل الذي يملكه وحده، مما يجعل إنكار الإرسال مستحيلاً. هذه الخاصية تُعرف بعدم الإنكار (Non-repudiation).',
    explanation_en:
      'A digital signature is created using the sender’s private key, which only the sender possesses, making it impossible to deny sending the message. This security property is known as Non-repudiation.',
  },

  // ── Q7 (L1 · MCQ · MEDIUM) ──────────────────────────────────
  {
    id: 'CH2-MIX-07',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar:
      'أيٌّ مما يلي يُعدّ مثالاً صحيحاً على المصادقة متعددة العوامل (MFA)؟',
    question_en:
      'Which of the following is a correct example of Multi-Factor Authentication (MFA)?',
    options: [
      'كلمة مرور وسؤال سري / A password and a secret question',
      'كلمتا مرور مختلفتان / Two different passwords',
      'كلمة مرور وبصمة إصبع / A password and a fingerprint scan',
      'رمز PIN وسؤال أمان / A PIN and a security question',
    ],
    options_en: [
      'A password and a secret question',
      'Two different passwords',
      'A password and a fingerprint scan',
      'A PIN code and a security question',
    ],
    answer: 'كلمة مرور وبصمة إصبع / A password and a fingerprint scan',
    answer_en: 'A password and a fingerprint scan',
    explanation_ar:
      'المصادقة متعددة العوامل تشترط الجمع بين عاملين من فئتين مختلفتين. كلمة المرور فئة المعرفة، والبصمة فئة السمات الحيوية. أما السؤال السري وكلمة المرور فكلاهما من فئة المعرفة ولا يُعدّان MFA.',
    explanation_en:
      'Multi-Factor Authentication requires combining factors from two distinct categories. Passwords are Knowledge (what you know), and fingerprints are Inherence/Biometrics (what you are). Passwords and secret questions both belong to Knowledge.',
  },

  // ── Q8 (L1+L2 · MCQ · HARD) ─────────────────────────────────
  {
    id: 'CH2-MIX-08',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar:
      'أيٌّ مما يلي يربط بشكل صحيح كل أداة بطبقتها في استراتيجية الدفاع في العمق؟',
    question_en:
      'Which of the following correctly maps each tool to its layer in the Defense in Depth strategy?',
    options: [
      'مكافحة الفيروسات ← مدخل الشبكة / جدار الحماية ← الأجهزة الطرفية | Antivirus → Network Entry / Firewall → Endpoints',
      'VPN ← وضع الخوادم / DMZ ← مسار الاتصال | VPN → Server Placement / DMZ → Communication Path',
      'جدار الحماية ← مدخل الشبكة / VPN ← مسار الاتصال / DMZ ← وضع الخوادم / مكافحة الفيروسات ← الأجهزة الطرفية | Firewall → Network Entry / VPN → Communication Path / DMZ → Server Placement / Antivirus → Endpoints',
      'DMZ ← مدخل الشبكة / جدار الحماية ← وضع الخوادم | DMZ → Network Entry / Firewall → Server Placement',
    ],
    options_en: [
      'Antivirus → Network Entry / Firewall → Endpoints',
      'VPN → Server Placement / DMZ → Communication Path',
      'Firewall → Network Entry / VPN → Communication Path / DMZ → Server Placement / Antivirus → Endpoints',
      'DMZ → Network Entry / Firewall → Server Placement',
    ],
    answer:
      'جدار الحماية ← مدخل الشبكة / VPN ← مسار الاتصال / DMZ ← وضع الخوادم / مكافحة الفيروسات ← الأجهزة الطرفية | Firewall → Network Entry / VPN → Communication Path / DMZ → Server Placement / Antivirus → Endpoints',
    answer_en:
      'Firewall → Network Entry / VPN → Communication Path / DMZ → Server Placement / Antivirus → Endpoints',
    explanation_ar:
      'الطبقات الأربع بالترتيب: (1) مدخل الشبكة = جدار الحماية، (2) مسار الاتصال = VPN والتشفير، (3) وضع الخوادم = DMZ، (4) الأجهزة الطرفية = مكافحة الفيروسات وتحديثات النظام.',
    explanation_en:
      'The four layers in order: (1) Network Entry = Firewall, (2) Communication Path = VPN & encryption, (3) Server Placement = DMZ, (4) Endpoints = Antivirus & OS updates.',
  },

  // ── Q9 (L2 · MCQ · HARD) ────────────────────────────────────
  {
    id: 'CH2-MIX-09',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar:
      'قام مستخدم بتسجيل الدخول بكلمة مروره الصحيحة، لكن من دولة غير معتادة في الساعة الثالثة صباحاً. ما الذي يجب أن يفعله نظام انعدام الثقة (Zero Trust)؟',
    question_en:
      'A user logs in with the correct password, but from an unusual country at 3 AM. What should a Zero Trust system do?',
    options: [
      'منح الوصول — كلمة المرور صحيحة / Grant access — the password is correct',
      'منح الوصول — المستخدم مسجّل مسبقاً / Grant access — the user is already registered',
      'الحجب أو إعادة التحقق — السياق غير معتاد حتى مع بيانات اعتماد صحيحة / Block or re-verify — context is anomalous even with valid credentials',
      'إرسال إشعار بريد إلكتروني ثم منح الوصول / Send an email notification then grant access',
    ],
    options_en: [
      'Grant access — the password is correct',
      'Grant access — the user is already registered',
      'Block or re-verify — context is anomalous even with valid credentials',
      'Send an email notification then grant access',
    ],
    answer:
      'الحجب أو إعادة التحقق — السياق غير معتاد حتى مع بيانات اعتماد صحيحة / Block or re-verify — context is anomalous even with valid credentials',
    answer_en:
      'Block or re-verify — context is anomalous even with valid credentials',
    explanation_ar:
      'نهج Zero Trust لا يكتفي بالتحقق من الهوية — بل يفحص أيضاً السياق (الموقع الجغرافي، الوقت، الجهاز). السياق غير المعتاد مؤشر على اختراق محتمل حتى مع كلمة مرور صحيحة.',
    explanation_en:
      'Zero Trust does not rely solely on credentials; it continuously verifies context (geographic location, time of access, device posture). An unusual context strongly indicates a potential account breach even if the password is valid.',
  },

  // ── Q10 (L1 · MCQ · HARD) ───────────────────────────────────
  {
    id: 'CH2-MIX-10',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar:
      'كلٌّ من الشهادة الرقمية والتوقيع الرقمي يتضمن مفتاحاً خاصاً. ما الفرق الجوهري في مَن يستخدم المفتاح الخاص ولأي غرض؟',
    question_en:
      'Both a digital certificate and a digital signature involve a private key. What is the key difference in who uses the private key and for what purpose?',
    options: [
      'كلاهما تنشئهما جهة CA باستخدام نفس المفتاح الخاص / Both are created by the CA using the same private key',
      'الشهادة تستخدم مفتاح الخادم الخاص، والتوقيع يستخدم مفتاح CA الخاص / The certificate uses the server\\'s private key; the signature uses the CA\\'s private key',
      'جهة CA تستخدم مفتاحها الخاص لتوقيع الشهادة؛ المُرسِل يستخدم مفتاحه الخاص لتوقيع الرسالة / The CA uses its private key to sign the certificate; the sender uses their own to sign the message',
      'كلاهما يستخدمان مفتاح المستخدم الخاص لنتائج مختلفة / Both use the user\\'s private key for different outputs',
    ],
    options_en: [
      'Both are created by the Certificate Authority (CA) using the same private key',
      "The certificate uses the server's private key; the signature uses the CA's private key",
      "The CA uses its private key to sign the certificate; the sender uses their own private key to sign the message",
      "Both use the user's private key for different outputs",
    ],
    answer:
      'جهة CA تستخدم مفتاحها الخاص لتوقيع الشهادة؛ المُرسِل يستخدم مفتاحه الخاص لتوقيع الرسالة / The CA uses its private key to sign the certificate; the sender uses their own to sign the message',
    answer_en:
      "The CA uses its private key to sign the certificate; the sender uses their own private key to sign the message",
    explanation_ar:
      'الشهادة الرقمية تُوقَّع من جهة CA بمفتاحها الخاص لإثبات هوية الخادم. أما التوقيع الرقمي فيُنشئه المُرسِل بمفتاحه الخاص لإثبات صحة الرسالة وهويته. طرفان مختلفان، غرضان مختلفان.',
    explanation_en:
      "A digital certificate is signed by a trusted CA using the CA's private key to verify the server's identity. A digital signature is generated by the sender using their private key to authenticate the message and sender identity. Two different parties, two distinct purposes.",
  },

  // ── Q11 (L2 · MCQ · MEDIUM) ─────────────────────────────────
  {
    id: 'CH2-MIX-11',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar:
      'لماذا أضعف انتشار الحوسبة السحابية والعمل عن بعد نموذج الأمان المحيطي التقليدي؟',
    question_en:
      'Why did the rise of cloud computing and remote work weaken the traditional perimeter security model?',
    options: [
      'لأن الخوادم السحابية لا تدعم جدران الحماية / Because cloud servers don\\'t support firewalls',
      'لأن البيانات والمستخدمين انتقلوا خارج المبنى الفيزيائي، مما أبطل افتراض "الداخل = آمن" / Because data and users moved outside the building, invalidating "inside = safe"',
      'لأن مكافحة الفيروسات لا تعمل على الأنظمة السحابية / Because antivirus doesn\\'t work on cloud systems',
      'لأن الشبكات السحابية أسرع من الشبكات الداخلية / Because cloud networks are faster than internal networks',
    ],
    options_en: [
      "Because cloud servers don't support firewalls",
      'Because data and users moved outside the physical building, invalidating the "inside = safe" assumption',
      "Because antivirus doesn't work on cloud systems",
      'Because cloud networks are faster than internal networks',
    ],
    answer:
      'لأن البيانات والمستخدمين انتقلوا خارج المبنى الفيزيائي، مما أبطل افتراض "الداخل = آمن" / Because data and users moved outside the building, invalidating "inside = safe"',
    answer_en:
      'Because data and users moved outside the physical building, invalidating the "inside = safe" assumption',
    explanation_ar:
      'نموذج الأمان المحيطي كان يفترض أن كل ما هو داخل المبنى آمن. لكن مع السحابة والعمل عن بعد، لم تعد البيانات ولا المستخدمون محصورين داخل حدود فيزيائية، مما جعل هذا الافتراض لاغياً.',
    explanation_en:
      'The perimeter model assumed that everything inside corporate walls was safe. With cloud platforms and distributed remote workforces, data and staff are no longer enclosed within physical boundaries, invalidating this premise.',
  },

  // ── Q12 (L2 · MCQ · HARD) ───────────────────────────────────
  {
    id: 'CH2-MIX-12',
    part: 2,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'HARD',
    question_ar:
      'نظام Zero Trust ونظام أمان محيطي تقليدي، كلاهما يضم موظفاً شرعياً داخل الشبكة. تم اختراق بيانات اعتماد الموظف سراً. في أي نظام يحصل المهاجم على وصول أوسع ولماذا؟',
    question_en:
      "A Zero Trust system and a traditional perimeter system both contain a legitimate employee inside the network. The employee's credentials are secretly compromised. In which system does the attacker gain broader access, and why?",
    options: [
      'Zero Trust — لأنه يثق بالجميع داخل الشبكة / Zero Trust — because it trusts everyone inside',
      'التقليدي — لأنه يفترض أن كل شيء داخل الشبكة آمن، فيتحرك الحساب المخترق بحرية / Traditional — because it assumes the inside is safe, so the compromised account moves freely',
      'كلاهما متساويان — بيانات الاعتماد تمنح نفس الوصول في كليهما / Both are equal — credentials give the same access in both',
      'التقليدي — لأنه يستخدم كلمات مرور أقوى / Traditional — because it uses stronger passwords',
    ],
    options_en: [
      'Zero Trust — because it trusts everyone inside the network',
      'Traditional perimeter — because it assumes everything inside the network is safe, allowing the compromised account to move laterally without hindrance',
      'Both are equal — valid credentials grant identical access in both models',
      'Traditional perimeter — because it enforces stronger passwords',
    ],
    answer:
      'التقليدي — لأنه يفترض أن كل شيء داخل الشبكة آمن، فيتحرك الحساب المخترق بحرية / Traditional — because it assumes the inside is safe, so the compromised account moves freely',
    answer_en:
      'Traditional perimeter — because it assumes everything inside the network is safe, allowing the compromised account to move laterally without hindrance',
    explanation_ar:
      'في النظام التقليدي بمجرد اختراق الحساب يتحرك المهاجم بحرية لأن النظام يثق بأي شيء داخل المحيط. أما في Zero Trust فكل محاولة وصول تُفحص من جديد بناءً على الهوية والصلاحيات والسياق، مما يحصر المهاجم ويُعيق تقدمه.',
    explanation_en:
      'In traditional architectures, once inside, an attacker moves freely because internal traffic is inherently trusted. In Zero Trust, every single access attempt is re-evaluated based on identity, least privilege, and contextual signals, containing the intruder.',
  },

  // ── Q13 (L2 · WRITTEN · MEDIUM) ─────────────────────────────
  {
    id: 'CH2-MIX-13',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'MEDIUM',
    question_ar:
      'يعتقد أحد الطلاب أن إضافة سؤال سري إلى نظام يستخدم كلمة مرور ورمزاً على الهاتف يجعله مصادقة ثلاثية العوامل. هل هذا صحيح؟ برّر إجابتك.',
    question_en:
      'A student believes that adding a secret question to a system that already uses a password and a phone code makes it three-factor authentication. Is this correct? Justify your answer.',
    ideal_answer_ar:
      'هذا غير صحيح. كلمة المرور والسؤال السري ينتميان لنفس فئة المعرفة (Knowledge). المصادقة متعددة العوامل تشترط عوامل من فئات مختلفة. النظام المذكور بالفعل يجمع بين المعرفة (كلمة المرور) والحيازة (رمز الهاتف)، وإضافة سؤال سري لا تضيف فئة جديدة.',
    ideal_answer_en:
      'This is incorrect. A password and a security question both belong to the exact same authentication factor category: Knowledge (what you know). Multi-Factor Authentication strictly requires independent factors from distinct categories. The described system already pairs Knowledge (password) with Possession (phone OTP); adding a secret question simply adds another element within the same factor rather than introducing a third factor.',
    explanation_ar:
      'الفئات الثلاث: المعرفة (ما تعرفه) / الحيازة (ما تمتلكه) / السمات الحيوية (ما أنت عليه). لكي يُحسب عاملاً ثالثاً يجب أن يكون من فئة مختلفة كبصمة الإصبع.',
    explanation_en:
      'The three authentication factors are: Knowledge (something you know), Possession (something you have), and Inherence/Biometrics (something you are). To qualify as a third factor, it must come from a third distinct category, such as a biometric fingerprint or face scan.',
  },

  // ── Q14 (L2 · MCQ · MEDIUM) ─────────────────────────────────
  {
    id: 'CH2-MIX-14',
    part: 1,
    section: 'OFFICIAL',
    type: 'MCQ',
    difficulty: 'MEDIUM',
    question_ar:
      'أيٌّ مما يلي يضع كل خادم في منطقته الشبكية الصحيحة لضمان أعلى مستوى أمان؟',
    question_en:
      'Which of the following places each server in its correct network zone to ensure maximum security?',
    options: [
      'خادم قاعدة البيانات ← DMZ / خادم الويب ← الشبكة الداخلية | Database → DMZ / Web server → Internal',
      'خادم الويب ← DMZ / خادم قاعدة البيانات ← الشبكة الداخلية | Web server → DMZ / Database → Internal',
      'كلا الخادمَين ← DMZ / Both servers → DMZ',
      'كلا الخادمَين ← الشبكة الداخلية / Both servers → Internal',
    ],
    options_en: [
      'Database server → DMZ / Web server → Internal Network',
      'Web server → DMZ / Database server → Internal Network',
      'Both servers → DMZ',
      'Both servers → Internal Network',
    ],
    answer:
      'خادم الويب ← DMZ / خادم قاعدة البيانات ← الشبكة الداخلية | Web server → DMZ / Database → Internal',
    answer_en:
      'Web server → DMZ / Database server → Internal Network',
    explanation_ar:
      'خادم الويب يحتاج للتواصل مع الإنترنت لذا يوضع في الـ DMZ. أما قاعدة البيانات فتحتوي بيانات حساسة ولا يجب أن تكون مكشوفة للإنترنت، لذا مكانها دائماً في الشبكة الداخلية المحمية.',
    explanation_en:
      'The web server must communicate with the public Internet, so it is placed in the DMZ. The database server stores confidential data and must never be directly exposed to the Internet, so it always belongs inside the protected Internal Network.',
  },

  // ── Q15 (L1+L2 · WRITTEN · HARD) ────────────────────────────
  {
    id: 'CH2-MIX-15',
    part: 2,
    section: 'OFFICIAL',
    type: 'WRITTEN',
    difficulty: 'HARD',
    question_ar:
      'شركة اعتمدت سابقاً على جدار حماية قوي عند مدخل الشبكة كأساس وحيد لأمانها. بعد الانتقال إلى السحابة والعمل عن بعد، تزايدت الاختراقات. اشرح لماذا فشل هذا النهج، وأي استراتيجية أمنية يجب أن تحل محله.',
    question_en:
      'A company previously relied solely on a strong firewall at the network entry point as its only security measure. After moving to cloud and remote work, breaches increased. Explain why this approach failed, and which security strategy should replace it.',
    ideal_answer_ar:
      'فشل النهج لأن جدار الحماية وحده يمثل نقطة فشل فردية. مع انتقال البيانات للسحابة وخروج الموظفين من المبنى، لم تعد الحدود الفيزيائية تحمي شيئاً. الاستراتيجية البديلة هي الدفاع في العمق (Defense in Depth) التي تستخدم طبقات متعددة: جدار الحماية + VPN + DMZ + مكافحة الفيروسات، مع تبني نهج انعدام الثقة (Zero Trust) الذي يتحقق من كل وصول بناءً على الهوية والصلاحيات والسياق.',
    ideal_answer_en:
      'The approach failed because a firewall at the entry point represents a single point of failure. With corporate data moving to cloud infrastructure and employees working remotely, physical perimeters no longer protect organizational assets. The alternative strategy is Defense in Depth, which deploys multiple complementary security layers: Firewall (Network Entry) + VPN (Communication Path) + DMZ (Server Placement) + Antivirus/OS updates (Endpoints), combined with a Zero Trust architecture that continuously authenticates and validates every access attempt based on identity, permissions, and contextual risk.',
    explanation_ar:
      'الاعتماد على أداة أمنية واحدة يخلق نقطة فشل فردية. الدفاع في العمق يضمن أن اختراق طبقة واحدة لا يعني سقوط النظام كله.',
    explanation_en:
      'Relying solely on a single security tool creates a single point of failure. Defense in Depth guarantees that breaching one defensive layer does not lead to the complete collapse of the system.',
  },
];
'''

with open('frontend/src/ch2_mixed_assessment.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ch2_mixed_assessment.ts successfully!")
