// pages/my/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    currentTab: 0,  //初始化currentTab=0
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: './images/personal_pay.png',
      },
      {
        typeId: 1,
        name: '待收货',
        url: 'bill',
        imageurl: './images/personal_receipt.png',
      },
      {
        typeId: 2,
        name: '待评价',
        url: 'bill',
        imageurl: './images/personal_comment.png'
      },
      {
        typeId: 3,
        name: '退换/售后',
        url: 'bill',
        imageurl: './images/personal_service.png'
      }
    ]
  },
  //事件处理函数
  toOrder: function () {
    // wx.navigateTo({
    //   url: '../order/order'
    // })
    wx.showToast({
      title: '我的订单（待开发）',
      icon: 'success',
      duration: 3000
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 旧的获取用户信息方法 wx.getUserInfo 授权弹窗
    // wx.getUserInfo({
    //   success: data => {
    //     console.log(data)
    //   }
    // })
    this.userAuthorized() 
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              // console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },
  getUserInfo(event) {
    console.log(event)
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    // console.log(userInfo)
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },
  // onJumpToAbout(event) {
  //   wx.navigateTo({
  //     url: '/pages/about/about'
  //   })
  // },
  // onStudy(event) {
  //   wx.navigateTo({
  //     url: '/pages/course/course'
  //   })
  // },
  myAddress: function (e) {
    wx.navigateTo({
      url: '../addressList/addressList'
    });
  },
  tap() {
    console.log('tap')
  },
  //第1个按钮点击事件，修改currentTab值
  tap0: function (event) {
    this.setData({
      currentTab: 0
    });
  },
  // 第2个按钮点击事件，修改currentTab值
  tap1: function (event) {
    this.setData({
      currentTab: 1
    });
  },
  // 第3个按钮点击事件，修改currentTab值
  tap2: function (event) {
    this.setData({
      currentTab: 2
    });
  },
  // 第4个按钮点击事件，修改currentTab值
  tap3: function (event) {
    this.setData({
      currentTab: 3
    });
  },
  // swiper滑动事件，修改currentTab值，实现切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
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