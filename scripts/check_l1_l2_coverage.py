import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    cdata = f.read()

import re
c_ar = re.findall(r'question_ar:\s*["\']([^"\']+)["\']', cdata)
print(f"Total question_ar in courseData: {len(c_ar)}")

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

def check_coverage(start, end, label):
    print(f"\n--- Coverage for {label} (Pages {start}-{end}) ---")
    p_text = " ".join([p for p in pages[1:] if start <= int(p.split(' ===')[0]) <= end])
    # check each courseData question
    found = 0
    for q in c_ar:
        # clean snippet
        snippet = q[:30].strip()
        if snippet in p_text:
            found += 1
    print(f"Matched {found} questions in this range.")

check_coverage(3, 9, "Lesson 1-1")
check_coverage(10, 16, "Lesson 1-2")
