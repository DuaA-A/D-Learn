import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/l1_pages.txt', 'r', encoding='utf-8') as f:
    l1_text = f.read()

with open('scripts/l2_pages.txt', 'r', encoding='utf-8') as f:
    l2_text = f.read()

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    cdata = f.read()

print("=== L1 MISSING WRITTEN ===")
for p in l1_text.split('==================== PAGE '):
    if not p.strip(): continue
    p_num = p.split(' ====================\n')[0]
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    is_written = False
    for l in lines:
        if 'األسئلة املقالية' in l:
            is_written = True
        elif 'األسئلة املوضوعية' in l:
            is_written = False
        elif is_written and any(l.startswith(prefix) for prefix in ['-1', '-2', '-3', '-4', '١-', '٢-', '٣-', '٤-']):
            if l[:20] not in cdata:
                print(f"Page {p_num}: {l}")

print("\n=== L2 MISSING WRITTEN ===")
for p in l2_text.split('==================== PAGE '):
    if not p.strip(): continue
    p_num = p.split(' ====================\n')[0]
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    is_written = False
    for l in lines:
        if 'األسئلة املقالية' in l:
            is_written = True
        elif 'األسئلة املوضوعية' in l:
            is_written = False
        elif is_written and any(l.startswith(prefix) for prefix in ['-1', '-2', '-3', '-4', '١-', '٢-', '٣-', '٤-']):
            if l[:20] not in cdata:
                print(f"Page {p_num}: {l}")
