import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/unit2_assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

for p in pages[1:]:
    p_num = int(p.split(' ===')[0].strip())
    content = p.split(' ===\n')[1] if ' ===\n' in p else p
    lines = [l.strip() for l in content.split('\n') if l.strip()]
    mcq_start = False
    print(f"\n==================== PAGE {p_num} ====================")
    for l in lines:
        if 'اختيار من متعدد' in l or 'األسئلة املوضوعية' in l:
            mcq_start = True
        if mcq_start:
            print("  ", l)
