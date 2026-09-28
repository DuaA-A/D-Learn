import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

def analyze_range(start, end, label):
    print(f"=== {label} (Pages {start} to {end}) ===")
    for p in pages[1:]:
        p_num = int(p.split(' ===')[0])
        if start <= p_num <= end:
            lines = [l.strip() for l in p.split('\n') if l.strip()]
            q_lines = [l for l in lines if any(l.startswith(prefix) or l.endswith(prefix) for prefix in ['-1', '-2', '-3', '-4', '١-', '٢-', '٣-', '٤-'])]
            print(f"Page {p_num}: {len(q_lines)} questions -> {q_lines[:3]}")

analyze_range(3, 9, "Lesson 1-1")
analyze_range(10, 16, "Lesson 1-2")
