// ============================================================
// Chapter 3 · Lesson 1 — Visual Review Notes & Flashcards Data
// نوتات وبطاقات مراجعة الدرس 3-1: البنية العامة لتطبيقات الويب
// خالية تماماً من أي أيقونات أو إيموجي — مربعات ملونة دلالية في صف واحد متناسق
// ============================================================

export interface ReviewMiniBlock {
  tag_ar: string;
  tag_en: string;
  title_ar: string;
  title_en: string;
  text_ar: string;
  text_en: string;
  highlight_ar?: string;
  highlight_en?: string;
  colorVariant?: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan' | 'slate';
}

export interface ReviewComparisonRow {
  aspect_ar: string;
  aspect_en: string;
  col1_ar: string;
  col1_en: string;
  col2_ar: string;
  col2_en: string;
}

export interface ReviewFlashcard {
  id: string;
  cardNumber: number;
  lesson: '3-1';
  lessonName_ar: string;
  lessonName_en: string;
  category_ar: string;
  category_en: string;
  title_ar: string;
  title_en: string;
  summary_ar: string;
  summary_en: string;
  blocks: ReviewMiniBlock[];
  comparison?: {
    header1_ar: string;
    header1_en: string;
    header2_ar: string;
    header2_en: string;
    rows: ReviewComparisonRow[];
  };
  goldenRule_ar: string;
  goldenRule_en: string;
  checkQuestion_ar: string;
  checkQuestion_en: string;
  checkAnswer_ar: string;
  checkAnswer_en: string;
}

