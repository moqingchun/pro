import axios from 'axios'
import QS from 'qs'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest' //ajax请求
axios.defaults.withCredentials = true; //cookie
axios.defaults.baseURL = '/api';//如果多个域名，不建议这么用



axios.interceptors.request.use(config => {
    let token = localStorage.getItem('TOKEN')
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    // console.log(response)
    return response
}, error => {
    console.log(error)
    return Promise.resolve(error.response)
})

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            paramsSerializer: params => { //针对参数有数组的情况
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
export const deleteR = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params,
            paramsSerializer: params => { //针对参数有数组的情况
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

export const put = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(url, QS.stringify(params, {
            indices: false
        })).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}
export const putSpecial = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'put',
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
export const exportExc = (url, params = {}, names) => {
	// axios({//post
	//         url,
	//         data: QS.stringify(data, {
	//             indices: false
	//         }),
	//         method: 'post',
	//         responseType: 'blob',
	//     })
    axios.get(url, {
        params: params,
        paramsSerializer: params => { //针对参数有数组的情况
            return QS.stringify(params, {
                indices: false
            });
        },
        responseType: 'blob'
    }).then(res => {
        let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
        });
        //兼容IE10
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, names);
        } else {
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            link.download = names; //下载的文件名
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }).catch((error) => {
        console.error(error)
    })
}

export default {
    getEntpList() {
        return get('/enterprise/entList')
    },
    getRoleList(v) {
        return get(`/role/roleList/${v}`)
    }
}