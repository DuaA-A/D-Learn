import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_title": "D-Learn",
      "student_dashboard": "Student Dashboard",
      "quiz_bank": "Quiz Bank",
      "teacher_center": "Teacher Command Center",
      "resume_learning": "Resume Learning",
      "xp_points": "Total XP Points",
      "quiz_practice_count": "Quiz Practice Count",
      "download_booklet": "Download Review Booklet",
      "booklet_title": "Chapter 1: Information Technology and AI",
      "generate_quiz": "Generate Quiz",
      "start_quiz": "Start Quiz",
      "select_chapter": "Select Chapter",
      "difficulty": "Difficulty",
      "easy": "Easy",
      "medium": "Medium",
      "hard": "Hard",
      "submit": "Submit",
      "correct": "Correct!",
      "incorrect": "Incorrect",
      "explanation": "Explanation",
      "loading": "Loading...",
      "english": "English",
      "arabic": "عربي"
    }
  },
  ar: {
    translation: {
      "app_title": "دي-ليرن",
      "student_dashboard": "لوحة تحكم الطالب",
      "quiz_bank": "بنك الأسئلة",
      "teacher_center": "مركز قيادة المعلم",
      "resume_learning": "متابعة التعلم",
      "xp_points": "إجمالي نقاط الخبرة (XP)",
      "quiz_practice_count": "عدد مرات التدريب على الاختبارات",
      "download_booklet": "تحميل ملزمة المراجعة",
      "booklet_title": "الفصل الأول: تكنولوجيا المعلومات والذكاء الاصطناعي",
      "generate_quiz": "إنشاء اختبار",
      "start_quiz": "ابدأ الاختبار",
      "select_chapter": "اختر الفصل",
      "difficulty": "الصعوبة",
      "easy": "سهل",
      "medium": "متوسط",
      "hard": "صعب",
      "submit": "إرسال",
      "correct": "صحيح!",
      "incorrect": "غير صحيح",
      "explanation": "الشرح",
      "loading": "جاري التحميل...",
      "english": "English",
      "arabic": "عربي"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
