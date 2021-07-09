module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': ['error', 4],
        '@typescript-eslint/indent': ['error'],
        'quotes': ['error', 'single'],
        '@typescript-eslint/quotes': ['error', 'single']
    }
};
