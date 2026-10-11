# -*- coding: utf-8 -*-
"""
Script to generate chapter1WorkshopQuestions.ts containing:
- 40 MCQ questions (10 per lesson: 8 existing deep + 2 new deep per lesson)
- 40 Written questions (10 per lesson with detailed ideal answers, rubric points, and analysis)
Total = 80 questions strictly within the Egyptian Baccalaureate Chapter 1 curriculum.
"""
import json
import re

questions = []

# ==============================================================================
# LESSON 1-1 (10 MCQ + 10 WRITTEN)
# ==============================================================================

# MCQs for 1-1 (q1 to q8 from deep, plus q9 and q10)
mcq_1_1 = [
    {
        "id": "deep_1_1_q1",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A chip manufactured in 2020 contains 10 billion transistors. According to Moore's Law, approximately how many transistors would a chip contain in 2026?",
        "question_ar": "تحتوي شريحة مصنّعة عام 2020 على 10 مليارات ترانزستور. وفقاً لقانون مور، كم ترانزستوراً تقريباً ستحتوي الشريحة عام 2026؟",
        "option_a_en": "20 billion", "option_a_ar": "20 مليار",
        "option_b_en": "40 billion", "option_b_ar": "40 مليار",
        "option_c_en": "80 billion", "option_c_ar": "80 مليار",
        "option_d_en": "160 billion", "option_d_ar": "160 مليار",
        "correct_option": "C",
        "explanation_en": "Moore's Law: transistors double every 2 years. From 2020 to 2026 = 6 years = 3 intervals of 2 years (3 doublings): 10B × 2 = 20B (2022) → 40B (2024) → 80B (2026).",
        "explanation_ar": "قانون مور: يتضاعف عدد الترانزستورات كل عامين تقريباً. من 2020 إلى 2026 = 6 سنوات أي 3 دورات مضاعفة: 10 × 2 = 20 (2022) ثم 40 (2024) ثم 80 مليار (2026)."
    },
    {
        "id": "deep_1_1_q2",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Scientists are trying to make transistors even smaller, but electrons are slipping through barriers they should not cross. Which physical phenomenon is causing this problem and threatening Moore's Law?",
        "question_ar": "يحاول العلماء تصغير الترانزستورات أكثر، لكن الإلكترونات تتسلل عبر حواجز لا يُفترض أن تعبرها. ما الظاهرة الفيزيائية التي تُسبب هذه المشكلة وتُهدد استمرار قانون مور؟",
        "option_a_en": "Parallel processing", "option_a_ar": "المعالجة المتوازية",
        "option_b_en": "Quantum tunneling effect", "option_b_ar": "تأثير النفق الكمومي",
        "option_c_en": "Cloud computing latency", "option_c_ar": "زمن التأخير في الحوسبة السحابية",
        "option_d_en": "Edge computing overload", "option_d_ar": "الضغط الزائد على الحوسبة الطرفية",
        "correct_option": "B",
        "explanation_en": "When transistors shrink to atomic scales, quantum tunneling occurs where electrons leak through insulating barriers, creating excessive heat and leakage current.",
        "explanation_ar": "عندما تصغر الترانزستورات لأبعاد ذرية (بضعة نانومترات)، تنشأ ظاهرة النفق الكمومي حيث تعبر الإلكترونات الحواجز العازلة مسببة تسرب التيار والحرارة المفرطة."
    },
    {
        "id": "deep_1_1_q3",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "An autonomous vehicle drives at 100 km/h. An obstacle suddenly appears 15 meters ahead. Why must the obstacle detection system use edge computing instead of cloud computing?",
        "question_ar": "تسير سيارة ذاتية القيادة بسرعة 100 كم/ساعة، وظهر فجأة عائق على بُعد 15 متراً. لماذا يجب أن يعتمد نظام رصد العوائق على الحوسبة الطرفية بدلاً من الحوسبة السحابية؟",
        "option_a_en": "Because cloud servers do not support computer vision algorithms", "option_a_ar": "لأن خوادم السحابة لا تدعم خوارزميات رؤية الحاسوب",
        "option_b_en": "Because network latency to the cloud could cause fatal delays before braking", "option_b_ar": "لأن زمن التأخير الشبكي (Latency) في السحابة قد يُسبب تأخيراً قاتلاً قبل الكبح",
        "option_c_en": "Because edge computing devices are cheaper than cloud subscriptions", "option_c_ar": "لأن أجهزة الحوسبة الطرفية أرخص من اشتراكات السحابة",
        "option_d_en": "Because cloud storage cannot hold camera images", "option_d_ar": "لأن التخزين السحابي لا يستوعب صور الكاميرات",
        "correct_option": "B",
        "explanation_en": "Autonomous driving requires instantaneous decisions (milliseconds). Cloud transmission adds latency and risks network drops; edge computing processes data locally onboard the car without delay.",
        "explanation_ar": "القيادة الذاتية تتطلب استجابة فورية بالأجزاء من الثانية. إرسال البيانات للسحابة يُحدث تأخيراً شبكياً (Latency) قد يؤدي إلى حادث مميت قبل الضغط على الفرامل."
    },
    {
        "id": "deep_1_1_q4",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A medical training app shows a surgeon a 3D digital model of a beating heart overlaid onto a real human patient lying on the operating table. Which technology is being utilized?",
        "question_ar": "تطبيق تدريب طبي يعرض للجراح نموذجاً رقمياً ثلاثي الأبعاد لقلب نابض مركباً فوق جسد مريض حقيقي ممدد على طاولة العمليات. أي تقنية تُستخدم هنا؟",
        "option_a_en": "Virtual Reality (VR)", "option_a_ar": "الواقع الافتراضي (VR)",
        "option_b_en": "Augmented Reality (AR)", "option_b_ar": "الواقع المعزز (AR)",
        "option_c_en": "Quantum Computing", "option_c_ar": "الحوسبة الكمومية",
        "option_d_en": "Edge Automation", "option_d_ar": "الأتمتة الطرفية",
        "correct_option": "B",
        "explanation_en": "Augmented Reality (AR) overlays digital content onto the real physical world, whereas VR replaces the real world entirely with an immersive virtual simulation.",
        "explanation_ar": "الواقع المعزز (AR) يدمج ويُركب عناصر رقمية فوق العالم الحقيقي الفعلي، بينما الواقع الافتراضي (VR) يستبدل الواقع ببيئة مصطنعة بالكامل تعزل المستخدم."
    },
    {
        "id": "deep_1_1_q5",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "In a classical computer, 3 bits can represent exactly one state out of 8 possible states at any single moment. How many states can 3 qubits represent simultaneously in a quantum computer?",
        "question_ar": "في الحاسوب التقليدي، تمثل 3 بتات حالة واحدة فقط من بين 8 حالات ممكنة في اللحظة الواحدة. كم حالة يمكن لـ 3 كيوبتات تمثيلها في وقت واحد داخل الحاسوب الكمومي؟",
        "option_a_en": "Only 1 state", "option_a_ar": "حالة واحدة فقط",
        "option_b_en": "3 states", "option_b_ar": "3 حالات",
        "option_c_en": "All 8 states simultaneously", "option_c_ar": "جميع الـ 8 حالات في وقت واحد معاً",
        "option_d_en": "24 states", "option_d_ar": "24 حالة",
        "correct_option": "C",
        "explanation_en": "Thanks to quantum superposition, n qubits can exist in a superposition of all 2^n states simultaneously. 3 qubits represent all 2^3 = 8 states at the same time.",
        "explanation_ar": "بفضل خاصية التراكب الكمي (Superposition)، تستطيع n من الكيوبتات تمثيل جميع الاحتمالات (2 أس n) في آنٍ واحد، أي تمثيل الحالات الثماني معاً في نفس اللحظة."
    },
    {
        "id": "deep_1_1_q6",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Which technological development era was primarily characterized by decentralized computing moving into private homes and offices via Personal Computers (PCs)?",
        "question_ar": "أي حقبة في تطور تكنولوجيا المعلومات تميزت أساساً بانتقال الحوسبة اللامركزية إلى المنازل والمكاتب الخاصة عبر الحواسيب الشخصية (PCs)؟",
        "option_a_en": "1950s - 1960s (Mainframes)", "option_a_ar": "الخمسينيات والستينيات (الحواسيب المركزية العملاقة)",
        "option_b_en": "1970s - 1980s (Personal Computers)", "option_b_ar": "السبعينيات والثمانينيات (الحواسيب الشخصية)",
        "option_c_en": "1990s (World Wide Web explosion)", "option_c_ar": "التسعينيات (انفجار شبكة الويب العالمية)",
        "option_d_en": "2010s (Mobile & Cloud era)", "option_d_ar": "عقد 2010 (حقبة الهواتف الذكية والحوسبة السحابية)",
        "correct_option": "B",
        "explanation_en": "The 1970s and 1980s saw the birth and rise of personal computing (PCs), shifting computing from institutional mainframes to desks and homes.",
        "explanation_ar": "حقبة السبعينيات والثمانينيات شهدت ولادة وانتشار الحواسيب الشخصية (PCs)، مما نقل القدرة الحوسبية من المراكز العسكرية والجامعية إلى الأفراد في المنازل والمكاتب."
    },
    {
        "id": "deep_1_1_q7",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A citizen buys groceries, pays utility bills, and buys a train ticket using only a smartphone linked to a digital wallet without touching paper bills. Which social transformation is this?",
        "question_ar": "مواطن يشتري مستلزماته ويسدد فواتير المياه والكهرباء وتذاكر القطار بهاتفه المحمول عبر محفظة رقمية دون استخدام النقود الورقية نهائياً. ما التحول الاجتماعي الذي يمثله هذا؟",
        "option_a_en": "Social Networking Services (SNS)", "option_a_ar": "شبكات التواصل الاجتماعي (SNS)",
        "option_b_en": "Remote Working", "option_b_ar": "العمل عن بُعد",
        "option_c_en": "Cashless Payment", "option_c_ar": "الدفع غير النقدي (Cashless Payment)",
        "option_d_en": "Quantum Encryption", "option_d_ar": "التشفير الكمومي",
        "correct_option": "C",
        "explanation_en": "Cashless Payment is the societal transition away from physical banknotes to digital transactions via smart wallets, QR codes, and cards.",
        "explanation_ar": "الدفع غير النقدي يمثل الانتقال المجتمعي من التعامل بالعملات الورقية إلى المعاملات الرقمية الفورية عبر المحافظ الإلكترونية ورموز الاستجابة السريعة (QR) والبطاقات الذكية."
    },
    {
        "id": "deep_1_1_q8",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "To overcome the physical slowdown of Moore's Law in single processors, modern computer chip manufacturers have primarily shifted towards which architectural approach?",
        "question_ar": "للتغلب على التباطؤ الفيزيائي لقانون مور في المعالجات الأحادية، اتجه مصنعو الرقائق الإلكترونية الحديثة بشكل أساسي إلى أي نمط معماري؟",
        "option_a_en": "Multi-core processors and parallel processing", "option_a_ar": "المعالجات متعددة الأنوية والمعالجة المتوازية (Multi-core / Parallelism)",
        "option_b_en": "Returning to vacuum tubes", "option_b_ar": "العودة إلى الصمامات المفرغة",
        "option_c_en": "Restricting computers to single-task batch processing", "option_c_ar": "قصر الحواسيب على معالجة الدفعات أحادية المهمة",
        "option_d_en": "Eliminating cache memory completely", "option_d_ar": "إلغاء الذاكرة المخبأة (Cache) بالكامل",
        "correct_option": "A",
        "explanation_en": "When single-core clock speeds hit thermal barriers, engineers adopted multi-core architectures to divide workloads and execute tasks in parallel.",
        "explanation_ar": "عندما واجهت المعالجات أحادية النواة قيود الحرارة واستهلاك الطاقة، انتقل المصنعون إلى المعالجات متعددة الأنوية والمعالجة المتوازية لتوزيع الأعباء الحوسبية."
    },
    {
        "id": "deep_1_1_q9",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A pilot trains for rare extreme weather emergencies inside a cockpit simulator with specialized headsets and motion platforms, completely isolated from real-world visuals. Which technology is this?",
        "question_ar": "طيار يتدرب على مواجهة طوارئ الطقس العاصف داخل مقصورة محاكاة مزودة بنظارات رقمية وحركة تفاعلية تعزله تماماً عن رؤية العالم الخارجي. أي تقنية تمثل هذا النظام؟",
        "option_a_en": "Augmented Reality (AR)", "option_a_ar": "الواقع المعزز (AR)",
        "option_b_en": "Virtual Reality (VR)", "option_b_ar": "الواقع الافتراضي (VR)",
        "option_c_en": "Edge Caching", "option_c_ar": "التخزين المؤقت الطرفي",
        "option_d_en": "SNS Networking", "option_d_ar": "شبكات التواصل الاجتماعي",
        "correct_option": "B",
        "explanation_en": "Virtual Reality (VR) immerses the user completely into a fully simulated 3D computer-generated environment, blocking out physical surroundings.",
        "explanation_ar": "الواقع الافتراضي (VR) يغمر المستخدم تماماً في بيئة افتراضية تفاعلية ثلاثية الأبعاد مولدة حاسوبياً تعزله كلياً عن محيطه الواقعي."
    },
    {
        "id": "deep_1_1_q10",
        "lesson": "1-1", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Which statement best describes the difference between Cloud Computing and Edge Computing in terms of data processing location?",
        "question_ar": "أي العبارات التالية تصف بدقة الفرق بين الحوسبة السحابية والحوسبة الطرفية من حيث مكان معالجة البيانات؟",
        "option_a_en": "Cloud processes data on central remote servers, while edge processes data on or near the capturing device", "option_a_ar": "السحابة تعالج البيانات في خوادم مركزية بعيدة، بينما الطرفية تعالجها داخل الجهاز أو بالقرب منه محلياً",
        "option_b_en": "Cloud processes data locally on phones, while edge uses global subsea cable data centers", "option_b_ar": "السحابة تعالج محلياً على الهواتف، بينما الطرفية تستخدم مراكز كابلات البحار العالمية",
        "option_c_en": "Edge computing requires paper records, while cloud computing is completely paperless", "option_c_ar": "الطرفية تتطلب سجلات ورقية بينما السحابية رقمية بالكامل",
        "option_d_en": "Cloud only works during daytime, while edge works 24 hours", "option_d_ar": "السحابة تعمل نهاراً فقط بينما الطرفية تعمل 24 ساعة",
        "correct_option": "A",
        "explanation_en": "Cloud computing relies on centralized mega data centers accessed over the Internet, whereas edge computing processes data locally where it is collected to slash latency.",
        "explanation_ar": "الحوسبة السحابية ترسل البيانات إلى مراكز بيانات عملاقة مركزية عبر الإنترنت، بينما الحوسبة الطرفية تعالج البيانات فورياً عند المصدر (على الحافة) لتقليل زمن الاستجابة."
    }
]

