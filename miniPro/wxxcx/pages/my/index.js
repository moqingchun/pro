// pages/my/index.js
import {
    request
} from '../../http/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        head_image: '/assets/images/all/my_touxiang.png',
        nick_name: '获取头像昵称',
        showUser: false,
        phone: '',
        license: '',
        showLicenseComponent: false,
        licenseColorArray: ['蓝', '黄', '黑', '白', '黄绿双拼', '绿', '其它'],
        licenseColorIndex: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // request({
        //     url:`/LHWechat.LHWechatDriverAction.do?CMD=myDetail&phone=15821469920`
        // }).then(res=>{

        // })
    },
    getUserInfos() {
        wx.getUserProfile({
            desc: '个人中心展示用户头像与微信名',
            success: (res) => {
                this.setData({
                    head_image: res.userInfo.avatarUrl,
                    nick_name: res.userInfo.nickName,
                    showUser: true
                })
            }
        })
    },
    init() {
        let u = wx.getStorageSync('userinfo');
        let licenseColorIndex = this.data.licenseColorArray.findIndex((v => {
            return v == u.licenseColor
        }))
        this.setData({
            phone: u.phone,
            license: u.license?u.license.replace(/-/g,''):'',
            licenseColorIndex: licenseColorIndex == -1 ? 1 : licenseColorIndex
        })
    },
    bindCpysPickerChange(e) {
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=updateLicenseColor&id=${wx.getStorageSync('userinfo').id}&licenseColor=${this.data.licenseColorArray[e.detail.value]}`
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
                    title: '修改成功',
                    icon: 'none'
                })
                this.setData({
                    licenseColorIndex: e.detail.value
                })
                let o = wx.getStorageSync('userinfo');
                o.licenseColor = this.data.licenseColorArray[this.data.licenseColorIndex];
                wx.setStorageSync('userinfo', o)
            }
        })
    },
    getLicense(){
        this.setData({
            showLicenseComponent:true
        })
    },
    showLicense(e){
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=updateLicense&id=${wx.getStorageSync('userinfo').id}&license=${e.detail}`
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
                    title: '修改成功',
                    icon: 'none'
                })
                this.setData({
                    license:e.detail
                })
                let o = wx.getStorageSync('userinfo');
                o.license = e.detail;
                wx.setStorageSync('userinfo', o)
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
        this.init()
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