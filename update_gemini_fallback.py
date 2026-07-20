import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_helper = """function callGemini(apiKey, prompt, btn, resultBox, btnOriginalText) {
    btn.disabled = true;
    btn.innerHTML = '⏳ جاري المعالجة...';
    resultBox.style.display = 'block';
    resultBox.innerHTML = '<div style="text-align:center; color:var(--tx2);">جاري البحث عن أحدث نموذج ذكاء اصطناعي متاح (تجاوز 2026)...</div>';

    fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey)
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if(data.error) throw new Error(data.error.message);
        var models = data.models || [];
        var validModels = [];
        for(var i=0; i<models.length; i++) {
            var m = models[i];
            if(m.supportedGenerationMethods && m.supportedGenerationMethods.indexOf('generateContent') !== -1 && m.name.indexOf('gemini') !== -1) {
                validModels.push(m.name);
            }
        }
        
        if (validModels.length === 0) throw new Error("لم يتم العثور على أي نموذج Gemini صالح في حسابك.");

        validModels.sort(function(a, b) {
            var matchA = a.match(/gemini-(\\d+\\.\\d+)/);
            var matchB = b.match(/gemini-(\\d+\\.\\d+)/);
            var vA = matchA ? parseFloat(matchA[1]) : 0;
            var vB = matchB ? parseFloat(matchB[1]) : 0;
            return vB - vA; // Highest version first
        });

        function tryModel(index) {
            if(index >= validModels.length) {
                resultBox.innerHTML = '<div style="color:red;">❌ عذراً، جميع النماذج المتاحة بحسابك مرفوضة أو قديمة. المرجو ترقية مفتاح API الخاص بك.</div>';
                btn.disabled = false;
                btn.innerHTML = btnOriginalText;
                return;
            }
            var targetModel = validModels[index];
            resultBox.innerHTML = '<div style="text-align:center; color:var(--tx2);">جاري تجربة النموذج: ' + targetModel.replace('models/','') + '...</div>';
            
            fetch('https://generativelanguage.googleapis.com/v1beta/' + targetModel + ':generateContent?key=' + apiKey, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if(data.error) {
                    console.log("Model " + targetModel + " failed:", data.error.message);
                    tryModel(index + 1);
                    return;
                }
                btn.disabled = false;
                btn.innerHTML = btnOriginalText;
                var text = data.candidates[0].content.parts[0].text;
                if(typeof marked !== 'undefined') {
                    resultBox.innerHTML = marked.parse(text);
                } else {
                    resultBox.innerHTML = '<pre style="white-space:pre-wrap; font-family:inherit;">' + escH(text) + '</pre>';
                }
            })
            .catch(function(err) {
                console.error("Network error on " + targetModel, err);
                tryModel(index + 1);
            });
        }
        
        tryModel(0);
    })
    .catch(function(err) {
        btn.disabled = false;
        btn.innerHTML = btnOriginalText;
        resultBox.innerHTML = '<div style="color:red;">❌ حدث خطأ: ' + err.message + '</div>';
    });
}"""

# regex to replace the entire callGemini function
content = re.sub(r'function callGemini[\s\S]*?\}\n\}', new_helper.replace('\\', '\\\\'), content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("done")
