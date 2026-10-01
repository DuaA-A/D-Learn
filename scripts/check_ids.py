import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('frontend/src/courseData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('export const LESSONS')
chunk = text[pos:pos+50000]

ids = re.findall(r'id:\s*[\'"]([^"\']+)[\'"]', chunk)
print('Found lesson IDs:', ids)

lesson_nums = re.findall(r'lesson_number:\s*[\'"]([^"\']+)[\'"]', chunk)
print('Lesson numbers:', lesson_nums)

titles = re.findall(r'title_ar:\s*[\'"]([^"\']+)[\'"]', chunk)
print('Titles AR:', titles)
