module.exports = {
    extends: 'standard-with-typescript',
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/promise-function-async': 0,

        '@typescript-eslint/indent': [1, 4, { SwitchCase: 0 }],
        indent: [1, 4],
        'comma-dangle': [1, 'always-multiline'],
    },
}
