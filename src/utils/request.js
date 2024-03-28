import axios from 'axios'
import { Message } from 'element-ui'

let baseURL = ""

if (process.env.NODE_ENV == "development") {
    baseURL = 'http://localhost:8081'
} else {
    baseURL = 'http://duoduozuikeail.top:3000'
    // baseURL = 'https://netease-cloud-music-api-lemon-chi.vercel.app'
}

const service = axios.create({
    baseURL,
    timeout: 5000
})

service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        error && Message({
            type: 'error',
            message: '网络连接出问题了~',
            showClose: true
        })
    }
)


service.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    token ? config.headers.token = token : null;

    return config
});
//token过期
service.interceptors.response.use(res => {
    if (res.data.res_code === 401) {
        router.replace('/login');
        localStorage.removeItem('token')
    }
    return res
})

//传送json格式的post请求
export const postRequest = (url, params) => {
    return service({
        method: 'post',
        url: `${baseURL}${url}`,
        data: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
//传送json格式的put请求
export const putRequest = (url, params) => {
    return service({
        method: 'put',
        url: `${baseURL}${url}`,
        data: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
}
//传送json格式的get请求
export const getRequest = (url, params) => {
    return service({
        method: 'get',
        url: `${baseURL}${url}`,
        // data: qs.stringify(params)
        // data: params

        params
    })
}
//传送json格式的delete请求
export const deleteRequest = (url, params) => {
    return service({
        method: 'delete',
        url: `${baseURL}${url}`,
        /*data: qs.stringify(params)*/
        data: params,
    })
}



export default service