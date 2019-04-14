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

  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export { BookModel }