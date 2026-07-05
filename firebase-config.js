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
    var safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_\/]/g, '_').replace(/_+/g, '_');
    var path = folder + '/' + Date.now() + '_' + safeFileName;
    var storageRef = firebase.storage().ref(path);
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        function(snapshot) {
            if (onProgress) {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                onProgress(progress);
            }
        },
        function(error) {
            if (onError) onError(error.message);
        },
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                if (onDone) onDone(downloadURL);
            }).catch(function(err) {
                if (onError) onError(err.message);
            });
        }
    );
}
