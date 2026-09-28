import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*lesson:\s*["\']([^"\']+)["\'],\s*unit:\s*["\']?1["\']?,\s*type:\s*["\']([^"\']+)["\'],\s*difficulty:\s*["\']([^"\']+)["\'],\s*source:\s*["\']([^"\']+)["\'],\s*question_ar:\s*["\']([^"\']+)["\']', text)
print(f"Total parsed: {len(matches)}")
for m in matches:
    print(f"[{m[1]}] ({m[2]} - {m[4]}): {m[0]} -> {m[5][:60]}")
