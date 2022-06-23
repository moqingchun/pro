// components/license/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        license: {
            type: String,
            value: ''
        },
        show: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        provinces: '京沪粤津浙苏湘渝云豫皖陕桂新青琼闽蒙辽宁鲁晋吉翼黑甘鄂赣贵川藏使'.split(''),
        areas: 'ABCDEFGHJKLMNPQRSTUVWXYZ'.split(''),
        numbers: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split(''),
        last: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ挂港澳警领学'.split(''),
        carNums: [],
        boardType: 0,
        newPower: false
    },
    /**
     * 组件的生命周期之ready
     */
    ready() {
        this.init()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 初始化，将父组件传来的license转化成carNums，并且显示对应的键盘
        init() {
            let carNums = this.data.license.split(''),
                length = carNums.length;
            this.setData({
                carNums,
                newPower: length == 8 ? true : false
            })
            if (length == 0) {
                this.setData({
                    boardType: 0
                })
            } else if (length == 1) {
                this.setData({
                    boardType: 1
                })
            } else if (length == 2) {
                this.setData({
                    boardType: 2
                })
            } else if (length == 3) {
                this.setData({
                    boardType: 2
                })
            } else if (length == 4) {
                this.setData({
                    boardType: 2
                })
            } else if (length == 5) {
                this.setData({
                    boardType: 2
                })
            } else if (length == 6) {
                this.setData({
                    boardType: 3
                })
            } else if (length == 7) {
                this.setData({
                    boardType: 3
                })
            } else if (length == 8) {
                this.setData({
                    boardType: 3
                })
            }
        },
        // 键盘按键点击事件
        chooseCode(e) {
            let val = e.currentTarget.dataset.val;
            let length = this.data.carNums.length;
            if (length == 0) {
                this.setData({
                    'carNums[0]': val,
                    boardType: 1
                })
            } else if (length == 1) {
                this.setData({
                    'carNums[1]': val,
                    boardType: 2
                })
            } else if (length == 2) {
                this.setData({
                    'carNums[2]': val,
                    boardType: 2
                })
            } else if (length == 3) {
                this.setData({
                    'carNums[3]': val,
                    boardType: 2
                })
            } else if (length == 4) {
                this.setData({
                    'carNums[4]': val,
                    boardType: 2
                })
            } else if (length == 5 && this.data.newPower) {
                this.setData({
                    'carNums[5]': val,
                    boardType: 2
                })
            } else if (length == 5 && !this.data.newPower) {
                this.setData({
                    'carNums[5]': val,
                    boardType: 3
                })
            } else if (length == 6) {
                this.setData({
                    'carNums[6]': val,
                    boardType: 3
                })
            } else if (length == 7 && this.data.newPower) {
                this.setData({
                    'carNums[7]': val
                })
            }
        },
        // 清除事件
        delBack() {
            let length = this.data.carNums.length;
            if (length == 8) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 3
                })
            } else if (length == 7 && this.data.newPower) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 2
                })
            } else if (length == 7 && !this.data.newPower) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 3
                })
            } else if (length == 6) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 2
                })
            } else if (length == 5) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 2
                })
            } else if (length == 4) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 2
                })
            } else if (length == 3) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 2
                })
            } else if (length == 2) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 1
                })
            } else if (length == 1) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 0
                })
            }
        },
        // 完成事件
        complete() {
            this.setData({
                show: false,
            })
            this.triggerEvent('change', this.data.carNums.join(''))
        },
        // 组件隐藏
        onClose() {
            this.setData({
                show: false
            });
            this.init()
        },
        newPowerF() {
            this.setData({
                newPower: !this.data.newPower
            })
            if (this.data.newPower && this.data.carNums.length == 6) {
                this.setData({
                    boardType: 2
                })
            } else if (!this.data.newPower && this.data.carNums.length == 6) {
                this.setData({
                    boardType: 3
                })
            } else if (this.data.newPower && this.data.carNums.length == 7) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums,
                    boardType: 2
                })
            } else if (!this.data.newPower && this.data.carNums.length == 8) {
                this.data.carNums.pop()
                this.setData({
                    carNums: this.data.carNums
                })
            }
        }
    }
})