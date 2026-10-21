import glob

for f in sorted(glob.glob('frontend/src/ch2_*.ts')):
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
    q_count = text.count("id: '") + text.count('id: "')
    print(f"{f}: {q_count} items")
