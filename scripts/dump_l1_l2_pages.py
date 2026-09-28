import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('=== PAGE ')

def dump_pages(start, end, fname):
    with open(fname, 'w', encoding='utf-8') as out:
        for p in pages[1:]:
            p_num = int(p.split(' ===')[0])
            if start <= p_num <= end:
                out.write(f"\n==================== PAGE {p_num} ====================\n")
                out.write(p)

dump_pages(3, 9, 'scripts/l1_pages.txt')
dump_pages(10, 16, 'scripts/l2_pages.txt')
print("Dumped l1_pages.txt and l2_pages.txt")
