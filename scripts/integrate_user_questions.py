# -*- coding: utf-8 -*-
"""
Script to parse the user's provided questions, filter out duplicates,
and append the unique/novel questions to chapter1WorkshopQuestions.ts.
"""
import json

new_unique_questions = [
  # ==================== LESSON 1-1 UNIQUE QUESTIONS ====================
  {
    "id": "ws_extra_1_1_q1",
    "lesson": "1-1",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "If a microchip manufactured in 2024 contains 50 billion transistors, approximately how many transistors would a chip of the same size be expected to contain in 2028 according to Moore's Law?",
    "question_ar": "إذا كانت شريحة دقيقة مُصنعة في عام 2024 تحتوي على 50 مليار ترانزستور، فكم عدد الترانزستورات المتوقع أن تحتويها شريحة بنفس الحجم في عام 2028 وفقاً لقانون مور؟",
    "option_a_en": "100 Billion",
    "option_a_ar": "100 مليار",
    "option_b_en": "150 Billion",
    "option_b_ar": "150 مليار",
    "option_c_en": "200 Billion",
    "option_c_ar": "200 مليار",
    "option_d_en": "400 Billion",
    "option_d_ar": "400 مليار",
    "correct_option": "C",
    "explanation_en": "According to Moore's Law, transistor count doubles every 2 years. In 2026 (after 2 years): 50B × 2 = 100B. In 2028 (after another 2 years): 100B × 2 = 200B transistors.",
    "explanation_ar": "وفقاً لقانون مور يتضاعف عدد الترانزستورات كل عامين: في 2026 (بعد عامين) = 50 × 2 = 100 مليار، وفي 2028 (بعد عامين آخرين) = 100 × 2 = 200 مليار ترانزستور."
  },
  {
    "id": "ws_extra_1_1_q2",
    "lesson": "1-1",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A company in the 1990s wants to take advantage of the most significant IT development of that decade. Which action best reflects the major technological shift of that era?",
    "question_ar": "شركة في التسعينيات ترغب في الاستفادة من أهم تطور في تكنولوجيا المعلومات في ذلك العقد. أي إجراء يعكس التحول التكنولوجي الرئيسي لتلك الحقبة؟",
    "option_a_en": "Equipping employees with personal computers (PCs) for the first time",
    "option_a_ar": "تزويد الموظفين بأجهزة الكمبيوتر الشخصية (PCs) لأول مرة",
    "option_b_en": "Launching a corporate email system due to the commercialization of the Internet",
    "option_b_ar": "إطلاق نظام بريد إلكتروني للشركة بفضل تسويق الإنترنت تجارياً",
    "option_c_en": "Migrating all company data to cloud computing servers",
    "option_c_ar": "نقل جميع بيانات الشركة إلى خوادم الحوسبة السحابية",
    "option_d_en": "Developing a mobile app for smartphones",
    "option_d_ar": "تطوير تطبيق للهواتف الذكية",
    "correct_option": "B",
    "explanation_en": "The 1990s marked the commercialization of the Internet and explosive rise of corporate email and the World Wide Web (PCs emerged in 1970s-1980s, Cloud in 2010s).",
    "explanation_ar": "التسعينيات شهدت تسويق الإنترنت تجارياً وانتشار البريد الإلكتروني والويب، بينما الحواسيب الشخصية كانت في السبعينيات والثمانينيات والسحابة بعد 2010."
  },
  {
    "id": "ws_extra_1_1_q4",
    "lesson": "1-1",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A furniture store wants to help customers see how a new sofa would look in their actual living room before buying it. Which technology should they use?",
    "question_ar": "متجر أثاث يريد مساعدة العملاء على رؤية كيف ستبدو أريكة جديدة في غرفة معيشتهم الفعلية قبل شرائها. ما هي التكنولوجيا التي يجب عليهم استخدامها؟",
    "option_a_en": "Virtual Reality (VR)",
    "option_a_ar": "الواقع الافتراضي (VR)",
    "option_b_en": "Augmented Reality (AR)",
    "option_b_ar": "الواقع المعزز (AR)",
    "option_c_en": "Edge Computing",
    "option_c_ar": "حوسبة الحافة (Edge Computing)",
    "option_d_en": "Quantum Computing",
    "option_d_ar": "الحوسبة الكمية",
    "correct_option": "B",
    "explanation_en": "Augmented Reality (AR) overlays digital objects (the 3D sofa) onto the user's real physical living room space using mobile camera feeds.",
    "explanation_ar": "الواقع المعزز (AR) يركب المعلومات والنماذج الرقمية (الأريكة ثلاثية الأبعاد) فوق العالم الواقعي الفعلي (غرفة المعيشة الحقيقية)."
  },
  {
    "id": "ws_extra_1_1_q5",
    "lesson": "1-1",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A researcher is trying to solve a complex optimization problem that involves evaluating millions of combinations simultaneously. Why would a quantum computer be more suitable than a traditional computer for this task?",
    "question_ar": "يحاول باحث حل مشكلة تحسين معقدة تتضمن تقييم ملايين المجموعات في وقت واحد. لماذا يكون الكمبيوتر الكمي أكثر ملاءمة من الكمبيوتر التقليدي لهذه المهمة؟",
    "option_a_en": "Because qubits can exist in a superposition of 0 and 1 simultaneously, enabling massive parallel processing",
    "option_a_ar": "لأن الكيوبتات (Qubits) يمكن أن توجد في حالة تراكب (Superposition) من 0 و 1 في وقت واحد، مما يتيح معالجة متوازية هائلة",
    "option_b_en": "Because quantum computers use smaller vacuum tubes than traditional computers",
    "option_b_ar": "لأن أجهزة الكمبيوتر الكمية تستخدم أنابيب تفريغ أصغر من أجهزة الكمبيوتر التقليدية",
    "option_c_en": "Because quantum computers process data instantly on the edge without using the cloud",
    "option_c_ar": "لأن أجهزة الكمبيوتر الكمية تعالج البيانات فوراً على الحافة دون استخدام السحابة",
    "option_d_en": "Because qubits process one definite state at a time much faster than traditional bits",
    "option_d_ar": "لأن الكيوبتات تعالج حالة واحدة محددة في كل مرة بشكل أسرع بكثير من البتات التقليدية",
    "correct_option": "A",
    "explanation_en": "Unlike classical bits that are restricted to 0 OR 1, quantum qubits leverage superposition to exist in combinations of both simultaneously, solving vast combinatorial spaces in parallel.",
    "explanation_ar": "البت التقليدي يحمل حالة واحدة فقط (0 أو 1)، بينما الكيوبت يوظف خاصية التراكب الكمي (Superposition) لتمثيل حالات متعددة متزامنة مما يتيح معالجة متوازية هائلة."
  },
  {
    "id": "ws_extra_1_1_q8",
    "lesson": "1-1",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A company in 2015 decides to stop purchasing its own expensive servers and instead rents processing power and storage over the internet for its large-scale AI data analysis. This shift is characteristic of which IT era?",
    "question_ar": "قررت شركة في عام 2015 التوقف عن شراء خوادمها باهظة الثمن وبدلاً من ذلك استأجرت قوة المعالجة والتخزين عبر الإنترنت لتحليل بيانات الذكاء الاصطناعي على نطاق واسع. هذا التحول يميز أي حقبة من حقب تكنولوجيا المعلومات؟",
    "option_a_en": "The 1970s (Spread of PCs)",
    "option_a_ar": "السبعينيات (انتشار الحواسيب الشخصية)",
    "option_b_en": "The 1990s (Commercialization of the Internet)",
    "option_b_ar": "التسعينيات (تسويق الإنترنت تجارياً)",
    "option_c_en": "The 2000s (Rise of smartphones)",
    "option_c_ar": "العقد الأول من القرن الحادي والعشرين (ظهور الهواتف الذكية)",
    "option_d_en": "The 2010s onward (Spread of cloud computing)",
    "option_d_ar": "عقد 2010 فصاعداً (انتشار الحوسبة السحابية)",
    "correct_option": "D",
    "explanation_en": "The 2010s onward is characterized by the widespread adoption of cloud computing platforms, allowing scalable on-demand compute and storage over the internet.",
    "explanation_ar": "حقبة 2010 فصاعداً تميزت بالانتشار الواسع للحوسبة السحابية (Cloud Computing) واستئجار الموارد الحوسبية والتخزينية عبر الإنترنت لتحليل البيانات والذكاء الاصطناعي."
  },

  # ==================== LESSON 1-2 UNIQUE QUESTIONS ====================
  {
    "id": "ws_extra_1_2_q4",
    "lesson": "1-2",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A user asks an AI tool to summarize a specific meeting. The AI, instead of extracting information from the meeting notes, creates a highly realistic audio file of the speakers summarizing the points. What specific type of AI is this?",
    "question_ar": "يطلب مستخدم من أداة ذكاء اصطناعي تلخيص اجتماع معين. بدلاً من مجرد استخراج النصوص، يقوم الذكاء الاصطناعي بإنشاء ملف صوتي واقعي جداً لأصوات المتحدثين وهم يلخصون النقاط. ما هو النوع المحدد لهذا الذكاء الاصطناعي؟",
    "option_a_en": "Classical Machine Learning",
    "option_a_ar": "التعلم الآلي الكلاسيكي",
    "option_b_en": "A Rule-Based Spam Filter",
    "option_b_ar": "فلتر بريد مزعج قائم على القواعد",
    "option_c_en": "Generative AI",
    "option_c_ar": "الذكاء الاصطناعي التوليدي (Generative AI)",
    "option_d_en": "Traditional Deep Learning for classification",
    "option_d_ar": "التعلم العميق التقليدي للتصنيف",
    "correct_option": "C",
    "explanation_en": "Generative AI is specifically defined by its ability to synthesize and generate novel media data (such as synthetic speech, text, or images) based on deep learning models.",
    "explanation_ar": "الذكاء الاصطناعي التوليدي هو الذي ينتج ويبتكر بيانات ومحتوى جديداً بالكامل (مثل الصوت الاصطناعي، النصوص، الصور) اعتماداً على نماذج التعلم العميق."
  },
  {
    "id": "ws_extra_1_2_q5",
    "lesson": "1-2",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "Why might a deep learning system designed to diagnose diseases from X-rays fail to identify a very rare illness correctly?",
    "question_ar": "لماذا قد يفشل نظام تعلم عميق مصمم لتشخيص الأمراض من الأشعة السينية في تحديد مرض نادر جداً بشكل صحيح؟",
    "option_a_en": "Because deep learning systems cannot analyze images",
    "option_a_ar": "لأن أنظمة التعلم العميق لا يمكنها تحليل الصور",
    "option_b_en": "Because deep learning relies on hand-written rules, and the rare disease rule was missed",
    "option_b_ar": "لأن التعلم العميق يعتمد على قواعد مكتوبة يدوياً، وتم تفويت قاعدة المرض النادر",
    "option_c_en": "Because deep learning learns patterns from large-scale data, and it lacks sufficient examples of the rare illness to learn from",
    "option_c_ar": "لأن التعلم العميق يتعلم الأنماط من بيانات واسعة النطاق، ويفتقر إلى أمثلة كافية للمرض النادر للتعلم منها",
    "option_d_en": "Because deep learning operates too quickly on edge devices",
    "option_d_ar": "لأن التعلم العميق يعمل بسرعة كبيرة على أجهزة الحافة",
    "correct_option": "C",
    "explanation_en": "Deep learning requires vast volumes of labeled training data to adjust weights accurately. Rare conditions lack sufficient training samples, hindering pattern recognition.",
    "explanation_ar": "التعلم العميق يحتاج إلى كميات ضخمة من البيانات لتعلم الأنماط المعقدة وضبط الأوزان بدقة؛ فإذا كانت الحالات نادرة في بيانات التدريب، يعجز النموذج عن تعلم خصائصها."
  },
  {
    "id": "ws_extra_1_2_q6",
    "lesson": "1-2",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "Both a spam filter and an online bookstore's product recommendation engine are examples of which AI technology that finds patterns in past behavior?",
    "question_ar": "كل من فلتر البريد المزعج ومحرك توصيات المنتجات في متجر كتب عبر الإنترنت هما أمثلة على أي تكنولوجيا ذكاء اصطناعي تجد الأنماط في السلوك والبيانات السابقة؟",
    "option_a_en": "Generative AI",
    "option_a_ar": "الذكاء الاصطناعي التوليدي",
    "option_b_en": "Machine Learning",
    "option_b_ar": "التعلم الآلي (Machine Learning)",
    "option_c_en": "Quantum Computing",
    "option_c_ar": "الحوسبة الكمية",
    "option_d_en": "Edge Computing",
    "option_d_ar": "حوسبة الحافة",
    "correct_option": "B",
    "explanation_en": "Machine Learning is the overarching technology that detects patterns across historic data to make predictions and judgments without explicit procedural code.",
    "explanation_ar": "التعلم الآلي هو التكنولوجيا التي تستنتج الأنماط الإحصائية من البيانات السابقة لاتخاذ التنبؤات والقرارات (مثل تصنيف الرسائل أو التوصية بالمنتجات)."
  },
  {
    "id": "ws_extra_1_2_q8",
    "lesson": "1-2",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "In the hierarchy of AI technologies, what is the primary structural difference between how Deep Learning and classical Machine Learning operate?",
    "question_ar": "في التسلسل الهرمي لتقنيات الذكاء الاصطناعي، ما هو الفرق الأساسي بين كيفية هيكلة وعمل التعلم العميق مقارنة بالتعلم الآلي الكلاسيكي؟",
    "option_a_en": "Deep learning is rule-based, while machine learning uses data",
    "option_a_ar": "التعلم العميق قائم على القواعد، بينما التعلم الآلي يستخدم البيانات",
    "option_b_en": "Deep learning uses multi-layered neural networks modeled after the human brain, while classical machine learning does not necessarily rely on neural networks",
    "option_b_ar": "التعلم العميق يستخدم شبكات عصبية متعددة الطبقات تحاكي الدماغ البشري، بينما التعلم الآلي الكلاسيكي لا يعتمد بالضرورة على الشبكات العصبية",
    "option_c_en": "Deep learning can only generate new images, while machine learning can only sort emails",
    "option_c_ar": "التعلم العميق يمكنه فقط توليد صور جديدة، بينما التعلم الآلي يمكنه فقط فرز رسائل البريد الإلكتروني",
    "option_d_en": "Deep learning is a broader category that encompasses all machine learning technologies",
    "option_d_ar": "التعلم العميق هو فئة أوسع تشمل جميع تقنيات التعلم الآلي",
    "correct_option": "B",
    "explanation_en": "Deep Learning is a specialized subfield of Machine Learning distinguished by its use of multi-layered artificial neural network architectures inspired by biological brain connections.",
    "explanation_ar": "التعلم العميق هو تقنية متقدمة متفرعة من التعلم الآلي تستخدم شبكات عصبية اصطناعية عميقة متعددة الطبقات مستوحاة من الخلايا العصبية البيولوجية."
  },

  # ==================== LESSON 1-3 UNIQUE QUESTIONS ====================
  {
    "id": "ws_extra_1_3_q5",
    "lesson": "1-3",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A hospital is using an Image-diagnosis AI to analyze X-rays and CT scans. According to the cautions for using AI, what is the most critical rule the hospital must follow regarding the AI's output?",
    "question_ar": "مستشفى يستخدم الذكاء الاصطناعي لتشخيص الصور وتحليل الأشعة السينية والمقطعية. وفقاً لمحاذير استخدام الذكاء الاصطناعي، ما هي القاعدة الأهم التي يجب على المستشفى اتباعها بخصوص نتائج هذا النظام؟",
    "option_a_en": "The AI should autonomously prescribe medication based on its high accuracy",
    "option_a_ar": "يجب أن يقوم الذكاء الاصطناعي بوصف الأدوية ذاتياً بناءً على دقته العالية دون تدخل",
    "option_b_en": "The final diagnostic decision must be confirmed by a human doctor due to responsibility issues",
    "option_b_ar": "يجب أن يتم تأكيد قرار التشخيص النهائي بواسطة طبيب بشري بسبب مسائل المسؤولية والمساءلة",
    "option_c_en": "The AI's decisions must be processed instantly using Edge Computing to avoid network delays",
    "option_c_ar": "يجب معالجة قرارات الذكاء الاصطناعي فوراً باستخدام حوسبة الحافة لتجنب تأخير الشبكة",
    "option_d_en": "The AI should automatically delete all patient data after analysis to protect privacy",
    "option_d_ar": "يجب أن يقوم الذكاء الاصطناعي بحذف جميع بيانات المرضى تلقائياً بعد التحليل لحماية الخصوصية",
    "correct_option": "B",
    "explanation_en": "A fundamental guideline in medical AI deployment is that final diagnostic decisions and clinical liabilities must always be verified and held by human medical doctors.",
    "explanation_ar": "أحد أهم محاذير استخدام الذكاء الاصطناعي في الطب هو أن اتخاذ القرار النهائي والمسؤولية القانونية والطبية عنه يجب أن تظل بيد الطبيب البشري المؤهل."
  },
  {
    "id": "ws_extra_1_3_q7",
    "lesson": "1-3",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "While AI is highly effective at finding patterns in large datasets, it requires extreme caution when handling which of the following tasks?",
    "question_ar": "بينما يتميز الذكاء الاصطناعي بفاعلية عالية في إيجاد الأنماط في مجموعات البيانات الكبيرة، فإنه يتطلب حذراً شديداً عند التعامل مع أي من المهام التالية؟",
    "option_a_en": "Generating audio from text prompts",
    "option_a_ar": "توليد الصوت من الأوامر النصية",
    "option_b_en": "Classifying complex image data in a factory",
    "option_b_ar": "تصنيف بيانات الصور المعقدة في مصنع",
    "option_c_en": "Making ethical judgments that could lead to discrimination",
    "option_c_ar": "اتخاذ أحكام أخلاقية قد تؤدي إلى التمييز والظلم",
    "option_d_en": "Probabilistic reasoning for weather prediction",
    "option_d_ar": "التفكير الاحتمالي للتنبؤ بالطقس",
    "correct_option": "C",
    "explanation_en": "AI lacks moral reasoning and ethical conscience. Delegating ethical or moral judgments to pattern algorithms risks severe discrimination and civil rights violations.",
    "explanation_ar": "الذكاء الاصطناعي يفتقر إلى الضمير والوعي الأخلاقي؛ لذا يتطلب حذراً بالغاً عند التعامل مع الأحكام القيمية والأخلاقية حتى لا يؤدي إلى التمييز والتفرقة."
  },

  # ==================== LESSON 1-4 UNIQUE QUESTIONS ====================
  {
    "id": "ws_extra_1_4_q4",
    "lesson": "1-4",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "A bank uses an AI system to approve or reject loan applications. When a customer asks why their loan was rejected, the bank staff cannot explain the AI's reasoning. Which technology and which ethical principle are needed to solve this?",
    "question_ar": "بنك يستخدم نظام ذكاء اصطناعي للموافقة على طلبات القروض أو رفضها. عندما سأل عميل عن سبب رفض قرضه، لم يتمكن موظفو البنك من تفسير منطق الذكاء الاصطناعي. ما هي التكنولوجيا والمبدأ الأخلاقي المطلوبان لحل هذه المشكلة؟",
    "option_a_en": "Deep Learning, to increase the Fairness of the system",
    "option_a_ar": "التعلم العميق، لزيادة عدالة النظام",
    "option_b_en": "Explainable AI (XAI), to fulfill the principle of Transparency",
    "option_b_ar": "الذكاء الاصطناعي القابل للتفسير (XAI)، لتحقيق مبدأ الشفافية",
    "option_c_en": "Machine Translation, to improve Accountability",
    "option_c_ar": "الترجمة الآلية، لتحسين المساءلة",
    "option_d_en": "Generative AI, to protect the user's Privacy",
    "option_d_ar": "الذكاء الاصطناعي التوليدي، لحماية خصوصية المستخدم",
    "correct_option": "B",
    "explanation_en": "Explainable AI (XAI) is engineered to make machine learning decisions interpretable and transparent, fulfilling the fundamental ethical pillar of Transparency.",
    "explanation_ar": "تقنية الذكاء الاصطناعي القابل للتفسير (XAI) تمكن من فهم وشرح أسباب قرارات النماذج للبشر، محققة بذلك مبدأ الشفافية الأخلاقي المطلوب."
  },
  {
    "id": "ws_extra_1_4_q5",
    "lesson": "1-4",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "If a company wants to ensure its new AI system does not unjustly discriminate against any particular minority group, which of the four basic principles of AI ethics are they primarily focusing on?",
    "question_ar": "إذا أرادت شركة التأكد من أن نظام الذكاء الاصطناعي الجديد الخاص بها لا يميز ظلماً ضد أي مجموعة أقلية معينة، فما هو المبدأ الأساسي الذي تركز عليه بشكل أساسي من بين المبادئ الأساسية الأربعة لأخلاقيات الذكاء الاصطناعي؟",
    "option_a_en": "Transparency",
    "option_a_ar": "الشفافية (Transparency)",
    "option_b_en": "Accountability",
    "option_b_ar": "المساءلة (Accountability)",
    "option_c_en": "Fairness",
    "option_c_ar": "العدالة (Fairness)",
    "option_d_en": "Privacy protection",
    "option_d_ar": "حماية الخصوصية (Privacy Protection)",
    "correct_option": "C",
    "explanation_en": "The principle of Fairness (العدالة) specifically mandates that AI systems must treat all individuals equitably without unjust discrimination or demographic bias.",
    "explanation_ar": "مبدأ العدالة (Fairness) من المبادئ الأربعة الأساسية لأخلاقيات الذكاء الاصطناعي، ويعني ضمان عدم التمييز المجحف ضد أي شخص أو فئة مجتمعية."
  },
  {
    "id": "ws_extra_1_4_q7",
    "lesson": "1-4",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "The 'black-box problem' in artificial intelligence primarily makes it difficult to achieve which basic principle of AI ethics?",
    "question_ar": "«مشكلة الصندوق الأسود» في الذكاء الاصطناعي تجعل من الصعب بشكل أساسي تحقيق أي مبدأ أساسي من مبادئ أخلاقيات الذكاء الاصطناعي؟",
    "option_a_en": "Fairness",
    "option_a_ar": "العدالة",
    "option_b_en": "Privacy protection",
    "option_b_ar": "حماية الخصوصية",
    "option_c_en": "Transparency",
    "option_c_ar": "الشفافية (Transparency)",
    "option_d_en": "Data Collection",
    "option_d_ar": "جمع البيانات",
    "correct_option": "C",
    "explanation_en": "The Black Box problem obscures internal decision logic, directly impeding the principle of Transparency which requires decision processes to be open and inspectable.",
    "explanation_ar": "مشكلة الصندوق الأسود تعني غموض العمليات الداخلية لاتخاذ القرار، مما يتعارض مباشرة مع مبدأ الشفافية الذي يشترط وضوح آلية عمل النظام."
  },
  {
    "id": "ws_extra_1_4_q8",
    "lesson": "1-4",
    "unit": "1",
    "type": "MCQ",
    "difficulty": "HARD",
    "source": "WEEKLY_ASSESSMENT",
    "question_en": "If a developer designs an AI system that clearly logs and reports every factor it used to reach a specific judgment, which ethical principle are they actively applying?",
    "question_ar": "إذا قام مطور بتصميم نظام ذكاء اصطناعي يسجل ويبلغ بوضوح عن كل عامل استخدمه للوصول إلى حكم معين، فأي مبدأ أخلاقي يطبقه بنشاط؟",
    "option_a_en": "Privacy protection",
    "option_a_ar": "حماية الخصوصية",
    "option_b_en": "Accountability",
    "option_b_ar": "المساءلة",
    "option_c_en": "Fairness",
    "option_c_ar": "العدالة",
    "option_d_en": "Transparency",
    "option_d_ar": "الشفافية (Transparency)",
    "correct_option": "D",
    "explanation_en": "Explicitly disclosing and recording factors contributing to a decision embodies the ethical pillar of Transparency.",
    "explanation_ar": "الإفصاح والتسجيل الواضح للعوامل والبيانات التي استند إليها النظام في حكمه يمثل تطبيقاً عملياً مباشراً لمبدأ الشفافية."
  }
]

# Read existing questions from frontend/src/chapter1WorkshopQuestions.ts
with open('frontend/src/chapter1WorkshopQuestions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse the JSON portion
prefix = "export const CHAPTER1_WORKSHOP_QUESTIONS: QuizQuestion[] = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("];") + 1

raw_json = content[start_idx:end_idx]
existing_questions = json.loads(raw_json)
print(f"Existing questions count before: {len(existing_questions)}")

# Check for existing IDs to guarantee zero duplicate IDs
existing_ids = set(q['id'] for q in existing_questions)

added_count = 0
for q in new_unique_questions:
    if q['id'] not in existing_ids:
        existing_questions.append(q)
        existing_ids.add(q['id'])
        added_count += 1

print(f"Added {added_count} new unique questions!")
print(f"Total questions count now: {len(existing_questions)}")

# Write back
ts_code = content[:start_idx] + json.dumps(existing_questions, ensure_ascii=False, indent=2) + ";\n"

with open('frontend/src/chapter1WorkshopQuestions.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Saved frontend/src/chapter1WorkshopQuestions.ts successfully!")
