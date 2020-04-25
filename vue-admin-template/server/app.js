const Koa = require('koa')
const app = new Koa()
// 路由
const Router = require('koa-router')
const router = new Router()
// 云函数环境ID
const ENV = 'wxcloud-73wod'
// 跨域
const cors = require('koa2-cors')
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials: true
}))

app.use(async (ctx, next) => {
  console.log('全局中间件')
  // ctx.body = 'Hello World'
  ctx.state.env = ENV
  await next()
})

const playlist = require('./controller/playlist')
router.use('/playlist', playlist.routes())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, ()=> {
  console.log('服务开启在3000端口')
})
