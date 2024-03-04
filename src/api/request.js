import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus' 
const NETWORK_ERROR = '网络请求异常，请稍后再试' 
// 创建一个axios实例
const service = axios.create({
    baseURL: config.baseApi
})

//在请求之前做一些事情
service.interceptors.request.use((req)=>{
    // 可以自定义header
    // jwt-token认证的时候
    return req
})

//
service.interceptors.response.use((res)=>{
    const {code,data,msg} =res.data
    if (code==200) {
        return data
    } else{
        //网络错误请求
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})



function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }

    //对mock的处理
    let isMock = config.mock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock
    }

    // 对线上环境处理
    if (config.env == 'prod'){
        // 不给使用mock的机会
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}

export default request