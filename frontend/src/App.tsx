import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface QuizQuestion {
  id: number;
  question_text_en: string;
  question_text_ar: string;
  option_a_en: string;
  option_a_ar: string;
  option_b_en: string;
  option_b_ar: string;
  option_c_en: string;
  option_c_ar: string;
  option_d_en: string;
  option_d_ar: string;
  correct_option: string;
  explanation_en: string;
  explanation_ar: string;
}

interface Booklet {
  id: number;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
}

function App() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith('ar');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'teacher'>('dashboard');
  
  const [booklets, setBooklets] = useState<Booklet[]>([]);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizQuestion | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch from your FastAPI backend
    fetch('http://localhost:8000/api/booklets')
      .then(res => res.json())
      .then(data => setBooklets(data))
      .catch(err => console.error("Could not load booklets", err));
      
    fetch('http://localhost:8000/api/quizzes')
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error("Could not load quizzes", err));
  }, []);

  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
  
  // Quick hack to force RTL initially if arabic is detected
  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

  return (
    <div className={`min-h-screen ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl tracking-tight">{t('app_title')}</span>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}>{t('student_dashboard')}</button>
                  <button onClick={() => setActiveTab('quiz')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'quiz' ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}>{t('quiz_bank')}</button>
                  <button onClick={() => setActiveTab('teacher')} className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'teacher' ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}>{t('teacher_center')}</button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={toggleLanguage} className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-md font-medium shadow-sm transition">
                {isArabic ? 'English' : 'عربي'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Student Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{t('student_dashboard')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 border-t-4 border-indigo-500">
                <dt className="text-sm font-medium text-gray-500 truncate">{t('xp_points')}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">1,250</dd>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 border-t-4 border-emerald-500">
                <dt className="text-sm font-medium text-gray-500 truncate">{t('quiz_practice_count')}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
              <div className="px-4 py-5 sm:p-6 bg-gradient-to-r from-indigo-50 to-white">
                <h3 className="text-xl leading-6 font-bold text-indigo-900">
                  {booklets.length > 0 ? (isArabic ? booklets[0].title_ar : booklets[0].title_en) : t('booklet_title')}
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-600">
                  <p>Study the extracted information from your curriculum here.</p>
                </div>
                <div className="mt-5">
                  <button type="button" className="inline-flex items-center px-6 py-3 border border-transparent font-semibold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition">
                    {t('download_booklet')}
                  </button>
                </div>
              </div>
              <div className="bg-white px-4 py-8 sm:p-10 border-t border-gray-200">
                 {/* Markdown content would render here */}
                 {booklets.length > 0 ? (
                    <div className="prose prose-lg prose-indigo max-w-none whitespace-pre-wrap">
                      {isArabic ? booklets[0].content_ar : booklets[0].content_en}
                    </div>
                 ) : (
                    <div className="flex justify-center py-12 text-gray-400">
                      <p className="text-lg">{t('loading')}</p>
                    </div>
                 )}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Bank */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{t('quiz_bank')}</h1>
            
            <div className="bg-white shadow rounded-lg p-8 border border-gray-200">
              {!selectedQuiz ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Available Quizzes</h3>
                  <div className="grid gap-4">
                    {quizzes.map((q, idx) => (
                      <div key={q.id} className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition bg-gray-50">
                        <div className="mb-4 md:mb-0">
                          <p className="font-bold text-indigo-600 mb-1">Question {idx + 1}</p>
                          <p className="text-lg text-gray-900">{isArabic ? q.question_text_ar : q.question_text_en}</p>
                        </div>
                        <button 
                          onClick={() => { setSelectedQuiz(q); setShowExplanation(false); }}
                          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-semibold shadow-sm transition whitespace-nowrap">
                          {t('start_quiz')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <button onClick={() => setSelectedQuiz(null)} className="text-indigo-600 hover:text-indigo-900 font-semibold mb-6 flex items-center">
                    &larr; Back to Quizzes
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
                    {isArabic ? selectedQuiz.question_text_ar : selectedQuiz.question_text_en}
                  </h3>
                  
                  <div className="space-y-4">
                    {['a', 'b', 'c', 'd'].map(opt => (
                      <button key={opt} 
                        className="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 focus:bg-indigo-100 focus:border-indigo-500 transition text-lg"
                        onClick={() => setShowExplanation(true)}>
                        <span className="font-bold mr-3 text-indigo-500 uppercase">{opt}.</span> 
                        {isArabic ? (selectedQuiz as any)[`option_${opt}_ar`] : (selectedQuiz as any)[`option_${opt}_en`]}
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="mt-10 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                      <h4 className="text-lg font-bold text-yellow-800 mb-2">{t('explanation')}</h4>
                      <div className="text-yellow-900">
                        <p className="font-bold mb-2">{t('correct')}: {selectedQuiz.correct_option}</p>
                        <p className="text-lg">{isArabic ? selectedQuiz.explanation_ar : selectedQuiz.explanation_en}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Teacher Command Center */}
        {activeTab === 'teacher' && (
          <div className="space-y-6">
             <h1 className="text-3xl font-bold text-gray-900">{t('teacher_center')}</h1>
             <div className="bg-white shadow rounded-lg p-10 border border-gray-200 text-center">
                <p className="text-xl text-gray-500">Student CRM & Content Manager will be displayed here.</p>
             </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App
