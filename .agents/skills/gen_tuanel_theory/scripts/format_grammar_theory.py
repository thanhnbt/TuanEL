import os
import re
import sys

if len(sys.argv) < 3:
    print("Usage: python format_grammar_theory.py <input_text_file> <output_html_file>")
    sys.exit(1)

in_file = sys.argv[1]
out_file = sys.argv[2]

# Extract date from output file path to customize the title (e.g., 2026-08-14)
date_str = "XX/XX"
path_parts = out_file.replace('\\', '/').split('/')
for part in path_parts:
    if part.startswith("2026-"):
        date_str = f"{part[8:10]}/{part[5:7]}"
        break

css = """
    body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fafaf7;color:#1a1a1a}
    .lesson-topbar{background:#fff;border-bottom:1px solid #e2e4e8;padding:0 1rem;position:sticky;top:0;z-index:99}
    .lesson-topbar-inner{max-width:920px;margin:0 auto;display:flex;align-items:center;gap:8px}
    .lesson-topbar .back-link{color:#2563eb;text-decoration:none;font-size:13px;font-weight:600;padding:10px 0;margin-right:16px;white-space:nowrap}
    .lesson-topbar .back-link:hover{opacity:.7}
    .sub-nav{display:flex;gap:4px;overflow-x:auto}
    .sub-nav a{padding:10px 14px;font-size:13px;font-weight:500;color:#6b7280;text-decoration:none;border-bottom:2px solid transparent;white-space:nowrap;transition:color .15s,border-color .15s}
    .sub-nav a:hover{color:#1a1a1a}
    .sub-nav a.active{color:#2563eb;border-bottom-color:#2563eb}
    
    .container{max-width:920px;margin:0 auto;padding:1.5rem 1rem 3rem}
    h1{font-size:1.6rem;margin:0 0 .3rem;color:#1e293b; text-align:center;}
    .sub-title{color:#6b7280;font-size:.9rem;margin-bottom:1.2rem; text-align:center;}

    .grammar-section{background:#fff;border-radius:12px;border:1px solid #e2e4e8;padding:1.3rem 1.5rem;margin-bottom:1.4rem;box-shadow:0 1px 3px rgba(0,0,0,.04)}
    .grammar-section h2{font-size:1.15rem;color:#1e293b;margin:0 0 .8rem;display:flex;align-items:center;gap:8px}
    .grammar-section h2 .num{background:#2563eb;color:#fff;width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0}
    .grammar-section h3 {font-size: 1.05rem; color: #0d9488; margin-top: 1rem; margin-bottom: 0.3rem;}
    
    .formula{background:#f8fafc;border:2px solid #c7d2fe;border-radius:12px;padding:1rem 1.2rem;margin-bottom:1rem;box-shadow:0 1px 4px rgba(99,102,241,.08)}
    .formula-content{font-size:1.02rem;line-height:1.8;font-weight:500}
    
    .ex-group{border-left:3px solid #dbeafe;padding-left:1rem;margin:.6rem 0 1rem}
    .ex-item{background:#f8fafc;border-radius:8px;padding:.6rem 1rem;margin-bottom:.5rem;font-size:.9rem;line-height:1.7}
    .ex-item .orig{color:#1e293b; font-weight: 500;}
    
    .tip{background:#fefce8;border-radius:8px;padding:.5rem .9rem;font-size:.9rem;color:#854d0e;margin:.5rem 0 .3rem;line-height:1.8}
    .tip::before{content:'💡 ';font-style:normal}
    p { margin: 0.5rem 0; font-size: 0.95rem; line-height: 1.8; }
    
    .ch{color:#dc2626;font-weight:700}
    .en-term{color:#0f766e; font-weight:600;}
    .vi-hint{font-size:0.8rem; font-weight:normal; color:#6b7280; font-style:italic;}
"""

html_head = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lý thuyết Ngữ pháp {date_str} — English Daily</title>
  <link rel="stylesheet" href="../../css/style.css">
  <style>
{css}
  </style>
