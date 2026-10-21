import sys
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['frontend/src/ch2_lesson1_notes.ts', 'frontend/src/ch2_lesson2_notes.ts']:
    print('==============================')
    print('FILE:', fname)
    print('==============================')
    with open(fname, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for l in lines:
        if 'title_ar:' in l or 'type:' in l:
            print(l.strip())
