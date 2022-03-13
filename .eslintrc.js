module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    "semi":0,
    "skipBlankLines": 'off',
    "ignoreComments": 'off',
    "arraysInObjects":'off',
    "objectsInObjects": 'off',
    "space-before-function-paren": ["error", "never"],
    "object-curly-spacing": ["error", "never"]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
