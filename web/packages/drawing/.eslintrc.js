module.exports = {
    'root': true,
    'extends': [
'airbnb',
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    'parser': "parser": "@typescript-eslint/parser",
    'parserOptions': {
        'sourceType': 'module',
        'allowImportExportEverywhere': true,
        'ecmaVersion': 2018,
        'ecmaFeatures': {
            'jsx': true,
            'experimentalObjectRestSpread': true
        }
    },
    'env': {
        'browser': true,
        'es6': true,
        'embertest': true,
        "commonjs": true,
        "node": true
    },
    'settings': {
        'import/resolver': {
            'webpack': 'webpack.config.js'
        }
    },
    'plugins': [
        'react',
        'jsdoc',
        "react",
        "@typescript-eslint"
    ],
    'globals': {
        'domain': true,
        'test': true,
        'expect': true,
        'document': true,
        'window': true,
 "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    'rules': {
        // 句尾分号可以省略
        'semi': 'off',
        // 代码中console/debugger处理
        'no-console': 'off',
        // 代码使用4个空格的缩进风格
        'indent': ['error', 4],
        // 关闭命名function表达式规则
        'func-names': 'off',
        // 可以行尾空白
        'no-trailing-spaces': 'off',
        // 关闭拖尾逗号
        'comma-dangle': 'off',
        // 关闭换行符转换
        'linebreak-style': 'off',
        // 禁止使用指定语法
        'no-restricted-syntax': ['error', 'WithStatement'],
        // 关闭语句块之前的空格保持一致
        'space-before-blocks': 'off',
        // 可以使用++/--
        'no-plusplus': 'off',
        // 禁止未使用过的变量包括全局变量和函数中的最后一个参数必须使用
        'no-unused-vars': [
            'error', {
                'vars': 'all',
                'args': 'after-used'
            }
        ],
        // 使用单引号
        'quotes': [
            'error', 'single'
        ],
        // 强制最大可嵌深度为3
        'max-depth': [
            'error', 3
        ],
        // 强制函数块中的语句最大50行
        'max-statements': [
            'error', 50
        ],
        // 强制行的最大长度150,注释200
        'max-len': [
            'error', {
                'code': 150,
                'comments': 200
            }
        ],

        // NodeJs rules， 9.0之后全部使用import
        // 关闭require()强制在模块顶部调用
        'global-require': 'off',
        
        // ES6 rules
        // 箭头函数的箭头前后都要有空格
        'arrow-spacing': 'error',
        // 接收const被修改的通知
        'no-const-assign': 'error',
        // 要求使用let或const而不是var
        'no-var': 'error',
        // 如果一个变量不会被重新赋值，则使用const声明
        'prefer-const': 'error',
        // 链接地址中不可以使用 javascript:;
        'no-script-url': 'off',
        'jsx-a11y/anchor-is-valid': [ 'error', {
            'components': [ 'Link' ],
            'specialLink': [ 'to' ]
        }],
        
        // React 参考eslint-config-airbnb下的rules/react.js
        // jsx代码使用4个空格的缩进风格
        'react/jsx-indent': ['error', 4],
        // jsx属性使用4个空格的缩进风格
        'react/jsx-indent-props': ['error', 4],
        // 使用了jsx语法的js代码文件其扩展名可以使用js或js
        'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],
        // 数组索引可以用作key
        'react/no-array-index-key': 'off',
        // 关闭点击元素上强制增加onKey**事件
        'click-events-have-key-events': 'off',
        // 关闭引用依赖检查
        'import/no-extraneous-dependencies': 'off',
        // 扩展名处理
        'import/extensions': ['error', {
            'js': 'never',
            'jsx': 'never'
        }]
    }
}
