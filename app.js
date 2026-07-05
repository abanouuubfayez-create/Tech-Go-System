// ─── STATE & INIT ─────────────────────────────────────────────────────────
var CN   = "شركة تيك جو";
var MGRS = { admin:'', exec:'', tech:'' };
var EMPLOYEES = [];
var PMGMT_EMPLOYEES = []; // موظفون (uid+name+email) مستخدمون في صفحة "إدارة المشاريع"
var LOGO_URI = "data:image/png;base64,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";

(function init(){
    var c=localStorage.getItem('tg_cn');   if(c) CN=c;
    var m=localStorage.getItem('tg_mgrs'); if(m) try{MGRS=JSON.parse(m);}catch(e){}
    var e=localStorage.getItem('tg_employees'); if(e) try{EMPLOYEES=JSON.parse(e);}catch(err){}
    refreshEmpDatalist();

    // Auto-expand textareas
    document.addEventListener('input', function(e) {
        if(e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = (e.target.scrollHeight) + 'px';
        }
    });
})();

// ─── TITLES ───────────────────────────────────────────────────────────────
var T={
    dash:"لوحة التحكم", emp:"ملف بيانات الموظف", leave:"طلب إجازة",
    perm:"إذن حضور / انصراف", delay:"التماس تعديل موعد الحضور", la:"سجل الإجازة السنوية",
    lb:"سجل الإجازة العارضة", lc:"سجل الأعياد والمناسبات",
    ld:"سجل الغياب بالخصم", notice:"نموذج لفت نظر", warn:"خطاب إنذار",
    inv:"محضر تحقيق", exp:"شهادة خبرة", clr:"إخلاء طرف",
    gen:"خطاب إداري عام",
    task:"تكليف بمهمة عمل", sal:"شهادة راتب", att:"الحضور والانصراف",
    comp:"الشكاوى والمقترحات", set:"تخصيص النظام", proj:"نموذج إدارة المشروع",
    mexp:"شيت المصروفات الشهري",
    res:"طلب استقالة", promo:"قرار ترقية", contract:"عقد عمل", raise:"زيادة راتب / علاوة",
    staff:"متابعة الموظفين", pmgmt:"إدارة المشاريع", account:"حسابي",
    tasksmgmt:"توزيع المهام", announcements:"إدارة الإعلانات", empdocs:"ملفات الموظفين"
};

// ─── DOCUMENT NUMBERING ───────────────────────────────────────────────────
var DCODES={
    emp:'EMP', leave:'LV', perm:'PM', delay:'DLY', la:'LA', lb:'LB', lc:'LC', ld:'LD',
    notice:'NTC', warn:'WRN', inv:'INV', exp:'EXP', clr:'CLR', gen:'GEN',
    task:'TSK', sal:'SAL', comp:'CMP', proj:'PRJ', mexp:'MEXP',
    res:'RES', promo:'PRM', contract:'CTR', raise:'RAI',
    wkr:'WKR', ach:'ACH', req:'REQ'
};
function genDocNum(type){
    if(!type||!DCODES[type])return '';
    var code=DCODES[type], yr=new Date().getFullYear();
    var key='tg_seq_'+type+'_'+yr;
    var seq=(parseInt(localStorage.getItem(key))||0)+1;
    localStorage.setItem(key,seq);
    return 'TG-'+yr+'-'+code+'-'+String(seq).padStart(3,'0');
}
function escH(s){ return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ─── نافذة تأكيد عامة (Modal) ─────────────────────────────────────────────
// tgConfirmModal(title, bodyHtml, [{label, cls, onClick}, ...])
function tgConfirmModal(title, bodyHtml, buttons){
    tgCloseModal();
    var bd=document.createElement('div');
    bd.className='tg-modal-backdrop';
    bd.id='tgModalBackdrop';
    bd.onclick=function(e){ if(e.target===bd) tgCloseModal(); };
    var btnsHtml='';
    buttons.forEach(function(b,i){
        btnsHtml+='<button class="bt '+(b.cls||'bt-o')+'" id="tgModalBtn'+i+'">'+b.label+'</button>';
    });
    bd.innerHTML='<div class="tg-modal">'+
        '<div class="tg-modal-title">'+title+'</div>'+
        '<div class="tg-modal-body">'+bodyHtml+'</div>'+
        '<div class="tg-modal-actions">'+btnsHtml+'</div>'+
        '</div>';
    document.body.appendChild(bd);
    buttons.forEach(function(b,i){
        document.getElementById('tgModalBtn'+i).onclick=function(){ b.onClick&&b.onClick(); };
    });
}
function tgCloseModal(){
    var bd=document.getElementById('tgModalBackdrop');
    if(bd) bd.remove();
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────
// الصفحات التي يمكن للأدمن التقني الوصول إليها
var TECH_ALLOWED = ['pmgmt','tasksmgmt','livetrack','account','announcements'];

function hasUnsavedText() {
    var p = document.querySelector('.pg.a, .emp-pg.a');
    if(!p) return false;
    var chatInputs = p.querySelectorAll('.pj-chat-input-row input');
    for(var i=0; i<chatInputs.length; i++) {
        if(chatInputs[i].value.trim() !== '') return true;
    }
    var textareas = p.querySelectorAll('textarea:not([readonly])');
    for(var i=0; i<textareas.length; i++) {
        if(textareas[i].id !== 'tgChatInput' && textareas[i].value.trim() !== '') return true;
    }
    return false;
}
function clearUnsavedText() {
    var p = document.querySelector('.pg.a, .emp-pg.a');
    if(!p) return;
    var chatInputs = p.querySelectorAll('.pj-chat-input-row input');
    for(var i=0; i<chatInputs.length; i++) chatInputs[i].value = '';
    var textareas = p.querySelectorAll('textarea:not([readonly])');
    for(var i=0; i<textareas.length; i++) {
        if(textareas[i].id !== 'tgChatInput') textareas[i].value = '';
    }
}

function go(id, nav, force){
    if(!force && hasUnsavedText()){
        tgConfirmModal('مغادرة الصفحة؟', 'يوجد نص غير محفوظ. هل أنت متأكد من المغادرة وتجاهل التغييرات؟', [
            {label: 'بقاء', cls: 'bt-o', onClick: tgCloseModal},
            {label: 'مغادرة', cls: 'bt-d', onClick: function(){ tgCloseModal(); clearUnsavedText(); go(id, nav, true); }}
        ]);
        return;
    }
    // قيود الأدمن التقني
    if(TG_USER && TG_USER.role==='tech_admin' && TECH_ALLOWED.indexOf(id)===-1){
        tgConfirmModal('🔒 وصول محدود',
            'الأدمن التقني يمكنه فقط الوصول إلى صفحات الإدارة التقنية للمشاريع والمهام والمتابعة اللحظية.<br>تواصل مع الإدارة لو احتجت صلاحيات أعلى.',
            [{label:'حسناً', cls:'bt-p', onClick:tgCloseModal}]);
        return;
    }
    document.querySelectorAll(".S-i").forEach(function(e){e.classList.remove("a")});
    if(nav)nav.classList.add("a");
    else{var el=document.querySelector('.S-i[onclick*="\''+id+'\'"]');if(el)el.classList.add("a")}
    document.querySelectorAll(".pg").forEach(function(e){e.classList.remove("a")});
    document.getElementById("pg-"+id).classList.add("a");
    document.getElementById("pT").innerText=T[id]||id;
    if(window.innerWidth<=900)document.getElementById("sb").classList.remove("opn");
    var c=document.getElementById("pg-"+id);
    if(id!=="dash"&&c.innerHTML.trim()===""){load(id,c);upCN();setD(c)}
    if(typeof onPageChange === "function") onPageChange(id);
}
function ts(b){var p=b.parentNode;p.querySelectorAll(".stb").forEach(function(x){x.classList.remove("a")});b.classList.add("a")}
function sct(c){c.parentNode.querySelectorAll(".ctc").forEach(function(x){x.classList.remove("sel")});c.classList.add("sel")}
function spr(p){p.parentNode.querySelectorAll(".ppl").forEach(function(x){x.classList.remove("a")});p.classList.add("a")}

// ─── Sidebar Search & Quick Nav ──────────────────────────────────────────
function tgToggleNavGroup(el) {
    var group = el.parentElement;
    group.classList.toggle('open');
}

function sbFilterNav(val){
    var v = (val||'').toLowerCase().trim();
    var groups = document.querySelectorAll('#sidebarNav .sb-group');
    var noRes = document.getElementById('sbNoResults');
    var hasAnyGlobal = false;
    
    if(!v) {
        groups.forEach(function(g){
            g.style.display = '';
            var items = g.querySelectorAll('.S-i');
            items.forEach(function(el){ el.style.display = ''; });
        });
        if(noRes) noRes.style.display = 'none';
        return;
    }
    
    groups.forEach(function(g){
        var items = g.querySelectorAll('.S-i');
        var hasAnyInGroup = false;
        items.forEach(function(el){
            var text = el.textContent.toLowerCase();
            if(text.indexOf(v) > -1) {
                el.style.display = '';
                hasAnyInGroup = true;
                hasAnyGlobal = true;
            } else {
                el.style.display = 'none';
            }
        });
        if(hasAnyInGroup) {
            g.style.display = '';
            g.classList.add('open');
        } else {
            g.style.display = 'none';
        }
    });
    
    if(noRes) noRes.style.display = hasAnyGlobal ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function(){
    var sb = document.getElementById('sb');
    var btn = document.getElementById('sbScrollTop');
    if(sb && btn) {
        sb.addEventListener('scroll', function(){
            if(sb.scrollTop > 150) btn.classList.add('vis');
            else btn.classList.remove('vis');
        });
    }
});

// ─── Toast Notification Helper ────────────────────────────────────────────
function tgToast(msg, type){
    var t=document.createElement('div');
    t.className='tg-toast'+(type==='ok'?' toast-ok':type==='err'?' toast-err':'');
    t.textContent=msg;
    document.body.appendChild(t);
    setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); }, 3100);
}

// ─── تقييد صلاحيات الأدمن التقني ────────────────────────────────────────
function applyTechAdminRestrictions(u){
    if(!u || u.role !== 'tech_admin') return;
    // أخفِ بنود الشريط الجانبي غير المسموح بها للأدمن التقني
    var allowed = TECH_ALLOWED;
    document.querySelectorAll('.sb-group').forEach(function(g){
        var items = g.querySelectorAll('.S-i');
        var hasVisible = false;
        items.forEach(function(el){
            var onclick = el.getAttribute('onclick') || '';
            var allowed_item = allowed.some(function(id){ 
                if(id === 'livetrack' && onclick.indexOf('goLiveTrack') > -1) return true;
                return onclick.indexOf("'"+id+"'")>-1||onclick.indexOf('"'+id+'"')>-1; 
            });
            if(!allowed_item && onclick.indexOf('tgLogout')===-1){ el.style.display='none'; }
            else { hasVisible = true; }
        });
        if(!hasVisible) g.style.display = 'none';
    });
}

// ─── إعادة ضبط النظام (للأدمن الرئيسي فقط) ───────────────────────────────
function resetSystem(){
    if(!TG_USER || TG_USER.role !== 'admin'){
        tgToast('هذه العملية للأدمن الرئيسي فقط.','err'); return;
    }
    tgConfirmModal(
        '⚠️ إعادة ضبط النظام',
        '<div style="color:var(--no);font-weight:700;margin-bottom:10px">تحذير: هذا الإجراء سيحذف كل البيانات الديناميكية بشكل نهائي.</div>'+
        '<div style="font-size:11px;color:var(--tx3);line-height:2">سيتم حذف: المشاريع · المهام · التقارير الأسبوعية · الإنجازات · الطلبات · رسائل الشات · التعليقات<br><strong>لن يتم حذف</strong> حسابات المستخدمين أو إعدادات النظام.</div>',
        [
            { label:'❌ إلغاء', cls:'bt-o', onClick: function(){} },
            { label:'🗑 تأكيد الحذف', cls:'bt-d', onClick: function(){
                var batch = db.batch();
                var collections = ['projects','tasks','weeklyReports','achievements','requests','chatMessages','projectComments','formRequests'];
                var proms = collections.map(function(col){
                    return db.collection(col).get().then(function(snap){
                        snap.forEach(function(doc){ batch.delete(doc.ref); });
                    });
                });
                Promise.all(proms).then(function(){ return batch.commit(); }).then(function(){
                    tgToast('✅ تم إعادة ضبط النظام بنجاح','ok');
                    loadDashboardSummary();
                }).catch(function(err){
                    tgToast('❌ تعذرت إعادة الضبط: '+err.message,'err');
                });
            }}
        ]
    );
}

function updTaskSigs(rb){
    var el=document.getElementById('task-approver-sig');
    if(!el)return;
    var isTech=rb.value==='tech';
    el.outerHTML=_sig(
        isTech?'المدير التقني':'المدير الإداري / مدير المشروعات',
        isTech?MGRS.tech:MGRS.admin,
        isTech?'التكليف التقني والمتابعة':'الموافقة والاعتماد',
        'task-approver-sig'
    );
}

function updGenSig(rb){
    var el=document.getElementById('gen-issuer-sig');
    if(!el)return;
    var map={admin:['المدير الإداري / مدير المشروعات',MGRS.admin],tech:['المدير التقني',MGRS.tech],exec:['المدير التنفيذي',MGRS.exec]};
    var v=map[rb.value]||map.admin;
    el.outerHTML=_sigFL(v[0],v[1],'اعتماد وإصدار','gen-issuer-sig');
}

