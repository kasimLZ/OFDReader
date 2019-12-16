module.exports = config => ({
    title: "OFD阅读器",
    base: "/",
    dest: "../docs",
    locales: {
        "/": { lang: "zh-CN" },
    },
    themeConfig: {
        search: false,
        sidebarDepth: 2,
        head: [
            ["link", { rel: "icon", href: "/favicon.ico" }],
        ],
        nav: [
            { text: "Github", link: "https://github.com/kasimLZ/GoFastDFS.Client", target: "_self" },
        ],
        locales: {
            "/": {
                label: "简体中文",
                selectText: "选择语言",
                ariaLabel: "选择语言",
                sidebar: GetSidebar("zh-cn"),
            }
        }
    }
});

const i18n_sidebar = {
    'GettingStarted': {
        'zh-cn': '快速上手',
    },
    'Config': {
        'zh-cn': '配置参数'
    },
    'ConfigFile': {
        'zh-cn': '配置文件'
    },
    'CORS': {
        'zh-cn': '跨域'
    },
};

const default_lang = 'zh-cn';

function GetSidebar(lang) {
    let sidebar = [];
    for (const name in i18n_sidebar) {
        const config = i18n_sidebar[name];
        const page = {
            title: config[lang] != null ? config[lang] : config[default_lang],
            collapsable: config.collapsable != null ? config.collapsable : false,
            path: (lang === default_lang) ? `${name}.html` : `/${lang}/${name}.html`
        }
        sidebar.push(page);
    }
    return sidebar;
};