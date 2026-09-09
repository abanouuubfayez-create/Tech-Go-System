import sys, re
sys.stdout.reconfigure(encoding='utf-8')
text = open('employee.html', encoding='utf-8').read()
pages = set(re.findall(r'data-pg=[\'"]([^\'"]+)[\'"]', text))
drawers = set(re.findall(r'data-drawer=[\'"]([^\'"]+)[\'"]', text))
print('Pages:', pages)
print('Drawers:', drawers)
