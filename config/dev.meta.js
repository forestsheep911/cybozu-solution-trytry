const pj = require('../package.json')
const { resolve } = require('path')
module.exports = {
  name: `${pj.name}`,
  namespace: `https://github.com/${pj.author}/monkey-${pj.name}`,
  match: [
    'https://*.cybozu.cn/k/*/show*',
    'https://*.cybozu.com/k/*/show*',
    'https://*.cybozu-dev.com/k/*/show*',
    'https://*.kintone.com/k/*/show*',
    'https://*.s.cybozu.cn/k/*/show*',
    'https://*.s.cybozu.com/k/*/show*',
    'https://*.s.kintone.com/k/*/show*',
  ],
  grant: ['GM_getValue', 'GM_setValue', 'GM_addValueChangeListener'],
  require: [`file://${resolve(__dirname, '../dist/dev').replaceAll('\\', '/')}/${pj.name}.script.js`],
}
