# 小程序电商项目

## 项目初始化

## 调用API数据接口

## 接口模块封装
* 1. 新建文件夹models

* 2. 新建专题模块theme.js
```js
import {config} from '../config/config'

class Theme {
  static getHomeLocationA(callback) {
    wx.request({
      url: `${config.apiBaseUrl}theme/by/names`,
      method: 'GET',
      data: {
        names: 't-1'
      },
      header: {
        appkey: config.appkey
      },
      success: res => {
        // console.log(res)
        callback(res.data)
      }
    })
  }
}

export {
  Theme
}

```

* 3. 修改调用方法
```js
// home.js
import {Theme} from '../../models/theme'
// ...
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Theme.getHomeLocationA(data => {
      this.setData({
        topTheme: data[0]
      })
    })
  },
// ...
```

* 4. wx.request二次封装
```js
// 新建http.js（utils >> http.js）
import {
  config
} from '../config/config'

class Http {
  static request({url, method='GET', data, callback}) {
    wx.request({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey
      },
      success: (res) => {
        callback(res.data)
      }
    })
  }
}

export {
  Http
}
```

* 5. 调用http.js
```js
// theme.js
import {
  Http
} from '../utils/http'

class Theme {
  static getHomeLocationA(callback) {
    Http.request({
      url: `theme/by/names`,
      data: {
        names: 't-1'
      },
      callback: data => {
        callback(data)
      }
    })
  }
}

export {
  Theme
}
```

* 6. 使用async和await
> 解决异步调用callback、promise、async await

* 7. Promisic 回调转换
```js
// 新建util.js
// 将小程序内置非promise API转换为promise
const promisic = function(func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export {
  promisic
}
```

* 8. promisic的使用
```js
// http.js
import {
  config
} from '../config/config'

import {promisic} from '../utils/util'

class Http {
  // 使用async和await
  static async request({
    url,
    method = 'GET',
    data
  }) {
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey
      }
    })
    return res.data
  }
}

export {
  Http
}
```

* 9. 将回调函数全部替换为async和await
```js
// theme.js
class Theme {
  static async getHomeLocationA() {
    return await Http.request({
      url: `theme/by/names`,
      data: {
        names: 't-1'
      }
    })
  }
}

// home.js
  onLoad: async function (options) {
    const data = await Theme.getHomeLocationA()
    console.log(data)
    this.setData({
      topTheme: data[0]
    })
  },
```

## 首页轮播
* 1. 新建banner.js
```js
// models >> banner.js
import {Http} from '../utils/http'

class Banner {
  static locationB = 'b-1'
  static async getHomeLocationB() {
    return await Http.request({
      url: `banner/name/${Banner.locationB}`
    })
  }
}

export {
  Banner
}
```

* 2. 调用方法
```js
// home.js
import {Theme} from '../../models/theme'
import {Banner} from '../../models/banner'
  /**
   * 页面的初始数据
   */
  data: {
    // topTheme: null
    themeA: null,
    bannerB: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
  // onLoad: async function (options) {
    // wx.request({
    //   url: 'http://se.7yue.pro/v1/theme/by/names',
    //   method: 'GET',
    //   data: {
    //     names: 't-1'
    //   },
    //   header: {
    //     appkey: '9cCrZsHIi3wdAOfN'
    //   }
    // })
    // wx.request({
    //   url: `${config.apiBaseUrl}theme/by/names`,
    //   method: 'GET',
    //   data: {
    //     names: 't-1'
    //   },
    //   header: {
    //     appkey: config.appkey
    //   },
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       topTheme: res.data[0]
    //     })
    //   }
    // })

    // Theme.getHomeLocationA(data => {
    //   this.setData({
    //     topTheme: data[0]
    //   })
    // })

    // const data = await Theme.getHomeLocationA()
    // // console.log(data)
    // this.setData({
    //   topTheme: data[0]
    // })
    this.initAllData()
  },

  /**
   * 初始化全部数据
   */
  async initAllData() {
    // 首页头部专题
    const themeA = await Theme.getHomeLocationA()
    // 首页轮播数据
    const bannerB = await Banner.getHomeLocationB()
    this.setData({
      themeA: themeA[0],
      bannerB
    })
  },
```

