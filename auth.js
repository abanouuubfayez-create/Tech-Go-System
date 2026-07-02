// ─── مصادقة وصلاحيات مشتركة ────────────────────────────────────────────
// يُستخدم في index.html (لوحة الأدمن) و employee.html (بوابة الموظف)

var TG_USER = null; // { uid, email, name, role, empId, jobTitle }

// يتحقق من تسجيل الدخول والصلاحية المطلوبة، وينفّذ onOk(userDoc) لو كل شيء تمام.
// requiredRole: 'admin' | 'assistant_admin' | 'employee' | null (أي دور)
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
            TG_USER = {
                uid: user.uid, email: user.email,
                name: data.name || user.email,
                role: data.role,
                empId: data.empId || '',
                jobTitle: data.jobTitle || ''
            };

            // ── منطق التحويل حسب الدور ──
            if (requiredRole === 'admin') {
                // يقبل admin و assistant_admin كلاهما في لوحة الأدمن
                if (data.role !== 'admin' && data.role !== 'assistant_admin') {
                    location.href = 'employee.html';
                    return;
                }
            } else if (requiredRole === 'employee') {
                if (data.role !== 'employee') {
                    location.href = 'index.html';
                    return;
                }
            } else if (requiredRole && data.role !== requiredRole) {
                location.href = (data.role === 'admin' || data.role === 'assistant_admin') ? 'index.html' : 'employee.html';
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

// هل المستخدم الحالي لديه صلاحية الأدمن الكاملة؟
function isFullAdmin() {
    return TG_USER && TG_USER.role === 'admin';
}
// هل المستخدم الحالي أدمن مساعد؟
function isAssistantAdmin() {
    return TG_USER && TG_USER.role === 'assistant_admin';
}

function tgLogout() {
    if (!confirm('تسجيل الخروج من النظام؟')) return;
    auth.signOut().then(function () { location.href = 'login.html'; });
}

// إنشاء حساب دخول لموظف جديد بدون تسجيل خروج المدير الحالي
function tgCreateEmployeeAccount(name, email, password, empId, jobTitle, role, onDone, onError) {
    // للتوافق مع الاستدعاء القديم (بدون role)
    if (typeof role === 'function') {
        onError = onDone;
        onDone = role;
        role = 'employee';
    }
    var secondaryApp;
    try {
        secondaryApp = firebase.apps.find(function (a) { return a.name === 'secondary'; })
            || firebase.initializeApp(firebaseConfig, 'secondary');
    } catch (e) { onError(e); return; }
    var secAuth = firebase.auth(secondaryApp);
    secAuth.createUserWithEmailAndPassword(email, password).then(function (cred) {
        var uid = cred.user.uid;
        return db.collection('users').doc(uid).set({
            name: name, email: email,
            role: role || 'employee',
            empId: empId || '', jobTitle: jobTitle || '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function () { return secAuth.signOut(); }).then(function () { onDone(uid); });
    }).catch(function (err) { onError(err); });
}

// ─── إعداد أول تشغيل ───────────────────────────────────────────────────────
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
            cred.user.delete().catch(function () {});
            onError(err);
        });
    }).catch(function (err) { onError(err); });
}

// يمنع وميض عرض المحتوى قبل التأكد من تسجيل الدخول
document.documentElement.classList.add('tg-auth-pending');
