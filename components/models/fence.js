 /**
  * 每行规格
  */
import {Cell} from './cell'

class Fence {
  cells = []
  specs

  // 构造函数
  // 一组规格specs
  constructor(specs) {
    this.specs = specs
  }

  init() {
    this.specs.forEach(s => {
      const cell = new Cell(s)
      this.cells.push(cell)
    })
  }
}

export {
  Fence
}