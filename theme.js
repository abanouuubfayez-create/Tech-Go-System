/**
 * Theme Manager for Tech Go System
 * Handles light/dark mode persistence and UI updates
 */

function tgInitTheme() {
    const theme = localStorage.getItem('tg-theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    // defer UI update until DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { tgUpdateThemeUI(theme); });
    } else {
        tgUpdateThemeUI(theme);
    }
}

function tgToggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('tg-theme', newTheme);
    tgUpdateThemeUI(newTheme);
    
    if (typeof tgToast === 'function') {
        tgToast(newTheme === 'dark' ? '🌙 تم تفعيل الوضع الليلي' : '☀️ تم تفعيل الوضع النهاري', 'ok');
    }
}

function tgUpdateThemeUI(theme) {
    // Update all theme toggle buttons (there may be one in each portal)
    document.querySelectorAll('#themeToggle').forEach(function(btn) {
        btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        btn.title = theme === 'dark' ? 'التبديل للوضع النهاري' : 'التبديل للوضع الليلي';
    });

    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#020617' : '#1b2a4a');
    }
}

// Run initialization immediately — icon will be fixed once DOM is ready
tgInitTheme();
