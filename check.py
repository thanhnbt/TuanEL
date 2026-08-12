import json
import re

files = [
    "f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t1.js",
    "f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t2.js",
    "f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t3.js",
    "f:/DigiIn/lab/AI/Gemini/TuanEL/lessons/2026-08-07-grammar-practice/t4.js",
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        # Find all objects in the questions array using regex
        matches = re.findall(r'\{[^{}]*opts:\s*\[(.*?)\],\s*ans:\s*(\d+)[^{}]*\}', content, re.IGNORECASE | re.DOTALL)
        for idx, match in enumerate(matches):
            opts_str = match[0]
            ans_str = match[1]
            ans = int(ans_str)
            # Count options by splitting by comma (rough estimate, but sufficient to find missing options)
            opts_count = len(opts_str.split(','))
            if ans < 0 or ans >= opts_count:
                print(f"Error in {f}, Question index {idx}: ans {ans} is out of bounds for {opts_count} options. Opts str: {opts_str}")
print("Check complete.")
