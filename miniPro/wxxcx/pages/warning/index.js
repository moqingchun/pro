// pages/warning/index.js
import {
    request
} from '../../http/index.js'
import {
    DateFormat
} from '../../utils/util.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        rows: 10,
        lists: [],
        total: 0,
        loading: false,
        flag: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
    getList() {
        this.setData({
            loading: true
        })
        request({
            url: `/LHWechat.LHWechatAlarmCenterAction.do?CMD=alarmList&date=&page=${this.data.page}&rows=${this.data.rows}`
        }).then(res => {
            this.setData({
                loading: false
            })
            if (res.statusCode == 200) {
                this.setData({
                    lists: [...this.data.lists, ...res.data.rows],
                    page: this.data.page + 1,
                    total: res.data.records
                })
                if (this.data.page > Math.ceil(this.data.total / this.data.rows)) {
                    this.setData({
                        flag: false
                    })
                }
            }
        })
    },
    gotoDetail(e) {
        wx.navigateTo({
            url: `/pages/warningDetail/index?item=${JSON.stringify(e.currentTarget.dataset.item)}`,
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
        this.setData({
            page: 1,
            lists: [],
            loading: false,
            flag: true,
            total: 0
        })
        this.getList()
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
        this.setData({
            page: 1,
            lists: [],
            loading: false,
            flag: true,
            total: 0
        })
        this.getList()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.flag) {
            this.getList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})