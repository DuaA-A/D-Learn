from check_lessons import *
# Let's write a python test to emulate QUIZ_QUESTIONS and matchLessonId
import re

def norm(s):
    return s.replace('les_', '').replace('_', '-')

def match(q, t):
    return norm(q) == norm(t)

# Check all imported files
files = [
    'officialAssessments_Lesson1_2.ts',
    'officialAssessments_Lesson3.ts',
    'officialAssessments_Lesson4.ts',
    'massiveBank.ts',
    'massiveBank_Lesson1.ts',
    'massiveBank_Lesson2.ts',
    'massiveBank_Lesson3.ts',
    'massiveBank_Lesson4.ts',
    'extraData.ts',
    'courseData.ts'
]

for lid in ['1-1', '1-2', '1-3', '1-4']:
    total = 0
    sources = set()
    for fn in files:
        try:
            with open(f'frontend/src/{fn}', 'r', encoding='utf-8') as f:
                c = f.read()
            # find all objects with lesson: "..."
            items = re.findall(r'lesson:\s*[\'"]([^\'"]+)[\'"]', c)
            cnt = sum(1 for ql in items if match(ql, lid))
            if cnt > 0:
                total += cnt
                sources.add(fn)
        except Exception as e:
            pass
    print(f'Lesson {lid}: total {total} questions from {sources}')
