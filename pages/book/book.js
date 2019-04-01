// pages/book/book.js
import { BookModel } from '../../models/book'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
    // callback
    // promise
    // async await ES2017 小程序目前不支持
    // 一次调用 多次调用服务器API 链式调用 3个API API1 API2 API3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 正确用法
    bookModel.getHotList()
      .then(res => {
        // console.log(res)
        this.setData({
          books: res
        })
        // this.data.books = res
      })
    // Promise 对象 函数
    // 对象 保持状态 函数
    // Promise 第一步
    // 异步代码 写在Promise的函数中 第二步
    // const promise = new Promise((resolve,reject)=>{
    //   // pending 进行中 fulfilled 已成功 rejected 已失败
    //   // 小程序获取系统信息的函数（异步）
    //   wx.getSystemInfo({
    //     success: (res)=> {
    //       resolve(res)
    //     },
    //     fail: (error)=> {
    //       reject(error)
    //     }
    //   })
    // })

    // promise.then((res)=>{
    //   console.log(res)
    // },(error)=>{
    //   console.log(error)
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

  }
})