// pages/index/index.js
import {
    request
} from '../../http/index';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        haveInfo: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: app.globalData.title
        })
    },
    checkoutFn() {
        if (!wx.getStorageSync('userinfo').phone) {
            wx.redirectTo({
                url: `/pages/ehztclogin/index`,
            })
            return
        }
        wx.getSetting({
            success: res => {
                console.log(res)
                if (!res.authSetting['scope.userLocationBackground']) {
                    wx.authorize({
                        scope: "scope.userLocationBackground",
                        success: () => {
                            this.getInfo()
                        },
                        fail: (err) => {
                            console.log("拒绝授权", err);
                            this.getInfo()
                        },
                    });
                } else {
                    this.getInfo()
                }
            }
        })
    },
    getInfo() {
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=queryBindLog&applier=${wx.getStorageSync('userinfo').phone}`
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.success != 1) {
                    this.setData({
                        haveInfo: 1
                    })
                    wx.setStorageSync('haveInfo', 1)
                    return
                    const pages = getCurrentPages();
                    const prevPage = pages[pages.length - 2];
                    if (prevPage && prevPage.route == 'pages/ehztclogin/index') {
                        wx.stopLocationUpdate({
                            success: (re) => {
                                console.log(re)
                                wx.startLocationUpdateBackground({
                                    success: () => {
                                        wx.onLocationChange(wx._locationChangeFn);
                                    },
                                    fail: (err) => {
                                        console.log("获取位置失败", err);
                                    },
                                });
                            },
                            fail: (err) => {
                                console.log(err)
                            }
                        })
                        wx.offLocationChange(wx._locationChangeFn)
                        wx.removeStorageSync('oldLocation')
                        wx.removeStorageSync('oldTime')
                        wx.removeStorageSync('flag')
                    }
                } else {
                    this.setData({
                        haveInfo: 0
                    })
                    wx.setStorageSync('haveInfo', 0)
                    return
                    wx.stopLocationUpdate({
                        success: (re) => {
                            console.log(re)
                        },
                        fail: (err) => {
                            console.log(err)
                        }
                    })
                    wx.offLocationChange(wx._locationChangeFn)
                    wx.removeStorageSync('oldLocation')
                    wx.removeStorageSync('oldTime')
                    wx.removeStorageSync('flag')
                }
            }
        })
    },
    linkEnterKun() {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.userLocationBackground']) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '此操作需要获取您的实时位置信息，是否开启授权允许“在使用小程序期间和离开小程序后”获取位置信息？',
                        success: res => {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: (res) => {}
                                })
                            }
                        }
                    })
                    return
                }

                wx.navigateTo({
                    url: `/pages/enterKunApply/index`
                })
            }
        })
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
        this.setTitle()
        this.checkoutFn()
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
        this.setTitle()
        this.checkoutFn()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})