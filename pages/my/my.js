// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
        // console.log(data)
        if(data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data)
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },
  getUserInfo(event) {
    // console.log(event)
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    console.log(userInfo)
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