/*
* 业务对象 theme、banner、spu、sku、address、user
*/
// import {config} from '../config/config'
import {
  Http
} from '../utils/http'

class Theme {
  static async getHomeLocationA() {
    return await Http.request({
      url: `theme/by/names`,
      data: {
        names: 't-1'
      }
    })
  }
  // static getHomeLocationA(callback) {
  //   Http.request({
  //     url: `theme/by/names`,
  //     data: {
  //       names: 't-1'
  //     },
  //     callback: data => {
  //       callback(data)
  //     }
  //   })
    // wx.request({
    //   url: `${config.apiBaseUrl}theme/by/names`,
    //   method: 'GET',
    //   data: {
    //     names: 't-1'
    //   },
    //   header: {
    //     appkey: config.appkey
    //   },
    //   success: res => {
    //     // console.log(res)
    //     callback(res.data)
    //   }
    // })
  //  }
}

export {
  Theme
}
