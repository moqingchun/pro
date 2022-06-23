import {
    request
} from '../../http/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        codeTxt: '获取验证码',
        codeDis: false,
        phone: '',
        code: '',
        islocked: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    login() {
        if (this.data.islocked) {
            return
        }
        if (!/^[1][0-9]{10}$/.test(this.data.phone)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'error'
            })
            return
        }
        if (!this.data.code) {
            wx.showToast({
                title: '请填写验证码！',
                icon: 'error'
            })
            return
        }
        this.setData({
            islocked: true
        })
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=login&phone=${this.data.phone}&securityCode=${this.data.code}&wechat_id=${wx.getStorageSync('openId')}`
        }).then(res => {
            this.setData({
                islocked: false
            })
            if (res.statusCode == 200) {
                if (res.data.success == 1) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                    return
                }
                wx.setStorageSync('userinfo', res.data)
                wx.switchTab({
                    url: '/pages/index/index',
                })
            }
        })
    },
    // 验证码
    getCode() {
        if (!/^[1][0-9]{10}$/.test(this.data.phone)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'error'
            })
            return
        }
        let num = 60,
            timer = null;
        timer = setInterval(() => {
            if (num > 0) {
                this.setData({
                    codeTxt: `重新获取(${num--}s)`,
                    codeDis: true
                })
            } else {
                clearInterval(timer);
                this.setData({
                    codeTxt: '获取验证码',
                    codeDis: false
                })
            }
        }, 1000)
        request({
            url: `/LHWechat.LHWechatCommonAction.do?CMD=sendSMS&phone=${this.data.phone}`
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.success == 1) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                    return
                }
                wx.showToast({
                    title: '验证码已发送'
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
        wx.hideHomeButton()
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
    onShareAppMessage: function () {

    }
})