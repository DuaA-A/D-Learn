import sys
import fitz # PyMuPDF
import glob

sys.stdout.reconfigure(encoding='utf-8')

pdfs = glob.glob('sources/*.pdf')
print("PDF files found:", pdfs)

for pdf_path in pdfs:
    try:
        doc = fitz.open(pdf_path)
        print(f"\nScanning {pdf_path} (pages: {len(doc)})...")
        found = []
        for i in range(len(doc)):
            page_text = doc[i].get_text()
            if any(term in page_text for term in ["Network Security Design", "تصميم أمان الشبكات", "Defense in Depth", "DMZ", "Zero Trust", "انعدام الثقة"]):
                found.append(i + 1)
        if found:
            print(f"Found matches on pages: {found[:20]} (total: {len(found)})")
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
