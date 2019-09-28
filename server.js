const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const conf = require('./conf')
const axios = require('axios')

app.use(bodyParser())

const router = new Router()
app.use(static(__dirname + '/'))

// 微信公众号测试
const wechat = require('co-wechat')
router.all('/wechat', wechat(conf).middleware(
  async message => {
    console.log('wechat: ', message)
    return 'Hello World ' + message.Content
  }
))

// token获取
const tokenCache = {
  access_token: '',
  undateTime: Date.now(),
  expires_in: 7200
}

router.get('/getTokens', async ctx => {
  const wxDomin = `https://api.weixin.qq.com`
  const path = `/cgi-bin/token`
  const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
  const url = wxDomin + path + param
  const res = await axios.get(url)
  Object.assign(tokenCache, res.data, {
    updateTime: Date.now()
  })
  ctx.body = res.data
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)