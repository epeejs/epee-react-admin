module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-return-await': 'error',
    'no-await-in-loop': 'error',
    'require-await': 'error',
    'generator-star-spacing': ['warn', 'after'],
    'yield-star-spacing': ['warn', 'after'],
    'spaced-comment': ['warn', 'always', { markers: ['/'] }],
    'consistent-return': 'off',
    'no-console': 0,
    'no-param-reassign': 0,
    'react/jsx-key': 2,
  },
};
