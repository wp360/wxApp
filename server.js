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
    // console.log('wechat: ', message)
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

// https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
// router.get('/getFollowers', async ctx => {
//   const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
//   const res = await axios.get(url)
//   console.log('getFollowers: ', res)
//   ctx.body = res.data
// })

const { ServerToken } = require('./mongoose')

// 使用第三方封装的微信api获取
const WechatAPI = require('co-wechat-api')
const api = new WechatAPI(
  conf.appid,
  conf.appsecret,
  // 取Token
  async () => await ServerToken.findOne(),
  // 存Token
  async token => await ServerToken.updateOne({}, token, {upsert: true})
)

router.get('/getFollowers', async ctx=> {
  let res = await api.getFollowers()
  // 获取用户信息列表 user_info_list
  res = await api.batchGetUsers(res.data.openid, 'zh_CN')
  ctx.body = res
})

// 微信授权认证
const OAuth = require('co-wechat-oauth')
const oauth = new OAuth(conf.appid, conf.appsecret)

router.get('/wxAuthorize', async ctx => {
  const state = ctx.query.id
  console.log('ctx...' + ctx.href)
  // 目标地址
  let redirectUrl = ctx.href
  redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback')
  const scope = 'snsapi_userinfo'
  const url = oauth.getAuthorizeURL(redirectUrl, state,scope)
  console.log('url', url)

  ctx.redirect(url)
})

router.get('/wxCallback', async ctx => {
  // 授权码
  const code = ctx.query.code
  console.log('返回授权码：' + code)
  const token = await oauth.getAccessToken(code)
  const accessToken = token.data.access_token
  const openid = token.data.openid
  console.log('accessToken', accessToken)
  console.log('openid', openid)
  // 刷新页面
  ctx.redirect('/?openid=' + openid)
})

router.get('/getUser', async ctx => {
  const openid = ctx.query.openid
  const userInfo = await oauth.getUser(openid)
  ctx.body = userInfo
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)