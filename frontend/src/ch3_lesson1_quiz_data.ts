// ============================================================
// Chapter 3 · Lesson 1 — Interactive Real Quiz Data
// كويز تفاعلي لاختبار فهم وإتقان الدرس 3-1: البنية العامة لتطبيقات الويب
// 10 أسئلة متوازنة: 6 اختيار من متعدد + 4 أسئلة مقالية وتطبيقية
// ثنائي اللغة (عربي + إنجليزي) مع تصحيح فوري ونماذج إجابة معتمدة
// ============================================================

export interface Ch3QuizMcq {
  id: string;
  type: 'MCQ';
  lesson: '3-1';
  difficulty: 'MEDIUM' | 'HARD';
  lessonName_ar: string;
  lessonName_en: string;
  question_ar: string;
  question_en: string;
  option_a_ar: string; option_a_en: string;
  option_b_ar: string; option_b_en: string;
  option_c_ar: string; option_c_en: string;
  option_d_ar: string; option_d_en: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation_ar: string;
  explanation_en: string;
}

export interface Ch3QuizWritten {
  id: string;
  type: 'WRITTEN';
  lesson: '3-1';
  difficulty: 'MEDIUM' | 'HARD';
  lessonName_ar: string;
  lessonName_en: string;
  question_ar: string;
  question_en: string;
  ideal_answer_ar: string;
  ideal_answer_en: string;
  grading_criteria_ar: string[];
  grading_criteria_en: string[];
  marks: number;
}

export type Ch3QuizQuestion = Ch3QuizMcq | Ch3QuizWritten;

