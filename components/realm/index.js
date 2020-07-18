// const { FenceGroup } = require("../models/fence-group")
import {FenceGroup} from '../models/fence-group'

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached() {

    }
  },

  /**
   * 监听器
   */
  observers: {
    'spu': function(spu) {
      if(!spu) {
        return
      }
      // console.log(spu)
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
