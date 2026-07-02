// ─── مصادقة وصلاحيات مشتركة ────────────────────────────────────────────
// يُستخدم في index.html (لوحة الأدمن) و employee.html (بوابة الموظف)

var TG_USER = null; // { uid, email, name, role, empId, jobTitle }

// يتحقق من تسجيل الدخول والصلاحية المطلوبة، وينفّذ onOk(userDoc) لو كل شيء تمام.
// requiredRole: 'admin' أو 'employee' — لو null يقبل أي دور مسجّل دخول.
function tgRequireAuth(requiredRole, onOk) {
    auth.onAuthStateChanged(function (user) {
        if (!user) { location.href = 'login.html'; return; }
        db.collection('users').doc(user.uid).get().then(function (doc) {
            if (!doc.exists) {
                alert('هذا الحساب غير مرتبط بملف مستخدم في النظام. تواصل مع مدير النظام.');
                auth.signOut().then(function () { location.href = 'login.html'; });
                return;
            }
            var data = doc.data();
            if (data.disabled === true) {
                alert('تم تعطيل هذا الحساب من قبل الإدارة. تواصل مع مدير النظام لمزيد من التفاصيل.');
                auth.signOut().then(function () { location.href = 'login.html'; });
                return;
            }
            TG_USER = { uid: user.uid, email: user.email, name: data.name || user.email, role: data.role, empId: data.empId || '', jobTitle: data.jobTitle || '' };
            if (requiredRole && data.role !== requiredRole) {
                location.href = (data.role === 'admin') ? 'index.html' : 'employee.html';
                return;
            }
            document.documentElement.classList.remove('tg-auth-pending');
            onOk(TG_USER);
        }).catch(function (err) {
            console.error(err);
            alert('حدث خطأ أثناء التحقق من صلاحية الحساب: ' + err.message);
        });
    });
}

function tgLogout() {
    if (!confirm('تسجيل الخروج من النظام؟')) return;
    auth.signOut().then(function () { location.href = 'login.html'; });
}

// إنشاء حساب دخول لموظف جديد بدون تسجيل خروج المدير الحالي
// (باستخدام تطبيق Firebase ثانوي مؤقت — حيلة معروفة وآمنة على جانب العميل)
function tgCreateEmployeeAccount(name, email, password, empId, jobTitle, onDone, onError) {
    var secondaryApp;
    try {
        secondaryApp = firebase.apps.find(function (a) { return a.name === 'secondary'; })
            || firebase.initializeApp(firebaseConfig, 'secondary');
    } catch (e) { onError(e); return; }
    var secAuth = firebase.auth(secondaryApp);
    secAuth.createUserWithEmailAndPassword(email, password).then(function (cred) {
        var uid = cred.user.uid;
        return db.collection('users').doc(uid).set({
            name: name, email: email, role: 'employee', empId: empId || '', jobTitle: jobTitle || '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function () { return secAuth.signOut(); }).then(function () { onDone(uid); });
    }).catch(function (err) { onError(err); });
}

// ─── إعداد أول تشغيل: إنشاء أول حساب أدمن من واجهة الموقع ─────────────
// يتحقق أولاً هل تم الإعداد من قبل (system/meta.setupDone)، ولو لأ
// بينشئ حساب الدخول + ملف المستخدم بدور admin + يعلّم الإعداد كمكتمل،
// كل ده في عملية واحدة ذرّية (batch) عشان مفيش سباق بين شخصين في نفس الوقت.
function tgCheckSetupDone(onResult, onError) {
    db.collection('system').doc('meta').get().then(function (doc) {
        onResult(!!(doc.exists && doc.data().setupDone === true));
    }).catch(function (err) { onError ? onError(err) : onResult(false); });
}

function tgCreateFirstAdmin(name, email, password, onDone, onError) {
    auth.createUserWithEmailAndPassword(email, password).then(function (cred) {
        var uid = cred.user.uid;
        var batch = db.batch();
        batch.set(db.collection('users').doc(uid), {
            name: name, email: email, role: 'admin',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        batch.set(db.collection('system').doc('meta'), {
            setupDone: true, setupAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        batch.commit().then(function () { onDone(uid); }).catch(function (err) {
            // فشل الحفظ (غالباً لأن حد تاني كمّل الإعداد في نفس اللحظة) — نلغي حساب الدخول اللي اتعمل
            cred.user.delete().catch(function () {});
            onError(err);
        });
    }).catch(function (err) { onError(err); });
}

// يمنع وميض عرض المحتوى قبل التأكد من تسجيل الدخول
document.documentElement.classList.add('tg-auth-pending');
