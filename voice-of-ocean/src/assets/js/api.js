import axios from 'axios'
import QS from 'qs'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest' //ajax请求
axios.defaults.withCredentials = true; //cookie
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : 'handle.cn'



axios.interceptors.request.use(config => {
    let LoginFlag = localStorage.getItem('LoginFlag')
    if (LoginFlag) {
        config.headers['x-auth-token'] = LoginFlag;
    }
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            paramsSerializer: params => {
                return QS.stringify(params, {
                    indices: false
                });
            }
        }).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const post = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params, {
            indices: false
        })).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const postSpecial = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}


export default {
    Indexrecommend(params) {
        return post('/market/overview', params)
    }
}
