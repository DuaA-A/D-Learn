import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/unit2_assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

print(f"Total pages in Unit 2: {len(pages)-1}")
for p in pages[1:]:
    p_num = int(p.split(' ===')[0].strip())
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    print(f"\n--- Page {p_num} ({len(lines)} lines) ---")
    for l in lines[:15]:
        print("  ", l)
