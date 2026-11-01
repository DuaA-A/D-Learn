import sys
sys.stdout.reconfigure(encoding='utf-8')

checks = [
  ('ch2QuizData.ts', 'CH2_REAL_QUIZ_QUESTIONS', 'frontend/src/ch2QuizData.ts'),
  ('Chapter2RealQuiz.tsx', 'executeSubmit', 'frontend/src/Chapter2RealQuiz.tsx'),
  ('Chapter2RealQuiz.tsx', 'questionSnapshot', 'frontend/src/Chapter2RealQuiz.tsx'),
  ('Chapter2RealQuiz.tsx', 'ch2-real-quiz', 'frontend/src/Chapter2RealQuiz.tsx'),
  ('App.tsx import', 'Chapter2RealQuiz', 'frontend/src/App.tsx'),
  ('App.tsx route', '/chapter2-quiz', 'frontend/src/App.tsx'),
  ('App.tsx admin snapshot', 'isRealQuiz', 'frontend/src/App.tsx'),
  ('App.tsx admin filter', 'setFilterLesson', 'frontend/src/App.tsx'),
]

all_ok = True
for label, token, path in checks:
    with open(path, encoding='utf-8') as f:
        content = f.read()
    ok = token in content
    status = 'OK' if ok else 'MISSING'
    print(status + ' - ' + label + ': ' + repr(token))
    if not ok:
        all_ok = False

print()
print('All checks passed!' if all_ok else 'SOME CHECKS FAILED!')

