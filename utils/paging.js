/**
 * 分页
 */
import {Http} from './http'

class Paging{
  start
  count
  req
  locker = false
  url
  moreData = true
  accumulator = []

  constructor(req, count=10, start=0) {
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }

  async getMoreData() {
    // 生成器 Generator
    // getLocker
    // request
    // releaseLocker

    if(!this.moreData) {
      return
    }

    if(!this._getLocker()) {
      return
    }
    const data = await this._actualGetData()
    this._releaseLocker()
    return data
  }

  // 获取真实数据
  async _actualGetData() {
    // 调用api v1/spu/latest?start=0&count=10
    const req = this._getCurrentReq()
    let paging = await Http.request(req)
    if(!paging) {
      return null
    }

    // 返回数据
    // return {
    //   empty: Boolean,
    //   items: [], // 当前data
    //   moreData: Boolean,
    //   accumulator: [] // 累加数据
    // }

    if(paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }

    this.moreData = Paging._moreData(paging.total_page, paging.page)

    if(this.moreData) {
      this.start += this.count
    }

    this._getCurrentReq(paging.items)

    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
  }

  // 累加数据
  _accumulate(items) {
    this.accumulator = this.accumulator.cocat(items)
  }

  // 更多数据
  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage-1
  }

  // 获取当前请求对象
  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    // url.indexOf('?') !== -1
    if(url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }
    this.req.url = url
    return this.req
  }

  // 数据锁
  _getLocker() {
    if(this.locker) {
      return false
    }

    this.locker = true
    return true
  }

  _releaseLocker() {
    this.locker = false
  }
}

export {
  Paging
}