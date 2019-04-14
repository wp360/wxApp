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