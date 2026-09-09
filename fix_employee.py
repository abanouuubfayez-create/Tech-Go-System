with open('D:\\Tech Go System\\employee.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''        window.initEmpMexpAccessCheck = initEmpMexpAccessCheck;
        // Initialize access check
initEmpMexpAccessCheck();
        initEmpPurchaseAccessCheck;'''

new = '''        window.initEmpMexpAccessCheck = initEmpMexpAccessCheck;
        // Initialize access check
        initEmpMexpAccessCheck();
        initEmpPurchaseAccessCheck();

        // Access check for Office Boy purchase log
        function initEmpPurchaseAccessCheck() {
            var tab = document.getElementById("empTabPurchase");
            var drawer = document.getElementById("empDrawerPurchase");
            function applyAccess() {
                var user = (typeof TG_USER !== "undefined" && TG_USER) ? TG_USER : null;
                var hasAccess = false;
                if (user) {
                    if (user.role === "admin" || user.role === "tech_admin") { hasAccess = true; }
                    else {
                        var jobTitle = (user.jobTitle || "").trim().toLowerCase();
                        if (jobTitle === "مساعد مكتبي" || jobTitle === "office boy" || jobTitle.indexOf("مشتريات") !== -1 || jobTitle.indexOf("purchase") !== -1) { hasAccess = true; }
                    }
                }
                if (tab) tab.style.display = hasAccess ? "flex" : "none";
                if (drawer) drawer.style.display = hasAccess ? "flex" : "none";
            }
            applyAccess();
            if (!window._empPurchaseAccessListenerInit && typeof db !== "undefined" && db && db.collection) {
                window._empPurchaseAccessListenerInit = true;
                db.collection("system").doc("appSettings").onSnapshot(function(doc) { if (doc.exists) { applyAccess(); } }, function(e){});
            }
        }
        window.initEmpPurchaseAccessCheck = initEmpPurchaseAccessCheck;'''

content = content.replace(old, new)
with open('D:\\Tech Go System\\employee.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')