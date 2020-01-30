// components/blog-ctrl/blog-ctrl.js
// 用户信息
let userInfo = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],
  /**
   * 组件的初始数据
   */
  data: {
    //登录组件是否显示
    loginShow: false,
    // 评论弹出层是否显示
    modalShow: false,
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.address.userInfo']) {
            wx.getUserInfo({
              complete: (res) => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true
                })
              }
            })
          } else {
            // 未授权
            this.setData({
              loginShow: true
            })
          }
        }
      })
    },
    onLoginsuccess() {
      // 授权框消失，评论框显示
      this.setData({
        loginShow: false
      }, () => {
        this.setData({
          modalShow: true
        })
      })
    },
    onLoginfail() {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: ''
      })
    }
  }
})
