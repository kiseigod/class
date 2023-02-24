
import axios from 'axios'
import config from '../config'
 
// 将config和anios进行有机结合,对axios进行简单封装。
// 判断是不是生产环境，并拿到config中的dev环境，否则拿到config中的pro环境。
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// axios工具类,工具类拿到对应的url后，进行相应配置
class HttpRequest {
    constructor (baseUrl) {
        this.baseUrl = baseUrl
    } 
    // 用于定义anios的相关配置的方法
    getInsideConfig(){
        const config = {
            base:this.baseUrl,
            header:{}
        }
        return config
    }
    // 拦截器部分
    interceptors (instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function(config){
            // 在发送前做什么
            return config;
        },function (error){
            // 对请求错误做什么
            return Promise.reject(error);
        });
 
        // 添加响应拦截器
        instance.interceptors.response.use(function(response){
            // 对响应数据前做什么
            return response;
        },function(error){
            // 响应错误后做什么
            return Promise.reject(error);
        });
    }
    request(options){
        const instance = axios.create()
        // 解构,三点表示解构
        options = {...this.getInsideConfig(), ...options}
        // 调用拦截器
        this.interceptors(instance)
        return instance(options)
    }
}
 
export default new HttpRequest(baseUrl)