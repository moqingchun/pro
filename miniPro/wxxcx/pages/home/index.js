
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    num:0
  },
  /**事件**/
  chooseImg(){
    wx.chooseImage({
      success: (res)=> {
        console.log(res)
        this.setData({
          img:res.tempFilePaths
        })
      },
    })
  },
  increatment(e){
    
    this.setData({
      num:this.data.num+1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.showToast({
    //   title: '啊啊啊',
    //   icon:'success',
    //   duration:3000,
    //   mask:true
    // })

    // wx.showModal({
    //   title: 'aaa',
    //   content: '哦豁',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // wx.showLoading({
    //   title: 'aaa',
    // })

    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options);
    return{
      title:'halo',
      path:'pages/about/index',
      imageUrl:'/assets/images/1.png'
    }
  }
})