// =============================================
// D-LEARN FULL COURSE CONTENT
// Egyptian Baccalaureate — Programming & Artificial Intelligence
// Grade 11 (2nd Year Secondary) — Semester 1
// Source: Ministry of Education & Technical Education — International Baccalaureate Collaboration
// =============================================

import { OFFICIAL_ASSESSMENTS_L3 } from './officialAssessments_Lesson3';
import { OFFICIAL_ASSESSMENTS_L4 } from './officialAssessments_Lesson4';

export const COURSE_METADATA = {
  course_name_en: "Programming and Artificial Intelligence",
  course_name_ar: "البرمجة والذكاء الاصطناعي",
  grade_en: "Egyptian Baccalaureate — 2nd Year (Grade 11)",
  grade_ar: "البكالوريا المصرية — الصف الثاني الثانوي",
  semester_en: "First Semester",
  semester_ar: "الفصل الدراسي الأول",
  publisher_en: "Ministry of Education and Technical Education — International Baccalaureate® Collaboration",
  publisher_ar: "وزارة التربية والتعليم والتعليم الفني — بالتعاون مع البكالوريا الدولية",
  year: "2026",
};

export interface Lesson {
  id: string;
  unit: number;
  lesson_number: string;
  title_en: string;
  title_ar: string;
  learning_objectives_en: string[];
  learning_objectives_ar: string[];
  key_terms: { term_en: string; term_ar: string; def_en: string; def_ar: string }[];
  sections: {
    heading_en: string;
    heading_ar: string;
    content_en: string;
    content_ar: string;
    key_points?: string[];
    examples?: string[];
  }[];
  pause_and_think: { q_en: string; q_ar: string }[];
  exam_style_questions: { q_en: string; q_ar: string; type: "MCQ" | "WRITTEN" }[];
}