function saveSt(){
    var n=document.getElementById("sn").value;
    if(n){CN=n;localStorage.setItem('tg_cn',CN);}
    MGRS.admin=(document.getElementById("sm_admin").value||'').trim();
    MGRS.exec =(document.getElementById("sm_exec").value||'').trim();
    MGRS.tech =(document.getElementById("sm_tech").value||'').trim();
    localStorage.setItem('tg_mgrs',JSON.stringify(MGRS));
    upCN();
    // Clear cached forms so names refresh on next visit
    document.querySelectorAll('.pg').forEach(function(p){
        if(p.id!=='pg-dash'&&p.id!=='pg-set')p.innerHTML='';
    });
    alert("✅ تم حفظ الإعدادات\nسيتم تحديث أسماء المديرين عند فتح النماذج.");
}
function upCN(){document.querySelectorAll(".dcn").forEach(function(e){e.innerText=CN})}
function resetSeq(){
    if(!confirm("⚠️ هل تريد تصفير كل أرقام التسلسل للمستندات؟\nسيبدأ ترقيم كل النماذج من 001 من جديد.\nلا يمكن التراجع عن هذا الإجراء."))return;
    var rm=[];
    for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('tg_seq_')===0)rm.push(k);}
    rm.forEach(function(k){localStorage.removeItem(k);});
    alert("✅ تم تصفير أرقام المستندات\nستبدأ كل النماذج من جديد بالرقم 001.");
}
// ─── قائمة الموظفين المشتركة (إدخال مرة واحدة → اختيار من دروب ليست) ──────
function refreshEmpDatalist(){
    var dl=document.getElementById('tgEmpDL');
    if(!dl)return;
    EMPLOYEES.sort(function(a,b){return a.localeCompare(b,'ar');});
    dl.innerHTML=EMPLOYEES.map(function(n){return '<option value="'+escH(n)+'"></option>';}).join('');
}
function saveEmployees(){
    localStorage.setItem('tg_employees',JSON.stringify(EMPLOYEES));
    refreshEmpDatalist();
}
function addEmployeeName(name){
    name=(name||'').trim();
    if(!name)return;
    if(EMPLOYEES.indexOf(name)===-1){
        EMPLOYEES.push(name);
        saveEmployees();
    }
}
function delEmployeeName(name){
    if(!confirm('حذف "'+name+'" من قائمة الموظفين؟'))return;
    var i=EMPLOYEES.indexOf(name);
    if(i>-1){EMPLOYEES.splice(i,1);saveEmployees();}
    renderEmpListSec();
}
function addEmpFromSettings(){
    var inp=document.getElementById('newEmpName');
    if(!inp)return;
    var name=(inp.value||'').trim();
    if(!name){inp.focus();return;}
    addEmployeeName(name);
    inp.value='';
    renderEmpListSec();
    inp.focus();
}
function empListSecHTML(){
    var h='<div class="set-sec" id="empListSec"><div class="set-sec-title">👥 قائمة الموظفين</div>';
    h+='<div class="set-hint">أضف اسم كل موظف هنا مرة واحدة، وبعدها سيظهر تلقائياً كخيار دروب ليست (Autocomplete) في كل حقول "اسم الموظف" بجميع النماذج — مع إمكانية الكتابة اليدوية أيضاً لأي اسم جديد.</div>';
    h+='<div class="fr fr2" style="margin-top:10px"><div class="fg" style="margin:0"><input type="text" id="newEmpName" placeholder="اكتب اسم الموظف الجديد..." onkeydown="if(event.key===\'Enter\'){event.preventDefault();addEmpFromSettings();}"></div>'+
       '<button class="bt bt-p" style="align-self:flex-start" onclick="addEmpFromSettings()">➕ إضافة للقائمة</button></div>';
    if(EMPLOYEES.length){
        h+='<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">';
        EMPLOYEES.slice().sort(function(a,b){return a.localeCompare(b,'ar');}).forEach(function(n){
            h+='<div class="code-chip" style="display:flex;align-items:center;gap:6px"><span class="code-lbl">'+escH(n)+'</span>'+
               '<span onclick="delEmployeeName(\''+n.replace(/'/g,"\\'")+'\')" style="cursor:pointer;color:#c0392b;font-weight:800" title="حذف">✕</span></div>';
        });
        h+='</div>';
    }else{
        h+='<div class="set-hint" style="margin-top:10px">لا يوجد أي موظف في القائمة بعد.</div>';
    }
    h+='</div>';
    return h;
}
function renderEmpListSec(){
    var el=document.getElementById('empListSec');
    if(!el)return;
    el.outerHTML=empListSecHTML();
}

// ─── نظرة عامة سريعة على لوحة التحكم (تكامل حي بين الموظفين/المشاريع/الطلبات) ──
function loadDashboardSummary(){
    var box=document.getElementById('dashSummary');
    if(!box)return;
    Promise.all([
        db.collection('users').where('role','in',['employee','tech_admin']).get(),
        db.collection('projects').get(),
        db.collection('requests').where('status','==','pending').get()
    ]).then(function(res){
        var empCount=res[0].size, projCount=res[1].size, pendingCount=res[2].size;
        box.innerHTML=
            '<div class="DC" onclick="go(\'staff\')" style="cursor:pointer"><div class="di">👥</div><div class="dt2">'+empCount+' موظف</div><div class="dd">إجمالي حسابات الموظفين المسجّلة</div></div>'+
            '<div class="DC" onclick="go(\'pmgmt\')" style="cursor:pointer"><div class="di">📁</div><div class="dt2">'+projCount+' مشروع</div><div class="dd">إجمالي المشاريع الحالية</div></div>'+
            '<div class="DC" onclick="go(\'staff\')" style="cursor:pointer'+(pendingCount?';border:2px solid var(--gd)':'')+'"><div class="di">⏳</div><div class="dt2">'+pendingCount+' طلب معلّق</div><div class="dd">بانتظار موافقة أو رفض الأدمن</div></div>';
    }).catch(function(){ box.innerHTML=''; });
    // بدء مراقبة إشعارات الأدمن من الموظفين
    startAdminNotifications();
    // إخفاء عناصر القائمة للأدمن المساعد
    applyAssistantAdminRestrictions();
}

// ─── تقييد القائمة الجانبية للأدمن المساعد ──────────────────────────────
function applyAssistantAdminRestrictions(){
    if(!TG_USER || TG_USER.role !== 'tech_admin') return;
    // إخفاء كل عناصر القائمة التي لا علاقة لها بالمشاريع
    document.querySelectorAll('.S-n .S-i').forEach(function(el){
        var onclick = el.getAttribute('onclick') || '';
        var allowed = TECH_ALLOWED.some(function(id){ return onclick.indexOf("'"+id+"'") > -1; });
        if(!allowed && onclick.indexOf('tgLogout') === -1) {
            el.style.display = 'none';
        }
    });
    document.querySelectorAll('.S-n .S-s').forEach(function(el){
        // إخفاء الفواصل التي لا يتبعها عناصر ظاهرة
        var next = el.nextElementSibling;
        var hasVisible = false;
        while(next && !next.classList.contains('S-s')){
            if(next.style.display !== 'none') { hasVisible = true; break; }
            next = next.nextElementSibling;
        }
        if(!hasVisible) el.style.display = 'none';
    });
    // عرض رسالة ترحيب مخصصة
    var subEl = document.querySelector('.S-h .sub');
    if(subEl) subEl.textContent = 'أدمن تقني — إدارة المشاريع';
}

// ─── إشعارات الأدمن اللحظية من الموظفين (طلبات + تقارير + مشاريع جديدة) ───
var _adminNotifUnsub = null;
var _adminNotifAudioCtx = null;
var _adminNotifAudioUnlocked = false;
var _adminNotifInitialDone = false;

function startAdminNotifications(){
    if(_adminNotifUnsub) return;
    // فك قفل الصوت عند أول تفاعل
    var unlockFn = function(){
        if(_adminNotifAudioUnlocked) return;
        try{
            _adminNotifAudioCtx = _adminNotifAudioCtx || new (window.AudioContext||window.webkitAudioContext)();
            if(_adminNotifAudioCtx.state==='suspended') _adminNotifAudioCtx.resume();
            _adminNotifAudioUnlocked = true;
        }catch(e){}
        document.removeEventListener('click', unlockFn);
        document.removeEventListener('keydown', unlockFn);
    };
    document.addEventListener('click', unlockFn);
    document.addEventListener('keydown', unlockFn);

    // مراقبة الطلبات الجديدة (requests)
    var lastReqTime = Date.now();
    db.collection('requests').orderBy('createdAt','desc').limit(30)
        .onSnapshot(function(snap){
            if(!_adminNotifInitialDone){ _adminNotifInitialDone=true; return; }
            var hasNew = snap.docChanges().some(function(ch){
                if(ch.type !== 'added') return false;
                var d = ch.doc.data();
                var t = (d.createdAt && d.createdAt.toMillis) ? d.createdAt.toMillis() : 0;
                return t > lastReqTime;
            });
            if(hasNew){
                lastReqTime = Date.now();
                playAdminNotif();
                incrementAdminBadge('notif-req-badge', 'notif-req-badge-sb');
                // Push Notification للأدمن
                if(typeof tgShowNotification === 'function'){
                    tgShowNotification('📨 طلب جديد', 'وصلك طلب جديد من أحد الموظفين.');
                }
            }
        });

    // مراقبة التقارير الأسبوعية الجديدة
    var lastWkrTime = Date.now();
    db.collection('weeklyReports').orderBy('createdAt','desc').limit(30)
        .onSnapshot(function(snap){
            snap.docChanges().forEach(function(ch){
                if(ch.type !== 'added') return;
                var d = ch.doc.data();
                var t = (d.createdAt && d.createdAt.toMillis) ? d.createdAt.toMillis() : 0;
                if(t > lastWkrTime){
                    lastWkrTime = Date.now();
                    playAdminNotif();
                    incrementAdminBadge('notif-wkr-badge', 'notif-wkr-badge-sb');
                    // Push Notification للأدمن
                    if(typeof tgShowNotification === 'function'){
                        tgShowNotification('📝 تقرير أسبوعي جديد', 'تم إرسال تقرير أسبوعي جديد من موظف.');
                    }
                }
            });
        });
}

function playAdminNotif(){
    try{
        _adminNotifAudioCtx = _adminNotifAudioCtx || new (window.AudioContext||window.webkitAudioContext)();
        if(_adminNotifAudioCtx.state==='suspended') _adminNotifAudioCtx.resume();
        var ctx = _adminNotifAudioCtx;
        var now = ctx.currentTime;
        // نغمتان متتاليتان: صول + دو
        _adminTone(ctx, 784.00, now,       0.18, 0.14);
        _adminTone(ctx, 523.25, now+0.15,  0.22, 0.18);
    }catch(e){}
}
function _adminTone(ctx, freq, start, dur, vol){
    var osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(vol, start+0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start+dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(start); osc.stop(start+dur+0.05);
}
function incrementAdminBadge(badgeId, sbBadgeId){
    [badgeId, sbBadgeId].forEach(function(id){
        var el = document.getElementById(id);
        if(!el) return;
        var cur = parseInt(el.textContent) || 0;
        el.textContent = String(cur + 1);
        el.style.display = 'flex';
    });
}
function clearAdminBadge(badgeId, sbBadgeId){
    [badgeId, sbBadgeId].forEach(function(id){
        var el = document.getElementById(id);
        if(!el) return;
        el.textContent = '0';
        el.style.display = 'none';
    });
}

// ─── متابعة الموظفين (بيانات حية من Firebase Firestore) ──────────────────
function loadStaffOverview(){
    var box=document.getElementById('staffList');
    if(!box)return;
    db.collection('users').where('role','in',['employee','tech_admin']).get().then(function(snap){
        if(snap.empty){
            box.innerHTML='<div class="empty-hint">لا يوجد موظفون مسجّلون بعد. أنشئ أول حساب من الأعلى.</div>';
            return;
        }
        var employees=[];
        snap.forEach(function(doc){employees.push(Object.assign({uid:doc.id},doc.data()));});
        // مزامنة قائمة أسماء الموظفين الحقيقيين (حسابات الدخول) مع قائمة الأوتوكومبليت في كل النماذج
        employees.forEach(function(emp){ if(emp.name) addEmployeeName(emp.name); });
        renderEmpListSec();
        var proms=employees.map(function(emp){
            return Promise.all([
                db.collection('projects').where('assignees','array-contains',emp.uid).get(),
                db.collection('achievements').where('uid','==',emp.uid).get(),
                db.collection('requests').where('uid','==',emp.uid).get(),
                db.collection('weeklyReports').where('uid','==',emp.uid).get()
            ]).then(function(res){
                emp.projects=res[0].docs.map(function(d){return Object.assign({id:d.id},d.data());});
                emp.achievements=res[1].docs.map(function(d){return Object.assign({id:d.id},d.data());})
                    .sort(function(a,b){return (a.date<b.date)?1:-1;});
                emp.requests=res[2].docs.map(function(d){return Object.assign({id:d.id},d.data());})
                    .sort(function(a,b){
                        var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
                        var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
                        return bm-am;
                    });
                emp.weeklyReports=res[3].docs.map(function(d){return Object.assign({id:d.id},d.data());})
                    .sort(function(a,b){return (a.weekStart<b.weekStart)?1:-1;});
                return emp;
            });
        });
        Promise.all(proms).then(renderStaffList).catch(function(err){
            box.innerHTML='<div class="empty-hint" style="color:var(--no)">تعذر تحميل بيانات المشاريع/الطلبات: '+escH(err.message)+'</div>';
        });
    }).catch(function(err){
        box.innerHTML='<div class="empty-hint" style="color:var(--no)">تعذر تحميل بيانات الموظفين: '+escH(err.message)+'</div>';
    });
}
function badgeClassForStatus(s){
    if(s==='مكتمل')return 'badge-done';
    if(s==='جاري العمل')return 'badge-progress';
    return '';
}
function badgeClassForReq(s){
    if(s==='approved')return 'badge-approved';
    if(s==='rejected')return 'badge-rejected';
    return 'badge-pending';
}
function reqStatusLabel(s){
    if(s==='approved')return 'موافق عليه';
    if(s==='rejected')return 'مرفوض';
    return 'قيد المراجعة';
}
function renderStaffList(list){
    var box=document.getElementById('staffList');
    if(!box)return;
    window._staffEmpCache=list;
    var countEl=document.getElementById('staffCount');
    if(countEl)countEl.textContent=list.length+' موظف';
    var h='';
    list.forEach(function(emp,idx){
        var pending=emp.requests.filter(function(r){return r.status==='pending';}).length;
        var avgProg=emp.projects.length?Math.round(emp.projects.reduce(function(s,p){
            var pm=(p.progressMap&&p.progressMap[emp.uid])?p.progressMap[emp.uid].progress:0;
            return s+(pm||0);
        },0)/emp.projects.length):0;
        var searchKey=((emp.name||'')+' '+(emp.email||'')).toLowerCase();
        h+='<div class="staff-card'+(emp.disabled?' is-disabled':'')+'" id="staffCard'+idx+'" data-search="'+escH(searchKey)+'">';
        h+='<div class="staff-card-h" onclick="toggleStaffCard('+idx+')">'+
           '<div><div class="staff-name-row"><span class="staff-name">'+escH(emp.name||emp.email)+'</span>'+
           (emp.jobTitle?'<span class="badge" style="background:var(--gd);color:#1b2a4a">'+escH(emp.jobTitle)+'</span>':'')+
           (emp.disabled?'<span class="badge badge-disabled">🚫 معطّل</span>':'<span class="badge badge-active">✅ نشط</span>')+
           '</div><div class="staff-email">'+escH(emp.email||'')+'</div></div>'+
           '<div class="staff-stats">'+
           '<span class="staff-stat">📁 '+emp.projects.length+' مشروع</span>'+
           '<span class="staff-stat">📊 متوسط تقدم '+avgProg+'%</span>'+
           (emp.role === 'tech_admin' ? '' :
               '<span class="staff-stat">📆 '+emp.weeklyReports.length+' تقرير أسبوعي</span>'+
               '<span class="staff-stat">🏆 '+emp.achievements.length+' إنجاز</span>'+
               (pending?('<span class="staff-stat pending">⏳ '+pending+' طلب معلّق</span>'):'<span class="staff-stat">✅ لا طلبات معلّقة</span>')
           )+
           '</div></div>';
        h+='<div class="staff-card-body">';

        h+='<div class="staff-actions-row">'+
           '<button class="bt bt-o" onclick="event.stopPropagation();toggleEmpNameEdit('+idx+')">✏️ تعديل الاسم</button>'+
           '<button class="bt bt-o" onclick="event.stopPropagation();toggleEmpJobEdit('+idx+')">🏷 تعديل المسمى الوظيفي</button>'+
           '<button class="bt '+(emp.disabled?'bt-p':'bt-o')+'" onclick="event.stopPropagation();toggleEmpDisabled(\''+emp.uid+'\','+(!!emp.disabled)+')">'+
           (emp.disabled?'✅ إعادة تفعيل الحساب':'🚫 تعطيل الحساب')+'</button>'+
           '<button class="bt bt-d" onclick="event.stopPropagation();openDeleteEmpModal(\''+emp.uid+'\','+idx+')">🗑 حذف الموظف</button>'+
           '</div>'+
           '<div class="emp-inline-edit" id="empNameEdit'+idx+'" style="display:none">'+
           '<input type="text" id="empNameInput'+idx+'" value="'+escH(emp.name||'')+'">'+
           '<button class="bt bt-p" onclick="saveEmpName(\''+emp.uid+'\','+idx+')">💾 حفظ</button>'+
           '<span id="empNameMsg'+idx+'" style="font-size:10.5px"></span>'+
           '</div>'+
           '<div class="emp-inline-edit" id="empJobEdit'+idx+'" style="display:none">'+
           '<input type="text" id="empJobInput'+idx+'" value="'+escH(emp.jobTitle||'')+'" placeholder="مثلاً: مصمم جرافيك">'+
           '<button class="bt bt-p" onclick="saveEmpJob(\''+emp.uid+'\','+idx+')">💾 حفظ</button>'+
           '<span id="empJobMsg'+idx+'" style="font-size:10.5px"></span>'+
           '</div>';

        h+='<div class="staff-sub-title">📁 المشاريع</div>';
        if(emp.projects.length){
            emp.projects.forEach(function(p){
                var pm=(p.progressMap&&p.progressMap[emp.uid])||{progress:0,status:'لم يبدأ',note:''};
                h+='<div class="pj-row"><div class="pj-t">'+escH(p.title||'بدون عنوان')+'</div>'+
                   (p.description?'<div class="pj-meta">'+escH(p.description)+'</div>':'')+
                   '<div class="pj-bar"><div class="pj-bar-in" style="width:'+(pm.progress||0)+'%"></div></div>'+
                   '<div class="pj-meta">الحالة: <span class="badge '+badgeClassForStatus(pm.status)+'">'+escH(pm.status||'لم يبدأ')+'</span> · التقدم: '+(pm.progress||0)+'%'+(pm.note?(' · ملاحظة: '+escH(pm.note)):'')+'</div>'+
                   '</div>';
            });
        }else h+='<div class="empty-hint">لا توجد مشاريع مُسندة حالياً.</div>';

        if(emp.role !== 'tech_admin'){
            h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">';
            h+='<div class="staff-sub-title" style="margin:0;border:none">📆 التقارير الأسبوعية</div>';
            if(emp.weeklyReports.length) h+='<button class="bt bt-d" style="padding:4px 10px;font-size:10px" onclick="event.stopPropagation();tgDeleteAllRecords(\'weeklyReports\', \'تقارير الموظف\', \'uid\', \''+emp.uid+'\', loadStaffOverview)">🗑 حذف الكل</button>';
            h+='</div>';
            if(emp.weeklyReports.length){
                window._staffWkrCache=window._staffWkrCache||{};
                window._staffWkrCache[idx]=emp.weeklyReports;
                emp.weeklyReports.forEach(function(r,ri){
                    h+='<div class="ac-row"><div class="ac-t">أسبوع '+escH(r.weekStart||'')+
                       ' <button class="bt bt-o" style="padding:2px 8px;font-size:10px;margin-right:8px" onclick="printWeeklyReportDoc(window._staffEmpCache['+idx+'],window._staffWkrCache['+idx+']['+ri+'])">🖨 طباعة</button></div>'+
                       (r.content?'<div class="ac-meta">'+escH(r.content)+'</div>':'')+'</div>';
                });
            }else h+='<div class="empty-hint">لم يُرسل الموظف أي تقرير أسبوعي بعد.</div>';

            h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">';
            h+='<div class="staff-sub-title" style="margin:0;border:none">🏆 الإنجازات</div>';
            if(emp.achievements.length) h+='<button class="bt bt-d" style="padding:4px 10px;font-size:10px" onclick="event.stopPropagation();tgDeleteAllRecords(\'achievements\', \'إنجازات الموظف\', \'uid\', \''+emp.uid+'\', loadStaffOverview)">🗑 حذف الكل</button>';
            h+='</div>';
            if(emp.achievements.length){
                window._staffAchCache=window._staffAchCache||{};
                window._staffAchCache[idx]=emp.achievements;
                emp.achievements.forEach(function(a,ai){
                    h+='<div class="ac-row"><div class="ac-t">'+escH(a.title||'')+
                       ' <button class="bt bt-o" style="padding:2px 8px;font-size:10px;margin-right:8px" onclick="printAchievementDoc(window._staffEmpCache['+idx+'],window._staffAchCache['+idx+']['+ai+'])">🖨 طباعة</button></div>'+
                       (a.description?'<div class="ac-meta">'+escH(a.description)+'</div>':'')+
                       (a.date?'<div class="ac-meta">📅 '+escH(a.date)+'</div>':'')+'</div>';
                });
            }else h+='<div class="empty-hint">لا توجد إنجازات مسجّلة بعد.</div>';

            h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">';
            h+='<div class="staff-sub-title" style="margin:0;border:none">📨 الطلبات</div>';
            if(emp.requests.length) h+='<button class="bt bt-d" style="padding:4px 10px;font-size:10px" onclick="event.stopPropagation();tgDeleteAllRecords(\'requests\', \'طلبات الموظف\', \'uid\', \''+emp.uid+'\', loadStaffOverview)">🗑 حذف الكل</button>';
            h+='</div>';
            if(emp.requests.length){
                window._staffReqCache=window._staffReqCache||{};
                window._staffReqCache[idx]=emp.requests;
                emp.requests.forEach(function(r,qi){
                    var attachHtml = '';
                    if(r.fileUrl && r.fileType){
                        if(r.fileType.indexOf('image/')===0){
                            attachHtml = '<div style="margin-top:6px"><a href="'+r.fileUrl+'" target="_blank"><img src="'+r.fileUrl+'" style="max-width:140px;max-height:100px;border-radius:6px;display:block"></a></div>';
                        } else if(r.fileType.indexOf('video/')===0){
                            attachHtml = '<div style="margin-top:6px"><video src="'+r.fileUrl+'" controls style="max-width:180px;border-radius:6px"></video></div>';
                        } else {
                            attachHtml = '<div style="margin-top:6px"><a href="'+r.fileUrl+'" target="_blank" style="color:var(--nv);font-weight:700;text-decoration:underline">📎 '+escH(r.fileName||'ملف مرفق')+'</a></div>';
                        }
                    }
                    h+='<div class="rq-row"><div class="rq-t">'+escH(r.type||'طلب')+' <span class="badge '+badgeClassForReq(r.status)+'">'+reqStatusLabel(r.status)+'</span>'+
                       ' <button class="bt bt-o" style="padding:2px 8px;font-size:10px;margin-right:8px" onclick="printRequestDoc(window._staffEmpCache['+idx+'],window._staffReqCache['+idx+']['+qi+'])">🖨 طباعة</button></div>'+
                       (r.details?'<div class="pj-meta">'+escH(r.details)+'</div>':'')+
                       (r.fromDate?('<div class="pj-meta">من '+escH(r.fromDate)+(r.toDate?(' إلى '+escH(r.toDate)):'')+'</div>'):'')+
                       (r.reviewedBy?('<div class="pj-meta">تمت المراجعة بواسطة: '+escH(r.reviewedBy)+'</div>'):'')+
                       attachHtml+
                       (r.status==='pending'?('<div class="rq-actions" style="margin-top:8px"><button class="bt bt-p" onclick="reviewRequest(\''+r.id+'\',\'approved\')">✔ موافقة</button><button class="bt bt-d" onclick="reviewRequest(\''+r.id+'\',\'rejected\')">✕ رفض</button></div>'):'')+
                       '</div>';
                });
            }else h+='<div class="empty-hint">لا توجد طلبات بعد.</div>';
        }

        h+='</div></div>';
    });
    box.innerHTML=h;
}
function toggleStaffCard(idx){
    var c=document.getElementById('staffCard'+idx);
    if(c)c.classList.toggle('open');
}
function filterStaffCards(){
    var q=(document.getElementById('staffSearch').value||'').trim().toLowerCase();
    var visible=0;
    document.querySelectorAll('#staffList .staff-card').forEach(function(c){
        var match=!q||(c.getAttribute('data-search')||'').indexOf(q)>-1;
        c.style.display=match?'':'none';
        if(match)visible++;
    });
    var countEl=document.getElementById('staffCount');
    if(countEl)countEl.textContent=visible+' موظف'+(q?(' من '+(window._staffEmpCache?window._staffEmpCache.length:0)):'');
}
function reviewRequest(reqId,newStatus){
    db.collection('requests').doc(reqId).get().then(function(snap){
        var req = snap.exists ? snap.data() : {};
        return db.collection('requests').doc(reqId).update({
            status:newStatus,
            reviewedBy:(TG_USER?TG_USER.name:''),
            reviewedAt:new Date()
        }).then(function(){
            // إشعار الموظف بنتيجة طلبه فور المراجعة
            if(req.uid && typeof tgSendPushToUser === 'function'){
                var okStatus = newStatus === 'approved';
                var title = okStatus ? '✅ تمت الموافقة على طلبك' : '❌ تم رفض طلبك';
                var body = (req.type || 'طلب') + (req.fromDate ? (' — من ' + req.fromDate + (req.toDate ? (' إلى ' + req.toDate) : '')) : '');
                tgSendPushToUser(req.uid, title, body, 'request-reviewed');
            }
        });
    }).then(loadStaffOverview).catch(function(err){ alert('تعذر تحديث الطلب: '+err.message); });
}

// ─── تعديل اسم الموظف من "متابعة الموظفين" ─────────────────────────────
function toggleEmpNameEdit(idx){
    var e=document.getElementById('empNameEdit'+idx);
    if(!e)return;
    e.style.display=(e.style.display==='none'||!e.style.display)?'flex':'none';
}
function saveEmpName(uid,idx){
    var name=(document.getElementById('empNameInput'+idx).value||'').trim();
    var msg=document.getElementById('empNameMsg'+idx);
    if(!name){ msg.style.color='var(--no)'; msg.textContent='اكتب اسماً صحيحاً.'; return; }
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ الحفظ...';
    db.collection('users').doc(uid).update({name:name}).then(function(){
        addEmployeeName(name);
        loadStaffOverview();
    }).catch(function(err){ msg.style.color='var(--no)'; msg.textContent='❌ '+err.message; });
}

// ─── تعديل المسمى الوظيفي من "متابعة الموظفين" ─────────────────────────
function toggleEmpJobEdit(idx){
    var e=document.getElementById('empJobEdit'+idx);
    if(!e)return;
    e.style.display=(e.style.display==='none'||!e.style.display)?'flex':'none';
}
function saveEmpJob(uid,idx){
    var jobTitle=(document.getElementById('empJobInput'+idx).value||'').trim();
    var msg=document.getElementById('empJobMsg'+idx);
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ الحفظ...';
    db.collection('users').doc(uid).update({jobTitle:jobTitle}).then(function(){
        loadStaffOverview();
    }).catch(function(err){ msg.style.color='var(--no)'; msg.textContent='❌ '+err.message; });
}

// ─── تعطيل / إعادة تفعيل حساب موظف (يمنع الدخول بدون فقد أي بيانات) ────
function toggleEmpDisabled(uid,currentlyDisabled){
    db.collection('users').doc(uid).update({disabled:!currentlyDisabled}).then(loadStaffOverview)
      .catch(function(err){ alert('تعذر تحديث حالة الحساب: '+err.message); });
}

// ─── حذف موظف: يسأل في كل مرة بين تعطيل فقط أو حذف نهائي كامل ─────────
function openDeleteEmpModal(uid,idx){
    var emp=(window._staffEmpCache||[])[idx];
    var name=escH(emp?(emp.name||emp.email):'');
    tgConfirmModal(
        '🗑 حذف / تعطيل: '+name,
        'اختر الإجراء المناسب لحساب هذا الموظف:<br><br>'+
        '<b>تعطيل الحساب:</b> يمنعه من الدخول فوراً، مع الاحتفاظ الكامل بسجل مشاريعه وإنجازاته وطلباته السابقة (يمكن التراجع لاحقاً).<br><br>'+
        '<b>حذف نهائي:</b> يمسح ملفه من النظام، ويزيله من كل المشاريع المُسندة إليه، ويحذف إنجازاته وطلباته وتقاريره الأسبوعية نهائياً — إجراء لا يمكن التراجع عنه. '+
        '(ملاحظة: حساب الدخول في Firebase Authentication نفسه يبقى موجوداً تقنياً ولازم يتحذف يدوياً من Firebase Console لو حبيت إزالته بالكامل، لكنه لن يقدر يدخل على النظام بعد الحذف).',
        [
            {label:'إلغاء', cls:'bt-o', onClick:tgCloseModal},
            {label:'🚫 تعطيل الحساب فقط', cls:'bt-p', onClick:function(){ tgCloseModal(); toggleEmpDisabled(uid,false); }},
            {label:'🗑 حذف نهائي مع كل بياناته', cls:'bt-d', onClick:function(){ tgCloseModal(); permanentlyDeleteEmployee(uid,name); }}
        ]
    );
}
function permanentlyDeleteEmployee(uid,name){
    tgConfirmModal(
        '⚠️ تأكيد نهائي',
        'هل أنت متأكد تماماً من حذف "'+name+'" وكل بياناته نهائياً؟ لا يمكن التراجع عن هذا الإجراء.',
        [
            {label:'إلغاء', cls:'bt-o', onClick:tgCloseModal},
            {label:'🗑 نعم، احذف نهائياً', cls:'bt-d', onClick:function(){
                tgCloseModal();
                Promise.all([
                    db.collection('projects').where('assignees','array-contains',uid).get(),
                    db.collection('achievements').where('uid','==',uid).get(),
                    db.collection('requests').where('uid','==',uid).get(),
                    db.collection('weeklyReports').where('uid','==',uid).get(),
                    db.collection('projectComments').where('uid','==',uid).get()
                ]).then(function(res){
                    var batch=db.batch();
                    res[0].forEach(function(d){
                        var data=d.data();
                        var assignees=(data.assignees||[]).filter(function(a){return a!==uid;});
                        var pm=Object.assign({},data.progressMap||{});
                        delete pm[uid];
                        batch.update(d.ref,{assignees:assignees,progressMap:pm});
                    });
                    res[1].forEach(function(d){batch.delete(d.ref);});
                    res[2].forEach(function(d){batch.delete(d.ref);});
                    res[3].forEach(function(d){batch.delete(d.ref);});
                    res[4].forEach(function(d){batch.delete(d.ref);});
                    batch.delete(db.collection('users').doc(uid));
                    return batch.commit();
                }).then(loadStaffOverview).catch(function(err){
                    alert('تعذر إتمام الحذف بالكامل: '+err.message);
                });
            }}
        ]
    );
}
function createStaffAccount(){
    var name=(document.getElementById('newAccName').value||'').trim();
    var email=(document.getElementById('newAccEmail').value||'').trim();
    var pass=document.getElementById('newAccPass').value||'';
    var jobTitle=(document.getElementById('newAccJobTitle').value||'').trim();
    var roleEl=document.getElementById('newAccRole');
    var role=roleEl?roleEl.value:'employee';
    var msg=document.getElementById('newAccMsg');
    if(!name||!email||!pass){ msg.style.color='var(--no)'; msg.textContent='من فضلك املأ الاسم والبريد الإلكتروني وكلمة المرور.'; return; }
    if(pass.length<6){ msg.style.color='var(--no)'; msg.textContent='كلمة المرور يجب أن تكون 6 أحرف على الأقل.'; return; }
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ إنشاء الحساب...';
    tgCreateEmployeeAccount(name,email,pass,'',jobTitle,role,function(){
        if(role==='employee') addEmployeeName(name);
        var roleAr = role==='tech_admin' ? 'أدمن تقني' : 'موظف';
        msg.style.color='var(--ok)'; msg.textContent='✅ تم إنشاء حساب '+roleAr+' بنجاح.';
        document.getElementById('newAccName').value='';
        document.getElementById('newAccEmail').value='';
        document.getElementById('newAccPass').value='';
        document.getElementById('newAccJobTitle').value='';
        if(roleEl) roleEl.value='employee';
        loadStaffOverview();
    },function(err){
        var map={'auth/email-already-in-use':'هذا البريد الإلكتروني مستخدم بالفعل.','auth/invalid-email':'صيغة البريد الإلكتروني غير صحيحة.','auth/weak-password':'كلمة المرور ضعيفة جداً.'};
        msg.style.color='var(--no)'; msg.textContent='❌ '+(map[err.code]||err.message);
    });
}

// ─── إدارة المشاريع (إنشاء المشاريع وتعيين الموظفين مباشرة من الموقع) ─────
function loadPmgmtData(){
    var assigneesBox=document.getElementById('pmgmtAssignees');
    var listBox=document.getElementById('pmgmtList');
    if(!assigneesBox||!listBox)return;
    db.collection('users').where('role','==','employee').get().then(function(snap){
        PMGMT_EMPLOYEES=[];
        snap.forEach(function(doc){PMGMT_EMPLOYEES.push(Object.assign({uid:doc.id},doc.data()));});
        PMGMT_EMPLOYEES.sort(function(a,b){return (a.name||a.email||'').localeCompare((b.name||b.email||''),'ar');});
        renderPmgmtAssigneesBox();
        return db.collection('projects').get();
    }).then(function(snap){
        var list=[];
        snap.forEach(function(doc){list.push(Object.assign({id:doc.id},doc.data()));});
        var proms=list.map(function(p){
            return db.collection('projectComments').where('projectId','==',p.id).get().then(function(csnap){
                p.comments=csnap.docs.map(function(d){return Object.assign({id:d.id},d.data());})
                    .sort(function(a,b){
                        var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
                        var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
                        return am-bm;
                    });
                return p;
            });
        });
        return Promise.all(proms);
    }).then(renderProjectsList).catch(function(err){
        listBox.innerHTML='<div class="empty-hint" style="color:var(--no)">تعذر تحميل البيانات: '+escH(err.message)+'</div>';
    });
}
function renderPmgmtAssigneesBox(){
    var box=document.getElementById('pmgmtAssignees');
    if(!box)return;
    if(!PMGMT_EMPLOYEES.length){
        box.innerHTML='<div class="empty-hint">لا يوجد موظفون مسجّلون بعد. أنشئ حسابات الموظفين أولاً من "متابعة الموظفين".</div>';
        return;
    }
    box.innerHTML=PMGMT_EMPLOYEES.map(function(e){
        return '<label><input type="checkbox" class="pm-assignee-chk" value="'+e.uid+'"> '+escH(e.name||e.email)+'</label>';
    }).join('');
}
function createProject(){
    var title=(document.getElementById('pmTitle').value||'').trim();
    var desc=(document.getElementById('pmDesc').value||'').trim();
    var priority=document.getElementById('pmPriority').value;
    var status=document.getElementById('pmStatus').value;
    var deadline=document.getElementById('pmDeadline').value||'';
    var linkUrl=(document.getElementById('pmLink').value||'').trim();
    var msg=document.getElementById('pmCreateMsg');
    var fileInput=document.getElementById('pmFile');
    var file=fileInput && fileInput.files && fileInput.files[0];
    var checked=Array.prototype.slice.call(document.querySelectorAll('#pmgmtAssignees .pm-assignee-chk:checked')).map(function(c){return c.value;});
    if(!title){ msg.style.color='var(--no)'; msg.textContent='من فضلك اكتب عنوان المشروع.'; return; }
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ إنشاء المشروع...';

    var createdByRole = (TG_USER && TG_USER.role === 'tech_admin') ? 'أدمن تقني' : 'أدمن إداري';
    var projectData = {
        title:title, description:desc, assignees:checked, progressMap:{},
        priority:priority, status:status, deadline:deadline,
        createdAt:new Date(),
        createdBy:(TG_USER?(TG_USER.name||TG_USER.email||'الأدمن'):''), createdByUid:(TG_USER?TG_USER.uid:''),
        createdByRole: createdByRole
    };
    if(linkUrl) projectData.linkUrl = linkUrl;

    var onDone = function(){
        msg.style.color='var(--ok)'; msg.textContent='✅ تم إنشاء المشروع بنجاح.';
        document.getElementById('pmTitle').value='';
        document.getElementById('pmDesc').value='';
        document.getElementById('pmDeadline').value='';
        document.getElementById('pmPriority').value='متوسطة';
        document.getElementById('pmStatus').value='مخطط له';
        if(document.getElementById('pmLink')) document.getElementById('pmLink').value='';
        if(fileInput) fileInput.value='';
        var fnSpan = document.getElementById('pmFileName');
        if(fnSpan) fnSpan.textContent='';
        document.querySelectorAll('#pmgmtAssignees .pm-assignee-chk').forEach(function(c){c.checked=false;});
        loadPmgmtData();
        // إرسال Push Notification لكل موظف مسؤول عن المشروع
        if(typeof tgSendPushToUser === 'function'){
            checked.forEach(function(empUid){
                tgSendPushToUser(empUid, '📁 مشروع جديد', 'تمت إضافتك لمشروع: ' + title, 'project-new');
            });
        }
    };

    if(file){
        var MAX_MB = 20;
        if(file.size > MAX_MB * 1024 * 1024){ msg.style.color='var(--no)'; msg.textContent='الملف كبير جداً (الحد الأقصى '+MAX_MB+' MB).'; return; }
        var prog = document.getElementById('pmUploadProg');
        if(prog) { prog.style.display = 'block'; prog.textContent = '⏳ جاري رفع المرفق... 0%'; }
        var uniqueName = Date.now() + '_' + file.name;
        tgUploadFile('projects', uniqueName, file,
            function(pct){
                if(prog) prog.textContent = '⏳ جاري رفع المرفق... ' + pct + '%';
            },
            function(errMsg){
                if(prog) prog.style.display='none';
                msg.style.color='var(--no)'; msg.textContent='❌ تعذر رفع الملف: '+errMsg;
            },
            function(publicUrl){
                projectData.fileUrl = publicUrl;
                projectData.fileName = file.name;
                projectData.fileType = file.type;
                db.collection('projects').add(projectData).then(function(){
                    if(prog) { prog.style.display='none'; prog.textContent=''; }
                    onDone();
                }).catch(function(err){
                    if(prog) prog.style.display='none';
                    msg.style.color='var(--no)'; msg.textContent='❌ '+err.message;
                });
            }
        );
        return;
    }

    try {
        db.collection('projects').add(projectData).then(onDone).catch(function(err){
            console.error("Project Create Error:", err);
            msg.style.color='var(--no)'; msg.textContent='❌ تعذر إنشاء المشروع: '+err.message;
            tgToast('❌ تعذر إنشاء المشروع: ' + err.message, 'err');
        });
    } catch(syncErr) {
        console.error("Sync Error in createProject:", syncErr);
        msg.style.color='var(--no)'; msg.textContent='❌ خطأ تقني: '+syncErr.message;
        tgToast('❌ خطأ تقني: ' + syncErr.message, 'err');
    }
}

// ─── توزيع المهام (الأدمن يكلّف موظفاً بمهمة، والموظف يتابع حالتها من بوابته) ───
function loadTasksMgmt(){
    var assigneeSel=document.getElementById('tkAssignee');
    var listBox=document.getElementById('tasksMgmtList');
    if(!assigneeSel||!listBox)return;
    db.collection('users').where('role','==','employee').get().then(function(snap){
        var employees=[];
        snap.forEach(function(doc){employees.push(Object.assign({uid:doc.id},doc.data()));});
        employees.sort(function(a,b){return (a.name||a.email||'').localeCompare((b.name||b.email||''),'ar');});
        if(!employees.length){
            assigneeSel.innerHTML='<option value="">لا يوجد موظفون مسجّلون بعد</option>';
        }else{
            assigneeSel.innerHTML=employees.map(function(e){
                return '<option value="'+e.uid+'" data-name="'+escH(e.name||e.email)+'">'+escH(e.name||e.email)+(e.jobTitle?(' — '+escH(e.jobTitle)):'')+'</option>';
            }).join('');
        }
        return db.collection('tasks').get();
    }).then(function(snap){
        var list=[];
        snap.forEach(function(doc){list.push(Object.assign({id:doc.id},doc.data()));});
        list.sort(function(a,b){
            var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
            var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
            return bm-am;
        });
        renderTasksMgmtList(list);
    }).catch(function(err){
        listBox.innerHTML='<div class="empty-hint" style="color:var(--no)">تعذر تحميل المهام: '+escH(err.message)+'</div>';
    });
}
function renderTasksMgmtList(list){
    var box=document.getElementById('tasksMgmtList');
    if(!box)return;
    window._tasksMgmtCache=list;
    if(!list.length){ box.innerHTML='<div class="empty-hint">لا توجد مهام مُكلَّفة بعد.</div>'; return; }
    var h='';
    list.forEach(function(t,i){
        var attachHtml = '';
        if(t.fileUrl && t.fileType){
            if(t.fileType.indexOf('image/')===0){
                attachHtml = '<div style="margin-top:6px"><a href="'+t.fileUrl+'" target="_blank"><img src="'+t.fileUrl+'" style="max-width:140px;max-height:100px;border-radius:6px;display:block"></a></div>';
            } else if(t.fileType.indexOf('video/')===0){
                attachHtml = '<div style="margin-top:6px"><video src="'+t.fileUrl+'" controls style="max-width:180px;border-radius:6px"></video></div>';
            } else {
                attachHtml = '<div style="margin-top:6px"><a href="'+t.fileUrl+'" target="_blank" style="color:var(--nv);font-weight:700;text-decoration:underline">📎 '+escH(t.fileName||'ملف مرفق')+'</a></div>';
            }
        }
        h+='<div class="pj-row"><div class="pj-t">'+escH(t.title||'بدون عنوان')+
           ' <span class="badge '+prioBadgeClass(t.priority)+'">'+escH(t.priority||'متوسطة')+'</span>'+
           ' <span class="badge '+pstatusBadgeClass(t.status)+'">'+escH(t.status||'لم يبدأ')+'</span></div>'+
           '<div class="pj-meta">👤 مكلَّف إلى: '+escH(t.assignedToName||'')+(t.deadline?(' · تاريخ التسليم: '+escH(t.deadline)):'')+'</div>'+
           (t.description?'<div class="pj-meta">'+escH(t.description)+'</div>':'')+
           '<div class="pj-meta" style="margin-top:2px;font-size:10px;color:var(--tx3)">بواسطة: '+escH(t.createdBy||'الإدارة')+' ('+escH(t.createdByRole||'أدمن إداري')+')</div>'+
           attachHtml+
           '<div style="text-align:right;margin-top:12px"><button class="bt bt-d" style="padding:4px 12px;font-size:11px;border-radius:6px" onclick="deleteTask(\''+t.id+'\')">🗑 حذف المهمة</button></div>'+
           '</div>';
    });
    box.innerHTML=h;
}
function createTask(){
    var sel=document.getElementById('tkAssignee');
    var uid=sel.value;
    var name=sel.selectedOptions&&sel.selectedOptions[0]?sel.selectedOptions[0].getAttribute('data-name'):'';
    var title=(document.getElementById('tkTitle').value||'').trim();
    var desc=(document.getElementById('tkDesc').value||'').trim();
    var priority=document.getElementById('tkPriority').value;
    var deadline=document.getElementById('tkDeadline').value||'';
    var fileInput=document.getElementById('tkFile');
    var file=fileInput && fileInput.files && fileInput.files[0];
    var msg=document.getElementById('tkCreateMsg');
    if(!uid){ msg.style.color='var(--no)'; msg.textContent='من فضلك اختر الموظف المكلَّف.'; return; }
    if(!title){ msg.style.color='var(--no)'; msg.textContent='من فضلك اكتب عنوان المهمة.'; return; }
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ التكليف...';

    var createdByRole = (TG_USER && TG_USER.role === 'tech_admin') ? 'أدمن تقني' : 'أدمن إداري';
    var taskData = {
        title:title, description:desc, assignedTo:uid, assignedToName:name||'',
        priority:priority, deadline:deadline, status:'لم يبدأ',
        createdAt: new Date(),
        createdBy:(TG_USER?(TG_USER.name||TG_USER.email||'الأدمن'):''), createdByUid:(TG_USER?TG_USER.uid:''),
        createdByRole: createdByRole
    };

    var onDone = function(){
        msg.style.color='var(--ok)'; msg.textContent='✅ تم تكليف المهمة بنجاح.';
        document.getElementById('tkTitle').value='';
        document.getElementById('tkDesc').value='';
        document.getElementById('tkDeadline').value='';
        document.getElementById('tkPriority').value='متوسطة';
        if(fileInput) fileInput.value='';
        var fnSpan = document.getElementById('tkFileName');
        if(fnSpan) fnSpan.textContent='';
        loadTasksMgmt();
        // إرسال Push Notification للموظف المكلَّف
        if(typeof tgSendPushToUser === 'function' && uid){
            tgSendPushToUser(uid, '📋 مهمة جديدة', 'تم تكليفك بمهمة: ' + title, 'task-new');
        }
    };

    if(file){
        var MAX_MB = 20;
        if(file.size > MAX_MB * 1024 * 1024){ msg.style.color='var(--no)'; msg.textContent='الملف كبير جداً (الحد الأقصى '+MAX_MB+' MB).'; return; }
        var prog = document.getElementById('tkUploadProg');
        if(prog) { prog.style.display = 'block'; prog.textContent = '⏳ جاري رفع المرفق... 0%'; }
        var uniqueName = uid + '/' + Date.now() + '_' + file.name;
        tgUploadFile('tasks', uniqueName, file,
            function(pct){
                if(prog) prog.textContent = '⏳ جاري رفع المرفق... ' + pct + '%';
            },
            function(errMsg){
                if(prog) prog.style.display='none';
                msg.style.color='var(--no)'; msg.textContent='❌ تعذر رفع الملف: '+errMsg;
            },
            function(publicUrl){
                taskData.fileUrl = publicUrl;
                taskData.fileName = file.name;
                taskData.fileType = file.type;
                db.collection('tasks').add(taskData).then(function(){
                    if(prog) { prog.style.display='none'; prog.textContent=''; }
                    onDone();
                }).catch(function(err){
                    if(prog) prog.style.display='none';
                    msg.style.color='var(--no)'; msg.textContent='❌ '+err.message;
                });
            }
        );
        return;
    }

    try {
        db.collection('tasks').add(taskData).then(onDone).catch(function(err){
            console.error("Task Create Error:", err);
            msg.style.color='var(--no)'; msg.textContent='❌ تعذر تكليف المهمة: '+err.message;
            tgToast('❌ تعذر تكليف المهمة: ' + err.message, 'err');
        });
    } catch(syncErr) {
        console.error("Sync Error in createTask:", syncErr);
        msg.style.color='var(--no)'; msg.textContent='❌ خطأ تقني: '+syncErr.message;
        tgToast('❌ خطأ تقني: ' + syncErr.message, 'err');
    }
}
function deleteTask(id){
    if(!confirm('حذف هذه المهمة نهائياً؟'))return;
    db.collection('tasks').doc(id).delete().then(loadTasksMgmt).catch(function(err){
        alert('تعذر حذف المهمة: '+err.message);
    });
}

// ─── شارات الأولوية / حالة المشروع / تاريخ الاستحقاق (مشتركة بين لوحة الأدمن وبوابة الموظف) ───
function prioBadgeClass(p){
    if(p==='عالية')return 'badge-prio-high';
    if(p==='منخفضة')return 'badge-prio-low';
    return 'badge-prio-med';
}
function pstatusBadgeClass(s){
    if(s==='جاري العمل')return 'badge-pstatus-progress';
    if(s==='متوقف')return 'badge-pstatus-hold';
    if(s==='مكتمل')return 'badge-pstatus-done';
    return 'badge-pstatus-plan';
}
function isOverdue(deadline,status){
    return !!deadline && status!=='مكتمل' && deadline < new Date().toISOString().split('T')[0];
}
function projectTagsHtml(p){
    var h='<div class="pj-tags">';
    h+='<span class="badge '+pstatusBadgeClass(p.status)+'">'+escH(p.status||'مخطط له')+'</span>';
    h+='<span class="badge '+prioBadgeClass(p.priority)+'">⚑ أولوية '+escH(p.priority||'متوسطة')+'</span>';
    if(p.deadline){
        var overdue=isOverdue(p.deadline,p.status);
        h+='<span class="badge '+(overdue?'badge-overdue':'badge-pstatus-plan')+'">📅 '+(overdue?'متأخر — استحقاقه ':'يستحق في ')+escH(p.deadline)+'</span>';
    }
    h+='</div>';
    return h;
}

// ─── نقاش/شات كل مشروع (مشترك بين لوحة الأدمن وبوابة الموظف) ─────────────
window._chatContainers = window._chatContainers || {};
// ═══════════════════════════════════════════════════════════════════════
// 💬 الشات العام اللحظي — ودجت عائم (فقاعة + لوحة) يظهر فوق كل الصفحات،
// بنفس فكرة شات فيسبوك ماسنجر — غرفة واحدة يشترك فيها الأدمن وكل الموظفين
// ═══════════════════════════════════════════════════════════════════════
var _chatUnsub = null;
var _chatMessages = [];
var _chatWidgetOpen = false;

// يُبنى مرة واحدة بس ويتضاف على body — بيفضل فوق كل الصفحات وأنت بتتنقل بينها
function tgChatMount(){
    if(document.getElementById('tgChatBubble')) return;
    var wrap=document.createElement('div');
    wrap.id='tgChatWidgetWrap';
    wrap.innerHTML =
        '<div id="tgChatPanel" class="tg-chat-panel">'+
          '<div class="tg-chat-panel-h">'+
            '<span>💬 الشات العام</span>'+
            '<span class="tg-chat-panel-h-r">'+
              '<span class="tg-chat-panel-mute" id="tgChatMuteBtn" onclick="tgChatToggleMute()" title="كتم/تشغيل صوت الإشعارات">🔔</span>'+
              '<span class="tg-chat-panel-close" onclick="tgChatToggle(false)">✕</span>'+
            '</span>'+
          '</div>'+
          '<div class="tg-chat-log" id="tgChatLog"><div class="pj-chat-empty">جارِ تحميل الرسائل...</div></div>'+
          '<div class="tg-chat-input-row">'+
            '<textarea id="tgChatInput" rows="1" placeholder="اكتب رسالتك هنا..." onkeydown="tgChatKeydown(event)"></textarea>'+
            '<button class="bt bt-p" onclick="tgChatSend()">➤</button>'+
          '</div>'+
        '</div>'+
        '<div id="tgChatBubble" class="tg-chat-bubble" onclick="tgChatToggle()" title="الشات العام">'+
          '<span class="tg-chat-bubble-ic">💬</span>'+
          '<span class="tgChatBadge tg-chat-bubble-badge" id="tgChatBubbleBadge" style="display:none"></span>'+
        '</div>';
    document.body.appendChild(wrap);
    var mb=document.getElementById('tgChatMuteBtn');
    if(mb) mb.textContent = (localStorage.getItem('tg_chat_muted')==='1') ? '🔕' : '🔔';
    // فك قفل الصوت (سياسة المتصفحات بتطلب تفاعل أول) عند أول لمسة/كليك بالمستخدم
    var unlock=function(){ tgChatUnlockAudio(); document.removeEventListener('click',unlock); document.removeEventListener('keydown',unlock); };
    document.addEventListener('click',unlock);
    document.addEventListener('keydown',unlock);
}

function tgChatToggleMute(){
    var muted = localStorage.getItem('tg_chat_muted')==='1';
    muted = !muted;
    localStorage.setItem('tg_chat_muted', muted?'1':'0');
    var mb=document.getElementById('tgChatMuteBtn');
    if(mb) mb.textContent = muted ? '🔕' : '🔔';
    if(!muted) tgChatPlaySound(); // نغمة تجريبية عشان يسمع الفرق
}

function tgChatToggle(force){
    var panel=document.getElementById('tgChatPanel');
    var bubble=document.getElementById('tgChatBubble');
    if(!panel) return;
    
    var willClose = (typeof force === 'boolean') ? !force : _chatWidgetOpen;
    var inp = document.getElementById('tgChatInput');
    
    if (willClose && inp && inp.value.trim() !== '') {
        tgConfirmModal('إغلاق الشات؟', 'لديك نص غير مُرسل في الشات، هل أنت متأكد من إغلاقه؟', [
            {label: 'إلغاء', cls: 'bt-o', onClick: tgCloseModal},
            {label: 'إغلاق وتجاهل', cls: 'bt-d', onClick: function(){
                tgCloseModal();
                inp.value = '';
                _chatWidgetOpen = false;
                panel.classList.remove('open');
                if(bubble) bubble.classList.toggle('hide', window.innerWidth<=560);
            }}
        ]);
        return;
    }

    _chatWidgetOpen = (typeof force==='boolean') ? force : !_chatWidgetOpen;
    panel.classList.toggle('open', _chatWidgetOpen);
    if(bubble) bubble.classList.toggle('hide', _chatWidgetOpen && window.innerWidth<=560);
    if(_chatWidgetOpen){
        renderChatMessages();
        tgChatMarkRead();
        setTimeout(function(){ var inp=document.getElementById('tgChatInput'); if(inp) inp.focus(); },80);
    }
}

function tgChatKeydown(e){
    if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); tgChatSend(); }
}

