import sys
sys.stdout.reconfigure(encoding='utf-8')

APP = 'frontend/src/App.tsx'

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix App.tsx line 3016: implicit any type for q, idx in lessonQuestions.map
old_map = "                  {lessonQuestions.map((q, idx) => {"
new_map = "                  {lessonQuestions.map((q: any, idx: number) => {"
content = content.replace(old_map, new_map, 1)
print("Fixed implicit any for q, idx in lessonQuestions.map")

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

print("App.tsx patched!")

