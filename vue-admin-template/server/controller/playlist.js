// 歌单
const Router = require('koa-router')
const router = new Router()
// 引入封装的调用云函数方法
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB')
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

// 通过歌单id获取信息
router.get('/getById', async(ctx, next) => {
  const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
  const res = await callCloudDB(ctx, 'databasequery', query)
  ctx.body = {
    data: JSON.parse(res.data),
    code: 20000
  }
})

// 更新
router.post('/updatePlaylist', async(ctx, next)=>{
  const params = ctx.request.body
  // 查询条件 数据库操作语句
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

module.exports = router
