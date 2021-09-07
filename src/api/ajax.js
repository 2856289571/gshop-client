/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
    // 基础路径
    // 如果服务器配置了cors跨域，则可如下配置，直接向服务器发送请求（不常用，因为一般服务器不配置cors）
    // baseURL:'http://39.98.123.211/api',
    /* 
        否则需要向如下一样配置，来使用代理服务器（常用）
        在这里baseURL:'/api'相当于baseURL:'http://localhost:8081/api'
        但因为本地ip一般不会固定，所以只写baseURL:'/api'
     */
    baseURL:'/api',

    // 设置超时
    timeout:20000
})

// 请求拦截器
service.interceptors.request.use((config) => {
    // 进度条开始
    NProgress.start()

    return config
})

service.interceptors.response.use(
    (response) => {
        // 进度条结束
        NProgress.done()

        return response.data
    },
    (error) => {
        // 进度条结束
        NProgress.done()

        /* 
            这里不能直接return error    否则将直接返回一个成功的promise
            若要返回失败的promise，有两种方法：1.抛出错误   2.返回失败或空的promise
        */
        // throw error
        alert(error.message || '未知的请求错误')
        return Promise.reject(error.message)
    }
)

// 暴露service
export default service