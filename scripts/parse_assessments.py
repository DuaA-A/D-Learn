import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

def get_page_range(start, end):
    res = []
    for p in pages[1:]:
        num = int(p.split(' ===')[0])
        if start <= num <= end:
            res.append((num, p))
    return res

print("L1-3 pages: 17 to 22")
for num, p in get_page_range(17, 22):
    print(f"--- Page {num} ---")
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    for l in lines:
        if any(keyword in l for keyword in ['أوالً', 'ثانيًا', 'النموذج', 'األسئلة املقالية', 'األسئلة املوضوعية', '-1', '-2', '-3', '-4', '١-', '٢-']):
            print(f"  {l[:100]}")

print("\nL1-4 pages: 23 to 29")
for num, p in get_page_range(23, 29):
    print(f"--- Page {num} ---")
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    for l in lines:
        if any(keyword in l for keyword in ['أوالً', 'ثانيًا', 'النموذج', 'األسئلة املقالية', 'األسئلة املوضوعية', '-1', '-2', '-3', '-4', '١-', '٢-']):
            print(f"  {l[:100]}")