# WRITTEN for 1-1 (10 deep questions)
written_1_1 = [
    {
        "id": "ws_ch1_1_w1",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "A tech analyst claims that a processor manufactured in 2022 with 8 billion transistors will reach 64 billion transistors in 2028. Based on Moore's Law, verify whether this claim is mathematically accurate, explaining the formula and time intervals.",
        "question_ar": "يزعم محلل تقني أن معالجاً صُنع عام 2022 ويحتوي على 8 مليارات ترانزستور سيصل عدد ترانزستوراته إلى 64 مليار ترانزستور بحلول عام 2028. بالاعتماد على قانون مور، بيّن بالحسابات الدقيقة هل هذا الادعاء صحيح أم خاطئ، مع شرح فترات التضاعف.",
        "ideal_answer_ar": "الادعاء صحيح تماماً رياضياً وفق قانون مور:\n1. المفهوم: ينص قانون مور على تضاعف عدد الترانزستورات كل عامين تقريباً.\n2. الفترة الزمنية: من 2022 إلى 2028 = 6 سنوات.\n3. عدد فترات التضاعف = 6 ÷ 2 = 3 فترات (3 مضاعفات).\n4. الحساب خطوة بخطوة:\n   - بعد عامين (2024): 8 مليار × 2 = 16 مليار.\n   - بعد عامين آخرين (2026): 16 مليار × 2 = 32 مليار.\n   - بعد عامين آخرين (2028): 32 مليار × 2 = 64 مليار ترانزستور.\nإذن، الحساب دقيق 100% ويطابق قانون مور.",
        "ideal_answer_en": "The claim is mathematically accurate based on Moore's Law:\n1. Moore's Law states transistor density doubles every 2 years.\n2. Total time elapsed = 2028 - 2022 = 6 years.\n3. Number of doubling intervals = 6 / 2 = 3 intervals.\n4. Step-by-step: 2024 = 8B × 2 = 16B; 2026 = 16B × 2 = 32B; 2028 = 32B × 2 = 64B transistors. Thus, the calculation is precisely correct.",
        "explanation_ar": "تطبيق حسابي مباشر ودقيق على قانون مور مع حساب عدد فترات التضاعف والناتج النهائي.",
        "explanation_en": "Direct calculation verifying Moore's Law doubling intervals over 6 years."
    },
    {
        "id": "ws_ch1_1_w2",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain why autonomous vehicles cannot rely exclusively on cloud computing for obstacle avoidance, and detail the technical role of edge computing in resolving this life-critical challenge.",
        "question_ar": "علل: لماذا لا يمكن للمركبات ذاتية القيادة الاعتماد حصرياً على الحوسبة السحابية لتفادي العوائق والحوادث؟ واشرح الدور التقني للحوسبة الطرفية (Edge Computing) في حل هذا التحدي الحرج.",
        "ideal_answer_ar": "لا يمكن الاعتماد على السحابة للأسباب التالية:\n1. زمن التأخير الشبكي (Latency): نقل صور الكاميرات وبيانات المستشعرات إلى خوادم السحابة ثم انتظار القرار يستغرق عشرات أو مئات الميلي ثواني، وهو وقت قد يؤدي لاصطدام مميت لسيارة تسير بسرعات عالية.\n2. مخاطر فقدان الاتصال: قد تمر السيارة بأنفاق أو مناطق ريفية مقطوعة الإشارة، مما يجعلها عاجزة تماماً عن اتخاذ قرارات السلامة.\n\nدور الحوسبة الطرفية (Edge Computing):\n- تقوم بمعالجة تدفقات الفيديو والمستشعرات محلياً بواسطة معالجات مدمجة داخل المركبة في أجزاء من الثانية (Sub-millisecond).\n- تتيح اتخاذ قرارات الكبح الطارئ وتغيير المسار بشكل مستقل ولحظي دون الحاجة إلى أي اتصال شبكي خارجي.",
        "ideal_answer_en": "Cloud computing is insufficient for autonomous vehicles due to network latency (delays of hundreds of milliseconds can cause fatal crashes at highway speeds) and the risk of disconnected zones (tunnels, dead spots).\nEdge computing solves this by running computer vision and neural inference locally on onboard processors in sub-millisecond real-time, executing emergency braking autonomously without cloud roundtrips.",
        "explanation_ar": "التركيز على معضلة زمن الاستجابة (Latency) وانقطاع الشبكة، وكيف تعالج الحوسبة الطرفية البيانات لحظياً داخل المركبة.",
        "explanation_en": "Focus on latency risks and local sub-millisecond edge processing."
    },
    {
        "id": "ws_ch1_1_w3",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Compare Augmented Reality (AR) and Virtual Reality (VR) across three dimensions: environment immersion, user interaction with physical surroundings, and a real-world specialized application for each.",
        "question_ar": "قارن بين الواقع المعزز (AR) والواقع الافتراضي (VR) من حيث ثلاثة أوجه: طبيعة البيئة ودرجة الانغماس، تفاعل المستخدم مع المحيط الفيزيائي، ومثال تطبيقي متخصص لكل منهما.",
        "ideal_answer_ar": "المقارنة التفصيلية:\n1. طبيعة البيئة والانغماس:\n   - الواقع المعزز (AR): يُبقي المستخدم في بيئته الحقيقية مع إضافة وتركيب طبقات رقمية (نصوص، صور ثلاثية الأبعاد) فوقها دون عزله.\n   - الواقع الافتراضي (VR): يعزل المستخدم تماماً عن العالم الحقيقي ويغمره في بيئة رقمية محاكاة بنسبة 100% داخل نظارات مغلقة.\n\n2. التفاعل مع المحيط الفيزيائي:\n   - AR: يتفاعل المستخدم مع الأشخاص والأجسام الواقعية حوله مع رؤية العناصر الرقمية المدمجة.\n   - VR: ينفصل المستخدم بصرياً وحسياً عن محيطه الفيزيائي ويتفاعل فقط مع العناصر المصطنعة داخل العالم الافتراضي.\n\n3. مثال تطبيقي متخصص:\n   - AR: قيام جراح بعرض مسار الأوعية الدموية ثلاثياً فوق جسد المريض أثناء الجراحة، أو ملاحة HUD على الزجاج الأمامي للسيارة.\n   - VR: تدريب رواد الفضاء والطيارين على مناورات انعدام الجاذبية ومحاكاة مقصورات القيادة المعقدة دون أي مخاطر حقيقية.",
        "ideal_answer_en": "Comparison:\n1. Environment: AR supplements real physical space with digital overlays; VR replaces physical reality with a 100% simulated digital environment.\n2. Surroundings: AR users stay engaged with actual physical reality; VR users are visually and sensorially isolated from the physical room.\n3. Applications: AR = Surgical navigation overlaying veins onto a patient's body; VR = Flight simulator training pilots through zero-visibility storms.",
        "explanation_ar": "المقارنة بين AR و VR من حيث درجة الانغماس والتعامل مع المحيط وتطبيقات واقعية دقيقة.",
        "explanation_en": "Comprehensive comparison between AR and VR across immersion, interaction, and concrete use cases."
    },
    {
        "id": "ws_ch1_1_w4",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain the fundamental difference between a classical Bit and a quantum Qubit, and describe why Qubits provide exponentially greater computational capacity using the concept of Superposition.",
        "question_ar": "وضّح الفرق الجوهري بين البت التقليدي (Bit) والكيوبت الكمومي (Qubit)، واشرح كيف تمنح خاصية «التراكب الكمي» (Superposition) الحواسيب الكمومية قدرة حوسبية هائلة مقارنة بالحواسيب الكلاسيكية.",
        "ideal_answer_ar": "1. الفرق الجوهري:\n   - البت الكلاسيكي (Bit): وحدة ثنائية منفصلة يمكن أن تكون إما 0 أو 1 فقط في أي لحظة معينة.\n   - الكيوبت (Qubit): وحدة معلومات كمومية يمكن أن تمثل 0 أو 1 أو كليهما معاً في نفس اللحظة بفضل قوانين ميكانيكا الكم.\n\n2. أثر خاصية التراكب الكمي (Superposition):\n   - في الحاسوب الكلاسيكي، لتجربة 8 احتمالات نحتاج فحصها تتابعياً واحدة تلو الأخرى.\n   - أما مع الحوسبة الكمومية، فإن 3 كيوبتات تستطيع تمثيل كافة الـ 8 حالات الممكنة (2³ = 8) متراكبة في آنٍ واحد، و300 كيوبت يمكنها تمثيل حالات تفوق عدد ذرات الكون المرئي.\n   - هذا يتيح للحاسوب الكمومي معالجة كميات فلكية من الاحتمالات المتوازية في ثوانٍ، مما يحل معضلات التشفير والنمذجة الجزيئية التي تستغرق آلاف السنين على أسرع حاسوب كلاسيكي.",
        "ideal_answer_en": "1. Difference: A classical bit holds mutually exclusive states (0 OR 1). A qubit can exist as 0, 1, or both simultaneously via quantum superposition.\n2. Computational capacity: Classical bits explore states sequentially. Superposition enables N qubits to represent 2^N states simultaneously, executing vast parallel computations instantly for cryptography and molecular simulation.",
        "explanation_ar": "الفرق بين البت والكيوبت ومفهوم التراكب (Superposition) ومضاعفة القدرة الحوسبية أُسياً.",
        "explanation_en": "Bit vs Qubit, superposition mechanism, and exponential speedup."
    },
    {
        "id": "ws_ch1_1_w5",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Discuss how the emergence of Personal Computers (PCs) in the 1970s-1980s and the Internet in the 1990s democratized access to information and reshaped modern societal structures.",
        "question_ar": "ناقش كيف ساهم ظهور الحواسيب الشخصية (PCs) في السبعينيات والثمانينيات، يليه انتشار الإنترنت والويب في التسعينيات، في إضفاء الطابع الديمقراطي على الوصول للمعلومات وإعادة تشكيل البنية المجتمعية.",
        "ideal_answer_ar": "1. حقبة السبعينيات والثمانينيات (الحواسيب الشخصية):\n   - قبلها كانت الحوسبة حكراً على المؤسسات العسكرية والجامعات الكبرى عبر حواسيب مركزية عملاقة.\n   - أدى ظهور الـ PCs إلى نقل القوة الحسابية ومعالجة البيانات إلى المكاتب والمنازل، مما مكّن الأفراد والشركات الصغيرة من إدارة الأعمال والتعليم الذاتي بشكل لامركزي.\n\n2. حقبة التسعينيات (الإنترنت والويب والبريد الإلكتروني):\n   - أزالت المسافات الجغرافية وحولت العالم إلى قرية رقمية صغيرة.\n   - مكنت أي شخص من نشر واسترجاع المعلومات فورياً والتواصل بالبريد الإلكتروني دون تكلفة تذكر.\n   - مهّدت لانبثاق اقتصاد المعرفة العالمي، والتجارة الإلكترونية، وثورة العولمة الثقافية والتجارية.",
        "ideal_answer_ar": "1. 1970s-1980s (PCs): Liberated compute power from military mainframes to individuals in offices and households, empowering personal productivity and decentralized knowledge.\n2. 1990s (Internet/Web): Collapsed geographical boundaries through instantaneous web access and email, birthing the global knowledge economy, e-commerce, and democratized information publishing.",
        "explanation_ar": "تحول الحوسبة من مركزية محتكرة إلى قوة للأفراد وظهور العولمة واقتصاد المعرفة.",
        "explanation_en": "Transition from institutional mainframes to desktop PCs and worldwide web interconnectivity."
    },
    {
        "id": "ws_ch1_1_w6",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Why are silicon-based microchips approaching a physical limit under Moore's Law? Detail the role of heat dissipation and quantum tunneling in halting transistor shrinking.",
        "question_ar": "لماذا تقترب الرقائق الدقيقة المعتمدة على السيليكون من حدودها الفيزيائية وفق قانون مور؟ وضح دور كل من انبعاث الحرارة وظاهرة النفق الكمومي في إعاقة تصغير الترانزستورات.",
        "ideal_answer_ar": "أسباب اقتراب حدود قانون مور الفيزيائية:\n1. انبعاث الحرارة المفرطة (Thermal Dissipation): مع تكديس مليارات الترانزستورات في مساحة مليمترات معدودة وزيادة التردد، تتولد كميات هائلة من الحرارة يستحيل تبريدها بالطرق التقليدية، مما يؤدي إلى تلف الشريحة واستهلاك طاقة غير مستدام.\n2. ظاهرة النفق الكمومي (Quantum Tunneling): عندما تتقلص بوابات الترانزستور العازلة إلى سُمك ذرات معدودة (أقل من بضعة نانومترات)، تفقد قوانين الفيزياء الكلاسيكية سيطرتها وتبدأ الإلكترونات بالتسلل عبر العازل، مما يُحدث تسرباً مستمراً للتيار ويفقد الترانزستور قدرته على العمل كمفتاح (تشغيل/إيقاف 0 و1).\nالحلول: التحول إلى الرقائق متعددة الأنوية، وتصميم معمارية مخصصة، وتطوير الحوسبة الكمومية.",
        "ideal_answer_en": "1. Thermal Dissipation: Packing billions of transistors into tiny silicon dies creates unsustainable heat densities that traditional coolers cannot dissipate without melting chips.\n2. Quantum Tunneling: At single-digit nanometer gate thicknesses, electrons leak across insulating barriers via quantum effects, causing constant current leakage and failure of on/off switching.\nRemedies: Multi-core parallelism, specialized accelerators, and quantum computing paradigms.",
        "explanation_ar": "الحدود الفيزيائية للسيليكون: أزمة التبريد وتبدد الحرارة وظاهرة تسلل الإلكترونات الكمومية.",
        "explanation_en": "Thermal limits and quantum leakage barriers stopping classical miniaturization."
    },
    {
        "id": "ws_ch1_1_w7",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Describe three key social changes brought about by information technology (e.g., Cashless Payments, Remote Work, Online Learning) and analyze both a benefit and a challenge for each.",
        "question_ar": "صف ثلاثة تحولات اجتماعية رئيسية أحدثتها تكنولوجيا المعلومات (مثل: الدفع غير النقدي، العمل عن بُعد، التعلم عبر الإنترنت)، وحلل ميزة وتحدياً رئيسياً لكل تحول منها.",
        "ideal_answer_ar": "1. الدفع غير النقدي (Cashless Payments):\n   - الوصف: تسوية المعاملات المالية إلكترونياً بالمحافظ والبطاقات دون نقد ورقي.\n   - الميزة: سرعة المعاملات، تقليل مخاطر السرقة، والحد من تزييف العملات وتسهيل التجارة.\n   - التحدي: مخاطر الاحتيال الإلكتروني وتهميش الفئات التي لا تمتلك هواتف ذكية أو حسابات بنكية.\n\n2. العمل عن بُعد (Remote Work):\n   - الوصف: أداء المهام الوظيفية من المنزل باستخدام السحابة وتطبيقات الاتصال المرئي.\n   - الميزة: توفير وقت ومصاريف المواصلات والمرونة للأسر والشركات.\n   - التحدي: تلاشي الحدود بين الحياة الشخصية والعملية والعزلة الاجتماعية وصعوبة الرقابة.\n\n3. التعلم عبر الإنترنت (Online Learning):\n   - الوصف: تقديم المناهج والمحاضرات رقمياً عبر المنصات التعليمية غير المتزامنة.\n   - الميزة: إتاحة التعليم للجميع في أي وقت ومكان والتعلم بالوتيرة الفردية للطالب.\n   - التحدي: الفجوة الرقمية (عدم توفر إنترنت سريع لجميع الطلاب) وضعف التفاعل البشري المباشر.",
        "ideal_answer_en": "1. Cashless Payment: Pro = Instant secure transactions; Con = Cyber fraud risks and exclusion of unbanked citizens.\n2. Remote Work: Pro = Commute time savings and flexibility; Con = Blurring work-life boundaries and social isolation.\n3. Online Learning: Pro = Universal access to elite coursework anywhere; Con = Digital divide inequalities and lack of hands-on physical engagement.",
        "explanation_ar": "شرح ثلاثة تحولات اجتماعية متضمنة في المنهج وتحليل المزايا والتحديات لكل منها.",
        "explanation_en": "Detailed analysis of 3 core social transformations with benefits and challenges."
    },
    {
        "id": "ws_ch1_1_w8",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "A logistics enterprise is deploying an AI drone fleet. Explain which data should be processed locally via edge computing and which data should be uploaded to the central cloud.",
        "question_ar": "تعتزم شركة لوجستية إطلاق أسطول طائرات بدون طيار (درونز) للتوصيل. وضّح ما هي البيانات التي ينبغي معالجتها محلياً عبر الحوسبة الطرفية، وما البيانات التي تُرفع إلى الخوادم السحابية المركزية مع التعليل.",
        "ideal_answer_ar": "توزيع المهام بين الطرف والسحابة:\n1. بيانات الحوسبة الطرفية (على متن الدرون):\n   - رصد العوائق اللحظية (أشجار، أسلاك كهرباء، طيور) باستخدام الكاميرات ومستشعرات الموجات فوق الصوتية.\n   - التحكم في التوازن وتفادي الاصطدام الفوري وتعديل مسار الطيران في أجزاء من الثانية.\n   - التعليل: لأن أي تأخير في إرسال هذه البيانات للسحابة سيتسبب في سقوط الدرون أو اصطدامه فوراً.\n\n2. بيانات الحوسبة السحابية (المركزية):\n   - سجلات الرحلات الإجمالية وإحصاءات استهلاك البطارية والمحركات للصيانة التنبؤية.\n   - تحديث خرائط المدن وتتبع الشحنات بواسطة العملاء وإدارة جداول التوصيل للأساطيل بالكامل.\n   - التعليل: لأن هذه العمليات تتطلب سعات تخزين ضخمة وقدرة تحليلية كبرى ولا تتطلب زمناً استجابياً بأجزاء من الثانية.",
        "ideal_answer_en": "1. Edge Processing (Onboard Drone): Real-time obstacle avoidance (trees, powerlines, birds) and flight stability adjustments. Rationale: Sub-millisecond latency is vital to avoid fatal mid-air crashes.\n2. Cloud Processing (Central Server): Long-term battery analytics, fleet delivery scheduling, customer order tracking, and city-wide map updates. Rationale: High-storage, heavy analytics without life-critical microsecond latency demands.",
        "explanation_ar": "تقسيم المعمارية بين المعالجة الطرفية اللحظية والمعالجة السحابية التحليلية التراكمية.",
        "explanation_en": "Architectural breakdown between real-time edge processing and aggregated cloud analytics."
    },
    {
        "id": "ws_ch1_1_w9",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "How does Social Networking Services (SNS) influence public opinion and social movements compared to traditional broadcast media (TV and newspapers)? Provide two concrete points.",
        "question_ar": "كيف تؤثر شبكات التواصل الاجتماعي (SNS) على تشكيل الرأي العام والحركات المجتمعية مقارنة بوسائل الإعلام التقليدية (التلفزيون والصحف)؟ وضّح ذلك في نقطتين محددتين.",
        "ideal_answer_ar": "1. التحول من الاتصال أحادي الاتجاه إلى التفاعل ثنائي الاتجاه التشاركي:\n   - في الإعلام التقليدي، المتلقي سلبي يتلقى الرسالة من جهة واحدة دون قدرة فورية على الرد.\n   - في شبكات التواصل الاجتماعي (SNS)، أصبح كل مواطن صانع محتوى وناشراً ومشاركاً في النقاش، مما يتيح انتشار الآراء وتنسيق المبادرات المجتمعية في دقائق عبر الوسوم والمنشورات الفورية.\n\n2. سرعة الانتشار الفيروسي وتجاوز الرقابة الجغرافية والمؤسسية:\n   - الأخبار والأحداث تنتقل لحظياً عبر الهواتف الذكية مع مقاطع الفيديو الحية من قلب الحدث، مما يُسقط حواجز التعتيم ويتيح للرأي العام العالمي التفاعل الفوري مع القضايا الإنسانية والاجتماعية.",
        "ideal_answer_en": "1. Two-way decentralized participation: Traditional media is one-way passive broadcast; SNS empowers every user to be a content creator, sparking real-time dialogue and grassroots movements.\n2. Viral instant velocity: Citizen journalism via mobile live streams bypasses editorial bottlenecks, creating global awareness and mobilization within minutes.",
        "explanation_ar": "أثر SNS على سرعة نقل المعلومة والتحول من التلقي السلبي إلى التفاعل والمشاركة المجتمعية.",
        "explanation_en": "Contrast between one-way legacy broadcast and viral two-way participatory networks."
    },
    {
        "id": "ws_ch1_1_w10",
        "lesson": "1-1", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "If a quantum computer with 50 qubits can outperform the world's most powerful classical supercomputer on a specific task, what is this computational milestone called, and why does this not mean quantum computers will replace smartphones?",
        "question_ar": "إذا استطاع حاسوب كمومي مزود بـ 50 كيوبت التفوق على أقوى حاسوب كلاسيكي خارق في العالم في مهمة حسابية محددة، فماذا يُسمى هذا الإنجاز العلمي؟ ولماذا لا يعني ذلك أن الحواسيب الكمومية ستستبدل الهواتف الذكية في حياتنا اليومية؟",
        "ideal_answer_ar": "1. اسم الإنجاز العلمي: يُعرف بـ «التفوق الكمومي» أو «السيادة الكمومية» (Quantum Supremacy).\n\n2. لماذا لن تستبدل الهواتف الذكية والحواسيب الشخصية:\n   - متطلبات التشغيل الفيزيائية القاسية: تتطلب الحواسيب الكمومية تبريداً فائقاً يقترب من الصفر المطلق (-273.15 درجة مئوية) وعزلًا كهرومغناطيسياً تاماً لمنع فقدان التماسك الكمومي (Decoherence)، وهو ما يستحيل وضعه في جهاز جيبي محمول.\n   - طبيعة المهام الحسابية: الحواسيب الكمومية مصممة لمعادلات الاحتمالات الفلكية المعقدة (كالتشفير ونمذجة الجزيئات الكيميائية)، بينما لا تقدم أي ميزة إضافية للمهام اليومية العادية مثل تصفح الويب، معالجة النصوص، أو تشغيل مقاطع الفيديو.",
        "ideal_answer_en": "1. Scientific Milestone: Quantum Supremacy (Quantum Advantage).\n2. Why it won't replace phones: Quantum processors require extreme cryogenic cooling near absolute zero (-273°C) and electromagnetic shielding to prevent decoherence. Furthermore, quantum computing excels at astronomical combinatorial math (chemistry, cryptography), offering no performance advantage for casual smartphone tasks like streaming or text editing.",
        "explanation_ar": "مفهوم التفوق الكمومي والتعليل العلمي لعدم صلاحية الحوسبة الكمومية كبديل للأجهزة الاستهلاكية.",
        "explanation_en": "Quantum supremacy definition and physical/functional reasons why it won't replace mobile devices."
    }
]

questions.extend(mcq_1_1)
questions.extend(written_1_1)

# ==============================================================================
# LESSON 1-2 (10 MCQ + 10 WRITTEN)
# ==============================================================================

