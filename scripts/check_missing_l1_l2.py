import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    cdata = f.read()

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

def get_page_questions(p_num):
    p = [p for p in pages[1:] if int(p.split(' ===')[0]) == p_num]
    if not p: return []
    lines = [l.strip() for l in p[0].split('\n') if l.strip()]
    return [l for l in lines if any(l.startswith(prefix) or l.endswith(prefix) for prefix in ['-1', '-2', '-3', '-4', '١-', '٢-', '٣-', '٤-'])]

print("Checking L1-1 (pages 3-9):")
for p in range(3, 10):
    qs = get_page_questions(p)
    print(f"Page {p} ({len(qs)} qs):")
    for q in qs:
        # check if in cdata
        found = q[:25] in cdata
        print(f"  [{'FOUND' if found else 'MISSING'}] {q[:70]}")

print("\nChecking L1-2 (pages 10-16):")
for p in range(10, 17):
    qs = get_page_questions(p)
    print(f"Page {p} ({len(qs)} qs):")
    for q in qs:
        found = q[:25] in cdata
        print(f"  [{'FOUND' if found else 'MISSING'}] {q[:70]}")
