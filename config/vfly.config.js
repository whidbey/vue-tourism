module.exports = {
    // debug host
    host: 'local.m-tourism',

    // debug port
    port: '8080',

    // CDN domain, or just leave it blank
    static: {
        start: '/', // here use relative path
        dev: '/', // here use CDN domain
        prod: '/' // here use CDN domain
    },

    // globals
    globals: {
        // 配置全局变量，这里配置了 static_api 和 api 两个全局变量
        // config `mock.js` for CROS solution
        static_api: {
            start: '', // local api base entry
            test: '',
            pre: '', // online api base entry
            release: ''
        },
        api: {
            start: 'http://localhost:3000',
            dev: '//api-oil.jd.com',
            prod: '//api-oil.jd.com'
        }
    },

    // third patry libs to bundle
    vendor: ['vue', 'vue-router', 'axios'],

    // dir alias, could use globally, despite of CWD
    alias: {
        scss: 'scss',
        wepiao: 'components',
        utils: 'utils',
        assets: 'assets',
        app: 'app'
    },

    // source map options
    devtool: {
        dev: true,
        prod: false
    },

    // switch for CSS Modules
    css_modules: false,

    // switch for eslint
    eslint: true,

    // template settings
    template: {
        title: '', // inner template document title
        keywords: '', // inner template meta keywords
        description: '', // inner template meta description
        viewport: '', // inner template meta viewport
        favicon: '', // website favicon path
        path: 'template.html' // custom template path, omit it if your desire to use inner template
    },

    // custom default page dir
    pages: 'pages',

    // custom default component dir
    components: 'components',

    // custom default scss dir
    scss: 'scss',

    // switch template ES mode, ['es5' or 'es6']
    esmode: 'es6',

    // switch for transfering assets dir to dist when build
    transfer_assets: false,

    // limit image size for use base64, (smaller use base64, larger use url)
    base64_image_limit: 10000 // 10k
}
