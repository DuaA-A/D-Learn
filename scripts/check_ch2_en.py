import glob

for f in sorted(glob.glob('frontend/src/ch2_*.ts')):
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
    q_en = text.count('question_en:')
    ans_en = text.count('ideal_answer_en:')
    exp_en = text.count('explanation_en:')
    opt_en = text.count('options_en:')
    print(f"{f:45} | q_en: {q_en:2} | ans_en: {ans_en:2} | exp_en: {exp_en:2} | opt_en: {opt_en:2}")
