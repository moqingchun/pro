const utils = require('../../utils/util.js')

const tp = ['Article', 'GanHuo', 'Girl']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: false,
    isFixed: false,
    banners: [],
    categorys: {
      Article: {
        page: 0,
        list: []
      },
      GanHuo: {
        page: 0,
        list: []
      },
      Girl: {
        page: 0,
        list: []
      }
    },
    curType: 'Article'
  },
  //tab点击
  selectedTab(op) {
    const i = op.detail.index;
    this.setData({
      curType: tp[i],
      categorys: {
        Article: {
          page: 0,
          list: []
        },
        GanHuo: {
          page: 0,
          list: []
        },
        Girl: {
          page: 0,
          list: []
        }
      },
    })
    this._getCategorys(tp[i])
  },
  //轮播图
  _getBanner() {
    utils.http({
        url: '/banners'
      })
      .then(res => {
        let banners = res.data.data;
        this.setData({
          banners
        })
      })
  },
  //列表展示
  _getCategorys(type) {
    const page = this.data.categorys[type].page + 1;
    utils.http({
        url: `/data/category/${type}/type/All/page/${page}/count/10`,
      })
      .then(res => {
        let list = res.data.data;
        let oldList = this.data.categorys[type].list;
        oldList.push(...list)

        const listKey = `categorys.${type}.list`;
        const pageKey = `categorys.${type}.page`;
        this.setData({
          [listKey]: oldList,
          [pageKey]: page
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getBanner()

    this._getCategorys(this.data.curType)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._getCategorys(this.data.curType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPageScroll(op){
    const scrollTop = op.scrollTop;
    const flag = scrollTop > 1000
    if(flag != this.data.showTop){
      this.setData({
        showTop: flag
      })
    }

    const flag1 = scrollTop > 165
    if (flag1 != this.data.isFixed){
      this.setData({
        isFixed: flag1
      })
    }
  }
})