* 3. 页面布局（小程序swiper的使用）
[https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)

* 4. 添加样式

## 六宫格
* 1. npm init

* 2. package.json设置
```json
  "dependencies": {
    "lin-ui": "~0.6.0"
  },
```

* 3. npm的semver语法规则

* 4. Lin UI的安装
`npm i`

* 5. 构建npm
> 小程序开发者工具 》工具 》 构建npm 》 完成构建 》 确定

## 首页优惠券

* 1. API接口
```js
// activity.js
import {Http} from '../utils/http'

class Activity {
  static locationD = 'a-2'
  static async getHomeActivity() {
    return await Http.request({
      url: `activity/name/${Activity.locationD}`
    })
  }
}

export {
  Activity
}
```

* 2. 首页调用
```js
// home.js
import {Activity} from '../../models/activity'

  data: {
    // ...
    activity: null
  },

  async initAllData() {
    // ...
    // 优惠券
    const activity = await Activity.getHomeActivity()
    this.setData({
      // ...
      activity
    })
  },

```

* 3. 首页页面添加优惠券图片及调整样式

* 4. 背景颜色设置
```
>> app.wxss添加

page {
  background-color: #f5f5f5;
}
```

## 首页每周上新

* 1. 页面到底是否应该合并HTTP请求？
```
每一个数据http
Home只发送一个http
有选择的把部分http请求合并成一个

衡量指标
1. http请求数量
2. http多少次数据库查询join
3. 接口的灵活性，可维护性
```

* 2. 合并全部专题接口
```js
class Theme {
  // 接口参数
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  static async getThemes() {
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    return await Http.request({
      url: `theme/by/names`,
      data: {
        names
      }
    })
  }
}
```

* 3. 首页接口调用
```js
// home.js
// 获取全部专题数据
const themes = await Theme.getThemes()
// name = 't-1'
// for (let theme of themes) {
//   if theme.name === 't-1'
// }
// 集合
// 函数式编程
// find、filter、map、some、reduce
const themeA = themes.find(t => t.name === 't-1')
// 保存数据 类的对象 本身就具有保存数据的功能
// 类能够保存数据 但不能保存状态
// 类的对象 数据 状态
// 符号
// 每周上新
const themeE = themes.find(t => t.name === 't-2')
```

* 4. 重构theme接口
```js
// models/theme.js
import {
  Http
} from '../utils/http'

class Theme {
  // 接口参数
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  // 出于扩展性考虑，去除static
  async getThemes() {
    const names = `${Theme.locationA}, ${Theme.locationE}, ${Theme.locationF}, ${Theme.locationH}`
    this.themes = await Http.request({
      url: `theme/by/names`,
      data: {
        names
      }
    })
  }

  async getHomeLocationA() {
    return this.themes.find(t => t.name === Theme.locationA)
    // return await Http.request({
    //   url: `theme/by/names`,
    //   data: {
    //     names: Theme.locationA
    //   }
    // })
  }

  // 每周上新
  async getHomeLocationE() {
    return this.themes.find(t => t.name === Theme.locationE)
    // return await Http.request({
    //   url: `theme/by/names`,
    //   data: {
    //     names: Theme.locationE
    //   }
    // })
  }

  // static getHomeLocationA(callback) {
  //   Http.request({
  //     url: `theme/by/names`,
  //     data: {
  //       names: 't-1'
  //     },
  //     callback: data => {
  //       callback(data)
  //     }
  //   })
    // wx.request({
    //   url: `${config.apiBaseUrl}theme/by/names`,
    //   method: 'GET',
    //   data: {
    //     names: 't-1'
    //   },
    //   header: {
    //     appkey: config.appkey
    //   },
    //   success: res => {
    //     // console.log(res)
    //     callback(res.data)
    //   }
    // })
  //  }
}

export {
  Theme
}
```

* 5. 首页接口调用修改
```js
// home.js
  data: {
    // topTheme: null
    themeA: null,
    themeE: null,
    bannerB: null,
    grid: [],
    activity: null
  },
// ...
// 获取全部专题数据
const theme = new Theme()
await theme.getThemes()
// const themes = await Theme.getThemes()
// const themeA = themes.find(t => t.name === 't-1')
const themeA = await theme.getHomeLocationA()
// 每周上新
// const themeE = themes.find(t => t.name === 't-2')
const themeE = await theme.getHomeLocationE()
// 原则： 调用方 调用过程 简单的
```

