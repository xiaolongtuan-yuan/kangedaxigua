// pages/home/home.js
const db = wx.cloud.database()
Page({
  data: {
    list: '',
    images: ''
  },

  onLoad: function (options) {
    db.collection('chedui')
    .limit(8)
    .where({
      finished:false
    })
    .get()
    .then(res =>{
      console.log("连接成功",res)
      this.setData({
        list:res.data
      })
    })
    .catch(res => {
      console.log("连接失败",res)
    })

    //加载轮播图
    db.collection('lunbo')
    .where({
      inshow: true
    })
    .get()
    .then(res =>{
      console.log("图片连接成功",res)
      this.setData({
        images:res.data
      })
    })
    .catch(res => {
      console.log("图片加载失败",res)
    })
  },
  
  toxiangqin(e){
    console.log(e)
    wx.navigateTo({
      url: '../../pages/xiangqin/xiangqin?item=' + e.currentTarget.dataset.item._id
    })
  },
  getList(){
    console.log('list',this.data.list)
    let length = this.data.list.length
    db.collection('chedui')
    .skip(length)
    .limit(8)
    .where({
      finished:false
    })
    .get()
    .then(res =>{
      console.log("加载成功",res)
      this.setData({
        list:this.data.list.concat(res.data)
      })
      console.log("连接后的数据",this.data.list)
    })
    .catch(res => {
      console.log("连接失败",res)
    })
  },
  jiazai(){
    console.log("加载数据")
    this.getList()
  }
})