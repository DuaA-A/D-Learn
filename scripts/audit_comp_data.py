import re, json

with open('frontend/src/comprehensiveExamData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'\{\s*id:\s*"([^"]+)",\s*lesson:\s*"([^"]+)"[\s\S]*?question_ar:\s*"([^"]+)"[\s\S]*?correct_option:\s*"([^"]+)"'
matches = re.findall(pattern, text)

# Also load existing workshop questions
with open('frontend/src/chapter1WorkshopQuestions.ts', 'r', encoding='utf-8') as f:
    ws_text = f.read()

ws_q_ar = re.findall(r'"question_ar":\s*"([^"]+)"', ws_text)
ws_ids = re.findall(r'"id":\s*"([^"]+)"', ws_text)

with open('comp_audit_result.txt', 'w', encoding='utf-8') as out:
    out.write(f"Total questions in comprehensiveExamData: {len(matches)}\n\n")
    for i, m in enumerate(matches, 1):
        qid, lesson, q_ar, correct = m[0], m[1], m[2], m[3]
        # check duplicate in workshop
        is_exact_dup = q_ar in ws_q_ar
        # check if keyword overlaps
        out.write(f"[{i}] ID: {qid} | Lesson: {lesson} | Correct: {correct}\n")
        out.write(f"Q: {q_ar}\n")
        out.write(f"Exact match in Workshop: {is_exact_dup}\n\n")

print("Audit written to comp_audit_result.txt")
