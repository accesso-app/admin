/* eslint-disable import/no-extraneous-dependencies */
const { override, fixBabelImports, addBabelPlugin } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addBabelPlugin(['effector/babel-plugin']),
);