// يبدأ الاستماع اللحظي لرسائل الشات (يُستدعى مرة واحدة بعد تسجيل الدخول)
var _chatInitialSnapDone = false;
function tgChatWatch(){
    if(_chatUnsub || !TG_USER) return;
    _chatUnsub = db.collection('chatMessages').orderBy('createdAt','asc').limitToLast(200)
        .onSnapshot(function(snap){
            _chatMessages=[];
            snap.forEach(function(d){ var m=d.data(); m.id=d.id; _chatMessages.push(m); });
            // صوت التنبيه: بس لو فيه رسالة جديدة "فعلاً" وصلت من شخص تاني (مش أول تحميل، ومش رسالتي أنا)
            if(_chatInitialSnapDone){
                var newFromOthers = snap.docChanges().some(function(ch){
                    if(ch.type!=='added') return false;
                    var d=ch.doc.data();
                    return !TG_USER || d.uid!==TG_USER.uid;
                });
                if(newFromOthers) tgChatPlaySound();
            }
            _chatInitialSnapDone = true;
            if(_chatWidgetOpen){
                renderChatMessages();
                tgChatMarkRead();
            } else {
                tgChatUpdateBadgeFromCache();
            }
        }, function(err){ console.error('tgChatWatch error:', err); });
}

// ─── صوت تنبيه الرسائل (Web Audio API — نغمة مُولَّدة، مفيش حاجة تتحمّل من النت) ───
var _tgAudioCtx=null, _tgAudioUnlocked=false;
function tgChatUnlockAudio(){
    if(_tgAudioUnlocked) return;
    try{
        _tgAudioCtx = _tgAudioCtx || new (window.AudioContext||window.webkitAudioContext)();
        if(_tgAudioCtx.state==='suspended') _tgAudioCtx.resume();
        _tgAudioUnlocked=true;
    }catch(e){}
}
function tgChatPlaySound(){
    if(localStorage.getItem('tg_chat_muted')==='1') return;
    try{
        _tgAudioCtx = _tgAudioCtx || new (window.AudioContext||window.webkitAudioContext)();
        if(_tgAudioCtx.state==='suspended') _tgAudioCtx.resume();
        var now=_tgAudioCtx.currentTime;
        _tgTone(_tgAudioCtx, 880.00, now, 0.13, 0.16);       // نغمة أولى (لا)
        _tgTone(_tgAudioCtx, 1318.51, now+0.10, 0.16, 0.19); // نغمة ثانية (مي) — أعلى شوية زي "دينج"
    }catch(e){}
}
function _tgTone(ctx, freq, start, dur, vol){
    var osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(vol, start+0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start+dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(start); osc.stop(start+dur+0.03);
}

function renderChatMessages(){
    var log=document.getElementById('tgChatLog');
    if(!log) return;
    if(!_chatMessages.length){ log.innerHTML='<div class="pj-chat-empty">لا توجد رسائل بعد. ابدأ المحادثة! 👋</div>'; return; }
    var h='';
    _chatMessages.forEach(function(m){
        var mine = TG_USER && m.uid===TG_USER.uid;
        var t = (m.createdAt && m.createdAt.toDate) ? m.createdAt.toDate() : null;
        var timeStr = t ? (t.toLocaleDateString('ar-EG')+' · '+t.toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'})) : 'جارِ الإرسال...';
        var roleLabel = m.role==='admin' ? 'أدمن' : 'موظف';
        var canDelete = TG_USER && (mine || TG_USER.role==='admin');
        h+='<div class="pj-chat-msg'+(mine?' mine':'')+'">'+
           '<div class="pj-chat-msg-h"><span class="pj-chat-name">'+escH(m.name||'')+'</span>'+
           '<span class="pj-chat-role">'+roleLabel+'</span>'+
           '<span class="pj-chat-time">'+escH(timeStr)+'</span>'+
           (canDelete?('<span class="pj-chat-del" title="حذف الرسالة" onclick="tgChatDelete(\''+m.id+'\')">🗑</span>'):'')+
           '</div>'+
           '<div class="pj-chat-text">'+escH(m.text||'')+'</div>'+
           '</div>';
    });
    log.innerHTML=h;
    log.scrollTop=log.scrollHeight;
}

function tgChatSend(){
    var inp=document.getElementById('tgChatInput');
    if(!inp || !TG_USER) return;
    var text=(inp.value||'').trim();
    if(!text) return;
    inp.value='';
    inp.style.height='';
    db.collection('chatMessages').add({
        uid: TG_USER.uid, name: TG_USER.name||TG_USER.email, role: TG_USER.role||'employee',
        text: text, createdAt: new Date()
    }).then(function(){
        // إشعار كل المستخدمين الآخرين برسالة جديدة في الشات العام
        if(typeof tgBroadcastPush === 'function'){
            var preview = text.length > 60 ? text.slice(0, 60) + '…' : text;
            tgBroadcastPush('💬 رسالة من ' + (TG_USER.name||TG_USER.email), preview, 'chat-new', TG_USER.uid);
        }
    }).catch(function(err){ alert('تعذر إرسال الرسالة: '+err.message); });
}

function tgChatDelete(msgId){
    if(!confirm('حذف هذه الرسالة؟')) return;
    db.collection('chatMessages').doc(msgId).delete().catch(function(err){ alert('تعذر الحذف: '+err.message); });
}

// ─── شارة عدد الرسائل غير المقروءة على الفقاعة العائمة ────────────────
function tgChatLastReadKey(){ return TG_USER ? ('tg_chat_lastread_'+TG_USER.uid) : null; }
function tgChatGetLastRead(){
    var k=tgChatLastReadKey(); if(!k) return 0;
    return parseInt(localStorage.getItem(k))||0;
}
function tgChatMarkRead(){
    if(!_chatMessages.length) { updateChatBadge(0); return; }
    var last=_chatMessages[_chatMessages.length-1];
    var t=(last.createdAt && last.createdAt.toDate) ? last.createdAt.toDate().getTime() : Date.now();
    var k=tgChatLastReadKey(); if(k) localStorage.setItem(k, String(t));
    updateChatBadge(0);
}
function tgChatUpdateBadgeFromCache(){
    var lastRead=tgChatGetLastRead();
    var count=0;
    _chatMessages.forEach(function(m){
        if(!TG_USER || m.uid===TG_USER.uid) return;
        var t=(m.createdAt && m.createdAt.toDate) ? m.createdAt.toDate().getTime() : 0;
        if(t>lastRead) count++;
    });
    updateChatBadge(count);
}
function updateChatBadge(n){
    document.querySelectorAll('.tgChatBadge').forEach(function(el){
        if(n>0){ el.style.display='flex'; el.textContent = n>99?'99+':String(n); }
        else { el.style.display='none'; el.textContent=''; }
    });
}

function renderProjectChat(projectId, comments, containerId){
    var box=document.getElementById(containerId);
    if(!box)return;
    window._chatContainers[projectId]=containerId;
    var h='';
    if(!comments||!comments.length){
        h='<div class="pj-chat-empty">لا توجد ملاحظات بعد على هذا المشروع.</div>';
    }else{
        comments.forEach(function(c){
            var mine=TG_USER&&c.uid===TG_USER.uid;
            var canDelete=mine||(TG_USER&&(TG_USER.role==='admin'||TG_USER.role==='tech_admin'));
            var roleLabel=c.role==='admin'||c.role==='tech_admin'?'أدمن':'موظف';
            var timeStr='';
            if(c.createdAt&&c.createdAt.toDate){
                try{ timeStr=c.createdAt.toDate().toLocaleString('ar-EG',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}); }catch(e){}
            }
            // محتوى المرفق (صورة / فيديو / ملف)
            var attachHtml = '';
            if(c.fileUrl && c.fileType){
                if(c.fileType.indexOf('image/')===0){
                    attachHtml = '<div style="margin-top:6px"><a href="'+c.fileUrl+'" target="_blank"><img src="'+c.fileUrl+'" style="max-width:200px;max-height:160px;border-radius:8px;cursor:pointer;display:block" loading="lazy"></a></div>';
                } else if(c.fileType.indexOf('video/')===0){
                    attachHtml = '<div style="margin-top:6px"><video src="'+c.fileUrl+'" controls style="max-width:240px;border-radius:8px"></video></div>';
                } else {
                    attachHtml = '<div style="margin-top:6px"><a href="'+c.fileUrl+'" target="_blank" style="color:var(--nv);font-weight:700;text-decoration:underline">📎 '+escH(c.fileName||'ملف مرفق')+'</a></div>';
                }
            }
            h+='<div class="pj-chat-msg'+(mine?' mine':'')+'">'+
               '<div class="pj-chat-msg-h"><span class="pj-chat-name">'+escH(c.name||'')+'</span>'+
               '<span class="pj-chat-role">'+roleLabel+'</span>'+
               '<span class="pj-chat-time">'+escH(timeStr)+'</span>'+
               (canDelete?('<span class="pj-chat-del" title="حذف الملاحظة" onclick="deleteProjectComment(\''+c.id+'\',\''+projectId+'\')">🗑</span>'):'')+
               '</div>'+
               (c.text?'<div class="pj-chat-text">'+escH(c.text||'')+'</div>':'')+
               attachHtml+
               '</div>';
        });
    }
    box.innerHTML=h;
    box.scrollTop=box.scrollHeight;
}
function reloadProjectChat(projectId){
    db.collection('projectComments').where('projectId','==',projectId).get().then(function(snap){
        var list=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());})
            .sort(function(a,b){
                var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
                var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
                return am-bm;
            });
        renderProjectChat(projectId,list,window._chatContainers[projectId]);
    }).catch(function(err){ console.error('reloadProjectChat',err); });
}
function postProjectComment(projectId,inputId){
    var input=document.getElementById(inputId);
    if(!input||!TG_USER)return;
    var text=(input.value||'').trim();
    if(!text)return;
    input.disabled=true;
    db.collection('projectComments').add({
        projectId:projectId, uid:TG_USER.uid, name:TG_USER.name, role:TG_USER.role,
        text:text, createdAt:new Date()
    }).then(function(){
        input.value=''; input.disabled=false; input.focus();
        reloadProjectChat(projectId);
    }).catch(function(err){ input.disabled=false; alert('تعذر إضافة الملاحظة: '+err.message); });
}
function deleteProjectComment(commentId,projectId){
    if(!confirm('حذف هذه الملاحظة من المشروع؟'))return;
    db.collection('projectComments').doc(commentId).delete().then(function(){
        reloadProjectChat(projectId);
    }).catch(function(err){ alert('تعذر حذف الملاحظة: '+err.message); });
}
function projectChatHtml(projectId,logId,inputId){
    return '<div class="proj-sec-title">📝 ملاحظات المشروع</div>'+
       '<div class="pj-chat">'+
       '<div class="pj-chat-log" id="'+logId+'"></div>'+
       '<div class="pj-chat-input-row">'+
       '<input type="text" id="'+inputId+'" placeholder="اكتب ملاحظة على المشروع..." onkeydown="if(event.key===\'Enter\'){event.preventDefault();postProjectComment(\''+projectId+'\',\''+inputId+'\')}">'+
       '<button class="bt bt-p" onclick="postProjectComment(\''+projectId+'\',\''+inputId+'\')">➕ إضافة</button>'+
       '</div></div>';
}
function renderProjectsList(list){
    var box=document.getElementById('pmgmtList');
    if(!box)return;
    if(!list.length){
        box.innerHTML='<div class="empty-hint">لا توجد مشاريع بعد. أنشئ أول مشروع من الأعلى.</div>';
        return;
    }
    list.sort(function(a,b){
        var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
        var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
        return bm-am;
    });
    var h='';
    window._pmgmtProjCache = list;
    list.forEach(function(p,idx){
        var assignees=p.assignees||[];
        var sum=0;
        assignees.forEach(function(uid){
            var pm=(p.progressMap&&p.progressMap[uid])?p.progressMap[uid].progress:0;
            sum+=(pm||0);
        });
        var avgProg=assignees.length?Math.round(sum/assignees.length):0;

        h+='<div class="staff-card" id="pmCard'+idx+'">';
        h+='<div class="staff-card-h" onclick="toggleProjCard('+idx+')">'+
           '<div><div class="staff-name">'+escH(p.title||'بدون عنوان')+'</div>'+
           (p.description?'<div class="staff-email">'+escH(p.description)+'</div>':'')+
           projectTagsHtml(p)+
           '<div class="pj-meta" style="margin-top:4px;font-size:10px;color:var(--tx3)">بواسطة: '+escH(p.createdBy||'الإدارة')+' ('+escH(p.createdByRole||'أدمن إداري')+')</div>'+
           '</div>'+
           '<div class="staff-stats">'+
           '<span class="staff-stat">👥 '+assignees.length+' موظف</span>'+
           '<span class="staff-stat">📊 متوسط تقدم '+avgProg+'%</span>'+
           '</div></div>';
        h+='<div class="staff-card-body">';

        if(p.fileUrl || p.linkUrl){
            h+='<div class="proj-sec"><div class="proj-sec-title">📎 المرفقات والروابط</div>';
            if(p.fileUrl){
                var fType = p.fileType || '';
                if(fType.indexOf('image/')===0){
                    h+='<a href="'+p.fileUrl+'" target="_blank"><img src="'+p.fileUrl+'" style="max-width:100%;max-height:200px;border-radius:6px;display:block;margin-bottom:8px"></a>';
                } else if(fType.indexOf('video/')===0){
                    h+='<video src="'+p.fileUrl+'" controls style="max-width:100%;max-height:200px;border-radius:6px;margin-bottom:8px"></video>';
                } else {
                    h+='<a href="'+p.fileUrl+'" target="_blank" style="color:var(--nv);font-weight:700;text-decoration:underline;display:block;margin-bottom:8px">📎 '+escH(p.fileName||'ملف مرفق')+'</a>';
                }
            }
            if(p.linkUrl){
                h+='<a href="'+escH(p.linkUrl)+'" target="_blank" style="color:var(--gd);font-weight:700;text-decoration:underline;font-size:13px;display:block">🔗 رابط خارجي للمشروع</a>';
            }
            h+='</div>';
        }

        h+='<div class="proj-sec"><div class="proj-sec-title">👥 الموظفون المسؤولون</div>';
        if(assignees.length){
            assignees.forEach(function(uid){
                var e=PMGMT_EMPLOYEES.find(function(x){return x.uid===uid;});
                var nm=e?(e.name||e.email):'(موظف غير موجود حالياً)';
                var pm=(p.progressMap&&p.progressMap[uid])||{progress:0,status:'لم يبدأ',note:''};
                h+='<div class="pj-row"><div class="pj-t">'+escH(nm)+'</div>'+
                   '<div class="pj-bar"><div class="pj-bar-in" style="width:'+(pm.progress||0)+'%"></div></div>'+
                   '<div class="pj-meta">الحالة: <span class="badge '+badgeClassForStatus(pm.status)+'">'+escH(pm.status||'لم يبدأ')+'</span> · التقدم: '+(pm.progress||0)+'%'+(pm.note?(' · ملاحظة: '+escH(pm.note)):'')+'</div></div>';
            });
        }else h+='<div class="empty-hint">لم يتم تعيين أي موظف على هذا المشروع بعد.</div>';
        h+='</div>';

        h+='<div class="proj-sec">'+projectChatHtml(p.id,'pmChatLog'+idx,'pmChatInput'+idx)+'</div>';

        h+='<div class="proj-sec"><div class="proj-sec-title">⚙️ إدارة المشروع</div>';
        h+='<div style="display:flex;gap:8px;flex-wrap:wrap">'+
           '<button class="bt bt-o" onclick="toggleProjEdit('+idx+')">✏️ تعديل المشروع</button>'+
           '<button class="bt bt-o" onclick="printProjectDoc(window._pmgmtProjCache['+idx+'])">🖨 طباعة المشروع</button>'+
           '<button class="bt bt-d" onclick="deleteProject(\''+p.id+'\')">🗑 حذف المشروع</button>'+
           '</div>';

        h+='<div id="pmEdit'+idx+'" style="display:none;margin-top:14px;padding-top:14px;border-top:1px dashed var(--bd2)">'+
           '<div class="fg" style="margin-bottom:10px"><label>عنوان المشروع</label><input type="text" id="pmEditTitle'+idx+'" value="'+escH(p.title||'')+'"></div>'+
           '<div class="fg fg-full" style="margin-bottom:10px"><label>وصف مختصر</label><textarea rows="2" id="pmEditDesc'+idx+'">'+escH(p.description||'')+'</textarea></div>'+
           '<div class="fr fr3" style="margin-bottom:10px">'+
           '<div class="fg"><label>الأولوية</label><select id="pmEditPriority'+idx+'">'+
             ['منخفضة','متوسطة','عالية'].map(function(s){return '<option'+((p.priority||'متوسطة')===s?' selected':'')+'>'+s+'</option>';}).join('')+
           '</select></div>'+
           '<div class="fg"><label>حالة المشروع</label><select id="pmEditStatus'+idx+'">'+
             ['مخطط له','جاري العمل','متوقف','مكتمل'].map(function(s){return '<option'+((p.status||'مخطط له')===s?' selected':'')+'>'+s+'</option>';}).join('')+
           '</select></div>'+
           '<div class="fg"><label>تاريخ الاستحقاق</label><input type="date" id="pmEditDeadline'+idx+'" value="'+escH(p.deadline||'')+'"></div>'+
           '</div>'+
           '<div class="fg fg-full" style="margin-bottom:6px"><label>الموظفون المسؤولون</label></div>'+
           '<div class="chk-grid" id="pmEditAssignees'+idx+'">'+PMGMT_EMPLOYEES.map(function(e){
                var checked=assignees.indexOf(e.uid)>-1?' checked':'';
                return '<label><input type="checkbox" class="pm-edit-assignee-chk"'+checked+' value="'+e.uid+'"> '+escH(e.name||e.email)+'</label>';
           }).join('')+'</div>'+
           '<div style="display:flex;gap:8px;margin-top:10px">'+
           '<button class="bt bt-p" onclick="saveProjectEdit(\''+p.id+'\','+idx+')">💾 حفظ التعديلات</button>'+
           '<button class="bt bt-o" onclick="toggleProjEdit('+idx+')">إلغاء</button>'+
           '</div>'+
           '<div id="pmEditMsg'+idx+'" style="margin-top:8px;font-size:11px"></div>'+
           '</div>';
        h+='</div>'; // proj-sec إدارة المشروع

        h+='</div></div>';
    });
    box.innerHTML=h;
    list.forEach(function(p,idx){
        renderProjectChat(p.id,p.comments||[],'pmChatLog'+idx);
    });
}
function toggleProjCard(idx){
    var c=document.getElementById('pmCard'+idx);
    if(c)c.classList.toggle('open');
}
function toggleProjEdit(idx){
    var e=document.getElementById('pmEdit'+idx);
    if(!e)return;
    e.style.display=(e.style.display==='none'||!e.style.display)?'block':'none';
}
function saveProjectEdit(id,idx){
    var title=(document.getElementById('pmEditTitle'+idx).value||'').trim();
    var desc=(document.getElementById('pmEditDesc'+idx).value||'').trim();
    var priority=document.getElementById('pmEditPriority'+idx).value;
    var status=document.getElementById('pmEditStatus'+idx).value;
    var deadline=document.getElementById('pmEditDeadline'+idx).value||'';
    var msg=document.getElementById('pmEditMsg'+idx);
    if(!title){ msg.style.color='var(--no)'; msg.textContent='من فضلك اكتب عنوان المشروع.'; return; }
    var checked=Array.prototype.slice.call(document.querySelectorAll('#pmEditAssignees'+idx+' .pm-edit-assignee-chk:checked')).map(function(c){return c.value;});
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ الحفظ...';
    db.collection('projects').doc(id).update({title:title,description:desc,assignees:checked,priority:priority,status:status,deadline:deadline}).then(function(){
        loadPmgmtData();
    }).catch(function(err){
        msg.style.color='var(--no)'; msg.textContent='❌ تعذر الحفظ: '+err.message;
    });
}
function deleteProject(id){
    if(!confirm('حذف هذا المشروع نهائياً؟ لا يمكن التراجع عن هذا الإجراء.'))return;
    db.collection('projects').doc(id).delete().then(loadPmgmtData).catch(function(err){
        alert('تعذر حذف المشروع: '+err.message);
    });
}

