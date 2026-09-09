import json, sys
sys.stdout.reconfigure(encoding='utf-8')
with open('C:/Users/abano/.gemini/antigravity-ide/brain/8d4e4657-88bc-4d73-9943-2081122e2d83/.system_generated/logs/transcript.jsonl', encoding='utf-8') as f:
    for line in f:
        d = json.loads(line)
        idx = d.get('step_index', 0)
        if 293 <= idx <= 330:
            stype = d.get('type')
            content = d.get('content')
            calls = d.get('tool_calls')
            print(f"=== STEP {idx} [{stype}] ===")
            if content:
                print(str(content)[:400])
            if calls:
                print("TOOL CALLS:", calls)
