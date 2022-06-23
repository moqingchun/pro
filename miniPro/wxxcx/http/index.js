// const baseUrl = 'https://wxbanchetest.china317.com/oldlkyw'; //测试
const baseUrl = 'https://kybc.china317.com/oldlkyw';
const request = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            header: {
                type: 0,
                wechatId:wx.getStorageSync('openId')
            },
            method: params.method ? params.method : 'GET',
            success: res => {
                // console.log(res)
                resolve(res)
            },
            fail: err => {
                console.log(err)
                reject(err)
            }
        })
    })
};
const uploadFile = (params) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            ...params,
            url: baseUrl + params.url,
            header: {
                Authorization: wx.getStorageSync('openId')
            },
            success(res) {
                if (res.statusCode == 400 || res.statusCode == 500) {
                    wx.showToast({
                        title: JSON.parse(res.data).errmsg,
                        icon: 'none'
                    })
                }
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

module.exports = {
    request,
    uploadFile
}