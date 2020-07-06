# 小程序电商项目

## 项目初始化

## 调用API数据接口

## 接口模块封装
* 1. 新建文件夹model

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
import {Theme} from '../../model/theme'
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
// model >> banner.js
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
import {Theme} from '../../model/theme'
import {Banner} from '../../model/banner'
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
import {Activity} from '../../model/activity'

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
// model/theme.js
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