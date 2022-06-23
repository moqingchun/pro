// components/tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabLists:{
            type:Array,
            value:[]
        },
        parentIndex:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        nowIndex:0
    },
    observers: {
        'parentIndex':function(parentIndex) {
          // 在 numberA 或者 numberB 被设置时，执行这个函数
          this.setData({
            nowIndex: parentIndex
          })
        }
      },
    /**
     * 组件的方法列表
     */
    methods: {
        changeTab(e){
            if(e.currentTarget.dataset.index==this.data.nowIndex) return;
            this.setData({
                nowIndex:e.currentTarget.dataset.index
            })
            this.triggerEvent('tabevent', e.currentTarget.dataset.index)
        },
    }
})
