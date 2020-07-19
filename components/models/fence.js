 /**
  * 每行规格
  */
import {Cell} from './cell'

class Fence {
  cells = []
  specs
  id
  title

  // 构造函数
  // 一组规格specs
  constructor(specs) {
    this.specs = specs
    this.id = specs[0].key_id
    this.title = specs[0].key
  }

  init() {
    this._initCells()
  }

  // 初始化cell
  _initCells() {
    this.specs.forEach(s => {
      // 去重
      const existed = this.cells.some(c=>{
        return c.id === s.value_id
      })
      if (existed) {
        return
      }

      const cell = new Cell(s)
      this.cells.push(cell)
    })
  }
}

export {
  Fence
}