mcq_1_2 = [
    {
        "id": "deep_1_2_q1",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Which of the following diagrams accurately describes the hierarchical inclusion relationship among the core AI domains according to the curriculum?",
        "question_ar": "أي من المخططات التالية يصف بدقة العلاقة الهرمية والاشتمال بين مجالات الذكاء الاصطناعي وفق المنهج الدراسي؟",
        "option_a_en": "AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI", "option_a_ar": "الذكاء الاصطناعي ⊃ تعلم الآلة ⊃ التعلم العميق ⊃ الذكاء الاصطناعي التوليدي",
        "option_b_en": "Generative AI ⊃ Deep Learning ⊃ Machine Learning ⊃ AI", "option_b_ar": "الذكاء الاصطناعي التوليدي ⊃ التعلم العميق ⊃ تعلم الآلة ⊃ الذكاء الاصطناعي",
        "option_c_en": "Machine Learning ⊃ AI ⊃ Deep Learning ⊃ Generative AI", "option_c_ar": "تعلم الآلة ⊃ الذكاء الاصطناعي ⊃ التعلم العميق ⊃ الذكاء الاصطناعي التوليدي",
        "option_d_en": "Deep Learning ⊃ Generative AI ⊃ Machine Learning ⊃ AI", "option_d_ar": "التعلم العميق ⊃ الذكاء الاصطناعي التوليدي ⊃ تعلم الآلة ⊃ الذكاء الاصطناعي",
        "correct_option": "A",
        "explanation_en": "AI is the broad umbrella. Machine Learning is a subset of AI. Deep Learning is a specialized subset of ML using deep neural nets. Generative AI is a subset of Deep Learning.",
        "explanation_ar": "الذكاء الاصطناعي (AI) هو المظلة الشاملة، وتعلم الآلة (ML) فرع منه، والتعلم العميق (DL) فرع متخصص من تعلم الآلة، والذكاء التوليدي (GenAI) فرع مبني على التعلم العميق."
    },
    {
        "id": "deep_1_2_q2",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A programmer attempts to create a spam filter by manually writing thousands of IF-ELSE rules. As spammers alter wording, the system fails. What fundamental limitation does this highlight?",
        "question_ar": "حاول مبرمج بناء مرشح للرسائل المزعجة عبر كتابة آلاف القواعد الشرطية (IF-ELSE) يدوياً. ومع تعديل المحتالين لصياغة الكلمات، فشل النظام. ما القصور الجوهري الذي يبرزه هذا الموقف؟",
        "option_a_en": "Limitations of explicit rule-based programming compared to pattern-learning ML", "option_a_ar": "قصور البرمجة التقليدية القائمة على القواعد الصريحة مقارنة بتعلم الآلة القائم على استنتاج الأنماط",
        "option_b_en": "Failure of the computer's CPU clock frequency", "option_b_ar": "فشل تردد ساعة وحدة المعالجة المركزية للحاسوب",
        "option_c_en": "Lack of edge computing sensors on the mail server", "option_c_ar": "غياب مستشعرات الحوسبة الطرفية على خادم البريد",
        "option_d_en": "The spam filter violates Moore's law", "option_d_ar": "مخالفة مرشح البريد لقانون مور",
        "correct_option": "A",
        "explanation_en": "Traditional rule-based programming requires human foresight for every variant. Machine learning solves this by learning dynamic patterns directly from data examples.",
        "explanation_ar": "البرمجة التقليدية تعتمد على كتابة قواعد جامدة مسبقاً، بينما تعلم الآلة يستخرج الأنماط ذاتياً من البيانات ويتكيف مع الحيل الجديدة دون إعادة كتابة الكود."
    },
    {
        "id": "deep_1_2_q3",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "In an artificial neural network processing handwritten digits, what is the primary computational function performed by the hidden layers?",
        "question_ar": "في شبكة عصبية اصطناعية مخصصة للتعرف على الأرقام المكتوبة بخط اليد، ما الوظيفة الحسابية الأساسية التي تؤديها الطبقات الخفية (Hidden Layers)؟",
        "option_a_en": "Displaying output directly to the user interface", "option_a_ar": "عرض المخرجات مباشرة على واجهة المستخدم",
        "option_b_en": "Extracting features and representations via weighted math connections", "option_b_ar": "استخراج السمات والأنماط المعقدة عبر روابط رياضية مرجحة بالأوزان (Weights)",
        "option_c_en": "Serving as battery power converters", "option_c_ar": "العمل كمحولات طاقة للبطارية",
        "option_d_en": "Storing raw camera photos permanently on disk", "option_d_ar": "تخزين الصور الخام للكاميرا بشكل دائم على القرص الصلب",
        "correct_option": "B",
        "explanation_en": "Hidden layers perform progressive feature extraction: early layers detect edges/lines, while deeper layers combine them into shapes and digits using adjusted weights.",
        "explanation_ar": "الطبقات الخفية تقوم بالمعالجة الحسابية العميقة واستخراج السمات التجريدية (حواف، خطوط، منحنيات) عبر تعديل الأوزان (Weights) للوصول للقرار النهائي."
    },
    {
        "id": "deep_1_2_q4",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A student asks a Generative AI tool to summarize a historical battle. The AI generates a fluent, highly confident response that cites fake treaties and invented commanders. What is this phenomenon called?",
        "question_ar": "سأل طالب أداة ذكاء اصطناعي توليدي عن تفاصيل معركة تاريخية، فأجاب النظام بأسلوب لغوي بليغ ومقنع جداً لكنه اختلق معاهدات وقادة وهميين لا وجود لهم في الواقع. ما اسم هذه الظاهرة؟",
        "option_a_en": "Overfitting", "option_a_ar": "الإفراط في المطابقة",
        "option_b_en": "AI Hallucination", "option_b_ar": "الهلوسة في الذكاء الاصطناعي (Hallucination)",
        "option_c_en": "Quantum Decoherence", "option_c_ar": "فقدان التماسك الكمومي",
        "option_d_en": "Edge Computing Latency", "option_d_ar": "زمن التأخير الطرفي",
        "correct_option": "B",
        "explanation_en": "Hallucination is when generative AI models produce plausible-sounding but factually incorrect or entirely fabricated information with high confidence.",
        "explanation_ar": "الهلوسة (Hallucination) هي ظاهرة قيام الذكاء الاصطناعي التوليدي بإنتاج معلومات تبدو منطقية ومصاغة بثقة عالية، لكنها في الواقع مغلوطة ومختلقة تماماً."
    },
    {
        "id": "deep_1_2_q5",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Why does training a deep learning model for computer vision typically require massive datasets with millions of examples, whereas simple machine learning algorithms require much less?",
        "question_ar": "لماذا يتطلب تدريب نموذج تعلم عميق في رؤية الحاسوب مجموعات بيانات ضخمة بملايين الأمثلة، بينما تتطلب خوارزميات تعلم الآلة البسيطة بيانات أقل بكثير؟",
        "option_a_en": "Because deep neural networks have millions of internal parameters (weights) that need tuning to prevent error", "option_a_ar": "لأن الشبكات العصبية العميقة تمتلك ملايين المعاملات الداخلية (الأوزان) التي تحتاج للضبط بدقة",
        "option_b_en": "Because deep learning only operates on slow hard drives", "option_b_ar": "لأن التعلم العميق يعمل فقط على أقراص صلبة بطيئة",
        "option_c_en": "Because simple machine learning always produces perfect 100% accuracy", "option_c_ar": "لأن تعلم الآلة البسيط يحقق دائماً دقة 100% تلقائياً",
        "option_d_en": "Because deep learning does not use any mathematical equations", "option_d_ar": "لأن التعلم العميق لا يستخدم أي معادلات رياضية",
        "correct_option": "A",
        "explanation_en": "Deep learning models have high complexity with multi-layered architectures and millions of adjustable weights, demanding massive data to converge accurately.",
        "explanation_ar": "الشبكات العصبية العميقة تحتوي على طبقات متعددة وملايين الأوزان والمعاملات القابلة للضبط، مما يستلزم بيانات ضخمة جداً لتتعلم تمثيل الأنماط المعقدة بدقة."
    },
    {
        "id": "deep_1_2_q6",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "What fundamental characteristic distinguishes Generative AI from standard Predictive AI?",
        "question_ar": "ما الخاصية الجوهرية التي تُميز الذكاء الاصطناعي التوليدي (Generative AI) عن الذكاء الاصطناعي التنبؤي التقليدي؟",
        "option_a_en": "Generative AI produces novel content (text, code, images), while predictive AI forecasts outcomes or classifications from existing patterns", "option_a_ar": "التوليدي ينشئ محتوى جديداً أصلياً (نصوص، صور، كود)، بينما التنبؤي يصنف أو يتوقع مخرجات استناداً لأنماط سابقة",
        "option_b_en": "Predictive AI runs without electricity, while generative AI requires solar energy", "option_b_ar": "التنبؤي يعمل بدون كهرباء بينما التوليدي يحتاج طاقة شمسية",
        "option_c_en": "Generative AI never makes mistakes or fabricates data", "option_c_ar": "الذكاء التوليدي لا يرتكب أي أخطاء أو يختلق بيانات أبداً",
        "option_d_en": "Predictive AI only works in video games", "option_d_ar": "الذكاء التنبؤي يعمل فقط في ألعاب الفيديو",
        "correct_option": "A",
        "explanation_en": "Generative AI creates brand new artifacts (essays, images, music, code), whereas predictive AI evaluates existing inputs to assign categories or calculate numeric probabilities.",
        "explanation_ar": "الذكاء التوليدي يتميز بقدرته على ابتكار وتوليد بيانات ومحتوى جديد كلياً، في حين يركز التنبؤي على تصنيف البيانات الموجودة أو التنبؤ بقيم مستقبلية."
    },
    {
        "id": "deep_1_2_q7",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "In a biological metaphor, the nodes in an artificial neural network correspond to neurons. What component in the artificial model corresponds to the synaptic strength connecting two neurons?",
        "question_ar": "في التشبيه البيولوجي، تمثل العقد في الشبكة العصبية الاصطناعية الخلايا العصبية. ما العنصر في النموذج الاصطناعي الذي يناظر قوة نقطة الاشتباك العصبي (Synapse) التي تربط خليتين؟",
        "option_a_en": "The Weight (الوزن)", "option_a_ar": "الوزن (Weight)",
        "option_b_en": "The Screen Brightness", "option_b_ar": "سطوع الشاشة",
        "option_c_en": "The Hard Drive Capacity", "option_c_ar": "سعة القرص الصلب",
        "option_d_en": "The Qubit Superposition", "option_d_ar": "تراكب الكيوبت",
        "correct_option": "A",
        "explanation_en": "In neural networks, weights determine the strength and influence of connections between nodes, corresponding directly to synaptic connections in biological brains.",
        "explanation_ar": "الوزن (Weight) في الشبكة العصبية يحدد مدى تأثير إشارة عقدة معينة على العقدة اللاحقة، وهو ما يناظر كفاءة وقوة المشبك العصبي (Synapse) حيوياً."
    },
    {
        "id": "deep_1_2_q8",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Why are deep learning models often referred to as 'Black Boxes'?",
        "question_ar": "لماذا يُطلق على نماذج التعلم العميق في كثير من الأحيان وصف «الصناديق السوداء» (Black Boxes)؟",
        "option_a_en": "Because they are always housed in black-colored server racks", "option_a_ar": "لأنها توضع دائماً في خزائن خوادم سوداء اللون",
        "option_b_en": "Because their internal multi-layered mathematical interactions are too complex for humans to explain step-by-step", "option_b_ar": "لأن العمليات الرياضية المعقدة عبر ملايين الأوزان في طبقاتها يصعب على البشر تتبعها وتفسير سبب كل قرار بدقة",
        "option_c_en": "Because they can only operate in dark rooms without lighting", "option_c_ar": "لأنها لا تعمل إلا في غرف مظلمة بدون إضاءة",
        "option_d_en": "Because they were invented by airplane flight-recorder engineers", "option_d_ar": "لأنها ابتُكرت بواسطة مهندسي الصندوق الأسود للطائرات",
        "correct_option": "B",
        "explanation_en": "The 'Black Box' problem refers to the lack of explainability: while inputs and outputs are visible, the tangled web of millions of weights inside hidden layers obscures the exact decision logic.",
        "explanation_ar": "وصف 'الصندوق الأسود' يشير إلى صعوبة التفسير (Lack of Explainability)؛ فنحن نرى المدخلات والمخرجات، لكن تفاعل ملايين الأوزان عبر الطبقات الخفية معقد للغاية لدرجة يصعب معها تبرير القرار بشرياً."
    },
    {
        "id": "deep_1_2_q9",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "In a neural network trained to classify chest X-rays as either 'Healthy' or 'Pneumonia', which layer produces the final probability scores for these two categories?",
        "question_ar": "في شبكة عصبية مدربة على تصنيف صور الأشعة السينية للصدر إلى 'سليم' أو 'التهاب رئوي'، أي طبقة هي المسؤولة عن إنتاج درجات الاحتمالية النهائية لهاتين الفئتين؟",
        "option_a_en": "Input Layer", "option_a_ar": "طبقة الإدخال (Input Layer)",
        "option_b_en": "First Hidden Layer", "option_b_ar": "الطبقة الخفية الأولى",
        "option_c_en": "Output Layer", "option_c_ar": "طبقة الإخراج (Output Layer)",
        "option_d_en": "Cache Layer", "option_d_ar": "طبقة الذاكرة المخبأة",
        "correct_option": "C",
        "explanation_en": "The Output Layer delivers the final classification decisions and probabilities (e.g., Pneumonia: 94%, Healthy: 6%).",
        "explanation_ar": "طبقة الإخراج (Output Layer) تحتوي على عقد تمثل الفئات المستهدفة، وهي التي تقدم النتيجة النهائية ونسب الاحتمال للمستخدم."
    },
    {
        "id": "deep_1_2_q10",
        "lesson": "1-2", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "What happens during the training phase of a Machine Learning algorithm when it makes an incorrect prediction on a training example?",
        "question_ar": "ماذا يحدث أثناء مرحلة تدريب خوارزمية تعلم الآلة عندما تصدر تنبؤاً خاطئاً لعينة من بيانات التدريب؟",
        "option_a_en": "The computer reboots immediately", "option_a_ar": "يعيد الحاسوب تشغيل نفسه فوراً",
        "option_b_en": "The error is calculated and internal weights are adjusted to minimize error in future attempts", "option_b_ar": "يُحسب مقدار الخطأ وتُعدل الأوزان الداخلية للنموذج لتقليل هذا الخطأ في المحاولات التالية",
        "option_c_en": "The dataset is deleted permanently", "option_c_ar": "تُحذف مجموعة البيانات بالكامل",
        "option_d_en": "The algorithm converts into a manual rule-based script", "option_d_ar": "تتحول الخوارزمية إلى كود تقليدي قائم على القواعد",
        "correct_option": "B",
        "explanation_en": "During learning, error feedback is used to adjust weights iteratively so that predictions become progressively closer to actual ground-truth labels.",
        "explanation_ar": "خلال التدريب، يُقاس الفارق بين تنبؤ النموذج والنتيجة الحقيقية (Error)، وتُعدل الأوزان الرياضية تدريجياً لتقليل الخطأ وتحسين دقة التنبؤات المستقبلية."
    }
]

