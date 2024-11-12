const util = require("../utils.js")
const websocket = require("../websocket.js")

// pages/chat/chat.js
const app = getApp()
var serverUrl=app.globalData.serverUrl;
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friend_nickName: '',
        newsList: [],
        sendList: [],
        listList: [],
        userInfo: [],
        friendInfo: [],
        user_openid: '',
        friend_openid: '',
        scrollTop: 0,
        increase: false, //图片添加区域隐藏
        aniStyle: true, //动画效果
        message: "",
        previewImgList: [],
        imgLink: "",
        scrollHeight: '100vh',
        infoNumPerPage: 10,
        currentLength: 0,
        maxLength: 0,
        newsLength: 0,
        currentPage: 0,
        firstLoad: true,
        atBottom: true,
        interval: setInterval(
          function () {

          },
          100000
        ),
    },

    // 连接

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        var that=this;
        that.attached();
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('acceptDataFromOpenerPage', function (data){
          that.setData({friendInfo: data.data});
          that.setData({friend_openid: data.data.openid});
          that.setData({friend_nickName: data.data.nickname})
          if (app.globalData.userInfo) {
            that.setData({ userInfo: app.globalData.userInfo })
            that.setData({user_openid: wx.getStorageSync('openid')})
          }
          wx.setNavigationBarTitle({
            title: that.data.friend_nickName
          })
          wx.request({
            url: serverUrl+'/chat/getRecord',
            data: {
              A_openid: that.data.user_openid,
              B_openid: that.data.friend_openid,
            },
            method: 'GET',
            header: {
              "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (res) {
              console.log(res);
              var tempList=res.data.data;
              console.log(tempList);
              for(var each of tempList){
                each.date=util.timeFormat(each.date);
              }
              console.log(tempList);
              that.data.maxLength=tempList.length;
              var li = [];
              var cur=that.data.currentLength;
              for(var i=cur+1;i<=that.data.maxLength&&i<=cur+that.data.infoNumPerPage;i++){
                li.push(tempList[that.data.maxLength-i]);
                that.data.currentLength++;
              }
              li.reverse();
              if(tempList.length%that.data.infoNumPerPage){
                var maxPage=(tempList.length-tempList.length%that.data.infoNumPerPage)/that.data.infoNumPerPage+1;
              }
              else{
                var maxPage=tempList.length/that.data.infoNumPerPage;
              }
              for(var i=0;i<=maxPage+1;i++){
                that.data.listList.push([]);
              }
              that.data.newsList=tempList;
              that.data.currentPage=maxPage;
              that.data.newsLength=tempList.length;
              that.setData({
                ["listList["+maxPage+"]"]: li
              })
              that.data.currentPage--;
              that.bottom();
              that.data.interval=setInterval(
                function () {
                  wx.request({
                    url: serverUrl+'/chat/getRecord',
                    data: {
                      A_openid: that.data.user_openid,
                      B_openid: that.data.friend_openid,
                    },
                    method: 'GET',
                    header: {
                      "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (res) {
                      var tempList=res.data.data;
                      var len=that.data.newsLength;
                      var li = that.data.listList[that.data.listList.length-1];
                      if(len<tempList.length){
                        if(li.length>=that.data.infoNumPerPage){
                          that.data.listList.push([]);
                          li = [];
                        }
                        for(var i=len;i<tempList.length;i++){
                          tempList[i].date=util.timeFormat(tempList[i].date);
                          li.push(tempList[i]);
                          that.data.newsLength++;
                        }
                        that.setData({
                          ["listList["+(that.data.listList.length-1)+"]"]: li,
                        })
                        if(that.data.atBottom) that.bottom();
                      }
                    }
                  })
                  console.log("success!")
                },
                2000
              )
            }
          })
          console.log(that.data);
        })
    },

    // navigateBar

    attached: function attached() {
      var _this = this;
      var isSupport = !!wx.getMenuButtonBoundingClientRect;
      var rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
      wx.getSystemInfo({
        success: function success(res) {
          var ios = !!(res.system.toLowerCase().search('ios') + 1);
          _this.setData({
            ios: ios,
            statusBarHeight: res.statusBarHeight,
            innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
            innerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
            leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
          });
        }
      });
    },

    back: function back() {
      console.log("back")
      clearInterval(this.data.interval);
      wx.navigateBack({
        delta: 1
      }).then(res => {
        // console.log(res)
      }).catch(err => {
        // 如果报错，说明是通过二维码或者分享进入的，直接返回首页
        wx.reLaunch({
          url: '../index/index',
        })
      })
    },


    topLoad: function (res) {
      var that = this;
      var newList = [];
      var cur = that.data.currentLength;
      console.log(this.data);
      that.data.atBottom = false;
      if(that.data.currentLength==that.data.maxLength){
        return;
      }
      for(var i=cur+1;i<=cur+that.data.infoNumPerPage&&i<=that.data.maxLength;i++){
        newList.push(that.data.newsList[that.data.maxLength-i])
        that.data.currentLength++;
      }
      newList.reverse();
      that.setData({
        ["listList["+that.data.currentPage+"]"]: newList
      })
      that.data.currentPage--;
    },

    toBottom: function (res) {
      this.data.atBottom = true;
    },

    bindInput: function (e) {
      var that=this;
      that.setData({message: e.detail.value});
    },

    focus: function(e) {
      var keyHeight = e.detail.height;
      this.setData({
        scrollHeight: (windowHeight - keyHeight) + 'px'
      });
      this.setData({
        inputBottom: keyHeight + 'px'
      })
      //计算msg高度
      // calScrollHeight(this, keyHeight);
  
    },

      //失去聚焦(软键盘消失)
    blur: function(e) {
      this.setData({
        scrollHeight: '100vh',
        inputBottom: 0
      })
    },

    send: function() {
      
        var that = this
        if (that.data.message === "") {
            wx.showToast({
                title: "不能为空！",
                icon: "error",
                duration: 2000
            })
        } else {
            setTimeout(
              function () {
                that.setData({ increase: false })
              },
              500
            )
            wx.request({
              url: serverUrl+'/chat/send',
              data: {
                "a_openid": that.data.user_openid,
                "b_openid": that.data.friend_openid,
                "content": that.data.message,
                "type": "text"
              },
              method: 'POST',
              header: {
                'content-type': 'application/json;charset=utf-8'
              },
              success: function (res) {
                wx.request({
                  url: serverUrl+'/chat/getRecord',
                  data: {
                    A_openid: that.data.user_openid,
                    B_openid: that.data.friend_openid,
                  },
                  method: 'GET',
                  header: {
                    "Content-Type":"application/json;charset=UTF-8"
                  },
                  success: function (res) {
                    var tempList=res.data.data;
                    for(var each of tempList){
                      each.date=util.timeFormat(each.date);
                    }
                    that.data.newsList.push(tempList[tempList.length-1]);
                    that.data.sendList.push(tempList[tempList.length-1]);
                    var li = that.data.listList[that.data.listList.length-1];
                    li.push(tempList[tempList.length-1]);
                    that.setData({
                      message: '',
                      ["listList["+(that.data.listList.length-1)+"]"]: li,
                    });
                    that.data.newsLength++;
                    that.data.atBottom = true;
                    that.bottom();
                  }
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '😭',
                  icon: '...',
                  duration: 2000
                })
              }
            })
            console.log(that.data.newsList);
            that.setData({message: ""})
            
        }

    },

    bindChange: function(res) {
        this.setData({
            message: res.detail.value
        })
    },

    cleanInput() {
        //button会自动清空，所以不能再次清空而是应该给他设置目前的input值
        this.setData({
            message: this.data.message
        })
    },

    increase() {
        this.setData({
            increase: true,
            aniStyle: true
        })
    },

    outbtn() {
        this.setData({
            increase: false,
            aniStyle: true
        })
    },


    /**
     * 选择图片
     */
    chooseImg: function() {
        var that = this;
        wx.chooseImage({
            count: 1,
            success: function(res) {
                var paths = res.tempFilePaths[0];
                console.log(res);
                wx.uploadFile({
                  url: serverUrl+'/file/upload', //仅为示例，非真实的接口地址
                  filePath: paths,
                  name: "file",
                  header: {
                  "Content-Type": "multipart/form-data"
                  },
                  success: function (res) {
                    console.log(res.data)
                    that.setData({imgLink: res.data});
                    console.log(that.data.imgLink)
                    wx.request({
                      url: serverUrl+'/chat/send',
                      data: {
                        "a_openid": that.data.user_openid,
                        "b_openid": that.data.friend_openid,
                        "content": that.data.imgLink,
                        "type": "image"
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/json;charset=utf-8'
                      },
                      success: function (res) {
                        wx.request({
                          url: serverUrl+'/chat/getRecord',
                          data: {
                            A_openid: that.data.user_openid,
                            B_openid: that.data.friend_openid,
                          },
                          method: 'GET',
                          header: {
                            "Content-Type":"application/json;charset=UTF-8"
                          },
                          success: function (res) {
                            var tempList=res.data.data;
                            for(var each of tempList){
                              each.date=util.timeFormat(each.date);
                            }
                            that.data.newsList.push(tempList[tempList.length-1]);
                            that.data.sendList.push(tempList[tempList.length-1]);
                            var li = that.data.listList[that.data.listList.length-1];
                            li.push(tempList[tempList.length-1]);
                            that.setData({
                              message: '',
                              ["listList["+(that.data.listList.length-1)+"]"]: li,
                            });
                            that.data.newsLength++;
                            that.data.atBottom = true;
                            that.bottom();
                          }
                        })
                      },
                      fail: function (res) {
                        wx.showToast({
                          title: '😡',
                          icon: '...',
                          duration: 2000
                        })
                      }
                    })
                  }
                })
            },
        })
    },

    previewImg(e){
        var that = this
        console.log(e)
        //必须给对应的wxml的image标签设置data-set=“图片路径”，否则接收不到
        var res = e.target.dataset.src
        var list = this.data.previewImgList //页面的图片集合数组

        //判断res在数组中是否存在，不存在则push到数组中, -1表示res不存在
        if (list.indexOf(res) == -1 ) {
            this.data.previewImgList.push(res)
        }
        wx.previewImage({
          current: res, // 当前显示图片的http链接
          urls: that.data.previewImgList // 需要预览的图片http链接列表
        })

    },

    bottom: function() {
      var that=this;
      wx.createSelectorQuery().select('.history-msg').boundingClientRect(function(rect){
        console.log(rect);
        that.setData({scrollTop: 10000000});
      }).exec();
      
    },

    clear: function () {
      var that=this;
      wx.request({
        url: serverUrl+'/chat/clear',
        data: {
          "A_openid": that.data.user_openid,
          "B_openid": that.data.friend_openid,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        success: function () {
        }
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      var that=this;
      if(that.data.firstLoad){
        that.data.firstLoad=false;
        return;
      }
      that.data.interval=setInterval(
        function () {
          wx.request({
            url: serverUrl+'/chat/getRecord',
            data: {
              A_openid: that.data.user_openid,
              B_openid: that.data.friend_openid,
            },
            method: 'GET',
            header: {
              "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (res) {
              var tempList=res.data.data;
              var len=that.data.newsLength;
              var li = that.data.listList[that.data.listList.length-1];
              if(len<tempList.length){
                console.log("add");
                if(li.length>=that.data.infoNumPerPage){
                  that.data.listList.push([]);
                  li = [];
                }
                for(var i=len;i<tempList.length;i++){
                  if(li.length>=that.data.infoNumPerPage){
                    that.setData({
                      ["listList["+(that.data.listList.length-1)+"]"]: li,
                    })
                    that.data.listList.push([]);
                    li = [];
                  }
                  tempList[i].date=util.timeFormat(tempList[i].date);
                  li.push(tempList[i]);
                  that.data.newsLength++;
                }
                that.setData({
                  ["listList["+(that.data.listList.length-1)+"]"]: li,
                })
                if(that.data.atBottom) that.bottom();
              }
            }
          })
          console.log("success!")
        },
        2000
      )
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
      var that=this;
      clearInterval(that.data.interval);
      console.log("back");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
      clearInterval(this.data.interval);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})

function connect(user, func) {
  var that =this

    wx.connectSocket({
        url: url,
        header: { 'content-type': 'application/json' },
        success: function() {
            console.log("KLEE: Success!")
        },
        fail: function() {
            console.log("KLEE: 😭😭😭")
        }
    });

    wx.onSocketOpen(
        function() {
            wx.showToast({
                title: "Connect!",
                icon: "Success",
                duration: 2000
            });
            wx.onSocketMessage(func);
        }
    );

    wx.onSocketError(
        function() {
        }
    )
}


function scrollToBottom() {
  wx.createSelectorQuery().select('.flag').boundingClientRect(function(rect){
    // 使页面滚动到底部
    console.log(rect)
    wx.pageScrollTo({
      scrollTop: rect.height
    })
  }).exec()
}
