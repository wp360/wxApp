/**
 * 获取商品详情
 */
import {Http} from '../utils/http'

class Spu {
  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}

export {
  Spu
}