# WRITTEN for 1-2 (10 deep questions)
written_1_2 = [
    {
        "id": "ws_ch1_2_w1",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Conduct a comprehensive comparison between Traditional Rule-Based Programming and Machine Learning across: inputs provided to the system, how decisions are generated, and system adaptability to unforeseen patterns.",
        "question_ar": "أجرِ مقارنة شاملة بين البرمجة التقليدية القائمة على القواعد (Rule-Based) وتعلم الآلة (Machine Learning) من حيث: طبيعة المدخلات المقدمة للنظام، كيفية التوصل للحل، ومدى مرونة النظام للتكيف مع الحالات غير المتوقعة.",
        "ideal_answer_ar": "المقارنة الشاملة:\n1. طبيعة المدخلات:\n   - البرمجة التقليدية: تتلقى بيانات (Data) وقواعد برمجية صريحة ومفصلة يكتبها الإنسان كوداً (Rules/Code).\n   - تعلم الآلة: يتلقى بيانات (Data) وإجابات/أمثلة صحيحة (Labels/Answers) كمدخلات تدريبية.\n\n2. كيفية التوصل للحل:\n   - البرمجة التقليدية: ينفذ الحاسوب القواعد المبرمجة حرفياً ليُنتج الإجابة والمخرجات (Answers).\n   - تعلم الآلة: يستنبط الحاسوب ذاتياً القواعد والأنماط والعلاقات الإحصائية (Rules/Model) القادرة على حل المشكلة.\n\n3. المرونة والتكيف مع الحالات غير المتوقعة:\n   - البرمجة التقليدية: شديدة الجمود؛ إذا واجهت حالة لم يكتب المبرمج قاعدة لها صراحة، فإنها تفشل فوراً.\n   - تعلم الآلة: مرن وقابل للتكيف؛ حيث يستطيع تعميم الأنماط المكتسبة (Generalization) لاتخاذ قرارات دقيقة بشأن بيانات جديدة لم يرها من قبل.",
        "ideal_answer_en": "1. Inputs: Traditional programming takes Data + human-written Rules. ML takes Data + Example Outcomes (Labels).\n2. Problem Solving: Traditional computers follow fixed rules to output answers. ML computes the underlying Rules and Model from examples.\n3. Adaptability: Traditional is rigid (fails on unprogrammed edge cases). ML generalizes learned patterns to classify unseen dynamic data accurately.",
        "explanation_ar": "مقارنة ركائز البرمجة التقليدية وتعلم الآلة (بيانات + قواعد = إجابة مقابل بيانات + إجابات = نموذج وقواعد).",
        "explanation_en": "Classic comparison between data+rules=answers and data+answers=rules/model."
    },
    {
        "id": "ws_ch1_2_w2",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain the architectural components of an Artificial Neural Network (Input Layer, Hidden Layers, Output Layer), and detail the specific mathematical role of 'Weights' in learning.",
        "question_ar": "اشرح المكونات المعمارية للشبكة العصبية الاصطناعية (طبقة الإدخال، الطبقات الخفية، طبقة الإخراج)، ووضّح الدور الرياضي المحدد لـ «الأوزان» (Weights) في عملية التعلم.",
        "ideal_answer_ar": "1. طبقة الإدخال (Input Layer):\n   - تستقبل البيانات الخام من العالم الخارجي (مثل قيم بكسلات الصورة أو قراءات المستشعرات أو الكلمات) وتمررها إلى الشبكة دون إجراء معالجة حسابية.\n\n2. الطبقات الخفية (Hidden Layers):\n   - تتكون من طبقة أو طبقات متعددة من العقد العصبية؛ وهي قلب المعالجة حيث تقوم باستخراج السمات والأنماط المعقدة تدريجياً (مثل التعرف على الحواف ثم الأشكال ثم الوجوه الكاملة).\n\n3. طبقة الإخراج (Output Layer):\n   - تحتوي على عقد تمثل النتائج أو الفئات المستهدفة (مثل: قطة / كلب، أو سليم / مصاب)، وتُنتج القرار النهائي أو التوزيع الاحتمالي للحل.\n\n4. الدور الرياضي للأوزان (Weights):\n   - الأوزان هي معاملات عددية تحدد قوة وأهمية كل اتصال بين العقد.\n   - أثناء التدريب، يتم تعديل هذه الأوزان تدريجياً في كل دورة بناءً على مقدار الخطأ؛ فالاتصالات التي تساهم في الحل الصحيح تُقوّى، والتي تسبب خطأً تُضعف، مما يُمكّن الشبكة من 'التعلم'.",
        "ideal_answer_en": "1. Input Layer: Ingests raw data features (pixel values, sensor signals) passing them onward without modification.\n2. Hidden Layers: Perform hierarchical feature extraction (edges → contours → full objects) through multi-layered mathematical transformations.\n3. Output Layer: Generates the final decision or classification probability distribution.\n4. Role of Weights: Numeric coefficients representing the synaptic connection strength between nodes. Learning consists of tuning these weights iteratively to minimize error between predicted and target outputs.",
        "explanation_ar": "شرح طبقات الشبكة العصبية الثلاث ودور الأوزان في تمثيل المعرفة وضبطها بالتعلم.",
        "explanation_en": "Layer architecture of neural networks and the role of weights as trainable parameters."
    },
    {
        "id": "ws_ch1_2_w3",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Analyze the phenomenon of 'AI Hallucination' in Generative AI: what causes it technically, why is it particularly dangerous in medical or legal applications, and state two practices to mitigate its risks.",
        "question_ar": "حلل ظاهرة «هلوسة الذكاء الاصطناعي» (AI Hallucination) في نماذج الذكاء التوليدي: ما سببها التقني، ولماذا تُعد خطيرة تحديداً في التطبيقات الطبية والقانونية، واذكر ممارستين للحد من مخاطرها.",
        "ideal_answer_ar": "1. السبب التقني للهلوسة:\n   - نماذج الذكاء التوليدي (مثل نماذج اللغة الكبيرة) مبنية إحصائياً للتنبؤ بالكلمة أو العنصر الأكثر احتمالاً في السياق (Probabilistic completion)، ولا تمتلك وعياً بالحقائق الواقعية أو 'فهماً' حقيقياً للصواب والخطأ، لذا فقد تولد عبارات متسقة لغوياً لكنها مختلقة تماماً.\n\n2. خطورتها في المجالات الطبية والقانونية:\n   - في الطب: قد تقترح جرعات دوائية مميتة أو تختلق أعراضاً غير صحيحة بثقة شديدة، مما يُعرض حياة المرضى للخطر.\n   - في القانون: قد تختلق قضايا وسوابق قضائية وهمية تؤدي لتضليل العدالة وخسارة القضايا.\n   - يكمن الخطر في أن الإجابة تبدو مصاغة ببلاغة واحترافية يصعب على غير المتخصص اكتشاف زيفها.\n\n3. ممارستان للحد من مخاطرها:\n   - التحقق البشري المستمر (Human-in-the-Loop): عدم اعتماد أي قرار حيوي دون تدقيق ومصادقة من طبيب أو محامٍ متخصص.\n   - إقران النموذج بقواعد بيانات موثوقة ومصادر مرجعية صريحة والتحقق من الحقائق (Fact-Checking / Grounding).",
        "ideal_answer_en": "1. Technical Cause: Generative AI uses probabilistic token prediction rather than factual cognition. It generates the next most statistically likely words without actual comprehension of reality.\n2. Danger in Medicine & Law: Flawless tone masks invented medical dosages (risking patient lives) or fabricated judicial citations (misleading legal proceedings).\n3. Mitigation Practices:\n   - Mandatory human-in-the-loop review by qualified professionals before action.\n   - Grounding models against verified external knowledge bases and requiring factual citation.",
        "explanation_ar": "تحليل أسباب الهلوسة التقنية ومخاطرها في التطبيقات الحساسة وإجراءات السلامة.",
        "explanation_en": "Technical breakdown of hallucination, critical consequences, and mitigation workflows."
    },
    {
        "id": "ws_ch1_2_w4",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain why Deep Learning outperforms classical Machine Learning when analyzing unstructured data such as high-resolution medical MRI scans and natural speech audio.",
        "question_ar": "علل: لماذا يتفوق التعلم العميق (Deep Learning) بمراحل على تعلم الآلة الكلاسيكي (Classical ML) عند معالجة البيانات غير المهيكلة مثل صور الرنين المغناطيسي (MRI) عالية الدقة والتسجيلات الصوتية؟",
        "ideal_answer_ar": "يتفوق التعلم العميق للأسباب التالية:\n1. استخراج السمات التلقائي (Automatic Feature Extraction):\n   - في تعلم الآلة الكلاسيكي، يحتاج النظام إلى خبير بشري يستخرج السمات والخصائص يدوياً (Feature Engineering) ويحولها لأرقام، وهو أمر شبه مستحيل مع الصور المعقدة والأصوات.\n   - في التعلم العميق، تقوم الطبقات المتعددة باكتشاف واستخراج السمات الهندسية الدقيقة وتدرجات الأنسجة ذاتياً من البيانات الخام دون تدخل بشري.\n\n2. القدرة على استيعاب التعقيد والبيانات الضخمة:\n   - تعلم الآلة الكلاسيكي يصل إلى سقف محدود من الدقة مهما زدنا حجم البيانات (Plateau).\n   - بينما يستمر التعلم العميق في تحسين دقته بصورة تصاعدية مع تدفق ملايين الصور والأصوات، مما يجعله قادراً على اكتشاف أدق التشوهات النسيجية التي قد تفوت العين البشرية.",
        "ideal_answer_en": "1. Automatic Feature Extraction: Classical ML requires laborious manual feature engineering by human domain experts. Deep learning extracts subtle hierarchical features (textures, tissue edges) directly from raw pixels automatically.\n2. Scalability with Massive Data: Classical ML performance plateaus rapidly, while deep neural networks continue improving in accuracy as data volume grows, revealing micro-patterns invisible to human radiologists.",
        "explanation_ar": "الفرق الجوهري بين استخراج الخصائص اليدوي والآلي، واستفادة التعلم العميق من البيانات الضخمة.",
        "explanation_en": "Automated hierarchical feature extraction vs manual engineering and scalability."
    },
    {
        "id": "ws_ch1_2_w5",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "A company wants to build an automated customer email routing assistant. Contrast how they would build this using Traditional Programming vs Machine Learning, and explain why the ML approach is superior.",
        "question_ar": "ترغب شركة في بناء مساعد آلي لتوجيه رسائل البريد الإلكتروني الواردة من العملاء إلى الأقسام المختصة (مبيعات، دعم فني، شكاوى). قارن بين بناء هذا النظام بالبرمجة التقليدية مقابل تعلم الآلة، ووضح سبب تفوق تعلم الآلة.",
        "ideal_answer_ar": "1. طريقة البرمجة التقليدية (Traditional Programming):\n   - يقوم المبرمج بكتابة شروط برمجية وقوائم كلمات مفتاحية يدوياً: إذا وردت كلمة 'فاتورة' أو 'دفع' حوّلها للمحاسبة، وإذا وردت 'عطل' حوّلها للدعم الفني.\n   - العيب: إذا كتب العميل 'لا أستطيع الدخول لحسابي وسرقت أموالي'، قد يضل النظام بسبب تشابك الكلمات، وسيتطلب الأمر تحديثاً مستمراً لآلاف الكلمات.\n\n2. طريقة تعلم الآلة (Machine Learning):\n   - تُجمع آلاف الرسائل السابقة المصنفة مع جهات توجيهها الصحيحة ويُدرب نموذج عليها (Supervised Learning).\n   - يتعلم النموذج سياق الجمل ودلالات الألفاظ تلقائياً من الأنماط.\n\n3. سبب تفوق تعلم الآلة:\n   - القدرة على فهم السياق والأخطاء الإملائية والتعابير العامية المتنوعة دون الحاجة لكتابة قاعدة لكل تعبير.\n   - التحسن الذاتي المستمر كلما استقبل رسائل جديدة، مما يوفر آلاف ساعات البرمجة اليدوية.",
        "ideal_answer_en": "1. Traditional Programming: Hardcoded IF-statements matching keywords ('invoice' → Finance; 'broken' → Support). Fails on typos, idioms, and overlapping context.\n2. Machine Learning: Trains a text classifier on thousands of historic routed tickets to extract semantic context automatically.\n3. Superiority of ML: Accurately parses informal slang, nuanced context, and spelling errors, adapting dynamically to evolving customer language without continuous manual code rewrites.",
        "explanation_ar": "سيناريو تطبيقي يقارن بين قيود مطابقة الكلمات المفتاحية بالبرمجة التقليدية وفهم السياق بتعلم الآلة.",
        "explanation_en": "Real-world text routing scenario contrasting keyword parsing with semantic ML classification."
    },
    {
        "id": "ws_ch1_2_w6",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Clarify the distinction between Machine Learning, Deep Learning, and Generative AI, providing one specific technological example for each.",
        "question_ar": "وضّح الفرق بين تعلم الآلة (Machine Learning)، والتعلم العميق (Deep Learning)، والذكاء الاصطناعي التوليدي (Generative AI)، مع ذكر مثال تقني محدد لكل منها.",
        "ideal_answer_ar": "1. تعلم الآلة (Machine Learning):\n   - المفهوم: خوارزميات إحصائية تتعلم الأنماط من البيانات للتنبؤ أو التصنيف دون برمجة صريحة لكل قاعدة.\n   - مثال: مرشح الرسائل المزعجة (Spam Filter) في البريد الإلكتروني، أو خوارزمية تسجيل النقاط الائتمانية.\n\n2. التعلم العميق (Deep Learning):\n   - المفهوم: فرع متقدم من تعلم الآلة يستخدم شبكات عصبية اصطناعية متعددة الطبقات (Deep Neural Networks) لمعالجة البيانات غير المهيكلة المعقدة.\n   - مثال: نظام التعرف على الوجوه أو تحليل الأشعة المقطعية للكشف عن الأورام.\n\n3. الذكاء الاصطناعي التوليدي (Generative AI):\n   - المفهوم: فرع مبني على التعلم العميق متخصص في توليد وإنشاء محتوى جديد كلياً (نصوص، صور، برمجيات، صوت) يحاكي الإبداع البشري.\n   - مثال: نماذج الدردشة التوليدية مثل ChatGPT، أو نماذج توليد الصور مثل Midjourney أو DALL-E.",
        "ideal_answer_en": "1. Machine Learning: Statistical algorithms learning patterns to make predictions without hardcoded rules (Example: Email spam classifier).\n2. Deep Learning: Advanced subset of ML using deep multi-layered neural networks for complex unstructured data (Example: Facial recognition and MRI diagnostic vision).\n3. Generative AI: Deep learning models specialized in synthesizing novel human-like content (Example: ChatGPT for writing text or DALL-E for creating synthetic images).",
        "explanation_ar": "توضيح التدرج الهرمي بين الفروع الثلاثة مع أمثلة تقنية دقيقة لكل فرع.",
        "explanation_en": "Hierarchical distinction between ML, DL, and GenAI with concrete real-world tech examples."
    },
    {
        "id": "ws_ch1_2_w7",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain why the 'Black Box' nature of deep learning neural networks poses a severe dilemma when deploying AI for criminal sentencing and banking loan approvals.",
        "question_ar": "اشرح لماذا يمثل طابع «الصندوق الأسود» (Black Box) للشبكات العصبية العميقة معضلة أخلاقية وقانونية خطيرة عند استخدام الذكاء الاصطناعي في إصدار الأحكام القضائية أو الموافقة على القروض البنكية.",
        "ideal_answer_ar": "المعضلة الأخلاقية والقانونية للصندوق الأسود:\n1. غياب الشفافية والمساءلة (Lack of Accountability):\n   - في القضاء والبنوك، يمتلك المواطن حقاً دستورياً وأخلاقياً في معرفة 'لماذا' حُكم عليه أو 'لماذا' رُفض طلبه للحصول على قرض.\n   - إذا كان النظام صندوقاً أسود، لا يستطيع القاضي أو موظف البنك تقديم مبرر قانوني مفهوم للمواطن، مما يقوض مبدأ العدالة والمحاكمة العادلة.\n\n2. صعوبة اكتشاف التحيز والتمييز الخفي:\n   - إذا اتخذت الشبكة العصبية قراراً متحيزاً ضد فئة معينة بناءً على خلفيات اجتماعية أو جغرافية مشفرة في الأوزان، يستحيل على المراجعين اكتشاف هذا التحيز وإثباته بسبب تشابك ملايين المعاملات الحسابية.\n3. النتيجة: المطالبة بتطبيق تقنيات 'الذكاء الاصطناعي القابل للتفسير' (Explainable AI - XAI) لضمان إمكانية شرح مسوغات كل قرار.",
        "ideal_answer_en": "1. Loss of Transparency & Due Process: Citizens have a legal right to know why a loan was denied or a sentence rendered. A black-box algorithm prevents judges and loan officers from articulating logical justifications.\n2. Hidden Algorithmic Bias: Entrenched societal bias embedded across millions of hidden layer weights remains undetectable and untestable without explainability.\n3. Imperative: Critical public institutions require Explainable AI (XAI) frameworks rather than unexplainable black boxes.",
        "explanation_ar": "أزمة الصندوق الأسود في العدالة الاجتماعية والقضاء والمصارف، والحاجة للذكاء الاصطناعي القابل للتفسير.",
        "explanation_en": "The Black Box dilemma in judicial and financial decisions, civil rights, and explainable AI."
    },
    {
        "id": "ws_ch1_2_w8",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Describe the workflow through which an artificial neural network processes a digital photograph of a handwritten number '7' from the input pixels to the final classification label.",
        "question_ar": "صف مسار العمل الذي تتبعه شبكة عصبية اصطناعية لمعالجة صورة رقمية للرقم '7' المكتوب بخط اليد بدءاً من بكسلات الإدخال وحتى تصنيفه النهائي.",
        "ideal_answer_ar": "مسار المعالجة خطوة بخطوة:\n1. طبقة الإدخال (Input Layer):\n   - تُقسّم الصورة (مثلاً 28×28 بكسل) إلى 784 قيمة عددية تمثل درجة سطوع كل بكسل، وتُرسل هذه القيم كإشارات أولية للعقد.\n2. الطبقات الخفية الأولى (Early Hidden Layers):\n   - تُعالج الإشارات بضربها في الأوزان؛ وتكتشف هذه الطبقات السمات البسيطة الأولية كالحواف الأفقية والمائلة والخطوط المستقيمة.\n3. الطبقات الخفية العميقة (Deeper Hidden Layers):\n   - تدمج الحواف البسيطة لتكوين أشكال أكثر تعقيداً: زاوية حادة في الأعلى متصلة بخط مائل للأسفل (هيكل الرقم 7).\n4. طبقة الإخراج (Output Layer):\n   - تتكون من 10 عقد تمثل الأرقام من (0 إلى 9)؛ تُحسب درجة الاحتمالية لكل عقدة، فتعطي العقدة '7' أعلى نسبة (مثلاً 97%) بينما تحصل باقي الأرقام على نسب ضئيلة، وتُعلن الشبكة أن الرقم هو 7.",
        "ideal_answer_en": "1. Input Layer: Ingests 784 pixel grayscale values as numeric inputs.\n2. Early Hidden Layers: Combine pixel inputs via weighted sums to detect basic edge gradients and horizontal/slanted lines.\n3. Deep Hidden Layers: Synthesize basic lines into higher-level structural geometry (a top horizontal bar joined to a downward stroke).\n4. Output Layer: 10 output nodes calculate probability scores; node '7' scores the highest probability (e.g. 98%), establishing the final classification.",
        "explanation_ar": "تتبع تدفق البيانات في الشبكة العصبية من بكسلات المدخلات إلى استخراج السمات وإخراج القرار.",
        "explanation_en": "End-to-end data flow tracing feature extraction through input, hidden, and output nodes."
    },
    {
        "id": "ws_ch1_2_w9",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "State two critical risks of relying on Generative AI to generate source code for aircraft flight control systems, and specify how software engineering teams should address them.",
        "question_ar": "حدّد خطرين جسيمين للاعتماد على الذكاء الاصطناعي التوليدي لكتابة الشيفرة البرمجية (الكود) لأنظمة الملاحة والتحكم في الطائرات، وبيّن كيف يجب على فرق هندسة البرمجيات التعامل مع ذلك.",
        "ideal_answer_ar": "1. الخطران الجسيمان:\n   - الثغرات الأمنية والمنطقية الخفية (Hidden Bugs & Edge Cases): قد يُنتج الذكاء التوليدي كوداً يبدو سليماً للوهلة الأولى لكنه يفتقر لمعالجة الحالات الاستثنائية الحرجة (Edge Cases)، كتعطل مستشعر أو تغير مفاجئ في الضغط الجوي، مما يؤدي لانهيار النظام في الجو.\n   - ظاهرة الهلوسة البرمجية: قد يستدعي النموذج دوالاً ومكتبات وهمية أو يكتب منطقاً غير خاضع لمعايير الأمان المعتمدة للطيران المدني.\n\n2. كيفية التعامل مع ذلك برمجياً:\n   - الحظر التام للاعتماد الذاتي: لا يُسمح بإدراج أي سطر برمجي مولد دون مراجعة واختبار بشري دقيق من مهندسي سلامة برمجيات الطيران.\n   - إخضاع الكود لاختبارات المحاكاة الصارمة (Rigorous Unit Testing & Formal Verification) والامتثال لمعايير الطيران الدولية الصارمة (مثل معيار DO-178C).",
        "ideal_answer_en": "1. Two Critical Risks: Undetected edge-case software crashes under rare atmospheric pressures and code hallucination (calling non-existent APIs or insecure memory buffers).\n2. Engineering Countermeasures: Mandatory formal verification and human peer-review by licensed avionics engineers, accompanied by exhaustive automated testing under strict aviation standards (e.g., DO-178C).",
        "explanation_ar": "مخاطر الذكاء التوليدي في البرمجيات الحساسة للحياة وأهمية الاختبار البشري والمعايير القياسية.",
        "explanation_en": "Critical software risks of generated code in mission-critical avionics."
    },
    {
        "id": "ws_ch1_2_w10",
        "lesson": "1-2", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain why machine learning models require a separation between 'Training Data' and 'Testing Data', and explain what happens if a model is evaluated only on the data it was trained on.",
        "question_ar": "اشرح لماذا تشترط منهجية تعلم الآلة الفصل الصارم بين «بيانات التدريب» (Training Data) و«بيانات الاختبار» (Testing Data)، وماذا يحدث إذا قمنا بتقييم دقة النموذج على نفس البيانات التي تدرب عليها فقط؟",
        "ideal_answer_ar": "1. سبب الفصل الصارم بين المجموعتين:\n   - الهدف الحقيقي من تعلم الآلة ليس حفظ البيانات السابقة، بل القدرة على 'التعميم' (Generalization) والتنبؤ بدقة على بيانات جديدة لم يرها من قبل في العالم الحقيقي.\n   - لذا تُستخدم بيانات التدريب لضبط أوزان النموذج، بينما تُحجب بيانات الاختبار تماماً لتكون مقياساً نزيهاً ومحايداً لاختبار قدرة النموذج على التعامل مع مواقف جديدة.\n\n2. ماذا يحدث إذا قُيم النموذج على بيانات التدريب فقط:\n   - يقع النموذج في فخ «الإفراط في المطابقة» أو الحفظ الأعمى (Overfitting).\n   - قد يحقق النموذج نسبة دقة وهمية 100% على بياناته لأنه حفظ الإجابات عن ظهر قلب، لكنه سيفشل بشكل ذريع عند تطبيقه في الواقع العملي على بيانات حقيقية جديدة.",
        "ideal_answer_en": "1. Reason for Split: ML aims for generalization on unseen real-world data, not rote memorization. Training data fits weights; testing data independently assesses real generalization performance.\n2. Risk of Evaluating Only on Training Data: Causes severe Overfitting. The model achieves a deceptive 100% accuracy by memorizing sample noise, but collapses when faced with novel real-world inputs.",
        "explanation_ar": "أهمية تقسيم البيانات إلى تدريب واختبار لتفادي الإفراط في التخصيص وضمان التعميم.",
        "explanation_en": "Training vs Testing split, avoiding overfitting, and ensuring generalizability."
    }
]

questions.extend(mcq_1_2)
questions.extend(written_1_2)

# ==============================================================================
# LESSON 1-3 (10 MCQ + 10 WRITTEN)
# ==============================================================================

