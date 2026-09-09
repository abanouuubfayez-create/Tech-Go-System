import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk('.'):
    if '.git' in root: continue
    for f in files:
        if f.endswith(('.html', '.js', '.py')):
            path = os.path.join(root, f)
            content = open(path, encoding='utf-8', errors='ignore').read()
            file_inputs = re.findall(r'<input[^>]+type=[\'"]file[\'"][^>]*>', content)
            if file_inputs:
                print(f"{path}: found {len(file_inputs)} file inputs:")
                for inp in file_inputs:
                    print("  ", inp[:120])
