// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
const keywordModel = new KeywordModel()
import {
  BookModel
} from '../../models/book'
const bookModel = new BookModel()

import {
  paginationBev
} from '../behaviors/pagination'

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },
  attached() {
    // const historyWords = keywordModel.getHistory()
    // const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      // console.log(this.data.q)
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      // 一次只发送一个请求
      // 锁
      // const length = this.data.dataArray.length
      // console.log(length)
      if (this.hasMore()) {
        this.locked()
        // this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          // const tempArray = this.data.dataArray.concat(res.books)
          this.setMoreData(res.books)
          // this.setData({
          //   dataArray: tempArray,
          //   // loading: false
          // })
          // this.data.loading = false
          this.unLocked()
        }, () => {
          this.unLocked() // 避免死锁状态
        })
      }
    },
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event) {
      this.initialize()
      this._closeResult()
      // this.setData({
      //   searching: false
      // })
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      // 获取用户输入的关键字
      const q = event.detail.value || event.detail.text
      this.setData({
        // dataArray: res.books,
        q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
    // scroll-view | Page onReachBottom
  }
})