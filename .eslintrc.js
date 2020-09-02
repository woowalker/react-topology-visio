module.exports = {
  parser: "babel-eslint",
  extends: [
    "standard",
    "standard-react",
    "umi"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/prop-types': 'off',
    'dot-notation': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    /**
     * eslint-config-standard 13.0 版本开始默认增加这三个规则
     * 但这里应该是误报，所以将其关闭
     */
    'no-async-promise-executor' : 'off',
    'no-misleading-character-class' : 'off',
    'no-useless-catch' : 'off'
  }
}
