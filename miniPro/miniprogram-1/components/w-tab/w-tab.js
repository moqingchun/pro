// components/w-tab/w-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    types:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e){
      let index = e.currentTarget.dataset.index;
      this.setData({
        nowIndex:index
      })

      this.triggerEvent('selectedTab',{index,type:this.properties.types[index]},{})
    }
  }
})
