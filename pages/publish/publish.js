// pages/publish/publish.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
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
          { text: '租借', value: 0 },
          { text: '代做', value: 1 },
          { text: '设计', value: 2 },
          { text: '陪+', value: 3 },
          { text: '开发', value: 4 },
        ],
        option2: [
          { text: '服饰', value: 'a' },
          { text: '电子设备', value: 'b' },
          { text: '运动设备', value: 'c' },
          { text: '账号', value: 'd' },
          { text: '其他', value: 'e' },
        ],
        option3:[
          { text: '代取', value: 'a' },
          { text: '代打印', value: 'b' },
          { text: '取快递', value: 'c' },
          { text: '其他', value: 'd' },
        ],
        option4:[
          { text: '音视频', value: 'a' },
          { text: '图片', value: 'b' },
          { text: '文字', value: 'c' },
          { text: '摄影', value: 'd' },
          { text: '图画', value: 'e' },
          { text: '其他', value: 'f' },
        ],
        option5:[
          { text: '陪同', value: 'a' },
          { text: '其他', value: 'b' },
        ],
        option6:[
          { text: '网页开发', value: 'a' },
          { text: '编程与软件', value: 'b' },
          { text: '算法分析', value: 'c' },
          { text: '其他', value: 'd' },
        ],
        value1: 0,
        value2: 'a',
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
                regular: '^.{5,200}$',
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
            isRequired: false,
            submitcheck:false,
            fileList: [
              // { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' }//初始图片
            ]
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
                regular: '^\\S*$',//正则字符串
                tips: '不能有空格'//错误提示
              },
            ]
          },
          {
            type: 'input',
            id:'QQNumber',
            lable:'联系人QQ号',
            isRequired: false,//是否必填
            maxLength: 20,//最大长度
            defaultValue:'',//初始值
            rules:[//规则验证数组
              {
                regular: '^\\S*$',//正则字符串
                tips: '不能有空格'//错误提示
              },
            ]
          },
          {
            type: 'input',
            id:'money',
            lable:'预算',
            isRequired: true,//是否必填
            maxLength: 10,//最大长度
            defaultValue:'',//初始值
            rules:[//规则验证数组
              {
                regular: '^\\S*$',//正则字符串
                tips: '不能有空格'//错误提示
              },
            ]
          },{
          type: 'date',
          id: 'timePicker',
          lable: '日期',
          isRequired: true,
          /* 显示完整时间包含时分秒；当使用endDate的时候关闭,不要同时打开, 否则日期将会换行；
             与config中的colum属性共同设置
          */
          // completeTime:true, //显示完整时间, 包含时分秒
          config: {
            endDate: true,
            dateLimit: true,
            // initStartTime: "2020-01-01 12:32:44",
            // initEndTime: "2020-12-01 12:32:44",
            column: "day",//day、hour、minute、secend
            limitStartTime: "2000-01-01 00:00:59",
            limitEndTime: "2100-01-01 00:00:59"
          }
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
    // onFormSubmit(e){
    //   console.log('表单提交: ', e);
    // },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // const db = wx.cloud.database();
      // db.collection('user').get({
      //   success(res){
      //     console.log(res);
      //   }
      // })
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

    to_demand: function (options) {
      wx.navigateTo({
            url: '../demand/demand'
      })  
    },

    to_fuwu: function (options) {
      wx.navigateTo({
            url: '../fuwu/fuwu'
      })  
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
        submitobject["serviceType"] = this.data.value1;
        submitobject["service"] = this.data.value2;
        submitobject["door"] = this.data.door;
        console.log(submitobject);
        if(this.data.submitcheck){
          console.log('表单提交: ', submitobject);
          console.log(this.data.value1)
          console.log(this.data.value2)
        }
        
      },
      onFormChange(e){ //表单变化
        console.log('表单变化: ',e);
      }
});