export const LESSONS: Lesson[] = [
  // ==================== UNIT 1 ====================
  {
    id: "1-1",
    unit: 1,
    lesson_number: "1-1",
    title_en: "Development of Information Technology and Social Transformation",
    title_ar: "تطور تكنولوجيا المعلومات والتحول الاجتماعي",
    learning_objectives_en: [
      "Explain the major stages in the development of information technology and their impact on society.",
      "Give examples of social changes and emerging technologies brought about by information technology, and explain their characteristics.",
    ],
    learning_objectives_ar: [
      "شرح المراحل الرئيسية في تطور تكنولوجيا المعلومات وأثرها على المجتمع.",
      "إعطاء أمثلة على التحولات الاجتماعية والتقنيات الناشئة التي أحدثتها تكنولوجيا المعلومات وشرح خصائصها.",
    ],
    key_terms: [
      {
        term_en: "Moore's Law",
        term_ar: "قانون مور",
        def_en: "The empirical observation that the number of transistors on an integrated circuit doubles approximately every two years.",
        def_ar: "الملاحظة التجريبية القائلة بأن عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريبًا كل عامين.",
      },
      {
        term_en: "SNS (Social Networking Service)",
        term_ar: "شبكات التواصل الاجتماعي",
        def_en: "Services that allow users to connect with each other and post and share information. They are highly effective at spreading information rapidly.",
        def_ar: "خدمات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته بسرعة. فعالة جداً في نشر المعلومات بسرعة.",
      },
      {
        term_en: "E-commerce (EC)",
        term_ar: "التجارة الإلكترونية",
        def_en: "Buying and selling goods and services through the Internet. e.g., Amazon, eBay.",
        def_ar: "شراء وبيع السلع والخدمات عبر الإنترنت. مثل: Amazon وeBay.",
      },
      {
        term_en: "Remote Work",
        term_ar: "العمل عن بُعد",
        def_en: "A working style in which work is performed from home or other remote locations using the Internet.",
        def_ar: "أسلوب عمل يؤدي فيه الشخص مهامه من المنزل أو من موقع آخر بعيد باستخدام الإنترنت.",
      },
      {
        term_en: "Online Learning",
        term_ar: "التعلم عبر الإنترنت",
        def_en: "A learning style in which classes and study materials are delivered using the Internet.",
        def_ar: "أسلوب تعليمي تُقدم فيه الدروس والمواد الدراسية عبر الإنترنت.",
      },
      {
        term_en: "Cashless Payment",
        term_ar: "الدفع غير النقدي",
        def_en: "A system for making payments using electronic money, QR codes, etc., without using cash. e.g., credit cards, debit cards, mobile payment apps.",
        def_ar: "نظام لإجراء المدفوعات باستخدام النقود الإلكترونية أو رموز QR وغيرها دون استخدام النقد. مثل: بطاقات الائتمان، تطبيقات الدفع عبر الهاتف.",
      },
      {
        term_en: "Edge Computing",
        term_ar: "الحوسبة الطرفية",
        def_en: "Processing data on the device itself, instantly, instead of sending it to the cloud.",
        def_ar: "معالجة البيانات على الجهاز نفسه فورًا، بدلاً من إرسالها إلى السحابة.",
      },
      {
        term_en: "Cloud Computing",
        term_ar: "الحوسبة السحابية",
        def_en: "IT delivered as a service over the Internet, enabling large-scale data analysis and AI.",
        def_ar: "تكنولوجيا المعلومات المُقدَّمة كخدمة عبر الإنترنت، مما يُتيح تحليل البيانات الضخمة والذكاء الاصطناعي.",
      },
    ],
    sections: [
      {
        heading_en: "1. The History of Information Technology (IT)",
        heading_ar: "1. تاريخ تكنولوجيا المعلومات",
        content_en: `Information technology has developed through a series of stages — from the first computers to cloud computing — and at each stage it has changed the way people communicate, work, learn, and pay.

On an ordinary day, a student in Egypt checks messages on an SNS app, pays for breakfast with a cashless app, joins a lesson through online learning, and orders a book from an e-commerce shop. Twenty years ago, most of this was not possible.

**The Major Stages of IT Development:**

| Time Period | Major Technologies & Events | Impact on Society |
|---|---|---|
| 1940s–60s | Birth of the computer (ENIAC, vacuum tubes) | Mainly used for military and scientific computation |
| 1970s–80s | Spread of personal computers (PCs) | Beginning of personal computer use |
| 1990s | Commercialization of the Internet; the Web | Globalization of information; spread of email |
| 2000s | Rise of smartphones (iPhone, etc.) | Explosive spread of mobile Internet |
| 2010s onward | Spread of cloud computing | Large-scale data analysis and AI; "IT as a service" becomes widespread |

**Key Fact:** At each stage, information technology introduced a new technology or service and also changed how society communicates, works, and does business.`,
        content_ar: `تطورت تكنولوجيا المعلومات عبر سلسلة من المراحل، من أولى الحاسبات حتى الحوسبة السحابية، وفي كل مرحلة غيّرت طريقة تواصل الناس وعملهم وتعلمهم ودفعهم.

في يوم عادي، يتحقق طالب في مصر من رسائله عبر تطبيق شبكة التواصل الاجتماعي، ويدفع ثمن إفطاره بتطبيق دفع غير نقدي، ويشارك في درس عبر الإنترنت، ويطلب كتابًا من متجر إلكتروني. قبل عشرين عامًا، لم يكن معظم هذا ممكنًا.

**المراحل الرئيسية لتطور تكنولوجيا المعلومات:**

| الفترة الزمنية | التقنيات والأحداث الرئيسية | الأثر على المجتمع |
|---|---|---|
| الأربعينيات–الستينيات | ظهور الحاسوب (ENIAC، الصمامات المفرغة) | استُخدم أساسًا في الحسابات العسكرية والعلمية |
| السبعينيات–الثمانينيات | انتشار الحواسيب الشخصية (PCs) | بداية الاستخدام الشخصي للحاسوب |
| التسعينيات | تجاري الإنترنت؛ الويب | عولمة المعلومات؛ انتشار البريد الإلكتروني |
| الألفينيات | صعود الهواتف الذكية (iPhone وغيره) | الانتشار الهائل للإنترنت المحمول |
| من العقد الثاني من الألفية | انتشار الحوسبة السحابية | تحليل البيانات الضخمة والذكاء الاصطناعي؛ "تكنولوجيا المعلومات كخدمة" |

**حقيقة مهمة:** في كل مرحلة، قدّمت تكنولوجيا المعلومات تقنية أو خدمة جديدة، كما غيّرت أسلوب تواصل المجتمع وعمله وأعماله.`,
      },
      {
        heading_en: "2. Moore's Law",
        heading_ar: "2. قانون مور",
        content_en: `Moore's Law is the empirical observation that "the number of transistors on an integrated circuit doubles approximately every two years." This remained largely accurate for many years, and computing power increased dramatically.

However, in recent years, miniaturization of transistors has been approaching a physical limit. If circuits are made any smaller, problems arise such as:
- **The quantum tunneling effect:** electrons slip through barriers
- **Leakage current:** current escapes unintentionally

These problems make it difficult to achieve both higher performance and lower power consumption at the same time. In response, new directions for performance improvement are being pursued:
- **Parallel processing** using multiple processor cores
- **Quantum computers** based on the principles of quantum mechanics`,
        content_ar: `قانون مور هو الملاحظة التجريبية القائلة بأن "عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريبًا كل عامين". ظلّ هذا القانون دقيقًا إلى حدٍّ بعيد لسنوات طويلة، مما أدى إلى زيادة هائلة في قدرة الحوسبة.

غير أن تصغير الترانزستورات في السنوات الأخيرة بات يقترب من حدٍّ فيزيائي. إذا صُغِّرت الدوائر أكثر، تظهر مشكلات مثل:
- **تأثير النفق الكمومي:** تتسلل الإلكترونات عبر الحواجز
- **تيار التسرب:** يتسرب التيار بشكل غير مقصود

تُصعّب هذه المشكلات تحقيق أداء أعلى واستهلاك طاقة أقل في آنٍ واحد. لذلك يُجرى البحث في اتجاهات جديدة لتحسين الأداء:
- **المعالجة المتوازية** باستخدام نوى معالج متعددة
- **الحواسيب الكمومية** المستندة إلى مبادئ ميكانيكا الكم`,
      },
      {
        heading_en: "3. Social Changes Resulting from Information Technology",
        heading_ar: "3. التحولات الاجتماعية الناتجة عن تكنولوجيا المعلومات",
        content_en: `Five major social changes have been driven by information technology:

**1. SNS (Social Networking Service)**
Services that allow users to connect with each other and post and share information. They are highly effective at spreading information rapidly. Examples: Facebook, Twitter/X, Instagram, TikTok.

**2. E-commerce (EC)**
Buying and selling goods and services through the Internet.
Examples: Online shops such as Amazon and eBay.

**3. Remote Work**
A working style in which work is performed from home or other remote locations using the Internet. Also called telecommuting.

**4. Online Learning**
A learning style in which classes and study materials are delivered using the Internet. Examples: Coursera, Khan Academy, this very platform!

**5. Cashless Payment**
A system for making payments using electronic money, QR codes, etc., without using cash. Examples: credit cards, debit cards, mobile payment apps like Apple Pay.`,
        content_ar: `خمسة تحولات اجتماعية رئيسية أحدثتها تكنولوجيا المعلومات:

**1. شبكات التواصل الاجتماعي (SNS)**
خدمات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته. فعالة جداً في نشر المعلومات بسرعة. أمثلة: فيسبوك، تويتر/X، إنستغرام، تيك توك.

**2. التجارة الإلكترونية (EC)**
شراء وبيع السلع والخدمات عبر الإنترنت.
أمثلة: المتاجر الإلكترونية مثل Amazon وeBay.

**3. العمل عن بُعد**
أسلوب عمل يؤدي فيه الشخص مهامه من المنزل أو من موقع آخر بعيد باستخدام الإنترنت. يُعرف أيضًا بالعمل عن بُعد.

**4. التعلم عبر الإنترنت**
أسلوب تعليمي تُقدَّم فيه الدروس والمواد الدراسية عبر الإنترنت. أمثلة: Coursera، Khan Academy، هذه المنصة بالذات!

**5. الدفع غير النقدي**
نظام لإجراء المدفوعات باستخدام النقود الإلكترونية أو رموز QR وغيرها دون استخدام النقد. أمثلة: بطاقات الائتمان والخصم، تطبيقات الدفع عبر الهاتف مثل Apple Pay.`,
      },
      {
        heading_en: "4. Notable Emerging Technologies",
        heading_ar: "4. التقنيات الناشئة البارزة",
        content_en: `Three emerging technologies are reshaping our world:

**1. Autonomous Driving**
A technology that uses AI to drive a vehicle without human operation. It uses cameras and sensors to recognize the surroundings, makes driving decisions, and controls the vehicle.

⚡ **Why Edge Computing matters here:** Because a delay of even 0.1 seconds can lead to an accident, edge computing (processing performed instantly on the vehicle itself rather than sending data to the cloud) is used. This ensures zero-latency decision making.

**2. AR / VR**
- **AR (Augmented Reality):** A technology that overlays digital information on real-world images. Example: apps that show furniture in your room before you buy it, or navigation arrows overlaid on the road.
- **VR (Virtual Reality):** A technology that allows users to immerse themselves in a virtual space generated by a computer. Used in gaming, training simulations, virtual tours.

**Key Difference:** AR adds digital layers to the real world; VR replaces it with a virtual one entirely.

**3. Quantum Computing**
A technology expected to dramatically speed up computations that are difficult or impossible for traditional computers, by using the principles of quantum mechanics.

- **Classical bit:** holds one definite state — either 0 or 1 at any given time.
- **Qubit (quantum bit):** uses the principle of superposition — can be a mixture of 0 and 1 at the same time.

This gives quantum computers the potential to process vast amounts of information simultaneously, solving problems that would take ordinary computers thousands of years.`,
        content_ar: `ثلاث تقنيات ناشئة تُعيد تشكيل عالمنا:

**1. القيادة الذاتية**
تقنية تستخدم الذكاء الاصطناعي لقيادة المركبة دون تدخل بشري. تستخدم الكاميرات والمستشعرات لإدراك المحيط واتخاذ قرارات القيادة والتحكم في المركبة.

⚡ **لماذا تُهم الحوسبة الطرفية هنا:** لأن تأخيرًا قدره 0.1 ثانية قد يؤدي إلى حادث، تُستخدم الحوسبة الطرفية (المعالجة الفورية على المركبة نفسها بدلاً من إرسال البيانات إلى السحابة). يضمن ذلك اتخاذ القرار دون زمن استجابة.

**2. الواقع المعزز / الافتراضي**
- **الواقع المعزز (AR):** تقنية تضيف معلومات رقمية فوق صور العالم الحقيقي. مثال: تطبيقات تعرض الأثاث في غرفتك قبل شرائه، أو أسهم الملاحة المتراكبة على الطريق.
- **الواقع الافتراضي (VR):** تقنية تُغمر المستخدم في فضاء افتراضي تولّده الحاسوب بالكامل. يُستخدم في الألعاب ومحاكاة التدريب والجولات الافتراضية.

**الفرق الرئيسي:** الواقع المعزز يُضيف طبقات رقمية على العالم الحقيقي؛ الواقع الافتراضي يستبدله بعالم افتراضي كامل.

**3. الحوسبة الكمومية**
تقنية يُتوقع أن تُسرّع بشكل هائل الحسابات الصعبة أو المستحيلة للحواسيب التقليدية، وذلك باستخدام مبادئ ميكانيكا الكم.

- **البت الكلاسيكي:** يحمل حالة محددة واحدة: إما 0 أو 1 في أي وقت.
- **الكيوبت (البت الكمومي):** يستخدم مبدأ التراكب الكمي، أي يمكن أن يكون مزيجًا من 0 و1 في الوقت ذاته.

يُتيح ذلك للحواسيب الكمومية معالجة كميات هائلة من المعلومات في آنٍ واحد، وحل مسائل يستغرق حلّها بالحواسيب العادية آلاف السنين.`,
      },
      {
        heading_en: "5. Lesson Summary & Key Takeaways",
        heading_ar: "5. ملخص الدرس والنقاط الأساسية",
        content_en: `**Information technology developed in stages — computers, the Internet, smartphones, and cloud computing. At each stage it introduced a new technology or service and also changed how society communicates, works, learns, and pays.**

The lesson question asked how information technology developed and how each stage changed society. Information technology advanced through a series of stages rather than in a single step, and each stage changed much more than the technology itself. 

As computing spread, information became global and then mobile, many everyday activities moved online, and information technology grew into a service that supports large-scale data analysis and AI. Each stage also brought social changes in how people communicate, work, learn, and make payments. 

Overall, the development of information technology is not only about faster machines; at every stage it has reshaped daily life, industry, and the way society handles information.`,
        content_ar: `**تطورت تكنولوجيا المعلومات عبر مراحل: الحواسيب، ثم الإنترنت، ثم الهواتف الذكية، ثم الحوسبة السحابية. في كل مرحلة، قدّمت تقنية أو خدمة جديدة، وغيّرت أسلوب تواصل المجتمع وعمله وتعلمه ودفعه.**

يتساءل الدرس كيف تطورت تكنولوجيا المعلومات وكيف غيّرت كل مرحلة المجتمع. تقدمت تكنولوجيا المعلومات عبر سلسلة من المراحل وليس في خطوة واحدة، وكل مرحلة غيّرت أكثر بكثير من التكنولوجيا ذاتها.

مع انتشار الحوسبة، أصبحت المعلومات عالمية ثم متنقلة، وانتقلت كثير من الأنشطة اليومية إلى الإنترنت، وتحولت تكنولوجيا المعلومات إلى خدمة تدعم تحليل البيانات الضخمة والذكاء الاصطناعي. جلبت كل مرحلة أيضًا تحولات اجتماعية في طريقة تواصل الناس وعملهم وتعلمهم ودفعهم.

إجمالاً، تطور تكنولوجيا المعلومات لا يتعلق فقط بآلات أسرع؛ بل في كل مرحلة أعاد تشكيل الحياة اليومية والصناعة وأسلوب تعامل المجتمع مع المعلومات.`,
      },
    ],
    pause_and_think: [
      {
        q_en: "Of the five social changes (SNS, e-commerce, remote work, online learning, cashless payment), which would be hardest to give up — and why?",
        q_ar: "من التغيرات الاجتماعية الخمسة (شبكات التواصل، التجارة الإلكترونية، العمل عن بُعد، التعلم الإلكتروني، الدفع غير النقدي)، أيّها سيكون الأصعب التخلي عنه ولماذا؟",
      },
      {
        q_en: "In autonomous driving, why is it necessary to process data instantly on the vehicle side using edge computing, rather than sending the data to the cloud for judgment?",
        q_ar: "في القيادة الذاتية، لماذا من الضروري معالجة البيانات فورًا على جانب المركبة باستخدام الحوسبة الطرفية، بدلاً من إرسالها إلى السحابة لاتخاذ القرار؟",
      },
      {
        q_en: "Cashless payment is spreading in many countries. If a fully cashless society were realized, choose one advantage and one possible concern, and briefly explain the reason for each.",
        q_ar: "ينتشر الدفع غير النقدي في كثير من البلدان. إذا تحقق مجتمع خالٍ تمامًا من النقد، اختر ميزة واحدة وقلقًا محتملاً واحدًا، واشرح بإيجاز سبب كل منهما.",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Analyze how the spread of cloud computing (from the 2010s onward) has changed the way information technology is used. In your answer, refer to: large-scale data analysis, AI, and 'IT as a service'.",
        q_ar: "حلّل كيف غيّر انتشار الحوسبة السحابية (من العقد الثاني من الألفية فصاعدًا) طريقة استخدام تكنولوجيا المعلومات. في إجابتك، أشر إلى: تحليل البيانات الضخمة، والذكاء الاصطناعي، و'تكنولوجيا المعلومات كخدمة'.",
        type: "WRITTEN",
      },
    ],
  },
  {
    id: "1-2",
    unit: 1,
    lesson_number: "1-2",
    title_en: "How AI Works",
    title_ar: "كيف يعمل الذكاء الاصطناعي",
    learning_objectives_en: [
      "Explain what AI is.",
      "Explain how generative AI is positioned within AI technologies.",
      "Describe the components of a neural network and how it learns from data.",
      "Identify real-world examples of machine learning and deep learning.",
    ],
    learning_objectives_ar: [
      "شرح مفهوم الذكاء الاصطناعي.",
      "شرح كيفية توضع الذكاء الاصطناعي التوليدي ضمن تقنيات الذكاء الاصطناعي.",
      "وصف مكونات الشبكة العصبية وكيفية تعلمها من البيانات.",
      "تحديد أمثلة واقعية على تعلم الآلة والتعلم العميق.",
    ],
    key_terms: [
      {
        term_en: "AI (Artificial Intelligence)",
        term_ar: "الذكاء الاصطناعي",
        def_en: "A general term for technologies that reproduce or perform intelligent human behavior (learning, reasoning, judgment, etc.) on a computer. Examples: speech recognition, image recognition, translation.",
        def_ar: "مصطلح عام لتقنيات تُحاكي أو تؤدي السلوك البشري الذكي (التعلم، الاستدلال، الحكم، إلخ) على حاسوب. أمثلة: التعرف على الكلام، التعرف على الصور، الترجمة.",
      },
      {
        term_en: "Machine Learning",
        term_ar: "تعلم الآلة",
        def_en: "One of the learning technologies that makes AI work. It learns patterns from data to make predictions and judgments. Examples: spam filters, product recommendations.",
        def_ar: "إحدى تقنيات التعلم التي تجعل الذكاء الاصطناعي يعمل. يتعلم الأنماط من البيانات لإجراء تنبؤات وأحكام. أمثلة: مرشحات الرسائل المزعجة، توصيات المنتجات.",
      },
      {
        term_en: "Deep Learning",
        term_ar: "التعلم العميق",
        def_en: "An advanced technology within machine learning that uses neural networks. It learns complex patterns using large-scale data. Examples: image analysis for autonomous driving, speech synthesis.",
        def_ar: "تقنية متقدمة ضمن تعلم الآلة تستخدم الشبكات العصبية. تتعلم أنماطًا معقدة باستخدام بيانات ضخمة. أمثلة: تحليل الصور للقيادة الذاتية، التوليف الصوتي.",
      },
      {
        term_en: "Neural Network",
        term_ar: "الشبكة العصبية الاصطناعية",
        def_en: "A system modeled after the workings of the nerve cells (neurons) of the human brain. By connecting many components, it learns from data and becomes capable of making complex judgments. It is the core technology supporting recent advances in AI.",
        def_ar: "نظام مستوحى من طريقة عمل الخلايا العصبية (النيورونات) في الدماغ البشري. من خلال ربط مكونات كثيرة، يتعلم من البيانات ويصبح قادرًا على إصدار أحكام معقدة. وهو التقنية الأساسية لدعم التقدم الأخير في الذكاء الاصطناعي.",
      },
      {
        term_en: "Generative AI (GenAI)",
        term_ar: "الذكاء الاصطناعي التوليدي",
        def_en: "AI technology that uses deep learning to generate new data (text, images, audio, programs, etc.). Examples: ChatGPT, image generation AIs.",
        def_ar: "تقنية ذكاء اصطناعي تستخدم التعلم العميق لتوليد بيانات جديدة (نصوص، صور، صوت، برامج، إلخ). أمثلة: ChatGPT، أدوات توليد الصور.",
      },
      {
        term_en: "Hallucination (in GenAI)",
        term_ar: "الهلوسة (في الذكاء الاصطناعي التوليدي)",
        def_en: "When a generative AI system produces text or content that appears plausible and reasonable but is factually incorrect. Always verify AI outputs with trusted sources.",
        def_ar: "عندما ينتج نظام ذكاء اصطناعي توليدي نصًا أو محتوى يبدو معقولاً ومنطقيًا لكنه غير صحيح واقعيًا. يجب دائمًا التحقق من مخرجات الذكاء الاصطناعي بمصادر موثوقة.",
      },
    ],
    sections: [
      {
        heading_en: "1. What is Artificial Intelligence (AI)?",
        heading_ar: "1. ما هو الذكاء الاصطناعي؟",
        content_en: `When you use a phone, AI is often at work:
- A **spam filter** sorts your email
- A **store recommends products** you might buy
- A **translation app** changes one language into another
- **ChatGPT** generates text from a prompt

These are all examples of AI, but they are not all the same kind.

**Definition:** AI is a general term for technologies that reproduce or perform intelligent human behavior (learning, reasoning, judgment, etc.) on a computer.

**Examples of AI applications:**
- Speech recognition (voice assistants like Siri, Google Assistant)
- Image recognition (facial recognition, medical imaging)
- Machine translation (Google Translate)
- Game playing (chess engines, AlphaGo)

**Important note:** Today's AI is "narrow" — expert at one specific task only. A spam filter cannot drive a car. An image recognition system cannot write poetry. Current AI systems do not have general human-level intelligence.`,
        content_ar: `عندما تستخدم هاتفك، غالبًا ما يكون الذكاء الاصطناعي يعمل:
- **مرشح الرسائل المزعجة** يصنّف بريدك الإلكتروني
- **المتجر يوصي بمنتجات** قد تهمك
- **تطبيق الترجمة** يحوّل لغة إلى أخرى
- **ChatGPT** يُنشئ نصًا من طلب

كلها أمثلة على الذكاء الاصطناعي، لكنها ليست من النوع ذاته.

**التعريف:** الذكاء الاصطناعي مصطلح عام للتقنيات التي تُحاكي أو تؤدي السلوك البشري الذكي (التعلم والاستدلال والحكم وما إلى ذلك) على حاسوب.

**أمثلة على تطبيقات الذكاء الاصطناعي:**
- التعرف على الكلام (المساعدون الصوتيون مثل Siri وGoogle Assistant)
- التعرف على الصور (التعرف على الوجوه، التصوير الطبي)
- الترجمة الآلية (Google Translate)
- لعب الألعاب (محركات الشطرنج، AlphaGo)

**ملاحظة مهمة:** الذكاء الاصطناعي اليوم "ضيق النطاق" — خبير في مهمة محددة واحدة فقط. لا يستطيع مرشح الرسائل المزعجة قيادة سيارة. لا يستطيع نظام التعرف على الصور كتابة الشعر. لا تمتلك أنظمة الذكاء الاصطناعي الحالية ذكاءً عامًا بمستوى بشري.`,
      },
      {
        heading_en: "2. The Relationship between AI, Machine Learning, Deep Learning, and Generative AI",
        heading_ar: "2. العلاقة بين الذكاء الاصطناعي وتعلم الآلة والتعلم العميق والذكاء الاصطناعي التوليدي",
        content_en: `Within AI technologies, there is a hierarchy of increasingly specialized technologies:

**AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI**

(Read: "AI contains Machine Learning, which contains Deep Learning, which contains Generative AI")

**1. Machine Learning**
- One of the learning technologies that makes AI work
- It learns patterns from data to make predictions and judgments
- **Key difference from traditional programming:** Instead of writing explicit rules for every situation, machine learning models are trained on data and learn the rules themselves
- Examples: spam filters, product recommendations, fraud detection

**2. Deep Learning**
- An advanced technology within machine learning
- Uses **neural networks** — systems modeled after the human brain
- Learns complex patterns using **large-scale data**
- Examples: image analysis for autonomous driving, speech recognition, language translation

**3. Neural Networks (How Deep Learning Works)**
A neural network is composed of:
- **Input layer:** receives raw data (e.g., pixel values of an image)
- **Hidden layers:** multiple layers of interconnected units (neurons) that learn patterns. The "weights" of these connections change during training
- **Output layer:** produces the result (e.g., "cat" or "not cat")

The network learns by adjusting these weights through a process called training, using many examples of labeled data.

**4. Generative AI**
- Uses deep learning to generate NEW data — not just classify or predict
- Can generate: text, images, audio, video, program code
- Examples: ChatGPT (text), DALL-E/Midjourney (images), Suno (music)
- **Risk — Hallucination:** GenAI systems can produce text that appears plausible but is factually incorrect. Always verify outputs with trusted sources.`,
        content_ar: `ضمن تقنيات الذكاء الاصطناعي، توجد هرمية من التقنيات المتخصصة المتزايدة:

**الذكاء الاصطناعي ⊃ تعلم الآلة ⊃ التعلم العميق ⊃ الذكاء الاصطناعي التوليدي**

(يُقرأ: "يحتوي الذكاء الاصطناعي على تعلم الآلة، الذي يحتوي على التعلم العميق، الذي يحتوي على الذكاء الاصطناعي التوليدي")

**1. تعلم الآلة**
- إحدى تقنيات التعلم التي تجعل الذكاء الاصطناعي يعمل
- يتعلم الأنماط من البيانات لإجراء تنبؤات وأحكام
- **الفرق الرئيسي عن البرمجة التقليدية:** بدلاً من كتابة قواعد صريحة لكل موقف، تتدرب نماذج تعلم الآلة على البيانات وتتعلم القواعد بنفسها
- أمثلة: مرشحات الرسائل المزعجة، توصيات المنتجات، اكتشاف الاحتيال

**2. التعلم العميق**
- تقنية متقدمة ضمن تعلم الآلة
- يستخدم **الشبكات العصبية** — أنظمة مستوحاة من الدماغ البشري
- يتعلم أنماطًا معقدة باستخدام **بيانات ضخمة**
- أمثلة: تحليل الصور للقيادة الذاتية، التعرف على الكلام، الترجمة اللغوية

**3. الشبكات العصبية (كيف يعمل التعلم العميق)**
تتكون الشبكة العصبية من:
- **طبقة الإدخال:** تستقبل البيانات الخام (مثل قيم البكسل لصورة)
- **الطبقات المخفية:** طبقات متعددة من الوحدات المترابطة (النيورونات) التي تتعلم الأنماط. تتغير "أوزان" هذه الروابط أثناء التدريب
- **طبقة الإخراج:** تُنتج النتيجة (مثل "قطة" أو "ليس قطة")

تتعلم الشبكة بضبط هذه الأوزان من خلال عملية تسمى التدريب، باستخدام أمثلة كثيرة من البيانات الموسومة.

**4. الذكاء الاصطناعي التوليدي**
- يستخدم التعلم العميق لتوليد بيانات جديدة — لا مجرد تصنيف أو تنبؤ
- يمكنه توليد: النصوص والصور والصوت والفيديو وكود البرمجة
- أمثلة: ChatGPT (نصوص)، DALL-E/Midjourney (صور)، Suno (موسيقى)
- **خطر — الهلوسة:** يمكن لأنظمة الذكاء الاصطناعي التوليدي إنتاج نصوص تبدو معقولة لكنها غير صحيحة واقعيًا. يجب دائمًا التحقق من المخرجات بمصادر موثوقة.`,
      },
    ],
    pause_and_think: [
      {
        q_en: "Spam filters and product recommendations are both examples of machine learning, but the tasks they perform are completely different. From the perspective of how AI works, explain what these two applications have in common.",
        q_ar: "مرشحات الرسائل المزعجة وتوصيات المنتجات كلاهما من أمثلة تعلم الآلة، لكن المهام التي يؤديانها مختلفة تمامًا. من منظور كيفية عمل الذكاء الاصطناعي، اشرح ما يشتركان فيه.",
      },
      {
        q_en: "Deep learning needs large-scale data to learn. Why might an AI struggle with something it has rarely seen in its training data?",
        q_ar: "يحتاج التعلم العميق إلى بيانات ضخمة للتعلم. لماذا قد يعاني الذكاء الاصطناعي مع شيء نادرًا ما رآه في بيانات تدريبه؟",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Define Artificial Intelligence (AI) and explain, in three points, the differences between machine learning, deep learning, and generative AI.",
        q_ar: "عرّف الذكاء الاصطناعي ووضّح في ثلاث نقاط الفرق بين تعلم الآلة والتعلم العميق والذكاء الاصطناعي التوليدي.",
        type: "WRITTEN",
      },
    ],
  },
  {
    id: "1-3",
    unit: 1,
    lesson_number: "1-3",
    title_en: "AI in Daily Life and Industry",
    title_ar: "الذكاء الاصطناعي في الحياة اليومية والصناعة",
    learning_objectives_en: [
      "Identify examples of AI applications in daily life and industry.",
      "Explain how AI is transforming different sectors.",
      "Evaluate both benefits and risks of AI adoption.",
    ],
    learning_objectives_ar: [
      "تحديد أمثلة على تطبيقات الذكاء الاصطناعي في الحياة اليومية والصناعة.",
      "شرح كيف يُحوّل الذكاء الاصطناعي القطاعات المختلفة.",
      "تقييم فوائد ومخاطر اعتماد الذكاء الاصطناعي.",
    ],
    key_terms: [
      {
        term_en: "Narrow AI",
        term_ar: "الذكاء الاصطناعي ضيق النطاق",
        def_en: "AI designed for a specific task or limited set of tasks. All current commercial AI systems are narrow AI.",
        def_ar: "ذكاء اصطناعي مُصمَّم لمهمة محددة أو مجموعة محدودة من المهام. جميع أنظمة الذكاء الاصطناعي التجارية الحالية هي ذكاء اصطناعي ضيق النطاق.",
      },
    ],
    sections: [
      {
        heading_en: "1. AI Applications in Daily Life",
        heading_ar: "1. تطبيقات الذكاء الاصطناعي في الحياة اليومية",
        content_en: `AI is already deeply embedded in everyday activities:

**Communication:**
- Language translation apps
- Voice assistants (Siri, Google Assistant, Alexa)
- Predictive text and autocorrect

**Shopping & Entertainment:**
- Product recommendation engines (Amazon, Netflix)
- Fraud detection in online payments
- Personalized news feeds (social media algorithms)

**Health & Safety:**
- Medical image analysis (detecting cancer in X-rays)
- Wearable health monitors
- Emergency response systems

**Education:**
- Personalized learning platforms (adapts difficulty to the student)
- Automated essay grading
- Intelligent tutoring systems`,
        content_ar: `يتغلغل الذكاء الاصطناعي بعمق في الأنشطة اليومية:

**التواصل:**
- تطبيقات الترجمة اللغوية
- المساعدون الصوتيون (Siri، Google Assistant، Alexa)
- التنبؤ بالنصوص والتصحيح التلقائي

**التسوق والترفيه:**
- محركات توصية المنتجات (Amazon، Netflix)
- كشف الاحتيال في المدفوعات الإلكترونية
- خلاصات الأخبار الشخصية (خوارزميات وسائل التواصل الاجتماعي)

**الصحة والسلامة:**
- تحليل الصور الطبية (اكتشاف السرطان في الأشعة السينية)
- أجهزة مراقبة الصحة القابلة للارتداء
- أنظمة الاستجابة للطوارئ

**التعليم:**
- منصات التعلم الشخصية (تُكيّف المستوى مع الطالب)
- تصحيح المقالات الآلي
- أنظمة التدريس الذكي`,
      },
      {
        heading_en: "2. AI in Industry",
        heading_ar: "2. الذكاء الاصطناعي في الصناعة",
        content_en: `AI is transforming multiple industries:

**Manufacturing:**
- Predictive maintenance (detecting equipment failures before they happen)
- Quality control using computer vision
- Robotic automation on assembly lines

**Agriculture:**
- AI systems that identify diseased crops from images
- Precision farming (optimizing water, fertilizer use)
- Weather prediction for crop planning

**Finance:**
- Algorithmic trading
- Credit scoring
- Anti-money laundering systems

**Transportation:**
- Autonomous vehicles
- Traffic optimization
- Fleet management

**Healthcare:**
- Drug discovery acceleration
- Diagnostic support systems
- Robotic surgery assistance`,
        content_ar: `يُحوّل الذكاء الاصطناعي صناعات متعددة:

**التصنيع:**
- الصيانة التنبؤية (اكتشاف أعطال المعدات قبل حدوثها)
- مراقبة الجودة باستخدام رؤية الحاسوب
- أتمتة الروبوتات على خطوط التجميع

**الزراعة:**
- أنظمة ذكاء اصطناعي تُحدد المحاصيل المصابة من الصور
- الزراعة الدقيقة (تحسين استخدام الماء والأسمدة)
- التنبؤ بالطقس لتخطيط المحاصيل

**المالية:**
- التداول الخوارزمي
- تصنيف الائتمان
- أنظمة مكافحة غسيل الأموال

**النقل:**
- المركبات ذاتية القيادة
- تحسين حركة المرور
- إدارة الأساطيل

**الرعاية الصحية:**
- تسريع اكتشاف الأدوية
- أنظمة دعم التشخيص
- مساعدة الجراحة الآلية`,
      },
    ],
    pause_and_think: [
      {
        q_en: "Imagine a farmer wants to use an AI system to distinguish between images of healthy crops and diseased crops. What type of data does the system need for training, and identify one factor that might make its predictions incorrect?",
        q_ar: "افترض أن مزارعًا يريد استخدام نظام ذكاء اصطناعي للتمييز بين صور المحاصيل السليمة والمصابة بالأمراض. ما نوع البيانات التي يحتاجها النظام للتدريب؟ وحدد عاملاً واحدًا قد يجعل تنبؤه خاطئًا.",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Compare predictive AI and generative AI in terms of purpose, processing methods, and output, providing a practical example of each in industry or healthcare.",
        q_ar: "قارن بين الذكاء الاصطناعي التنبؤي والذكاء الاصطناعي التوليدي من حيث الهدف وطريقة المعالجة والمخرجات، مع إعطاء مثال عملي لكل منهما في الصناعة أو الرعاية الصحية.",
        type: "WRITTEN",
      },
      {
        q_en: "Explain the concept of Predictive Maintenance in manufacturing and how IoT sensors combined with machine learning models prevent costly factory downtime.",
        q_ar: "اشرح مفهوم الصيانة التنبؤية (Predictive Maintenance) في قطاع التصنيع، وكيف تسهم مستشعرات إنترنت الأشياء المقترنة بنماذج تعلم الآلة في تفادي التوقف المفاجئ لخطوط الإنتاج.",
        type: "WRITTEN",
      },
      {
        q_en: "Which technology uses deep learning and computer vision to analyze medical scans (such as X-rays and MRI) to assist doctors in early tumor detection?",
        q_ar: "ما هي التقنية التي تعتمد على التعلم العميق ورؤية الحاسوب لفحص الصور الطبية (مثل الأشعة السينية والرنين المغناطيسي) لمساعدة الأطباء في الاكتشاف المبكر للأورام؟",
        type: "MCQ",
      },
    ],
  },
  {
    id: "1-4",
    unit: 1,
    lesson_number: "1-4",
    title_en: "Ethical Issues with AI",
    title_ar: "القضايا الأخلاقية للذكاء الاصطناعي",
    learning_objectives_en: [
      "Identify major ethical concerns associated with AI.",
      "Explain bias in AI and how it arises.",
      "Discuss the importance of responsible AI development.",
    ],
    learning_objectives_ar: [
      "تحديد المخاوف الأخلاقية الرئيسية المرتبطة بالذكاء الاصطناعي.",
      "شرح التحيز في الذكاء الاصطناعي وكيف ينشأ.",
      "مناقشة أهمية التطوير المسؤول للذكاء الاصطناعي.",
    ],
    key_terms: [
      {
        term_en: "AI Bias",
        term_ar: "التحيز في الذكاء الاصطناعي",
        def_en: "When an AI system produces systematically unfair results due to biased training data or algorithm design.",
        def_ar: "عندما ينتج نظام ذكاء اصطناعي نتائج غير عادلة بشكل منهجي بسبب بيانات تدريب متحيزة أو تصميم خوارزمية متحيز.",
      },
      {
        term_en: "Privacy",
        term_ar: "الخصوصية",
        def_en: "The right of individuals to control their personal data and how it is used.",
        def_ar: "حق الأفراد في التحكم في بياناتهم الشخصية وطريقة استخدامها.",
      },
    ],
    sections: [
      {
        heading_en: "1. Key Ethical Issues in AI",
        heading_ar: "1. القضايا الأخلاقية الرئيسية في الذكاء الاصطناعي",
        content_en: `As AI becomes more powerful, important ethical questions arise:

**1. Bias and Fairness**
AI systems learn from historical data. If that data contains biases (e.g., if historical hiring decisions discriminated against certain groups), the AI may reproduce and even amplify those biases.

Example: A hiring AI trained on past employees (mostly men in tech roles) might unfairly downgrade female applicants.

**2. Privacy**
AI systems often require large amounts of personal data to function. This raises questions about:
- Who owns this data?
- How is it stored and protected?
- Who can access it?

Facial recognition systems are a key example of AI privacy concerns.

**3. Job Displacement**
As AI automates tasks, some jobs may become obsolete. This requires:
- Reskilling workers
- Social safety nets
- Thoughtful policies about automation

**4. Accountability**
When an AI makes a wrong decision (e.g., a self-driving car causes an accident), who is responsible? The manufacturer? The programmer? The owner?

**5. Transparency ("Black Box" Problem)**
Many deep learning systems cannot explain how they reached a decision. This lack of transparency is concerning in high-stakes domains like medicine, justice, and finance.

**6. Misuse and Deepfakes**
Generative AI can create convincing fake videos, audio, and text. This can be used for:
- Disinformation campaigns
- Identity fraud
- Manipulation`,
        content_ar: `مع ازدياد قوة الذكاء الاصطناعي، تظهر تساؤلات أخلاقية مهمة:

**1. التحيز والعدالة**
تتعلم أنظمة الذكاء الاصطناعي من البيانات التاريخية. إذا كانت هذه البيانات تحتوي على تحيزات (مثلاً إذا ميّزت قرارات التوظيف التاريخية ضد مجموعات معينة)، فقد يُعيد الذكاء الاصطناعي إنتاج هذه التحيزات بل وتضخيمها.

مثال: ذكاء اصطناعي للتوظيف تم تدريبه على الموظفين السابقين (معظمهم رجال في أدوار تقنية) قد يُقلّل من قيمة المتقدمات الإناث بشكل غير عادل.

**2. الخصوصية**
تتطلب أنظمة الذكاء الاصطناعي في أغلب الأحيان كميات كبيرة من البيانات الشخصية لتعمل. يطرح هذا تساؤلات حول:
- من يملك هذه البيانات؟
- كيف يُحفَظ ويُحمى؟
- من يمكنه الوصول إليه؟

أنظمة التعرف على الوجه مثال رئيسي على مخاوف خصوصية الذكاء الاصطناعي.

**3. التهجير الوظيفي**
مع أتمتة الذكاء الاصطناعي للمهام، قد تصبح بعض الوظائف قديمة. يتطلب هذا:
- إعادة تدريب العمال
- شبكات الأمان الاجتماعي
- سياسات مدروسة بشأن الأتمتة

**4. المساءلة**
عندما يتخذ الذكاء الاصطناعي قرارًا خاطئًا (مثلاً سيارة ذاتية القيادة تتسبب في حادث)، من المسؤول؟ المصنّع؟ المبرمج؟ المالك؟

**5. الشفافية (مشكلة "الصندوق الأسود")**
كثير من أنظمة التعلم العميق لا تستطيع شرح كيف توصلت إلى قرار. هذا النقص في الشفافية مثير للقلق في المجالات عالية المخاطر مثل الطب والعدالة والمالية.

**6. إساءة الاستخدام والتزييف العميق**
يمكن للذكاء الاصطناعي التوليدي إنشاء مقاطع فيديو وصوت ونصوص مزيفة مقنعة. يمكن استخدام ذلك في:
- حملات التضليل الإعلامي
- الاحتيال بالهوية
- التلاعب`,
      },
    ],
    pause_and_think: [
      {
        q_en: "If a generative AI system produces a false but convincing news article, who should be held responsible — the AI developers, the platform hosting it, or the user who shares it? Justify your answer.",
        q_ar: "إذا أنتج نظام ذكاء اصطناعي توليدي مقالة إخبارية مزيفة لكن مقنعة، من يجب أن يُحاسَب: مطورو الذكاء الاصطناعي، أم المنصة المضيفة لها، أم المستخدم الذي يشاركها؟ بررّ إجابتك.",
      },
    ],
    exam_style_questions: [
      {
        q_en: "Explain how algorithmic bias arises in AI models, and suggest two practical engineering procedures to mitigate bias and ensure fairness.",
        q_ar: "وضّح كيف ينشأ التحيز الخوارزمي في نماذج الذكاء الاصطناعي، واقترح إجرائين هندسيين عمليين يمكن لمهندسي النظم اتباعهما للحد من التحيز وضمان العدالة وتكافؤ الفرص.",
        type: "WRITTEN",
      },
      {
        q_en: "Discuss the 'Black Box' problem in deep learning and explain why Explainable AI (XAI) is essential in high-stakes domains such as medicine and criminal justice.",
        q_ar: "ناقش مشكلة 'الصندوق الأسود' في نماذج التعلم العميق، واشرح لماذا تُعد تقنيات الذكاء الاصطناعي القابل للتفسير (XAI) مطلباً حاسماً في المجالات الحساسة كالطب والعدالة الجنائية.",
        type: "WRITTEN",
      },
      {
        q_en: "Which principle of AI ethics requires developers to explain how a model reaches its decisions rather than keeping its internal logic hidden?",
        q_ar: "أي مبدأ من مبادئ أخلاقيات الذكاء الاصطناعي يُلزم المطورين بإيضاح كيفية وصول النموذج إلى قراراته بدلاً من إبقاء آليات العمل سرية أو غامضة؟",
        type: "MCQ",
      },
    ],
  },
];

