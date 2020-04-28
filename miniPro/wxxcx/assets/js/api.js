const baseUrl = 'http://123.207.32.32:8000'
export default function http(op) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + op.url,
      method: op.method || 'get',
      data: op.data || {},
      success: resolve,
      fail: reject
    })
  })
}