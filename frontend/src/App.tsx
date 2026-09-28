import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Menu, X, PlayCircle, CheckCircle, XCircle,
  Award, LogOut, User, Star, Layers, Globe, Shield, Code, AlertTriangle,
  Lock, Mail, Eye, EyeOff, Home, ChevronDown, BookMarked, Brain, Zap, Target,
  RotateCcw, ArrowLeft, ArrowRight, Lightbulb, FileText, Search,
  MessageSquare, Loader, Maximize2, Trash2, RefreshCw,
  BarChart2, Users, FileCheck, Check, Sparkles, HelpCircle
} from 'lucide-react';

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Course Data
import { COURSE_METADATA, LESSONS, QUIZ_QUESTIONS as BASE_QUIZ_QUESTIONS } from './courseData';
import { EXTRA_QUESTIONS, FLASHCARDS } from './extraData';
import { MASSIVE_BANK } from './massiveBank';
import { MASSIVE_BANK_L1 } from './massiveBank_Lesson1';
import { MASSIVE_BANK_L2 } from './massiveBank_Lesson2';
import { MASSIVE_BANK_L3 } from './massiveBank_Lesson3';
import { MASSIVE_BANK_L4 } from './massiveBank_Lesson4';

const QUIZ_QUESTIONS = [...BASE_QUIZ_QUESTIONS, ...EXTRA_QUESTIONS, ...MASSIVE_BANK, ...MASSIVE_BANK_L1, ...MASSIVE_BANK_L2, ...MASSIVE_BANK_L3, ...MASSIVE_BANK_L4];

// ============================================================
// TYPES
// ============================================================
interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'STUDENT' | 'TUTOR';
  xp: number;
  completedLessons: string[];
  completedAssessments: string[];
  createdAt: any;
}

interface AssessmentResult {
  id?: string;
  userId: string;
  userName: string;
  userEmail?: string;
  lessonId: string;
  score: number;
  totalMCQ: number;
  correctMCQ: number;
  answers?: Record<string, string>;
  writtenAnswers?: Record<string, string>;
  tutorFeedback?: Record<string, { score?: number; note?: string }>;
  submittedAt: any;
}

// ============================================================
// APP CONTEXT
// ============================================================
interface AppCtx {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  lang: 'en' | 'ar';
  toggleLang: () => void;
  loading: boolean;
  loadingProfile: boolean;
}
const AppContext = React.createContext<AppCtx>({
  user: null, profile: null, lang: 'en', toggleLang: () => {}, loading: true, loadingProfile: true
});

// ============================================================
// HELPERS
// ============================================================
const t = (en: string, ar: string, lang: 'en' | 'ar') => lang === 'ar' ? ar : en;
const dir = (lang: 'en' | 'ar') => lang === 'ar' ? 'rtl' : 'ltr';

const matchLessonId = (qLesson: string, targetId: string) => {
  if (!qLesson || !targetId) return false;
  if (qLesson === targetId) return true;
  const normQ = qLesson.replace(/^les_/, '').replace(/_/g, '-');
  const normT = targetId.replace(/^les_/, '').replace(/_/g, '-');
  return normQ === normT;
};

const UNIT_COLORS: Record<number, string> = {
  1: 'from-primary-plum to-primary-navy',
  2: 'from-accent-pink to-primary-plum',
  3: 'from-accent-mint to-teal-700',
  4: 'from-blue-500 to-primary-navy',
};
const UNIT_ICONS: Record<number, React.ReactNode> = {
  1: <Globe size={20} />,
  2: <Shield size={20} />,
  3: <Code size={20} />,
  4: <Layers size={20} />,
};

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-accent-pink/30 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-transparent border-t-accent-pink rounded-full animate-spin absolute inset-0"></div>
      </div>
    </div>
  );
}

