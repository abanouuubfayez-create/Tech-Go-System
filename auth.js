// ─── مصادقة وصلاحيات مشتركة ────────────────────────────────────────────
// يُستخدم في index.html (لوحة الأدمن) و employee.html (بوابة الموظف)

var TG_USER = null; // { uid, email, name, role, empId, jobTitle }

// يتحقق من تسجيل الدخول والصلاحية المطلوبة، وينفّذ onOk(userDoc) لو كل شيء تمام.
// requiredRole: 'admin' | 'tech_admin' | 'employee' | null (أي دور)
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
                jobTitle: data.jobTitle || '',
                chatAccess: data.chatAccess !== false,
                workMode: data.workMode || 'office'
            };

            // ── منطق التحويل حسب الدور ──
            if (requiredRole === 'admin') {
                // يقبل admin و tech_admin كلاهما في لوحة الأدمن
                if (data.role !== 'admin' && data.role !== 'tech_admin') {
                    location.href = 'employee.html';
                    return;
                }
            } else if (requiredRole === 'employee') {
                if (data.role !== 'employee') {
                    location.href = 'index.html';
                    return;
                }
            } else if (requiredRole && data.role !== requiredRole) {
                location.href = (data.role === 'admin') ? 'index.html' : 'employee.html';
                return;
            }

            document.documentElement.classList.remove('tg-auth-pending');
            // Listen to appSettings globally
            db.collection('system').doc('appSettings').onSnapshot(function(sDoc) {
                window._appSettingsCache = sDoc.data() || {};
                if (typeof window.onAppSettingsUpdate === 'function') {
                    window.onAppSettingsUpdate(window._appSettingsCache);
                }
            });
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
        seen: false,
        createdAt: new Date()
    }).catch(function() {});
}

// إرسال إشعار لكل المستخدمين في النظام ما عدا شخص واحد (المُرسِل نفسه) — تُستخدم للإعلانات ورسائل الشات العام
function tgBroadcastPush(title, body, tag, excludeUid) {
    if (!db) return;
    db.collection('users').get().then(function(snap) {
        snap.forEach(function(d) {
            if (d.id !== excludeUid) tgSendPushToUser(d.id, title, body, tag);
        });
    }).catch(function() {});
}

// استماع للإشعارات الواردة للمستخدم الحالي (يقرأه من onSnapshot عند فتح البوابة)
var _tgMyNotifUnsub = null;
var _tgMyNotifShownIds = {}; // درع إضافي: يمنع إعادة عرض نفس الإشعار مرتين في نفس الجلسة حتى لو فشل تحديث Firestore
function tgListenMyNotifications(uid) {
    if (!uid) return;
    // يمنع تراكم أكثر من مستمع (listener) واحد على نفس الحساب، وهو ما كان يسبب
    // إعادة عرض عشرات الإشعارات القديمة كل مرة تُعاد فيها المصادقة (auth state) خلال نفس الجلسة
    if (_tgMyNotifUnsub) { _tgMyNotifUnsub(); _tgMyNotifUnsub = null; }
    // ملاحظة: 'seen' يُستخدم فقط لمنع تكرار عرض التوست/الإشعار المنبثق لنفس العنصر،
    // وهو مستقل عن 'read' التي تتحكم بحالة القراءة داخل لوحة الإشعارات (Facebook-style)
    _tgMyNotifUnsub = db.collection('notifications').where('toUid', '==', uid).where('seen', '==', false)
        .onSnapshot(function(snap) {
            snap.docChanges().forEach(function(change) {
                if (change.type === 'added') {
                    var id = change.doc.id;
                    if (_tgMyNotifShownIds[id]) return; // اتعرض قبل كده في نفس الجلسة، تجاهله
                    _tgMyNotifShownIds[id] = true;

                    var d = change.doc.data();
                    // tag ثابت لكل إشعار حتى لو تكرر عرضه (مثلاً بسبب فشل تحديث seen) يستبدل نفسه
                    // في نظام تشغيل المستخدم بدل ما يتكدّس كإشعار جديد منفصل
                    tgShowNotification(d.title || 'إشعار', d.body || '', { tag: 'techgo-notif-' + id });
                    
                    // إذا كان الإشعار بخصوص انتهاء مشروع، شغل الاحتفال عند الموظف
                    if (d.tag === 'project-completed' && typeof tgCelebrate === 'function') {
                        setTimeout(tgCelebrate, 500); // تأخير بسيط ليظهر الإشعار أولاً
                    }

                    // تمييزها كـ "تم عرضها" فوراً حتى لا يتكرر التوست، مع إبقاء حالة القراءة كما هي
                    db.collection('notifications').doc(id).update({ seen: true }).catch(function(err) {
                        console.warn('تعذّر تحديث حالة seen للإشعار (تأكد من نشر firestore.rules المحدّثة):', err && err.message);
                    });
                }
            });
        }, function() {});
}

