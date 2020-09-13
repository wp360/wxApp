<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10ae48bf9f1bf8b4&redirect_uri=http%3A%2F%2Fm.51purse.com%2F%23%2Findex&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
  }
}
</script>
