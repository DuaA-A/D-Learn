import json, re

with open('frontend/src/comprehensiveExamData.ts', 'r', encoding='utf-8') as f:
    comp_text = f.read()

with open('frontend/src/chapter1WorkshopQuestions.ts', 'r', encoding='utf-8') as f:
    ws_text = f.read()

comp_items = re.findall(r'\{\s*id:\s*"([^"]+)",\s*lesson:\s*"([^"]+)"[\s\S]*?question_ar:\s*"([^"]+)"[\s\S]*?correct_option:\s*"([^"]+)"', comp_text)
ws_items = re.findall(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?"question_ar":\s*"([^"]+)"', ws_text)

print(f"Comparing {len(comp_items)} comp questions against {len(ws_items)} workshop questions...\n")

with open('similarity_audit.txt', 'w', encoding='utf-8') as out:
    for cid, clesson, cq, copt in comp_items:
        out.write(f"--- COMP: [{cid}] ({clesson}) {cq}\n")
        # Find highest word overlap
        cwords = set(re.findall(r'\w+', cq))
        best_matches = []
        for wid, wq in ws_items:
            wwords = set(re.findall(r'\w+', wq))
            overlap = len(cwords & wwords)
            if overlap >= 4:
                best_matches.append((overlap, wid, wq))
        best_matches.sort(key=lambda x: x[0], reverse=True)
        if best_matches:
            for score, wid, wq in best_matches[:3]:
                out.write(f"   Potential match (score {score}): [{wid}] {wq}\n")
        else:
            out.write("   No close match found.\n")
        out.write("\n")

print("Done. Check similarity_audit.txt")
