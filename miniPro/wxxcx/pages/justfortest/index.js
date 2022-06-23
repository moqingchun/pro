import {
    DateFormat
} from '../../utils/util.js'
Page({
    data: {
        date: '',
        endRange: DateFormat(new Date())
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
})