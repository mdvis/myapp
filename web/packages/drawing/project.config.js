const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, './src/');

const publicPathMap = {
    test: 'http://test.static.lvyuetravel.com/integral-h5/zh/',
    devx: 'http://dev.static.lvyuetravel.com/integral-h5/zh/',
    production: 'https://static.lvyuetravel.com/integral-h5/zh/',
    development: '/',
};

const alias = {
    components: path.resolve(APP_PATH, './components/'),
    containers: path.resolve(APP_PATH, './containers/'),
    constants: path.resolve(APP_PATH, './constants/'),
    actions: path.resolve(APP_PATH, './actions/'),
    common: path.resolve(APP_PATH, './common/'),
    utils: path.resolve(APP_PATH, './utils/'),
    store: path.resolve(APP_PATH, './store'),
    base: path.resolve(APP_PATH, './base/'),
    api: path.resolve(APP_PATH, './api/'),
    lib: path.resolve(APP_PATH, './lib/'),
    'react-dom': '@hot-loader/react-dom',
};

const URLMap = {
    development: {
        prefix: '/pms/',
        basicUrl: 'http://dev.lvyuetravel.com:8080',
        openUrl: 'http://dev.admin-login.lvyuetravel.com',
        socketUrl: 'http://test.webpush.lvyuetravel.com',
        imagesUrl: 'http://lvyue-static-test.oss-cn-beijing.aliyuncs.com/pms/zh/static/images',
        busiSystem: 'pms-mng',
    },
    devx: {
        prefix: '',
        openUrl: 'http://dev.admin-login.lvyuetravel.com',
        musicUrl: 'http://dev.static.lvyuetravel.com/integral-h5/zh/static/music',
        socketUrl: 'http://dev.webpush.lvyuetravel.com',
        imagesUrl: 'http://dev.static.lvyuetravel.com/integral-h5/zh/static/images',
        busiSystem: 'pms-mng',
    },
    test: {
        prefix: '',
        openUrl: 'http://test.admin-login.lvyuetravel.com',
        musicUrl: 'http://test.static.lvyuetravel.com/integral-h5/zh/static/music',
        socketUrl: 'http://test.webpush.lvyuetravel.com',
        imagesUrl: 'http://test.static.lvyuetravel.com/integral-h5/zh/static/images',
        busiSystem: 'pms-mng',
    },
    production: {
        prefix: '',
        openUrl: 'https://admin-login.lvyuetravel.com',
        musicUrl: 'https://static.lvyuetravel.com/integral-h5/zh/static/music',
        socketUrl: 'https://webpush.lvyuetravel.com',
        imagesUrl: 'https://static.lvyuetravel.com/integral-h5/zh/static/images',
        busiSystem: 'pms-mng',
    },
};

const resources = [
    path.resolve(APP_PATH, './common/variables/index.scss'),
    path.resolve(APP_PATH, './common/variables/tools.scss'),
];

const proxy = [
    {
        context: ['/api/mall'],
        target: 'http://dev-integral.lvyuetravel.com',
        changeOrigin: true,
        host: 'lvyuetravel.com',
    },
    {
        context: ['/api/gateway', '/api/wallet'],
        target: 'http://dev.m.lvyuetravel.com',
        changeOrigin: true,
        host: 'lvyuetravel.com',
    },
];

module.exports = {
    publicPathMap,
    alias,
    URLMap,
    resources,
    proxy,
};