function Navbar() {
  const { user, profile, lang, toggleLang, loading } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center" dir={dir(lang)}>
          <Link to={user ? (profile?.role === 'TUTOR' ? '/tutor' : '/dashboard') : '/'} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy flex items-center justify-center shadow-md shadow-primary-plum/30 group-hover:shadow-primary-plum/50 transition-shadow">
              <Brain size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xl tracking-tight text-primary-navy">D-Learn</span>
              <span className="block text-[10px] text-accent-pink font-bold -mt-0.5 tracking-widest uppercase">Baccalaureate</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-primary-navy text-sm font-bold transition-all border border-slate-200"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>

            {!loading && user && profile && (
              <div className="flex items-center gap-2">
                {profile.role === 'TUTOR' ? (
                  <>
                    <button
                      onClick={() => navigate('/tutor')}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-primary-plum to-primary-navy text-white text-xs font-black shadow-md shadow-primary-plum/30 hover:opacity-95 transition-all"
                    >
                      <Shield size={14} className="text-accent-pink" />
                      <span>{t('Admin Center', 'لوحة الإدارة', lang)}</span>
                    </button>
                    <button
                      onClick={() => navigate('/student-preview')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
                      title={t('Preview Student Experience', 'معاينة تجربة الطالب', lang)}
                    >
                      <Eye size={13} className="text-slate-500" />
                      <span>{t('Student View', 'واجهة الطالب', lang)}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-primary-navy text-sm transition-all border border-slate-200"
                  >
                    <Home size={14} />
                    <span className="font-bold">{t('Home', 'الرئيسية', lang)}</span>
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-pink to-primary-plum flex items-center justify-center font-bold text-white text-xs shadow-sm">
                      {profile.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block text-sm font-bold text-primary-navy">{profile.displayName}</span>
                    <ChevronDown size={12} className="text-slate-500" />
                  </button>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-slate-100 bg-slate-50">
                          <p className="text-primary-navy font-bold text-sm">{profile.displayName}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{profile.email}</p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <Star size={12} className="text-amber-500" />
                            <span className="text-amber-600 text-xs font-bold">{profile.xp} XP</span>
                            <span className="ml-auto px-2 py-0.5 bg-accent-pink/10 text-accent-pink rounded-md text-[10px] font-bold uppercase">
                              {profile.role === 'TUTOR' ? t('Admin', 'مشرفة المنصة', lang) : t('Student', 'طالب', lang)}
                            </span>
                          </div>
                        </div>
                        {profile.role === 'TUTOR' && (
                          <>
                            <button
                              onClick={() => { navigate('/tutor'); setMenuOpen(false); }}
                              className="w-full text-left px-4 py-3 text-sm text-primary-plum hover:bg-primary-plum/10 transition-colors flex items-center gap-2 font-bold"
                            >
                              <Shield size={14} className="text-accent-pink" />
                              {t('Master Admin Center', 'مركز إدارة المنصة والطلاب', lang)}
                            </button>
                            <button
                              onClick={() => { navigate('/student-preview'); setMenuOpen(false); }}
                              className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 font-semibold"
                            >
                              <Eye size={14} className="text-slate-500" />
                              {t('Student View Preview', 'معاينة واجهة الطالب', lang)}
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => { handleLogout(); setMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold"
                        >
                          <LogOut size={14} />
                          {t('Sign Out', 'تسجيل الخروج', lang)}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// AUTH PAGE
// ============================================================
function AuthPage() {
  const { lang, toggleLang } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) { setError(t('Name is required', 'الاسم مطلوب', lang)); setLoading(false); return; }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        const profileData: UserProfile = {
          uid: cred.user.uid,
          displayName: name,
          email,
          role: 'STUDENT',
          xp: 0,
          completedLessons: [],
          completedAssessments: [],
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, 'users', cred.user.uid), profileData);
        navigate('/dashboard');
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
        const uData = userDoc.data();
        if (uData?.role === 'TUTOR') {
          navigate('/tutor');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      const msgs: Record<string, string> = {
        'auth/email-already-in-use': t('Email already registered.', 'البريد الإلكتروني مسجّل مسبقاً.', lang),
        'auth/wrong-password': t('Incorrect password.', 'كلمة المرور خاطئة.', lang),
        'auth/user-not-found': t('No account found with this email.', 'لا يوجد حساب بهذا البريد الإلكتروني.', lang),
        'auth/invalid-credential': t('Invalid email or password.', 'البريد الإلكتروني أو كلمة المرور غير صحيحة.', lang),
        'auth/weak-password': t('Password must be at least 6 characters.', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.', lang),
        'auth/invalid-email': t('Invalid email format.', 'صيغة البريد الإلكتروني غير صحيحة.', lang),
      };
      setError(msgs[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden" dir={dir(lang)}>
      {/* Animated background matching the light theme style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-32 w-[600px] h-[600px] bg-accent-pink/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-32 w-[600px] h-[600px] bg-accent-mint/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-plum/5 rounded-full blur-3xl"></div>
      </div>

      {/* Language Toggle for Auth Page */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLang}
          className="px-4 py-2 rounded-lg bg-white shadow-sm text-primary-navy text-sm font-bold transition-all border border-slate-200 hover:bg-slate-50"
        >
          {lang === 'ar' ? 'English' : 'عربي'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Course header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-plum to-primary-navy shadow-lg shadow-primary-plum/20 mb-4">
            <Brain size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-primary-navy mb-1">D-Learn</h1>
          <p className="text-accent-pink font-bold text-sm tracking-widest uppercase mb-1">
            {COURSE_METADATA.grade_en}
          </p>
          <p className="text-slate-500 text-sm font-semibold max-w-xs mx-auto leading-relaxed">
            {lang === 'ar'
              ? `${COURSE_METADATA.course_name_ar} — ${COURSE_METADATA.semester_ar}`
              : `${COURSE_METADATA.course_name_en} — ${COURSE_METADATA.semester_en}`}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-mint/20 border border-accent-mint/40 text-teal-800 text-xs font-bold shadow-sm">
            <Star size={12} className="text-teal-700" />
            {lang === 'ar' ? 'البكالوريا المصرية' : 'Egyptian Baccalaureate'}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          {/* Mode tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 gap-1 border border-slate-200">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-white text-primary-navy shadow-sm border border-slate-200' : 'text-slate-500 hover:text-primary-navy'}`}
            >
              {t('Sign In', 'تسجيل الدخول', lang)}
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === 'register' ? 'bg-white text-primary-navy shadow-sm border border-slate-200' : 'text-slate-500 hover:text-primary-navy'}`}
            >
              {t('Create Account', 'إنشاء حساب', lang)}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('Full Name', 'الاسم الكامل', lang)}
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-primary-navy text-sm font-medium focus:outline-none focus:border-accent-pink focus:ring-2 focus:ring-accent-pink/20 transition-all placeholder-slate-400"
                    placeholder={t('Your full name', 'اسمك الكامل', lang)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t('Email Address', 'البريد الإلكتروني', lang)}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-primary-navy text-sm font-medium focus:outline-none focus:border-accent-pink focus:ring-2 focus:ring-accent-pink/20 transition-all placeholder-slate-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t('Password', 'كلمة المرور', lang)}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3.5 text-primary-navy text-sm font-medium focus:outline-none focus:border-accent-pink focus:ring-2 focus:ring-accent-pink/20 transition-all placeholder-slate-400"
                  placeholder={mode === 'register' ? t('Min. 6 characters', '6 أحرف على الأقل', lang) : '••••••••'}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-navy">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <AlertTriangle size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-navy hover:bg-primary-plum text-white font-bold py-4 px-4 rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:transform-none mt-2"
            >
              {loading ? (
                <><Loader size={16} className="animate-spin" /> {t('Please wait...', 'برجاء الانتظار...', lang)}</>
              ) : mode === 'login' ? (
                <>{t('Sign In', 'تسجيل الدخول', lang)} <ArrowRight size={16} /></>
              ) : (
                <>{t('Create Account', 'إنشاء حساب', lang)} <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6 font-medium">
          {COURSE_METADATA.publisher_en}
        </p>
      </motion.div>
    </div>
  );
}

// ============================================================
// STUDENT DASHBOARD
// ============================================================
function StudentDashboard() {
  const { profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredLessons = LESSONS.filter(l =>
    search === '' ||
    l.title_en.toLowerCase().includes(search.toLowerCase()) ||
    l.title_ar.includes(search)
  );

  const completedCount = profile?.completedLessons?.length || 0;
  const totalLessons = LESSONS.length;
  const progressPct = Math.round((completedCount / Math.max(totalLessons, 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy" dir={dir(lang)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 md:p-10 mb-8 shadow-xl shadow-slate-200/50"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-mint/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-accent-pink font-bold text-sm tracking-widest uppercase mb-2">
                  {lang === 'ar' ? `${COURSE_METADATA.grade_ar} — ${COURSE_METADATA.semester_ar}` : `${COURSE_METADATA.grade_en} — ${COURSE_METADATA.semester_en}`}
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-primary-navy mb-3 leading-tight">
                  {lang === 'ar'
                    ? `مرحباً، ${profile?.displayName || 'طالب'} 👋`
                    : `Welcome back, ${profile?.displayName || 'Student'} 👋`}
                </h1>
                <p className="text-slate-700 text-lg font-bold mb-2">
                  {lang === 'ar' ? COURSE_METADATA.course_name_ar : COURSE_METADATA.course_name_en}
                </p>
                <p className="text-slate-500 text-sm font-medium">
                  {lang === 'ar' ? COURSE_METADATA.publisher_ar : COURSE_METADATA.publisher_en}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-mint/20 border border-accent-mint/40">
                  <Star size={12} className="text-teal-700" />
                  <span className="text-teal-800 text-xs font-bold">
                    {lang === 'ar' ? 'البكالوريا المصرية' : 'Egyptian Baccalaureate'}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 text-center bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-32 h-32 relative mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#progLight)" strokeWidth="3" strokeDasharray={`${progressPct}, 100`} strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="progLight" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#62426B"/>
                        <stop offset="100%" stopColor="#D97398"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-primary-navy">{progressPct}%</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t('Progress', 'التقدم', lang)}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-xs mt-3 font-semibold">
                  {completedCount}/{totalLessons} {t('Lessons Done', 'دروس مكتملة', lang)}
                </p>
              </div>
            </div>

            {/* XP Badge */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full shadow-sm">
                <Zap size={14} className="text-amber-600" />
                <span className="text-amber-700 font-bold text-sm">{profile?.xp || 0} XP</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent-mint/20 border border-accent-mint/40 rounded-full shadow-sm">
                <CheckCircle size={14} className="text-teal-700" />
                <span className="text-teal-800 font-bold text-sm">{completedCount} {t('completed', 'مكتمل', lang)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8 max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search lessons...', 'ابحث عن الدروس...', lang)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-primary-navy text-sm font-medium shadow-sm focus:outline-none focus:border-accent-pink focus:ring-2 focus:ring-accent-pink/20 transition-all placeholder-slate-400"
          />
        </div>

        {/* Lessons Grid */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black text-primary-navy">
            {t('Course Lessons', 'دروس المنهج', lang)}
            <span className="ml-2 text-sm font-bold text-slate-400">({filteredLessons.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, idx) => {
            const isCompleted = profile?.completedLessons?.includes(lesson.id);
            const lessonQuestions = QUIZ_QUESTIONS.filter(q => q.lesson === lesson.id);
            const unitColor = UNIT_COLORS[lesson.unit] || UNIT_COLORS[1];

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-accent-pink/50 hover:shadow-xl hover:shadow-accent-pink/10 transition-all group cursor-pointer flex flex-col"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                {/* Card header gradient */}
                <div className={`h-2.5 bg-gradient-to-r ${unitColor}`}></div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${unitColor} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      {UNIT_ICONS[lesson.unit]}
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-accent-mint/20 border border-accent-mint/40 rounded-full text-teal-800 text-[10px] font-bold">
                          <CheckCircle size={10} /> {t('Done', 'مكتمل', lang)}
                        </span>
                      )}
                      <span className="text-primary-navy text-xs font-bold bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                        {lesson.lesson_number}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-black text-primary-navy text-lg mb-2 group-hover:text-primary-plum transition-colors leading-snug">
                    {lang === 'ar' ? lesson.title_ar : lesson.title_en}
                  </h3>

                  <p className="text-slate-600 text-sm mb-5 line-clamp-2 font-medium">
                    {lang === 'ar'
                      ? lesson.learning_objectives_ar[0]
                      : lesson.learning_objectives_en[0]}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-6 mt-auto">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      <BookOpen size={12} className="text-primary-plum" />
                      {lesson.sections.length} {t('sections', 'أقسام', lang)}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      <FileText size={12} className="text-accent-pink" />
                      {lessonQuestions.length} {t('questions', 'سؤال', lang)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/lesson/${lesson.id}`); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all bg-gradient-to-r ${unitColor} text-white shadow-md hover:shadow-lg hover:opacity-90`}
                    >
                      <PlayCircle size={15} />
                      {t('Study', 'ادرس', lang)}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/assessment/${lesson.id}`); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all bg-slate-100 hover:bg-slate-200 border border-slate-200 text-primary-navy"
                    >
                      <Award size={15} />
                      {t('Quiz', 'اختبار', lang)}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LESSON VIEWER
// ============================================================
function LessonViewer() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [expandedTerms, setExpandedTerms] = useState<Set<number>>(new Set());
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  const lesson = LESSONS.find(l => l.id === lessonId);

  useEffect(() => { setActiveSection(0); }, [lessonId]);

  const markComplete = useCallback(async () => {
    if (!user || !profile || !lesson) return;
    if (profile.completedLessons?.includes(lesson.id)) return;
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, {
      completedLessons: [...(profile.completedLessons || []), lesson.id],
      xp: (profile.xp || 0) + 50,
    });
  }, [user, profile, lesson]);

  if (!lesson) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-primary-navy">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t('Lesson not found', 'الدرس غير موجود', lang)}</h2>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-2 bg-primary-plum rounded-xl text-white font-bold">
          {t('Back to Dashboard', 'العودة للوحة التحكم', lang)}
        </button>
      </div>
    </div>
  );

  const isCompleted = profile?.completedLessons?.includes(lesson.id);
  const section = lesson.sections[activeSection];
  const unitColor = UNIT_COLORS[lesson.unit] || UNIT_COLORS[1];

  const renderDiagramCard = (
    src: string,
    titleEn: string,
    titleAr: string,
    badgeEn: string,
    badgeAr: string,
    keyStr: string,
    isMindmap = false
  ) => {
    const title = lang === 'ar' ? titleAr : titleEn;
    const badge = lang === 'ar' ? badgeAr : badgeEn;
    return (
      <div
        key={keyStr}
        className={`my-8 rounded-xl overflow-hidden border shadow-sm transition-all duration-200 group ${
          isMindmap
            ? 'border-indigo-900/60 bg-slate-900 shadow-indigo-950/20'
            : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
      >
        <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
          isMindmap ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`text-[10.5px] font-semibold tracking-wider px-2 py-0.5 rounded ${
              isMindmap ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-white'
            }`}>
              {badge}
            </span>
            <span className="text-xs font-semibold truncate max-w-[200px] sm:max-w-md">{title}</span>
          </div>
          <button
            type="button"
            onClick={() => setPreviewImage({ src, title, caption: title })}
            className={`text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1 transition-colors ${
              isMindmap
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Maximize2 size={12} />
            <span className="hidden sm:inline">{lang === 'ar' ? 'تكبير' : 'Expand'}</span>
          </button>
        </div>
        <div
          className="relative overflow-hidden cursor-pointer bg-slate-950 flex items-center justify-center min-h-[220px]"
          onClick={() => setPreviewImage({ src, title, caption: title })}
        >
          <img
            src={src}
            alt={title}
            className="w-full h-auto object-contain max-h-[500px] group-hover:opacity-95 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="px-3 py-1 rounded bg-black/75 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 shadow">
              <Maximize2 size={13} /> {lang === 'ar' ? 'عرض بالحجم الكامل' : 'View Full Diagram'}
            </span>
          </div>
        </div>
        <div className={`p-2.5 text-xs text-center font-normal ${
          isMindmap ? 'bg-slate-900 text-slate-300 border-t border-slate-800' : 'bg-slate-900 text-slate-300'
        }`}>
          {title}
        </div>
      </div>
    );
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown renderer matching light theme
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    const isL1 = lesson.id === '1-1' || lesson.id === 'les_1_1';
    const isL2 = lesson.id === '1-2' || lesson.id === 'les_1_2';
    const isL3 = lesson.id === '1-3' || lesson.id === 'les_1_3';
    const isL4 = lesson.id === '1-4' || lesson.id === 'les_1_4';

    // Inject Concept Images at the top of relevant sections
    if (isL1 && activeSection === 0) {
      elements.push(
        renderDiagramCard(
          '/images/it_evolution_timeline.svg',
          'The 5 Major Stages of IT Evolution (From Vacuum Tubes to Cloud Computing)',
          'المراحل الخمس لتطور تكنولوجيا المعلومات (من الحواسيب الأولى إلى الحوسبة السحابية)',
          'Concept Timeline',
          'مخطط زمني للمفاهيم',
          'diag-it-timeline'
        )
      );
    } else if (isL1 && activeSection === 1) {
      elements.push(
        renderDiagramCard(
          '/images/moores_law_diagram.svg',
          "Moore's Law: Exponential Transistor Scaling & Quantum Physical Barriers",
          'قانون مور: تضاعف الترانزستورات، الحدود الفيزيائية، والتحول للمعالجة المتوازية والحواسيب الكمومية',
          'Concept Diagram',
          'رسم بياني للمفهوم',
          'diag-moore-law'
        )
      );
    } else if (isL2 && activeSection === 0) {
      elements.push(
        renderDiagramCard(
          '/images/ml_workflow_paradigm.svg',
          'Traditional Programming vs Machine Learning: Conceptual Framework',
          'البرمجة التقليدية مقابل تعلم الآلة: مقارنة المنهجيتين وطريقة التعلم من البيانات',
          'Technical Diagram',
          'مخطط تقني',
          'diag-ml-paradigm'
        )
      );
      elements.push(
        <div key="diag-nlp-cv-row" className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div
            onClick={() => setPreviewImage({
              src: '/images/nlp_pipeline_diagram.svg',
              title: lang === 'ar' ? 'مسار معالجة اللغات الطبيعية (NLP)' : 'Natural Language Processing (NLP) Pipeline',
              caption: lang === 'ar' ? 'مراحل معالجة النصوص: التجزئة، التضمين الشعاعي، ونماذج المحولات' : 'Stages of text processing: tokenization, dense embeddings, and transformers'
            })}
            className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:border-slate-300 group cursor-pointer bg-white transition-all"
          >
            <div className="relative overflow-hidden h-44 bg-slate-950 flex items-center justify-center p-2">
              <img src="/images/nlp_pipeline_diagram.svg" alt="NLP" className="w-full h-full object-contain group-hover:opacity-95 transition-opacity" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 text-[10px] font-semibold tracking-wide">
                NLP Pipeline
              </div>
            </div>
            <div className="p-2.5 text-center text-xs font-medium text-slate-700 bg-slate-50 border-t border-slate-100">
              {lang === 'ar' ? 'مسار معالجة اللغات الطبيعية (NLP)' : 'Natural Language Processing Pipeline'}
            </div>
          </div>
          <div
            onClick={() => setPreviewImage({
              src: '/images/computer_vision_pipeline.svg',
              title: lang === 'ar' ? 'مسار الرؤية الحاسوبية (Computer Vision)' : 'Computer Vision (CV) Pipeline',
              caption: lang === 'ar' ? 'مراحل معالجة الصور: مصفوفات البكسل، مرشحات الالتفاف، وتصنيف الأجسام' : 'Stages of vision: pixel grids, convolutional filtering, and classification'
            })}
            className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:border-slate-300 group cursor-pointer bg-white transition-all"
          >
            <div className="relative overflow-hidden h-44 bg-slate-950 flex items-center justify-center p-2">
              <img src="/images/computer_vision_pipeline.svg" alt="Computer Vision" className="w-full h-full object-contain group-hover:opacity-95 transition-opacity" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 text-[10px] font-semibold tracking-wide">
                Vision Pipeline
              </div>
            </div>
            <div className="p-2.5 text-center text-xs font-medium text-slate-700 bg-slate-50 border-t border-slate-100">
              {lang === 'ar' ? 'مسار الرؤية الحاسوبية (Computer Vision)' : 'Computer Vision Processing Pipeline'}
            </div>
          </div>
        </div>
      );
    } else if (isL2 && activeSection === 1) {
      elements.push(
        renderDiagramCard(
          '/images/ai_neural_network_layers.svg',
          'Deep Learning Synaptic Architecture: Input Layer, Hidden Weights, and Output Probabilities',
          'بنية الشبكات العصبية الاصطناعية: طبقات الإدخال، الأوزان المخفية، وطبقة التنبؤ',
          'Deep Learning Architecture',
          'بنية التعلم العميق',
          'diag-neural-nets'
        )
      );
    } else if (isL3 && activeSection === 0) {
      elements.push(
        renderDiagramCard(
          '/images/ai_daily_life_industry.svg',
          'Applied AI: Daily Consumer Life vs Heavy Industry 4.0 Ecosystem',
          'تطبيقات الذكاء الاصطناعي: مقارنة بين الحياة اليومية والقطاعات الصناعية الكبرى',
          'Applications Overview',
          'خارطة التطبيقات',
          'diag-daily-industry'
        )
      );
    } else if (isL4 && activeSection === 0) {
      elements.push(
        renderDiagramCard(
          '/images/ai_ethics_blackbox.svg',
          'The AI Dilemma: Algorithmic Bias & The Black Box Problem vs Explainable AI (XAI)',
          'المعضلة الأخلاقية: التحيز الخوارزمي، مشكلة الصندوق الأسود، وضرورة الشفافية',
          'Ethical Dilemma',
          'المعضلة الأخلاقية',
          'diag-ethics-blackbox'
        )
      );
    }

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-2xl font-black text-primary-navy mb-4 mt-6">{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-xl font-black text-primary-plum mb-3 mt-6 border-b border-slate-200 pb-2">{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-lg font-bold text-primary-navy mb-2 mt-4">{line.slice(4)}</h3>);
      } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        const bold = line.slice(2, -2);
        elements.push(<p key={i} className="text-primary-navy font-black text-base mt-4 mb-2">{bold}</p>);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.slice(2);
        const parts = content.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <div key={i} className="flex items-start gap-2 mb-2.5 ml-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-2 flex-shrink-0"></div>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              {parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="text-primary-navy font-bold">{part}</strong> : part)}
            </p>
          </div>
        );
      } else if (line.startsWith('| ')) {
        // Table
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        const headers = tableLines[0]?.split('|').filter(c => c.trim()).map(c => c.trim()) || [];
        const rows = tableLines.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto mb-6 mt-4 shadow-sm border border-slate-200 rounded-xl">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {headers.map((h, hi) => (
                    <th key={hi} className="text-left p-3 text-primary-plum font-bold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {rows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-3 text-slate-700 font-medium">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else if (line.startsWith('⚡') || line.startsWith('📌') || line.startsWith('💡')) {
        elements.push(
          <div key={i} className="my-5 p-4 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
            <p className="text-amber-800 text-sm leading-relaxed font-semibold">{line}</p>
          </div>
        );
      } else if (line.trim() === '') {
        if (elements.length > 0) elements.push(<div key={i} className="h-3"></div>);
      } else {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const hasFormatting = parts.length > 1;
        elements.push(
          <p key={i} className="text-slate-700 text-sm leading-relaxed mb-3 font-medium">
            {hasFormatting
              ? parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="text-primary-navy font-bold">{part}</strong> : part)
              : line}
          </p>
        );
      }
      i++;
    }

    // Inject Connecting Mindmaps
    if (isL1 && (activeSection === 4 || activeSection === lesson.sections.length - 1)) {
      elements.push(
        renderDiagramCard(
          '/images/it_social_mindmap.svg',
          'Connecting Core Concepts: IT Evolution, Moore’s Law, Social Transformation & Emerging Tech',
          'خريطة مفاهيمية شاملة: ربط تاريخ التكنولوجيا، قانون مور، التحولات الاجتماعية، والتقنيات الناشئة',
          'Concept Map',
          'خريطة المفاهيم',
          'diag-it-social-mindmap',
          true
        )
      );
    } else if (isL2 && activeSection === 1) {
      elements.push(
        renderDiagramCard(
          '/images/ai_hierarchy_mindmap.svg',
          'Connecting Core Concepts: The AI Hierarchy (AI ⊃ ML ⊃ DL ⊃ GenAI) & Working Principles',
          'خريطة مفاهيمية شاملة: هرمية الذكاء الاصطناعي (AI ⊃ ML ⊃ DL ⊃ GenAI) وآليات عمله والمخاطر',
          'Concept Map',
          'خريطة المفاهيم',
          'diag-ai-hierarchy-mindmap',
          true
        )
      );
    } else if (isL3 && (activeSection === 1 || activeSection === lesson.sections.length - 1)) {
      elements.push(
        renderDiagramCard(
          '/images/ai_industry_mindmap.svg',
          'Connecting Core Concepts: The Applied AI Ecosystem Across Consumer Life and Industry',
          'خريطة مفاهيمية شاملة: منظومة الذكاء الاصطناعي التطبيقي بين الحياة اليومية والصناعات الكبرى',
          'Concept Map',
          'خريطة المفاهيم',
          'diag-ai-industry-mindmap',
          true
        )
      );
    } else if (isL4 && activeSection === 0) {
      elements.push(
        renderDiagramCard(
          '/images/ai_ethics_mindmap.svg',
          'Connecting Core Concepts: The 6 Pillars of Responsible AI Ethics & Governance',
          'خريطة مفاهيمية شاملة: الركائز الست لأخلاقيات الذكاء الاصطناعي والحوكمة المسؤولة',
          'Concept Map',
          'خريطة المفاهيم',
          'diag-ai-ethics-mindmap',
          true
        )
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy flex" dir={dir(lang)}>
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            initial={false}
            className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-40 w-72' : 'hidden md:flex md:w-64 lg:w-72'} bg-white border-r border-slate-200 flex-col shadow-lg md:shadow-none`}
          >
            {/* Close button (mobile) */}
            <div className="md:hidden flex justify-end p-4">
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-primary-navy">
                <X size={18} />
              </button>
            </div>

            {/* Lesson title */}
            <div className={`p-5 bg-gradient-to-br ${unitColor} m-4 rounded-2xl shadow-md`}>
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest block mb-1.5">{lesson.lesson_number}</span>
              <h3 className="text-white font-black text-sm leading-snug">
                {lang === 'ar' ? lesson.title_ar : lesson.title_en}
              </h3>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3 px-1">
                {t('Sections', 'الأقسام', lang)}
              </p>
              <div className="space-y-1.5">
                {lesson.sections.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveSection(idx); setSidebarOpen(false); }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === idx ? 'bg-primary-plum/10 text-primary-plum border border-primary-plum/20' : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy border border-transparent'}`}
                  >
                    <span className="text-slate-400 text-xs mr-2">{idx + 1}.</span>
                    {lang === 'ar' ? sec.heading_ar : sec.heading_en}
                  </button>
                ))}
              </div>

              {/* Key Terms */}
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-8 mb-3 px-1">
                {t('Key Terms', 'المصطلحات', lang)}
              </p>
              <div className="space-y-1.5">
                {lesson.key_terms.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExpandedTerms(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; })}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                  >
                    <span className="font-bold text-accent-pink">
                      {lang === 'ar' ? term.term_ar : term.term_en}
                    </span>
                    {expandedTerms.has(idx) && (
                      <p className="mt-2 text-slate-500 text-xs leading-relaxed font-medium">
                        {lang === 'ar' ? term.def_ar : term.def_en}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {/* Assessment button */}
              <div className="mt-8 px-1">
                <button
                  onClick={() => navigate(`/assessment/${lesson.id}`)}
                  className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${unitColor} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:opacity-90 transition-all`}
                >
                  <Award size={15} />
                  {t('Take Assessment', 'ابدأ التقييم', lang)}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 md:px-8 py-3.5 flex items-center gap-4 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-600">
            <Menu size={18} />
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-primary-navy text-sm font-bold transition-colors">
            <ArrowLeft size={15} />
            {t('Dashboard', 'الرئيسية', lang)}
          </button>
          <div className="ml-auto flex items-center gap-2">
            {isCompleted ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-mint/20 border border-accent-mint/40 rounded-full text-teal-800 text-xs font-bold">
                <CheckCircle size={14} /> {t('Completed', 'مكتمل', lang)}
              </span>
            ) : (
              <button
                onClick={markComplete}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-plum/10 hover:bg-primary-plum/20 border border-primary-plum/30 rounded-full text-primary-plum text-xs font-bold transition-all shadow-sm"
              >
                <CheckCircle size={14} /> {t('Mark Complete (+50 XP)', 'إتمام (+50 XP)', lang)}
              </button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-10">
          {/* Lesson header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${unitColor} text-white shadow-sm`}>
                {t('Unit', 'الوحدة', lang)} {lesson.unit}
              </span>
              <span className="text-slate-500 text-sm font-bold">{lesson.lesson_number}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-primary-navy mb-5 leading-tight">
              {lang === 'ar' ? lesson.title_ar : lesson.title_en}
            </h1>

            {/* Learning objectives */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-accent-pink font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={14} />
                {t('Learning Objectives', 'أهداف التعلم', lang)}
              </h3>
              <ul className="space-y-3">
                {(lang === 'ar' ? lesson.learning_objectives_ar : lesson.learning_objectives_en).map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-semibold">
                    <CheckCircle size={16} className="text-accent-mint mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section navigation pills */}
          <div className="flex gap-2 flex-wrap mb-8">
            {lesson.sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeSection === idx ? `bg-gradient-to-r ${unitColor} text-white shadow-md` : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-primary-navy border border-slate-200 shadow-sm'}`}
              >
                {idx + 1}. {(lang === 'ar' ? sec.heading_ar : sec.heading_en).slice(0, 30)}{(lang === 'ar' ? sec.heading_ar : sec.heading_en).length > 30 ? '...' : ''}
              </button>
            ))}
          </div>

          {/* Active section content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 mb-10 shadow-lg shadow-slate-200/50"
            >
              <h2 className={`text-2xl md:text-3xl font-black mb-8 text-primary-plum`}>
                {lang === 'ar' ? section.heading_ar : section.heading_en}
              </h2>
              <div className="lesson-content">
                {renderMarkdown(lang === 'ar' ? section.content_ar : section.content_en)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pause & Think */}
          {lesson.pause_and_think.length > 0 && (
            <div className="mb-10">
              <h3 className="text-primary-plum font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lightbulb size={14} />
                {t('Pause & Think', 'توقف وفكّر', lang)}
              </h3>
              <div className="space-y-4">
                {lesson.pause_and_think.map((pq, i) => (
                  <div key={i} className="p-5 bg-primary-plum/5 border border-primary-plum/20 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary-plum/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-plum font-black text-sm">{i + 1}</span>
                      </div>
                      <p className="text-primary-navy font-semibold text-sm md:text-base leading-relaxed">
                        {lang === 'ar' ? pq.q_ar : pq.q_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

            {/* Key Terms Glossary */}
          <div className="mb-10">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookMarked size={14} />
              {t('Key Terms Glossary', 'مسرد المصطلحات', lang)}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lesson.key_terms.map((term, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-accent-pink/40 shadow-sm hover:shadow-md transition-all">
                  <p className="text-accent-pink font-black text-sm md:text-base mb-2">
                    {lang === 'ar' ? term.term_ar : term.term_en}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {lang === 'ar' ? term.def_ar : term.def_en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Flashcards Section */}
          {FLASHCARDS[lesson.id] && (
            <div className="mb-10">
              <h3 className="text-primary-plum font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Brain size={14} />
                {t('Study Flashcards', 'كروت المراجعة السريعة', lang)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FLASHCARDS[lesson.id].map((card, idx) => (
                  <div key={idx} className="group perspective-1000">
                    <div className="relative w-full h-40 transition-all duration-500 transform-style-3d group-hover:rotate-y-180 cursor-pointer">
                      {/* Front */}
                      <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary-navy to-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-md border border-slate-700">
                        <Zap size={24} className="text-accent-mint mb-3 opacity-50" />
                        <h4 className="text-white font-black text-lg">
                          {lang === 'ar' ? card.front_ar : card.front_en}
                        </h4>
                        <p className="text-slate-400 text-xs mt-4 uppercase tracking-wider font-bold">
                          {t('Hover to flip', 'مرر الماوس للقلب', lang)}
                        </p>
                      </div>
                      {/* Back */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl p-6 flex items-center justify-center text-center shadow-lg border-2 border-accent-mint">
                        <p className="text-primary-navy font-bold text-base leading-relaxed">
                          {lang === 'ar' ? card.back_ar : card.back_en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              {activeSection > 0 && (
                <button
                  onClick={() => setActiveSection(activeSection - 1)}
                  className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-primary-navy font-bold text-sm transition-all shadow-sm"
                >
                  <ArrowLeft size={16} /> {t('Previous', 'السابق', lang)}
                </button>
              )}
              {activeSection < lesson.sections.length - 1 && (
                <button
                  onClick={() => setActiveSection(activeSection + 1)}
                  className={`flex items-center gap-2 px-5 py-3 bg-gradient-to-r ${unitColor} text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all`}
                >
                  {t('Next Section', 'القسم التالي', lang)} <ArrowRight size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => navigate(`/assessment/${lesson.id}`)}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-primary-navy font-bold text-sm transition-all shadow-sm"
            >
              <Award size={16} className="text-accent-pink" />
              {t('Take Assessment', 'ابدأ التقييم', lang)}
            </button>
          </div>
        </div>
      </main>

      {/* Lightbox / Fullscreen Diagram Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-800/90 border-b border-slate-700 text-white">
              <h3 className="font-bold text-sm md:text-base text-slate-100 line-clamp-1">{previewImage.title}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={previewImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 transition-colors flex items-center gap-1 font-semibold"
                >
                  {lang === 'ar' ? 'فتح في نافذة مستقلة' : 'Open in New Tab'}
                </a>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950 min-h-0">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-w-full max-h-[74vh] object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 text-center font-medium">
              {previewImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ASSESSMENT
// ============================================================
function Assessment() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();

  const lesson = LESSONS.find(l => l.id === lessonId);
  const questions = QUIZ_QUESTIONS.filter(q => matchLessonId(q.lesson, lessonId || ''));

  const [filterType, setFilterType] = useState<'ALL' | 'MCQ' | 'WRITTEN'>('ALL');
  const [filterSource, setFilterSource] = useState<'ALL' | 'CLASSROOM' | 'HOMEWORK' | 'WEEKLY_ASSESSMENT'>('ALL');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filtered = questions.filter(q =>
    (filterType === 'ALL' || q.type === filterType) &&
    (filterSource === 'ALL' || q.source === filterSource)
  );

  const q = filtered[currentQ];
  const answered = q ? answers[q.id] : undefined;
  const isCorrect = q?.type === 'MCQ' && answered === q.correct_option;

  const handleSelect = (val: string) => {
    if (showFeedback && q?.type === 'MCQ') return;
    setAnswers({ ...answers, [q.id]: val });
  };

  const handleCheck = () => {
    if (q?.type === 'MCQ') setShowFeedback(true);
    else handleNext();
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQ < filtered.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSubmitToFirebase = async () => {
    if (!user || !profile || submitting) return;
    setSubmitting(true);
    try {
      const mcqQs = filtered.filter(q => q.type === 'MCQ');
      const correctCount = mcqQs.filter(q => answers[q.id] === q.correct_option).length;
      const writtenAnswers: Record<string, string> = {};
      filtered.filter(q => q.type === 'WRITTEN').forEach(q => {
        if (answers[q.id]) writtenAnswers[q.id] = answers[q.id];
      });

      const result: AssessmentResult = {
        userId: user.uid,
        userName: profile.displayName || user.email || 'Student',
        userEmail: user.email || '',
        lessonId: lessonId || '',
        score: Math.round((correctCount / Math.max(mcqQs.length, 1)) * 100),
        totalMCQ: mcqQs.length,
        correctMCQ: correctCount,
        answers,
        writtenAnswers,
        submittedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'assessment_results'), result);

      const alreadyDone = profile.completedAssessments?.includes(lessonId || '');
      if (!alreadyDone) {
        await updateDoc(doc(db, 'users', user.uid), {
          completedAssessments: [...(profile.completedAssessments || []), lessonId],
          xp: (profile.xp || 0) + correctCount * 10,
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!lesson) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-primary-navy font-bold">Lesson not found</div>;

  const unitColor = UNIT_COLORS[lesson.unit] || UNIT_COLORS[1];

  if (isFinished) {
    const mcqQs = filtered.filter(q => q.type === 'MCQ');
    const correctCount = mcqQs.filter(q => answers[q.id] === q.correct_option).length;
    const scorePct = mcqQs.length > 0 ? Math.round((correctCount / mcqQs.length) * 100) : 100;
    const grade = scorePct >= 85 ? '🌟 Excellent' : scorePct >= 70 ? '✅ Good' : scorePct >= 50 ? '📘 Needs Review' : '❌ Try Again';

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir={dir(lang)}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 text-center shadow-2xl shadow-slate-200/50">
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="2.5"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#resultGrad2)" strokeWidth="2.5" strokeDasharray={`${scorePct}, 100`} strokeLinecap="round"/>
                <defs>
                  <linearGradient id="resultGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={scorePct >= 70 ? '#10b981' : '#ef4444'}/>
                    <stop offset="100%" stopColor={scorePct >= 70 ? '#34d399' : '#f87171'}/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-primary-navy">{scorePct}%</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{t('Score', 'النتيجة', lang)}</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-primary-navy mb-3">{t('Assessment Complete!', 'انتهى التقييم!', lang)}</h2>
            <p className="text-xl font-bold text-primary-plum mb-3">{grade}</p>
            <p className="text-slate-600 font-medium mb-4">{correctCount} / {mcqQs.length} {t('MCQ Correct', 'صح من اختيار متعدد', lang)}</p>
            {Object.keys(answers).some(k => filtered.find(q => q.id === k && q.type === 'WRITTEN')) && (
              <p className="text-accent-pink text-sm font-semibold mb-6 bg-accent-pink/5 p-3 rounded-xl border border-accent-pink/20">
                {t('Written answers will be reviewed by your tutor.', 'ستُراجَع الأسئلة المقالية من قِبَل مدرّسك.', lang)}
              </p>
            )}

            {!submitted ? (
              <button
                onClick={handleSubmitToFirebase}
                disabled={submitting}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-gradient-to-r ${unitColor} shadow-lg hover:opacity-90 transition-all mb-4 disabled:opacity-50`}
              >
                {submitting ? <><Loader size={16} className="animate-spin" /> {t('Saving...', 'جاري الحفظ...', lang)}</> : <>{t('Save Results & Earn XP', 'احفظ النتائج واكسب XP', lang)} <Zap size={16} /></>}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 py-4 mb-4 bg-accent-mint/20 border border-accent-mint/40 rounded-xl text-teal-800 font-bold">
                <CheckCircle size={16} /> {t('Results Saved!', 'تم حفظ النتائج!', lang)}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setIsFinished(false); setCurrentQ(0); setAnswers({}); setShowFeedback(false); setSubmitted(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-primary-navy font-bold text-sm shadow-sm"
              >
                <RotateCcw size={15} /> {t('Retry', 'إعادة', lang)}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-primary-navy font-bold text-sm shadow-sm"
              >
                <Home size={15} /> {t('Dashboard', 'الرئيسية', lang)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy" dir={dir(lang)}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(`/lesson/${lessonId}`)} className="flex items-center gap-2 text-slate-500 hover:text-primary-navy text-sm font-bold transition-colors">
            <ArrowLeft size={15} />
            {lang === 'ar' ? lesson.title_ar : lesson.title_en}
          </button>
        </div>

        <div className="mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-black text-primary-navy mb-2">
            {lang === 'ar' ? lesson.title_ar : lesson.title_en} — <span className="text-primary-plum">{t('Assessment', 'التقييم', lang)}</span>
          </h1>
          <p className="text-slate-500 font-semibold">{filtered.length} {t('questions', 'أسئلة', lang)}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex rounded-xl bg-white border border-slate-200 p-1.5 shadow-sm">
            {(['ALL', 'MCQ', 'WRITTEN'] as const).map(type => (
              <button
                key={type}
                onClick={() => { setFilterType(type); setCurrentQ(0); setAnswers({}); setShowFeedback(false); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === type ? 'bg-primary-plum text-white shadow-sm' : 'text-slate-500 hover:text-primary-navy'}`}
              >
                {type === 'MCQ' ? t('MCQ', 'اختيار متعدد', lang) : type === 'WRITTEN' ? t('Written', 'مقالي', lang) : t('All', 'الكل', lang)}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl bg-white border border-slate-200 p-1.5 shadow-sm">
            {(['ALL', 'CLASSROOM', 'HOMEWORK', 'WEEKLY_ASSESSMENT'] as const).map(src => (
              <button
                key={src}
                onClick={() => { setFilterSource(src); setCurrentQ(0); setAnswers({}); setShowFeedback(false); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterSource === src ? 'bg-accent-pink text-white shadow-sm' : 'text-slate-500 hover:text-primary-navy'}`}
              >
                {src === 'ALL' ? t('All', 'الكل', lang) : src === 'CLASSROOM' ? t('Classroom', 'صفي', lang) : src === 'HOMEWORK' ? t('Homework', 'منزلي', lang) : t('Weekly', 'أسبوعي', lang)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 font-semibold text-lg">{t('No questions match these filters.', 'لا توجد أسئلة تطابق هذه المرشحات.', lang)}</p>
          </div>
        ) : !q ? null : (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                  {t('Question', 'السؤال', lang)} {currentQ + 1} {t('of', 'من', lang)} {filtered.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${q.type === 'MCQ' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {q.type === 'MCQ' ? t('MCQ', 'اختيار متعدد', lang) : t('Written', 'مقالي', lang)}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${q.source === 'CLASSROOM' ? 'bg-primary-plum/10 text-primary-plum border border-primary-plum/20' : q.source === 'HOMEWORK' ? 'bg-accent-mint/20 text-teal-800 border border-accent-mint/40' : 'bg-accent-pink/10 text-accent-pink border border-accent-pink/20'}`}>
                    {q.source === 'CLASSROOM' ? t('Classroom', 'صفي', lang) : q.source === 'HOMEWORK' ? t('Homework', 'منزلي', lang) : t('Weekly', 'أسبوعي', lang)}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${q.difficulty === 'EASY' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : q.difficulty === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                    {q.difficulty === 'EASY' ? t('Easy', 'سهل', lang) : q.difficulty === 'MEDIUM' ? t('Medium', 'متوسط', lang) : t('Hard', 'صعب', lang)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${unitColor} h-full transition-all duration-500 ease-out`}
                  style={{ width: `${((currentQ + 1) / filtered.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentQ}-${q.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 mb-8 shadow-xl shadow-slate-200/50"
              >
                <h2 className="text-xl md:text-2xl font-black text-primary-navy mb-10 leading-snug">
                  {lang === 'ar' ? q.question_ar : q.question_en}
                </h2>

                {q.type === 'MCQ' ? (
                  <div className="space-y-4">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const text = lang === 'ar' ? (q as any)[`option_${opt.toLowerCase()}_ar`] : (q as any)[`option_${opt.toLowerCase()}_en`];
                      if (!text) return null;
                      const isSelected = answered === opt;
                      let cls = 'bg-white border-slate-200 hover:border-primary-plum hover:bg-slate-50 text-slate-700';
                      let letterCls = 'bg-slate-100 text-slate-500 border border-slate-200';
                      
                      if (showFeedback) {
                        if (opt === q.correct_option) {
                          cls = 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm';
                          letterCls = 'bg-emerald-500 text-white border-emerald-500';
                        }
                        else if (isSelected) {
                          cls = 'bg-rose-50 border-rose-400 text-rose-900';
                          letterCls = 'bg-rose-500 text-white border-rose-500';
                        }
                        else {
                          cls = 'bg-white border-slate-100 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        cls = 'bg-primary-plum/5 border-primary-plum text-primary-navy shadow-sm';
                        letterCls = 'bg-primary-plum text-white border-primary-plum';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelect(opt)}
                          disabled={showFeedback}
                          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-bold flex items-center gap-4 ${cls}`}
                        >
                          <span className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-black text-sm transition-colors ${letterCls}`}>
                            {opt}
                          </span>
                          <span className="text-base">{text}</span>
                          <span className="ml-auto">
                            {showFeedback && opt === q.correct_option && <CheckCircle size={20} className="text-emerald-500" />}
                            {showFeedback && isSelected && opt !== q.correct_option && <XCircle size={20} className="text-rose-500" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {(lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en) && (
                      <div className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                        <p className="text-blue-700 text-xs font-bold mb-2 flex items-center gap-2 uppercase tracking-wider">
                          <Lightbulb size={14} /> {t('Model Answer (for study)', 'النموذج المقترح (للدراسة)', lang)}
                        </p>
                        <p className="text-blue-900 text-sm md:text-base font-semibold leading-relaxed">
                          {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                        </p>
                      </div>
                    )}
                    <textarea
                      rows={6}
                      value={answered || ''}
                      onChange={e => handleSelect(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-5 text-primary-navy text-base font-medium focus:outline-none focus:border-accent-pink focus:ring-2 focus:ring-accent-pink/20 transition-all resize-none placeholder-slate-400"
                      placeholder={t('Type your answer here...', 'اكتب إجابتك هنا...', lang)}
                    />
                    <p className="text-slate-500 text-sm font-semibold mt-3 flex items-center gap-2">
                      <Lock size={14} />
                      {t('Your written answer will be saved and reviewed by your tutor.', 'ستُحفَظ إجابتك المكتوبة وتُراجَع من قِبَل مدرّسك.', lang)}
                    </p>
                  </div>
                )}

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && q.type === 'MCQ' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className={`overflow-hidden rounded-xl border-l-4 p-5 ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}
                    >
                      <p className={`font-black mb-2 text-lg flex items-center gap-2 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {isCorrect ? <><CheckCircle size={20}/> {t('Correct!', 'صحيح!', lang)}</> : <><XCircle size={20}/> {t('Incorrect', 'خطأ', lang)}</>}
                      </p>
                      <p className="text-slate-700 text-base font-medium leading-relaxed">
                        {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end gap-3">
                  {!showFeedback && q.type === 'MCQ' ? (
                    <button
                      onClick={handleCheck}
                      disabled={!answered}
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${unitColor} shadow-lg hover:opacity-90 transition-all disabled:opacity-40`}
                    >
                      {t('Check Answer', 'تحقق من الإجابة', lang)}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${unitColor} shadow-lg hover:opacity-90 transition-all`}
                    >
                      {currentQ === filtered.length - 1 ? t('Finish', 'إنهاء', lang) : t('Next', 'التالي', lang)}
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TUTOR / MASTER ADMIN CONTROL CENTER
// ============================================================
function TutorDashboard() {
  const { lang, profile, loadingProfile } = React.useContext(AppContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState<UserProfile[]>([]);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'students' | 'submissions' | 'written'>('students');
  const [search, setSearch] = useState('');
  const [filterLesson, setFilterLesson] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'COMPLETED' | 'IN_PROGRESS' | 'NEEDS_HELP'>('ALL');

  // Modals
  const [selectedStudent, setSelectedStudent] = useState<UserProfile | null>(null);
  const [inspectSubmission, setInspectSubmission] = useState<AssessmentResult | null>(null);
  const [confirmResetStudent, setConfirmResetStudent] = useState<UserProfile | null>(null);
  const [confirmDeleteStudent, setConfirmDeleteStudent] = useState<UserProfile | null>(null);

  // Written questions grading
  const [gradeInputs, setGradeInputs] = useState<Record<string, { score: number; note: string }>>({});
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loadingProfile && profile && profile.role !== 'TUTOR') {
      navigate('/dashboard');
    }
  }, [profile, loadingProfile, navigate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const [usersSnap, resultsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(query(collection(db, 'assessment_results'), orderBy('submittedAt', 'desc')))
      ]);

      const allUsers = usersSnap.docs.map(d => ({ uid: d.id, ...d.data() } as UserProfile));
      const studentUsers = allUsers.filter(u => u.role !== 'TUTOR' && u.email !== 'admin@d-learn.com');
      setStudents(studentUsers);

      const allResults = resultsSnap.docs.map(d => ({ id: d.id, ...d.data() } as AssessmentResult));
      setResults(allResults);

      if (isRefresh) {
        showToast(t('Platform data refreshed successfully', 'تم تحديث بيانات المنصة والطلاب بنجاح', lang));
      }
    } catch (e) {
      console.error('Failed to load admin data:', e);
      showToast(t('Error loading data', 'حدث خطأ أثناء تحميل البيانات', lang));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actions
  const handleResetStudent = async (student: UserProfile) => {
    setActionLoading(true);
    try {
      await updateDoc(doc(db, 'users', student.uid), {
        completedLessons: [],
        completedAssessments: [],
        xp: 0
      });
      setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, completedLessons: [], completedAssessments: [], xp: 0 } : s));
      if (selectedStudent?.uid === student.uid) {
        setSelectedStudent({ ...selectedStudent, completedLessons: [], completedAssessments: [], xp: 0 });
      }
      showToast(t(`Progress reset for ${student.displayName}`, `تم إعادة تعيين تقدم الطالب ${student.displayName} بنجاح`, lang));
      setConfirmResetStudent(null);
    } catch (err) {
      console.error(err);
      showToast(t('Error resetting progress', 'حدث خطأ أثناء إعادة التعيين', lang));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteStudent = async (student: UserProfile) => {
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'users', student.uid));
      setStudents(prev => prev.filter(s => s.uid !== student.uid));
      if (selectedStudent?.uid === student.uid) {
        setSelectedStudent(null);
      }
      showToast(t(`Student ${student.displayName} removed`, `تم حذف بيانات الطالب ${student.displayName} من المنصة`, lang));
      setConfirmDeleteStudent(null);
    } catch (err) {
      console.error(err);
      showToast(t('Error deleting student', 'حدث خطأ أثناء الحذف', lang));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveGrading = async (submissionId: string, qId: string) => {
    const key = `${submissionId}_${qId}`;
    const input = gradeInputs[key];
    if (!input) return;
    setActionLoading(true);
    try {
      const sub = results.find(r => r.id === submissionId);
      const updatedFeedback = {
        ...(sub?.tutorFeedback || {}),
        [qId]: { score: input.score, note: input.note }
      };
      await updateDoc(doc(db, 'assessment_results', submissionId), {
        tutorFeedback: updatedFeedback
      });
      setResults(prev => prev.map(r => r.id === submissionId ? { ...r, tutorFeedback: updatedFeedback } : r));
      if (inspectSubmission?.id === submissionId) {
        setInspectSubmission({ ...inspectSubmission, tutorFeedback: updatedFeedback });
      }
      showToast(t('Grading & feedback saved successfully', 'تم حفظ درجة وملاحظة السؤال بنجاح', lang));
    } catch (err) {
      console.error(err);
      showToast(t('Failed to save grading', 'تعذر حفظ التصحيح', lang));
    } finally {
      setActionLoading(false);
    }
  };

  // Helper stats
  const totalStudents = students.length;
  const completedLessonsTotal = students.reduce((acc, s) => acc + (s.completedLessons?.length || 0), 0);
  const totalSubmissions = results.length;
  const avgScore = totalSubmissions > 0
    ? Math.round(results.reduce((acc, r) => acc + (r.score || 0), 0) / totalSubmissions)
    : 0;

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const matchesSearch = !search ||
      s.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase());
    
    const studentResults = results.filter(r => r.userId === s.uid);
    const studentAvg = studentResults.length > 0
      ? studentResults.reduce((acc, r) => acc + (r.score || 0), 0) / studentResults.length
      : 0;

    if (!matchesSearch) return false;
    if (filterStatus === 'COMPLETED') return (s.completedLessons?.length || 0) >= LESSONS.length;
    if (filterStatus === 'IN_PROGRESS') return (s.completedLessons?.length || 0) > 0 && (s.completedLessons?.length || 0) < LESSONS.length;
    if (filterStatus === 'NEEDS_HELP') return studentResults.length > 0 && studentAvg < 60;
    return true;
  });

  // Filtered Submissions
  const filteredSubmissions = results.filter(r => {
    const matchesSearch = !search ||
      r.userName?.toLowerCase().includes(search.toLowerCase()) ||
      r.userEmail?.toLowerCase().includes(search.toLowerCase());
    const matchesLesson = filterLesson === 'ALL' || matchLessonId(r.lessonId, filterLesson);
    return matchesSearch && matchesLesson;
  });

  // Written Queue Submissions
  const writtenSubmissions = results.filter(r => r.writtenAnswers && Object.keys(r.writtenAnswers).length > 0);

  const lessonLookup = (id: string) => LESSONS.find(l => matchLessonId(l.id, id));

  return (
    <div className="min-h-screen bg-slate-50 text-primary-navy pb-16" dir={dir(lang)}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary-navy text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-accent-pink/30"
          >
            <Sparkles size={18} className="text-accent-pink animate-pulse" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-primary-navy via-primary-plum to-primary-navy rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-primary-plum/15 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-pink text-xs font-black uppercase tracking-wider mb-3">
                <Shield size={14} className="text-accent-pink" />
                {lang === 'ar' ? 'مركز التحكم والرقابة الشاملة' : 'Master Platform Control'}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-2 flex items-center gap-3">
                {t('Academy & Students Command Center', 'مركز إدارة الأكاديمية والطلاب', lang)}
              </h1>
              <p className="text-slate-300 text-sm font-medium max-w-2xl leading-relaxed">
                {lang === 'ar'
                  ? 'متابعة حية وشاملة لجميع الطلاب المسجلين: تفاصيل تقدم الدروس، فحص أوراق الامتحانات (الأسئلة الصحيحة والخاطئة)، تصحيح الأسئلة المقالية، والتحكم بالبيانات.'
                  : 'Live surveillance of registered students: lesson completion progress, exam sheet inspection (correct & incorrect questions), written answer grading, and student management.'}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                <RefreshCw size={14} className={refreshing ? 'animate-spin text-accent-pink' : ''} />
                <span>{t('Refresh Data', 'تحديث البيانات', lang)}</span>
              </button>
              <button
                onClick={() => navigate('/student-preview')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-primary-navy text-xs font-black shadow-md hover:bg-slate-100 transition-all"
              >
                <Eye size={14} className="text-primary-plum" />
                <span>{t('Student Preview', 'معاينة كطالب', lang)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('Registered Students', 'الطلاب المسجلين', lang)}</p>
              <p className="text-2xl font-black text-primary-navy mt-0.5">{totalStudents}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-primary-plum flex items-center justify-center font-black">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('Completed Lessons', 'الدروس المنجزة', lang)}</p>
              <p className="text-2xl font-black text-primary-navy mt-0.5">{completedLessonsTotal}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-accent-pink flex items-center justify-center font-black">
              <FileCheck size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('Exams Solved', 'الامتحانات المحلولة', lang)}</p>
              <p className="text-2xl font-black text-primary-navy mt-0.5">{totalSubmissions}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <BarChart2 size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('Avg Exam Score', 'متوسط درجات الطلاب', lang)}</p>
              <p className="text-2xl font-black text-emerald-600 mt-0.5">{avgScore}%</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6 gap-2 sm:gap-4 overflow-x-auto pb-1">
          <button
            onClick={() => { setActiveTab('students'); setSearch(''); }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'students'
                ? 'border-primary-plum text-primary-plum bg-primary-plum/5 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-primary-navy'
            }`}
          >
            <Users size={16} />
            <span>{t('Students Directory & Control', 'دليل الطلاب والتحكم بالتقدم', lang)}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 font-bold">{totalStudents}</span>
          </button>

          <button
            onClick={() => { setActiveTab('submissions'); setSearch(''); }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'border-primary-plum text-primary-plum bg-primary-plum/5 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-primary-navy'
            }`}
          >
            <FileText size={16} />
            <span>{t('Exam Submissions & Sheets', 'سجل الامتحانات وأوراق الإجابة التفصيلية', lang)}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 font-bold">{totalSubmissions}</span>
          </button>

          <button
            onClick={() => { setActiveTab('written'); setSearch(''); }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'written'
                ? 'border-primary-plum text-primary-plum bg-primary-plum/5 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-primary-navy'
            }`}
          >
            <MessageSquare size={16} />
            <span>{t('Written Questions Queue', 'مركز تصحيح الأسئلة المقالية', lang)}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-accent-pink/20 text-accent-pink font-black">
              {writtenSubmissions.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Students Management */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Filter and search bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('Search by name or email...', 'ابحث باسم الطالب أو الإيميل...', lang)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-primary-navy placeholder-slate-400 focus:outline-none focus:border-primary-plum"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
                {(['ALL', 'COMPLETED', 'IN_PROGRESS', 'NEEDS_HELP'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      filterStatus === st
                        ? 'bg-primary-navy text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'ALL' && t('All Students', 'جميع الطلاب', lang)}
                    {st === 'COMPLETED' && t('Completed All (4/4)', 'أتموا جميع الدروس', lang)}
                    {st === 'IN_PROGRESS' && t('In Progress', 'قيد التعلم', lang)}
                    {st === 'NEEDS_HELP' && t('Needs Review (<60%)', 'يحتاجون متابعة', lang)}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader size={36} className="animate-spin text-accent-pink" />
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <Users size={48} className="mx-auto mb-3 text-slate-300" />
                <p className="text-slate-600 font-bold text-lg">{t('No students match your criteria.', 'لا يوجد طلاب مطابقين للبحث.', lang)}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredStudents.map(student => {
                  const studentSubmissions = results.filter(r => r.userId === student.uid);
                  const completedLessonsCount = student.completedLessons?.length || 0;
                  const progressPct = Math.round((completedLessonsCount / Math.max(LESSONS.length, 1)) * 100);
                  const studentAvg = studentSubmissions.length > 0
                    ? Math.round(studentSubmissions.reduce((acc, r) => acc + (r.score || 0), 0) / studentSubmissions.length)
                    : null;

                  return (
                    <motion.div
                      key={student.uid}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-pink to-primary-plum text-white font-black text-base flex items-center justify-center shadow-sm">
                              {student.displayName?.charAt(0)?.toUpperCase() || 'S'}
                            </div>
                            <div>
                              <h3 className="font-bold text-primary-navy text-base leading-tight">{student.displayName || t('Student', 'طالب', lang)}</h3>
                              <p className="text-slate-400 text-xs mt-0.5">{student.email}</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-1">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            {student.xp || 0} XP
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                            <span className="text-slate-500">{t('Curriculum Progress', 'التقدم في المنهج', lang)}</span>
                            <span className="text-primary-plum font-black">{completedLessonsCount} / {LESSONS.length} {t('Lessons', 'دروس', lang)}</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                            <div
                              className="bg-gradient-to-r from-primary-plum to-accent-pink h-full transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            ></div>
                          </div>

                          {/* Lesson Checkpoints */}
                          <div className="grid grid-cols-4 gap-1.5 text-center">
                            {LESSONS.map(l => {
                              const done = student.completedLessons?.includes(l.id);
                              return (
                                <div
                                  key={l.id}
                                  className={`py-1 rounded-md text-[10px] font-bold border transition-colors ${
                                    done
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-white text-slate-400 border-slate-200'
                                  }`}
                                  title={`${l.title_ar} - ${done ? 'مكتمل' : 'غير مكتمل'}`}
                                >
                                  {l.lesson_number} {done ? '✓' : '—'}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Exam Stats */}
                        <div className="grid grid-cols-2 gap-2 text-center mb-5">
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">{t('Exams Taken', 'الامتحانات', lang)}</span>
                            <span className="font-black text-sm text-primary-navy">{studentSubmissions.length}</span>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">{t('Avg Score', 'المعدل', lang)}</span>
                            <span className={`font-black text-sm ${studentAvg !== null ? (studentAvg >= 70 ? 'text-emerald-600' : studentAvg >= 50 ? 'text-amber-600' : 'text-rose-600') : 'text-slate-400'}`}>
                              {studentAvg !== null ? `${studentAvg}%` : '—'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary-plum/10 hover:bg-primary-plum/20 text-primary-plum font-bold text-xs transition-colors"
                        >
                          <Search size={13} />
                          <span>{t('View Dossier', 'الملف التفصيلي', lang)}</span>
                        </button>
                        <button
                          onClick={() => setConfirmResetStudent(student)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 transition-colors"
                          title={t('Reset Student Progress', 'إعادة ضبط تقدم الطالب', lang)}
                        >
                          <RotateCcw size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteStudent(student)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors"
                          title={t('Delete Student Data', 'حذف حساب الطالب من النظام', lang)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Exam Submissions */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* Filter and search bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('Search by student name or email...', 'ابحث باسم الطالب أو الإيميل...', lang)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-primary-navy placeholder-slate-400 focus:outline-none focus:border-primary-plum"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
                <button
                  onClick={() => setFilterLesson('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    filterLesson === 'ALL'
                      ? 'bg-primary-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t('All Lessons', 'جميع الدروس', lang)}
                </button>
                {LESSONS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setFilterLesson(l.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      filterLesson === l.id
                        ? 'bg-primary-plum text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l.lesson_number}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader size={36} className="animate-spin text-accent-pink" />
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <FileText size={48} className="mx-auto mb-3 text-slate-300" />
                <p className="text-slate-600 font-bold text-lg">{t('No assessment papers found.', 'لا توجد أوراق امتحانية مطابقة.', lang)}</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left" dir={dir(lang)}>
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 text-primary-plum font-bold text-xs uppercase tracking-wider">{t('Student', 'الطالب', lang)}</th>
                        <th className="p-4 text-primary-plum font-bold text-xs uppercase tracking-wider">{t('Lesson', 'الدرس', lang)}</th>
                        <th className="p-4 text-primary-plum font-bold text-xs uppercase tracking-wider">{t('Result Score', 'الدرجة', lang)}</th>
                        <th className="p-4 text-primary-plum font-bold text-xs uppercase tracking-wider">{t('Breakdown', 'تفصيل الحل', lang)}</th>
                        <th className="p-4 text-primary-plum font-bold text-xs uppercase tracking-wider">{t('Date', 'التاريخ', lang)}</th>
                        <th className="p-4 text-primary-plum font-bold text-xs uppercase tracking-wider text-center">{t('Inspection', 'فحص الورقة', lang)}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubmissions.map(res => {
                        const l = lessonLookup(res.lessonId);
                        const writtenCount = Object.keys(res.writtenAnswers || {}).length;

                        return (
                          <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-accent-pink/10 flex items-center justify-center text-accent-pink font-black text-sm border border-accent-pink/20">
                                  {res.userName?.charAt(0)?.toUpperCase() || 'S'}
                                </div>
                                <div>
                                  <span className="text-primary-navy font-bold text-sm block leading-tight">{res.userName}</span>
                                  {res.userEmail && <span className="text-slate-400 text-xs">{res.userEmail}</span>}
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="text-slate-700 font-bold text-sm block">
                                {l ? (lang === 'ar' ? l.title_ar : l.title_en) : `Lesson ${res.lessonId}`}
                              </span>
                              {l && <span className="text-slate-400 text-xs font-semibold">{t('Unit', 'الوحدة', lang)} {l.unit} • {l.lesson_number}</span>}
                            </td>

                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                                  res.score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  res.score >= 60 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                  res.score >= 50 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  {res.score}%
                                </span>
                              </div>
                            </td>

                            <td className="p-4 text-xs font-semibold text-slate-600">
                              <span className="text-emerald-700 font-bold">{res.correctMCQ || 0} {t('Correct', 'صح', lang)}</span>
                              {' / '}
                              <span className="text-slate-500">{res.totalMCQ || 0} {t('MCQ', 'اختيار', lang)}</span>
                              {writtenCount > 0 && (
                                <span className="mr-2 ml-2 px-2 py-0.5 rounded bg-primary-plum/10 text-primary-plum font-bold">
                                  {writtenCount} {t('written', 'مقالي', lang)}
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-xs font-semibold text-slate-500">
                              {res.submittedAt?.toDate ? res.submittedAt.toDate().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US') : '—'}
                            </td>

                            <td className="p-4 text-center">
                              <button
                                onClick={() => setInspectSubmission(res)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-navy hover:bg-primary-plum text-white text-xs font-bold transition-all shadow-sm"
                              >
                                <Eye size={13} />
                                <span>{t('Inspect Paper', 'فحص ورقة الإجابة', lang)}</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Written Questions Queue */}
        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-primary-navy mb-1">{t('Written Answer Evaluation Queue', 'مركز تصحيح ومراجعة الإجابات المقالية', lang)}</h2>
              <p className="text-slate-500 text-sm font-semibold">
                {t('Evaluate essay questions submitted by students, assign scores, and provide personalized feedback.', 'مراجعة إجابات الطلاب على الأسئلة المقالية وإعطاء درجات وملاحظات المعلم التوجيهية.', lang)}
              </p>
            </div>

            {writtenSubmissions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <CheckCircle size={48} className="mx-auto mb-3 text-slate-300" />
                <p className="text-slate-600 font-bold text-lg">{t('No written answers in queue.', 'لا توجد إجابات مقالية بانتظار المراجعة.', lang)}</p>
              </div>
            ) : (
              <div className="space-y-5">
                {writtenSubmissions.map(sub => {
                  const l = lessonLookup(sub.lessonId);
                  const writtenEntries = Object.entries(sub.writtenAnswers || {});

                  return (
                    <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-plum to-primary-navy text-white font-bold flex items-center justify-center">
                            {sub.userName?.charAt(0)?.toUpperCase() || 'S'}
                          </div>
                          <div>
                            <span className="font-bold text-primary-navy text-sm block">{sub.userName}</span>
                            <span className="text-slate-400 text-xs">{sub.userEmail || ''} • {l ? (lang === 'ar' ? l.title_ar : l.title_en) : sub.lessonId}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setInspectSubmission(sub)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                          >
                            <FileText size={13} />
                            {t('Full Paper', 'الورقة كاملة', lang)}
                          </button>
                        </div>
                      </div>

                      {/* Questions List */}
                      <div className="space-y-4">
                        {writtenEntries.map(([qId, answerText]) => {
                          const question = QUIZ_QUESTIONS.find(q => q.id === qId);
                          const inputKey = `${sub.id}_${qId}`;
                          const existingFeedback = sub.tutorFeedback?.[qId];
                          const scoreVal = gradeInputs[inputKey]?.score ?? existingFeedback?.score ?? 10;
                          const noteVal = gradeInputs[inputKey]?.note ?? existingFeedback?.note ?? '';

                          return (
                            <div key={qId} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                              <p className="font-bold text-primary-navy text-sm mb-2">
                                ❓ {question ? (lang === 'ar' ? question.question_ar : question.question_en) : qId}
                              </p>

                              {/* Student Answer */}
                              <div className="mb-3 p-3.5 bg-white rounded-xl border border-slate-200">
                                <span className="block text-[11px] font-bold text-accent-pink uppercase tracking-wider mb-1">
                                  {t("Student's Answer:", 'إجابة الطالب:', lang)}
                                </span>
                                <p className="text-slate-800 text-sm font-medium leading-relaxed whitespace-pre-wrap">
                                  {answerText || t('No answer provided', 'لم يُكتب رد', lang)}
                                </p>
                              </div>

                              {/* Model Answer Reference */}
                              {question && (question.ideal_answer_ar || question.ideal_answer_en) && (
                                <div className="mb-3 p-3 bg-blue-50/70 border border-blue-200/70 rounded-xl">
                                  <span className="block text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <Lightbulb size={12} /> {t('Model Reference Answer:', 'نموذج الإجابة المقترح للمقارنة:', lang)}
                                  </span>
                                  <p className="text-blue-900 text-xs font-medium leading-relaxed">
                                    {lang === 'ar' ? question.ideal_answer_ar : question.ideal_answer_en}
                                  </p>
                                </div>
                              )}

                              {/* Grading Input Form */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                                <div className="flex items-center gap-2">
                                  <label className="text-xs font-bold text-slate-500 whitespace-nowrap">{t('Grade (out of 10):', 'الدرجة (من 10):', lang)}</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={scoreVal}
                                    onChange={e => setGradeInputs({
                                      ...gradeInputs,
                                      [inputKey]: { score: Number(e.target.value), note: noteVal }
                                    })}
                                    className="w-16 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-center font-bold text-sm text-primary-navy focus:outline-none focus:border-primary-plum"
                                  />
                                </div>

                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={noteVal}
                                    onChange={e => setGradeInputs({
                                      ...gradeInputs,
                                      [inputKey]: { score: scoreVal, note: e.target.value }
                                    })}
                                    placeholder={t('Teacher feedback/comment...', 'ملاحظة أو توجيه الطالب...', lang)}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary-plum"
                                  />
                                </div>

                                <button
                                  onClick={() => handleSaveGrading(sub.id!, qId)}
                                  disabled={actionLoading}
                                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
                                >
                                  <Check size={14} />
                                  <span>{t('Save Review', 'حفظ التقييم', lang)}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: EXAM PAPER INSPECTION (WHAT THEY GOT RIGHT/WRONG) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {inspectSubmission && (() => {
          const l = lessonLookup(inspectSubmission.lessonId);
          const lessonQuestions = QUIZ_QUESTIONS.filter(q => matchLessonId(q.lesson, inspectSubmission.lessonId));
          const hasAnswersMap = inspectSubmission.answers && Object.keys(inspectSubmission.answers).length > 0;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto"
                dir={dir(lang)}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-plum to-primary-navy text-white font-black text-lg flex items-center justify-center shadow-md">
                      {inspectSubmission.userName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-primary-navy">{inspectSubmission.userName}</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-plum/10 text-primary-plum">
                          {t('Exam Paper', 'ورقة الإجابة التفصيلية', lang)}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs font-semibold mt-0.5">
                        {l ? (lang === 'ar' ? l.title_ar : l.title_en) : inspectSubmission.lessonId}
                        {inspectSubmission.userEmail ? ` • ${inspectSubmission.userEmail}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('Score', 'النتيجة', lang)}</span>
                      <span className={`text-2xl font-black ${
                        inspectSubmission.score >= 80 ? 'text-emerald-600' :
                        inspectSubmission.score >= 60 ? 'text-blue-600' :
                        inspectSubmission.score >= 50 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {inspectSubmission.score}%
                      </span>
                    </div>
                    <button
                      onClick={() => setInspectSubmission(null)}
                      className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-primary-navy transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Score Summary Banner */}
                <div className="bg-white p-4 border-b border-slate-100 flex flex-wrap items-center justify-around gap-4 text-center">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">{t('Correct Answers', 'الإجابات الصحيحة', lang)}</span>
                    <span className="text-lg font-black text-emerald-600">✅ {inspectSubmission.correctMCQ} {t('Correct', 'صح', lang)}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">{t('Incorrect Answers', 'الإجابات الخاطئة', lang)}</span>
                    <span className="text-lg font-black text-rose-600">❌ {Math.max((inspectSubmission.totalMCQ || 0) - (inspectSubmission.correctMCQ || 0), 0)} {t('Wrong', 'خطأ', lang)}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">{t('Total MCQ Questions', 'إجمالي الأسئلة', lang)}</span>
                    <span className="text-lg font-black text-primary-navy">{inspectSubmission.totalMCQ} {t('Questions', 'سؤال', lang)}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase">{t('Written Questions', 'الأسئلة المقالية', lang)}</span>
                    <span className="text-lg font-black text-primary-plum">✍️ {Object.keys(inspectSubmission.writtenAnswers || {}).length}</span>
                  </div>
                </div>

                {/* Question-by-Question Inspection Scrollable Area */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                  {!hasAnswersMap && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-semibold flex items-start gap-2.5">
                      <HelpCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">{t('Historical Submission Notice', 'ملاحظة حول هذا التقييم:', lang)}</p>
                        <p className="mt-0.5">
                          {lang === 'ar'
                            ? 'تم إرسال هذا التقييم بنجاح بالنتيجة الموضحة أعلاه، وتظهر بالأسفل قائمة أسئلة ونماذج إجابات الدرس لمطابقتها.'
                            : 'This submission score is recorded above. The lesson questions and ideal answers are displayed below for reference.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {lessonQuestions.map((q, idx) => {
                    const studentChoice = inspectSubmission.answers?.[q.id];
                    const isCorrect = q.type === 'MCQ' && studentChoice && studentChoice === q.correct_option;
                    const isWrong = q.type === 'MCQ' && studentChoice && studentChoice !== q.correct_option;
                    const isUnanswered = q.type === 'MCQ' && !studentChoice;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border-2 transition-all ${
                          q.type === 'WRITTEN'
                            ? 'bg-slate-50 border-slate-200'
                            : isCorrect
                            ? 'bg-emerald-50/30 border-emerald-300'
                            : isWrong
                            ? 'bg-rose-50/30 border-rose-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        {/* Question Badge and Status Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-primary-navy text-white text-xs font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase">
                              {q.type === 'MCQ' ? t('Multiple Choice', 'اختيار من متعدد', lang) : t('Written Essay', 'سؤال مقالي', lang)}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              q.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-800' :
                              q.difficulty === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {q.difficulty}
                            </span>
                          </div>

                          {q.type === 'MCQ' && (
                            <div>
                              {isCorrect && (
                                <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-black text-xs flex items-center gap-1.5 shadow-sm">
                                  <CheckCircle size={14} className="text-emerald-600" />
                                  {t('Student Answered Correctly (+1)', 'إجابة الطالب صحيحة (+1 درجة)', lang)}
                                </span>
                              )}
                              {isWrong && (
                                <span className="px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 font-black text-xs flex items-center gap-1.5 shadow-sm">
                                  <XCircle size={14} className="text-rose-600" />
                                  {t(`Student Chose Option (${studentChoice}) — Incorrect`, `إجابة الطالب خاطئة (اختار ${studentChoice} والصحيح ${q.correct_option})`, lang)}
                                </span>
                              )}
                              {isUnanswered && (
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                                  {t('Not answered', 'لم تتم الإجابة', lang)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Question Text */}
                        <h4 className="text-base font-bold text-primary-navy mb-4 leading-relaxed">
                          {lang === 'ar' ? q.question_ar : q.question_en}
                        </h4>

                        {/* MCQ Options Rendering */}
                        {q.type === 'MCQ' && (
                          <div className="space-y-2.5 mb-4">
                            {(['A', 'B', 'C', 'D'] as const).map(opt => {
                              const text = lang === 'ar' ? (q as any)[`option_${opt.toLowerCase()}_ar`] : (q as any)[`option_${opt.toLowerCase()}_en`];
                              if (!text) return null;

                              const isModelAnswer = opt === q.correct_option;
                              const isStudentPick = studentChoice === opt;

                              let optClass = 'bg-white border-slate-200 text-slate-700';
                              let badge = null;

                              if (isModelAnswer && isStudentPick) {
                                optClass = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold shadow-sm';
                                badge = (
                                  <span className="ml-auto px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1">
                                    <Check size={12} /> {t('Student Choice & Model Answer ✅', 'اختيار الطالب ومطابق للنموذج ✅', lang)}
                                  </span>
                                );
                              } else if (isModelAnswer) {
                                optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                                badge = (
                                  <span className="ml-auto px-2 py-0.5 rounded bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1">
                                    <Check size={12} /> {t('Correct Model Answer ✅', 'الإجابة النموذجية الصحيحة ✅', lang)}
                                  </span>
                                );
                              } else if (isStudentPick) {
                                optClass = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                                badge = (
                                  <span className="ml-auto px-2 py-0.5 rounded bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1">
                                    <X size={12} /> {t('Student Choice (Wrong) ❌', 'اختيار الطالب (خاطئ) ❌', lang)}
                                  </span>
                                );
                              }

                              return (
                                <div
                                  key={opt}
                                  className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-colors ${optClass}`}
                                >
                                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                                    isModelAnswer ? 'bg-emerald-600 text-white' : isStudentPick ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'
                                  }`}>
                                    {opt}
                                  </span>
                                  <span className="text-sm font-semibold">{text}</span>
                                  {badge}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Written Question Content */}
                        {q.type === 'WRITTEN' && (
                          <div className="space-y-3 mb-4">
                            <div className="p-4 bg-white rounded-xl border border-slate-200">
                              <span className="block text-[11px] font-bold text-accent-pink uppercase tracking-wider mb-1">
                                {t("Student's Answer:", 'إجابة الطالب:', lang)}
                              </span>
                              <p className="text-slate-800 text-sm font-semibold whitespace-pre-wrap">
                                {inspectSubmission.writtenAnswers?.[q.id] || t('No written response recorded', 'لا توجد إجابة مسجلة', lang)}
                              </p>
                            </div>

                            {(q.ideal_answer_ar || q.ideal_answer_en) && (
                              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                                <span className="block text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                  <Lightbulb size={12} /> {t('Model Answer Reference:', 'النموذج المقترح:', lang)}
                                </span>
                                <p className="text-blue-950 text-xs font-medium">
                                  {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                                </p>
                              </div>
                            )}

                            {/* Tutor grading for this written question */}
                            {inspectSubmission.id && (
                              <div className="bg-slate-100 p-3 rounded-xl flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-600">{t('Assigned Score:', 'درجة السؤال:', lang)}</span>
                                <input
                                  type="number"
                                  min="0"
                                  max="10"
                                  defaultValue={inspectSubmission.tutorFeedback?.[q.id]?.score ?? 10}
                                  onChange={e => setGradeInputs({
                                    ...gradeInputs,
                                    [`${inspectSubmission.id}_${q.id}`]: {
                                      score: Number(e.target.value),
                                      note: gradeInputs[`${inspectSubmission.id}_${q.id}`]?.note ?? (inspectSubmission.tutorFeedback?.[q.id]?.note || '')
                                    }
                                  })}
                                  className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-center font-bold text-xs"
                                />
                                <input
                                  type="text"
                                  defaultValue={inspectSubmission.tutorFeedback?.[q.id]?.note ?? ''}
                                  onChange={e => setGradeInputs({
                                    ...gradeInputs,
                                    [`${inspectSubmission.id}_${q.id}`]: {
                                      score: gradeInputs[`${inspectSubmission.id}_${q.id}`]?.score ?? (inspectSubmission.tutorFeedback?.[q.id]?.score || 10),
                                      note: e.target.value
                                    }
                                  })}
                                  placeholder={t('Feedback comment...', 'ملاحظة المعلم...', lang)}
                                  className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 text-xs"
                                />
                                <button
                                  onClick={() => handleSaveGrading(inspectSubmission.id!, q.id)}
                                  disabled={actionLoading}
                                  className="px-3 py-1 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                                >
                                  {t('Save', 'حفظ', lang)}
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Explanation Box */}
                        {(q.explanation_ar || q.explanation_en) && (
                          <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-start gap-2">
                            <Lightbulb size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-amber-900 text-xs font-semibold leading-relaxed">
                              {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                  <button
                    onClick={() => setInspectSubmission(null)}
                    className="px-6 py-2.5 rounded-xl bg-primary-navy hover:bg-primary-plum text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    {t('Close Exam Paper', 'إغلاق ورقة الامتحان', lang)}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 2: STUDENT DOSSIER */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedStudent && (() => {
          const studentSubmissions = results.filter(r => r.userId === selectedStudent.uid);
          const completedCount = selectedStudent.completedLessons?.length || 0;
          const avg = studentSubmissions.length > 0
            ? Math.round(studentSubmissions.reduce((acc, r) => acc + (r.score || 0), 0) / studentSubmissions.length)
            : null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden my-auto"
                dir={dir(lang)}
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-pink to-primary-plum text-white font-black text-xl flex items-center justify-center shadow-md">
                      {selectedStudent.displayName?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-primary-navy">{selectedStudent.displayName}</h2>
                      <p className="text-slate-500 text-xs font-semibold">{selectedStudent.email}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold flex items-center gap-1">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          {selectedStudent.xp || 0} XP
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                          {t('Student Account', 'حساب طالب', lang)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                  {/* Progress Checklist */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-primary-navy text-sm mb-3 flex items-center justify-between">
                      <span>{t('Curriculum Lesson Progress', 'حالة دروس المنهج', lang)}</span>
                      <span className="text-primary-plum font-black">{completedCount} / {LESSONS.length} {t('Completed', 'مكتمل', lang)}</span>
                    </h3>

                    <div className="space-y-2">
                      {LESSONS.map(l => {
                        const done = selectedStudent.completedLessons?.includes(l.id);
                        return (
                          <div
                            key={l.id}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-colors ${
                              done
                                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                                : 'bg-white border-slate-200 text-slate-500'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{done ? '✅' : '⏳'}</span>
                              <span>{l.lesson_number} • {lang === 'ar' ? l.title_ar : l.title_en}</span>
                            </span>
                            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                              {done ? t('Completed', 'مكتمل', lang) : t('Pending', 'قيد الانتظار', lang)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Exam History */}
                  <div>
                    <h3 className="font-bold text-primary-navy text-sm mb-3 flex items-center justify-between">
                      <span>{t('Exam Submissions History', 'سجل أوراق الامتحانات المحلولة', lang)}</span>
                      {avg !== null && (
                        <span className="text-xs font-bold text-slate-500">
                          {t('Overall Average:', 'المعدل العام:', lang)} <strong className="text-emerald-600">{avg}%</strong>
                        </span>
                      )}
                    </h3>

                    {studentSubmissions.length === 0 ? (
                      <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-slate-400 font-bold text-xs">{t('No assessments taken yet.', 'لم يقم الطالب بأداء أي تقييمات بعد.', lang)}</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {studentSubmissions.map(sub => {
                          const l = lessonLookup(sub.lessonId);
                          return (
                            <div
                              key={sub.id}
                              className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:border-primary-plum transition-all shadow-sm"
                            >
                              <div>
                                <span className="font-bold text-primary-navy text-xs block">
                                  {l ? (lang === 'ar' ? l.title_ar : l.title_en) : sub.lessonId}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {sub.submittedAt?.toDate ? sub.submittedAt.toDate().toLocaleDateString() : '—'} • {sub.correctMCQ}/{sub.totalMCQ} {t('Correct', 'صح', lang)}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                                  sub.score >= 80 ? 'bg-emerald-50 text-emerald-700' :
                                  sub.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                                }`}>
                                  {sub.score}%
                                </span>
                                <button
                                  onClick={() => {
                                    setInspectSubmission(sub);
                                    setSelectedStudent(null);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-primary-plum/10 hover:bg-primary-plum text-primary-plum hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
                                >
                                  <Eye size={12} />
                                  <span>{t('Inspect', 'فحص', lang)}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConfirmResetStudent(selectedStudent)}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw size={13} />
                      <span>{t('Reset Progress', 'إعادة ضبط التقدم', lang)}</span>
                    </button>
                    <button
                      onClick={() => setConfirmDeleteStudent(selectedStudent)}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={13} />
                      <span>{t('Delete Student', 'حذف الطالب', lang)}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {t('Close', 'إغلاق', lang)}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 3: CONFIRM RESET PROGRESS */}
      {/* ========================================================= */}
      <AnimatePresence>
        {confirmResetStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center"
              dir={dir(lang)}
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <RotateCcw size={24} />
              </div>
              <h3 className="text-lg font-black text-primary-navy mb-2">
                {t(`Reset progress for ${confirmResetStudent.displayName}?`, `هل تريدين إعادة ضبط تقدم الطالب ${confirmResetStudent.displayName}؟`, lang)}
              </h3>
              <p className="text-slate-500 text-xs font-semibold mb-6 leading-relaxed">
                {t(
                  'This will clear completed lessons, assessments, and reset XP to 0 for this student. They can retake the lessons and exams from scratch.',
                  'سيتم تصفير الدروس المكتملة ونقاط XP والامتحانات المحلولة لهذا الطالب، مما يتيح له إعادة المنهج من البداية.',
                  lang
                )}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmResetStudent(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {t('Cancel', 'إلغاء', lang)}
                </button>
                <button
                  onClick={() => handleResetStudent(confirmResetStudent)}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  {actionLoading ? t('Resetting...', 'جاري إعادة الضبط...', lang) : t('Confirm Reset', 'تأكيد إعادة الضبط', lang)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 4: CONFIRM DELETE STUDENT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {confirmDeleteStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center"
              dir={dir(lang)}
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-black text-primary-navy mb-2">
                {t(`Delete student account for ${confirmDeleteStudent.displayName}?`, `حذف حساب الطالب ${confirmDeleteStudent.displayName} نهائياً؟`, lang)}
              </h3>
              <p className="text-slate-500 text-xs font-semibold mb-6 leading-relaxed">
                {t(
                  'This will permanently delete this student record from Firestore. This action cannot be undone.',
                  'سيتم حذف سجل وبيانات هذا الطالب نهائياً من قاعدة البيانات. لا يمكن التراجع عن هذا الإجراء.',
                  lang
                )}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteStudent(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {t('Cancel', 'إلغاء', lang)}
                </button>
                <button
                  onClick={() => handleDeleteStudent(confirmDeleteStudent)}
                  disabled={actionLoading}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  {actionLoading ? t('Deleting...', 'جاري الحذف...', lang) : t('Delete Account', 'تأكيد الحذف النهائي', lang)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// PROTECTED ROUTE
// ============================================================
function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/');
  }, [user, loading, navigate]);

  if (loading) return <Spinner />;
  if (!user) return null;
  return <>{children}</>;
}

// ============================================================
// DASHBOARD ROUTER (DISPATCHES TUTOR TO ADMIN CENTER & STUDENT TO LESSONS)
// ============================================================
function DashboardRouter() {
  const { profile, loadingProfile } = React.useContext(AppContext);
  if (loadingProfile) return <Spinner />;
  if (profile?.role === 'TUTOR') {
    return <TutorDashboard />;
  }
  return <StudentDashboard />;
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Defaulting to Arabic for Egyptian Baccalaureate
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    // Default RTL setup
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';

    const unsub = onAuthStateChanged(auth, async (fireUser) => {
      setUser(fireUser);
      if (fireUser) {
        setLoadingProfile(true);
        try {
          const snap = await getDoc(doc(db, 'users', fireUser.uid));
          if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setProfile(null);
        setLoadingProfile(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Sync profile changes (listen for XP/progress updates)
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setProfile(snap.data() as UserProfile);
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  if (loading) return <Spinner />;

  return (
    <AppContext.Provider value={{ user, profile, lang, toggleLang, loading, loadingProfile }}>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans">
          {user && <Navbar />}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={user ? <ProtectedRedirect /> : <AuthPage />} />
              <Route path="/dashboard" element={<Protected><DashboardRouter /></Protected>} />
              <Route path="/tutor" element={<Protected><TutorDashboard /></Protected>} />
              <Route path="/student-preview" element={<Protected><StudentDashboard /></Protected>} />
              <Route path="/lesson/:lessonId" element={<Protected><LessonViewer /></Protected>} />
              <Route path="/assessment/:lessonId" element={<Protected><Assessment /></Protected>} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

function ProtectedRedirect() {
  const { user, profile, loadingProfile } = React.useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !loadingProfile) {
      if (profile?.role === 'TUTOR') {
        navigate('/tutor');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, loadingProfile, navigate]);
  return null;
}

