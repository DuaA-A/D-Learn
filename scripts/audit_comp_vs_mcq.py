import json, re

with open('frontend/src/comprehensiveExamData.ts', 'r', encoding='utf-8') as f:
    comp_text = f.read()

with open('frontend/src/chapter1WorkshopQuestions.ts', 'r', encoding='utf-8') as f:
    ws_text = f.read()

comp_items = re.findall(r'\{\s*id:\s*"([^"]+)",\s*lesson:\s*"([^"]+)"[\s\S]*?question_ar:\s*"([^"]+)"[\s\S]*?correct_option:\s*"([^"]+)"', comp_text)
# Extract only MCQs from workshop
ws_mcqs = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"lesson":\s*"([^"]+)"[\s\S]*?"type":\s*"MCQ"[\s\S]*?"question_ar":\s*"([^"]+)"', ws_text)

print(f"Total comp: {len(comp_items)}, Total ws MCQs: {len(ws_mcqs)}")

with open('comp_vs_mcq_audit.txt', 'w', encoding='utf-8') as out:
    for cid, clesson, cq, copt in comp_items:
        out.write(f"=== COMP: [{cid}] (Lesson {clesson})\n{cq}\n")
        cwords = set(re.findall(r'\w+', cq))
        matches = []
        for wid, wlesson, wq in ws_mcqs:
            wwords = set(re.findall(r'\w+', wq))
            overlap = len(cwords & wwords)
            if overlap >= 3 and clesson == wlesson:
                matches.append((overlap, wid, wq))
        matches.sort(key=lambda x: x[0], reverse=True)
        if matches:
            for score, wid, wq in matches[:2]:
                out.write(f"   -> Overlap ({score}): [{wid}] {wq}\n")
        else:
            out.write("   -> No similar MCQ in this lesson\n")
        out.write("\n")

print("Saved to comp_vs_mcq_audit.txt")
