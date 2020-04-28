//请求载体
const http = op => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://gank.io/api/v2' + op.url,
      method: op.method || 'get',
      data: op.data || {},
      success: resolve,
      fail: reject
    })
  })
}


//日期格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  formatTime,
  http
}
