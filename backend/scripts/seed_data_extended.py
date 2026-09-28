import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from main import SessionLocal, engine
import models

def seed_data():
    db = SessionLocal()
    
    if db.query(models.Booklet).first():
        print("Data already seeded.")
        return

    booklet = models.Booklet(
        title_en="Chapter 1: Information Technology and AI",
        title_ar="الفصل الأول: تكنولوجيا المعلومات والذكاء الاصطناعي",
        description_en="A comprehensive review of the development of IT, Moore's Law, AI, Machine Learning, and emerging technologies.",
        description_ar="مراجعة شاملة لتطور تكنولوجيا المعلومات، قانون مور، الذكاء الاصطناعي، تعلم الآلة، والتقنيات الناشئة.",
        content_en="""# Chapter 1: Information Technology and AI Review\n\n## 1. History of IT\n- **1940s-60s:** Birth of the computer (ENIAC).\n- **1990s:** Commercialization of the Internet.\n- **2000s:** Rise of smartphones.\n- **2010s+:** Spread of cloud computing (IT as a service).\n\n## 2. Key Concepts\n- **Moore's Law:** The number of transistors on a chip roughly doubles about every two years.\n- **Cloud Computing:** IT delivered as a service over the Internet.\n- **Edge Computing:** Processing data on the device itself, instantly (crucial for Autonomous Driving).\n\n## 3. Artificial Intelligence\n- **AI:** Technologies that reproduce intelligent human behavior.\n- **Machine Learning:** Learns patterns from data (e.g. spam filters).\n- **Deep Learning:** Uses neural networks with large-scale data (e.g. autonomous driving).\n- **Generative AI:** Generates new data like text and images.""",
        content_ar="""# الفصل الأول: مراجعة تكنولوجيا المعلومات والذكاء الاصطناعي\n\n## 1. تاريخ تكنولوجيا المعلومات\n- **الأربعينيات-الستينيات:** ظهور الكمبيوتر (ENIAC).\n- **التسعينيات:** تسويق الإنترنت.\n- **الألفينات:** ظهور الهواتف الذكية.\n- **2010 وما بعدها:** انتشار الحوسبة السحابية.\n\n## 2. مفاهيم رئيسية\n- **قانون مور:** عدد الترانزستورات على الشريحة يتضاعف تقريبًا كل عامين.\n- **الحوسبة السحابية:** تكنولوجيا المعلومات كخدمة عبر الإنترنت.\n- **حوسبة الحافة (Edge Computing):** معالجة البيانات على الجهاز نفسه فوراً (مهمة جداً للقيادة الذاتية).\n\n## 3. الذكاء الاصطناعي\n- **الذكاء الاصطناعي:** تقنيات تحاكي السلوك البشري الذكي.\n- **تعلم الآلة (Machine Learning):** يتعلم الأنماط من البيانات.\n- **التعلم العميق (Deep Learning):** يستخدم الشبكات العصبية مع بيانات ضخمة.\n- **الذكاء الاصطناعي التوليدي:** يولد بيانات جديدة مثل النصوص والصور.""",
        chapter="Chapter 1",
        lesson="Lesson 1 & 2"
    )
    db.add(booklet)
    db.commit()

    questions = [
        # Original MCQ 1
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 1", difficulty="MEDIUM", question_type="MCQ",
            question_text_en="In which period did the Internet become available for commercial use, expanding global access to information?",
            question_text_ar="في أي فترة زمنية بدأت تتاح الإنترنت للاستخدام التجاري وظهر الويب مما توسع معه الوصول العالمي إلى المعلومات؟",
            option_a_en="1940s to 1960s", option_a_ar="الأربعينيات والستينيات",
            option_b_en="1990s", option_b_ar="التسعينيات",
            option_c_en="1970s and 1980s", option_c_ar="السبعينيات والثمانينيات",
            option_d_en="2010s onwards", option_d_ar="من العقد الثاني من الألفية فصاعداً",
            correct_option="B",
            explanation_en="The 1990s marked the commercialization of the Internet and the World Wide Web.",
            explanation_ar="شهدت فترة التسعينيات إتاحة الإنترنت للاستخدام التجاري وظهور الويب."
        ),
        # Harder MCQ 1
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 1", difficulty="HARD", question_type="MCQ",
            question_text_en="Which technological milestone was NOT a primary characteristic of the 1990s IT era?",
            question_text_ar="أي من الإنجازات التكنولوجية التالية لم تكن سمة أساسية لحقبة تكنولوجيا المعلومات في التسعينيات؟",
            option_a_en="The globalization of information access", option_a_ar="عولمة الوصول إلى المعلومات",
            option_b_en="Widespread commercial use of the Internet", option_b_ar="الاستخدام التجاري الواسع للإنترنت",
            option_c_en="The transition to ubiquitous cloud computing", option_c_ar="الانتقال إلى الحوسبة السحابية واسعة الانتشار",
            option_d_en="The creation and expansion of the World Wide Web", option_d_ar="إنشاء وتوسيع شبكة الويب العالمية",
            correct_option="C",
            explanation_en="Cloud computing became widely spread and characterized the 2010s onwards, not the 1990s.",
            explanation_ar="أصبحت الحوسبة السحابية واسعة الانتشار ومميزة للعقد الثاني من الألفية، وليس للتسعينيات."
        ),
        # Original MCQ 2
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 2", difficulty="MEDIUM", question_type="MCQ",
            question_text_en="What technology adds digital elements or information to a real-world scene?",
            question_text_ar="تقنية تضيف عناصر أو معلومات رقمية إلى مشهد من العالم الحقيقي تُعرف باسم:",
            option_a_en="Virtual Reality (VR)", option_a_ar="الواقع الافتراضي (VR)",
            option_b_en="Autonomous Driving", option_b_ar="القيادة الذاتية",
            option_c_en="Augmented Reality (AR)", option_c_ar="الواقع المعزز (AR)",
            option_d_en="Quantum Computing", option_d_ar="الحوسبة الكمومية",
            correct_option="C",
            explanation_en="Augmented Reality (AR) overlays digital information on the real world.",
            explanation_ar="الواقع المعزز (AR) يضيف معلومات وعناصر رقمية إلى العالم الحقيقي."
        ),
        # Harder MCQ 2
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 2", difficulty="HARD", question_type="MCQ",
            question_text_en="How does Augmented Reality (AR) fundamentally differ from Virtual Reality (VR) in terms of user experience?",
            question_text_ar="كيف يختلف الواقع المعزز (AR) جوهرياً عن الواقع الافتراضي (VR) من حيث تجربة المستخدم؟",
            option_a_en="AR completely immerses the user in a digital environment, while VR does not.", option_a_ar="يغمر الواقع المعزز المستخدم بالكامل في بيئة رقمية، بينما الواقع الافتراضي لا يفعل ذلك.",
            option_b_en="AR enhances the perception of the physical world with digital data, whereas VR replaces the physical world entirely.", option_b_ar="يعزز الواقع المعزز إدراك العالم المادي بالبيانات الرقمية، بينما يستبدل الواقع الافتراضي العالم المادي بالكامل.",
            option_c_en="AR requires quantum computing to render, while VR uses edge computing.", option_c_ar="يتطلب الواقع المعزز حوسبة كمومية للعرض، بينما يستخدم الواقع الافتراضي حوسبة الحافة.",
            option_d_en="There is no functional difference; they are marketing terms for the same technology.", option_d_ar="لا يوجد فرق وظيفي؛ إنها مصطلحات تسويقية لنفس التكنولوجيا.",
            correct_option="B",
            explanation_en="AR adds to the real world, whereas VR creates a completely simulated environment that replaces the real world.",
            explanation_ar="يضيف الواقع المعزز إلى العالم الحقيقي، بينما يخلق الواقع الافتراضي بيئة محاكاة بالكامل تستبدل العالم الحقيقي."
        ),
        # Original WRITTEN 1
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 1", difficulty="MEDIUM", question_type="WRITTEN",
            question_text_en="Explain 'Moore's Law', showing what it describes and the engineering challenges facing the continued miniaturization of circuits.",
            question_text_ar="اشرح 'قانون مور' موضحاً ما يصفه، والتحديات الهندسية والفيزيائية التي تواجه استمرار تصغير مكونات الدوائر.",
            ideal_answer_en="Moore's Law is an empirical observation that the number of transistors on an integrated circuit doubles approximately every two years. Challenges to its continuation include physical limits like the quantum tunneling effect (where electrons slip through barriers) and leakage current, which make it hard to maintain performance without high power consumption.",
            ideal_answer_ar="قانون مور هو ملاحظة تجريبية تنص على أن عدد الترانزستورات على شريحة الدائرة المتكاملة يتضاعف تقريباً كل عامين. التحديات الهندسية والفيزيائية تشمل الوصول للحدود الفيزيائية مثل تأثير النفق الكمومي (حيث تتسرب الإلكترونات عبر الحواجز) وتيار التسرب، مما يجعل من الصعب تحسين الأداء وتقليل استهلاك الطاقة في وقت واحد.",
            explanation_en="A complete answer defines the law (doubling of transistors) and lists physical limits like quantum tunneling and leakage current.",
            explanation_ar="الإجابة الكاملة تحدد القانون (مضاعفة الترانزستورات) وتسرد الحدود الفيزيائية مثل النفق الكمومي وتيار التسرب."
        ),
        # Harder WRITTEN 1
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 1", difficulty="HARD", question_type="WRITTEN",
            question_text_en="Critically analyze the long-term sustainability of Moore's Law. If traditional silicon-based scaling ends due to quantum tunneling, what alternative computing paradigms are being developed to sustain performance growth?",
            question_text_ar="حلل بشكل نقدي استدامة قانون مور على المدى الطويل. إذا انتهى توسع السيليكون التقليدي بسبب النفق الكمومي، فما هي نماذج الحوسبة البديلة التي يتم تطويرها للحفاظ على نمو الأداء؟",
            ideal_answer_en="Moore's law is becoming unsustainable for silicon due to atomic-level physical limits like quantum tunneling and thermal dissipation. To sustain performance growth, the industry is shifting towards multi-core parallel processing, specialized hardware accelerators (like GPUs/TPUs), and entirely new paradigms like Quantum Computing, which uses principles of quantum mechanics (qubits and superposition) to solve complex problems exponentially faster.",
            ideal_answer_ar="أصبح قانون مور غير مستدام للسيليكون بسبب الحدود الفيزيائية على المستوى الذري مثل النفق الكمومي والتبدد الحراري. للحفاظ على نمو الأداء، تتجه الصناعة نحو المعالجة المتوازية متعددة النوى، ومسرعات الأجهزة المتخصصة، ونماذج جديدة تماماً مثل الحوسبة الكمومية، التي تستخدم مبادئ ميكانيكا الكم (الكيوبتات والتراكب) لحل المشكلات المعقدة بشكل أسرع.",
            explanation_en="A high-level answer identifies why the law fails at the atomic scale and proposes alternatives like quantum computing and parallel processing.",
            explanation_ar="تحدد الإجابة عالية المستوى سبب فشل القانون على النطاق الذري وتقترح بدائل مثل الحوسبة الكمومية والمعالجة المتوازية."
        ),
        # Original WRITTEN 2
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 2", difficulty="MEDIUM", question_type="WRITTEN",
            question_text_en="Explain how edge computing processes data locally on an autonomous vehicle instantly to reduce latency and ensure safety.",
            question_text_ar="وضح كيف تعالج الحوسبة الطرفية البيانات محلياً على متن المركبة ذاتية القيادة فوراً لتقليل زمن الاستجابة وضمان السلامة.",
            ideal_answer_en="Edge computing processes data directly on the device (the vehicle) rather than sending it to a remote cloud server. In autonomous driving, this is crucial because even a millisecond of latency (delay) in data transmission to the cloud could result in a fatal accident. Local processing ensures real-time, instant decision-making for safety.",
            ideal_answer_ar="تقوم الحوسبة الطرفية (Edge Computing) بمعالجة البيانات محلياً على الجهاز نفسه (المركبة) بدلاً من إرسالها إلى خادم سحابي بعيد. في القيادة الذاتية، يعد هذا أمراً بالغ الأهمية لأن أي تأخير زمني في إرسال البيانات إلى السحابة قد يؤدي إلى حادث مميت. المعالجة المحلية تضمن اتخاذ قرارات فورية في الوقت الفعلي لضمان السلامة.",
            explanation_en="The answer must link local processing with the elimination of transmission delays, which is critical for life-critical decisions.",
            explanation_ar="يجب أن تربط الإجابة المعالجة المحلية بالقضاء على تأخيرات الإرسال، وهو أمر حاسم للقرارات الحاسمة للحياة."
        ),
        # Harder WRITTEN 2
        models.QuizBankQuestion(
            chapter="Chapter 1", lesson="Lesson 2", difficulty="HARD", question_type="WRITTEN",
            question_text_en="Design a hypothetical system architecture for a fleet of autonomous taxis. Detail how Edge Computing, Cloud Computing, and Machine Learning would interact within your system to balance immediate safety with long-term route optimization.",
            question_text_ar="صمم بنية نظام افتراضية لأسطول من سيارات الأجرة ذاتية القيادة. فصل كيف تتفاعل الحوسبة الطرفية، والحوسبة السحابية، وتعلم الآلة داخل نظامك لموازنة السلامة الفورية مع تحسين المسار على المدى الطويل.",
            ideal_answer_en="The system would use Edge Computing on each taxi for immediate, safety-critical decisions (obstacle detection, braking) using pre-trained Deep Learning models to ensure zero-latency responses. Cloud Computing would be used for non-critical, heavy processing tasks like fleet coordination, traffic analysis, and retraining the Machine Learning models. The taxis would periodically send aggregated data to the cloud, which the cloud uses to update and deploy improved models back to the edges.",
            ideal_answer_ar="سيستخدم النظام الحوسبة الطرفية على كل سيارة أجرة لاتخاذ قرارات فورية وحاسمة للسلامة (اكتشاف العقبات، الكبح) باستخدام نماذج التعلم العميق المدربة مسبقاً لضمان استجابة بدون تأخير. ستُستخدم الحوسبة السحابية للمهام غير الحرجة والتي تتطلب معالجة ثقيلة مثل تنسيق الأسطول، تحليل حركة المرور، وإعادة تدريب نماذج تعلم الآلة. سترسل سيارات الأجرة بشكل دوري بيانات مجمعة إلى السحابة، والتي تستخدمها السحابة لتحديث النماذج المحسنة وإرسالها مجدداً إلى الأطراف.",
            explanation_en="A strong answer delegates real-time tasks to the Edge and aggregate analytical tasks to the Cloud, showing how ML models bridge both.",
            explanation_ar="الإجابة القوية تفوض مهام الوقت الفعلي إلى الحوسبة الطرفية والمهام التحليلية المجمعة إلى السحابة، وتوضح كيف تربط نماذج تعلم الآلة بينهما."
        )
    ]

    for q in questions:
        db.add(q)
    db.commit()
    print("Seeded data successfully!")

if __name__ == "__main__":
    seed_data()
