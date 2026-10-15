import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

lines = text.splitlines()

# Lines 1605 to 1780
for i in range(1605, 1780):
    line = lines[i]
    if "=== PAGE" in line:
        print(f"\n--- {line} (at line {i+1}) ---")
    elif line.strip() and not line.strip().startswith('....'):
        print(f"[{i+1}] {line.strip()}")
