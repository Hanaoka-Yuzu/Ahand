// pages/fuwu_detail/fuwu_detail.js
const app = getApp();
var startPoint;
var serverUrl = app.globalData.serverUrl
var a=app.globalData.userInfo
var testUrl=app.globalData.testUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    avatar:'',
    openid:'',
    desc:'',
    cate:'',
    nickname:'',
    picture:[],
    truename:'',
    qq:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=wx.getStorageSync('id')
    console.log(id)
    var that=this
    wx.request({
      url: serverUrl+'/service/getService?id='+id,
      method: 'GET',
      // header: {
      //   "Content-Type":"application/json;charset=UTF-8"
      // },
      success: function (res) {
        console.log(res)
        var cate=res.data.data.parentCg+res.data.data.sonCg
        that.setData({
          'address':res.data.data.address,
          'openid':res.data.data.openid,
          'desc':res.data.data.desc,
          'truename':res.data.data.name,
          'cate':cate,
          'qq':res.data.data.qq,
          'picture':res.data.data.picture
        })
        console.log(that.data.picture)
      }
    })
  },

  preview: function (res) {
    console.log(res);
    wx.previewImage({
      urls: res.currentTarget.dataset.src,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})