//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://s0.feiheimg.com//ImgAdItem/n27/tfs/2019/01/27/effd207b-bcc2-4579-92ea-10680a2f8b7d.jpg',
      'http://s0.feiheimg.com//ImgAdItem/n18/tfs/2019/01/18/9bc7ed7b-071a-41ca-af37-57aa6a04b1e8.jpg',
      'http://s0.feiheimg.com//n13/tfs/2018/04/13/ber/6c9e8201-4702-417e-9c02-f27742df22e5.jpg',
      'http://s0.feiheimg.com//ImgAdItem/n13/tfs/2019/03/13/4b1944bf-6a08-4ebf-83e8-6e03ef61b92b.png'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    typeslist: [{
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//n30/tfs/2018/01/30/ber/402085e6-b5c9-44ca-b48b-8ab1f0a77e98.jpg",
        text: "星飞帆系列"
      },
      {
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//ImgAdItem/n12/tfs/2018/10/12/91ca2518-d923-4dd6-8f2d-3422d0615749.jpg",
        text: "臻稚有机"
      },
      {
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//ImgAdItem/n12/tfs/2018/10/12/9bb80660-34f2-47e9-82ac-845ea59173ad.jpg",
        text: "星阶优护系列"
      },
      {
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//ImgAdItem/n12/tfs/2018/10/12/23c2ffe6-ba4d-4233-b7a4-7ec020fa29b8.jpg",
        text: "飞帆系列"
      },
      {
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//ImgAdItem/n12/tfs/2018/10/12/4b5673cf-a0c3-4b95-93fe-b2a79f2be932.jpg",
        text: "超级飞帆系列"
      },
      {
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//n30/tfs/2018/01/30/ber/91ae5c12-7f20-4d63-a20c-7a381a374be0.jpg",
        text: "成人粉系列"
      },
      {
        url: "/pages/shop-cart/index",
        image: "//s2.feiheimg.com//ImgAdItem/n12/tfs/2018/10/12/4baca663-4c45-4f16-bd05-05f8c5c56b5c.jpg",
        text: "星蕴系列"
      }
    ],
    productsAllList: [
      {
        product_id: 1,
        title: '#星飞帆#金奖奶粉亲和母乳配方',
        data: [
          {
            id: "001",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 1段 700g"
          },
          {
            id: "002",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 2段 700g"
          },
          {
            id: "003",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 3段 700g"
          },
          {
            id: "004",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 4段 700g"
          },
          {
            id: "005",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 5段 700g"
          },
          {
            id: "006",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 6段 700g"
          }
        ]
      },
      {
        product_id: 2,
        title: '#智纯有机#回归自然闪耀上市',
        data: [
          {
            id: "007",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 1段 700g"
          },
          {
            id: "008",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 2段 700g"
          },
          {
            id: "009",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 3段 700g"
          },
          {
            id: "010",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 4段 700g"
          },
          {
            id: "011",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 5段 700g"
          },
          {
            id: "012",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 6段 700g"
          }
        ]
      },
    ],
    productsYearList: [
      {
        product_id: 3,
        title: '#0-6个月#婴儿配方奶粉',
        data: [
          {
            id: "013",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 1段 700g"
          },
          {
            id: "014",
            image: "//s0.feiheimg.com//n30/tfs/2018/01/30/ItemProImg/72fb7f82-a528-49df-a34c-2d594c6dc20b.jpg_400x400.jpg",
            price: '338',
            text: "超级飞帆 1段 900g"
          },
          {
            id: "015",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 1段 700g"
          },
          {
            id: "016",
            image: "//s0.feiheimg.com//n30/tfs/2018/01/30/ItemProImg/72fb7f82-a528-49df-a34c-2d594c6dc20b.jpg_400x400.jpg",
            price: '338',
            text: "超级飞帆 1段 900g"
          },
          {
            id: "017",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
            price: '368',
            text: "星飞帆 1段 700g"
          },
          {
            id: "018",
            image: "//s0.feiheimg.com//n30/tfs/2018/01/30/ItemProImg/72fb7f82-a528-49df-a34c-2d594c6dc20b.jpg_400x400.jpg",
            price: '338',
            text: "超级飞帆 1段 900g"
          }
        ]
      },
      {
        product_id: 4,
        title: '#6-12个月#较大婴儿配方奶粉',
        data: [
          {
            id: "019",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 2段 700g"
          },
          {
            id: "020",
            image: "//s0.feiheimg.com//n30/tfs/2018/01/30/ItemProImg/20be3e10-e1d6-4f35-94f6-b4f3c90fe59e.jpg_400x400.jpg",
            price: '328',
            text: "超级飞帆 2段 900g"
          },
          {
            id: "021",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 2段 700g"
          },
          {
            id: "022",
            image: "//s0.feiheimg.com//n30/tfs/2018/01/30/ItemProImg/20be3e10-e1d6-4f35-94f6-b4f3c90fe59e.jpg_400x400.jpg",
            price: '328',
            text: "超级飞帆 2段 900g"
          },
          {
            id: "023",
            image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
            price: '308',
            text: "星飞帆 2段 700g"
          },
          {
            id: "024",
            image: "//s0.feiheimg.com//n30/tfs/2018/01/30/ItemProImg/20be3e10-e1d6-4f35-94f6-b4f3c90fe59e.jpg_400x400.jpg",
            price: '328',
            text: "超级飞帆 2段 900g"
          }
        ]
      }
    ],
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    x: 0,
    y: 0
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },
  tap: function (e) {
    this.setData({
      x: 30,
      y: 30
    });
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
  },
  onLoad: function(options) {
    var page = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        page.setData({
          winWidth: res.windowWidth
        });
        page.setData({
          winHeight: res.windowHeight
        });
      }
    })
  },
  switchNav: function(e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({
        currentTab: e.target.dataset.current
      });
    }
  }
})