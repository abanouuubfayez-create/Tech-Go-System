import os
import re

workspace_dir = r"d:\Tech Go System"

def clean_conflict_markers_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return

    if '<<<<<<<' not in content:
        return

    pattern = re.compile(r'<<<<<<< [^\n]*\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n', re.DOTALL)

    def replacer(match):
        part_a = match.group(1)
        part_b = match.group(2)
        if part_a.strip() == part_b.strip():
            return part_a
        # Choose part_b or part_a cleanly
        return part_b if part_b.strip() else part_a

    new_content = pattern.sub(replacer, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Cleaned conflict markers in: {filepath}")

for root, dirs, files in os.walk(workspace_dir):
    if '.git' in root or '.vscode' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.css', '.rules', '.txt', '.py', '.json')):
            clean_conflict_markers_in_file(os.path.join(root, file))

print("Conflict marker cleanup finished.")
