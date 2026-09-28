for i in [1, 2, 3, 4]:
    path = f'frontend/src/massiveBank_Lesson{i}.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    updated = content.replace(f'lesson: "les_1_{i}"', f'lesson: "1-{i}"')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f'massiveBank_Lesson{i}.ts normalized')
