// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云数据库初始化
const db = cloud.database()
// 引入Promise封装request
const rp = require('request-promise')
// 歌曲推荐接口
const URL = 'http://musicapi.xiecheng.live/personalized'
// 歌曲推荐集合
const playlistCollection = db.collection('playlist')
// 一次获取最大数据数
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  // const list = await playlistCollection.get()
  // 获取集合里总的条数
  const countResult = await playlistCollection.count()
  const total = countResult.total
  // 分几次获取值
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  let list = {
    data: []
  }

  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  // 异步操作
  const playlist = await rp(URL)
    .then((res) => {
      // Process html...
      // return res
      return JSON.parse(res).result
    })

  // 去重
  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++){
      if(playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if(flag) {
      newData.push(playlist[i])
    }
  }
  // console.log(playlist)
  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate()
      }
    }).then((res) => {
      console.log('数据添加成功')
    }).catch((err) => {
      console.log('数据添加失败')
    })
  }
  return newData.length
}