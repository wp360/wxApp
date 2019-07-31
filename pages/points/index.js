// pages/points/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointsImgUrls: [
      '//s0.feiheimg.com//ImgAdItem/n30/tfs/2019/04/30/7a9f1287-3396-46c9-93f3-0342d3f59483.jpg',
      '//s0.feiheimg.com//ImgAdItem/n28/tfs/2019/04/28/737ce891-1043-4c57-b968-bbc7968d6230.png',
      '//s0.feiheimg.com//ImgAdItem/n6/tfs/2019/03/06/a8dc3afa-62a8-4e04-9539-909e1294c94d.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    pointsList: [
      {
        point_id: 1,
        title: '母婴爆品',
        data: [
          {
            url: "/pages/shop-cart/index",
            image: "http://s0.feiheimg.com//n14/tfs/2017/11/14/ItemProImg/1994e78b-e734-4f4d-8ef6-d6fd17f0919f.jpg_240x240.jpg",
            point: '2500',
            price: '150.00',
            text: "柔薄瞬爽纸尿裤L号34片"
          }
        ]
      },
      {
        point_id: 2,
        title: '超值好货',
        data: [
          {
            url: "/pages/shop-cart/index",
            image: "http://s0.feiheimg.com//ItemProImg/n25/tfs/2018/09/25/24842634-485f-40f7-a112-1f666b45e5fe.jpg_240x240.jpg",
            point: '17999',
            price: '438.00',
            text: "【专柜款】小龙哈彼自行车"
          },
          {
            url: "/pages/shop-cart/index",
            image: "http://s0.feiheimg.com//ItemProImg/n22/tfs/2018/08/22/9ba68b7b-2b3f-4c60-aa4e-67cf06849369.jpg_240x240.jpg",
            point: '14900',
            price: '490.00',
            text: "保时捷滑行车"
          },
          {
            url: "/pages/shop-cart/index",
            image: "http://s0.feiheimg.com//ItemProImg/n30/tfs/2018/11/30/3bcd39e5-375a-4da5-b17a-53d7e4dee8ff.jpg_240x240.jpg",
            point: '17900',
            price: '599.00',
            text: "贝恩施双面磁性画板"
          },
          {
            url: "/pages/shop-cart/index",
            image: "http://s0.feiheimg.com//ItemProImg/n25/tfs/2018/09/25/4e72acf7-cf39-4196-88ea-5aa8dae8b679.png_240x240.jpg",
            point: '19999',
            price: '699.00',
            text: "FOREO洁面仪"
          }
        ]
      },
    ]
  },

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

  }
})