/**
 * Tech Go - Smart PWA Mobile Install Banner & Prompt
 * Prompts mobile users to install the Tech Go application on their smartphones
 */
(function() {
    'use strict';

    // Don't show if already in standalone app mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true ||
                         document.referrer.includes('android-app://');
    if (isStandalone) return;

    // Check if dismissed recently (within 24 hours)
    try {
        const dismissed = localStorage.getItem('techgo_pwa_dismissed_time');
        if (dismissed && (Date.now() - parseInt(dismissed, 10)) < 24 * 60 * 60 * 1000) {
            return;
        }
    } catch(e){}

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });

    function showInstallBanner() {
        if (document.getElementById('techgoSmartInstallBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'techgoSmartInstallBanner';
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(120%);
            width: calc(100% - 32px);
            max-width: 440px;
            background: linear-gradient(145deg, #132238, #0b1524);
            border: 1.5px solid rgba(45, 212, 191, 0.35);
            border-radius: 20px;
            padding: 16px 18px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.55), 0 0 25px rgba(15,118,110,0.25);
            z-index: 999999;
            direction: rtl;
            font-family: 'Cairo', 'Tajawal', -apple-system, sans-serif;
            color: #ffffff;
            backdrop-filter: blur(16px);
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        let actionHtml = '';
        if (isIOS) {
            actionHtml = `
                <div style="background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.2); border-radius: 12px; padding: 10px 12px; margin-top: 10px; font-size: 11.5px; line-height: 1.6; color: #cbd5e1;">
                    📲 <strong>لتثبيت التطبيق على الآيفون:</strong><br>
                    1. اضغط زر المشاركة <span style="font-size:14px; background:rgba(255,255,255,0.15); padding:1px 6px; border-radius:4px;">⎋ Share</span> أسفل المتصفح.<br>
                    2. مرر للأسفل واختر <span style="color:#2dd4bf; font-weight:800;">(إضافة إلى الصفحة الرئيسية ➕)</span>.
                </div>
            `;
        } else {
            actionHtml = `
                <button id="btnPwaDirectInstall" style="
                    width: 100%;
                    margin-top: 12px;
                    padding: 11px 16px;
                    background: linear-gradient(135deg, #0f766e, #0d9488);
                    color: #ffffff;
                    border: none;
                    border-radius: 12px;
                    font-size: 13.5px;
                    font-weight: 800;
                    font-family: inherit;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    box-shadow: 0 4px 15px rgba(13,148,136,0.4);
                    transition: transform 0.2s ease;
                ">
                    <span style="font-size:16px;">📲</span>
                    <span>تثبيت تطبيق Tech Go على الهاتف الآن</span>
                </button>
            `;
        }

        banner.innerHTML = `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 46px; height: 46px; border-radius: 14px; background: linear-gradient(135deg, #0f766e, #14b8a6); display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 12px rgba(20,184,166,0.35); flex-shrink: 0;">
                        📱
                    </div>
                    <div>
                        <div style="font-size: 14px; font-weight: 900; color: #ffffff; line-height: 1.3;">حمل تطبيق Tech Go على هاتفك</div>
                        <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">سرعة فائقة، وصول بلمسة واحدة، وعمل بدون إنترنت</div>
                    </div>
                </div>
                <button id="btnPwaDismiss" style="background: transparent; border: none; color: #64748b; font-size: 18px; cursor: pointer; padding: 4px 8px; border-radius: 8px; line-height: 1;" title="إغلاق">✕</button>
            </div>
            ${actionHtml}
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 10.5px; color: #64748b;">
                <span>شركة تيك جو للحلول المتطورة</span>
                <span id="btnPwaLater" style="color: #94a3b8; cursor: pointer; text-decoration: underline;">تذكيري لاحقاً</span>
            </div>
        `;

        document.body.appendChild(banner);

        // Animate entrance
        setTimeout(() => {
            banner.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        // Attach events
        const btnInstall = document.getElementById('btnPwaDirectInstall');
        if (btnInstall) {
            btnInstall.addEventListener('click', function() {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(function(choice) {
                        if (choice.outcome === 'accepted') {
                            dismissBanner();
                        }
                        deferredPrompt = null;
                    });
                } else {
                    alert('📌 لتثبيت التطبيق: اضغط على قائمة الخيارات (⋮) في المتصفح ثم اختر (تثبيت التطبيق / Install App أو إضافة إلى الشاشة الرئيسية).');
                }
            });
        }

        function dismissBanner() {
            try {
                localStorage.setItem('techgo_pwa_dismissed_time', Date.now().toString());
            } catch(e){}
            banner.style.transform = 'translateX(-50%) translateY(120%)';
            setTimeout(() => {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 500);
        }

        const btnDismiss = document.getElementById('btnPwaDismiss');
        if (btnDismiss) btnDismiss.addEventListener('click', dismissBanner);

        const btnLater = document.getElementById('btnPwaLater');
        if (btnLater) btnLater.addEventListener('click', dismissBanner);
    }

    // Auto-prompt after 1.5 seconds on mobile screens
    if (window.innerWidth <= 850 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
        window.addEventListener('load', function() {
            setTimeout(showInstallBanner, 1500);
        });
        if (document.readyState === 'complete') {
            setTimeout(showInstallBanner, 1500);
        }
    }
})();