mcq_1_3 = [
    {
        "id": "deep_1_3_q1",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A streaming entertainment platform analyzes a user's viewing history, pauses, and genre preferences to recommend a new series. Which type of AI system is operating here?",
        "question_ar": "منصة ترفيهية رقمية تحلل تاريخ مشاهدات المستخدم، ونقاط التوقف، وتفضيلاته لتوصيته بمسلسل جديد. أي نوع من أنظمة الذكاء الاصطناعي يعمل هنا؟",
        "option_a_en": "Autonomous driving autopilot", "option_a_ar": "الطيار الآلي للقيادة الذاتية",
        "option_b_en": "Recommendation Engine", "option_b_ar": "نظام التوصية (Recommendation Engine)",
        "option_c_en": "Quantum decryptor", "option_c_ar": "مفكك التشفير الكمومي",
        "option_d_en": "Hardware virtualization", "option_d_ar": "المحاكاة الافتراضية للعتاد",
        "correct_option": "B",
        "explanation_en": "Recommendation engines utilize predictive machine learning algorithms to personalize content suggestions based on past behavior and peer affinities.",
        "explanation_ar": "أنظمة التوصية (Recommendation Engines) تعتمد على خوارزميات تعلم الآلة لتحليل سلوكيات المستخدم السابقة وتقديم اقتراحات مخصصة تناسب اهتماماته."
    },
    {
        "id": "deep_1_3_q2",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "An automated manufacturing factory attaches vibration and thermal IoT sensors to turbine motors. An AI model alerts engineers that a bearing will fail in 72 hours. What is this industrial application?",
        "question_ar": "مصنع أتمتة يثبت مستشعرات اهتزاز وحرارة (IoT) على محركات التوربينات. أطلق نموذج الذكاء الاصطناعي تنبيهاً بأن المحمل سيتعطل بعد 72 ساعة. ما هذا التطبيق الصناعي؟",
        "option_a_en": "Emergency manual repair", "option_a_ar": "الإصلاح اليدوي الطارئ",
        "option_b_en": "Predictive Maintenance", "option_b_ar": "الصيانة التنبؤية (Predictive Maintenance)",
        "option_c_en": "Generative copywriting", "option_c_ar": "الكتابة الإعلانية التوليدية",
        "option_d_en": "Quantum tunneling", "option_d_ar": "النفق الكمومي",
        "correct_option": "B",
        "explanation_en": "Predictive Maintenance uses IoT telemetry and machine learning to forecast equipment failures before breakdown occurs, slashing unexpected downtime.",
        "explanation_ar": "الصيانة التنبؤية (Predictive Maintenance) تعتمد على بيانات مستشعرات إنترنت الأشياء والتعلم الآلي للتنبؤ بالأعطال الميكانيكية قبل وقوعها وتفادي توقف الإنتاج."
    },
    {
        "id": "deep_1_3_q3",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A state-of-the-art chess AI defeats the world grandmaster with ease. However, when asked to recognize a photo of a kitten or translate a sentence, it fails completely. What does this demonstrate?",
        "question_ar": "نظام ذكاء اصطناعي رائد في الشطرنج هزم بطل العالم بسهولة، لكن عندما طُلب منه التعرف على صورة قطة أو ترجمة جملة بسيطة عجز تماماً. ما المفهوم الذي يثبته هذا الموقف؟",
        "option_a_en": "Artificial General Intelligence (AGI)", "option_a_ar": "الذكاء الاصطناعي العام (AGI)",
        "option_b_en": "Narrow / Weak AI (الذكاء الاصطناعي الضيق)", "option_b_ar": "الذكاء الاصطناعي الضيق / المتخصص (Narrow AI)",
        "option_c_en": "Moore's Law saturation", "option_c_ar": "تشبع قانون مور",
        "option_d_en": "Algorithmic Hallucination", "option_d_ar": "الهلوسة الخوارزمية",
        "correct_option": "B",
        "explanation_en": "Current AI is Narrow AI (ANI) — highly specialized to perform one specific task exceptionally well, but entirely unable to transfer capabilities to other domains.",
        "explanation_ar": "الذكاء الاصطناعي الحالي هو ذكاء اصطناعي ضيق (Narrow AI)؛ يبرع بشكل استثنائي في أداء مهمة محددة ومحصورة دُرب عليها، ولا يمتلك أي قدرة للتعميم في مجالات أخرى."
    },
    {
        "id": "deep_1_3_q4",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "An agricultural drone flies across farmlands, capturing multispectral imagery. An onboard AI model highlights specific crop sections suffering from fungal infection and directs pesticide sprayers only to infected spots. What practice is this?",
        "question_ar": "طائرة زراعية مسيرة تلتقط صوراً للحقول. يحدد نموذج الذكاء الاصطناعي أجزاء معينة مصابة بفطر، ويوجه الرشاشات لرش البقع المصابة فقط دون غيرها. ما هذه الممارسة؟",
        "option_a_en": "Precision Agriculture", "option_a_ar": "الزراعة الدقيقة (Precision Agriculture)",
        "option_b_en": "Traditional flood irrigation", "option_b_ar": "الري التقليدي بالغمر",
        "option_c_en": "Social Network Farming", "option_c_ar": "زراعة شبكات التواصل",
        "option_d_en": "Cashless Harvesting", "option_d_ar": "الحصاد غير النقدي",
        "correct_option": "A",
        "explanation_en": "Precision Agriculture uses AI vision and IoT to optimize inputs (water, fertilizer, pesticide) targeting specific distressed plants rather than blanketing entire fields.",
        "explanation_ar": "الزراعة الدقيقة (Precision Agriculture) توظف رؤية الحاسوب والذكاء الاصطناعي لمراقبة المحاصيل ورش المناطق المصابة بدقة، مما يرشد استخدام المبيدات والمياه."
    },
    {
        "id": "deep_1_3_q5",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A bank customer swipes their credit card in Cairo. Two minutes later, an attempted transaction of $5,000 occurs from an ATM in Tokyo. An AI security system immediately blocks the Tokyo card swipe. What application is this?",
        "question_ar": "عميل مصرفي استخدم بطاقته في القاهرة، وبعد دقيقتين تمت محاولة سحب 5000 دولار من صراف في طوكيو. حظر نظام الأمان بالذكاء الاصطناعي العملية فوراً. ما هذا التطبيق؟",
        "option_a_en": "Predictive Maintenance", "option_a_ar": "الصيانة التنبؤية",
        "option_b_en": "Fraud Detection", "option_b_ar": "اكتشاف الاحتيال المالي (Fraud Detection)",
        "option_c_en": "Deepfake synthesis", "option_c_ar": "توليد التزييف العميق",
        "option_d_en": "Virtual Reality banking", "option_d_ar": "الخدمات المصرفية بالواقع الافتراضي",
        "correct_option": "B",
        "explanation_en": "Fraud Detection models analyze real-time transaction velocities, geo-locations, and behavioral anomalies to freeze suspicious theft attempts instantly.",
        "explanation_ar": "أنظمة اكتشاف الاحتيال (Fraud Detection) ترصد المعاملات المالية اللحظية الشاذة جغرافياً وسلوكياً لمنع السرقات واختراق البطاقات فوراً."
    },
    {
        "id": "deep_1_3_q6",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A financial firm deploys algorithms that execute thousands of stock buy and sell orders in fractions of a second based on statistical models without human intervention. What is this called?",
        "question_ar": "تستخدم شركة مالية خوارزميات تنفذ آلاف أوامر بيع وشراء الأسهم في أجزاء من الثانية بناءً على نماذج إحصائية دون أي تدخل بشري. ماذا يُطلق على هذا التطبيق؟",
        "option_a_en": "Algorithmic Trading", "option_a_ar": "التداول الخوارزمي (Algorithmic Trading)",
        "option_b_en": "Manual brokerage", "option_b_ar": "الوساطة اليدوية",
        "option_c_en": "Social Network Commerce", "option_c_ar": "تجارة شبكات التواصل",
        "option_d_en": "Quantum ledger mining", "option_d_ar": "تعدين السجلات الكمومية",
        "correct_option": "A",
        "explanation_en": "Algorithmic Trading relies on automated AI mathematical execution to exploit microsecond market price discrepancies.",
        "explanation_ar": "التداول الخوارزمي (Algorithmic Trading) هو استخدام الذكاء الاصطناعي لتنفيذ صفقات مالية في البورصة بسرعات فائقة مستفيداً من فروق الأسعار اللحظية."
    },
    {
        "id": "deep_1_3_q7",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A radiologist uses AI software to pre-screen thousands of mammograms. The software highlights tiny microcalcifications that the human eye might miss during fatigue. Which AI domain enables this?",
        "question_ar": "يستخدم طبيب أشعة برنامج ذكاء اصطناعي لفحص آلاف صور الماموجرام مسبقاً، حيث يُظلل البرنامج تكلسات دقيقة جداً قد تفوتها العين البشرية عند الإجهاد. أي مجال ذكاء اصطناعي يُمكّن هذا التطبيق؟",
        "option_a_en": "Computer Vision & Medical Imaging", "option_a_ar": "رؤية الحاسوب والتصوير الطبي (Computer Vision)",
        "option_b_en": "Natural Language Translation", "option_b_ar": "الترجمة الآلية للغات الطبيعية",
        "option_c_en": "Generative Video Synthesis", "option_c_ar": "التوليد الاصطناعي للفيديو",
        "option_d_en": "Autonomous Tractor Navigation", "option_d_ar": "ملاحة الجرارات الزراعية المستقلة",
        "correct_option": "A",
        "explanation_en": "Computer vision powered by deep convolutional networks enables pixel-level diagnostic analysis in medical imaging.",
        "explanation_ar": "رؤية الحاسوب (Computer Vision) المعتمدة على التعلم العميق تُمكّن الحواسيب من تحليل وفهم الصور الطبية واكتشاف الأورام الدقيقة مبكراً."
    },
    {
        "id": "deep_1_3_q8",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Voice assistants like Siri and Alexa process user spoken audio, transcribe it to text, understand user intent, and deliver spoken answers. Which two AI fields are primarily combined?",
        "question_ar": "المساعدات الصوتية الذكية تستقبل حديث المستخدم الصوتي، وتحوله إلى نص، وتفهم قصده، ثم ترد صوتياً. أي حقلين رئيسيين من حقول الذكاء الاصطناعي يندمجان في هذا النظام؟",
        "option_a_en": "Speech Recognition & Natural Language Processing (NLP)", "option_a_ar": "التعرف على الكلام ومعالجة اللغة الطبيعية (Speech Recognition & NLP)",
        "option_b_en": "Quantum Computing & Edge Tunneling", "option_b_ar": "الحوسبة الكمومية والنفق الطرفي",
        "option_c_en": "Computer Vision & Autonomous Braking", "option_c_ar": "رؤية الحاسوب والكبح المستقل",
        "option_d_en": "Predictive Maintenance & Precision Agriculture", "option_d_ar": "الصيانة التنبؤية والزراعة الدقيقة",
        "correct_option": "A",
        "explanation_en": "Smart voice assistants rely on Automatic Speech Recognition (ASR) to turn audio into text and Natural Language Processing (NLP) to comprehend context and generate replies.",
        "explanation_ar": "تعتمد المساعدات الصوتية على تقنيات التعرف على الصوت (تحويل الصوت لنص) ومعالجة اللغة الطبيعية (NLP) لفهم المعنى وتوليد الإجابة المناسبة."
    },
    {
        "id": "deep_1_3_q9",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "An e-commerce giant uses an AI forecasting system to stock warehouses with winter jackets in Alexandria two weeks before temperatures drop, based on weather forecasts and historical purchases. What AI application is this?",
        "question_ar": "متجر إلكتروني عملاق يستخدم نظام تنبؤ بالذكاء الاصطناعي لتخزين معاطف الشتاء في مستودعاته بالإسكندرية قبل أسبوعين من انخفاض درجات الحرارة بناءً على توقعات الطقس والمشتريات السابقة. ما هذا التطبيق؟",
        "option_a_en": "Demand Forecasting & Supply Chain Optimization", "option_a_ar": "التنبؤ بالطلب وتحسين سلاسل التوريد (Demand Forecasting)",
        "option_b_en": "Deepfake Avatar Modeling", "option_b_ar": "نمذجة صور التزييف العميق",
        "option_c_en": "Biometric Facial Authentication", "option_c_ar": "المصادقة البيومترية للوجه",
        "option_d_en": "Quantum Cryptography", "option_d_ar": "التشفير الكمومي",
        "correct_option": "A",
        "explanation_en": "Demand forecasting models predict consumer purchasing patterns, helping retailers optimize logistics, warehouse inventory, and shipping schedules.",
        "explanation_ar": "التنبؤ بالطلب (Demand Forecasting) يساعد الشركات على التنبؤ باحتياجات السوق وإدارة المخزون بدقة لتفادي النقص أو تكدس البضائع."
    },
    {
        "id": "deep_1_3_q10",
        "lesson": "1-3", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "In modern logistics, AI algorithms optimize truck delivery routes in real time based on live traffic, accidents, and fuel consumption. What is this capability called?",
        "question_ar": "في قطاع النقل والخدمات اللوجستية الحديثة، تحسب خوارزميات الذكاء الاصطناعي مسارات شاحنات التوصيل لحظياً وفقاً لحركة المرور والحوادث واستهلاك الوقود. ماذا تُسمى هذه القدرة؟",
        "option_a_en": "Fleet Management & Route Optimization", "option_a_ar": "إدارة الأساطيل وتحسين المسارات (Route Optimization)",
        "option_b_en": "Manual Traffic Logging", "option_b_ar": "التسجيل اليدوي للمرور",
        "option_c_en": "Cashless Toll Paying", "option_c_ar": "دفع رسوم العبور غير النقدي",
        "option_d_en": "Virtual Reality Commuting", "option_d_ar": "التنقل بالواقع الافتراضي",
        "correct_option": "A",
        "explanation_en": "Fleet route optimization dynamically calculates the shortest and most energy-efficient transit routes, saving billions in fuel and transit hours.",
        "explanation_ar": "تحسين المسارات وإدارة الأساطيل بالذكاء الاصطناعي يحلل خرائط المرور لحظياً لتحديد أسرع المسارات وأقلها استهلاكاً للوقود."
    }
]

