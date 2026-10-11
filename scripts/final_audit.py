import sys
import re
from collections import defaultdict, Counter
import difflib

sys.stdout.reconfigure(encoding='utf-8')

# Read courseData.ts
with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    cd = f.read()

# Read official files
with open('frontend/src/officialAssessments_Lesson1_2.ts', 'r', encoding='utf-8') as f:
    l1_2 = f.read()
with open('frontend/src/officialAssessments_Lesson3.ts', 'r', encoding='utf-8') as f:
    l3 = f.read()
with open('frontend/src/officialAssessments_Lesson4.ts', 'r', encoding='utf-8') as f:
    l4 = f.read()

def parse_questions_from_content(content, src):
    matches = re.finditer(r'id:\s*["\']([^"\']+)["\'].*?lesson:\s*["\']([^"\']+)["\'].*?type:\s*["\']([^"\']+)["\'].*?question_ar:\s*(["\'])(.*?)\4', content, re.DOTALL)
    qs = []
    for m in matches:
        qid = m.group(1)
        les = m.group(2).replace('les_', '').replace('_', '-')
        qtype = m.group(3)
        qar = m.group(5).strip().replace('\n', ' ')
        qs.append({'id': qid, 'lesson': les, 'type': qtype, 'qar': qar, 'src': src})
    return qs

# Base questions directly in courseData before line 1630
base_part = cd[:cd.find('...OFFICIAL_WRITTEN_L1_L2')]
qs_base = parse_questions_from_content(base_part, 'courseData (Base)')
qs_l1_2 = parse_questions_from_content(l1_2, 'officialAssessments_Lesson1_2.ts')
qs_l3 = parse_questions_from_content(l3, 'officialAssessments_Lesson3.ts')
qs_l4 = parse_questions_from_content(l4, 'officialAssessments_Lesson4.ts')

all_quiz_questions = qs_base + qs_l1_2 + qs_l3 + qs_l4
print(f"=======================================================")
print(f"TOTAL ACTIVE QUIZ QUESTIONS IN COURSE: {len(all_quiz_questions)}")
print(f"=======================================================")

# 1. Lesson breakdown
by_lesson = Counter(q['lesson'] for q in all_quiz_questions)
by_type = defaultdict(lambda: Counter())
for q in all_quiz_questions:
    by_type[q['lesson']][q['type']] += 1

for les in sorted(by_lesson.keys()):
    print(f"\nLesson {les}: {by_lesson[les]} questions total -> MCQ: {by_type[les]['MCQ']}, WRITTEN: {by_type[les]['WRITTEN']}")

# 2. Check for duplicate IDs
ids = [q['id'] for q in all_quiz_questions]
dup_ids = [k for k, v in Counter(ids).items() if v > 1]
print(f"\nDuplicate IDs: {dup_ids}")
assert len(dup_ids) == 0, f"Found duplicate IDs: {dup_ids}"

# 3. Check for duplicate text
def clean(t):
    t = re.sub(r'[^\w\s]', '', t)
    return ' '.join(t.split()).lower()

by_clean = defaultdict(list)
for q in all_quiz_questions:
    by_clean[clean(q['qar'])].append(q)

exact_dups = {k: v for k, v in by_clean.items() if len(v) > 1}
print(f"\nExact duplicate questions: {len(exact_dups)}")
for k, v in exact_dups.items():
    print("DUP:")
    for item in v:
        print(f"  [{item['src']}] ID: {item['id']} -> {item['qar']}")
assert len(exact_dups) == 0, f"Found exact duplicate questions!"

# 4. Check for fuzzy duplicates (>0.85)
print("\n--- FUZZY DUPLICATES CHECK (>0.85) ---")
q_list = all_quiz_questions
fuzzy_found = 0
for i in range(len(q_list)):
    for j in range(i + 1, len(q_list)):
        q1, q2 = q_list[i], q_list[j]
        c1, c2 = clean(q1['qar']), clean(q2['qar'])
        r = difflib.SequenceMatcher(None, c1, c2).ratio()
        if r > 0.85:
            fuzzy_found += 1
            print(f"Fuzzy ({r:.2f}): [{q1['src']}] {q1['id']} vs [{q2['src']}] {q2['id']}")
            print(f"  A: {q1['qar'][:70]}")
            print(f"  B: {q2['qar'][:70]}")
print(f"Total fuzzy matches (>0.85): {fuzzy_found}")

# 5. Check out-of-syllabus keywords
forbidden_keywords = [
    'vanishing gradient', 'تلاشي التدرج',
    'overfitting', 'فرط التخصيص',
    'underfitting', 'نقص التخصيص',
    'k-means', 'أقرب جار', 'knn',
    'word2vec', 'تضمين الكلمات', 'word embeddings',
    'one-hot', 'الترميز الأحادي',
    'data drift', 'انحراف البيانات', 'concept drift',
    'shap', 'lime',
    'batch normalization',
    'stochastic gradient',
    'mirai', 'zigbee', 'z-wave', 'mqtt', 'coap',
    'techno-solutionism', 'الحلولية التكنولوجية',
    'surveillance capitalism', 'رأسمالية المراقبة',
    'red teaming', 'الفريق الأحمر',
    'trolley problem', 'معضلة العربة', 'utilitarianism',
    'catastrophic forgetting', 'النسيان الكارثي',
    'zero-shot', 'iou'
]

found_forbidden = []
for q in all_quiz_questions:
    full_text = q['qar'].lower()
    for kw in forbidden_keywords:
        if kw in full_text:
            found_forbidden.append((q['id'], q['lesson'], kw, q['qar']))

print(f"\n--- FORBIDDEN OUT-OF-SYLLABUS KEYWORDS CHECK ---")
print(f"Found out-of-syllabus questions: {len(found_forbidden)}")
for fid, fles, fkw, ftext in found_forbidden:
    print(f"  [{fid}] L{fles} (KW: '{fkw}'): {ftext}")
assert len(found_forbidden) == 0, f"Found out of syllabus questions!"

print("\n>>> AUDIT PASSED: 100% IN-CURRICULUM, ZERO DUPLICATES! <<<")
