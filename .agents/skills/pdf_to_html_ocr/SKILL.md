---
name: PDF to HTML OCR
description: Extract pages from a PDF to images, perform AI vision OCR to transcribe the text, and synthesize the results into an HTML file.
---

# PDF to HTML OCR Skill

When the user asks to convert a PDF into an HTML file using OCR without relying on external API keys or Tesseract, follow these steps:

1. **Convert PDF to Images**
   - Check if `PyMuPDF` (fitz) is installed. If not, use the `run_command` tool to run `pip install pymupdf`.
   - Write and execute a short Python script via the `run_command` tool to extract the required pages from the target PDF as PNG images (e.g., `page_1.png`, `page_2.png`).

2. **Transcribe Images (OCR)**
   - Use the `view_file` tool to visually inspect each generated image sequentially.
   - For each image, transcribe the text as accurately and completely as possible while adhering to these **Formatting Rules**:
     - **Ignore Handwritten Notes**: Do NOT transcribe any handwritten comments or translations found on the images.
     - **Dialogue Layout**: If a question contains a dialogue, place the second speaker's response on a new line prefixed with a hyphen (e.g., `<br>- "..."`).
     - **Blanks in Passages**: In reading passages, format numbered blanks by appending dots after the number (e.g., `<strong>(33)</strong> ........`).
   - Since the text can be long, break the transcription into chunks (e.g., one chunk per test/page) and write them into temporary HTML files like `test1.html`, `test2.html`, etc. using the `write_to_file` tool. Do not skip or summarize any content unless requested.

3. **Merge and Format HTML**
   - Write a Python script to merge the temporary HTML files into a single, well-structured `ocr_results.html` file. 
   - Wrap the content in proper `<!DOCTYPE html>`, `<head>`, and `<body>` tags with basic CSS styling.
   - Run the script.

4. **Verify and Correct**
   - Read the generated `ocr_results.html` and compare its content closely with the original extracted images (use `view_file` on the images and the HTML file).
   - If any discrepancies, formatting issues, or missed layouts are found, use the `replace_file_content` or `multi_replace_file_content` tools to update the HTML to exactly match the images.
   - **Important Blank Test Rule**: Do not mark, circle, or highlight any selected answers (e.g., adding `.selected` classes) in the output, as the result is intended to be a blank test paper.

5. **Cleanup**
   - Use commands or Python to delete the temporary HTML files. 
   - Notify the user that the operation is complete and provide a link to the final `ocr_results.html` file.