# WRITTEN for 1-3 (10 deep questions)
written_1_3 = [
    {
        "id": "ws_ch1_3_w1",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain how Predictive Maintenance works in industrial manufacturing: mention the hardware sensors required, the machine learning workflow, and two major economic benefits it provides over traditional scheduled maintenance.",
        "question_ar": "اشرح كيف تعمل الصيانة التنبؤية (Predictive Maintenance) في قطاع التصنيع: اذكر مستشعرات العتاد المطلوبة، ومسار عمل تعلم الآلة، وفائدتين اقتصاديتين رئيسيتين مقارنة بالصيانة الدورية التقليدية.",
        "ideal_answer_ar": "1. مستشعرات العتاد المطلوبة (IoT Sensors):\n   - تُثبت مستشعرات إنترنت الأشياء على خطوط الإنتاج والمحركات لقياس: الاهتزازات (Vibration)، درجات الحرارة (Thermal)، الضغط، ومعدل الضوضاء.\n\n2. مسار عمل تعلم الآلة (ML Workflow):\n   - تُجمع القراءات اللحظية وتُقارن بالأنماط السليمة السابقة؛ وتتدرب نماذج تعلم الآلة على اكتشاف الانحرافات والأنماط الدقيقة (Anomalies) التي تشير إلى تآكل جزء ميكانيكي قبل تعطله الفعلي بأيام أو أسابيع.\n\n3. فائدتان اقتصاديتان رئيسيتان:\n   - تجنب التوقف المفاجئ لخطوط الإنتاج (Downtime Prevention): الأعطال المفاجئة قد تكلف المصانع ملايين الجنيهات كل ساعة؛ والصيانة التنبؤية تتيح جدولتها في أوقات الراحة.\n   - إطالة عمر المعدات وتقليل تكاليف قطع الغيار: في الصيانة التقليدية تُستبدل القطع دورياً حتى لو كانت سليمة تماماً، بينما في التنبؤية لا تُستبدل إلا عند الحاجة الفعلية.",
        "ideal_answer_en": "1. Hardware Sensors: IoT vibration, thermal, acoustic, and pressure sensors mounted to critical motor shafts.\n2. ML Workflow: Telemetry streams into anomaly detection models trained on historical failure signatures to detect mechanical degradation before actual breakdown.\n3. Two Economic Benefits:\n   - Elimination of catastrophic unplanned downtime (saving millions per idle hour).\n   - Elimination of premature replacement costs associated with rigid scheduled maintenance calendars.",
        "explanation_ar": "شرح الصيانة التنبؤية المتكامل: مستشعرات، خوارزميات تعلم آلي، وعوائد اقتصادية مباشرة.",
        "explanation_en": "End-to-end breakdown of predictive maintenance: IoT inputs, ML workflow, and ROI."
    },
    {
        "id": "ws_ch1_3_w2",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Detail how AI Recommendation Engines operate on modern e-commerce and media platforms. Explain the role of user interaction history and collaborative filtering in personalizing experiences.",
        "question_ar": "فصّل كيف تعمل أنظمة التوصية (Recommendation Engines) في منصات التجارة الإلكترونية والبث الرقمي، موضحاً دور سجل تفاعلات المستخدم والترشيح التشاركي (Collaborative Filtering) في تخصيص التجربة.",
        "ideal_answer_ar": "1. آلية عمل أنظمة التوصية:\n   - تقوم بجمع وتحليل كميات ضخمة من البيانات السلوكية لكل مستخدم: سجل المشاهدات والمشتريات السابقة، العناصر التي أضافها للسلة، مدة التوقف عند منتج معين، والتقييمات.\n\n2. دور سجل التفاعلات الفردية:\n   - يبني النظام 'ملف اهتمامات' رقمياً للمستخدم يوضح تفضيلاته الدقيقة (مثل تفضيل أفلام الخيال العلمي أو العلامات التجارية الرياضية).\n\n3. دور الترشيح التشاركي (Collaborative Filtering):\n   - يبحث النظام عن مستخدمين آخرين لديهم أنماط وسجلات تفاعل شديدة الشبه بهذا المستخدم (مجموعة تشابه).\n   - إذا أعجب المستخدمون المشابهون بمنتج أو فيلم لم يشاهده المستخدم الحالي بعد، يفترض النظام بنسبة عالية أنه سيعجبه أيضاً ويقوم بترشيحه فوراً.\n\n4. النتيجة:\n   - زيادة مبيعات المنصات وبقاء المستخدم أطول فترة ممكنة لتلقيه اقتراحات توافق ذوقه تماماً.",
        "ideal_answer_en": "1. Operational Architecture: Aggregates continuous user telemetry (clicks, watch-time, purchases, ratings) to build dynamic interest vectors.\n2. User History Vectoring: Maps individual tastes across genre, price point, and engagement depth.\n3. Collaborative Filtering: Identifies peer clusters with matching consumption patterns. Items favored by similar users but not yet discovered by the target user are recommended with high predictive affinity, dramatically boosting platform retention and sales.",
        "explanation_ar": "شرح أنظمة التوصية وسجل التفاعلات وخوارزمية الترشيح التشاركي لتخصيص المحتوى.",
        "explanation_en": "Comprehensive explanation of recommendation engines and collaborative filtering mechanics."
    },
    {
        "id": "ws_ch1_3_w3",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain how Computer Vision assists radiologists in early tumor detection. Does the AI replace the human doctor, or augment their diagnostic accuracy? Justify your answer with two arguments.",
        "question_ar": "اشرح كيف تسهم رؤية الحاسوب (Computer Vision) في مساعدة أطباء الأشعة على الاكتشاف المبكر للأورام. وهل يحل الذكاء الاصطناعي محل الطبيب البشري أم يعزز دقته؟ علل إجابتك بحجتين منطقيتين.",
        "ideal_answer_ar": "1. كيف تسهم رؤية الحاسوب في الاكتشاف المبكر:\n   - تدرب شبكات التعلم العميق على ملايين صور الأشعة المقطعية (CT) والرنين المغناطيسي (MRI).\n   - تستطيع فحص الصور بكسلاً ببكسل ورصد التغيرات الميكروسكوبية والتكلسات المبكرة في الأنسجة بدقة متناهية قبل أن تصبح أوراماً واضحة.\n\n2. هل يحل محل الطبيب أم يعزز دقته؟\n   - لا يحل محل الطبيب، بل يُعزز دقته التشخيصية كـ «مساعد ذكي» (Augmented Intelligence) للأسباب التالية:\n     أ. غياب الفهم الكلي للحالة السريرية: الذكاء الاصطناعي يحلل صورة معزولة، بينما الطبيب البشري يربط الصورة بالتاريخ المرضي للعائلة، والأعراض السريرية، والفحوصات المعملية، والحالة النفسية للمريض.\n     ب. المسؤولية القانونية والأخلاقية ومعضلة الهلوسة: قد يخطئ الذكاء الاصطناعي في تمييز ندبة حميدة عن ورم خبيث؛ ولا يمكن قانونياً ولا أخلاقياً تحميل خوارزمية مسؤولية قرار جراحي أو علاج كيميائي، فالطبيب البشري هو صاحب الكلمة الأخيرة والمسؤول الوحيد.",
        "ideal_answer_en": "1. Role in Early Detection: Deep convolutional networks scan medical scans at sub-pixel resolution, highlighting micro-calcifications and early tissue abnormalities far earlier than unassisted screening.\n2. Replacement vs Augmentation: AI acts as an augmentative co-pilot, not a replacement:\n   - Comprehensive Clinical Context: AI only evaluates pixel matrices; human physicians correlate findings with holistic patient history, lab panels, and physical exams.\n   - Ethical & Legal Responsibility: Diagnostic accountability cannot rest with an unexplainable software script; the human physician bears ultimate legal and ethical authority for surgical or oncological decisions.",
        "explanation_ar": "دور رؤية الحاسوب في الطب، وتأكيد مبدأ التعزيز (Augmented AI) بدلاً من الاستبدال التام.",
        "explanation_en": "Computer vision in radiology, augmented intelligence paradigm, and clinical responsibility."
    },
    {
        "id": "ws_ch1_3_w4",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Illustrate how Precision Agriculture leverages drones and AI to transform farming practices, highlighting its environmental impact regarding water conservation and pesticide reduction.",
        "question_ar": "وضّح كيف تسهم «الزراعة الدقيقة» (Precision Agriculture) باستخدام الطائرات المسيرة (الدرونز) والذكاء الاصطناعي في تحول أساليب الزراعة، مبرزاً أثرها البيئي في ترشيد استهلاك المياه والحد من المبيدات.",
        "ideal_answer_ar": "1. تطبيقات الزراعة الدقيقة:\n   - مسح الحقول بالدرونز: تحلق الطائرات المسيرة المزودة بكاميرات متعددة الأطياف لمسح مساحات شاسعة من الحقول والتقاط صور عالية الدقة.\n   - تحليل الذكاء الاصطناعي: تحلل نماذج رؤية الحاسوب الصور لتحديد: رطوبة التربة في كل متر مربع، ونقص العناصر الغذائية (كالنيتروجين)، وبؤر الإصابة بالآفات الزراعية.\n\n2. الأثر البيئي والاقتصادي:\n   - ترشيد استهلاك المياه: بدلاً من الري بالغمر لكامل الحقل، تُوجّه أنظمة الري الذكية المياه فقط للمناطق الجافة التي تحتاجها فعلاً، مما يوفر مليارات الأمتار المكعبة من المياه العذبة.\n   - الحد من المبيدات الكيميائية: بدلاً من الرش العشوائي للمزرعة بأكملها، يُرش المبيد بدقة متناهية فقط على النباتات المصابة، مما يحمي المياه الجوفية من التلوث ويقلل ترسب السموم في المحاصيل الغذائية.",
        "ideal_answer_en": "1. Precision Agriculture Mechanism: Multispectral drone imaging maps plant health indices across vast hectarage. AI identifies nitrogen deficiency, soil moisture variations, and isolated pest outbreaks.\n2. Environmental Impact:\n   - Water Conservation: Pinpoint variable-rate irrigation waters only arid zones, preventing massive freshwater waste from indiscriminate flooding.\n   - Pesticide Reduction: Micro-spraying targets solely infested leaves, drastically cutting toxic agrochemical runoff into groundwater and safeguarding food safety.",
        "explanation_ar": "تطبيقات الزراعة الدقيقة ومزاياها البيئية في ترشيد المياه وخفض استخدام المبيدات.",
        "explanation_en": "Drones in precision agriculture, targeted resource application, and ecological sustainability."
    },
    {
        "id": "ws_ch1_3_w5",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Define the concept of 'Narrow AI' (Artificial Narrow Intelligence), explain why all contemporary AI systems fall into this category, and give two examples of Narrow AI systems that cannot perform tasks outside their training domain.",
        "question_ar": "عرّف مفهوم «الذكاء الاصطناعي الضيق» (Narrow AI)، واشرح لماذا تندرج جميع أنظمة الذكاء الاصطناعي الموجودة حالياً تحت هذا التصنيف، وقدم مثالين على أنظمة ذكاء اصطناعي ضيق تعجز عن أداء مهام خارج نطاق تدريبها.",
        "ideal_answer_ar": "1. تعريف الذكاء الاصطناعي الضيق (Narrow AI):\n   - هو الذكاء الاصطناعي المصمم والمبرمج لأداء مهمة واحدة محددة أو نطاق ضيق جداً من المهام بكفاءة عالية، دون أن يمتلك أي وعي ذاتي أو قدرة على التفكير العام.\n\n2. لماذا تندرج كل الأنظمة الحالية تحته:\n   - لأن البشر لم يتمكنوا حتى الآن من ابتكار 'الذكاء الاصطناعي العام' (AGI) القادر على محاكاة المرونة الفكرية البشرية ونقل المعرفة بين مجالات مختلفة تلقائياً؛ فكل نظام حالي يعتمد على بيانات وأوزان مخصصة لمجال واحد فقط.\n\n3. مثالان على أنظمة عاجزة خارج تخصصها:\n   - برنامج AlphaGo / برامج الشطرنج: يستطيع التغلب على أبطال العالم في اللعبة، لكنه يعجز عن قراءة جملة واحدة أو التعرف على صوت بشري.\n   - خوارزمية التعرف على الوجوه في الهواتف: تفتح الهاتف بمسح الوجه بدقة فائقة، لكنها تعجز عن تشخيص مرض جلدي بسيط أو حل مسألة حسابية.",
        "ideal_answer_en": "1. Definition: Narrow AI (ANI) is artificial intelligence engineered to execute a single constrained domain task with high precision, lacking general cognition or cross-domain adaptability.\n2. Why all current AI is Narrow: No contemporary architecture achieves Artificial General Intelligence (AGI). Every model depends on specialized training datasets and weight matrices bound strictly to one domain.\n3. Two Examples:\n   - AlphaGo: Masters the game of Go against grandmasters, yet cannot summarize a newspaper paragraph.\n   - Smartphone Face ID: Unlocks screens via facial biometrics, but cannot diagnose basic skin rashes or compose an email.",
        "explanation_ar": "مفهوم الذكاء الاصطناعي الضيق وحدوده الواقعية وتوضيح الفرق بينه وبين الذكاء العام.",
        "explanation_en": "Narrow AI definition, present-day constraints, and domain-transfer incapacity."
    },
    {
        "id": "ws_ch1_3_w6",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain how banking institutions use AI for real-time Fraud Detection. Detail two behavioral indicators the algorithm tracks during credit card transactions.",
        "question_ar": "اشرح كيف تستخدم المؤسسات المصرفية الذكاء الاصطناعي للكشف عن الاحتيال المالي (Fraud Detection) في الوقت الفعلي، واذكر مؤشرين سلوكيين يتتبعهما النموذج أثناء فحص المعاملات بالبطاقات الائتمانية.",
        "ideal_answer_ar": "1. آلية عمل الذكاء الاصطناعي في كشف الاحتيال اللحظي:\n   - يتدرب النموذج على مليارات المعاملات البنكية التاريخية (السليمة والاحتيالية).\n   - عند إجراء أي معاملة جديدة، يفحصها النموذج في أجزاء من الثانية ويقارنها بالسلوك المعتاد لحامل البطاقة؛ وإذا تجاوزت درجة الخطر حداً معيناً، يتم حظر العملية فوراً وإرسال تنبيه للعميل.\n\n2. مؤشران سلوكيان يتتبعهما النموذج:\n   - التناقض الجغرافي والزمني (Geographical Velocity Anomaly): مثل استخدام البطاقة في القاهرة لشراء قهوة، ثم محاولة استخدامها بعد 15 دقيقة في متجر في باريس (وهو انتقال مستحيل فيزيائياً في هذا الوقت).\n   - النمط المالي غير المعتاد (Transaction Size & Frequency): قيام حساب معتاد على معاملات صغيرة بمحاولة سحب مبالغ ضخمة متتالية في ساعات متأخرة من الليل في موقع غير مألوف.",
        "ideal_answer_en": "1. Real-time Fraud Detection Architecture: Machine learning models evaluate transactions against baseline behavioral profiles in milliseconds, calculating fraud probability scores and locking suspicious attempts.\n2. Two Behavioral Indicators:\n   - Geo-Velocity Discrepancy: Consecutive card swipes separated by thousands of miles within minutes, indicating counterfeit or compromised credentials.\n   - Unusual Transaction Size & Burst Velocity: Sudden high-value withdrawals executed at midnight outside normal purchasing habits.",
        "explanation_ar": "كشف الاحتيال المالي في البنوك والمؤشرات السلوكية الشاذة التي ترصدها الخوارزميات فورياً.",
        "explanation_en": "Real-time banking fraud classification models and anomalous behavioral triggers."
    },
    {
        "id": "ws_ch1_3_w7",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Compare Predictive AI and Generative AI in the healthcare sector: provide one practical healthcare application of each and explain how they serve different medical objectives.",
        "question_ar": "قارن بين الذكاء الاصطناعي التنبؤي (Predictive AI) والذكاء الاصطناعي التوليدي (Generative AI) في قطاع الرعاية الصحية: اذكر تطبيقاً عملياً لكل منهما ووضح كيف يخدمان أهدافاً طبية مختلفة.",
        "ideal_answer_ar": "1. الذكاء الاصطناعي التنبؤي (Predictive AI) في الصحة:\n   - التطبيق العملي: التنبؤ باحتمالية تدهور حالة مريض في العناية المركزة أو إعادة دخوله للمستشفى خلال 30 يوماً استناداً لقراءات العلامات الحيوية، أو تصنيف صور الرنين المغناطيسي للأورام.\n   - الهدف الطبي: التشخيص المبكر، حساب المخاطر الصحية، واستباق الأزمات قبل تفاقمها.\n\n2. الذكاء الاصطناعي التوليدي (Generative AI) في الصحة:\n   - التطبيق العملي: تسريع اكتشاف الأدوية عبر توليد وتصميم هياكل جزيئية وبروتينية جديدة كلياً (Molecular Design) لمكافحة فيروس معين، أو توليد ملخصات طبية لملفات المرضى.\n   - الهدف الطبي: الابتكار وخلق حلول علاجية جديدة وأتمتة التقارير الإكلينيكية المعقدة.\n\n3. الفارق في الهدف: التنبؤي يحلل بيانات قائمة لتشخيص وتوقع مسار المرض، بينما التوليدي يبتكر مركبات ومحتويات جديدة لم تكن موجودة مسبقاً لدعم العلاج والبحث العلمي.",
        "ideal_answer_en": "1. Predictive AI: Predicts ICU patient deterioration or classifies tumor scans. Objective: Early diagnosis and risk stratification from existing diagnostic data.\n2. Generative AI: Synthesizes novel molecular chemical compounds and designs candidate antibodies for drug discovery. Objective: Creative pharmaceutical innovation and clinical documentation synthesis.\n3. Distinct Goals: Predictive AI classifies existing clinical data; Generative AI invents novel biological structures to solve disease.",
        "explanation_ar": "مقارنة دقيقة بين الذكاء التنبؤي والتوليدي في الرعاية الصحية واختلاف الأهداف الطبية.",
        "explanation_en": "Predictive vs Generative AI in medicine: diagnostic classification vs generative molecular discovery."
    },
    {
        "id": "ws_ch1_3_w8",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "How do AI algorithms optimize supply chain logistics for an international shipping enterprise? Explain two key optimization variables handled by the system.",
        "question_ar": "كيف تسهم خوارزميات الذكاء الاصطناعي في تحسين سلاسل التوريد والخدمات اللوجستية لشركة شحن دولية؟ اشرح متغيرين رئيسيين يديرهما النظام لتحقيق أعلى كفاءة.",
        "ideal_answer_ar": "1. دور الذكاء الاصطناعي في سلاسل التوريد:\n   - يحلل كميات هائلة من البيانات اللحظية (الطقس، الموانئ، حركة المرور، أسعار الوقود، وتفضيلات العملاء) لتوجيه السفن والشاحنات بكفاءة تامة وتفادي الاختناقات.\n\n2. متغيران رئيسيان يديرهما النظام:\n   - تحسين مسارات النقل (Dynamic Route Optimization): إعادة توجيه أساطيل الشاحنات والسفن لحظياً لتفادي الاختناقات المرورية والعواصف البحرية، مما يوفر ملايين اللترات من الوقود ويقلل زمن التوصيل.\n   - التنبؤ الدقيق بالطلب وإدارة سعات التخزين (Demand & Inventory Forecasting): التنبؤ بالمنتجات التي سيطلبها كل إقليم مسبقاً، مما يسمح بتوزيع البضائع في المستودعات القريبة قبل طلبها، وتفادي تكدس الحاويات أو فراغ الأرفف.",
        "ideal_answer_en": "1. AI in Supply Chain: Dynamically correlates global shipping telemetry (port bottlenecks, weather patterns, fuel prices, inventory levels) to orchestrate optimal transit networks.\n2. Two Key Variables:\n   - Dynamic Route Optimization: Re-routes cargo vessels and delivery trucks around maritime storms and highway congestion to reduce transit delays and fuel burn.\n   - Inventory & Demand Balancing: Pre-allocates regional warehouse inventory based on predictive seasonal demand forecasts, avoiding inventory stockouts and warehouse storage waste.",
        "explanation_ar": "تحسين سلاسل التوريد والخدمات اللوجستية بالذكاء الاصطناعي عبر تحسين المسارات وإدارة المخزون.",
        "explanation_en": "Supply chain optimization via AI dynamic routing and predictive inventory pre-allocation."
    },
    {
        "id": "ws_ch1_3_w9",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "A smart home thermostat uses AI to adjust heating and cooling. Explain what data it collects, how it learns household routines, and how this achieves energy conservation.",
        "question_ar": "يستخدم منظم حرارة ذكي (Smart Thermostat) الذكاء الاصطناعي لضبط التدفئة والتكييف. اشرح ما هي البيانات التي يجمعها، وكيف يتعلم الروتين اليومي لأفراد الأسرة، وكيف يحقق ذلك ترشيداً لاستهلاك الطاقة.",
        "ideal_answer_ar": "1. البيانات التي يجمعها المنظم الذكي:\n   - درجات الحرارة الخارجية والداخلية، الرطوبة، أوقات تشغيل وإطفاء التكييف، وبيانات مستشعرات الحركة التي ترصد تواجد الأشخاص داخل الغرف.\n\n2. كيف يتعلم الروتين اليومي:\n   - يتدرب نموذج التعلم الآلي على مواعيد مغادرة أفراد المنزل للعمل والمدرسة ومواعيد عودتهم ونومهم.\n   - يستنتج النمط المتكرر دون الحاجة لبرمجة يدوية، فيعرف متى يكون المنزل شاغراً ومتى يحتاج لتكييف مسبق.\n\n3. كيف يحقق ترشيد الطاقة:\n   - يُخفض استهلاك التكييف والتدفئة تلقائياً في الساعات التي يكون فيها المنزل فارغاً أو عندما يكون الجميع نياماً، ويُعيد درجة الحرارة للمستوى المريح قبل عودتهم بربع ساعة فقط، مما يوفر ما يصل إلى 30% من فاتورة الكهرباء.",
        "ideal_answer_en": "1. Ingested Data: Indoor/outdoor temperatures, ambient humidity, manual adjustment logs, and infrared occupancy motion sensors.\n2. Routine Learning: Identifies temporal patterns of when residents leave for work/school and return, building an autonomous schedule without manual programming.\n3. Energy Conservation: Automatically throttles HVAC systems down to eco-mode during unoccupied hours, re-conditioning rooms minutes before family arrival, cutting domestic power bills up to 30%.",
        "explanation_ar": "أجهزة المنازل الذكية والتعلم الآلي في ضبط التكييف وترشيد الطاقة.",
        "explanation_en": "Smart thermostat AI: telemetry ingestion, routine pattern learning, and energy efficiency."
    },
    {
        "id": "ws_ch1_3_w10",
        "lesson": "1-3", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Describe two applications of AI in the education sector (such as personalized adaptive learning and automated grading assistants), and explain how they help teachers rather than replace them.",
        "question_ar": "صف تطبيقين للذكاء الاصطناعي في قطاع التعليم (مثل: التعلم التكيفي المخصص، والمساعد الآلي للتصحيح)، ووضح كيف يساعد هذان التطبيقان المعلمين بدلاً من استبدالهم.",
        "ideal_answer_ar": "1. التطبيقان في قطاع التعليم:\n   - التعلم التكيفي المخصص (Adaptive Learning): منصات ذكية تحلل مستوى كل طالب ونقاط ضعفه، وتقدم له مساراً تعليمياً وتمارين تناسب سرعته الفردية (فتركز على تعزيز المفاهيم الصعبة لديه).\n   - المساعد الآلي للتقييم والتصحيح (Automated Grading): تصحيح الواجبات والاختبارات الدورية وتقديم تحليل فوري لأكثر الأسئلة التي تعثر فيها الطلاب.\n\n2. كيف يساعدان المعلم ولا يستبدلانه:\n   - تحرير وقت المعلم من الأعباء الروتينية: توفير ساعات تصحيح الأوراق يتيح للمعلم التركيز على الأنشطة التفاعلية، والشرح الإبداعي، والتوجيه الفردي للطلاب المحتاجين للدعم.\n   - البعد الإنساني والتربوي: التعليم ليس مجرد نقل معلومات واختبارات؛ فالذكاء الاصطناعي يفتقر للذكاء العاطفي، والتحفيز الإنساني، وبناء القيم والشخصية، وهي أدوار جوهرية لا يمكن إلا للمعلم البشري القيام بها.",
        "ideal_answer_en": "1. Two Educational Applications:\n   - Adaptive Learning Platforms: Customizes learning paths and drill problems matching each pupil's unique pace and knowledge gaps.\n   - Automated Grading & Diagnostic Analytics: Grades routine quizzes instantly and flags macro-trends in classroom comprehension.\n2. Empowering Teachers vs Replacing Them:\n   - Relieves Administrative Drudgery: Frees educators from repetitive grading, allowing them to dedicate hours to interactive mentoring and creative pedagogy.\n   - Irreplaceable Human Connection: AI lacks empathy, moral modeling, emotional mentorship, and character development, which remain exclusively human faculties.",
        "explanation_ar": "الذكاء الاصطناعي في التعليم وأثره في مساندة المعلم وتمكينه مع الاحتفاظ بدوره التربوي والإنساني.",
        "explanation_en": "AI in education (adaptive learning, grading automation) and teacher empowerment vs replacement."
    }
]

questions.extend(mcq_1_3)
questions.extend(written_1_3)

# ==============================================================================
# LESSON 1-4 (10 MCQ + 10 WRITTEN)
# ==============================================================================

