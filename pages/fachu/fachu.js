// pages/homepage/homepage.js
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
          budget:0,
          desc:'',
          cate:'',
          endDate:'',
          nickname:'',
          ishas:false,
          pic1:'',
          pic2:'',
          have1:false,
          have2:false,
          id:-1
        },
        {
          address:'',
          avatar:'',
          openid:'',
          budget:0,
          desc:'',
          cate:'',
          endDate:'',
          nickname:'',
          ishas:false,
          pic1:'',
          pic2:'',
          have1:false,
          have2:false,
          id:-1
        }, 
        {
          address:'',
          avatar:'',
          openid:'',
          budget:0,
          desc:'',
          cate:'',
          endDate:'',
          nickname:'',
          ishas:false,
          pic1:'',
          pic2:'',
          have1:false,
          have2:false,
          id:-1
        }, 
      ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that =this;
      console.log(app.globalData.userInfo)
      var that=this
      var oid=wx.getStorageSync('openid')
        wx.request({
            url: serverUrl+'/demand/getAllApply',
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
                var cate=res.data.data[0].parentCg+"-"+res.data.data[0].sonCg
                that.setData({
                  'dataList[0].endDate':res.data.data[0].userDemandState,
                  'dataList[0].address':res.data.data[0].address,
                  'dataList[0].avatar':res.data.data[0].avatar,
                  'dataList[0].openid':res.data.data[0].openid,
                  'dataList[0].budget':res.data.data[0].budget,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].nickname,
                  'dataList[0].desc':res.data.data[0].desc,
                  'dataList[0].cate':cate,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false,
                  'dataList[0].id':res.data.data[0].id,
                })
                if(res.data.data[0].picture.length>=1){
                  that.setData({
                    'dataList[0].pic1':res.data.data[0].picture[0],
                    'dataList[0].have1':true
                  })
                }
                if(res.data.data[0].picture.length>=2){
                  that.setData({
                    'dataList[0].pic2':res.data.data[0].picture[1],
                    'dataList[0].have2':true
                  })
                }
              }
              if(res.data.data.length>=2){
                var cate=res.data.data[1].parentCg+"-"+res.data.data[1].sonCg
                that.setData({
                  'dataList[1].endDate':res.data.data[1].userDemandState,
                  'dataList[1].address':res.data.data[1].address,
                  'dataList[1].avatar':res.data.data[1].avatar,
                  'dataList[1].openid':res.data.data[1].openid,
                  'dataList[1].budget':res.data.data[1].budget,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].nickname,
                  'dataList[1].desc':res.data.data[1].desc,
                  'dataList[1].cate':cate,
                  'dataList[2].ishas':false,
                  'dataList[1].id':res.data.data[1].id,
                })
                if(res.data.data[1].picture.length>=1){
                  that.setData({
                    'dataList[1].pic1':res.data.data[1].picture[0],
                    'dataList[1].have1':true
                  })
                }
                if(res.data.data[1].picture.length>=2){
                  that.setData({
                    'dataList[1].pic2':res.data.data[1].picture[1],
                    'dataList[1].have2':true
                  })
                }
              }
              if(res.data.data.length>=3){
                var cate=res.data.data[2].parentCg+"-"+res.data.data[2].sonCg
                that.setData({
                  'dataList[2].endDate':res.data.data[2].userDemandState,
                  'dataList[2].address':res.data.data[2].address,
                  'dataList[2].avatar':res.data.data[2].avatar,
                  'dataList[2].openid':res.data.data[2].openid,
                  'dataList[2].budget':res.data.data[2].budget,
                  'dataList[2].ishas':true,
                  'dataList[2].nickname':res.data.data[2].nickname,
                  'dataList[2].desc':res.data.data[2].desc,
                  'dataList[2].cate':cate,
                  'dataList[2].id':res.data.data[2].id,
                })
                if(res.data.data[2].picture.length>=1){
                  that.setData({
                    'dataList[2].pic1':res.data.data[2].picture[0],
                    'dataList[2].have1':true
                  })
                  console.log(that.data.dataList[2].pic1)
                  wx.downloadFile({
                    url: that.data.dataList[2].pic1, //仅为示例，并非真实的资源
                    success (res) {
                      console.log('下载成功')
                      console.log(res.tempFilePath)
                    }
                  })
                }
                if(res.data.data[2].picture.length>=2){
                  that.setData({
                    'dataList[2].pic2':res.data.data[2].picture[1],
                    'dataList[2].have2':true
                  })
                }
              }
            },
            fail:function(err){ 
            }
          })  
      console.log(this.data.dataList[2].have2)
    },

    watchdetail: function (res) {
      console.log(res.target.dataset.productid)
      wx.setStorageSync('id', res.target.dataset.productid)
      wx.navigateTo({
        url: '../item_detail/item_detail',
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
        console.log(this.data.nowpage)
        var oid=wx.getStorageSync('openid')
        wx.request({
          url: serverUrl+'/demand/getAllApply',
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
                var cate=res.data.data[0].parentCg+"-"+res.data.data[0].sonCg
                that.setData({
                  'dataList[0].endDate':res.data.data[0].userDemandState,
                  'dataList[0].address':res.data.data[0].address,
                  'dataList[0].avatar':res.data.data[0].avatar,
                  'dataList[0].openid':res.data.data[0].openid,
                  'dataList[0].budget':res.data.data[0].budget,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].nickname,
                  'dataList[0].desc':res.data.data[0].desc,
                  'dataList[0].cate':cate,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false,
                  'dataList[0].id':res.data.data[0].id,
                })
                if(res.data.data[0].picture.length>=1){
                  that.setData({
                    'dataList[0].pic1':res.data.data[0].picture[0],
                    'dataList[0].have1':true,
                    'dataList[0].have2':false
                  })
                }
                if(res.data.data[0].picture.length>=2){
                  that.setData({
                    'dataList[0].pic2':res.data.data[0].picture[1],
                    'dataList[0].have2':true
                  })
                }
              }
              if(res.data.data.length>=2){
                var cate=res.data.data[1].parentCg+"-"+res.data.data[1].sonCg
                that.setData({
                  'dataList[1].endDate':res.data.data[1].userDemandState,
                  'dataList[1].address':res.data.data[1].address,
                  'dataList[1].avatar':res.data.data[1].avatar,
                  'dataList[1].openid':res.data.data[1].openid,
                  'dataList[1].budget':res.data.data[1].budget,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].nickname,
                  'dataList[1].desc':res.data.data[1].desc,
                  'dataList[1].cate':cate,
                  'dataList[2].ishas':false,
                  'dataList[1].id':res.data.data[1].id,
                })
                if(res.data.data[1].picture.length>=1){
                  that.setData({
                    'dataList[1].pic1':res.data.data[1].picture[0],
                    'dataList[1].have1':true,
                    'dataList[1].have2':false
                  })
                }
                if(res.data.data[1].picture.length>=2){
                  that.setData({
                    'dataList[1].pic2':res.data.data[1].picture[1],
                    'dataList[1].have2':true
                  })
                }
              }
              if(res.data.data.length>=3){
                var cate=res.data.data[2].parentCg+"-"+res.data.data[2].sonCg
                that.setData({
                  'dataList[2].endDate':res.data.data[2].userDemandState,
                  'dataList[2].address':res.data.data[2].address,
                  'dataList[2].avatar':res.data.data[2].avatar,
                  'dataList[2].openid':res.data.data[2].openid,
                  'dataList[2].budget':res.data.data[2].budget,
                  'dataList[2].ishas':true,
                  'dataList[2].nickname':res.data.data[2].nickname,
                  'dataList[2].desc':res.data.data[2].desc,
                  'dataList[2].cate':cate,
                  'dataList[2].id':res.data.data[2].id,
                })
                if(res.data.data[2].picture.length>=1){
                  that.setData({
                    'dataList[2].pic1':res.data.data[2].picture[0],
                    'dataList[2].have1':true,
                    'dataList[2].have2':false
                  })
                }
                if(res.data.data[2].picture.length>=2){
                  that.setData({
                    'dataList[2].pic2':res.data.data[2].picture[1],
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

    productDetail: function(){
      console.log("yes")
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
          url: serverUrl+'/demand/getAllApply',
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
                var cate=res.data.data[0].parentCg+"-"+res.data.data[0].sonCg
                that.setData({
                  'dataList[0].endDate':res.data.data[0].userDemandState,
                  'dataList[0].address':res.data.data[0].address,
                  'dataList[0].avatar':res.data.data[0].avatar,
                  'dataList[0].openid':res.data.data[0].openid,
                  'dataList[0].budget':res.data.data[0].budget,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].nickname,
                  'dataList[0].desc':res.data.data[0].desc,
                  'dataList[0].cate':cate,
                  'dataList[1].ishas':false,
                  'dataList[2].ishas':false,
                  'dataList[0].id':res.data.data[0].id,
                })
                if(res.data.data[0].picture.length>=1){
                  that.setData({
                    'dataList[0].pic1':res.data.data[0].picture[0],
                    'dataList[0].have1':true,
                    'dataList[0].have2':false
                  })
                }
                if(res.data.data[0].picture.length>=2){
                  that.setData({
                    'dataList[0].pic2':res.data.data[0].picture[1],
                    'dataList[0].have2':true
                  })
                }
              }
              if(res.data.data.length>=2){
                var cate=res.data.data[1].parentCg+"-"+res.data.data[1].sonCg
                that.setData({
                  'dataList[1].endDate':res.data.data[1].userDemandState,
                  'dataList[1].address':res.data.data[1].address,
                  'dataList[1].avatar':res.data.data[1].avatar,
                  'dataList[1].openid':res.data.data[1].openid,
                  'dataList[1].budget':res.data.data[1].budget,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].nickname,
                  'dataList[1].desc':res.data.data[1].desc,
                  'dataList[1].cate':cate,
                  'dataList[2].ishas':false,
                  'dataList[1].id':res.data.data[1].id,
                })
                if(res.data.data[1].picture.length>=1){
                  that.setData({
                    'dataList[1].pic1':res.data.data[1].picture[0],
                    'dataList[1].have1':true,
                    'dataList[1].have2':false
                  })
                }
                if(res.data.data[1].picture.length>=2){
                  that.setData({
                    'dataList[1].pic2':res.data.data[1].picture[1],
                    'dataList[1].have2':true
                  })
                }
              }
              if(res.data.data.length>=3){
                var cate=res.data.data[2].parentCg+"-"+res.data.data[2].sonCg
                that.setData({
                  'dataList[2].endDate':res.data.data[2].userDemandState,
                  'dataList[2].address':res.data.data[2].address,
                  'dataList[2].avatar':res.data.data[2].avatar,
                  'dataList[2].openid':res.data.data[2].openid,
                  'dataList[2].budget':res.data.data[2].budget,
                  'dataList[2].ishas':true,
                  'dataList[2].nickname':res.data.data[2].nickname,
                  'dataList[2].desc':res.data.data[2].desc,
                  'dataList[2].cate':cate,
                  'dataList[2].id':res.data.data[2].id,
                })
                if(res.data.data[2].picture.length>=1){
                  that.setData({
                    'dataList[2].pic1':res.data.data[2].picture[0],
                    'dataList[2].have1':true,
                    'dataList[2].have2':false
                  })
                }
                if(res.data.data[2].picture.length>=2){
                  that.setData({
                    'dataList[2].pic2':res.data.data[2].picture[1],
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
          console.log("😭😭😭")
        }
      })
      
    },
})