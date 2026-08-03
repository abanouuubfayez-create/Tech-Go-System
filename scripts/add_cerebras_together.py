import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update settings UI header & hints
content = content.replace(
    '<div class="set-sec-title">🤖 الذكاء الاصطناعي (Gemini / Groq / OpenRouter)</div>',
    '<div class="set-sec-title">🤖 الذكاء الاصطناعي (Cerebras / Together / Gemini / Groq / OpenRouter)</div>'
)

content = content.replace(
    'ضع هنا مفتاح API الخاص بك (Gemini أو Groq أو OpenRouter) لتفعيل اقتراحات التطوير المهني. النظام سيتعرف عليه تلقائياً.',
    'ضع هنا مفتاح API الخاص بك (Cerebras أو Together AI أو Gemini أو Groq أو OpenRouter). يتعرف النظام على مزود الخدمة تلقائياً عبر صيغة المفتاح (ينصح بـ Cerebras أو Together للملفات والتقارير الكبيرة).'
)

content = content.replace(
    'placeholder="AIzaSy..."',
    'placeholder="csk-... (Cerebras) | tgp_... (Together) | gsk_... (Groq) | AIzaSy... (Gemini)"'
)

# 2. Update advisor prompt & alerts
content = content.replace(
    'أضف مفتاح Gemini (أو Groq / OpenRouter) — مجاني بالكامل — من إعدادات النظام عشان المستشار الذكي يبدأ يشتغل.',
    'أضف مفتاح Cerebras أو Together AI أو Gemini أو Groq — مجاني بالكامل — من إعدادات النظام عشان المستشار الذكي يبدأ يشتغل.'
)

content = content.replace(
    "alert('مفتاح الذكاء الاصطناعي غير موجود في إعدادات النظام. يرجى إضافة مفتاح (Gemini أو Groq أو OpenRouter) أولاً.');",
    "alert('مفتاح الذكاء الاصطناعي غير موجود في إعدادات النظام. يرجى إضافة مفتاح (Cerebras أو Together أو Gemini أو Groq أو OpenRouter) أولاً.');"
)

content = content.replace(
    "الحل الأسرع: جيب مفتاح Groq المجاني من console.groq.com وحطه بدل مفتاح Gemini في إعدادات النظام (نفس الخانة، بيتعرف تلقائي).",
    "الحل الأسرع: جيب مفتاح مجاني بسعة ضخمة من Cerebras أو Together AI أو Groq وحطه بدل مفتاح Gemini في إعدادات النظام (بيتعرف تلقائي)."
)

# 3. Update aiAdvisorCallAPI
old_advisor_code = """        var isGroq = apiKey.indexOf('gsk_') === 0;
        var isOpenRouter = apiKey.indexOf('sk-or-') === 0;

        if (isGroq || isOpenRouter) {
            var endpoint = isGroq ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
            var modelName = isGroq ? 'llama-3.3-70b-versatile' : 'meta-llama/llama-3.1-8b-instruct:free';"""

new_advisor_code = """        var isGroq = apiKey.indexOf('gsk_') === 0;
        var isOpenRouter = apiKey.indexOf('sk-or-') === 0;
        var isCerebras = apiKey.indexOf('csk-') === 0 || apiKey.indexOf('csk_') === 0 || apiKey.toLowerCase().indexOf('cerebras') !== -1;
        var isTogether = apiKey.indexOf('tgp_') === 0 || apiKey.indexOf('together_') === 0 || apiKey.indexOf('together-') === 0 || apiKey.indexOf('tg-') === 0 || apiKey.toLowerCase().indexOf('together') !== -1;

        if (isGroq || isOpenRouter || isCerebras || isTogether) {
            var endpoint = '';
            var modelName = '';
            if (isCerebras) {
                endpoint = 'https://api.cerebras.ai/v1/chat/completions';
                modelName = 'llama-3.3-70b';
            } else if (isTogether) {
                endpoint = 'https://api.together.xyz/v1/chat/completions';
                modelName = 'meta-llama/Llama-3.3-70B-Instruct-Turbo';
            } else if (isGroq) {
                endpoint = 'https://api.groq.com/openai/v1/chat/completions';
                modelName = 'llama-3.3-70b-versatile';
            } else {
                endpoint = 'https://openrouter.ai/api/v1/chat/completions';
                modelName = 'meta-llama/llama-3.1-8b-instruct:free';
            }"""

