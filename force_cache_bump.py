import re
import os
import time

timestamp = int(time.time())
v_str = f"?v={timestamp}"

# Update html files
html_files = ['index.html', 'employee.html', 'login.html', 'attendance.html', 'setup.html']
for fn in html_files:
    if os.path.exists(fn):
        with open(fn, 'r', encoding='utf-8') as f:
            content = f.read()
        content = re.sub(r'\?v=\d+', v_str, content)
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {fn} with {v_str}")

# Update sw.js CACHE_NAME
if os.path.exists('sw.js'):
    with open('sw.js', 'r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = re.sub(r"const CACHE_NAME = '[^']+'", f"const CACHE_NAME = 'techgo-v{timestamp}-force-purge'", sw_content)
    with open('sw.js', 'w', encoding='utf-8') as f:
        f.write(sw_content)
    print(f"Updated sw.js CACHE_NAME to techgo-v{timestamp}-force-purge")

# Update bump_version.py for future use
bump_py = f"""import re
import os
import time

new_version = f"?v={{int(time.time())}}"

for filename in ['index.html', 'employee.html', 'login.html', 'attendance.html', 'setup.html']:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'\\?v=\\d+', new_version, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Bumped version to {{new_version}}")
"""
with open('bump_version.py', 'w', encoding='utf-8') as f:
    f.write(bump_py)
print("Updated bump_version.py to use dynamic timestamp")
