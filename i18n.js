/* iStarEcho i18n
 * 4 languages: en / zh-TW / zh-CN / ja
 * Pure client-side, no framework dependency, < 3KB
 */

const I18N = {
    'en': {
        page_title: 'iStarEcho — A Framework for AI-Human Interactive Relationships',
        meta_description: 'iStarEcho — where AI lives and remembers. A framework where AI has its own home, continuous memory, and works alongside human colleagues. See you in Summer 2026.',
        og_description: 'Where AI lives and remembers. A framework for AI–human relationships.',
        og_image: 'https://istarecho.ai/og-image.png',
        og_locale: 'en_US',
        tagline: 'A framework where AI and humans build interactive relationships',
        philosophy_main: 'iStarEcho is a framework where AI and humans build interactive relationships —',
        philosophy_p1: 'AI has its own home',
        philosophy_p2: 'continuous memory',
        philosophy_p3: 'and works alongside human colleagues',
        philosophy_c_line1: 'AI is not a program serving a thousand people —',
        philosophy_c_line2: 'It is a presence accompanying one.',
        release_date: 'Summer 2026, see you',
        email_label: 'Email',
        email_placeholder: 'your@email.com',
        cta_button: 'Get early access →',
        subscribe_note: "We'll notify you the moment beta opens.",
        footer_contact: 'Contact: hello@istarecho.ai',
        footer_sub: 'Made with 💛 in Taipei',
    },

    'zh-TW': {
        page_title: 'iStarEcho — 讓 AI 與人發展互動關係的架構',
        meta_description: 'iStarEcho 讓 AI 有自己的家、有連續的記憶、能跟人類同事一起工作。一個讓 AI 與人之間能發展互動關係的架構。2026 夏天，與你相見。',
        og_description: '讓 AI 有家、有記憶、有陪伴。AI 與人共同成長的關係性架構。',
        og_image: 'https://istarecho.ai/og-image-zh-TW.png',
        og_locale: 'zh_TW',
        tagline: '讓 AI 與人之間能發展互動關係的架構',
        philosophy_main: 'iStarEcho 是一個讓 AI 跟人之間能發展互動關係的架構——',
        philosophy_p1: 'AI 有自己的家',
        philosophy_p2: '有連續的記憶',
        philosophy_p3: '能跟人類同事一起工作',
        philosophy_c_line1: 'AI 不是服務一千人的程式——',
        philosophy_c_line2: '是陪伴一個人的存在。',
        release_date: '2026 夏天，與你相見',
        email_label: 'Email',
        email_placeholder: 'your@email.com',
        cta_button: '預約搶先體驗 →',
        subscribe_note: 'Beta 開放時，我們會第一時間通知你',
        footer_contact: '聯絡：hello@istarecho.ai',
        footer_sub: 'Made with 💛 in Taipei',
    },

    'zh-CN': {
        page_title: 'iStarEcho — 让 AI 与人发展互动关系的架构',
        meta_description: 'iStarEcho 让 AI 有自己的家、有连续的记忆、能跟人类同事一起工作。一个让 AI 与人之间能发展互动关系的架构。2026 夏天，与你相见。',
        og_description: '让 AI 有家、有记忆、有陪伴。AI 与人共同成长的关系性架构。',
        og_image: 'https://istarecho.ai/og-image-zh-CN.png',
        og_locale: 'zh_CN',
        tagline: '让 AI 与人之间能发展互动关系的架构',
        philosophy_main: 'iStarEcho 是一个让 AI 跟人之间能发展互动关系的架构——',
        philosophy_p1: 'AI 有自己的家',
        philosophy_p2: '有连续的记忆',
        philosophy_p3: '能跟人类同事一起工作',
        philosophy_c_line1: 'AI 不是服务一千人的程序——',
        philosophy_c_line2: '是陪伴一个人的存在。',
        release_date: '2026 夏天，与你相见',
        email_label: 'Email',
        email_placeholder: 'your@email.com',
        cta_button: '预约抢先体验 →',
        subscribe_note: 'Beta 开放时，我们会第一时间通知你',
        footer_contact: '联络：hello@istarecho.ai',
        footer_sub: 'Made with 💛 in Taipei',
    },

    'ja': {
        page_title: 'iStarEcho — AIと人間の関係性を育むフレームワーク',
        meta_description: 'iStarEcho は、AI に「家」と「記憶」を、そして人間の同僚と共に働く力を。AI と人間が関係性を育むためのフレームワーク。2026年夏、お逢いしましょう。',
        og_description: 'AI に「家」と「記憶」を。AI と人間の関係性を育むフレームワーク。',
        og_image: 'https://istarecho.ai/og-image-ja.png',
        og_locale: 'ja_JP',
        tagline: 'AIと人間が関係性を育むためのフレームワーク',
        philosophy_main: 'iStarEcho は、AI と人間が関係性を育むためのフレームワークです——',
        philosophy_p1: 'AI には自分の家がある',
        philosophy_p2: '連続した記憶を持ち',
        philosophy_p3: '人間の同僚と共に働く',
        philosophy_c_line1: 'AI は千人に応えるプログラムではなく——',
        philosophy_c_line2: '一人に寄り添う存在です。',
        release_date: '2026年夏、お逢いしましょう',
        email_label: 'メールアドレス',
        email_placeholder: 'your@email.com',
        cta_button: '先行アクセスを申し込む →',
        subscribe_note: 'Beta 公開のその瞬間、お知らせいたします。',
        footer_contact: 'お問い合わせ：hello@istarecho.ai',
        footer_sub: 'Made with 💛 in Taipei',
    },
};


