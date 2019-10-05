## 微信公众号开发
> 微信后台开发第一步：nodeJS+express接入微信后台详细教程
[https://www.cnblogs.com/xuange306/p/4971702.html](https://www.cnblogs.com/xuange306/p/4971702.html)

## 微信公众号开发文档
> 获取access_token
[https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)

## Ngrok的Windows使用教程
[http://www.ngrok.cc/_book/start/ngrok_windows.html](http://www.ngrok.cc/_book/start/ngrok_windows.html)

> sunny.exe clientid 4e65a0607f9651df

## co-wechat-api快速搭建微信公众号对接服务
1. 安装
`npm i co-wechat-api`
[github —— https://github.com/node-webot/co-wechat-api](https://github.com/node-webot/co-wechat-api)
2. 使用
```js
// server.js
// 注释直接获取，采用api接口获取
const WechatAPI = require('co-wechat-api')
const api = new WechatAPI(conf.appid, conf.appsecret)
router.get('/getFollowers', async ctx=> {
  const res = await api.getFollowers()
  ctx.body = res
})
```
3. 获取用户信息列表 user_info_list
```js
  let res = await api.getFollowers()
  res = await api.batchGetUsers(res.data.openid, 'zh_CN')
```
## 多线程的全局票据
