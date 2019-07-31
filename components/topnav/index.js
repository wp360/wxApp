// components/topnav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true,
    isShow: true,
    menuIcon: './images/menu-icon.jpg',
    menuClose: './images/close-menu.jpg',
    menuArr: [
      {
        url: "/topic/default?id=125",
        image: "images/day.jpg",
        text: "28天新鲜直达"
      },
      {
        url: "/source",
        image: "images/source.jpg",
        text: "奶源追溯"
      },
      {
        url: "/CusGrade/Readme",
        image: "images/user.jpg",
        text: "会员体系"
      },
      {
        url: "/topic/default?id=183",
        image: "images/other.jpg",
        text: "其他产品"
      },
      {
        url: "/al/9/",
        image: "images/news.jpg",
        text: "新闻列表"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMenu: function() {
      var hidden = this.data.hidden
      this.setData({
        hidden: !hidden
      })
    },
    showPic: function() {
      var isShow = this.data.isShow
      this.setData({
        isShow: !isShow
      })
    }
  }
})