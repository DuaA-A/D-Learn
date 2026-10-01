with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'exam_style_questions:\s*\[(.*?)\]\s*,?\s*\}', text, re.DOTALL)
print('Blocks:', len(matches))
for i, m in enumerate(matches):
    print(f'Lesson {i+1}: {m.count("q_en")} questions')
