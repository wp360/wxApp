// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入
const TcbRouter = require('tcb-router')
// 调用数据库
const db = cloud.database()
// 获取博客集合
const blogCollection = db.collection('blog')
// 最大查询数
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  app.router('list', async(ctx,next) => {
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
    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get()
    .then((res) => {
      return res.data
    })
    ctx.body = blogList
  })

  // 评论详情
  app.router('detail', async(ctx, next) => {
    let blogId = event.blogId
    // 详情查询
    let detail = await blogCollection.where({
      _id: blogId
    }).get().then((res) => {
      return res.data
    })
    // 评论查询
    // 先取出集合记录总数
    const countResult = await blogCollection.count()
    const total = countResult.total
    let commentList = {
      data: []
    }
    if(total > 0) {
      // 计算需分几次取
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for(let i = 0; i < batchTimes; i++) {
        let promise = db.collection('blog-comment').skip(i*MAX_LIMIT).limit(MAX_LIMIT).where({
          blogId
        }).orderBy('createTime', 'desc').get()
        tasks.push(promise)
      }
      if(tasks.length > 0) {
        commentList = (await Promise.all(tasks)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }
    }

    ctx.body = {
      commentList,
      detail
    }

  })

  // 根据openid获取博客列表
  const wxContext = cloud.getWXContext() // 在云函数中获取微信调用上下文，该方法无需传入参数
  app.router('getListByOpenid', async(ctx, next) => {
    ctx.body = await blogCollection.where({
      _openid: wxContext.OPENID // 小程序用户 openid
    }).skip(event.start).limit(event.count)
    .orderBy('createTime', 'desc').get()
    .then((res) => {
      return res.data
    })
  })

  return app.serve()
}