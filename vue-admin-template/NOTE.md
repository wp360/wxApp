## 项目构建
```
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

[参考文档：https://github.com/PanJiaChen/vue-admin-template/blob/master/README-zh.md](https://github.com/PanJiaChen/vue-admin-template/blob/master/README-zh.md)

## 项目开发
* 1. 删除多余文件
> src >> views >> 保留login和404.vue以外，其他全部删除
* 2. 新增文件
```
- blog
  -- blog.vue
- playlist
  -- list.vue
- swiper
  -- swiper.vue
```
* 3. 修改router
```js
// router/index.js
export const constantRoutes = [
  {
    path: '/',
    redirect: '/playlist/list'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/playlist',
    component: Layout,
    children: [
      {
        path: 'list',
        // name: 'List',
        component: () => import('@/views/playlist/list'),
        meta: {
          title: '歌单管理',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/swiper',
    component: Layout,
    children: [{
      path: 'swiper',
      component: () => import('@/views/swiper/swiper'),
      meta: {
        title: '轮播图管理',
        icon: 'example'
      }
    }]
  },
  {
    path: '/blog',
    component: Layout,
    children: [{
      path: 'blog',
      component: () => import('@/views/blog/blog'),
      meta: {
        title: '博客管理',
        icon: 'tree'
      }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
```
## Koa2构建管理系统后端
* 1. 新建文件夹目录
* 2. npm init生成package.json
* 3. 安装koa
`npm i koa`
* 4. 添加入口文件app.js
```js
// app.js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3000, ()=> {
  console.log('服务开启在3000端口')
})

```
[https://koa.bootcss.com/](https://koa.bootcss.com/)

* 5. 启动服务>> node app.js

## access_token的缓存与更新
* 1. 新建文件夹utils >> getAccessToken.js
```js
//  getAccessToken.js

```
* 2. 安装request、request-promise
`npm i request request-promise`
* 3. get请求
`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET`
* 4. 获取appid等参数
> 登录微信小程序平台（扫码） 》 开发 》 开发设置
* 5. 安装 koa-router
`npm i koa-router`
* 6. 引入
```js
// app.js
// 路由
const Router = require('koa-router')
const router = new Router()

const playlist = require('./controller/playlist')
router.use('/playlist', playlist.routes())
app.use(router.routes())
app.use(router.allowedMethods())

```
* 7. 新建controller文件夹，playlist.js
```js
// 歌单
const Router = require('koa-router')
const router = new Router()

// get post
router.get('/list', async(ctx, next) => {
  // 查询歌单列表
  ctx.body = '歌单列表'
})

module.exports = router

```
* 8. 触发云函数
> 参考小程序文档云开发 》 HTTP API 文档 》 云函数 》 触发云函数
```
请求地址
POST https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=ACCESS_TOKEN&env=ENV&name=FUNCTION_NAME

请求参数
access_token	string		是	接口调用凭证
env	          string		是	云开发环境ID
name	        string		是	云函数名称
POSTBODY	    string		是	云函数的传入参数，具体结构由开发者定义。
```
## 管理后台信息显示
> vue-admin-template >> src >> api >> playlist.js
```js
import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fetchList(params) {
  return request({
    params,
    url: `${baseURL}/playlist/list`,
    method: 'get'
  })
}

```
## 后台管理界面歌单信息展示
* 1. 调用api接口，获取数据
```js
// vue-admin-template/src/views/playlist/list.vue
import {fetchList} from '@/api/playlist'
export default {
  data() {
    return {
      playList: [],
      count: 50
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList({
        start: this.playList.length,
        count: this.count
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
```
* 2. 跨域问题处理
> 跨域： 域名不同、端口不同、主域与子域、http与https
* 3. koa2跨域模块koa2-cors
> cd server 安装 (注意)
`npm i koa2-cors`
* 4. 引入使用
```js
// vue-admin-template/server/app.js
// 跨域
const cors = require('koa2-cors')
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials: true
}))

```
* 5. js报错
```
Uncaught (in promise) Error: Error
    at ./src/utils/request.js._default (request.js:79)
    at <anonymous>
```
* 6. 报错问题解决
```js
// 原因：前端模板要求状态码20000
// vue-admin-template/server/controller/playlist.js
  ctx.body = await rp(options)
    .then((res) => {
      // console.log(res)
      return JSON.parse(res.resp_data).data
    })
    .catch((err) => {
      console.log(err)
    })
// 修改为：
  const data = await rp(options)
    .then((res) => {
      // console.log(res)
      return JSON.parse(res.resp_data).data
    })
    .catch((err) => {
      console.log(err)
    })

    ctx.body = {
      data,
      code: 20000
    }

// 问题解决，成功输出：
// {data: Array(50), code: 20000}
```
* 7. 数据界面表格显示
> vue-admin-template/src/views/playlist/list.vue
[参考：https://element.eleme.cn/#/zh-CN/component/table](https://element.eleme.cn/#/zh-CN/component/table)
* 8. 下拉加载
```js
// vue-admin-template/src/utils/scroll.js
const scroll = {
  isEnd: false,
  start(callback) {
    let timer = null
    callback && window.addEventListener('scroll', () => {
      if (timer) {
        clearTimeout(timer)
      }
      // 函数防抖
      timer = setTimeout(() => {
        // 浏览器向上滚动的高度
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 文档的真实高度
        const scrollHeight = document.documentElement.scrollHeight
        // 浏览器窗口（文档）的可视高度,就是肉眼可见的那部分全屏高度
        const clientHeight = document.documentElement.clientHeight
        if (!this.isEnd && scrollHeight === scrollTop + clientHeight) {
          window.scrollTo(0, scrollTop - 100)
          // 请求数据
          callback()
        }
      }, 300)
    })
  },
  end() {
    this.isEnd = true
  }
}

export default scroll

```
* 9. 引入scroll.js及使用
```js
// vue-admin-template/src/views/playlist/list.vue
import scroll from '@/utils/scroll'

export default {
  // ... 省略
  mounted() {
    scroll.start(this.getList)
  },
  methods: {
    getList() {
      this.loading = true
      fetchList({
        start: this.playlist.length,
        count: this.count
      }).then(res => {
        // ...
        if (res.data.length < this.count) {
          scroll.end()
        }
        this.loading = false
      })
    }
  }
}
```
* 10. 修改后端获取数据的参数值
```js
// vue-admin-template/server/controller/playlist.js
  const options = {
    method: 'POST',
    uri: url,
    body: {
      $url: 'playlist',
      start: 0,
      count: 50
    },
    json: true
  }

  // 改为：
  const query = ctx.request.query
  const options = {
    method: 'POST',
    uri: url,
    body: {
      $url: 'playlist',
      start: parseInt(query.start),
      count: parseInt(query.count)
    },
```
[GET请求数据获取 —— https://chenshenhai.github.io/koa2-note/note/request/get.html](https://chenshenhai.github.io/koa2-note/note/request/get.html)
* 11. 封装云函数调用方法
```js
// vue-admin-template/server/utils/callCloudFn.js

```
* 12. 云函数环境ID全局设置
```js
// 云函数环境ID
const ENV = 'wxcloud-73wod'
// ...

app.use(async (ctx, next) => {
  // console.log('全局中间件')
  // ctx.body = 'Hello World'
  ctx.state.env = ENV
  await next()
})

```
* 13. 重构后台歌单列表显示接口
```js
// vue-admin-template/server/controller/playlist.js
const Router = require('koa-router')
const router = new Router()
// 引入封装的调用云函数方法
const callCloudFn = require('../utils/callCloudFn')

// get post
router.get('/list', async(ctx, next) => {
  // 获取前端属性值
  const query = ctx.request.query
  // 查询歌单列表
  const res = await callCloudFn(ctx, 'music', {
      $url: 'playlist',
      start: parseInt(query.start),
      count: parseInt(query.count)
  })

  let data = []
  if(res.resp_data) {
    data = JSON.parse(res.resp_data).data
  }
  ctx.body = {
    data,
    code: 20000
  }
})

module.exports = router
```
## 歌单编辑
* 1. 歌单列表编辑按钮添加对应方法
* 2. 新增edit.vue编辑页面
* 3. 添加对应路由
* 4. 添加通过歌单id查询数据的方法（api >> playlist.js）
* 5. 添加通过歌单id获取信息（controller >> playlist.js）
```js
const callCloudDB = require('../utils/callCloudDB')

// 通过歌单id获取信息
router.get('/getById', async(ctx, next) => {
  const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
  const res = await callCloudDB(ctx, 'databasequery', query)
  ctx.body = {
    data: JSON.parse(res.data),
    code: 20000
  }
})

```
* 6. 调用云数据库（封装）方法
```js
// vue-admin-template/server/utils/callCloudDB.js
const getAccessToken = require('./getAccessToken')
const rp = require('request-promise')

const callCloudDB = async (ctx, fnName, query = {}) => {
  const ACCESS_TOKEN = await getAccessToken()
  const options = {
    method: 'POST',
    uri: `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`,
    body: {
      query,
      env: ctx.state.env
    },
    json: true // Automatically stringifies the body to JSON
  }

  return await rp(options)
    .then((res) => {
      return res
    })
    .catch(function (err) {
      console.log(err)
    })
}

module.exports = callCloudDB

```
* 7. 编辑页面
* 8. 更新接口
```js
//  vue-admin-template/src/api/playlist.js
export function update(params) {
  return request({
    url: `${baseURL}/playlist/updatePlaylist`,
    data: {
      ...params
    },
    method: 'post'
  })
}

```
* 9. koa-body的使用
> 用于koa框架解析请求体的模块
`npm i koa-body`
```js
// app.js
const koaBody = require('koa-body')

// 接收post参数解析
app.use(koaBody({
  multipart: true
}))
```
* 10. 后端对应方法
```js
// vue-admin-template/server/controller/playlist.js
// 更新
router.post('/updatePlaylist', async(ctx, next)=>{
  const params = ctx.request.body
  const query = `
    db.collection('playlist').doc('${params._id}').update({
      data: {
        name: '${params.name}',
        copywriter: '${params.copywriter}'
      }
    })
  `
  const res = await callCloudDB(ctx, 'databaseupdate', query)
  ctx.body = {
    data: res,
    code: 20000
  }
})
```
* 11. 调用接口
## 歌单删除功能
* 1. 添加删除按钮及方法
* 2. 添加删除确认弹框
* 3. 删除api接口
```js
//  vue-admin-template/src/api/playlist.js
// 删除
export function del(params) {
  return request({
    params,
    url: `${baseURL}/playlist/del`,
    method: 'get'
  })
}
```
* 4. 后端添加对应删除方法
```js
// vue-admin-template/server/controller/playlist.js
// 删除
router.get('/del', async (ctx, next) => {
  const params = ctx.request.query
  const query = `db.collection('playlist').doc('${params.id}').remove()`
  const res = await callCloudDB(ctx, 'databasedelete', query)
  ctx.body = {
    data: res,
    code: 20000
  }
})

```
* 5. 页面删除方法添加
## 轮播图
* 1. 云开发控制台点击存储，新建swiper文件夹，上传图片文件
* 2. 云开发控制台点击数据库，创建集合swiper，添加记录 fileid 》 File ID（存储后生成的值）
* 3. 添加api接口swiper.js
```js
// vue-admin-template/src/api/swiper.js
import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fetchList() {
  return request({
    url: `${baseURL}/swiper/list`,
    method: 'get'
  })
}
```
* 4. swiper页面引入接口及相关方法添加
* 5. 后端添加对应接口
```js
// vue-admin-template/server/controller/swiper.js
const Router = require('koa-router')
const router = new Router()
const callCloudDB = require('../utils/callCloudDB')

router.get('/list', async (ctx, next) => {
    // 默认10条数据
    const query = `db.collection('swiper').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    console.log(res)
})

module.exports = router
```
* 6. app.js引入
```js
const swiper = require('./controller/swiper')
router.use('/swiper', swiper.routes())
```
* 7. batchDownloadFile获取文件下载链接
[https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/storage/batchDownloadFile.html](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/storage/batchDownloadFile.html)
* 8. 调用云存储方法
```js
// callCloudStorage.js
```
* 9. 界面显示
* 10. upload文件上传
* 11. 删除功能
```
· 界面添加删除按钮方法
· 添加删除api接口
· 后端添加对应方法（删除云数据库中的内容、删除云存储中的文件）
· callCloudStorage封装删除方法
· 前端界面引入
```