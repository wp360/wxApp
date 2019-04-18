#### 添加插槽
1. 组件页面
```
<!-- components/tag/index.wxml -->
<slot name="slotName"></slot>
```
2. pages页面
```
<!--pages/book-detail/book-detail.wxml-->
<text class="num" slot="after">{{ '+' + item.nums}}</text>
```
3. 组件index.js
```js
  options: {
    multipleSlots: true
  },
```

#### 自定义样式
> Hack方法
```
.comment-container>v-tag:nth-child(1)>view{
  background-color: #fffbdd;
}

.comment-container>v-tag:nth-child(2)>view {
  background-color: #eefbff;
}
```
1. 组件页面
```
<!--components/tag/index.wxml-->
<view class="container tag-class">
  <!-- ...省略 -->
</view>
```

2.组件index.js
```js
// components/tag/index.js
Component({
  // ...省略
  // 外部样式 externalClass
  externalClasses: ['tag-class'], // 自定义变量名
```

3.pages页面
```
<!--pages/book-detail/book-detail.wxml-->
<!-- {{index}} 序号 tag-class="ex-tag" -->
<v-tag tag-class="{{index==0?'ex-tag1':'' || index==1?'ex-tag2':''}}" text="{{item.content}}">
  <text class="num" slot="after">{{ '+' + item.nums}}</text>
</v-tag>
```
4.页面样式
```
/* pages/book-detail/book-detail.wxss */
.ex-tag1 {
  background-color: #fffbdd ! important;
}

.ex-tag2 {
  background-color: #eefbff !important;
}
```

#### wxs的使用
```
// wxs 可以当做过滤器
var format = function(text) {
  // wxs
  if(!text){
    return
  }
  var reg = getRegExp('\\\\n','g')
  return text.replace(reg, '\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
}

module.exports = {
  format: format
}

<!-- 页面调用 -->
<!--pages/book-detail/book-detail.wxml-->
<wxs src="../../util/filter.wxs" module="util" />
<!--省略-->
<view class="sub-container">
  <text class="headline">内容简介</text>
  <text class="content" decode="true">{{util.format(book.summary)}}</text>
</view>

******************************
也可以页面直接使用
<wxs module="util">
  var fomat = function(text) {
    // ...省略
  }
  module.exports = {
    fomat: fomat
  }
<wxs>
```

#### regexp正则
[https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/06datatype.html](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/06datatype.html)

> 语法 生成 regexp 对象需要使用 getRegExp函数。 getRegExp(pattern[, flags])


#### 参考笔记
[微信小程序 补充一发笔记](https://www.jianshu.com/p/7571cdaea370)