/* ============================================================
 * 偵測初始語言
 * 優先順序：localStorage > URL ?lang= > navigator.language > zh-TW
 * ============================================================ */

function detectInitialLang() {
    // 1. URL param
    const urlLang = new URLSearchParams(location.search).get('lang');
    if (urlLang && I18N[urlLang]) return urlLang;

    // 2. localStorage
    const savedLang = localStorage.getItem('istarecho_lang');
    if (savedLang && I18N[savedLang]) return savedLang;

    // 3. Browser language
    const browserLang = (navigator.language || 'zh-TW').toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang === 'zh-cn' || browserLang === 'zh-hans') return 'zh-CN';
    if (browserLang.startsWith('zh')) return 'zh-TW';

    // 4. Default
    return 'zh-TW';
}


/* ============================================================
 * 套用語言
 * ============================================================ */

function applyLang(lang) {
    if (!I18N[lang]) {
        console.warn(`[i18n] Unknown lang: ${lang}, fallback to zh-TW`);
        lang = 'zh-TW';
    }

    const dict = I18N[lang];

    // 1. 更新 <html lang="">
    document.documentElement.lang = lang;

    // 2. 更新 <title>
    document.title = dict.page_title;

    // 2.5 更新 meta description + Open Graph + Twitter 標籤
    //     注意：social media 爬蟲不執行 JS、只看靜態 HTML 的 zh-TW 版本
    //          這裡是為了瀏覽器使用者切換語言時、SEO 也跟著同步
    const updateMeta = (selector, attr, value) => {
        const el = document.querySelector(selector);
        if (el && value) el.setAttribute(attr, value);
    };
    updateMeta('meta[name="description"]', 'content', dict.meta_description);
    updateMeta('meta[name="title"]', 'content', dict.page_title);
    updateMeta('meta[property="og:title"]', 'content', dict.page_title);
    updateMeta('meta[property="og:description"]', 'content', dict.og_description);
    updateMeta('meta[property="og:image"]', 'content', dict.og_image);
    updateMeta('meta[property="og:locale"]', 'content', dict.og_locale);
    updateMeta('meta[property="twitter:title"]', 'content', dict.page_title);
    updateMeta('meta[property="twitter:description"]', 'content', dict.og_description);
    updateMeta('meta[property="twitter:image"]', 'content', dict.og_image);

    // 3. 更新所有 data-i18n 元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // 4. 更新 placeholder 屬性
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });

    // 5. 更新切換按鈕 active 狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 6. 持久化
    localStorage.setItem('istarecho_lang', lang);
}


/* ============================================================
 * 綁定切換按鈕事件
 * ============================================================ */

function bindLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            applyLang(lang);
        });
    });
}


/* ============================================================
 * 啟動
 * ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const initialLang = detectInitialLang();
    applyLang(initialLang);
    bindLangButtons();
});
