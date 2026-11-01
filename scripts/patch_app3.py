import sys
sys.stdout.reconfigure(encoding='utf-8')

APP = 'frontend/src/App.tsx'

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the filterLesson matching — add exact equality check for custom lessonIds
old_filter_logic = "    const matchesLesson = filterLesson === 'ALL' || matchLessonId(r.lessonId, filterLesson);"
new_filter_logic = "    const matchesLesson = filterLesson === 'ALL' || r.lessonId === filterLesson || matchLessonId(r.lessonId, filterLesson);"

if old_filter_logic in content:
    content = content.replace(old_filter_logic, new_filter_logic, 1)
    print("Fixed matchesLesson to support exact lessonId match for ch2-real-quiz")
else:
    print("matchesLesson logic already updated or not found")

# Add ch2-real-quiz filter button after LESSONS.map
# Find the closing of LESSONS.map in the filter bar
marker = "                ))}\n              </div>\n            </div>\n\n            {loading ? ("
replacement = (
    "                ))}\n"
    "                <button\n"
    "                  onClick={() => setFilterLesson('ch2-real-quiz')}\n"
    "                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${filterLesson === 'ch2-real-quiz'\n"
    "                    ? 'bg-rose-600 text-white shadow-sm'\n"
    "                    : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'\n"
    "                    }`}\n"
    "                >\n"
    "                  {t('Ch2 Real Quiz', '\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u062b\u0627\u0646\u064a \u0627\u0644\u0631\u0633\u0645\u064a', lang)}\n"
    "                </button>\n"
    "              </div>\n"
    "            </div>\n"
    "\n"
    "            {loading ? ("
)

# Try with CRLF version too
marker_crlf = "                ))}\r\n              </div>\r\n            </div>\r\n\r\n            {loading ? ("
replacement_crlf = (
    "                ))}\r\n"
    "                <button\r\n"
    "                  onClick={() => setFilterLesson('ch2-real-quiz')}\r\n"
    "                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${filterLesson === 'ch2-real-quiz'\r\n"
    "                    ? 'bg-rose-600 text-white shadow-sm'\r\n"
    "                    : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'\r\n"
    "                    }`}\r\n"
    "                >\r\n"
    "                  {t('Ch2 Real Quiz', '\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u062b\u0627\u0646\u064a \u0627\u0644\u0631\u0633\u0645\u064a', lang)}\r\n"
    "                </button>\r\n"
    "              </div>\r\n"
    "            </div>\r\n"
    "\r\n"
    "            {loading ? ("
)

if 'ch2-real-quiz' in content and 'setFilterLesson' in content and 'onClick={() => setFilterLesson' in content:
    print("ch2-real-quiz filter button already exists")
else:
    found = False
    if marker_crlf in content:
        content = content.replace(marker_crlf, replacement_crlf, 1)
        found = True
        print("Added ch2-real-quiz filter button (CRLF)")
    elif marker in content:
        content = content.replace(marker, replacement, 1)
        found = True
        print("Added ch2-real-quiz filter button (LF)")
    if not found:
        print("WARNING: filter end marker not found - looking for partial match...")
        idx = content.find("                ))}")
        ctx = content[idx:idx+300]
        print(repr(ctx[:200]))

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
