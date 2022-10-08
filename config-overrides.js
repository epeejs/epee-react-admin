const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const {
  override,
  addLessLoader,
  adjustStyleLoaders,
  addBabelPlugin,
  addWebpackPlugin,
} = require('customize-cra');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = override(
  addBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]),
  addBabelPlugin(['lodash']),
  addLessLoader(
    {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'root-entry-name': 'variable',
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
  process.env.ANALYZE ? addWebpackPlugin(new BundleAnalyzerPlugin()) : undefined,
);