</head>
<body>
<div class="lesson-topbar">
  <div class="lesson-topbar-inner">
    <a href="../../index.html" class="back-link">📘 ← Trang chủ</a>
    <nav class="sub-nav">
      <a href="index.html" class="active">📗 Lý thuyết</a>
      <a href="practice.html">🧩 Practice</a>
    </nav>
  </div>
</div>
<div class="container">
"""

with open(in_file, "r", encoding="utf-8") as f:
    text = f.read()

# ----------------- PRE-PROCESSING REDUNDANCIES -----------------
text = text.replace("Tính từ (adjective)", "Tính từ")
text = text.replace("Trạng từ (adverb)", "Trạng từ")

# Proceed parsing lines
lines = [l.strip() for l in text.split('\n') if l.strip()]

html_body = ""
in_section = False

for i, line in enumerate(lines):
    if line.startswith("TÓM TẮT LÝ THUYẾT"):
        html_body += f"<h1>{line}</h1>\n"
        continue
    # Subtitles usually don't start with numbers or standard indicators
    if i == 1 and not re.match(r"^\d", line) and not line.startswith("VD:"):
        html_body += f"<p class='sub-title'>{line}</p>\n"
        continue
    
    h2_match = re.match(r"^(\d+)\.\s+(.*)", line)
    if h2_match and not re.match(r"^\d+\.\d+", line):
        if in_section:
            html_body += "</div>\n"
        num = h2_match.group(1)
        title = h2_match.group(2)
        html_body += f"<div class='grammar-section'>\n  <h2><span class='num'>{num}</span> {title}</h2>\n"
        in_section = True
        continue
        
    h3_match = re.match(r"^(\d+\.\d+)\.?\s+(.*)", line)
    if h3_match:
        html_body += f"  <h3>{line}</h3>\n"
        continue
        
    if line.startswith("VD:"):
        html_body += f"  <div class='ex-group'><div class='ex-item'><div class='orig'>{line}</div></div></div>\n"
        continue
        
    if line.startswith("Lưu ý:"):
        html_body += f"  <div class='tip'>{line}</div>\n"
        continue
        
    if line == "BẢNG TỔNG HỢP NHANH":
        if in_section:
            html_body += "</div>\n"
        html_body += f"<div class='grammar-section'>\n  <h2><span class='num'>★</span> {line}</h2>\n"
        in_section = True
        continue
        
    if re.match(r"^[A-Z]+\s+\+", line) or "S + V" in line or line.startswith("Khẳng định:") or line.startswith("Phủ định:") or line.startswith("Cấu trúc:"):
        html_body += f"  <div class='formula'><div class='formula-content'>{line}</div></div>\n"
    else:
        html_body += f"  <p>{line}</p>\n"

if in_section:
    html_body += "</div>\n"

# ----------------- APPLY TRANSLATIONS AND HIGHLIGHTS -----------------

def t(en, vi):
    return f"<span class='en-term'>{en}</span> <span class='vi-hint'>({vi})</span>"

# Order matters: compound phrases and longest strings first
translations = {
    # 1. Compound Phrases
    "danh từ đếm được và không đếm được": f"{t('Countable Nouns', 'danh từ đếm được')} và {t('Uncountable Nouns', 'không đếm được')}",
    "danh từ số nhiều/không đếm được": f"{t('Plural Nouns', 'danh từ số nhiều')} / {t('Uncountable Nouns', 'không đếm được')}",
    "Tính từ/trạng từ ngắn": f"{t('Short Adjectives', 'tính từ ngắn')} / {t('Short Adverbs', 'trạng từ ngắn')}",
    "Tính từ dài": t("Long Adjectives", "tính từ dài"),
    "đại từ/trạng từ": f"{t('Pronouns', 'đại từ')} / {t('Adverbs', 'trạng từ')}",
    
    # 2. Complex single phrases
    "danh từ đếm được số nhiều": t("Plural Countable Noun", "danh từ đếm được số nhiều"),
    "danh từ không đếm được": t("Uncountable Noun", "danh từ không đếm được"),
    "danh từ đếm được": t("Countable Noun", "danh từ đếm được"),
    "danh từ số nhiều": t("Plural Noun", "danh từ số nhiều"),
    "danh từ số ít": t("Singular Noun", "danh từ số ít"),
    "câu phủ định": t("Negative sentences", "câu phủ định"),
    "câu nghi vấn": t("Interrogative sentences", "câu nghi vấn"),
    "nghi vấn": t("Interrogative sentences", "câu hỏi"),
    "câu khẳng định": t("Affirmative sentences", "câu khẳng định"),
    "văn phong trang trọng": t("Formal English", "văn phong trang trọng"),
    "văn nói": t("Spoken English", "văn nói"),
    "động từ nối": t("Linking Verbs", "động từ nối"),
    "động từ chia số ít": t("Singular Verbs", "động từ số ít"),
    
    # 3. Simple words
    "tính từ": t("Adjective (adj)", "tính từ"),
    "trạng từ": t("Adverb (adv)", "trạng từ"),
    "đại từ": t("Pronoun", "đại từ"),
    "động từ": t("Verb (V)", "động từ"),
    "tân ngữ": t("Object (O)", "tân ngữ"),
    "Tân ngữ": t("Object (O)", "tân ngữ"),
    "chủ ngữ": t("Subject (S)", "chủ ngữ"),
    "Chủ ngữ": t("Subject (S)", "chủ ngữ"),
    "danh từ": t("Noun (N)", "danh từ"),
    
    # 4. Formulations
    "Khẳng định:": "Affirmative:",
    "Phủ định:": "Negative:",
    "Cấu trúc:": "Structure:",
    "Một số dạng bất quy tắc:": "Irregular forms:",
    "Bất quy tắc:": "Irregular forms:"
}

# Use placeholders to avoid overlapping replacements
placeholder_map = {}
for i, (vi, en) in enumerate(translations.items()):
    ph = f"__PH_{i}__"
    placeholder_map[ph] = en
    # Replace in HTML body before applying formatting
    html_body = html_body.replace(vi, ph)

# Restore placeholders
for ph, en in placeholder_map.items():
    html_body = html_body.replace(ph, en)

# Keyword Highlighting
keywords = [
    "MANY", "MUCH", "A LOT OF", "LOTS OF",
    "ALL", "WHOLE", "EVERY", "EACH", "NO", "NONE", "NEITHER", "BOTH",
    "WHOEVER", "WHATEVER", "WHICHEVER", "WHENEVER", "WHEREVER",
    "EACH OTHER", "ONE ANOTHER",
    "SOME-", "ANY-", "NO-", "EVERY-",
    r"-ONE", r"-BODY", r"-THING", r"-WHERE"
]

def highlight(text):
    for kw in keywords:
        escaped_kw = kw
        if not kw.startswith("-"):
            escaped_kw = re.escape(kw)
        pattern = r'(?<!<span class="ch">)\b(' + escaped_kw + r')\b(?![^<]*>)'
        text = re.sub(pattern, r"<span class='ch'>\1</span>", text)
        
    for kw in ["A few", "Few", "A little", "little"]:
        pattern = r'(?<!<span class="ch">)\b(' + re.escape(kw) + r')\b(?![^<]*>)'
        text = re.sub(pattern, r"<span class='ch'>\1</span>", text)
        
    return text

def replace_in_tags(match):
    tag = match.group(1)
    inner = match.group(2)
    closetag = match.group(3)
    new_inner = highlight(inner)
    return f"{tag}{new_inner}{closetag}"

html_body = re.sub(r"(<div class='formula-content'>)(.*?)(</div></div>)", replace_in_tags, html_body, flags=re.DOTALL)
html_body = re.sub(r"(<p>)(.*?)(</p>)", replace_in_tags, html_body, flags=re.DOTALL)
html_body = re.sub(r"(<div class='tip'>)(.*?)(</div>)", replace_in_tags, html_body, flags=re.DOTALL)

html_tail = """
</div>
</body>
</html>
"""

with open(out_file, "w", encoding="utf-8") as f:
    f.write(html_head + html_body + html_tail)

print(f"Grammar theory formatted successfully and saved to {out_file}")
