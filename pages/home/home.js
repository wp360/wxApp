// pages/home/home.js
// const ajax = require('../../utils/ajax.js');
// const utils = require('../../utils/util.js');
import ajax from '../../utils/ajax';
import utils from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbars: null,
    currentTab: 0
  },
  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //加载navbar导航条
    that.navbarShow();
  },
  // ajax获取导航数据
  navbarShow: function (success) {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/navBar?key=' + utils.key,
      success: data => {
        that.setData({
          navbars: data.result
        })
        console.log(data.result)
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

  }
})