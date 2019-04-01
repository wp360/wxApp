import {HTTP} from '../util/http-p'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
      // data: {
      //   name: '1',
      //   age: 18
      // },
      // method: 'POST'
    })
    //   'classic/hot_list',{
    //   name: '1',
    //   age: 18,
    // }, 'POST')
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export { BookModel }