* 6. spu-scroll组件

* 7. 使用Lin UI Price价格组件
```json
// app.json
  "usingComponents": {
    "l-grid": "/miniprogram_npm/lin-ui/grid/index",
    "l-grid-item": "/miniprogram_npm/lin-ui/grid-item/index",
    "l-price": "/miniprogram_npm/lin-ui/price/index"
  }
```
* 8. 引入价格组件
```
<s-spu-scroll
  wx:if="{{themeE.online}}"
  theme="{{themeE}}"
  spu-list="{{themeESpu}}"
>
</s-spu-scroll>
```

* 9. 关于使用scroll-view去除enable-flex，添加内容view，解决默认空白问题。

* 10. 关于处理单行标题显示
```
解决办法：
1. 数据预处理（文本截取）

2. wxs的使用
===========================
<wxs src="../../miniprogram_npm/lin-ui/filter/string.wxs" module="s"></wxs>

<text class="spu-text">{{item.title.length > 8 ? s.substring(item.title, 0, 7) + '...' : item.title}}</text>

3. css样式
===========================
.spu-text {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  width: 150rpx;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 组件外部样式类设置

* 1. 组件js添加externalClasses
```js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['l-class'],
  // ...
})
```

* 2. 组件上添加class，对应页面上使用l-class

* 3. 关于添加样式边距还可以采用自定义组件外再新增一个view
```
  <view class="spu-scroll">
    <!-- 自定义的组件 -->
  </view>
```

## 首页臻选

## 热卖榜单

* 1. 新建自定义组件hot-list

* 2. 组件添加banner属性

* 3. 引入hot-list组件(home.json)
```json
{
  "usingComponents": {
    "s-category-grid": "/components/category-grid/index",
    "s-spu-scroll": "/components/spu-scroll/index",
    "s-hot-list": "/components/hot-list/index"
  }
}
```

* 4. 页面添加(home.wxml)

* 5. 获取数据
```js
// models/banner.js
class Banner {
  static hotList   = 'b-2'

  static async getHomeHotList() {
    return await Http.request({
      url: `banner/name/${Banner.hotList}`
    })
  }
}
```

* 6. 首页调用数据接口
```js
// home.js
data: {
  // ...
  hotList: null
},

// 热卖榜单
const hotList = await Banner.getHomeHotList()
this.setData({
  // ...
  hotList
})
```

* 7. hot-list组件页面

* 8. 监听器的使用
```js
// hot-list.js
observers: {
  // 可以监听多个
  // 'banner, theme': function (banner, theme) {

  // }
  'banner': function(banner) {
    if(!banner) {
      return
    }

    if(banner.items.length === 0) {
      return
    }

    const left = banner.items.find(i => i.name === 'left')
    const rightTop = banner.items.find(i => i.name === 'right-top')
    const rightBottom = banner.items.find(i => i.name === 'right-bottom')

    this.setData({
      left,
      rightTop,
      rightBottom
    })
  }
},
```

* 9. hot-list样式

## 时尚出街

## Hover点击态的应用

* 1. 新建样式（wxss >> sleeve.wxss >> .rect-hover）

* 2. @import导入样式

* 3. 页面使用hover-class
```
<view hover-class="rect-hover" hover-stay-time="300">
  <image class="left" src="{{left.img}}"></image>
</view>
```

## 首页瀑布流

* 1. 引入lin-ui瀑布流组件
```json
// home.json
{
  "usingComponents": {
    // ...
    "l-water-flow": "/miniprogram_npm/lin-ui/water-flow/index"
  }
}
```

* 2. wxml页面添加组件
```
  <!-- 瀑布流 -->
  <view class="spu-bottom">
    <image class="title-spu-bottom" src="/imgs/home/title@interest.png"></image>
    <!-- 数据待添加 -->
    <l-water-flow generic:l-water-flow-item=""></l-water-flow>
  </view>
```

* 3. 自定义商品组件
> sup-preview >> index

* 4. 商品数据
> sup-preview/index.js

* 5. 数据接口
```js
// home.js
// ...
  /**
   * 首页底部瀑布流
   */
  async initBottomSpuList() {
    // ...
  },
