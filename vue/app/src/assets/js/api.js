import axios from 'axios'
import QS from 'qs'
import router from '@/router'

axios.defaults.timeout = 10000
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true //表示跨域请求时是否需要使用凭证


axios.interceptors.request.use(config => {
	// console.log(config)
	if (localStorage.getItem('LoginFlag')) {
		config.headers['x-auth-token'] = localStorage.getItem('LoginFlag');
	}
	return config
}, error => {
	// console.log(error)
	return Promise.reject(error)
})
axios.interceptors.response.use(response => {
	// console.log(response)
	return response
}, error => {
	// console.log(error.response)
	if (error.response) {
		switch (error.response.status) {
			case 401:
				router.replace({
					path: `/login`
				})
		}
	}
	return Promise.resolve(error.response)
})


export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(response => {
			resolve(response.data)
		}, err => {
			reject(err)
		}).catch((error) => {
			reject(error)
		})
	})
}

export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params)).then(response => {
			resolve(response.data)
		}, err => {
			reject(err)
		}).catch((error) => {
			reject(error)
		})
	})
}

export default {
	/* ==================== 所有接口信息 ==================== */
	/* 首页接口 */
	Indexrecommend(params) {
		return post('/market/overview', params)
	}
}
