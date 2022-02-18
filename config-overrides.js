const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { override, addLessLoader, adjustStyleLoaders, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]),
  addLessLoader(
    {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#286bff',
        },
      },
    },
    {
      getLocalIdent: getCSSModuleLocalIdent,
    },
  ),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
);