export const CHAPTER3_L1_REVIEW_FLASHCARDS: ReviewFlashcard[] = [
  // ── CARD 1: What is a Web App? ─────────────────────────────
  {
    id: 'c3-fc-01',
    cardNumber: 1,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'مفهوم أساسي',
    category_en: 'Core Concept',
    title_ar: 'مفهوم تطبيق الويب (Web Application) ومقارنته بالتطبيقات المكتبية',
    title_en: 'What is a Web Application? Web vs Desktop Applications',
    summary_ar: 'تطبيق الويب هو برنامج يتم تشغيله واستخدامه عبر متصفح الإنترنت دون الحاجة لتثبيت برامج مخصصة على جهاز المستخدم.',
    summary_en: 'A web application is software accessed through a web browser without installing dedicated desktop programs.',
    blocks: [
      {
        tag_ar: 'التعريف المعتمد',
        tag_en: 'Official Definition',
        title_ar: '1. تعريف تطبيق الويب',
        title_en: '1. Web App Definition',
        text_ar: 'برنامج حاسوبي يعمل على خوادم بعيدة ويتم الوصول إليه والتفاعل معه مباشرة عبر متصفح الويب (مثل Chrome أو Edge) عبر الإنترنت أو شبكة محلية.',
        text_en: 'A program running on remote servers that users interact with through standard web browsers over the Internet or local network.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الميزة الجوهرية',
        tag_en: 'Key Advantage',
        title_ar: '2. لا يحتاج لتثبيت محلي',
        title_en: '2. Zero Local Installation',
        text_ar: 'طالما يمتلك المستخدم متصفحاً واتصالاً بالشبكة، يمكنه فتح التطبيق واستخدامه فوراً من أي جهاز (حاسوب، هاتف، تابلت) دون تنزيل أو تثبيت.',
        text_en: 'Accessible instantly from any device with a browser and connectivity, requiring no local setup or manual software downloads.',
        colorVariant: 'emerald',
      },
      {
        tag_ar: 'أمثلة وزارية معتمدة',
        tag_en: 'Curriculum Examples',
        title_ar: '3. أمثلة من حياتنا اليومية',
        title_en: '3. Real-world Examples',
        text_ar: '• يوتيوب (YouTube): لمشاهدة ومشاركة الفيديوهات.\n• أمازون (Amazon): للتسوق الإلكتروني.\n• خرائط جوجل (Google Maps): للملاحة والتصفح.\n• جيميل (Gmail): للبريد الإلكتروني.',
        text_en: '• YouTube: Video streaming and sharing.\n• Amazon: Online e-commerce shopping.\n• Google Maps: Online mapping and navigation.\n• Gmail: Webmail communication.',
        colorVariant: 'violet',
      },
    ],
    comparison: {
      header1_ar: 'تطبيق الويب (Web App)',
      header1_en: 'Web Application',
      header2_ar: 'التطبيق المكتبي التقليدي (Desktop App)',
      header2_en: 'Desktop Application',
      rows: [
        {
          aspect_ar: 'طريقة التشغيل',
          aspect_en: 'Execution',
          col1_ar: 'يعمل داخل متصفح الويب عبر الخادم',
          col1_en: 'Runs inside a web browser hosted on servers',
          col2_ar: 'مثبت ومخزن مباشرة على القرص الصلب للجهاز',
          col2_en: 'Installed locally on the local hard drive',
        },
        {
          aspect_ar: 'التثبيت والتحديث',
          aspect_en: 'Installation & Updates',
          col1_ar: 'لا يحتاج لتثبيت، والتحديث تلقائي على الخادم',
          col1_en: 'No local installation; server updates automatically',
          col2_ar: 'يتطلب تثبيتاً يدوياً وتحديثات دورية على كل جهاز',
          col2_en: 'Requires manual setup and individual updates per machine',
        },
        {
          aspect_ar: 'أمثلة من كتاب الوزارة',
          aspect_en: 'Curriculum Examples',
          col1_ar: 'موقع خرائط على الإنترنت، متجر إلكتروني، بريد ويب',
          col1_en: 'Online maps, e-commerce stores, webmail',
          col2_ar: 'برنامج تشغيل فيديو على الجهاز، الآلة الحاسبة، محرر صور محلي',
          col2_en: 'Local media players, desktop calculator, local image editors',
        },
      ],
    },
    goldenRule_ar: 'القاعدة الذهبية: تطبيق الويب يعمل بالكامل عبر المتصفح دون تثبيت (مثل خرائط الإنترنت والمتجر)، بينما مشغل الفيديو والآلة الحاسبة على الجهاز تطبيقات مكتبية.',
    goldenRule_en: 'Golden Rule: Web apps run via browsers without local installs (online maps, stores); media players and local calculators are desktop software.',
    checkQuestion_ar: 'سؤال سريع: أي من التالي يُعد تطبيق ويب حقيقي: أ) برنامج تشغيل فيديو مثبت على الحاسوب، ب) موقع خرائط وتصفح على الإنترنت؟ ولماذا؟',
    checkQuestion_en: 'Quick Check: Which is a genuine web app: A) local media player, B) online mapping service? Why?',
    checkAnswer_ar: 'الإجابة: (ب) موقع الخرائط على الإنترنت؛ لأنه يعمل عبر متصفح الويب دون الحاجة لتثبيته محلياً على الجهاز.',
    checkAnswer_en: 'Answer: (B) Online mapping service; because it operates through a web browser with zero local installation required.',
  },

  // ── CARD 2: Three-Tier Architecture Overview ───────────────
  {
    id: 'c3-fc-02',
    cardNumber: 2,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'هيكلية النظام',
    category_en: 'System Architecture',
    title_ar: 'البنية العامة لتطبيقات الويب: نموذج الطبقات الثلاث (Three-Tier)',
    title_en: 'The Three-Tier Architecture: Frontend, Backend, and Database',
    summary_ar: 'الفكرة الرئيسة لتطبيقات الويب هي أنها لا تُبنى ككتلة واحدة جامدة، بل تتكون من 3 طبقات مستقلة تتعاون معاً لتحويل إجراء المستخدم إلى نتيجة.',
    summary_en: 'Web apps are structured into three distinct collaborating tiers: presentation, processing, and data storage.',
    blocks: [
      {
        tag_ar: 'الطبقة 1: العرض',
        tag_en: 'Tier 1: Presentation',
        title_ar: '1. الواجهة الأمامية (Frontend)',
        title_en: '1. Frontend Tier',
        text_ar: '• الجزء المرئي للمستخدم على شاشة المتصفح.\n• المسؤولية: عرض الشاشات والواجهات، واستقبال إدخالات المستخدم وأوامره (مربع البحث، أزرار النقر، الاستمارات).',
        text_en: '• What users see on screen.\n• Responsibilities: Renders UI views and collects user keystrokes, form submissions, and button clicks.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الطبقة 2: المعالجة',
        tag_en: 'Tier 2: Business Logic',
        title_ar: '2. الواجهة الخلفية (Backend)',
        title_en: '2. Backend Tier',
        text_ar: '• خادم المعالجة الخفي الذي لا يراه المستخدم.\n• المسؤولية: معالجة البيانات، تطبيق قواعد العمل، التحقق من تسجيل الدخول والمصادقة، وإرسال الاستعلامات لقاعدة البيانات.',
        text_en: '• Hidden server-side engine.\n• Responsibilities: Business logic execution, authentication, validation, payment routing, and database querying.',
        colorVariant: 'amber',
      },
      {
        tag_ar: 'الطبقة 3: التخزين',
        tag_en: 'Tier 3: Persistence',
        title_ar: '3. قاعدة البيانات (Database)',
        title_en: '3. Database Tier',
        text_ar: '• المستودع الدائم لحفظ وتنظيم البيانات.\n• المسؤولية: حفظ السجلات الدائمة واسترجاعها بدقة عند طلب الواجهة الخلفية (مثل: حسابات العملاء، سجل الطلبات، أسعار المنتجات).',
        text_en: '• Permanent storage engine.\n• Responsibilities: Retaining and querying persistent records (user accounts, orders, product catalogs, follow lists).',
        colorVariant: 'emerald',
      },
    ],
    goldenRule_ar: 'الفكرة الرئيسة للبنية العامة: تطبيقات الويب تُبنى من 3 طبقات رئيسة تتعاون معاً (أمامية للعرض + خلفية للمعالجة + قاعدة بيانات للتخزين).',
    goldenRule_en: 'Core Architecture Principle: Web apps are built from three cooperating tiers: Frontend (Presentation) + Backend (Processing) + Database (Storage).',
    checkQuestion_ar: 'سؤال سريع: ما الفكرة الأساسية التي تقوم عليها بنية تطبيقات الويب في كتاب الوزارة؟',
    checkQuestion_en: 'Quick Check: What is the foundational architectural concept of web applications in the curriculum?',
    checkAnswer_ar: 'الإجابة: تعاون ثلاث طبقات رئيسة معاً: الواجهة الأمامية، والواجهة الخلفية، وقاعدة البيانات، وليست طبقة واحدة معزولة.',
    checkAnswer_en: 'Answer: The active cooperation of three core tiers: Frontend, Backend, and Database, rather than a single monolithic program.',
  },

  // ── CARD 3: Frontend Deep Dive ─────────────────────────────
  {
    id: 'c3-fc-03',
    cardNumber: 3,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'تحليل طبقة',
    category_en: 'Tier Breakdown',
    title_ar: 'الواجهة الأمامية (Frontend): العرض وجمع إجراءات المستخدم',
    title_en: 'Frontend Tier: UI Presentation & User Input Capture',
    summary_ar: 'الواجهة الأمامية هي البوابة التي يتواصل المستخدم من خلالها مع التطبيق عبر المتصفح؛ وظيفتها الأساسية العرض والجمع فقط.',
    summary_en: 'The frontend serves as the direct touchpoint in the browser: presenting visuals and collecting actions without permanent storage.',
    blocks: [
      {
        tag_ar: 'أين تعمل؟',
        tag_en: 'Runtime Environment',
        title_ar: '1. تعمل داخل المتصفح (Client-Side)',
        title_en: '1. Runs in Web Browser',
        text_ar: 'يتم تنزيل كود الواجهة الأمامية مؤقتاً في متصفح المستخدم (HTML/CSS/JS) لترجمة التصميم والواجهات على شاشة الحاسوب أو الهاتف.',
        text_en: 'Delivered dynamically to run inside the user browser, rendering visual layouts, styling, and interactive interface elements.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الوظائف الرئيسة',
        tag_en: 'Core Functions',
        title_ar: '2. العرض وجمع بيانات المستخدم',
        title_en: '2. Display & Input Capture',
        text_ar: '• عرض القوائم والصور والفيديوهات والمحتوى المنسق.\n• استقبال مدخلات المستخدم: نقرات الأزرار، كلمات البحث، وتعبئة نماذج التسجيل.',
        text_en: '• Renders formatted lists, catalogs, video players, and media.\n• Captures keystrokes, button presses, search queries, and form inputs.',
        colorVariant: 'emerald',
      },
      {
        tag_ar: 'ما لا تستطيع فعله',
        tag_en: 'Boundaries',
        title_ar: '3. حدود الواجهة الأمامية (قيود هامة)',
        title_en: '3. Architectural Limits',
        text_ar: 'الواجهة الأمامية لا تخزن البيانات الدائمة بمفردها، ولا تتصل بقاعدة البيانات مباشرة لأسباب أمنية؛ بل ترسل كل طلباتها للواجهة الخلفية.',
        text_en: 'The frontend cannot store permanent records directly nor connect straight to the database; it must pass requests to the backend.',
        colorVariant: 'rose',
      },
    ],
    goldenRule_ar: 'قاعدة الامتحان: كل ما يراه المستخدم ويتفاعل معه (شاشة البحث، مربع الإدخال، صفحة المنتج) هو من مسؤوليات الواجهة الأمامية (Frontend).',
    goldenRule_en: 'Exam Rule: Everything the user directly sees or types into (search boxes, product listings, input forms) belongs to the Frontend tier.',
    checkQuestion_ar: 'سؤال سريع: في موقع تجارة إلكترونية، أي طبقة مسؤولة عن عرض مربع البحث واستقبال اسم المنتج من المشتري؟',
    checkQuestion_en: 'Quick Check: In an online store, which tier displays the search bar and collects the item keywords?',
    checkAnswer_ar: 'الإجابة: الواجهة الأمامية (Frontend).',
    checkAnswer_en: 'Answer: The Frontend tier.',
  },

  // ── CARD 4: Backend Deep Dive ──────────────────────────────
  {
    id: 'c3-fc-04',
    cardNumber: 4,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'تحليل طبقة',
    category_en: 'Tier Breakdown',
    title_ar: 'الواجهة الخلفية (Backend): عقل التطبيق والمعالجة والقرارات',
    title_en: 'Backend Tier: Processing Engine, Business Logic, and Decisions',
    summary_ar: 'الواجهة الخلفية تعمل على الخادم بعيداً عن أعين المستخدم؛ هي المسؤولة عن معالجة الطلبات، اتخاذ القرارات، وتأمين البيانات.',
    summary_en: 'Operating server-side out of user view, the backend processes computations, enforces rules, and orchestrates database access.',
    blocks: [
      {
        tag_ar: 'المصادقة والأمان',
        tag_en: 'Authentication & Security',
        title_ar: '1. التحقق من تسجيل الدخول',
        title_en: '1. Login & Auth Verification',
        text_ar: 'فحص اسم المستخدم وكلمة المرور المشفرة، وإصدار جلسات الأمان، والتأكد من امتلاك المستخدم صلاحية الوصول للصفحة أو الخدمة.',
        text_en: 'Validating credentials, hashing passwords, managing user sessions, and enforcing role authorization before granting access.',
        colorVariant: 'violet',
      },
      {
        tag_ar: 'منطق الأعمال والقرارات',
        tag_en: 'Business Rules',
        title_ar: '2. اتخاذ القرارات ومعالجة الدفع',
        title_en: '2. Decision Logic & Payments',
        text_ar: '• حساب أسعار السلة والضرائب، وإرسال طلبات الدفع الإلكتروني للبنوك والتعامل مع نتائجها.\n• تجميع الإحصائيات (مثل عدد المشاهدات وتحديد الفيديوهات الموصى بها).',
        text_en: '• Totaling shopping carts, computing taxes, communicating with payment gateways, and logging purchase outcomes.\n• Aggregating metrics like views and running recommendation algorithms.',
        colorVariant: 'amber',
      },
      {
        tag_ar: 'حلقة الوصل',
        tag_en: 'Bridge Role',
        title_ar: '3. التوسط مع قاعدة البيانات',
        title_en: '3. Querying the Database',
        text_ar: 'الواجهة الخلفية هي الطبقة الوحيدة المصرح لها بإرسال استعلامات البحث وتحديث البيانات إلى قاعدة البيانات وحمايتها من وصول العملاء المباشر.',
        text_en: 'The backend serves as the sole secure intermediary authorized to execute read/write queries against database tables.',
        colorVariant: 'blue',
      },
    ],
    goldenRule_ar: 'قاعدة الامتحان: أي عملية تتضمن (تحقق من دخول، معالجة دفع، حساب عمليات، تحديد الفيديوهات الموصى بها، إرسال إشعارات) هي وظيفة الواجهة الخلفية (Backend).',
    goldenRule_en: 'Exam Rule: Any operation involving authentication, payment routing, recommendation algorithms, or notifications is handled by the Backend.',
    checkQuestion_ar: 'سؤال سريع: عند النقر على "إتمام الدفع" في موقع تسوق، أي طبقة ترسل طلب الدفع وتتعامل مع نتيجته؟',
    checkQuestion_en: 'Quick Check: When clicking "Checkout", which tier communicates with the payment gateway and handles the result?',
    checkAnswer_ar: 'الإجابة: الواجهة الخلفية (Backend).',
    checkAnswer_en: 'Answer: The Backend tier.',
  },

  // ── CARD 5: Database Deep Dive ─────────────────────────────
  {
    id: 'c3-fc-05',
    cardNumber: 5,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'تحليل طبقة',
    category_en: 'Tier Breakdown',
    title_ar: 'طبقة قاعدة البيانات (Database): التخزين الدائم واسترجاع السجلات',
    title_en: 'Database Tier: Persistent Storage & Reliable Record Retrieval',
    summary_ar: 'قاعدة البيانات هي المستودع المنظم والمؤمن الذي يحفظ بيانات التطبيق وسجلات المستخدمين بشكل دائم حتى بعد إغلاق المتصفح.',
    summary_en: 'The database is the organized, indexed system responsible for storing records permanently and retrieving them upon request.',
    blocks: [
      {
        tag_ar: 'الوظيفة الجوهرية',
        tag_en: 'Core Role',
        title_ar: '1. التخزين الدائم (Persistence)',
        title_en: '1. Permanent Data Storage',
        text_ar: 'حفظ السجلات بصورة مستمرة لا تزول بانقطاع الاتصال أو إغلاق التطبيق، مع فهرسة الجداول لتمكين البحث والاسترجاع الفوري.',
        text_en: 'Maintaining permanent records across sessions, indexing tables to enable rapid search, retrieval, and relational integrity.',
        colorVariant: 'emerald',
      },
      {
        tag_ar: 'أمثلة السجلات المخزنة',
        tag_en: 'Stored Data Examples',
        title_ar: '2. ما الذي يُخزن في قاعدة البيانات؟',
        title_en: '2. Typical Stored Records',
        text_ar: '• في المتجر: بيانات المنتجات، الأسعار، المخزون، وسجل الطلبات السابقة.\n• في الشبكات الاجتماعية: بيانات المنشورات، الرسائل، وعلاقات المتابعة.\n• في الفيديو: حسابات المشتركين وسجل المشاهدات.',
        text_en: '• E-commerce: Product catalogs, inventory counts, pricing tables, customer order archives.\n• Social Media: Post contents, direct messages, followers list.\n• Video Platforms: User accounts, viewing histories.',
        colorVariant: 'cyan',
      },
      {
        tag_ar: 'طريقة التعامل',
        tag_en: 'Access Model',
        title_ar: '3. لا تتصل بالمستخدم مباشرة',
        title_en: '3. No Direct User Access',
        text_ar: 'تستقبل قاعدة البيانات أوامرها حصرياً من الواجهة الخلفية؛ لا يرى المستخدم قاعدة البيانات ولا يكتب فيها مباشرة لأسباب تتعلق بالأمان وسلامة البيانات.',
        text_en: 'Operates behind the backend firewall; users never query or interact directly with raw database storage.',
        colorVariant: 'slate',
      },
    ],
    goldenRule_ar: 'قاعدة الامتحان: الدور الرئيسي لقاعدة البيانات هو (تخزين البيانات واسترجاعها) مثل: سجل الطلبات، علاقات المتابعة، وسجل المشاهدات.',
    goldenRule_en: 'Exam Rule: The primary role of the Database tier is storage and retrieval (e.g. order history, follow relationships, watch history).',
    checkQuestion_ar: 'سؤال سريع: في شبكة تواصل اجتماعي، أين تُخزن بيانات المنشورات وعلاقات المتابعة بين المستخدمين؟',
    checkQuestion_en: 'Quick Check: In a social network, where are posts and follower relationships stored permanently?',
    checkAnswer_ar: 'الإجابة: في طبقة قاعدة البيانات (Database Tier).',
    checkAnswer_en: 'Answer: In the Database Tier.',
  },

  // ── CARD 6: 6-Step Request-Response Flow ───────────────────
  {
    id: 'c3-fc-06',
    cardNumber: 6,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'تسلسل خطوات',
    category_en: 'Step-by-Step Flow',
    title_ar: 'تدفق الطلب بين الطبقات الثلاث: دورة البحث عن منتج في متجر',
    title_en: '6-Step Request Flow: How the Three Tiers Cooperate in Search',
    summary_ar: 'خطوات تدفق الطلب الست التي توضح كيفية تعاون الطبقات الثلاث لتحويل كلمة بحث يدخلها المستخدم إلى نتائج معروضة على الشاشة.',
    summary_en: 'The canonical 6-step lifecycle demonstrating end-to-end cooperation across presentation, logic, and database storage.',
    blocks: [
      {
        tag_ar: 'الخطوة 1',
        tag_en: 'Step 1',
        title_ar: '1. إدخال المستخدم (Frontend)',
        title_en: '1. User Enters Query',
        text_ar: 'يكتب المستخدم كلمة البحث (مثل: "حاسوب محمول") في مربع البحث في الواجهة الأمامية.',
        text_en: 'The user types a keyword query into the frontend search input field inside the browser.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الخطوة 2',
        tag_en: 'Step 2',
        title_ar: '2. إرسال الطلب (HTTP Request)',
        title_en: '2. Dispatching Request',
        text_ar: 'ترسل الواجهة الأمامية كلمة البحث عبر المتصفح إلى خادم الواجهة الخلفية.',
        text_en: 'The frontend sends an HTTP request payload containing the keywords to the backend server.',
        colorVariant: 'cyan',
      },
      {
        tag_ar: 'الخطوة 3',
        tag_en: 'Step 3',
        title_ar: '3. الاستعلام (Backend → DB)',
        title_en: '3. Querying Database',
        text_ar: 'تستقبل الواجهة الخلفية الطلب وتجري استعلاماً في قاعدة البيانات للبحث عن المنتجات المطابقة.',
        text_en: 'The backend sanitizes the input and queries the database for records matching criteria.',
        colorVariant: 'amber',
      },
      {
        tag_ar: 'الخطوة 4',
        tag_en: 'Step 4',
        title_ar: '4. إرجاع السجلات (DB → Backend)',
        title_en: '4. DB Returns Records',
        text_ar: 'تنفذ قاعدة البيانات الاستعلام وتعيد بيانات المنتجات المطابقة إلى الواجهة الخلفية.',
        text_en: 'The database engine executes the query and returns matching raw product records to the backend.',
        colorVariant: 'rose',
      },
      {
        tag_ar: 'الخطوة 5',
        tag_en: 'Step 5',
        title_ar: '5. المعالجة والتنظيم (Backend)',
        title_en: '5. Formatting Response',
        text_ar: 'ترتب الواجهة الخلفية النتائج وتنسقها (حسب السعر أو التقييم) وترسلها استجابةً للواجهة الأمامية.',
        text_en: 'The backend sorts, formats, and packages results into a response payload dispatched to the frontend.',
        colorVariant: 'emerald',
      },
      {
        tag_ar: 'الخطوة 6',
        tag_en: 'Step 6',
        title_ar: '6. عرض النتائج (Frontend)',
        title_en: '6. Displaying to User',
        text_ar: 'تعرض الواجهة الأمامية قائمة المنتجات وصورها وأسعارها على شاشة المستخدم بشكل منظم.',
        text_en: 'The frontend receives the data and renders the formatted product cards and images on screen.',
        colorVariant: 'violet',
      },
    ],
    goldenRule_ar: 'تسلسل الطلب المعتمد: واجهة أمامية (جمع) ← واجهة خلفية (طلب) ← قاعدة بيانات (بحث وإرجاع) ← واجهة خلفية (تنظيم) ← واجهة أمامية (عرض).',
    goldenRule_en: 'Request Lifecycle: Frontend collects → Backend routes → Database queries & returns → Backend organizes → Frontend displays.',
    checkQuestion_ar: 'سؤال سريع: عند البحث عن منتج في متجر، أي طبقة تبحث فعلياً داخل السجلات وتعيد المنتجات المطابقة للواجهة الخلفية؟',
    checkQuestion_en: 'Quick Check: During search, which tier searches raw records and passes matches to the backend?',
    checkAnswer_ar: 'الإجابة: طبقة قاعدة البيانات (Database Tier).',
    checkAnswer_en: 'Answer: The Database tier.',
  },

  // ── CARD 7: Case Study 1: E-Commerce ───────────────────────
  {
    id: 'c3-fc-07',
    cardNumber: 7,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'دراسة حالة وزارية',
    category_en: 'Curriculum Case Study',
    title_ar: 'تكامل الطبقات الثلاث في: موقع التجارة الإلكترونية (E-Commerce)',
    title_en: 'Three-Tier Architecture in Action: E-Commerce Platforms',
    summary_ar: 'توزيع دقيق ومفصل للمسؤوليات في المتجر الإلكتروني بين الشاشات المرئية ومنطق المعالجة وتخزين السجلات.',
    summary_en: 'Functional tier segregation in e-commerce: browsing catalogs, verifying inventory/payments, and archiving orders.',
    blocks: [
      {
        tag_ar: 'الواجهة الأمامية',
        tag_en: 'Frontend',
        title_ar: '1. شاشات العرض والتسوق',
        title_en: '1. Storefront UI',
        text_ar: '• صفحة عرض قائمة المنتجات والصور.\n• شاشة سلة المشتريات (Cart Screen).\n• نموذج إدخال عنوان الشحن وبيانات البطاقة.',
        text_en: '• Product catalog display pages and galleries.\n• Shopping cart view.\n• Checkout forms for shipping and card entry.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الواجهة الخلفية',
        tag_en: 'Backend',
        title_ar: '2. منطق المعالجة والتحقق',
        title_en: '2. Business Processing',
        text_ar: '• معالجة فحص توفر المخزون (Stock checking).\n• معالجة وإرسال طلبات الدفع الإلكتروني للبنوك.\n• التحقق من تسجيل دخول العميل ورموز الخصم.',
        text_en: '• Stock availability verification logic.\n• Payment gateway transaction processing.\n• Customer authentication and promo code validation.',
        colorVariant: 'amber',
      },
      {
        tag_ar: 'قاعدة البيانات',
        tag_en: 'Database',
        title_ar: '3. حفظ السجلات الدائمة',
        title_en: '3. Data Records',
        text_ar: '• تخزين معلومات وبيانات العملاء والحسابات.\n• تخزين أسعار المنتجات وتفاصيل المخزون.\n• تخزين سجل الطلبات والفواتير المكتملة.',
        text_en: '• Customer profile and credential archives.\n• Product specifications and live stock counts.\n• Historic order logs, receipts, and invoices.',
        colorVariant: 'emerald',
      },
    ],
    goldenRule_ar: 'في المتجر الإلكتروني: شاشة السلة وقائمة المنتجات = أمامية | فحص المخزون والدفع = خلفية | سجل الطلبات وبيانات العملاء = قاعدة بيانات.',
    goldenRule_en: 'In E-commerce: Cart & Catalog = Frontend | Stock check & Payment = Backend | Orders & Customer archives = Database.',
    checkQuestion_ar: 'سؤال سريع: في متجر إلكتروني، صنف كلاً من: (شاشة السلة)، (معالجة الدفع)، (تخزين سجل الطلبات) بحسب طبقتها.',
    checkQuestion_en: 'Quick Check: Classify into tiers: (Cart Screen), (Payment Processing), (Order History Storage).',
    checkAnswer_ar: 'الإجابة: شاشة السلة (واجهة أمامية)، معالجة الدفع (واجهة خلفية)، تخزين سجل الطلبات (قاعدة بيانات).',
    checkAnswer_en: 'Answer: Cart screen (Frontend), Payment processing (Backend), Order history storage (Database).',
  },

  // ── CARD 8: Case Study 2: Video Sharing ────────────────────
  {
    id: 'c3-fc-08',
    cardNumber: 8,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'دراسة حالة وزارية',
    category_en: 'Curriculum Case Study',
    title_ar: 'تكامل الطبقات الثلاث في: موقع مشاركة الفيديو (Video Sharing)',
    title_en: 'Three-Tier Architecture in Action: Video Sharing Services',
    summary_ar: 'كيف تتعاون الطبقات الثلاث في منصات مثل يوتيوب لعرض الفيديو، تجميع المشاهدات، والتوصية بالفيديوهات وتخزينها.',
    summary_en: 'Cooperative roles in video platforms: playback controls, view counters and recommendation algorithms, and video metadata storage.',
    blocks: [
      {
        tag_ar: 'الواجهة الأمامية',
        tag_en: 'Frontend',
        title_ar: '1. مشغل الفيديو وشاشة البحث',
        title_en: '1. Player & Search UI',
        text_ar: '• مشغل الفيديو (عناصر التشغيل والإيقاف والجودة).\n• شاشة البحث عن الفيديوهات.\n• أزرار الإعجاب والاشتراك وكتابة التعليقات.',
        text_en: '• Video playback controls, scrubber, and resolution toggle.\n• Search query bar.\n• Like, Subscribe, and comment submission widgets.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الواجهة الخلفية',
        tag_en: 'Backend',
        title_ar: '2. تجميع المشاهدات وخوارزمية التوصية',
        title_en: '2. Aggregation & Recommendations',
        text_ar: '• تجميع واحتساب عدد المشاهدات الفعلي.\n• تشغيل خوارزميات التوصية لاختيار الفيديوهات المقترحة لكل مستخدم.\n• معالجة وضغط الفيديو المرفوع.',
        text_en: '• Aggregating verified view counts.\n• Computing personalized recommendation feeds.\n• Video transcoding, compression, and delivery streaming.',
        colorVariant: 'amber',
      },
      {
        tag_ar: 'قاعدة البيانات',
        tag_en: 'Database',
        title_ar: '3. تخزين بيانات الفيديو والمستخدمين',
        title_en: '3. Video Metadata & Histories',
        text_ar: '• تخزين سجل المشاهدات السابقة للمستخدم.\n• تخزين معلومات الحسابات وقنوات المشتركين.\n• تخزين روابط ملفات الفيديو والنصوص والتعليقات.',
        text_en: '• User viewing history and watch-later queues.\n• Account profiles and subscriber relations.\n• Video storage URLs, metadata tags, and comments.',
        colorVariant: 'emerald',
      },
    ],
    goldenRule_ar: 'في موقع الفيديو: مشغل الفيديو = أمامية | تجميع عدد المشاهدات واختيار الفيديوهات المقترحة = خلفية | تخزين سجل المشاهدات وبيانات الفيديو = قاعدة بيانات.',
    goldenRule_en: 'In Video Platforms: Player = Frontend | View tallying & Recommendation feed = Backend | Viewing history & Video metadata = Database.',
    checkQuestion_ar: 'سؤال سريع: في موقع مشاركة الفيديو، إلى أي طبقة تتبع عملية (تجميع عدد المشاهدات واختيار الفيديوهات الموصى بها)؟',
    checkQuestion_en: 'Quick Check: In a video platform, which tier tallies view counts and selects recommended videos?',
    checkAnswer_ar: 'الإجابة: الواجهة الخلفية (Backend).',
    checkAnswer_en: 'Answer: The Backend tier.',
  },

  // ── CARD 9: Case Study 3: Social Media ─────────────────────
  {
    id: 'c3-fc-09',
    cardNumber: 9,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'دراسة حالة وزارية',
    category_en: 'Curriculum Case Study',
    title_ar: 'تكامل الطبقات الثلاث في: شبكات التواصل الاجتماعي (Social Media)',
    title_en: 'Three-Tier Architecture in Action: Social Media Networks',
    summary_ar: 'توزيع المهام في تطبيقات التواصل الاجتماعي بين شاشة التايم لاين، معالجة الإشعارات والجمهور، وتخزين الرسائل والمتابعين.',
    summary_en: 'Tier breakdown in social apps: timelines and compose forms, notification engines and audience filters, and relationship graph storage.',
    blocks: [
      {
        tag_ar: 'الواجهة الأمامية',
        tag_en: 'Frontend',
        title_ar: '1. الخط الزمني وشاشات النشر',
        title_en: '1. Timeline & Post UI',
        text_ar: '• شاشة الخط الزمني (Timeline / Feed).\n• شاشة كتابة ونشر المنشورات والصور.\n• شاشة الإشعارات وصندوق الرسائل الواردة.',
        text_en: '• Feed timeline display.\n• Post composition and photo uploader box.\n• Notification drop-down and direct messaging UI.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'الواجهة الخلفية',
        tag_en: 'Backend',
        title_ar: '2. معالجة الإشعارات وتحديد الجمهور',
        title_en: '2. Notifications & Audience Logic',
        text_ar: '• تحديد الجمهور المستهدف لكل منشور (عام / أصدقاء).\n• معالجة وإرسال الإشعارات الفورية عند تفاعل الآخرين.\n• تصفية المحتوى والتحقق من صلاحيات المشاهدة.',
        text_en: '• Applying audience visibility filters (Public vs Friends).\n• Processing and firing push notifications on interactions.\n• Content moderation filters and permission checks.',
        colorVariant: 'violet',
      },
      {
        tag_ar: 'قاعدة البيانات',
        tag_en: 'Database',
        title_ar: '3. تخزين المنشورات وعلاقات المتابعة',
        title_en: '3. Posts & Graph Storage',
        text_ar: '• تخزين نصوص المنشورات وتواريخ نشرها.\n• تخزين شبكة علاقات المتابعة (من يتابع من؟).\n• تخزين الرسائل الخاصة وسجلات المحادثات.',
        text_en: '• Storing post text, timestamps, and reaction counts.\n• Storing the follower/following relationship graph.\n• Direct message histories and user profile archives.',
        colorVariant: 'emerald',
      },
    ],
    goldenRule_ar: 'في شبكة التواصل: شاشة المنشور والتايم لاين = أمامية | تحديد الجمهور وإرسال الإشعارات = خلفية | تخزين المنشورات وعلاقات المتابعة = قاعدة بيانات.',
    goldenRule_en: 'In Social Media: Timeline & Post UI = Frontend | Audience logic & Notifications = Backend | Storing posts & Follow graph = Database.',
    checkQuestion_ar: 'سؤال سريع: ما الطبقة المسؤولة عن التحكم في الإشعارات الفورية وتحديد الجمهور المستهدف للمنشورات؟',
    checkQuestion_en: 'Quick Check: Which tier controls real-time notifications and determines target audiences for posts?',
    checkAnswer_ar: 'الإجابة: الواجهة الخلفية (Backend).',
    checkAnswer_en: 'Answer: The Backend tier.',
  },

  // ── CARD 10: Troubleshooting & Fault Diagnosis ─────────────
  {
    id: 'c3-fc-10',
    cardNumber: 10,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'تفكير هندسي وتشخيص',
    category_en: 'Engineering & Diagnosis',
    title_ar: 'تشخيص الأعطال في تطبيقات الويب: تحديد الطبقة المتعطلة',
    title_en: 'Fault Diagnosis in Web Apps: Identifying Which Tier Failed',
    summary_ar: 'تدريب تفكير هندسي من كتاب الوزارة (سيناريو العيادة الطبية وتطبيق الطقس) لتحديد أي طبقة تعمل بنجاح وأيها تعرضت للعطل.',
    summary_en: 'Curriculum engineering practice: diagnosing system faults across tiers in healthcare appointment and weather applications.',
    blocks: [
      {
        tag_ar: 'السيناريو 1: العيادة الطبية',
        tag_en: 'Scenario 1: Clinic App',
        title_ar: '1. صفحة الحجز تفتح لكن المواعيد لا تظهر',
        title_en: '1. Page Opens but No Slots Appear',
        text_ar: '• الطبقة التي تعمل بنجاح: الواجهة الأمامية (لأن الصفحة والتصميم والشاشات تفتح طبيعياً).\n• الطبقة التي حدث فيها العطل غالباً: الواجهة الخلفية أو قاعدة البيانات (فشل في استعلام أو استرجاع بيانات المواعيد المتاحة).',
        text_en: '• Tier working: Frontend (the page shell renders correctly).\n• Tier failed: Backend or Database (failed to query or return available appointment records).',
        colorVariant: 'rose',
      },
      {
        tag_ar: 'السيناريو 2: تطبيق الطقس',
        tag_en: 'Scenario 2: Weather App',
        title_ar: '2. كتابة اسم المدينة والبحث عن الطقس',
        title_en: '2. City Weather Lookup',
        text_ar: '• أخذ اسم المدينة: الواجهة الأمامية.\n• البحث عن بيانات الطقس وتنسيقها: الواجهة الخلفية.\n• تخزين سجل التوقعات السابقة: قاعدة البيانات.\n• مهمة لا تستطيع الأمامية فعلها وحدها: جلب بيانات الطقس من خوادم الأرصاد.',
        text_en: '• Input city: Frontend.\n• Lookup & decision logic: Backend.\n• Store history: Database.\n• Job frontend cannot do alone: Fetching live meteorological sensor feeds.',
        colorVariant: 'cyan',
      },
      {
        tag_ar: 'القاعدة التشخيصية',
        tag_en: 'Diagnostic Rule',
        title_ar: '3. كيف نميز الطبقة المتعطلة؟',
        title_en: '3. How to Triage Faults?',
        text_ar: 'إذا ظهرت الشاشة فارغة من البيانات الحية: الأمامية سليمة والعطل في الخلفية/البيانات. إذا لم تفتح الصفحة أساساً: العطل في الخادم أو الاتصال.',
        text_en: 'If UI elements render but show zero data: Frontend works; backend/DB failed. If page cannot open at all: Server/network issue.',
        colorVariant: 'amber',
      },
    ],
    goldenRule_ar: 'قاعدة التشخيص: فتح شاشة الحجز بدون ظهور المواعيد المتاحة يعني أن الواجهة الأمامية تعمل بنجاح، بينما فشلت الواجهة الخلفية أو قاعدة البيانات في جلب البيانات.',
    goldenRule_en: 'Diagnostic Rule: Booking page loading without time slots confirms frontend operates properly while backend/database retrieval failed.',
    checkQuestion_ar: 'سؤال سريع: في تطبيق حجز مواعيد عيادة، فتحت صفحة الحجز بنجاح ولكن لم تظهر أي مواعيد متاحة للمريض. أي طبقة تعمل وأيها تعطلت؟',
    checkQuestion_en: 'Quick Check: Clinic booking page opens fine, but no free slots appear. Which tier works and which failed?',
    checkAnswer_ar: 'الإجابة: الواجهة الأمامية تعمل بنجاح (لعرض الصفحة)، والواجهة الخلفية أو قاعدة البيانات هي التي تعطلت (لفشلها في جلب المواعيد).',
    checkAnswer_en: 'Answer: The Frontend works (rendered page), while the Backend or Database failed (unable to query/retrieve slots).',
  },

  // ── CARD 11: Benefits of Three-Tier Separation ─────────────
  {
    id: 'c3-fc-11',
    cardNumber: 11,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'أهمية وفلسفة التصميم',
    category_en: 'Architecture Rationale',
    title_ar: 'لماذا نقسم تطبيق الويب إلى 3 طبقات منفصلة؟ (فصل المسؤوليات)',
    title_en: 'Why Three Tiers? Separation of Concerns, Security & Scalability',
    summary_ar: 'أهمية تقسيم تطبيق الويب إلى 3 طبقات بدلاً من بنائه في برنامج واحد متكتل (Monolithic).',
    summary_en: 'Architectural justification for decoupling web apps into independent presentation, logic, and persistence tiers.',
    blocks: [
      {
        tag_ar: 'فصل المسؤوليات',
        tag_en: 'Modular Maintenance',
        title_ar: '1. سهولة الصيانة والتطوير المستقل',
        title_en: '1. Independent Development',
        text_ar: 'يمكن لمطوري الواجهة تعديل ألوان وأشكال وتصميم الموقع بالكامل دون الحاجة لإعادة كتابة كود معالجة الخادم أو التعديل في جداول قاعدة البيانات.',
        text_en: 'Designers can revamp visual layouts without touching backend algorithms or modifying underlying database tables.',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'حماية وأمان البيانات',
        tag_en: 'Defense in Depth',
        title_ar: '2. الأمان وحماية قاعدة البيانات',
        title_en: '2. Enhanced Security',
        text_ar: 'عزل قاعدة البيانات خلف خادم المعالجة يمنع وصول المستخدمين أو المتسللين إليها مباشرة، مما يحمي سجلات المؤسسة الحساسة من الاختراق.',
        text_en: 'Shielding databases behind backend logic prevents direct client queries, protecting proprietary data assets.',
        colorVariant: 'rose',
      },
      {
        tag_ar: 'المرونة وقابلية التوسع',
        tag_en: 'Scalability',
        title_ar: '3. قابلية التوسع (Scalability)',
        title_en: '3. High Scalability',
        text_ar: 'عند زيادة عدد المستخدمين، يمكن إضافة خوادم معالجة إضافية (خلفية) دون الحاجة لتغيير كود الواجهة الأمامية أو نظام قاعدة البيانات.',
        text_en: 'Additional backend servers can be spun up under heavy traffic spikes without restructuring frontend interfaces.',
        colorVariant: 'emerald',
      },
    ],
    goldenRule_ar: 'أهمية الطبقات الثلاث: تطوير مستقل للواجهات دون المساس بالخادم، أمان عالي بمنع الاتصال المباشر بقاعدة البيانات، وقابلية للتوسع بسهولة.',
    goldenRule_en: 'Benefits of Three-Tier Architecture: Independent maintenance, robust security via database isolation, and scalable modular growth.',
    checkQuestion_ar: 'سؤال سريع: اذكر فائدتين رئيستين لتقسيم تطبيق الويب إلى ثلاث طبقات بدلاً من وضعه في برنامج واحد.',
    checkQuestion_en: 'Quick Check: State two primary benefits of adopting a three-tier architecture over a single program.',
    checkAnswer_ar: 'الإجابة: 1. سهولة الصيانة والتطوير المستقل لكل طبقة، 2. زيادة الأمان بعزل قاعدة البيانات عن وصول المستخدم المباشر.',
    checkAnswer_en: 'Answer: 1. Independent development and simplified maintenance, 2. Enhanced security by isolating database from direct client exposure.',
  },

  // ── CARD 12: Lesson 3-1 Exam Night Capsule ─────────────────
  {
    id: 'c3-fc-12',
    cardNumber: 12,
    lesson: '3-1',
    lessonName_ar: 'الدرس 3-1: البنية العامة لتطبيقات الويب',
    lessonName_en: 'Lesson 3-1: Overall Structure of Web Applications',
    category_ar: 'كبسولة ليلة الامتحان',
    category_en: 'Exam Night Capsule',
    title_ar: 'كبسولة ليلة الامتحان المركزة: خلاصة الدرس 3-1 في 5 نقاط حاسمة',
    title_en: 'Lesson 3-1 Exam Capsule: The 5 Decisive Takeaways',
    summary_ar: 'الخلاصة الذهبية لجميع أسئلة وتقييمات الوزارة للدرس الأول في 5 نقاط سريعة الحفظ والتطبيق.',
    summary_en: 'High-yield revision digest summarizing all official ministry questions for Lesson 3-1.',
    blocks: [
      {
        tag_ar: 'النقطة 1',
        tag_en: 'Point 1',
        title_ar: 'تطبيق الويب',
        title_en: 'Web App Concept',
        text_ar: 'يعمل عبر المتصفح دون تثبيت محلي (مثل: يوتيوب، أمازون، خرائط الإنترنت). التطبيقات المكتبية تحتاج تثبيتاً (مشغل فيديو، آلة حاسبة محلياً).',
        text_en: 'Runs in browser with zero installs (YouTube, Amazon, Maps). Desktop apps require local installation (media players, calc).',
        colorVariant: 'blue',
      },
      {
        tag_ar: 'النقطة 2',
        tag_en: 'Point 2',
        title_ar: 'الواجهة الأمامية (Frontend)',
        title_en: 'Frontend Tier',
        text_ar: 'مسؤولة عن عرض الشاشات والواجهات وجمع مدخلات المستخدم (مربع البحث، صفحات المنتجات، شاشة السلة، مشغل الفيديو).',
        text_en: 'Responsible for rendering displays and capturing input (search bars, product views, cart screen, player).',
        colorVariant: 'emerald',
      },
      {
        tag_ar: 'النقطة 3',
        tag_en: 'Point 3',
        title_ar: 'الواجهة الخلفية (Backend)',
        title_en: 'Backend Tier',
        text_ar: 'مسؤولة عن المعالجة والقرارات (التحقق من تسجيل الدخول، معالجة الدفع، تجميع المشاهدات، تحديد الفيديوهات الموصى بها والإشعارات).',
        text_en: 'Handles processing and logic (auth checks, payments, view tallies, recommendation algorithms, notifications).',
        colorVariant: 'amber',
      },
      {
        tag_ar: 'النقطة 4',
        tag_en: 'Point 4',
        title_ar: 'قاعدة البيانات (Database)',
        title_en: 'Database Tier',
        text_ar: 'الدور الرئيسي: تخزين البيانات واسترجاعها (سجل الطلبات، بيانات العملاء، علاقات المتابعة، سجل المشاهدات).',
        text_en: 'Primary role: Storage & retrieval (order history, customer records, follow graph, watch history).',
        colorVariant: 'violet',
      },
      {
        tag_ar: 'النقطة 5',
        tag_en: 'Point 5',
        title_ar: 'التعاون وتدفق الطلب',
        title_en: 'Tier Cooperation',
        text_ar: 'التطبيق يعمل بتعاون الطبقات الثلاث معاً: الأمامية تجمع الطلب ← الخلفية تعالجه وتستعلم من قاعدة البيانات ← البيانات تعيده للأمامية للعرض.',
        text_en: 'Cooperative flow: Frontend collects → Backend queries database → Database returns records → Frontend displays results.',
        colorVariant: 'rose',
      },
    ],
    goldenRule_ar: 'خلاصة الدرس 3-1: تطبيق الويب = يعمل بالمتصفح، بنية من 3 طبقات تتعاون معاً: أمامية (عرض)، خلفية (معالجة ودفع)، قاعدة بيانات (تخزين واسترجاع).',
    goldenRule_en: 'Lesson 3-1 Master Rule: Web apps run via browsers, built from three cooperating tiers: Frontend (Presentation), Backend (Logic & Payment), Database (Storage).',
    checkQuestion_ar: 'سؤال سريع: اذكر الوظيفة الأساسية لكل طبقة من الطبقات الثلاث لتطبيقات الويب بكلمة واحدة أو جملة موجزة.',
    checkQuestion_en: 'Quick Check: State the fundamental role of each of the three tiers in a brief phrase.',
    checkAnswer_ar: 'الإجابة: الواجهة الأمامية (عرض الشاشات وجمع الإدخال)، الواجهة الخلفية (معالجة البيانات واتخاذ القرارات)، قاعدة البيانات (تخزين واسترجاع السجلات).',
    checkAnswer_en: 'Answer: Frontend (Presentation & input capture), Backend (Processing & decision logic), Database (Permanent record storage & retrieval).',
  },
];

