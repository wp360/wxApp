// miniprogram/pages/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    testData: 0,
    testObj: {
      name: 'haidebaozi',
      age: 32
    }
  },
  // 两个方法调用同一个云函数
  // 获取音乐信息
  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'music'
      }
    }).then((res) =>{
      console.log(res)
    })
  },
  // 获取电影信息
  getMovieInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then((res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用此方法需要已经授权，否则无效
    wx.getUserInfo({
      complete: (res) => {
        console.log(res)
      }
    })
    // setData
    console.log('testData 开始：' + this.data.testData)
    this.setData({
      testData: 1
    }, () => {
      console.log('回调执行')
    })
    console.log('testData 设置后：' + this.data.testData)
  },

  onGetUserInfo(event) {
    console.log(event)
  },

  getOpenId() {
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      console.log(res)
    })
  },

  // 点击增加数值
  add() {
    this.setData({
      num: this.data.num + 1
    })
  },

  //点击更新年龄
  changeAge() {
    this.setData({
      // testObj: {
      //   age: 33
      // }
      ['testObj.age']: 33
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

  }
})