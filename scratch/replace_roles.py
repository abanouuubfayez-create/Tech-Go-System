import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("أدمن تقني", "أدمن")
content = content.replace("أدمن إداري", "أدمن")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Role labels updated in app.js successfully.")
