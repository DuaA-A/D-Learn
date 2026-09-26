import sys
import os
# Add parent directory to path to import models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from main import SessionLocal, engine
import models

def seed_data():
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(models.Booklet).first():
        print("Data already seeded.")
        return

    # 1. Create a Booklet (الملزمة)
    booklet = models.Booklet(
        title_en="Chapter 1: Information Technology and AI",
        title_ar="الفصل الأول: تكنولوجيا المعلومات والذكاء الاصطناعي",
        description_en="A comprehensive review of the development of IT, Moore's Law, AI, Machine Learning, and emerging technologies.",
        description_ar="مراجعة شاملة لتطور تكنولوجيا المعلومات، قانون مور، الذكاء الاصطناعي، تعلم الآلة، والتقنيات الناشئة.",
        content_en="""# Chapter 1: Information Technology and AI Review

## 1. History of IT
- **1940s-60s:** Birth of the computer (ENIAC).
- **1990s:** Commercialization of the Internet.
- **2000s:** Rise of smartphones.
- **2010s+:** Spread of cloud computing (IT as a service).

## 2. Key Concepts
- **Moore's Law:** The number of transistors on a chip roughly doubles about every two years.
- **Cloud Computing:** IT delivered as a service over the Internet.
- **Edge Computing:** Processing data on the device itself, instantly (crucial for Autonomous Driving).

## 3. Artificial Intelligence
- **AI:** Technologies that reproduce intelligent human behavior.
- **Machine Learning:** Learns patterns from data (e.g. spam filters).
- **Deep Learning:** Uses neural networks with large-scale data (e.g. autonomous driving).
- **Generative AI:** Generates new data like text and images (e.g. ChatGPT).
""",
        content_ar="""# الفصل الأول: مراجعة تكنولوجيا المعلومات والذكاء الاصطناعي

## 1. تاريخ تكنولوجيا المعلومات
- **الأربعينيات-الستينيات:** ظهور الكمبيوتر (ENIAC).
- **التسعينيات:** تسويق الإنترنت.
- **الألفينات:** ظهور الهواتف الذكية.
- **2010 وما بعدها:** انتشار الحوسبة السحابية.

## 2. مفاهيم رئيسية
- **قانون مور:** عدد الترانزستورات على الشريحة يتضاعف تقريبًا كل عامين.
- **الحوسبة السحابية:** تكنولوجيا المعلومات كخدمة عبر الإنترنت.
- **حوسبة الحافة (Edge Computing):** معالجة البيانات على الجهاز نفسه فوراً (مهمة جداً للقيادة الذاتية).

## 3. الذكاء الاصطناعي
- **الذكاء الاصطناعي:** تقنيات تحاكي السلوك البشري الذكي.
- **تعلم الآلة (Machine Learning):** يتعلم الأنماط من البيانات (مثل فلاتر البريد العشوائي).
- **التعلم العميق (Deep Learning):** يستخدم الشبكات العصبية مع بيانات ضخمة.
- **الذكاء الاصطناعي التوليدي:** يولد بيانات جديدة مثل النصوص والصور.
""",
        chapter="Chapter 1",
        lesson="Lesson 1 & 2"
    )
    db.add(booklet)

    # 2. Create Quiz Questions
    q1 = models.QuizBankQuestion(
        chapter="Chapter 1",
        lesson="Lesson 1",
        difficulty="EASY",
        question_text_en="What does Moore's Law state?",
        question_text_ar="على ماذا ينص قانون مور؟",
        option_a_en="Computers get smaller every year.",
        option_a_ar="أجهزة الكمبيوتر تصبح أصغر كل عام.",
        option_b_en="Transistors on a chip double every two years.",
        option_b_ar="الترانزستورات تتضاعف على الشريحة كل عامين.",
        option_c_en="Internet speed doubles every year.",
        option_c_ar="سرعة الإنترنت تتضاعف كل عام.",
        option_d_en="AI replaces human jobs.",
        option_d_ar="الذكاء الاصطناعي يحل محل وظائف البشر.",
        correct_option="B",
        explanation_en="Moore's Law is the empirical observation that the number of transistors on an integrated circuit doubles approximately every two years.",
        explanation_ar="قانون مور هو ملاحظة تجريبية تفيد بأن عدد الترانزستورات في الدائرة المتكاملة يتضاعف تقريبًا كل عامين."
    )
    
    q2 = models.QuizBankQuestion(
        chapter="Chapter 1",
        lesson="Lesson 2",
        difficulty="MEDIUM",
        question_text_en="Which technology is crucial for Autonomous Driving to process data instantly?",
        question_text_ar="أي تقنية تعد حاسمة للقيادة الذاتية لمعالجة البيانات بشكل فوري؟",
        option_a_en="Cloud Computing",
        option_a_ar="الحوسبة السحابية",
        option_b_en="Generative AI",
        option_b_ar="الذكاء الاصطناعي التوليدي",
        option_c_en="Edge Computing",
        option_c_ar="حوسبة الحافة (Edge Computing)",
        option_d_en="Quantum Computing",
        option_d_ar="الحوسبة الكمومية",
        correct_option="C",
        explanation_en="Because a delay of even 0.1 seconds can lead to an accident, edge computing is used so processing is performed instantly on the vehicle itself.",
        explanation_ar="نظراً لأن تأخيراً قدره 0.1 ثانية قد يؤدي إلى حادث، تُستخدم حوسبة الحافة لتتم المعالجة فورياً على المركبة نفسها."
    )

    q3 = models.QuizBankQuestion(
        chapter="Chapter 1",
        lesson="Lesson 2",
        difficulty="HARD",
        question_text_en="What is the relationship between Machine Learning and Deep Learning?",
        question_text_ar="ما هي العلاقة بين تعلم الآلة والتعلم العميق؟",
        option_a_en="They are completely unrelated.",
        option_a_ar="لا توجد علاقة بينهما إطلاقاً.",
        option_b_en="Deep Learning is a subset of Machine Learning.",
        option_b_ar="التعلم العميق هو مجموعة فرعية من تعلم الآلة.",
        option_c_en="Machine Learning is a subset of Deep Learning.",
        option_c_ar="تعلم الآلة هو مجموعة فرعية من التعلم العميق.",
        option_d_en="Both are subsets of Generative AI.",
        option_d_ar="كلاهما مجموعة فرعية من الذكاء الاصطناعي التوليدي.",
        correct_option="B",
        explanation_en="Within AI technologies there is machine learning; and within machine learning, there is deep learning.",
        explanation_ar="ضمن تقنيات الذكاء الاصطناعي يوجد تعلم الآلة، وضمن تعلم الآلة يوجد التعلم العميق."
    )

    db.add(q1)
    db.add(q2)
    db.add(q3)

    db.commit()
    print("Database seeded successfully with booklets and quizzes.")

if __name__ == "__main__":
    seed_data()
