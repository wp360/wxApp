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