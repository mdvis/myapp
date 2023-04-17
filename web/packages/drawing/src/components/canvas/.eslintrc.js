module.exports = {
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    env: {
        browser: true,
        node: true,
    },
    globals: {
        $: true,
        DataSet: true,
        window: true,
        document: true,
        Image: true,
        Event: true,
        HTMLElement: true,
        ImageData: true,
        Clipboard: true,
        MouseEvent: true,
    },
    settings: {
        'import/resolver': ['node',
            {
                webpack: 'webpack.config.js',
            }],
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'no-console': 0,
        // 扩展名处理
        'import/extensions': ['error', 'always', {
            js: 'never',
            jsx: 'never',
        }],
    },
};
