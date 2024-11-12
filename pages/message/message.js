const util = require("../utils.js")
const websocket = require("../websocket.js")
// pages/message/message.js
const app = getApp()
var serverUrl=app.globalData.serverUrl;

Page({
    /**
     * 页面的初始数据
     */
    data: {
      user_openid: "",
      friendList:[],
      userInfo:[],
      scrollTop: 0,
      imageSize: 100
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that=this;
      if(app.globalData.userInfo){
        that.setData({
          userInfo: app.globalData.userInfo,
          user_openid: wx.getStorageSync('openid')
        })
        console.log(that.data.userInfo)
      }
      wx.request({
        url: serverUrl+'/user/friends',
        data: {
          openid: that.data.user_openid,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            friendList: res.data.data
          })
        }
      })
    },

    previewImg: function (res) {
      var that=this;
      console.log(res.target.dataset.src)
      wx.previewImage({
        urls: [res.target.dataset.src]
      })
      
    },

    outbtn: function () {

    },

    tapFriend: function (res) {
      var that=this;
      var friend=res.currentTarget.dataset.info;
      console.log(res);
      wx.navigateTo({
        url: '../chat/chat',
        events: {
          acceptDataFromOpenedPage: function(data) {
            console.log(data)
          },
        },
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', {data: friend})
        },
        fail: function () {
          console.log("😭😭😭")
        }
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