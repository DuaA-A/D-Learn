import re

with open(r'c:\Users\dodoa\OneDrive\Desktop\D-Learn\frontend\src\App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the exact location to insert after
marker = "navigate('/chapter2-practice?section=MIXED')"
idx = content.find(marker)
if idx == -1:
    print("MARKER NOT FOUND")
    exit(1)

# Find the closing </button> after this marker
close_btn = content.find('</button>', idx)
if close_btn == -1:
    print("CLOSE BUTTON NOT FOUND")
    exit(1)

# Find the </div> after the close button (end of pill row)
close_div = content.find('</div>', close_btn)
if close_div == -1:
    print("CLOSE DIV NOT FOUND")
    exit(1)

# Determine line endings
line_ending = '\r\n' if '\r\n' in content else '\n'

new_button = f"""{line_ending}              <button{line_ending}                onClick={{() => navigate('/chapter2-quiz')}}{line_ending}                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white text-xs font-black shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer"{line_ending}              >{line_ending}                <Award size={{15}} />{line_ending}                <span>{{t('Official Quiz \u2014 Lessons 1 & 2 \U0001f3af', '\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0631\u0633\u0645\u064a \u2014 \u0627\u0644\u062f\u0631\u0633\u0627\u0646 1 \u0648\u0662 \U0001f3af', lang)}}</span>{line_ending}              </button>"""

# Insert before the closing </div>
new_content = content[:close_div] + new_button + line_ending + '            ' + content[close_div:]

with open(r'c:\Users\dodoa\OneDrive\Desktop\D-Learn\frontend\src\App.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("SUCCESS - Official Quiz button added to Chapter 2 section")