```

* 6. 数据模型
```js
// models >> spu-paging.js
/**
 * 关于分页数据
 */
// 1. 返回为空 一条数据也没有
// 2. 最后一页，是否有更多数据
// 3. 累加 100 1-20 21-40 ... setData重新渲染页面
// 4. 非分页数据： a. 正在加载 loading b. 空
//    分页数据： a. 正在加载 b. 加载完成 c. 没有更多数据
// 5. 上滑页面触底 加载 避免用户重复发送请求 redis 数据锁
//    按钮 button 防抖节流 禁用 倒计时 模态 loading
// start count 0，10

import {Paging} from '../utils/paging'

class spuPaging {
  static getLasestPaging() {
    return new Paging({
      url: `spu/latest`
    }, 3)
  }
}

export {
  spuPaging
}
```

* 7. 分页模块
> utils/paging.js

* 8. 首页调用
```js
// home.js
import {spuPaging} from '../../models/spu-paging'
// ...
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.initAllData()
    // 首页底部瀑布流
    this.initBottomSpuList()
  },

  /**
   * 首页底部瀑布流
   */
  async initBottomSpuList() {
    const paging = await spuPaging.getLasestPaging()
    const data = await paging.getMoreData()
    if(!data) {
      return
    }
  },

```

## 首页瀑布流商品组件
* 1. 页面布局
```
<!-- spu-preview内容： 图片、标题、标签、价格、简介 -->
<view class="container">
  <image src="{{data.img}}"></image>
</view>

```

* 2. 商品数据
```js
// spu-preview/index.js
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

// ============================
// pages/home/home.js
  async initBottomSpuList() {
    // ...
    // 瀑布流
    // wx.lin.renderWaterFlow()支持传入三个参数，第一个参数为data即为传入的数据信息，第二个参数为refresh为是否刷新数据(删除之前渲染的数据，重新渲染)。
    wx.lin.renderWaterFlow(data.items)
  },
```

* 3. 首页组件调用
```
  <!-- 瀑布流 -->
  <view class="spu-bottom">
    <image class="title-spu-bottom" src="/imgs/home/title@interest.png"></image>
    <l-water-flow generic:l-water-flow-item="s-spu-preview"></l-water-flow>
  </view>

* 注意： s-spu-preview为自定义组件名称
```

* 4. app.json引入spu-preview自定义组件

* 5. 商品标签
```
>> app.json引入lin-ui/tag组件
"l-tag": "/miniprogram_npm/lin-ui/tag/index"

>> 标签数据
data: {
  tags: Array
},

observers: {
  data: function(data) {
    if(!data) {
      return
    }

    if(!data.tags) {
      return
    }
    const tags = data.tags.split('$')
    this.setData({
      tags
    })
  }
},


>> 页面添加
<view class="tags">
  <block wx:for="{{tags}}" wx:key="index">
    <l-tag l-class="l-tag" size="medium">{{item}}</l-tag>
  </block>
</view>

>> 样式调整
.l-tag {
  background-color: #dcebe6 !important;
  color: #157658 !important;
  padding-left: 10rpx !important;
  padding-right: 10rpx !important;
  margin-right: 6rpx !important;
}
```

* 6. 原价折扣价显示
```
>> 页面
<!-- 原价 -->
<l-price value="{{p.mainPrice(data.price, data.discount_price)}}"></l-price>
<!-- 折扣价 -->
<l-price wx:if="{{data.discount_price?true:false}}" deleted value="{{p.slashedPrice(data.price, data.discount_price)}}"></l-price>

>> wxs价格显示判断
// 主价格
function mainPrice(price, discountPrice) {
  if(!discountPrice) {
    return price
  } else {
    return discountPrice
  }
}

// 划线价格
function slashedPrice(price, discountPrice) {
  if(discountPrice) {
    return price
  } else {
    return
  }
}

module.exports = {
  mainPrice: mainPrice,
  slashedPrice: slashedPrice
}

