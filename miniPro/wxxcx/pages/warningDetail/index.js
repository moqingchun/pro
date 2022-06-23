// pages/warningDetail/index.js
import {
    request
} from '../../http/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let o = JSON.parse(options.item)
        this.setTitle(o.alarm_type)
        this.getInfo(o)
    },
    setTitle(type){
        wx.setNavigationBarTitle({
            title: type=='1'?'滞留超时报警':type=='2'?'异常停车报警':'人车分离报警'
        })
    },
    getInfo(o){
        request({
            url: `/LHWechat.LHWechatAlarmCenterAction.do?CMD=alarmDetail&id=${o.id}&alarmType=${o.alarm_type}`
        }).then(res => {
            if (res.statusCode == 200) {
                if(res.data.success==0){
                    this.setData({
                        info:res.data
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})