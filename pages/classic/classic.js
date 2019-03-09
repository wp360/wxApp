// pages/classic/classic.js
// import {HTTP} from '../../util/http.js'
// let http = new HTTP()

import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    test: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLastest((res) => {
      console.log(res)
      this.setData({
        classic: res
      })
    })
    // console.log(this.data.test)
    // http.request({
    //   url: 'classic/latest',
    //   success: (res)=> {
    //     console.log(res)
    //   }
    // })

    // let that = this
    // let data = wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header: {
    //     appkey: 'K5H3SiFRY9qLzs0n'
    //   },
    //   success: function(res) {
    //     console.log(res)
    //     console.log(that.data.test)
    //   }
    // })
    // let data = wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header: {
    //     appkey: 'K5H3SiFRY9qLzs0n'
    //   },
    //   success: (res) => {
    //     console.log(this.data.test)
    //   }
    // })
  },
  onLike: function(event) {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
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