/**
 * SKU排列组合
 */

class Judger {

  fenceGroup
  pathDict = []

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
  }

  // 主方法
  initPathDict() {
    // 获取sku的code码
    this.fenceGroup.spu.sku_list.forEach(s=> {
      s.code
    })
  }
}

export {
  Judger
}