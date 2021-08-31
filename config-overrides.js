const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { override, addLessLoader, addWebpackPlugin, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]),
  addLessLoader(
    {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          hack: 'true; @import "./src/config/theme.less";',
        },
      },
    },
    {
      getLocalIdent: getCSSModuleLocalIdent,
    },
  ),
);
