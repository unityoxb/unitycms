const axios = require('axios').default;

axios.defaults.baseURL = 'http://127.0.0.1:7000';

const instance = axios.create({
    timeout: 1000,
});

const storage = window.localStorage;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在headers中添加本地存储的令牌
    config.headers['Authorization'] = 'Bearer ' + storage.getItem('scifanchain_access_token')

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 调用refresh刷新令牌
    const newToken = getNewToken();
    if (newToken){
        storage.removeItem('scifanchain_access_token');
        storage.scifanchain_access_token = newToken
    }
    
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 获取refresh_token
function getNewToken() {
    const refresh_token = axios({
        url: '/authors/refresh/',
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + storage.getItem('scifanchain_refresh_token')
        },
    }).then(response => {
        console.log(response.data)
        return response.data.access_token
    }).catch(function (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // 如果refresh_token过期，跳转到登录页面
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
            // 而在node.js中是 http.ClientRequest 的实例
            console.log(error.request);
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
        }
        console.log(error.config);
        return null
    })
}

export default instance

