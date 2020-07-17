/**
 * 规格矩阵
 */

class Matrix {
  // 二维数组
  m

  constructor(matrix) {
    this.m = matrix
  }

  get rowsNum() {
    return this.m.length
  }

  get colsNum() {
    return this.m[0].length
  }

  forEach(callback) {
    // return
    for (let j = 0; j < this.colsNum; j++) {
      for (let i = 0; i < this.rowsNum; i++) {
        const element = this.m[i][j]
        callback(element, i, j)
      }
    }
  }
}

export {
  Matrix
}