// pages/wx_login/wx_login.js
const app = getApp()
var serverUrl = app.globalData.serverUrl
Page({
    data: {},

    onLoad() {},

    login() {
        var userName = ""
        var avatarUrl = ""
        wx.getUserProfile({
            desc: '必须授权才能使用',
            success: res => {
                let user = res.userInfo;
                app.globalData.userInfo = user;
                userName = user.nickName;
                avatarUrl = user.avatarUrl;
                console.log(user)
                wx.login({
                    success(res) {
                        wx.request({
                            url: serverUrl + '/user/login',
                            data: {
                                code: res.code,
                                nickname: userName,
                                avatar: avatarUrl
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/json;charset=utf-8'
                            },
                            success: function(res) {
                                console.log(res.data)
                                wx.setStorageSync('openid', res.data)
                                wx.switchTab({
                                    url: "../homepage/homepage"
                                })
                            },
                            fail: function(err) {
                                wx.showToast({
                                    title: '...',
                                    icon: '😭',
                                    duration: 2000
                                })
                            }
                        })
                    },
                    fail: function(err) {}
                })
            },
            fail: function(err) {}
        })
    }
})
