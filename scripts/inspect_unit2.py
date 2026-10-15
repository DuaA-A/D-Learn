import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for idx in [1287, 1607, 1940]:
    start = max(0, idx - 5)
    end = min(len(lines), idx + 40)
    print(f"=== Around line {idx} ===")
    for j in range(start, end):
        print(f"L{j+1}: {lines[j].strip()}")
