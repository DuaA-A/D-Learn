import type { QuizQuestion } from './courseData';

export const EXTRA_QUESTIONS: QuizQuestion[] = [
  // 10 Very Hard Questions
  {
    id: "ex_q1",
    unit: "1",
    lesson: "les_1_1",
    type: "MCQ",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "HARD",
    question_en: "In a machine learning model, if the training accuracy is 99% but the validation accuracy is 55%, what is the most likely issue and its optimal solution?",
    question_ar: "في نموذج تعلم الآلة، إذا كانت دقة التدريب 99% ولكن دقة التحقق 55%، فما هي المشكلة الأكثر احتمالاً وما هو الحل الأمثل؟",
    option_a_en: "Underfitting; decrease model complexity.",
    option_a_ar: "نقص التخصيص (Underfitting)؛ تقليل تعقيد النموذج.",
    option_b_en: "Overfitting; apply regularization techniques or collect more data.",
    option_b_ar: "فرط التخصيص (Overfitting)؛ تطبيق تقنيات التنظيم (Regularization) أو جمع المزيد من البيانات.",
    option_c_en: "Data leak; remove overlapping data.",
    option_c_ar: "تسرب البيانات؛ إزالة البيانات المتداخلة.",
    option_d_en: "High Bias; use a simpler algorithm.",
    option_d_ar: "انحياز عالي (High Bias)؛ استخدام خوارزمية أبسط.",
    correct_option: "B",
    explanation_en: "This is a classic case of overfitting where the model memorizes the training data but fails to generalize. Regularization helps penalize complexity.",
    explanation_ar: "هذه حالة كلاسيكية لفرط التخصيص (Overfitting) حيث يحفظ النموذج بيانات التدريب ولكنه يفشل في التعميم. استخدام التنظيم (Regularization) يعالج ذلك."
  },
  {
    id: "ex_q2",
    unit: "1",
    lesson: "les_1_1",
    type: "MCQ",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "HARD",
    question_en: "Which of the following neural network architectures is theoretically most suited for translating a paragraph of text contextually without losing long-term dependencies?",
    question_ar: "أي من بنيات الشبكات العصبية التالية هي الأكثر ملاءمة نظرياً لترجمة فقرة من النص سياقياً دون فقدان التبعيات طويلة المدى؟",
    option_a_en: "Convolutional Neural Networks (CNNs)",
    option_a_ar: "الشبكات العصبية التلافيفية (CNNs)",
    option_b_en: "Standard Feed-Forward Networks",
    option_b_ar: "الشبكات الأمامية القياسية",
    option_c_en: "Transformer architecture with Self-Attention",
    option_c_ar: "بنية المحولات (Transformers) مع الانتباه الذاتي (Self-Attention)",
    option_d_en: "Generative Adversarial Networks (GANs)",
    option_d_ar: "شبكات التوليد التنافسية (GANs)",
    correct_option: "C",
    explanation_en: "Transformers use self-attention mechanisms that effectively handle long-term dependencies in text, outperforming older RNNs/LSTMs in NLP.",
    explanation_ar: "تستخدم المحولات (Transformers) آليات الانتباه الذاتي التي تتعامل بكفاءة مع التبعيات الطويلة في النص، متفوقة على الشبكات القديمة في معالجة اللغات الطبيعية."
  },
  {
    id: "ex_q3",
    unit: "1",
    lesson: "les_1_2",
    type: "MCQ",
    source: "HOMEWORK",
    difficulty: "HARD",
    question_en: "How does the vanishing gradient problem primarily affect the training of deep neural networks?",
    question_ar: "كيف تؤثر مشكلة تلاشي التدرج (Vanishing Gradient) بشكل أساسي على تدريب الشبكات العصبية العميقة؟",
    option_a_en: "It causes the loss function to fluctuate wildly, preventing convergence.",
    option_a_ar: "تتسبب في تقلب دالة الخسارة بشدة، مما يمنع التقارب.",
    option_b_en: "It makes the weights of the earliest layers update extremely slowly, hindering learning in deep layers.",
    option_b_ar: "تجعل أوزان الطبقات الأولى تتحدث ببطء شديد، مما يعيق التعلم في الطبقات العميقة.",
    option_c_en: "It forces the network to ignore the bias terms.",
    option_c_ar: "تجبر الشبكة على تجاهل مصطلحات الانحياز (Bias).",
    option_d_en: "It only affects Unsupervised Learning models.",
    option_d_ar: "تؤثر فقط على نماذج التعلم غير الخاضع للإشراف.",
    correct_option: "B",
    explanation_en: "In deep networks, gradients can become vanishingly small as they propagate backward, meaning early layers learn almost nothing.",
    explanation_ar: "في الشبكات العميقة، يمكن أن تصبح التدرجات صغيرة جداً أثناء انتشارها للخلف، مما يعني أن الطبقات الأولى لا تتعلم تقريباً أي شيء."
  },
  {
    id: "ex_q4",
    unit: "1",
    lesson: "les_1_2",
    type: "WRITTEN",
    source: "WEEKLY_ASSESSMENT",
    difficulty: "HARD",
    question_en: "Explain the fundamental difference between K-Means Clustering and K-Nearest Neighbors (KNN), emphasizing their learning paradigms.",
    question_ar: "اشرح الفرق الأساسي بين خوارزمية التجميع (K-Means) وخوارزمية أقرب جار (KNN)، مع التركيز على نماذج التعلم الخاصة بهما.",
    ideal_answer_en: "K-Means is an unsupervised learning algorithm used for clustering data into K groups without predefined labels. KNN is a supervised learning algorithm used for classification or regression based on the labels of the K nearest data points in the training set.",
    ideal_answer_ar: "خوارزمية K-Means هي خوارزمية تعلم غير خاضع للإشراف تُستخدم لتجميع البيانات في K مجموعات بدون تسميات مسبقة. بينما KNN هي خوارزمية تعلم خاضع للإشراف تُستخدم للتصنيف أو الانحدار بناءً على تسميات أقرب K نقاط بيانات في مجموعة التدريب."
  },
  {
    id: "ex_q5",
    unit: "1",
    lesson: "les_1_3",
    type: "MCQ",
    source: "CLASSROOM",
    difficulty: "HARD",
    question_en: "In Natural Language Processing, what is the primary advantage of Word Embeddings (like Word2Vec) over One-Hot Encoding?",
    question_ar: "في معالجة اللغات الطبيعية، ما هي الميزة الأساسية لتضمين الكلمات (Word Embeddings) مقارنة بالترميز الأحادي (One-Hot Encoding)؟",
    option_a_en: "Word embeddings capture semantic relationships and context between words in a dense vector space.",
    option_a_ar: "تضمين الكلمات يلتقط العلاقات الدلالية والسياق بين الكلمات في مساحة متجهات كثيفة.",
    option_b_en: "Word embeddings use much more memory but are perfectly accurate.",
    option_b_ar: "يستخدم تضمين الكلمات ذاكرة أكبر بكثير ولكنه دقيق تماماً.",
    option_c_en: "One-Hot Encoding captures grammar better than Word Embeddings.",
    option_c_ar: "الترميز الأحادي يلتقط القواعد النحوية بشكل أفضل من تضمين الكلمات.",
    option_d_en: "There is no difference; they are just different names for the same technique.",
    option_d_ar: "لا يوجد فرق؛ إنهما اسمان مختلفان لنفس التقنية.",
    correct_option: "A",
    explanation_en: "One-hot vectors are sparse and treat all words as completely independent. Embeddings are dense and place semantically similar words close to each other.",
    explanation_ar: "المتجهات الأحادية متباعدة وتعامل كل كلمة كأنها مستقلة تماماً. أما التضمين فهو كثيف ويضع الكلمات المتشابهة دلالياً بالقرب من بعضها البعض."
  }
];

