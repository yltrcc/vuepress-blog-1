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
        pwa: {
            manifest: {
                icons: [{
                    src: 'https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/blog.5p1v1tn3qog0.png',
                    sizes: '48×48',
                    type: 'image/png'
                }],
            }
        },
        mdEnhance: {
            align: false,
            flowchart: true,
            tex: false,
            lineNumbers: false,
            mermaid: true,
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
        }],
        [
            'vuepress-plugin-comment',
            {
              choosen: 'gitalk', 
              options: {
                clientID: '651c9d66077531d194cf',
                clientSecret: '705cbe0ab0e14a1e67935e7f839cbdda5fe0da48',
                repo: 'vuepress-blog',
                owner: 'LastKnightCoder',
                admin: ['LastKnightCoder'],
                // github issue 不能超过 50 个字符
                id: '<%- frontmatter.commentid %>',
                distractionFreeMode: true // 是否启动阴影遮罩
              }
            }
          ],
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
        }],
        ['link', {
            rel: "shortcut icon",
            href: "https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/blog.5p1v1tn3qog0.png"
        }]
    ]
})