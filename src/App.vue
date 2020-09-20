<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import API from './api/index'
import wx from 'weixin-js-sdk'
import util from './util/index'

export default {
  name: 'App',
  mounted () {
    // 授权
    this.checkUserAuth()
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10ae48bf9f1bf8b4&redirect_uri=http%3A%2F%2Fm.51purse.com%2F%23%2Findex&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
  },
  methods: {
    // 检查用户是否授权
    checkUserAuth () {
      let openId = this.$cookie.get('openId')
      if (!openId) {
        window.location.href = API.wechatRedirect
      } else {
        this.getWechatConfig()
      }
    },
    // 获取微信配置信息
    getWechatConfig () {
      this.$http.get(API.wechatConfig+'?url='+location.href.split('#')[0])
      .then((response) => {
        let res = response.data
        if (res.code === 0) {
          let data = res.data
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见微信官方文档
          })

          // 执行相应功能
          wx.ready(() => {
            util.initShareInfo()
          })
        }
      })
    }
  }
}
</script>
