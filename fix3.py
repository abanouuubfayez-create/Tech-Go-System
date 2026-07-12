with open(r'd:\Tech Go System\app.js', encoding='utf-8') as f:
    content = f.read()

# ── Replace the broken filter bar with a clean tab+search approach ──

OLD_FILTER_BAR = """        h+='<div style="display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px">';
        h+='<div style="display:flex;align-items:center;gap:10px;"><div class="set-sec-title" style="margin:0">🗂 المهام الحالية</div>';
        h+='<select class="global-table-filter" style="margin:0;padding:4px;font-size:11px;min-height:auto;" onchange="tgSortVisibleList(this.value)">'+
           '<option value="">-- فرز حسب --</option><option value="date_desc">الأحدث</option><option value="date_asc">الأقدم</option><option value="prio_desc">الأولوية</option><option value="status_desc">الحالة</option><option value="deadline_asc">تاريخ التسليم</option><option value="emp_asc">الموظف المكلف</option></select>';
        h+='<select id="tgTasksStatusFilter" class="global-table-filter" style="margin:0;padding:4px;font-size:11px;min-height:auto;" onchange="tgApplyTaskFilters()">'+
           '<option value="">كل الحالات</option><option value="1">لم يبدأ</option><option value="2">جاري العمل</option><option value="3">مكتمل</option><option value="late">متأخرة عن التسليم</option></select>';
        h+='<input type="text" id="tgTasksSearch" class="global-table-filter" style="margin:0;padding:4px 10px;font-size:11px;min-height:auto;width:180px" placeholder="ابحث بالعنوان أو التفاصيل أو الموظف..." oninput="tgApplyTaskFilters()">';
        h+='<select id="tgTasksEmpFilter" class="global-table-filter" style="margin:0;padding:4px;font-size:11px;min-height:auto;" onchange="tgApplyTaskFilters()"><option value="">تصفية بالموظف</option></select>';
        h+='<span id="tgTasksCount" style="font-size:10.5px;font-weight:700;color:var(--tx3)"></span></div>';
        h+='<button class="bt bt-d" style="padding:5px 14px;font-size:11px" onclick="tgDeleteAllRecords(\'tasks\', \'المهام\', null, null, loadTasksMgmt)">🗑 حذف الكل</button>';
        h+='</div>';
        h+='<div id="tasksMgmtList"><div class="empty-hint">⏳ جارٍ تحميل المهام...</div></div>';"""

NEW_FILTER_BAR = """        h+='<div style="display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px;flex-wrap:wrap;gap:10px">';
        h+='<div class="set-sec-title" style="margin:0">🗂 المهام الحالية</div>';
        h+='<button class="bt bt-d" style="padding:5px 14px;font-size:11px" onclick="tgDeleteAllRecords(\'tasks\', \'المهام\', null, null, loadTasksMgmt)">🗑 حذف الكل</button>';
        h+='</div>';
        // شريط البحث والفلترة
        h+='<div style="background:var(--w);border:1px solid var(--bd2);border-radius:10px;padding:12px 16px;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:10px;align-items:center">';
        h+='<input type="text" id="tgTasksSearch" style="border:1px solid var(--bd2);border-radius:7px;padding:6px 12px;font-size:12px;font-family:inherit;background:var(--bg);color:var(--tx);flex:1;min-width:200px" placeholder="🔍 ابحث بالعنوان أو الموظف..." oninput="tgFilterTasksMgmt()">';
        h+='<select id="tgTasksSortBy" style="border:1px solid var(--bd2);border-radius:7px;padding:6px 10px;font-size:11px;font-family:inherit;background:var(--bg);color:var(--tx)" onchange="tgFilterTasksMgmt()">';
        h+='<option value="">ترتيب: الأحدث</option><option value="prio">الأولوية: الأعلى</option><option value="deadline">تاريخ التسليم: الأقرب</option><option value="emp">الموظف: أبجدياً</option></select>';
        h+='<div id="tgEmpFilterBtns" style="display:flex;flex-wrap:wrap;gap:6px"></div>';
        h+='</div>';
        // تبويبات الحالة
        h+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px" id="tgStatusTabs">';
        h+='<button class="tg-tab-btn tg-tab-active" data-st="" onclick="tgSetStatusTab(this,\'\')">📋 الكل <span class="tg-tab-cnt" id="tgCntAll"></span></button>';
        h+='<button class="tg-tab-btn" data-st="1" onclick="tgSetStatusTab(this,\'1\')">⏳ لم يبدأ <span class="tg-tab-cnt" id="tgCntNew"></span></button>';
        h+='<button class="tg-tab-btn" data-st="2" onclick="tgSetStatusTab(this,\'2\')">🔵 جاري العمل <span class="tg-tab-cnt" id="tgCntProg"></span></button>';
        h+='<button class="tg-tab-btn" data-st="3" onclick="tgSetStatusTab(this,\'3\')">✅ مكتمل <span class="tg-tab-cnt" id="tgCntDone"></span></button>';
        h+='<button class="tg-tab-btn" data-st="late" onclick="tgSetStatusTab(this,\'late\')">⏰ متأخرة <span class="tg-tab-cnt" id="tgCntLate"></span></button>';
        h+='</div>';
        h+='<div id="tasksMgmtList"><div class="empty-hint">⏳ جارٍ تحميل المهام...</div></div>';"""

