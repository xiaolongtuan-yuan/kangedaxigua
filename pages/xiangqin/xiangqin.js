// pages/faqi/faqi.js
const db = wx.cloud.database()
var duiyuans=new Array()
Page({
  data: {
    id:'',
    info:'',
    duizhang:duiyuans
  },
  jiazai(){
    db.collection('chedui')
    .doc(this.data.id)
    .get()
    .then(res =>{
      this.setData({
        info:res.data
      })
      console.log('info查询目标成功',this.data.info)
      this.getImage()
      // this.getImages()
    })
  },
  onLoad(event){
    console.log(event)
    this.setData({
      id:event.item
    })
    this.jiazai()
  },
  //点击加入车队
  jiaru(){
    db.collection('chedui')
    .doc(this.data.id)
    .update({
      data:{
        'duiyuans':this.data.info.duiyuans.concat(wx.getStorageSync('openID'))
      }
    })
    wx.showToast({
      title: '加入成功！',
      duration: 2000,
      complete: wx.navigateBack()
    })
  },
  getImage(){
    wx.cloud.database().collection('users')
    .where({
      _openid:this.data.info.duizhang
    })
    .get()
    .then(res =>{
      this.setData({
        duizhang:this.data.duizhang.concat(res.data[0])
      })
    })
    for(let x = 0; x < this.data.info.duiyuans.length;x++){
      wx.cloud.database().collection('users')
      .where({
        _openid:this.data.info.duiyuans[x]
      })
      .get()
      .then(res =>{
        this.setData({
          duizhang:this.data.duizhang.concat(res.data[0])
        })
    })
    }
  },
  //获得队员的头像
  getImages(){
    
  }
})