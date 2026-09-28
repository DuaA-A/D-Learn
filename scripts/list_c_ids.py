import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    cdata = f.read()

import re
c_ids = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*lesson:\s*["\'](1-[12])["\']', cdata)
print(f"CourseData L1-1 & L1-2 questions count: {len(c_ids)}")
print([cid for cid, les in c_ids])
