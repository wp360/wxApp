// 歌单
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