if old_advisor_code in content:
    content = content.replace(old_advisor_code, new_advisor_code)
    print("aiAdvisorCallAPI successfully updated!")
else:
    print("WARNING: old_advisor_code not found!")

# 4. Update callGemini
old_callgemini_code = """    var isGroq = apiKey.startsWith('gsk_');
    var isOpenRouter = apiKey.startsWith('sk-or-');
    var isGemini = !isGroq && !isOpenRouter;

    btn.disabled = true;
    btn.innerHTML = '⏳ جاري المعالجة...';
    resultBox.style.display = 'block';
    
    var providerName = isGroq ? 'Groq' : (isOpenRouter ? 'OpenRouter' : 'Gemini');
    resultBox.innerHTML = '<div style="text-align:center; color:var(--tx2);">جاري إنشاء الرد عبر ' + providerName + '...</div>';

    function renderResult(text) {
        btn.disabled = false;
        btn.innerHTML = btnOriginalText;
        var resultHTML = '';
        if(typeof marked !== 'undefined') {
            resultHTML = marked.parse(text);
        } else {
            resultHTML = '<pre style="white-space:pre-wrap; font-family:inherit;">' + escH(text) + '</pre>';
        }
        
        var actionsHTML = '<div style="margin-top:20px; padding-top:15px; border-top:1px solid #ccc; display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap;">';
        actionsHTML += '<button onclick="share_ai_content()" style="padding:8px 15px; font-size:14px; background-color:#2563eb; color:#ffffff; border:none; border-radius:5px; cursor:pointer;"><i class="fa fa-share-alt"></i> مشاركة</button>';
        actionsHTML += '<button onclick="download_ai_content()" style="padding:8px 15px; font-size:14px; background-color:#f3f4f6; color:#1f2937; border:1px solid #d1d5db; border-radius:5px; cursor:pointer;"><i class="fa fa-file-text"></i> حفظ النص</button>';
        
        if (isAdmin) {
            actionsHTML += '<button onclick="search_ai_content_on_google()" style="padding:8px 15px; font-size:14px; background-color:#4285F4; color:#ffffff; border:none; border-radius:5px; cursor:pointer;"><i class="fa fa-google"></i> البحث في جوجل</button>';
            actionsHTML += '<button onclick="jump_to_upload_resource()" style="padding:8px 15px; font-size:14px; background-color:#10B981; color:#ffffff; border:none; border-radius:5px; cursor:pointer;"><i class="fa fa-upload"></i> إضافة للمكتبة</button>';
        }
        
        actionsHTML += '</div>';
        resultBox.innerHTML = resultHTML + actionsHTML;
        window._lastAiResultText = text;
    }

    function renderError(errHtml) {
        btn.disabled = false;
        btn.innerHTML = btnOriginalText;
        resultBox.innerHTML = errHtml;
    }

    if (isGroq || isOpenRouter) {
        var endpoint = isGroq ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
        var modelName = isGroq ? 'llama-3.3-70b-versatile' : 'meta-llama/llama-3.1-8b-instruct:free';"""

