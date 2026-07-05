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
var auth = firebase.auth();
var db   = firebase.firestore();

// ═══════════════════════════════════════════════════════════════════════
// 🗄️ Supabase Storage (بديل مجاني لـ Firebase Storage)
// ═══════════════════════════════════════════════════════════════════════
var SUPABASE_URL = 'https://nokyxxajtrlmndsvbzik.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_o2zJ82_vrSGnYeFnL2Iemw_PI6oeqZ7';
var SUPABASE_BUCKET = 'uploads';

/**
 * رفع ملف على Supabase Storage مع متابعة نسبة الرفع
 * @param {string} folder - المجلد (مثلاً 'tasks', 'projects', 'requests')
 * @param {string} fileName - اسم الملف الفريد
 * @param {File} file - كائن الملف
 * @param {function} onProgress - callback نسبة الرفع (0-100)
 * @param {function} onError - callback عند الخطأ
 * @param {function} onDone - callback عند النجاح (يستقبل الـ public URL)
 */
function tgUploadFile(folder, fileName, file, onProgress, onError, onDone) {
    var path = folder + '/' + fileName;
    var encodedPath = path.split('/').map(encodeURIComponent).join('/');
    var url = SUPABASE_URL + '/storage/v1/object/' + SUPABASE_BUCKET + '/' + encodedPath;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + SUPABASE_ANON_KEY);
    xhr.setRequestHeader('apikey', SUPABASE_ANON_KEY);
    xhr.setRequestHeader('x-upsert', 'true');
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    
    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable && onProgress) {
            onProgress(Math.round(e.loaded / e.total * 100));
        }
    };
    xhr.onerror = function() {
        onError('فشل الاتصال بالخادم. تحقق من اتصال الإنترنت.');
    };
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var publicUrl = SUPABASE_URL + '/storage/v1/object/public/' + SUPABASE_BUCKET + '/' + encodedPath;
            onDone(publicUrl);
        } else {
            var errMsg = 'خطأ في الرفع (HTTP ' + xhr.status + ')';
            try { var resp = JSON.parse(xhr.responseText); errMsg = resp.message || resp.error || errMsg; } catch(e){}
            onError(errMsg);
        }
    };
    xhr.send(file);
}