// ==================== ALL QUIZ QUESTIONS ====================
// Sourced from: Programming-ArtificialIntelligence-Ar-EB-Assessments-1.pdf
// Covers: Unit 1 (Lessons 1-1 through 1-4) — All performance tasks & weekly assessments

export interface QuizQuestion {
  id: string;
  lesson: string;
  unit: string;
  type: "MCQ" | "WRITTEN";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  source: "CLASSROOM" | "HOMEWORK" | "WEEKLY_ASSESSMENT";
  question_en: string;
  question_ar: string;
  option_a_en?: string;
  option_a_ar?: string;
  option_b_en?: string;
  option_b_ar?: string;
  option_c_en?: string;
  option_c_ar?: string;
  option_d_en?: string;
  option_d_ar?: string;
  correct_option?: "A" | "B" | "C" | "D";
  ideal_answer_en?: string;
  ideal_answer_ar?: string;
  explanation_en?: string;
  explanation_ar?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==== LESSON 1-1: Development of IT — Classroom Tasks ====
  {
    id: "q1-1-c1",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "CLASSROOM",
    question_en: "Which of the following represents the technology or main event associated with the 1970s and 1980s?",
    question_ar: "أي من الخيارات التالية يمثل التقنية أو الحدث الرئيسي المرتبط بفترة السبعينيات والثمانينيات من القرن الماضي؟",
    option_a_en: "Emergence of smartphones",
    option_a_ar: "ظهور الهواتف الذكية",
    option_b_en: "Spread of personal computers (PCs)",
    option_b_ar: "انتشار الحواسيب الشخصية (PCs)",
    option_c_en: "Spread of cloud computing",
    option_c_ar: "انتشار الحوسبة السحابية",
    option_d_en: "Commercialization of the Internet and emergence of the Web",
    option_d_ar: "إتاحة الإنترنت للاستخدام التجاري وظهور الويب",
    correct_option: "B",
    explanation_en: "In the 1970s-80s, personal computers (PCs) spread, marking the beginning of personal computer use.",
    explanation_ar: "في السبعينيات والثمانينيات، انتشرت الحواسيب الشخصية (PCs)، مما أطلق بداية الاستخدام الشخصي للحاسوب.",
  },
  {
    id: "q1-1-c2",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "CLASSROOM",
    question_en: "What is the empirical observation that describes a historical trend of doubling the number of transistors in integrated circuits approximately every two years?",
    question_ar: "ما هي الملاحظة التجريبية التي تصف اتجاهاً تاريخياً لازدياد عدد الترانزستورات في الدوائر المتكاملة بمعدل يقارب الضعف كل عامين؟",
    option_a_en: "Cloud Computing",
    option_a_ar: "الحوسبة السحابية",
    option_b_en: "Moore's Law",
    option_b_ar: "قانون مور",
    option_c_en: "Edge Computing",
    option_c_ar: "الحوسبة الطرفية",
    option_d_en: "Quantum Superposition",
    option_d_ar: "التراكب الكمي",
    correct_option: "B",
    explanation_en: "Moore's Law is the empirical observation that the number of transistors on an integrated circuit doubles approximately every two years.",
    explanation_ar: "قانون مور هو الملاحظة التجريبية بأن عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريبًا كل عامين.",
  },
  {
    id: "q1-1-c3",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "CLASSROOM",
    question_en: "What is the technology that processes data on the device itself instantly instead of sending it to the cloud to avoid delay in decision making?",
    question_ar: "ما هي التقنية التي تقضي بمعالجة البيانات على الجهاز نفسه فوراً بدلاً من إرسالها إلى السحابة لتجنب التأخير في اتخاذ القرار؟",
    option_a_en: "Cloud Computing",
    option_a_ar: "الحوسبة السحابية",
    option_b_en: "Quantum Computing",
    option_b_ar: "الحوسبة الكمومية",
    option_c_en: "Edge Computing",
    option_c_ar: "الحوسبة الطرفية",
    option_d_en: "Social Networking",
    option_d_ar: "شبكات التواصل الاجتماعي",
    correct_option: "C",
    explanation_en: "Edge Computing processes data on the device itself instantly, crucial for applications like autonomous driving where milliseconds matter.",
    explanation_ar: "تعالج الحوسبة الطرفية البيانات على الجهاز نفسه فوراً، وهو أمر بالغ الأهمية لتطبيقات مثل القيادة الذاتية حيث تهم الميلي ثانية.",
  },
  {
    id: "q1-1-c4",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "CLASSROOM",
    question_en: "Which of the following is the accurate concept of Augmented Reality (AR)?",
    question_ar: "أي من الخيارات الآتية يمثل المفهوم الدقيق لتقنية الواقع المعزز (AR)؟",
    option_a_en: "Technology that places the user inside a fully computer-generated virtual environment",
    option_a_ar: "تقنية تضع المستخدم داخل بيئة افتراضية مولدة حاسوبياً بالكامل",
    option_b_en: "Technology that adds digital elements or information to a scene from the real world",
    option_b_ar: "تقنية تضيف عناصر أو معلومات رقمية إلى مشهد من العالم الحقيقي",
    option_c_en: "A computing approach that uses quantum mechanics properties to process information",
    option_c_ar: "نهج حوسبي يستخدم خصائص ميكانيكا الكم لمعالجة المعلومات",
    option_d_en: "A system for making cashless payments using QR codes",
    option_d_ar: "نظام لإجراء المدفوعات بالنقود الإلكترونية ورموز QR",
    correct_option: "B",
    explanation_en: "AR (Augmented Reality) adds digital information on top of real-world images. It overlays digital content on the physical world, unlike VR which creates a fully virtual environment.",
    explanation_ar: "الواقع المعزز (AR) يضيف معلومات رقمية فوق صور العالم الحقيقي. يُراكب المحتوى الرقمي على العالم المادي، على عكس الواقع الافتراضي الذي يخلق بيئة افتراضية كاملة.",
  },
  // ==== LESSON 1-1: Homework Tasks ====
  {
    id: "q1-1-h1",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "HOMEWORK",
    question_en: "What is the term referring to a work pattern where a person performs their tasks from home or another remote location using the Internet?",
    question_ar: "ما هو المصطلح الذي يشير إلى نمط عمل يؤدي فيه الشخص مهامه من المنزل أو من موقع آخر بعيد باستخدام الإنترنت؟",
    option_a_en: "Online Learning",
    option_a_ar: "التعلم عبر الإنترنت",
    option_b_en: "E-commerce",
    option_b_ar: "التجارة الإلكترونية",
    option_c_en: "Remote Work",
    option_c_ar: "العمل عن بعد",
    option_d_en: "Cashless Payment",
    option_d_ar: "الدفع غير النقدي",
    correct_option: "C",
    explanation_en: "Remote Work is the working style where tasks are performed from home or other remote locations using the Internet.",
    explanation_ar: "العمل عن بُعد هو أسلوب العمل الذي تُؤدى فيه المهام من المنزل أو مواقع أخرى بعيدة باستخدام الإنترنت.",
  },
  {
    id: "q1-1-h2",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "HOMEWORK",
    question_en: "What is meant by Social Networking Services (SNS)?",
    question_ar: "ما المقصود بخدمة شبكات التواصل الاجتماعي (SNS)؟",
    option_a_en: "Platforms that allow users to communicate and publish and share content quickly",
    option_a_ar: "منصات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته بسرعة",
    option_b_en: "Selling goods and services and buying them via the Internet",
    option_b_ar: "بيع السلع والخدمات وشرائها عبر الإنترنت",
    option_c_en: "Paying for goods or services by non-cash means",
    option_c_ar: "دفع قيمة السلع أو الخدمات بوسائل غير نقدية",
    option_d_en: "A learning pattern in which lessons are delivered via the Internet",
    option_d_ar: "نمط تعليمي تُقدم فيه الدروس عبر الإنترنت",
    correct_option: "A",
    explanation_en: "SNS (Social Networking Services) are platforms that allow users to connect, communicate, and share content rapidly.",
    explanation_ar: "شبكات التواصل الاجتماعي (SNS) هي منصات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته بسرعة.",
  },
  // ==== LESSON 1-1: Weekly Assessments — Period 2 ====
  {
    id: "q1-1-w2-c1",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "How does edge computing contribute to enhancing safety and speed of decision-making in autonomous driving without the need to send data to the cloud?",
    question_ar: "وضح كيف تساهم الحوسبة الطرفية في تعزيز الأمان وسرعة اتخاذ القرار في تقنية القيادة الذاتية دون الحاجة لإرسال البيانات إلى السحابة.",
    option_a_en: "By storing all data permanently in central servers for later retrieval",
    option_a_ar: "بتخزين جميع البيانات بشكل دائم في خوادم مركزية لاسترجاعها لاحقاً",
    option_b_en: "By processing data instantly on the vehicle itself, eliminating network latency",
    option_b_ar: "بمعالجة البيانات فورياً على المركبة نفسها، مما يلغي تأخير الشبكة",
    option_c_en: "By sending data to quantum computers for faster processing",
    option_c_ar: "بإرسال البيانات إلى حواسيب كمومية لمعالجة أسرع",
    option_d_en: "By using social networking to communicate between vehicles",
    option_d_ar: "باستخدام شبكات التواصل الاجتماعي للتواصل بين المركبات",
    correct_option: "B",
    explanation_en: "Edge computing processes data instantly on the vehicle itself. A delay of even 0.1 seconds in autonomous driving could cause an accident, so cloud processing is too slow.",
    explanation_ar: "تعالج الحوسبة الطرفية البيانات فورياً على المركبة نفسها. تأخير 0.1 ثانية في القيادة الذاتية قد يتسبب في حادث، لذا معالجة السحابة تكون بطيئة جداً.",
  },
  // ==== LESSON 1-1: Weekly Assessments — Model A ====
  {
    id: "q1-1-wa1",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "In which time period did the Internet become available for commercial use and did the Web appear, which expanded global access to information?",
    question_ar: "في أي فترة زمنية بدأت تتيح الإنترنت للاستخدام التجاري وظهر الويب مما توسع معه الوصول العالمي إلى المعلومات؟",
    option_a_en: "The 1940s and 1960s",
    option_a_ar: "الأربعينيات والستينيات",
    option_b_en: "The 1990s",
    option_b_ar: "التسعينيات",
    option_c_en: "The 1970s and 1980s",
    option_c_ar: "السبعينيات والثمانينيات",
    option_d_en: "From the second decade of the millennium onward",
    option_d_ar: "من العقد الثاني من الألفية فصاعداً",
    correct_option: "B",
    explanation_en: "In the 1990s, the Internet was commercialized and the Web emerged, advancing globalization of information and the spread of email.",
    explanation_ar: "في التسعينيات، تُوجّح الإنترنت للاستخدام التجاري وظهر الويب، مما أدى إلى عولمة المعلومات وانتشار البريد الإلكتروني.",
  },
  {
    id: "q1-1-wa2",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What technology uses AI to help drive a vehicle using cameras and sensors to perceive the environment and make decisions?",
    question_ar: "ما هي التقنية التي تستخدم الذكاء الاصطناعي للمساعدة على قيادة المركبة باستخدام الكاميرات والمستشعرات لإدراك المحيط واتخاذ القرار؟",
    option_a_en: "Cloud Computing",
    option_a_ar: "الحوسبة السحابية",
    option_b_en: "Autonomous Driving",
    option_b_ar: "القيادة الذاتية",
    option_c_en: "Virtual Reality",
    option_c_ar: "الواقع الافتراضي",
    option_d_en: "Quantum Computing",
    option_d_ar: "الحوسبة الكمومية",
    correct_option: "B",
    explanation_en: "Autonomous Driving uses AI, cameras, and sensors to drive a vehicle without human operation.",
    explanation_ar: "القيادة الذاتية تستخدم الذكاء الاصطناعي والكاميرات والمستشعرات لقيادة المركبة دون تدخل بشري.",
  },
  {
    id: "q1-1-wa3",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What is the term for the IT delivered as a service over the Internet to support big data analysis and AI?",
    question_ar: "ما المصطلح الذي يعبّر عن تكنولوجيا المعلومات المقدمة كخدمة عبر الإنترنت لدعم تحليل البيانات الضخمة والذكاء الاصطناعي؟",
    option_a_en: "Cloud Computing",
    option_a_ar: "الحوسبة السحابية",
    option_b_en: "Edge Computing",
    option_b_ar: "الحوسبة الطرفية",
    option_c_en: "Classical bit",
    option_c_ar: "البت الكلاسيكي",
    option_d_en: "Quantum Superposition",
    option_d_ar: "التراكب الكمي",
    correct_option: "A",
    explanation_en: "Cloud computing delivers IT as a service over the Internet, enabling large-scale data analysis and AI applications.",
    explanation_ar: "الحوسبة السحابية تُقدّم تكنولوجيا المعلومات كخدمة عبر الإنترنت، مما يُتيح تحليل البيانات الضخمة وتطبيقات الذكاء الاصطناعي.",
  },
  {
    id: "q1-1-wa4",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Which of the following is the correct description of the concept of Virtual Reality (VR)?",
    question_ar: "أي من الآتي يُعد الوصف الصحيح لمفهوم الواقع الافتراضي (VR)؟",
    option_a_en: "A technology that adds digital information over images from the real world",
    option_a_ar: "تقنية تضيف معلومات رقمية فوق صور من العالم الحقيقي",
    option_b_en: "A technology that places the user inside a computer-generated virtual environment",
    option_b_ar: "تقنية تضع المستخدم داخل بيئة افتراضية مولدة حاسوبياً",
    option_c_en: "A technology for processing data on the device itself instantly without the cloud",
    option_c_ar: "تقنية لمعالجة البيانات على الجهاز نفسه فوراً دون السحابة",
    option_d_en: "A system for making cashless payments using QR codes",
    option_d_ar: "نظام لإجراء المدفوعات بالنقود الإلكترونية ورموز QR",
    correct_option: "B",
    explanation_en: "VR (Virtual Reality) places the user inside a fully computer-generated virtual environment, completely replacing the real world.",
    explanation_ar: "الواقع الافتراضي (VR) يضع المستخدم داخل بيئة افتراضية مولدة حاسوبياً بالكامل، مما يستبدل العالم الحقيقي كلياً.",
  },
  // ==== LESSON 1-1: Model B Weekly Assessment ====
  {
    id: "q1-1-wb1",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "The time period that witnessed the emergence of smartphones and rapid spread of mobile Internet is:",
    question_ar: "الفترة الزمنية التي شهدت ظهور الهواتف الذكية وانتشار الإنترنت عبر الهواتف المحمولة بسرعة هي:",
    option_a_en: "The 1970s and 1960s",
    option_a_ar: "السبعينيات والستينيات",
    option_b_en: "The first decade of the millennium (2000s)",
    option_b_ar: "العقد الأول من الألفية (الألفينيات)",
    option_c_en: "The 1990s",
    option_c_ar: "التسعينيات",
    option_d_en: "The 1940s of the twentieth century",
    option_d_ar: "الأربعينيات من القرن العشرين",
    correct_option: "B",
    explanation_en: "In the 2000s (first decade of the millennium), smartphones like the iPhone emerged, leading to the explosive spread of mobile Internet.",
    explanation_ar: "في العقد الأول من الألفية (الألفينيات)، ظهرت الهواتف الذكية مثل iPhone، مما أدى إلى الانتشار الهائل للإنترنت المحمول.",
  },
  {
    id: "q1-1-wb2",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "A technology that adds digital elements or information to a scene from the real world is known as:",
    question_ar: "تقنية تضيف عناصر أو معلومات رقمية إلى مشهد من العالم الحقيقي تُعرف باسم:",
    option_a_en: "Virtual Reality (VR)",
    option_a_ar: "الواقع الافتراضي (VR)",
    option_b_en: "Autonomous Driving",
    option_b_ar: "القيادة الذاتية",
    option_c_en: "Augmented Reality (AR)",
    option_c_ar: "الواقع المعزز (AR)",
    option_d_en: "Quantum Computing",
    option_d_ar: "الحوسبة الكمومية",
    correct_option: "C",
    explanation_en: "Augmented Reality (AR) adds digital information on top of the real world, unlike VR which completely replaces it.",
    explanation_ar: "الواقع المعزز (AR) يضيف معلومات رقمية فوق العالم الحقيقي، على عكس الواقع الافتراضي الذي يستبدله كلياً.",
  },
  {
    id: "q1-1-wb3",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Which of the following accurately describes what Moore's Law does?",
    question_ar: "أي الملاحظات الآتية تصف بدقة ما يفعله قانون مور؟",
    option_a_en: "The number of transistors in an integrated circuit roughly doubles about every two years",
    option_a_ar: "تضاعف عدد الترانزستورات في الدائرة المتكاملة تقريبًا كل عامين",
    option_b_en: "The number of transistors remains constant and never changes over time",
    option_b_ar: "ثبات عدد الترانزستورات وعدم تغيرها عبر الزمن نهائياً",
    option_c_en: "Energy consumption in traditional computers doubles annually",
    option_c_ar: "زيادة استهلاك الطاقة في الحواسيب التقليدية بمقدار الضعف سنوياً",
    option_d_en: "Computing and data processing capabilities decrease over the years",
    option_d_ar: "انخفاض قدرات الحوسبة ومعالجة البيانات مع مرور السنوات",
    correct_option: "A",
    explanation_en: "Moore's Law states that the number of transistors on an integrated circuit doubles approximately every two years, leading to dramatic improvements in computing power.",
    explanation_ar: "ينص قانون مور على أن عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريبًا كل عامين، مما أدى إلى تحسينات هائلة في قدرة الحوسبة.",
  },
  {
    id: "q1-1-wb4",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "An educational and training style in which lessons and study materials are delivered exclusively or partially via the Internet is:",
    question_ar: "نمط تعليمي وتدريبي تُقدم فيه الدروس والمواد التعليمية حصراً أو جزئياً عبر شبكة الإنترنت هو:",
    option_a_en: "E-commerce",
    option_a_ar: "التجارة الإلكترونية",
    option_b_en: "Remote Work",
    option_b_ar: "العمل عن بعد",
    option_c_en: "Online Learning",
    option_c_ar: "التعلم عبر الإنترنت",
    option_d_en: "Cashless Payment",
    option_d_ar: "الدفع غير النقدي",
    correct_option: "C",
    explanation_en: "Online Learning is the educational style where lessons and study materials are delivered via the Internet.",
    explanation_ar: "التعلم عبر الإنترنت هو أسلوب تعليمي تُقدَّم فيه الدروس والمواد الدراسية عبر الإنترنت.",
  },
  // ==== LESSON 1-1: Model C Weekly Assessment ====
  {
    id: "q1-1-wc1",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Electronic computers began to appear and were used mainly for military purposes and scientific calculations using vacuum tubes in the period:",
    question_ar: "بدأت الحواسيب الإلكترونية في الظهور واستُخدمت أساساً للأغراض العسكرية والحسابات العلمية مثل حاسوب ENIAC باستخدام الصمامات (المفرغة) في فترة:",
    option_a_en: "The 1940s",
    option_a_ar: "الأربعينيات",
    option_b_en: "The 1970s",
    option_b_ar: "السبعينيات",
    option_c_en: "The 1990s",
    option_c_ar: "التسعينيات",
    option_d_en: "The first decade of the millennium",
    option_d_ar: "العقد الأول من الألفية",
    correct_option: "A",
    explanation_en: "In the 1940s-60s, the first computers like ENIAC appeared, using vacuum tubes, mainly for military and scientific computation.",
    explanation_ar: "في الأربعينيات-الستينيات، ظهرت أولى الحواسيب مثل ENIAC، باستخدام الصمامات المفرغة، وكانت تُستخدم أساساً في الحسابات العسكرية والعلمية.",
  },
  {
    id: "q1-1-wc2",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "A computing principle or approach that uses quantum mechanics properties to process information and may provide an advantage in specific categories of problems is:",
    question_ar: "مبدأ أو نهج حوسبي يستخدم خصائص ميكانيكا الكم لمعالجة المعلومات وقد يوفر تفوقًا في فئات محددة من المسائل هو:",
    option_a_en: "Edge Computing",
    option_a_ar: "الحوسبة الطرفية",
    option_b_en: "Quantum Computing",
    option_b_ar: "الحوسبة الكمومية",
    option_c_en: "Cashless Payment",
    option_c_ar: "الدفع غير النقدي",
    option_d_en: "Social Networking",
    option_d_ar: "شبكات التواصل الاجتماعي",
    correct_option: "B",
    explanation_en: "Quantum Computing uses quantum mechanics principles (like superposition and entanglement) to process information, potentially solving problems much faster than classical computers.",
    explanation_ar: "الحوسبة الكمومية تستخدم مبادئ ميكانيكا الكم (مثل التراكب والتشابك) لمعالجة المعلومات، مع إمكانية حل المشكلات بشكل أسرع بكثير من الحواسيب الكلاسيكية.",
  },
  {
    id: "q1-1-wc3",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Platforms that allow users to connect and publish and share content rapidly and are very effective in spreading information are:",
    question_ar: "منصات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته بسرعة وتُعد فعالة جداً في نشر المعلومات هي:",
    option_a_en: "Social Networking Services (SNS)",
    option_a_ar: "شبكات التواصل الاجتماعي (SNS)",
    option_b_en: "E-commerce",
    option_b_ar: "التجارة الإلكترونية",
    option_c_en: "Remote Work",
    option_c_ar: "العمل عن بعد",
    option_d_en: "Cloud Computing",
    option_d_ar: "الحوسبة السحابية",
    correct_option: "A",
    explanation_en: "SNS (Social Networking Services) are platforms that allow users to connect, publish, and share content rapidly. They are highly effective at spreading information.",
    explanation_ar: "شبكات التواصل الاجتماعي (SNS) منصات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته بسرعة. وهي فعالة جداً في نشر المعلومات.",
  },
  {
    id: "q1-1-wc4",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "A work style in which a person performs their tasks and functions from home or from another remote location using communication technologies and the Internet is called:",
    question_ar: "أسلوب عمل يؤدي فيه الشخص مهامه ووظائفه من المنزل أو من موقع آخر بعيد باستخدام تقنيات الاتصال والإنترنت يُسمى:",
    option_a_en: "Online Learning",
    option_a_ar: "التعلم عبر الإنترنت",
    option_b_en: "Remote Work",
    option_b_ar: "العمل عن بعد",
    option_c_en: "Autonomous Driving",
    option_c_ar: "القيادة الذاتية",
    option_d_en: "Edge Computing",
    option_d_ar: "الحوسبة الطرفية",
    correct_option: "B",
    explanation_en: "Remote Work is the working style where a person performs tasks from home or remote locations using the Internet.",
    explanation_ar: "العمل عن بُعد هو أسلوب العمل الذي يؤدي فيه الشخص مهامه من المنزل أو من مواقع بعيدة باستخدام الإنترنت.",
  },
  // ==== LESSON 1-1: Qubit question ====
  {
    id: "q1-1-qubit",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "HARD",
    source: "HOMEWORK",
    question_en: "What distinguishes the qubit from the 'classical bit' in quantum computing?",
    question_ar: "ما الذي يميز الكيوبت عن 'البت الكلاسيكي' في الحوسبة الكمومية؟",
    option_a_en: "It holds a specific state of 0 or 1 at all times",
    option_a_ar: "يحمل حالة محددة واحدة إما 0 أو 1 في كل وقت",
    option_b_en: "It uses the quantum superposition principle to be a mixture of 0 and 1 at the same time",
    option_b_ar: "يستخدم مبدأ التراكب الكمي ليكون مزيجًا من 0 و1 في نفس الوقت",
    option_c_en: "It relies only on traditional integrated circuits and stability of electric current",
    option_c_ar: "يعتمد فقط على الدوائر المتكاملة التقليدية وثبات التيار الكهربائي",
    option_d_en: "Its use is limited exclusively to simple calculations",
    option_d_ar: "يقتصر استخدامه حصرياً على الحسابات البسيطة",
    correct_option: "B",
    explanation_en: "A qubit uses quantum superposition — it can exist in a combination of 0 and 1 states simultaneously, unlike a classical bit which must be either 0 or 1.",
    explanation_ar: "الكيوبت يستخدم التراكب الكمي — يمكنه أن يوجد في مزيج من حالتي 0 و1 في آنٍ واحد، على عكس البت الكلاسيكي الذي يجب أن يكون إما 0 أو 1.",
  },
  {
    id: "q1-1-cashless",
    lesson: "1-1",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "HOMEWORK",
    question_en: "What is meant by the term 'Cashless Payment'?",
    question_ar: "ما المقصود بمصطلح الدفع غير النقدي (Cashless Payment)؟",
    option_a_en: "Selling goods and services and buying them from physical stores using paper money",
    option_a_ar: "بيع السلع والخدمات وشراؤها من المتاجر الفعلية باستخدام النقد الورقي",
    option_b_en: "Paying the value of goods or services by non-cash means such as cards, phone apps, or QR codes",
    option_b_ar: "دفع قيمة السلع أو الخدمات بوسائل غير نقدية مثل البطاقات أو تطبيقات الهاتف أو رموز QR",
    option_c_en: "Working from home using the Internet and email",
    option_c_ar: "العمل من المنزل باستخدام الإنترنت والبريد الإلكتروني",
    option_d_en: "Delivering lessons and educational materials via the Internet to users",
    option_d_ar: "تقديم الدروس والمواد التعليمية عبر الإنترنت للمستخدمين",
    correct_option: "B",
    explanation_en: "Cashless payment is paying for goods or services without using physical cash — using cards, mobile apps, QR codes, etc.",
    explanation_ar: "الدفع غير النقدي هو دفع قيمة السلع أو الخدمات دون استخدام النقد المادي — باستخدام البطاقات أو تطبيقات الهاتف أو رموز QR وغيرها.",
  },
  // ==== LESSON 1-2: How AI Works — Classroom Tasks ====
  {
    id: "q1-2-c1",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "CLASSROOM",
    question_en: "Which of the following options represents the broad field that includes computer systems capable of performing tasks such as learning, predicting, and recognizing speech and images?",
    question_ar: "أي من الخيارات التالية يمثل المجال الواسع الذي يضم أنظمة حاسوبية تستطيع تنفيذ مهام مثل التعلم والتنبؤ والتعرف على الكلام والصور؟",
    option_a_en: "Deep Learning",
    option_a_ar: "التعلم العميق",
    option_b_en: "Artificial Intelligence",
    option_b_ar: "الذكاء الاصطناعي",
    option_c_en: "Machine Learning",
    option_c_ar: "تعلم الآلة",
    option_d_en: "Generative AI",
    option_d_ar: "الذكاء الاصطناعي التوليدي",
    correct_option: "B",
    explanation_en: "Artificial Intelligence (AI) is the broad field encompassing computer systems that can learn, reason, and perform intelligent human-like behaviors.",
    explanation_ar: "الذكاء الاصطناعي هو المجال الواسع الذي يشمل الأنظمة الحاسوبية التي يمكنها التعلم والاستدلال وتنفيذ سلوكيات ذكية مشابهة للإنسان.",
  },
  {
    id: "q1-2-c2",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "CLASSROOM",
    question_en: "What is Machine Learning from the perspective of the hierarchy of AI technologies?",
    question_ar: "ماذا يُعد التعلم الآلي (Machine Learning) من منظور تسلسل تقنيات الذكاء الاصطناعي؟",
    option_a_en: "A branch of AI in which models learn patterns from data",
    option_a_ar: "فرع من الذكاء الاصطناعي تتعلم فيه النماذج أنماطًا من البيانات",
    option_b_en: "A style that relies exclusively on non-connected neural networks",
    option_b_ar: "أسلوب يعتمد حصرياً على شبكات عصبية غير متصلة",
    option_c_en: "A system for generating images and videos exclusively without training data",
    option_c_ar: "نظام لتوليد الصور ومقاطع الفيديو حصرياً دون بيانات تدريب",
    option_d_en: "A set of rules programmed manually in a strict and fixed manner",
    option_d_ar: "مجموعة من القواعد المبرمجة يدوياً بشكل صارم وثابت",
    correct_option: "A",
    explanation_en: "Machine Learning is a branch of AI where models learn patterns from data to make predictions or classifications, rather than following explicitly programmed rules.",
    explanation_ar: "تعلم الآلة هو فرع من الذكاء الاصطناعي تتعلم فيه النماذج أنماطاً من البيانات لإجراء تنبؤات أو تصنيفات، بدلاً من اتباع قواعد مبرمجة بشكل صريح.",
  },
  // ==== LESSON 1-2: Homework ====
  {
    id: "q1-2-h1",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "HOMEWORK",
    question_en: "What is the term that describes a style of machine learning that relies on multi-layered neural networks to learn complex representations and patterns?",
    question_ar: "ما هو المصطلح الذي يصف أسلوباً من أساليب التعلم الآلي يعتمد على شبكات عصبية متعددة الطبقات لتعلم تمثيلات وأنماط معقدة؟",
    option_a_en: "Machine Learning",
    option_a_ar: "تعلم الآلة",
    option_b_en: "Generative AI",
    option_b_ar: "الذكاء الاصطناعي التوليدي",
    option_c_en: "Deep Learning",
    option_c_ar: "التعلم العميق",
    option_d_en: "Spam filter",
    option_d_ar: "مرشح الرسائل المزعجة",
    correct_option: "C",
    explanation_en: "Deep Learning is the style of machine learning that uses multi-layered neural networks to learn complex representations from large-scale data.",
    explanation_ar: "التعلم العميق هو أسلوب تعلم الآلة الذي يستخدم الشبكات العصبية متعددة الطبقات لتعلم تمثيلات معقدة من البيانات الضخمة.",
  },
  {
    id: "q1-2-h2",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "HOMEWORK",
    question_en: "What is the primary function of Generative AI systems?",
    question_ar: "ما هي الوظيفة الأساسية لأنظمة الذكاء الاصطناعي التوليدي؟",
    option_a_en: "Programming explicit rules for old computers",
    option_a_ar: "برمجة القواعد الصريحة للحواسيب القديمة",
    option_b_en: "Creating new content such as texts, images, audio, and software",
    option_b_ar: "إنشاء محتوى جديد مثل النصوص والصور والصوت والبرمجيات",
    option_c_en: "Classifying spam messages only without generating content",
    option_c_ar: "تصنيف رسائل البريد المزعجة فقط دون توليد محتوى",
    option_d_en: "Running integrated circuits according to Moore's Law",
    option_d_ar: "تشغيل الدوائر المتكاملة وفق قانون مور",
    correct_option: "B",
    explanation_en: "Generative AI's primary function is to create new content — including text, images, audio, and programs — using deep learning.",
    explanation_ar: "الوظيفة الأساسية للذكاء الاصطناعي التوليدي هي إنشاء محتوى جديد — بما في ذلك النصوص والصور والصوت والبرامج — باستخدام التعلم العميق.",
  },
  // ==== LESSON 1-2: Weekly Assessment Model A ====
  {
    id: "q1-2-wa1",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Which of the following techniques does the majority of modern generative AI systems rely on to create new content?",
    question_ar: "أي من التقنيات التالية تعتمد عليها غالبية أنظمة الذكاء الاصطناعي التوليدي الحديثة لإنشاء محتوى جديد؟",
    option_a_en: "Explicitly programmed rules",
    option_a_ar: "القواعد المبرمجة صراحة",
    option_b_en: "Deep learning models and neural networks",
    option_b_ar: "نماذج التعلم العميق والشبكات العصبية",
    option_c_en: "Edge computing and Moore's Law",
    option_c_ar: "الحوسبة الطرفية وقانون مور",
    option_d_en: "Classic fixed bits",
    option_d_ar: "البتات الكلاسيكية الثابتة",
    correct_option: "B",
    explanation_en: "Modern generative AI systems (like ChatGPT, DALL-E) are built on deep learning models and neural networks trained on large datasets.",
    explanation_ar: "أنظمة الذكاء الاصطناعي التوليدي الحديثة (مثل ChatGPT وDALL-E) مبنية على نماذج التعلم العميق والشبكات العصبية المدرّبة على مجموعات بيانات ضخمة.",
  },
  {
    id: "q1-2-wa2",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What is meant by 'hallucination' when generative AI produces text?",
    question_ar: "ماذا يُقصد بمصطلح الهلوسة عندما ينتج الذكاء الاصطناعي التوليدي نصاً؟",
    option_a_en: "Producing text that appears reasonable and logical but is factually incorrect",
    option_a_ar: "إنتاج نص يبدو معقولاً ومنطقياً لكنه غير صحيح واقعياً",
    option_b_en: "Complete stop of responding due to Internet interruption",
    option_b_ar: "التوقف التام عن الاستجابة بسبب انقطاع الإنترنت",
    option_c_en: "Generating accurate images that are 100% matching reality",
    option_c_ar: "توليد صور دقيقة بنسبة مئة بالمئة ومطابقة للواقع تماماً",
    option_d_en: "Classifying spam messages with extreme accuracy",
    option_d_ar: "تصنيف رسائل البريد المزعجة بدقة فائقة",
    correct_option: "A",
    explanation_en: "Hallucination in AI refers to when a generative AI produces content that seems plausible but is factually wrong. Always verify AI-generated information with reliable sources.",
    explanation_ar: "الهلوسة في الذكاء الاصطناعي تشير إلى عندما ينتج الذكاء الاصطناعي التوليدي محتوى يبدو معقولاً لكنه خاطئ واقعياً. يجب دائمًا التحقق من المعلومات المنتجة بالذكاء الاصطناعي من مصادر موثوقة.",
  },
  // ==== LESSON 1-2: Weekly Assessment Model B ====
  {
    id: "q1-2-wb1",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Which of the following is a direct example of machine learning applications?",
    question_ar: "أي من الخيارات التالية يُعد مثالاً مباشراً على تطبيقات تعلم الآلة؟",
    option_a_en: "Spam filters and product recommendations",
    option_a_ar: "مرشحات الرسائل المزعجة وتوصيات المنتجات",
    option_b_en: "Generating artistic images and complex videos",
    option_b_ar: "توليد الصور ومقاطع الفيديو الفنية المعقدة",
    option_c_en: "Processing data on peripheral devices for cars",
    option_c_ar: "معالجة البيانات على الأجهزة الطرفية للسيارات",
    option_d_en: "Running integrated circuits according to Moore's Law",
    option_d_ar: "تشغيل الدوائر المتكاملة وفق قانون مور",
    correct_option: "A",
    explanation_en: "Spam filters and product recommendations are classic examples of machine learning — they learn patterns from data to make predictions.",
    explanation_ar: "مرشحات الرسائل المزعجة وتوصيات المنتجات أمثلة كلاسيكية على تعلم الآلة — تتعلم الأنماط من البيانات لإجراء تنبؤات.",
  },
  {
    id: "q1-2-wb2",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What is the accurate description of Generative AI (GenAI)?",
    question_ar: "ما هو الوصف الدقيق للذكاء الاصطناعي التوليدي (GenAI)؟",
    option_a_en: "A system limited to classifying spam and removing viruses",
    option_a_ar: "نظام يقتصر على تصنيف البريد المزعج وإزالة الفيروسات",
    option_b_en: "AI that uses deep learning to generate new data such as texts and images",
    option_b_ar: "ذكاء اصطناعي يستخدم التعلم العميق لتوليد بيانات جديدة مثل النصوص والصور",
    option_c_en: "A computing technology that uses quantum mechanics and parallel processing",
    option_c_ar: "تقنية حوسبية تستخدم ميكانيكا الكم والمعالجة المتوازية",
    option_d_en: "A simple neural network with only one input and output layer",
    option_d_ar: "شبكة عصبية بسيطة ذات طبقة إدخال وإخراج واحدة فقط",
    correct_option: "B",
    explanation_en: "Generative AI uses deep learning to generate new data like text, images, audio, and code — going beyond classification to actual content creation.",
    explanation_ar: "الذكاء الاصطناعي التوليدي يستخدم التعلم العميق لتوليد بيانات جديدة مثل النصوص والصور والصوت والكود — متجاوزاً التصنيف إلى إنشاء المحتوى الفعلي.",
  },
  {
    id: "q1-2-wb3",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What are the layers between the input layer and the output layer in an artificial neural network called?",
    question_ar: "ماذا تسمى الطبقات الواقعة بين طبقة الإدخال وطبقة الإخراج في الشبكة العصبية الاصطناعية؟",
    option_a_en: "Hidden layers",
    option_a_ar: "الطبقات المخفية",
    option_b_en: "Peripheral layers",
    option_b_ar: "الطبقات الطرفية",
    option_c_en: "Cloud layers",
    option_c_ar: "الطبقات السحابية",
    option_d_en: "Linear layers",
    option_d_ar: "الطبقات الخطية",
    correct_option: "A",
    explanation_en: "In a neural network, the layers between the input and output layers are called 'hidden layers.' These are where the network learns complex patterns from data.",
    explanation_ar: "في الشبكة العصبية، الطبقات بين طبقة الإدخال وطبقة الإخراج تُسمى 'الطبقات المخفية'. وهنا تتعلم الشبكة الأنماط المعقدة من البيانات.",
  },
  {
    id: "q1-2-wb4",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What should students do to avoid the risks of 'hallucination' when using generative AI in preparing their school reports?",
    question_ar: "ما الذي يجب على المتعلمين فعله لتجنب مخاطر 'الهلوسة' عند استخدام الذكاء الاصطناعي التوليدي في إعداد تقاريرهم المدرسية؟",
    option_a_en: "Rely completely on the outputs without any human review",
    option_a_ar: "الاعتماد المطلق على المخرجات دون أي مراجعة بشرية",
    option_b_en: "Verify outputs and their sources and compare them with reliable facts",
    option_b_ar: "التحقق من المخرجات ومصادرها ومقارنتها بالحقائق الموثوقة",
    option_c_en: "Avoid using phones and computers completely and permanently",
    option_c_ar: "تجنب استخدام الهواتف والحواسيب بشكل كامل ودائم",
    option_d_en: "Copy texts literally and submit them directly to the teacher",
    option_d_ar: "نسخ النصوص حرفياً وتسليمها للمدرس مباشرة",
    correct_option: "B",
    explanation_en: "To avoid hallucination risks, students should always verify AI outputs against reliable sources and not accept AI-generated content at face value.",
    explanation_ar: "لتجنب مخاطر الهلوسة، يجب على الطلاب دائماً التحقق من مخرجات الذكاء الاصطناعي من مصادر موثوقة وعدم قبول المحتوى المنتج بالذكاء الاصطناعي كما هو.",
  },
  // ==== LESSON 1-2: Weekly Assessment Model C ====
  {
    id: "q1-2-wc1",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Most current AI systems are designed to perform:",
    question_ar: "معظم أنظمة الذكاء الاصطناعي الحالية تُصمم لأداء:",
    option_a_en: "A specific task or limited set of tasks (narrow AI)",
    option_a_ar: "مهمة محددة أو مجموعة محدودة من المهام (ضيق النطاق)",
    option_b_en: "Simulation of full human consciousness in all fields without restrictions",
    option_b_ar: "محاكاة الوعي البشري الكامل في جميع المجالات دون قيود",
    option_c_en: "Manual programming of old household electrical devices",
    option_c_ar: "برمجة الأجهزة الكهربائية المنزلية القديمة يدوياً",
    option_d_en: "Management of global military communication networks only",
    option_d_ar: "إدارة شبكات الاتصال العسكرية العالمية فقط",
    correct_option: "A",
    explanation_en: "Current AI is 'narrow AI' — designed for specific tasks. No AI system today has general human-level intelligence across all domains.",
    explanation_ar: "الذكاء الاصطناعي الحالي 'ضيق النطاق' — مصمم لمهام محددة. لا يوجد نظام ذكاء اصطناعي اليوم لديه ذكاء عام بمستوى بشري في جميع المجالات.",
  },
  {
    id: "q1-2-wc2",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "Which of the following options represents the most appropriate technology for complex image analysis tasks and advanced speech recognition?",
    question_ar: "أي من الخيارات الآتية يمثل التقنية الأنسب لمهام تحليل الصور المعقدة والتعرف المتقدم على الكلام؟",
    option_a_en: "Deep Learning based on multi-layered neural networks",
    option_a_ar: "التعلم العميق المعتمد على شبكات عصبية متعددة الطبقات",
    option_b_en: "Rules programmed manually in a fixed linear style",
    option_b_ar: "القواعد المبرمجة يدوياً بأسلوب خطي ثابت",
    option_c_en: "Traditional cloud computing without AI",
    option_c_ar: "الحوسبة السحابية التقليدية دون ذكاء اصطناعي",
    option_d_en: "E-commerce and cashless payment",
    option_d_ar: "التجارة الإلكترونية والدفع غير النقدي",
    correct_option: "A",
    explanation_en: "Deep Learning with multi-layered neural networks excels at complex tasks like image analysis and speech recognition, which simpler rule-based approaches cannot handle.",
    explanation_ar: "التعلم العميق بالشبكات العصبية متعددة الطبقات يتميز في المهام المعقدة مثل تحليل الصور والتعرف على الكلام، وهي مهام لا تستطيع الأساليب القائمة على القواعد البسيطة التعامل معها.",
  },
  {
    id: "q1-2-wc3",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "EASY",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What is the basic benefit of the speed provided by generative AI to students when preparing reports?",
    question_ar: "ما هي الفائدة الأساسية للسرعة التي يوفرها الذكاء الاصطناعي التوليدي للطالب عند إعداد التقارير؟",
    option_a_en: "Helping complete tasks quickly with the need to be alert to risks of inaccuracy",
    option_a_ar: "المساعدة في إنجاز المهام سريعاً مع ضرورة الانتباه لمخاطر عدم الصحة",
    option_b_en: "Guaranteeing the accuracy of all information 100% automatically",
    option_b_ar: "ضمان صحة جميع المعلومات بنسبة مئة بالمئة تلقائياً",
    option_c_en: "Completely replacing books and official school sources",
    option_c_ar: "الاستغناء التام عن الكتب والمصادر المدرسية الرسمية",
    option_d_en: "Preventing the hallucination phenomenon from ever occurring",
    option_d_ar: "منع حدوث ظاهرة الهلوسة نهائياً",
    correct_option: "A",
    explanation_en: "Generative AI can speed up task completion, but students must remain vigilant about accuracy since AI can produce plausible-sounding but incorrect information (hallucination).",
    explanation_ar: "يمكن للذكاء الاصطناعي التوليدي أن يُسرّع إنجاز المهام، لكن يجب على الطلاب البقاء يقظين بشأن الدقة نظرًا لأن الذكاء الاصطناعي يمكنه إنتاج معلومات تبدو معقولة لكنها خاطئة (الهلوسة).",
  },
  {
    id: "q1-2-wc4",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What is the correct procedure that should be followed when using generative AI tools in assignments and projects?",
    question_ar: "ما هو الإجراء السليم الذي ينبغي اتباعه عند استخدام أدوات الذكاء الاصطناعي التوليدي في الواجبات والمشاريع؟",
    option_a_en: "Always verify the accuracy of information and review original sources and references",
    option_a_ar: "التحقق الدائم من صحة المعلومات ومراجعة المصادر والمراجع الأصلية",
    option_b_en: "Consider everything screens produce as absolute scientific facts beyond question",
    option_b_ar: "اعتبار كل ما تنتجه الشاشات حقائق علمية مطلقة لا تقبل التشكيك",
    option_c_en: "Not writing any school research and relying entirely on AI",
    option_c_ar: "عدم كتابة أي أبحاث مدرسية والاعتماد على الذكاء الاصطناعي كلياً",
    option_d_en: "Sending AI outputs without reading or inspecting them",
    option_d_ar: "إرسال مخرجات الذكاء الاصطناعي دون قراءتها أو تفحصها",
    correct_option: "A",
    explanation_en: "The correct procedure is to always verify AI-generated information and check original sources — treating AI as a starting point, not a final authority.",
    explanation_ar: "الإجراء الصحيح هو التحقق دائمًا من المعلومات المنتجة بالذكاء الاصطناعي والرجوع إلى المصادر الأصلية — معاملة الذكاء الاصطناعي كنقطة بداية وليس سلطة نهائية.",
  },
  // ==== LESSON 1-2: Neural Network question ====
  {
    id: "q1-2-nn1",
    lesson: "1-2",
    unit: "1",
    type: "MCQ",
    difficulty: "MEDIUM",
    source: "WEEKLY_ASSESSMENT",
    question_en: "What are the basic components that make up the artificial neural network to learn complex patterns from data?",
    question_ar: "ما هي المكونات الأساسية التي تتكون منها الشبكة العصبية الاصطناعية لتعلم الأنماط المعقدة من البيانات؟",
    option_a_en: "Connected layers containing neuronal units whose weights change during training",
    option_a_ar: "طبقات متصلة تضم وحدات عصبونية تتغير أوزانها أثناء التدريب",
    option_b_en: "A set of vacuum tubes and simple electrical circuits",
    option_b_ar: "مجموعة من الصمامات المفرغة والدوائر الكهربائية البسيطة",
    option_c_en: "Fixed programming rules written with purely linear algorithms",
    option_c_ar: "قواعد برمجية ثابتة ومكتوبة بخوارزميات خطية بحتة",
    option_d_en: "Manual switches for regulating the flow of electric current in the processor",
    option_d_ar: "مفاتيح يدوية لتنظيم تدفق التيار الكهربائي في المعالج",
    correct_option: "A",
    explanation_en: "Artificial neural networks consist of connected layers of neurons (units) whose connection weights change (are adjusted) during the training process to learn patterns.",
    explanation_ar: "تتكون الشبكات العصبية الاصطناعية من طبقات متصلة من النيورونات (الوحدات) التي تتغير أوزان روابطها (تُضبط) أثناء عملية التدريب لتعلم الأنماط.",
  },
  // ==== WRITTEN QUESTIONS — LESSON 1-1 ====
  {
    id: "q1-1-w1",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    difficulty: "MEDIUM",
    source: "CLASSROOM",
    question_en: "Explain the development of information technology in the period from the 1940s to the 1960s, clarifying its main use in that period.",
    question_ar: "اشرح تطور تكنولوجيا المعلومات في الفترة الممتدة من الأربعينيات إلى الستينيات موضحًا استخدامها الأساسي في تلك الفترة.",
    ideal_answer_en: "In the 1940s-60s, the first electronic computers appeared, such as ENIAC, which used vacuum tubes. These computers were enormous in size (filling entire rooms) and were mainly used for military and scientific computation — such as calculating ballistic missile trajectories, weather prediction, and census data processing. They were not accessible to the general public.",
    ideal_answer_ar: "في الأربعينيات-الستينيات، ظهرت أولى الحواسيب الإلكترونية مثل ENIAC، والتي استخدمت الصمامات المفرغة. كانت هذه الحواسيب ضخمة الحجم (تملأ غرفاً بأكملها) وكانت تُستخدم أساساً في الحسابات العسكرية والعلمية — مثل حساب مسارات الصواريخ الباليستية والتنبؤ بالطقس ومعالجة بيانات التعداد السكاني. ولم تكن في متناول عامة الناس.",
    explanation_en: "Focus on: ENIAC, vacuum tubes, military/scientific use, large physical size.",
    explanation_ar: "ركّز على: ENIAC، الصمامات المفرغة، الاستخدام العسكري/العلمي، الحجم المادي الكبير.",
  },
  {
    id: "q1-1-w2",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    difficulty: "MEDIUM",
    source: "CLASSROOM",
    question_en: "Clarify what is meant by Moore's Law and whether it is considered a fixed physical law. Explain your answer.",
    question_ar: "وضّح المقصود بـ قانون مور وهل يُعد قانوناً فيزيائياً ثابتاً؟ فسّر إجابتك.",
    ideal_answer_en: "Moore's Law is the empirical observation (not a physical law) that the number of transistors on an integrated circuit doubles approximately every two years. It is NOT a fixed physical law — it is a historical trend/observation. In recent years it has been approaching a physical limit due to quantum tunneling effects and leakage current as circuits become extremely small. New approaches like parallel processing and quantum computing are being explored to continue improving performance.",
    ideal_answer_ar: "قانون مور هو ملاحظة تجريبية (وليس قانوناً فيزيائياً) تفيد بأن عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريبًا كل عامين. وهو ليس قانوناً فيزيائياً ثابتاً — بل هو اتجاه/ملاحظة تاريخية. في السنوات الأخيرة بات يقترب من حد فيزيائي بسبب تأثيرات النفق الكمومي وتيارات التسرب مع صغر الدوائر الشديد. يجري استكشاف مناهج جديدة مثل المعالجة المتوازية والحوسبة الكمومية لمواصلة تحسين الأداء.",
    explanation_en: "Key points: empirical observation, not physical law, approaching physical limit, quantum tunneling, new approaches.",
    explanation_ar: "النقاط الرئيسية: ملاحظة تجريبية، ليس قانوناً فيزيائياً، يقترب من الحد الفيزيائي، النفق الكمومي، مناهج جديدة.",
  },
  {
    id: "q1-1-w3",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    difficulty: "MEDIUM",
    source: "HOMEWORK",
    question_en: "Mention three social changes resulting from information technology.",
    question_ar: "اذكر ثلاثة تغييرات اجتماعية ناتجة عن تكنولوجيا المعلومات.",
    ideal_answer_en: "1. SNS (Social Networking Services): Platforms like Facebook and Twitter allow users to connect, communicate, and share information rapidly worldwide.\n2. E-commerce: Online platforms like Amazon allow buying and selling goods without physical stores.\n3. Remote Work: People can now work from home using the Internet, changing traditional office-based work culture.",
    ideal_answer_ar: "1. شبكات التواصل الاجتماعي (SNS): منصات مثل فيسبوك وتويتر تتيح للمستخدمين التواصل ومشاركة المعلومات بسرعة حول العالم.\n2. التجارة الإلكترونية: منصات إلكترونية مثل أمازون تتيح شراء وبيع البضائع دون متاجر مادية.\n3. العمل عن بُعد: أصبح بإمكان الناس العمل من المنزل باستخدام الإنترنت، مما غيّر ثقافة العمل المكتبي التقليدي.",
    explanation_en: "Can include any three of: SNS, e-commerce, remote work, online learning, cashless payment.",
    explanation_ar: "يمكن ذكر أي ثلاثة من: شبكات التواصل الاجتماعي، التجارة الإلكترونية، العمل عن بُعد، التعلم الإلكتروني، الدفع غير النقدي.",
  },
  {
    id: "q1-1-w4",
    lesson: "1-1",
    unit: "1",
    type: "WRITTEN",
    difficulty: "HARD",
    source: "CLASSROOM",
    question_en: "Clarify the characteristics and uses of the three notable emerging technologies mentioned in the lesson (autonomous driving, augmented/virtual reality, and quantum computing).",
    question_ar: "وضّح خصائص واستخدامات التقنيات الناشئة الثلاث البارزة المذكورة في الدرس (القيادة الذاتية، الواقع المعزز/الافتراضي، والحوسبة الكمومية).",
    ideal_answer_en: "1. Autonomous Driving: Uses AI, cameras, and sensors to drive a vehicle without human operation. Uses edge computing for instant on-board data processing to avoid dangerous delays.\n\n2. AR (Augmented Reality): Adds digital information on top of real-world images. Example: furniture placement apps, navigation overlays.\n   VR (Virtual Reality): Immerses the user in a fully computer-generated virtual environment. Example: gaming, training simulations.\n\n3. Quantum Computing: Uses quantum mechanics principles (superposition, entanglement) to process information. Qubits can be 0 and 1 simultaneously, potentially solving complex problems much faster than classical computers.",
    ideal_answer_ar: "1. القيادة الذاتية: تستخدم الذكاء الاصطناعي والكاميرات والمستشعرات لقيادة المركبة دون تدخل بشري. تستخدم الحوسبة الطرفية لمعالجة البيانات فورياً على متن المركبة لتجنب التأخيرات الخطيرة.\n\n2. الواقع المعزز (AR): يضيف معلومات رقمية فوق صور العالم الحقيقي. مثال: تطبيقات وضع الأثاث، تراكب الملاحة.\n   الواقع الافتراضي (VR): يُغمر المستخدم في بيئة افتراضية مولدة حاسوبياً بالكامل. مثال: الألعاب، محاكاة التدريب.\n\n3. الحوسبة الكمومية: تستخدم مبادئ ميكانيكا الكم (التراكب، التشابك) لمعالجة المعلومات. يمكن للكيوبت أن يكون 0 و1 في آنٍ واحد، مما يُتيح حل المشكلات المعقدة بشكل أسرع بكثير من الحواسيب الكلاسيكية.",
    explanation_en: "Score full marks by covering all three technologies with characteristics AND uses/examples for each.",
    explanation_ar: "احصل على الدرجة الكاملة بتغطية التقنيات الثلاث مع الخصائص والاستخدامات/الأمثلة لكل منها.",
  },
  // ==== LESSON 1-2 WRITTEN ====
  {
    id: "q1-2-w1",
    lesson: "1-2",
    unit: "1",
    type: "WRITTEN",
    difficulty: "HARD",
    source: "CLASSROOM",
    question_en: "Define Artificial Intelligence and clarify in three points the difference between machine learning, deep learning, and generative AI.",
    question_ar: "عرّف مفهوم الذكاء الاصطناعي، موضحًا في ثلاث نقاط الفرق بين التعلم الآلي والتعلم العميق والذكاء الاصطناعي التوليدي.",
    ideal_answer_en: "AI: A general term for technologies that reproduce intelligent human behavior on a computer, such as speech recognition, image recognition, and translation.\n\n1. Machine Learning: Learns patterns from data to make predictions and judgments (e.g., spam filters). Does not require explicit rule programming.\n\n2. Deep Learning: An advanced subset of machine learning using multi-layered neural networks. Requires large-scale data. Better at complex tasks like image analysis and speech synthesis.\n\n3. Generative AI: Uses deep learning to generate NEW data (text, images, audio, code). Example: ChatGPT, DALL-E. Risk: hallucination — may produce plausible but factually incorrect content.",
    ideal_answer_ar: "الذكاء الاصطناعي: مصطلح عام للتقنيات التي تُحاكي السلوك البشري الذكي على حاسوب، مثل التعرف على الكلام والصور والترجمة.\n\n1. تعلم الآلة: يتعلم الأنماط من البيانات لإجراء تنبؤات وأحكام (مثل مرشحات الرسائل المزعجة). لا يتطلب برمجة قواعد صريحة.\n\n2. التعلم العميق: مجموعة فرعية متقدمة من تعلم الآلة تستخدم الشبكات العصبية متعددة الطبقات. يتطلب بيانات ضخمة. أفضل في المهام المعقدة مثل تحليل الصور وتوليف الصوت.\n\n3. الذكاء الاصطناعي التوليدي: يستخدم التعلم العميق لتوليد بيانات جديدة (نصوص، صور، صوت، كود). مثال: ChatGPT، DALL-E. خطر: الهلوسة — قد ينتج محتوى يبدو معقولاً لكنه غير صحيح واقعياً.",
    explanation_en: "Key: AI definition + 3 clear distinctions between ML, DL, and GenAI with examples.",
    explanation_ar: "المفتاح: تعريف الذكاء الاصطناعي + 3 فروق واضحة بين تعلم الآلة والتعلم العميق والذكاء الاصطناعي التوليدي مع أمثلة.",
  },
  {
    id: "q1-2-w2",
    lesson: "1-2",
    unit: "1",
    type: "WRITTEN",
    difficulty: "MEDIUM",
    source: "CLASSROOM",
    question_en: "Explain how models in Machine Learning learn compared to traditional methods based on explicit rule programming.",
    question_ar: "اشرح كيف تتعلم النماذج في فرع التعلم الآلي مقارنة بالطرق التقليدية المعتمدة على البرمجة الصريحة للقواعد.",
    ideal_answer_en: "Traditional programming: A programmer writes explicit rules for every possible situation. Example: 'If email contains the word FREE, mark as spam.' This is rigid and cannot handle new patterns.\n\nMachine Learning: Instead of writing rules, you provide the model with thousands of examples of spam and non-spam emails. The model identifies patterns on its own and learns to classify new emails it has never seen before. As it processes more data, it improves its accuracy automatically.",
    ideal_answer_ar: "البرمجة التقليدية: يكتب المبرمج قواعد صريحة لكل موقف ممكن. مثال: 'إذا احتوى البريد الإلكتروني على كلمة مجاناً، صنّفه كبريد مزعج.' هذا صارم ولا يمكنه التعامل مع أنماط جديدة.\n\nتعلم الآلة: بدلاً من كتابة القواعد، تُزوّد النموذج بآلاف الأمثلة من رسائل البريد المزعجة وغير المزعجة. يُحدد النموذج الأنماط بنفسه ويتعلم تصنيف رسائل جديدة لم يرها من قبل. مع معالجة المزيد من البيانات، يُحسّن دقته تلقائياً.",
    explanation_en: "Key distinction: explicit rules vs learning from data/examples.",
    explanation_ar: "الفرق الرئيسي: القواعد الصريحة مقابل التعلم من البيانات/الأمثلة.",
  },
  ...OFFICIAL_ASSESSMENTS_L3,
  ...OFFICIAL_ASSESSMENTS_L4,
];