// ─── مركز الإشعارات (Facebook-style) — للأدمن فقط ─────────────────────────
// يستمع لكل إشعارات المستخدم (مقروءة وغير مقروءة) ويستدعي onUpdate(list, unreadCount) في كل تحديث
var _tgNotifCenterUnsub = null;
function tgListenNotifCenter(uid, onUpdate) {
    if (!uid || typeof onUpdate !== 'function') return;
    if (_tgNotifCenterUnsub) { _tgNotifCenterUnsub(); _tgNotifCenterUnsub = null; }
    // بدون orderBy لتفادي الحاجة لفهرس مركّب — الترتيب يتم في العميل
    _tgNotifCenterUnsub = db.collection('notifications').where('toUid', '==', uid)
        .onSnapshot(function(snap) {
            var list = [];
            var unread = 0;
            snap.forEach(function(doc) {
                var d = doc.data();
                d.id = doc.id;
                if (!d.read) unread++;
                list.push(d);
            });
            list.sort(function(a, b) {
                var ta = (a.createdAt && a.createdAt.toMillis) ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
                var tb = (b.createdAt && b.createdAt.toMillis) ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
                return tb - ta;
            });
            onUpdate(list.slice(0, 40), unread);
        }, function() {});
}

function tgMarkNotifRead(notifId) {
    if (!notifId) return;
    db.collection('notifications').doc(notifId).update({ read: true }).catch(function() {});
}

function tgMarkAllNotifsRead(uid) {
    if (!uid) return;
    db.collection('notifications').where('toUid', '==', uid).where('read', '==', false).get()
        .then(function(snap) {
            var batch = db.batch();
            snap.forEach(function(doc) { batch.update(doc.ref, { read: true }); });
            return batch.commit();
        }).catch(function() {});
}

function tgDeleteNotif(notifId) {
    if (!notifId) return;
    db.collection('notifications').doc(notifId).delete().catch(function() {});
}

// هل المستخدم الحالي لديه صلاحية الأدمن الكاملة؟
function isFullAdmin() {
    return TG_USER && TG_USER.role === 'admin';
}
// هل المستخدم الحالي أدمن تقني؟
function isAssistantAdmin() {
    return TG_USER && TG_USER.role === 'tech_admin';
}

function tgLogout() {
    if (!confirm('تسجيل الخروج من النظام؟')) return;
    auth.signOut().then(function () { location.href = 'login.html'; });
}

// إنشاء حساب دخول لموظف جديد بدون تسجيل خروج المدير الحالي
function tgCreateEmployeeAccount(name, email, password, empId, jobTitle, role, workMode, onDone, onError) {
    // للتوافق مع الاستدعاء القديم
    if (typeof role === 'function') {
        onError = onDone;
        onDone = role;
        role = 'employee';
        workMode = 'office';
    } else if (typeof workMode === 'function') {
        onError = onDone;
        onDone = workMode;
        workMode = 'office';
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
            workMode: workMode || 'office',
            createdAt: new Date()
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
            createdAt: new Date()
        });
        batch.set(db.collection('system').doc('meta'), {
            setupDone: true, setupAt: new Date()
        });
        batch.commit().then(function () { onDone(uid); }).catch(function (err) {
            cred.user.delete().catch(function () {});
            onError(err);
        });
    }).catch(function (err) { onError(err); });
}

// ─── مسح سجلات متعددة ────────────────────────────────────────────────────────
function tgDeleteAllRecords(collectionName, label, filterField, filterValue, callback) {
    if(!confirm('هل أنت متأكد من حذف جميع ' + label + ' نهائياً؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    var msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1b2a4a;color:#fff;padding:14px 28px;border-radius:10px;z-index:99999;font-size:14px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.3)';
    msg.textContent = '⏳ جاري الحذف...';
    document.body.appendChild(msg);

    var query = db.collection(collectionName);
    if(filterField && filterValue) query = query.where(filterField, '==', filterValue);

    query.get().then(function(snap) {
        var batch = db.batch();
        snap.forEach(function(d) { batch.delete(d.ref); });
        return batch.commit();
    }).then(function() {
        if(document.body.contains(msg)) document.body.removeChild(msg);
        if(typeof tgToast === 'function') tgToast('✅ تم حذف جميع ' + label + ' بنجاح', 'ok');
        else if(typeof showToast === 'function') showToast('✅ تم الحذف بنجاح');
        else alert('✅ تم الحذف بنجاح');
        if(callback) callback();
    }).catch(function(err) {
        if(document.body.contains(msg)) document.body.removeChild(msg);
        alert('❌ خطأ أثناء الحذف: ' + err.message);
    });
}

// يمنع وميض عرض المحتوى قبل التأكد من تسجيل الدخول
document.documentElement.classList.add('tg-auth-pending');
