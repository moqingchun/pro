// pages/enterKunApply/index.js
const amapJs = require('../../utils/amap-wx.130.js');
const app = getApp();
import {
    request
} from '../../http/index.js';
import {
    DateFormat
} from '../../utils/util.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        sureTxt: '同意(3s)',
        checked: false,
        array: ['开发区', '高新区', '花桥', '张浦', '周市', '陆家', '巴城', '千灯', '淀山湖', '周庄', '锦溪'],
        index: null,
        licenseColorArray: ['蓝', '黄', '黑', '白', '黄绿双拼', '绿', '其它'],
        licenseColorIndex: 1,
        dkArray: [],
        dkIndex: null,
        arriveCorp: '',
        corpLinkMan: '',
        corpLinkManTel: '',
        license: '',
        showLicenseComponent: false,
        arrivalDate: '',
        leaveDate: '',
        startRange: DateFormat(new Date()),
        driverName: '',
        driverTel: '',
        haveSubmit: false,
        changeNotice: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let haveInfo = wx.getStorageSync('haveInfo');
        let userinfo = wx.getStorageSync('userinfo');
        let indexs = this.data.licenseColorArray.findIndex((v => {
            return v == userinfo.licenseColor
        }))
        this.setData({
            haveInfo,
            driverTel: userinfo.phone,
            license: userinfo.license ? userinfo.license.replace(/-/g, '') : '',
            licenseColorIndex: indexs == -1 ? 1 : indexs,
        })
        if (!haveInfo) {
            this.setData({
                show: true
            })
            this.countDown()
        }
        this.getDkList()
    },
    countDown() {
        let count = 3;
        let timer = setInterval(() => {
            count--;
            if (count == 0) {
                this.setData({
                    sureTxt: `同意`
                })
                clearInterval(timer)
            } else {
                this.setData({
                    sureTxt: `同意(${count}s)`
                })
            }
        }, 1000);
    },
    backFn() {
        wx.navigateBack({
            delta: 1,
        })
    },
    sureFn() {
        this.setData({
            show: false,
            checked: true
        })
    },
    cbFn() {
        this.setData({
            checked: !this.data.checked
        })
    },
    getDkList() {
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=crossingList`
        }).then(res => {
            this.setData({
                dkArray: res.data.rows
            })
            this.getInfo()
        })
    },
    getInfo() {
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=queryBindLog&applier=${wx.getStorageSync('userinfo').phone}`
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.success != 1) {
                    let index = this.data.array.findIndex((v => {
                        return v == res.data.govLinkMan
                    }));
                    this.setData({
                        arriveCorp: res.data.arriveCorp,
                        index: index == -1 ? null : index,
                        corpLinkMan: res.data.corpLinkMan,
                        corpLinkManTel: res.data.corpLinkManTel,
                        license: res.data.license ? res.data.license.replace(/-/g, '') : '',
                        licenseColorIndex: this.data.licenseColorArray.findIndex((v => {
                            return v == res.data.licenseColor
                        })),
                        dkIndex: this.data.dkArray.findIndex((v => {
                            return v.name == res.data.bindCrossingName
                        })),
                        arrivalDate: res.data.arrivalDate,
                        leaveDate: res.data.leaveDate,
                        driverName: res.data.driverName,
                        driverTel: res.data.driverTel,
                    })
                }
            }
        })
    },
    sameData() {
        if (!this.data.arrivalDate.trim()) {
            wx.showToast({
                title: '请选择入昆日期',
                icon: 'none'
            })
            return
        }
        if (!/^[1][0-9]{10}$/.test(this.data.driverTel)) {
            wx.showToast({
                title: '驾驶员手机号有误！',
                icon: 'none'
            })
            return
        }
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=queryInfoByPhone&arrivalDate=${this.data.arrivalDate}&driverTel=${this.data.driverTel}`
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.success != 1) {
                    if (!res.data.rows.length) {
                        wx.showToast({
                            title: '未查询到数据，请手工填写',
                            icon: 'none'
                        })
                        return
                    }
                    let o = res.data.rows[0]
                    this.setData({
                        arriveCorp: o.approve_corp,
                        corpLinkMan: o.linkman,
                        corpLinkManTel: o.link_phone,
                        license: o.licensecard ? o.licensecard.replace(/-/g, '') : '',
                        licenseColorIndex: this.data.licenseColorArray.findIndex((v => {
                            return v == o.license_color
                        })),
                        arrivalDate: o.arrival_date,
                        leaveDate: o.leave_date,
                        driverName: o.driver_name,
                        driverTel: o.drvier_phone,
                    })
                }
            }
        })
    },
    getLicense() {
        this.setData({
            showLicenseComponent: true
        })
    },
    showLicense(e) {
        this.setData({
            license: e.detail
        })
    },
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindCpysPickerChange(e) {
        this.setData({
            licenseColorIndex: e.detail.value
        })
    },
    bindDkPickerChange(e) {
        this.setData({
            dkIndex: e.detail.value
        })
    },
    bindArrivalDateChange: function (e) {
        this.setData({
            arrivalDate: e.detail.value
        })
    },
    bindleaveDateChange: function (e) {
        this.setData({
            leaveDate: e.detail.value
        })
    },
    submitFn() {
        if (!this.data.checked) {
            wx.showToast({
                title: '请确认同意授权指引',
                icon: 'none'
            })
            return
        }
        if (!this.data.arriveCorp.trim()) {
            wx.showToast({
                title: '请输入到达企业',
                icon: 'none'
            })
            return
        }
        if (!this.data.corpLinkMan.trim()) {
            wx.showToast({
                title: '请输入企业联系人',
                icon: 'none'
            })
            return
        }
        if (!/^[1][0-9]{10}$/.test(this.data.corpLinkManTel)) {
            wx.showToast({
                title: '企业联系人手机号有误！',
                icon: 'none'
            })
            return
        }
        if (!this.data.license.trim()) {
            wx.showToast({
                title: '请输入车牌号',
                icon: 'none'
            })
            return
        }
        if (this.data.dkIndex == null) {
            wx.showToast({
                title: '请选择入昆道口',
                icon: 'none'
            })
            return
        }
        if (!this.data.arrivalDate.trim()) {
            wx.showToast({
                title: '请选择入昆日期',
                icon: 'none'
            })
            return
        }
        if (!this.data.leaveDate.trim()) {
            wx.showToast({
                title: '请选择离昆日期',
                icon: 'none'
            })
            return
        }
        if (this.data.arrivalDate > this.data.leaveDate) {
            wx.showToast({
                title: '入昆日期不能晚于离昆日期',
                icon: 'none'
            })
            return
        }
        if (!/^[1][0-9]{10}$/.test(this.data.driverTel)) {
            wx.showToast({
                title: '驾驶员手机号有误！',
                icon: 'none'
            })
            return
        }
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=submitApply`,
            data: {
                arriveCorp: this.data.arriveCorp,
                govLinkMan: this.data.index ? this.data.array[this.data.index] : '',
                corpLinkMan: this.data.corpLinkMan,
                corpLinkManTel: this.data.corpLinkManTel,
                license: this.data.license,
                licenseColor: this.data.licenseColorArray[this.data.licenseColorIndex],
                bindCrossingName: this.data.dkArray[this.data.dkIndex].name,
                bindCrossingId: this.data.dkArray[this.data.dkIndex].id,
                arrivalDate: this.data.arrivalDate,
                leaveDate: this.data.leaveDate,
                driverName: this.data.driverName,
                driverTel: this.data.driverTel,
                applier: wx.getStorageSync('userinfo').phone
            }
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.success == 0) {
                    this.setData({
                        haveInfo: 1,
                        haveSubmit: true
                    })
                    wx.setStorageSync('haveInfo', 1)
                    this.sendLocation()
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            }
        })
    },
    sendLocation() {
        wx.startLocationUpdateBackground({
            success: () => {
                wx.onLocationChange(wx._locationChangeFn);
            },
            fail: (err) => {
                console.log("获取位置失败", err);
            },
        });
        return
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
    },
    haveSubmited() {
        let o = wx.getStorageSync('userinfo')
        this.setData({
            haveSubmit: false
        })
        if ((o.license && this.data.license != o.license.replace(/-/g, '')) || (!o.license && this.data.license != o.license) || this.data.licenseColor != o.licenseColor) {
            this.setData({
                changeNotice: true
            })
        }
    },
    cancelChange() {
        this.setData({
            changeNotice: false
        })
    },
    sureChange() {
        this.setData({
            changeNotice: false
        })
        let o = wx.getStorageSync('userinfo');
        o.license = this.data.license;
        o.licenseColor = this.data.licenseColorArray[this.data.licenseColorIndex];
        wx.setStorageSync('userinfo', o)
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=updateLicense&id=${wx.getStorageSync('userinfo').id}&license=${this.data.license}`
        }).then(res => {})
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=updateLicenseColor&id=${wx.getStorageSync('userinfo').id}&licenseColor=${this.data.licenseColorArray[this.data.licenseColorIndex]}`
        }).then(res => {})
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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