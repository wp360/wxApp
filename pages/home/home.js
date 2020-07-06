// pages/home/home.js
// 导入配置文件
// import {config} from '../../config/config'
import {Theme} from '../../model/theme'
import {Banner} from '../../model/banner'
import {Category} from '../../model/category'
import {Activity} from '../../model/activity'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    bannerB: null,
    grid: [],
    activity: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.initAllData()
  },

  /**
   * 初始化全部数据
   */
  async initAllData() {
    // 首页头部专题
    // const themeA = await Theme.getHomeLocationA()
    // 获取全部专题数据
    const theme = new Theme()
    await theme.getThemes()
    const themeA = await theme.getHomeLocationA()
    // 每周上新
    const themeE = await theme.getHomeLocationE()
    // 首页轮播数据
    const bannerB = await Banner.getHomeLocationB()
    // 六宫格
    const grid = await Category.getGridCategory()
    // 优惠券
    const activity = await Activity.getHomeActivity()
    this.setData({
      // themeA: themeA[0],
      themeA,
      themeE,
      bannerB,
      grid,
      activity
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