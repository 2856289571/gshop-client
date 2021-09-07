module.exports = {
    // lintOnSave: false, // 关闭ESLint的规则检查
    lintOnSave: 'warning', // 输出提示错误, 但项目继续运行

    /* 
        配置了代理服务器，则前台项目会向本地服务器发送请求，
        如果请求中有/api，则将请求转发给目标url
        比如现在配置后，前台项目会直接向http://localhost:8081发送请求，
        然后http://localhost:8081将请求转发给http://39.98.123.211
    */
    devServer: {
        proxy: {
          '/api': { // 只对请求路由以/api开头的请求进行代理转发
            target: 'http://39.98.123.211', // 转发的目标url
            changeOrigin: true // 支持跨域
             // pathRewrite: {‘^/api’: ‘’}
          }
        }
    },
}