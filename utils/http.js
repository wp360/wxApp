/**
 * 接口请求调用方法封装
 */
import {
  config
} from '../config/config'

import {promisic} from '../utils/util'

class Http {
  // static request({url, method='GET', data, callback}) {
  //   wx.request({
  //     url: `${config.apiBaseUrl}${url}`,
  //     method,
  //     data,
  //     header: {
  //       appkey: config.appkey
  //     },
  //     success: (res) => {
  //       callback(res.data)
  //     }
  //   })
  // }

  // 使用async和await
  static async request({
    url,
    method = 'GET',
    data
  }) {
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey
      }
    })
    return res.data
  }
}

export {
  Http
}