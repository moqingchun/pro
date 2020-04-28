// components/text/text.js
Component({
  options:{
    style:{
      "styleIsolation":"isolated"
    },
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
      types:Array
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
    add(){
      this.triggerEvent('addone',{},{})
    }
  }
})
