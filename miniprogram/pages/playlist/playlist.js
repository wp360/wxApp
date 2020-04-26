// miniprogram/pages/playlist/playlist.js
const MAX_LIMIT = 15
// 读取数据库
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // openid: ''
    swiperImgUrls: [
      // {
      //   url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      // },
      // {
      //   url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      // },
      // {
      //   url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      // }
    ],
    playlist: [
    // {
    //   _id: '0001',
    //   type: 0,
    //   trackCount: 158,
    //   playCount: 1574200.8,
    //   picUrl: 'http://p1.music.126.net/Y8-nWjELf_ks3BqZy9VOoA==/109951164499838427.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
    //   name: '坐上时光机，带你一起回到小时候',
    //   id: 2794772630,
    //   highQuality: false,
    //   createTime: '',
    //   copywriter: '热门推荐'
    // },
    // {
    //   _id: '0002',
    //   type: 0,
    //   trackCount: 166,
    //   playCount: 7874200.8,
    //   picUrl: 'http://p1.music.126.net/zHqWDK9RbK3vej3-w8iBvw==/109951164507437511.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
    //   name: '当城市坠入R&B·月亮奔向New Wave',
    //   id: 2794772633,
    //   highQuality: false,
    //   createTime: '',
    //   copywriter: '热门推荐'
    // },
    // {
    //   _id: '0003',
    //   type: 0,
    //   trackCount: 177,
    //   playCount: 1874200.8,
    //   picUrl: 'http://p1.music.126.net/P347rpSGpaP4DoKbZ6Gyiw==/109951164499552611.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp',
    //   name: '『好听的翻唱Cover集』',
    //   id: 2794772633,
    //   highQuality: false,
    //   createTime: '',
    //   copywriter: '热门推荐'
    // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取openid
    // wx.cloud.callFunction({
    //   name: 'login'
    // }).then((res) => {
    //   console.log(res)
    //   this.setData({
    //     openid: res.result.openid
    //   })
    // })
    this._getPlaylist()
    // 轮播图
    this._getSwiper()
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
    this.setData({
      playlist: []
    })
    this._getPlaylist()
    this._getSwiper()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getPlaylist () {
    // Loading加载
    wx.showLoading({
      title: '加载中...'
    })
    // 调用云函数
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
      // 去除loading
      wx.hideLoading()
    })
  },
  /**
   * 轮播图
   */
  _getSwiper() {
    db.collection('swiper').get()
      .then((res) => {
        this.setData({
          swiperImgUrls: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
})