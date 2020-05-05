const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addBabelPlugin(['effector/babel-plugin']),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#ff4533',
      '@layout-header-background': '#3f4245',
      '@menu-dark-item-active-bg': '#3f4245',
    },
  }),
);
