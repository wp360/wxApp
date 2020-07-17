/**
 * 首页轮播
 */
import {Http} from '../utils/http'

class Banner {
  static locationB = 'b-1'
  static hotList   = 'b-2'

  static async getHomeLocationB() {
    return await Http.request({
      url: `banner/name/${Banner.locationB}`
    })
  }

  static async getHomeHotList() {
    return await Http.request({
      url: `banner/name/${Banner.hotList}`
    })
  }
}

export {
  Banner
}