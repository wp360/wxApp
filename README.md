# 开发笔记
1. 开通云开发
2. app.json设置
```json
{
  "pages": [
    "pages/playlist/playlist",
    "pages/blog/blog",
    "pages/profile/profile"
  ],
  // 省略
}
```
## 歌单组件
1. pages页面playlist文件夹
2. components文件夹下新建playlist组件
#### playlist组件
* playlist.js
```js
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object
    }
  },
```
* playlist.wxml

## 【云函数部分】

## 去重

## 解决小程序一次加载100条数据限制

## 定时触发器
* 新建json文件（一定要命名为config.json）
```json
{
  "triggers": [
    {
      "name": "myTrigger",
      "type": "timer",
      "config": "0 0 10,14,16,23 * * * *"
    }
  ]
}
```
[参考文档链接：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/triggers.html](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/triggers.html)

## 数据添加到页面
1. 新建云函数music
2. 删除静态数据，调用云函数
3. 下拉刷新操作

## 云函数路由优化tcb-router
* 一个用户在一个云环境中只能创建50个云函数
* 相似的请求归类到同一个云函数处理
* tcb-router是一个koa风格的云函数路由库

# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 小程序全局属性设置
1. app.js
```js
  this.globalData = {
    playingMusicId: -1
  }

  setPlayMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },
  getPlayMusicId() {
    return this.globalData.playingMusicId
  }
2. 调用全局属性
const app = getApp()

// 设置全局属性
app.setPlayMusicId(musicId)

3. 获取全局属性
pageLifetimes: {
  show() {
    app.getPlayMusicId()
  }
},

// 赋值
pageLifetimes: {
  show() {
    this.setData({
      playingId: app.getPlayMusicId()
    })
  }
},
```

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)