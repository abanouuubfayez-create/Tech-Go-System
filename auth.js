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
            // طلب إذن الإشعارات
            tgRequestNotificationPermission();
            onOk(TG_USER);
        }).catch(function (err) {
            console.error(err);
            alert('حدث خطأ أثناء التحقق من صلاحية الحساب: ' + err.message);
        });
    });
}

function tgRequestNotificationPermission(){
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

function tgShowNotification(title, body, opts) {
    var options = Object.assign({
        body: body,
        icon: './icon-192.png',
        badge: './icon-192.png',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [150, 50, 150],
        tag: 'techgo-' + Date.now(),
        requireInteraction: false
    }, opts || {});

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Use SW for richer notifications
        navigator.serviceWorker.ready.then(function(reg) {
            reg.showNotification(title, options);
        }).catch(function() {
            // Fallback to basic Notification
            if ('Notification' in window && Notification.permission === 'granted') {
                try { new Notification(title, options); } catch(e) {}
            }
        });
    } else if ('Notification' in window && Notification.permission === 'granted') {
        try { new Notification(title, options); } catch(e) {}
    }

    // Always show in-app toast as well
    if (typeof tgToast === 'function') {
        tgToast('\uD83D\uDD14 ' + title + (body ? ' — ' + body : ''), 'ok');
    }
}

// \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 \u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0645\u062d\u062f\u062f \u0639\u0628\u0631 Firestore (\u064a\u0642\u0631\u0623\u0647 \u0645\u0646 onSnapshot \u0639\u0646\u062f \u0641\u062a\u062d \u0627\u0644\u0628\u0648\u0627\u0628\u0629)
function tgSendPushToUser(toUid, title, body, tag) {
    if (!db) return;
    db.collection('notifications').add({
        toUid: toUid,
        title: title,
        body: body,
        tag: tag || 'techgo',
        read: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function() {});
}

// \u0627\u0633\u062a\u0645\u0627\u0639 \u0644\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0648\u0627\u0631\u062f\u0629 \u0644\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u062d\u0627\u0644\u064a
function tgListenMyNotifications(uid) {
    if (!uid) return;
    var isFirst = true;
    db.collection('notifications').where('toUid', '==', uid).where('read', '==', false)
        .onSnapshot(function(snap) {
            if (isFirst) { isFirst = false; return; } // \u062a\u062c\u0627\u0647\u0644 \u0627\u0644\u0623\u0648\u0644\u064a
            snap.docChanges().forEach(function(change) {
                if (change.type === 'added') {
                    var d = change.doc.data();
                    tgShowNotification(d.title || '\u0625\u0634\u0639\u0627\u0631', d.body || '');
                    // \u062a\u0645\u064a\u064a\u0632\u0647\u0627 \u0643\u0645\u0642\u0631\u0648\u0621\u0629 \u0641\u0648\u0631\u0627\u064b
                    db.collection('notifications').doc(change.doc.id).update({ read: true }).catch(function() {});
                }
            });
        }, function() {});
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