function setD(c){
    var t=new Date().toISOString().split("T")[0];
    c.querySelectorAll('input[type="date"]').forEach(function(i){if(!i.value)i.value=t});
}
function toggleAnon(cb){
    var d=document.getElementById("cud");
    if(cb.checked){d.style.opacity="0.3";d.style.pointerEvents="none"}
    else{d.style.opacity="1";d.style.pointerEvents="auto"}
}

// ─── HTML BUILDERS ────────────────────────────────────────────────────────
// تنسيق موحّد لكل المستندات — يعتمد تصميم "الخطاب الرسمي" (FL) مع لوجو الشركة الفعلي
// ext=true: مستند خارجي (يُسلَّم لجهة خارج الشركة) — يأخذ برواز رسمي مزدوج عند الطباعة
function H(title,sub,en,docId,ext){
    var num=docId?genDocNum(docId):'';
    var h='<div class="FL'+(ext?' FL-external':'')+'">';
    h+='<div class="FL-head">'+
       '<div class="FL-brand">'+
       '<img class="FL-logo" src="'+LOGO_URI+'" alt="Tech Go">'+
       '<div class="FL-brand-text"><div class="FL-brand-ar dcn"></div><div class="FL-brand-sub">'+sub+'</div></div>'+
       '</div>'+
       '<div class="FL-doctype">'+title+(en?'<span class="FL-doctype-en">'+en+'</span>':'')+'</div>'+
       '</div>';
    h+='<div class="FL-rule"></div>';
    h+='<div class="FL-meta">'+
       '<div class="FL-meta-item"><span class="FL-meta-lbl">رقم المستند</span><input type="text" class="FL-meta-val doc-num-fld" value="'+escH(num)+'"></div>'+
       '<div class="FL-meta-item"><span class="FL-meta-lbl">التاريخ</span><input type="date" class="FL-meta-val"></div>'+
       '</div>';
    h+='<div class="FL-body">';
    return h;
}
function FT(copies){
    var cp=copies||['نسخة للموظف','نسخة للإدارة','نسخة للأرشيف'];
    var sp='';for(var i=0;i<cp.length;i++)sp+='<span>'+cp[i]+'</span>';
    return '</div><div class="FL-foot">'+
    '<span>شركة تيك – جو | وثيقة سرية تُحفظ في ملف الموظف</span>'+
    '<span class="FL-foot-ts print-only-ts"></span>'+
    '<span class="FL-foot-ref print-only-ts"></span>'+
    '<span class="FL-foot-copies">'+sp+'</span>'+
    '</div>'+
    '<div style="text-align:center;font-size:8px;color:#bbb;padding:4px 0 2px;border-top:1px solid #eee;margin-top:2px">تطوير وتصميم: أبانوب فايز</div>'+
    '</div>';
}

function SC(n,t){return '<div class="sec"><div class="num">'+n+'</div><div class="stx">'+t+'</div></div>'}

function _sig(title,name,sub,id){
    var nm=name?'<div class="sig-nm">'+escH(name)+'</div>':'<div class="sig-nm-ph"></div>';
    var ia=id?' id="'+id+'"':'';
    return '<div class="sig"'+ia+'>'+
        '<div class="st">'+title+'</div>'+nm+
        '<div class="ss">'+sub+'</div>'+
        '<div class="sl"></div>'+
        '<div class="sd">التاريخ: ..................</div>'+
        '</div>';
}

// توقيع بتصميم الخطاب الرسمي الجديد (FL) — يُستخدم في الخطاب الإداري العام
function _sigFL(role,name,sub,id){
    var nm=name?'<div class="FL-sig-name">'+escH(name)+'</div>':'<div class="FL-sig-name">&nbsp;</div>';
    var ia=id?' id="'+id+'"':'';
    return '<div class="FL-sig"'+ia+'>'+
        '<div class="FL-sig-role">'+role+'</div>'+
        '<div class="FL-sig-sub">'+sub+'</div>'+
        nm+
        '<div class="FL-sig-line"></div>'+
        '<div class="FL-sig-date">التاريخ: ..................</div>'+
        '</div>';
}
function SG3(a,sa,b,sb,c,sc,ar,br,cr){
    return '<div class="sigs">'+
        _sig(a,ar?MGRS[ar]:'',sa)+
        _sig(b,br?MGRS[br]:'',sb)+
        _sig(c,cr?MGRS[cr]:'',sc)+
        '</div>';
}
function SG2(a,sa,b,sb,ar,br){
    return '<div class="sigs sigs2">'+
        _sig(a,ar?MGRS[ar]:'',sa)+
        _sig(b,br?MGRS[br]:'',sb)+
        '</div>';
}
function F2(a,b){return '<div class="fr fr2">'+a+b+'</div>'}
function F3(a,b,c){return '<div class="fr fr3">'+a+b+c+'</div>'}
function FG(l,t,p){return '<div class="fg"><label>'+l+'</label><input type="'+(t||"text")+'"'+(p?' placeholder="'+p+'"':'')+'></div>'}
// حقل اسم موظف: يظهر كدروب ليست (Autocomplete) من قائمة الموظفين المحفوظة، مع إمكانية الكتابة اليدوية
function FGE(l){return '<div class="fg"><label>'+l+'</label><input type="text" class="emp-name-fld" list="tgEmpDL" autocomplete="off" onchange="addEmployeeName(this.value)"></div>'}
function FGA(l,r,p){return '<div class="fg fg-full"><label>'+l+'</label><textarea rows="'+(r||3)+'"'+(p?' placeholder="'+p+'"':'')+'></textarea></div>'}
function FGS(l,opts){var o='<option value="" selected></option>';for(var i=0;i<opts.length;i++)o+='<option>'+opts[i]+'</option>';return '<div class="fg"><label>'+l+'</label><select>'+o+'</select></div>'}

// ─── طباعة موحدة لمستندات الموظف (تُستخدم من لوحة الأدمن وبوابة الموظف معاً) ──
// تبحث عن إطار طباعة مخفي بمعرّف tgPrintFrame في الصفحة الحالية (موجود في index.html و employee.html)
function tgLine(lbl,val){
    return '<div class="FL-line"><span class="FL-line-lbl">'+lbl+'</span>'+
           '<input type="text" class="FL-line-val" readonly value="'+escH(val||'')+'"></div>';
}
function tgBlock(val){
    return '<textarea class="FL-textbody" rows="8" readonly>'+escH(val||'')+'</textarea>';
}
// إبقاء الأسماء القديمة كمرادفات (متوافقة مع الكود القديم في بوابة الموظف)
function empLine(lbl,val){ return tgLine(lbl,val); }
function empBlock(val){ return tgBlock(val); }
function printDoc(bodyHtml){
    var ifr=document.getElementById('tgPrintFrame');
    if(!ifr)return;
    fetch('styles.css?v='+Date.now()).then(function(res){return res.text();}).then(function(css){
        var doc=ifr.contentWindow.document;
        doc.open();
        doc.write('<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">'+
            '<style>'+css+'</style></head><body>'+bodyHtml+'</body></html>');
        doc.close();
        doc.querySelectorAll('.dcn').forEach(function(e){e.innerText=CN;});
        setTimeout(function(){
            ifr.contentWindow.focus();
            ifr.contentWindow.print();
        },500);
    }).catch(function(err){
        console.error('Failed to load CSS for print', err);
    });
}
function printWeeklyReportDoc(u,r){
    var h=H('تقرير أسبوعي','تقرير أداء أسبوعي مُرسل من الموظف','WEEKLY WORK REPORT','wkr');
    h+=SC('١','بيانات الموظف');
    h+=tgLine('اسم الموظف',u.name);
    if(u.email)h+=tgLine('البريد الإلكتروني',u.email);
    h+=tgLine('بداية الأسبوع',r.weekStart);
    h+=SC('٢','ملخص الأسبوع');
    h+=tgBlock(r.content);
    h+=FT(['نسخة للموظف','نسخة للإدارة']);
    printDoc(h);
}
function printAchievementDoc(u,a){
    var h=H('توثيق إنجاز','إنجاز مُسجّل من الموظف','ACHIEVEMENT RECORD','ach');
    h+=SC('١','بيانات الموظف');
    h+=tgLine('اسم الموظف',u.name);
    h+=tgLine('عنوان الإنجاز',a.title);
    h+=tgLine('التاريخ',a.date);
    h+=SC('٢','وصف الإنجاز');
    h+=tgBlock(a.description);
    h+=FT(['نسخة للموظف','نسخة للإدارة']);
    printDoc(h);
}
function printRequestDoc(u,r){
    var h=H('طلب موظف','طلب مُقدَّم من الموظف','EMPLOYEE REQUEST','req');
    h+=SC('١','بيانات الطلب');
    h+=tgLine('اسم الموظف',u.name);
    h+=tgLine('نوع الطلب',r.type);
    h+=tgLine('الحالة', r.status==='approved'?'موافق عليه':(r.status==='rejected'?'مرفوض':'قيد المراجعة'));
    if(r.fromDate) h+=tgLine('من تاريخ',r.fromDate);
    if(r.toDate) h+=tgLine('إلى تاريخ',r.toDate);
    if(r.reviewedBy) h+=tgLine('تمت المراجعة بواسطة',r.reviewedBy);
    h+=SC('٢','تفاصيل الطلب');
    h+=tgBlock(r.details);
    h+=FT(['نسخة للموظف','نسخة للإدارة']);
    printDoc(h);
}
function printProjectDoc(p){
    if(!p) return;
    // Fetch project comments first
    db.collection('projectComments').where('projectId','==',p.id).get().then(function(snap){
        var comments = snap.docs.map(function(d){ return d.data(); })
            .sort(function(a,b){
                var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
                var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
                return am-bm;
            });
        
        var h=H('تقرير مشروع','تقرير حالة المشروع وتحديثات الموظفين','PROJECT STATUS REPORT','proj');
        h+=SC('١','بيانات المشروع');
        h+=tgLine('اسم المشروع', p.title||'');
        if(p.description) h+=tgLine('الوصف', p.description);
        h+=tgLine('الأولوية', p.priority||'متوسطة');
        h+=tgLine('حالة المشروع', p.status||'مخطط له');
        if(p.deadline) h+=tgLine('تاريخ الاستحقاق', p.deadline);
        if(p.createdBy) h+=tgLine('أنشئ بواسطة', p.createdBy);
        h+=SC('٢','تقدّم الموظفين');
        var assignees = p.assignees||[];
        if(assignees.length){
            assignees.forEach(function(uid){
                var e = (PMGMT_EMPLOYEES||[]).find(function(x){return x.uid===uid;});
                var nm = e ? (e.name||e.email) : uid;
                var pm = (p.progressMap&&p.progressMap[uid])||{progress:0,status:'لم يبدأ',note:''};
                h+=tgLine('الموظف', nm);
                h+=tgLine('نسبة الإنجاز', (pm.progress||0)+'%');
                h+=tgLine('الحالة', pm.status||'لم يبدأ');
                if(pm.note) h+=tgLine('ملاحظة', pm.note);
                h+='<div style="border-bottom:1px dashed #ccc;margin:8px 0"></div>';
            });
        } else {
            h+=tgLine('الموظفون', 'لم يتم تعيين موظفين بعد');
        }
        
        // Add project comments to the report
        if(comments.length){
            h+=SC('٣','ملاحظات وتحديثات المشروع');
            comments.forEach(function(c){
                var roleLabel = (c.role==='admin'||c.role==='tech_admin')?'أدمن':'موظف';
                var timeStr = '';
                if(c.createdAt&&c.createdAt.toDate){
                    try{ timeStr=c.createdAt.toDate().toLocaleString('ar-EG'); }catch(e){}
                }
                var cHeader = escH(c.name||'') + ' ('+roleLabel+')' + (timeStr?' - '+timeStr:'');
                h+=tgLine(cHeader, c.text||'مرفق');
            });
        }

        h+=FT(['نسخة للإدارة','نسخة للأرشيف']);
        printDoc(h);
    }).catch(function(err){
        console.error('Error fetching comments for print', err);
        alert('حدث خطأ أثناء تحميل بيانات التقرير للطباعة.');
    });
}

// ─── حسابي — إعدادات شخصية مشتركة (تعمل للأدمن والموظف على حدٍّ سواء) ───────
function myAccountHTML(){
    var u=TG_USER||{};
    var h='<div class="SP"><h3>👤 حسابي</h3>';
    h+='<div class="set-hint">عدّل اسمك الظاهر في النظام، أو غيّر كلمة مرور حسابك. هذه الإعدادات خاصة بحسابك أنت فقط.</div>';

    h+='<div class="set-sec"><div class="set-sec-title">🧑 البيانات الشخصية</div>';
    h+='<div class="fg" style="margin-bottom:10px"><label>الاسم الظاهر في النظام</label><input type="text" id="acctName" value="'+escH(u.name||'')+'"></div>';
    h+='<div class="fg" style="margin-bottom:10px"><label>البريد الإلكتروني</label><input type="email" value="'+escH(u.email||'')+'" disabled></div>';
    h+='<button class="bt bt-p" onclick="saveMyName()">💾 حفظ الاسم</button>';
    h+='<div id="acctNameMsg" style="margin-top:8px;font-size:11px"></div></div>';

    h+='<div class="set-sec"><div class="set-sec-title">🔒 تغيير كلمة المرور</div>';
    h+='<div class="fr fr2" style="margin-top:8px">'+
       '<div class="fg"><label>كلمة المرور الحالية</label><input type="password" id="acctOldPass"></div>'+
       '<div class="fg"><label>كلمة المرور الجديدة</label><input type="password" id="acctNewPass" placeholder="6 أحرف على الأقل"></div>'+
       '</div>';
    h+='<button class="bt bt-p" onclick="saveMyPassword()">🔒 تحديث كلمة المرور</button>';
    h+='<div id="acctPassMsg" style="margin-top:8px;font-size:11px"></div></div>';

    h+='</div>';
    return h;
}
function saveMyName(){
    var inp=document.getElementById('acctName');
    var msg=document.getElementById('acctNameMsg');
    if(!inp||!msg)return;
    var name=(inp.value||'').trim();
    if(!name){ msg.style.color='var(--no)'; msg.textContent='من فضلك اكتب اسماً صحيحاً.'; return; }
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ الحفظ...';
    db.collection('users').doc(TG_USER.uid).update({name:name}).then(function(){
        TG_USER.name=name;
        msg.style.color='var(--ok)'; msg.textContent='✅ تم حفظ الاسم بنجاح.';
        var whoEl=document.getElementById('empWhoName'); if(whoEl) whoEl.textContent=name;
        var sbEl=document.getElementById('sbUser');
        if(sbEl) sbEl.innerHTML='👤 <strong style="color:#fff">'+escH(name)+'</strong><br>'+escH(TG_USER.email||'');
    }).catch(function(err){ msg.style.color='var(--no)'; msg.textContent='❌ '+err.message; });
}
function saveMyPassword(){
    var oldPass=(document.getElementById('acctOldPass').value||'');
    var newPass=(document.getElementById('acctNewPass').value||'');
    var msg=document.getElementById('acctPassMsg');
    if(!oldPass||!newPass){ msg.style.color='var(--no)'; msg.textContent='من فضلك املأ كلمة المرور الحالية والجديدة.'; return; }
    if(newPass.length<6){ msg.style.color='var(--no)'; msg.textContent='كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف.'; return; }
    msg.style.color='var(--tx3)'; msg.textContent='⏳ جارٍ التحديث...';
    var user=auth.currentUser;
    var cred=firebase.auth.EmailAuthProvider.credential(user.email,oldPass);
    user.reauthenticateWithCredential(cred).then(function(){
        return user.updatePassword(newPass);
    }).then(function(){
        msg.style.color='var(--ok)'; msg.textContent='✅ تم تحديث كلمة المرور بنجاح.';
        document.getElementById('acctOldPass').value='';
        document.getElementById('acctNewPass').value='';
    }).catch(function(err){
        var map={'auth/wrong-password':'كلمة المرور الحالية غير صحيحة.','auth/weak-password':'كلمة المرور الجديدة ضعيفة جداً.','auth/requires-recent-login':'يرجى تسجيل الخروج والدخول مرة أخرى ثم إعادة المحاولة.'};
        msg.style.color='var(--no)'; msg.textContent='❌ '+(map[err.code]||err.message);
    });
}

function logTbl(title,app,ref,cols,rows,docId){
    var h=H(title+' — ملحق '+app,ref,'',docId);
    h+=SC('١','بيانات الموظف');
    h+=F2(FG('السنة'),FG('القسم'))+F2(FG('الرقم الوظيفي'),FGE('اسم الموظف'));
    h+=SC('٢','السجل التفصيلي');
    h+='<table class="dt"><tr><th>م</th>';
    for(var i=0;i<cols.length;i++)h+='<th>'+cols[i]+'</th>';
    h+='</tr>';
    for(var r=1;r<=rows;r++){h+='<tr><td>'+r+'</td>';for(var j=0;j<cols.length;j++)h+='<td><input type="text"></td>';h+='</tr>'}
    h+='</table>';
    h+=SG3('توقيع الموظف','','المدير الإداري / مدير المشروعات','','المدير التنفيذي','',null,'admin','exec');
    h+=FT();
    return h;
}

