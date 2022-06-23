// app.js
import {
    request
} from 'http/index.js'
const amapJs = require('/utils/amap-wx.130.js');
wx._locationChangeFn = (data) => {
    console.log(data)
    if (!wx.getStorageSync('flag')) {
        let myAmapFun = new amapJs.AMapWX({
            key: 'd3221253df6de12764e928e292274d9c'
        });
        myAmapFun.getRegeo({
            location: `${data.longitude},${data.latitude}`,
            success: (res) => {
                console.log(res)
                if (res[0].regeocodeData.addressComponent.district == "昆山市") {
                    wx.setStorageSync('flag', '1')
                }
            },
            fail: (info) => {
                console.log(info)
            }
        });
        return
    }

    let currentTime = new Date().getTime();
    let newLocation = data.latitude + "" + data.longitude;
    let oldLocation = wx.getStorageSync('oldLocation');
    let oldTime = wx.getStorageSync('oldTime');
    //判断当前的位置是否和上次位置不一致，并且间隔时间超过60s
    if (oldLocation != newLocation && currentTime - oldTime > 60000) {
        wx.setStorageSync('oldLocation', newLocation);
        wx.setStorageSync('oldTime', currentTime);
        request({
            url: `/LHWechat.LHWechatDriverAction.do?CMD=setRealLocation&longitude=${data.longitude}&latitude=${data.latitude}&speed=${data.speed}`
        }).then(res => {
            if (res.statusCode == 200) {
                if (res.data.success == 1) {
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
                    wx.showToast({
                        title: res.data.msg
                    })
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }
            }
        })
    }

};
App({
    onLaunch() {
        this.checkoutFn();
    },
    
    onShow(options) {
        return
        if (!!wx.getStorageSync('haveInfo')) {
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
    },
    checkoutFn() {
        if (wx.getStorageSync('openId')) {
            return
        }
        wx.login({
            success: res => {
                // console.log(res)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                request({
                    url: `/LHWechat.LHWechatCommonAction.do?CMD=jscode2Session&code=${res.code}`
                }).then(resp => {
                    if (resp.statusCode == 200) {
                        if (resp.data.success == 1) {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                            return
                        }
                        wx.setStorageSync('openId', resp.data.openid)
                    }
                })
            }
        })
    },
    globalData: {
        title: '鹿货通'
    }
})