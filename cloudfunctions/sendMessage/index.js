// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()

  const result = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
    data: {
      thing1: {
        value: event.content
      },
      name3: {
        value: event.nickName
      }
    },
    templateId: '5MrespAoFrudyNT-QwIlqxT_GgzrhFkaKGztq6OFetU',
    // formId: event.formId
  })

  return result
}