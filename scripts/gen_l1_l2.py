import json

# Generate officialAssessments_Lesson1_2.ts
code = '''import type { QuizQuestion } from './courseData';

export const OFFICIAL_WRITTEN_L1_L2: QuizQuestion[] = [
  // ==================== LESSON 1-1 WRITTEN QUESTIONS FROM MINISTRY PDF ====================
  {
    id: "off_l1_w_m1",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "MEDIUM",
    question_ar: "اشرح كيف أثر ظهور الحواسيب الشخصية (PCs) وانتشار الوصول العالمي إلى المعلومات والبريد الإلكتروني على المجتمع؟",
    question_en: "Explain how the advent of personal computers (PCs) and global access to info/email transformed society?",
    ideal_answer_ar: "في السبعينيات والثمانينيات، أتاح انتشار الحواسيب الشخصية للأفراد إمكانية امتلاك قدرات حوسبية داخل المنازل والمكاتب بعد أن كانت مقتصرة على المؤسسات العسكرية والجامعات. وفي التسعينيات، أدى ظهور الويب والبريد الإلكتروني إلى ثورة اتصالية جعلت تبادل البيانات فورياً وتجاوز الحدود الجغرافية، مما وضع حجر الأساس للعولمة واقتصاد المعرفة.",
    ideal_answer_en: "PCs decentralized compute power from military mainframes to individuals in homes and businesses. The 1990s Web and email emergence removed geographic borders, establishing instantaneous global communication and the digital knowledge economy.",
    explanation_ar: "التحول من الحواسيب المركزية العملاقة إلى الحواسيب الشخصية وثورة الإنترنت.",
    explanation_en: "Transition from monolithic mainframes to decentralized desktop computing and web communication."
  },
  {
    id: "off_l1_w_m2",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "HARD",
    question_ar: "اشرح كيف يؤدي استمرار تصغير مكونات الدوائر في قانون مور إلى ظهور تحديات هندسية وفيزيائية وما هي الحلول البديلة؟",
    question_en: "Explain how ongoing miniaturization in Moore's Law leads to physical limits and what alternate paradigms are emerging?",
    ideal_answer_ar: "مع وصول الترانزستورات إلى أحجام ذرية متناهية الصغر (بضعة نانومترات)، تنشأ ظواهر فيزيائية معقدة مثل النفق الكمومي (Quantum Tunneling) وتسرب التيار وتولد حرارة هائلة تعيق زيادة سرعة التردد. تشمل الحلول البديلة: المعالجة متعددة الأنوية المتوازية، وتطوير شرائح مخصصة، والحوسبة الكمومية (Quantum Computing) التي تعتمد على الكيوبت بدلاً من البت التقليدي.",
    ideal_answer_en: "Shrinking transistors to single-digit nanometers triggers quantum tunneling, severe thermal dissipation limits, and electron leakage. Emerging alternatives include multi-core parallelization, domain-specific accelerators, and quantum computing using qubits.",
    explanation_ar: "حدود قانون مور الفيزيائية والاتجاه نحو الحوسبة الكمومية والتوازي.",
    explanation_en: "Physical breakdown of Moore's Law and transition toward parallel architectures and quantum mechanics."
  },
  {
    id: "off_l1_w_m3",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "MEDIUM",
    question_ar: "وضح باختصار مفهوم كل من «شبكات التواصل الاجتماعي» و«التعلم عبر الإنترنت» و«الدفع غير النقدي»؟",
    question_en: "Briefly explain the concepts of: Social Networking Services (SNS), Online Learning, and Cashless Payments?",
    ideal_answer_ar: "1. شبكات التواصل الاجتماعي (SNS): منصات رقمية تتيح للمستخدمين التواصل السريع ونشر المحتوى وتبادل الآراء حول العالم.\\n2. التعلم عبر الإنترنت: تقديم الفصول والمناهج الدراسية رقمياً عبر المنصات السحابية دون التقيد بموقع جغرافي.\\n3. الدفع غير النقدي: تسوية المعاملات المالية بالوسائل الإلكترونية والبطاقات وتطبيقات المحافظ الذكية ورموز QR دون تداول النقود الورقية.",
    ideal_answer_en: "1. SNS: Web platforms facilitating real-time personal connections and viral content dissemination.\\n2. Online Learning: Web-based delivery of scholastic curricula offering asynchronous spatial flexibility.\\n3. Cashless Payments: Financial settlement via digital wallets, contactless cards, and QR codes eliminating physical legal tender.",
    explanation_ar: "ثلاثة من أهم التحولات المجتمعية الرقمية الناتجة عن تكنولوجيا المعلومات.",
    explanation_en: "Three primary pillars of contemporary societal digital transformation."
  },
  {
    id: "off_l1_w_m4",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "MEDIUM",
    question_ar: "وضح كيف تعالج الحوسبة الطرفية البيانات محلياً على متن المركبة ذاتية القيادة فوراً لتجنب التأخير؟",
    question_en: "Explain how edge computing processes telemetry locally onboard autonomous vehicles to avoid latency?",
    ideal_answer_ar: "السيارات ذاتية القيادة تعتمد على الحوسبة الطرفية (Edge Computing) بمعالجة بيانات الكاميرات ومستشعرات الرادار والليزر (LiDAR) بواسطة حواسيب مدمجة بالمركبة مباشرة. يمنع ذلك الاعتماد على السحابة وتجنب تأخير نقل البيانات عبر الشبكة (Latency) والذي قد يستغرق مئات الميلي ثواني، وهو فارق زمني حاسم لتفادي الحوادث والكبح الطارئ الفوري.",
    ideal_answer_en: "Edge computing equips autonomous cars with onboard processors analyzing LiDAR, camera, and radar feeds locally in sub-millisecond cycles. Bypassing cloud roundtrip latency ensures life-critical emergency braking and lane corrections execute instantly.",
    explanation_ar: "الحوسبة الطرفية تضمن معالجة لحظية بدون تأخير شبكي في الأنظمة الحساسة للسلامة.",
    explanation_en: "Edge computing delivers sub-millisecond local inference essential for real-time safety critical applications."
  },
  {
    id: "off_l1_w_m5",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "HARD",
    question_ar: "وضح الفروق الجوهرية بين «البت الكلاسيكي» و«الكيوبت (qubit)» مستخدماً مفهوم «التراكب الكمي» في الحوسبة الكمومية؟",
    question_en: "Clarify fundamental differences between a classical bit and a qubit using the principle of quantum superposition?",
    ideal_answer_ar: "البت الكلاسيكي (Classical Bit) هو الوحدة الأساسية في الحواسيب التقليدية، ولا يمكن أن يأخذ إلا قيمة واحدة محددة في اللحظة الزمنية الواحدة: إما (0) أو (1).\\nبينما الكيوبت (Qubit) في الحوسبة الكمومية، يمكنه بفضل خاصية «التراكب الكمي» (Superposition) أن يتواجد في حالة تمثل (0) و(1) في آن واحد باحتمالات مختلفة، مما يمنح الحواسيب الكمومية قدرة معالجة هائلة لحل المشكلات الحسابية فائقة التعقيد بالتوازي.",
    ideal_answer_en: "A classical bit is strictly binary, holding either discrete 0 or 1 at any instant. A quantum bit (Qubit) harnesses quantum superposition, existing in linear combinations of both |0⟩ and |1⟩ states simultaneously. This grants exponential computational parallelism for complex cryptographic and molecular problems.",
    explanation_ar: "الفرق بين ثنائية البت الكلاسيكي وخاصية التراكب الكمي المتعدد للكيوبت.",
    explanation_en: "Dichotomy between deterministic binary bit states and probabilistic quantum superposition.",
  },

  // ==================== LESSON 1-2 WRITTEN QUESTIONS FROM MINISTRY PDF ====================
  {
    id: "off_l2_w_m1",
    lesson: "1-2",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "MEDIUM",
    question_ar: "لماذا تعد معظم أنظمة الذكاء الاصطناعي الحالية «ضيق النطاق» (Narrow AI)، وما الفرق بينها وبين الذكاء الاصطناعي العام؟",
    question_en: "Why are most current AI systems classified as 'Narrow AI', and how do they differ from General AI?",
    ideal_answer_ar: "تعد أنظمة الذكاء الاصطناعي الحالية ضيقة النطاق (Narrow AI أو Weak AI) لأنها مصممة ومدربة لأداء مهمة واحدة محددة أو نطاق ضيق بكفاءة عالية (مثل لعب الشطرنج، أو التعرف على الوجوه، أو ترجمة النصوص)، ولكنها لا تستطيع نقل خبرتها لأداء مهام أخرى خارج نطاقها.\\nأما الذكاء الاصطناعي العام (AGI)، فهو نظام نظري مستقبلي يمتلك قدرات إدراكية وفكرية شاملة تضاهي العقل البشري، بحيث يستطيع التفكير وحل المشكلات والتعلم الذاتي في أي مجال معرفي دون إعادة برمجة.",
    ideal_answer_en: "Current systems are Narrow AI (Weak AI) because they specialize in a single domain or bounded task (e.g. face unlock, chess, translation) without general transferable intellect. Artificial General Intelligence (AGI) is hypothetical human-level synthetic cognition capable of generalized reasoning, abstract problem-solving, and cross-domain learning autonomously.",
    explanation_ar: "الفرق بين الذكاء الاصطناعي الضيق المتخصص والذكاء الاصطناعي العام النظري.",
    explanation_en: "Contrast between domain-specific Narrow AI and hypothetical cross-domain Artificial General Intelligence."
  },
  {
    id: "off_l2_w_m2",
    lesson: "1-2",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "MEDIUM",
    question_ar: "عرف الشبكة العصبية الاصطناعية ووضح وظيفة طبقة الإدخال والطبقات المخفية وطبقة الإخراج؟",
    question_en: "Define an Artificial Neural Network and explain functions of the input layer, hidden layers, and output layer?",
    ideal_answer_ar: "الشبكة العصبية الاصطناعية (ANN) هي نموذج حوسبي مستوحى من البنية البيولوجية للخلايا العصبية في الدماغ البشري، وتتكون من وحدات معالجة مترابطة تضبط أوزانها أثناء التدريب.\\n1. طبقة الإدخال (Input Layer): تستقبل البيانات الأولية والخصائص من البيئة الخارجية (مثل بكسلات الصورة).\\n2. الطبقات المخفية (Hidden Layers): تقوم باستخراج الأنماط المعقدة والمعالجة الرياضية وتجريد الميزات عبر طبقات متعددة (في التعلم العميق).\\n3. طبقة الإخراج (Output Layer): تُنتج التوقع أو التصنيف النهائي للنظام (مثل احتمال أن الصورة لقطة أو كلب).",
    ideal_answer_en: "An Artificial Neural Network is a computational architecture inspired by biological neuronal synapses. 1. Input Layer: Ingests raw vector features (e.g. pixel luminance). 2. Hidden Layers: Perform non-linear mathematical transformations and extract hierarchical feature representations. 3. Output Layer: Emits probability distributions, regression values, or classification labels.",
    explanation_ar: "الهيكل الثلاثي للشبكة العصبية: طبقة الإدخال، الطبقات المخفية، وطبقة الإخراج.",
    explanation_en: "Three-tier neural network architecture: input, intermediate hidden transformation layers, and output."
  },
  {
    id: "off_l2_w_m3",
    lesson: "1-2",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "HARD",
    question_ar: "ناقش مشكلة «الهلوسة» في الذكاء الاصطناعي التوليدي، موضحاً سبب خطورتها في السياقات الأكاديمية والطبية وكيفية تجنبها؟",
    question_en: "Discuss 'Hallucination' in Generative AI, explaining hazards in academic/medical domains and mitigation tactics?",
    ideal_answer_ar: "الهلوسة (Hallucination) هي توليد نماذج الذكاء الاصطناعي التوليدي لمعلومات أو حقائق أو استشهادات غير صحيحة بالمرة مع تقديمها بأسلوب واثق ومقنع للغاية. تكمن خطورتها في السياقات الطبية والأكاديمية في أنها قد تدفع لاتخاذ قرارات علاجية خاطئة تؤذي المرضى أو نشر دراسات مستندة لمراجع وهمية.\\nلتجنبها: يجب على المستخدم التحقق دوماً من المصادر الأصلية المستقلة، واستخدام التوليد المعزز بالاسترجاع (RAG)، وعدم الاعتماد الأعمى على الإجابات التوليدية في المسائل الحساسة.",
    ideal_answer_en: "Hallucination refers to LLMs generating fabricated, factually false claims, synthetic citations, or bogus data packaged with linguistic fluency and confidence. In medicine and academia, it poses severe risks of malpractice, bogus citations, and lethal clinical advice. Mitigation demands independent source auditing, retrieval-augmented generation (RAG), and strict refusal of blind reliance.",
    explanation_ar: "الهلوسة التوليدية وأثرها على موثوقية المعلومات وطرق التحقق البشري.",
    explanation_en: "Hallucination mechanics in GenAI, real-world hazards, and cross-verification protocols."
  },
  {
    id: "off_l2_w_m4",
    lesson: "1-2",
    unit: "1",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "MEDIUM",
    question_ar: "افترض أن مزارعاً يريد استخدام نظام ذكاء اصطناعي للتمييز بين صور المحاصيل السليمة والمصابة، اشرح كيف يتعلم النظام أداء هذه المهمة؟",
    question_en: "Suppose a farmer wants to deploy AI to distinguish healthy vs diseased crops; explain how the system learns this task?",
    ideal_answer_ar: "يتعلم النظام عبر مراحل التعلم الآلي والتعلم العميق الخاضع للإشراف (Supervised Learning):\\n1. جمع البيانات: التقاط آلاف الصور لأوراق المحاصيل وتصنيفها بتسميات واضحة (سليمة / مصابة بنوع معين من الآفات).\\n2. التدريب: تزويد الشبكة العصبية بهذه الصور لتتعلم الأنماط والخصائص المميزة للآفات (مثل البقع الصفراء أو التمزقات) مع ضبط أوزان الروابط العصبية تلقائياً لتقليل نسبة الخطأ.\\n3. الاختبار والتشغيل: اختبار النموذج على صور جديدة لم يرها من قبل للتأكد من دقته، ثم نشره في كاميرا هاتف المزارع أو طائرة درون لفحص الحقل لحظياً.",
    ideal_answer_en: "Supervised computer vision pipeline: 1. Dataset Collection: Gathering thousands of labeled leaf images marked as healthy or diseased. 2. Training: Ingesting inputs into a convolutional neural network (CNN), adjusting synaptic weights via backpropagation to minimize classification loss on visual lesion features. 3. Inference: Deploying on drones or mobile devices to classify unobserved crop leaves in real-time.",
    explanation_ar: "خطوات تدريب نموذج رؤية حاسوبية خاضع للإشراف لتمييز الآفات الزراعية.",
    explanation_en: "End-to-end supervised deep learning training pipeline applied to precision agriculture."
  }
];
'''

with open('c:/Users/dodoa/OneDrive/Desktop/D-Learn/frontend/src/officialAssessments_Lesson1_2.ts', 'w', encoding='utf-8') as f:
    f.write(code.strip() + '\n')

print("officialAssessments_Lesson1_2.ts written successfully!")
