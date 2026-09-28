import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, ChevronRight, Menu, X, PlayCircle, CheckCircle, XCircle,
  Award, LogOut, User, Star, Layers, Cpu, Globe, Shield, Code, AlertTriangle,
  Lock, Mail, Eye, EyeOff, Home, ChevronDown, BookMarked, Brain, Zap, Target,
  RotateCcw, ArrowLeft, ArrowRight, Lightbulb, FileText, Search, TrendingUp,
  MessageSquare, Loader
} from 'lucide-react';

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc, setDoc, getDoc, collection, getDocs, updateDoc, addDoc, serverTimestamp, query, where, orderBy
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Course Data
import { COURSE_METADATA, LESSONS, QUIZ_QUESTIONS, type Lesson, type QuizQuestion } from './courseData';

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
  lessonId: string;
  score: number;
  totalMCQ: number;
  correctMCQ: number;
  writtenAnswers: Record<string, string>;
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

const UNIT_COLORS: Record<number, string> = {
  1: 'from-violet-600 to-purple-800',
  2: 'from-blue-600 to-cyan-700',
  3: 'from-emerald-600 to-teal-700',
  4: 'from-orange-600 to-rose-700',
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
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-violet-500/30 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-transparent border-t-violet-500 rounded-full animate-spin absolute inset-0"></div>
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
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/5 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center" dir={dir(lang)}>
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <Brain size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xl tracking-tight text-white">D-Learn</span>
              <span className="block text-[10px] text-violet-400 font-semibold -mt-0.5 tracking-widest uppercase">Baccalaureate</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-bold transition-all border border-white/10"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>

            {!loading && user && profile && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm transition-all border border-white/10"
                >
                  <Home size={14} />
                  <span className="font-medium">{t('Home', 'الرئيسية', lang)}</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center font-bold text-white text-xs">
                      {profile.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block text-sm font-semibold text-white">{profile.displayName}</span>
                    <ChevronDown size={12} className="text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 mt-2 w-52 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-white/5">
                          <p className="text-white font-bold text-sm">{profile.displayName}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{profile.email}</p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <Star size={12} className="text-yellow-400" />
                            <span className="text-yellow-400 text-xs font-bold">{profile.xp} XP</span>
                            <span className="ml-auto px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded-md text-[10px] font-bold uppercase">
                              {profile.role === 'TUTOR' ? t('Tutor', 'مدرس', lang) : t('Student', 'طالب', lang)}
                            </span>
                          </div>
                        </div>
                        {profile.role === 'TUTOR' && (
                          <button
                            onClick={() => { navigate('/tutor'); setMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <Target size={14} />
                            {t('Tutor Dashboard', 'لوحة المدرس', lang)}
                          </button>
                        )}
                        <button
                          onClick={() => { handleLogout(); setMenuOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
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
  const { lang } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'TUTOR'>('STUDENT');
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
          role,
          xp: 0,
          completedLessons: [],
          completedAssessments: [],
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, 'users', cred.user.uid), profileData);
        navigate('/dashboard');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden" dir={dir(lang)}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Course header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-500/30 mb-4">
            <Brain size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-1">D-Learn</h1>
          <p className="text-violet-400 font-bold text-sm tracking-widest uppercase mb-1">
            {COURSE_METADATA.grade_en}
          </p>
          <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto leading-relaxed">
            {lang === 'ar'
              ? `${COURSE_METADATA.course_name_ar} — ${COURSE_METADATA.semester_ar}`
              : `${COURSE_METADATA.course_name_en} — ${COURSE_METADATA.semester_en}`}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Star size={12} />
            {lang === 'ar' ? 'البكالوريا المصرية' : 'Egyptian Baccalaureate'}
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Mode tabs */}
          <div className="flex rounded-xl bg-slate-800/50 p-1 mb-6 gap-1">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {t('Sign In', 'تسجيل الدخول', lang)}
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'register' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {t('Create Account', 'إنشاء حساب', lang)}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t('Full Name', 'الاسم الكامل', lang)}
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder-slate-600"
                    placeholder={t('Your full name', 'اسمك الكامل', lang)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t('Email Address', 'البريد الإلكتروني', lang)}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder-slate-600"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t('Password', 'كلمة المرور', lang)}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder-slate-600"
                  placeholder={mode === 'register' ? t('Min. 6 characters', '6 أحرف على الأقل', lang) : '••••••••'}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t('I am a...', 'أنا...', lang)}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('STUDENT')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-sm transition-all ${role === 'STUDENT' ? 'border-violet-500 bg-violet-500/10 text-violet-300' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
                  >
                    <User size={16} />
                    {t('Student', 'طالب', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('TUTOR')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-sm transition-all ${role === 'TUTOR' ? 'border-violet-500 bg-violet-500/10 text-violet-300' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
                  >
                    <Target size={16} />
                    {t('Tutor', 'مدرس', lang)}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <AlertTriangle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-violet-500/25 transform hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:transform-none mt-2"
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

        <p className="text-center text-slate-600 text-xs mt-4">
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
  const { user, profile, lang } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredLessons = LESSONS.filter(l =>
    search === '' ||
    l.title_en.toLowerCase().includes(search.toLowerCase()) ||
    l.title_ar.includes(search)
  );

  const completedCount = profile?.completedLessons?.length || 0;
  const totalLessons = LESSONS.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir(lang)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/60 to-purple-900/40 border border-violet-500/20 p-8 md:p-10 mb-8 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-violet-400 font-bold text-sm tracking-widest uppercase mb-2">
                  {lang === 'ar' ? `${COURSE_METADATA.grade_ar} — ${COURSE_METADATA.semester_ar}` : `${COURSE_METADATA.grade_en} — ${COURSE_METADATA.semester_en}`}
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                  {lang === 'ar'
                    ? `مرحباً، ${profile?.displayName || 'طالب'} 👋`
                    : `Welcome back, ${profile?.displayName || 'Student'} 👋`}
                </h1>
                <p className="text-slate-300 text-lg font-semibold mb-1">
                  {lang === 'ar' ? COURSE_METADATA.course_name_ar : COURSE_METADATA.course_name_en}
                </p>
                <p className="text-slate-400 text-sm">
                  {lang === 'ar' ? COURSE_METADATA.publisher_ar : COURSE_METADATA.publisher_en}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  <Star size={12} className="text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold">
                    {lang === 'ar' ? 'البكالوريا المصرية' : 'Egyptian Baccalaureate'}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 text-center">
                <div className="w-32 h-32 relative mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#prog)" strokeWidth="2.5" strokeDasharray={`${progressPct}, 100`} strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6"/>
                        <stop offset="100%" stopColor="#a78bfa"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">{progressPct}%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('Progress', 'التقدم', lang)}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  {completedCount}/{totalLessons} {t('Lessons Done', 'دروس مكتملة', lang)}
                </p>
              </div>
            </div>

            {/* XP Badge */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-yellow-300 font-bold text-sm">{profile?.xp || 0} XP</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-green-300 font-bold text-sm">{completedCount} {t('completed', 'مكتمل', lang)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8 max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search lessons...', 'ابحث عن الدروس...', lang)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all placeholder-slate-600"
          />
        </div>

        {/* Lessons Grid */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-white">
            {t('Course Lessons', 'دروس المنهج', lang)}
            <span className="ml-2 text-sm font-normal text-slate-500">({filteredLessons.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all group cursor-pointer"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                {/* Card header gradient */}
                <div className={`h-2 bg-gradient-to-r ${unitColor}`}></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${unitColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {UNIT_ICONS[lesson.unit]}
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/15 border border-green-500/30 rounded-full text-green-400 text-[10px] font-bold">
                          <CheckCircle size={10} /> {t('Done', 'مكتمل', lang)}
                        </span>
                      )}
                      <span className="text-slate-600 text-xs font-bold bg-slate-800/50 px-2 py-0.5 rounded-full">
                        {lesson.lesson_number}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-black text-white text-base mb-1 group-hover:text-violet-300 transition-colors leading-snug">
                    {lang === 'ar' ? lesson.title_ar : lesson.title_en}
                  </h3>

                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {lang === 'ar'
                      ? lesson.learning_objectives_ar[0]
                      : lesson.learning_objectives_en[0]}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {lesson.sections.length} {t('sections', 'أقسام', lang)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={11} />
                      {lessonQuestions.length} {t('questions', 'سؤال', lang)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Lightbulb size={11} />
                      {lesson.key_terms.length} {t('terms', 'مصطلح', lang)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/lesson/${lesson.id}`); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-to-r ${unitColor} text-white shadow-md hover:shadow-lg hover:opacity-90`}
                    >
                      <PlayCircle size={13} />
                      {t('Study', 'ادرس', lang)}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/assessment/${lesson.id}`); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
                    >
                      <Award size={13} />
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t('Lesson not found', 'الدرس غير موجود', lang)}</h2>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-2 bg-violet-600 rounded-xl text-white font-bold">
          {t('Back to Dashboard', 'العودة للوحة التحكم', lang)}
        </button>
      </div>
    </div>
  );

  const isCompleted = profile?.completedLessons?.includes(lesson.id);
  const section = lesson.sections[activeSection];
  const unitColor = UNIT_COLORS[lesson.unit] || UNIT_COLORS[1];

  const renderMarkdown = (text: string) => {
    // Simple markdown renderer
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-2xl font-black text-white mb-4 mt-6">{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-xl font-black text-violet-300 mb-3 mt-6 border-b border-violet-500/20 pb-2">{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-lg font-bold text-white mb-2 mt-4">{line.slice(4)}</h3>);
      } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        const bold = line.slice(2, -2);
        elements.push(<p key={i} className="text-white font-black text-base mt-4 mb-1">{bold}</p>);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.slice(2);
        const parts = content.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <div key={i} className="flex items-start gap-2 mb-2 ml-4">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="text-white font-bold">{part}</strong> : part)}
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
          <div key={`table-${i}`} className="overflow-x-auto mb-6 mt-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {headers.map((h, hi) => (
                    <th key={hi} className="text-left p-3 bg-violet-900/40 border border-violet-500/20 text-violet-300 font-bold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white/2' : 'bg-white/5'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-3 border border-white/5 text-slate-300">{cell}</td>
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
          <div key={i} className="my-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-amber-200 text-sm leading-relaxed">{line}</p>
          </div>
        );
      } else if (line.trim() === '') {
        if (elements.length > 0) elements.push(<div key={i} className="h-2"></div>);
      } else {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const hasFormatting = parts.length > 1;
        elements.push(
          <p key={i} className="text-slate-300 text-sm leading-relaxed mb-2">
            {hasFormatting
              ? parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx} className="text-white font-bold">{part}</strong> : part)
              : line}
          </p>
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex" dir={dir(lang)}>
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            initial={false}
            className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-40 w-72' : 'hidden md:flex md:w-64 lg:w-72'} bg-slate-900/95 backdrop-blur-xl border-r border-white/5 flex-col`}
          >
            {/* Close button (mobile) */}
            <div className="md:hidden flex justify-end p-4">
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg bg-white/5 text-slate-400">
                <X size={18} />
              </button>
            </div>

            {/* Lesson title */}
            <div className={`p-4 bg-gradient-to-br ${unitColor} m-4 rounded-2xl`}>
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest block mb-1">{lesson.lesson_number}</span>
              <h3 className="text-white font-black text-sm leading-snug">
                {lang === 'ar' ? lesson.title_ar : lesson.title_en}
              </h3>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto px-3 pb-4">
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-3 px-2">
                {t('Sections', 'الأقسام', lang)}
              </p>
              <div className="space-y-1">
                {lesson.sections.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveSection(idx); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === idx ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span className="text-slate-600 text-xs mr-2">{idx + 1}.</span>
                    {lang === 'ar' ? sec.heading_ar : sec.heading_en}
                  </button>
                ))}
              </div>

              {/* Key Terms */}
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-6 mb-3 px-2">
                {t('Key Terms', 'المصطلحات', lang)}
              </p>
              <div className="space-y-1">
                {lesson.key_terms.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExpandedTerms(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n; })}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <span className="font-bold text-violet-400">
                      {lang === 'ar' ? term.term_ar : term.term_en}
                    </span>
                    {expandedTerms.has(idx) && (
                      <p className="mt-1 text-slate-500 text-[11px] leading-relaxed">
                        {lang === 'ar' ? term.def_ar : term.def_en}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {/* Assessment button */}
              <div className="mt-6 px-1">
                <button
                  onClick={() => navigate(`/assessment/${lesson.id}`)}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${unitColor} text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all`}
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
        <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded-lg bg-white/5 text-slate-400">
            <Menu size={18} />
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={15} />
            {t('Dashboard', 'الرئيسية', lang)}
          </button>
          <div className="ml-auto flex items-center gap-2">
            {isCompleted ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 border border-green-500/30 rounded-full text-green-400 text-xs font-bold">
                <CheckCircle size={12} /> {t('Completed', 'مكتمل', lang)}
              </span>
            ) : (
              <button
                onClick={markComplete}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 rounded-full text-violet-300 text-xs font-bold transition-all"
              >
                <CheckCircle size={12} /> {t('Mark Complete (+50 XP)', 'إتمام (+50 XP)', lang)}
              </button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          {/* Lesson header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${unitColor} text-white`}>
                {t('Unit', 'الوحدة', lang)} {lesson.unit}
              </span>
              <span className="text-slate-600 text-sm">{lesson.lesson_number}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              {lang === 'ar' ? lesson.title_ar : lesson.title_en}
            </h1>

            {/* Learning objectives */}
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 mb-6">
              <h3 className="text-violet-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <Target size={12} />
                {t('Learning Objectives', 'أهداف التعلم', lang)}
              </h3>
              <ul className="space-y-2">
                {(lang === 'ar' ? lesson.learning_objectives_ar : lesson.learning_objectives_en).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className="text-violet-400 mt-0.5 flex-shrink-0" />
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
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeSection === idx ? `bg-gradient-to-r ${unitColor} text-white shadow-md` : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
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
              className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 md:p-8 mb-8"
            >
              <h2 className={`text-2xl font-black mb-6 bg-gradient-to-r ${unitColor} bg-clip-text text-transparent`}>
                {lang === 'ar' ? section.heading_ar : section.heading_en}
              </h2>
              <div className="lesson-content">
                {renderMarkdown(lang === 'ar' ? section.content_ar : section.content_en)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pause & Think */}
          {lesson.pause_and_think.length > 0 && (
            <div className="mb-8">
              <h3 className="text-violet-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lightbulb size={12} />
                {t('Pause & Think', 'توقف وفكّر', lang)}
              </h3>
              <div className="space-y-4">
                {lesson.pause_and_think.map((pq, i) => (
                  <div key={i} className="p-5 bg-violet-900/20 border border-violet-500/20 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-violet-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-violet-300 font-black text-xs">{i + 1}</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {lang === 'ar' ? pq.q_ar : pq.q_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Terms Glossary */}
          <div className="mb-8">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookMarked size={12} />
              {t('Key Terms Glossary', 'مسرد المصطلحات', lang)}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.key_terms.map((term, i) => (
                <div key={i} className="p-4 bg-slate-900/60 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                  <p className="text-violet-300 font-black text-sm mb-1">
                    {lang === 'ar' ? term.term_ar : term.term_en}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {lang === 'ar' ? term.def_ar : term.def_en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              {activeSection > 0 && (
                <button
                  onClick={() => setActiveSection(activeSection - 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 font-bold text-sm transition-all"
                >
                  <ArrowLeft size={16} /> {t('Previous', 'السابق', lang)}
                </button>
              )}
              {activeSection < lesson.sections.length - 1 && (
                <button
                  onClick={() => setActiveSection(activeSection + 1)}
                  className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${unitColor} text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all`}
                >
                  {t('Next Section', 'القسم التالي', lang)} <ArrowRight size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => navigate(`/assessment/${lesson.id}`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 font-bold text-sm transition-all"
            >
              <Award size={16} />
              {t('Take Assessment', 'ابدأ التقييم', lang)}
            </button>
          </div>
        </div>
      </main>
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
  const questions = QUIZ_QUESTIONS.filter(q => q.lesson === lessonId);

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
        userName: profile.displayName,
        lessonId: lessonId || '',
        score: Math.round((correctCount / Math.max(mcqQs.length, 1)) * 100),
        totalMCQ: mcqQs.length,
        correctMCQ: correctCount,
        writtenAnswers,
        submittedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'assessment_results'), result);

      // Update XP and completed assessments
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

  if (!lesson) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Lesson not found</div>;

  const unitColor = UNIT_COLORS[lesson.unit] || UNIT_COLORS[1];

  if (isFinished) {
    const mcqQs = filtered.filter(q => q.type === 'MCQ');
    const correctCount = mcqQs.filter(q => answers[q.id] === q.correct_option).length;
    const scorePct = mcqQs.length > 0 ? Math.round((correctCount / mcqQs.length) * 100) : 100;
    const grade = scorePct >= 85 ? '🌟 Excellent' : scorePct >= 70 ? '✅ Good' : scorePct >= 50 ? '📘 Needs Review' : '❌ Try Again';

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir={dir(lang)}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
            <div className="relative w-36 h-36 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#resultGrad)" strokeWidth="2.5" strokeDasharray={`${scorePct}, 100`} strokeLinecap="round"/>
                <defs>
                  <linearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={scorePct >= 70 ? '#22c55e' : '#ef4444'}/>
                    <stop offset="100%" stopColor={scorePct >= 70 ? '#86efac' : '#fca5a5'}/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{scorePct}%</span>
                <span className="text-slate-400 text-xs font-bold">{t('Score', 'النتيجة', lang)}</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-white mb-2">{t('Assessment Complete!', 'انتهى التقييم!', lang)}</h2>
            <p className="text-2xl mb-2">{grade}</p>
            <p className="text-slate-400 mb-2">{correctCount} / {mcqQs.length} {t('MCQ Correct', 'صح من اختيار متعدد', lang)}</p>
            {Object.keys(answers).some(k => filtered.find(q => q.id === k && q.type === 'WRITTEN')) && (
              <p className="text-violet-400 text-sm mb-4">
                {t('Written answers will be reviewed by your tutor.', 'ستُراجَع الأسئلة المقالية من قِبَل مدرّسك.', lang)}
              </p>
            )}

            {!submitted ? (
              <button
                onClick={handleSubmitToFirebase}
                disabled={submitting}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r ${unitColor} shadow-lg hover:opacity-90 transition-all mb-3 disabled:opacity-50`}
              >
                {submitting ? <><Loader size={16} className="animate-spin" /> {t('Saving...', 'جاري الحفظ...', lang)}</> : <>{t('Save Results & Earn XP', 'احفظ النتائج واكسب XP', lang)} <Zap size={16} /></>}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 py-3.5 mb-3 bg-green-500/15 border border-green-500/30 rounded-xl text-green-400 font-bold">
                <CheckCircle size={16} /> {t('Results Saved!', 'تم حفظ النتائج!', lang)}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setIsFinished(false); setCurrentQ(0); setAnswers({}); setShowFeedback(false); setSubmitted(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-sm"
              >
                <RotateCcw size={14} /> {t('Retry', 'إعادة', lang)}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-sm"
              >
                {t('Dashboard', 'الرئيسية', lang)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir(lang)}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(`/lesson/${lessonId}`)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={15} />
            {lang === 'ar' ? lesson.title_ar : lesson.title_en}
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-black text-white mb-1">
            {lang === 'ar' ? lesson.title_ar : lesson.title_en} — {t('Assessment', 'التقييم', lang)}
          </h1>
          <p className="text-slate-400 text-sm">{filtered.length} {t('questions', 'أسئلة', lang)}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex rounded-xl bg-slate-900/80 border border-white/5 p-1 gap-1">
            {(['ALL', 'MCQ', 'WRITTEN'] as const).map(type => (
              <button
                key={type}
                onClick={() => { setFilterType(type); setCurrentQ(0); setAnswers({}); setShowFeedback(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === type ? 'bg-violet-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                {type === 'MCQ' ? t('MCQ', 'اختيار متعدد', lang) : type === 'WRITTEN' ? t('Written', 'مقالي', lang) : t('All', 'الكل', lang)}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl bg-slate-900/80 border border-white/5 p-1 gap-1">
            {(['ALL', 'CLASSROOM', 'HOMEWORK', 'WEEKLY_ASSESSMENT'] as const).map(src => (
              <button
                key={src}
                onClick={() => { setFilterSource(src); setCurrentQ(0); setAnswers({}); setShowFeedback(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterSource === src ? 'bg-violet-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                {src === 'ALL' ? t('All', 'الكل', lang) : src === 'CLASSROOM' ? t('Classroom', 'صفي', lang) : src === 'HOMEWORK' ? t('Homework', 'منزلي', lang) : t('Weekly Test', 'أسبوعي', lang)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>{t('No questions match these filters.', 'لا توجد أسئلة تطابق هذه المرشحات.', lang)}</p>
          </div>
        ) : !q ? null : (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-slate-500 font-bold">
                  {t('Question', 'السؤال', lang)} {currentQ + 1} {t('of', 'من', lang)} {filtered.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${q.type === 'MCQ' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                    {q.type === 'MCQ' ? t('MCQ', 'اختيار متعدد', lang) : t('Written', 'مقالي', lang)}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${q.source === 'CLASSROOM' ? 'bg-purple-500/20 text-purple-300' : q.source === 'HOMEWORK' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {q.source === 'CLASSROOM' ? t('Classroom', 'صفي', lang) : q.source === 'HOMEWORK' ? t('Homework', 'منزلي', lang) : t('Weekly', 'أسبوعي', lang)}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${q.difficulty === 'EASY' ? 'bg-green-500/20 text-green-300' : q.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
                    {q.difficulty === 'EASY' ? t('Easy', 'سهل', lang) : q.difficulty === 'MEDIUM' ? t('Medium', 'متوسط', lang) : t('Hard', 'صعب', lang)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${unitColor} h-full transition-all duration-500`}
                  style={{ width: `${((currentQ + 1) / filtered.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentQ}-${q.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/80 border border-white/5 rounded-2xl p-6 md:p-8 mb-6"
              >
                <h2 className="text-xl md:text-2xl font-black text-white mb-8 leading-snug">
                  {lang === 'ar' ? q.question_ar : q.question_en}
                </h2>

                {q.type === 'MCQ' ? (
                  <div className="space-y-3">
                    {(['A', 'B', 'C', 'D'] as const).map(opt => {
                      const text = lang === 'ar' ? (q as any)[`option_${opt.toLowerCase()}_ar`] : (q as any)[`option_${opt.toLowerCase()}_en`];
                      if (!text) return null;
                      const isSelected = answered === opt;
                      let cls = 'bg-slate-800/50 border-white/10 hover:border-violet-500/50 text-slate-300 hover:text-white';
                      if (showFeedback) {
                        if (opt === q.correct_option) cls = 'bg-green-500/15 border-green-500/50 text-green-200';
                        else if (isSelected) cls = 'bg-red-500/15 border-red-500/50 text-red-200';
                        else cls = 'bg-slate-800/30 border-white/5 text-slate-600 opacity-50';
                      } else if (isSelected) {
                        cls = 'bg-violet-600/20 border-violet-500/70 text-violet-200';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelect(opt)}
                          disabled={showFeedback}
                          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium flex items-center gap-4 ${cls}`}
                        >
                          <span className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-black text-xs ${showFeedback && opt === q.correct_option ? 'bg-green-500 text-white' : showFeedback && isSelected && opt !== q.correct_option ? 'bg-red-500 text-white' : isSelected ? 'bg-violet-600 text-white' : 'bg-white/10 text-slate-400'}`}>
                            {opt}
                          </span>
                          <span className="text-sm">{text}</span>
                          <span className="ml-auto">
                            {showFeedback && opt === q.correct_option && <CheckCircle size={16} className="text-green-400" />}
                            {showFeedback && isSelected && opt !== q.correct_option && <XCircle size={16} className="text-red-400" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {(lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en) && (
                      <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <p className="text-blue-400 text-xs font-bold mb-1 flex items-center gap-1">
                          <Lightbulb size={12} /> {t('Model Answer (for study)', 'النموذج المقترح (للدراسة)', lang)}
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {lang === 'ar' ? q.ideal_answer_ar : q.ideal_answer_en}
                        </p>
                      </div>
                    )}
                    <textarea
                      rows={6}
                      value={answered || ''}
                      onChange={e => handleSelect(e.target.value)}
                      className="w-full bg-slate-800/50 border-2 border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none placeholder-slate-600"
                      placeholder={t('Type your answer here...', 'اكتب إجابتك هنا...', lang)}
                    />
                    <p className="text-slate-600 text-xs mt-2">
                      {t('Your written answer will be saved and reviewed by your tutor.', 'ستُحفَظ إجابتك المكتوبة وتُراجَع من قِبَل مدرّسك.', lang)}
                    </p>
                  </div>
                )}

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && q.type === 'MCQ' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-5 p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-green-500/10 border-green-400' : 'bg-red-500/10 border-red-400'}`}
                    >
                      <p className={`font-black mb-1 text-sm ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        {isCorrect ? `✅ ${t('Correct!', 'صحيح!', lang)}` : `❌ ${t('Incorrect', 'خطأ', lang)}`}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {lang === 'ar' ? q.explanation_ar : q.explanation_en}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  {!showFeedback && q.type === 'MCQ' ? (
                    <button
                      onClick={handleCheck}
                      disabled={!answered}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${unitColor} shadow-lg hover:opacity-90 transition-all disabled:opacity-40`}
                    >
                      {t('Check Answer', 'تحقق من الإجابة', lang)}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${unitColor} shadow-lg hover:opacity-90 transition-all`}
                    >
                      {currentQ === filtered.length - 1 ? t('Finish', 'إنهاء', lang) : t('Next', 'التالي', lang)}
                      <ArrowRight size={16} />
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
// TUTOR DASHBOARD
// ============================================================
function TutorDashboard() {
  const { lang } = React.useContext(AppContext);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'assessment_results'), orderBy('submittedAt', 'desc')));
        setResults(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const lesson = (id: string) => LESSONS.find(l => l.id === id);

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir={dir(lang)}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-1">
            {t('Tutor Command Center', 'مركز تحكم المدرس', lang)}
          </h1>
          <p className="text-slate-400">
            {t('Monitor student progress and evaluate assessments.', 'راقب تقدم الطلاب وقيّم التقييمات.', lang)}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader size={24} className="animate-spin text-violet-400" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
            <p>{t('No assessment results yet.', 'لا توجد نتائج تقييم بعد.', lang)}</p>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-4 text-slate-500 font-bold text-xs uppercase tracking-wider">{t('Student', 'الطالب', lang)}</th>
                    <th className="p-4 text-slate-500 font-bold text-xs uppercase tracking-wider">{t('Lesson', 'الدرس', lang)}</th>
                    <th className="p-4 text-slate-500 font-bold text-xs uppercase tracking-wider">{t('Score', 'النتيجة', lang)}</th>
                    <th className="p-4 text-slate-500 font-bold text-xs uppercase tracking-wider">{t('Written Answers', 'إجابات مقالية', lang)}</th>
                    <th className="p-4 text-slate-500 font-bold text-xs uppercase tracking-wider">{t('Date', 'التاريخ', lang)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {results.map(res => {
                    const l = lesson(res.lessonId);
                    const writtenCount = Object.keys(res.writtenAnswers || {}).length;
                    return (
                      <tr key={res.id} className="hover:bg-white/2 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-violet-600/30 flex items-center justify-center text-violet-300 font-black text-xs">
                              {res.userName?.charAt(0)?.toUpperCase() || 'S'}
                            </div>
                            <span className="text-white font-semibold text-sm">{res.userName}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-slate-300 text-sm">{l ? (lang === 'ar' ? l.title_ar : l.title_en) : res.lessonId}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${res.score >= 70 ? 'bg-green-400' : res.score >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                style={{ width: `${res.score}%` }}
                              ></div>
                            </div>
                            <span className={`font-black text-sm ${res.score >= 70 ? 'text-green-400' : res.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                              {res.score}% ({res.correctMCQ}/{res.totalMCQ})
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {writtenCount > 0 ? (
                            <button className="px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 rounded-lg text-violet-300 text-xs font-bold transition-all">
                              {t('Review', 'مراجعة', lang)} ({writtenCount})
                            </button>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="text-slate-500 text-xs">
                            {res.submittedAt?.toDate ? res.submittedAt.toDate().toLocaleDateString() : '—'}
                          </span>
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
// ROOT APP
// ============================================================
export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
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
        <div className="min-h-screen bg-slate-950 font-sans">
          {user && <Navbar />}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={user ? <ProtectedRedirect /> : <AuthPage />} />
              <Route path="/dashboard" element={<Protected><StudentDashboard /></Protected>} />
              <Route path="/lesson/:lessonId" element={<Protected><LessonViewer /></Protected>} />
              <Route path="/assessment/:lessonId" element={<Protected><Assessment /></Protected>} />
              <Route path="/tutor" element={<Protected><TutorDashboard /></Protected>} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

function ProtectedRedirect() {
  const { user } = React.useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => { if (user) navigate('/dashboard'); }, [user, navigate]);
  return null;
}
