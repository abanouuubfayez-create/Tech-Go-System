// ─────────────────────────────────────────────────────────────────────────
// إرسال نموذج لموظف — الأدمن يبني نموذجاً بحقول مخصصة ويرسله لموظف مُحدَّد،
// الموظف يملأه من بوابته ويبعته تاني، والأدمن يشوف الرد فور وصوله.
// يعتمد على مجموعة Firestore: formRequests (راجع firestore.rules)
// يُحمَّل بعد app.js مباشرة في index.html و employee.html — لا يعدّل app.js
// ─────────────────────────────────────────────────────────────────────────
(function () {
  if (window.__fsInit) return;
  window.__fsInit = true;

  // أسماء مقترحة تطابق نماذج الأدمن الموجودة فعلاً — الأدمن يقدر يكتب أي اسم تاني بحرية
  var FS_SUGGESTED = [
    'إقرار بيانات موظف', 'طلب استقالة', 'إقرار استلام عهدة', 'استبيان رضا وظيفي',
    'تحديث البيانات الشخصية', 'إقرار الاطلاع على سياسة', 'نموذج تقييم ذاتي'
  ];
  var FS_FIELD_TYPES = { text: 'نص قصير', textarea: 'نص طويل', date: 'تاريخ', number: 'رقم' };

  // قوالب جاهزة مطابقة لحقول النماذج الرسمية الموجودة في app.js — لتفادي بناء حقول يدوية من الصفر
  var FS_TEMPLATES = {
    leave: {
      title: 'نموذج طلب إجازة',
      fields: [
        { id: 'name', label: 'الاسم بالكامل', type: 'text' },
        { id: 'dept', label: 'القسم / الإدارة', type: 'text' },
        { id: 'jobTitle', label: 'المسمى الوظيفي', type: 'text' },
        { id: 'phone', label: 'رقم التواصل أثناء الإجازة', type: 'tel' },
        { id: 'leaveType', label: 'نوع الإجازة', type: 'select', options: ['إجازة سنوية (م.١٢٤)', 'إجازة عارضة (م.١٢٨)'] },
        { id: 'fromDate', label: 'تاريخ البدء', type: 'date' },
        { id: 'toDate', label: 'تاريخ الانتهاء', type: 'date' },
        { id: 'days', label: 'عدد الأيام', type: 'number' },
        { id: 'reason', label: 'سبب الإجازة', type: 'text' },
        { id: 'substitute', label: 'البديل أثناء الغياب', type: 'text' }
      ]
    },
    perm: {
      title: 'إذن حضور / انصراف',
      fields: [
        { id: 'permType', label: 'نوع الإذن', type: 'select', options: ['حضور بعد مواعيد العمل', 'انصراف قبل مواعيد العمل'] },
        { id: 'name', label: 'اسم الموظف', type: 'text' },
        { id: 'empId', label: 'الرقم الوظيفي', type: 'text' },
        { id: 'dept', label: 'القسم / الإدارة', type: 'text' },
        { id: 'date', label: 'التاريخ', type: 'date' },
        { id: 'officialTime', label: 'الموعد الرسمي', type: 'time' },
        { id: 'actualTime', label: 'الحضور / الانصراف الفعلي', type: 'time' },
        { id: 'diff', label: 'مدة الفارق', type: 'text' },
        { id: 'reason', label: 'السبب', type: 'textarea' }
      ]
    },
    delay: {
      title: 'التماس تعديل موعد الحضور',
      fields: [
        { id: 'name', label: 'اسم الموظف الكامل', type: 'text' },
        { id: 'empId', label: 'الرقم الوظيفي', type: 'text' },
        { id: 'jobTitle', label: 'المسمى الوظيفي', type: 'text' },
        { id: 'dept', label: 'القسم / الإدارة', type: 'text' },
        { id: 'phone', label: 'رقم التواصل', type: 'tel' },
        { id: 'date', label: 'التاريخ', type: 'date' },
        { id: 'currentTime', label: 'موعد الحضور الرسمي الحالي', type: 'time' },
        { id: 'proposedTime', label: 'الموعد المقترح بعد التعديل', type: 'time' },
        { id: 'reason', label: 'سبب طلب التعديل', type: 'textarea' }
      ]
    },
    res: {
      title: 'نموذج طلب استقالة',
      fields: [
        { id: 'name', label: 'الاسم بالكامل', type: 'text' },
        { id: 'empId', label: 'الرقم الوظيفي', type: 'text' },
        { id: 'dept', label: 'القسم / الإدارة', type: 'text' },
        { id: 'jobTitle', label: 'المسمى الوظيفي', type: 'text' },
        { id: 'hireDate', label: 'تاريخ التعيين', type: 'date' },
        { id: 'submitDate', label: 'تاريخ تقديم الطلب', type: 'date' },
        { id: 'lastDay', label: 'آخر يوم عمل مقترح', type: 'date' },
        { id: 'noticeDays', label: 'مدة الإشعار (بالأيام)', type: 'text' },
        { id: 'reason', label: 'سبب تقديم الاستقالة (اختياري)', type: 'textarea' }
      ]
    }
  };

  // ─────────────────────────────────────────────────────────────────────
  // نفس تصميم النماذج الرسمية (H/SC/F2/F3/SG3 من app.js) — لضمان أن يكون
  // النموذج اللي يملأه الموظف، والنسخة اللي يطبعها الأدمن، هو نفس تصميم
  // النموذج الرسمي الموجود في مكتبة الأوراق (مش نموذج شبيه مبني بشكل عام).
  // ─────────────────────────────────────────────────────────────────────
  function fgIn(label, fid, type) {
    return '<div class="fg"><label>' + escH(label) + '</label><input type="' + (type || 'text') + '" data-fid="' + fid + '"></div>';
  }
  function fgOut(label, value, full) {
    return '<div class="fg' + (full ? ' fg-full' : '') + '"><label>' + escH(label) + '</label>' +
      '<input type="text" value="' + escH(value || '—') + '" readonly></div>';
  }
  function fsRadioIn(fid, name, value, label) {
    return '<label><input type="radio" name="' + name + '" data-fid="' + fid + '" value="' + escH(value) + '"> ' + label + '</label>';
  }
  function fsRadioOut(value, checkedValue, label) {
    return '<label><input type="radio" disabled' + (value === checkedValue ? ' checked' : '') + '> ' + label + '</label>';
  }
  function fsStatusBlock() {
    return '<div class="stg"><button type="button" class="stb ok" onclick="ts(this)">✅ موافق</button>' +
      '<button type="button" class="stb no" onclick="ts(this)">❌ مرفوض</button>' +
      '<button type="button" class="stb pn a" onclick="ts(this)">⏳ معلق</button></div>';
  }

  var FS_OFFICIAL_META = {
    leave: { sub: 'اللائحة التنظيمية — المادة الثالثة', en: 'LEAVE REQUEST' },
    perm: { sub: 'اللائحة التنظيمية — المادة الثالثة', en: 'ATTENDANCE PERMISSION' },
    delay: { sub: 'طلب تعديل موعد الحضور الرسمي بصفة دائمة', en: 'ATTENDANCE DELAY REQUEST' },
    res: { sub: 'وفق اللائحة التنظيمية — إشعار إنهاء الخدمة', en: 'RESIGNATION REQUEST' }
  };

  var FS_OFFICIAL = {
    leave: {
      noteSection: '٧',
      fill: function () {
        var h = SC('١', 'بيانات الموظف');
        h += F2(fgIn('الاسم بالكامل', 'name'), fgIn('القسم / الإدارة', 'dept'));
        h += F2(fgIn('المسمى الوظيفي', 'jobTitle'), fgIn('رقم التواصل أثناء الإجازة', 'phone', 'tel'));
        h += SC('٢', 'نوع الإجازة');
        h += '<div class="chk-grid" style="grid-template-columns:1fr 1fr">' +
          fsRadioIn('leaveType', 'fsLt', 'إجازة سنوية (م.١٢٤)', '<strong>إجازة سنوية</strong> (م.١٢٤)') +
          fsRadioIn('leaveType', 'fsLt', 'إجازة عارضة (م.١٢٨)', '<strong>إجازة عارضة</strong> (م.١٢٨)') + '</div>';
        h += SC('٣', 'مدة الإجازة');
        h += F3(fgIn('تاريخ البدء', 'fromDate', 'date'), fgIn('تاريخ الانتهاء', 'toDate', 'date'), fgIn('عدد الأيام', 'days', 'number'));
        h += SC('٤', 'سبب الإجازة والبديل');
        h += '<div class="fg fg-full"><label>سبب الإجازة</label><input type="text" data-fid="reason"></div>';
        h += '<div class="fg fg-full"><label>البديل أثناء الغياب</label><input type="text" data-fid="substitute"></div>';
        return h;
      },
      print: function (v) {
        var h = SC('١', 'بيانات الموظف');
        h += F2(fgOut('الاسم بالكامل', v.name), fgOut('القسم / الإدارة', v.dept));
        h += F2(fgOut('المسمى الوظيفي', v.jobTitle), fgOut('رقم التواصل أثناء الإجازة', v.phone));
        h += SC('٢', 'نوع الإجازة');
        h += '<div class="chk-grid" style="grid-template-columns:1fr 1fr">' +
          fsRadioOut(v.leaveType, 'إجازة سنوية (م.١٢٤)', '<strong>إجازة سنوية</strong> (م.١٢٤)') +
          fsRadioOut(v.leaveType, 'إجازة عارضة (م.١٢٨)', '<strong>إجازة عارضة</strong> (م.١٢٨)') + '</div>';
        h += SC('٣', 'مدة الإجازة');
        h += F3(fgOut('تاريخ البدء', v.fromDate), fgOut('تاريخ الانتهاء', v.toDate), fgOut('عدد الأيام', v.days));
        h += SC('٤', 'سبب الإجازة والبديل');
        h += fgOut('سبب الإجازة', v.reason, true);
        h += fgOut('البديل أثناء الغياب', v.substitute, true);
        h += SC('٥', 'حالة الطلب');
        h += fsStatusBlock();
        h += SC('٦', 'التوقيعات');
        h += SG3('توقيع الموظف', '', 'المدير الإداري / مدير المشروعات', 'الموافقة', 'المدير التنفيذي', 'الاعتماد النهائي', null, 'admin', 'exec');
        return h;
      }
    },
    perm: {
      noteSection: '٥',
      fill: function () {
        var h = SC('١', 'نوع الإذن');
        h += '<div class="chk-grid" style="grid-template-columns:1fr 1fr">' +
          fsRadioIn('permType', 'fsPt', 'حضور بعد مواعيد العمل', '<strong>حضور</strong> بعد مواعيد العمل') +
          fsRadioIn('permType', 'fsPt', 'انصراف قبل مواعيد العمل', '<strong>انصراف</strong> قبل مواعيد العمل') + '</div>';
        h += SC('٢', 'بيانات الموظف');
        h += F2(fgIn('اسم الموظف', 'name'), fgIn('الرقم الوظيفي', 'empId'));
        h += F2(fgIn('القسم / الإدارة', 'dept'), fgIn('التاريخ', 'date', 'date'));
        h += SC('٣', 'تفاصيل الإذن');
        h += F3(fgIn('الموعد الرسمي', 'officialTime', 'time'), fgIn('الحضور/الانصراف الفعلي', 'actualTime', 'time'), fgIn('مدة الفارق', 'diff'));
        h += '<div class="fg fg-full"><label>السبب</label><textarea rows="2" data-fid="reason"></textarea></div>';
        return h;
      },
      print: function (v) {
        var h = SC('١', 'نوع الإذن');
        h += '<div class="chk-grid" style="grid-template-columns:1fr 1fr">' +
          fsRadioOut(v.permType, 'حضور بعد مواعيد العمل', '<strong>حضور</strong> بعد مواعيد العمل') +
          fsRadioOut(v.permType, 'انصراف قبل مواعيد العمل', '<strong>انصراف</strong> قبل مواعيد العمل') + '</div>';
        h += SC('٢', 'بيانات الموظف');
        h += F2(fgOut('اسم الموظف', v.name), fgOut('الرقم الوظيفي', v.empId));
        h += F2(fgOut('القسم / الإدارة', v.dept), fgOut('التاريخ', v.date));
        h += SC('٣', 'تفاصيل الإذن');
        h += F3(fgOut('الموعد الرسمي', v.officialTime), fgOut('الحضور/الانصراف الفعلي', v.actualTime), fgOut('مدة الفارق', v.diff));
        h += fgOut('السبب', v.reason, true);
        h += SC('٤', 'التوقيعات');
        h += SG3('توقيع الموظف', '', 'المدير الإداري', 'الموافقة', 'المدير التنفيذي', '', null, 'admin', 'exec');
        return h;
      }
    },
    delay: {
      noteSection: '٥',
      fill: function () {
        var h = SC('١', 'بيانات الموظف');
        h += F2(fgIn('اسم الموظف الكامل', 'name'), fgIn('الرقم الوظيفي', 'empId'));
        h += F2(fgIn('المسمى الوظيفي', 'jobTitle'), fgIn('القسم / الإدارة', 'dept'));
        h += F2(fgIn('رقم التواصل', 'phone', 'tel'), fgIn('التاريخ', 'date', 'date'));
        h += SC('٢', 'تفاصيل الالتماس');
        h += F2(fgIn('موعد الحضور الرسمي الحالي', 'currentTime', 'time'), fgIn('الموعد المقترح بعد التعديل', 'proposedTime', 'time'));
        h += '<div class="fg fg-full"><label>سبب طلب التعديل</label><textarea rows="3" data-fid="reason"></textarea></div>';
        return h;
      },
      print: function (v) {
        var h = SC('١', 'بيانات الموظف');
        h += F2(fgOut('اسم الموظف الكامل', v.name), fgOut('الرقم الوظيفي', v.empId));
        h += F2(fgOut('المسمى الوظيفي', v.jobTitle), fgOut('القسم / الإدارة', v.dept));
        h += F2(fgOut('رقم التواصل', v.phone), fgOut('التاريخ', v.date));
        h += SC('٢', 'تفاصيل الالتماس');
        h += F2(fgOut('موعد الحضور الرسمي الحالي', v.currentTime), fgOut('الموعد المقترح بعد التعديل', v.proposedTime));
        h += fgOut('سبب طلب التعديل', v.reason, true);
        h += SC('٣', 'قرار الإدارة');
        h += fsStatusBlock();
        h += SC('٤', 'التوقيعات');
        h += SG3('توقيع الموظف', 'مقدم الالتماس', 'المدير الإداري / مدير المشروعات', 'اعتماد وتوثيق', 'المدير التنفيذي', 'الموافقة النهائية', null, 'admin', 'exec');
        return h;
      }
    },
    res: {
      noteSection: '٦',
      fill: function () {
        var h = SC('١', 'بيانات الموظف');
        h += F2(fgIn('الاسم بالكامل', 'name'), fgIn('الرقم الوظيفي', 'empId'));
        h += F3(fgIn('القسم / الإدارة', 'dept'), fgIn('المسمى الوظيفي', 'jobTitle'), fgIn('تاريخ التعيين', 'hireDate', 'date'));
        h += SC('٢', 'تفاصيل الاستقالة');
        h += F3(fgIn('تاريخ تقديم الطلب', 'submitDate', 'date'), fgIn('آخر يوم عمل مقترح', 'lastDay', 'date'), fgIn('مدة الإشعار (بالأيام)', 'noticeDays'));
        h += '<div class="fg fg-full"><label>سبب تقديم الاستقالة (اختياري)</label><textarea rows="3" data-fid="reason"></textarea></div>';
        return h;
      },
      print: function (v) {
        var h = SC('١', 'بيانات الموظف');
        h += F2(fgOut('الاسم بالكامل', v.name), fgOut('الرقم الوظيفي', v.empId));
        h += F3(fgOut('القسم / الإدارة', v.dept), fgOut('المسمى الوظيفي', v.jobTitle), fgOut('تاريخ التعيين', v.hireDate));
        h += SC('٢', 'تفاصيل الاستقالة');
        h += F3(fgOut('تاريخ تقديم الطلب', v.submitDate), fgOut('آخر يوم عمل مقترح', v.lastDay), fgOut('مدة الإشعار (بالأيام)', v.noticeDays));
        h += fgOut('سبب تقديم الاستقالة', v.reason, true);
        h += SC('٣', 'الإقرار');
        h += '<div class="wb wb-gd">أقر أنا الموقّع أدناه برغبتي في إنهاء خدمتي، وأتعهد بتسليم كافة العُهد والمستندات الخاصة بالعمل قبل تاريخ آخر يوم عمل.</div>';
        h += SC('٤', 'حالة الطلب');
        h += fsStatusBlock();
        h += SC('٥', 'التوقيعات');
        h += SG3('توقيع الموظف', 'مقدم الطلب', 'المدير الإداري / مدير المشروعات', 'استلام ومراجعة', 'المدير التنفيذي', 'الموافقة النهائية', null, 'admin', 'exec');
        return h;
      }
    }
  };

  var fsEmployees = [];
  var fsFieldSeq = 0;
  var fsSentCache = [];

  // ══════════════════════════ جهة الأدمن (index.html) ══════════════════════════
  window.goSendForm = function (nav) {
    document.querySelectorAll('.S-i').forEach(function (e) { e.classList.remove('a'); });
    if (nav) { nav.classList.add('a'); }
    document.querySelectorAll('.pg').forEach(function (e) { e.classList.remove('a'); });
    var c = document.getElementById('pg-sendform');
    if (!c) return;
    c.classList.add('a');
    var pT = document.getElementById('pT');
    if (pT) pT.innerText = 'إرسال نموذج لموظف';
    if (window.innerWidth <= 900) {
      var sb = document.getElementById('sb');
      if (sb) sb.classList.remove('opn');
    }
    if (!c.dataset.mounted) {
      fsRenderAdminShell(c);
      fsLoadEmployees();
      fsWatchSentForms();
      c.dataset.mounted = '1';
    }
  };

  function fsRenderAdminShell(c) {
    var suggestOpts = FS_SUGGESTED.map(function (s) { return '<option value="' + escH(s) + '">'; }).join('');
    var tplOpts = '<option value="custom">✏️ نموذج مخصص (حقول حرة)</option>' +
      Object.keys(FS_TEMPLATES).map(function (k) {
        return '<option value="' + k + '">' + escH(FS_TEMPLATES[k].title) + '</option>';
      }).join('');
    c.innerHTML =
      '<div class="set-sec">' +
        '<div class="set-sec-title">📝 إنشاء نموذج جديد وإرساله</div>' +
        '<div class="set-hint" style="margin-bottom:10px">اختر نموذجاً جاهزاً بنفس حقول النظام الرسمية، أو ابنِ نموذجاً مخصصاً بحقولك الخاصة.</div>' +
        '<div class="fr fr2">' +
          '<div class="fg"><label>نوع النموذج</label><select id="fsTemplateKey" onchange="fsOnTemplateChange()">' + tplOpts + '</select></div>' +
          '<div class="fg"><label>الموظف المستهدف</label><select id="fsTargetEmp"><option value="">اختر موظفاً...</option></select></div>' +
        '</div>' +
        '<div class="fg fg-full" id="fsCustomTitleWrap" style="margin-top:4px;display:none">' +
          '<label>اسم النموذج</label><input type="text" id="fsTitle" list="fsSuggestDL" placeholder="مثلاً: استبيان رضا وظيفي">' +
        '</div>' +
        '<datalist id="fsSuggestDL">' + suggestOpts + '</datalist>' +
        '<div class="fg fg-full" style="margin-top:4px"><label>ملاحظة للموظف (اختياري)</label><textarea id="fsNote" rows="2"></textarea></div>' +
        '<div style="margin-top:10px" id="fsCustomFieldsWrap">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">' +
            '<label style="font-size:11.5px;font-weight:700;color:var(--tx2)">حقول النموذج</label>' +
            '<button type="button" class="bt bt-o" style="padding:4px 10px;font-size:11px" onclick="fsAddField()">➕ إضافة حقل</button>' +
          '</div>' +
          '<div id="fsFieldsBox"></div>' +
        '</div>' +
        '<div id="fsTplPreview" style="margin-top:10px;display:none"></div>' +
        '<button class="bt bt-p" style="margin-top:14px" onclick="fsSendForm()">📨 إرسال النموذج للموظف</button>' +
        '<div id="fsMsg" style="font-size:11px;margin-top:8px"></div>' +
      '</div>' +
      '<div class="set-sec-title" style="margin:18px 0 8px">📋 النماذج المُرسلة</div>' +
      '<div id="fsSentList"><div class="empty-hint">⏳ جارٍ التحميل...</div></div>';
    fsOnTemplateChange();
  }

  // يبدّل واجهة الأدمن بين القالب الجاهز (معاينة فقط) والنموذج المخصص (بانِي حقول حر)
  window.fsOnTemplateChange = function () {
    var sel = document.getElementById('fsTemplateKey');
    var key = sel ? sel.value : 'custom';
    var customTitleWrap = document.getElementById('fsCustomTitleWrap');
    var customFieldsWrap = document.getElementById('fsCustomFieldsWrap');
    var preview = document.getElementById('fsTplPreview');
    if (key === 'custom') {
      customTitleWrap.style.display = 'block';
      customFieldsWrap.style.display = 'block';
      preview.style.display = 'none';
      var box = document.getElementById('fsFieldsBox');
      if (box && !box.children.length) fsAddField();
    } else {
      customTitleWrap.style.display = 'none';
      customFieldsWrap.style.display = 'none';
      preview.style.display = 'block';
      var tpl = FS_TEMPLATES[key];
      preview.innerHTML = '<div class="set-hint" style="margin-bottom:6px">حقول هذا النموذج (مطابقة للنظام الرسمي):</div>' +
        '<div class="chk-grid" style="grid-template-columns:1fr 1fr">' +
        tpl.fields.map(function (f) { return '<label style="cursor:default">▫ ' + escH(f.label) + '</label>'; }).join('') +
        '</div>';
    }
  };

  window.fsAddField = function () {
    var box = document.getElementById('fsFieldsBox');
    if (!box) return;
    var fid = 'fsf' + (++fsFieldSeq);
    var row = document.createElement('div');
    row.className = 'fr fr3';
    row.id = fid;
    row.style.marginTop = '6px';
    row.innerHTML =
      '<div class="fg"><input type="text" placeholder="تسمية الحقل (مثلاً: السبب)" data-role="label"></div>' +
      '<div class="fg"><select data-role="type">' +
        Object.keys(FS_FIELD_TYPES).map(function (k) { return '<option value="' + k + '">' + FS_FIELD_TYPES[k] + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="fg" style="display:flex;align-items:center"><button type="button" class="bt bt-d" style="padding:6px 10px;font-size:11px" onclick="document.getElementById(\'' + fid + '\').remove()">🗑 حذف</button></div>';
    box.appendChild(row);
  };

  function fsLoadEmployees() {
    db.collection('users').where('role', 'in', ['employee', 'assistant_admin']).get().then(function (snap) {
      fsEmployees = snap.docs.map(function (d) { return Object.assign({ uid: d.id }, d.data()); });
      var sel = document.getElementById('fsTargetEmp');
      if (!sel) return;
      sel.innerHTML = '<option value="">اختر موظفاً...</option>' +
        fsEmployees.slice().sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', 'ar'); })
          .map(function (e) { return '<option value="' + e.uid + '">' + escH(e.name || e.email) + '</option>'; }).join('');
    }).catch(function () {});
  }

  window.fsSendForm = function () {
    var tplKey = (document.getElementById('fsTemplateKey').value || 'custom');
    var isTpl = tplKey !== 'custom' && FS_TEMPLATES[tplKey];
    var targetUid = document.getElementById('fsTargetEmp').value;
    var note = (document.getElementById('fsNote').value || '').trim();
    var msg = document.getElementById('fsMsg');
    var title, fields;

    if (isTpl) {
      title = FS_TEMPLATES[tplKey].title;
      fields = FS_TEMPLATES[tplKey].fields;
    } else {
      title = (document.getElementById('fsTitle').value || '').trim();
      var fieldsBox = document.getElementById('fsFieldsBox');
      fields = [];
      fieldsBox.querySelectorAll('.fr').forEach(function (row, i) {
        var lbl = (row.querySelector('[data-role="label"]').value || '').trim();
        var typ = row.querySelector('[data-role="type"]').value;
        if (lbl) fields.push({ id: 'f' + i, label: lbl, type: typ });
      });
      if (!title) { msg.style.color = 'var(--no)'; msg.textContent = 'اكتب اسم النموذج أولاً.'; return; }
      if (!fields.length) { msg.style.color = 'var(--no)'; msg.textContent = 'أضف حقلاً واحداً على الأقل.'; return; }
    }

    if (!targetUid) { msg.style.color = 'var(--no)'; msg.textContent = 'اختر الموظف المستهدف.'; return; }

    var emp = fsEmployees.filter(function (e) { return e.uid === targetUid; })[0];
    msg.style.color = 'var(--tx3)'; msg.textContent = '⏳ جارٍ الإرسال...';

    db.collection('formRequests').add({
      templateLabel: title,
      templateKey: isTpl ? tplKey : 'custom',
      fields: fields,
      note: note,
      targetUid: targetUid,
      targetName: emp ? (emp.name || emp.email) : '',
      sentByUid: TG_USER.uid,
      sentByName: TG_USER.name,
      status: 'pending',
      values: {},
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      msg.style.color = 'var(--ok)'; msg.textContent = '✅ تم إرسال النموذج للموظف';
      document.getElementById('fsTargetEmp').value = '';
      document.getElementById('fsNote').value = '';
      if (!isTpl) {
        document.getElementById('fsTitle').value = '';
        document.getElementById('fsFieldsBox').innerHTML = '';
        fsAddField();
      }
      if (typeof tgSendPushToUser === 'function') {
        tgSendPushToUser(targetUid, '📝 نموذج جديد للتعبئة', title, 'form-new');
      }
    }).catch(function (err) {
      msg.style.color = 'var(--no)'; msg.textContent = '❌ ' + err.message;
    });
  };

  function fsWatchSentForms() {
    db.collection('formRequests').where('sentByUid', '==', TG_USER.uid)
      .onSnapshot(function (snap) {
        fsSentCache = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
        fsSentCache.sort(function (a, b) {
          var ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
          var tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
          return tb - ta;
        });
        fsRenderSentList();
      });
  }

  function fsRenderSentList() {
    var box = document.getElementById('fsSentList');
    if (!box) return;
    if (!fsSentCache.length) { box.innerHTML = '<div class="empty-hint">لسه ما بعتّش أي نموذج.</div>'; return; }
    var h = '';
    fsSentCache.forEach(function (r) {
      var pending = r.status === 'pending';
      h += '<div class="pj-row">' +
        '<div class="pj-t">' + escH(r.templateLabel || 'نموذج') +
          ' <span class="badge ' + (pending ? 'badge-pending' : 'badge-approved') + '">' + (pending ? 'قيد الانتظار' : 'تم الرد') + '</span>' +
        '</div>' +
        '<div class="pj-meta">👤 ' + escH(r.targetName || '') + '</div>' +
        (pending ? '' :
          '<div style="margin-top:8px">' +
            (r.fields || []).map(function (f) {
              return '<div class="pj-meta" style="margin-bottom:2px"><b>' + escH(f.label) + ':</b> ' + escH((r.values && r.values[f.id]) || '—') + '</div>';
            }).join('') +
            '<button type="button" class="bt bt-o" style="padding:4px 10px;font-size:11px;margin-top:6px" onclick="fsPrintSubmittedForm(\'' + r.id + '\')">🖨 طباعة</button>' +
          '</div>') +
      '</div>';
    });
    box.innerHTML = h;
  }

  // يطبع رد الموظف على النموذج بنفس التصميم الرسمي للنظام (لوجو + رقم مستند + تنسيق موحّد)
  window.fsPrintSubmittedForm = function (reqId) {
    var r = fsSentCache.filter(function (x) { return x.id === reqId; })[0];
    if (!r) return;
    if (typeof H !== 'function' || typeof printDoc !== 'function') {
      alert('تعذر الطباعة: افتح هذه الصفحة من لوحة التحكم الرئيسية.');
      return;
    }
    var tpl = FS_TEMPLATES[r.templateKey];
    var title = tpl ? tpl.title : (r.templateLabel || 'نموذج');
    var docId = (tpl && r.templateKey) || null;
    var official = FS_OFFICIAL[r.templateKey];
    var h;
    if (official) {
      var meta = FS_OFFICIAL_META[r.templateKey] || {};
      h = H(title, meta.sub || '', meta.en || '', docId);
      h += official.print(r.values || {});
      if (r.note) {
        h += SC(official.noteSection, 'ملاحظة الأدمن عند الإرسال');
        h += tgBlock(r.note);
      }
      h += FT(['نسخة للموظف', 'نسخة للإدارة']);
    } else {
      h = H(title, 'نموذج مُعبَّأ من الموظف', '', docId);
      h += SC('١', 'بيانات النموذج');
      h += tgLine('الموظف', r.targetName || '');
      (r.fields || []).forEach(function (f) {
        h += tgLine(f.label, (r.values && r.values[f.id]) || '');
      });
      if (r.note) {
        h += SC('٢', 'ملاحظة الأدمن عند الإرسال');
        h += tgBlock(r.note);
      }
      h += FT(['نسخة للموظف', 'نسخة للإدارة']);
    }
    printDoc(h);
  };

  // ══════════════════════════ جهة الموظف (employee.html) ══════════════════════════
  var fsMyCache = [];

  window.loadMyFormRequests = function (uid) {
    db.collection('formRequests').where('targetUid', '==', uid)
      .onSnapshot(function (snap) {
        fsMyCache = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
        fsRenderMyForms();
      }, function (err) {
        var box = document.getElementById('myFormsList');
        if (box) box.innerHTML = '<div class="empty-hint" style="color:var(--no)">تعذر التحميل: ' + escH(err.message) + '</div>';
      });
  };

  function fsRenderMyForms() {
    var box = document.getElementById('myFormsList');
    if (!box) return;
    var pendingCount = fsMyCache.filter(function (r) { return r.status === 'pending'; }).length;
    var badge = document.getElementById('forms-badge');
    if (badge) { badge.style.display = pendingCount ? 'inline-block' : 'none'; badge.textContent = pendingCount; }

    if (!fsMyCache.length) { box.innerHTML = '<div class="empty-hint">لا توجد نماذج مُرسلة لك حالياً.</div>'; return; }
    var sorted = fsMyCache.slice().sort(function (a, b) { return a.status === 'pending' ? -1 : 1; });
    var h = '';
    sorted.forEach(function (r) {
      var pending = r.status === 'pending';
      h += '<div class="ac-row">' +
        '<div class="ac-t">' + escH(r.templateLabel || 'نموذج') +
          ' <span class="badge ' + (pending ? 'badge-pending' : 'badge-approved') + '">' + (pending ? 'بانتظار تعبئتك' : 'تم الإرسال') + '</span>' +
        '</div>' +
        (r.note ? '<div class="ac-meta">📌 ' + escH(r.note) + '</div>' : '') +
        '<div class="ac-meta">من: ' + escH(r.sentByName || 'الأدمن') + '</div>' +
        (pending ?
          '<div id="fsForm_' + r.id + '" style="margin-top:10px">' +
            (FS_OFFICIAL[r.templateKey] ? FS_OFFICIAL[r.templateKey].fill() :
            (r.fields || []).map(function (f) {
              var inputHtml;
              if (f.type === 'textarea') {
                inputHtml = '<textarea rows="2" data-fid="' + f.id + '"></textarea>';
              } else if (f.type === 'select') {
                inputHtml = '<select data-fid="' + f.id + '"><option value="">اختر...</option>' +
                  (f.options || []).map(function (o) { return '<option value="' + escH(o) + '">' + escH(o) + '</option>'; }).join('') +
                  '</select>';
              } else {
                var inType = ['date', 'number', 'tel', 'time', 'email'].indexOf(f.type) > -1 ? f.type : 'text';
                inputHtml = '<input type="' + inType + '" data-fid="' + f.id + '">';
              }
              return '<div class="fg" style="margin-bottom:8px"><label>' + escH(f.label) + '</label>' + inputHtml + '</div>';
            }).join('')) +
            '<button class="bt bt-p" style="padding:6px 14px;font-size:11.5px" onclick="fsSubmitMyForm(\'' + r.id + '\')">📨 إرسال للأدمن</button>' +
            '<div id="fsMyMsg_' + r.id + '" style="font-size:11px;margin-top:6px"></div>' +
          '</div>'
          :
          '<div style="margin-top:8px">' +
            (r.fields || []).map(function (f) {
              return '<div class="ac-meta"><b>' + escH(f.label) + ':</b> ' + escH((r.values && r.values[f.id]) || '—') + '</div>';
            }).join('') +
          '</div>') +
      '</div>';
    });
    box.innerHTML = h;
  }

  window.fsSubmitMyForm = function (reqId) {
    var wrap = document.getElementById('fsForm_' + reqId);
    var msg = document.getElementById('fsMyMsg_' + reqId);
    if (!wrap) return;
    var values = {};
    var missing = false;
    var radioFids = {};
    wrap.querySelectorAll('[data-fid]').forEach(function (el) {
      var fid = el.getAttribute('data-fid');
      if (el.type === 'radio') {
        radioFids[fid] = true;
        if (el.checked) values[fid] = el.value;
        return;
      }
      var v = (el.value || '').trim();
      if (!v) missing = true;
      values[fid] = v;
    });
    Object.keys(radioFids).forEach(function (fid) { if (!values[fid]) missing = true; });
    if (missing) { msg.style.color = 'var(--no)'; msg.textContent = 'من فضلك املأ كل الحقول قبل الإرسال.'; return; }

    msg.style.color = 'var(--tx3)'; msg.textContent = '⏳ جارٍ الإرسال...';
    db.collection('formRequests').doc(reqId).update({
      status: 'submitted',
      values: values,
      submittedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      msg.style.color = 'var(--ok)'; msg.textContent = '✅ تم الإرسال للأدمن';
      var reqData = fsMyCache.filter(function (r) { return r.id === reqId; })[0];
      if (reqData && reqData.sentByUid && typeof tgSendPushToUser === 'function') {
        tgSendPushToUser(reqData.sentByUid, '📝 رد جديد على نموذج', (TG_USER.name || 'موظف') + ' ملأ نموذج «' + (reqData.templateLabel || '') + '»', 'form-submitted');
      }
    }).catch(function (err) {
      msg.style.color = 'var(--no)'; msg.textContent = '❌ ' + err.message;
    });
  };
})();
