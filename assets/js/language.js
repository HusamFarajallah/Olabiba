// Language Management System
class LanguageManager {
    constructor() {
        this.currentLanguage = 'ar';
        this.translations = {};
        this.init();
    }

    async init() {
        // Load all language files
        await this.loadLanguages();
        
        // Set up language selector
        this.setupLanguageSelector();
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
    }

    async loadLanguages() {
        const languages = ['ar', 'en', 'tr'];
        
        for (const lang of languages) {
            try {
                const response = await fetch(`locales/${lang}.json`);
                this.translations[lang] = await response.json();
            } catch (error) {
                console.warn(`Failed to load ${lang} translations:`, error);
                // Fallback translations
                this.translations[lang] = this.getFallbackTranslations(lang);
            }
        }
    }

    getFallbackTranslations(lang) {
        const fallbacks = {
            ar: {
                welcome: "مرحباً بك في ليبية، كيف يقدر يساعدك؟",
                description: "منصة تعليمية ذكية تساعدك على تعلم اللغات بطريقة تفاعلية وممتعة مع شخصيات كرتونية ودودة",
                cta_button: "ابدأ رحلتك الآن",
                smart_experience: "من وراء هذه التجربة الذكية؟",
                ai_description: "ليبية في مقدمتك الذكية متعددة اللغات",
                notification: "لذا ظهرت ليبية لمساعدتك .. قلب الأقوال قلب قلبات ليبية",
                select_model: "حدد النموذج",
                friendly: "ودود",
                tutor: "معلم",
                funny: "مضحك",
                flirty: "غزلي"
            },
            en: {
                welcome: "Welcome to Libya, how can it help you?",
                description: "An intelligent educational platform that helps you learn languages interactively and enjoyably with friendly cartoon characters",
                cta_button: "Start Your Journey Now",
                smart_experience: "Who's Behind This Smart Experience?",
                ai_description: "Libya is your multilingual smart assistant",
                notification: "So Libya appeared to help you .. heart of sayings, heart of Libyan flips",
                select_model: "Select Model",
                friendly: "Friendly",
                tutor: "Tutor",
                funny: "Funny",
                flirty: "Flirty"
            },
            tr: {
                welcome: "Libya'ya hoş geldiniz, size nasıl yardımcı olabilir?",
                description: "Dil öğrenmenize dostça çizgi karakterlerle etkileşimli ve eğlenceli bir şekilde yardımcı olan akıllı eğitim platformu",
                cta_button: "Yolculuğunuzu Şimdi Başlatın",
                smart_experience: "Bu Akıllı Deneyimin Arkasında Kim Var?",
                ai_description: "Libya çok dilli akıllı asistanınızdır",
                notification: "Libya size yardım etmek için ortaya çıktı .. sözlerin kalbi, Libya çevirmelerinin kalbi",
                select_model: "Model Seç",
                friendly: "Dostça",
                tutor: "Öğretmen",
                funny: "Komik",
                flirty: "Flörtöz"
            }
        };
        
        return fallbacks[lang] || fallbacks.ar;
    }

    setupLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }

    switchLanguage(langCode) {
        this.currentLanguage = langCode;
        this.applyLanguage(langCode);
        this.updateDirection(langCode);
        
        // Save preference
        localStorage.setItem('preferred_language', langCode);
    }

    applyLanguage(langCode) {
        const elements = document.querySelectorAll('[data-translate]');
        const translations = this.translations[langCode];
        
        if (!translations) return;

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    updateDirection(langCode) {
        const html = document.documentElement;
        const main = document.querySelector('main');
        const isRTL = langCode === 'ar';
        
        html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        html.setAttribute('lang', langCode);
        
        // Update main element direction
        if (main) {
            main.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        }
        
        // Update body classes for RTL/LTR specific styling
        document.body.classList.toggle('rtl', isRTL);
        document.body.classList.toggle('ltr', !isRTL);
        
        // Update sidebar order for RTL
        const sidebar = document.querySelector('.sidebar-rtl');
        if (sidebar) {
            if (isRTL) {
                sidebar.classList.add('order-first');
            } else {
                sidebar.classList.remove('order-first');
                sidebar.classList.add('order-last');
            }
        }
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Get translation for a specific key
    translate(key, langCode = this.currentLanguage) {
        const translations = this.translations[langCode];
        return translations ? translations[key] : key;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});
