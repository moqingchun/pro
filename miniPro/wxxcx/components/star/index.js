// components/star/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:String,
            value:''
        },
        nowIndex:{
            type:Number,
            value:0
        },
        show:{
            type:Boolean,
            value:true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        evaluate(e) {
            this.setData({
                nowIndex: e.currentTarget.dataset.index
            })
            this.triggerEvent('starFn',e.currentTarget.dataset.index)
        },
    }
})