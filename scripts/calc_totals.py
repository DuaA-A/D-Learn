import re
from collections import Counter

files = [
    'courseData.ts',
    'officialAssessments_Lesson1_2.ts',
    'officialAssessments_Lesson3.ts',
    'officialAssessments_Lesson4.ts',
    'massiveBank_Lesson1.ts',
    'massiveBank_Lesson2.ts',
    'massiveBank_Lesson3.ts',
    'massiveBank_Lesson4.ts'
]

total_counts = Counter()
for fname in files:
    with open(f'frontend/src/{fname}', 'r', encoding='utf-8') as f:
        text = f.read()
    lessons = re.findall(r'lesson:\s*["\']([^"\']+)["\']', text)
    # normalize
    norm = [l.replace('les_', '').replace('_', '-') for l in lessons]
    total_counts.update(norm)
    print(f"{fname}: {Counter(norm)}")

print("\n--- GRAND TOTALS PER LESSON ---")
for les in sorted(total_counts.keys()):
    print(f"Lesson {les}: {total_counts[les]} questions")
