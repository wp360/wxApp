# 微信小程序微商城

## 小程序登录注册、https域名配置
> 关于注册小程序帐号及相关设置，可以参考小程序的开发文档
[https://developers.weixin.qq.com/miniprogram/introduction/](https://developers.weixin.qq.com/miniprogram/introduction/)

> 登录注册好的微信小程序官方账号并登录平台——>开发——>开发设置；服务器域名可以使用：https://100boot.cn

## 首页
> 首页分解： 1、首页导航信息 2、首页轮播信息 3、首页菜单信息 4、首页新品特卖 5、首页福利专场
* 创建小程序项目并封装ajax请求
1. 新建ajax.js
```
#目录结构-pages
--utils
---ajax.js
```
> 声明api 全局变量调用地址
`const api = 'https://100boot.cn/wxShop/';`
2. 封装request请求
```js
// 实例代码
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data)
  }
})
// 封装
function request(opt) {
    wx.request({
        method: opt.method || 'GET',
        url: api + opt.url,
        header: {
            'content-type': 'application/json' // 默认值
        },
        data: opt.data,
        success: function (res) {
            if (res.data.code == 100) {
                if (opt.success) {
                    opt.success(res.data);
                }
            } else {
                console.error(res);
                wx.showToast({
                    title: res.data.message,
                })
            }
        }
    })
}

module.exports.request = request
```
[微商城接口：https://100boot.cn/interface/wxshop.html](https://100boot.cn/interface/wxshop.html)
3. 配置开发者key
> 打开utils/util.js，增加key
```js
module.exports = {
  formatTime: formatTime,
  key: '开发者key'
}
// 微信小程序微商城：开发者key获取，扫描100boot微商城开发申请二维码
```
4. app.json设置
```json
{  
    "pages": [    
        "pages/home/home",    
        "pages/cart/cart",    
        "pages/detail/detail",    
        "pages/classify/classify",    
        "pages/mine/mine",    
        "pages/index/index",    
        "pages/logs/logs"
  ],  
    "window": {    
    "backgroundTextStyle": "light",    
    "navigationBarBackgroundColor": "#f0145a",    
    "navigationBarTitleText": "微商城",    
    "backgroundColor": "#f0145a"
  },  
    "tabBar": {    
        "color": "#858585",    
        "selectedColor": "#f0145a",    
        "backgroundColor": "#ffffff",    
        "borderStyle": "#000",    
    "list": [
      {        
        "pagePath": "pages/home/home",        
        "iconPath": "images/home.png",        
        "selectedIconPath": "images/home_select.png",        
        "text": "首页"
      },
      {        
        "pagePath": "pages/classify/classify",        
        "iconPath": "images/classify.png",        
        "selectedIconPath": "images/classify_select.png",        
        "text": "分类"
      },
      {        
        "pagePath": "pages/cart/cart",        
        "iconPath": "images/cart.png",        
        "selectedIconPath": "images/cart_select.png",        
        "text": "购物车"
      },
      {        
        "pagePath": "pages/mine/mine",        
        "iconPath": "images/mine.png",        
        "selectedIconPath": "images/mine_select.png",        
        "text": "我的"
      }
    ]
  }
}
```
5. app.wxss设置
```wxss
.container {  
    height: 100%;  
    display: flex;  
    flex-direction: column;  
    align-items: center;  
    justify-content: space-between;  
    padding: 200rpx 0;  
    box-sizing: border-box;
} 
```
6. home.wxml
```wxml
<!--导航条-->  
<view class="navbar">  
  <text wx:for="{{navbars}}" data-idx="{{index}}" class="item {{currentTab==index ? 'active' : ''}}" wx:key="unique" bindtap="navbarTap">{{item.navbarName}}</text>  
</view>
```
#### 巧用 wx:key 属性
* 如果很明确自己的列表渲染是个静态列表，那么你可以像我一开始那样做，加个 wx:key="{{index}}" 就可以了
* 反之，如果是个动态列表，那么就得在数组里找到唯一的键值，放在 wx:key 里面
* 当然如果你无视警告，也不影响功能，不加也行
```
其实，wx:key 是用来绑定当前列表中的项目特征的，也就是说，如果列表是动态更新的，那么 wx:key 的作用是保持原有项目的整个状态不变。
结合上面的例子，我们可以知道，对于列表数组是个对象数组，那么 wx:key 属性直接写对应的唯一的属性名就可以了，比如上面的 wx:key="unique"， 或者 wx:key="id" 也是可以的，只要保持属性是唯一值就行了，有点类似页面标签里面的 id 属性在页面是唯一的。
对于列表数组是个基本类型数组，那么直接写 wx:key="*this" 就可以了。
```
7. home.wxss
```wxss
page{  
  display: flex;  
  flex-direction: column;  
  height: 100%;  
}  .navbar{  
  flex: none;  
  display: flex;  
  background: #fff;  
}  .navbar .item{  
  position: relative;  
  flex: auto;  
  text-align: center;  
  line-height: 80rpx;  
  font-size:14px;
}  
/* 顶部导航字体颜色 */
.navbar .item.active{  
  color: #f0145a;  
}  
/* 顶部指示条属性 */
.navbar .item.active:after{  
  content: "";  
  display: block;  
  position: absolute;  
  bottom: 0;  
  left: 0;  
  right: 0;  
  height: 6rpx;  
  background: #f0145a;  
}
```
8. home.js
```js
// pages/home/home.js
// const ajax = require('../../utils/ajax.js');
// const utils = require('../../utils/util.js');
import ajax from '../../utils/ajax';
import utils from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbars: null,
    currentTab: 0,
  },
  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //加载navbar导航条
    that.navbarShow();
  },
  // ajax获取导航数据
  navbarShow: function (success) {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/navBar?key=' + utils.key,
      success: data => {
        that.setData({
          navbars: data.result
        })
        console.log(data.result)
      }
    })
  }
})
```
## 电商首页轮播、分类导航和新品特卖实现
1. 首页轮播模块实现
[参考小程序swiper组件的使用：https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)
```home.wxml
<!-- 首页轮播 banner -->
<swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
  <block wx:for="{{banners}}">
    <swiper-item>
      <image src="{{item.imgUrl}}" mode="widthFix" />
    </swiper-item>
  </block>
</swiper>
```
#### mode="widthFix"相关问题
[关于小程序widthFix图片高度不能自适应的问题](https://www.jianshu.com/p/0d0a0c7da4d3)

## 首页分类导航实现
1. 页面制作
```wxml
<!-- 分类导航 -->
 <view>
  <view class="navy">
    <block wx:for-items="{{menus}}" wx:key="name">
      <view class="nav-item"  data-type="{{item.menuName}}" data-typeid="{{item.id}}">
        <image src="{{item.imgUrl}}" class="nav-image" />
        <text>{{item.menuName}}</text>
      </view>
    </block>
  </view>
 </view> 
```
2. 样式添加
```wxss
/*=================分类导航====================*/
.navs {
    display: flex;
    justify-content: left;
    flex-direction: row;
    flex-wrap: wrap;
}

.nav-item {
    width: 25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* padding: 20rpx; */
    padding-top: 20rpx;
}

.nav-item .nav-image {
    width: 80rpx;
    height: 80rpx;
    /* border-radius: 50%;设置边界圆角 */
}

.nav-item text {
    padding-top: 20rpx;
    font-size: 25rpx;
}
```
3. 数据生成
```js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menus: null //分类导航数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 加载menu分类导航菜单
    that.menuShow();
  },
  // ajax获取分类导航数据
  menuShow: function(success) {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/menus?key='+ utils.key,
      success: data => {
        that.setData({
          menus: data.result
        })
        console.log(data.result)
      }
    })
  }
})
```
## 首页新品特卖模块实现
1. 页面制作
```wxml
<!-- 新品特卖 -->
<view class="separate"></view>
<view class="cate-container">
  <view class="category-title">
    <text class="name">新品特卖</text>
    <view class="line_flag"></view>
    <block wx:for-items="{{brands}}" wx:key="id">
      <navigator url="/pages/detail/detail">
        <image class="head-img" src="{{item.imgUrl}}" mode="widthFix"></image>
      </navigator>
      <text class="brand-name">{{item.name}}</text>
      <view class='pas'>
        <image class="activity-logo" src="../../images/activity_logo.png" mode="widthFix"></image>
        {{item.remark}}
      </view>
    </block>
  </view>
</view>
```