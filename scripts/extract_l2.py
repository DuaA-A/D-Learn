import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('sources/assessments_extracted.txt', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

lines = text.splitlines()

# Extract from line 1600 to 1938
l2_lines = lines[1600:1939]
print(f"Lines count: {len(l2_lines)}")

# Save or print with page indicators
current_page = ""
for i, line in enumerate(l2_lines):
    line_num = 1601 + i
    if "=== PAGE" in line:
        print(f"\n--- {line} (at line {line_num}) ---")
    elif line.strip():
        # filter out empty lines or dotted fill-in lines
        if not line.strip().startswith('....'):
            print(f"[{line_num}] {line.strip()}")
