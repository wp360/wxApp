// 歌单
const Router = require('koa-router')
const router = new Router()
// 获取token值
const getAccessToken = require('../utils/getAccessToken')
const env = 'wxcloud-73wod'
const rp = require('request-promise')

// get post
router.get('/list', async(ctx, next) => {
  const access_token = await getAccessToken()
  // console.log(access_token)
  // 查询歌单列表
  const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${env}&name=music`
  // 获取前端属性值
  const query = ctx.request.query
  const options = {
    method: 'POST',
    uri: url,
    body: {
      $url: 'playlist',
      start: parseInt(query.start),
      count: parseInt(query.count)
    },
    json: true
  }

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
})

module.exports = router
