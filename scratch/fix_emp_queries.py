with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace employee queries that included tech_admin with strict employee-only query
old_query = "db.collection('users').where('role','in',['employee','tech_admin']).get()"
new_query = "db.collection('users').where('role','==','employee').get()"

content = content.replace(old_query, new_query)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated all employee queries to strictly query role=='employee'.")
