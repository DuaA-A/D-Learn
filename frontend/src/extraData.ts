import type { QuizQuestion } from './courseData';

// All out-of-syllabus extra questions removed in accordance with Egyptian Baccalaureate curriculum
export const EXTRA_QUESTIONS: QuizQuestion[] = [];

export const FLASHCARDS: Record<string, { front_en: string; front_ar: string; back_en: string; back_ar: string }[]> = {
  "1-1": [
    {
      front_en: "Moore's Law",
      front_ar: "قانون مور",
      back_en: "Observation that the number of transistors on an integrated circuit doubles approximately every two years.",
      back_ar: "ملاحظة تجريبية تفيد بأن عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريباً كل عامين مع انخفاض التكلفة."
    },
    {
      front_en: "Edge Computing",
      front_ar: "الحوسبة الطرفية",
      back_en: "Processing data locally on the device itself in real time instead of sending it to the cloud.",
      back_ar: "معالجة البيانات محلياً على الجهاز نفسه بصورة فورية ولحظية بدلاً من إرسالها إلى السحابة."
    },
    {
      front_en: "Quantum Superposition & Qubit",
      front_ar: "التراكب الكمي والكيوبت",
      back_en: "A qubit can represent both 0 and 1 simultaneously thanks to quantum superposition, unlike binary classical bits.",
      back_ar: "يمكن للكيوبت بفضل التراكب الكمي أن يمثل حالتي (0) و(1) معاً في نفس الوقت، بخلاف البت الكلاسيكي الثنائي."
    },
    {
      front_en: "Societal Transformations",
      front_ar: "التحولات المجتمعية لتكنولوجيا المعلومات",
      back_en: "Key shifts include SNS, E-commerce, Remote Work, Online Learning, and Cashless Payments.",
      back_ar: "تشمل: شبكات التواصل الاجتماعي، التجارة الإلكترونية، العمل عن بُعد، التعلم عبر الإنترنت، والدفع غير النقدي."
    }
  ],
  "1-2": [
    {
      front_en: "Narrow AI vs. General AI",
      front_ar: "الذكاء الاصطناعي الضيق مقابل العام",
      back_en: "Narrow AI excels at a single specific task (most current AI). General AI (AGI) is hypothetical human-level synthetic intellect.",
      back_ar: "الذكاء الضيق متخصص في أداء مهمة محددة بكفاءة (الأنظمة الحالية). الذكاء العام يحاكي القدرات الإدراكية البشرية الشاملة."
    },
    {
      front_en: "Deep Learning (DL)",
      front_ar: "التعلم العميق",
      back_en: "A subset of ML based on multi-layered artificial neural networks (Input, Hidden, Output layers) for complex pattern recognition.",
      back_ar: "فرع من تعلم الآلة يعتمد على شبكات عصبية اصطناعية متعددة الطبقات لاستخراج الأنماط المعقدة مثل تحليل الصور والكلام."
    },
    {
      front_en: "Generative AI (GenAI)",
      front_ar: "الذكاء الاصطناعي التوليدي",
      back_en: "AI systems that generate novel content (text, image, audio, video) based on learned patterns from training data.",
      back_ar: "أنظمة ذكاء اصطناعي تستخدم التعلم العميق لتوليد محتوى جديد أصيل (نصوص، صور، أصوات) بناءً على بيانات التدريب."
    },
    {
      front_en: "AI Hallucination",
      front_ar: "ظاهرة الهلوسة في الذكاء التوليدي",
      back_en: "When generative AI produces plausible-sounding statements that are factually incorrect; requires independent verification.",
      back_ar: "توليد النموذج لنصوص تبدو منطقية ومقنعة ولكنها غير صحيحة علمياً أو واقعياً؛ مما يوجب التحقق الدائم من المصادر الموثوقة."
    }
  ],
  "1-3": [
    {
      front_en: "Recommendation Systems",
      front_ar: "أنظمة التوصية",
      back_en: "Systems that predict user preferences from behavioral patterns (e.g. streaming, e-commerce).",
      back_ar: "أنظمة تتوقع تفضيلات المستخدم بناءً على سلوكه السابق واهتماماته في منصات البث والتسوق."
    },
    {
      front_en: "Industrial AI Applications",
      front_ar: "تطبيقات الذكاء الاصطناعي في الصناعة",
      back_en: "Healthcare (imaging diagnostics), Agriculture (pest detection, harvest timing), Manufacturing (predictive maintenance), Logistics (route optimization).",
      back_ar: "الرعاية الصحية (تشخيص صور الأشعة)، الزراعة (اكتشاف الآفات ومواعيد الحصاد)، التصنيع (الصيانة التنبؤية)، واللوجستيات (تحسين المسارات)."
    },
    {
      front_en: "AI Strengths",
      front_ar: "ما يجيده الذكاء الاصطناعي",
      back_en: "Extracting complex data patterns, recognizing/generating multimodal media, probabilistic reasoning.",
      back_ar: "استخراج الأنماط المعقدة، التعرف على الصور والأصوات وتوليدها، والاستدلال الاحتمالي المبني على البيانات."
    },
    {
      front_en: "Cautions in AI Usage",
      front_ar: "محاذير استخدام الذكاء الاصطناعي",
      back_en: "Ethical judgments, privacy risks, final critical decisions, biased training data, copyright issues, and black-box opacity.",
      back_ar: "الأحكام الأخلاقية، الخصوصية، اتخاذ القرار النهائي، تحيز بيانات التدريب، حقوق الملكية الفكرية، ومشكلة الصندوق الأسود."
    }
  ],
  "1-4": [
    {
      front_en: "Algorithmic Bias",
      front_ar: "التحيز الخوارزمي",
      back_en: "Unfair or discriminatory outputs caused by unrepresentative training data or flawed algorithmic design.",
      back_ar: "نمط في مخرجات النظام يؤدي إلى نتائج غير عادلة أو تمييزية، ينشأ من بيانات تدريب غير ممثلة أو عيوب في التصميم."
    },
    {
      front_en: "Explainable AI (XAI)",
      front_ar: "الذكاء الاصطناعي القابل للتفسير (XAI)",
      back_en: "Techniques enabling humans to understand how an AI reached its decision, overcoming the 'Black Box' problem.",
      back_ar: "تقنيات تتيح للبشر فهم أسباب وكيفية وصول الذكاء الاصطناعي إلى قراره، لمعالجة مشكلة 'الصندوق الأسود'."
    },
    {
      front_en: "Responsibility vs. Accountability",
      front_ar: "المسؤولية والمساءلة",
      back_en: "Responsibility defines role obligations (developer, operator, user); Accountability determines who answers for errors.",
      back_ar: "المسؤولية تحدد واجبات كل طرف (المطور، المشغل، المستخدم)، بينما المساءلة تعني إمكانية المحاسبة عن القرارات والآثار."
    },
    {
      front_en: "Four Principles of AI Ethics",
      front_ar: "المبادئ الأربعة لأخلاقيات الذكاء الاصطناعي",
      back_en: "1. Fairness (non-discrimination), 2. Transparency (clear workings), 3. Privacy Protection, 4. Accountability.",
      back_ar: "1. العدالة (عدم التمييز ظلماً)، 2. الشفافية (وضوح النظام وحدوده)، 3. حماية الخصوصية (أمان البيانات الشخصية)، 4. المساءلة."
    }
  ]
};
