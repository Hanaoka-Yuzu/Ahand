// pages/serve/serve.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
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
      totalpage:0,
      nowpage:1,
      dataList:[
        {
          address:'',
          avatar:'',
          openid:'',
          desc:'',
          cate:'',
          nickname:'',
          ishas:false,
          pic1:'',
          pic2:'',
          have1:false,
          have2:false,
          id:-1,
          qq:''
        },
        {
          address:'',
          avatar:'',
          openid:'',
          desc:'',
          cate:'',
          nickname:'',
          ishas:false,
          pic1:'',
          pic2:'',
          have1:false,
          have2:false,
          id:-1,
          qq:''
        }, 
        {
          address:'',
          avatar:'',
          openid:'',
          desc:'',
          cate:'',
          nickname:'',
          ishas:false,
          pic1:'',
          pic2:'',
          have1:false,
          have2:false,
          id:-1,
          qq:''
        }, 
      ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that=this
      var oid=wx.getStorageSync('openid')
        wx.request({
            url: serverUrl+'/demand/getAllResponse',
            data: {
                currentPage: 1,
                pageSize:3,
                openid:oid
            },
            method: 'GET',
            header: {
              "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (res) {
              console.log(res.data)
              var x;
              if(res.data.total%3==0) x=res.data.total/3;
              else x=parseInt(res.data.total/3)+1;
              if(x==0) x=1
              that.setData({
                'totalpage':x
              })
              if(res.data.data.length==0){
                that.setData({
                  'dataList[0].ishas':false,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false
                })
              }
              if(res.data.data.length>=1){
                var cate=res.data.data[0].demand.parentCg+"-"+res.data.data[0].demand.sonCg
                that.setData({
                  'dataList[0].address':res.data.data[0].candidate.address,
                  'dataList[0].avatar':res.data.data[0].candidate.userDemandState,
                  'dataList[0].openid':res.data.data[0].candidate.openid,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].candidate.name,
                  'dataList[0].desc':res.data.data[0].candidate.desc,
                  'dataList[0].cate':cate,
                  'dataList[0].qq':res.data.data[0].candidate.qq,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false,
                  'dataList[0].id':res.data.data[0].demand.id,
                })
                if(res.data.data[0].candidate.picture.length>=1){
                  that.setData({
                    'dataList[0].pic1':res.data.data[0].candidate.picture[0],
                    'dataList[0].have1':true
                  })
                }
                if(res.data.data[0].candidate.picture.length>=2){
                  that.setData({
                    'dataList[0].pic2':res.data.data[0].candidate.picture[1],
                    'dataList[0].have2':true
                  })
                }
              }
              if(res.data.data.length>=2){
                var cate=res.data.data[1].demand.parentCg+"-"+res.data.data[1].demand.sonCg
                that.setData({
                  'dataList[1].address':res.data.data[1].candidate.address,
                  'dataList[1].avatar':res.data.data[1].candidate.userDemandState,
                  'dataList[1].openid':res.data.data[1].candidate.openid,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].candidate.nickname,
                  'dataList[1].desc':res.data.data[1].candidate.desc,
                  'dataList[1].qq':res.data.data[1].candidate.qq,
                  'dataList[1].cate':cate,
                  'dataList[2].ishas':false,
                  'dataList[1].id':res.data.data[1].demand.id,
                })
                if(res.data.data[1].candidate.picture.length>=1){
                  that.setData({
                    'dataList[1].pic1':res.data.data[1].candidate.picture[0],
                    'dataList[1].have1':true
                  })
                }
                if(res.data.data[1].candidate.picture.length>=2){
                  that.setData({
                    'dataList[1].pic2':res.data.data[1].candidate.picture[1],
                    'dataList[1].have2':true
                  })
                }
              }
              if(res.data.data.length>=3){
                var cate=res.data.data[2].demand.parentCg+"-"+res.data.data[2].demand.sonCg
                that.setData({
                  'dataList[2].address':res.data.data[2].candidate.address,
                  'dataList[2].avatar':res.data.data[2].candidate.userDemandState,
                  'dataList[2].openid':res.data.data[2].candidate.openid,
                  'dataList[2].ishas':true,
                  'dataList[2].qq':res.data.data[2].candidate.qq,
                  'dataList[2].nickname':res.data.data[2].candidate.nickname,
                  'dataList[2].desc':res.data.data[2].candidate.desc,
                  'dataList[2].cate':cate,
                  'dataList[2].id':res.data.data[2].demand.id,
                })
                if(res.data.data[2].candidate.picture.length>=1){
                  that.setData({
                    'dataList[2].pic1':res.data.data[2].candidate.picture[0],
                    'dataList[2].have1':true
                  })
                }
                if(res.data.data[2].candidate.picture.length>=2){
                  that.setData({
                    'dataList[2].pic2':res.data.data[2].candidate.picture[1],
                    'dataList[2].have2':true
                  })
                }
              }
            },
            fail:function(err){ 
            }
          })  
    },

    tochat: function (res) {
      console.log(res)
      var that=this;
      var userinfo = res.target.dataset.userinfo;
      console.log(res.target.dataset.userinfo)
      wx.navigateTo({
        url: '../chat/chat',
        events: {
          acceptDataFromOpenedPage: function(data) {
            console.log(data)
          },
        },
        success: function (res) {
          
          res.eventChannel.emit('acceptDataFromOpenerPage', {data: userinfo})
        },
        fail: function () {
        }
      })
      
    },

    watchdetail: function (res) {
      console.log(res.target.dataset.productid)
      wx.request({
        url: serverUrl+'/demand/doneDemand',
        data: {
            id:res.target.dataset.productid
        },
        method: 'GET',
        header: {
          "Content-Type":"application/json;charset=UTF-8"
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.errorCode==400){
            wx.showToast({
              title: '操作失败！',
              icon: 'error',
              duration: 1000
            })
          }
          else{
            wx.showToast({
              title: '需求完成！',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    },

    accept: function (res) {
      var arr=res.target.dataset.productid.split("+")
      console.log(arr[0])
      console.log(arr[1])
      wx.request({
        url: serverUrl+'/demand/acceptDemand',
        data: {
            openid:arr[1],
            id:arr[0]
        },
        method: 'GET',
        header: {
          "Content-Type":"application/json;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          if(res.data.errorCode==400){
            wx.showToast({
              title: '操作失败！',
              icon: 'error',
              duration: 1000
            })
          }
          else{
              wx.showToast({
              title: '确认接单！',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    },

    refuse: function (res) {
      console.log(res.target.dataset.productid)
      var arr=res.target.dataset.productid.split("+")
      console.log(arr[0])
      console.log(arr[1])
      wx.request({
        url: serverUrl+'/demand/reject',
        data: {
            openid:arr[1],
            id:arr[0]
        },
        method: 'GET',
        header: {
          "Content-Type":"application/json;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          if(res.data.errorCode==400){
            wx.showToast({
              title: '操作失败！',
              icon: 'error',
              duration: 1000
            })
          }
          else{
            wx.showToast({
              title: '拒绝成功！',
              icon: 'success',
              duration: 1000
            })
          }
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

    nextpage: function(){
      if(this.data.nowpage==this.data.totalpage||this.data.totalpage==0){
        wx.showToast({
          title: '最后一页！',
          icon: 'error',
          duration: 1000
        })
      }
      else{
        var that=this
        var num=this.data.nowpage
        num=num+1;
        this.setData({
          'nowpage':num
        })
        var oid=wx.getStorageSync('openid')
        console.log(this.data.nowpage)
        wx.request({
            url: serverUrl+'/demand/getAllResponse',
            data: {
                currentPage: this.data.nowpage,
                pageSize:3,
                openid:oid
            },
            method: 'GET',
            header: {
              "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (res) {
              console.log(res.data)
              var x;
              if(res.data.total%3==0) x=res.data.total/3;
              else x=parseInt(res.data.total/3)+1;
              if(x==0) x=1
              that.setData({
                'totalpage':x
              })
              if(res.data.data.length==0){
                that.setData({
                  'dataList[0].ishas':false,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false
                })
              }
              if(res.data.data.length>=1){
                var cate=res.data.data[0].demand.parentCg+"-"+res.data.data[0].demand.sonCg
                that.setData({
                  'dataList[0].address':res.data.data[0].candidate.address,
                  'dataList[0].avatar':res.data.data[0].candidate.userDemandState,
                  'dataList[0].openid':res.data.data[0].candidate.openid,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].candidate.name,
                  'dataList[0].desc':res.data.data[0].candidate.desc,
                  'dataList[0].cate':cate,
                  'dataList[0].qq':res.data.data[0].candidate.qq,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false,
                  'dataList[0].id':res.data.data[0].demand.id,
                })
                if(res.data.data[0].candidate.picture.length>=1){
                  that.setData({
                    'dataList[0].pic1':res.data.data[0].candidate.picture[0],
                    'dataList[0].have1':true
                  })
                }
                if(res.data.data[0].candidate.picture.length>=2){
                  that.setData({
                    'dataList[0].pic2':res.data.data[0].candidate.picture[1],
                    'dataList[0].have2':true
                  })
                }
              }
              if(res.data.data.length>=2){
                var cate=res.data.data[1].demand.parentCg+"-"+res.data.data[1].demand.sonCg
                that.setData({
                  'dataList[1].address':res.data.data[1].candidate.address,
                  'dataList[1].avatar':res.data.data[1].candidate.userDemandState,
                  'dataList[1].openid':res.data.data[1].candidate.openid,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].candidate.nickname,
                  'dataList[1].desc':res.data.data[1].candidate.desc,
                  'dataList[1].qq':res.data.data[1].candidate.qq,
                  'dataList[1].cate':cate,
                  'dataList[2].ishas':false,
                  'dataList[1].id':res.data.data[1].demand.id,
                })
                if(res.data.data[1].candidate.picture.length>=1){
                  that.setData({
                    'dataList[1].pic1':res.data.data[1].candidate.picture[0],
                    'dataList[1].have1':true
                  })
                }
                if(res.data.data[1].candidate.picture.length>=2){
                  that.setData({
                    'dataList[1].pic2':res.data.data[1].candidate.picture[1],
                    'dataList[1].have2':true
                  })
                }
              }
              if(res.data.data.length>=3){
                var cate=res.data.data[2].demand.parentCg+"-"+res.data.data[2].demand.sonCg
                that.setData({
                  'dataList[2].address':res.data.data[2].candidate.address,
                  'dataList[2].avatar':res.data.data[2].candidate.userDemandState,
                  'dataList[2].openid':res.data.data[2].candidate.openid,
                  'dataList[2].ishas':true,
                  'dataList[2].qq':res.data.data[2].candidate.qq,
                  'dataList[2].nickname':res.data.data[2].candidate.nickname,
                  'dataList[2].desc':res.data.data[2].candidate.desc,
                  'dataList[2].cate':cate,
                  'dataList[2].id':res.data.data[2].demand.id,
                })
                if(res.data.data[2].candidate.picture.length>=1){
                  that.setData({
                    'dataList[2].pic1':res.data.data[2].candidate.picture[0],
                    'dataList[2].have1':true
                  })
                }
                if(res.data.data[2].candidate.picture.length>=2){
                  that.setData({
                    'dataList[2].pic2':res.data.data[2].candidate.picture[1],
                    'dataList[2].have2':true
                  })
                }
              }
            },
            fail:function(err){ 
            }
          })  
      }
    },

    lastpage: function(){
      if(this.data.nowpage==1){
        wx.showToast({
          title: '当前是第一页！',
          icon: 'error',
          duration: 1000
        })
      }
      else{
        var that=this
        var num=this.data.nowpage
        num=num-1;
        this.setData({
          'nowpage':num
        })
        var oid=wx.getStorageSync('openid')

        wx.request({
            url: serverUrl+'/demand/getAllResponse',
            data: {
                currentPage: this.data.nowpage,
                pageSize:3,
                openid:oid
            },
            method: 'GET',
            header: {
              "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (res) {
              console.log(res.data)
              var x;
              if(res.data.total%3==0) x=res.data.total/3;
              else x=parseInt(res.data.total/3)+1;
              if(x==0) x=1
              that.setData({
                'totalpage':x
              })
              if(res.data.data.length==0){
                that.setData({
                  'dataList[0].ishas':false,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false
                })
              }
              if(res.data.data.length>=1){
                var cate=res.data.data[0].demand.parentCg+"-"+res.data.data[0].demand.sonCg
                that.setData({
                  'dataList[0].address':res.data.data[0].candidate.address,
                  'dataList[0].avatar':res.data.data[0].candidate.userDemandState,
                  'dataList[0].openid':res.data.data[0].candidate.openid,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].candidate.name,
                  'dataList[0].desc':res.data.data[0].candidate.desc,
                  'dataList[0].cate':cate,
                  'dataList[0].qq':res.data.data[0].candidate.qq,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false,
                  'dataList[0].id':res.data.data[0].demand.id,
                })
                if(res.data.data[0].candidate.picture.length>=1){
                  that.setData({
                    'dataList[0].pic1':res.data.data[0].candidate.picture[0],
                    'dataList[0].have1':true
                  })
                }
                if(res.data.data[0].candidate.picture.length>=2){
                  that.setData({
                    'dataList[0].pic2':res.data.data[0].candidate.picture[1],
                    'dataList[0].have2':true
                  })
                }
              }
              if(res.data.data.length>=2){
                var cate=res.data.data[1].demand.parentCg+"-"+res.data.data[1].demand.sonCg
                that.setData({
                  'dataList[1].address':res.data.data[1].candidate.address,
                  'dataList[1].avatar':res.data.data[1].candidate.userDemandState,
                  'dataList[1].openid':res.data.data[1].candidate.openid,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].candidate.nickname,
                  'dataList[1].desc':res.data.data[1].candidate.desc,
                  'dataList[1].qq':res.data.data[1].candidate.qq,
                  'dataList[1].cate':cate,
                  'dataList[2].ishas':false,
                  'dataList[1].id':res.data.data[1].demand.id,
                })
                if(res.data.data[1].candidate.picture.length>=1){
                  that.setData({
                    'dataList[1].pic1':res.data.data[1].candidate.picture[0],
                    'dataList[1].have1':true
                  })
                }
                if(res.data.data[1].candidate.picture.length>=2){
                  that.setData({
                    'dataList[1].pic2':res.data.data[1].candidate.picture[1],
                    'dataList[1].have2':true
                  })
                }
              }
              if(res.data.data.length>=3){
                var cate=res.data.data[2].demand.parentCg+"-"+res.data.data[2].demand.sonCg
                that.setData({
                  'dataList[2].address':res.data.data[2].candidate.address,
                  'dataList[2].avatar':res.data.data[2].candidate.userDemandState,
                  'dataList[2].openid':res.data.data[2].candidate.openid,
                  'dataList[2].ishas':true,
                  'dataList[2].qq':res.data.data[2].candidate.qq,
                  'dataList[2].nickname':res.data.data[2].candidate.nickname,
                  'dataList[2].desc':res.data.data[2].candidate.desc,
                  'dataList[2].cate':cate,
                  'dataList[2].id':res.data.data[2].demand.id,
                })
                if(res.data.data[2].candidate.picture.length>=1){
                  that.setData({
                    'dataList[2].pic1':res.data.data[2].candidate.picture[0],
                    'dataList[2].have1':true
                  })
                }
                if(res.data.data[2].candidate.picture.length>=2){
                  that.setData({
                    'dataList[2].pic2':res.data.data[2].candidate.picture[1],
                    'dataList[2].have2':true
                  })
                }
              }
            },
            fail:function(err){ 
            }
          })  
      }
    },
})