>> 样式调整
```

* 7. 标题、内容样式调整

* 8. 动态计算图片高和宽
```
>> mode="widthFix"设置
>> 自定义方法bind:load="onImgLoad"，添加动态样式：style="width: {{w}}rpx;height:{{h}}rpx;"
>> 使用wx.getImageInfo获取图片宽高（网络图片需要先配置download域名）
```

* 9. 页底提示Loadmore
```
>> app.json引入l-loadmore组件
"l-loadmore": "/miniprogram_npm/lin-ui/loadmore/index"

>> 首页使用l-loadmore
<l-loadmore show>
  <view slot="content" class="container">
    <!-- 省略 -->
  </view>
</l-loadmore>

>> app.json设置距离底部
"window": {
  //...
  "onReachBottomDistance": 100
},
```

* 10. 没有更多数据
```
// home.js
  data: {
    // ...
    loadingType: 'loading'
  },

  onReachBottom: async function () {
    // 瀑布流加载更多
    // ...
    // 没有更多数据
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  },

// =================
// home.wxml
<l-loadmore show type="{{loadingType}}">
```

* 11. 每周上新修改对应价格显示

* 12. 调整一次加载瀑布流显示数

## 详情页

> 流程： home首页点击商品跳转对应详情页，detail页面获取参数pid，根据pid加载数据，再通过setData将详情信息传递到realm组件。

* 1. 获取商品id
```js
  onLoad: function (options) {
    const pid = options.pid
  },
```

* 2. spu-preview组件添加跳转商品详情

* 3. 新建detail详情页

* 4. 分析及拆分详情页

* 5. 新建realm组件

* 6. 新建fence组件

* 7. 新建fence组件models（fence.js与fence-group.js）

* 8. 新建spu模型调用数据
```js
// models/spu.js
// 获取商品详情
import {Http} from '../utils/http'

class Spu {
  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}

export {
  Spu
}

// ===========================
// detail.js
  onLoad: async function (options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)

    this.setData({
      spu
    })
  },
```

* 9. detail页面调用realm组件
`<s-realm></s-realm>`

```json
{
  "usingComponents": {
    "s-realm": "/components/realm/index"
  }
}
```

* 10. realm组件添加spu
```js
// realm/index.js
  properties: {
    spu: Object
  },
```

* 11. observers监听spu数据
```js
// realm/index.js
  observers: {
    'spu': function(spu) {
      if(!spu) {
        return
      }
    }
  },
```

* 12. 提取全部规格值
> components/models/fence-group.js

* 13. 新建矩阵方法
> matrix.js

* 14. 定义每一行规格
> fence.js

* 15. fence的实例化

* 16. 调用initFences方法
```js
// components/realm/index.js
  observers: {
      //...

      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
    }
  },

```

* 17. 详情页显示数据
```
<s-realm spu="{{spu}}"></s-realm>
```

* 18. 矩阵的转置
```js
// components/models/matrix.js
// numpy
// ...
  // 矩阵转置
  transpose() {
    // 转置后的数组
    const desArr = [] // [[], [], []]
    // 外层确定行
    for (let j = 0; j < this.colsNum; j++) {
      desArr[j] = []
      for (let i = 0; i < this.rowsNum; i++) {
        desArr[j][i] = this.m[i][j]
      }
    }
    return desArr
  }

// ============================================
// components/models/fence-group.js
  initFences2() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose()
    console.log(AT)
    AT.forEach(r=> {
      const fence = new Fence(r)
      fence.init()
      fences.push(fence)
    })
    console.log(fences)
  }

// ============================================
// components/models/fence.js
class Fence {
  // ...
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
  // ...

// ============================================
// components/realm/index.js
  observers: {
    // ...
      fenceGroup.initFences2()
    }
  },
```


## SPU、SKU的概念
> SPU = Standard Product Unit 标准化产品单元
> SKU = Stock Keeping Unit 库存量单位

## 线性代数 矩阵

```
金属灰  七龙珠   小号S
青芒色  灌篮高手 中号M
青芒色  圣斗士   大号L
橘黄色  七龙珠   小号S
```

* 转置
> a[1, 0]  b[0, 1]

* 旋转

## git 远程分支上传
```
git remote add origin https://github.com/wp360/wxApp.git

git checkout -b e-shop

git status

git add .

git commit -m "项目初始化"

git push

git push --set-upstream origin e-shop
```