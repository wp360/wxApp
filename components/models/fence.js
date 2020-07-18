 /**
  * 每行规格
  */

class Fence {
  // 名称
  valueTitles = []
  specs

  // 构造函数
  // 一组规格specs
  constructor(specs) {
    this.specs = specs
  }

  init() {
    this.specs.forEach(s => {
      this.pushValueTitle(s.value)
    })
  }

  pushValueTitle(title) {
    this.valueTitles.push(title)
  }
}

export {
  Fence
}