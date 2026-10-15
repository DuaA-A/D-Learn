import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('sources/Programming-ArtificialIntelligence-En-EB-part1_260819_201852.pdf')
print("=== English Textbook: Pages 42-48 ===")
for p in range(41, 48): # 0-indexed: 41 is page 42
    print(f"\n--- PAGE {p+1} ---")
    print(doc[p].get_text())