export const CH3_L1_QUIZ_MCQS: Ch3QuizMcq[] = [
  {
    id: 'c3-qz-mcq-01',
    type: 'MCQ',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'أي من التطبيقات التالية يُمثل تطبيق ويب (Web Application) لا يتطلب تثبيتاً محلياً على الجهاز؟',
    question_en: 'Which of the following represents a web application requiring zero local software installation?',
    option_a_ar: 'تطبيق الآلة الحاسبة المدمج في نظام تشغيل الحاسوب',
    option_a_en: 'Built-in desktop OS calculator app',
    option_b_ar: 'موقع خرائط وتصفح عبر الإنترنت مثل Google Maps',
    option_b_en: 'Online web mapping service such as Google Maps',
    option_c_ar: 'برنامج تشغيل الفيديو وتعديل المقاطع المثبت محلياً',
    option_c_en: 'Locally installed desktop media player',
    option_d_ar: 'برنامج معالجة الصور الرقمية المكتبي',
    option_d_en: 'Local desktop image processing software',
    correct_option: 'B',
    explanation_ar: 'موقع الخرائط يعمل عبر متصفح الويب متصلاً بخوادم بعيدة دون الحاجة لتثبيته على الجهاز.',
    explanation_en: 'Online mapping services operate inside web browsers querying remote servers without local installation.',
  },
  {
    id: 'c3-qz-mcq-02',
    type: 'MCQ',
    lesson: '3-1',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'في موقع لمشاركة مقاطع الفيديو، أين تقع مسؤولية (تجميع عدد المشاهدات الفعلي واختيار قائمة الفيديوهات المقترحة)؟',
    question_en: 'On a video sharing website, which tier is responsible for aggregating view counts and computing video recommendations?',
    option_a_ar: 'الواجهة الأمامية داخل متصفح المستخدم',
    option_a_en: 'The Frontend tier running in client browser',
    option_b_ar: 'طبقة قاعدة البيانات المستقلة',
    option_b_en: 'The Database persistence layer',
    option_c_ar: 'الواجهة الخلفية (خادم المعالجة ومنطق الأعمال)',
    option_c_en: 'The Backend tier (processing and business logic server)',
    option_d_ar: 'مزود خدمة الإنترنت للعميل',
    option_d_en: 'The Client Internet Service Provider',
    correct_option: 'C',
    explanation_ar: 'تجميع الإحصائيات وتشغيل خوارزميات التوصية هما عمليات حساب وقرارات ومعالجة، وهي وظيفة الواجهة الخلفية.',
    explanation_en: 'Aggregating metrics and running recommendation algorithms are business logic processes handled by the backend.',
  },
  {
    id: 'c3-qz-mcq-03',
    type: 'MCQ',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'عند قيام عميل بالنقر على زر "تأكيد الدفع" في متجر إلكتروني، أي طبقة ترسل طلب الدفع وتتعامل مع نتيجته؟',
    question_en: 'When a customer clicks "Confirm Payment" in an online store, which tier dispatches the payment request and parses its result?',
    option_a_ar: 'الواجهة الأمامية',
    option_a_en: 'The Frontend tier',
    option_b_ar: 'الواجهة الخلفية',
    option_b_en: 'The Backend tier',
    option_c_ar: 'قاعدة البيانات',
    option_c_en: 'The Database tier',
    option_d_ar: 'شاشة سلة التسوق',
    option_d_en: 'The Cart Screen',
    correct_option: 'B',
    explanation_ar: 'معالجة الدفع والتواصل المشفر مع بوابات الدفع البنكية هو عمل معالجة وتحكم تختص به الواجهة الخلفية.',
    explanation_en: 'Handling encrypted payment requests and checking transaction authorization is performed by the backend.',
  },
  {
    id: 'c3-qz-mcq-04',
    type: 'MCQ',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'في شبكة للتواصل الاجتماعي، حفظ بيانات المنشورات وعلاقات المتابعة (من يتابع من) والرسائل الخاصة يقع في:',
    question_en: 'In a social network, storing post records, follower graphs, and private messages is the role of:',
    option_a_ar: 'خادم المعالجة ومنطق الأعمال',
    option_a_en: 'Business logic server',
    option_b_ar: 'شاشة الخط الزمني',
    option_b_en: 'Timeline feed display',
    option_c_ar: 'الواجهة الأمامية',
    option_c_en: 'The Frontend tier',
    option_d_ar: 'طبقة قاعدة البيانات',
    option_d_en: 'The Database tier',
    correct_option: 'D',
    explanation_ar: 'الدور الرئيسي لطبقة قاعدة البيانات هو التخزين الدائم لجميع السجلات والعلاقات.',
    explanation_en: 'The foundational purpose of the database tier is persistent storage of records and relationships.',
  },
  {
    id: 'c3-qz-mcq-05',
    type: 'MCQ',
    lesson: '3-1',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'في تطبيق حجز مواعيد عيادة: فتحت صفحة الحجز بنجاح ولكن قائمة المواعيد المتاحة فارغة تماماً. ما التشخيص الهندسي الصحيح؟',
    question_en: 'In a medical clinic booking app: the booking page opens fine, but the available time slots list is completely blank. What is the correct diagnostic evaluation?',
    option_a_ar: 'الواجهة الأمامية تعطلت والواجهة الخلفية تعمل بنجاح',
    option_a_en: 'Frontend failed while backend operates normally',
    option_b_ar: 'الواجهة الأمامية تعمل بنجاح والخلل غالباً في الواجهة الخلفية أو قاعدة البيانات',
    option_b_en: 'Frontend works properly; failure is likely in the backend or database',
    option_c_ar: 'جميع الطبقات الثلاث تعطلت بالكامل في نفس الوقت',
    option_c_en: 'All three tiers failed completely at the same time',
    option_d_ar: 'المتصفح هو المسؤول عن جلب المواعيد وتخزينها',
    option_d_en: 'The web browser is responsible for retrieving and storing appointment records',
    correct_option: 'B',
    explanation_ar: 'بما أن واجهة الحجز وتصميمها فُتحت بنجاح، فالأمامية تعمل. وعدم ظهور البيانات الحية يدل على فشل في المعالجة أو استعلام قاعدة البيانات.',
    explanation_en: 'Because the UI layout opened successfully, the frontend functions properly. Missing data indicates failure during backend querying or DB retrieval.',
  },
  {
    id: 'c3-qz-mcq-06',
    type: 'MCQ',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'عند البحث عن سلعة في متجر إلكتروني، ما هو الدور المحدد لطبقة قاعدة البيانات في دورة تدفق الطلب؟',
    question_en: 'When searching for an item in an online store, what is the specific role of the Database tier in the request lifecycle?',
    option_a_ar: 'عرض مربع البحث واستقبال الحروف من المستخدم',
    option_a_en: 'Rendering the search bar and reading keystrokes',
    option_b_ar: 'البحث في جداول المنتجات وإعادة السجلات المطابقة إلى الواجهة الخلفية',
    option_b_en: 'Querying product tables and returning matching records to the backend',
    option_c_ar: 'إرسال نتائج البحث مباشرة للمستخدم دون المرور بالخادم',
    option_c_en: 'Sending results directly to user screen bypassing the server',
    option_d_ar: 'ترتيب وتنسيق واجهات الموقع وتلوين الأزرار',
    option_d_en: 'Formatting UI widgets and button styling',
    correct_option: 'B',
    explanation_ar: 'قاعدة البيانات تستلم الاستعلام من الواجهة الخلفية، وتبحث داخل جداولها وتعيد السجلات الخام المطابقة للواجهة الخلفية.',
    explanation_en: 'The database executes the backend query against indexed tables and returns matching records back to the backend.',
  },
];

