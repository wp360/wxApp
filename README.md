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

## 博客
1. cloudfunctions 》 blog 云函数
2. 安装tcb-router
`npm install tcb-router --save`
3. 引入使用
```js
// blog >> index.js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入
const TcbRouter = require('tcb-router')
// 调用数据库
const db = cloud.database()
// 获取博客集合
const blogCollection = db.collection('blog')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  app.router('list', async(ctx,next) => {
    let blogList = await blogCollection.skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get()
    .then((res) => {
      return res.data
    })
    ctx.body = blogList
  })

  return app.serve()
}
```
4. 上传
5. 调用云函数
```js
// pages >> blog >> blog.js

  /**
   * 页面的初始数据
   */
  data: {
    // 控制底部弹出层是否显示
    modalShow: false,
    blogList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBlogList()
  },
  /**
   * 加载博客列表
   */
  _loadBlogList(){
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        start: 0,
        count: 10
      }
    }).then((res) => {
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
    })
  },
```
6. 博客显示组件
* 新建文件 components 》 blog-card
* 引入组件 blog.json
```json
{
  "usingComponents": {
    // ...
    "x-blog-card": "/components/blog-card/blog-card"
  },
  "navigationBarTitleText": "发现"
}
```
7. 博客卡片列表
* blog.wxml
* blog-card.wxml
* blog-card.wxss
* blog-card.js

## 刷新
* 子界面调用父界面的功能
* 代码
```js
// blog-edit.js
// 刷新部分
const pages = getCurrentPages()
console.log(pages)
// 取到上一个页面
const prevPage = pages[pages.length - 2]
prevPage.onPullDownRefresh()
```

## 模糊搜索
1. 搜索页面绑定输入事件
2. 获取关键字
3. triggerEvent 自定义事件
4. 父页面使用搜索方法
5. 云函数添加搜索方法
```js
// cloudfunctions/blog/index.js
// 省略...
  const keyword = event.keyword
  let w = {}
  if (keyword.trim()!== '') {
    w = {
      content: db.RegExp({
        regexp: keyword,
        options: 'i'
      })
    }
  }
```
6. 云开发添加content索引，优化搜索速度（空间换时间）

## 评论与分享
1. 新增组件blog-ctrl
* components >> blog-ctrl (新建Component)
2. 引入组件
* pages >> blog >> blog.json
```json
{
  "usingComponents": {
    // 省略
    "x-blog-ctrl": "/components/blog-ctrl/blog-ctrl"
  },
  "navigationBarTitleText": "发现",
  "enablePullDownRefresh": true
}
```
* pages >> blog >> blog.wxml 添加在博客卡片列表下
3. 组件布局
* components >> blog-ctrl >> blog-ctrl.wxml
```wxml
<view class="ctrl">
  <view class="ctrl-item" bind:tap="onComment">
    <i class="iconfont icon-pinglun icon"></i>
    <text>评论</text>
  </view>
  <view class="ctrl-item share">
    <i class="iconfont icon-fenxiang icon"></i>
    <text>分享</text>
  </view>
</view>

```
4. 添加样式
* components >> blog-ctrl >> blog-ctrl.wxss
5. 图标文件
* pages >> blog >> blog.wxml 添加属性
```wxml
<x-blog-ctrl iconfont="iconfont" icon-pinglun="icon-pinglun" icon-fenxiang="icon-fenxiang" />
```
* components >> blog-ctrl >> blog-ctrl.js
```js
// 使用externalClass自定义组件样式
externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],
```
6. 点击评论事件
* components >> blog-ctrl >> blog-ctrl.js => onComment()
7. 调用登录组件
* blog-ctrl.json
```json
{
  "component": true,
  "usingComponents": {
    "x-login": "/components/login/login"
  }
}
```
* blog-ctrl.wxml
```wxml
<!-- 登录判断 -->
<x-login modalShow="{{loginShow}}" bind:loginsuccess="onLoginsuccess" bind:loginfail="onLoginfail" />
```
8. 显示评论弹出层
* blog-ctrl.json
```json
  "usingComponents": {
    "x-login": "/components/login/login",
    "x-bottom-modal": "/components/bottom-modal/bottom-modal"
  }
```
9. 添加底部弹出层内容
* blog-ctrl.wxml

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)