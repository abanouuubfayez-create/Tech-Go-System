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
