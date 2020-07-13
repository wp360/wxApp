/**
 * 瀑布流分页数据获取
 */
import {Paging} from '../utils/paging'

class spuPaging {
  static getLasestPaging() {
    return new Paging({
      url: `spu/latest`
    }, 5)
  }
}

export {
  spuPaging
}