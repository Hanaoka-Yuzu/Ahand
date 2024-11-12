// pages/fuwu/fuwu.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp();
var serverUrl = app.globalData.serverUrl
var testUrl=app.globalData.testUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showPage:0,
        result:[],
        activeNames:[],
        value:'',
        username:'',
        password:'',
        door:'1',
        show:false,
        option1: [
          { text: '租借', value: 1 },
          { text: '代做', value: 2 },
          { text: '设计', value: 3 },
          { text: '陪+', value: 4 },
          { text: '开发', value: 5 },
        ],
        option2: [
          { text: '服饰', value: 1 },
          { text: '电子设备', value: 2 },
          { text: '运动设备', value: 3 },
          { text: '账号', value: 4 },
          { text: '其他', value: 5 },
        ],
        option3:[
          { text: '代取', value: 1 },
          { text: '代打印', value: 2 },
          { text: '取快递', value: 3 },
          { text: '其他', value: 4 },
        ],
        option4:[
          { text: '音视频', value: 1 },
          { text: '图片', value: 2 },
          { text: '文字', value: 3 },
          { text: '摄影', value: 4 },
          { text: '图画', value: 5 },
          { text: '其他', value: 6 },
        ],
        option5:[
          { text: '陪同', value: 1 },
          { text: '其他', value: 2 },
        ],
        option6:[
          { text: '网页开发', value: 1 },
          { text: '编程与软件', value: 2 },
          { text: '算法分析', value: 3 },
          { text: '其他', value: 4 },
        ],
        value1: 1,
        value2: 1,
        formData:[
          {
            type: 'textarea',
            id: 'textarea1',
            lable: '描述',
            isRequired: true,
            maxLength: 200,
            // defaultValue: '初始值',
            placeholder:'请输入描述',
            rules: [
              {
                regular: '^[\\s\\S]{5,200}$',
                tips: '请输入5-200位以内字符'
              }
            ]
          },
          {
            type: 'file',
            accept: 'image',
            id: 'pics',
            lable: '图片上传',
            maxCount: 5,
            maxSize: 5,
            isRequired: true,
            submitcheck:false,
            fileList: []
          },
          {
            type: 'input',
            id:'name',
            lable:'联系人姓名',
            isRequired: true,//是否必填
            maxLength: 10,//最大长度
            defaultValue:'',//初始值
            rules:[//规则验证数组
              {
                regular: '^\\D*$',//正则字符串
                tips: '请输入正确的姓名'//错误提示
              },
            ]
          },
          {
            type: 'input',
            id:'QQNumber',
            lable:'联系人QQ号',
            isRequired: true,//是否必填
            maxLength: 20,//最大长度
            defaultValue:'',//初始值
            rules:[//规则验证数组
              {
                regular: '^[1-9][0-9]{4,11}$',//正则字符串
                tips: '请输入正确的qq号'//错误提示
              },
            ]
          },
        {
          type: 'input',
          id:'address',
          lable:'地址',
          isRequired: true,//是否必填
          maxLength: 10,//最大长度
          defaultValue:'',//初始值
          rules:[//规则验证数组
            {
              regular: '^\\S*$',//正则字符串
              tips: '不能有空格'//错误提示
            },
          ]
        },
        ],
        toSubmit: Math.random(),
        
        
    },
    toSubmitChange(){
      this.setData({
        submitcheck: true,
        toSubmit: Math.random()
      })
    },


    tocancel(){
      wx.switchTab({
        url: '../serve/serve',
      })
    },

    // onFormSubmit(e){
    //   console.log('表单提交: ', e);
    // },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
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

    onChange(event) {
        this.setData({
          door: event.detail,
        });
        // console.log(this.data.door)
      },
      onChangeCollapse(event){
          this.setData({
              activeNames:event.detail,
          })
      },
      onChangeText(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
      },
      showPopup() {
        this.setData({ show: true });
      },
    
      onClose() {
        this.setData({ show: false });
      },
      switchChoices(event){
        // console.log(event);
        this.setData({
          value1:event.detail
        })
      },

      switchChoice(event){
        // console.log(event);
        this.setData({
          value2:event.detail
        })
      },
      switchPages(event){
        this.setData({
          showPage:event.target.dataset.page
        })
      },
      backToChoose(){ //回到选择页面
        this.setData({
          showPage:0,
        })
      },
      onFormSubmit(e){ //提交
        let submitobject = e.detail;
        console.log(submitobject);
        if(this.data.submitcheck){
          var picture=new Array()
          for(let i=0;i<submitobject.pics.list.length;i++){
            picture[i]=submitobject.pics.list[i].path
          }
          console.log(picture)
          var openid=wx.getStorageSync('openid')
          console.log(this.data.value1)
          console.log(this.data.value2)
          wx.request({
            url:  serverUrl+'/service/release',
            data: {
                openid:openid,
                parentCg:this.data.value1,
                sonCg:this.data.value2,
                qq:submitobject.QQNumber.value,
                address:submitobject.address.value,
                name:submitobject.name.value,
                desc:submitobject.textarea1.value,
              },
              method: 'POST',
              header: {
                "Content-Type":"application/json;charset=UTF-8"
              },
              success: function (res) {
                console.log(res)
                console.log(res)
                var newid=res.data.data
                console.log(newid)
                for(let i=0;i<submitobject.pics.list.length;i++){
                  wx.uploadFile({
                    url: serverUrl+'/service/upload?id='+newid , //仅为示例，非真实的接口地址
                    filePath: picture[i],
                    name: "file",
                    header: {
                    "Content-Type": "multipart/form-data"
                    },
                    success: function (res) {
                      var data = res.data
                      console.log(data)
                    }
                  })
                }
              },
              fail:function(err){ 
              }
            })  
            wx.showToast({
              title: '发布成功！',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function(){
              wx.switchTab({
                url: '../serve/serve'
              })  
              },1000)
            }
      },
      onFormChange(e){ //表单变化
        console.log('表单变化: ',e);
      }
});