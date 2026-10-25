import re

with open('frontend/src/officialAssessments_Unit2.ts', 'r', encoding='utf-8') as f:
    text_off = f.read()

with open('frontend/src/ch2_lesson1_officialQ_part1.ts', 'r', encoding='utf-8') as f:
    text_p1 = f.read()

qs_off = re.findall(r'question_ar:\s*[\'"`]([^\'"`]+)[\'"`]', text_off)
qs_p1 = re.findall(r'question_ar:\s*[\'"`]([^\'"`]+)[\'"`]', text_p1)

print(f"Total questions in officialAssessments_Unit2: {len(qs_off)}")
print(f"Total questions in ch2_lesson1_officialQ_part1: {len(qs_p1)}")

matched = 0
for q in qs_p1:
    # check if in qs_off
    found = any(q[:20] in off_q for off_q in qs_off)
    if found:
        matched += 1
print(f"Matched {matched} of {len(qs_p1)} questions from p1 in officialAssessments_Unit2")