mcq_1_4 = [
    {
        "id": "deep_1_4_q1",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A global tech company trains an AI recruitment tool using resumes submitted over the past 10 years, when 85% of hired software engineers were male. The AI subsequently downgrades applications containing the word 'Women's'. What is the root cause of this algorithmic bias?",
        "question_ar": "درّبت شركة تقنية أداة توظيف بالذكاء الاصطناعي على سير ذاتية قُدمت على مدار 10 سنوات ماضية، حيث كان 85% من المعينين ذكوراً. وبناءً عليه، بدأ النظام يخفض تقييم السير الذاتية التي تحتوي على كلمة 'نسائي'. ما السبب الجذري لهذا التحيز الخوارزمي؟",
        "option_a_en": "A programming bug in the CPU operating system", "option_a_ar": "خطأ برمجي في نظام تشغيل المعالج",
        "option_b_en": "Biased historical training data reflecting past societal imbalances", "option_b_ar": "بيانات التدريب التاريخية المتحيزة التي عكست عدم التوازن المجتمعي السابق",
        "option_c_en": "The candidates used slow Internet connections", "option_c_ar": "استخدام المتقدمين لاتصال إنترنت بطيء",
        "option_d_en": "The system was infected by a computer virus", "option_d_ar": "إصابة النظام بفيروس حاسوبي",
        "correct_option": "B",
        "explanation_en": "Algorithmic bias predominantly originates from biased or unrepresentative training data. The model faithfully reproduced past historic hiring imbalances.",
        "explanation_ar": "التحيز الخوارزمي ينشأ أساساً من بيانات التدريب المتحيزة تاريخياً أو غير الممثلة للواقع العادل؛ فالنموذج تعلم وعكس التمييز الموجود في البيانات السابقة."
    },
    {
        "id": "deep_1_4_q2",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A city deploys AI facial recognition cameras on every street corner to track all pedestrian movements and log their daily habits into a central government registry without consent. Which AI ethical concern is most acutely violated?",
        "question_ar": "نشرت مدينة كاميرات للتعرف على الوجه بالذكاء الاصطناعي في كل ركن لتتبع تحركات جميع المشاة وتسجيل عاداتهم اليومية في سجل مركزي دون إذنهم. أي شاغل أخلاقي للذكاء الاصطناعي ينتهكه هذا الإجراء بشكل مباشر؟",
        "option_a_en": "Data Privacy and Mass Surveillance", "option_a_ar": "خصوصية البيانات والمراقبة الجماعية (Data Privacy)",
        "option_b_en": "Moore's Law physical slowdown", "option_b_ar": "التباطؤ الفيزيائي لقانون مور",
        "option_c_en": "Autonomous Vehicle Latency", "option_c_ar": "زمن التأخير في السيارات ذاتية القيادة",
        "option_d_en": "Quantum Superposition Decay", "option_d_ar": "تلاشي التراكب الكمومي",
        "correct_option": "A",
        "explanation_en": "Mass facial biometric scanning without consent directly threatens individual civil privacy rights and creates invasive state or corporate surveillance.",
        "explanation_ar": "استخدام القياسات الحيوية للوجه لمراقبة المواطنين دون موافقتهم يمثل انتهاكاً صارخاً للخصوصية الشخصية وحرية الأفراد ويدخل في إطار المراقبة الجماعية."
    },
    {
        "id": "deep_1_4_q3",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "An autonomous self-driving car in fully automated mode runs a red light and causes a collision while the human passenger is asleep in the backseat. Determining who is legally and morally responsible highlights which AI ethical dilemma?",
        "question_ar": "سيارة ذاتية القيادة في وضع القيادة الآلية الكامل تجاوزت إشارة حمراء وتسببت في حادث أثناء نوم الراكب البشري في المقعد الخلفي. تحديد المسؤول قانونياً وأخلاقياً يبرز أي معضلة أخلاقية للذكاء الاصطناعي؟",
        "option_a_en": "Accountability Dilemma", "option_a_ar": "معضلة المساءلة وتحديد المسؤولية (Accountability)",
        "option_b_en": "Cloud Server Overload", "option_b_ar": "الضغط الزائد على خوادم السحابة",
        "option_c_en": "Superposition Entanglement", "option_c_ar": "التشابك في التراكب الكمومي",
        "option_d_en": "Internet Bandwidth Throttling", "option_d_ar": "اختناق سرعة الإنترنت",
        "correct_option": "A",
        "explanation_en": "The Accountability dilemma addresses the difficulty of assigning legal and moral blame when autonomous decision-making software causes harm.",
        "explanation_ar": "معضلة المساءلة (Accountability) تتعلق بصعوبة تحديد من يتحمل المسؤولية القانونية والأخلاقية عند وقوع ضرر ناجم عن قرار ذاتي اتخذه نظام مستقل."
    },
    {
        "id": "deep_1_4_q4",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A medical AI system recommends amputating a patient's leg. When the lead surgeon asks the software developers to explain WHY the system made this decision, they reply that the multi-layered neural network is too complex to interpret. Which ethical principle is missing?",
        "question_ar": "أوصى نظام ذكاء اصطناعي طبي ببتر ساق مريض. وعندما سأل الجراح مطوري النظام عن سبب هذا القرار، أجابوا بأن الشبكة العصبية معقدة للغاية ولا يمكن تفسير خطواتها. أي مبدأ أخلاقي مفقود هنا؟",
        "option_a_en": "Transparency and Explainability", "option_a_ar": "الشفافية وقابلية التفسير (Transparency & Explainability)",
        "option_b_en": "High Processing Speed", "option_b_ar": "سرعة المعالجة العالية",
        "option_c_en": "Cashless Connectivity", "option_c_ar": "الاتصال غير النقدي",
        "option_d_en": "Virtual Reality Immersion", "option_d_ar": "الانغماس في الواقع الافتراضي",
        "correct_option": "A",
        "explanation_en": "Transparency requires AI decisions — especially life-altering ones — to be explainable to human overseers, solving the 'Black Box' dilemma.",
        "explanation_ar": "مبدأ الشفافية وقابلية الشرح (Explainability) يشترط أن تكون مسببات قرارات الذكاء الاصطناعي واضحة ومفهومة للأطباء والمتخصصين حتى يمكن اعتمادها."
    },
    {
        "id": "deep_1_4_q5",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A malicious actor creates a hyper-realistic synthetic video of a country's president declaring war, using generative deep learning techniques, causing widespread panic. What is this deceptive technology called?",
        "question_ar": "قام شخص بتوليد مقطع فيديو واقعي للغاية لرئيس دولة يعلن الحرب باستخدام تقنيات التعلم العميق التوليدية، مما تسبب في ذعر عام. ماذا تسمى هذه التقنية الخادعة؟",
        "option_a_en": "Deepfake", "option_a_ar": "التزييف العميق (Deepfake)",
        "option_b_en": "Augmented Reality HUD", "option_b_ar": "شاشة الواقع المعزز",
        "option_c_en": "Edge Computing Tunnel", "option_c_ar": "نفق الحوسبة الطرفية",
        "option_d_en": "Quantum Bit Manipulation", "option_d_ar": "معالجة البت الكمومي",
        "correct_option": "A",
        "explanation_en": "Deepfakes are synthetic media generated using deep neural networks to manipulate video/audio, making real people appear to say or do things they never did.",
        "explanation_ar": "التزييف العميق (Deepfake) هو تزييف رقمي متقدم للوسائط باستخدام التعلم العميق لدمج وتركيب صور وأصوات شخصيات حقيقية لتبدو كأنها تقوم بأفعال أو تصريحات لم تحدث."
    },
    {
        "id": "deep_1_4_q6",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "A nationwide retail chain replaces 5,000 cashier positions with automated self-checkout AI kiosks in one month. The cashiers are laid off and face difficulty finding new jobs. Which ethical challenge does this illustrate?",
        "question_ar": "استبدلت سلسلة متاجر كبرى 5000 وظيفة كاشير بأكشاك دفع آلية مدعومة بالذكاء الاصطناعي في شهر واحد، وسُرح الموظفون وواجهوا صعوبة في إيجاد عمل. أي تحدٍ أخلاقي يوضح هذا الموقف؟",
        "option_a_en": "Job Displacement and Workforce Automation", "option_a_ar": "إزاحة الوظائف والأتمتة (Job Displacement)",
        "option_b_en": "Algorithmic Hallucination", "option_b_ar": "الهلوسة الخوارزمية",
        "option_c_en": "Edge Sensor Latency", "option_c_ar": "زمن تأخير المستشعر الطرفي",
        "option_d_en": "Quantum Computing decoherence", "option_d_ar": "فقدان التماسك الكمومي",
        "correct_option": "A",
        "explanation_en": "Job Displacement occurs when rapid AI automation renders human labor redundant, requiring societal reskilling and social support policies.",
        "explanation_ar": "إزاحة الوظائف (Job Displacement) تنتج عن استبدال العمالة البشرية بأنظمة مؤتمتة ذكية، مما يفرض تحديات اقتصادية واجتماعية تتطلب إعادة تأهيل وتدريب العمال."
    },
    {
        "id": "deep_1_4_q7",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Which of the following engineering actions is the most effective proactive measure for developers to prevent Algorithmic Bias in an AI model?",
        "question_ar": "أي من الإجراءات الهندسية التالية هو الإجراء الاستباقي الأكثر فاعلية للمطورين لتفادي الوقوع في التحيز الخوارزمي في نموذج الذكاء الاصطناعي؟",
        "option_a_en": "Ensuring the training dataset is diverse, representative, and audited for demographic balance", "option_a_ar": "التأكد من أن بيانات التدريب متنوعة وممثلة للجميع وخضعت للتدقيق لتحقيق التوازن الديمغرافي",
        "option_b_en": "Overclocking the GPU processor", "option_b_ar": "كسر سرعة معالج الرسوميات (GPU)",
        "option_c_en": "Increasing the price of the software license", "option_c_ar": "زيادة سعر ترخيص البرنامج للمستخدمين",
        "option_d_en": "Converting the neural network into a quantum circuit", "option_d_ar": "تحويل الشبكة العصبية إلى دائرة كمومية",
        "correct_option": "A",
        "explanation_en": "Auditing and curating diverse, balanced training datasets is the fundamental technical defense against algorithmic bias.",
        "explanation_ar": "تدقيق بيانات التدريب وضمان تنوعها وتمثيلها العادل والشامل لكافة فئات المجتمع هو خط الدفاع التقني الأول والأساسي ضد التحيز الخوارزمي."
    },
    {
        "id": "deep_1_4_q8",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "An AI system that approves bank loans is found to reject mortgage applicants living in specific lower-income postal codes, even when their personal incomes and credit scores are excellent. What type of bias does this represent?",
        "question_ar": "تبيّن أن نظام ذكاء اصطناعي للموافقات على القروض يرفض طلبات المتقدمين المقيمين في رموز بريدية لمناطق محددة منخفضة الدخل، حتى لو كانت دخولهم وسجلاتهم الائتمانية ممتازة. أي نوع من التحيز يمثله هذا؟",
        "option_a_en": "Geographic and Socioeconomic Algorithmic Bias", "option_a_ar": "تحيز خوارزمي جغرافي واقتصادي مجتمعي",
        "option_b_en": "Optical Camera Distortion", "option_b_ar": "تشوه الكاميرا البصرية",
        "option_c_en": "Thermal Sensor Breakdown", "option_c_ar": "عطل المستشعر الحراري",
        "option_d_en": "Quantum Tunneling Leakage", "option_d_ar": "تسرب النفق الكمومي",
        "correct_option": "A",
        "explanation_en": "Algorithmic bias occurs when proxy variables (like zip codes) unintentionally encode historic economic discrimination against specific communities.",
        "explanation_ar": "التحيز الخوارزمي الجغرافي والاجتماعي يحدث عندما تستخدم الخوارزمية متغيرات غير مباشرة (كالرمز البريدي) تعكس تاريخاً من التمييز ضد فئات معينة."
    },
    {
        "id": "deep_1_4_q9",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "Under international ethical AI frameworks, what is the mandatory requirement known as 'Informed Consent' regarding user personal data?",
        "question_ar": "وفقاً للمواثيق الأخلاقية الدولية للذكاء الاصطناعي، ما هو الشرط الإلزامي المعروف بـ «الموافقة المستنيرة» (Informed Consent) فيما يخص البيانات الشخصية للمستخدم؟",
        "option_a_en": "Users must clearly understand what data is collected, how it will be used, and explicitly agree before processing begins", "option_a_ar": "يجب أن يفهم المستخدم بوضوح ما هي البيانات المجمعة وكيف ستُستخدم، ويمنح موافقته الصريحة قبل المعالجة",
        "option_b_en": "Users must pay a cash fee before visiting any website", "option_b_ar": "يجب على المستخدم دفع رسوم نقدية قبل تصفح أي موقع",
        "option_c_en": "Users must complete an exam on Moore's Law", "option_c_ar": "يجب على المستخدم اجتياز امتحان في قانون مور",
        "option_d_en": "Developers own all photos on the user's phone automatically", "option_d_ar": "يمتلك المطورون جميع صور هاتف المستخدم تلقائياً دون إذن",
        "correct_option": "A",
        "explanation_en": "Informed Consent requires transparency: users must be fully aware of data collection practices, purposes, and risks, and grant voluntary, explicit permission.",
        "explanation_ar": "الموافقة المستنيرة تشترط توضيح ماهية البيانات وأغراض استخدامها ومخاطرها بلغة واضحة للمستخدم، والحصول على موافقته الحرة والصريحة قبل جمع بياناته."
    },
    {
        "id": "deep_1_4_q10",
        "lesson": "1-4", "unit": "1", "type": "MCQ", "difficulty": "HARD", "source": "WEEKLY_ASSESSMENT",
        "question_en": "What is the primary objective of formulating an 'AI Code of Ethics' within corporations and governmental institutions?",
        "question_ar": "ما هو الهدف الأساسي من صياغة «ميثاق أخلاقي للذكاء الاصطناعي» (AI Code of Ethics) داخل المؤسسات والشركات والجهات الحكومية؟",
        "option_a_en": "Ensuring AI technologies are developed and deployed responsibly, fairly, safely, and aligned with human values", "option_a_ar": "ضمان تطوير واستخدام تقنيات الذكاء الاصطناعي بمسؤولية وعدالة وأمان وتوافق مع القيم الإنسانية",
        "option_b_en": "Preventing any future advancements in computing", "option_b_ar": "منع أي تطورات مستقبلية في علوم الحاسوب",
        "option_c_en": "Requiring all computers to use vacuum tubes", "option_c_ar": "إلزام جميع الحواسيب باستخدام الصمامات المفرغة",
        "option_d_en": "Eliminating the need for software testing", "option_d_ar": "إلغاء الحاجة إلى اختبار البرمجيات",
        "correct_option": "A",
        "explanation_en": "AI Codes of Ethics establish governance guardrails prioritizing human rights, fairness, non-discrimination, safety, transparency, and accountability.",
        "explanation_ar": "يهدف الميثاق الأخلاقي إلى وضع ضوابط ومعايير حوكمة تضمن أن تكون أنظمة الذكاء الاصطناعي عادلة، آمنة، غير متحيزة، وتخدم رفاهية المجتمع وحقوق الإنسان."
    }
]

