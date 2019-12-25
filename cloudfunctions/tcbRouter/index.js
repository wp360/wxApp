// 云函数入口文件
const cloud = require('wx-server-sdk')
// tcb-router
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})
  app.use(async(ctx,next) => {
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
  })

  app.router('music', async(ctx,next) => {
    ctx.data.musicName = '哆来咪'
    await next()
  }, async (ctx,next) => {
    ctx.data.musicType = '儿歌'
    ctx.body = {
      data: ctx.data
    }
  })

  app.router('movie', async (ctx, next) => {
    ctx.data.movieName = '灌篮高手'
    await next()
  }, async (ctx, next) => {
    ctx.data.movieType = '日本动漫'
    ctx.body = {
      data: ctx.data
    }
  })

  // 当前服务返回
  return app.serve()
}