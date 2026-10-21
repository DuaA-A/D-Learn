import re

with open('frontend/src/officialAssessments_Unit2.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace multiline double quoted strings:
# Any string starting with " and ending with " that spans multiple lines
def repl(match):
    s = match.group(0)
    if '\n' in s:
        inner = s[1:-1]
        return '`' + inner + '`'
    return s

fixed = re.sub(r'\"(?:[^\"\\]|\\.)*?\"', repl, text, flags=re.DOTALL)

with open('frontend/src/officialAssessments_Unit2.ts', 'w', encoding='utf-8') as f:
    f.write(fixed)

print('Successfully converted all multiline double-quoted strings to backticks!')
