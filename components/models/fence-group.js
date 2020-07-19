/**
 * 处理规格数据
 */
import {Matrix} from './matrix'
import {Fence} from './fence'

class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    // 标记列号
    let currentJ = -1
    // console.log(matrix)
    // for
    // element代表矩阵每一个元素，i代表元素在矩阵里的行号，j代表元素在矩阵里的列号
    matrix.each((element, i, j) => {
      // 判断是否开启新列
      if(currentJ !== j) {
        currentJ = j
        // 开启一个新列，需要创建一个新的fence
        fences[currentJ] = this._createFence(element)
        // createFence
      }
      fences[currentJ].pushValueTitle(element.value)
    })
    // console.log(fences)
  }

  // 使用矩阵转置方法
  initFences2() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose()
    // console.log(AT)
    AT.forEach(r=> {
      const fence = new Fence(r)
      fence.init()
      fences.push(fence)
    })
    this.fences = fences
    console.log(fences)
  }

  // 私有方法添加下划线_

  // 生成一个空的fence
  _createFence(element) {
    const fence = new Fence()
    // fence.pushValueTitle(element.value)
    return fence
  }

  _createMatrix(skuList) {
    const m = []
    // console.log(skuList)
    skuList.forEach(sku => {
      m.push(sku.specs)
    })

    return new Matrix(m)
  }

  // 转置
  // 1. 数学函数库
  // 2. 使用矩阵思维
}

export {
  FenceGroup
}