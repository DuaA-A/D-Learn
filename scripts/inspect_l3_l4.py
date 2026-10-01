import re

# Read App.tsx
with open('frontend/src/App.tsx', 'r', encoding='utf-8') as f:
    app_text = f.read()

# Let's inspect officialAssessments_Lesson3.ts and officialAssessments_Lesson4.ts
for l in ['3', '4']:
    with open(f'frontend/src/officialAssessments_Lesson{l}.ts', 'r', encoding='utf-8') as f:
        c = f.read()
    print(f'officialAssessments_Lesson{l}.ts length: {len(c)} chars')
    # sample some questions
    sample_ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', c)[:5]
    print(f'Sample IDs in L{l}:', sample_ids)
