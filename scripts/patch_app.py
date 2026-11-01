import sys
sys.stdout.reconfigure(encoding='utf-8')

APP = 'frontend/src/App.tsx'

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import after Chapter2Practice
old_import = "import Chapter2Practice from './Chapter2Practice';"
new_import = old_import + "\nimport Chapter2RealQuiz from './Chapter2RealQuiz';"

if "Chapter2RealQuiz" not in content:
    content = content.replace(old_import, new_import, 1)
    print("Added Chapter2RealQuiz import")
else:
    print("Chapter2RealQuiz import already exists")

# 2. Add route
old_route = "              <Route path=\"/chapter2-practice\" element={<Protected><Chapter2Practice /></Protected>} />"
new_route = old_route + "\n              <Route path=\"/chapter2-quiz\" element={<Protected><Chapter2RealQuiz /></Protected>} />"

if "/chapter2-quiz" not in content:
    content = content.replace(old_route, new_route, 1)
    print("Added /chapter2-quiz route")
else:
    print("/chapter2-quiz route already exists")

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")

