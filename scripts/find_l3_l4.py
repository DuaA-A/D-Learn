with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines, 1):
    if 'id: "1-3"' in line or 'id: "1-4"' in line or 'id: \'1-3\'' in line or 'id: \'1-4\'' in line:
        print(f'{idx}: {line.strip()}')
