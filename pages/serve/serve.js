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
      time:0,
      buttonTop: 0,
      buttonLeft: 0,
      windowHeight: '',
      windowWidth: '',
      option1: [
        { text : '全部', value: 0},
        { text: '租借', value: 1 },
        { text: '代做', value: 2 },
        { text: '设计', value: 3 },
        { text: '陪+', value: 4 },
        { text: '开发', value: 5 },
      ],
      option2: [
        { text : '全部', value: 0},
        { text: '服饰', value: 1 },
        { text: '电子设备', value: 2 },
        { text: '运动设备', value: 3 },
        { text: '账号', value: 4 },
        { text: '其他', value: 5 },
      ],
      option3:[
        { text : '全部', value: 0},
        { text: '代取', value: 1 },
        { text: '代打印', value: 2 },
        { text: '取快递', value: 3 },
        { text: '其他', value: 4 },
      ],
      option4:[
        { text : '全部', value: 0},
        { text: '音视频', value: 1 },
        { text: '图片', value: 2 },
        { text: '文字', value: 3 },
        { text: '摄影', value: 4 },
        { text: '图画', value: 5 },
        { text: '其他', value: 6 },
      ],
      option5:[
        { text : '全部', value: 0},
        { text: '陪同', value: 1 },
        { text: '其他', value: 2 },
      ],
      option6:[
        { text : '全部', value: 0},
        { text: '网页开发', value: 1 },
        { text: '编程与软件', value: 2 },
        { text: '算法分析', value: 3 },
        { text: '其他', value: 4 },
      ],
      option7:[
        { text : '全部', value: 0},
      ],
      value1: 0,
      value2: 0,
      totalpage:0,
      nowpage:1,
      dataList:[
        {
          address:'',
          avatar:'',
          openid:'',
          desc:'',
          cate:'',
          endDate:'',
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
          endDate:'',
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
          endDate:'',
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
      var that =this;
      console.log(app.globalData.userInfo)
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight:  res.windowHeight,
          buttonTop:res.windowHeight-50,
          buttonLeft:res.windowWidth-50,
          windowWidth:  res.windowWidth
        })
      }
    })
      var that=this
        wx.request({
            url: serverUrl+'/service/getAllService',
            data: {
                currentPage: 1,
                pageSize:3,
                parentCg: this.data.value1,
                sonCg: this.data.value2
            },
            method: 'POST',
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
                console.log(cate)
                that.setData({
                  'dataList[0].endDate':res.data.data[0].endDate,
                  'dataList[0].address':res.data.data[0].address,
                  'dataList[0].avatar':res.data.data[0].avatar,
                  'dataList[0].openid':res.data.data[0].openid,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].name,
                  'dataList[0].desc':res.data.data[0].desc,
                  'dataList[0].cate':cate,
                  'dataList[0].qq':res.data.data[0].qq,
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
                console.log(cate)
                that.setData({
                  'dataList[1].endDate':res.data.data[1].endDate,
                  'dataList[1].address':res.data.data[1].address,
                  'dataList[1].avatar':res.data.data[1].avatar,
                  'dataList[1].openid':res.data.data[1].openid,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].nickname,
                  'dataList[1].desc':res.data.data[1].desc,
                  'dataList[1].qq':res.data.data[1].qq,
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
                console.log(cate)
                that.setData({
                  'dataList[2].endDate':res.data.data[2].endDate,
                  'dataList[2].address':res.data.data[2].address,
                  'dataList[2].avatar':res.data.data[2].avatar,
                  'dataList[2].openid':res.data.data[2].openid,
                  'dataList[2].ishas':true,
                  'dataList[2].qq':res.data.data[2].qq,
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

    tochat: function (res) {
      console.log(res)
      var that=this;
      var userinfo = res.currentTarget.dataset.userinfo;
      console.log(res.currentTarget.dataset.userinfo)
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

    watchdetail: function (res) {
      console.log(res.target.dataset.productid)
      wx.setStorageSync('id', res.target.dataset.productid)
      wx.navigateTo({
        url: '../fuwu_detail/fuwu_detail',
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

    switchChoices(event){
      console.log(event);
      this.setData({
        value1:event.detail
      })
      var that=this;
      wx.request({
          url: serverUrl+'/service/getAllService',
          data: {
              currentPage: 1,
              pageSize:3,
              parentCg: this.data.value1,
              sonCg: this.data.value2
          },
          method: 'POST',
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
                'dataList[2].ishas':false,
              })
            }
            if(res.data.data.length>=1){
              var cate=res.data.data[0].parentCg+"-"+res.data.data[0].sonCg
              that.setData({
                'dataList[0].endDate':res.data.data[0].endDate,
                'dataList[0].address':res.data.data[0].address,
                'dataList[0].avatar':res.data.data[0].avatar,
                'dataList[0].openid':res.data.data[0].openid,
                'dataList[0].ishas':true,
                'dataList[0].nickname':res.data.data[0].nickname,
                'dataList[0].desc':res.data.data[0].desc,
                'dataList[0].cate':cate,
                'dataList[0].qq':res.data.data[0].qq,
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
                'dataList[1].endDate':res.data.data[1].endDate,
                'dataList[1].address':res.data.data[1].address,
                'dataList[1].avatar':res.data.data[1].avatar,
                'dataList[1].openid':res.data.data[1].openid,
                'dataList[1].ishas':true,
                'dataList[1].nickname':res.data.data[1].nickname,
                'dataList[1].desc':res.data.data[1].desc,
                'dataList[1].cate':cate,
                'dataList[1].qq':res.data.data[1].qq,
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
                'dataList[2].endDate':res.data.data[2].endDate,
                'dataList[2].address':res.data.data[2].address,
                'dataList[2].avatar':res.data.data[2].avatar,
                'dataList[2].openid':res.data.data[2].openid,
                'dataList[2].ishas':true,
                'dataList[2].nickname':res.data.data[2].nickname,
                'dataList[2].desc':res.data.data[2].desc,
                'dataList[2].cate':cate,
                'dataList[2].qq':res.data.data[2].qq,
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
    },

    switchChoice2(event){
      console.log(event);
      this.setData({
        value2:event.detail
      })
      var that=this
      wx.request({
          url: serverUrl+'/service/getAllService',
          data: {
              currentPage: 1,
              pageSize:3,
              parentCg: this.data.value1,
              sonCg: this.data.value2
          },
          method: 'POST',
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
                'dataList[0].endDate':res.data.data[0].endDate,
                'dataList[0].address':res.data.data[0].address,
                'dataList[0].avatar':res.data.data[0].avatar,
                'dataList[0].openid':res.data.data[0].openid,
                'dataList[0].ishas':true,
                'dataList[0].nickname':res.data.data[0].nickname,
                'dataList[0].desc':res.data.data[0].desc,
                'dataList[0].cate':cate,
                'dataList[0].qq':res.data.data[0].qq,
                'dataList[1].ishas':false,
                'dataList[2].ishas':false,
                'dataList[0].id':id,
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
                'dataList[1].endDate':res.data.data[1].endDate,
                'dataList[1].address':res.data.data[1].address,
                'dataList[1].avatar':res.data.data[1].avatar,
                'dataList[1].openid':res.data.data[1].openid,
                'dataList[1].ishas':true,
                'dataList[1].nickname':res.data.data[1].nickname,
                'dataList[1].desc':res.data.data[1].desc,
                'dataList[1].cate':cate,
                'dataList[1].qq':res.data.data[1].qq,
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
                'dataList[2].endDate':res.data.data[2].endDate,
                'dataList[2].address':res.data.data[2].address,
                'dataList[2].avatar':res.data.data[2].avatar,
                'dataList[2].openid':res.data.data[2].openid,
                'dataList[2].ishas':true,
                'dataList[2].nickname':res.data.data[2].nickname,
                'dataList[2].desc':res.data.data[2].desc,
                'dataList[2].cate':cate,
                'dataList[2].qq':res.data.data[2].qq,
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

    buttonStart: function (e) {
      startPoint = e.touches[0]
      console.log(e.timeStamp)
      this.setData({
        time:e.timeStamp
      })

    },
    buttonMove: function (e) {
      var endPoint = e.touches[e.touches.length - 1]
      var translateX = endPoint.clientX - startPoint.clientX
      var translateY = endPoint.clientY - startPoint.clientY
      startPoint = endPoint
      var buttonTop = this.data.buttonTop + translateY
      var buttonLeft = this.data.buttonLeft + translateX
      if (buttonLeft+50 >= this.data.windowWidth){
        buttonLeft = this.data.windowWidth-50;
      }
      if (buttonLeft<=0){
        buttonLeft=0;
      }
      if (buttonTop<=0){
        buttonTop=0
      }
      if (buttonTop + 50 >= this.data.windowHeight){
        buttonTop = this.data.windowHeight-50;
      }
      this.setData({
        buttonTop: buttonTop,
        buttonLeft: buttonLeft
      })
    },
    buttonEnd: function (e) {
      console.log(e.timeStamp)
      if(e.timeStamp<this.data.time+300){
        wx.redirectTo({
          url: '../fuwu/fuwu',
        })
      }      
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
        wx.request({
            url: serverUrl+'/service/getAllService',
            data: {
                currentPage: this.data.nowpage,
                pageSize:3,
                parentCg: this.data.value1,
                sonCg: this.data.value2
            },
            method: 'POST',
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
                  'dataList[0].endDate':res.data.data[0].endDate,
                  'dataList[0].address':res.data.data[0].address,
                  'dataList[0].avatar':res.data.data[0].avatar,
                  'dataList[0].openid':res.data.data[0].openid,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].nickname,
                  'dataList[0].desc':res.data.data[0].desc,
                  'dataList[0].cate':cate,
                  'dataList[0].qq':res.data.data[0].qq,
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
                  'dataList[1].endDate':res.data.data[1].endDate,
                  'dataList[1].address':res.data.data[1].address,
                  'dataList[1].avatar':res.data.data[1].avatar,
                  'dataList[1].openid':res.data.data[1].openid,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].nickname,
                  'dataList[1].desc':res.data.data[1].desc,
                  'dataList[1].cate':cate,
                  'dataList[1].qq':res.data.data[1].qq,
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
                  'dataList[2].endDate':res.data.data[2].endDate,
                  'dataList[2].address':res.data.data[2].address,
                  'dataList[2].avatar':res.data.data[2].avatar,
                  'dataList[2].openid':res.data.data[2].openid,
                  'dataList[2].ishas':true,
                  'dataList[2].nickname':res.data.data[2].nickname,
                  'dataList[2].desc':res.data.data[2].desc,
                  'dataList[2].cate':cate,
                  'dataList[2].qq':res.data.data[2].qq,
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
        wx.request({
            url: serverUrl+'/service/getAllService',
            data: {
                currentPage: this.data.nowpage,
                pageSize:3,
                parentCg: this.data.value1,
                sonCg: this.data.value2
            },
            method: 'POST',
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
                  'dataList[0].endDate':res.data.data[0].endDate,
                  'dataList[0].address':res.data.data[0].address,
                  'dataList[0].avatar':res.data.data[0].avatar,
                  'dataList[0].openid':res.data.data[0].openid,
                  'dataList[0].ishas':true,
                  'dataList[0].nickname':res.data.data[0].nickname,
                  'dataList[0].desc':res.data.data[0].desc,
                  'dataList[0].cate':cate,
                  'dataList[0].qq':res.data.data[0].qq,
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
                  'dataList[1].endDate':res.data.data[1].endDate,
                  'dataList[1].address':res.data.data[1].address,
                  'dataList[1].avatar':res.data.data[1].avatar,
                  'dataList[1].openid':res.data.data[1].openid,
                  'dataList[1].ishas':true,
                  'dataList[1].nickname':res.data.data[1].nickname,
                  'dataList[1].desc':res.data.data[1].desc,
                  'dataList[1].cate':cate,
                  'dataList[1].qq':res.data.data[1].qq,
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
                  'dataList[2].endDate':res.data.data[2].endDate,
                  'dataList[2].address':res.data.data[2].address,
                  'dataList[2].avatar':res.data.data[2].avatar,
                  'dataList[2].openid':res.data.data[2].openid,
                  'dataList[2].ishas':true,
                  'dataList[2].nickname':res.data.data[2].nickname,
                  'dataList[2].desc':res.data.data[2].desc,
                  'dataList[2].qq':res.data.data[2].qq,
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
})