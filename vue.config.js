const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
 // 基本路徑
 publicPath: process.env.NODE_ENV === 'production' ? '' : './',
 // 輸出檔案目錄
 outputDir: 'dist',
 assetsDir: 'assets', // 靜態資源目錄 (js, css, img, fonts)
 // eslint-loader 是否在儲存的時候檢查
 lintOnSave: true,
 // use the full build with in-browser compiler?
 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
 // compiler: false,

 // webpack配置
 // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md   webpack連結API，用於生成和修改webapck配置
 chainWebpack: () => {
 	if (debug) {
      // 本地開發配置
    } else {
      // 生產開發配置
    }
 },
 configureWebpack: (config) => {// webpack配置，值位物件時會合並配置，為方法時會改寫配置
 	if (debug) { // 開發環境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else { // 生產環境配置
    
    }
    Object.assign(config, { // 開發生產共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')//設定路徑別名
          //...
        }
      }
    })
 },
 // vue-loader 配置項
 // https://vue-loader.vuejs.org/en/options.html
 // vueLoader: {},
 
 // 生產環境是否生成 sourceMap 檔案
 productionSourceMap: true,
 // css相關配置 配置高於chainWebpack中關於css loader的配置
 css: {
  // 是否使用css分離外掛 ExtractTextPlugin
  extract: true,
  // 開啟 CSS source maps?是否在構建樣式地圖，false將提高構建速度
  sourceMap: false,
  // css預設器配置項
  loaderOptions: {},
  // 啟用 CSS modules for all css / pre-processor files.
  modules: false
 },
 // use thread-loader for babel & TS in production build
 // enabled by default if the machine has more than 1 cores 構建時開啟多程序處理babel編譯
 parallel: require('os').cpus().length > 1,
 // 是否啟用dll
 // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
 // dll: false,

 // PWA 外掛相關配置
 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 pwa: {},
 // webpack-dev-server 相關配置
 devServer: {
  open: process.platform === 'darwin',
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  proxy: null, // 設定代理
  before: app => {}
 },
 // 第三方外掛配置
 pluginOptions: {
  // ...
 }
}