export const FLASHCARDS: Record<string, { front_en: string, front_ar: string, back_en: string, back_ar: string }[]> = {
  "les_1_1": [
    {
      front_en: "What is Artificial Intelligence (AI)?",
      front_ar: "ما هو الذكاء الاصطناعي (AI)؟",
      back_en: "The simulation of human intelligence in machines programmed to think and learn.",
      back_ar: "محاكاة الذكاء البشري في الآلات المبرمجة للتفكير والتعلم مثل البشر."
    },
    {
      front_en: "Machine Learning (ML) vs. Deep Learning (DL)",
      front_ar: "الفرق بين تعلم الآلة والتعلم العميق",
      back_en: "ML relies on statistical algorithms; DL uses multi-layered artificial neural networks.",
      back_ar: "تعلم الآلة يعتمد على الخوارزميات الإحصائية، بينما التعلم العميق يعتمد على الشبكات العصبية الاصطناعية متعددة الطبقات."
    },
    {
      front_en: "Supervised Learning",
      front_ar: "التعلم الخاضع للإشراف (Supervised)",
      back_en: "Training a model on labeled data (where the answer is known).",
      back_ar: "تدريب النموذج على بيانات مصنفة مسبقاً (حيث تكون الإجابة معروفة للآلة)."
    }
  ],
  "les_1_2": [
    {
      front_en: "Natural Language Processing (NLP)",
      front_ar: "معالجة اللغات الطبيعية (NLP)",
      back_en: "The ability of a computer program to understand human language as it is spoken and written.",
      back_ar: "قدرة البرنامج الحاسوبي على فهم اللغة البشرية كما تُنطق وتُكتب."
    },
    {
      front_en: "Computer Vision (CV)",
      front_ar: "الرؤية الحاسوبية (CV)",
      back_en: "A field of AI that enables computers to derive meaningful information from digital images and videos.",
      back_ar: "مجال من الذكاء الاصطناعي يمكّن الحواسيب من استخراج معلومات ذات معنى من الصور ومقاطع الفيديو."
    }
  ],
  "les_1_3": [
    {
      front_en: "Smart Home",
      front_ar: "المنزل الذكي",
      back_en: "A home setup where appliances and devices can be automatically controlled remotely from anywhere.",
      back_ar: "نظام منزلي يتيح التحكم التلقائي في الأجهزة عن بُعد من أي مكان باستخدام الإنترنت."
    },
    {
      front_en: "Internet of Things (IoT)",
      front_ar: "إنترنت الأشياء (IoT)",
      back_en: "The network of physical objects embedded with sensors and software to connect and exchange data.",
      back_ar: "شبكة من الأشياء المادية المزودة بمستشعرات وبرامج للاتصال وتبادل البيانات عبر الإنترنت."
    }
  ]
};