// ─── MONTHLY EXPENSE SHEET (mexp) ──────────────────────────────────────────
function fmtMoney(n){
    n = isNaN(n) ? 0 : n;
    var parts = n.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.') + ' ج.م';
}
function mexpKey(){
    var mi = document.getElementById('mexp-month');
    return 'tg_mexp_' + (mi && mi.value ? mi.value : '');
}
function mexpInit(){
    var mi = document.getElementById('mexp-month');
    if(mi && !mi.value){
        var d = new Date();
        mi.value = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    }
    mexpLoad();
}
function mexpLoad(){
    var tbody = document.getElementById('mexp-tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    var raw = localStorage.getItem(mexpKey());
    var rows = [];
    try{ rows = raw ? JSON.parse(raw) : []; }catch(e){ rows = []; }
    if(rows.length === 0){
        for(var i = 0; i < 8; i++) mexpAddRow();
    } else {
        rows.forEach(function(r){ mexpAddRow(r); });
    }
    mexpCalc();
}
function mexpAddRow(row){
    var tbody = document.getElementById('mexp-tbody');
    if(!tbody) return;
    var tr = document.createElement('tr');
    var amtVal = (row && row.amt !== undefined && row.amt !== null && row.amt !== '') ? String(row.amt) : '';
    tr.innerHTML =
        '<td class="mexp-idx">' + (tbody.children.length + 1) + '</td>' +
        '<td><input type="text" class="mexp-spender" value="' + escH(row && row.spender || '') + '"></td>' +
        '<td><input type="text" class="mexp-cat" value="' + escH(row && row.cat || '') + '"></td>' +
        '<td><input type="number" step="0.01" class="mexp-amt" value="' + escH(amtVal) + '" oninput="mexpCalc()"></td>' +
        '<td><input type="date" class="mexp-date" value="' + escH(row && row.date || '') + '"></td>' +
        '<td><input type="text" class="mexp-notes" value="' + escH(row && row.notes || '') + '"></td>' +
        '<td class="np" style="text-align:center"><button class="bt bt-d" style="padding:3px 8px;font-size:10px" onclick="mexpDelRow(this)">✕</button></td>';
    tbody.appendChild(tr);
}
function mexpDelRow(btn){
    var tr = btn.closest('tr');
    if(tr) tr.remove();
    mexpReindex();
    mexpCalc();
}
function mexpReindex(){
    document.querySelectorAll('#mexp-tbody tr').forEach(function(tr, i){
        var idxEl = tr.querySelector('.mexp-idx');
        if(idxEl) idxEl.innerText = i + 1;
    });
}
function mexpCalc(){
    var total = 0, count = 0;
    document.querySelectorAll('#mexp-tbody .mexp-amt').forEach(function(inp){
        var v = parseFloat(inp.value);
        if(!isNaN(v) && v !== 0){ total += v; count++; }
    });
    var tf = document.getElementById('mexp-total'); if(tf) tf.value = fmtMoney(total);
    var cf = document.getElementById('mexp-count'); if(cf) cf.value = count;
    var tc = document.getElementById('mexp-total-cell'); if(tc) tc.innerText = fmtMoney(total);
}
function mexpSave(){
    var rows = [];
    document.querySelectorAll('#mexp-tbody tr').forEach(function(tr){
        var spender = tr.querySelector('.mexp-spender').value;
        var cat = tr.querySelector('.mexp-cat').value;
        var amt = tr.querySelector('.mexp-amt').value;
        var date = tr.querySelector('.mexp-date').value;
        var notes = tr.querySelector('.mexp-notes').value;
        if(spender || cat || amt || date || notes){
            rows.push({spender: spender, cat: cat, amt: amt, date: date, notes: notes});
        }
    });
    localStorage.setItem(mexpKey(), JSON.stringify(rows));
    var mi = document.getElementById('mexp-month');
    alert('✅ تم حفظ شيت المصروفات لشهر ' + (mi ? mi.value : ''));
}

// ─── MAIN LOAD ────────────────────────────────────────────────────────────
function load(id,c){
    var h="";

    // ── خطاب إداري عام (تصميم رسمي FL — نفس تنسيق كل المستندات) ──────────
    if(id==="gen"){
        h=H('خطاب إداري عام','نظام الإدارة الشامل · وثيقة رسمية','General Memorandum','gen');
        h+='<div class="FL-line"><span class="FL-line-lbl">إلى:</span><input type="text" class="FL-line-val" placeholder="الجهة / الشخص المرسل إليه"></div>';
        h+='<div class="FL-line"><span class="FL-line-lbl">من:</span><input type="text" class="FL-line-val" placeholder="الجهة المُصدرة"></div>';
        h+='<div class="FL-line"><span class="FL-line-lbl">الموضوع:</span><input type="text" class="FL-line-val FL-subject" placeholder="اكتب موضوع الخطاب هنا..."></div>';
        h+='<div class="FL-types">'+
           '<label><input type="radio" name="gtype" class="tpl-default-radio" checked> تعميم عام</label>'+
           '<label><input type="radio" name="gtype"> إشعار رسمي</label>'+
           '<label><input type="radio" name="gtype"> طلب إداري</label>'+
           '<label><input type="radio" name="gtype"> توجيه عمل</label>'+
           '<label><input type="radio" name="gtype"> دعوة لاجتماع</label>'+
           '<label><input type="radio" name="gtype"> أخرى</label>'+
           '</div>';
        h+='<input type="text" class="FL-open tpl-default" value="تحية طيبة وبعد،">';
        h+='<textarea class="FL-textbody" rows="9" placeholder="يرجى كتابة محتوى الخطاب بالتفصيل هنا..."></textarea>';
        h+='<input type="text" class="FL-close tpl-default" value="وتفضلوا بقبول فائق الاحترام والتقدير.">';
        h+='<div class="FL-extra">'+
           '<div class="FL-line"><span class="FL-line-lbl">مرفقات:</span><input type="text" class="FL-line-val"></div>'+
           '<div class="FL-line"><span class="FL-line-lbl">نسخة إلى:</span><input type="text" class="FL-line-val"></div>'+
           '</div>';
        h+='<div class="FL-types" style="margin-top:0">'+
           '<label><input type="radio" name="gsign" value="admin" class="tpl-default-radio" checked onclick="updGenSig(this)"> يُعتمد من المدير الإداري</label>'+
           '<label><input type="radio" name="gsign" value="tech" onclick="updGenSig(this)"> يُعتمد من المدير التقني</label>'+
           '<label><input type="radio" name="gsign" value="exec" onclick="updGenSig(this)"> يُعتمد من المدير التنفيذي</label>'+
           '</div>';
        h+='<div class="FL-signrow">'+
           _sigFL('محرر الخطاب','','إعداد ومراجعة')+
           _sigFL('المدير الإداري / مدير المشروعات',MGRS.admin,'اعتماد وإصدار','gen-issuer-sig')+
           _sigFL('المستلم','','بالعلم والاستلام')+
           '</div>';
        h+=FT(['نسخة للمُصدر','نسخة للمستلم','نسخة للأرشيف']);
    }

    // ── نموذج لفت نظر ──────────────────────────────────────────────────
    else if(id==="notice"){
        h=H('نموذج لفت نظر','إنذار رسمي وفق اللائحة التنظيمية','OFFICIAL NOTICE','notice');
        h+=SC('١','بيانات الموظف');
        h+=F2(FGE('اسم الموظف'),FG('القسم / الإدارة'));
        h+=F2(FG('الكود الوظيفي'),FG('تاريخ التعيين','date'));
        h+=F2(FG('المسمى الوظيفي'),FG('المدير المباشر'));
        h+=SC('٢','تفاصيل المخالفة');
        h+=F2(FG('تاريخ المخالفة','date'),FG('المادة المخالفة'));
        h+='<div class="chk-grid"><label><input type="checkbox"> الانصراف المبكر</label><label><input type="checkbox"> الغياب بدون إذن</label><label><input type="checkbox"> التأخر في الحضور</label><label><input type="checkbox"> مخالفة اللوائح</label><label><input type="checkbox"> عدم الرد على المديرين</label><label><input type="checkbox"> إهمال في العمل</label></div>';
        h+='<div class="fg"><label>أخرى</label><input type="text"></div>';
        h+=FGA('وصف المخالفة بالتفصيل',4);
        h+=SC('٣','الإجراء المتخذ والتحذير الرسمي');
        h+='<div class="wb wb-gd"><strong>⚠ تنبيه رسمي</strong><br>يُعدّ هذا الإنذار وثيقة رسمية محفوظة في ملف الموظف، وفق أحكام قانون العمل المصري رقم 12 لسنة 2003. يُلزَم الموظف بالالتزام الفوري بأحكام المادة (1) من اللائحة التنظيمية.</div>';
        h+='<div class="wb wb-gd"><span class="wb-t">سياسة الخصم التراكمي</span> <span class="wb-t2">تطبيق تلقائي</span><br>في حال بلوغ عدد نماذج لفت النظر ٤ نماذج أو أكثر خلال الشهر التقويمي الواحد، يُطبَّق خصم من الراتب تلقائياً بقرار من المدير التنفيذي.</div>';
        h+=SC('٤','التوقيعات');
        h+=SG3('توقيع الموظف','إقراراً باستلام هذا الإنذار',
               'المدير الإداري / مدير المشروعات','اعتماد وإشهاد',
               'المدير التنفيذي','موافقة وإصدار',
               null,'admin','exec');
        h+=FT();
    }

    // ── نموذج إدارة المشروع ─────────────────────────────────────────────
    else if(id==="proj"){
        h=H('نموذج إدارة المشروع','متابعة وتوثيق المشاريع — للاستخدام الداخلي','PROJECT MANAGEMENT','proj');
        h+=SC('١','بيانات المشروع الأساسية');
        h+=F3(FG('اسم المشروع'),FG('التاريخ','date'),FG('المسؤول التقني عن المشروع'));
        h+='<div class="fg fg-full"><label>الحالة</label><div class="chk-grid" style="grid-template-columns:repeat(5,1fr)"><label><input type="checkbox"> مكتمل</label><label><input type="checkbox"> قيد التنفيذ</label><label><input type="checkbox"> في الانتظار</label><label><input type="checkbox"> متأخر</label><label><input type="checkbox"> مراجعة</label></div></div>';
        h+=SC('٢','معلومات المشروع');
        h+=F2(FG('نوع المشروع'),FG('العميل / الجهة'));
        h+=F2(FG('الموعد النهائي','date'),FG('تاريخ البداية','date'));
        h+=F2(FG('القسم المسؤول'),FG('الميزانية'));
        h+=F2(FG('رقم التواصل','tel'),FG('عدد الأعضاء','number'));
        h+=SC('٣','تفاصيل المشروع');
        h+=FGA('وصف المشروع',4);
        h+='<div class="fg fg-full"><label>الأولوية</label><div class="chk-grid" style="grid-template-columns:repeat(3,1fr)"><label><input type="radio" name="prp"> عالية</label><label><input type="radio" name="prp"> متوسطة</label><label><input type="radio" name="prp"> عادية</label></div></div>';
        h+='<div class="fg"><label>نسبة الإنجاز</label><input type="text" placeholder="%"></div>';
        h+=SC('٤','فريق العمل والمهام');
        h+='<table class="dt"><tr><th>م</th><th>الاسم والوظيفة</th><th>التاسك</th><th>الموعد</th><th>الأولوية</th><th>الحالة</th><th>ملاحظة</th></tr>';
        for(var pr=1;pr<=12;pr++) h+='<tr><td>'+pr+'</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>';
        h+='</table>';
        h+=SC('٥','ملاحظات عامة على المشروع');
        h+=FGA('',4);
        h+=SC('٦','التوقيعات');
        h+=SG3('مدير المشروعات','','المدير التقني','','المدير التنفيذي','اعتماد',null,null,'exec');
        h+=FT();
    }



    // ── ملف بيانات الموظف ──────────────────────────────────────────────
    else if(id==="emp"){
        h=H('ملف بيانات الموظف الكامل','يرجى التعبئة بخط واضح · للاستخدام الداخلي فقط','EMPLOYEE FILE','emp');
        h+=SC('١','البيانات الشخصية');
        h+=F2(FG('الاسم الكامل'),FG('الرقم القومي'));
        h+=F3(FG('تاريخ الميلاد','date'),FG('الجنسية'),FGS('الحالة الاجتماعية',['أعزب','متزوج','مطلق','أرمل']));
        h+=F2(FG('رقم الهاتف','tel'),FG('البريد الإلكتروني','email'));
        h+='<div class="fg"><label>العنوان</label><input type="text"></div>';
        h+=SC('٢','بيانات الوظيفة');
        h+=F2(FG('المسمى الوظيفي'),FG('القسم / الإدارة'));
        h+=F3(FG('تاريخ التعيين','date'),FG('الرقم الوظيفي'),FGS('نوع العقد',['دوام كامل','دوام جزئي','عقد مؤقت']));
        h+=F2(FG('المدير المباشر'),FG('درجة الوظيفة'));
        h+=SC('٣','ساعات العمل والحضور — المادة ١');
        h+='<table class="dt"><tr><th>أيام العمل</th><td>الأحد — الخميس</td><th>الحد الأقصى اليومي</th><td>٨ ساعات (م. ١١٧)</td></tr><tr><th>وقت الحضور</th><td>١٠:٠٠ صباحاً</td><th>فترة السماح</th><td>حتى ١٠:٣٠ صباحاً</td></tr><tr><th>وقت الانصراف</th><td>٦:٠٠ مساءً</td><th>نظام العمل</th><td>حضوري — هجين عند الحاجة</td></tr><tr><th>تسجيل الحضور</th><td>بجهاز البصمة إلزامياً</td><th>إخطار الاستقالة</th><td>شهر على الأقل مسبقاً</td></tr></table>';
        h+=SC('٤','العمل الإضافي — المادة ٢');
        h+='<table class="dt"><tr><th>الحد الأقصى اليومي</th><td>١٠ ساعات (م. ١١٩)</td><th>عمل يوم الراحة</th><td>مثلي الأجر أو يوم بديل</td></tr><tr><th>بدل إضافي نهاري</th><td>لا يقل عن ٣٥٪ من الأجر</td><th>بدل إضافي ليلي</th><td>لا يقل عن ٧٠٪ من الأجر</td></tr></table>';
        h+=SC('٥','الإجازات — المادة ٣');
        h+='<table class="dt"><tr><th>نوع الإجازة</th><th>الاستحقاق</th><th>ملاحظات</th></tr><tr><td>سنوية — السنة الأولى</td><td>١٥ يوماً</td><td>السنة الأولى: ٦ أيام متصلة على الأقل</td></tr><tr><td>سنوية — السنة الثانية +</td><td>٢١ يوماً</td><td>من السنة الثانية فصاعداً</td></tr><tr><td>ذوو الإعاقة والأقزام</td><td>٤٥ يوماً</td><td>م. ١٢٤</td></tr><tr><td>عارضة (م. ١٢٨)</td><td>٧ أيام/سنة — حد أقصى يومان/مرة</td><td>تحتسب من الإجازة السنوية</td></tr><tr><td>أعياد ومناسبات (م. ١٢٩)</td><td>بأجر كامل</td><td>بقرار من الوزير المختص</td></tr></table>';
        h+='<div style="font-size:9px;color:var(--tx3);margin-top:4px">⊳ التفاصيل الكاملة وسجلات الإجازة في الملاحق (أ، ب، ج) المرفقة</div>';
        h+=SC('٦','الإقرار والتوقيع');
        h+='<div class="wb wb-gd">أقر بأنني اطلعت على اللائحة التنظيمية لشركة تيك جو وأتعهد بالالتزام الكامل بجميع بنودها.</div>';

        // ملحق أ
        h+='<div class="sec" style="margin-top:0"><div class="num">أ</div><div class="stx">ملحق (أ) — سجل الإجازة السنوية</div></div>';
        h+='<div style="font-size:9px;color:var(--tx3);margin-bottom:6px">استناداً للمادتين ١٢٤ و١٢٥ من اللائحة التنظيمية</div>';
        h+=F2(FG('السنة'),FGE('اسم الموظف'));
        h+=F3(FG('إجمالي الاستحقاق (يوم)'),FG('الأيام المستخدمة'),FG('الرصيد المتبقي'));
        h+='<div class="wb wb-bl" style="font-size:9px">⊳ الاستحقاق: ١٥ يوماً في السنة الأولى · ٢١ يوماً من السنة الثانية · ٤٥ يوماً لذوي الإعاقة (م. ١٢٤)</div>';
        h+='<table class="dt"><tr><th>م</th><th>تاريخ البدء</th><th>تاريخ الانتهاء</th><th>تاريخ العودة</th><th>الأيام المستخدمة</th><th>الموافقة</th><th>ملاحظات</th></tr>';
        for(var aa=1;aa<=20;aa++) h+='<tr><td>'+aa+'</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>';
        h+='</table>';
        h+='<div class="wb wb-bl" style="font-size:8px">⊳ م. ١٢٤: يستحق الموظف إجازة سنوية بأجر لا تحتسب فيها أيام العطلات والأعياد وأيام الراحة الأسبوعية.<br>⊳ م. ١٢٥: يحدد صاحب العمل مواعيد الإجازة وفق مقتضيات العمل، ولا يجوز قطعها إلا لأسباب قوية.<br>⊳ م. ١٢٧: يحق لصاحب العمل استرداد أجر الإجازة إذا ثبت اشتغال الموظف لدى جهة أخرى خلالها.<br>⊳ عند انتهاء العلاقة الوظيفية يستحق الموظف أجر رصيد الإجازات غير المستخدمة كاملاً.</div>';

        // ملحق ب
        h+='<div class="sec" style="margin-top:0"><div class="num">ب</div><div class="stx">ملحق (ب) — سجل الإجازة العارضة</div></div>';
        h+='<div style="font-size:9px;color:var(--tx3);margin-bottom:6px">استناداً للمادة ١٢٨ من اللائحة التنظيمية</div>';
        h+=F2(FG('السنة'),FGE('اسم الموظف'));
        h+=F3(FG('الحد الأقصى السنوي'),FG('إجمالي الأيام المستخدمة'),FG('الرصيد المتبقي من ٧'));
        h+='<div class="wb wb-gd" style="font-size:9px">⊳ الإجازة العارضة تخصم تلقائياً من رصيد الإجازة السنوية (م. ١٢٨)<br>⊳ الحد الأقصى في المرة الواحدة: يومان فقط — أي طلب يتجاوز اليومين يحول تلقائياً إلى إجازة سنوية</div>';
        h+='<table class="dt"><tr><th>م</th><th>السبب</th><th>تاريخ البدء</th><th>تاريخ العودة</th><th>عدد الأيام</th><th>الموافقة</th><th>ملاحظات</th></tr>';
        for(var bb=1;bb<=12;bb++) h+='<tr><td>'+bb+'</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>';
        h+='</table>';

        // ملحق ج
        h+='<div class="sec" style="margin-top:0"><div class="num">ج</div><div class="stx">ملحق (ج) — سجل إجازات الأعياد والمناسبات</div></div>';
        h+='<div style="font-size:9px;color:var(--tx3);margin-bottom:6px">استناداً للمادة ١٢٩ من اللائحة التنظيمية</div>';
        h+=F2(FG('السنة'),FGE('اسم الموظف'));
        h+=F3(FG('إجمالي أيام الأعياد'),FG('أيام عمل في عطلة (مثلي الأجر)'),FG('أيام راحة بديلة مستحقة'));
        h+='<div class="wb wb-gd" style="font-size:9px">⊳ التشغيل في أيام الأعياد يستوجب مثلي الأجر أو يوم راحة بديل — م. ١٢٩</div>';
        h+='<table class="dt"><tr><th>م</th><th>التاريخ</th><th>المناسبة</th><th>هل عمل؟</th><th>البديل</th><th>الموافقة</th><th>ملاحظات</th></tr>';
        for(var cc=1;cc<=15;cc++) h+='<tr><td>'+cc+'</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>';
        h+='</table>';

        // ملحق د
        h+='<div class="sec" style="margin-top:0"><div class="num">د</div><div class="stx">ملحق (د) — سجل الغياب بالخصم</div></div>';
        h+='<div style="font-size:9px;color:var(--tx3);margin-bottom:6px">استناداً للمادة ١٣٠ من اللائحة التنظيمية</div>';
        h+=F2(FG('السنة'),FGE('اسم الموظف'));
        h+='<div class="wb wb-gd" style="font-size:9px">⊳ يسجل الغياب بغير عذر مقبول ويخصم من أجر الموظف بواقع أجر اليوم الواحد (م. ١٣٠)<br>⊳ الحد الأقصى للخصم الشهري لا يتجاوز أجر ستة أيام — الزيادة تحال لمسار الجزاءات التأديبية</div>';
        h+='<table class="dt"><tr><th>م</th><th>التاريخ</th><th>سبب الغياب</th><th>أيام الغياب</th><th>نسبة الخصم %</th><th>مبلغ الخصم (جنيه)</th><th>الموافقة</th><th>ملاحظات</th></tr>';
        for(var dd=1;dd<=13;dd++) h+='<tr><td>'+dd+'</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>';
        h+='</table>';
        h+='<div class="wb wb-bl" style="font-size:8px">⊳ م. ١٣٠: يخصم من أجر الموظف عن كل يوم غياب بدون عذر بواقع أجر يوم واحد كامل.<br>⊳ م. ١٣١: يوثق قرار الخصم بموافقة خطية من المدير المباشر ويحفظ في ملف الموظف.<br>⊳ لا يحتسب الغياب بعذر مقبول (مرض بتقرير طبي أو إجازة معتمدة) ضمن هذا السجل.</div>';

        // ملاحظات 1
        h+='<div class="sec" style="margin-top:0"><div class="num">✎</div><div class="stx">ملاحظات (١)</div></div>';
        h+='<div class="fg fg-full"><label>صفحة الملاحظات ١</label><textarea rows="13" style="line-height:2.1;border:1px solid var(--bd)"></textarea></div>';

        // ملاحظات 2
        h+='<div class="sec" style="margin-top:6px"><div class="num">✎</div><div class="stx">ملاحظات (٢)</div></div>';
        h+='<div class="fg fg-full"><label>صفحة الملاحظات ٢</label><textarea rows="13" style="line-height:2.1;border:1px solid var(--bd)"></textarea></div>';
        h+=SG3('توقيع الموظف','','المدير الإداري / مدير المشروعات','','المدير التنفيذي','',null,'admin','exec');
        h+=FT();
    }

    // ── طلب إجازة ──────────────────────────────────────────────────────
    else if(id==="leave"){
        h=H('نموذج طلب إجازة','اللائحة التنظيمية — المادة الثالثة','LEAVE REQUEST','leave');
        h+=SC('١','بيانات الموظف');
        h+=F2(FG('الاسم بالكامل'),FG('القسم / الإدارة'));
        h+=F2(FG('المسمى الوظيفي'),FG('رقم التواصل أثناء الإجازة','tel'));
        h+=SC('٢','نوع الإجازة');
        h+='<div class="chk-grid" style="grid-template-columns:1fr 1fr"><label><input type="radio" name="lt"> <strong>إجازة سنوية</strong> (م.١٢٤)</label><label><input type="radio" name="lt"> <strong>إجازة عارضة</strong> (م.١٢٨)</label></div>';
        h+=SC('٣','مدة الإجازة');
        h+=F3(FG('تاريخ البدء','date'),FG('تاريخ الانتهاء','date'),FG('عدد الأيام','number'));
        h+=SC('٤','سبب الإجازة والرصيد');
        h+='<div class="fg"><label>سبب الإجازة</label><input type="text"></div>';
        h+=F3(FG('الرصيد المتاح'),FG('الرصيد المتبقي'),FG('البديل أثناء الغياب'));
        h+='<div class="wb wb-gd"><strong>⚠ م.١٢٧:</strong> العمل لدى جهة أخرى أثناء الإجازة يُعرّض الموظف للحرمان من الأجر أو الجزاء التأديبي.</div>';
        h+=SC('٥','حالة الطلب');
        h+='<div class="stg"><button class="stb ok" onclick="ts(this)">✅ موافق</button><button class="stb no" onclick="ts(this)">❌ مرفوض</button><button class="stb pn a" onclick="ts(this)">⏳ معلق</button></div>';
        h+=SC('٦','التوقيعات');
        h+=SG3('توقيع الموظف','','المدير الإداري / مدير المشروعات','الموافقة','المدير التنفيذي','الاعتماد النهائي',null,'admin','exec');
        h+=FT();
    }

    // ── إذن حضور / انصراف ─────────────────────────────────────────────
    else if(id==="perm"){
        h=H('إذن حضور / انصراف','اللائحة التنظيمية — المادة الثالثة','ATTENDANCE PERMISSION','perm');
        h+=SC('١','نوع الإذن');
        h+='<div class="chk-grid" style="grid-template-columns:1fr 1fr"><label><input type="radio" name="pt"> <strong>حضور</strong> بعد مواعيد العمل</label><label><input type="radio" name="pt"> <strong>انصراف</strong> قبل مواعيد العمل</label></div>';
        h+=SC('٢','بيانات الموظف');
        h+=F2(FGE('اسم الموظف'),FG('الرقم الوظيفي'));
        h+=F2(FG('القسم / الإدارة'),FG('التاريخ','date'));
        h+=SC('٣','تفاصيل الإذن');
        h+=F3(FG('الموعد الرسمي','time'),FG('الحضور/الانصراف الفعلي','time'),FG('مدة الفارق'));
        h+=FGA('السبب',2);
        h+=SC('٤','التوقيعات');
        h+=SG3('توقيع الموظف','','المدير الإداري','الموافقة','المدير التنفيذي','',null,'admin','exec');
        h+='<div style="text-align:center;font-size:8px;color:var(--tx3);margin-top:6px">المغادرة أو التأخر بدون إذن موقع يعد مخالفة تأديبية م. ١٢٤</div>';
        h+=FT();
    }

    // ── التماس تعديل موعد الحضور ──────────────────────────────────────
    else if(id==="delay"){
        h=H('التماس تعديل موعد الحضور','طلب تعديل موعد الحضور الرسمي بصفة دائمة','ATTENDANCE DELAY REQUEST','delay');

        // ١ — بيانات الموظف
        h+=SC('١','بيانات الموظف');
        h+=F2(FGE('اسم الموظف الكامل'),FG('الرقم الوظيفي'));
        h+=F2(FG('المسمى الوظيفي'),FG('القسم / الإدارة'));
        h+=F2(FG('رقم التواصل','tel'),FG('التاريخ','date'));

        // ٢ — تفاصيل الالتماس
        h+=SC('٢','تفاصيل الالتماس');
        h+=F3(
            FG('موعد الحضور الرسمي الحالي','time'),
            '<div class="fg"><label>مدة التأخير المطلوبة</label><select><option>ساعة واحدة كحد أقصى</option><option>ساعتان كحد أقصى</option></select></div>',
            FG('الموعد المقترح بعد التعديل','time')
        );
        h+=FGA('سبب طلب التعديل (يُرجى التفصيل)',4,
            'مثال: بُعد مسافة السكن عن مقر العمل وشُح وسائل المواصلات المتاحة في أوقات الصباح الباكر...');

        // ٣ — التزامات الموظف
        h+=SC('٣','التزامات الموظف');
        h+='<div class="wb wb-gd" style="font-size:11px;line-height:2">'
          +'<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;margin-bottom:6px">'
          +'<input type="checkbox" style="margin-top:4px;flex-shrink:0"> '
          +'<span>أتعهد بإتمام ساعات العمل الكاملة المقررة يومياً دون تقليص.</span>'
          +'</label>'
          +'<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;margin-bottom:6px">'
          +'<input type="checkbox" style="margin-top:4px;flex-shrink:0"> '
          +'<span>أتعهد بتعويض وقت التأخير بالانصراف في وقت متأخر مماثل بالضبط.</span>'
          +'</label>'
          +'<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer">'
          +'<input type="checkbox" style="margin-top:4px;flex-shrink:0"> '
          +'<span>أتعهد بإخطار المدير المباشر فوراً في حال أي تغيير على الظروف الموضحة أعلاه.</span>'
          +'</label>'
          +'</div>';

        // ٤ — إشعار مهم
        h+=SC('٤','إشعار هام');
        h+='<div class="wb wb-gd" style="font-size:10px;line-height:1.9;border-right:4px solid var(--no,#e53e3e)">'
          +'<strong>⚠ تنبيه:</strong> يُعدّ هذا الالتماس نافذاً فقط بعد الموافقة الخطية من المدير الإداري والمدير التنفيذي.<br>'
          +'في حال رفض الطلب، يلتزم الموظف بالحضور في الموعد الرسمي المحدد بالساعة العاشرة صباحاً وفق اللائحة التنظيمية.<br>'
          +'<strong>يُحفظ هذا الالتماس في الملف الشخصي للموظف ويُعدّ وثيقة رسمية.</strong>'
          +'</div>';

        // ٥ — حالة الطلب
        h+=SC('٥','قرار الإدارة');
        h+='<div class="stg"><button class="stb ok" onclick="ts(this)">✅ موافق</button>'
          +'<button class="stb no" onclick="ts(this)">❌ مرفوض</button>'
          +'<button class="stb pn a" onclick="ts(this)">⏳ قيد الدراسة</button></div>';
        h+='<div class="fg" style="margin-top:10px"><label>ملاحظات الإدارة</label><input type="text" placeholder="أي ملاحظات أو شروط مرفقة بالموافقة..."></div>';

        // ٦ — التوقيعات
        h+=SC('٦','التوقيعات');
        h+=SG3(
            'توقيع الموظف','مقدم الالتماس',
            'المدير الإداري / مدير المشروعات','اعتماد وتوثيق',
            'المدير التنفيذي','الموافقة النهائية',
            null,'admin','exec'
        );
        h+=FT();
    }

    // ── سجلات الإجازة ──────────────────────────────────────────────────
    else if(id==="la") h=logTbl('سجل الإجازة السنوية','أ','المادتين ١٢٤ و١٢٥',['تاريخ البدء','الانتهاء','العودة','الأيام','الموافقة','ملاحظات'],15,'la');
    else if(id==="lb") h=logTbl('سجل الإجازة العارضة','ب','المادة ١٢٨',['السبب','تاريخ البدء','العودة','الأيام','الموافقة','ملاحظات'],12,'lb');
    else if(id==="lc") h=logTbl('سجل الأعياد والمناسبات','ج','المادة ١٢٩',['التاريخ','المناسبة','هل عمل؟','البديل','الموافقة','ملاحظات'],15,'lc');
    else if(id==="ld") h=logTbl('سجل الغياب بالخصم','د','المادة ١٣٠',['التاريخ','السبب','الأيام','الخصم %','المبلغ','الموافقة','ملاحظات'],13,'ld');

    // ── خطاب إنذار ────────────────────────────────────────────────────
    else if(id==="warn"){
        h=H('خطاب إنذار إداري','توجيه إنذار لعدم الالتزام باللوائح','WARNING LETTER','warn');
        h+=SC('١','بيانات الموظف');
        h+=F2(FGE('اسم الموظف'),FG('الرقم الوظيفي'));
        h+=F2(FG('المسمى الوظيفي'),FG('القسم / الإدارة'));
        h+=SC('٢','درجة الإنذار');
        h+='<div class="chk-grid" style="grid-template-columns:1fr 1fr 1fr"><label style="color:var(--wn)"><input type="radio" name="wl"> <strong>إنذار أول</strong></label><label style="color:#ed8936"><input type="radio" name="wl"> <strong>إنذار ثانٍ</strong></label><label style="color:var(--no)"><input type="radio" name="wl"> <strong>إنذار نهائي</strong></label></div>';
        h+=SC('٣','تفاصيل المخالفة');
        h+=FGA('أسباب توجيه الإنذار (المخالفات)',4);
        h+=FGA('الإجراءات التصحيحية المطلوبة',3);
        h+='<div class="wb wb-gd"><strong>⚠</strong> في حالة تكرار المخالفة يحق للشركة اتخاذ إجراءات تصعيدية قد تصل إلى الفصل.</div>';
        h+=SC('٤','التوقيعات');
        h+=SG3('توقيع الموظف','بالاستلام والعلم',
               'المدير الإداري / مدير المشروعات','اعتماد وإشهاد',
               'المدير التنفيذي','موافقة وإصدار',
               null,'admin','exec');
        h+=FT();
    }

    // ── محضر تحقيق ────────────────────────────────────────────────────
    else if(id==="inv"){
        h=H('محضر تحقيق داخلي','توثيق رسمي لجلسة تحقيق','INVESTIGATION REPORT','inv');
        h+=SC('١','بيانات الجلسة');
        h+=F3(FG('تاريخ التحقيق','date'),FG('وقت التحقيق','time'),FG('مكان التحقيق'));
        h+=SC('٢','أطراف التحقيق');
        h+=F2(FG('المحقق (الاسم والصفة)'),FG('المُحال للتحقيق'));
        h+=SC('٣','مجريات التحقيق');
        h+=FGA('ملخص المخالفة المنسوبة',3);
        h+=FGA('الأسئلة والأجوبة',8,'س: ...\nج: ...');
        h+=SC('٤','التوصيات والقرارات');
        h+=FGA('',3);
        h+=SC('٥','التوقيعات');
        h+=SG3('الموظف','أقر بصحة أقوالي',
               'المدير الإداري / المحقق','',
               'المدير التنفيذي','اعتماد وإصدار',
               null,'admin','exec');
        h+=FT();
    }

    // ── شهادة خبرة ────────────────────────────────────────────────────
    else if(id==="exp"){
        h=H('شهادة خبرة','إدارة الموارد البشرية','EXPERIENCE CERTIFICATE','exp',true);
        h+='<div class="cert"><h2 style="text-align:center;color:var(--nv);font-size:20px;font-weight:800;text-decoration:underline;margin-bottom:24px">شـهـادة خـبـرة</h2>';
        h+='<div style="text-align:left;margin-bottom:24px">التاريخ: <input type="date"></div>';
        h+='تشهد إدارة الموارد البشرية بشركة <strong><span class="dcn"></span></strong> بأن:<br><br>';
        h+='السيد/ة: <input type="text" style="width:280px;font-weight:bold"><br>';
        h+='والذي يحمل جنسية: <input type="text" style="width:150px"><br><br>';
        h+='قد عمل لدينا بوظيفة: <input type="text" style="width:230px;font-weight:bold"><br>';
        h+='خلال الفترة من <input type="date"> إلى <input type="date"><br><br>';
        h+='وقد أُعطيت له هذه الشهادة بناءً على طلبه دون أدنى مسؤولية على الشركة.';
        h+='<div style="margin-top:50px;display:flex;justify-content:space-between;align-items:flex-end;text-align:center">'+
           '<div><div style="font-weight:700;color:var(--nv);margin-bottom:24px">ختم الشركة</div>'+
           '<div style="width:100px;height:100px;border:2px dashed #cbd5e0;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;color:#a0aec0;font-size:9px;transform:rotate(-15deg)">موقع الختم</div></div>'+
           '<div style="text-align:center"><div style="font-weight:700;color:var(--nv);margin-bottom:6px">المدير التنفيذي</div>'+
           '<div class="cert-mgr-nm">'+(MGRS.exec||'&nbsp;')+'</div>'+
           '<div style="border-bottom:1.5px solid #333;width:220px;margin:0 auto"></div></div>'+
           '</div>';
        h+=FT(['نسخة للموظف','نسخة للأرشيف']);
    }

    // ── إخلاء طرف ─────────────────────────────────────────────────────
    else if(id==="clr"){
        h=H('نموذج إخلاء طرف · براءة ذمة','يُعبأ عند انتهاء خدمات الموظف','CLEARANCE FORM','clr');
        h+=SC('١','بيانات الموظف');
        h+=F3(FG('الاسم'),FG('الرقم الوظيفي'),FG('القسم'));
        h+=F2(FG('آخر يوم عمل','date'),FGS('سبب إنهاء الخدمة',['استقالة','انتهاء عقد','إقالة']));
        h+=SC('٢','تواقيع الإدارات (إخلاء العُهد)');
        h+='<table class="dt" style="text-align:right"><tr><th style="width:22%">الإدارة</th><th style="width:40%">العهد المُستردة</th><th>التوقيع</th></tr>';
        h+='<tr><td style="font-weight:bold">المدير الإداري / مدير المشروعات</td><td><input type="text" style="text-align:right"></td><td><input type="text"></td></tr>';
        h+='<tr><td style="font-weight:bold">المدير التقني</td><td><input type="text" style="text-align:right"></td><td><input type="text"></td></tr>';
        h+='<tr><td style="font-weight:bold">تقنية المعلومات</td><td><input type="text" style="text-align:right"></td><td><input type="text"></td></tr>';
        h+='<tr><td style="font-weight:bold">الشؤون الإدارية</td><td><input type="text" style="text-align:right"></td><td><input type="text"></td></tr>';
        h+='<tr><td style="font-weight:bold">الإدارة المالية</td><td><input type="text" style="text-align:right"></td><td><input type="text"></td></tr></table>';
        h+=SC('٣','الإقرار');
        h+='<div class="wb wb-bl">أقر بأنني استلمت كافة مستحقاتي وسلمت جميع العُهد الموجودة بحوزتي.</div>';
        h+=SG3('توقيع الموظف','','المدير الإداري / مدير المشروعات','اعتماد الإخلاء','المدير التنفيذي','الموافقة النهائية',null,'admin','exec');
        h+=FT();
    }

    // ── طلب استقالة ───────────────────────────────────────────────────
    else if(id==="res"){
        h=H('نموذج طلب استقالة','وفق اللائحة التنظيمية — إشعار إنهاء الخدمة','RESIGNATION REQUEST','res');
        h+=SC('١','بيانات الموظف');
        h+=F2(FG('الاسم بالكامل'),FG('الرقم الوظيفي'));
        h+=F3(FG('القسم / الإدارة'),FG('المسمى الوظيفي'),FG('تاريخ التعيين','date'));
        h+=SC('٢','تفاصيل الاستقالة');
        h+=F3(FG('تاريخ تقديم الطلب','date'),FG('آخر يوم عمل مقترح','date'),FG('مدة الإشعار (بالأيام)'));
        h+='<div class="wb wb-bl"><strong>⊳ ملاحظة:</strong> يلتزم الموظف بإخطار الشركة برغبته في إنهاء الخدمة قبل شهر واحد على الأقل من تاريخ ترك العمل الفعلي.</div>';
        h+=FGA('سبب تقديم الاستقالة (اختياري)',3);
        h+=SC('٣','الإقرار');
        h+='<div class="wb wb-gd">أقر أنا الموقّع أدناه برغبتي في إنهاء خدمتي لدى شركة <span class="dcn"></span> اعتباراً من التاريخ المذكور أعلاه، وأتعهد بتسليم كافة العُهد والمستندات الخاصة بالعمل قبل تاريخ آخر يوم عمل.</div>';
        h+=SC('٤','حالة الطلب');
        h+='<div class="stg"><button class="stb ok" onclick="ts(this)">✅ مقبولة</button><button class="stb no" onclick="ts(this)">❌ مرفوضة</button><button class="stb pn a" onclick="ts(this)">⏳ قيد المراجعة</button></div>';
        h+=SC('٥','التوقيعات');
        h+=SG3('توقيع الموظف','مقدم الطلب',
               'المدير الإداري / مدير المشروعات','استلام ومراجعة',
               'المدير التنفيذي','الموافقة النهائية',
               null,'admin','exec');
        h+='<div style="text-align:center;font-size:8px;color:var(--tx3);margin-top:6px">⊳ يُستكمل إجراء إخلاء الطرف عبر نموذج «إخلاء طرف» بعد اعتماد الاستقالة</div>';
        h+=FT();
    }

    // ── قرار ترقية ────────────────────────────────────────────────────
    else if(id==="promo"){
        h=H('قرار ترقية','تعديل المسمى الوظيفي والدرجة','PROMOTION DECISION','promo');
        h+=SC('١','بيانات الموظف الحالية');
        h+=F2(FG('الاسم بالكامل'),FG('الرقم الوظيفي'));
        h+=F3(FG('القسم / الإدارة'),FG('المسمى الوظيفي الحالي'),FG('تاريخ التعيين','date'));
        h+=SC('٢','تفاصيل الترقية');
        h+=F2(FG('المسمى الوظيفي الجديد'),FG('القسم / الإدارة الجديدة (إن وُجد)'));
        h+=F3(FG('تاريخ سريان الترقية','date'),FG('الراتب الحالي'),FG('الراتب الجديد'));
        h+='<div class="fg"><label>نسبة الزيادة</label><input type="text" placeholder="%"></div>';
        h+=SC('٣','أساس الترقية');
        h+='<div class="chk-grid" style="grid-template-columns:1fr 1fr"><label><input type="checkbox"> تقييم أداء متميز</label><label><input type="checkbox"> الأقدمية الوظيفية</label><label><input type="checkbox"> استحداث منصب جديد</label><label><input type="checkbox"> إعادة هيكلة الإدارة</label></div>';
        h+=FGA('ملاحظات إضافية',3);
        h+=SC('٤','التوقيعات');
        h+=SG3('المدير المباشر','توصية بالترقية',
               'المدير الإداري / مدير المشروعات','مراجعة واعتماد',
               'المدير التنفيذي','الاعتماد النهائي',
               null,'admin','exec');
        h+=FT();
    }

    // ── قرار زيادة راتب / علاوة ───────────────────────────────────────
    else if(id==="raise"){
        h=H('قرار زيادة راتب / علاوة','تعديل الأجر الشهري','SALARY INCREASE DECISION','raise');
        h+=SC('١','بيانات الموظف');
        h+=F2(FG('الاسم بالكامل'),FG('الرقم الوظيفي'));
        h+=F2(FG('القسم / الإدارة'),FG('المسمى الوظيفي'));
        h+=SC('٢','نوع الزيادة');
        h+='<div class="chk-grid" style="grid-template-columns:1fr 1fr 1fr"><label><input type="radio" name="rtp"> علاوة دورية</label><label><input type="radio" name="rtp"> علاوة استثنائية</label><label><input type="radio" name="rtp"> زيادة تقديرية</label></div>';
        h+=SC('٣','تفاصيل الزيادة');
        h+=F3(FG('الراتب الحالي'),FG('قيمة الزيادة'),FG('الراتب الجديد'));
        h+=F2(FG('نسبة الزيادة','text'),FG('تاريخ السريان','date'));
        h+=FGA('سبب الزيادة',3);
        h+=SC('٤','التوقيعات');
        h+=SG3('المدير المباشر','توصية',
               'المدير الإداري / مدير المشروعات','مراجعة',
               'المدير التنفيذي','الاعتماد النهائي',
               null,'admin','exec');
        h+=FT();
    }

    // ── عقد عمل ───────────────────────────────────────────────────────
    else if(id==="contract"){
        h=H('عقد عمل','اتفاقية توظيف بين الطرفين','EMPLOYMENT CONTRACT','contract',true);
        h+=SC('١','أطراف العقد');
        h+='<table class="dt"><tr><th style="width:22%">الطرف الأول</th><td>شركة <span class="dcn"></span> ويمثلها في توقيع هذا العقد <input type="text" style="width:180px"></td></tr>'+
           '<tr><th>الطرف الثاني</th><td>السيد/ة <input type="text" style="width:220px;font-weight:bold"></td></tr></table>';
        h+=SC('٢','بيانات الطرف الثاني');
        h+=F2(FG('الرقم القومي'),FG('تاريخ الميلاد','date'));
        h+='<div class="fg"><label>العنوان</label><input type="text"></div>';
        h+=F2(FG('رقم الهاتف','tel'),FG('البريد الإلكتروني','email'));
        h+=SC('٣','بيانات الوظيفة');
        h+=F3(FG('المسمى الوظيفي'),FG('القسم / الإدارة'),FG('تاريخ بدء العمل','date'));
        h+=F2(FGS('نوع العقد',['محدد المدة','غير محدد المدة']),FG('مدة فترة التجربة (بالأشهر)'));
        h+=SC('٤','الأجر والمزايا');
        h+=F3(FG('الراتب الأساسي (جنيه)'),FG('بدلات (إن وُجدت)'),FG('إجمالي الأجر الشهري'));
        h+='<div class="fg"><label>مواعيد صرف الراتب</label><input type="text" class="tpl-default" value="نهاية كل شهر ميلادي عن طريق التحويل البنكي"></div>';
        h+=SC('٥','ساعات العمل وأيام الراحة');
        h+='<table class="dt"><tr><th>أيام العمل</th><td>الأحد — الخميس</td><th>الحد الأقصى اليومي</th><td>٨ ساعات (م. ١١٧)</td></tr><tr><th>وقت الحضور</th><td>١٠:٠٠ صباحاً</td><th>وقت الانصراف</th><td>٦:٠٠ مساءً</td></tr></table>';
        h+=SC('٦','بنود عامة');
        h+='<div class="wb wb-bl" style="font-size:9px">⊳ يخضع هذا العقد لأحكام قانون العمل المصري رقم ١٢ لسنة ٢٠٠٣ واللائحة التنظيمية الداخلية للشركة.<br>⊳ يلتزم الطرف الثاني بالحفاظ على سرية بيانات ومعلومات العمل أثناء وبعد انتهاء الخدمة.<br>⊳ يجوز إنهاء هذا العقد من أي من الطرفين بإخطار كتابي مسبق وفقاً للمدة المحددة في اللائحة التنظيمية.</div>';
        h+=SC('٧','التوقيعات');
        h+=SG3('الطرف الثاني (الموظف)','بالقبول والالتزام',
               'المدير الإداري / مدير المشروعات','مراجعة',
               'المدير التنفيذي','اعتماد الطرف الأول',
               null,'admin','exec');
        h+=FT(['نسخة للموظف','نسخة للملف الشخصي','نسخة للأرشيف']);
    }

    // ── تكليف بمهمة ───────────────────────────────────────────────────
    else if(id==="task"){
        h=H('تكليف بمهمة عمل','تحديد المهام والمسؤوليات والمواعيد','TASK ASSIGNMENT','task');
        h+=SC('١','بيانات الموظف');
        h+=F2(FGE('اسم الموظف المُكلَّف'),FG('القسم / الإدارة'));
        h+=SC('٢','نوع المهمة');
        h+='<div class="chk-grid" style="grid-template-columns:1fr 1fr">'+
           '<label><input type="radio" name="ttype" value="admin" class="tpl-default-radio" checked onclick="updTaskSigs(this)"> 🏢 مهمة إدارية / مشروع</label>'+
           '<label><input type="radio" name="ttype" value="tech" onclick="updTaskSigs(this)"> 💻 مهمة تقنية</label>'+
           '</div>';
        h+=SC('٣','تفاصيل المهمة');
        h+='<div class="fg"><label>عنوان المهمة / المشروع</label><input type="text" style="font-weight:bold;color:var(--nv)"></div>';
        h+=FGA('وصف المهمة والأهداف',5);
        h+=F2(FG('تاريخ البدء','date'),FG('الموعد النهائي','date'));
        h+=SC('٤','الموارد الممنوحة');
        h+=FGA('',3,'الميزانية، الفريق، الأدوات...');
        h+=SC('٥','التوقيعات');
        h+='<div class="sigs">'+
           _sig('الموظف المكلَّف','','الاستلام والالتزام')+
           _sig('المدير الإداري / مدير المشروعات',MGRS.admin,'الموافقة والاعتماد','task-approver-sig')+
           _sig('المدير التنفيذي',MGRS.exec,'الإصدار')+
           '</div>';
        h+=FT();
    }

    // ── شهادة راتب ────────────────────────────────────────────────────
    else if(id==="sal"){
        h=H('شهادة راتب','إلى من يهمه الأمر — شهادة مفردات مرتب','SALARY CERTIFICATE','sal',true);
        h+='<div class="cert" style="font-size:13px">';
        h+='تشهد شركة <strong><span class="dcn"></span></strong> بأن الموظف أدناه يعمل لدينا ولا يزال على رأس عمله.<br><br>';
        h+='<table class="dt" style="margin:16px 0;border:2px solid var(--bd)"><tr><th style="width:30%;text-align:right;background:#f7f8fb;color:#333">اسم الموظف</th><td style="text-align:right"><input type="text" class="emp-name-fld" list="tgEmpDL" autocomplete="off" onchange="addEmployeeName(this.value)" style="font-weight:bold;text-align:right"></td></tr><tr><th style="text-align:right;background:#f7f8fb;color:#333">الرقم الوظيفي</th><td style="text-align:right"><input type="text" style="text-align:right"></td></tr><tr><th style="text-align:right;background:#f7f8fb;color:#333">المسمى الوظيفي</th><td style="text-align:right"><input type="text" style="text-align:right"></td></tr><tr><th style="text-align:right;background:#f7f8fb;color:#333">الراتب الأساسي</th><td style="text-align:right"><input type="text" style="text-align:right;width:130px"></td></tr><tr><th style="text-align:right;background:#edf2f7;color:var(--nv);font-weight:800">إجمالي الراتب</th><td style="text-align:right;background:#edf2f7"><input type="text" class="sal-total-fld" style="font-weight:bold;text-align:right"></td></tr></table>';
        h+='لتقديمها إلى: <input type="text" style="width:180px"> دون مسؤولية على الشركة.';
        h+='<div style="margin-top:40px;display:flex;justify-content:space-between;align-items:flex-end;text-align:center">'+
           '<div><div style="font-weight:700;color:var(--nv);margin-bottom:24px">الختم</div>'+
           '<div style="width:90px;height:90px;border:2px dashed #cbd5e0;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;color:#a0aec0;font-size:8px">ختم</div></div>'+
           '<div style="text-align:center"><div style="font-weight:700;color:var(--nv);margin-bottom:6px">المدير التنفيذي</div>'+
           '<div class="cert-mgr-nm">'+(MGRS.exec||'&nbsp;')+'</div>'+
           '<div style="border-bottom:1.5px solid #333;width:200px;margin:0 auto"></div></div>'+
           '</div>';
        h+=FT(['نسخة للموظف','نسخة للأرشيف']);
    }

    // ── الحضور والانصراف ──────────────────────────────────────────────
    else if(id==="att"){
        h='<div style="background:var(--w);border:1px solid var(--bd);border-radius:6px;overflow:hidden">';
        h+='<div style="background:var(--nv);color:#fff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between">';
        h+='<div><span style="font-size:15px;font-weight:800">⏱ نظام الحضور والانصراف</span><br><span style="font-size:10px;opacity:.6">تحليل البيانات · WFH · التقارير التفصيلية</span></div>';
        h+='<div class="np"><button class="bt bt-g" onclick="document.getElementById(\'attF\').contentWindow.print()">🖨 طباعة التقرير</button></div>';
        h+='</div>';
        h+='<iframe id="attF" src="attendance.html" style="width:100%;height:calc(100vh - 100px);border:none"></iframe>';
        h+='</div>';
    }

    // ── الشكاوى والمقترحات ─────────────────────────────────────────────
    else if(id==="comp"){
        h=H('الشكاوى والمقترحات','صوتك مسموع — نحن نهتم برأيك','COMPLAINTS & SUGGESTIONS','comp');
        h+=SC('١','نوع التقديم');
        h+='<div class="ctg"><div class="ctc sel" onclick="sct(this)"><div class="ci">💡</div><div class="ct3">مقترح تطويري</div></div><div class="ctc" onclick="sct(this)"><div class="ci">🏢</div><div class="ct3">شكوى بيئة العمل</div></div><div class="ctc" onclick="sct(this)"><div class="ci">👥</div><div class="ct3">شكوى إدارية</div></div><div class="ctc" onclick="sct(this)"><div class="ci">🔧</div><div class="ct3">صيانة / مرافق</div></div></div>';
        h+=SC('٢','بيانات مقدم الطلب');
        h+='<div style="padding:0 0 8px 0"><label style="display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer"><input type="checkbox" onchange="toggleAnon(this)"> تقديم بسرية تامة (بدون ذكر الاسم)</label></div>';
        h+='<div class="fr fr3" id="cud">'+FG('الاسم')+FG('القسم')+FG('التاريخ','date')+'</div>';
        h+=SC('٣','التفاصيل');
        h+='<div style="margin-bottom:8px"><label style="font-size:10px;font-weight:600;color:var(--tx2)">مستوى الأهمية</label><div class="pp"><div class="ppl hi" onclick="spr(this)">عاجل</div><div class="ppl md a" onclick="spr(this)">متوسط</div><div class="ppl lo" onclick="spr(this)">عادي</div></div></div>';
        h+='<div class="fg"><label>الموضوع</label><input type="text"></div>';
        h+=FGA('الوصف التفصيلي',5);
        h+=SC('٤','الإجراءات المتخذة');
        h+=F2(FG('تاريخ الاستلام','date'),FG('المسؤول عن المتابعة'));
        h+=FGA('القرارات المتخذة',3);
        h+=SG3('مقدم الطلب','','المدير الإداري / مدير المشروعات','استلام وإجراء','المدير التنفيذي','الاعتماد النهائي',null,'admin','exec');
        h+=FT();
    }

    // ── شيت المصروفات الشهري ────────────────────────────────────────────
    else if(id==="mexp"){
        var mexpNum=genDocNum('mexp');
        h=H('شيت المصروفات الشهري','تسجيل وتوثيق حركة المصروفات النقدية للشركة','MONTHLY EXPENSE SHEET','mexp');
        h+=SC('١','بيانات الشهر');
        h+='<div class="fr fr3">'+
           '<div class="fg"><label>الشهر</label><input type="month" id="mexp-month" onchange="mexpLoad()"></div>'+
           '<div class="fg"><label>عدد الحركات</label><input type="text" id="mexp-count" readonly></div>'+
           '<div class="fg"><label>إجمالي المصروفات</label><input type="text" id="mexp-total" readonly style="font-weight:900;color:var(--nv)"></div>'+
           '</div>';
        h+=SC('٢','تفاصيل المصروفات');
        h+='<div class="np" style="display:flex;gap:8px;margin-bottom:10px">'+
           '<button class="bt bt-p" onclick="mexpAddRow()">➕ إضافة سطر</button>'+
           '<button class="bt bt-o" onclick="mexpSave()">💾 حفظ بيانات الشهر</button>'+
           '</div>';
        h+='<table class="dt" id="mexp-table">'+
           '<thead><tr><th style="width:34px">م</th><th>اسم الصارف</th><th>بند (نوع) الصرف</th><th style="width:110px">العدد (المبلغ)</th><th style="width:120px">التاريخ</th><th>ملاحظات</th><th class="np" style="width:30px"></th></tr></thead>'+
           '<tbody id="mexp-tbody"></tbody>'+
           '<tfoot><tr><td colspan="3" style="text-align:left;font-weight:800;background:#edf2f7">الإجمالي</td><td id="mexp-total-cell" style="font-weight:900;color:var(--nv);background:#edf2f7"></td><td colspan="3" style="background:#edf2f7"></td></tr></tfoot>'+
           '</table>';
        h+=SC('٣','الاعتماد والتوقيعات');
        h+=SG3('أمين الصندوق / المسؤول عن الصرف','تحرير وتوثيق البيانات',
               'المدير الإداري / مدير المشروعات','مراجعة واعتماد',
               'المدير التنفيذي','اعتماد نهائي',
               null,'admin','exec');
        h+=FT();
    }

    // ── إدارة المشاريع (إنشاء المشاريع وتعيين الموظفين مباشرة) ─────────
    else if(id==="pmgmt"){
        h='<div class="SP"><h3>📁 إدارة المشاريع</h3>';
        h+='<div class="set-hint">أنشئ مشروعاً جديداً وحدد الموظفين المسؤولين عنه مباشرة من هنا، بدل الدخول على Firebase Console يدوياً. كل موظف بعدها يقدر يحدّث نسبة تقدّمه في المشروع من بوابته الخاصة (employee.html)، ويقدر يتواصل مع باقي الفريق والأدمن من خلال نقاش المشروع.</div>';

        h+='<div id="pmgmtListViewContainer">';
        h+='<div class="set-sec"><div class="set-sec-title">➕ إنشاء مشروع جديد</div>';
        h+='<div class="fg" style="margin-bottom:10px"><label>عنوان المشروع</label><input type="text" id="pmTitle" placeholder="مثلاً: تطوير نظام إدارة المخازن"></div>';
        h+='<div class="fg fg-full" style="margin-bottom:10px"><label>وصف مختصر</label><textarea rows="2" id="pmDesc" placeholder="نبذة مختصرة عن المشروع وأهدافه..."></textarea></div>';
        h+='<div class="fr fr3" style="margin-bottom:10px">'+
           '<div class="fg"><label>الأولوية</label><select id="pmPriority"><option>منخفضة</option><option selected>متوسطة</option><option>عالية</option></select></div>'+
           '<div class="fg"><label>حالة المشروع</label><select id="pmStatus"><option selected>مخطط له</option><option>جاري العمل</option><option>متوقف</option><option>مكتمل</option></select></div>'+
           '<div class="fg"><label>تاريخ الاستحقاق (اختياري)</label><input type="date" id="pmDeadline"></div>'+
           '</div>';
        h+='<div class="fg fg-full" style="margin-bottom:6px"><label>الموظفون المسؤولون عن المشروع</label></div>';
        h+='<div class="chk-grid" id="pmgmtAssignees"><div class="empty-hint">⏳ جارٍ تحميل قائمة الموظفين...</div></div>';
        h+='<div class="fr fr2" style="margin-top:10px">';
        h+='  <div class="fg" style="justify-content: flex-end;">';
        h+='    <label class="file-upload-label" style="text-align:center;display:block;margin-bottom:0">';
        h+='      📎 ملف أو صورة مرفقة';
        h+='      <input type="file" id="pmFile" accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip" style="display:none" onchange="document.getElementById(\'pmFileName\').textContent=this.files[0]?this.files[0].name:\'\'">';
        h+='    </label>';
        h+='    <span id="pmFileName" style="font-size:11px;color:var(--tx3);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;margin-top:4px"></span>';
        h+='  </div>';
        h+='  <div class="fg"><label>رابط خارجي (اختياري)</label><input type="url" id="pmLink" placeholder="https://example.com"></div>';
        h+='</div>';
        h+='<div id="pmUploadProg" style="display:none" class="file-upload-progress"></div>';
        h+='<button class="bt bt-p" style="margin-top:12px" onclick="createProject()">➕ إنشاء المشروع</button>';
        h+='<div id="pmCreateMsg" style="margin-top:8px;font-size:11px"></div>';
        h+='</div>';

        h+='<div style="display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px">';
        h+='<div class="set-sec-title" style="margin:0">📁 المشاريع الحالية</div>';
        h+='<button class="bt bt-d" style="padding:5px 14px;font-size:11px" onclick="tgDeleteAllRecords(\'projects\', \'المشاريع\', null, null, loadPmgmtData)">🗑 حذف الكل</button>';
        h+='</div>';
        h+='<div id="pmgmtList"><div class="empty-hint">⏳ جارٍ تحميل المشاريع...</div></div>';
        h+='</div>'; // close pmgmtListViewContainer
        h+='<div id="pmgmtDetailViewContainer" style="display:none"></div>';
        h+='</div>';
    }

    // ── توزيع المهام (الأدمن يكلّف كل موظف بمهمة يقدر يتابعها من بوابته) ─
    else if(id==="tasksmgmt"){
        h='<div class="SP"><h3>🗂 توزيع المهام</h3>';
        h+='<div class="set-hint">كلّف أي موظف بمهمة محددة، وهيقدر يشوفها ويحدّث حالتها (لم يبدأ / جاري العمل / مكتمل) من بوابته الخاصة (employee.html) تحت تبويب "مهامي".</div>';

        h+='<div class="set-sec"><div class="set-sec-title">➕ تكليف مهمة جديدة</div>';
        h+='<div class="fr fr2" style="margin-bottom:10px">'+
           '<div class="fg"><label>الموظف المكلَّف</label><select id="tkAssignee"><option value="">⏳ جارٍ تحميل قائمة الموظفين...</option></select></div>'+
           '<div class="fg"><label>الأولوية</label><select id="tkPriority"><option>منخفضة</option><option selected>متوسطة</option><option>عالية</option></select></div>'+
           '</div>';
        h+='<div class="fg" style="margin-bottom:10px"><label>عنوان المهمة</label><input type="text" id="tkTitle" placeholder="مثلاً: تجهيز تصميمات كتالوج المنتجات"></div>';
        h+='<div class="fg fg-full" style="margin-bottom:10px"><label>تفاصيل المهمة (اختياري)</label><textarea rows="2" id="tkDesc"></textarea></div>';
        h+='<div class="fr fr2" style="margin-bottom:10px">';
        h+='  <div class="fg"><label>تاريخ التسليم (اختياري)</label><input type="date" id="tkDeadline"></div>';
        h+='  <div class="fg" style="justify-content: flex-end; margin-bottom: 2px;">';
        h+='    <label class="file-upload-label" style="margin-bottom: 0; align-self: stretch; text-align: center; display: block;">';
        h+='      📎 مرفق اختياري';
        h+='      <input type="file" id="tkFile" accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip" style="display:none" onchange="document.getElementById(\'tkFileName\').textContent=this.files[0]?this.files[0].name:\'\'">';
        h+='    </label>';
        h+='    <span id="tkFileName" style="font-size:11px;color:var(--tx3);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;margin-top:4px"></span>';
        h+='  </div>';
        h+='</div>';
        h+='<div id="tkUploadProg" style="display:none" class="file-upload-progress"></div>';
        h+='<button class="bt bt-p" onclick="createTask()">➕ تكليف المهمة</button>';
        h+='<div id="tkCreateMsg" style="margin-top:8px;font-size:11px"></div>';
        h+='</div>';

        h+='<div style="display:flex;justify-content:space-between;align-items:center;margin:18px 0 10px">';
        h+='<div class="set-sec-title" style="margin:0">🗂 المهام الحالية</div>';
        h+='<button class="bt bt-d" style="padding:5px 14px;font-size:11px" onclick="tgDeleteAllRecords(\'tasks\', \'المهام\', null, null, loadTasksMgmt)">🗑 حذف الكل</button>';
        h+='</div>';
        h+='<div id="tasksMgmtList"><div class="empty-hint">⏳ جارٍ تحميل المهام...</div></div>';
        h+='</div>';
    }

    // ── متابعة الموظفين (بيانات حية من Firebase) ─────────────────────
    else if(id==="staff"){
        var isFullAdm = typeof isFullAdmin === 'function' && isFullAdmin();
        h='<div class="SP"><h3>👥 متابعة الموظفين</h3>';
        h+='<div class="set-hint">نظرة شاملة على كل موظف: المشاريع المُسندة إليه ونسبة تقدّمه فيها، الإنجازات، وطلباته — مع إمكانية الموافقة أو الرفض مباشرة.</div>';

        // إشعار بادج
        h+='<div id="staffListViewContainer">';
        h+='<div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap">';
        h+='<div style="display:flex;align-items:center;gap:8px;background:rgba(231,76,60,.08);border:1.5px solid rgba(231,76,60,.25);padding:10px 16px;border-radius:10px;cursor:pointer" onclick="clearAdminBadge(\'notif-req-badge\',\'notif-req-badge-sb\')">';
        h+='📨 طلبات جديدة <span id="notif-req-badge" style="display:none;background:var(--no);color:#fff;border-radius:50%;min-width:20px;height:20px;font-size:11px;font-weight:800;align-items:center;justify-content:center;padding:0 4px">0</span></div>';
        h+='<div style="display:flex;align-items:center;gap:8px;background:rgba(39,174,96,.08);border:1.5px solid rgba(39,174,96,.25);padding:10px 16px;border-radius:10px;cursor:pointer" onclick="clearAdminBadge(\'notif-wkr-badge\',\'notif-wkr-badge-sb\')">';
        h+='📆 تقارير أسبوعية جديدة <span id="notif-wkr-badge" style="display:none;background:var(--ok);color:#fff;border-radius:50%;min-width:20px;height:20px;font-size:11px;font-weight:800;align-items:center;justify-content:center;padding:0 4px">0</span></div>';
        h+='</div>';

        h+='<div class="set-sec"><div class="set-sec-title">➕ إضافة حساب جديد</div>';
        h+='<div class="set-hint">أنشئ بريد إلكتروني وكلمة مرور للموظف حتى يدخل بوابته، أو أنشئ حساب أدمن تقني يملك صلاحية إضافة المشاريع فقط.</div>';
        h+='<div class="fr fr3" style="margin-top:10px">';
        h+='<div class="fg"><label>اسم المستخدم</label><input type="text" id="newAccName" class="emp-name-fld" list="tgEmpDL" autocomplete="off"></div>';
        h+='<div class="fg"><label>البريد الإلكتروني</label><input type="email" id="newAccEmail" placeholder="name@techgo.com"></div>';
        h+='<div class="fg"><label>كلمة مرور مبدئية</label><input type="text" id="newAccPass" placeholder="6 أحرف على الأقل"></div>';
        h+='</div>';
        h+='<div class="fr fr2" style="margin-top:10px">';
        h+='<div class="fg"><label>المسمى الوظيفي (اختياري)</label><input type="text" id="newAccJobTitle" placeholder="مثلاً: مصمم جرافيك"></div>';
        h+='<div class="fg"><label>دور الحساب</label><select id="newAccRole"><option value="employee">موظف (employee)</option><option value="tech_admin">أدمن تقني (بدون صلاحيات إدارية)</option></select></div>';
        h+='</div>';
        h+='<button class="bt bt-p" onclick="createStaffAccount()">➕ إنشاء الحساب</button>';
        h+='<div id="newAccMsg" style="margin-top:8px;font-size:11px"></div>';
        h+='</div>';

        h+='<div style="display:flex;align-items:center;gap:12px;margin:18px 0 10px">';
        h+='<div class="set-sec-title" style="margin:0">👥 قائمة الموظفين</div>';
        h+='</div>';
        h+='<div class="staff-toolbar">';
        h+='<input type="text" class="staff-search" id="staffSearch" oninput="filterStaffCards()" placeholder="🔍 ابحث بالاسم أو البريد الإلكتروني...">';
        h+='<span class="staff-count" id="staffCount"></span>';
        h+='</div>';
        h+='<div id="staffList"><div class="empty-hint">⏳ جارٍ تحميل بيانات الموظفين...</div></div>';
        h+='</div>'; // close staffListViewContainer
        h+='<div id="staffDetailViewContainer" style="display:none"></div>';
        h+='</div>';
    }

    // ── تخصيص النظام ──────────────────────────────────────────────────
    else if(id==="set"){
        h='<div class="SP"><h3>⚙️ تخصيص النظام</h3>';

        h+='<div class="set-sec"><div class="set-sec-title">🏢 بيانات الشركة</div>';
        h+='<div class="fg" style="margin-bottom:14px"><label>اسم الشركة</label><input type="text" id="sn" value="'+escH(CN)+'"></div>';
        h+='<div class="fg" style="margin-bottom:14px"><label>العنوان</label><input type="text" class="tpl-default" value="شارع التسعين، التجمع الخامس، القاهرة"></div>';
        h+=F2('<div class="fg"><label>الهاتف</label><input type="tel" class="tpl-default" value="01012345678"></div>','<div class="fg"><label>البريد</label><input type="email" class="tpl-default" value="hr@techgo.com"></div>');
        h+='</div>';

        h+='<div class="set-sec"><div class="set-sec-title">👔 المديرون المُفوَّضون بالتوقيع</div>';
        h+='<div class="set-hint">يظهر اسم كل مدير تلقائياً أسفل المسمى الوظيفي في خانات التوقيع بجميع النماذج والوثائق المُصدَرة.</div>';
        h+='<div class="mgr-row">'+
           '<div class="mgr-badge admin-badge">م.إداري / م.مشروعات</div>'+
           '<div class="fg" style="flex:1;margin:0"><label>المدير الإداري / مدير المشروعات</label>'+
           '<input type="text" id="sm_admin" value="'+escH(MGRS.admin)+'" placeholder="الاسم الكامل للمدير"></div>'+
           '</div>';
        h+='<div class="mgr-row">'+
           '<div class="mgr-badge exec-badge">م.تنفيذي</div>'+
           '<div class="fg" style="flex:1;margin:0"><label>المدير التنفيذي</label>'+
           '<input type="text" id="sm_exec" value="'+escH(MGRS.exec)+'" placeholder="الاسم الكامل للمدير"></div>'+
           '</div>';
        h+='<div class="mgr-row">'+
           '<div class="mgr-badge tech-badge">م.تقني</div>'+
           '<div class="fg" style="flex:1;margin:0"><label>المدير التقني <span style="font-size:9px;opacity:.7">(للمهام التقنية)</span></label>'+
           '<input type="text" id="sm_tech" value="'+escH(MGRS.tech)+'" placeholder="الاسم الكامل للمدير"></div>'+
           '</div>';
        h+='</div>';

        h+=empListSecHTML();

        h+='<div class="set-sec"><div class="set-sec-title">📋 ترقيم المستندات</div>';
        h+='<div class="set-hint">يُنشأ رقم مستند تلقائي لكل ورقة تصدر من النظام بالصيغة: <strong>TG-السنة-الكود-التسلسل</strong><br>مثال: TG-'+new Date().getFullYear()+'-NTC-001 (لفت نظر) · TG-'+new Date().getFullYear()+'-LV-003 (إجازة) · TG-'+new Date().getFullYear()+'-TSK-007 (مهمة)</div>';
        h+='<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">';
        var codeList=[['EMP','ملف موظف'],['LV','إجازة'],['PM','إذن'],['DLY','التماس'],['NTC','لفت نظر'],['WRN','إنذار'],['INV','تحقيق'],['TSK','مهمة'],['CLR','إخلاء'],['SAL','راتب'],['EXP','خبرة'],['CMP','شكوى'],['LA','إج.سنوية'],['LB','إج.عارضة'],['LC','أعياد'],['LD','غياب'],['MEXP','مصروفات شهرية'],['RES','استقالة'],['PRM','ترقية'],['CTR','عقد عمل'],['RAI','زيادة راتب']];
        for(var ci=0;ci<codeList.length;ci++){
            h+='<div class="code-chip"><span class="code-val">'+codeList[ci][0]+'</span><span class="code-lbl">'+codeList[ci][1]+'</span></div>';
        }
        h+='</div>';
        h+='<div style="margin-top:12px;padding-top:12px;border-top:1px dashed var(--bd,#ccd)">';
        h+='<div class="set-hint" style="margin-bottom:8px">إعادة ضبط أرقام التسلسل تجعل ترقيم كل النماذج يبدأ من <strong>001</strong> من جديد.</div>';
        h+='<button class="bt bt-d" onclick="resetSeq()">↺ تصفير أرقام المستندات</button>';
        h+='</div></div>';

        h+='<div class="set-sec"><div class="set-sec-title"><span>🗑</span> إعادة ضبط النظام</div>';
        h+='<div class="set-hint" style="color:#b91c1c;font-weight:600">تحذير: هذا الإجراء يحذف جميع البيانات الديناميكية نهائياً (مشاريع، مهام، تقارير، رسائل...).<br>لن يُؤثر على حسابات المستخدمين أو الإعدادات.</div>';
        h+='<button class="bt bt-d" onclick="resetSystem()">🗑 إعادة ضبط كل البيانات</button>';
        h+='</div>';

        // ── منطقة الخطر (حذف كل البيانات بما فيها الموظفين) ──
        h+='<div class="SP" style="margin-top:20px;border:2px solid var(--no)">';
        h+='<h3 style="color:var(--no)">&#9888;&#65039; منطقة الخطر</h3>';
        h+='<p style="font-size:13px;color:var(--tx);margin-bottom:16px">سيؤدي هذا إلى حذف <strong>جميع بيانات النظام</strong> بشكل نهائي لا يمكن التراجع عنه، بما في ذلك الموظفون، المشاريع، المهام، الطلبات، والإشعارات.<br><strong>باستثناء حسابك الحالي (المدير)</strong> — هيفضل موجوداً عشان تقدر تدخل على النظام بعد الحذف.</p>';
        h+='<button class="bt bt-d" style="padding:10px 24px;font-size:13px;font-weight:800" onclick="deleteAllSystemData()">&#128465; حذف جميع بيانات النظام</button>';
        h+='</div>';

        h+='<div style="text-align:left;margin-top:20px">'+
           '<button class="bt bt-p" onclick="saveSt()">💾 حفظ الإعدادات</button></div></div>';
    }

    // ── حسابي (إعدادات شخصية للأدمن) ──────────────────────────────────
    else if(id==="account"){
        h=myAccountHTML();
    }
    // ── إدارة الإعلانات ──────────────────────────────────────────────────────
    else if(id==="announcements"){
        h='<div class="SP">';
        h+='<h3>&#128226; إدارة الإعلانات</h3>';
        h+='<div class="fr fr2" style="margin-bottom:12px">';
        h+='<div class="fg"><label>عنوان الإعلان</label><input type="text" id="annTitle"></div>';
        h+='<div class="fg"><label>التاريخ (اختياري)</label><input type="text" id="annDate" placeholder="مثال: 1 أكتوبر 2026"></div>';
        h+='</div>';
        h+='<div class="fg fg-full" style="margin-bottom:12px"><label>محتوى الإعلان</label><textarea id="annContent" rows="4"></textarea></div>';
        h+='<button class="bt bt-p" onclick="addAnnouncement()">&#128226; نشر الإعلان</button>';
        h+='<div id="annMsg" style="margin-top:10px;font-weight:bold;font-size:12px;"></div>';
        h+='<hr style="margin:30px 0;border:0;border-top:2px solid var(--bd2)">';
        h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
        h+='<h3 style="margin:0">&#128209; الإعلانات السابقة</h3>';
        h+='<button class="bt bt-d" style="padding:5px 14px;font-size:11px" onclick="deleteAllAnnouncements()">&#128465; حذف الكل</button>';
        h+='</div>';
        h+='<div id="annList" style="display:flex;flex-direction:column;gap:12px;"></div>';
        h+='</div>';
    }

    // ── ملفات الموظفين ──────────────────────────────────────────────────
    else if(id==="empdocs"){
        h='<div class="SP"><h3>📂 ملفات الموظفين</h3>';
        h+='<div class="set-hint">اختر الموظف لعرض وإدارة المستندات الرقمية الخاصة به (عقود، بطاقة شخصية، شهادات، إلخ).</div>';
        h+='<div class="search-bar" style="margin-bottom:16px"><input type="text" placeholder="🔍 ابحث بالاسم..." onkeyup="filterEmpDocsList(this.value)"></div>';
        h+='<div id="empDocsList"><div class="empty-hint">⏳ جارٍ تحميل الموظفين...</div></div>';
        h+='</div>';
    }

    c.innerHTML=h;
    if(id==="mexp") mexpInit();
    if(id==="staff") loadStaffOverview();
    if(id==="pmgmt") loadPmgmtData();
    if(id==="tasksmgmt") loadTasksMgmt();
    if(id==="announcements") loadAdminAnnouncements();
    if(id==="empdocs") loadEmpDocsOverview();
}
// ═══════════════════════════════════════════════════════════════
// ── الإعلانات ─────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
function loadAdminAnnouncements() {
    var box = document.getElementById('annList');
    if(!box) return;
    box.innerHTML = '<div class="empty-hint" style="color:var(--tx3)">&#9203; جارٍ التحميل...</div>';
    db.collection('announcements').orderBy('createdAt', 'desc').limit(20).get().then(function(snap) {
        if(snap.empty) { box.innerHTML = '<div class="empty-hint">لا توجد إعلانات سابقة.</div>'; return; }
        var h = '';
        snap.forEach(function(d) {
            var a = d.data();
            var ts = (a.createdAt && a.createdAt.seconds) ? new Date(a.createdAt.seconds*1000).toLocaleDateString('ar-EG') : '';
            h += '<div class="pj-row" style="border-right:4px solid var(--nv)">';
            h += '<div class="pj-t" style="font-size:14px;font-weight:800">'+escH(a.title)+'</div>';
            h += '<div class="pj-meta" style="margin:6px 0 10px;font-size:12px;color:var(--tx);line-height:1.6">'+escH(a.content)+'</div>';
            h += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">';
            h += '<div class="pj-meta" style="display:flex;gap:12px">';
            h += (a.date ? '<span>&#128197; '+escH(a.date)+'</span>' : '');
            h += (ts ? '<span style="color:var(--tx3)">&#128336; نُشر: '+ts+'</span>' : '');
            h += (a.createdBy ? '<span style="color:var(--tx3)">&#128100; '+escH(a.createdBy)+' ('+escH(a.createdByRole||'أدمن إداري')+')</span>' : '');
            h += '</div>';
            h += '<button class="bt bt-d" style="padding:4px 10px;font-size:11px" onclick="deleteAnnouncement(\''+d.id+'\')">&#128465; حذف</button>';
            h += '</div></div>';
        });
        box.innerHTML = h;
    }).catch(function(err) {
        box.innerHTML = '<div class="empty-hint" style="color:var(--no)">&#10060; تعذر التحميل: '+err.message+'<br><small style="color:var(--tx3)">تأكد من نشر قواعد Firestore في Firebase Console</small></div>';
    });
}
function deleteAnnouncement(id) {
    if(!confirm('هل أنت متأكد من حذف هذا الإعلان؟')) return;
    db.collection('announcements').doc(id).delete().then(loadAdminAnnouncements).catch(function(err){ alert('تعذر الحذف: '+err.message); });
}
function deleteAllAnnouncements() {
    if(!confirm('هل أنت متأكد من حذف جميع الإعلانات نهائياً؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    var box = document.getElementById('annList');
    if(box) box.innerHTML = '<div class="empty-hint" style="color:var(--tx3)">&#9203; جارٍ حذف الكل...</div>';
    db.collection('announcements').get().then(function(snap) {
        var batch = db.batch();
        snap.forEach(function(d) { batch.delete(d.ref); });
        return batch.commit();
    }).then(function() {
        loadAdminAnnouncements();
    }).catch(function(err) {
        if(box) box.innerHTML = '<div class="empty-hint" style="color:var(--no)">&#10060; '+err.message+'</div>';
    });
}
function deleteAllSystemData() {
    var first = confirm('\u062A\u062D\u0630\u064A\u0631: \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 \u0646\u0647\u0627\u0626\u064A\u0627\u064B. \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F\u061F');
    if(!first) return;
    var second = confirm('\u062A\u0623\u0643\u064A\u062F \u0623\u062E\u064A\u0631: \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0639\u062F \u0627\u0644\u062D\u0630\u0641. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F');
    if(!second) return;
    // ملحوظة: 'system' غير مدرجة عمداً — تحتوي فقط على system/meta (حالة الإعداد الأول)
    // وحذفها كان يفصّل حالة setupDone بشكل عشوائي حسب ترتيب تنفيذ الحذف، ويجبرك ترجع لصفحة setup.html.
    var collections = ['projects','tasks','announcements','requests','notifications','weeklyReports','achievements','chatMessages','projectComments','employees','users'];
    // حساب الأدمن الحالي (اللي بيضغط على الزرار) يُستثنى دائماً من حذف مجموعة users
    // عشان ميتقفلش برّه النظام بعد الحذف بدون أي طريقة قانونية للرجوع (حساب Firebase Auth بيفضل موجود
    // لكن ملفه في Firestore كان بيتمسح، فيتحول لحساب معلّق مش قادر يدخل ولا يعمل setup تاني بنفس الإيميل).
    var myUid = (window.TG_USER && TG_USER.uid) || null;
    var msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1b2a4a;color:#fff;padding:14px 28px;border-radius:10px;z-index:99999;font-size:14px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.3)';
    msg.textContent = '\u23F3 \u062C\u0627\u0631\u064D \u062D\u0630\u0641 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...';
    document.body.appendChild(msg);
    var done = 0; var errors = [];
    collections.forEach(function(col) {
        db.collection(col).get().then(function(snap) {
            var batch = db.batch();
            snap.forEach(function(d) {
                if (col === 'users' && myUid && d.id === myUid) return; // احتفظ بحساب الأدمن الحالي
                batch.delete(d.ref);
            });
            return batch.commit();
        }).then(function() {
            done++;
            msg.textContent = '\u23F3 \u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641... ('+done+'/'+collections.length+')';
            if(done+errors.length === collections.length) {
                msg.style.background = '#1d7a4f';
                msg.textContent = '\u2705 \u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D.';
                setTimeout(function(){ document.body.removeChild(msg); }, 3000);
            }
        }).catch(function(err) {
            errors.push(col+': '+err.message); done++;
            if(done+errors.length >= collections.length) {
                msg.style.background = '#c0392b';
                msg.textContent = '\u274C \u062A\u0639\u0630\u0631 \u062D\u0630\u0641 \u0628\u0639\u0636 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A.';
                setTimeout(function(){ document.body.removeChild(msg); }, 4000);
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// ─── صفحة تفاصيل المشروع للأدمن ──────────────────────────────
// ═══════════════════════════════════════════════════════════════
function openAdminProjectDetail(idx) {
    var p = (window._pmgmtProjectsCache || [])[idx];
    if (!p) return;
    window._activeProjDetailIdx = idx;
    var listView = document.getElementById('pmgmtListViewContainer');
    var detailView = document.getElementById('pmgmtDetailViewContainer');
    if (listView) listView.style.display = 'none';
    if (detailView) {
        detailView.style.display = 'block';
        var assignees = p.assignees || [];
        var sum = 0;
        assignees.forEach(function(uid){
            var pm = (p.progressMap && p.progressMap[uid]) ? p.progressMap[uid].progress : 0;
            sum += (pm || 0);
        });
        var avgProg = assignees.length ? Math.round(sum / assignees.length) : 0;
        var hasNotes = (p.comments && p.comments.length > 0);
        var over = isOverdue(p.deadline, p.status);
        var h = '<div class="emp-proj-detail">';
        h += '<button class="emp-proj-back" onclick="closeAdminProjectDetail()">🔙 العودة لقائمة المشاريع</button>';
        h += '<div class="emp-proj-detail-header">';
        h += '  <div class="emp-proj-detail-title">' + escH(p.title || 'بدون عنوان') + '</div>';
        if (p.description) h += '  <div class="emp-proj-detail-desc">' + escH(p.description) + '</div>';
        h += '  <div>' + projectTagsHtml(p) + '</div>';
        if (p.createdBy) h += '  <div style="font-size:10.5px;color:var(--tx3);margin-top:6px">أُنشئ بواسطة: <strong>' + escH(p.createdBy) + '</strong></div>';
        if(p.fileUrl){
            var fType = p.fileType || '';
            h += '<div style="margin-top:12px;padding-top:12px;border-top:1px dashed var(--bd,#ccd)">';
            if(fType.indexOf('image/')===0){
                h += '<a href="'+p.fileUrl+'" target="_blank"><img src="'+p.fileUrl+'" style="max-width:100%;max-height:200px;border-radius:6px;display:block"></a>';
            } else if(fType.indexOf('video/')===0){
                h += '<video src="'+p.fileUrl+'" controls style="max-width:100%;max-height:200px;border-radius:6px"></video>';
            } else {
                h += '<a href="'+p.fileUrl+'" target="_blank" style="color:var(--nv);font-weight:700;text-decoration:underline;display:inline-block">📎 '+escH(p.fileName||'ملف مرفق')+'</a>';
            }
            h += '</div>';
        }
        if(p.linkUrl){
            h += '<div style="margin-top:8px"><a href="'+escH(p.linkUrl)+'" target="_blank" style="color:var(--gd);font-weight:700;text-decoration:underline;font-size:13px">🔗 رابط خارجي للمشروع</a></div>';
        }
        h += '</div>';
        h += '<div class="proj-sec"><div class="proj-sec-title">👥 الموظفون المسؤولون عن المشروع</div>';
        if (assignees.length) {
            assignees.forEach(function(uid) {
                var e = PMGMT_EMPLOYEES.find(function(x) { return x.uid === uid; });
                var nm = e ? (e.name || e.email) : '(موظف غير موجود حالياً)';
                var pm = (p.progressMap && p.progressMap[uid]) || {progress:0, status:'لم يبدأ', note:''};
                h += '<div class="pj-row" style="background:var(--bg);padding:12px;border-radius:10px;margin-bottom:8px;">' +
                     '  <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--nv);margin-bottom:4px;">' +
                     '    <span>' + escH(nm) + '</span>' +
                     '    <span style="color:var(--gd);margin-right:auto;">' + (pm.progress || 0) + '%</span>' +
                     '  </div>' +
                     '  <div class="pj-bar"><div class="pj-bar-in" style="width:' + (pm.progress || 0) + '%"></div></div>' +
                     '  <div class="pj-meta" style="margin-top:6px;">الحالة: <span class="badge ' + badgeClassForStatus(pm.status) + '">' + escH(pm.status || 'لم يبدأ') + '</span>' +
                     (pm.note ? (' · ملاحظة: ' + escH(pm.note)) : '') + '</div>' +
                     '</div>';
            });
        } else {
            h += '<div class="empty-hint">لم يتم تعيين أي موظف على هذا المشروع بعد.</div>';
        }
        h += '</div>';
        h += '<div class="proj-sec">' + projectChatHtml(p.id, 'pmChatLog' + idx, 'pmChatInput' + idx) + '</div>';
        h += '<div class="proj-sec"><div class="proj-sec-title">⚙️ إدارة المشروع</div>';
        h += '<div style="display:flex;gap:8px">' +
             '  <button class="bt bt-o" onclick="toggleProjEdit(' + idx + ')">✏️ تعديل المشروع</button>' +
             '  <button class="bt bt-d" onclick="deleteProject(\'' + p.id + '\')">🗑 حذف المشروع</button>' +
             '</div>';
        h += '<div id="pmEdit' + idx + '" style="display:none;margin-top:14px;padding-top:14px;border-top:1px dashed var(--bd2)">' +
             '  <div class="fg" style="margin-bottom:10px"><label>عنوان المشروع</label><input type="text" id="pmEditTitle' + idx + '" value="' + escH(p.title || '') + '"></div>' +
             '  <div class="fg fg-full" style="margin-bottom:10px"><label>وصف مختصر</label><textarea rows="2" id="pmEditDesc' + idx + '">' + escH(p.description || '') + '</textarea></div>' +
             '  <div class="fr fr3" style="margin-bottom:10px">' +
             '    <div class="fg"><label>الأولوية</label><select id="pmEditPriority' + idx + '">' +
                    ['منخفضة','متوسطة','عالية'].map(function(s){ return '<option' + ((p.priority || 'متوسطة') === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') +
             '    </select></div>' +
             '    <div class="fg"><label>حالة المشروع</label><select id="pmEditStatus' + idx + '">' +
                    ['مخطط له','جاري العمل','متوقف','مكتمل'].map(function(s){ return '<option' + ((p.status || 'مخطط له') === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') +
             '    </select></div>' +
             '    <div class="fg"><label>تاريخ الاستحقاق</label><input type="date" id="pmEditDeadline' + idx + '" value="' + escH(p.deadline || '') + '"></div>' +
             '  </div>' +
             '  <div class="fg fg-full" style="margin-bottom:6px"><label>الموظفون المسؤولون</label></div>' +
             '  <div class="chk-grid" id="pmEditAssignees' + idx + '">' + PMGMT_EMPLOYEES.map(function(e){
                  var checked = assignees.indexOf(e.uid) > -1 ? ' checked' : '';
                  return '<label><input type="checkbox" class="pm-edit-assignee-chk" ' + checked + ' value="' + e.uid + '"> ' + escH(e.name || e.email) + '</label>';
             }).join('') + '</div>' +
             '  <div style="display:flex;gap:8px;margin-top:10px">' +
             '    <button class="bt bt-p" onclick="saveProjectEdit(\'' + p.id + '\',' + idx + ')">💾 حفظ التعديلات</button>' +
             '    <button class="bt bt-o" onclick="toggleProjEdit(' + idx + ')">إلغاء</button>' +
             '  </div>' +
             '  <div id="pmEditMsg' + idx + '" style="margin-top:8px;font-size:11px"></div>' +
             '</div>';
        h += '</div>';
        h += '</div>';
        detailView.innerHTML = h;
        renderProjectChat(p.id, p.comments || [], 'pmChatLog' + idx);
    }
}

function closeAdminProjectDetail() {
    window._activeProjDetailIdx = null;
    var listView = document.getElementById('pmgmtListViewContainer');
    var detailView = document.getElementById('pmgmtDetailViewContainer');
    if (listView) listView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
}

// ═══════════════════════════════════════════════════════════════
// ─── صفحة تفاصيل الموظف للأدمن ───────────────────────────────
// ═══════════════════════════════════════════════════════════════
function openAdminEmployeeDetail(idx) {
    var emp = (window._staffEmpCache || [])[idx];
    if (!emp) return;
    window._activeStaffDetailIdx = idx;
    var listView = document.getElementById('staffListViewContainer');
    var detailView = document.getElementById('staffDetailViewContainer');
    if (listView) listView.style.display = 'none';
    if (detailView) {
        detailView.style.display = 'block';
        var pending = emp.requests.filter(function(r){return r.status==='pending';}).length;
        var avgProg = emp.projects.length ? Math.round(emp.projects.reduce(function(s,p){
            var pm = (p.progressMap && p.progressMap[emp.uid]) ? p.progressMap[emp.uid].progress : 0;
            return s + (pm || 0);
        }, 0) / emp.projects.length) : 0;
        var h = '<div class="emp-proj-detail">';
        h += '<button class="emp-proj-back" onclick="closeAdminEmployeeDetail()">🔙 العودة لقائمة الموظفين</button>';
        h += '<div class="emp-proj-detail-header">';
        h += '  <div class="emp-proj-detail-title">' + escH(emp.name || emp.email);
        if (emp.jobTitle) h += ' <span class="badge" style="background:var(--gd);color:#1b2a4a">' + escH(emp.jobTitle) + '</span>';
        h += (emp.disabled ? ' <span class="badge badge-disabled">🚫 معطّل</span>' : ' <span class="badge badge-active">✅ نشط</span>');
        h += '  </div>';
        h += '  <div class="emp-proj-detail-desc">' + escH(emp.email || '') + (emp.employeeCode ? ' · كود: <strong>' + escH(emp.employeeCode) + '</strong>' : '') + '</div>';
        h += '</div>';
        h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">';
        h += '  <button class="bt bt-o" onclick="toggleEmpNameEdit(' + idx + ')">✏️ تعديل الاسم</button>';
        h += '  <button class="bt bt-o" onclick="toggleEmpJobEdit(' + idx + ')">🏷 تعديل المسمى</button>';
        h += '  <button class="bt ' + (emp.disabled ? 'bt-p' : 'bt-o') + '" onclick="toggleEmpDisabled(\'' + emp.uid + '\',' + (!!emp.disabled) + ')">' + (emp.disabled ? '✅ تفعيل الحساب' : '🚫 تعطيل الحساب') + '</button>';
        h += '  <button class="bt bt-d" onclick="openDeleteEmpModal(\'' + emp.uid + '\',' + idx + ')">🗑 حذف الموظف</button>';
        h += '  <button class="bt bt-o" style="background:linear-gradient(135deg,#1b2a4a,#2980b9);color:#fff;border:0" onclick="printEmployeeWorkReport(' + idx + ')">🖨 طباعة تقرير الشغل</button>';
        h += '</div>';
        h += '<div class="emp-inline-edit" id="empNameEdit' + idx + '" style="display:none">' +
             '  <input type="text" id="empNameInput' + idx + '" value="' + escH(emp.name || '') + '">' +
             '  <button class="bt bt-p" onclick="saveEmpName(\'' + emp.uid + '\',' + idx + ')">💾 حفظ</button>' +
             '  <span id="empNameMsg' + idx + '" style="font-size:10.5px"></span>' +
             '</div>';
        h += '<div class="emp-inline-edit" id="empJobEdit' + idx + '" style="display:none">' +
             '  <input type="text" id="empJobInput' + idx + '" value="' + escH(emp.jobTitle || '') + '" placeholder="مثلاً: مصمم جرافيك">' +
             '  <button class="bt bt-p" onclick="saveEmpJob(\'' + emp.uid + '\',' + idx + ')">💾 حفظ</button>' +
             '  <span id="empJobMsg' + idx + '" style="font-size:10.5px"></span>' +
             '</div>';
        h += '<div class="proj-sec"><div class="proj-sec-title">📁 المشاريع المُسندة (' + emp.projects.length + ')</div>';
        if (emp.projects.length) {
            emp.projects.forEach(function(p) {
                var pm = (p.progressMap && p.progressMap[emp.uid]) || {progress:0, status:'لم يبدأ', note:''};
                h += '<div class="pj-row" style="background:var(--bg);padding:12px;border-radius:10px;margin-bottom:8px;">' +
                     '  <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--nv);margin-bottom:4px;">' +
                     '    <span>' + escH(p.title || 'بدون عنوان') + '</span>' +
                     '    <span style="color:var(--gd);">' + (pm.progress || 0) + '%</span>' +
                     '  </div>' +
                     '  <div class="pj-bar"><div class="pj-bar-in" style="width:' + (pm.progress || 0) + '%"></div></div>' +
                     '  <div class="pj-meta" style="margin-top:6px;">الحالة: <span class="badge ' + badgeClassForStatus(pm.status) + '">' + escH(pm.status || 'لم يبدأ') + '</span>' +
                     (pm.note ? (' · ملاحظة: ' + escH(pm.note)) : '') + '</div>' +
                     '</div>';
            });
        } else {
            h += '<div class="empty-hint">لا توجد مشاريع مُسندة حالياً.</div>';
        }
        h += '</div>';
        if(emp.role !== 'tech_admin'){
            h += '<div class="proj-sec"><div class="proj-sec-title">📨 الطلبات (' + emp.requests.length + ')</div>';
            if (emp.requests.length) {
                emp.requests.forEach(function(r) {
                    h += '<div class="rq-row" style="background:var(--bg);padding:12px;border-radius:10px;margin-bottom:8px;">' +
                         '  <div class="rq-t" style="font-weight:700;">' + escH(r.type || 'طلب') + ' <span class="badge ' + badgeClassForReq(r.status) + '">' + reqStatusLabel(r.status) + '</span></div>' +
                         (r.details ? ('  <div class="pj-meta" style="margin-top:4px;">' + escH(r.details) + '</div>') : '') +
                         (r.status === 'pending' ? ('  <div class="rq-actions" style="margin-top:8px"><button class="bt bt-p" onclick="reviewRequest(\'' + r.id + '\',\'approved\')">✔ موافقة</button><button class="bt bt-d" onclick="reviewRequest(\'' + r.id + '\',\'rejected\')">✕ رفض</button></div>') : '') +
                         '</div>';
                });
            } else {
                h += '<div class="empty-hint">لا توجد طلبات بعد.</div>';
            }
            h += '</div>';
        }
        h += '</div>';
        detailView.innerHTML = h;
    }
}

function closeAdminEmployeeDetail() {
    window._activeStaffDetailIdx = null;
    var listView = document.getElementById('staffListViewContainer');
    var detailView = document.getElementById('staffDetailViewContainer');
    if (listView) listView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
}

// ═══════════════════════════════════════════════════════════════
// ─── طباعة تقرير شغل الموظف (مشاريع + مهام + حالاتهم) ────────
// ═══════════════════════════════════════════════════════════════
function printEmployeeWorkReport(empIdx) {
    var emp = (window._staffEmpCache || [])[empIdx];
    if (!emp) return;
    var today = new Date().toLocaleDateString('ar-EG', {year:'numeric',month:'long',day:'numeric'});
    var overallAvg = emp.projects.length ? Math.round(emp.projects.reduce(function(s,p){
        var pm = (p.progressMap && p.progressMap[emp.uid]) ? p.progressMap[emp.uid].progress : 0;
        return s + (pm || 0);
    }, 0) / emp.projects.length) : 0;
    var projRows = '';
    emp.projects.forEach(function(p) {
        var pm = (p.progressMap && p.progressMap[emp.uid]) || {progress:0, status:'لم يبدأ', note:''};
        var statusColor = pm.status==='مكتمل'?'#27ae60':pm.status==='جاري العمل'?'#2980b9':'#7f8c8d';
        projRows += '<tr>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #eee;font-weight:700">' + escH(p.title||'—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #eee;color:#888">' + escH(p.description||'—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center"><span style="background:' + statusColor + ';color:#fff;border-radius:20px;padding:2px 10px;font-size:11px">' + escH(pm.status||'لم يبدأ') + '</span></td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;font-weight:800;color:#c9a227">' + (pm.progress||0) + '%</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:11px;color:#888">' + escH(pm.note||'—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center">' + escH(p.deadline||'—') + '</td>' +
            '</tr>';
    });
    db.collection('tasks').where('assignedTo','==',emp.uid).get().then(function(snap) {
        var tasks = snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
        tasks.sort(function(a,b){
            var am=(a.createdAt&&a.createdAt.toMillis)?a.createdAt.toMillis():0;
            var bm=(b.createdAt&&b.createdAt.toMillis)?b.createdAt.toMillis():0;
            return bm-am;
        });
        var taskRows = '';
        tasks.forEach(function(t) {
            var sc = t.status==='مكتمل'?'#27ae60':t.status==='جاري العمل'?'#2980b9':'#7f8c8d';
            var pc = t.priority==='عالية'?'#e74c3c':t.priority==='متوسطة'?'#f39c12':'#95a5a6';
            taskRows += '<tr>' +
                '<td style="padding:8px 10px;border-bottom:1px solid #eee;font-weight:700">' + escH(t.title||'—') + '</td>' +
                '<td style="padding:8px 10px;border-bottom:1px solid #eee;color:#888">' + escH(t.description||'—') + '</td>' +
                '<td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center"><span style="background:'+pc+';color:#fff;border-radius:20px;padding:2px 10px;font-size:11px">' + escH(t.priority||'—') + '</span></td>' +
                '<td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center"><span style="background:'+sc+';color:#fff;border-radius:20px;padding:2px 10px;font-size:11px">' + escH(t.status||'لم يبدأ') + '</span></td>' +
                '<td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center">' + escH(t.deadline||'—') + '</td>' +
                '</tr>';
        });
        var win = window.open('','_blank');
        win.document.write('<html dir="rtl"><head><title>تقرير شغل - '+escH(emp.name||emp.email)+'</title>' +
            '<style>@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap");' +
            'body{font-family:"Cairo",sans-serif;padding:40px;color:#1b2a4a;max-width:900px;margin:auto}' +
            '.header{text-align:center;margin-bottom:30px;padding-bottom:20px;border-bottom:3px solid #c9a227}' +
            '.header h1{font-size:22px;margin:0 0 4px}' +
            '.header h2{font-size:14px;color:#888;margin:0}' +
            '.stats{display:flex;gap:16px;justify-content:center;margin:20px 0}' +
            '.stat-card{background:linear-gradient(135deg,#1b2a4a,#2c3e6b);color:#fff;border-radius:12px;padding:14px 24px;text-align:center;min-width:80px}' +
            '.stat-num{font-size:24px;font-weight:900}.stat-lbl{font-size:11px;opacity:.8}' +
            '.section{margin-top:24px}' +
            '.sec-title{font-weight:900;font-size:14px;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #c9a227}' +
            'table{width:100%;border-collapse:collapse;margin-top:8px}' +
            'th{background:#1b2a4a;color:#fff;padding:10px;font-size:11px;text-align:right}' +
            '.footer{margin-top:40px;text-align:center;font-size:11px;color:#aaa;border-top:2px solid #eee;padding-top:16px}' +
            '@media print{body{padding:20px}}</style></head><body>' +
            '<div class="header"><h1>تقرير أداء وشغل الموظف</h1><h2>' + escH(emp.name||emp.email) + (emp.jobTitle ? ' — '+escH(emp.jobTitle) : '') + '</h2><div style="font-size:12px;color:#aaa;margin-top:6px">'+today+'</div>' +
            '<div style="background:linear-gradient(135deg,#c9a227,#e8c547);color:#1b2a4a;border-radius:8px;padding:4px 12px;margin-top:6px;font-size:13px;font-weight:800;display:inline-block">'+overallAvg+'% متوسط الإنجاز</div>' +
            '</div>' +
            '<div class="stats">' +
            '<div class="stat-card"><div class="stat-num">'+emp.projects.length+'</div><div class="stat-lbl">مشروع</div></div>' +
            '<div class="stat-card"><div class="stat-num">'+tasks.length+'</div><div class="stat-lbl">مهمة</div></div>' +
            '<div class="stat-card"><div class="stat-num">'+emp.achievements.length+'</div><div class="stat-lbl">إنجاز</div></div>' +
            '</div>' +
            (emp.projects.length ?
                '<div class="section"><div class="sec-title">📁 المشاريع المُسندة وحالة الإنجاز</div>' +
                '<table><thead><tr><th>اسم المشروع</th><th>الوصف</th><th>الحالة</th><th>التقدم</th><th>ملاحظة</th><th>تاريخ الاستحقاق</th></tr></thead>' +
                '<tbody>'+projRows+'</tbody></table></div>':
                '<div class="section"><div class="sec-title">📁 المشاريع</div><p style="color:#aaa;text-align:center;padding:20px">لا توجد مشاريع مُسندة</p></div>')+
            (tasks.length ?
                '<div class="section"><div class="sec-title">📋 المهام الموكّلة</div>' +
                '<table><thead><tr><th>عنوان المهمة</th><th>الوصف</th><th>الأولوية</th><th>الحالة</th><th>تاريخ التسليم</th></tr></thead>' +
                '<tbody>'+taskRows+'</tbody></table></div>':
                '<div class="section"><div class="sec-title">📋 المهام</div><p style="color:#aaa;text-align:center;padding:20px">لا توجد مهام موكّلة</p></div>')+
            '<div class="footer">تقرير آلي صادر من نظام Tech Go — '+today+'</div>' +
            '</body></html>');
        win.document.close();
        setTimeout(function(){ win.print(); }, 600);
    });
}

// ═══════════════════════════════════════════════════════════════
// ─── كود وظيفي فريد (لا يتكرر) ──────────────────────────────
// ═══════════════════════════════════════════════════════════════
function generateUniqueEmpCode(name) {
    var prefix = 'TG';
    var namePart = (name || '').replace(/\s+/g,'').toUpperCase().substring(0,3) || 'EMP';
    namePart = namePart.replace(/[^\x00-\x7F]/g, function(c){ return String(c.charCodeAt(0)%9+1); });
    var num = String(Math.floor(Math.random()*9000)+1000);
    return prefix + '-' + namePart + num;
}
function ensureEmployeeCode(uid, name, callback) {
    db.collection('users').doc(uid).get().then(function(doc) {
        if (!doc.exists) { if(callback) callback(null); return; }
        var data = doc.data();
        if (data.employeeCode) { if(callback) callback(data.employeeCode); return; }
        function tryCode() {
            var code = generateUniqueEmpCode(name);
            db.collection('users').where('employeeCode','==',code).get().then(function(snap){
                if (snap.empty) {
                    db.collection('users').doc(uid).update({ employeeCode: code }).then(function(){
                        if(callback) callback(code);
                    });
                } else {
                    tryCode();
                }
            });
        }
        tryCode();
    });
}

// ═══════════════════════════════════════════════════════════════
// ─── ربط الشيتات بحسابات الموظفين (autofill) ─────────────────
// ═══════════════════════════════════════════════════════════════
function autofillEmployeeFields() {
    if (!TG_USER) return;
    var name = TG_USER.name || '';
    var email = TG_USER.email || '';
    var jobTitle = TG_USER.jobTitle || '';
    var code = TG_USER.employeeCode || '';
    document.querySelectorAll('.emp-name-fld:not([data-autofilled])').forEach(function(f) {
        if (!f.value) { f.value = name; f.setAttribute('data-autofilled','1'); }
    });
    document.querySelectorAll('.emp-code-fld:not([data-autofilled])').forEach(function(f) {
        if (!f.value && code) { f.value = code; f.setAttribute('data-autofilled','1'); }
    });
    document.querySelectorAll('.emp-job-fld:not([data-autofilled])').forEach(function(f) {
        if (!f.value && jobTitle) { f.value = jobTitle; f.setAttribute('data-autofilled','1'); }
    });
    document.querySelectorAll('.emp-email-fld:not([data-autofilled])').forEach(function(f) {
        if (!f.value && email) { f.value = email; f.setAttribute('data-autofilled','1'); }
    });
}

// ─── خطاف تبديل الصفحات لتشغيل autofill والتحقق من الكود ─────
function onPageChange(id) {
    setTimeout(function() {
        autofillEmployeeFields();
        if (TG_USER && TG_USER.uid && !TG_USER.employeeCode && TG_USER.role === 'employee') {
            ensureEmployeeCode(TG_USER.uid, TG_USER.name, function(code) {
                if (code) {
                    TG_USER.employeeCode = code;
                    autofillEmployeeFields();
                }
            });
        }
    }, 150);
}
document.addEventListener('DOMContentLoaded', function(){
    setTimeout(autofillEmployeeFields, 800);
});


// ── الإعلانات (Announcements) ──────────────────────────────────────
function addAnnouncement() {
    var title = (document.getElementById('annTitle').value||'').trim();
    var date = (document.getElementById('annDate').value||'').trim();
    var content = (document.getElementById('annContent').value||'').trim();
    var msg = document.getElementById('annMsg');
    
    if(!title || !content) { msg.style.color = 'var(--no)'; msg.textContent = 'عنوان ومحتوى الإعلان مطلوبان.'; return; }
    
    msg.style.color = 'var(--tx3)'; msg.textContent = '⏳ جارٍ النشر...';
    
    var createdByRole = (TG_USER && TG_USER.role === 'tech_admin') ? 'أدمن تقني' : 'أدمن إداري';
    try {
        db.collection('announcements').add({
            title: title,
            date: date,
            content: content,
            createdAt: new Date(),
            createdBy: TG_USER ? (TG_USER.name || TG_USER.email || 'الإدارة') : 'الإدارة',
            createdByRole: createdByRole
        }).then(function() {
            msg.style.color = 'var(--ok)'; msg.textContent = '✅ تم نشر الإعلان.';
            document.getElementById('annTitle').value = '';
            document.getElementById('annDate').value = '';
            document.getElementById('annContent').value = '';
            setTimeout(function(){ msg.textContent = ''; }, 3000);
            loadAdminAnnouncements();
            // إرسال إشعار لكل المستخدمين (الموظفين والأدمنز) بالإعلان الجديد
            if (typeof tgBroadcastPush === 'function') {
                var preview = content.length > 70 ? content.slice(0, 70) + '…' : content;
                tgBroadcastPush('📢 إعلان جديد: ' + title, preview, 'announcement-new', TG_USER ? TG_USER.uid : '');
            }
        }).catch(function(err) {
            msg.style.color = 'var(--no)'; msg.textContent = '❌ ' + err.message;
        });
    } catch(syncErr) {
        console.error("Sync Error in addAnnouncement:", syncErr);
        msg.style.color = 'var(--no)'; msg.textContent = '❌ خطأ تقني: ' + syncErr.message;
        if(typeof tgToast === 'function') tgToast('❌ خطأ تقني: ' + syncErr.message, 'err');
    }
}

// Loads announcements in employee dashboard
function loadEmpAnnouncements() {
    var box = document.getElementById('empAnnouncementsList');
    var panel = document.getElementById('empAnnouncementsPanel');
    if(!box || !panel) return;
    
    db.collection('announcements').orderBy('createdAt', 'desc').limit(5).onSnapshot(function(snap) {
        if(snap.empty) {
            panel.style.display = 'none';
            return;
        }
        panel.style.display = 'block';
        var h = '';
        snap.forEach(function(d) {
            var data = d.data();
            h += '<div style="background:rgba(255,255,255,.1);padding:14px 18px;border-radius:10px;border-right:4px solid var(--gd);margin-bottom:8px">';
            h += '<div style="font-size:15px;font-weight:800;margin-bottom:6px">'+esc(data.title)+'</div>';
            h += '<div style="font-size:13px;opacity:.9;line-height:1.6">'+esc(data.content)+'</div>';
            if(data.createdBy) h += '<div style="font-size:11px;opacity:.75;margin-top:8px">👤 '+esc(data.createdBy)+(data.createdByRole?' <span style="opacity:.8">('+esc(data.createdByRole)+')</span>':'')+'</div>';
            if(data.date) h += '<div style="font-size:11px;opacity:.6;margin-top:4px">📅 '+esc(data.date)+'</div>';
            h += '</div>';
        });
        box.innerHTML = h;
    });
}

// ═══════════════════════════════════════════════════════════════
// ── ملفات الموظفين (المستندات الرقمية) ─────────────────────────
function loadEmpDocsOverview() {
    var box = document.getElementById('empDocsList');
    if(!box) return;
    db.collection('users').where('role','in',['employee','tech_admin']).get().then(function(snap){
        if(snap.empty){
            box.innerHTML = '<div class="empty-hint">لا يوجد موظفون مسجّلون بعد.</div>';
            return;
        }
        var employees = [];
        snap.forEach(function(doc){ employees.push(Object.assign({uid:doc.id},doc.data())); });
        window._empDocsCache = employees;
        renderEmpDocsList(employees);
    }).catch(function(err){
        box.innerHTML = '<div class="empty-hint" style="color:var(--no)">تعذر تحميل قائمة الموظفين: '+escH(err.message)+'</div>';
    });
}

function renderEmpDocsList(list) {
    var box = document.getElementById('empDocsList');
    if(!box) return;
    var h = '';
    list.forEach(function(emp, idx) {
        var searchKey = ((emp.name||'')+' '+(emp.email||'')).toLowerCase();
        h += '<div class="staff-card" data-search="'+escH(searchKey)+'" id="empDocCard_'+idx+'">';
        h += '<div class="staff-card-h" onclick="toggleEmpDocCard('+idx+', \''+emp.uid+'\')">';
        h += '<div><div class="staff-name-row"><span class="staff-name">'+escH(emp.name||emp.email)+'</span>'+
             (emp.jobTitle?'<span class="badge" style="background:var(--gd);color:#1b2a4a">'+escH(emp.jobTitle)+'</span>':'')+'</div>';
        h += '<div class="staff-email">'+escH(emp.email||'')+'</div></div>';
        h += '<div class="staff-stats"><span class="bt bt-o" style="pointer-events:none">📂 فتح الملف الرقمي</span></div>';
        h += '</div>';
        h += '<div class="staff-card-body" id="empDocBody_'+idx+'" style="display:none">';
        h += '<div class="form-grid" style="background:rgba(255,255,255,.05);padding:16px;border-radius:10px;margin-bottom:16px">';
        h += '<div class="fg"><label>اسم المستند (مثال: عقد العمل)</label><input type="text" id="newDocTitle_'+idx+'"></div>';
        h += '<div class="fg"><label>ملف المستند</label><input type="file" id="newDocFile_'+idx+'"></div>';
        h += '<div class="fg" style="display:flex;align-items:flex-end"><button class="bt bt-p" style="width:100%" onclick="uploadEmpDoc(\''+emp.uid+'\', '+idx+')">⬆ رفع المستند</button></div>';
        h += '</div><div id="docUploadMsg_'+idx+'" style="font-size:12px;margin-bottom:12px"></div>';
        h += '<h4 style="margin-bottom:8px">📄 المستندات المحفوظة</h4>';
        h += '<div id="empDocsFolderList_'+idx+'"><div class="empty-hint">اضغط لعرض المستندات.</div></div>';
        h += '</div></div>';
    });
    box.innerHTML = h;
}

function filterEmpDocsList(val) {
    var v = val.toLowerCase().trim();
    var cards = document.querySelectorAll('#empDocsList .staff-card');
    cards.forEach(function(c){
        if(c.getAttribute('data-search').indexOf(v) > -1) c.style.display = 'block';
        else c.style.display = 'none';
    });
}

window._empDocsListeners = window._empDocsListeners || {};

function toggleEmpDocCard(idx, uid) {
    var body = document.getElementById('empDocBody_'+idx);
    var card = document.getElementById('empDocCard_'+idx);
    if(body.style.display === 'none') {
        body.style.display = 'block';
        card.classList.add('open');
        var box = document.getElementById('empDocsFolderList_'+idx);
        box.innerHTML = '<div class="empty-hint">⏳ جارٍ التحميل...</div>';
        if(window._empDocsListeners[uid]) { window._empDocsListeners[uid](); }
        window._empDocsListeners[uid] = db.collection('employeeDocuments').where('uid','==',uid).onSnapshot(function(snap){
            var b = document.getElementById('empDocsFolderList_'+idx);
            if(!b) return;
            if(snap.empty){
                b.innerHTML = '<div class="empty-hint">لا توجد مستندات مرفوعة لهذا الموظف.</div>';
                return;
            }
            var docs = [];
            snap.forEach(function(d){ docs.push(d); });
            docs.sort(function(a,b){
                var ta = a.data().createdAt ? a.data().createdAt.toMillis() : 0;
                var tb = b.data().createdAt ? b.data().createdAt.toMillis() : 0;
                return tb - ta;
            });
            var h = '<div style="display:flex;flex-direction:column;gap:8px">';
            docs.forEach(function(doc){
                var d = doc.data();
                h += '<div style="background:rgba(0,0,0,.3);padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;border-right:3px solid var(--gd)">';
                h += '<div><div style="font-weight:bold;margin-bottom:4px">'+escH(d.title)+'</div>';
                h += '<div style="font-size:11px;opacity:.6">بواسطة: '+(d.uploadedBy==='admin'?'الإدارة':'الموظف نفسه')+' · '+(d.createdAt&&d.createdAt.toDate?d.createdAt.toDate().toLocaleString('ar-EG'):'')+'</div></div>';
                h += '<div style="display:flex;gap:8px"><a href="'+d.fileUrl+'" target="_blank" class="bt bt-p" style="padding:4px 10px;font-size:11px;text-decoration:none">👁 عرض</a>';
                h += '<button class="bt bt-d" style="padding:4px 10px;font-size:11px" onclick="deleteEmpDoc(\''+doc.id+'\', \''+d.fileUrl+'\')">🗑 حذف</button></div>';
                h += '</div>';
            });
            h += '</div>';
            b.innerHTML = h;
        }, function(err){
            var b = document.getElementById('empDocsFolderList_'+idx);
            if(b) b.innerHTML = '<div class="empty-hint" style="color:var(--no)">خطأ في تحميل المستندات: '+escH(err.message)+'</div>';
        });
    } else {
        body.style.display = 'none';
        card.classList.remove('open');
        if(window._empDocsListeners[uid]) {
            window._empDocsListeners[uid]();
            delete window._empDocsListeners[uid];
        }
    }
}

function uploadEmpDoc(uid, idx) {
    var titleInp = document.getElementById('newDocTitle_'+idx);
    var fileInp = document.getElementById('newDocFile_'+idx);
    var msg = document.getElementById('docUploadMsg_'+idx);
    var title = (titleInp.value||'').trim();
    if(!title){ msg.style.color='var(--no)'; msg.textContent='❌ يرجى كتابة اسم المستند.'; return; }
    if(!fileInp.files || fileInp.files.length===0){ msg.style.color='var(--no)'; msg.textContent='❌ يرجى اختيار ملف.'; return; }
    
    var file = fileInp.files[0];
    msg.style.color = '#fff'; msg.textContent = '⏳ جارٍ الرفع... يرجى الانتظار';
    tgUploadFile(file, 'employeeDocuments/'+uid, function(url) {
        db.collection('employeeDocuments').add({
            uid: uid,
            title: title,
            fileName: file.name,
            fileType: file.type,
            fileUrl: url,
            uploadedBy: 'admin',
            createdAt: new Date()
        }).then(function(){
            titleInp.value = '';
            fileInp.value = '';
            msg.style.color = 'var(--ok)'; msg.textContent = '✅ تم رفع المستند بنجاح.';
            setTimeout(function(){ msg.textContent=''; }, 3000);
        }).catch(function(err){
            msg.style.color = 'var(--no)'; msg.textContent = '❌ تعذر حفظ بيانات المستند: '+err.message;
        });
    }, function(err){
        msg.style.color = 'var(--no)'; msg.textContent = '❌ تعذر رفع الملف: '+err.message;
    });
}

function deleteEmpDoc(docId, fileUrl) {
    if(!confirm('هل أنت متأكد من حذف هذا المستند نهائياً؟')) return;
    db.collection('employeeDocuments').doc(docId).delete().then(function(){
        // Note: we let the UI update automatically via onSnapshot
        // For best practice, we could also delete from storage, but we will leave it for now or delete if needed.
        if(fileUrl) {
            try { firebase.storage().refFromURL(fileUrl).delete(); } catch(e){}
        }
    }).catch(function(err){
        alert('❌ خطأ أثناء الحذف: '+err.message);
    });
}

// ═══════════════════════════════════════════════════════════════
// ── حفظ واسترجاع النماذج (المسودات) ──────────────────────────
function tgSaveFormDraft() {
    var activePg = document.querySelector('.pg.a');
    if(!activePg) return;
    var formId = activePg.id.replace('pg-', '');
    if(formId === 'dash' || formId === 'account' || formId === 'livetrack' || formId === 'empdocs' || formId === 'announcements') {
        alert('لا يمكن حفظ هذه الصفحة كنموذج.');
        return;
    }
    
    // Find the first input value (usually the name) to suggest as title
    var inputs = activePg.querySelectorAll('input, textarea, select');
    var defaultTitle = '';
    for(var i=0; i<inputs.length; i++) {
        if(inputs[i].type !== 'button' && inputs[i].type !== 'submit' && inputs[i].value.trim()) {
            defaultTitle = inputs[i].value.trim();
            break;
        }
    }
    
    var title = prompt('أدخل اسماً مميزاً لحفظ هذا النموذج (مثال: اسم الموظف):', defaultTitle);
    if(!title) return;
    
    var data = [];
    inputs.forEach(function(inp) {
        if(inp.type === 'file' || inp.type === 'button' || inp.type === 'submit') return;
        var val = (inp.type === 'checkbox' || inp.type === 'radio') ? inp.checked : inp.value;
        data.push(val);
    });
    
    var msgId = tgToast('⏳ جارٍ الحفظ...', 'info', true);
    db.collection('savedForms').add({
        formId: formId,
        title: title,
        data: JSON.stringify(data),
        savedBy: TG_USER.uid,
        createdAt: new Date()
    }).then(function() {
        tgToast('✅ تم حفظ النموذج بنجاح!', 'ok');
    }).catch(function(err) {
        tgToast('❌ تعذر الحفظ: ' + err.message, 'err');
    });
}

function tgLoadFormDrafts() {
    var activePg = document.querySelector('.pg.a');
    if(!activePg) return;
    var formId = activePg.id.replace('pg-', '');
    if(formId === 'dash' || formId === 'account' || formId === 'livetrack' || formId === 'empdocs' || formId === 'announcements') {
        alert('لا يوجد نماذج محفوظة لهذه الصفحة.');
        return;
    }
    
    var pageTitle = document.getElementById('pT') ? document.getElementById('pT').textContent : formId;
    var modalTitle = '📂 النماذج المحفوظة ('+escH(pageTitle)+')';
    var modalHtml = '<div id="savedFormsList"><div class="empty-hint">⏳ جارٍ التحميل...</div></div>';
    tgConfirmModal(modalTitle, modalHtml, [{label: 'إغلاق', cls: 'bt-o', onClick: tgCloseModal}]);
    
    db.collection('savedForms').where('formId','==',formId).get().then(function(snap){
        var box = document.getElementById('savedFormsList');
        if(!box) return;
        if(snap.empty){
            box.innerHTML = '<div class="empty-hint">لا توجد نماذج محفوظة لهذه الصفحة.</div>';
            return;
        }
        var docs = [];
        window._savedFormsData = {};
        snap.forEach(function(d){ docs.push(d); });
        docs.sort(function(a,b){
            var ta = a.data().createdAt ? (a.data().createdAt.toDate ? a.data().createdAt.toDate().getTime() : new Date(a.data().createdAt).getTime()) : 0;
            var tb = b.data().createdAt ? (b.data().createdAt.toDate ? b.data().createdAt.toDate().getTime() : new Date(b.data().createdAt).getTime()) : 0;
            return tb - ta;
        });

        var h = '<div style="display:flex;flex-direction:column;gap:8px">';
        docs.forEach(function(doc){
            var d = doc.data();
            window._savedFormsData[doc.id] = d.data || '';
            h += '<div style="background:rgba(255,255,255,.05);padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center">';
            h += '<div><div style="font-weight:bold;margin-bottom:4px">'+escH(d.title)+'</div>';
            h += '<div style="font-size:11px;opacity:.6">'+(d.createdAt&&d.createdAt.toDate?d.createdAt.toDate().toLocaleString('ar-EG'):'')+'</div></div>';
            h += '<div style="display:flex;gap:8px">';
            h += '<button class="bt bt-p" style="padding:4px 10px;font-size:11px" onclick="tgApplySavedForm(\''+formId+'\', \''+doc.id+'\')">📥 استرجاع</button>';
            h += '<button class="bt bt-d" style="padding:4px 10px;font-size:11px" onclick="tgDeleteSavedForm(\''+doc.id+'\', this)">🗑 حذف</button>';
            h += '</div></div>';
        });
        h += '</div>';
        box.innerHTML = h;
    }).catch(function(err){
        var box = document.getElementById('savedFormsList');
        if(box) box.innerHTML = '<div class="empty-hint" style="color:var(--no)">خطأ: '+escH(err.message)+'</div>';
    });
}

function tgApplySavedForm(formId, docId) {
    if(!confirm('سيتم استبدال البيانات الحالية بالبيانات المحفوظة. هل أنت متأكد؟')) return;
    try {
        var dataStr = window._savedFormsData ? window._savedFormsData[docId] : null;
        if(!dataStr) throw new Error("Data not found");
        var data = JSON.parse(dataStr);
        var activePg = document.getElementById('pg-'+formId);
        if(!activePg) return;
        var inputs = activePg.querySelectorAll('input, textarea, select');
        var dataIdx = 0;
        inputs.forEach(function(inp) {
            if(inp.type === 'file' || inp.type === 'button' || inp.type === 'submit') return;
            if(data[dataIdx] !== undefined) {
                if(inp.type === 'checkbox' || inp.type === 'radio') inp.checked = data[dataIdx];
                else inp.value = data[dataIdx];
                // Trigger input event for auto-expand textareas
                inp.dispatchEvent(new Event('input', { bubbles: true }));
            }
            dataIdx++;
        });
        tgCloseModal();
        tgToast('✅ تم استرجاع النموذج', 'ok');
    } catch(e) {
        alert('❌ خطأ في قراءة البيانات');
    }
}

function tgDeleteSavedForm(docId, btn) {
    if(!confirm('هل أنت متأكد من حذف هذا النموذج المحفوظ؟')) return;
    btn.disabled = true;
    db.collection('savedForms').doc(docId).delete().then(function(){
        btn.parentElement.parentElement.remove();
        tgToast('✅ تم الحذف', 'ok');
    }).catch(function(err){
        btn.disabled = false;
        alert('❌ تعذر الحذف: '+err.message);
    });
}