# WRITTEN for 1-4 (10 deep questions)
written_1_4 = [
    {
        "id": "ws_ch1_4_w1",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Analyze the root causes of Algorithmic Bias in machine learning systems: explain how bias enters the training data, and propose three concrete technical practices developers must follow to eliminate bias.",
        "question_ar": "حلل الأسباب الجذرية لـ «التحيز الخوارزمي» (Algorithmic Bias) في أنظمة تعلم الآلة: اشرح كيف يتسلل التحيز إلى بيانات التدريب، واقترح ثلاث ممارسات تقنية ملموسة يجب على المطورين اتباعها للحد من هذا التحيز.",
        "ideal_answer_ar": "1. كيف يتسلل التحيز لبيانات التدريب:\n   - انعكاس التحيزات التاريخية والمجتمعية: إذا كانت البيانات التاريخية تحتوي على تمييز غير عادل (مثل قلة تمثيل النساء في الوظائف القيادية أو استهداف أقليات معينة)، فإن خوارزمية التعلم الآلي تعامل هذا التمييز كـ 'قاعدة صحيحة' وتكرره.\n   - عدم التوازن والتمثيل غير العادل (Underrepresentation): إذا دربت خوارزمية تعرف على الوجوه على صور 90% منها لأصحاب البشرة الفاتحة، ستفشل أو تعطي نتائج مشوهة ومتحيزة لأصحاب البشرة الداكنة.\n\n2. ثلاث ممارسات تقنية للحد من التحيز:\n   - تدقيق وتنويع بيانات التدريب (Dataset Auditing & Diversity): فحص البيانات ديمغرافياً والتأكد من تمثيل جميع الفئات والأعراق بالتساوي والعدل.\n   - اختبارات العدالة الخوارزمية (Fairness Metrics Testing): قياس معدلات الخطأ ونسب القبول عبر مجموعات ديمغرافية مختلفة للتأكد من عدم وجود تفاوت إحصائي مجحف.\n   - إشراك فرق تطوير متعددة الخلفيات وتطبيق الرقابة البشرية المستمرة (Diverse Teams & Human Oversight).",
        "ideal_answer_en": "1. Root Causes in Training Data: Historical societal bias embedded in past records (e.g. gender disparities in hiring) is encoded as valid ground truth. Additionally, underrepresentation of minority demographics leads to high error rates on those groups.\n2. Three Technical Practices:\n   - Comprehensive Dataset Auditing: Balancing datasets across all demographics prior to training.\n   - Algorithmic Fairness Benchmarking: Testing false positive/negative parity across demographic slices.\n   - Diverse Engineering Teams and Human-in-the-Loop review mechanisms.",
        "explanation_ar": "أسباب التحيز الخوارزمي وحلول هندسية ملموسة لتدقيق البيانات واختبار العدالة.",
        "explanation_en": "Causes of algorithmic bias and 3 concrete technical interventions to ensure fairness."
    },
    {
        "id": "ws_ch1_4_w2",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Address the ethical dilemma of 'Accountability' in autonomous vehicles: if an AI car in autonomous mode causes a fatal crash, analyze who should bear legal and moral responsibility (the software developer, the manufacturer, the vehicle owner, or the passenger) and why.",
        "question_ar": "تناول معضلة «المساءلة وتحديد المسؤولية» (Accountability) في المركبات ذاتية القيادة: إذا تسببت سيارة ذاتية القيادة في حادث سير مميت أثناء القيادة الآلية، فحلل من الذي يجب أن يتحمل المسؤولية القانونية والأخلاقية (مطور البرمجيات، الشركة المصنعة، مالك السيارة، أم الراكب) مع التعليل.",
        "ideal_answer_ar": "تحليل معضلة المساءلة:\n1. الشركة المصنعة ومطورو البرمجيات (The Manufacturer & Developers):\n   - يتحملون المسؤولية القانونية والأخلاقية الأساسية إذا كان الحادث ناجماً عن خطأ برمجي، أو عيب في خوارزمية التعرف على العوائق، أو فشل في أجهزة الاستشعار (ميكانيكياً أو برمجياً)، لأنهم هم من صمموا وطرحوا النظام كأداة موثوقة للمستهلك.\n\n2. مالك المركبة أو السائق البشري (The Owner/Driver):\n   - يتحمل المسؤولية إذا أهمل صيانة المركبة وتحديثاتها الأمنية، أو إذا كان النظام يتطلب إشرافاً بشرياً (مثل القيادة الذاتية من المستوى الثالث) وأهمل تنبيهات تسليم القيادة وانشغل بالنوم أو استخدام الهاتف.\n\n3. خلاصة الإطار القانوني الناشئ:\n   - تتجه القوانين الحديثة إلى اعتبار السيارة ذاتية القيادة بالكامل (مستوى 4 و5) مسؤولية شركة التصنيع وشركات التأمين التجاري (Product Liability)، ما لم يثبت إهمال متعمد أو تعديل غير مصرح به من المالك.",
        "ideal_answer_en": "1. Manufacturer & Software Developers: Bear primary product liability if the collision resulted from sensor perception failures or flawed decision logic, as they certified system safety.\n2. Vehicle Owner / Operator: Bears liability if they ignored handover alerts (in semi-autonomous Level 3 systems), failed to perform mandatory firmware safety updates, or tampered with hardware.\n3. Emerging Consensus: Shift toward strict corporate product liability and specialized autonomous insurer pooling, treating autonomous systems as products rather than individual driver culpability.",
        "explanation_ar": "معضلة المساءلة وتوزيع المسؤولية بين الصانع والمطور والمالك في الحوادث الذاتية.",
        "explanation_en": "Accountability matrix in autonomous collisions: product liability vs human driver negligence."
    },
    {
        "id": "ws_ch1_4_w3",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Discuss the privacy risks of deploying AI Facial Recognition in public city spaces. Contrast the legitimate security benefits with civil liberty concerns regarding mass surveillance and tracking.",
        "question_ar": "ناقش مخاطر الخصوصية الناتجة عن نشر أنظمة التعرف على الوجه بالذكاء الاصطناعي في الأماكن العامة والمدن، موازناً بين الفوائد الأمنية المشروعة والمخاوف المتعلقة بالحريات المدنية والمراقبة الجماعية.",
        "ideal_answer_ar": "1. الفوائد الأمنية المشروعة:\n   - سرعة تعقب المجرمين الخطرين والمطلوبين أمنياً في المطارات ومحطات القطار.\n   - العثور على الأطفال والمفقودين بسرعة فائقة في الحشود الكبيرة وتأمين المنشآت الحيوية.\n\n2. المخاوف المتعلقة بالحريات والخصوصية:\n   - انتهاك الخصوصية والمراقبة الجماعية المستمرة (Mass Surveillance): تحويل المواطنين إلى مراقبين بشكل دائم في كل حركة دون إذنهم، مما يسلبهم حق 'عدم الكشف عن الهوية' (Anonymity) في الفضاء العام.\n   - التقييد النفسي لحرية التعبير والتجمع السلمي: خشية المواطنين من المشاركة في مظاهرات أو فعاليات خوفاً من تسجيل وجوههم في قواعد بيانات حكومية.\n   - خطر أخطاء التعرف الخاطئ (False Positives): تعرض أبرياء للاحتجاز الخاطئ بسبب نسب الخطأ، خاصة ضد الفئات الأقل تمثيلاً.\n\n3. التوازن المطلوب: تقييد استخدام التعرف على الوجوه بقرارات قضائية صارمة لأهداف محددة ومنع المراقبة الجماعية العشوائية المستمرة.",
        "ideal_answer_en": "1. Legitimate Security Benefits: Rapid interception of fugitive suspects at transit hubs and locating missing children in crowded venues.\n2. Civil Liberty & Privacy Risks:\n   - Omnipresent Mass Surveillance: Strips citizens of public anonymity, logging movement patterns into centralized tracking archives without consent.\n   - Chilling Effect: Inhibits freedom of assembly and speech due to fear of retaliatory surveillance.\n   - False Positive Hazards: Erroneous matches can subject innocent citizens to unlawful detention.\n3. Resolution: Strict warrant-based statutory limitations rather than blanket biometric scraping.",
        "explanation_ar": "الموازنة بين الدواعي الأمنية وحماية الخصوصية والحريات الفردية في أنظمة التعرف على الوجوه.",
        "explanation_en": "Facial recognition trade-offs: public safety vs civil liberties and mass surveillance."
    },
    {
        "id": "ws_ch1_4_w4",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain the concept of 'Explainable AI' (XAI) and why the lack of transparency in deep learning models creates serious ethical barriers in healthcare, judicial systems, and financial lending.",
        "question_ar": "اشرح مفهوم «الذكاء الاصطناعي القابل للتفسير» (Explainable AI - XAI)، وبيّن لماذا يشكل غياب الشفافية في نماذج التعلم العميق عائقاً أخلاقياً خطيراً في مجالات الصحة والقضاء والإقراض المصرفي.",
        "ideal_answer_ar": "1. مفهوم الذكاء الاصطناعي القابل للتفسير (XAI):\n   - هو مجموعة من الأساليب والتقنيات التي تهدف إلى جعل مخرجات وقرارات نماذج الذكاء الاصطناعي مفهومة وشفافة وقابلة للشرح المنطقي للمستخدمين والخبراء البشريين، بدلاً من بقائها 'صناديق سوداء'.\n\n2. لماذا يشكل غياب الشفافية عائقاً أخلاقياً خطيراً:\n   - في الرعاية الصحية: لا يمكن لطبيب أن يصف علاجاً كيميائياً أو يبتر طرفاً لمجرد أن الحاسوب قال ذلك دون معرفة الأساس الطبي والعلمي وراء القرار لتأكيده.\n   - في القضاء والعدالة الجنائية: يحرم غياب الشفافية المتهم من حقه في محاكمة عادلة؛ فالعدالة تقتضي معرفة الأدلة والأسباب التي بُني عليها تقييم خطورة المتهم.\n   - في الإقراض المصرفي: إذا رُفض قرض مواطن، يشترط القانون توضيح أسباب مالية محددة لتمكينه من تعديل وضعه، وإلا اعتُبر الرفض تمييزاً غير مبرر.\n\n3. الخلاصة: XAI شرط جوهري لبناء الثقة، وضمان المساءلة، ومنع الأخطاء الكارثية في المجالات الحيوية.",
        "ideal_answer_en": "1. Explainable AI (XAI) Definition: A domain of artificial intelligence ensuring machine decisions can be interpreted, traced, and understood by human specialists in plain terms.\n2. Ethical Impediments in Critical Sectors:\n   - Healthcare: Clinicians cannot prescribe radical therapies without understanding underlying biological biomarkers driving the AI diagnosis.\n   - Judicial System: Due process demands defendants understand the factual basis of predictive recidivism sentencing scores.\n   - Financial Lending: Refused borrowers hold a legal right to explicit financial justifications to contest discriminatory credit decisions.",
        "explanation_ar": "مفهوم XAI وضرورته الأخلاقية والقانونية في المجالات التي تؤثر على مصائر البشر.",
        "explanation_en": "Explainable AI (XAI) necessity across healthcare, legal, and financial domains."
    },
    {
        "id": "ws_ch1_4_w5",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Analyze the societal impact of 'Deepfakes' (synthetic media): describe how generative AI creates them, detail two major dangers they pose to democracy and personal security, and explain two defensive countermeasures.",
        "question_ar": "حلل الأثر المجتمعي لتقنية «التزييف العميق» (Deepfakes): اشرح كيف تنشئها تقنيات الذكاء التوليدي، وفصّل خطرين رئيسيين تشكلهما على الديمقراطية والأمن الشخصي، وبيّن وسيلتين للدفاع ومكافحتها.",
        "ideal_answer_ar": "1. كيف تنشأ تقنية التزييف العميق (Deepfakes):\n   - تعتمد على نماذج التعلم العميق التوليدية (مثل شبكات الخصومة التوليدية GANs ونماذج الانتشار)، حيث تتدرب الشبكة على آلاف الصور والتسجيلات الصوتية لشخصية معينة، ثم تركب حركات وجهها ونبرة صوتها بدقة متناهية على فيديو لشخص آخر، لتبدو كأنها تتحدث أو تتصرف في مواقف وهمية.\n\n2. خطران رئيسيان:\n   - تهديد الديمقراطية والاستقرار السياسي: تزييف تصريحات لزعماء وقادة سياسيين قبل ساعات من الانتخابات، أو إشعال فتنة طائفية وأزمات دبلوماسية عبر مقاطع مصطنعة تضلل الرأي العام.\n   - تدمير السمعة الشخصية والابتزاز الإلكتروني: استهداف الأفراد العاديين والشخصيات العامة بتركيب صور وفيديوهات مخلة أو احتيالية لابتزازهم مالياً ونفسياً.\n\n3. وسيلتان للدفاع والمكافحة:\n   - أدوات التحقق الجنائي الرقمي بالذكاء الاصطناعي: برمجيات ترصد أدق التشوهات غير المرئية بالعين (كرمشات العين غير الطبيعية وانعكاسات الضوء على حدقة العين وتفاوت تزامن الصوت مع حركة الشفاه).\n   - التشريعات والتوعية الرقمية: سن قوانين تجرّم إنتاج ونشر التزييف العميق غير المصرح به، ونشر الوعي النقدي للتحقق من مصادر الأخبار.",
        "ideal_answer_en": "1. Generation Mechanism: Generative neural networks (such as GANs) learn facial geometries and voice acoustic footprints, mapping them seamlessly onto actor bodies to fabricate photorealistic videos.\n2. Two Primary Dangers:\n   - Democratic Subversion: Election tampering via deceptive synthetic speeches fabricated to manipulate voters right before polling.\n   - Extortion & Defamation: Malicious fabrication of non-consensual defamatory imagery for financial or psychological blackmail.\n3. Countermeasures:\n   - Forensic AI Detection: Algorithms scanning for micro-inconsistencies (unnatural blinking patterns, lighting mismatch, lip-sync latency).\n   - Legal Criminalization & Provenance Standards: Enacting strict punitive statutes and implementing cryptographic digital media watermarking.",
        "explanation_ar": "تقنية التزييف العميق ومخاطرها على الديمقراطية والأفراد واستراتيجيات التحقق والمكافحة.",
        "explanation_en": "Deepfakes: synthesis mechanics, threats to democracy/personal safety, and forensic countermeasures."
    },
    {
        "id": "ws_ch1_4_w6",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Examine the economic challenge of 'Job Displacement' caused by AI automation. Contrast the roles vulnerable to replacement versus roles resistant to automation, and outline two policies governments should implement to support affected workers.",
        "question_ar": "ناقش التحدي الاقتصادي لـ «إزاحة الوظائف» (Job Displacement) الناتج عن أتمتة الذكاء الاصطناعي: قارن بين الوظائف المعرضة للاندثار وتلك المقاومة للأتمتة، واقترح سياستين حكوميتين لدعم العمال المتأثرين.",
        "ideal_answer_ar": "1. مقارنة الوظائف:\n   - الوظائف المعرضة للاندثار: الوظائف الروتينية المتكررة القائمة على قواعد واضحة أو معالجة البيانات القياسية (مثل: إدخال البيانات، المحاسبة الدفترية البسيطة، خدمة العملاء النصية الأولية، موظفو الأكشاك والتجميع في المصانع).\n   - الوظائف المقاومة للأتمتة: الوظائف التي تتطلب إبداعاً معقداً، وتفكيراً استراتيجياً نقدياً، وذكاءً عاطفياً وتفاعلاً إنسانياً عميقاً (مثل: الأطباء النفسيين والجراحين، المعلمين والمربين، القادة الاستراتيجيين، والأخصائيين الاجتماعيين).\n\n2. سياستان حكوميتان لدعم العمال:\n   - برامج إعادة التدريب والتأهيل المهني (Reskilling & Upskilling Initiatives): تمويل برامج وطنية مجانية لتدريب العمال المسرحين على مهارات الاقتصاد الرقمي ومهارات التعامل مع أدوات الذكاء الاصطناعي كأدوات مساعدة.\n   - شبكات الأمان الاجتماعي والانتقال الوظيفي: تقديم إعانات بطالة مؤقتة وتسهيلات لإنشاء مشاريع صغيرة ريادية لتيسير الانتقال الوظيفي السلس دون سقوط الفئات الضعيفة في الفقر.",
        "ideal_answer_en": "1. Job Categories Contrast:\n   - High Vulnerability: Repetitive, structured, rule-based roles (data entry clerks, routine bookkeepers, tier-1 customer helpdesks, assembly line laborers).\n   - High Resilience: Roles demanding deep human empathy, strategic creativity, and complex physical dexterity (psychologists, educators, surgeons, creative leaders).\n2. Two Government Policies:\n   - National Reskilling Programs: Subsidizing technical transition education in digital economy skills.\n   - Transition Social Safety Nets: Unemployment transition bridges and small business grants to avert structural poverty.",
        "explanation_ar": "إزاحة الوظائف بالأتمتة: تصنيف الوظائف المعرضة والمقاومة، والسياسات المجتمعية للحماية.",
        "explanation_en": "Job displacement: vulnerable vs resilient careers and government reskilling safety nets."
    },
    {
        "id": "ws_ch1_4_w7",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "A hiring firm deployed an AI software that evaluated video interviews by analyzing candidates' facial micro-expressions. Studies later revealed the system systematically penalized non-native speakers. Detail how this violates both 'Fairness' and 'Scientific Validity'.",
        "question_ar": "استخدمت شركة توظيف نظام ذكاء اصطناعي لتقييم مقابلات الفيديو عبر تحليل تعبيرات الوجه الدقيقة للمتقدمين، وأظهرت الدراسات لاحقاً أن النظام كان يقلل درجات المتقدمين الذين لا يتحدثون لغتهم الأم بطلاقة. وضّح كيف ينتهك هذا كلاً من مبدأ «العدالة» ومبدأ «الصلاحية العلمية».",
        "ideal_answer_ar": "1. انتهاك مبدأ العدالة (Fairness):\n   - يعاقب النظام المتقدمين بناءً على لهجتهم أو توترهم الطبيعي كغير ناطقين باللغة الأم، وهي خصائص ديمغرافية وثقافية لا علاقة لها بكفاءتهم الوظيفية الحقيقية (مثل مهارات البرمجة أو التحليل المالي)، مما يمثل تمييزاً مجحفاً ضد الأقليات والمغتربين.\n\n2. انتهاك مبدأ الصلاحية العلمية (Scientific Validity):\n   - تعبيرات الوجه وحركات العيون والتوتر اللحظي ليست مؤشرات علمية موثوقة على الذكاء، أو الأمانة، أو الكفاءة المهنية؛ فالأبحاث النفسية تثبت أن التعبيرات تختلف جذرياً باختلاف الثقافات والمواقف.\n   - بناء قرار وظيفي مصيري على خوارزمية تفتقر للدقة العلمية هو ممارسة زائفة تقنياً وأخلاقياً تظلم الكفاءات وتضر بالمؤسسة.",
        "ideal_answer_en": "1. Violation of Fairness: Systematically penalizes non-native speakers for linguistic accent or cultural facial variations entirely unrelated to actual job performance, reinforcing xenophobic discrimination.\n2. Violation of Scientific Validity: Pseudoscience of inferring competence or character from brief facial micro-expressions lacks verified psychological basis, as stress responses vary widely across cultures.",
        "explanation_ar": "انتهاك العدالة والاعتماد على مؤشرات غير علمية زائفة في أنظمة التوظيف بالذكاء الاصطناعي.",
        "explanation_en": "Ethical critique of video AI hiring tools: fairness violation and psychological invalidity."
    },
    {
        "id": "ws_ch1_4_w8",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Outline four fundamental pillars that must be incorporated into an organization's 'AI Code of Ethics' before deploying internal machine learning models.",
        "question_ar": "حدّد أربعة أركان أساسية يجب تضمينها في «ميثاق أخلاقيات الذكاء الاصطناعي» لأي مؤسسة قبل الشروع في استخدام ونشر نماذج تعلم الآلة داخلياً.",
        "ideal_answer_ar": "الأركان الأربعة الأساسية للميثاق الأخلاقي:\n1. العدالة وعدم التمييز (Fairness & Non-Discrimination):\n   - الالتزام بالتدقيق المستمر لبيانات التدريب والخوارزميات لمنع أي تحيز ضد أي فئة على أساس الجنس أو العرق أو الدين أو المستوى الاجتماعي.\n2. الخصوصية وحماية البيانات (Privacy & Data Governance):\n   - احترام خصوصية العملاء والموظفين، والحصول على موافقتهم المستنيرة، وتشفير البيانات، والامتثال لقوانين حماية البيانات.\n3. الشفافية وقابلية التفسير (Transparency & Explainability):\n   - توفير آليات واضحة لشرح كيفية اتخاذ النماذج لقراراتها، وعدم استخدام أنظمة الصندوق الأسود المغلقة في القرارات المؤثرة على الأفراد.\n4. المساءلة والرقابة البشرية (Accountability & Human-in-the-Loop):\n   - تحديد المسؤول البشري عن كل نظام ذكي بوضوح، مع ضمان وجود إشراف بشري قادر على مراجعة أو تعديل أو إلغاء القرارات المؤتمتة عند وقوع خطأ.",
        "ideal_answer_en": "Four Fundamental Pillars:\n1. Fairness & Non-Discrimination: Mandatory dataset auditing to eliminate demographic, gender, and racial biases.\n2. Privacy & Data Governance: Rigorous encryption, informed user consent, and minimization of retained personal data.\n3. Transparency & Explainability: Documented model decision rationale, avoiding opaque black-box systems in life-critical outcomes.\n4. Accountability & Human Oversight: Clear human managerial responsibility with override authority over autonomous suggestions.",
        "explanation_ar": "الأركان الأربعة لحوكمة وأخلاقيات الذكاء الاصطناعي المؤسسي (العدالة، الخصوصية، الشفافية، المساءلة).",
        "explanation_en": "Four pillars of ethical AI governance: Fairness, Privacy, Transparency, and Accountability."
    },
    {
        "id": "ws_ch1_4_w9",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Explain why children's data privacy requires heightened ethical and legal protection when designing AI educational applications and smart toys.",
        "question_ar": "علل: لماذا تتطلب خصوصية بيانات الأطفال حماية أخلاقية وقانونية مشددة واستثنائية عند تصميم تطبيقات الذكاء الاصطناعي التعليمية والألعاب الذكية؟",
        "ideal_answer_ar": "أسباب الحماية المشددة لبيانات الأطفال:\n1. عدم اكتمال الإدراك والموافقة غير المستنيرة:\n   - الأطفال غير قادرين قانونياً ونفسياً على فهم مخاطر جمع بياناتهم، أو تتبع مواقعهم، أو تسجيل أصواتهم ووجوههم، ولا يدركون عواقب مشاركتها.\n2. الحماية من الاستغلال التجاري والتوجيه السلوكي:\n   - استغلال خوارزميات الذكاء الاصطناعي لمعرفة نقاط ضعف الطفل ونزواته لتوجيه إعلانات مستهدفة ومحتوى إدماني يضر بنموه النفسي والاجتماعي.\n3. خطورة الأثر الدائم للسجلات الرقمية:\n   - جمع سجلات سلوكية ومعلومات شخصية عن الطفل في سن مبكرة قد يلازمه كـ 'بصمة رقمية' تؤثر على مستقبله الدراسي والمهني والاجتماعي لاحقاً.\n4. الإجراء المطلوب: حظر جمع القياسات الحيوية للأطفال أو مشاركتها، واشتراط موافقة صريحة من ولي الأمر وتشفير البيانات بالكامل.",
        "ideal_answer_en": "1. Inability to Grant Informed Consent: Minors lack developmental maturity to comprehend surveillance hazards or data tracking implications.\n2. Vulnerability to Behavioral Exploitation: AI algorithms can exploit developmental vulnerabilities to create addictive consumption loops and aggressive commercial marketing.\n3. Lifelong Digital Burden: Premature biometric and psychometric logging risks branding a child with indelible algorithmic profiles compromising future adulthood opportunities.\n4. Required Safeguards: Total prohibition on commercial profiling, mandatory parental consent, and end-to-end data sanitization.",
        "explanation_ar": "خصوصية بيانات الأطفال وحمايتهم من الاستغلال التجاري والأثر الدائم للبصمة الرقمية.",
        "explanation_en": "Children's AI data privacy: lack of consent capacity, behavioral vulnerability, and lifetime data risks."
    },
    {
        "id": "ws_ch1_4_w10",
        "lesson": "1-4", "unit": "1", "type": "WRITTEN", "difficulty": "HARD", "source": "CLASSROOM",
        "question_en": "Synthesize the overarching goal of AI Ethics: explain why ethics is not an impediment to technological innovation, but an essential catalyst for long-term sustainable AI adoption.",
        "question_ar": "استخلص الهدف الأسمى لأخلاقيات الذكاء الاصطناعي: وضّح لماذا لا تُعد الأخلاقيات عائقاً أمام الابتكار التقني، بل هي في الحقيقة الركيزة الأساسية لضمان استدامة وتبني التكنولوجيا على المدى الطويل.",
        "ideal_answer_ar": "1. الهدف الأسمى لأخلاقيات الذكاء الاصطناعي:\n   - ضمان أن يظل التطور التكنولوجي في خدمة الإنسان ورفاهية المجتمع، مع تعزيز العدالة، والحرية، وحماية الكرامة الإنسانية.\n\n2. لماذا الأخلاقيات ليست عائقاً بل محفزاً للابتكار:\n   - بناء الثقة المجتمعية (Public Trust): بدون الثقة في أمان وعدالة أنظمة الذكاء الاصطناعي، سيرفضها الجمهور والمؤسسات وتتعرض لحظر قانوني ومقاطعة مجتمعية، مما يقضي على الابتكار.\n   - توجيه الابتكار نحو حلول موثوقة وعالية الجودة: الضوابط الأخلاقية تدفع المهندسين لابتكار خوارزميات أكثر دقة، وأماناً، وقابلية للتفسير (Robustness & Explainability)، مما يمنع الأخطاء الكارثية التي قد تكلف الشركات سمعتها ومليارات الجنيهات.\n   - الاستدامة القانونية والتجارية: الأنظمة المصممة وفق معايير أخلاقية تكون جاهزة للتوافق مع القوانين والتشريعات العالمية الصارمة، مما يضمن استمرارها وريادتها في الأسواق.",
        "ideal_answer_en": "1. Overarching Mission: Aligning technological power with universal human dignity, equity, and societal flourishing.\n2. Ethics as an Innovation Enabler (not impediment):\n   - Fostering Public Trust: Untrustworthy, biased, or hazardous systems provoke consumer rejection and regulatory bans, crippling adoption.\n   - Engineering Excellence: Ethical constraints compel developers to architect mathematically robust, transparent, and resilient models rather than brittle black boxes.\n   - Long-Term Regulatory Viability: Ethically aligned systems seamlessly comply with evolving international laws, ensuring commercial longevity.",
        "explanation_ar": "الرؤية الشاملة لأخلاقيات الذكاء الاصطناعي كضامن للثقة العامة واستدامة الابتكار التكنولوجي.",
        "explanation_en": "Ethics as a catalyst for sustainable innovation, public trust, and long-term tech adoption."
    }
]

questions.extend(mcq_1_4)
questions.extend(written_1_4)

print(f"Total questions generated: {len(questions)}")
mcq_count = len([q for q in questions if q['type'] == 'MCQ'])
written_count = len([q for q in questions if q['type'] == 'WRITTEN'])
print(f"MCQs: {mcq_count}, Written: {written_count}")

# Generate TypeScript file
ts_code = """import type { QuizQuestion } from './courseData';

/**
 * CHAPTER 1 — COMPREHENSIVE WORKSHOP & PRACTICE QUESTIONS (ورشة حل وتدريبات الشابتر الأول)
 * 
 * Total: 80 Questions
 * - 40 Scenario-based / Deep MCQs (10 per lesson)
 * - 40 Analytical & Problem-Solving Written Questions (10 per lesson)
 * 
 * Strictly mapped to the Egyptian Baccalaureate curriculum (Grade 11 - Semester 1):
 * - Lesson 1-1: Development of IT & Social Transformation
 * - Lesson 1-2: How Artificial Intelligence Works
 * - Lesson 1-3: AI in Daily Life & Industry
 * - Lesson 1-4: AI Ethics & Societal Impact
 */
export const CHAPTER1_WORKSHOP_QUESTIONS: QuizQuestion[] = """ + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n"

with open("frontend/src/chapter1WorkshopQuestions.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Saved frontend/src/chapter1WorkshopQuestions.ts successfully!")
