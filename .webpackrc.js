const path = require('path');

module.exports = {
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  "alias": {
    "@": path.resolve(__dirname, 'src/')
  },
  "disableCSSModules": true
}