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
        hostname: 'https://lastknightcoder.github.io/vuepress-blog',
        iconPrefix: "icon-",
        docsBranch: 'master',
        docsDir: 'docs',
        docsRepo: 'https://github.com/LastKnightCoder/vuepress-blog',
        editLinks: true,
        prevLinks: true,
        nextLinks: true,
        feed: false,
        mdEnhance: {
            align: false,
            flowchart: false,
            tex: false,
            lineNumbers: false,
            mermaid: false,
            tasklist: true
        },
    },
    plugins: [
        "@vuepress/nprogress",
        "vuepress-plugin-viewer",
        ['disqus', {
            shortname: 'lastknightcoder'
        }],
        "element-ui",
        ['run', {
            jsLabs: ['https://unpkg.com/element-ui/lib/index.js'],
            cssLabs: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
        }]
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