import sys
sys.stdout.reconfigure(encoding='utf-8')

APP = 'frontend/src/App.tsx'

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

# ── 1. Add Real Quiz button in Chapter 2 quick-action pills ──────────────────
old_pills_end = """              <button
                onClick={() => navigate('/chapter2-practice?section=MIXED')}
                className=\"px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-95 text-white text-xs font-black shadow-md shadow-violet-600/20 transition-all flex items-center gap-2 cursor-pointer\"
              >
                <FileText size={15} />
                <span>{t('Mixed Quiz: L1 + L2 ', 'اختبار شامل: الدرسان معاً', lang)}</span>
              </button>
            </div>
          </div>

          {/* Chapter 2 Lessons Grid */}"""

new_pills_end = """              <button
                onClick={() => navigate('/chapter2-practice?section=MIXED')}
                className=\"px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-95 text-white text-xs font-black shadow-md shadow-violet-600/20 transition-all flex items-center gap-2 cursor-pointer\"
              >
                <FileText size={15} />
                <span>{t('Mixed Quiz: L1 + L2 ', 'اختبار شامل: الدرسان معاً', lang)}</span>
              </button>
              <button
                onClick={() => navigate('/chapter2-quiz')}
                className=\"px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white text-xs font-black shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer\"
              >
                <Award size={15} />
                <span>{t('🏆 Real Quiz — 10 Qs', '🏆 الاختبار الرسمي — 10 أسئلة', lang)}</span>
              </button>
            </div>
          </div>

          {/* Chapter 2 Lessons Grid */}"""

if '/chapter2-quiz' not in content:
    content = content.replace(old_pills_end, new_pills_end, 1)
    print("Added Real Quiz button to Chapter 2 pills")
else:
    print("Real Quiz button already exists in pills")

# ── 2. Fix admin inspection: include ch2-real-quiz in QUIZ_QUESTIONS lookup ──
# The TutorDashboard uses:
#   const lessonQuestions = QUIZ_QUESTIONS.filter(q => matchLessonId(q.lesson, inspectSubmission.lessonId));
# For lessonId='ch2-real-quiz', QUIZ_QUESTIONS won't have matching questions, but we have
# questionSnapshot saved in Firestore. We need the admin modal to use questionSnapshot
# when lessonId === 'ch2-real-quiz'.

# Find the admin modal section and add fallback for questionSnapshot
old_inspect_start = """        {inspectSubmission && (() => {
          const l = lessonLookup(inspectSubmission.lessonId);
          const lessonQuestions = QUIZ_QUESTIONS.filter(q => matchLessonId(q.lesson, inspectSubmission.lessonId));
          const hasAnswersMap = inspectSubmission.answers && Object.keys(inspectSubmission.answers).length > 0;"""

new_inspect_start = """        {inspectSubmission && (() => {
          const l = lessonLookup(inspectSubmission.lessonId);
          // For ch2-real-quiz, use the saved questionSnapshot from Firestore; otherwise use QUIZ_QUESTIONS
          const isRealQuiz = inspectSubmission.lessonId === 'ch2-real-quiz';
          const lessonQuestions = isRealQuiz
            ? ((inspectSubmission as any).questionSnapshot || []).map((s: any) => ({
                ...s,
                type: 'MCQ',
                correct_option: s.correct_option,
              }))
            : QUIZ_QUESTIONS.filter(q => matchLessonId(q.lesson, inspectSubmission.lessonId));
          const hasAnswersMap = inspectSubmission.answers && Object.keys(inspectSubmission.answers).length > 0;"""

if 'isRealQuiz' not in content:
    if old_inspect_start in content:
        content = content.replace(old_inspect_start, new_inspect_start, 1)
        print("Patched admin inspection to support ch2-real-quiz questionSnapshot")
    else:
        print("WARNING: admin inspection block not found — manual patch needed")
else:
    print("Admin inspection patch already exists")

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")

