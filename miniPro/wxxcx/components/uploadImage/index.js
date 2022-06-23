// components/uploadImage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    deleteImg(e){
      this.data.imgList.splice(e.currentTarget.dataset.ind,1)
      this.setData({
        imgList:this.data.imgList
      })
      this.triggerEvent('uploadFn', this.data.imgList)
    },
    bigImageFn(e){
      wx.previewImage({
        current:e.currentTarget.dataset.src[e.currentTarget.dataset.index],
        urls: e.currentTarget.dataset.src,
      })
    },
    chooseImageFn() {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          // let boolean = res.tempFiles.some(v => {
          //   return v.size > (1048576 * 2)
          // })
          // if (boolean) {
          //   wx.showToast({
          //     title: '单张限制2M内',
          //     icon: 'error'
          //   })
          //   return;
          // }
          if(this.data.imgList.length>=3){
            wx.showToast({
              title: '最多上传3张',
              icon:'error'
            })
            return
          }
          this.setData({
            imgList: [...this.data.imgList,...res.tempFilePaths]
          })
          this.triggerEvent('uploadFn', this.data.imgList)
        }
      })
    },
  }
})