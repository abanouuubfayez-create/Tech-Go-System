// ═══════════════════════════════════════════════════════════════════════
// 🔧 إعدادات Firebase — عدّل القيم دي من مشروعك على Firebase Console
// Project Settings ⚙️ → General → Your apps → SDK setup and configuration
// ═══════════════════════════════════════════════════════════════════════
const firebaseConfig = {
    apiKey: "AIzaSyDyyl6cHWGh838xZ6epbUSwL2qmDgLsIwM",
    authDomain: "tech-go-system.firebaseapp.com",
    projectId: "tech-go-system",
    storageBucket: "tech-go-system.firebasestorage.app",
    messagingSenderId: "514371652334",
    appId: "1:514371652334:web:d4089a4f474d3655ab41ff"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
window.auth = firebase.auth(); var auth = window.auth;
window.db   = firebase.firestore(); var db   = window.db;

// ═══════════════════════════════════════════════════════════════════════
// 🗄️ Supabase Storage (بديل مجاني لـ Firebase Storage)
// ═══════════════════════════════════════════════════════════════════════
var SUPABASE_URL = 'https://nokyxxajtrlmndsvbzik.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_o2zJ82_vrSGnYeFnL2Iemw_PI6oeqZ7';
var SUPABASE_BUCKET = 'uploads';

/**
 * حذف ملف من Supabase Storage بناءً على URL العام الخاص به
 * @param {string} publicUrl - الرابط العام للملف المراد حذفه
 * @param {function} [onDone] - callback عند النجاح (اختياري)
 * @param {function} [onError] - callback عند الخطأ (اختياري)
 */
function tgDeleteSupabaseFile(publicUrl, onDone, onError) {
    if (!publicUrl) { if (onDone) onDone(); return; }
    try {
        // استخراج المسار من الرابط العام
        // مثال: https://xxx.supabase.co/storage/v1/object/public/uploads/folder/file.jpg
        var marker = '/object/public/' + SUPABASE_BUCKET + '/';
        var idx = publicUrl.indexOf(marker);
        if (idx === -1) {
            // ليس ملف Supabase — تجاهل بصمت
            if (onDone) onDone();
            return;
        }
        var filePath = publicUrl.substring(idx + marker.length);

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', SUPABASE_URL + '/storage/v1/object/' + SUPABASE_BUCKET + '/' + filePath, true);
        xhr.setRequestHeader('apikey', SUPABASE_ANON_KEY);
        xhr.setRequestHeader('Authorization', 'Bearer ' + SUPABASE_ANON_KEY);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (onDone) onDone();
            } else {
                var errMsg = 'Delete failed: ' + xhr.status;
                console.warn('Supabase delete error:', errMsg);
                if (onError) onError(errMsg); else if (onDone) onDone();
            }
        };
        xhr.onerror = function () {
            console.warn('Supabase delete network error');
            if (onError) onError('Network error'); else if (onDone) onDone();
        };
        xhr.send();
    } catch (err) {
        console.error('tgDeleteSupabaseFile error:', err);
        if (onError) onError(err.message); else if (onDone) onDone();
    }
}

/**
 * رفع ملف على Supabase Storage مع متابعة نسبة الرفع، مع fallback تلقائي إلى Firebase Storage في حالة حدوث أي مشكلة
 * @param {string} folder - المجلد (مثلاً 'tasks', 'projects', 'requests', 'dev_resources')
 * @param {string} fileName - اسم الملف الفريد
 * @param {File} file - كائن الملف
 * @param {function} onProgress - callback نسبة الرفع (0-100)
 * @param {function} onError - callback عند الخطأ
 * @param {function} onDone - callback عند النجاح (يستقبل الـ public URL)
 */
function tgUploadFile(folder, fileName, file, onProgress, onError, onDone) {
    if (!file) {
        if (onError) onError('لم يتم اختيار ملف');
        return;
    }

    var ext = (fileName.lastIndexOf('.') !== -1) ? fileName.substring(fileName.lastIndexOf('.')) : '';
    var base = (fileName.lastIndexOf('.') !== -1) ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
    // تنظيف اسم الملف لدعم الأرقام والحروف واللغة العربية بشكل آمن
    var safeBase = base.replace(/[^\w\u0600-\u06FF\-]/g, '_').replace(/_+/g, '_');
    if (!safeBase || safeBase === '_') safeBase = 'doc_' + Math.random().toString(36).substring(2, 8);
    var safeFileName = safeBase + ext;
    var timestamp = Date.now();
    var path = folder + '/' + timestamp + '_' + encodeURIComponent(safeFileName);

    // دالة الـ Fallback لاستخدام Firebase Storage
    function uploadToFirebaseStorage(reason) {
        console.warn('Supabase upload skipped/failed (' + reason + '), falling back to Firebase Storage...');
        try {
            if (typeof firebase !== 'undefined' && firebase.storage) {
                var fbPath = folder + '/' + timestamp + '_' + safeFileName;
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child(fbPath);
                var uploadTask = fileRef.put(file);

                uploadTask.on('state_changed',
                    function(snapshot) {
                        if (snapshot.totalBytes > 0 && onProgress) {
                            var pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            onProgress(pct);
                        }
                    },
                    function(err) {
                        console.error('Firebase Storage upload error:', err);
                        if (onError) onError('خطأ في الرفع: ' + (err.message || 'فشل رفع الملف'));
                    },
                    function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            console.log('Firebase Storage upload success:', downloadURL);
                            if (onDone) onDone(downloadURL);
                        }).catch(function(err) {
                            if (onError) onError('خطأ في الحصول على رابط التحميل: ' + err.message);
                        });
                    }
                );
                return;
            }
        } catch (fbErr) {
            console.error('Firebase Storage fallback failed:', fbErr);
        }
        if (onError) onError('فشل رفع الملف: ' + (reason || 'حدث خطأ في الشبكة'));
    }

    try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', SUPABASE_URL + '/storage/v1/object/' + SUPABASE_BUCKET + '/' + path, true);
        xhr.setRequestHeader('apikey', SUPABASE_ANON_KEY);
        xhr.setRequestHeader('Authorization', 'Bearer ' + SUPABASE_ANON_KEY);
        xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
        xhr.setRequestHeader('x-upsert', 'true');

        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable && onProgress) {
                var percentComplete = Math.round((e.loaded / e.total) * 100);
                onProgress(percentComplete);
            }
        };

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var publicUrl = SUPABASE_URL + '/storage/v1/object/public/' + SUPABASE_BUCKET + '/' + path;
                if (onDone) onDone(publicUrl);
            } else {
                var errDesc = 'Status ' + xhr.status;
                try {
                    var jsonRes = JSON.parse(xhr.responseText);
                    if (jsonRes.message) errDesc += ' (' + jsonRes.message + ')';
                } catch(e){}
                uploadToFirebaseStorage(errDesc);
            }
        };

        xhr.onerror = function() {
            uploadToFirebaseStorage('Network error');
        };

        xhr.ontimeout = function() {
            uploadToFirebaseStorage('Timeout');
        };

        xhr.send(file);
    } catch(err) {
        uploadToFirebaseStorage(err.message || 'Sync error');
    }
}