new_callgemini_code = """    var isGroq = apiKey.indexOf('gsk_') === 0;
    var isOpenRouter = apiKey.indexOf('sk-or-') === 0;
    var isCerebras = apiKey.indexOf('csk-') === 0 || apiKey.indexOf('csk_') === 0 || apiKey.toLowerCase().indexOf('cerebras') !== -1;
    var isTogether = apiKey.indexOf('tgp_') === 0 || apiKey.indexOf('together_') === 0 || apiKey.indexOf('together-') === 0 || apiKey.indexOf('tg-') === 0 || apiKey.toLowerCase().indexOf('together') !== -1;
    var isGemini = !isGroq && !isOpenRouter && !isCerebras && !isTogether;

    btn.disabled = true;
    btn.innerHTML = '⏳ جاري المعالجة...';
    resultBox.style.display = 'block';
    
    var providerName = isCerebras ? 'Cerebras' : (isTogether ? 'Together AI' : (isGroq ? 'Groq' : (isOpenRouter ? 'OpenRouter' : 'Gemini')));
    resultBox.innerHTML = '<div style="text-align:center; color:var(--tx2);">جاري إنشاء الرد عبر ' + providerName + '...</div>';

    function renderResult(text) {
        btn.disabled = false;
        btn.innerHTML = btnOriginalText;
        var resultHTML = '';
        if(typeof marked !== 'undefined') {
            resultHTML = marked.parse(text);
        } else {
            resultHTML = '<pre style="white-space:pre-wrap; font-family:inherit;">' + escH(text) + '</pre>';
        }
        
        var actionsHTML = '<div style="margin-top:20px; padding-top:15px; border-top:1px solid #ccc; display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap;">';
        actionsHTML += '<button onclick="share_ai_content()" style="padding:8px 15px; font-size:14px; background-color:#2563eb; color:#ffffff; border:none; border-radius:5px; cursor:pointer;"><i class="fa fa-share-alt"></i> مشاركة</button>';
        actionsHTML += '<button onclick="download_ai_content()" style="padding:8px 15px; font-size:14px; background-color:#f3f4f6; color:#1f2937; border:1px solid #d1d5db; border-radius:5px; cursor:pointer;"><i class="fa fa-file-text"></i> حفظ النص</button>';
        
        if (isAdmin) {
            actionsHTML += '<button onclick="search_ai_content_on_google()" style="padding:8px 15px; font-size:14px; background-color:#4285F4; color:#ffffff; border:none; border-radius:5px; cursor:pointer;"><i class="fa fa-google"></i> البحث في جوجل</button>';
            actionsHTML += '<button onclick="jump_to_upload_resource()" style="padding:8px 15px; font-size:14px; background-color:#10B981; color:#ffffff; border:none; border-radius:5px; cursor:pointer;"><i class="fa fa-upload"></i> إضافة للمكتبة</button>';
        }
        
        actionsHTML += '</div>';
        resultBox.innerHTML = resultHTML + actionsHTML;
        window._lastAiResultText = text;
    }

    function renderError(errHtml) {
        btn.disabled = false;
        btn.innerHTML = btnOriginalText;
        resultBox.innerHTML = errHtml;
    }

    if (isGroq || isOpenRouter || isCerebras || isTogether) {
        var endpoint = '';
        var modelName = '';
        if (isCerebras) {
            endpoint = 'https://api.cerebras.ai/v1/chat/completions';
            modelName = 'llama-3.3-70b';
        } else if (isTogether) {
            endpoint = 'https://api.together.xyz/v1/chat/completions';
            modelName = 'meta-llama/Llama-3.3-70B-Instruct-Turbo';
        } else if (isGroq) {
            endpoint = 'https://api.groq.com/openai/v1/chat/completions';
            modelName = 'llama-3.3-70b-versatile';
        } else {
            endpoint = 'https://openrouter.ai/api/v1/chat/completions';
            modelName = 'meta-llama/llama-3.1-8b-instruct:free';
        }"""

if old_callgemini_code in content:
    content = content.replace(old_callgemini_code, new_callgemini_code)
    print("callGemini successfully updated!")
else:
    print("WARNING: old_callgemini_code not found!")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating app.js!")
