// pages/shezhi/shezhi.js
Page({
  data: {
    user:'',
    cloudID:''
  },
  onLoad: function (options) {
    this.setData({
      user:wx.getStorageSync('user'),
      cloudID:wx.getStorageSync('cloudID')
    })
  },
  logout(){
    console.log("退出")
    wx.removeStorage({
      key: 'user',
      success (res) {
        wx.showToast({
          title: '退出成功'
        })
      }
    })
    wx.removeStorage({
      key: 'openID',
      success (res) {
        console.log("退出成功")
      }
    })
    
  }
})