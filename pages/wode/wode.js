// pages/wode/wode.js
Page({
  data: {
    list:'',
    user:'',
    openID:''
  },
  jiazai(){
    wx.cloud.database().collection('chedui')
    .where({
      _openid:this.data.openID
    })
    .get()
    .then(res =>{
      this.setData({
        list:res.data
      })
      console.log("数据加载",res)
    })
  },
  logup(options) {
    console.log("点击登录")
    wx.getUserProfile({
      desc: '登录后方可使用相关功能', 
      success: (res) => {
        console.log("点击登录")
        console.log(res)
        this.setData({
          user:res.userInfo
        })
        wx.cloud.callFunction({
          name:'getData',
          success: res2=>{
            console.log("请求云函数成功",res2)
            console.log(res2.result.openid)
            this.setData({
              openID:res2.result.openid
            })
            wx.setStorageSync('openID',res2.result.openid)
        console.log('缓存openID')
          }
        })
        wx.setStorageSync('user', res.userInfo)
        console.log('缓存user')
        wx.cloud.database().collection('users')
        .add({
          data:{
          portrait: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
          }
        })
        .then( x=>{
          console.log('user添加成功',x)
        })
      }
    })
  },
  jump(){
    console.log("跳转")
    wx.navigateTo({
      url: '../../pages/faqi/faqi'
    })
  },
  toshezhi(){
    wx.navigateTo({
      url: '../../pages/shezhi/shezhi'
    })
  },
  onLoad: function (options) {
    this.setData({
      user:wx.getStorageSync('user'),
      openID:wx.getStorageSync('openID')
    }),
    this.jiazai()
  },
  toxiangqin(e){
    console.log(e)
    wx.navigateTo({
      url: '../../pages/xiangqin/xiangqin?item=' + e.currentTarget.dataset.item._id
    })
  },
  finish(e){
    wx.cloud.database().collection('chedui')
    .doc(e.currentTarget.dataset.item._id)
    .update({
      data: {
        finished: true
      }
    })
    .then(res=>{
      wx.showToast({
        title: '车队已回收',
      })
    })
  },
  start(e){
    wx.cloud.database().collection('chedui')
    .doc(e.currentTarget.dataset.item._id)
    .update({
      data: {
        finished: false
      }
    })
    .then(res=>{
      wx.showToast({
        title: '车队已发车',
      })
    })
  }
})