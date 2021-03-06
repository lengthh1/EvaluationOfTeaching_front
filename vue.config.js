const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('', resolve(''))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('network', resolve('./src/network'))
      .set('plugins', resolve('./src/plugins'))
    //注意 store 和 router 没必要配置

  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      'back/': {
        target: 'http://121.89.205.249:9090',
        // target: 'http://192.168.43.2:9090',
        // target: 'http://192.168.192.1:9090',
        // target: 'http://29175vv342.zicp.vip',
        changeOrigin: true,
        pathRewrite: {
          '^/back': ''
        }
      }
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
