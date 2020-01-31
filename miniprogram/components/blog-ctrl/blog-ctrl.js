// components/blog-ctrl/blog-ctrl.js
// 用户信息
let userInfo = {}
// 数据库初始化
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String
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
          if (res.authSetting['scope.address.userInfo']) {
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
    onLoginsuccess(event) {
      userInfo = event.detail
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
    },
    onInput(event) {
      this.setData({
        content: event.detail.value
      })
    },
    onSend(event) {
      // 评论信息插入云数据库
      // let formId = event.detail.formId
      let content = this.data.content
      // let content = event.detail.value.content

      if (content.trim() == '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: ''
        })
        return
      }
      // 评价中
      wx.showLoading({
        title: '评价中...',
        mask: true
      })
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) => {
        // 推送(模板)订阅消息
        // wx.cloud.callFunction({
        //   name: 'sendMessage',
        //   data: {
        //     content,
        //     nickName: userInfo.nickName,
        //     formId,
        //     blogId: this.properties.blogId,
        //   }
        // }).then((res) => {
        //   console.log(res)
        // })
        // 调用微信 API 申请发送订阅消息
        const blogId = this.properties.blogId
        wx.requestSubscribeMessage({
          // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
          tmplIds: ['5MrespAoFrudyNT-QwIlqxT_GgzrhFkaKGztq6OFetU'],
          success(res) {
            console.log(res)
            // 申请订阅成功
            if (res.errMsg === 'requestSubscribeMessage:ok') {
              // 这里将订阅的课程信息调用云函数存入云开发数据
              wx.cloud.callFunction({
                name: 'sendMessage',
                data: {
                  content,
                  // formId,
                  nickName: userInfo.nickName,
                  blogId
                }
              }).then(() => {
                wx.showToast({
                  title: '订阅成功',
                  icon: 'success',
                  duration: 2000
                })
              }).catch(() => {
                wx.showToast({
                  title: '订阅失败',
                  icon: 'success',
                  duration: 2000
                })
              })
            }
          },
        })
        wx.hideLoading()
        wx.showToast({
          title: '评论成功！'
        })
        // 隐藏设置清空评论内容
        this.setData({
          modalShow: false,
          content: ''
        })

        // 父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      })
    }
  }
})
