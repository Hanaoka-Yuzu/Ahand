// pages/me/me.js
const app = getApp();
var serverUrl = app.globalData.serverUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        signed:false,
        signdate:"",
        signednum:0,
        avatar:"",
        nickname:"",
        choosedemand:true
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        var Y =date.getFullYear();  
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
        var dat=Y+"-"+M+"-"+D
        console.log(dat)
        var openid=wx.getStorageSync('openid')
        var that=this
        console.log(openid)
        wx.request({
            url: serverUrl+'/user/getPoint',
            data: {
              openid:openid
            },
            method: 'GET',
            header: {
              "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (res) {
              console.log(res)
              if(res.data.data.signInDate==dat){
                that.setData({
                  signdate:res.data.data.signInDate,
                  signednum:res.data.data.point,
                  signed:true,
                  nickname:res.data.data.nickname,
                  avatar:res.data.data.avatar
                })
              }
              else{
                that.setData({
                  signdate:res.data.data.signInDate,
                  signednum:res.data.data.point,
                  signed:false,
                  nickname:res.data.data.nickname,
                  avatar:res.data.data.avatar
                })
              }
            },
            fail:function(err){ 
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
  
    },

    sign:function(options){
      if(this.data.signed==true){
        wx.showToast({
          title: '今日已签到！',
          icon: 'error',
          duration: 1000
        })
      }
      else{
        wx.showToast({
          title: '签到成功！',
          icon: 'success',
          duration: 1000
          })
          var timestamp = Date.parse(new Date());
          var date = new Date(timestamp);
          var Y =date.getFullYear();  
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
          var dat=Y+"-"+M+"-"+D
          console.log(dat)
          var openid=wx.getStorageSync('openid')
          console.log(openid)
          wx.request({
              url: serverUrl+'/user/addPoint',
              data: {
                openid:openid,
                addsum:10,
                signInDate:dat
              },
              method: 'POST',
              header: {
                "Content-Type":"application/json;charset=UTF-8"
              },
              success: function (res) {
                console.log(res)
              },
              fail:function(err){ 
              }
            })  
        var asset=this.data.signednum
        this.setData({
          signdate:dat,
          signednum:asset+10,
          signed:true,
        })
      }
    },

    previewImg: function (res) {
      var that=this;
      wx.previewImage({
        urls: [],
      })
    },

    choosedemandclick: function (e) {
      this.setData({
        choosedemand: true,
      })
    },

    chooseserviceclick: function (e) {
      this.setData({
        choosedemand: false,
      })
    },

    to_fabu: function (e) {
      wx.navigateTo({
        url: '../yifabu/yifabu',
      })
    },

    to_shenqing: function (e) {
      wx.navigateTo({
        url: '../beishenqing/beishenqing',
      })
    },

    to_fachu: function (e) {
      wx.navigateTo({
        url: '../fachu/fachu',
      })
    },
})