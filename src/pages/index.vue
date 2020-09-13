<template>
  <div class="index">
    <img src="./../assets/img/header.png" class="header" alt="图片">
    <div class="btn-group">
      <button class="btn btn-primary">充值</button>
      <button class="btn">分享</button>
      <button class="btn btn-primary">活动详情</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>
  .index {
    background-color: #ffc93a;
    height: 100vh;
  }

  .btn-group {
    padding-top: .34rem;
    text-align: center;
  }
</style>