count = content.count(OLD_FILTER_BAR)
print(f"Filter bar occurrences: {count}")
content = content.replace(OLD_FILTER_BAR, NEW_FILTER_BAR)

# ── Replace the two renderTasksMgmtList functions with one clean version ──
# First find and replace the employee dropdown rebuild block

OLD_EMP_BLOCK = """    var f = document.getElementById('tgTasksEmpFilter');
    if(f) {
        // اقرأ من الـ state دائماً، وأعد تحديث الـ state من قيمة الـ select الحالية إذا وجدت
        var savedEmp = _tgTaskFilter.emp || (f ? f.value || '' : '');
        _tgTaskFilter.emp = savedEmp;
        var opts = '<option value="">الكل (تصفية بالموظف)</option>';
        Array.from(empSet).sort(function(a,b){return a.localeCompare(b,'ar')}).forEach(function(e) {
            // استخدام القيمة الخام بدون escH لتسهيل المقارنة
            opts += '<option value="'+escH(e)+'"'+(e===savedEmp?' selected':'')+'>'+escH(e)+'</option>';
        });
        f.innerHTML = opts;
    }"""

NEW_EMP_BLOCK = """    // بناء أزرار الموظفين
    var empBtns = document.getElementById('tgEmpFilterBtns');
    if(empBtns) {
        var empSet2 = new Set();
        list.forEach(function(t){ if(t.assignedToName) empSet2.add(t.assignedToName); });
        var savedEmp = _tgTaskFilter.emp || '';
        var btnsH = '<button class="tg-emp-btn'+(savedEmp===''?' tg-emp-active':'')+'" onclick="tgSetEmpFilter(this,\'\')">الكل</button>';
        Array.from(empSet2).sort(function(a,b){return a.localeCompare(b,'ar');}).forEach(function(e){
            btnsH += '<button class="tg-emp-btn'+(e===savedEmp?' tg-emp-active':'')+'" onclick="tgSetEmpFilter(this,\''+e.replace(/'/g,'\\x27')+'\')">'+escH(e)+'</button>';
        });
        empBtns.innerHTML = btnsH;
    }"""

count2 = content.count(OLD_EMP_BLOCK)
print(f"Emp block occurrences: {count2}")
content = content.replace(OLD_EMP_BLOCK, NEW_EMP_BLOCK)

# ── Add CSS for tabs/buttons ──
# Add before the closing of the styles section or append to styles

with open(r'd:\Tech Go System\app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("app.js written.")

# Now patch styles.css
with open(r'd:\Tech Go System\styles.css', encoding='utf-8') as f:
    css = f.read()

TAB_CSS = """
/* ═══════════════════════════════════════════ */
/*  TASK MANAGEMENT TABS & FILTER BUTTONS      */
/* ═══════════════════════════════════════════ */
.tg-tab-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: 1.5px solid var(--bd2);
    background: var(--w); color: var(--tx2);
    transition: all .2s; font-family: inherit;
}
.tg-tab-btn:hover { border-color: var(--nv); color: var(--nv); background: var(--gdl); }
.tg-tab-active {
    background: var(--nv) !important; color: #fff !important;
    border-color: var(--nv) !important;
    box-shadow: 0 4px 12px rgba(15,23,42,.2);
}
.tg-tab-cnt {
    background: rgba(255,255,255,.25); color: inherit;
    font-size: 10px; font-weight: 800; padding: 1px 7px;
    border-radius: 10px; min-width: 18px; text-align: center;
}
.tg-tab-active .tg-tab-cnt { background: rgba(255,255,255,.3); }
.tg-emp-btn {
    padding: 4px 12px; border-radius: 14px; font-size: 11px; font-weight: 700;
    cursor: pointer; border: 1px solid var(--bd2);
    background: var(--bg); color: var(--tx2);
    transition: all .15s; font-family: inherit;
}
.tg-emp-btn:hover { border-color: var(--gd); color: var(--nv); }
.tg-emp-active {
    background: var(--gd) !important; color: var(--nv) !important;
    border-color: var(--gd) !important; font-weight: 800;
}
[data-theme='dark'] .tg-tab-btn { background: var(--w); color: var(--tx2); border-color: var(--bd2); }
[data-theme='dark'] .tg-tab-active { background: var(--gd) !important; color: var(--nv) !important; border-color: var(--gd) !important; }
[data-theme='dark'] .tg-emp-btn { background: var(--bg); color: var(--tx2); border-color: var(--bd2); }
[data-theme='dark'] .tg-emp-active { background: var(--gd) !important; color: var(--nv) !important; }
"""

if '.tg-tab-btn' not in css:
    css += TAB_CSS
    with open(r'd:\Tech Go System\styles.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("styles.css updated with tab CSS")
else:
    print("Tab CSS already in styles.css")
