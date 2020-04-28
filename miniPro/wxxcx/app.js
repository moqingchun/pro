App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    const token = wx.getStorageSync('token');
    // console.log(token)
    if(token && token.length!==0){
      //验证token是否过期
      this.checkToken(token)
    }else{
      this.login()
    }
    
  },
  checkToken(token){
    wx.request({
      url: '',
      method: 'post',
      header: {
        token
      },
      success(res) {
        if (res) {//没过期
          wx.setStorageSync('token', token)
        } else {//过期
          this.login()
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  login(){
    wx.login({
      success(res) {
        const code = res.code;
        wx.request({
          url: '',
          method: 'post',
          data: {
            code
          },
          success(res) {
            const token = res.token;
            wx.setStorageSync('token', token)
          },
          fail(err) {
            console.log(err)
          }
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    // console.log(options)
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  }
})