import re
from collections import Counter

for fname in ['courseData.ts', 'massiveBank_Lesson1.ts', 'massiveBank_Lesson2.ts', 'massiveBank_Lesson3.ts', 'massiveBank_Lesson4.ts']:
    path = f'c:/Users/dodoa/OneDrive/Desktop/D-Learn/frontend/src/{fname}'
    try:
        with open(path, 'r', encoding='utf-8') as f:
            text = f.read()
        m = re.findall(r'lesson:\s*["\']([^"\']+)["\']', text)
        print(f'{fname}: {Counter(m)}')
    except Exception as e:
        print(f'{fname}: {e}')
