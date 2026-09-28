import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/l1_pages.txt', 'r', encoding='utf-8') as f:
    l1_text = f.read()

with open('scripts/l2_pages.txt', 'r', encoding='utf-8') as f:
    l2_text = f.read()

with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    cdata = f.read()

def check_text(txt, label):
    print(f"=== {label} WRITTEN QUESTIONS ===")
    for p in txt.split('==================== PAGE '):
        if not p.strip(): continue
        p_num = p.split(' ====================\n')[0]
        lines = [l.strip() for l in p.split('\n') if l.strip()]
        is_written = False
        for l in lines:
            if 'األسئلة املقالية' in l:
                is_written = True
            elif 'األسئلة املوضوعية' in l:
                is_written = False
            elif is_written and any(l.startswith(prefix) or l.endswith(prefix) for prefix in ['-1', '-2', '-3', '-4', '١-', '٢-', '٣-', '٤-']):
                clean_q = re.sub(r'[\d\-١٢٣٤\.\?]', '', l).strip()
                match = clean_q[:15] in cdata
                print(f"Page {p_num} [{'FOUND' if match else 'MISSING'}]: {clean_q[:60]}")

check_text(l1_text, "L1")
check_text(l2_text, "L2")