export const CH3_L1_QUIZ_WRITTEN: Ch3QuizWritten[] = [
  {
    id: 'c3-qz-w-01',
    type: 'WRITTEN',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'عرّف تطبيق الويب، واذكر الطبقات الرئيسة الثلاث التي يتكون منها مبيناً وظيفة كل طبقة بإيجاز.',
    question_en: 'Define a web application, and list its three main cooperating tiers stating the concise role of each.',
    ideal_answer_ar: '• تعريف تطبيق الويب: برنامج حاسوبي يتم تشغيله والوصول إليه عبر متصفح الويب دون الحاجة لتثبيته محلياً على الجهاز.\n• الطبقات الثلاث ووظائفها:\n  1. الواجهة الأمامية (Frontend): عرض الشاشات والواجهات واستقبال مدخلات وإجراءات المستخدم.\n  2. الواجهة الخلفية (Backend): معالجة البيانات، تطبيق منطق العمل، التحقق من تسجيل الدخول والمصادقة، وإجراء الحسابات.\n  3. قاعدة البيانات (Database): حفظ وتنظيم البيانات وسجلات المستخدمين بشكل دائم واسترجاعها عند الطلب.',
    ideal_answer_en: '• Definition: Software operated and accessed through a web browser with zero local installation required.\n• The Three Tiers:\n  1. Frontend: Renders screens and collects user interactions.\n  2. Backend: Business logic execution, authentication, validation, and calculations.\n  3. Database: Permanent persistence and querying of data records.',
    grading_criteria_ar: [
      'تعريف تطبيق الويب كبرنامج يعمل عبر المتصفح دون تثبيت (درجة)',
      'ذكر الواجهة الأمامية ودورها في العرض واستقبال الإدخال (درجة)',
      'ذكر الواجهة الخلفية ودورها في المعالجة ومنطق العمل (درجة)',
      'ذكر قاعدة البيانات ودورها في التخزين الدائم والاسترجاع (درجة)',
    ],
    grading_criteria_en: [
      'Defining web application as browser-based with zero installs (1 mark)',
      'Naming Frontend and its presentation/input role (1 mark)',
      'Naming Backend and its processing/logic role (1 mark)',
      'Naming Database and its permanent storage/retrieval role (1 mark)',
    ],
    marks: 4,
  },
  {
    id: 'c3-qz-w-02',
    type: 'WRITTEN',
    lesson: '3-1',
    difficulty: 'HARD',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'تتبع بالترتيب خطوات تدفق طلب البحث عن منتج في متجر إلكتروني عبر الطبقات الثلاث من البداية حتى ظهور النتائج للمستخدم.',
    question_en: 'Trace the ordered request-response flow for searching a product in an online store across all three tiers until results are displayed.',
    ideal_answer_ar: '1. الواجهة الأمامية: يستقبل مربع البحث كلمة البحث المدخلة من المستخدم.\n2. الواجهة الأمامية ← الخلفية: تُرسل الكلمة عبر المتصفح في طلب للواجهة الخلفية.\n3. الواجهة الخلفية: تستقبل الطلب وتصيغ استعلاماً لقاعدة البيانات للبحث عن المنتجات المطابقة.\n4. قاعدة البيانات: تنفذ الاستعلام في جداولها وتعيد المنتجات المطابقة للواجهة الخلفية.\n5. الواجهة الخلفية: تنظم النتائج وترتبها وتنسقها استجابةً للطلب.\n6. الواجهة الخلفية ← الأمامية: تعرض الواجهة الأمامية قائمة المنتجات وصورها وأسعارها على شاشة المستخدم.',
    ideal_answer_en: '1. Frontend: Collects search keywords typed into search bar.\n2. Frontend → Backend: Dispatches query payload to backend server.\n3. Backend: Parses request and queries database for matching items.\n4. Database: Executes search query and returns matching records to backend.\n5. Backend: Sorts, formats, and packages results into response.\n6. Backend → Frontend: Frontend receives data and renders formatted product cards on screen.',
    grading_criteria_ar: [
      'ذكر الخطوة 1 و 2 (استقبال الكلمة وإرسالها للخلفية) (درجة)',
      'ذكر الخطوة 3 و 4 (استعلام قاعدة البيانات وإرجاع المنتجات) (درجة)',
      'ذكر الخطوة 5 و 6 (تنظيم النتائج وعرضها في الأمامية) (درجة)',
      'صحة الترتيب الزمني بين الطبقات الثلاث (درجة)',
    ],
    grading_criteria_en: [
      'Stating steps 1 & 2 (Frontend input & dispatch) (1 mark)',
      'Stating steps 3 & 4 (Backend query & DB return) (1 mark)',
      'Stating steps 5 & 6 (Formatting & Frontend rendering) (1 mark)',
      'Correct chronological sequence across tiers (1 mark)',
    ],
    marks: 4,
  },
  {
    id: 'c3-qz-w-03',
    type: 'WRITTEN',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'في منصة لمشاركة الفيديوهات (مثل YouTube)، اذكر وظيفة واحدة محددة لكل طبقة من الطبقات الثلاث.',
    question_en: 'In a video sharing platform (e.g. YouTube), state one specific responsibility assigned to each of the three tiers.',
    ideal_answer_ar: '• الواجهة الأمامية: توفير مشغل الفيديو (عناصر التشغيل والإيقاف وتعديل الجودة) وشاشات البحث وأزرار الإعجاب.\n• الواجهة الخلفية: تجميع عدد المشاهدات الفعلي وتشغيل خوارزميات التوصية لاختيار الفيديوهات المقترحة.\n• قاعدة البيانات: تخزين سجل المشاهدات السابقة للمستخدمين ومعلومات القنوات وروابط ملفات الفيديو.',
    ideal_answer_en: '• Frontend: Provides video player controls (play/pause/quality), search bar, and like/comment buttons.\n• Backend: Tallies verified view counts and runs recommendation algorithms for suggested videos.\n• Database: Stores past viewing history, user account details, and video metadata records.',
    grading_criteria_ar: [
      'وظيفة الواجهة الأمامية في الفيديو (مشغل الفيديو / شاشة البحث) (درجة)',
      'وظيفة الواجهة الخلفية في الفيديو (تجميع المشاهدات / التوصيات) (درجة)',
      'وظيفة قاعدة البيانات في الفيديو (سجل المشاهدات / تخزين بيانات الفيديو) (درجة)',
    ],
    grading_criteria_en: [
      'Frontend role in video app (player / search UI) (1 mark)',
      'Backend role in video app (view tally / recommendation feed) (1 mark)',
      'Database role in video app (watch history / video metadata) (1 mark)',
    ],
    marks: 3,
  },
  {
    id: 'c3-qz-w-04',
    type: 'WRITTEN',
    lesson: '3-1',
    difficulty: 'MEDIUM',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    question_ar: 'لماذا تُفضّل الشركات تقسيم تطبيق الويب إلى ثلاث طبقات بدلاً من دمجه في برنامج واحد؟ اذكر فائدتين رئيستين.',
    question_en: 'Why do organizations decouple web apps into three separate tiers instead of a single program? State two key benefits.',
    ideal_answer_ar: '1. سهولة الصيانة والتطوير المستقل: يمكن تعديل تصميم وشاشات الواجهة الأمامية دون الحاجة لإعادة كتابة كود الواجهة الخلفية أو المساس بقاعدة البيانات.\n2. تعزيز الأمان: عزل قاعدة البيانات خلف خادم المعالجة يمنع وصول المستخدمين المباشر إليها، مما يحمي البيانات الحساسة من التلاعب والاختراق.\n(كما تتيح قابلية التوسع لترقية خوادم المعالجة بحسب الضغط).',
    ideal_answer_en: '1. Independent Development & Maintenance: Frontend visuals can be redesigned without touching backend logic or database schemas.\n2. Enhanced Security: Isolating the database behind the backend logic server prevents direct client exposure and data tampering.\n(Also provides scalability to upgrade servers independently).',
    grading_criteria_ar: [
      'ذكر ميزة سهولة الصيانة والتطوير المستقل (درجة ونصف)',
      'ذكر ميزة الأمان وعزل قاعدة البيانات أو قابلية التوسع (درجة ونصف)',
    ],
    grading_criteria_en: [
      'Mentioning independent development and maintenance (1.5 marks)',
      'Mentioning security isolation of database or scalability (1.5 marks)',
    ],
    marks: 3,
  },
];

