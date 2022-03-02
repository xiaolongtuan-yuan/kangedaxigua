// pages/xiangqin/xiangqin.js
const db = wx.cloud.database()
var duiyuans=new Array()
Page({
 data:{
   duizhang:'',
   imagelist:'',// 图片列表
   beizhu : '',
   dizhi : '',
   money :  '',
   name : '',
   time : ''
 },
 onLoad: function () {
  this.setData({
    duizhang:wx.getStorageSync('openID')
  })
  console.log('发起页面',this.data.duizhang)
 },
 input_duiming(e){
  this.data.name = e.detail.value
  console.log(this.data.name)
 },
 input_dizhi(e){
  this.data.dizhi = e.detail.value
 },
 input_time(e){
  this.data.time = e.detail.value
 },
 input_money(e){
  this.data.money = e.detail.value
 },
 input_beizhu(e){
  this.data.beizhu = e.detail.value
 },

//  添加图片，考虑图片的大小，后期有钱再添加图片功能
//  addfile(){
//   console.log("添加图片")
//   wx.chooseImage({
//     count: 3,
//     sizeType: ['compressed'],
//     sourceType: ['album', 'camera'],
//     success: res =>{
//       // tempFilePath可以作为img标签的src属性显示图片
//       const tempFilePaths = res.tempFilePaths
//       console.log(tempFilePaths)
//       this.data.imagelist.concat(tempFilePaths)
//     }
//   })
//  },
// 上传
 upload(){
  db.collection('chedui')
  .add({
    // data 字段表示需新增的 JSON 数据
    data: {
      duizhang: this.data.duizhang,
      beizhu: this.data.beizhu,
      dizhi: this.data.dizhi,
      money: this.data.money,
      name: this.data.name,
      time: this.data.time,
      duiyuans:duiyuans
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      wx.showToast({
        title: '上传成功',
        duration: 2000,
        complete: wx.navigateBack()
      })
    }
  })
 }
})