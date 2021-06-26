const {
    config
} = require('vuepress-theme-hope');

const sidebar = require('./sidebar');
const nav = require('./nav');

module.exports = config({
    title: "Coder",
    description: "操千曲而后晓声，观千剑而后识器",
    markdown: {
        extendMarkdown: md => {
            md.set({
                html: true
            })
            md.use(require('markdown-it-katex'))
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('core-js/library/fn', 'core-js/features')
    },
    themeConfig: {
        author: '熊滔',
        sidebar,
        nav,
        iconPrefix: "icon-",
        docsBranch: 'master',
        docsDir: 'docs',
        docsRepo: 'https://github.com/LastKnightCoder/vuepress-blog',
        editLinks: true,
        prevLinks: true,
        nextLinks: true,
        mdEnhance: {
            align: true,
            flowchart: true,
            tex: false,
            lineNumbers: false,
            demo: true,
            mermaid: true
        },
        feed: false,
        hostname: ''
    },
    plugins: [
        "@vuepress/nprogress",
        "vuepress-plugin-viewer",
        ['disqus', {
            shortname: 'lastknightcoder'
        }],
        // "code-switcher",
        "element-ui"
    ],
    base: '/vuepress-blog/',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
        }],
        ['link', {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
        }]
    ]
})