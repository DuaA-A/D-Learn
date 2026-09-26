import PyPDF2
import os

pdf_path = "../sources/Programming-ArtificialIntelligence-En-EB-part1_260819_201852.pdf"
output_path = "extracted_text.txt"

text = ""
try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        # Extract first 15 pages
        num_pages = min(15, len(reader.pages))
        for i in range(num_pages):
            page = reader.pages[i]
            text += page.extract_text() + "\n\n"
            
    with open(output_path, 'w', encoding='utf-8') as out_file:
        out_file.write(text)
    print("Extraction successful. Saved to", output_path)
except Exception as e:
    print("Error:", e)
